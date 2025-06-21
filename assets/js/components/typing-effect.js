import { DOMHelpers } from '../utils/dom-helpers.js';
import { PORTFOLIO_CONFIG } from '../config/portfolio-config.js';

/**
 * TypingEffect - Efecto de escritura optimizado
 * Versión corregida y mejorada
 */
export class TypingEffect {
  constructor(elementSelector = null, options = {}) {
    this.element = null;
    this.textElement = null;
    this.cursor = null;
    this.isInitialized = false;
    this.isRunning = false;
    this.isDeleting = false;
    this.currentTextIndex = 0;
    this.currentCharIndex = 0;
    this.timeoutId = null;
    this.cursorInterval = null;
    this.intersectionObserver = null;

    // Encontrar elemento de forma segura
    this.element = this.findElement(elementSelector);
    
    if (!this.element) {
      console.warn('⚠️ TypingEffect: No se encontró elemento válido');
      return;
    }

    // Configuración segura con fallbacks
    this.options = this.buildConfig(options);

    // Validar textos
    if (!this.validateTexts()) {
      console.warn('⚠️ TypingEffect: No hay textos válidos para mostrar');
      return;
    }

    console.log('✅ TypingEffect: Inicializando con elemento:', this.element);
    this.init();
  }

  /**
   * Encuentra elemento de forma segura
   */
  findElement(elementSelector) {
    try {
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
          const element = this.selectElement(selector);
          if (element) {
            console.log(`✅ TypingEffect: Elemento encontrado automáticamente - ${selector}`);
            return element;
          }
        }
        return null;
      }

      // Si se pasa selector específico
      if (typeof elementSelector === 'string') {
        return this.selectElement(elementSelector);
      }

      // Si se pasa elemento DOM directamente
      if (elementSelector && elementSelector.nodeType === Node.ELEMENT_NODE) {
        return elementSelector;
      }

