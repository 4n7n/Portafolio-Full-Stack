class ParallaxEngine {
    constructor(options = {}) {
        this.options = {
            mouseEnabled: true,
            mouseMultiplier: 0.05,
            scrollMultiplier: 1,
            boundaries: { min: -100, max: 100 },
            performance: 'auto',
            ...options
        };

        this.scrollY = 0;
        this.mouseX = 0;
        this.mouseY = 0;
        this.windowWidth = window.innerWidth;
        this.windowHeight = window.innerHeight;
        
        this.elements = new Map();
        this.rafId = null;
        this.isActive = false;
        
        this.init();
    }

    init() {
        this.setupElements();
        this.bindEvents();
        this.start();
        
        console.log('🎬 Parallax Engine initialized');
    }

    setupElements() {
        const parallaxElements = document.querySelectorAll('[data-parallax]');
        
        parallaxElements.forEach(element => {
            const speed = parseFloat(element.dataset.parallax) || 0.5;
            const direction = element.dataset.parallaxDirection || 'vertical';
            const layer = element.dataset.parallaxLayer || 'background';
            const mouseEnabled = element.dataset.parallaxMouse !== 'false';
            
            this.elements.set(element, {
                speed,
                direction,
                layer,
                mouseEnabled,
                initialTransform: this.getInitialTransform(element),
                rect: element.getBoundingClientRect(),
                lastTransform: { x: 0, y: 0, z: 0 },
                visible: true
            });
            
            // Optimize for GPU acceleration
            element.style.willChange = 'transform';
            element.style.transformStyle = 'preserve-3d';
            element.style.backfaceVisibility = 'hidden';
        });
    }

    getInitialTransform(element) {
        const computedStyle = window.getComputedStyle(element);
        const transform = computedStyle.transform;
        
        if (transform === 'none') {
            return { x: 0, y: 0, z: 0, scale: 1, rotate: 0 };
        }
        
        // Parse existing transform matrix
        const matrix = transform.match(/matrix.*\((.+)\)/);
        if (matrix) {
            const values = matrix[1].split(', ');
            return {
                x: parseFloat(values[4]) || 0,
                y: parseFloat(values[5]) || 0,
                z: 0,
                scale: parseFloat(values[0]) || 1,
                rotate: 0
            };
        }
        
        return { x: 0, y: 0, z: 0, scale: 1, rotate: 0 };
    }

    bindEvents() {
        // Scroll event
        let scrollTicking = false;
        window.addEventListener('scroll', () => {
            if (!scrollTicking) {
                requestAnimationFrame(() => {
                    this.scrollY = window.pageYOffset;
                    scrollTicking = false;
                });
                scrollTicking = true;
            }
        }, { passive: true });

        // Mouse events for desktop
        if (this.options.mouseEnabled && !this.isMobile()) {
            let mouseTicking = false;
            window.addEventListener('mousemove', (e) => {
                if (!mouseTicking) {
                    requestAnimationFrame(() => {
                        this.mouseX = e.clientX;
                        this.mouseY = e.clientY;
                        mouseTicking = false;
                    });
                    mouseTicking = true;
                }
            }, { passive: true });
        }

        // Resize event
        let resizeTicking = false;
        window.addEventListener('resize', () => {
            if (!resizeTicking) {
                requestAnimationFrame(() => {
                    this.windowWidth = window.innerWidth;
                    this.windowHeight = window.innerHeight;
                    this.updateElementRects();
                    resizeTicking = false;
                });
                resizeTicking = true;
            }
        }, { passive: true });

        // Intersection Observer for performance
        this.observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                const elementData = this.elements.get(entry.target);
                if (elementData) {
                    elementData.visible = entry.isIntersecting;
                }
            });
        }, {
            rootMargin: '50px'
        });

        this.elements.forEach((data, element) => {
            this.observer.observe(element);
        });
    }

    updateElementRects() {
        this.elements.forEach((data, element) => {
            data.rect = element.getBoundingClientRect();
        });
    }

    start() {
        if (this.isActive) return;
        this.isActive = true;
        this.animate();
    }

    stop() {
        this.isActive = false;
        if (this.rafId) {
            cancelAnimationFrame(this.rafId);
            this.rafId = null;
        }
    }

    animate() {
        if (!this.isActive) return;

        this.elements.forEach((data, element) => {
            if (!data.visible) return;

            const transform = this.calculateTransform(element, data);
            this.applyTransform(element, data, transform);
        });

        this.rafId = requestAnimationFrame(() => this.animate());
    }

    calculateTransform(element, data) {
        const { speed, direction, mouseEnabled, rect, initialTransform } = data;
        
        let x = initialTransform.x;
        let y = initialTransform.y;
        let z = initialTransform.z;

        // Scroll-based parallax
        if (direction === 'vertical' || direction === 'both') {
            const elementTop = rect.top + this.scrollY;
            const scrolled = this.scrollY;
            const rate = scrolled * speed * this.options.scrollMultiplier;
            y = initialTransform.y + rate;
        }

        if (direction === 'horizontal' || direction === 'both') {
            const scrolled = this.scrollY;
            const rate = scrolled * speed * this.options.scrollMultiplier * 0.5;
            x = initialTransform.x + rate;
        }

        // Mouse-based parallax (desktop only)
        if (mouseEnabled && this.options.mouseEnabled && !this.isMobile()) {
            const centerX = this.windowWidth / 2;
            const centerY = this.windowHeight / 2;
            
            const mouseOffsetX = (this.mouseX - centerX) * this.options.mouseMultiplier * speed;
            const mouseOffsetY = (this.mouseY - centerY) * this.options.mouseMultiplier * speed;
            
            x += mouseOffsetX;
            y += mouseOffsetY;
        }

        // Apply boundaries
        x = Math.max(this.options.boundaries.min, Math.min(this.options.boundaries.max, x));
        y = Math.max(this.options.boundaries.min, Math.min(this.options.boundaries.max, y));

        // 3D effects based on layer
        if (data.layer === 'foreground') {
            z = speed * 10;
        } else if (data.layer === 'background') {
            z = -speed * 10;
        }

        return { x, y, z };
    }

    applyTransform(element, data, transform) {
        const { x, y, z } = transform;
        const { lastTransform } = data;

        // Check if transform changed significantly to avoid unnecessary updates
        const threshold = 0.5;
        if (
            Math.abs(x - lastTransform.x) < threshold &&
            Math.abs(y - lastTransform.y) < threshold &&
            Math.abs(z - lastTransform.z) < threshold
        ) {
            return;
        }

        // Update last transform
        data.lastTransform = { x, y, z };

        // Apply transform based on performance mode
        if (this.options.performance === 'high' || (!this.isMobile() && this.canUseGPU())) {
            element.style.transform = `translate3d(${x}px, ${y}px, ${z}px)`;
        } else {
            element.style.transform = `translate(${x}px, ${y}px)`;
        }
    }

    // Advanced parallax effects
    addParallaxElement(element, options = {}) {
        const config = {
            speed: 0.5,
            direction: 'vertical',
            layer: 'background',
            mouseEnabled: true,
            ...options
        };

        this.elements.set(element, {
            ...config,
            initialTransform: this.getInitialTransform(element),
            rect: element.getBoundingClientRect(),
            lastTransform: { x: 0, y: 0, z: 0 },
            visible: true
        });

        element.style.willChange = 'transform';
        element.style.transformStyle = 'preserve-3d';
        element.style.backfaceVisibility = 'hidden';

        this.observer.observe(element);
    }

    removeParallaxElement(element) {
        if (this.elements.has(element)) {
            this.elements.delete(element);
            this.observer.unobserve(element);
            element.style.willChange = 'auto';
            element.style.transform = '';
        }
    }

    // Specialized parallax effects
    createImageParallax(imageElement, speed = 0.3) {
        const container = imageElement.parentElement;
        container.style.overflow = 'hidden';
        
        imageElement.style.width = '110%';
        imageElement.style.height = '110%';
        imageElement.style.objectFit = 'cover';
        
        this.addParallaxElement(imageElement, {
            speed,
            direction: 'vertical',
            layer: 'background',
            mouseEnabled: false
        });
    }

    createTextParallax(textElement, speed = 0.2) {
        this.addParallaxElement(textElement, {
            speed,
            direction: 'vertical',
            layer: 'foreground',
            mouseEnabled: true
        });
    }

    createBackgroundParallax(element, speed = 0.5) {
        element.style.backgroundAttachment = 'fixed';
        element.style.backgroundSize = 'cover';
        element.style.backgroundPosition = 'center';
        
        this.addParallaxElement(element, {
            speed,
            direction: 'vertical',
            layer: 'background',
            mouseEnabled: false
        });
    }

    // Multi-layer parallax setup
    setupMultiLayerParallax(container) {
        const layers = container.querySelectorAll('[data-parallax-layer]');
        
        layers.forEach(layer => {
            const layerType = layer.dataset.parallaxLayer;
            let speed = 0.5;
            
            switch (layerType) {
                case 'far-background':
                    speed = 0.1;
                    break;
                case 'background':
                    speed = 0.3;
                    break;
                case 'midground':
                    speed = 0.5;
                    break;
                case 'foreground':
                    speed = 0.7;
                    break;
                case 'close-foreground':
                    speed = 0.9;
                    break;
            }
            
            this.addParallaxElement(layer, {
                speed,
                direction: 'vertical',
                layer: layerType,
                mouseEnabled: true
            });
        });
    }

    // Performance helpers
    isMobile() {
        return /iPhone|iPad|iPod|Android/i.test(navigator.userAgent) || window.innerWidth <= 768;
    }

    canUseGPU() {
        try {
            const canvas = document.createElement('canvas');
            const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
            return !!gl;
        } catch (e) {
            return false;
        }
    }

    // Performance optimization
    optimizePerformance() {
        const visibleElements = Array.from(this.elements.entries()).filter(([, data]) => data.visible);
        
        // Reduce animation frequency for non-visible elements
        this.elements.forEach((data, element) => {
            if (!data.visible) {
                element.style.willChange = 'auto';
            } else {
                element.style.willChange = 'transform';
            }
        });
    }

    // Smooth scroll integration
    onSmoothScroll(targetY, duration = 1000) {
        const startY = this.scrollY;
        const distance = targetY - startY;
        const startTime = performance.now();

        const animateScroll = (currentTime) => {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            
            // Easing function
            const easeProgress = 1 - Math.pow(1 - progress, 3);
            
            this.scrollY = startY + (distance * easeProgress);
            
            if (progress < 1) {
                requestAnimationFrame(animateScroll);
            }
        };

        requestAnimationFrame(animateScroll);
    }

    // Event methods
    onResize() {
        this.windowWidth = window.innerWidth;
        this.windowHeight = window.innerHeight;
        this.updateElementRects();
    }

    onOrientationChange() {
        setTimeout(() => {
            this.onResize();
        }, 100);
    }

    // Public API
    setMouseMultiplier(multiplier) {
        this.options.mouseMultiplier = multiplier;
    }

    setScrollMultiplier(multiplier) {
        this.options.scrollMultiplier = multiplier;
    }

    enableMouse() {
        this.options.mouseEnabled = true;
    }

    disableMouse() {
        this.options.mouseEnabled = false;
    }

    pause() {
        this.stop();
    }

    resume() {
        this.start();
    }

    // Cleanup
    destroy() {
        this.stop();
        
        if (this.observer) {
            this.observer.disconnect();
        }

        this.elements.forEach((data, element) => {
            element.style.willChange = 'auto';
            element.style.transform = '';
            element.style.transformStyle = '';
            element.style.backfaceVisibility = '';
        });

        this.elements.clear();
        
        console.log('🧹 Parallax Engine destroyed');
    }
}

export default ParallaxEngine;