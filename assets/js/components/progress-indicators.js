
import { DOMHelpers } from '../utils/dom-helpers.js';
import { NAVIGATION_CONFIG } from '../config/navigation-config.js';

export class ProgressIndicators {
  constructor(options = {}) {
    this.options = {
      showScrollProgress: true,
      showSectionProgress: true,
      showReadingProgress: false,
      position: 'top', // top, bottom, side
      style: 'bar', // bar, circle, dots
      ...options
    };

    this.scrollProgress = null;
    this.sectionIndicators = [];
    this.currentSection = null;
    this.sections = [];
    this.ticking = false;

    this.init();
  }

  /**
   * Inicializa el componente
   */
  init() {
    this.createProgressElements();
    this.setupSections();
    this.setupEventListeners();
    this.updateProgress();
  }

  /**
   * Crea los elementos de progreso
   */
  createProgressElements() {
    // Crear barra de progreso de scroll
    if (this.options.showScrollProgress) {
      this.createScrollProgress();
    }

    // Crear indicadores de sección
    if (this.options.showSectionProgress) {
      this.createSectionIndicators();
    }

    // Crear indicador de lectura
    if (this.options.showReadingProgress) {
      this.createReadingProgress();
    }
  }

  /**
   * Crea la barra de progreso de scroll
   */
  createScrollProgress() {
    this.scrollProgress = DOMHelpers.createElement('div', {
      className: `scroll-progress scroll-progress-${this.options.position}`,
      innerHTML: '<div class="scroll-progress-fill"></div>'
    });

    // Añadir estilos inline si no están en CSS
    this.injectScrollProgressStyles();

    document.body.appendChild(this.scrollProgress);
  }

  /**
   * Crea indicadores de sección
   */
  createSectionIndicators() {
    const container = DOMHelpers.createElement('nav', {
      className: 'section-indicators',
      setAttribute: {
        'aria-label': 'Navegación de secciones',
        'role': 'navigation'
      }
    });

    // Crear indicador para cada sección de navegación
    NAVIGATION_CONFIG.mainNav.forEach((navItem, index) => {
      const indicator = DOMHelpers.createElement('button', {
        className: 'section-indicator',
        innerHTML: `
          <span class="indicator-dot"></span>
          <span class="indicator-label">${navItem.label}</span>
          <span class="indicator-progress">
            <span class="indicator-fill"></span>
          </span>
        `,
        setAttribute: {
          'data-section': navItem.href.substring(1), // Remove #
          'aria-label': `Ir a ${navItem.label}`,
          'title': navItem.label
        }
      });

      // Event listener para navegación
      indicator.addEventListener('click', () => {
        DOMHelpers.scrollTo(navItem.href, { 
          offset: NAVIGATION_CONFIG.scroll.offset 
        });
      });

      container.appendChild(indicator);
      this.sectionIndicators.push({
        element: indicator,
        section: navItem.href.substring(1),
        progress: 0,
        active: false
      });
    });

    this.injectSectionIndicatorStyles();
    document.body.appendChild(container);
  }

  /**
   * Crea indicador de progreso de lectura
   */
  createReadingProgress() {
    const readingProgress = DOMHelpers.createElement('div', {
      className: 'reading-progress',
      innerHTML: `
        <div class="reading-circle">
          <svg class="reading-svg" width="60" height="60">
            <circle cx="30" cy="30" r="25" 
                    stroke="rgba(255,255,255,0.2)" 
                    stroke-width="2" 
                    fill="transparent"/>
            <circle cx="30" cy="30" r="25" 
                    stroke="var(--primary-color)" 
                    stroke-width="2" 
                    fill="transparent"
                    class="reading-progress-circle"
                    stroke-dasharray="157.08"
                    stroke-dashoffset="157.08"/>
          </svg>
          <span class="reading-percentage">0%</span>
        </div>
      `
    });

    this.injectReadingProgressStyles();
    document.body.appendChild(readingProgress);
    this.readingProgress = readingProgress;
  }