      return null;
    } catch (error) {
      console.error('Error encontrando elemento:', error);
      return null;
    }
  }

  /**
   * Selecciona elemento con fallback
   */
  selectElement(selector) {
    try {
      if (typeof DOMHelpers !== 'undefined' && DOMHelpers.select) {
        return DOMHelpers.select(selector);
      }
      return document.querySelector(selector);
    } catch (error) {
      console.warn('Error seleccionando elemento:', selector, error);
      return null;
    }
  }

  /**
   * Construye configuración de forma segura
   */
  buildConfig(options) {
    try {
      // Obtener configuración de PORTFOLIO_CONFIG de forma segura
      const configAnimations = this.getConfigValue('animations.typingEffect', {});
      
      return {
        texts: options.texts || ['Desarrollador Full Stack', 'Frontend Developer', 'Backend Developer'],
        typeSpeed: this.getValidNumber(options.typeSpeed || configAnimations.typeSpeed || 80, 10, 500),
        backSpeed: this.getValidNumber(options.backSpeed || configAnimations.backSpeed || 50, 10, 300),
        backDelay: this.getValidNumber(options.backDelay || 2000, 500, 10000),
        startDelay: this.getValidNumber(options.startDelay || 500, 0, 5000),
        loop: options.loop !== undefined ? Boolean(options.loop) : (configAnimations.loop !== undefined ? Boolean(configAnimations.loop) : true),
        showCursor: options.showCursor !== undefined ? Boolean(options.showCursor) : true,
        cursorChar: String(options.cursorChar || '|'),
        cursorBlinkSpeed: this.getValidNumber(options.cursorBlinkSpeed || 800, 200, 2000),
        autoStart: options.autoStart !== undefined ? Boolean(options.autoStart) : true,
        pauseOnHover: options.pauseOnHover !== undefined ? Boolean(options.pauseOnHover) : false,
        lazyLoad: options.lazyLoad !== undefined ? Boolean(options.lazyLoad) : true
      };
    } catch (error) {
      console.warn('Error construyendo configuración, usando valores por defecto:', error);
      return {
        texts: ['Desarrollador Full Stack'],
        typeSpeed: 80,
        backSpeed: 50,
        backDelay: 2000,
        startDelay: 500,
        loop: true,
        showCursor: true,
        cursorChar: '|',
        cursorBlinkSpeed: 800,
        autoStart: true,
        pauseOnHover: false,
        lazyLoad: true
      };
    }
  }

  /**
   * Obtiene valor de configuración de forma segura
   */
  getConfigValue(path, defaultValue) {
    try {
      if (typeof PORTFOLIO_CONFIG === 'undefined') {
        return defaultValue;
      }

      const keys = path.split('.');
      let value = PORTFOLIO_CONFIG;
      
      for (const key of keys) {
        if (value && typeof value === 'object' && key in value) {
          value = value[key];
        } else {
          return defaultValue;
        }
      }
      
      return value !== undefined ? value : defaultValue;
    } catch (error) {
      console.warn('Error obteniendo configuración:', path, error);
      return defaultValue;
    }
  }

  /**
   * Valida que un número esté en rango válido
   */
  getValidNumber(value, min, max) {
    const num = parseInt(value);
    if (isNaN(num)) return min;
    return Math.max(min, Math.min(max, num));
  }

  /**
   * Valida los textos
   */
  validateTexts() {
    if (!this.options.texts || !Array.isArray(this.options.texts)) {
      return false;
    }

    // Filtrar textos válidos
    this.options.texts = this.options.texts
      .filter(text => typeof text === 'string' && text.trim().length > 0)
      .map(text => text.trim());

    return this.options.texts.length > 0;
  }

  /**
   * Inicializa el efecto
   */
  init() {
    if (this.isInitialized) {
      console.warn('TypingEffect ya está inicializado');
      return false;
    }

    try {
      this.setupElement();
      this.setupCursor();
      this.setupEventListeners();
      
      if (this.options.lazyLoad) {
        this.setupIntersectionObserver();
      } else if (this.options.autoStart) {
        this.scheduleStart();
      }
      
      this.isInitialized = true;
      return true;
    } catch (error) {
      console.error('❌ Error al inicializar TypingEffect:', error);
      return false;
    }
  }

  /**
   * Configura elemento de forma segura
   */
  setupElement() {
    if (!this.element) {
      throw new Error('Elemento no definido');
    }

    // Añadir clase de identificación
    this.element.classList.add('typing-element');
    
    // Preservar contenido existente si es necesario
    const existingText = this.element.textContent?.trim();
    if (existingText && !this.options.texts.includes(existingText)) {
      this.options.texts.unshift(existingText);
    }
    
    // Crear estructura interna
    this.element.innerHTML = '<span class="typing-text"></span>';
    this.textElement = this.element.querySelector('.typing-text');
    
    if (!this.textElement) {
      throw new Error('No se pudo crear elemento de texto');
    }

    // Configurar accesibilidad
    this.element.setAttribute('aria-live', 'polite');
    this.element.setAttribute('aria-label', 'Texto en animación');
  }

  /**
   * Configura cursor con animación CSS
   */
  setupCursor() {
    if (!this.options.showCursor || !this.element) return;

    try {
      this.cursor = document.createElement('span');
      this.cursor.className = 'typing-cursor';
      this.cursor.textContent = this.options.cursorChar;
      this.cursor.setAttribute('aria-hidden', 'true');
      
      // Aplicar estilos directamente para garantizar funcionamiento
      this.cursor.style.cssText = `
        display: inline-block;
        margin-left: 2px;
        color: currentColor;
        animation: typing-blink ${this.options.cursorBlinkSpeed}ms infinite;
      `;
      
      this.element.appendChild(this.cursor);
      this.injectCursorAnimation();
    } catch (error) {
      console.warn('Error configurando cursor:', error);
      this.options.showCursor = false;
    }
  }

  /**
   * Inyecta animación del cursor
   */
  injectCursorAnimation() {
    if (document.getElementById('typing-cursor-animation')) return;

    try {
      const style = document.createElement('style');
      style.id = 'typing-cursor-animation';
      style.textContent = `
        @keyframes typing-blink {
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
        }
        
        @media (prefers-reduced-motion: reduce) {
          .typing-cursor {
            animation: none !important;
            opacity: 1;
          }
        }
      `;
      document.head.appendChild(style);
    } catch (error) {
      console.warn('Error inyectando estilos de cursor:', error);
    }
  }

  /**
   * Configura event listeners
   */
  setupEventListeners() {
    if (!this.element) return;

    try {
      // Pausar en hover si está habilitado
      if (this.options.pauseOnHover) {
        this.element.addEventListener('mouseenter', () => this.pause());
        this.element.addEventListener('mouseleave', () => this.resume());
      }

      // Parar animaciones si el usuario prefiere movimiento reducido
      if (window.matchMedia) {
        const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
        
        const handleMotionChange = (e) => {
          if (e.matches) {
            this.pause();
          } else if (this.options.autoStart) {
            this.resume();
          }
        };

        prefersReducedMotion.addEventListener('change', handleMotionChange);
        
        // Check inicial
        if (prefersReducedMotion.matches) {
          this.options.autoStart = false;
        }
      }
    } catch (error) {
      console.warn('Error configurando event listeners:', error);
    }
  }

  /**
   * Configura Intersection Observer para lazy loading
   */
  setupIntersectionObserver() {
    if (!this.element || typeof IntersectionObserver === 'undefined') {
      if (this.options.autoStart) {
        this.scheduleStart();
      }
      return;
    }

    try {
      this.intersectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting && !this.isRunning) {
            this.scheduleStart();
            this.intersectionObserver?.unobserve(entry.target);
          }
        });
      }, {
        threshold: 0.1,
        rootMargin: '50px'
      });

      this.intersectionObserver.observe(this.element);
    } catch (error) {
      console.warn('Error configurando IntersectionObserver:', error);
      if (this.options.autoStart) {
        this.scheduleStart();
      }
    }
  }

  /**
   * Programa el inicio con delay
   */
  scheduleStart() {
    if (this.options.startDelay > 0) {
      setTimeout(() => {
        if (!this.isRunning) {
          this.start();
        }
      }, this.options.startDelay);
    } else {
      this.start();
    }
  }

  /**
   * Inicia el efecto de forma segura
   */
  start() {
    if (this.isRunning || !this.textElement || !this.isInitialized) {
      return false;
    }
    
    this.isRunning = true;
    this.currentTextIndex = 0;
    this.currentCharIndex = 0;
    this.isDeleting = false;
    
    console.log('🎬 TypingEffect: Iniciando animación');
    this.type();
    return true;
  }

  /**
   * Para el efecto
   */
  stop() {
    this.isRunning = false;
    this.clearTimeouts();
  }

  /**
   * Pausa el efecto
   */
  pause() {
    if (this.isRunning) {
      this.clearTimeouts();
    }
  }

  /**
   * Reanuda el efecto
   */
  resume() {
    if (!this.isRunning && this.isInitialized) {
      this.start();
    } else if (this.isRunning && !this.timeoutId) {
      this.type();
    }
  }

  /**
   * Limpia timeouts
   */
  clearTimeouts() {
    if (this.timeoutId) {
      clearTimeout(this.timeoutId);
      this.timeoutId = null;
    }
  }

  /**
   * Función principal de escritura optimizada
   */
  type() {
    if (!this.isRunning || !this.textElement || !this.options.texts.length) {
      return;
    }

    try {
      const currentText = this.options.texts[this.currentTextIndex];
      if (!currentText) {
        console.warn('Texto actual no válido:', this.currentTextIndex);
        return;
      }

      let displayText = '';
      let delay = this.options.typeSpeed;

      if (this.isDeleting) {
        // Borrar carácter
        displayText = currentText.substring(0, Math.max(0, this.currentCharIndex - 1));
        this.currentCharIndex = Math.max(0, this.currentCharIndex - 1);
        delay = this.options.backSpeed;
      } else {
        // Escribir carácter
        displayText = currentText.substring(0, this.currentCharIndex + 1);
        this.currentCharIndex++;
      }

      // Actualizar texto de forma segura
      this.textElement.textContent = displayText;

      // Lógica de control
      if (!this.isDeleting && this.currentCharIndex >= currentText.length) {
        // Terminó de escribir
        delay = this.options.backDelay;
        this.isDeleting = true;
        
        // Si no es loop y es el último texto, terminar
        if (!this.options.loop && this.currentTextIndex >= this.options.texts.length - 1) {
          this.isRunning = false;
          console.log('🏁 TypingEffect: Animación completada');
          return;
        }
      } else if (this.isDeleting && this.currentCharIndex <= 0) {
        // Terminó de borrar
        this.isDeleting = false;
        this.currentTextIndex = (this.currentTextIndex + 1) % this.options.texts.length;
        this.currentCharIndex = 0;
        delay = Math.max(delay, 100); // Mínimo delay entre textos
      }

      // Continuar la animación
      this.timeoutId = setTimeout(() => {
        this.type();
      }, delay);

    } catch (error) {
      console.error('Error en función type:', error);
      this.stop();
    }
  }

  /**
   * Cambia los textos dinámicamente
   */
  setTexts(newTexts) {
    if (!Array.isArray(newTexts) || newTexts.length === 0) {
      console.warn('Textos inválidos para setTexts');
      return false;
    }

    try {
      // Validar y limpiar textos
      const validTexts = newTexts
        .filter(text => typeof text === 'string' && text.trim().length > 0)
        .map(text => text.trim());

      if (validTexts.length === 0) {
        console.warn('No hay textos válidos en setTexts');
        return false;
      }

      this.stop();
      this.options.texts = validTexts;
      this.currentTextIndex = 0;
      this.currentCharIndex = 0;
      this.isDeleting = false;
      
      if (this.textElement) {
        this.textElement.textContent = '';
      }
      
      if (this.options.autoStart) {
        this.start();
      }
      
      return true;
    } catch (error) {
      console.error('Error en setTexts:', error);
      return false;
    }
  }

  /**
   * Actualiza la configuración
   */
  updateConfig(newOptions) {
    if (!newOptions || typeof newOptions !== 'object') {
      return false;
    }

    try {
      const wasRunning = this.isRunning;
      this.stop();

      // Actualizar configuración
      this.options = { ...this.options, ...newOptions };

      // Re-validar textos si se cambiaron
      if (newOptions.texts) {
        this.validateTexts();
      }

      // Reiniciar si estaba corriendo
      if (wasRunning && this.options.autoStart) {
        this.start();
      }

      return true;
    } catch (error) {
      console.error('Error actualizando configuración:', error);
      return false;
    }
  }

  /**
   * Obtiene el estado actual
   */
  getState() {
    return {
      isInitialized: this.isInitialized,
      isRunning: this.isRunning,
      isDeleting: this.isDeleting,
      currentTextIndex: this.currentTextIndex,
      currentCharIndex: this.currentCharIndex,
      currentText: this.options.texts[this.currentTextIndex] || '',
      totalTexts: this.options.texts.length
    };
  }

  /**
   * Destruye el efecto de forma segura
   */
  destroy() {
    try {
      // Parar animaciones
      this.stop();

      // Limpiar intersection observer
      if (this.intersectionObserver) {
        this.intersectionObserver.disconnect();
        this.intersectionObserver = null;
      }

      // Remover cursor
      if (this.cursor && this.cursor.parentNode) {
        this.cursor.remove();
        this.cursor = null;
      }

      // Limpiar elemento
      if (this.element) {
        this.element.classList.remove('typing-element');
        this.element.removeAttribute('aria-live');
        this.element.removeAttribute('aria-label');
        
        // Solo limpiar si tenemos control total del elemento
        if (this.textElement && this.textElement.parentNode) {
          this.textElement.remove();
        }
      }

      // Limpiar referencias
      this.element = null;
      this.textElement = null;
      this.isInitialized = false;
      
      console.log('✅ TypingEffect destruido correctamente');
    } catch (error) {
      console.error('Error destruyendo TypingEffect:', error);
    }
  }
}

