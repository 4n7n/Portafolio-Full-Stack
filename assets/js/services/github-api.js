export class GitHubAPI {
  constructor(config = {}) {
    this.config = {
      username: '',
      token: null, // Token personal opcional para mayor límite de rate
      baseURL: 'https://api.github.com',
      rateLimit: {
        remaining: null,
        reset: null,
        limit: null
      },
      cache: {
        enabled: true,
        duration: 5 * 60 * 1000, // 5 minutos
        data: new Map()
      },
      ...config
    };
  }

  /**
   * Realiza una petición a la API de GitHub
   * @param {string} endpoint - Endpoint de la API
   * @param {Object} options - Opciones adicionales
   * @returns {Promise}
   */
  async request(endpoint, options = {}) {
    const url = `${this.config.baseURL}${endpoint}`;
    const cacheKey = `${url}${JSON.stringify(options)}`;

    // Verificar cache
    if (this.config.cache.enabled) {
      const cached = this.getCachedData(cacheKey);
      if (cached) {
        return cached;
      }
    }

    const headers = {
      'Accept': 'application/vnd.github.v3+json',
      'User-Agent': `Portfolio-App`,
      ...options.headers
    };

    // Añadir token si está disponible
    if (this.config.token) {
      headers['Authorization'] = `token ${this.config.token}`;
    }

    try {
      const response = await fetch(url, {
        method: options.method || 'GET',
        headers,
        ...options
      });

      // Actualizar información de rate limit
      this.updateRateLimit(response.headers);

      if (!response.ok) {
        throw new Error(`GitHub API Error: ${response.status} ${response.statusText}`);
      }

      const data = await response.json();

      // Guardar en cache
      if (this.config.cache.enabled) {
        this.setCachedData(cacheKey, data);
      }

      return data;
    } catch (error) {
      console.error('Error en petición a GitHub API:', error);
      throw error;
    }
  }

  /**
   * Obtiene información del usuario
   * @param {string} username - Nombre de usuario (opcional)
   * @returns {Promise}
   */
  async getUser(username = null) {
    const user = username || this.config.username;
    if (!user) {
      throw new Error('Username no especificado');
    }
    const data = await this.request(`/users/${user}`);
    
    return {
      username: data.login,
      name: data.name,
      bio: data.bio,
      avatar: data.avatar_url,
      location: data.location,
      website: data.blog,
      company: data.company,
      email: data.email,
      followers: data.followers,
      following: data.following,
      publicRepos: data.public_repos,
      createdAt: data.created_at,
      updatedAt: data.updated_at,
      twitterUsername: data.twitter_username,
      hireable: data.hireable
    };
  }

  /**
   * Obtiene los repositorios del usuario
   * @param {Object} options - Opciones de filtrado
   * @returns {Promise}
   */
  async getRepositories(options = {}) {
    const {
      username = this.config.username,
      type = 'owner', // owner, all, member
      sort = 'updated', // created, updated, pushed, full_name
      direction = 'desc', // asc, desc
      per_page = 30,
      page = 1,
      exclude = [],
      featured = false
    } = options;

    if (!username) {
      throw new Error('Username no especificado');
    }

    const params = new URLSearchParams({
      type,
      sort,
      direction,
      per_page: per_page.toString(),
      page: page.toString()
    });

    const data = await this.request(`/users/${username}/repos?${params}`);

    let repositories = data.map(repo => ({
      id: repo.id,
      name: repo.name,
      fullName: repo.full_name,
      description: repo.description,
      url: repo.html_url,
      cloneUrl: repo.clone_url,
      sshUrl: repo.ssh_url,
      homepage: repo.homepage,
      language: repo.language,
      languages: null, // Se carga por separado
      size: repo.size,
      stars: repo.stargazers_count,
      watchers: repo.watchers_count,
      forks: repo.forks_count,
      issues: repo.open_issues_count,
      license: repo.license ? repo.license.name : null,
      isPrivate: repo.private,
      isFork: repo.fork,
      isArchived: repo.archived,
      isDisabled: repo.disabled,
      defaultBranch: repo.default_branch,
      createdAt: repo.created_at,
      updatedAt: repo.updated_at,
      pushedAt: repo.pushed_at,
      topics: repo.topics || [],
      hasPages: repo.has_pages,
      pagesUrl: repo.has_pages ? `https://${username}.github.io/${repo.name}` : null
    }));

    // Filtrar repositorios excluidos
    if (exclude.length > 0) {
      repositories = repositories.filter(repo => 
        !exclude.includes(repo.name) && !exclude.includes(repo.fullName)
      );
    }

    // Filtrar solo repositorios destacados si se especifica
    if (featured) {
      repositories = repositories.filter(repo => 
        repo.stars > 0 || 
        repo.topics.includes('featured') || 
        repo.topics.includes('portfolio') ||
        (!repo.isFork && !repo.isArchived)
      );
    }

    return repositories;
  }

  /**
   * Obtiene las estadísticas de un repositorio
   * @param {string} repo - Nombre del repositorio
   * @param {string} username - Nombre de usuario
   * @returns {Promise}
   */
  async getRepositoryStats(repo, username = this.config.username) {
    if (!username || !repo) {
      throw new Error('Username y repositorio son obligatorios');
    }

    try {
      const [languages, commits, contributors] = await Promise.all([
        this.getRepositoryLanguages(repo, username),
        this.getRepositoryCommits(repo, username, { per_page: 1 }),
        this.getRepositoryContributors(repo, username)
      ]);

      return {
        languages,
        totalCommits: commits.length > 0 ? 'Unknown' : 0, // GitHub no proporciona count total fácilmente
        contributors: contributors.length,
        lastCommit: commits.length > 0 ? commits[0].commit.author.date : null
      };
    } catch (error) {
      console.warn(`Error obteniendo estadísticas para ${repo}:`, error);
      return {
        languages: {},
        totalCommits: 0,
        contributors: 0,
        lastCommit: null
      };
    }
  }

  /**
   * Obtiene los lenguajes de un repositorio
   * @param {string} repo - Nombre del repositorio
   * @param {string} username - Nombre de usuario
   * @returns {Promise}
   */
  async getRepositoryLanguages(repo, username = this.config.username) {
    const data = await this.request(`/repos/${username}/${repo}/languages`);
    
    // Calcular porcentajes
    const total = Object.values(data).reduce((sum, bytes) => sum + bytes, 0);
    const languages = {};
    
    Object.entries(data).forEach(([language, bytes]) => {
      languages[language] = {
        bytes,
        percentage: total > 0 ? ((bytes / total) * 100).toFixed(1) : 0
      };
    });

    return languages;
  }

  /**
   * Obtiene los commits de un repositorio
   * @param {string} repo - Nombre del repositorio
   * @param {string} username - Nombre de usuario
   * @param {Object} options - Opciones adicionales
   * @returns {Promise}
   */
  async getRepositoryCommits(repo, username = this.config.username, options = {}) {
    const {
      sha = null,
      path = null,
      author = null,
      since = null,
      until = null,
      per_page = 30,
      page = 1
    } = options;

    const params = new URLSearchParams({
      per_page: per_page.toString(),
      page: page.toString()
    });

    if (sha) params.append('sha', sha);
    if (path) params.append('path', path);
    if (author) params.append('author', author);
    if (since) params.append('since', since);
    if (until) params.append('until', until);

    return await this.request(`/repos/${username}/${repo}/commits?${params}`);
  }

  /**
   * Obtiene los contribuidores de un repositorio
   * @param {string} repo - Nombre del repositorio
   * @param {string} username - Nombre de usuario
   * @returns {Promise}
   */
  async getRepositoryContributors(repo, username = this.config.username) {
    return await this.request(`/repos/${username}/${repo}/contributors`);
  }

  /**
   * Obtiene el README de un repositorio
   * @param {string} repo - Nombre del repositorio
   * @param {string} username - Nombre de usuario
   * @returns {Promise}
   */
  async getRepositoryReadme(repo, username = this.config.username) {
    try {
      const data = await this.request(`/repos/${username}/${repo}/readme`);
      
      // Decodificar contenido base64
      const content = atob(data.content.replace(/\s/g, ''));
      
      return {
        content,
        encoding: data.encoding,
        size: data.size,
        sha: data.sha,
        downloadUrl: data.download_url
      };
    } catch (error) {
      console.warn(`README no encontrado para ${repo}`);
      return null;
    }
  }

  /**
   * Obtiene las estadísticas de actividad del usuario
   * @param {string} username - Nombre de usuario
   * @returns {Promise}
   */
  async getUserActivity(username = this.config.username) {
    if (!username) {
      throw new Error('Username no especificado');
    }

    try {
      const events = await this.request(`/users/${username}/events/public?per_page=100`);
      
      const activity = {
        totalEvents: events.length,
        eventsByType: {},
        repositoriesActive: new Set(),
        lastActivity: null,
        commitCount: 0,
        issueCount: 0,
        prCount: 0
      };

      events.forEach(event => {
        // Contar eventos por tipo
        activity.eventsByType[event.type] = (activity.eventsByType[event.type] || 0) + 1;
        
        // Repositorios activos
        if (event.repo) {
          activity.repositoriesActive.add(event.repo.name);
        }
        
        // Última actividad
        if (!activity.lastActivity || new Date(event.created_at) > new Date(activity.lastActivity)) {
          activity.lastActivity = event.created_at;
        }
        
        // Contar tipos específicos
        switch (event.type) {
          case 'PushEvent':
            activity.commitCount += event.payload.commits ? event.payload.commits.length : 0;
            break;
          case 'IssuesEvent':
            activity.issueCount++;
            break;
          case 'PullRequestEvent':
            activity.prCount++;
            break;
        }
      });

      activity.repositoriesActive = Array.from(activity.repositoriesActive);

      return activity;
    } catch (error) {
      console.warn('Error obteniendo actividad del usuario:', error);
      return null;
    }
  }

  /**
   * Busca repositorios
   * @param {string} query - Término de búsqueda
   * @param {Object} options - Opciones de búsqueda
   * @returns {Promise}
   */
  async searchRepositories(query, options = {}) {
    const {
      sort = 'stars', // stars, forks, help-wanted-issues, updated
      order = 'desc', // asc, desc
      per_page = 30,
      page = 1,
      language = null,
      user = null
    } = options;

    let searchQuery = query;
    
    if (language) searchQuery += ` language:${language}`;
    if (user) searchQuery += ` user:${user}`;

    const params = new URLSearchParams({
      q: searchQuery,
      sort,
      order,
      per_page: per_page.toString(),
      page: page.toString()
    });

    const data = await this.request(`/search/repositories?${params}`);
    
    return {
      totalCount: data.total_count,
      incompleteResults: data.incomplete_results,
      items: data.items.map(repo => ({
        id: repo.id,
        name: repo.name,
        fullName: repo.full_name,
        description: repo.description,
        url: repo.html_url,
        language: repo.language,
        stars: repo.stargazers_count,
        forks: repo.forks_count,
        updatedAt: repo.updated_at,
        owner: {
          username: repo.owner.login,
          avatar: repo.owner.avatar_url,
          url: repo.owner.html_url
        }
      }))
    };
  }

  /**
   * Actualiza información de rate limit
   * @param {Headers} headers - Headers de respuesta
   */
  updateRateLimit(headers) {
    this.config.rateLimit = {
      limit: parseInt(headers.get('X-RateLimit-Limit')) || null,
      remaining: parseInt(headers.get('X-RateLimit-Remaining')) || null,
      reset: parseInt(headers.get('X-RateLimit-Reset')) || null,
      used: parseInt(headers.get('X-RateLimit-Used')) || null
    };
  }

  /**
   * Obtiene información del rate limit
   * @returns {Object}
   */
  getRateLimit() {
    return {
      ...this.config.rateLimit,
      resetDate: this.config.rateLimit.reset ? 
        new Date(this.config.rateLimit.reset * 1000) : null
    };
  }

  /**
   * Verifica si hay suficientes requests disponibles
   * @param {number} requestsNeeded - Número de requests necesarios
   * @returns {boolean}
   */
  hasRemainingRequests(requestsNeeded = 1) {
    return this.config.rateLimit.remaining === null || 
           this.config.rateLimit.remaining >= requestsNeeded;
  }

  /**
   * Gestión de cache
   */
  getCachedData(key) {
    const cached = this.config.cache.data.get(key);
    if (cached && Date.now() - cached.timestamp < this.config.cache.duration) {
      return cached.data;
    }
    this.config.cache.data.delete(key);
    return null;
  }

  setCachedData(key, data) {
    this.config.cache.data.set(key, {
      data,
      timestamp: Date.now()
    });
  }

  clearCache() {
    this.config.cache.data.clear();
  }
}

