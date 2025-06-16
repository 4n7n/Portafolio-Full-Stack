
import { DOMHelpers } from '../utils/dom-helpers.js';
import { SKILLS_DATA } from '../data/skills.js';

export class SkillsChart {
  constructor(containerSelector = '#skills-section') {
    this.container = DOMHelpers.select(containerSelector);
    this.currentView = 'bars'; // bars, radar, circular, grid
    this.currentCategory = 'all';
    this.animatedSkills = new Set();
    this.isInitialized = false;

    this.init();
  }

  /**
   * Inicializa el componente
   */
  init() {
    if (!this.container || this.isInitialized) return;

    this.render();
    this.setupEventListeners();
    this.setupAnimations();
    this.isInitialized = true;
  }

  /**
   * Renderiza la sección de habilidades completa
   */
  render() {
    this.container.innerHTML = `
      <div class="skills-container">
        <!-- Header de la sección -->
        <div class="skills-header">
          <div class="skills-intro">
            <h2 class="skills-title" data-animate="fadeUp">Mis Habilidades</h2>
            <p class="skills-description" data-animate="fadeUp" data-delay="200">
              Tecnologías y herramientas que domino para crear soluciones web modernas y efectivas.
            </p>
          </div>

          <!-- Controles de vista -->
          <div class="skills-controls" data-animate="fadeUp" data-delay="400">
            <div class="view-toggles">
              <button class="view-toggle active" data-view="bars" title="Vista de barras">
                <i class="icon-bar-chart"></i>
              </button>
              <button class="view-toggle" data-view="circular" title="Vista circular">
                <i class="icon-pie-chart"></i>
              </button>
              <button class="view-toggle" data-view="grid" title="Vista de grilla">
                <i class="icon-grid"></i>
              </button>
              <button class="view-toggle" data-view="radar" title="Vista radar">
                <i class="icon-target"></i>
              </button>
            </div>

            <!-- Filtros de categoría -->
            <div class="category-filters">
              <button class="category-filter active" data-category="all">Todas</button>
              <button class="category-filter" data-category="frontend">Frontend</button>
              <button class="category-filter" data-category="backend">Backend</button>
              <button class="category-filter" data-category="database">Database</button>
              <button class="category-filter" data-category="tools">Tools</button>
            </div>
          </div>
        </div>

        <!-- Contenido principal -->
        <div class="skills-content">
          <!-- Habilidades técnicas -->
          <div class="technical-skills">
            ${this.renderTechnicalSkills()}
          </div>

          <!-- Habilidades blandas -->
          <div class="soft-skills" data-animate="fadeUp" data-delay="600">
            <h3 class="section-subtitle">Habilidades Interpersonales</h3>
            <div class="soft-skills-grid">
              ${this.renderSoftSkills()}
            </div>
          </div>

          <!-- Idiomas -->
          <div class="languages-skills" data-animate="fadeUp" data-delay="800">
            <h3 class="section-subtitle">Idiomas</h3>
            <div class="languages-list">
              ${this.renderLanguages()}
            </div>
          </div>

          <!-- Certificaciones -->
          <div class="certifications" data-animate="fadeUp" data-delay="1000">
            <h3 class="section-subtitle">Certificaciones</h3>
            <div class="certifications-grid">
              ${this.renderCertifications()}
            </div>
          </div>
        </div>

        <!-- Estadísticas generales -->
        <div class="skills-stats" data-animate="fadeUp" data-delay="1200">
          ${this.renderSkillsStats()}
        </div>
      </div>
    `;
  }

  /**
   * Renderiza habilidades técnicas
   */
  renderTechnicalSkills() {
    return `
      <div class="technical-skills-header">
        <h3 class="section-subtitle">Habilidades Técnicas</h3>
        <div class="skills-legend">
          <span class="legend-item">
            <span class="legend-color beginner"></span>
            Principiante (0-40%)
          </span>
          <span class="legend-item">
            <span class="legend-color intermediate"></span>
            Intermedio (41-70%)
          </span>
          <span class="legend-item">
            <span class="legend-color advanced"></span>
            Avanzado (71-100%)
          </span>
        </div>
      </div>
      <div class="skills-visualization" id="skills-viz">
        ${this.renderSkillsVisualization()}
      </div>
    `;
  }