/**
 * Versión ultra-ligera para dispositivos muy lentos
 */
export class SimpleTyping {
  constructor(element, texts, speed = 100) {
    this.element = null;
    this.texts = [];
    this.speed = 100;
    this.index = 0;
    this.charIndex = 0;
    this.isDeleting = false;
    this.timeout = null;
    this.isRunning = false;

    // Validar elemento
    if (typeof element === 'string') {
      this.element = document.querySelector(element);
    } else if (element && element.nodeType === Node.ELEMENT_NODE) {
      this.element = element;
    }

    if (!this.element) {
      console.warn('⚠️ SimpleTyping: Elemento no válido');
      return;
    }

    // Validar textos
    if (Array.isArray(texts) && texts.length > 0) {
      this.texts = texts.filter(text => typeof text === 'string' && text.trim().length > 0);
    }

    if (this.texts.length === 0) {
      this.texts = ['Desarrollador'];
    }

    // Validar velocidad
    this.speed = Math.max(50, Math.min(500, parseInt(speed) || 100));

    this.type();
  }

  type() {
    if (!this.element || !this.texts.length) return;
    
    try {
      const text = this.texts[this.index];
      
      if (this.isDeleting) {
        this.element.textContent = text.substring(0, Math.max(0, this.charIndex - 1));
        this.charIndex = Math.max(0, this.charIndex - 1);
      } else {
        this.element.textContent = text.substring(0, this.charIndex + 1);
        this.charIndex++;
      }

      let delay = this.speed;

      if (!this.isDeleting && this.charIndex >= text.length) {
        delay = 2000;
        this.isDeleting = true;
      } else if (this.isDeleting && this.charIndex <= 0) {
        this.isDeleting = false;
        this.index = (this.index + 1) % this.texts.length;
        delay = 500;
      }

      this.timeout = setTimeout(() => this.type(), delay);
      this.isRunning = true;
    } catch (error) {
      console.error('Error en SimpleTyping:', error);
      this.destroy();
    }
  }