  /**
   * Configura las secciones a trackear
   */
  setupSections() {
    this.sections = NAVIGATION_CONFIG.mainNav.map(navItem => {
      const element = DOMHelpers.select(navItem.href);
      return {
        id: navItem.href.substring(1),
        element,
        label: navItem.label,
        start: 0,
        end: 0,
        progress: 0,
        visible: false
      };
    }).filter(section => section.element);

    this.calculateSectionPositions();
  }

  /**
   * Calcula las posiciones de las secciones
   */
  calculateSectionPositions() {
    this.sections.forEach(section => {
      if (section.element) {
        const rect = section.element.getBoundingClientRect();
        const scrollTop = window.pageYOffset;
        
        section.start = scrollTop + rect.top - 100; // Offset para activación temprana
        section.end = section.start + rect.height;
      }
    });
  }

  /**
   * Configura event listeners
   */
  setupEventListeners() {
    // Scroll con throttling para performance
    window.addEventListener('scroll', () => {
      if (!this.ticking) {
        requestAnimationFrame(() => {
          this.updateProgress();
          this.ticking = false;
        });
        this.ticking = true;
      }
    });

    // Resize para recalcular posiciones
    window.addEventListener('resize', DOMHelpers.debounce(() => {
      this.calculateSectionPositions();
      this.updateProgress();
    }, 250));

    // Intersection Observer para mejor detección de secciones
    this.setupIntersectionObserver();
  }

