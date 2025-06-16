export class DOMHelpers {
  /**
   * Selecciona un elemento del DOM
   * @param {string} selector - Selector CSS
   * @param {Element} context - Contexto de búsqueda (opcional)
   * @returns {Element|null}
   */
  static select(selector, context = document) {
    return context.querySelector(selector);
  }

  /**
   * Selecciona múltiples elementos del DOM
   * @param {string} selector - Selector CSS
   * @param {Element} context - Contexto de búsqueda (opcional)
   * @returns {NodeList}
   */
  static selectAll(selector, context = document) {
    return context.querySelectorAll(selector);
  }

  /**
   * Crea un elemento con atributos y contenido
   * @param {string} tag - Etiqueta HTML
   * @param {Object} attributes - Atributos del elemento
   * @param {string|Element} content - Contenido del elemento
   * @returns {Element}
   */
  static createElement(tag, attributes = {}, content = '') {
    const element = document.createElement(tag);
    
    // Establecer atributos
    Object.entries(attributes).forEach(([key, value]) => {
      if (key === 'className') {
        element.className = value;
      } else if (key === 'innerHTML') {
        element.innerHTML = value;
      } else if (key === 'textContent') {
        element.textContent = value;
      } else {
        element.setAttribute(key, value);
      }
    });

    // Establecer contenido
    if (content) {
      if (typeof content === 'string') {
        element.textContent = content;
      } else if (content instanceof Element) {
        element.appendChild(content);
      }
    }

    return element;
  }

  /**
   * Añade clases CSS a un elemento
   * @param {Element} element - Elemento DOM
   * @param {...string} classes - Clases a añadir
   */
  static addClass(element, ...classes) {
    if (element && element.classList) {
      element.classList.add(...classes);
    }
  }

  /**
   * Remueve clases CSS de un elemento
   * @param {Element} element - Elemento DOM
   * @param {...string} classes - Clases a remover
   */
  static removeClass(element, ...classes) {
    if (element && element.classList) {
      element.classList.remove(...classes);
    }
  }

  /**
   * Alterna clases CSS en un elemento
   * @param {Element} element - Elemento DOM
   * @param {string} className - Clase a alternar
   * @returns {boolean}
   */
  static toggleClass(element, className) {
    if (element && element.classList) {
      return element.classList.toggle(className);
    }
    return false;
  }

  /**
   * Verifica si un elemento tiene una clase
   * @param {Element} element - Elemento DOM
   * @param {string} className - Clase a verificar
   * @returns {boolean}
   */
  static hasClass(element, className) {
    return element && element.classList && element.classList.contains(className);
  }

  /**
   * Obtiene o establece atributos de un elemento
   * @param {Element} element - Elemento DOM
   * @param {string|Object} attribute - Nombre del atributo u objeto con atributos
   * @param {string} value - Valor del atributo (opcional)
   * @returns {string|null}
   */
  static attr(element, attribute, value) {
    if (!element) return null;

    if (typeof attribute === 'object') {
      // Establecer múltiples atributos
      Object.entries(attribute).forEach(([key, val]) => {
        element.setAttribute(key, val);
      });
      return element;
    }

    if (value !== undefined) {
      // Establecer atributo
      element.setAttribute(attribute, value);
      return element;
    }

    // Obtener atributo
    return element.getAttribute(attribute);
  }

  /**
   * Obtiene o establece el contenido HTML de un elemento
   * @param {Element} element - Elemento DOM
   * @param {string} html - Contenido HTML (opcional)
   * @returns {string|Element}
   */
  static html(element, html) {
    if (!element) return '';

    if (html !== undefined) {
      element.innerHTML = html;
      return element;
    }

    return element.innerHTML;
  }

  /**
   * Obtiene o establece el contenido de texto de un elemento
   * @param {Element} element - Elemento DOM
   * @param {string} text - Contenido de texto (opcional)
   * @returns {string|Element}
   */
  static text(element, text) {
    if (!element) return '';

    if (text !== undefined) {
      element.textContent = text;
      return element;
    }

    return element.textContent;
  }

  /**
   * Añade event listeners a elementos
   * @param {Element|NodeList} elements - Elemento(s) DOM
   * @param {string} event - Tipo de evento
   * @param {Function} handler - Manejador del evento
   * @param {Object} options - Opciones del evento
   */
  static on(elements, event, handler, options = {}) {
    if (!elements) return;

    const elementList = elements.length !== undefined ? elements : [elements];
    
    elementList.forEach(element => {
      if (element && element.addEventListener) {
        element.addEventListener(event, handler, options);
      }
    });
  }

  /**
   * Remueve event listeners de elementos
   * @param {Element|NodeList} elements - Elemento(s) DOM
   * @param {string} event - Tipo de evento
   * @param {Function} handler - Manejador del evento
   * @param {Object} options - Opciones del evento
   */
  static off(elements, event, handler, options = {}) {
    if (!elements) return;

    const elementList = elements.length !== undefined ? elements : [elements];
    
    elementList.forEach(element => {
      if (element && element.removeEventListener) {
        element.removeEventListener(event, handler, options);
      }
    });
  }

  /**
   * Obtiene la posición de un elemento relativa al viewport
   * @param {Element} element - Elemento DOM
   * @returns {Object}
   */
  static getPosition(element) {
    if (!element) return { top: 0, left: 0, width: 0, height: 0 };
    
    const rect = element.getBoundingClientRect();
    return {
      top: rect.top,
      left: rect.left,
      right: rect.right,
      bottom: rect.bottom,
      width: rect.width,
      height: rect.height
    };
  }

  /**
   * Verifica si un elemento está visible en el viewport
   * @param {Element} element - Elemento DOM
   * @param {number} threshold - Porcentaje de visibilidad requerido (0-1)
   * @returns {boolean}
   */
  static isInViewport(element, threshold = 0) {
    if (!element) return false;

    const rect = element.getBoundingClientRect();
    const windowHeight = window.innerHeight || document.documentElement.clientHeight;
    const windowWidth = window.innerWidth || document.documentElement.clientWidth;

    const verticalVisible = rect.top < windowHeight && rect.bottom > 0;
    const horizontalVisible = rect.left < windowWidth && rect.right > 0;

    if (threshold === 0) {
      return verticalVisible && horizontalVisible;
    }

    const visibleHeight = Math.min(rect.bottom, windowHeight) - Math.max(rect.top, 0);
    const visibleWidth = Math.min(rect.right, windowWidth) - Math.max(rect.left, 0);
    const visibleArea = visibleHeight * visibleWidth;
    const totalArea = rect.height * rect.width;

    return visibleArea / totalArea >= threshold;
  }

  /**
   * Realiza scroll suave a un elemento
   * @param {Element|string} target - Elemento o selector
   * @param {Object} options - Opciones de scroll
   */
  static scrollTo(target, options = {}) {
    const element = typeof target === 'string' ? this.select(target) : target;
    if (!element) return;

    const defaultOptions = {
      behavior: 'smooth',
      block: 'start',
      inline: 'nearest',
      offset: 0
    };

    const config = { ...defaultOptions, ...options };

    if (config.offset) {
      const elementTop = element.offsetTop - config.offset;
      window.scrollTo({
        top: elementTop,
        behavior: config.behavior
      });
    } else {
      element.scrollIntoView({
        behavior: config.behavior,
        block: config.block,
        inline: config.inline
      });
    }
  }

  /**
   * Obtiene la posición de scroll actual
   * @returns {Object}
   */
  static getScrollPosition() {
    return {
      x: window.pageXOffset || document.documentElement.scrollLeft,
      y: window.pageYOffset || document.documentElement.scrollTop
    };
  }

  /**
   * Debounce para eventos
   * @param {Function} func - Función a ejecutar
   * @param {number} wait - Tiempo de espera en ms
   * @param {boolean} immediate - Ejecutar inmediatamente
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
   * Throttle para eventos
   * @param {Function} func - Función a ejecutar
   * @param {number} limit - Límite de tiempo en ms
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
   * Espera a que el DOM esté listo
   * @param {Function} callback - Función a ejecutar
   */
  static ready(callback) {
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', callback);
    } else {
      callback();
    }
  }

  /**
   * Copia texto al portapapeles
   * @param {string} text - Texto a copiar
   * @returns {Promise}
   */
  static async copyToClipboard(text) {
    try {
      await navigator.clipboard.writeText(text);
      return true;
    } catch (err) {
      // Fallback para navegadores antiguos
      const textArea = this.createElement('textarea', {
        value: text,
        style: 'position: fixed; top: -9999px; left: -9999px;'
      });
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);
      return true;
    }
  }
}