  destroy() {
    this.isRunning = false;
    if (this.timeout) {
      clearTimeout(this.timeout);
      this.timeout = null;
    }
  }
}

/**
 * Detector de capacidad del dispositivo mejorado
 */
export class DeviceOptimizer {
  static detectPerformance() {
    try {
      const navigator = window.navigator;
      const connection = navigator.connection || navigator.mozConnection || navigator.webkitConnection;
      
      let score = 100; // Puntuación base
      
      // CPU cores
      if (typeof navigator.hardwareConcurrency === 'number') {
        if (navigator.hardwareConcurrency <= 2) score -= 30;
        else if (navigator.hardwareConcurrency <= 4) score -= 15;
      }
      
      // Memoria (solo disponible en algunos navegadores)
      if (typeof navigator.deviceMemory === 'number') {
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
      
      // User Agent para dispositivos de gama baja
      const userAgent = navigator.userAgent.toLowerCase();
      const lowEndIndicators = [
        'android 4', 'android 5', 'android 6',
        'iphone os 9', 'iphone os 10', 'iphone os 11',
        'opera mini', 'ucbrowser', 'facebook', 'fban'
      ];
      
      if (lowEndIndicators.some(indicator => userAgent.includes(indicator))) {
        score -= 25;
      }

      // Preferencias de movimiento reducido
      if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        score -= 20;
      }
      
      return {
        score: Math.max(0, Math.min(100, score)),
        tier: score >= 80 ? 'high' : score >= 50 ? 'medium' : 'low'
      };
    } catch (error) {
      console.warn('Error detectando rendimiento del dispositivo:', error);
      return { score: 50, tier: 'medium' };
    }
  }

