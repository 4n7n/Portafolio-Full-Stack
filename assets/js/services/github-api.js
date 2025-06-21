export class GitHubAPI {
  constructor(config = {}) {
    this.config = {
      username: '',
      token: null, // Token personal opcional para mayor límite de rate
      baseURL: 'https://api.github.com',
      rateLimit: {
        remaining: null,
        reset: null,
        limit: null,
        used: null
      },
      cache: {
        enabled: true,
        duration: 5 * 60 * 1000, // 5 minutos
        data: new Map()
      },
      ...config
    };

    // Validar configuración básica
    if (this.config.token && typeof this.config.token !== 'string') {
      throw new Error('Token debe ser una cadena de texto');
    }
    
    if (this.config.username && typeof this.config.username !== 'string') {
      throw new Error('Username debe ser una cadena de texto');
    }
  }

  /**
   * Realiza una petición a la API de GitHub
   * @param {string} endpoint - Endpoint de la API
   * @param {Object} options - Opciones adicionales
   * @returns {Promise}
   */
  async request(endpoint, options = {}) {
    if (!endpoint || typeof endpoint !== 'string') {
      throw new Error('Endpoint es requerido y debe ser una cadena');
    }

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
      'User-Agent': 'Portfolio-App',
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

      if (response.status === 404) {
        throw new Error('Recurso no encontrado');
      }

      if (response.status === 403) {
        const remainingRequests = this.config.rateLimit.remaining;
        if (remainingRequests === 0) {
          const resetDate = new Date(this.config.rateLimit.reset * 1000);
          throw new Error(`Rate limit excedido. Se restablece en: ${resetDate.toLocaleString()}`);
        }
        throw new Error('Acceso prohibido. Verifica tu token de acceso');
      }

      if (response.status === 401) {
        throw new Error('Token de acceso inválido o expirado');
      }

      if (!response.ok) {
        throw new Error(`GitHub API Error: ${response.status} ${response.statusText}`);
      }

      const data = await response.json();

      // Guardar en cache
      if (this.config.cache.enabled && response.status === 200) {
        this.setCachedData(cacheKey, data);
      }

      return data;
    } catch (error) {
      if (error.name === 'TypeError' && error.message.includes('fetch')) {
        throw new Error('Error de conexión con GitHub API');
      }
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
    if (!user || typeof user !== 'string') {
      throw new Error('Username es requerido y debe ser una cadena');
    }

    const data = await this.request(`/users/${encodeURIComponent(user)}`);
    
    return {
      username: data.login,
      name: data.name || null,
      bio: data.bio || null,
      avatar: data.avatar_url,
      location: data.location || null,
      website: data.blog || null,
      company: data.company || null,
      email: data.email || null,
      followers: data.followers || 0,
      following: data.following || 0,
      publicRepos: data.public_repos || 0,
      createdAt: data.created_at,
      updatedAt: data.updated_at,
      twitterUsername: data.twitter_username || null,
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

    if (!username || typeof username !== 'string') {
      throw new Error('Username es requerido y debe ser una cadena');
    }

    // Validar parámetros
    const validTypes = ['owner', 'all', 'member'];
    const validSorts = ['created', 'updated', 'pushed', 'full_name'];
    const validDirections = ['asc', 'desc'];

    if (!validTypes.includes(type)) {
      throw new Error(`Tipo inválido. Debe ser uno de: ${validTypes.join(', ')}`);
    }

    if (!validSorts.includes(sort)) {
      throw new Error(`Sort inválido. Debe ser uno de: ${validSorts.join(', ')}`);
    }

    if (!validDirections.includes(direction)) {
      throw new Error(`Direction inválida. Debe ser: ${validDirections.join(' o ')}`);
    }

    const params = new URLSearchParams({
      type,
      sort,
      direction,
      per_page: Math.min(Math.max(per_page, 1), 100).toString(), // Limitar entre 1 y 100
      page: Math.max(page, 1).toString()
    });

    const data = await this.request(`/users/${encodeURIComponent(username)}/repos?${params}`);

    let repositories = data.map(repo => ({
      id: repo.id,
      name: repo.name,
      fullName: repo.full_name,
      description: repo.description || null,
      url: repo.html_url,
      cloneUrl: repo.clone_url,
      sshUrl: repo.ssh_url,
      homepage: repo.homepage || null,
      language: repo.language || null,
      languages: null, // Se carga por separado
      size: repo.size || 0,
      stars: repo.stargazers_count || 0,
      watchers: repo.watchers_count || 0,
      forks: repo.forks_count || 0,
      issues: repo.open_issues_count || 0,
      license: repo.license ? repo.license.name : null,
      isPrivate: repo.private || false,
      isFork: repo.fork || false,
      isArchived: repo.archived || false,
      isDisabled: repo.disabled || false,
      defaultBranch: repo.default_branch || 'main',
      createdAt: repo.created_at,
      updatedAt: repo.updated_at,
      pushedAt: repo.pushed_at || null,
      topics: repo.topics || [],
      hasPages: repo.has_pages || false,
      pagesUrl: repo.has_pages ? `https://${username}.github.io/${repo.name}` : null
    }));

    // Filtrar repositorios excluidos
    if (Array.isArray(exclude) && exclude.length > 0) {
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
    if (!username || !repo || typeof username !== 'string' || typeof repo !== 'string') {
      throw new Error('Username y repositorio son obligatorios y deben ser cadenas');
    }

    try {
      const [languages, commits, contributors] = await Promise.allSettled([
        this.getRepositoryLanguages(repo, username),
        this.getRepositoryCommits(repo, username, { per_page: 1 }),
        this.getRepositoryContributors(repo, username)
      ]);

      return {
        languages: languages.status === 'fulfilled' ? languages.value : {},
        totalCommits: commits.status === 'fulfilled' && commits.value.length > 0 ? 'Unknown' : 0,
        contributors: contributors.status === 'fulfilled' ? contributors.value.length : 0,
        lastCommit: commits.status === 'fulfilled' && commits.value.length > 0 ? 
          commits.value[0].commit.author.date : null
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
    if (!username || !repo) {
      throw new Error('Username y repositorio son obligatorios');
    }

    const data = await this.request(`/repos/${encodeURIComponent(username)}/${encodeURIComponent(repo)}/languages`);
    
    // Calcular porcentajes
    const total = Object.values(data).reduce((sum, bytes) => sum + bytes, 0);
    const languages = {};
    
    Object.entries(data).forEach(([language, bytes]) => {
      languages[language] = {
        bytes,
        percentage: total > 0 ? parseFloat(((bytes / total) * 100).toFixed(1)) : 0
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
    if (!username || !repo) {
      throw new Error('Username y repositorio son obligatorios');
    }

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
      per_page: Math.min(Math.max(per_page, 1), 100).toString(),
      page: Math.max(page, 1).toString()
    });

    if (sha) params.append('sha', sha);
    if (path) params.append('path', path);
    if (author) params.append('author', author);
    if (since) params.append('since', since);
    if (until) params.append('until', until);

    return await this.request(`/repos/${encodeURIComponent(username)}/${encodeURIComponent(repo)}/commits?${params}`);
  }

  /**
   * Obtiene los contribuidores de un repositorio
   * @param {string} repo - Nombre del repositorio
   * @param {string} username - Nombre de usuario
   * @returns {Promise}
   */
  async getRepositoryContributors(repo, username = this.config.username) {
    if (!username || !repo) {
      throw new Error('Username y repositorio son obligatorios');
    }

    return await this.request(`/repos/${encodeURIComponent(username)}/${encodeURIComponent(repo)}/contributors`);
  }

  /**
   * Obtiene el README de un repositorio
   * @param {string} repo - Nombre del repositorio
   * @param {string} username - Nombre de usuario
   * @returns {Promise}
   */
  async getRepositoryReadme(repo, username = this.config.username) {
    if (!username || !repo) {
      throw new Error('Username y repositorio son obligatorios');
    }

    try {
      const data = await this.request(`/repos/${encodeURIComponent(username)}/${encodeURIComponent(repo)}/readme`);
      
      // Decodificar contenido base64 de forma segura
      let content = '';
      try {
        if (typeof window !== 'undefined' && window.atob) {
          content = window.atob(data.content.replace(/\s/g, ''));
        } else if (typeof Buffer !== 'undefined') {
          content = Buffer.from(data.content, 'base64').toString('utf8');
        } else {
          content = 'Contenido no disponible en este entorno';
        }
      } catch (decodeError) {
        console.warn('Error decodificando README:', decodeError);
        content = 'Error decodificando contenido';
      }
      
      return {
        content,
        encoding: data.encoding,
        size: data.size,
        sha: data.sha,
        downloadUrl: data.download_url
      };
    } catch (error) {
      if (error.message.includes('404') || error.message.includes('no encontrado')) {
        console.warn(`README no encontrado para ${repo}`);
        return null;
      }
      throw error;
    }
  }

  /**
   * Obtiene las estadísticas de actividad del usuario
   * @param {string} username - Nombre de usuario
   * @returns {Promise}
   */
  async getUserActivity(username = this.config.username) {
    if (!username || typeof username !== 'string') {
      throw new Error('Username es requerido y debe ser una cadena');
    }

    try {
      const events = await this.request(`/users/${encodeURIComponent(username)}/events/public?per_page=100`);
      
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
        // Validar estructura del evento
        if (!event || typeof event !== 'object') return;

        // Contar eventos por tipo
        if (event.type) {
          activity.eventsByType[event.type] = (activity.eventsByType[event.type] || 0) + 1;
        }
        
        // Repositorios activos
        if (event.repo && event.repo.name) {
          activity.repositoriesActive.add(event.repo.name);
        }
        
        // Última actividad
        if (event.created_at && (!activity.lastActivity || new Date(event.created_at) > new Date(activity.lastActivity))) {
          activity.lastActivity = event.created_at;
        }
        
        // Contar tipos específicos
        switch (event.type) {
          case 'PushEvent':
            if (event.payload && event.payload.commits) {
              activity.commitCount += event.payload.commits.length;
            }
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
      return {
        totalEvents: 0,
        eventsByType: {},
        repositoriesActive: [],
        lastActivity: null,
        commitCount: 0,
        issueCount: 0,
        prCount: 0
      };
    }
  }

  /**
   * Busca repositorios
   * @param {string} query - Término de búsqueda
   * @param {Object} options - Opciones de búsqueda
   * @returns {Promise}
   */
  async searchRepositories(query, options = {}) {
    if (!query || typeof query !== 'string') {
      throw new Error('Query de búsqueda es requerido y debe ser una cadena');
    }

    const {
      sort = 'stars', // stars, forks, help-wanted-issues, updated
      order = 'desc', // asc, desc
      per_page = 30,
      page = 1,
      language = null,
      user = null
    } = options;

    // Validar parámetros
    const validSorts = ['stars', 'forks', 'help-wanted-issues', 'updated'];
    const validOrders = ['asc', 'desc'];

    if (!validSorts.includes(sort)) {
      throw new Error(`Sort inválido. Debe ser uno de: ${validSorts.join(', ')}`);
    }

    if (!validOrders.includes(order)) {
      throw new Error(`Order inválido. Debe ser: ${validOrders.join(' o ')}`);
    }

    let searchQuery = query.trim();
    
    if (language) searchQuery += ` language:${language}`;
    if (user) searchQuery += ` user:${user}`;

    const params = new URLSearchParams({
      q: searchQuery,
      sort,
      order,
      per_page: Math.min(Math.max(per_page, 1), 100).toString(),
      page: Math.max(page, 1).toString()
    });

    const data = await this.request(`/search/repositories?${params}`);
    
    return {
      totalCount: data.total_count || 0,
      incompleteResults: data.incomplete_results || false,
      items: (data.items || []).map(repo => ({
        id: repo.id,
        name: repo.name,
        fullName: repo.full_name,
        description: repo.description || null,
        url: repo.html_url,
        language: repo.language || null,
        stars: repo.stargazers_count || 0,
        forks: repo.forks_count || 0,
        updatedAt: repo.updated_at,
        owner: {
          username: repo.owner ? repo.owner.login : null,
          avatar: repo.owner ? repo.owner.avatar_url : null,
          url: repo.owner ? repo.owner.html_url : null
        }
      }))
    };
  }

  /**
   * Actualiza información de rate limit
   * @param {Headers} headers - Headers de respuesta
   */
  updateRateLimit(headers) {
    if (!headers) return;

    this.config.rateLimit = {
      limit: this.parseHeaderInt(headers.get('X-RateLimit-Limit')),
      remaining: this.parseHeaderInt(headers.get('X-RateLimit-Remaining')),
      reset: this.parseHeaderInt(headers.get('X-RateLimit-Reset')),
      used: this.parseHeaderInt(headers.get('X-RateLimit-Used'))
    };
  }

  /**
   * Parsea un header como entero de forma segura
   * @param {string} value - Valor del header
   * @returns {number|null}
   */
  parseHeaderInt(value) {
    if (!value) return null;
    const parsed = parseInt(value, 10);
    return isNaN(parsed) ? null : parsed;
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
    if (typeof requestsNeeded !== 'number' || requestsNeeded < 0) {
      return false;
    }
    
    return this.config.rateLimit.remaining === null || 
           this.config.rateLimit.remaining >= requestsNeeded;
  }

  /**
   * Gestión de cache
   */
  getCachedData(key) {
    if (!key || !this.config.cache.data) return null;
    
    const cached = this.config.cache.data.get(key);
    if (cached && cached.timestamp && Date.now() - cached.timestamp < this.config.cache.duration) {
      return cached.data;
    }
    
    this.config.cache.data.delete(key);
    return null;
  }

  setCachedData(key, data) {
    if (!key || !this.config.cache.data) return;
    
    this.config.cache.data.set(key, {
      data,
      timestamp: Date.now()
    });
  }

  clearCache() {
    if (this.config.cache.data) {
      this.config.cache.data.clear();
    }
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
  if (!githubAPIInstance || config) {
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
    if (!dateString) return 'Fecha no disponible';
    
    try {
      return new Date(dateString).toLocaleDateString('es-ES', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });
    } catch (error) {
      console.warn('Error formateando fecha:', error);
      return 'Fecha inválida';
    }
  },

  /**
   * Formatea números grandes (K, M)
   */
  formatNumber(num) {
    if (typeof num !== 'number' || isNaN(num)) return '0';
    
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
    if (!language || typeof language !== 'string') return '#586069';
    
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
      React: '#61DAFB',
      Svelte: '#ff3e00',
      Angular: '#dd0031'
    };
    return colors[language] || '#586069';
  },

  /**
   * Extrae temas/topics relevantes
   */
  extractRelevantTopics(topics) {
    if (!Array.isArray(topics)) return [];
    
    const techTopics = [
      'javascript', 'typescript', 'react', 'vue', 'angular', 'svelte', 'nodejs',
      'python', 'django', 'flask', 'fastapi', 'java', 'spring', 'php', 'laravel',
      'csharp', 'dotnet', 'go', 'rust', 'swift', 'kotlin', 'dart',
      'flutter', 'mobile', 'web', 'api', 'frontend', 'backend',
      'fullstack', 'database', 'mongodb', 'postgresql', 'mysql',
      'docker', 'kubernetes', 'aws', 'azure', 'gcp', 'devops',
      'machine-learning', 'ai', 'data-science', 'blockchain'
    ];

    return topics.filter(topic => {
      if (!topic || typeof topic !== 'string') return false;
      const lowerTopic = topic.toLowerCase();
      return techTopics.includes(lowerTopic) ||
        lowerTopic.includes('app') ||
        lowerTopic.includes('framework') ||
        lowerTopic.includes('library') ||
        lowerTopic.includes('tool');
    });
  },

  /**
   * Calcula la puntuación de relevancia de un repositorio
   */
  calculateRepoScore(repo) {
    if (!repo || typeof repo !== 'object') return 0;
    
    let score = 0;
    
    // Puntuación por estrellas
    const stars = repo.stars || 0;
    score += Math.min(stars * 2, 50);
    
    // Puntuación por forks
    const forks = repo.forks || 0;
    score += Math.min(forks * 3, 30);
    
    // Penalización por ser fork
    if (repo.isFork) score -= 20;
    
    // Penalización por estar archivado
    if (repo.isArchived) score -= 30;
    
    // Bonificación por tener descripción
    if (repo.description && repo.description.length > 20) score += 10;
    
    // Bonificación por tener homepage
    if (repo.homepage) score += 15;
    
    // Bonificación por topics relevantes
    const relevantTopics = this.extractRelevantTopics(repo.topics || []);
    score += relevantTopics.length * 5;
    
    // Bonificación por actividad reciente (último mes)
    if (repo.updatedAt) {
      try {
        const oneMonthAgo = new Date();
        oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 1);
        if (new Date(repo.updatedAt) > oneMonthAgo) score += 10;
      } catch (error) {
        console.warn('Error calculando actividad reciente:', error);
      }
    }
    
    return Math.max(score, 0);
  },

  /**
   * Ordena repositorios por relevancia
   */
  sortByRelevance(repositories) {
    if (!Array.isArray(repositories)) return [];
    
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
    if (!Array.isArray(repositories)) return [];
    
    const sorted = this.sortByRelevance(repositories);
    return sorted
      .filter(repo => 
        !repo.isFork && 
        !repo.isArchived && 
        repo.score > 10
      )
      .slice(0, Math.max(maxCount, 1));
  },

  /**
   * Genera estadísticas del perfil
   */
  generateProfileStats(user, repositories) {
    if (!Array.isArray(repositories)) repositories = [];
    
    const stats = {
      totalRepos: repositories.length,
      totalStars: repositories.reduce((sum, repo) => sum + (repo.stars || 0), 0),
      totalForks: repositories.reduce((sum, repo) => sum + (repo.forks || 0), 0),
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
      stats.averageStars = parseFloat((stats.totalStars / repositories.length).toFixed(1));
    }

    // Encontrar repositorios destacados
    if (repositories.length > 0) {
      try {
        stats.mostStarredRepo = repositories.reduce((prev, current) => 
          ((prev.stars || 0) > (current.stars || 0)) ? prev : current
        );

        stats.newestRepo = repositories.reduce((prev, current) => {
          const prevDate = new Date(prev.createdAt || 0);
          const currentDate = new Date(current.createdAt || 0);
          return prevDate > currentDate ? prev : current;
        });

        stats.oldestRepo = repositories.reduce((prev, current) => {
          const prevDate = new Date(prev.createdAt || Date.now());
          const currentDate = new Date(current.createdAt || Date.now());
          return prevDate < currentDate ? prev : current;
        });
      } catch (error) {
        console.warn('Error calculando estadísticas de repositorios:', error);
      }
    }

    // Contar lenguajes
    repositories.forEach(repo => {
      if (repo.language && typeof repo.language === 'string') {
        stats.languages[repo.language] = (stats.languages[repo.language] || 0) + 1;
      }
    });

    return stats;
  }
};