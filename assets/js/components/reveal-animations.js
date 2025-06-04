class RevealAnimations {
    constructor(options = {}) {
        this.options = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px',
            staggerDelay: 100,
            defaultDuration: 600,
            defaultEasing: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
            once: true,
            ...options
        };

        this.elements = new Map();
        this.observer = null;
        this.animationQueue = [];
        this.isProcessingQueue = false;

        this.init();
    }

    init() {
        this.setupObserver();
        this.setupElements();
        this.bindEvents();
        
        console.log('✨ Reveal Animations initialized');
    }

    setupObserver() {
        this.observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                const element = entry.target;
                const config = this.elements.get(element);
                
                if (!config) return;

                if (entry.isIntersecting) {
                    this.queueReveal(element, config);
                } else if (!this.options.once && config.reverseOnExit) {
                    this.queueHide(element, config);
                }
            });
        }, {
            threshold: this.options.threshold,
            rootMargin: this.options.rootMargin
        });
    }

    setupElements() {
        // Auto-detect elements with data-reveal attribute
        const revealElements = document.querySelectorAll('[data-reveal]');
        revealElements.forEach(element => {
            this.addRevealElement(element);
        });

        // Auto-detect stagger containers
        const staggerContainers = document.querySelectorAll('[data-stagger]');
        staggerContainers.forEach(container => {
            this.addStaggerContainer(container);
        });
    }

    addRevealElement(element, customConfig = {}) {
        const dataConfig = this.parseDataAttributes(element);
        
        const config = {
            type: 'fadeUp',
            duration: this.options.defaultDuration,
            easing: this.options.defaultEasing,
            delay: 0,
            distance: 60,
            scale: 0.8,
            rotation: 15,
            reverseOnExit: false,
            ...dataConfig,
            ...customConfig
        };

        // Store original styles
        const computedStyle = window.getComputedStyle(element);
        config.originalTransform = computedStyle.transform;
        config.originalOpacity = computedStyle.opacity;

        this.elements.set(element, config);
        this.setInitialState(element, config);
        this.observer.observe(element);
    }

    addStaggerContainer(container, customConfig = {}) {
        const children = Array.from(container.children);
        const staggerDelay = parseInt(container.dataset.staggerDelay) || this.options.staggerDelay;
        const staggerType = container.dataset.stagger || 'sequential';

        children.forEach((child, index) => {
            let delay = 0;
            
            switch (staggerType) {
                case 'sequential':
                    delay = index * staggerDelay;
                    break;
                case 'reverse':
                    delay = (children.length - 1 - index) * staggerDelay;
                    break;
                case 'center-out':
                    const center = Math.floor(children.length / 2);
                    delay = Math.abs(index - center) * staggerDelay;
                    break;
                case 'random':
                    delay = Math.random() * (children.length * staggerDelay);
                    break;
            }

            this.addRevealElement(child, {
                ...customConfig,
                delay: delay + (customConfig.delay || 0)
            });
        });
    }

    parseDataAttributes(element) {
        const config = {};
        
        // Type of reveal animation
        if (element.dataset.reveal) {
            config.type = element.dataset.reveal;
        }
        
        // Duration
        if (element.dataset.revealDuration) {
            config.duration = parseInt(element.dataset.revealDuration);
        }
        
        // Delay
        if (element.dataset.revealDelay) {
            config.delay = parseInt(element.dataset.revealDelay);
        }
        
        // Distance for slide animations
        if (element.dataset.revealDistance) {
            config.distance = parseInt(element.dataset.revealDistance);
        }
        
        // Scale for scale animations
        if (element.dataset.revealScale) {
            config.scale = parseFloat(element.dataset.revealScale);
        }
        
        // Rotation
        if (element.dataset.revealRotation) {
            config.rotation = parseInt(element.dataset.revealRotation);
        }
        
        // Easing
        if (element.dataset.revealEasing) {
            config.easing = element.dataset.revealEasing;
        }
        
        // Reverse on exit
        if (element.dataset.revealReverse !== undefined) {
            config.reverseOnExit = element.dataset.revealReverse !== 'false';
        }

        return config;
    }

    setInitialState(element, config) {
        const { type, distance, scale, rotation } = config;
        
        element.style.transition = 'none';
        element.style.opacity = '0';
        
        switch (type) {
            case 'fade':
                // Only opacity change
                break;
                
            case 'fadeUp':
            case 'slideUp':
                element.style.transform = `translateY(${distance}px)`;
                break;
                
            case 'fadeDown':
            case 'slideDown':
                element.style.transform = `translateY(-${distance}px)`;
                break;
                
            case 'fadeLeft':
            case 'slideLeft':
                element.style.transform = `translateX(${distance}px)`;
                break;
                
            case 'fadeRight':
            case 'slideRight':
                element.style.transform = `translateX(-${distance}px)`;
                break;
                
            case 'scale':
            case 'scaleUp':
                element.style.transform = `scale(${scale})`;
                break;
                
            case 'scaleDown':
                element.style.transform = `scale(${2 - scale})`;
                break;
                
            case 'rotate':
            case 'rotateIn':
                element.style.transform = `rotate(${rotation}deg) scale(${scale})`;
                break;
                
            case 'rotateLeft':
                element.style.transform = `rotate(-${rotation}deg) scale(${scale})`;
                break;
                
            case 'rotateRight':
                element.style.transform = `rotate(${rotation}deg) scale(${scale})`;
                break;
                
            case 'flip':
                element.style.transform = `perspective(1000px) rotateY(90deg)`;
                break;
                
            case 'flipX':
                element.style.transform = `perspective(1000px) rotateX(90deg)`;
                break;
                
            case 'clipPath':
                element.style.clipPath = 'polygon(0 0, 0 0, 0 100%, 0 100%)';
                element.style.opacity = '1'; // Clip path handles visibility
                break;
                
            case 'clipPathCircle':
                element.style.clipPath = 'circle(0% at 50% 50%)';
                element.style.opacity = '1';
                break;
                
            case 'clipPathPolygon':
                element.style.clipPath = 'polygon(50% 50%, 50% 50%, 50% 50%, 50% 50%)';
                element.style.opacity = '1';
                break;
        }
        
        // Force reflow
        element.offsetHeight;
    }

    queueReveal(element, config) {
        this.animationQueue.push({
            type: 'reveal',
            element,
            config,
            timestamp: performance.now()
        });
        
        this.processQueue();
    }

    queueHide(element, config) {
        this.animationQueue.push({
            type: 'hide',
            element,
            config,
            timestamp: performance.now()
        });
        
        this.processQueue();
    }

    async processQueue() {
        if (this.isProcessingQueue || this.animationQueue.length === 0) return;
        
        this.isProcessingQueue = true;
        
        while (this.animationQueue.length > 0) {
            const animation = this.animationQueue.shift();
            
            if (animation.type === 'reveal') {
                await this.revealElement(animation.element, animation.config);
            } else {
                await this.hideElement(animation.element, animation.config);
            }
        }
        
        this.isProcessingQueue = false;
    }

    async revealElement(element, config) {
        const { type, duration, easing, delay } = config;
        
        // Apply delay if specified
        if (delay > 0) {
            await this.wait(delay);
        }
        
        // Set up transition
        element.style.transition = `all ${duration}ms ${easing}`;
        
        // Apply reveal animation
        await this.applyRevealAnimation(element, type);
        
        // Mark as revealed
        element.classList.add('revealed');
        element.setAttribute('data-revealed', 'true');
        
        // Clean up transition after animation
        setTimeout(() => {
            if (this.options.once) {
                element.style.transition = '';
            }
        }, duration);
    }

    async hideElement(element, config) {
        const { duration, easing } = config;
        
        element.style.transition = `all ${duration}ms ${easing}`;
        this.setInitialState(element, config);
        
        element.classList.remove('revealed');
        element.removeAttribute('data-revealed');
        
        await this.wait(duration);
    }

    async applyRevealAnimation(element, type) {
        element.style.opacity = '1';
        
        switch (type) {
            case 'fade':
                // Only opacity change
                break;
                
            case 'fadeUp':
            case 'slideUp':
            case 'fadeDown':
            case 'slideDown':
            case 'fadeLeft':
            case 'slideLeft':
            case 'fadeRight':
            case 'slideRight':
                element.style.transform = 'translateX(0) translateY(0)';
                break;
                
            case 'scale':
            case 'scaleUp':
            case 'scaleDown':
                element.style.transform = 'scale(1)';
                break;
                
            case 'rotate':
            case 'rotateIn':
            case 'rotateLeft':
            case 'rotateRight':
                element.style.transform = 'rotate(0deg) scale(1)';
                break;
                
            case 'flip':
                element.style.transform = 'perspective(1000px) rotateY(0deg)';
                break;
                
            case 'flipX':
                element.style.transform = 'perspective(1000px) rotateX(0deg)';
                break;
                
            case 'clipPath':
                element.style.clipPath = 'polygon(0 0, 100% 0, 100% 100%, 0 100%)';
                break;
                
            case 'clipPathCircle':
                element.style.clipPath = 'circle(100% at 50% 50%)';
                break;
                
            case 'clipPathPolygon':
                element.style.clipPath = 'polygon(0 0, 100% 0, 100% 100%, 0 100%)';
                break;
        }
    }

    // Advanced reveal methods
    revealSequence(elements, config = {}) {
        const delay = config.staggerDelay || this.options.staggerDelay;
        
        elements.forEach((element, index) => {
            setTimeout(() => {
                if (!this.elements.has(element)) {
                    this.addRevealElement(element, config);
                }
                const elementConfig = this.elements.get(element);
                this.queueReveal(element, elementConfig);
            }, index * delay);
        });
    }

    revealFromCenter(container, config = {}) {
        const children = Array.from(container.children);
        const center = Math.floor(children.length / 2);
        const delay = config.staggerDelay || this.options.staggerDelay;
        
        children.forEach((child, index) => {
            const distance = Math.abs(index - center);
            setTimeout(() => {
                if (!this.elements.has(child)) {
                    this.addRevealElement(child, config);
                }
                const elementConfig = this.elements.get(child);
                this.queueReveal(child, elementConfig);
            }, distance * delay);
        });
    }

    revealRandom(elements, config = {}) {
        const shuffled = [...elements].sort(() => Math.random() - 0.5);
        this.revealSequence(shuffled, config);
    }

    // Utility methods
    wait(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    // Public API
    reveal(selector, config = {}) {
        const elements = typeof selector === 'string' 
            ? document.querySelectorAll(selector)
            : [selector];
            
        elements.forEach(element => {
            if (!this.elements.has(element)) {
                this.addRevealElement(element, config);
            }
            const elementConfig = this.elements.get(element);
            this.queueReveal(element, elementConfig);
        });
    }

    hide(selector, config = {}) {
        const elements = typeof selector === 'string' 
            ? document.querySelectorAll(selector)
            : [selector];
            
        elements.forEach(element => {
            if (this.elements.has(element)) {
                const elementConfig = this.elements.get(element);
                this.queueHide(element, elementConfig);
            }
        });
    }

    reset(selector) {
        const elements = typeof selector === 'string' 
            ? document.querySelectorAll(selector)
            : [selector];
            
        elements.forEach(element => {
            if (this.elements.has(element)) {
                const config = this.elements.get(element);
                element.classList.remove('revealed');
                element.removeAttribute('data-revealed');
                this.setInitialState(element, config);
            }
        });
    }

    bindEvents() {
        // Handle reduced motion preference
        const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
        mediaQuery.addListener((e) => {
            if (e.matches) {
                this.disableAnimations();
            } else {
                this.enableAnimations();
            }
        });
        
        if (mediaQuery.matches) {
            this.disableAnimations();
        }
    }

    disableAnimations() {
        this.elements.forEach((config, element) => {
            element.style.transition = 'none';
            element.style.opacity = '1';
            element.style.transform = '';
            element.style.clipPath = '';
        });
    }

    enableAnimations() {
        this.elements.forEach((config, element) => {
            if (!element.classList.contains('revealed')) {
                this.setInitialState(element, config);
            }
        });
    }

    // Cleanup
    destroy() {
        if (this.observer) {
            this.observer.disconnect();
        }
        
        this.elements.forEach((config, element) => {
            element.style.transition = '';
            element.style.opacity = '';
            element.style.transform = '';
            element.style.clipPath = '';
            element.classList.remove('revealed');
            element.removeAttribute('data-revealed');
        });
        
        this.elements.clear();
        this.animationQueue = [];
        
        console.log('🧹 Reveal Animations destroyed');
    }
}

export default RevealAnimations;