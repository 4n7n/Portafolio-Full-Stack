export class DOMHelpers {
  
  /**
   * Encuentra elemento por selector con validación
   * @param {string} selector - CSS selector
   * @param {Element|Document} context - Context element
   * @returns {Element|null}
   */
  static findElement(selector, context = document) {
    const element = context.querySelector(selector);
    if (!element) {
      console.warn(`⚠️ Elemento no encontrado: ${selector}`);
    }
    return element;
  }

  /**
   * Encuentra múltiples elementos
   * @param {string} selector - CSS selector
   * @param {Element|Document} context - Context element
   * @returns {Element[]}
   */
  static findElements(selector, context = document) {
    return Array.from(context.querySelectorAll(selector));
  }

  /**
   * Añade clase con verificación
   * @param {Element} element - Target element
   * @param {string} className - Class name to add
   */
  static addClass(element, className) {
    if (element && className) {
      element.classList.add(className);
    }
  }

  /**
   * Remueve clase con verificación
   * @param {Element} element - Target element
   * @param {string} className - Class name to remove
   */
  static removeClass(element, className) {
    if (element && className) {
      element.classList.remove(className);
    }
  }

  /**
   * Toggle clase con verificación
   * @param {Element} element - Target element
   * @param {string} className - Class name to toggle
   * @param {boolean} force - Force add/remove
   * @returns {boolean}
   */
  static toggleClass(element, className, force = undefined) {
    if (element && className) {
      return element.classList.toggle(className, force);
    }
    return false;
  }

  /**
   * Verificar si elemento tiene clase
   * @param {Element} element - Element to check
   * @param {string} className - Class name to check
   * @returns {boolean}
   */
  static hasClass(element, className) {
    return element && element.classList.contains(className);
  }

  /**
   * Crear elemento con atributos
   * @param {string} tag - HTML tag name
   * @param {Object} attributes - Element attributes
   * @param {string} textContent - Text content
   * @returns {Element}
   */
  static createElement(tag, attributes = {}, textContent = '') {
    const element = document.createElement(tag);
    
    Object.entries(attributes).forEach(([key, value]) => {
      if (key === 'className') {
        element.className = value;
      } else if (key === 'dataset') {
        Object.entries(value).forEach(([dataKey, dataValue]) => {
          element.dataset[dataKey] = dataValue;
        });
      } else {
        element.setAttribute(key, value);
      }
    });
    
    if (textContent) {
      element.textContent = textContent;
    }
    
    return element;
  }

  /**
   * Insertar HTML de forma segura
   * @param {Element} element - Target element
   * @param {string} html - HTML content
   */
  static setHTML(element, html) {
    if (element) {
      element.innerHTML = html;
    }
  }

  /**
   * Obtener posición del elemento
   * @param {Element} element - Target element
   * @returns {Object}
   */
  static getElementPosition(element) {
    if (!element) return { top: 0, left: 0, width: 0, height: 0 };
    
    const rect = element.getBoundingClientRect();
    return {
      top: rect.top + window.pageYOffset,
      left: rect.left + window.pageXOffset,
      width: rect.width,
      height: rect.height
    };
  }

  /**
   * Verificar si elemento está en viewport
   * @param {Element} element - Element to check
   * @param {number} threshold - Threshold in pixels
   * @returns {boolean}
   */
  static isInViewport(element, threshold = 0) {
    if (!element) return false;
    
    const rect = element.getBoundingClientRect();
    const windowHeight = window.innerHeight || document.documentElement.clientHeight;
    const windowWidth = window.innerWidth || document.documentElement.clientWidth;
    
    return (
      rect.top >= -threshold &&
      rect.left >= -threshold &&
      rect.bottom <= windowHeight + threshold &&
      rect.right <= windowWidth + threshold
    );
  }

  /**
   * Smooth scroll a elemento
   * @param {Element} element - Element to scroll to
   * @param {number} offset - Offset in pixels
   * @param {string} behavior - Scroll behavior
   */
  static scrollToElement(element, offset = 0, behavior = 'smooth') {
    if (!element) return;
    
    const elementPosition = this.getElementPosition(element);
    const offsetPosition = elementPosition.top - offset;
    
    window.scrollTo({
      top: offsetPosition,
      behavior: behavior
    });
  }

  /**
   * Debounce función
   * @param {Function} func - Function to debounce
   * @param {number} wait - Wait time in milliseconds
   * @param {boolean} immediate - Execute immediately
   * @returns {Function}
   */
  static debounce(func, wait, immediate = false) {
    let timeout;
    return function executedFunction(...args) {
      const later = () => {
        timeout = null;
        if (!immediate) func(...args);
      };
      const callNow = immediate && !timeout;
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
      if (callNow) func(...args);
    };
  }

  /**
   * Throttle función
   * @param {Function} func - Function to throttle
   * @param {number} limit - Limit in milliseconds
   * @returns {Function}
   */
  static throttle(func, limit) {
    let inThrottle;
    return function(...args) {
      if (!inThrottle) {
        func.apply(this, args);
        inThrottle = true;
        setTimeout(() => inThrottle = false, limit);
      }
    };
  }

  /**
   * Esperar a que elemento esté disponible
   * @param {string} selector - CSS selector
   * @param {number} timeout - Timeout in milliseconds
   * @returns {Promise<Element>}
   */
  static waitForElement(selector, timeout = 10000) {
    return new Promise((resolve, reject) => {
      const element = document.querySelector(selector);
      if (element) {
        resolve(element);
        return;
      }

      const observer = new MutationObserver((mutations, obs) => {
        const element = document.querySelector(selector);
        if (element) {
          obs.disconnect();
          resolve(element);
        }
      });

      observer.observe(document.body, {
        childList: true,
        subtree: true
      });

      setTimeout(() => {
        observer.disconnect();
        reject(new Error(`Elemento ${selector} no encontrado en ${timeout}ms`));
      }, timeout);
    });
  }

  /**
   * Cargar script dinámicamente
   * @param {string} src - Script source URL
   * @returns {Promise}
   */
  static loadScript(src) {
    return new Promise((resolve, reject) => {
      const script = document.createElement('script');
      script.src = src;
      script.onload = resolve;
      script.onerror = reject;
      document.head.appendChild(script);
    });
  }

  /**
   * Obtener datos de elemento
   * @param {Element} element - Target element
   * @param {string} key - Data key
   * @returns {string|null}
   */
  static getElementData(element, key) {
    if (!element) return null;
    return element.dataset[key] || element.getAttribute(`data-${key}`);
  }

  /**
   * Establecer datos de elemento
   * @param {Element} element - Target element
   * @param {string} key - Data key
   * @param {string} value - Data value
   */
  static setElementData(element, key, value) {
    if (element) {
      element.dataset[key] = value;
    }
  }

  // =========================================
  // DEVICE DETECTION METHODS
  // =========================================
  
  /**
   * Check if device is mobile
   * @returns {boolean}
   */
  static isMobile() {
    return /Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ||
           (window.innerWidth <= 768 && 'ontouchstart' in window);
  }
  
  /**
   * Check if device is tablet
   * @returns {boolean}
   */
  static isTablet() {
    const userAgent = navigator.userAgent.toLowerCase();
    const isTabletUA = /(ipad|tablet|(android(?!.*mobile))|(windows(?!.*phone)(.*touch))|kindle|playbook|silk|(puffin(?!.*(IP|AP|WP))))/i.test(userAgent);
    const isTabletSize = window.innerWidth >= 768 && window.innerWidth <= 1024;
    return isTabletUA || (isTabletSize && 'ontouchstart' in window);
  }
  
  /**
   * Check if device is desktop
   * @returns {boolean}
   */
  static isDesktop() {
    return !this.isMobile() && !this.isTablet();
  }
  
  /**
   * Get device type
   * @returns {string} 'mobile' | 'tablet' | 'desktop'
   */
  static getDeviceType() {
    if (this.isMobile()) return 'mobile';
    if (this.isTablet()) return 'tablet';
    return 'desktop';
  }
  
  /**
   * Check if device has touch capability
   * @returns {boolean}
   */
  static hasTouch() {
    return 'ontouchstart' in window || 
           navigator.maxTouchPoints > 0 || 
           navigator.msMaxTouchPoints > 0;
  }
  
  /**
   * Get maximum touch points
   * @returns {number}
   */
  static getMaxTouchPoints() {
    return navigator.maxTouchPoints || navigator.msMaxTouchPoints || 0;
  }
  
  /**
   * Check if device supports hover
   * @returns {boolean}
   */
  static supportsHover() {
    return window.matchMedia('(hover: hover)').matches;
  }
  
  /**
   * Get device orientation
   * @returns {string} 'portrait' | 'landscape'
   */
  static getOrientation() {
    if (screen.orientation) {
      return screen.orientation.angle === 0 || screen.orientation.angle === 180 
        ? 'portrait' : 'landscape';
    }
    return window.innerHeight > window.innerWidth ? 'portrait' : 'landscape';
  }
  
  /**
   * Check if device is in landscape mode
   * @returns {boolean}
   */
  static isLandscape() {
    return this.getOrientation() === 'landscape';
  }
  
  /**
   * Check if device is in portrait mode
   * @returns {boolean}
   */
  static isPortrait() {
    return this.getOrientation() === 'portrait';
  }

  // =========================================
  // VIEWPORT AND SCREEN METHODS
  // =========================================

  /**
   * Get viewport dimensions
   * @returns {Object}
   */
  static getViewportSize() {
    return {
      width: window.innerWidth || document.documentElement.clientWidth,
      height: window.innerHeight || document.documentElement.clientHeight
    };
  }

  /**
   * Get screen dimensions
   * @returns {Object}
   */
  static getScreenSize() {
    return {
      width: screen.width,
      height: screen.height,
      availWidth: screen.availWidth,
      availHeight: screen.availHeight
    };
  }

  /**
   * Get current breakpoint
   * @returns {string}
   */
  static getCurrentBreakpoint() {
    const width = window.innerWidth;
    if (width < 576) return 'xs';
    if (width < 768) return 'sm';
    if (width < 992) return 'md';
    if (width < 1200) return 'lg';
    if (width < 1400) return 'xl';
    return 'xxl';
  }

  /**
   * Check if viewport matches breakpoint
   * @param {string} breakpoint - Breakpoint name
   * @returns {boolean}
   */
  static matchesBreakpoint(breakpoint) {
    const breakpoints = {
      xs: 576,
      sm: 768,
      md: 992,
      lg: 1200,
      xl: 1400
    };
    
    const width = window.innerWidth;
    const minWidth = breakpoints[breakpoint] || 0;
    const nextBreakpoint = Object.keys(breakpoints)[Object.keys(breakpoints).indexOf(breakpoint) + 1];
    const maxWidth = nextBreakpoint ? breakpoints[nextBreakpoint] - 1 : Infinity;
    
    return width >= minWidth && width <= maxWidth;
  }

  // =========================================
  // EVENT HANDLING METHODS
  // =========================================

  /**
   * Add event listener with options
   * @param {Element} element - Target element
   * @param {string} event - Event type
   * @param {Function} handler - Event handler
   * @param {Object} options - Event options
   */
  static addEventListener(element, event, handler, options = {}) {
    if (element && typeof handler === 'function') {
      element.addEventListener(event, handler, options);
    }
  }

  /**
   * Remove event listener
   * @param {Element} element - Target element
   * @param {string} event - Event type
   * @param {Function} handler - Event handler
   */
  static removeEventListener(element, event, handler) {
    if (element && typeof handler === 'function') {
      element.removeEventListener(event, handler);
    }
  }

  /**
   * Listen for orientation change
   * @param {Function} callback - Callback function
   * @returns {Function} Cleanup function
   */
  static onOrientationChange(callback) {
    const handler = () => {
      setTimeout(() => callback(this.getOrientation()), 100);
    };
    
    window.addEventListener('orientationchange', handler);
    window.addEventListener('resize', handler);
    
    return () => {
      window.removeEventListener('orientationchange', handler);
      window.removeEventListener('resize', handler);
    };
  }

  /**
   * Listen for viewport resize
   * @param {Function} callback - Callback function
   * @param {number} delay - Debounce delay
   * @returns {Function} Cleanup function
   */
  static onViewportResize(callback, delay = 250) {
    const debouncedCallback = this.debounce(callback, delay);
    window.addEventListener('resize', debouncedCallback);
    
    return () => {
      window.removeEventListener('resize', debouncedCallback);
    };
  }
}