  static getOptimalConfig(baseConfig = {}) {
    const performance = this.detectPerformance();
    
    const configs = {
      low: {
        ...baseConfig,
        typeSpeed: 120,
        backSpeed: 80,
        backDelay: 3000,
        showCursor: false,
        useSimpleVersion: true,
        lazyLoad: true
      },
      medium: {
        ...baseConfig,
        typeSpeed: 80,
        backSpeed: 60,
        backDelay: 2500,
        showCursor: true,
        useSimpleVersion: false,
        lazyLoad: true
      },
      high: {
        ...baseConfig,
        typeSpeed: 50,
        backSpeed: 30,
        backDelay: 2000,
        showCursor: true,
        useSimpleVersion: false,
        lazyLoad: false
      }
    };

    return configs[performance.tier] || configs.medium;
  }
}

/**
 * Factory para crear la mejor versión según el dispositivo
 */
export class TypingFactory {
  static create(element = null, options = {}) {
    try {
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
        // Versión completa optimizada
        return new TypingEffect(element, optimizedConfig);
      }
    } catch (error) {
      console.error('Error en TypingFactory:', error);
      return null;
    }
  }
}

/**
 * Función de inicialización segura para uso desde app.js
 */
export const initTypingEffect = (selector = null, options = {}) => {
  try {
    injectMinimalCSS();
    
    // Si no se especifica selector, buscar automáticamente
    const element = selector 
      ? (typeof selector === 'string' ? document.querySelector(selector) : selector)
      : document.querySelector('.typing-text') || document.querySelector('#typing-text');
    
    if (!element) {
      console.log('📝 TypingEffect: No se encontró elemento para el efecto');
      return null;
    }
    
    return TypingFactory.create(element, options);
  } catch (error) {
    console.warn('⚠️ Error al inicializar TypingEffect:', error);
    return null;
  }
};

