import { DOMHelpers } from '../utils/dom-helpers.js';

/**
 * Componente de animaciones al hacer scroll
 */
export class ScrollAnimations {
  constructor(options = {}) {
    this.options = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px',
      enableParallax: true,
      enableCounters: true,
      enableReveal: true,
      enableProgressBars: true,
      ...options
    };

    this.observers = [];
    this.parallaxElements = [];
    this.counters = [];
    this.progressBars = [];
    this.revealElements = [];
    this.isInitialized = false;
    this.animationFrameId = null;
    this.scrollHandler = null;

    this.init();
  }

  /**
   * Inicializa el sistema de animaciones
   */
  init() {
    if (this.isInitialized) return;

    DOMHelpers.ready(() => {
      this.setupRevealAnimations();
      this.setupParallaxElements();
      this.setupCounterAnimations();
      this.setupProgressBars();
      this.setupScrollEffects();
      this.isInitialized = true;
    });
  }

  /**
   * Configura animaciones de revelado
   */
  setupRevealAnimations() {
    if (!this.options.enableReveal) return;

    // Seleccionar elementos con atributos data-animate
    const animatedElements = DOMHelpers.selectAll('[data-animate]');
    
    const revealObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          this.animateElement(entry.target);
          revealObserver.unobserve(entry.target);
        }
      });
    }, {
      threshold: this.options.threshold,
      rootMargin: this.options.rootMargin
    });

    animatedElements.forEach(element => {
      this.prepareElement(element);
      revealObserver.observe(element);
      this.revealElements.push(element);
    });

    this.observers.push(revealObserver);
  }

  /**
   * Prepara un elemento para animación
   */
  prepareElement(element) {
    const animationType = element.dataset.animate;
    const delay = parseInt(element.dataset.delay || 0);
    
    // Aplicar estado inicial según el tipo de animación
    switch (animationType) {
      case 'fadeUp':
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        break;
      case 'fadeDown':
        element.style.opacity = '0';
        element.style.transform = 'translateY(-30px)';
        break;
      case 'fadeLeft':
        element.style.opacity = '0';
        element.style.transform = 'translateX(30px)';
        break;
      case 'fadeRight':
        element.style.opacity = '0';
        element.style.transform = 'translateX(-30px)';
        break;
      case 'fadeIn':
        element.style.opacity = '0';
        break;
      case 'scaleIn':
        element.style.opacity = '0';
        element.style.transform = 'scale(0.8)';
        break;
      case 'rotateIn':
        element.style.opacity = '0';
        element.style.transform = 'rotate(-10deg) scale(0.8)';
        break;
      case 'slideUp':
        element.style.transform = 'translateY(100%)';
        break;
      case 'slideDown':
        element.style.transform = 'translateY(-100%)';
        break;
      case 'slideLeft':
        element.style.transform = 'translateX(100%)';
        break;
      case 'slideRight':
        element.style.transform = 'translateX(-100%)';
        break;
      default:
        console.warn(`Tipo de animación desconocido: ${animationType}`);
        return;
    }

    // Configurar transición
    const duration = parseInt(element.dataset.duration || 600);
    const easing = element.dataset.easing || 'cubic-bezier(0.25, 0.46, 0.45, 0.94)';
    
    element.style.transition = `all ${duration}ms ${easing}`;
    
    if (delay > 0) {
      element.style.transitionDelay = `${delay}ms`;
    }

    // Agregar will-change para mejor rendimiento
    element.style.willChange = 'transform, opacity';
  }

  /**
   * Anima un elemento cuando entra en vista
   */
  animateElement(element) {
    const animationType = element.dataset.animate;
    
    // Aplicar estado final según el tipo de animación
    switch (animationType) {
      case 'fadeUp':
      case 'fadeDown':
      case 'fadeLeft':
      case 'fadeRight':
      case 'fadeIn':
      case 'scaleIn':
      case 'rotateIn':
        element.style.opacity = '1';
        element.style.transform = 'translateY(0) translateX(0) scale(1) rotate(0)';
        break;
      case 'slideUp':
      case 'slideDown':
      case 'slideLeft':
      case 'slideRight':
        element.style.transform = 'translateY(0) translateX(0)';
        break;
    }

    element.classList.add('animated');

    // Limpiar will-change después de la animación
    const duration = parseInt(element.dataset.duration || 600);
    const delay = parseInt(element.dataset.delay || 0);
    
    setTimeout(() => {
      element.style.willChange = 'auto';
      
      // Callback opcional cuando termina la animación
      const onComplete = element.dataset.onComplete;
      if (onComplete && typeof window[onComplete] === 'function') {
        window[onComplete](element);
      }
    }, duration + delay);
  }

  /**
   * Configura elementos parallax
   */
  setupParallaxElements() {
    if (!this.options.enableParallax) return;

    this.parallaxElements = Array.from(DOMHelpers.selectAll('[data-parallax]'));
    
    if (this.parallaxElements.length > 0) {
      this.setupParallaxScroll();
    }
  }

  /**
   * Configura scroll parallax
   */
  setupParallaxScroll() {
    let ticking = false;

    const updateParallax = () => {
      const scrollTop = window.pageYOffset;
      const windowHeight = window.innerHeight;

      this.parallaxElements.forEach(element => {
        const rect = element.getBoundingClientRect();
        const elementTop = rect.top + scrollTop;
        
        // Solo procesar elementos visibles o cerca del viewport
        if (rect.bottom >= -100 && rect.top <= windowHeight + 100) {
          const speed = parseFloat(element.dataset.parallax) || 0.5;
          // Limitar el valor de speed para evitar movimientos extremos
          const clampedSpeed = Math.max(-2, Math.min(2, speed));
          const yPos = -(scrollTop - elementTop) * clampedSpeed;
          
          element.style.transform = `translate3d(0, ${yPos}px, 0)`;
        }
      });

      ticking = false;
    };

    this.scrollHandler = () => {
      if (!ticking) {
        this.animationFrameId = requestAnimationFrame(updateParallax);
        ticking = true;
      }
    };

    window.addEventListener('scroll', this.scrollHandler, { passive: true });
    
    // Ejecutar una vez al inicio
    updateParallax();
  }

  /**
   * Configura animaciones de contadores
   */
  setupCounterAnimations() {
    if (!this.options.enableCounters) return;

    const counterElements = DOMHelpers.selectAll('[data-counter]');
    
    const counterObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          this.animateCounter(entry.target);
          counterObserver.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.5
    });

    counterElements.forEach(element => {
      counterObserver.observe(element);
      this.counters.push(element);
    });

    this.observers.push(counterObserver);
  }

  /**
   * Anima un contador
   */
  animateCounter(element) {
    const target = parseInt(element.dataset.counter);
    const duration = parseInt(element.dataset.duration || 2000);
    const prefix = element.dataset.prefix || '';
    const suffix = element.dataset.suffix || '';
    const separator = element.dataset.separator || '';
    
    if (isNaN(target)) {
      console.warn('Valor de contador inválido:', element.dataset.counter);
      return;
    }
    
    let startValue = 0;
    const startTime = performance.now();
    
    const updateCounter = (currentTime) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      
      // Usar easing para una animación más suave
      const easeOutQuart = 1 - Math.pow(1 - progress, 4);
      const currentValue = Math.floor(target * easeOutQuart);
      
      let displayValue = currentValue;
      
      // Agregar separador de miles si está especificado
      if (separator) {
        displayValue = currentValue.toLocaleString();
      }
      
      element.textContent = prefix + displayValue + suffix;
      
      if (progress < 1) {
        requestAnimationFrame(updateCounter);
      }
    };

    requestAnimationFrame(updateCounter);
  }

  /**
   * Configura barras de progreso animadas
   */
  setupProgressBars() {
    if (!this.options.enableProgressBars) return;

    const progressElements = DOMHelpers.selectAll('[data-progress]');
    
    const progressObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          this.animateProgressBar(entry.target);
          progressObserver.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.3
    });

    progressElements.forEach(element => {
      this.prepareProgressBar(element);
      progressObserver.observe(element);
      this.progressBars.push(element);
    });

    this.observers.push(progressObserver);
  }

  /**
   * Prepara una barra de progreso
   */
  prepareProgressBar(element) {
    const progress = parseInt(element.dataset.progress);
    const type = element.dataset.type || 'bar';
    
    if (isNaN(progress) || progress < 0 || progress > 100) {
      console.warn('Valor de progreso inválido:', element.dataset.progress);
      return;
    }
    
    switch (type) {
      case 'bar':
        this.createProgressBar(element, progress);
        break;
      case 'circle':
        this.createCircularProgress(element, progress);
        break;
      case 'semi-circle':
        this.createSemiCircularProgress(element, progress);
        break;
      default:
        console.warn('Tipo de barra de progreso desconocido:', type);
    }
  }

  /**
   * Crea barra de progreso lineal
   */
  createProgressBar(element, targetProgress) {
    if (!element.querySelector('.progress-bar-fill')) {
      element.innerHTML = `
        <div class="progress-bar-container">
          <div class="progress-bar-fill" style="width: 0%; transition: width 0.3s ease;"></div>
          <span class="progress-text">0%</span>
        </div>
      `;
    }
  }

  /**
   * Crea progreso circular
   */
  createCircularProgress(element, targetProgress) {
    const radius = 45;
    const circumference = 2 * Math.PI * radius;
    
    if (!element.querySelector('.circular-progress')) {
      element.innerHTML = `
        <div class="circular-progress">
          <svg width="100" height="100" viewBox="0 0 100 100">
            <circle cx="50" cy="50" r="${radius}" 
                    stroke="#e0e0e0" 
                    stroke-width="8" 
                    fill="transparent"/>
            <circle cx="50" cy="50" r="${radius}" 
                    stroke="var(--primary-color, #007bff)" 
                    stroke-width="8" 
                    fill="transparent"
                    class="progress-circle"
                    stroke-dasharray="${circumference}"
                    stroke-dashoffset="${circumference}"
                    stroke-linecap="round"
                    style="transition: stroke-dashoffset 0.3s ease;"/>
          </svg>
          <div class="progress-text">0%</div>
        </div>
      `;
    }
  }

  /**
   * Crea progreso semicircular
   */
  createSemiCircularProgress(element, targetProgress) {
    const radius = 40;
    const circumference = Math.PI * radius;
    
    if (!element.querySelector('.semi-circular-progress')) {
      element.innerHTML = `
        <div class="semi-circular-progress">
          <svg width="100" height="60" viewBox="0 0 100 60">
            <path d="M 10 50 A 40 40 0 0 1 90 50" 
                  stroke="#e0e0e0" 
                  stroke-width="8" 
                  fill="transparent"/>
            <path d="M 10 50 A 40 40 0 0 1 90 50" 
                  stroke="var(--primary-color, #007bff)" 
                  stroke-width="8" 
                  fill="transparent"
                  class="progress-path"
                  stroke-dasharray="${circumference}"
                  stroke-dashoffset="${circumference}"
                  stroke-linecap="round"
                  style="transition: stroke-dashoffset 0.3s ease;"/>
          </svg>
          <div class="progress-text">0%</div>
        </div>
      `;
    }
  }

  /**
   * Anima una barra de progreso
   */
  animateProgressBar(element) {
    const targetProgress = parseInt(element.dataset.progress);
    const duration = parseInt(element.dataset.duration || 1500);
    const type = element.dataset.type || 'bar';
    
    const startTime = performance.now();
    
    const updateProgress = (currentTime) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      
      // Usar easing para una animación más suave
      const easeOutQuart = 1 - Math.pow(1 - progress, 4);
      const currentProgress = targetProgress * easeOutQuart;
      
      switch (type) {
        case 'bar':
          this.updateProgressBar(element, currentProgress);
          break;
        case 'circle':
          this.updateCircularProgress(element, currentProgress);
          break;
        case 'semi-circle':
          this.updateSemiCircularProgress(element, currentProgress);
          break;
      }
      
      if (progress < 1) {
        requestAnimationFrame(updateProgress);
      }
    };

    requestAnimationFrame(updateProgress);
  }

  /**
   * Actualiza barra de progreso lineal
   */
  updateProgressBar(element, progress) {
    const fill = element.querySelector('.progress-bar-fill');
    const text = element.querySelector('.progress-text');
    
    if (fill) fill.style.width = `${progress}%`;
    if (text) text.textContent = `${Math.round(progress)}%`;
  }

  /**
   * Actualiza progreso circular
   */
  updateCircularProgress(element, progress) {
    const circle = element.querySelector('.progress-circle');
    const text = element.querySelector('.progress-text');
    const radius = 45;
    const circumference = 2 * Math.PI * radius;
    
    if (circle) {
      const offset = circumference - (progress / 100) * circumference;
      circle.style.strokeDashoffset = offset;
    }
    
    if (text) text.textContent = `${Math.round(progress)}%`;
  }

  /**
   * Actualiza progreso semicircular
   */
  updateSemiCircularProgress(element, progress) {
    const path = element.querySelector('.progress-path');
    const text = element.querySelector('.progress-text');
    const radius = 40;
    const circumference = Math.PI * radius;
    
    if (path) {
      const offset = circumference - (progress / 100) * circumference;
      path.style.strokeDashoffset = offset;
    }
    
    if (text) text.textContent = `${Math.round(progress)}%`;
  }

  /**
   * Configura efectos adicionales de scroll
   */
  setupScrollEffects() {
    // Efecto de desvanecimiento en elementos al salir
    const fadeOutElements = DOMHelpers.selectAll('[data-fade-out]');
    
    if (fadeOutElements.length > 0) {
      const fadeOutHandler = DOMHelpers.throttle(() => {
        const scrollTop = window.pageYOffset;
        const windowHeight = window.innerHeight;
        
        fadeOutElements.forEach(element => {
          const rect = element.getBoundingClientRect();
          const elementTop = rect.top + scrollTop;
          const fadeStart = parseInt(element.dataset.fadeStart || windowHeight);
          
          if (scrollTop > fadeStart) {
            const opacity = Math.max(0, 1 - (scrollTop - fadeStart) / windowHeight);
            element.style.opacity = opacity;
          }
        });
      }, 16);

      window.addEventListener('scroll', fadeOutHandler, { passive: true });
    }

    // Efecto sticky mejorado
    this.setupStickyElements();
  }

  /**
   * Configura elementos sticky mejorados
   */
  setupStickyElements() {
    const stickyElements = DOMHelpers.selectAll('[data-sticky]');
    
    stickyElements.forEach(element => {
      const offset = parseInt(element.dataset.stickyOffset || 0);
      
      const stickyObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.intersectionRatio < 1) {
            element.classList.add('is-sticky');
          } else {
            element.classList.remove('is-sticky');
          }
        });
      }, {
        threshold: 1,
        rootMargin: `-${offset}px 0px 0px 0px`
      });

      stickyObserver.observe(element);
      this.observers.push(stickyObserver);
    });
  }

  /**
   * Métodos públicos
   */

  /**
   * Anima elementos manualmente
   */
  animateElements(selector) {
    const elements = DOMHelpers.selectAll(selector);
    elements.forEach(element => {
      if (element.dataset.animate) {
        this.animateElement(element);
      }
    });
  }

  /**
   * Reinicia animaciones
   */
  resetAnimations(selector = null) {
    const elements = selector ? 
      DOMHelpers.selectAll(selector) : 
      this.revealElements;
    
    elements.forEach(element => {
      element.classList.remove('animated');
      this.prepareElement(element);
    });
  }

  /**
   * Pausa todas las animaciones
   */
  pauseAnimations() {
    document.documentElement.style.setProperty('--animation-play-state', 'paused');
  }

  /**
   * Reanuda todas las animaciones
   */
  resumeAnimations() {
    document.documentElement.style.setProperty('--animation-play-state', 'running');
  }

  /**
   * Habilita/deshabilita parallax
   */
  toggleParallax(enabled) {
    this.options.enableParallax = enabled;
    
    if (!enabled) {
      this.parallaxElements.forEach(element => {
        element.style.transform = 'translate3d(0, 0, 0)';
      });
    }
  }

  /**
   * Recalcula posiciones (útil después de cambios dinámicos)
   */
  recalculate() {
    // Desconectar observadores existentes
    this.observers.forEach(observer => observer.disconnect());
    this.observers = [];
    
    // Limpiar arrays
    this.revealElements = [];
    this.counters = [];
    this.progressBars = [];
    
    // Reinicializar
    this.setupRevealAnimations();
    this.setupCounterAnimations();
    this.setupProgressBars();
    this.setupStickyElements();
  }

  /**
   * Obtiene estadísticas de animaciones
   */
  getStats() {
    return {
      revealElements: this.revealElements.length,
      parallaxElements: this.parallaxElements.length,
      counters: this.counters.length,
      progressBars: this.progressBars.length,
      observers: this.observers.length,
      animatedElements: document.querySelectorAll('.animated').length,
      isInitialized: this.isInitialized
    };
  }

  /**
   * Destructor
   */
  destroy() {
    // Cancelar animationFrame pendiente
    if (this.animationFrameId) {
      cancelAnimationFrame(this.animationFrameId);
    }

    // Remover event listeners
    if (this.scrollHandler) {
      window.removeEventListener('scroll', this.scrollHandler);
    }

    // Desconectar observadores
    this.observers.forEach(observer => observer.disconnect());
    
    // Limpiar propiedades
    this.observers = [];
    this.parallaxElements = [];
    this.counters = [];
    this.progressBars = [];
    this.revealElements = [];
    this.isInitialized = false;
    this.animationFrameId = null;
    this.scrollHandler = null;
  }
}

// Auto-inicialización con manejo de errores
DOMHelpers.ready(() => {
  try {
    if (!window.scrollAnimationsInstance) {
      window.scrollAnimationsInstance = new ScrollAnimations({
        threshold: 0.1,
        enableParallax: true,
        enableCounters: true,
        enableReveal: true,
        enableProgressBars: true
      });
    }
  } catch (error) {
    console.error('Error al inicializar ScrollAnimations:', error);
  }
});