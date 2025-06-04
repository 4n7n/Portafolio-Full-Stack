class AdvancedScrollManager {
    constructor(options = {}) {
        this.options = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px',
            smoothScrollDuration: 1000,
            parallaxEnabled: true,
            revealEnabled: true,
            textEffectsEnabled: true,
            morphingEnabled: true,
            performanceMode: 'auto', // 'high', 'medium', 'low', 'auto'
            ...options
        };

        this.scrollY = 0;
        this.lastScrollY = 0;
        this.scrollDirection = 'down';
        this.scrollSpeed = 0;
        this.isScrolling = false;
        this.scrollTimeout = null;
        this.ticking = false;

        this.observers = new Map();
        this.animations = new Map();
        this.elements = new Map();

        this.init();
    }

    init() {
        this.detectPerformanceCapabilities();
        this.setupScrollListeners();
        this.setupIntersectionObservers();
        this.initializeComponents();
        this.bindEvents();
        
        console.log('✅ Advanced Scroll Manager initialized');
    }

    detectPerformanceCapabilities() {
        const ua = navigator.userAgent;
        const isMobile = /iPhone|iPad|iPod|Android/i.test(ua);
        const isLowEnd = /Android.*Version\/[0-4]/i.test(ua);
        
        // Detect device capabilities
        this.deviceCapabilities = {
            mobile: isMobile,
            lowEnd: isLowEnd,
            reducedMotion: window.matchMedia('(prefers-reduced-motion: reduce)').matches,
            gpu: this.detectGPUAcceleration(),
            cores: navigator.hardwareConcurrency || 4,
            memory: navigator.deviceMemory || 4
        };

        // Auto-adjust performance mode
        if (this.options.performanceMode === 'auto') {
            if (this.deviceCapabilities.reducedMotion) {
                this.options.performanceMode = 'minimal';
            } else if (this.deviceCapabilities.lowEnd || this.deviceCapabilities.memory < 4) {
                this.options.performanceMode = 'low';
            } else if (this.deviceCapabilities.mobile) {
                this.options.performanceMode = 'medium';
            } else {
                this.options.performanceMode = 'high';
            }
        }

        console.log('📱 Device capabilities:', this.deviceCapabilities);
        console.log('⚡ Performance mode:', this.options.performanceMode);
    }

    detectGPUAcceleration() {
        const canvas = document.createElement('canvas');
        const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
        return !!gl;
    }

    setupScrollListeners() {
        let scrollTimer = null;

        const handleScroll = () => {
            this.lastScrollY = this.scrollY;
            this.scrollY = window.pageYOffset;
            this.scrollDirection = this.scrollY > this.lastScrollY ? 'down' : 'up';
            this.scrollSpeed = Math.abs(this.scrollY - this.lastScrollY);
            
            this.isScrolling = true;
            
            if (!this.ticking) {
                requestAnimationFrame(() => {
                    this.updateAnimations();
                    this.ticking = false;
                });
                this.ticking = true;
            }

            // Clear scroll timeout
            clearTimeout(scrollTimer);
            scrollTimer = setTimeout(() => {
                this.isScrolling = false;
                this.onScrollEnd();
            }, 150);
        };

        // Throttled scroll listener
        let throttleTimer = null;
        window.addEventListener('scroll', () => {
            if (throttleTimer) return;
            
            throttleTimer = setTimeout(() => {
                handleScroll();
                throttleTimer = null;
            }, 16); // ~60fps
        }, { passive: true });
    }

    setupIntersectionObservers() {
        // Main observer for animations
        this.mainObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                const element = entry.target;
                const animationType = element.dataset.scrollAnimation;
                
                if (entry.isIntersecting) {
                    this.triggerAnimation(element, animationType, 'enter');
                } else {
                    this.triggerAnimation(element, animationType, 'leave');
                }
            });
        }, {
            threshold: this.options.threshold,
            rootMargin: this.options.rootMargin
        });

        // Observer for parallax elements
        this.parallaxObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                const element = entry.target;
                if (entry.isIntersecting) {
                    this.elements.set(element, { inView: true, element });
                } else {
                    this.elements.delete(element);
                }
            });
        }, {
            threshold: 0,
            rootMargin: '50px 0px'
        });
    }

    initializeComponents() {
        // Initialize scroll elements
        this.initializeScrollElements();
        
        // Initialize parallax elements
        if (this.options.parallaxEnabled) {
            this.initializeParallaxElements();
        }

        // Initialize reveal elements
        if (this.options.revealEnabled) {
            this.initializeRevealElements();
        }

        // Initialize text effects
        if (this.options.textEffectsEnabled) {
            this.initializeTextElements();
        }

        // Initialize morphing elements
        if (this.options.morphingEnabled) {
            this.initializeMorphingElements();
        }
    }

    initializeScrollElements() {
        const elements = document.querySelectorAll('[data-scroll-animation]');
        elements.forEach(element => {
            this.mainObserver.observe(element);
            
            // Set initial state
            const animationType = element.dataset.scrollAnimation;
            this.setInitialState(element, animationType);
        });
    }

    initializeParallaxElements() {
        const parallaxElements = document.querySelectorAll('[data-parallax]');
        parallaxElements.forEach(element => {
            this.parallaxObserver.observe(element);
            
            // Set transform style for performance
            element.style.willChange = 'transform';
            element.style.transformStyle = 'preserve-3d';
        });
    }

    initializeRevealElements() {
        const revealElements = document.querySelectorAll('[data-reveal]');
        revealElements.forEach(element => {
            this.mainObserver.observe(element);
            
            // Set initial hidden state
            element.style.opacity = '0';
            element.style.transform = this.getInitialTransform(element.dataset.reveal);
        });
    }

    initializeTextElements() {
        const textElements = document.querySelectorAll('[data-text-effect]');
        textElements.forEach(element => {
            this.mainObserver.observe(element);
            this.prepareTextElement(element);
        });
    }

    initializeMorphingElements() {
        const morphElements = document.querySelectorAll('[data-morph]');
        morphElements.forEach(element => {
            this.parallaxObserver.observe(element);
            element.style.willChange = 'transform, filter, border-radius';
        });
    }

    setInitialState(element, animationType) {
        switch (animationType) {
            case 'fadeIn':
                element.style.opacity = '0';
                break;
            case 'slideUp':
                element.style.opacity = '0';
                element.style.transform = 'translateY(50px)';
                break;
            case 'slideLeft':
                element.style.opacity = '0';
                element.style.transform = 'translateX(50px)';
                break;
            case 'slideRight':
                element.style.opacity = '0';
                element.style.transform = 'translateX(-50px)';
                break;
            case 'scaleIn':
                element.style.opacity = '0';
                element.style.transform = 'scale(0.8)';
                break;
            case 'rotateIn':
                element.style.opacity = '0';
                element.style.transform = 'rotate(-10deg) scale(0.9)';
                break;
        }
        
        element.style.transition = 'all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
    }

    getInitialTransform(revealType) {
        switch (revealType) {
            case 'up':
                return 'translateY(60px)';
            case 'down':
                return 'translateY(-60px)';
            case 'left':
                return 'translateX(60px)';
            case 'right':
                return 'translateX(-60px)';
            case 'scale':
                return 'scale(0.8)';
            case 'rotate':
                return 'rotate(15deg) scale(0.9)';
            default:
                return 'translateY(30px)';
        }
    }

    prepareTextElement(element) {
        const effect = element.dataset.textEffect;
        const text = element.textContent;
        
        switch (effect) {
            case 'typewriter':
                element.textContent = '';
                element.dataset.originalText = text;
                break;
            case 'scramble':
                element.dataset.originalText = text;
                break;
            case 'reveal':
                this.splitTextForReveal(element, text);
                break;
            case 'wave':
                this.splitTextForWave(element, text);
                break;
        }
    }

    splitTextForReveal(element, text) {
        element.innerHTML = '';
        text.split('').forEach((char, index) => {
            const span = document.createElement('span');
            span.textContent = char === ' ' ? '\u00A0' : char;
            span.style.opacity = '0';
            span.style.transform = 'translateY(20px)';
            span.style.transition = `all 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94) ${index * 0.05}s`;
            element.appendChild(span);
        });
    }

    splitTextForWave(element, text) {
        element.innerHTML = '';
        text.split('').forEach((char, index) => {
            const span = document.createElement('span');
            span.textContent = char === ' ' ? '\u00A0' : char;
            span.style.display = 'inline-block';
            span.style.transform = 'translateY(0px)';
            span.style.transition = `transform 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94) ${index * 0.1}s`;
            element.appendChild(span);
        });
    }

    updateAnimations() {
        // Update parallax elements
        if (this.options.parallaxEnabled) {
            this.updateParallax();
        }

        // Update morphing elements
        if (this.options.morphingEnabled) {
            this.updateMorphing();
        }

        // Update progress indicators
        this.updateProgress();
    }

    updateParallax() {
        this.elements.forEach(({ element }) => {
            if (!element.dataset.parallax) return;

            const speed = parseFloat(element.dataset.parallax) || 0.5;
            const rect = element.getBoundingClientRect();
            const elementTop = rect.top + this.scrollY;
            const elementHeight = rect.height;
            const windowHeight = window.innerHeight;

            // Calculate parallax offset
            const scrolled = this.scrollY;
            const rate = scrolled * speed;
            
            // Only animate if element is in viewport range
            if (rect.top < windowHeight && rect.bottom > 0) {
                if (this.options.performanceMode === 'high') {
                    element.style.transform = `translate3d(0, ${rate}px, 0)`;
                } else {
                    element.style.transform = `translateY(${rate}px)`;
                }
            }
        });
    }

    updateMorphing() {
        this.elements.forEach(({ element }) => {
            if (!element.dataset.morph) return;

            const morphType = element.dataset.morph;
            const rect = element.getBoundingClientRect();
            const elementCenter = rect.top + rect.height / 2;
            const windowCenter = window.innerHeight / 2;
            const distance = Math.abs(elementCenter - windowCenter);
            const maxDistance = window.innerHeight / 2;
            const proximity = Math.max(0, 1 - (distance / maxDistance));

            this.applyMorphing(element, morphType, proximity);
        });
    }

    applyMorphing(element, morphType, proximity) {
        switch (morphType) {
            case 'scale':
                const scale = 0.9 + (proximity * 0.1);
                element.style.transform = `scale(${scale})`;
                break;
            case 'blur':
                const blur = (1 - proximity) * 5;
                element.style.filter = `blur(${blur}px)`;
                break;
            case 'skew':
                const skew = (0.5 - proximity) * 10;
                element.style.transform = `skewY(${skew}deg)`;
                break;
            case 'rotate':
                const rotate = (0.5 - proximity) * 20;
                element.style.transform = `rotate(${rotate}deg)`;
                break;
        }
    }

    updateProgress() {
        const scrollProgress = this.scrollY / (document.body.scrollHeight - window.innerHeight);
        
        // Update progress bar
        const progressBar = document.querySelector('.scroll-progress-bar');
        if (progressBar) {
            progressBar.style.width = `${scrollProgress * 100}%`;
        }

        // Update progress indicators
        const indicators = document.querySelectorAll('[data-progress]');
        indicators.forEach(indicator => {
            const progress = this.calculateSectionProgress(indicator);
            this.updateProgressIndicator(indicator, progress);
        });
    }

    calculateSectionProgress(element) {
        const rect = element.getBoundingClientRect();
        const windowHeight = window.innerHeight;
        
        if (rect.top > windowHeight) return 0;
        if (rect.bottom < 0) return 1;
        
        const visibleHeight = Math.min(rect.bottom, windowHeight) - Math.max(rect.top, 0);
        return visibleHeight / rect.height;
    }

    updateProgressIndicator(indicator, progress) {
        const circle = indicator.querySelector('.progress-circle');
        const text = indicator.querySelector('.progress-text');
        
        if (circle) {
            const circumference = 2 * Math.PI * 45; // Assuming radius of 45
            const offset = circumference * (1 - progress);
            circle.style.strokeDashoffset = offset;
        }
        
        if (text) {
            text.textContent = `${Math.round(progress * 100)}%`;
        }
    }

    triggerAnimation(element, animationType, trigger) {
        if (trigger === 'enter') {
            this.animateIn(element, animationType);
        } else {
            this.animateOut(element, animationType);
        }
    }

    animateIn(element, animationType) {
        element.style.opacity = '1';
        element.style.transform = 'translateY(0) translateX(0) scale(1) rotate(0)';

        // Handle specific text effects
        if (element.dataset.textEffect) {
            this.triggerTextEffect(element, element.dataset.textEffect);
        }

        // Handle reveal animations
        if (element.dataset.reveal) {
            this.triggerRevealAnimation(element);
        }

        // Add animation class
        element.classList.add('scroll-animated');
    }

    animateOut(element, animationType) {
        // Only animate out if specified
        if (element.dataset.animateOut === 'true') {
            element.classList.remove('scroll-animated');
        }
    }

    triggerTextEffect(element, effect) {
        switch (effect) {
            case 'typewriter':
                this.typewriterEffect(element);
                break;
            case 'scramble':
                this.scrambleEffect(element);
                break;
            case 'reveal':
                this.textRevealEffect(element);
                break;
            case 'wave':
                this.textWaveEffect(element);
                break;
        }
    }

    typewriterEffect(element) {
        const originalText = element.dataset.originalText;
        let currentText = '';
        let index = 0;
        
        const typeInterval = setInterval(() => {
            if (index < originalText.length) {
                currentText += originalText[index];
                element.textContent = currentText;
                index++;
            } else {
                clearInterval(typeInterval);
            }
        }, 50);
    }

    scrambleEffect(element) {
        const originalText = element.dataset.originalText;
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        let iteration = 0;
        
        const scrambleInterval = setInterval(() => {
            element.textContent = originalText
                .split('')
                .map((char, index) => {
                    if (index < iteration) {
                        return originalText[index];
                    }
                    return characters[Math.floor(Math.random() * characters.length)];
                })
                .join('');
                
            if (iteration >= originalText.length) {
                clearInterval(scrambleInterval);
            }
            
            iteration += 1/3;
        }, 30);
    }

    textRevealEffect(element) {
        const spans = element.querySelectorAll('span');
        spans.forEach(span => {
            span.style.opacity = '1';
            span.style.transform = 'translateY(0)';
        });
    }

    textWaveEffect(element) {
        const spans = element.querySelectorAll('span');
        spans.forEach((span, index) => {
            setTimeout(() => {
                span.style.transform = 'translateY(-10px)';
                setTimeout(() => {
                    span.style.transform = 'translateY(0)';
                }, 200);
            }, index * 100);
        });
    }

    triggerRevealAnimation(element) {
        element.style.opacity = '1';
        element.style.transform = 'translateY(0) translateX(0) scale(1) rotate(0)';
    }

    onScrollEnd() {
        // Cleanup and optimization when scroll ends
        this.optimizePerformance();
    }

    optimizePerformance() {
        // Remove will-change from elements not in view
        this.elements.forEach(({ element }) => {
            const rect = element.getBoundingClientRect();
            if (rect.bottom < 0 || rect.top > window.innerHeight) {
                element.style.willChange = 'auto';
            }
        });
    }

    // Public methods
    scrollToElement(selector, offset = 0) {
        const element = document.querySelector(selector);
        if (!element) return;

        const elementPosition = element.offsetTop - offset;
        
        window.scrollTo({
            top: elementPosition,
            behavior: 'smooth'
        });
    }

    pauseAnimations() {
        document.body.classList.add('scroll-animations-paused');
    }

    resumeAnimations() {
        document.body.classList.remove('scroll-animations-paused');
    }

    destroy() {
        // Cleanup
        this.mainObserver.disconnect();
        this.parallaxObserver.disconnect();
        this.elements.clear();
        this.animations.clear();
        
        console.log('🧹 Advanced Scroll Manager destroyed');
    }
}

// Auto-initialize if DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        window.advancedScrollManager = new AdvancedScrollManager();
    });
} else {
    window.advancedScrollManager = new AdvancedScrollManager();
}

export default AdvancedScrollManager;