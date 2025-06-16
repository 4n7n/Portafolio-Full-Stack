import { DOMHelpers } from '../utils/dom-helpers.js';
import { PORTFOLIO_CONFIG } from '../config/portfolio-config.js';

export class TypingEffect {
  constructor(elementSelector = null, options = {}) {
    // Si no se pasa selector, buscar elementos comunes automáticamente
    if (!elementSelector) {
      const commonSelectors = [
        '.typing-text',
        '#typing-text', 
        '.hero-subtitle',
        '.typing-element',
        '[data-typing]'
      ];
      
      for (const selector of commonSelectors) {
        const element = DOMHelpers.select ? DOMHelpers.select(selector) : document.querySelector(selector);
        if (element) {
          this.element = element;
          console.log(`✅ TypingEffect: Elemento encontrado automáticamente - ${selector}`);
          break;
        }
      }
    } else {
      this.element = typeof elementSelector === 'string' 
        ? (DOMHelpers.select ? DOMHelpers.select(elementSelector) : document.querySelector(elementSelector))
        : elementSelector;
    }
    
    // Configuración con valores de portfolio-config si están disponibles
    const configAnimations = PORTFOLIO_CONFIG?.animations?.typingEffect || {};
    
    this.options = {
      texts: ['Desarrollador Full Stack', 'Frontend Developer', 'Backend Developer'],
      typeSpeed: configAnimations.typeSpeed || 80,
      backSpeed: configAnimations.backSpeed || 50,
      backDelay: 2000,
      startDelay: 500,
      loop: configAnimations.loop !== undefined ? configAnimations.loop : true,
      showCursor: true,
      cursorChar: '|',
      cursorBlinkSpeed: 800,
      ...options
    };

    this.currentTextIndex = 0;
    this.currentCharIndex = 0;
    this.isDeleting = false;
    this.isRunning = false;
    this.timeoutId = null;
    this.cursor = null;
    this.cursorInterval = null;
    this.textElement = null;

    // Validar antes de inicializar
    if (!this.element) {
      console.warn('⚠️ TypingEffect: No se encontró elemento válido para el efecto de escritura');
      return;
    }

    if (!this.options.texts || !Array.isArray(this.options.texts) || this.options.texts.length === 0) {
      console.warn('⚠️ TypingEffect: No hay textos válidos para mostrar');
      return;
    }

    console.log('✅ TypingEffect: Inicializando con elemento:', this.element);
    this.init();
  }

  /**
   * Inicializa el efecto
   */
  init() {
    try {
      this.setupElement();
      this.setupCursor();
      
      setTimeout(() => {
        this.start();
      }, this.options.startDelay);
      
      return true;
    } catch (error) {
      console.error('❌ Error al inicializar TypingEffect:', error);
      return false;
    }
  }

  /**
   * Configura elemento
   */
  setupElement() {
    if (!this.element) {
      throw new Error('Elemento no definido');
    }

    this.element.classList.add('typing-element');
    
    // Preservar contenido existente si es necesario
    const existingText = this.element.textContent.trim();
    if (existingText && !this.options.texts.includes(existingText)) {
      this.options.texts.unshift(existingText);
    }
    
    this.element.innerHTML = '<span class="typing-text"></span>';
    this.textElement = this.element.querySelector('.typing-text');
    
    if (!this.textElement) {
      throw new Error('No se pudo crear elemento de texto');
    }
  }

  /**
   * Configura cursor simple
   */
  setupCursor() {
    if (!this.options.showCursor || !this.element) return;

    this.cursor = document.createElement('span');
    this.cursor.className = 'typing-cursor';
    this.cursor.textContent = this.options.cursorChar;
    this.cursor.style.animation = `blink ${this.options.cursorBlinkSpeed}ms infinite`;
    
    this.element.appendChild(this.cursor);
  }

  /**
   * Inicia el efecto
   */
  start() {
    if (this.isRunning || !this.textElement) return;
    
    this.isRunning = true;
    console.log('🎬 TypingEffect: Iniciando animación');
    this.type();
  }