/**
 * Instancia global de la API de GitHub
 */
let githubAPIInstance = null;

/**
 * Obtiene la instancia de la API de GitHub
 */
export function getGitHubAPI(config) {
  if (!githubAPIInstance) {
    githubAPIInstance = new GitHubAPI(config);
  }
  return githubAPIInstance;
}

/**
 * Utilidades para trabajar con datos de GitHub
 */
export const GitHubUtils = {
  /**
   * Formatea la fecha de GitHub
   */
  formatDate(dateString) {
    return new Date(dateString).toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  },

  /**
   * Formatea números grandes (K, M)
   */
  formatNumber(num) {
    if (num >= 1000000) {
      return (num / 1000000).toFixed(1) + 'M';
    }
    if (num >= 1000) {
      return (num / 1000).toFixed(1) + 'K';
    }
    return num.toString();
  },

  /**
   * Obtiene el color asociado a un lenguaje
   */
  getLanguageColor(language) {
    const colors = {
      JavaScript: '#f1e05a',
      TypeScript: '#2b7489',
      Python: '#3572A5',
      Java: '#b07219',
      'C++': '#f34b7d',
      'C#': '#239120',
      PHP: '#4F5D95',
      Ruby: '#701516',
      Go: '#00ADD8',
      Rust: '#dea584',
      Swift: '#ffac45',
      Kotlin: '#F18E33',
      Dart: '#00B4AB',
      HTML: '#e34c26',
      CSS: '#1572B6',
      Vue: '#2c3e50',
      React: '#61DAFB'
    };
    return colors[language] || '#586069';
  },

  /**
   * Extrae temas/topics relevantes
   */
  extractRelevantTopics(topics) {
    const techTopics = [
      'javascript', 'typescript', 'react', 'vue', 'angular', 'nodejs',
      'python', 'django', 'flask', 'java', 'spring', 'php', 'laravel',
      'csharp', 'dotnet', 'go', 'rust', 'swift', 'kotlin', 'dart',
      'flutter', 'mobile', 'web', 'api', 'frontend', 'backend',
      'fullstack', 'database', 'mongodb', 'postgresql', 'mysql',
      'docker', 'kubernetes', 'aws', 'azure', 'gcp', 'devops'
    ];

    return topics.filter(topic => 
      techTopics.includes(topic.toLowerCase()) ||
      topic.toLowerCase().includes('app') ||
      topic.toLowerCase().includes('framework') ||
      topic.toLowerCase().includes('library')
    );
  },

  /**
   * Calcula la puntuación de relevancia de un repositorio
   */
  calculateRepoScore(repo) {
    let score = 0;
    
    // Puntuación por estrellas
    score += Math.min(repo.stars * 2, 50);
    
    // Puntuación por forks
    score += Math.min(repo.forks * 3, 30);
    
    // Penalización por ser fork
    if (repo.isFork) score -= 20;
    
    // Penalización por estar archivado
    if (repo.isArchived) score -= 30;
    
    // Bonificación por tener descripción
    if (repo.description && repo.description.length > 20) score += 10;
    
    // Bonificación por tener homepage
    if (repo.homepage) score += 15;
    
    // Bonificación por topics relevantes
    score += this.extractRelevantTopics(repo.topics).length * 5;
    
    // Bonificación por actividad reciente (último mes)
    const oneMonthAgo = new Date();
    oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 1);
    if (new Date(repo.updatedAt) > oneMonthAgo) score += 10;
    
    return Math.max(score, 0);
  },

  /**
   * Ordena repositorios por relevancia
   */
  sortByRelevance(repositories) {
    return repositories
      .map(repo => ({
        ...repo,
        score: this.calculateRepoScore(repo)
      }))
      .sort((a, b) => b.score - a.score);
  },

  /**
   * Filtra repositorios destacados automáticamente
   */
  getAutoFeaturedRepos(repositories, maxCount = 6) {
    const sorted = this.sortByRelevance(repositories);
    return sorted
      .filter(repo => 
        !repo.isFork && 
        !repo.isArchived && 
        repo.score > 10
      )
      .slice(0, maxCount);
  },

  /**
   * Genera estadísticas del perfil
   */
  generateProfileStats(user, repositories) {
    const stats = {
      totalRepos: repositories.length,
      totalStars: repositories.reduce((sum, repo) => sum + repo.stars, 0),
      totalForks: repositories.reduce((sum, repo) => sum + repo.forks, 0),
      languages: {},
      mostStarredRepo: null,
      newestRepo: null,
      oldestRepo: null,
      averageStars: 0,
      forkedRepos: repositories.filter(repo => repo.isFork).length,
      originalRepos: repositories.filter(repo => !repo.isFork).length
    };

    // Calcular promedio de estrellas
    if (repositories.length > 0) {
      stats.averageStars = (stats.totalStars / repositories.length).toFixed(1);
    }

    // Encontrar repositorios destacados
    if (repositories.length > 0) {
      stats.mostStarredRepo = repositories.reduce((prev, current) => 
        (prev.stars > current.stars) ? prev : current
      );

      stats.newestRepo = repositories.reduce((prev, current) => 
        (new Date(prev.createdAt) > new Date(current.createdAt)) ? prev : current
      );

      stats.oldestRepo = repositories.reduce((prev, current) => 
        (new Date(prev.createdAt) < new Date(current.createdAt)) ? prev : current
      );
    }

    // Contar lenguajes
    repositories.forEach(repo => {
      if (repo.language) {
        stats.languages[repo.language] = (stats.languages[repo.language] || 0) + 1;
      }
    });

    return stats;
  }
};