  /**
   * Renderiza la visualización de habilidades según la vista actual
   */
  renderSkillsVisualization() {
    switch (this.currentView) {
      case 'bars':
        return this.renderBarsView();
      case 'circular':
        return this.renderCircularView();
      case 'grid':
        return this.renderGridView();
      case 'radar':
        return this.renderRadarView();
      default:
        return this.renderBarsView();
    }
  }

  /**
   * Renderiza vista de barras
   */
  renderBarsView() {
    const categories = this.getFilteredCategories();
    
    return `
      <div class="skills-bars-container">
        ${categories.map((category, categoryIndex) => `
          <div class="skill-category" 
               data-category="${category.id}"
               data-animate="fadeUp" 
               data-delay="${categoryIndex * 200}">
            <h4 class="category-title">
              <i class="icon-${category.icon}"></i>
              ${category.title}
            </h4>
            <div class="skills-list">
              ${category.skills.map((skill, skillIndex) => `
                <div class="skill-item" data-skill-level="${this.getSkillLevel(skill.level)}">
                  <div class="skill-header">
                    <span class="skill-name">${skill.name}</span>
                    <span class="skill-percentage">${skill.level}%</span>
                    <span class="skill-experience">${skill.experience}</span>
                  </div>
                  <div class="skill-bar">
                    <div class="skill-fill" 
                         data-progress="${skill.level}"
                         data-color="${skill.color}"
                         style="--skill-color: ${skill.color}">
                    </div>
                  </div>
                </div>
              `).join('')}
            </div>
          </div>
        `).join('')}
      </div>
    `;
  }

  /**
   * Renderiza vista circular
   */
  renderCircularView() {
    const categories = this.getFilteredCategories();
    
    return `
      <div class="skills-circular-container">
        ${categories.map(category => `
          <div class="category-circle" data-category="${category.id}">
            <h4 class="category-title">${category.title}</h4>
            <div class="circular-skills">
              ${category.skills.map(skill => `
                <div class="circular-skill" data-skill-level="${this.getSkillLevel(skill.level)}">
                  <div class="circular-progress" data-progress="${skill.level}">
                    <svg width="120" height="120">
                      <circle cx="60" cy="60" r="50" 
                              stroke="#e0e0e0" 
                              stroke-width="8" 
                              fill="transparent"/>
                      <circle cx="60" cy="60" r="50" 
                              stroke="${skill.color}" 
                              stroke-width="8" 
                              fill="transparent"
                              class="progress-circle"
                              stroke-dasharray="314.16"
                              stroke-dashoffset="314.16"/>
                    </svg>
                    <div class="skill-info">
                      <span class="skill-name">${skill.name}</span>
                      <span class="skill-level">${skill.level}%</span>
                    </div>
                  </div>
                </div>
              `).join('')}
            </div>
          </div>
        `).join('')}
      </div>
    `;
  }

  /**
   * Renderiza vista de grilla
   */
  renderGridView() {
    const allSkills = this.getAllSkills();
    
    return `
      <div class="skills-grid-container">
        ${allSkills.map(skill => `
          <div class="skill-card" 
               data-skill-level="${this.getSkillLevel(skill.level)}"
               data-animate="scaleIn">
            <div class="skill-icon" style="background: ${skill.color}20">
              <i class="icon-${skill.icon || 'code'}"></i>
            </div>
            <h5 class="skill-name">${skill.name}</h5>
            <div class="skill-mini-bar">
              <div class="skill-mini-fill" 
                   data-progress="${skill.level}"
                   style="background: ${skill.color}"></div>
            </div>
            <span class="skill-percentage">${skill.level}%</span>
            <span class="skill-experience">${skill.experience}</span>
          </div>
        `).join('')}
      </div>
    `;
  }