  /**
   * Para el efecto
   */
  stop() {
    this.isRunning = false;
    if (this.timeoutId) {
      clearTimeout(this.timeoutId);
      this.timeoutId = null;
    }
  }

  /**
   * Función principal optimizada
   */
  type() {
    if (!this.isRunning || !this.textElement) return;

    const currentText = this.options.texts[this.currentTextIndex];
    let displayText = '';
    let delay = this.options.typeSpeed;

    if (this.isDeleting) {
      // Borrar
      displayText = currentText.substring(0, this.currentCharIndex - 1);
      this.currentCharIndex--;
      delay = this.options.backSpeed;
    } else {
      // Escribir
      displayText = currentText.substring(0, this.currentCharIndex + 1);
      this.currentCharIndex++;
    }

    // Actualizar texto directamente
    this.textElement.textContent = displayText;

    // Lógica de control simplificada
    if (!this.isDeleting && this.currentCharIndex === currentText.length) {
      // Terminó de escribir
      delay = this.options.backDelay;
      this.isDeleting = true;
      
      if (!this.options.loop && this.currentTextIndex === this.options.texts.length - 1) {
        this.isRunning = false;
        return;
      }
    } else if (this.isDeleting && this.currentCharIndex === 0) {
      // Terminó de borrar
      this.isDeleting = false;
      this.currentTextIndex = (this.currentTextIndex + 1) % this.options.texts.length;
    }

    // Continuar
    this.timeoutId = setTimeout(() => this.type(), delay);
  }

  /**
   * Cambia textos
   */
  setTexts(newTexts) {
    if (Array.isArray(newTexts) && newTexts.length > 0 && this.textElement) {
      this.stop();
      this.options.texts = newTexts;
      this.currentTextIndex = 0;
      this.currentCharIndex = 0;
      this.isDeleting = false;
      this.textElement.textContent = '';
      this.start();
    }
  }

  /**
   * Destruye el efecto
   */
  destroy() {
    this.stop();
    
    if (this.cursor && this.cursor.parentNode) {
      this.cursor.remove();
    }
    
    if (this.element) {
      this.element.classList.remove('typing-element');
      // No borrar todo el innerHTML para preservar otros elementos
      if (this.textElement && this.textElement.parentNode) {
        this.textElement.remove();
      }
    }
    
    // Limpiar referencias
    this.element = null;
    this.textElement = null;
    this.cursor = null;
  }
}

/**
 * Versión ultra-ligera para dispositivos muy lentos
 */
export class SimpleTyping {
  constructor(element, texts, speed = 100) {
    this.element = typeof element === 'string' ? document.querySelector(element) : element;
    this.texts = Array.isArray(texts) ? texts : ['Desarrollador'];
    this.speed = speed;
    this.index = 0;
    this.charIndex = 0;
    this.isDeleting = false;
    this.timeout = null;

    if (this.element && this.texts.length) {
      this.type();
    } else {
      console.warn('⚠️ SimpleTyping: Elemento o textos no válidos');
    }
  }

  type() {
    if (!this.element || !this.texts.length) return;
    
    const text = this.texts[this.index];
    
    if (this.isDeleting) {
      this.element.textContent = text.substring(0, this.charIndex - 1);
      this.charIndex--;
    } else {
      this.element.textContent = text.substring(0, this.charIndex + 1);
      this.charIndex++;
    }

    let delay = this.speed;

    if (!this.isDeleting && this.charIndex === text.length) {
      delay = 2000;
      this.isDeleting = true;
    } else if (this.isDeleting && this.charIndex === 0) {
      this.isDeleting = false;
      this.index = (this.index + 1) % this.texts.length;
      delay = 500;
    }

    this.timeout = setTimeout(() => this.type(), delay);
  }

  destroy() {
    if (this.timeout) {
      clearTimeout(this.timeout);
    }
  }
}

/**
 * Detector de capacidad del dispositivo
 */
