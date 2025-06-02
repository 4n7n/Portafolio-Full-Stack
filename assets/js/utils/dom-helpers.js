export const DOMHelpers = {
    /**
     * Encuentra elemento por selector con validación
     */
    findElement(selector, context = document) {
        const element = context.querySelector(selector);
        if (!element) {
            console.warn(`⚠️ Elemento no encontrado: ${selector}`);
        }
        return element;
    },

    /**
     * Encuentra múltiples elementos
     */
    findElements(selector, context = document) {
        return Array.from(context.querySelectorAll(selector));
    },

    /**
     * Añade clase con verificación
     */
    addClass(element, className) {
        if (element && className) {
            element.classList.add(className);
        }
    },

    /**
     * Remueve clase con verificación
     */
    removeClass(element, className) {
        if (element && className) {
            element.classList.remove(className);
        }
    },

    /**
     * Toggle clase con verificación
     */
    toggleClass(element, className, force = undefined) {
        if (element && className) {
            return element.classList.toggle(className, force);
        }
        return false;
    },

    /**
     * Verificar si elemento tiene clase
     */
    hasClass(element, className) {
        return element && element.classList.contains(className);
    },

    /**
     * Crear elemento con atributos
     */
    createElement(tag, attributes = {}, textContent = '') {
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
    },

    /**
     * Insertar HTML de forma segura
     */
    setHTML(element, html) {
        if (element) {
            element.innerHTML = html;
        }
    },

    /**
     * Obtener posición del elemento
     */
    getElementPosition(element) {
        if (!element) return { top: 0, left: 0 };
        
        const rect = element.getBoundingClientRect();
        return {
            top: rect.top + window.pageYOffset,
            left: rect.left + window.pageXOffset,
            width: rect.width,
            height: rect.height
        };
    },

    /**
     * Verificar si elemento está en viewport
     */
    isInViewport(element, threshold = 0) {
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
    },

    /**
     * Smooth scroll a elemento
     */
    scrollToElement(element, offset = 0, behavior = 'smooth') {
        if (!element) return;
        
        const elementPosition = this.getElementPosition(element);
        const offsetPosition = elementPosition.top - offset;
        
        window.scrollTo({
            top: offsetPosition,
            behavior: behavior
        });
    },

    /**
     * Debounce función
     */
    debounce(func, wait, immediate = false) {
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
    },

    /**
     * Throttle función
     */
    throttle(func, limit) {
        let inThrottle;
        return function(...args) {
            if (!inThrottle) {
                func.apply(this, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        };
    },

    /**
     * Esperar a que elemento esté disponible
     */
    waitForElement(selector, timeout = 10000) {
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
    },

    /**
     * Cargar script dinámicamente
     */
    loadScript(src) {
        return new Promise((resolve, reject) => {
            const script = document.createElement('script');
            script.src = src;
            script.onload = resolve;
            script.onerror = reject;
            document.head.appendChild(script);
        });
    },

    /**
     * Obtener datos de elemento
     */
    getElementData(element, key) {
        if (!element) return null;
        return element.dataset[key] || element.getAttribute(`data-${key}`);
    },

    /**
     * Establecer datos de elemento
     */
    setElementData(element, key, value) {
        if (element) {
            element.dataset[key] = value;
        }
    }
};

export default DOMHelpers;