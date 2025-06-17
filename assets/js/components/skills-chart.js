// assets/js/components/skills-chart.js
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
            <h2 class="skills-title" data-animate="fadeUp">Mis Habilidades Técnicas</h2>
            <p class="skills-description" data-animate="fadeUp" data-delay="200">
              Stack MERN y tecnologías aprendidas en el Bootcamp Full Stack de The Bridge (480 horas)
            </p>
          </div>

          <!-- Controles de vista -->
          <div class="skills-controls" data-animate="fadeUp" data-delay="400">
            <div class="view-toggles">
              <button class="view-toggle active" data-view="bars" title="Vista de barras">
                <i class="icon-bar-chart"></i>
                <span>Barras</span>
              </button>
              <button class="view-toggle" data-view="circular" title="Vista circular">
                <i class="icon-pie-chart"></i>
                <span>Circular</span>
              </button>
              <button class="view-toggle" data-view="grid" title="Vista de grilla">
                <i class="icon-grid"></i>
                <span>Grid</span>
              </button>
              <button class="view-toggle" data-view="radar" title="Vista radar">
                <i class="icon-target"></i>
                <span>Radar</span>
              </button>
            </div>

            <!-- Filtros de categoría -->
            <div class="category-filters">
              <button class="category-filter active" data-category="all">Todas</button>
              <button class="category-filter" data-category="frontend">Frontend</button>
              <button class="category-filter" data-category="backend">Backend</button>
              <button class="category-filter" data-category="database">Database</button>
              <button class="category-filter" data-category="devops">DevOps</button>
              <button class="category-filter" data-category="tools">Tools</button>
            </div>
          </div>
        </div>

        <!-- Certificación The Bridge -->
        <div class="bootcamp-highlight" data-animate="fadeUp" data-delay="300">
          ${this.renderBootcampInfo()}
        </div>

        <!-- Contenido principal -->
        <div class="skills-content">
          <!-- Habilidades técnicas -->
          <div class="technical-skills">
            ${this.renderTechnicalSkills()}
          </div>

          <!-- Habilidades blandas -->
          <div class="soft-skills" data-animate="fadeUp" data-delay="600">
            <h3 class="section-subtitle">
              <i class="icon-users"></i>
              Habilidades Interpersonales
            </h3>
            <div class="soft-skills-grid">
              ${this.renderSoftSkills()}
            </div>
          </div>

          <!-- Idiomas -->
          <div class="languages-skills" data-animate="fadeUp" data-delay="800">
            <h3 class="section-subtitle">
              <i class="icon-globe"></i>
              Idiomas
            </h3>
            <div class="languages-list">
              ${this.renderLanguages()}
            </div>
          </div>

          <!-- Certificación oficial -->
          <div class="certification-section" data-animate="fadeUp" data-delay="1000">
            <h3 class="section-subtitle">
              <i class="icon-award"></i>
              Certificación Oficial
            </h3>
            ${this.renderCertification()}
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
   * Renderiza información destacada del bootcamp
   */
  renderBootcampInfo() {
    const bootcamp = SKILLS_DATA.bootcamp;
    
    return `
      <div class="bootcamp-card">
        <div class="bootcamp-logo">
          <img src="${bootcamp.logo}" alt="${bootcamp.institution}" loading="lazy">
        </div>
        <div class="bootcamp-info">
          <h3>${bootcamp.name}</h3>
          <p class="bootcamp-institution">${bootcamp.institution}</p>
          <div class="bootcamp-details">
            <span class="bootcamp-duration">
              <i class="icon-clock"></i>
              ${bootcamp.duration}
            </span>
            <span class="bootcamp-date">
              <i class="icon-calendar"></i>
              Graduado: ${bootcamp.completed}
            </span>
            <span class="bootcamp-stack">
              <i class="icon-code"></i>
              Stack ${bootcamp.skills_learned[0]}
            </span>
          </div>
        </div>
        <div class="bootcamp-actions">
          <a href="${bootcamp.certificate}" target="_blank" class="btn-certificate">
            <i class="icon-external-link"></i>
            Ver Certificado
          </a>
          <a href="${bootcamp.document}" download class="btn-download">
            <i class="icon-download"></i>
            Descargar PDF
          </a>
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
        <h3 class="section-subtitle">
          <i class="icon-code"></i>
          Stack Tecnológico MERN
        </h3>
        <div class="skills-legend">
          <span class="legend-item">
            <span class="legend-color beginner"></span>
            Principiante (0-60%)
          </span>
          <span class="legend-item">
            <span class="legend-color intermediate"></span>
            Intermedio (61-80%)
          </span>
          <span class="legend-item">
            <span class="legend-color advanced"></span>
            Avanzado (81-100%)
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
   * Renderiza vista de barras con logos
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
              <span class="category-count">${category.skills.length} tecnologías</span>
            </h4>
            <div class="skills-list">
              ${category.skills.map((skill, skillIndex) => `
                <div class="skill-item" 
                     data-skill-level="${this.getSkillLevel(skill.level)}"
                     data-animate="slideInLeft"
                     data-delay="${skillIndex * 100}">
                  <div class="skill-header">
                    <div class="skill-logo">
                      <img src="${skill.logo}" alt="${skill.name}" loading="lazy">
                    </div>
                    <div class="skill-meta">
                      <span class="skill-name">${skill.name}</span>
                      <span class="skill-experience">${skill.experience}</span>
                    </div>
                    <div class="skill-level-info">
                      <span class="skill-percentage">${skill.level}%</span>
                      <span class="skill-level-badge ${this.getSkillLevel(skill.level)}">
                        ${this.getSkillLevelText(skill.level)}
                      </span>
                    </div>
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
   * Renderiza vista circular con logos
   */
  renderCircularView() {
    const categories = this.getFilteredCategories();
    
    return `
      <div class="skills-circular-container">
        ${categories.map(category => `
          <div class="category-circle" data-category="${category.id}">
            <h4 class="category-title">
              <i class="icon-${category.icon}"></i>
              ${category.title}
            </h4>
            <div class="circular-skills">
              ${category.skills.map(skill => `
                <div class="circular-skill" 
                     data-skill-level="${this.getSkillLevel(skill.level)}"
                     data-animate="scaleIn">
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
                    <div class="circular-content">
                      <div class="skill-logo-circle">
                        <img src="${skill.logo}" alt="${skill.name}" loading="lazy">
                      </div>
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
   * Renderiza vista de grilla con logos
   */
  renderGridView() {
    const allSkills = this.getAllSkills();
    
    return `
      <div class="skills-grid-container">
        ${allSkills.map((skill, index) => `
          <div class="skill-card" 
               data-skill-level="${this.getSkillLevel(skill.level)}"
               data-animate="scaleIn"
               data-delay="${index * 50}">
            <div class="skill-icon" style="background: ${skill.color}15; border-color: ${skill.color}30">
              <img src="${skill.logo}" alt="${skill.name}" loading="lazy">
            </div>
            <h5 class="skill-name">${skill.name}</h5>
            <p class="skill-experience">${skill.experience}</p>
            <div class="skill-mini-bar">
              <div class="skill-mini-fill" 
                   data-progress="${skill.level}"
                   style="background: ${skill.color}"></div>
            </div>
            <div class="skill-stats">
              <span class="skill-percentage">${skill.level}%</span>
              <span class="skill-level-text">${this.getSkillLevelText(skill.level)}</span>
            </div>
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
                <i class="icon-${category.icon}"></i>
                <span class="legend-label">${category.title}</span>
                <span class="legend-average">${this.calculateCategoryAverage(category)}%</span>
              </div>
            `).join('')}
          </div>
        </div>
        <div class="radar-details">
          <h4>Análisis por Categorías</h4>
          <div class="category-details">
            ${categories.map(category => `
              <div class="category-detail">
                <div class="detail-header">
                  <i class="icon-${category.icon}"></i>
                  <h5>${category.title}</h5>
                </div>
                <div class="detail-stats">
                  <div class="stat-item">
                    <span class="stat-label">Promedio:</span>
                    <span class="stat-value">${this.calculateCategoryAverage(category)}%</span>
                  </div>
                  <div class="stat-item">
                    <span class="stat-label">Tecnologías:</span>
                    <span class="stat-value">${category.skills.length}</span>
                  </div>
                  <div class="stat-item">
                    <span class="stat-label">Top skill:</span>
                    <span class="stat-value">${this.getTopSkills(category, 1)[0]?.name}</span>
                  </div>
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
    return SKILLS_DATA.soft.map((skill, index) => `
      <div class="soft-skill-item" 
           data-animate="fadeUp" 
           data-delay="${index * 100}">
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
          <div class="rating-bar">
            <div class="rating-fill" data-progress="${skill.level}"></div>
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
    return SKILLS_DATA.languages.map((language, index) => `
      <div class="language-item" 
           data-animate="fadeLeft" 
           data-delay="${index * 150}">
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
   * Renderiza certificación oficial
   */
  renderCertification() {
    const cert = SKILLS_DATA.certifications[0];
    
    return `
      <div class="certification-card">
        <div class="cert-image">
          <img src="${cert.badge}" alt="${cert.name}" loading="lazy">
        </div>
        <div class="cert-content">
          <div class="cert-header">
            <img src="${cert.logo}" alt="${cert.issuer}" class="cert-issuer-logo">
            <div class="cert-info">
              <h4 class="cert-name">${cert.name}</h4>
              <p class="cert-issuer">${cert.issuer}</p>
              <div class="cert-meta">
                <span class="cert-date">
                  <i class="icon-calendar"></i>
                  ${cert.date}
                </span>
                <span class="cert-duration">
                  <i class="icon-clock"></i>
                  ${cert.duration}
                </span>
              </div>
            </div>
          </div>
          <p class="cert-description">${cert.description}</p>
          <div class="cert-skills">
            ${cert.skills.map(skill => `
              <span class="cert-skill-tag">${skill}</span>
            `).join('')}
          </div>
          <div class="cert-actions">
            <a href="${cert.badge}" target="_blank" class="btn-view-cert">
              <i class="icon-eye"></i>
              Ver Certificado
            </a>
            <a href="${cert.url}" download class="btn-download-cert">
              <i class="icon-download"></i>
              Descargar PDF
            </a>
          </div>
        </div>
      </div>
    `;
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
            <span class="stat-label">Tecnologías Aprendidas</span>
          </div>
        </div>
        
        <div class="stat-item" data-animate="fadeUp" data-delay="100">
          <div class="stat-icon">
            <i class="icon-trending-up"></i>
          </div>
          <div class="stat-info">
            <span class="stat-number" data-counter="${stats.averageLevel}">0</span>
            <span class="stat-label">% Promedio Dominio</span>
          </div>
        </div>
        
        <div class="stat-item" data-animate="fadeUp" data-delay="200">
          <div class="stat-icon">
            <i class="icon-clock"></i>
          </div>
          <div class="stat-info">
            <span class="stat-number" data-counter="480">0</span>
            <span class="stat-label">Horas de Formación</span>
          </div>
        </div>
        
        <div class="stat-item" data-animate="fadeUp" data-delay="300">
          <div class="stat-icon">
            <i class="icon-award"></i>
          </div>
          <div class="stat-info">
            <span class="stat-number" data-counter="${stats.expertSkills}">0</span>
            <span class="stat-label">Skills Avanzadas</span>
          </div>
        </div>
      </div>
    `;
  }

  /**
   * Funciones auxiliares mejoradas
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
      allSkills.push(...category.skills.map(skill => ({
        ...skill,
        category: category.title,
        categoryId: category.id
      })));
    });
    
    return allSkills.sort((a, b) => b.level - a.level);
  }

  getSkillLevel(level) {
    if (level <= 60) return 'beginner';
    if (level <= 80) return 'intermediate';
    return 'advanced';
  }

  getSkillLevelText(level) {
    if (level <= 60) return 'Principiante';
    if (level <= 80) return 'Intermedio';
    return 'Avanzado';
  }

  getCategoryColor(categoryId) {
    const colors = {
      frontend: '#61DAFB',
      backend: '#68A063',
      database: '#336791',
      devops: '#FF6B35',
      tools: '#666666'
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

  calculateSkillsStats() {
    const allSkills = this.getAllSkills();
    const totalLevel = allSkills.reduce((sum, skill) => sum + skill.level, 0);
    
    return {
      totalSkills: allSkills.length,
      averageLevel: Math.round(totalLevel / allSkills.length),
      expertSkills: allSkills.filter(skill => skill.level >= 80).length,
      bootcampHours: 480
    };
  }

  // ... resto de métodos (setupEventListeners, animaciones, etc.) permanecen igual
  
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
        
        categoryFilters.forEach(f => f.classList.remove('active'));
        filter.classList.add('active');
      });
    });

    this.setupSkillInteractions();
  }

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

  setupAnimations() {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          this.animateSkillsSection(entry.target);
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.2 });

    observer.observe(this.container);
    this.setupProgressAnimations();
  }

  setupProgressAnimations() {
    const progressObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && !this.animatedSkills.has(entry.target)) {
          this.animateProgressBar(entry.target);
          this.animatedSkills.add(entry.target);
        }
      });
    }, { threshold: 0.5 });

    const progressBars = this.container.querySelectorAll('[data-progress]');
    progressBars.forEach(bar => progressObserver.observe(bar));
  }

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

      if (element.classList.contains('skill-fill')) {
        element.style.width = `${currentProgress}%`;
      } else if (element.classList.contains('progress-circle')) {
        const circumference = 314.16;
        const offset = circumference - (currentProgress / 100) * circumference;
        element.style.strokeDashoffset = offset;
      } else if (element.classList.contains('language-fill') || 
                 element.classList.contains('skill-mini-fill') ||
                 element.classList.contains('rating-fill')) {
        element.style.width = `${currentProgress}%`;
      }

      if (currentProgress < progress) {
        requestAnimationFrame(animate);
      }
    };

    animate();
  }

  animateSkillsSection(section) {
    if (this.currentView === 'radar') {
      this.animateRadarChart();
    }
    window.dispatchEvent(new CustomEvent('skillsSectionVisible'));
  }

  changeView(newView) {
    this.currentView = newView;
    const vizContainer = this.container.querySelector('#skills-viz');
    
    vizContainer.style.opacity = '0';
    
    setTimeout(() => {
      vizContainer.innerHTML = this.renderSkillsVisualization();
      this.setupProgressAnimations();
      this.setupSkillInteractions();
      
      vizContainer.style.opacity = '1';
      
      if (newView === 'radar') {
        setTimeout(() => this.animateRadarChart(), 100);
      }
    }, 300);
  }

  filterByCategory(category) {
    this.currentCategory = category;
    this.changeView(this.currentView);
  }

  highlightSkill(skillElement) {
    skillElement.style.transform = 'translateY(-5px)';
    skillElement.style.boxShadow = '0 10px 25px rgba(0,0,0,0.15)';
  }

  unhighlightSkill(skillElement) {
    skillElement.style.transform = 'translateY(0)';
    skillElement.style.boxShadow = '';
  }

  // Métodos públicos
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
      certification: SKILLS_DATA.certifications[0],
      bootcamp: SKILLS_DATA.bootcamp,
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