/**
 * Inyecta CSS mínimo necesario
 */
const injectMinimalCSS = () => {
  if (document.getElementById('typing-minimal-css')) return;
  
  try {
    const style = document.createElement('style');
    style.id = 'typing-minimal-css';
    style.textContent = `
      @keyframes typing-blink {
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
        animation: typing-blink 800ms infinite;
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
          animation: none !important;
          opacity: 1;
        }
        
        .typing-element {
          animation: none !important;
        }
      }
    `;
    document.head.appendChild(style);
  } catch (error) {
    console.warn('Error inyectando CSS mínimo:', error);
  }
};

/**
 * Auto-inicialización optimizada y segura
 */
const autoInit = () => {
  if (typeof window === 'undefined') return;
  
  const initAutoTyping = () => {
    try {
      injectMinimalCSS();
      
      // Solo proceder si no hay ya una instancia principal
      if (window.typingEffectInstance) {
        console.log('TypingEffect ya está inicializado globalmente');
        return;
      }
      
      // Detectar capacidad del dispositivo
      const devicePerf = DeviceOptimizer.detectPerformance();
      console.log(`📱 Dispositivo detectado: ${devicePerf.tier} (puntuación: ${devicePerf.score})`);
      
      // Elementos con data-typing
      const typingElements = document.querySelectorAll('[data-typing]');
      
      typingElements.forEach((element, index) => {
        try {
          const typingData = element.dataset.typing;
          if (!typingData) return;

          const texts = typingData.split('|')
            .map(text => text.trim())
            .filter(text => text.length > 0);
          
          if (texts.length === 0) return;

          const customOptions = {
            texts,
            typeSpeed: parseInt(element.dataset.typeSpeed) || undefined,
            backSpeed: parseInt(element.dataset.backSpeed) || undefined,
            backDelay: parseInt(element.dataset.backDelay) || undefined,
            loop: element.dataset.loop !== 'false',
            showCursor: element.dataset.showCursor !== 'false',
            autoStart: element.dataset.autoStart !== 'false'
          };
          
          // Crear instancia optimizada
          const instance = TypingFactory.create(element, customOptions);
          if (instance) {
            element._typingEffect = instance;
            console.log(`✅ Typing effect ${index + 1} inicializado`);
          }
        } catch (error) {
          console.warn('⚠️ Error al inicializar typing element:', error);
        }
      });

      // Hero principal con detección automática
      const mainTyping = document.querySelector('#typing-text') || 
                        document.querySelector('.typing-text') ||
                        document.querySelector('.hero-subtitle[data-typing]');
                        
      if (mainTyping && !mainTyping.dataset.typing && !mainTyping._typingEffect) {
        try {
          const heroTexts = [
            'Desarrollador Full Stack',
            'Frontend Developer', 
            'Backend Developer',
            'Creador de experiencias digitales'
          ];

          // Usar factory para mejor compatibilidad
          const instance = TypingFactory.create(mainTyping, {
            texts: heroTexts,
            loop: true,
            autoStart: true,
            lazyLoad: true
          });
          
          if (instance) {
            window.typingEffectInstance = instance;
            console.log(`✅ Typing effect principal iniciado para dispositivo ${devicePerf.tier}`);
          }
        } catch (error) {
          console.warn('⚠️ Error al inicializar typing principal:', error);
        }
      }
    } catch (error) {
      console.warn('⚠️ Error en auto-inicialización de TypingEffect:', error);
    }
  };

  // Múltiples estrategias de inicialización para máxima compatibilidad
  const strategies = [
    // Estrategia 1: DOMHelpers si está disponible
    () => {
      if (typeof DOMHelpers !== 'undefined' && DOMHelpers.ready) {
        DOMHelpers.ready(initAutoTyping);
        return true;
      }
      return false;
    },
    
    // Estrategia 2: DOMContentLoaded
    () => {
      if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initAutoTyping);
        return true;
      }
      return false;
    },
    
    // Estrategia 3: Immediate si DOM ya está listo
    () => {
      if (document.readyState === 'interactive' || document.readyState === 'complete') {
        // Pequeño delay para asegurar que otros scripts se carguen
        setTimeout(initAutoTyping, 100);
        return true;
      }
      return false;
    }
  ];

  // Ejecutar primera estrategia que funcione
  for (const strategy of strategies) {
    try {
      if (strategy()) break;
    } catch (error) {
      console.warn('Error en estrategia de inicialización:', error);
    }
  }

  // Fallback final con timeout más largo
  setTimeout(() => {
    if (!window.typingEffectInstance && !document.querySelector('[data-typing]')) {
      console.log('🔄 Fallback: Intentando inicialización tardía de TypingEffect');
      initAutoTyping();
    }
  }, 2000);
};

// Solo auto-inicializar si no se está usando desde app.js
if (typeof window !== 'undefined' && !window.portfolioApp) {
  autoInit();
}

// Exportar clases para uso global
if (typeof window !== 'undefined') {
  // Solo asignar si no existen ya
  window.TypingEffect = window.TypingEffect || TypingEffect;
  window.SimpleTyping = window.SimpleTyping || SimpleTyping;
  window.TypingFactory = window.TypingFactory || TypingFactory;
  window.DeviceOptimizer = window.DeviceOptimizer || DeviceOptimizer;
  window.initTypingEffect = window.initTypingEffect || initTypingEffect;
}

// Export por defecto
export default TypingEffect;