  /**
   * Renderiza vista radar
   */
  renderRadarView() {
    const categories = this.getFilteredCategories();
    
    return `
      <div class="skills-radar-container">
        <div class="radar-chart-wrapper">
          <canvas id="skills-radar-canvas" width="400" height="400"></canvas>
          <div class="radar-legend">
            ${categories.map(category => `
              <div class="radar-legend-item">
                <span class="legend-color" style="background: ${this.getCategoryColor(category.id)}"></span>
                <span class="legend-label">${category.title}</span>
              </div>
            `).join('')}
          </div>
        </div>
        <div class="radar-details">
          <h4>Detalles por Categoría</h4>
          <div class="category-details">
            ${categories.map(category => `
              <div class="category-detail">
                <h5>${category.title}</h5>
                <div class="category-average">
                  Promedio: <strong>${this.calculateCategoryAverage(category)}%</strong>
                </div>
                <div class="top-skills">
                  Top skills: ${this.getTopSkills(category, 3).map(skill => skill.name).join(', ')}
                </div>
              </div>
            `).join('')}
          </div>
        </div>
      </div>
    `;
  }

  /**
   * Renderiza habilidades blandas
   */
  renderSoftSkills() {
    return SKILLS_DATA.soft.map(skill => `
      <div class="soft-skill-item" data-animate="fadeUp">
        <div class="soft-skill-header">
          <div class="soft-skill-icon">
            <i class="icon-${skill.icon}"></i>
          </div>
          <div class="soft-skill-info">
            <h5 class="soft-skill-name">${skill.name}</h5>
            <p class="soft-skill-description">${skill.description}</p>
          </div>
        </div>
        <div class="soft-skill-rating">
          <div class="rating-stars">
            ${this.renderStars(skill.level)}
          </div>
          <span class="rating-value">${skill.level}%</span>
        </div>
      </div>
    `).join('');
  }

  /**
   * Renderiza idiomas
   */
  renderLanguages() {
    return SKILLS_DATA.languages.map(language => `
      <div class="language-item" data-animate="fadeLeft">
        <div class="language-flag">${language.flag}</div>
        <div class="language-info">
          <h5 class="language-name">${language.name}</h5>
          <span class="language-level">${language.level}</span>
        </div>
        <div class="language-progress">
          <div class="language-bar">
            <div class="language-fill" data-progress="${language.proficiency}"></div>
          </div>
          <span class="language-percentage">${language.proficiency}%</span>
        </div>
      </div>
    `).join('');
  }

  /**
   * Renderiza certificaciones
   */
  renderCertifications() {
    return SKILLS_DATA.certifications.map(cert => `
      <div class="certification-item" data-animate="scaleIn">
        <div class="cert-badge">
          ${cert.badge ? `<img src="${cert.badge}" alt="${cert.name}" loading="lazy">` : 
            '<i class="icon-award"></i>'}
        </div>
        <div class="cert-info">
          <h5 class="cert-name">${cert.name}</h5>
          <p class="cert-issuer">${cert.issuer}</p>
          <span class="cert-date">${cert.date}</span>
        </div>
        <div class="cert-actions">
          ${cert.url ? `
            <a href="${cert.url}" 
               target="_blank" 
               rel="noopener noreferrer" 
               class="cert-link"
               title="Ver certificado">
              <i class="icon-external-link"></i>
            </a>
          ` : ''}
        </div>
      </div>
    `).join('');
  }