export class DeviceOptimizer {
  static detectPerformance() {
    const navigator = window.navigator;
    const connection = navigator.connection || navigator.mozConnection || navigator.webkitConnection;
    
    let score = 100; // Puntuación base
    
    // CPU cores
    if (navigator.hardwareConcurrency) {
      if (navigator.hardwareConcurrency <= 2) score -= 30;
      else if (navigator.hardwareConcurrency <= 4) score -= 15;
    }
    
    // Memoria
    if (navigator.deviceMemory) {
      if (navigator.deviceMemory <= 2) score -= 40;
      else if (navigator.deviceMemory <= 4) score -= 20;
    }
    
    // Conexión
    if (connection) {
      if (connection.effectiveType === 'slow-2g' || connection.effectiveType === '2g') {
        score -= 30;
      } else if (connection.effectiveType === '3g') {
        score -= 15;
      }
    }
    
    // User Agent hints para móviles de gama baja
    const userAgent = navigator.userAgent.toLowerCase();
    const lowEndDevices = [
      'android 4', 'android 5', 'android 6',
      'iphone os 9', 'iphone os 10', 'iphone os 11',
      'opera mini', 'ucbrowser'
    ];
    
    if (lowEndDevices.some(device => userAgent.includes(device))) {
      score -= 25;
    }
    
    return {
      score,
      tier: score >= 80 ? 'high' : score >= 50 ? 'medium' : 'low'
    };
  }

  static getOptimalConfig(baseConfig = {}) {
    const performance = this.detectPerformance();
    
    switch (performance.tier) {
      case 'low':
        return {
          ...baseConfig,
          typeSpeed: 120,
          backSpeed: 80,
          backDelay: 3000,
          showCursor: false,
          useSimpleVersion: true
        };
      
      case 'medium':
        return {
          ...baseConfig,
          typeSpeed: 80,
          backSpeed: 60,
          backDelay: 2500,
          showCursor: true,
          useSimpleVersion: false
        };
      
      default: // high
        return {
          ...baseConfig,
          typeSpeed: 50,
          backSpeed: 30,
          backDelay: 2000,
          showCursor: true,
          useSimpleVersion: false
        };
    }
  }
}

/**
 * Factory para crear la mejor versión según el dispositivo
 */
export class TypingFactory {
  static create(element = null, options = {}) {
    const devicePerf = DeviceOptimizer.detectPerformance();
    const optimizedConfig = DeviceOptimizer.getOptimalConfig(options);
    
    console.log(`🎭 TypingFactory: Dispositivo detectado - ${devicePerf.tier} (score: ${devicePerf.score})`);
    
    // Si no se proporciona elemento, intentar encontrar uno automáticamente
    if (!element) {
      const commonSelectors = ['.typing-text', '#typing-text', '.hero-subtitle', '[data-typing]'];
      for (const selector of commonSelectors) {
        element = document.querySelector(selector);
        if (element) {
          console.log(`🎯 TypingFactory: Elemento encontrado automáticamente - ${selector}`);
          break;
        }
      }
    }
    
    // Si aún no hay elemento, no crear nada
    if (!element) {
      console.warn('⚠️ TypingFactory: No se encontró elemento para typing effect');
      return null;
    }
    
    if (optimizedConfig.useSimpleVersion || devicePerf.score < 40) {
      // Versión ultra-simple para dispositivos muy limitados
      return new SimpleTyping(
        element,
        optimizedConfig.texts || ['Desarrollador', 'Frontend', 'Backend'],
        optimizedConfig.typeSpeed || 150
      );
    } else {
      // Versión optimizada normal
      return new TypingEffect(element, optimizedConfig);
    }
  }
}

