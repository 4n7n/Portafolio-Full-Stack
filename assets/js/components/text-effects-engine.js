class TextEffectsEngine {
    constructor(options = {}) {
        this.options = {
            typewriterSpeed: 50,
            scrambleSpeed: 30,
            scrambleCharacters: 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+-=[]{}|;:,.<>?',
            revealSpeed: 50,
            waveSpeed: 100,
            morphSpeed: 100,
            glitchDuration: 2000,
            ...options
        };

        this.activeEffects = new Map();
        this.observer = null;
        this.isInitialized = false;

        this.init();
    }

    init() {
        this.setupObserver();
        this.setupElements();
        this.isInitialized = true;
        
        console.log('📝 Text Effects Engine initialized');
    }

    setupObserver() {
        this.observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    this.triggerTextEffect(entry.target);
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        });
    }

    setupElements() {
        const textElements = document.querySelectorAll('[data-text-effect]');
        textElements.forEach(element => {
            this.prepareTextElement(element);
            this.observer.observe(element);
        });
    }

    prepareTextElement(element) {
        const effect = element.dataset.textEffect;
        const originalText = element.textContent.trim();
        
        // Store original text
        element.dataset.originalText = originalText;
        
        // Prepare element based on effect type
        switch (effect) {
            case 'typewriter':
                this.prepareTypewriter(element, originalText);
                break;
            case 'scramble':
                this.prepareScramble(element, originalText);
                break;
            case 'reveal':
                this.prepareReveal(element, originalText);
                break;
            case 'wave':
                this.prepareWave(element, originalText);
                break;
            case 'morph':
                this.prepareMorph(element, originalText);
                break;
            case 'glitch':
                this.prepareGlitch(element, originalText);
                break;
            case 'gradient':
                this.prepareGradient(element, originalText);
                break;
            case 'split':
                this.prepareSplit(element, originalText);
                break;
        }
    }

    prepareTypewriter(element, text) {
        element.textContent = '';
        element.style.borderRight = '2px solid currentColor';
        element.style.animation = 'blink-caret 1s step-end infinite';
        
        // Add cursor blink animation if not exists
        if (!document.querySelector('#typewriter-styles')) {
            const style = document.createElement('style');
            style.id = 'typewriter-styles';
            style.textContent = `
                @keyframes blink-caret {
                    from, to { border-color: transparent; }
                    50% { border-color: currentColor; }
                }
            `;
            document.head.appendChild(style);
        }
    }

    prepareScramble(element, text) {
        element.style.fontFamily = 'monospace';
        element.style.letterSpacing = '0.1em';
    }

    prepareReveal(element, text) {
        element.innerHTML = '';
        
        // Split text into spans
        text.split('').forEach((char, index) => {
            const span = document.createElement('span');
            span.textContent = char === ' ' ? '\u00A0' : char;
            span.style.opacity = '0';
            span.style.transform = 'translateY(20px)';
            span.style.display = 'inline-block';
            span.style.transition = `all 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94)`;
            span.style.transitionDelay = `${index * 0.05}s`;
            element.appendChild(span);
        });
    }

    prepareWave(element, text) {
        element.innerHTML = '';
        
        text.split('').forEach((char, index) => {
            const span = document.createElement('span');
            span.textContent = char === ' ' ? '\u00A0' : char;
            span.style.display = 'inline-block';
            span.style.transition = `transform 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94)`;
            span.style.transitionDelay = `${index * 0.1}s`;
            element.appendChild(span);
        });
    }

    prepareMorph(element, text) {
        const morphStrings = element.dataset.morphStrings ? 
            element.dataset.morphStrings.split('|') : [text];
        element.dataset.morphIndex = '0';
        element.dataset.morphStrings = morphStrings.join('|');
    }

    prepareGlitch(element, text) {
        element.style.position = 'relative';
        element.style.display = 'inline-block';
        
        // Create glitch layers
        for (let i = 0; i < 3; i++) {
            const glitchLayer = document.createElement('span');
            glitchLayer.textContent = text;
            glitchLayer.className = `glitch-layer glitch-layer-${i}`;
            glitchLayer.style.position = 'absolute';
            glitchLayer.style.top = '0';
            glitchLayer.style.left = '0';
            glitchLayer.style.opacity = '0';
            glitchLayer.style.pointerEvents = 'none';
            element.appendChild(glitchLayer);
        }
    }

    prepareGradient(element, text) {
        element.style.background = 'linear-gradient(45deg, #ff006e, #8338ec, #3a86ff)';
        element.style.backgroundSize = '200% 200%';
        element.style.backgroundClip = 'text';
        element.style.webkitBackgroundClip = 'text';
        element.style.webkitTextFillColor = 'transparent';
        element.style.animation = 'gradient-shift 3s ease infinite';
        
        // Add gradient animation if not exists
        if (!document.querySelector('#gradient-styles')) {
            const style = document.createElement('style');
            style.id = 'gradient-styles';
            style.textContent = `
                @keyframes gradient-shift {
                    0%, 100% { background-position: 0% 50%; }
                    50% { background-position: 100% 50%; }
                }
            `;
            document.head.appendChild(style);
        }
    }

    prepareSplit(element, text) {
        element.innerHTML = '';
        
        const words = text.split(' ');
        words.forEach((word, wordIndex) => {
            const wordSpan = document.createElement('span');
            wordSpan.style.display = 'inline-block';
            wordSpan.style.marginRight = '0.3em';
            
            word.split('').forEach((char, charIndex) => {
                const charSpan = document.createElement('span');
                charSpan.textContent = char;
                charSpan.style.display = 'inline-block';
                charSpan.style.opacity = '0';
                charSpan.style.transform = 'translateY(100px) rotateX(90deg)';
                charSpan.style.transition = 'all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
                charSpan.style.transitionDelay = `${(wordIndex * 0.1) + (charIndex * 0.05)}s`;
                wordSpan.appendChild(charSpan);
            });
            
            element.appendChild(wordSpan);
        });
    }

    triggerTextEffect(element) {
        const effect = element.dataset.textEffect;
        const alreadyTriggered = element.dataset.textTriggered === 'true';
        
        if (alreadyTriggered) return;
        
        element.dataset.textTriggered = 'true';
        
        switch (effect) {
            case 'typewriter':
                this.typewriterEffect(element);
                break;
            case 'scramble':
                this.scrambleEffect(element);
                break;
            case 'reveal':
                this.revealEffect(element);
                break;
            case 'wave':
                this.waveEffect(element);
                break;
            case 'morph':
                this.morphEffect(element);
                break;
            case 'glitch':
                this.glitchEffect(element);
                break;
            case 'gradient':
                this.gradientEffect(element);
                break;
            case 'split':
                this.splitEffect(element);
                break;
        }
    }

    typewriterEffect(element) {
        const originalText = element.dataset.originalText;
        const speed = parseInt(element.dataset.speed) || this.options.typewriterSpeed;
        let currentText = '';
        let index = 0;
        
        const typeInterval = setInterval(() => {
            if (index < originalText.length) {
                currentText += originalText[index];
                element.textContent = currentText;
                index++;
            } else {
                clearInterval(typeInterval);
                // Remove cursor after completion
                setTimeout(() => {
                    element.style.borderRight = 'none';
                    element.style.animation = 'none';
                }, 500);
            }
        }, speed);
        
        this.activeEffects.set(element, typeInterval);
    }

    scrambleEffect(element) {
        const originalText = element.dataset.originalText;
        const speed = parseInt(element.dataset.speed) || this.options.scrambleSpeed;
        const characters = this.options.scrambleCharacters;
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
        }, speed);
        
        this.activeEffects.set(element, scrambleInterval);
    }

    revealEffect(element) {
        const spans = element.querySelectorAll('span');
        spans.forEach(span => {
            span.style.opacity = '1';
            span.style.transform = 'translateY(0)';
        });
    }

    waveEffect(element) {
        const spans = element.querySelectorAll('span');
        
        spans.forEach((span, index) => {
            setTimeout(() => {
                span.style.transform = 'translateY(-10px)';
                setTimeout(() => {
                    span.style.transform = 'translateY(0)';
                }, 200);
            }, index * this.options.waveSpeed);
        });
    }

    morphEffect(element) {
        const morphStrings = element.dataset.morphStrings.split('|');
        let currentIndex = 0;
        
        const morphInterval = setInterval(() => {
            currentIndex = (currentIndex + 1) % morphStrings.length;
            this.morphToText(element, morphStrings[currentIndex]);
        }, 3000);
        
        this.activeEffects.set(element, morphInterval);
    }

    morphToText(element, newText) {
        const currentText = element.textContent;
        const maxLength = Math.max(currentText.length, newText.length);
        let iteration = 0;
        
        const morphInterval = setInterval(() => {
            element.textContent = newText
                .split('')
                .map((char, index) => {
                    if (index < iteration) {
                        return char;
                    }
                    return currentText[index] || '';
                })
                .join('');
                
            if (iteration >= newText.length) {
                clearInterval(morphInterval);
            }
            
            iteration++;
        }, this.options.morphSpeed);
    }

    glitchEffect(element) {
        const layers = element.querySelectorAll('.glitch-layer');
        const duration = parseInt(element.dataset.duration) || this.options.glitchDuration;
        
        layers.forEach((layer, index) => {
            layer.style.opacity = '0.8';
            layer.style.color = index === 0 ? '#ff0000' : index === 1 ? '#00ff00' : '#0000ff';
            layer.style.animation = `glitch-${index} ${duration}ms infinite`;
        });
        
        // Add glitch animations if not exists
        if (!document.querySelector('#glitch-styles')) {
            const style = document.createElement('style');
            style.id = 'glitch-styles';
            style.textContent = `
                @keyframes glitch-0 {
                    0%, 100% { transform: translate(0); }
                    20% { transform: translate(-2px, 2px); }
                    40% { transform: translate(-2px, -2px); }
                    60% { transform: translate(2px, 2px); }
                    80% { transform: translate(2px, -2px); }
                }
                @keyframes glitch-1 {
                    0%, 100% { transform: translate(0); }
                    20% { transform: translate(2px, -2px); }
                    40% { transform: translate(2px, 2px); }
                    60% { transform: translate(-2px, -2px); }
                    80% { transform: translate(-2px, 2px); }
                }
                @keyframes glitch-2 {
                    0%, 100% { transform: translate(0); }
                    20% { transform: translate(-1px, 1px); }
                    40% { transform: translate(1px, -1px); }
                    60% { transform: translate(-1px, -1px); }
                    80% { transform: translate(1px, 1px); }
                }
            `;
            document.head.appendChild(style);
        }
        
        // Stop glitch after duration
        setTimeout(() => {
            layers.forEach(layer => {
                layer.style.opacity = '0';
                layer.style.animation = 'none';
            });
        }, duration);
    }

    gradientEffect(element) {
        // Already set up in prepare, just ensure animation starts
        element.style.animationPlayState = 'running';
    }

    splitEffect(element) {
        const spans = element.querySelectorAll('span span');
        spans.forEach(span => {
            span.style.opacity = '1';
            span.style.transform = 'translateY(0) rotateX(0)';
        });
    }

    // Advanced text effects
    createCounterEffect(element, endValue, duration = 2000) {
        const startValue = 0;
        const startTime = performance.now();
        
        const animate = (currentTime) => {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            
            // Easing function
            const easeProgress = 1 - Math.pow(1 - progress, 3);
            const currentValue = Math.floor(startValue + (endValue - startValue) * easeProgress);
            
            element.textContent = currentValue.toLocaleString();
            
            if (progress < 1) {
                requestAnimationFrame(animate);
            }
        };
        
        requestAnimationFrame(animate);
    }

    createHighlightEffect(element, highlightColor = '#ffff00') {
        const text = element.textContent;
        element.innerHTML = '';
        
        text.split('').forEach((char, index) => {
            const span = document.createElement('span');
            span.textContent = char === ' ' ? '\u00A0' : char;
            span.style.background = 'transparent';
            span.style.transition = 'background-color 0.3s ease';
            
            setTimeout(() => {
                span.style.backgroundColor = highlightColor;
                setTimeout(() => {
                    span.style.backgroundColor = 'transparent';
                }, 300);
            }, index * 50);
            
            element.appendChild(span);
        });
    }

    createMatrixEffect(element, duration = 3000) {
        const characters = '01';
        const text = element.textContent;
        const iterations = Math.floor(duration / 100);
        let currentIteration = 0;
        
        const matrixInterval = setInterval(() => {
            if (currentIteration < iterations) {
                element.textContent = text
                    .split('')
                    .map(() => characters[Math.floor(Math.random() * characters.length)])
                    .join('');
                currentIteration++;
            } else {
                element.textContent = text;
                clearInterval(matrixInterval);
            }
        }, 100);
    }

    // Public API
    addTextEffect(element, effect, options = {}) {
        element.dataset.textEffect = effect;
        Object.keys(options).forEach(key => {
            element.dataset[key] = options[key];
        });
        
        this.prepareTextElement(element);
        this.observer.observe(element);
    }

    triggerEffect(selector, effect) {
        const elements = typeof selector === 'string' 
            ? document.querySelectorAll(selector)
            : [selector];
            
        elements.forEach(element => {
            element.dataset.textEffect = effect;
            element.dataset.textTriggered = 'false';
            this.triggerTextEffect(element);
        });
    }

    resetEffect(selector) {
        const elements = typeof selector === 'string' 
            ? document.querySelectorAll(selector)
            : [selector];
            
        elements.forEach(element => {
            element.dataset.textTriggered = 'false';
            const originalText = element.dataset.originalText;
            if (originalText) {
                element.textContent = originalText;
                this.prepareTextElement(element);
            }
        });
    }

    stopEffect(element) {
        if (this.activeEffects.has(element)) {
            const effect = this.activeEffects.get(element);
            clearInterval(effect);
            this.activeEffects.delete(element);
        }
    }

    // Cleanup
    destroy() {
        // Stop all active effects
        this.activeEffects.forEach(effect => clearInterval(effect));
        this.activeEffects.clear();
        
        // Disconnect observer
        if (this.observer) {
            this.observer.disconnect();
        }
        
        // Reset all text elements
        const textElements = document.querySelectorAll('[data-text-effect]');
        textElements.forEach(element => {
            const originalText = element.dataset.originalText;
            if (originalText) {
                element.textContent = originalText;
                element.style.cssText = '';
            }
        });
        
        console.log('🧹 Text Effects Engine destroyed');
    }
}

export default TextEffectsEngine;