  /**
   * Renderiza estadísticas de habilidades
   */
  renderSkillsStats() {
    const stats = this.calculateSkillsStats();
    
    return `
      <div class="stats-grid">
        <div class="stat-item" data-animate="fadeUp">
          <div class="stat-icon">
            <i class="icon-code"></i>
          </div>
          <div class="stat-info">
            <span class="stat-number" data-counter="${stats.totalSkills}">0</span>
            <span class="stat-label">Tecnologías</span>
          </div>
        </div>
        
        <div class="stat-item" data-animate="fadeUp" data-delay="100">
          <div class="stat-icon">
            <i class="icon-trending-up"></i>
          </div>
          <div class="stat-info">
            <span class="stat-number" data-counter="${stats.averageLevel}">0</span>
            <span class="stat-label">% Promedio</span>
          </div>
        </div>
        
        <div class="stat-item" data-animate="fadeUp" data-delay="200">
          <div class="stat-icon">
            <i class="icon-award"></i>
          </div>
          <div class="stat-info">
            <span class="stat-number" data-counter="${stats.expertSkills}">0</span>
            <span class="stat-label">Skills Avanzadas</span>
          </div>
        </div>
        
        <div class="stat-item" data-animate="fadeUp" data-delay="300">
          <div class="stat-icon">
            <i class="icon-globe"></i>
          </div>
          <div class="stat-info">
            <span class="stat-number" data-counter="${stats.languages}">0</span>
            <span class="stat-label">Idiomas</span>
          </div>
        </div>
      </div>
    `;
  }

  /**
   * Configura event listeners
   */
  setupEventListeners() {
    // Cambio de vista
    const viewToggles = this.container.querySelectorAll('.view-toggle');
    viewToggles.forEach(toggle => {
      toggle.addEventListener('click', () => {
        const view = toggle.dataset.view;
        this.changeView(view);
        
        // Actualizar estado activo
        viewToggles.forEach(t => t.classList.remove('active'));
        toggle.classList.add('active');
      });
    });

    // Filtros de categoría
    const categoryFilters = this.container.querySelectorAll('.category-filter');
    categoryFilters.forEach(filter => {
      filter.addEventListener('click', () => {
        const category = filter.dataset.category;
        this.filterByCategory(category);
        
        // Actualizar estado activo
        categoryFilters.forEach(f => f.classList.remove('active'));
        filter.classList.add('active');
      });
    });

    // Hover effects en skill cards
    this.setupSkillInteractions();
  }

  /**
   * Configura interacciones con las skills
   */
  setupSkillInteractions() {
    const skillItems = this.container.querySelectorAll('.skill-item, .skill-card');
    
    skillItems.forEach(item => {
      item.addEventListener('mouseenter', () => {
        this.highlightSkill(item);
      });
      
      item.addEventListener('mouseleave', () => {
        this.unhighlightSkill(item);
      });
    });
  }

