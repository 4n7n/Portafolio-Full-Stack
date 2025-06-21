export class DOMHelpers {
  /**
   * Selecciona un elemento del DOM
   * @param {string} selector - Selector CSS
   * @param {Element|Document} context - Contexto de búsqueda (opcional)
   * @returns {Element|null}
   */
  static select(selector, context = document) {
    if (!selector || typeof selector !== 'string') {
      console.warn('Selector debe ser una cadena válida');
      return null;
    }
    
    try {
      return context.querySelector(selector);
    } catch (error) {
      console.error('Error en selector CSS:', error);
      return null;
    }
  }

  /**
   * Selecciona múltiples elementos del DOM
   * @param {string} selector - Selector CSS
   * @param {Element|Document} context - Contexto de búsqueda (opcional)
   * @returns {NodeList}
   */
  static selectAll(selector, context = document) {
    if (!selector || typeof selector !== 'string') {
      console.warn('Selector debe ser una cadena válida');
      return [];
    }
    
    try {
      return context.querySelectorAll(selector);
    } catch (error) {
      console.error('Error en selector CSS:', error);
      return [];
    }
  }

  /**
   * Crea un elemento con atributos y contenido
   * @param {string} tag - Etiqueta HTML
   * @param {Object} attributes - Atributos del elemento
   * @param {string|Element|Array} content - Contenido del elemento
   * @returns {Element|null}
   */
  static createElement(tag, attributes = {}, content = '') {
    if (!tag || typeof tag !== 'string') {
      console.error('Tag es requerido y debe ser una cadena');
      return null;
    }

    try {
      const element = document.createElement(tag);
      
      // Establecer atributos
      if (attributes && typeof attributes === 'object') {
        Object.entries(attributes).forEach(([key, value]) => {
          if (value === null || value === undefined) return;
          
          try {
            if (key === 'className' || key === 'class') {
              element.className = value;
            } else if (key === 'innerHTML') {
              element.innerHTML = value;
            } else if (key === 'textContent') {
              element.textContent = value;
            } else if (key === 'style' && typeof value === 'object') {
              Object.assign(element.style, value);
            } else if (key.startsWith('data-') || key.startsWith('aria-')) {
              element.setAttribute(key, value);
            } else if (key === 'onclick' || key.startsWith('on')) {
              // Manejar eventos como propiedades
              element[key] = value;
            } else {
              element.setAttribute(key, value);
            }
          } catch (attrError) {
            console.warn(`Error estableciendo atributo ${key}:`, attrError);
          }
        });
      }

      // Establecer contenido
      if (content !== null && content !== undefined) {
        this.setContent(element, content);
      }

      return element;
    } catch (error) {
      console.error('Error creando elemento:', error);
      return null;
    }
  }

  /**
   * Establece el contenido de un elemento
   * @param {Element} element - Elemento DOM
   * @param {string|Element|Array} content - Contenido
   */
  static setContent(element, content) {
    if (!element) return;

    try {
      if (typeof content === 'string') {
        element.textContent = content;
      } else if (content instanceof Element) {
        element.appendChild(content);
      } else if (Array.isArray(content)) {
        content.forEach(item => {
          if (typeof item === 'string') {
            element.appendChild(document.createTextNode(item));
          } else if (item instanceof Element) {
            element.appendChild(item);
          }
        });
      }
    } catch (error) {
      console.error('Error estableciendo contenido:', error);
    }
  }

  /**
   * Añade clases CSS a un elemento
   * @param {Element} element - Elemento DOM
   * @param {...string} classes - Clases a añadir
   */
  static addClass(element, ...classes) {
    if (!element || !element.classList) {
      console.warn('Elemento inválido para añadir clases');
      return;
    }

    const validClasses = classes.filter(cls => 
      cls && typeof cls === 'string' && cls.trim()
    );

    if (validClasses.length > 0) {
      try {
        element.classList.add(...validClasses);
      } catch (error) {
        console.error('Error añadiendo clases:', error);
      }
    }
  }

  /**
   * Remueve clases CSS de un elemento
   * @param {Element} element - Elemento DOM
   * @param {...string} classes - Clases a remover
   */
  static removeClass(element, ...classes) {
    if (!element || !element.classList) {
      console.warn('Elemento inválido para remover clases');
      return;
    }

    const validClasses = classes.filter(cls => 
      cls && typeof cls === 'string' && cls.trim()
    );

    if (validClasses.length > 0) {
      try {
        element.classList.remove(...validClasses);
      } catch (error) {
        console.error('Error removiendo clases:', error);
      }
    }
  }

  /**
   * Alterna clases CSS en un elemento
   * @param {Element} element - Elemento DOM
   * @param {string} className - Clase a alternar
   * @param {boolean} force - Forzar estado (opcional)
   * @returns {boolean}
   */
  static toggleClass(element, className, force) {
    if (!element || !element.classList || !className || typeof className !== 'string') {
      console.warn('Parámetros inválidos para alternar clase');
      return false;
    }

    try {
      return element.classList.toggle(className, force);
    } catch (error) {
      console.error('Error alternando clase:', error);
      return false;
    }
  }

  /**
   * Verifica si un elemento tiene una clase
   * @param {Element} element - Elemento DOM
   * @param {string} className - Clase a verificar
   * @returns {boolean}
   */
  static hasClass(element, className) {
    if (!element || !element.classList || !className || typeof className !== 'string') {
      return false;
    }

    try {
      return element.classList.contains(className);
    } catch (error) {
      console.error('Error verificando clase:', error);
      return false;
    }
  }

  /**
   * Obtiene o establece atributos de un elemento
   * @param {Element} element - Elemento DOM
   * @param {string|Object} attribute - Nombre del atributo u objeto con atributos
   * @param {string} value - Valor del atributo (opcional)
   * @returns {string|null|Element}
   */
  static attr(element, attribute, value) {
    if (!element) {
      console.warn('Elemento requerido para operación de atributo');
      return null;
    }

    try {
      if (typeof attribute === 'object' && attribute !== null) {
        // Establecer múltiples atributos
        Object.entries(attribute).forEach(([key, val]) => {
          if (val !== null && val !== undefined) {
            element.setAttribute(key, val);
          }
        });
        return element;
      }

      if (typeof attribute !== 'string') {
        console.warn('Nombre de atributo debe ser una cadena');
        return null;
      }

      if (value !== undefined) {
        // Establecer atributo
        if (value === null) {
          element.removeAttribute(attribute);
        } else {
          element.setAttribute(attribute, value);
        }
        return element;
      }

      // Obtener atributo
      return element.getAttribute(attribute);
    } catch (error) {
      console.error('Error en operación de atributo:', error);
      return null;
    }
  }

  /**
   * Obtiene o establece el contenido HTML de un elemento
   * @param {Element} element - Elemento DOM
   * @param {string} html - Contenido HTML (opcional)
   * @returns {string|Element}
   */
  static html(element, html) {
    if (!element) {
      console.warn('Elemento requerido para operación HTML');
      return '';
    }

    try {
      if (html !== undefined) {
        element.innerHTML = html;
        return element;
      }
      return element.innerHTML;
    } catch (error) {
      console.error('Error en operación HTML:', error);
      return html !== undefined ? element : '';
    }
  }

  /**
   * Obtiene o establece el contenido de texto de un elemento
   * @param {Element} element - Elemento DOM
   * @param {string} text - Contenido de texto (opcional)
   * @returns {string|Element}
   */
  static text(element, text) {
    if (!element) {
      console.warn('Elemento requerido para operación de texto');
      return '';
    }

    try {
      if (text !== undefined) {
        element.textContent = text;
        return element;
      }
      return element.textContent || '';
    } catch (error) {
      console.error('Error en operación de texto:', error);
      return text !== undefined ? element : '';
    }
  }

  /**
   * Añade event listeners a elementos
   * @param {Element|NodeList|Array} elements - Elemento(s) DOM
   * @param {string} event - Tipo de evento
   * @param {Function} handler - Manejador del evento
   * @param {Object|boolean} options - Opciones del evento
   */
  static on(elements, event, handler, options = {}) {
    if (!elements || !event || typeof handler !== 'function') {
      console.warn('Parámetros inválidos para añadir event listener');
      return;
    }

    const elementList = this.normalizeElementList(elements);
    
    elementList.forEach(element => {
      if (element && element.addEventListener) {
        try {
          element.addEventListener(event, handler, options);
        } catch (error) {
          console.error('Error añadiendo event listener:', error);
        }
      }
    });
  }

  /**
   * Remueve event listeners de elementos
   * @param {Element|NodeList|Array} elements - Elemento(s) DOM
   * @param {string} event - Tipo de evento
   * @param {Function} handler - Manejador del evento
   * @param {Object|boolean} options - Opciones del evento
   */
  static off(elements, event, handler, options = {}) {
    if (!elements || !event || typeof handler !== 'function') {
      console.warn('Parámetros inválidos para remover event listener');
      return;
    }

    const elementList = this.normalizeElementList(elements);
    
    elementList.forEach(element => {
      if (element && element.removeEventListener) {
        try {
          element.removeEventListener(event, handler, options);
        } catch (error) {
          console.error('Error removiendo event listener:', error);
        }
      }
    });
  }

  /**
   * Normaliza una lista de elementos
   * @param {Element|NodeList|Array} elements - Elementos
   * @returns {Array}
   */
  static normalizeElementList(elements) {
    if (!elements) return [];
    
    if (elements instanceof Element) {
      return [elements];
    }
    
    if (elements instanceof NodeList || Array.isArray(elements)) {
      return Array.from(elements);
    }
    
    return [];
  }

  /**
   * Obtiene la posición de un elemento relativa al viewport
   * @param {Element} element - Elemento DOM
   * @returns {Object}
   */
  static getPosition(element) {
    if (!element || typeof element.getBoundingClientRect !== 'function') {
      return { top: 0, left: 0, right: 0, bottom: 0, width: 0, height: 0 };
    }

    try {
      const rect = element.getBoundingClientRect();
      return {
        top: rect.top,
        left: rect.left,
        right: rect.right,
        bottom: rect.bottom,
        width: rect.width,
        height: rect.height,
        x: rect.x || rect.left,
        y: rect.y || rect.top
      };
    } catch (error) {
      console.error('Error obteniendo posición:', error);
      return { top: 0, left: 0, right: 0, bottom: 0, width: 0, height: 0, x: 0, y: 0 };
    }
  }

  /**
   * Verifica si un elemento está visible en el viewport
   * @param {Element} element - Elemento DOM
   * @param {number} threshold - Porcentaje de visibilidad requerido (0-1)
   * @returns {boolean}
   */
  static isInViewport(element, threshold = 0) {
    if (!element || typeof element.getBoundingClientRect !== 'function') {
      return false;
    }

    if (threshold < 0 || threshold > 1) {
      console.warn('Threshold debe estar entre 0 y 1');
      threshold = Math.max(0, Math.min(1, threshold));
    }

    try {
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
      
      if (visibleHeight <= 0 || visibleWidth <= 0) {
        return false;
      }

      const visibleArea = visibleHeight * visibleWidth;
      const totalArea = rect.height * rect.width;
      
      return totalArea > 0 && (visibleArea / totalArea) >= threshold;
    } catch (error) {
      console.error('Error verificando visibilidad en viewport:', error);
      return false;
    }
  }

  /**
   * Realiza scroll suave a un elemento
   * @param {Element|string} target - Elemento o selector
   * @param {Object} options - Opciones de scroll
   */
  static scrollTo(target, options = {}) {
    const element = typeof target === 'string' ? this.select(target) : target;
    
    if (!element) {
      console.warn('Elemento de destino no encontrado para scroll');
      return;
    }

    const defaultOptions = {
      behavior: 'smooth',
      block: 'start',
      inline: 'nearest',
      offset: 0
    };

    const config = { ...defaultOptions, ...options };

    try {
      if (config.offset && typeof config.offset === 'number') {
        const elementPosition = this.getElementOffsetTop(element);
        const targetPosition = elementPosition - config.offset;
        
        window.scrollTo({
          top: Math.max(0, targetPosition),
          behavior: config.behavior
        });
      } else {
        element.scrollIntoView({
          behavior: config.behavior,
          block: config.block,
          inline: config.inline
        });
      }
    } catch (error) {
      console.error('Error realizando scroll:', error);
    }
  }

  /**
   * Obtiene la posición offset top de un elemento
   * @param {Element} element - Elemento DOM
   * @returns {number}
   */
  static getElementOffsetTop(element) {
    if (!element) return 0;

    let offsetTop = 0;
    while (element) {
      offsetTop += element.offsetTop;
      element = element.offsetParent;
    }
    return offsetTop;
  }

  /**
   * Obtiene la posición de scroll actual
   * @returns {Object}
   */
  static getScrollPosition() {
    try {
      return {
        x: window.pageXOffset || document.documentElement.scrollLeft || document.body.scrollLeft || 0,
        y: window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0
      };
    } catch (error) {
      console.error('Error obteniendo posición de scroll:', error);
      return { x: 0, y: 0 };
    }
  }

  /**
   * Debounce para eventos
   * @param {Function} func - Función a ejecutar
   * @param {number} wait - Tiempo de espera en ms
   * @param {boolean} immediate - Ejecutar inmediatamente
   * @returns {Function}
   */
  static debounce(func, wait, immediate = false) {
    if (typeof func !== 'function') {
      throw new Error('func debe ser una función');
    }

    if (typeof wait !== 'number' || wait < 0) {
      throw new Error('wait debe ser un número positivo');
    }

    let timeout;
    
    return function executedFunction(...args) {
      const later = () => {
        timeout = null;
        if (!immediate) {
          try {
            func.apply(this, args);
          } catch (error) {
            console.error('Error en función debounced:', error);
          }
        }
      };

      const callNow = immediate && !timeout;
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
      
      if (callNow) {
        try {
          func.apply(this, args);
        } catch (error) {
          console.error('Error en función debounced inmediata:', error);
        }
      }
    };
  }

  /**
   * Throttle para eventos
   * @param {Function} func - Función a ejecutar
   * @param {number} limit - Límite de tiempo en ms
   * @returns {Function}
   */
  static throttle(func, limit) {
    if (typeof func !== 'function') {
      throw new Error('func debe ser una función');
    }

    if (typeof limit !== 'number' || limit < 0) {
      throw new Error('limit debe ser un número positivo');
    }

    let inThrottle;
    
    return function throttledFunction(...args) {
      if (!inThrottle) {
        try {
          func.apply(this, args);
        } catch (error) {
          console.error('Error en función throttled:', error);
        }
        
        inThrottle = true;
        setTimeout(() => {
          inThrottle = false;
        }, limit);
      }
    };
  }

  /**
   * Espera a que el DOM esté listo
   * @param {Function} callback - Función a ejecutar
   */
  static ready(callback) {
    if (typeof callback !== 'function') {
      console.error('Callback debe ser una función');
      return;
    }

    try {
      if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', callback, { once: true });
      } else {
        // DOM ya está listo, ejecutar callback de forma asíncrona
        setTimeout(callback, 0);
      }
    } catch (error) {
      console.error('Error configurando DOM ready:', error);
      // Intentar ejecutar callback de todos modos
      setTimeout(callback, 0);
    }
  }

  /**
   * Copia texto al portapapeles
   * @param {string} text - Texto a copiar
   * @returns {Promise<boolean>}
   */
  static async copyToClipboard(text) {
    if (typeof text !== 'string') {
      console.error('El texto a copiar debe ser una cadena');
      return false;
    }

    try {
      // Método moderno con Clipboard API
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(text);
        return true;
      }
      
      // Fallback para navegadores antiguos o contextos no seguros
      return this.fallbackCopyToClipboard(text);
    } catch (error) {
      console.warn('Error con Clipboard API, usando fallback:', error);
      return this.fallbackCopyToClipboard(text);
    }
  }

  /**
   * Método fallback para copiar al portapapeles
   * @param {string} text - Texto a copiar
   * @returns {boolean}
   */
  static fallbackCopyToClipboard(text) {
    try {
      const textArea = this.createElement('textarea', {
        value: text,
        style: {
          position: 'fixed',
          top: '-9999px',
          left: '-9999px',
          opacity: '0',
          pointerEvents: 'none'
        }
      });

      if (!textArea) {
        return false;
      }

      document.body.appendChild(textArea);
      textArea.select();
      textArea.setSelectionRange(0, text.length);
      
      const success = document.execCommand('copy');
      document.body.removeChild(textArea);
      
      return success;
    } catch (error) {
      console.error('Error en fallback de copia:', error);
      return false;
    }
  }

  /**
   * Oculta/muestra elementos
   * @param {Element|NodeList|Array} elements - Elementos a ocultar/mostrar
   * @param {boolean} show - true para mostrar, false para ocultar
   */
  static toggle(elements, show) {
    const elementList = this.normalizeElementList(elements);
    
    elementList.forEach(element => {
      if (!element || !element.style) return;
      
      try {
        if (show === undefined) {
          // Toggle automático
          const isHidden = element.style.display === 'none' || 
                          getComputedStyle(element).display === 'none';
          element.style.display = isHidden ? '' : 'none';
        } else {
          element.style.display = show ? '' : 'none';
        }
      } catch (error) {
        console.error('Error en toggle de elemento:', error);
      }
    });
  }

  /**
   * Obtiene el valor de un input, select o textarea
   * @param {Element} element - Elemento de formulario
   * @returns {string|Array}
   */
  static getValue(element) {
    if (!element) return '';

    try {
      switch (element.type) {
        case 'checkbox':
          return element.checked;
        case 'radio':
          return element.checked ? element.value : '';
        case 'select-multiple':
          return Array.from(element.selectedOptions).map(option => option.value);
        default:
          return element.value || '';
      }
    } catch (error) {
      console.error('Error obteniendo valor:', error);
      return '';
    }
  }

  /**
   * Establece el valor de un input, select o textarea
   * @param {Element} element - Elemento de formulario
   * @param {string|boolean|Array} value - Valor a establecer
   */
  static setValue(element, value) {
    if (!element) return;

    try {
      switch (element.type) {
        case 'checkbox':
          element.checked = Boolean(value);
          break;
        case 'radio':
          element.checked = element.value === value;
          break;
        case 'select-multiple':
          if (Array.isArray(value)) {
            Array.from(element.options).forEach(option => {
              option.selected = value.includes(option.value);
            });
          }
          break;
        default:
          element.value = value;
          break;
      }
    } catch (error) {
      console.error('Error estableciendo valor:', error);
    }
  }
}