// CSS de animación simple inyectado
const injectMinimalCSS = () => {
  if (document.getElementById('typing-minimal-css')) return;
  
  const style = document.createElement('style');
  style.id = 'typing-minimal-css';
  style.textContent = `
    @keyframes blink {
      0%, 50% { opacity: 1; }
      51%, 100% { opacity: 0; }
    }
    
    .typing-element {
      display: inline-block;
    }
    
    .typing-text {
      display: inline;
    }
    
    .typing-cursor {
      display: inline-block;
      margin-left: 2px;
      color: currentColor;
      animation: blink 800ms infinite;
    }
    
    /* Optimizaciones para dispositivos lentos */
    @media (max-width: 768px) {
      .typing-cursor {
        animation-duration: 1200ms;
      }
    }
    
    /* Reducir animaciones si el usuario lo prefiere */
    @media (prefers-reduced-motion: reduce) {
      .typing-cursor {
        animation: none;
        opacity: 1;
      }
    }
  `;
  document.head.appendChild(style);
};

// Función de inicialización segura para uso desde app.js
export const initTypingEffect = (selector = null, options = {}) => {
  try {
    injectMinimalCSS();
    
    // Si no se especifica selector, buscar automáticamente
    const element = selector 
      ? (typeof selector === 'string' ? document.querySelector(selector) : selector)
      : document.querySelector('.typing-text') || document.querySelector('#typing-text');
    
    if (!element) {
      console.log('📝 TypingEffect: No se encontró elemento para el efecto, saltando...');
      return null;
    }
    
    return TypingFactory.create(element, options);
  } catch (error) {
    console.warn('⚠️ Error al inicializar TypingEffect:', error);
    return null;
  }
};

// Auto-inicialización optimizada (solo si se importa directamente)
const autoInit = () => {
  if (typeof window === 'undefined') return;
  
  const initAutoTyping = () => {
    try {
      injectMinimalCSS();
      
      // Detectar capacidad del dispositivo
      const devicePerf = DeviceOptimizer.detectPerformance();
      
      // Elementos con data-typing
      const typingElements = document.querySelectorAll('[data-typing]');
      
      typingElements.forEach(element => {
        try {
          const texts = element.dataset.typing.split('|').map(text => text.trim());
          const customOptions = {
            texts,
            typeSpeed: parseInt(element.dataset.typeSpeed) || undefined,
            backSpeed: parseInt(element.dataset.backSpeed) || undefined,
            loop: element.dataset.loop !== 'false'
          };
          
          // Crear instancia optimizada
          element._typingEffect = TypingFactory.create(element, customOptions);
        } catch (error) {
          console.warn('⚠️ Error al inicializar typing element:', error);
        }
      });

      // Hero principal con detección automática
      const mainTyping = document.querySelector('#typing-text') || document.querySelector('.typing-text');
      if (mainTyping && !mainTyping.dataset.typing && !mainTyping._typingEffect) {
        try {
          const heroTexts = [
            'Desarrollador Full Stack',
            'Frontend Developer', 
            'Backend Developer',
            'Creador de experiencias'
          ];

          // Usar factory para mejor compatibilidad
          const instance = TypingFactory.create(mainTyping, {
            texts: heroTexts,
            loop: true
          });
          
          if (instance) {
            window.typingEffectInstance = instance;
            console.log(`✅ Typing effect iniciado para dispositivo ${devicePerf.tier}`);
          }
        } catch (error) {
          console.warn('⚠️ Error al inicializar typing principal:', error);
        }
      }
    } catch (error) {
      console.warn('⚠️ Error en auto-inicialización de TypingEffect:', error);
    }
  };

  // Solo auto-inicializar si DOMHelpers está disponible (importación directa)
  if (typeof DOMHelpers !== 'undefined' && DOMHelpers.ready) {
    DOMHelpers.ready(initAutoTyping);
  } else if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initAutoTyping);
  } else {
    initAutoTyping();
  }
};

// Solo auto-inicializar si no se está usando desde app.js
if (typeof window !== 'undefined' && !window.portfolioApp) {
  autoInit();
}

// Exportar para uso global con logging de rendimiento
if (typeof window !== 'undefined') {
  window.TypingEffect = TypingEffect;
  window.SimpleTyping = SimpleTyping;
  window.TypingFactory = TypingFactory;
  window.DeviceOptimizer = DeviceOptimizer;
}