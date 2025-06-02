export const ScrollUtils = {
    /**
     * Obtener posición de scroll actual
     */
    getScrollPosition() {
        return {
            x: window.pageXOffset || document.documentElement.scrollLeft,
            y: window.pageYOffset || document.documentElement.scrollTop
        };
    },

    /**
     * Obtener altura total del documento
     */
    getDocumentHeight() {
        return Math.max(
            document.body.scrollHeight,
            document.body.offsetHeight,
            document.documentElement.clientHeight,
            document.documentElement.scrollHeight,
            document.documentElement.offsetHeight
        );
    },

    /**
     * Obtener altura del viewport
     */
    getViewportHeight() {
        return window.innerHeight || document.documentElement.clientHeight;
    },

    /**
     * Calcular porcentaje de scroll
     */
    getScrollPercentage() {
        const scrollTop = this.getScrollPosition().y;
        const documentHeight = this.getDocumentHeight();
        const viewportHeight = this.getViewportHeight();
        const scrollableHeight = documentHeight - viewportHeight;
        
        return scrollableHeight > 0 ? (scrollTop / scrollableHeight) * 100 : 0;
    },

    /**
     * Verificar si el scroll está en el top
     */
    isAtTop(threshold = 0) {
        return this.getScrollPosition().y <= threshold;
    },

    /**
     * Verificar si el scroll está en el bottom
     */
    isAtBottom(threshold = 0) {
        const { y } = this.getScrollPosition();
        const documentHeight = this.getDocumentHeight();
        const viewportHeight = this.getViewportHeight();
        
        return (y + viewportHeight) >= (documentHeight - threshold);
    },

    /**
     * Smooth scroll a posición específica
     */
    scrollTo(x = 0, y = 0, behavior = 'smooth') {
        window.scrollTo({
            left: x,
            top: y,
            behavior: behavior
        });
    },

    /**
     * Smooth scroll a elemento específico
     */
    scrollToElement(selector, offset = 0, behavior = 'smooth') {
        const element = typeof selector === 'string' ? 
            document.querySelector(selector) : selector;
            
        if (!element) return;
        
        const elementRect = element.getBoundingClientRect();
        const absoluteElementTop = elementRect.top + window.pageYOffset;
        const targetPosition = absoluteElementTop - offset;
        
        this.scrollTo(0, targetPosition, behavior);
    },

    /**
     * Scroll horizontal suave
     */
    scrollHorizontally(container, amount, duration = 300) {
        const startLeft = container.scrollLeft;
        const targetLeft = startLeft + amount;
        const startTime = performance.now();
        
        const animateScroll = (currentTime) => {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            
            // Easing function (ease-out)
            const easeOut = 1 - Math.pow(1 - progress, 3);
            
            container.scrollLeft = startLeft + (targetLeft - startLeft) * easeOut;
            
            if (progress < 1) {
                requestAnimationFrame(animateScroll);
            }
        };
        
        requestAnimationFrame(animateScroll);
    },

    /**
     * Crear observer para elementos en viewport
     */
    createIntersectionObserver(callback, options = {}) {
        const defaultOptions = {
            root: null,
            rootMargin: '0px',
            threshold: 0.1
        };
        
        const observerOptions = { ...defaultOptions, ...options };
        
        return new IntersectionObserver(callback, observerOptions);
    },

    /**
     * Observar múltiples elementos
     */
    observeElements(elements, callback, options = {}) {
        const observer = this.createIntersectionObserver(callback, options);
        
        elements.forEach(element => {
            if (element) observer.observe(element);
        });
        
        return observer;
    },

    /**
     * Crear scroll spy para navegación
     */
    createScrollSpy(sections, navLinks, options = {}) {
        const defaultOptions = {
            offset: 100,
            activeClass: 'active'
        };
        
        const config = { ...defaultOptions, ...options };
        
        const observerOptions = {
            rootMargin: `-${config.offset}px 0px -50% 0px`,
            threshold: 0.1
        };
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const sectionId = entry.target.id;
                    
                    // Remover clase activa de todos los links
                    navLinks.forEach(link => {
                        link.classList.remove(config.activeClass);
                    });
                    
                    // Añadir clase activa al link correspondiente
                    const activeLink = navLinks.find(link => {
                        const href = link.getAttribute('href');
                        return href === `#${sectionId}`;
                    });
                    
                    if (activeLink) {
                        activeLink.classList.add(config.activeClass);
                    }
                }
            });
        }, observerOptions);
        
        sections.forEach(section => observer.observe(section));
        
        return observer;
    },

    /**
     * Throttle scroll events
     */
    throttleScroll(callback, limit = 16) {
        let inThrottle;
        return function() {
            const args = arguments;
            const context = this;
            if (!inThrottle) {
                callback.apply(context, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        };
    },

    /**
     * Detectar dirección de scroll
     */
    createScrollDirectionDetector(callback) {
        let lastScrollY = window.pageYOffset;
        
        const handleScroll = this.throttleScroll(() => {
            const currentScrollY = window.pageYOffset;
            const direction = currentScrollY > lastScrollY ? 'down' : 'up';
            const delta = Math.abs(currentScrollY - lastScrollY);
            
            callback({
                direction,
                currentY: currentScrollY,
                lastY: lastScrollY,
                delta
            });
            
            lastScrollY = currentScrollY;
        });
        
        window.addEventListener('scroll', handleScroll, { passive: true });
        
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }
};

export default ScrollUtils;