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
    this.intersectionObserver = null;
    this.eventListeners = [];
    this.readingProgress = null;
    this.isDestroyed = false;

    // Validar dependencias
    if (!this.validateDependencies()) {
      console.warn('ProgressIndicators: Dependencias no disponibles');
      return;
    }

    this.init();
  }

  /**
   * Valida que las dependencias estén disponibles
   */
  validateDependencies() {
    if (!DOMHelpers) {
      console.error('ProgressIndicators: DOMHelpers no está disponible');
      return false;
    }

    if (!NAVIGATION_CONFIG || !NAVIGATION_CONFIG.mainNav) {
      console.error('ProgressIndicators: NAVIGATION_CONFIG.mainNav no está disponible');
      return false;
    }

    if (!Array.isArray(NAVIGATION_CONFIG.mainNav) || NAVIGATION_CONFIG.mainNav.length === 0) {
      console.warn('ProgressIndicators: No hay elementos de navegación configurados');
      return false;
    }

    return true;
  }

  /**
   * Inicializa el componente
   */
  init() {
    if (this.isDestroyed) {
      console.warn('ProgressIndicators: No se puede inicializar un componente destruido');
      return false;
    }

    try {
      this.createProgressElements();
      this.setupSections();
      this.setupEventListeners();
      this.updateProgress();
      
      console.log('✅ ProgressIndicators: Inicializado correctamente');
      return true;
    } catch (error) {
      console.error('❌ Error al inicializar ProgressIndicators:', error);
      return false;
    }
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
    try {
      // Verificar si ya existe
      if (document.querySelector('.scroll-progress')) {
        console.warn('ProgressIndicators: Barra de progreso ya existe');
        return;
      }

      this.scrollProgress = this.createElement('div', {
        className: `scroll-progress scroll-progress-${this.options.position}`,
        innerHTML: '<div class="scroll-progress-fill" aria-hidden="true"></div>',
        role: 'progressbar',
        'aria-label': 'Progreso de scroll de la página',
        'aria-valuenow': '0',
        'aria-valuemin': '0',
        'aria-valuemax': '100'
      });

      // Añadir estilos inline si no están en CSS
      this.injectScrollProgressStyles();

      document.body.appendChild(this.scrollProgress);
    } catch (error) {
      console.error('Error creando barra de progreso de scroll:', error);
    }
  }

  /**
   * Crea indicadores de sección
   */
  createSectionIndicators() {
    try {
      // Verificar si ya existe
      if (document.querySelector('.section-indicators')) {
        console.warn('ProgressIndicators: Indicadores de sección ya existen');
        return;
      }

      const container = this.createElement('nav', {
        className: 'section-indicators',
        'aria-label': 'Navegación de secciones',
        role: 'navigation'
      });

      // Crear indicador para cada sección de navegación
      NAVIGATION_CONFIG.mainNav.forEach((navItem, index) => {
        if (!navItem || !navItem.href || !navItem.label) {
          console.warn('ProgressIndicators: Item de navegación inválido:', navItem);
          return;
        }

        const sectionId = navItem.href.startsWith('#') ? navItem.href.substring(1) : navItem.href;
        
        const indicator = this.createElement('button', {
          className: 'section-indicator',
          type: 'button',
          innerHTML: `
            <span class="indicator-dot" aria-hidden="true"></span>
            <span class="indicator-label">${this.escapeHtml(navItem.label)}</span>
            <span class="indicator-progress" aria-hidden="true">
              <span class="indicator-fill"></span>
            </span>
          `,
          'data-section': sectionId,
          'aria-label': `Ir a ${navItem.label}`,
          'title': navItem.label
        });

        // Event listener para navegación
        const handleClick = (e) => {
          e.preventDefault();
          this.navigateToSection(sectionId);
        };

        indicator.addEventListener('click', handleClick);
        this.eventListeners.push({
          element: indicator,
          event: 'click',
          handler: handleClick
        });

        container.appendChild(indicator);
        this.sectionIndicators.push({
          element: indicator,
          section: sectionId,
          progress: 0,
          active: false
        });
      });

      if (this.sectionIndicators.length === 0) {
        console.warn('ProgressIndicators: No se crearon indicadores de sección válidos');
        return;
      }

      this.injectSectionIndicatorStyles();
      document.body.appendChild(container);
    } catch (error) {
      console.error('Error creando indicadores de sección:', error);
    }
  }

  /**
   * Crea indicador de progreso de lectura
   */
  createReadingProgress() {
    try {
      // Verificar si ya existe
      if (document.querySelector('.reading-progress')) {
        console.warn('ProgressIndicators: Indicador de lectura ya existe');
        return;
      }

      this.readingProgress = this.createElement('div', {
        className: 'reading-progress',
        role: 'progressbar',
        'aria-label': 'Progreso de lectura',
        'aria-valuenow': '0',
        'aria-valuemin': '0',
        'aria-valuemax': '100',
        innerHTML: `
          <div class="reading-circle">
            <svg class="reading-svg" width="60" height="60" aria-hidden="true">
              <circle cx="30" cy="30" r="25" 
                      stroke="rgba(255,255,255,0.2)" 
                      stroke-width="2" 
                      fill="transparent"/>
              <circle cx="30" cy="30" r="25" 
                      stroke="var(--primary-color, #ef4444)" 
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

      // Agregar funcionalidad de click para scroll al inicio
      const handleClick = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      };

      this.readingProgress.addEventListener('click', handleClick);
      this.eventListeners.push({
        element: this.readingProgress,
        event: 'click',
        handler: handleClick
      });

      this.injectReadingProgressStyles();
      document.body.appendChild(this.readingProgress);
    } catch (error) {
      console.error('Error creando indicador de lectura:', error);
    }
  }

  /**
   * Configura las secciones a trackear
   */
  setupSections() {
    try {
      this.sections = NAVIGATION_CONFIG.mainNav.map(navItem => {
        if (!navItem || !navItem.href) return null;

        const sectionId = navItem.href.startsWith('#') ? navItem.href.substring(1) : navItem.href;
        const element = document.getElementById(sectionId) || document.querySelector(`[data-section="${sectionId}"]`);
        
        if (!element) {
          console.warn(`ProgressIndicators: Sección "${sectionId}" no encontrada en el DOM`);
          return null;
        }

        return {
          id: sectionId,
          element,
          label: navItem.label || sectionId,
          start: 0,
          end: 0,
          progress: 0,
          visible: false
        };
      }).filter(Boolean);

      if (this.sections.length === 0) {
        console.warn('ProgressIndicators: No se encontraron secciones válidas');
        return;
      }

      this.calculateSectionPositions();
    } catch (error) {
      console.error('Error configurando secciones:', error);
    }
  }

  /**
   * Calcula las posiciones de las secciones
   */
  calculateSectionPositions() {
    try {
      this.sections.forEach(section => {
        if (section.element) {
          const rect = section.element.getBoundingClientRect();
          const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
          
          section.start = Math.max(0, scrollTop + rect.top - 100); // Offset para activación temprana
          section.end = section.start + Math.max(rect.height, 100); // Altura mínima
        }
      });
    } catch (error) {
      console.error('Error calculando posiciones de secciones:', error);
    }
  }

  /**
   * Configura event listeners
   */
  setupEventListeners() {
    // Scroll con throttling para performance
    const handleScroll = () => {
      if (this.isDestroyed) return;
      
      if (!this.ticking) {
        requestAnimationFrame(() => {
          if (!this.isDestroyed) {
            this.updateProgress();
          }
          this.ticking = false;
        });
        this.ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    this.eventListeners.push({
      element: window,
      event: 'scroll',
      handler: handleScroll
    });

    // Resize para recalcular posiciones
    const handleResize = this.debounce(() => {
      if (!this.isDestroyed) {
        this.calculateSectionPositions();
        this.updateProgress();
      }
    }, 250);

    window.addEventListener('resize', handleResize);
    this.eventListeners.push({
      element: window,
      event: 'resize',
      handler: handleResize
    });

    // Intersection Observer para mejor detección de secciones
    this.setupIntersectionObserver();
  }

  /**
   * Configura Intersection Observer
   */
  setupIntersectionObserver() {
    if (!('IntersectionObserver' in window)) {
      console.warn('ProgressIndicators: IntersectionObserver no soportado');
      return;
    }

    try {
      this.intersectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          const sectionId = entry.target.id || entry.target.dataset.section;
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
          this.intersectionObserver.observe(section.element);
        }
      });
    } catch (error) {
      console.error('Error configurando IntersectionObserver:', error);
    }
  }

  /**
   * Actualiza todos los indicadores de progreso
   */
  updateProgress() {
    if (this.isDestroyed) return;

    try {
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      const documentHeight = Math.max(
        document.body.scrollHeight,
        document.documentElement.scrollHeight
      ) - window.innerHeight;
      
      // Evitar división por cero
      const scrollProgress = documentHeight > 0 ? Math.min(scrollTop / documentHeight, 1) : 0;
      
      // Progreso general de scroll
      this.updateScrollProgress(scrollProgress);

      // Progreso de secciones
      this.updateSectionProgress(scrollTop);

      // Progreso de lectura
      if (this.options.showReadingProgress) {
        this.updateReadingProgress(scrollProgress);
      }
    } catch (error) {
      console.error('Error actualizando progreso:', error);
    }
  }

  /**
   * Actualiza barra de progreso de scroll
   */
  updateScrollProgress(progress) {
    if (!this.scrollProgress) return;

    try {
      const fill = this.scrollProgress.querySelector('.scroll-progress-fill');
      if (fill) {
        const percentage = Math.round(progress * 100);
        fill.style.transform = `scaleX(${progress})`;
        
        // Actualizar atributos de accesibilidad
        this.scrollProgress.setAttribute('aria-valuenow', percentage.toString());
      }
    } catch (error) {
      console.error('Error actualizando progreso de scroll:', error);
    }
  }

  /**
   * Actualiza progreso de secciones
   */
  updateSectionProgress(scrollTop) {
    try {
      this.sections.forEach((section, index) => {
        if (!section.element) return;

        const indicator = this.sectionIndicators[index];
        if (!indicator) return;

        // Calcular progreso de la sección
        let progress = 0;
        if (scrollTop >= section.start && scrollTop <= section.end) {
          const sectionHeight = section.end - section.start;
          if (sectionHeight > 0) {
            progress = (scrollTop - section.start) / sectionHeight;
            progress = Math.max(0, Math.min(1, progress));
          }
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
    } catch (error) {
      console.error('Error actualizando progreso de secciones:', error);
    }
  }

  /**
   * Actualiza progreso de lectura circular
   */
  updateReadingProgress(progress) {
    if (!this.readingProgress) return;

    try {
      const circle = this.readingProgress.querySelector('.reading-progress-circle');
      const percentage = this.readingProgress.querySelector('.reading-percentage');
      
      if (circle && percentage) {
        const circumference = 157.08; // 2 * π * r (r=25)
        const offset = circumference - (progress * circumference);
        
        circle.style.strokeDashoffset = offset.toString();
        const percentageValue = Math.round(progress * 100);
        percentage.textContent = percentageValue + '%';
        
        // Actualizar atributos de accesibilidad
        this.readingProgress.setAttribute('aria-valuenow', percentageValue.toString());
      }

      // Mostrar/ocultar basado en scroll
      this.readingProgress.classList.toggle('visible', progress > 0.05);
    } catch (error) {
      console.error('Error actualizando progreso de lectura:', error);
    }
  }

  /**
   * Establece la sección activa
   */
  setActiveSection(sectionId) {
    if (this.currentSection === sectionId || !sectionId) return;

    try {
      this.currentSection = sectionId;

      // Actualizar indicadores
      this.sectionIndicators.forEach(indicator => {
        const isActive = indicator.section === sectionId;
        indicator.element.classList.toggle('current', isActive);
        indicator.active = isActive;
      });

      // Disparar evento personalizado
      const section = this.sections.find(s => s.id === sectionId);
      const customEvent = new CustomEvent('sectionChange', {
        detail: { sectionId, section }
      });
      
      window.dispatchEvent(customEvent);
    } catch (error) {
      console.error('Error estableciendo sección activa:', error);
    }
  }

  /**
   * Navega a una sección específica
   */
  navigateToSection(sectionId) {
    if (!sectionId) return false;

    try {
      const section = this.sections.find(s => s.id === sectionId);
      if (section && section.element) {
        const offset = NAVIGATION_CONFIG?.scroll?.offset || 0;
        
        if (DOMHelpers.scrollTo) {
          DOMHelpers.scrollTo(section.element, { offset });
        } else {
          // Fallback manual
          const elementTop = section.element.getBoundingClientRect().top + window.pageYOffset;
          window.scrollTo({
            top: elementTop - offset,
            behavior: 'smooth'
          });
        }
        return true;
      }
      return false;
    } catch (error) {
      console.error('Error navegando a sección:', error);
      return false;
    }
  }

  /**
   * Obtiene estadísticas de progreso
   */
  getProgressStats() {
    try {
      const totalSections = this.sections.length;
      const completedSections = this.sections.filter(s => s.progress >= 0.8).length;
      const currentProgress = this.sections.find(s => s.id === this.currentSection);

      return {
        totalSections,
        completedSections,
        completionPercentage: totalSections > 0 ? (completedSections / totalSections) * 100 : 0,
        currentSection: this.currentSection,
        currentSectionProgress: currentProgress ? currentProgress.progress : 0
      };
    } catch (error) {
      console.error('Error obteniendo estadísticas:', error);
      return {
        totalSections: 0,
        completedSections: 0,
        completionPercentage: 0,
        currentSection: null,
        currentSectionProgress: 0
      };
    }
  }

  /**
   * Helper para crear elementos
   */
  createElement(tag, options = {}) {
    if (DOMHelpers?.createElement) {
      return DOMHelpers.createElement(tag, options);
    }
    
    // Fallback manual
    const element = document.createElement(tag);
    
    Object.keys(options).forEach(key => {
      if (key === 'className') {
        element.className = options[key];
      } else if (key === 'innerHTML') {
        element.innerHTML = options[key];
      } else {
        element.setAttribute(key, options[key]);
      }
    });
    
    return element;
  }

  /**
   * Escape HTML para prevenir XSS
   */
  escapeHtml(text) {
    if (!text) return '';
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
  }

  /**
   * Función debounce
   */
  debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
      const later = () => {
        clearTimeout(timeout);
        func.apply(this, args);
      };
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
    };
  }

  /**
   * Inyecta estilos para la barra de scroll
   */
  injectScrollProgressStyles() {
    if (document.getElementById('scroll-progress-styles')) return;

    try {
      const styles = document.createElement('style');
      styles.id = 'scroll-progress-styles';
      styles.textContent = `
        .scroll-progress {
          position: fixed;
          z-index: 9998;
          background: rgba(0, 0, 0, 0.1);
          backdrop-filter: blur(10px);
          -webkit-backdrop-filter: blur(10px);
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
          background: linear-gradient(90deg, var(--primary-color, #ef4444), var(--secondary-color, #3b82f6));
          transform-origin: left;
          transform: scaleX(0);
          transition: transform 0.1s ease-out;
          will-change: transform;
        }
        
        .scroll-progress.hidden {
          display: none;
        }
      `;
      document.head.appendChild(styles);
    } catch (error) {
      console.error('Error inyectando estilos de scroll progress:', error);
    }
  }

  /**
   * Inyecta estilos para indicadores de sección
   */
  injectSectionIndicatorStyles() {
    if (document.getElementById('section-indicators-styles')) return;

    try {
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
          border-radius: 50%;
        }
        
        .section-indicator:focus {
          outline: 2px solid var(--primary-color, #ef4444);
          outline-offset: 2px;
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
          background: var(--primary-color, #ef4444);
          transform: scale(1.2);
        }
        
        .section-indicator.current .indicator-dot {
          background: var(--accent-color, #10b981);
          transform: scale(1.5);
          box-shadow: 0 0 15px var(--accent-color, #10b981);
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
          z-index: 10;
        }
        
        .section-indicator:hover .indicator-label,
        .section-indicator:focus .indicator-label {
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
          background: var(--primary-color, #ef4444);
          transition: height 0.3s ease;
          transform-origin: bottom;
          will-change: height;
        }
        
        .section-indicators.hidden {
          display: none;
        }
        
        @media (max-width: 768px) {
          .section-indicators {
            display: none;
          }
        }
      `;
      document.head.appendChild(styles);
    } catch (error) {
      console.error('Error inyectando estilos de section indicators:', error);
    }
  }

  /**
   * Inyecta estilos para progreso de lectura
   */
  injectReadingProgressStyles() {
    if (document.getElementById('reading-progress-styles')) return;

    try {
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
          border-radius: 50%;
          transition: transform 0.2s ease;
        }
        
        .reading-circle:hover {
          transform: scale(1.1);
        }
        
        .reading-circle:focus {
          outline: 2px solid var(--primary-color, #ef4444);
          outline-offset: 2px;
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
          color: var(--primary-color, #ef4444);
          pointer-events: none;
        }
        
        .reading-progress.hidden {
          display: none;
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
    } catch (error) {
      console.error('Error inyectando estilos de reading progress:', error);
    }
  }

  /**
   * Habilita/deshabilita indicadores
   */
  toggle(enabled = null) {
    try {
      const isEnabled = enabled !== null ? enabled : 
        !this.scrollProgress?.classList.contains('hidden');

      const elementsToToggle = [
        this.scrollProgress,
        document.querySelector('.section-indicators'),
        this.readingProgress
      ].filter(Boolean);

      elementsToToggle.forEach(element => {
        element.classList.toggle('hidden', !isEnabled);
      });
    } catch (error) {
      console.error('Error en toggle de indicadores:', error);
    }
  }

  /**
   * Actualiza configuración
   */
  updateConfig(newOptions) {
    if (!newOptions || typeof newOptions !== 'object') {
      console.warn('ProgressIndicators: Opciones inválidas para updateConfig');
      return false;
    }

    try {
      Object.assign(this.options, newOptions);
      
      // Recrear elementos si es necesario
      this.destroy();
      return this.init();
    } catch (error) {
      console.error('Error actualizando configuración:', error);
      return false;
    }
  }

  /**
   * Destructor
   */
  destroy() {
    this.isDestroyed = true;

    try {
      // Limpiar intersection observer
      if (this.intersectionObserver) {
        this.intersectionObserver.disconnect();
        this.intersectionObserver = null;
      }

      // Limpiar event listeners
      this.eventListeners.forEach(({ element, event, handler }) => {
        if (element && typeof element.removeEventListener === 'function') {
          element.removeEventListener(event, handler);
        }
      });
      this.eventListeners = [];

      // Remover elementos del DOM
      if (this.scrollProgress && this.scrollProgress.parentNode) {
        this.scrollProgress.remove();
        this.scrollProgress = null;
      }
      
      const sectionIndicators = document.querySelector('.section-indicators');
      if (sectionIndicators) {
        sectionIndicators.remove();
      }
      
      if (this.readingProgress && this.readingProgress.parentNode) {
        this.readingProgress.remove();
        this.readingProgress = null;
      }

      // Limpiar referencias
      this.sectionIndicators = [];
      this.sections = [];
      this.currentSection = null;

      console.log('✅ ProgressIndicators: Destruido correctamente');
    } catch (error) {
      console.error('Error destruyendo ProgressIndicators:', error);
    }
  }
}

// Auto-inicialización segura
const initProgressIndicators = () => {
  try {
    // Solo inicializar si está habilitado en la configuración
    if (NAVIGATION_CONFIG?.progressIndicators?.enabled) {
      if (!document.body._progressIndicatorsInstance) {
        console.log('🎯 Auto-inicializando ProgressIndicators...');
        
        const options = {
          showScrollProgress: true,
          showSectionProgress: true,
          showReadingProgress: false,
          position: NAVIGATION_CONFIG.progressIndicators.position || 'top',
          style: NAVIGATION_CONFIG.progressIndicators.style || 'bar'
        };

        document.body._progressIndicatorsInstance = new ProgressIndicators(options);
        
        if (typeof window !== 'undefined') {
          window.progressIndicatorsInstance = document.body._progressIndicatorsInstance;
        }
      }
    } else {
      console.log('ℹ️ ProgressIndicators: Deshabilitado en configuración');
    }
  } catch (error) {
    console.error('Error en auto-inicialización de ProgressIndicators:', error);
  }
};

// Auto-inicialización inteligente
if (typeof window !== 'undefined' && !window.portfolioApp) {
  if (DOMHelpers?.ready) {
    DOMHelpers.ready(initProgressIndicators);
  } else if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initProgressIndicators);
  } else {
    initProgressIndicators();
  }
}