  /**
   * Configura animaciones
   */
  setupAnimations() {
    // Intersection Observer para animar skills cuando entran en vista
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          this.animateSkillsSection(entry.target);
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.2
    });

    observer.observe(this.container);

    // Animar barras de progreso al aparecer
    this.setupProgressAnimations();
  }

  /**
   * Configura animaciones de progreso
   */
  setupProgressAnimations() {
    const progressObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && !this.animatedSkills.has(entry.target)) {
          this.animateProgressBar(entry.target);
          this.animatedSkills.add(entry.target);
        }
      });
    }, {
      threshold: 0.5
    });

    // Observar barras de progreso
    const progressBars = this.container.querySelectorAll('[data-progress]');
    progressBars.forEach(bar => progressObserver.observe(bar));
  }

  /**
   * Anima una barra de progreso
   */
  animateProgressBar(element) {
    const progress = parseInt(element.dataset.progress);
    const duration = 1500;
    let currentProgress = 0;
    const increment = progress / (duration / 16);

    const animate = () => {
      currentProgress += increment;
      
      if (currentProgress >= progress) {
        currentProgress = progress;
      }

      // Aplicar progreso según el tipo de elemento
      if (element.classList.contains('skill-fill')) {
        element.style.width = `${currentProgress}%`;
      } else if (element.classList.contains('progress-circle')) {
        const circumference = 314.16;
        const offset = circumference - (currentProgress / 100) * circumference;
        element.style.strokeDashoffset = offset;
      } else if (element.classList.contains('language-fill')) {
        element.style.width = `${currentProgress}%`;
      } else if (element.classList.contains('skill-mini-fill')) {
        element.style.width = `${currentProgress}%`;
      }

      if (currentProgress < progress) {
        requestAnimationFrame(animate);
      }
    };

    animate();
  }

  /**
   * Anima la sección de skills
   */
  animateSkillsSection(section) {
    // Animar radar chart si está visible
    if (this.currentView === 'radar') {
      this.animateRadarChart();
    }

    // Trigger para otras animaciones
    window.dispatchEvent(new CustomEvent('skillsSectionVisible'));
  }

  /**
   * Anima el gráfico radar
   */
  animateRadarChart() {
    const canvas = this.container.querySelector('#skills-radar-canvas');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    const categories = this.getFilteredCategories();
    
    this.drawRadarChart(ctx, categories);
  }

  /**
   * Dibuja el gráfico radar
   */
  drawRadarChart(ctx, categories) {
    const centerX = 200;
    const centerY = 200;
    const radius = 150;
    const levels = 5;

    // Limpiar canvas
    ctx.clearRect(0, 0, 400, 400);

    // Dibujar grid del radar
    ctx.strokeStyle = '#e0e0e0';
    ctx.lineWidth = 1;

    // Círculos concéntricos
    for (let i = 1; i <= levels; i++) {
      ctx.beginPath();
      ctx.arc(centerX, centerY, (radius / levels) * i, 0, 2 * Math.PI);
      ctx.stroke();
    }

    // Líneas radiales
    const angleStep = (2 * Math.PI) / categories.length;
    categories.forEach((category, index) => {
      const angle = index * angleStep - Math.PI / 2;
      const x = centerX + Math.cos(angle) * radius;
      const y = centerY + Math.sin(angle) * radius;
      
      ctx.beginPath();
      ctx.moveTo(centerX, centerY);
      ctx.lineTo(x, y);
      ctx.stroke();

      // Etiquetas
      ctx.fillStyle = '#333';
      ctx.font = '12px Arial';
      ctx.textAlign = 'center';
      const labelX = centerX + Math.cos(angle) * (radius + 20);
      const labelY = centerY + Math.sin(angle) * (radius + 20);
      ctx.fillText(category.title, labelX, labelY);
    });

    // Dibujar datos
    const averages = categories.map(cat => this.calculateCategoryAverage(cat));
    
    ctx.strokeStyle = 'var(--primary-color)';
    ctx.fillStyle = 'rgba(var(--primary-color-rgb), 0.2)';
    ctx.lineWidth = 2;
    
    ctx.beginPath();
    averages.forEach((avg, index) => {
      const angle = index * angleStep - Math.PI / 2;
      const distance = (avg / 100) * radius;
      const x = centerX + Math.cos(angle) * distance;
      const y = centerY + Math.sin(angle) * distance;
      
      if (index === 0) {
        ctx.moveTo(x, y);
      } else {
        ctx.lineTo(x, y);
      }
    });
    ctx.closePath();
    ctx.fill();
    ctx.stroke();

    // Puntos de datos
    ctx.fillStyle = 'var(--primary-color)';
    averages.forEach((avg, index) => {
      const angle = index * angleStep - Math.PI / 2;
      const distance = (avg / 100) * radius;
      const x = centerX + Math.cos(angle) * distance;
      const y = centerY + Math.sin(angle) * distance;
      
      ctx.beginPath();
      ctx.arc(x, y, 4, 0, 2 * Math.PI);
      ctx.fill();
    });
  }

  /**
   * Cambia la vista de visualización
   */
  changeView(newView) {
    this.currentView = newView;
    const vizContainer = this.container.querySelector('#skills-viz');
    
    // Fade out
    vizContainer.style.opacity = '0';
    
    setTimeout(() => {
      vizContainer.innerHTML = this.renderSkillsVisualization();
      this.setupProgressAnimations();
      this.setupSkillInteractions();
      
      // Fade in
      vizContainer.style.opacity = '1';
      
      // Animar radar si es necesario
      if (newView === 'radar') {
        setTimeout(() => this.animateRadarChart(), 100);
      }
    }, 300);
  }

  /**
   * Filtra por categoría
   */
  filterByCategory(category) {
    this.currentCategory = category;
    this.changeView(this.currentView);
  }

  /**
   * Funciones auxiliares
   */
  
  getFilteredCategories() {
    const categories = Object.entries(SKILLS_DATA.technical);
    
    if (this.currentCategory === 'all') {
      return categories.map(([id, data]) => ({ id, ...data }));
    } else {
      return categories
        .filter(([id]) => id === this.currentCategory)
        .map(([id, data]) => ({ id, ...data }));
    }
  }

  getAllSkills() {
    const allSkills = [];
    const categories = this.getFilteredCategories();
    
    categories.forEach(category => {
      allSkills.push(...category.skills);
    });
    
    return allSkills.sort((a, b) => b.level - a.level);
  }

  getSkillLevel(level) {
    if (level <= 40) return 'beginner';
    if (level <= 70) return 'intermediate';
    return 'advanced';
  }

  getCategoryColor(categoryId) {
    const colors = {
      frontend: '#61DAFB',
      backend: '#68A063',
      database: '#336791',
      tools: '#FF6B35'
    };
    return colors[categoryId] || '#666';
  }

  calculateCategoryAverage(category) {
    const total = category.skills.reduce((sum, skill) => sum + skill.level, 0);
    return Math.round(total / category.skills.length);
  }

  getTopSkills(category, count = 3) {
    return category.skills
      .sort((a, b) => b.level - a.level)
      .slice(0, count);
  }

  renderStars(level) {
    const maxStars = 5;
    const filledStars = Math.round((level / 100) * maxStars);
    
    return Array.from({ length: maxStars }, (_, index) => {
      const filled = index < filledStars;
      return `<i class="icon-star ${filled ? 'filled' : 'empty'}"></i>`;
    }).join('');
  }

  calculateSkillsStats() {
    const allSkills = this.getAllSkills();
    const totalLevel = allSkills.reduce((sum, skill) => sum + skill.level, 0);
    
    return {
      totalSkills: allSkills.length,
      averageLevel: Math.round(totalLevel / allSkills.length),
      expertSkills: allSkills.filter(skill => skill.level >= 80).length,
      languages: SKILLS_DATA.languages.length
    };
  }

  highlightSkill(skillElement) {
    skillElement.style.transform = 'translateY(-5px)';
    skillElement.style.boxShadow = '0 10px 25px rgba(0,0,0,0.1)';
  }

  unhighlightSkill(skillElement) {
    skillElement.style.transform = 'translateY(0)';
    skillElement.style.boxShadow = '';
  }

  /**
   * Métodos públicos
   */

  refreshData() {
    this.render();
    this.setupEventListeners();
    this.setupAnimations();
  }

  exportSkillsData() {
    return {
      technical: this.getAllSkills(),
      soft: SKILLS_DATA.soft,
      languages: SKILLS_DATA.languages,
      certifications: SKILLS_DATA.certifications,
      stats: this.calculateSkillsStats()
    };
  }

  getSkillByName(name) {
    return this.getAllSkills().find(skill => 
      skill.name.toLowerCase() === name.toLowerCase()
    );
  }

  destroy() {
    this.animatedSkills.clear();
    this.isInitialized = false;
  }
}

// Auto-inicialización
DOMHelpers.ready(() => {
  const skillsContainer = DOMHelpers.select('#skills-section');
  if (skillsContainer) {
    window.skillsChartInstance = new SkillsChart('#skills-section');
  }
});