  /**
   * Configura Intersection Observer
   */
  setupIntersectionObserver() {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        const sectionId = entry.target.id;
        const section = this.sections.find(s => s.id === sectionId);
        
        if (section) {
          section.visible = entry.isIntersecting;
          
          if (entry.isIntersecting && entry.intersectionRatio > 0.3) {
            this.setActiveSection(sectionId);
          }
        }
      });
    }, {
      threshold: [0, 0.3, 0.7, 1],
      rootMargin: '-10% 0px -10% 0px'
    });

    this.sections.forEach(section => {
      if (section.element) {
        observer.observe(section.element);
      }
    });
  }

  /**
   * Actualiza todos los indicadores de progreso
   */
  updateProgress() {
    const scrollTop = window.pageYOffset;
    const documentHeight = document.documentElement.scrollHeight - window.innerHeight;
    
    // Progreso general de scroll
    const scrollProgress = Math.min(scrollTop / documentHeight, 1);
    this.updateScrollProgress(scrollProgress);

    // Progreso de secciones
    this.updateSectionProgress(scrollTop);

    // Progreso de lectura
    if (this.options.showReadingProgress) {
      this.updateReadingProgress(scrollProgress);
    }
  }

  /**
   * Actualiza barra de progreso de scroll
   */
  updateScrollProgress(progress) {
    if (!this.scrollProgress) return;

    const fill = this.scrollProgress.querySelector('.scroll-progress-fill');
    if (fill) {
      fill.style.transform = `scaleX(${progress})`;
    }
  }

  /**
   * Actualiza progreso de secciones
   */
  updateSectionProgress(scrollTop) {
    this.sections.forEach((section, index) => {
      if (!section.element) return;

      const indicator = this.sectionIndicators[index];
      if (!indicator) return;

      // Calcular progreso de la sección
      let progress = 0;
      if (scrollTop >= section.start && scrollTop <= section.end) {
        progress = (scrollTop - section.start) / (section.end - section.start);
        progress = Math.max(0, Math.min(1, progress));
      } else if (scrollTop > section.end) {
        progress = 1;
      }

      section.progress = progress;

      // Actualizar indicador visual
      const fill = indicator.element.querySelector('.indicator-fill');
      if (fill) {
        fill.style.transform = `scaleY(${progress})`;
      }

      // Actualizar estado activo
      const isActive = section.visible && progress > 0;
      indicator.element.classList.toggle('active', isActive);
      
      if (isActive && this.currentSection !== section.id) {
        this.setActiveSection(section.id);
      }
    });
  }

  /**
   * Actualiza progreso de lectura circular
   */
  updateReadingProgress(progress) {
    if (!this.readingProgress) return;

    const circle = this.readingProgress.querySelector('.reading-progress-circle');
    const percentage = this.readingProgress.querySelector('.reading-percentage');
    
    if (circle && percentage) {
      const circumference = 157.08; // 2 * π * r (r=25)
      const offset = circumference - (progress * circumference);
      
      circle.style.strokeDashoffset = offset;
      percentage.textContent = Math.round(progress * 100) + '%';
    }

    // Mostrar/ocultar basado en scroll
    this.readingProgress.classList.toggle('visible', progress > 0.05);
  }

  /**
   * Establece la sección activa
   */
  setActiveSection(sectionId) {
    if (this.currentSection === sectionId) return;

    this.currentSection = sectionId;

    // Actualizar indicadores
    this.sectionIndicators.forEach(indicator => {
      const isActive = indicator.section === sectionId;
      indicator.element.classList.toggle('current', isActive);
      indicator.active = isActive;
    });

    // Disparar evento personalizado
    window.dispatchEvent(new CustomEvent('sectionChange', {
      detail: { sectionId, section: this.sections.find(s => s.id === sectionId) }
    }));
  }

  /**
   * Navega a una sección específica
   */
  navigateToSection(sectionId) {
    const section = this.sections.find(s => s.id === sectionId);
    if (section && section.element) {
      DOMHelpers.scrollTo(section.element, { 
        offset: NAVIGATION_CONFIG.scroll.offset 
      });
    }
  }

  /**
   * Obtiene estadísticas de progreso
   */
  getProgressStats() {
    const totalSections = this.sections.length;
    const completedSections = this.sections.filter(s => s.progress >= 0.8).length;
    const currentProgress = this.sections.find(s => s.id === this.currentSection);

    return {
      totalSections,
      completedSections,
      completionPercentage: (completedSections / totalSections) * 100,
      currentSection: this.currentSection,
      currentSectionProgress: currentProgress ? currentProgress.progress : 0
    };
  }

  /**
   * Inyecta estilos para la barra de scroll
   */
  injectScrollProgressStyles() {
    if (document.getElementById('scroll-progress-styles')) return;

    const styles = document.createElement('style');
    styles.id = 'scroll-progress-styles';
    styles.textContent = `
      .scroll-progress {
        position: fixed;
        z-index: 9998;
        background: rgba(0, 0, 0, 0.1);
        backdrop-filter: blur(10px);
      }
      
      .scroll-progress-top {
        top: 0;
        left: 0;
        width: 100%;
        height: 3px;
      }
      
      .scroll-progress-bottom {
        bottom: 0;
        left: 0;
        width: 100%;
        height: 3px;
      }
      
      .scroll-progress-fill {
        height: 100%;
        background: linear-gradient(90deg, var(--primary-color), var(--secondary-color));
        transform-origin: left;
        transform: scaleX(0);
        transition: transform 0.1s ease-out;
      }
    `;
    document.head.appendChild(styles);
  }

  /**
   * Inyecta estilos para indicadores de sección
   */
  injectSectionIndicatorStyles() {
    if (document.getElementById('section-indicators-styles')) return;

    const styles = document.createElement('style');
    styles.id = 'section-indicators-styles';
    styles.textContent = `
      .section-indicators {
        position: fixed;
        right: 20px;
        top: 50%;
        transform: translateY(-50%);
        z-index: 9997;
        display: flex;
        flex-direction: column;
        gap: 15px;
      }
      
      .section-indicator {
        position: relative;
        background: none;
        border: none;
        cursor: pointer;
        padding: 0;
        width: 40px;
        height: 40px;
        display: flex;
        align-items: center;
        justify-content: center;
        transition: all 0.3s ease;
      }
      
      .indicator-dot {
        width: 8px;
        height: 8px;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.4);
        transition: all 0.3s ease;
        position: relative;
        z-index: 2;
      }
      
      .section-indicator.active .indicator-dot {
        background: var(--primary-color);
        transform: scale(1.2);
      }
      
      .section-indicator.current .indicator-dot {
        background: var(--accent-color);
        transform: scale(1.5);
        box-shadow: 0 0 15px var(--accent-color);
      }
      
      .indicator-label {
        position: absolute;
        right: 50px;
        top: 50%;
        transform: translateY(-50%);
        background: rgba(0, 0, 0, 0.8);
        color: white;
        padding: 5px 10px;
        border-radius: 5px;
        font-size: 12px;
        white-space: nowrap;
        opacity: 0;
        pointer-events: none;
        transition: opacity 0.3s ease;
      }
      
      .section-indicator:hover .indicator-label {
        opacity: 1;
      }
      
      .indicator-progress {
        position: absolute;
        left: -2px;
        top: -2px;
        width: 12px;
        height: 12px;
        border-radius: 50%;
        background: transparent;
        border: 2px solid rgba(255, 255, 255, 0.2);
        overflow: hidden;
      }
      
      .indicator-fill {
        position: absolute;
        bottom: 0;
        left: 0;
        width: 100%;
        height: 0%;
        background: var(--primary-color);
        transition: height 0.3s ease;
        transform-origin: bottom;
      }
      
      @media (max-width: 768px) {
        .section-indicators {
          display: none;
        }
      }
    `;
    document.head.appendChild(styles);
  }

  /**
   * Inyecta estilos para progreso de lectura
   */
  injectReadingProgressStyles() {
    if (document.getElementById('reading-progress-styles')) return;

    const styles = document.createElement('style');
    styles.id = 'reading-progress-styles';
    styles.textContent = `
      .reading-progress {
        position: fixed;
        bottom: 30px;
        right: 30px;
        z-index: 9997;
        opacity: 0;
        transform: scale(0.8);
        transition: all 0.3s ease;
        pointer-events: none;
      }
      
      .reading-progress.visible {
        opacity: 1;
        transform: scale(1);
        pointer-events: auto;
      }
      
      .reading-circle {
        position: relative;
        width: 60px;
        height: 60px;
        cursor: pointer;
      }
      
      .reading-svg {
        transform: rotate(-90deg);
      }
      
      .reading-progress-circle {
        transition: stroke-dashoffset 0.3s ease;
      }
      
      .reading-percentage {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        font-size: 10px;
        font-weight: bold;
        color: var(--primary-color);
      }
      
      @media (max-width: 768px) {
        .reading-progress {
          bottom: 20px;
          right: 20px;
          transform: scale(0.7);
        }
        
        .reading-progress.visible {
          transform: scale(0.8);
        }
      }
    `;
    document.head.appendChild(styles);
  }

  /**
   * Habilita/deshabilita indicadores
   */
  toggle(enabled = null) {
    const isEnabled = enabled !== null ? enabled : 
      !this.scrollProgress.classList.contains('hidden');

    [this.scrollProgress, ...this.sectionIndicators.map(i => i.element.parentNode)]
      .filter(Boolean)
      .forEach(element => {
        element.classList.toggle('hidden', !isEnabled);
      });
  }

  /**
   * Actualiza configuración
   */
  updateConfig(newOptions) {
    Object.assign(this.options, newOptions);
    
    // Recrear elementos si es necesario
    this.destroy();
    this.init();
  }

  /**
   * Destructor
   */
  destroy() {
    // Remover elementos del DOM
    if (this.scrollProgress) {
      this.scrollProgress.remove();
    }
    
    const sectionIndicators = document.querySelector('.section-indicators');
    if (sectionIndicators) {
      sectionIndicators.remove();
    }
    
    if (this.readingProgress) {
      this.readingProgress.remove();
    }

    // Remover event listeners
    window.removeEventListener('scroll', this.updateProgress);
    window.removeEventListener('resize', this.calculateSectionPositions);
  }
}

// Auto-inicialización
DOMHelpers.ready(() => {
  // Solo inicializar si está habilitado en la configuración
  if (NAVIGATION_CONFIG.progressIndicators?.enabled) {
    window.progressIndicatorsInstance = new ProgressIndicators({
      showScrollProgress: true,
      showSectionProgress: true,
      showReadingProgress: false,
      position: NAVIGATION_CONFIG.progressIndicators.position || 'top',
      style: NAVIGATION_CONFIG.progressIndicators.style || 'bar'
    });
  }
});