// =========================================
// LEGACY OBJECT EXPORT (For compatibility)
// =========================================

export const DOMHelpersObject = {
  // Basic DOM methods
  findElement: DOMHelpers.findElement,
  findElements: DOMHelpers.findElements,
  addClass: DOMHelpers.addClass,
  removeClass: DOMHelpers.removeClass,
  toggleClass: DOMHelpers.toggleClass,
  hasClass: DOMHelpers.hasClass,
  createElement: DOMHelpers.createElement,
  setHTML: DOMHelpers.setHTML,
  getElementPosition: DOMHelpers.getElementPosition,
  isInViewport: DOMHelpers.isInViewport,
  scrollToElement: DOMHelpers.scrollToElement,
  debounce: DOMHelpers.debounce,
  throttle: DOMHelpers.throttle,
  waitForElement: DOMHelpers.waitForElement,
  loadScript: DOMHelpers.loadScript,
  getElementData: DOMHelpers.getElementData,
  setElementData: DOMHelpers.setElementData,
  
  // Device detection methods
  isMobile: DOMHelpers.isMobile,
  isTablet: DOMHelpers.isTablet,
  isDesktop: DOMHelpers.isDesktop,
  getDeviceType: DOMHelpers.getDeviceType,
  hasTouch: DOMHelpers.hasTouch,
  getMaxTouchPoints: DOMHelpers.getMaxTouchPoints,
  supportsHover: DOMHelpers.supportsHover,
  getOrientation: DOMHelpers.getOrientation,
  isLandscape: DOMHelpers.isLandscape,
  isPortrait: DOMHelpers.isPortrait,
  
  // Viewport methods
  getViewportSize: DOMHelpers.getViewportSize,
  getScreenSize: DOMHelpers.getScreenSize,
  getCurrentBreakpoint: DOMHelpers.getCurrentBreakpoint,
  matchesBreakpoint: DOMHelpers.matchesBreakpoint,
  
  // Event methods
  addEventListener: DOMHelpers.addEventListener,
  removeEventListener: DOMHelpers.removeEventListener,
  onOrientationChange: DOMHelpers.onOrientationChange,
  onViewportResize: DOMHelpers.onViewportResize
};

// Default export
export default DOMHelpers;