class ProgressIndicators {
    constructor(options = {}) {
        this.options = {
            readingProgress: {
                enabled: true,
                position: 'top',
                height: 4,
                color: 'gradient'
            },
            sectionProgress: {
                enabled: true,
                position: 'right',
                showLabels: false,
                autoHide: false
            },
            circularProgress: {
                enabled: true,
                size: 80,
                strokeWidth: 3,
                animationDuration: 800
            },
            smoothScroll: {
                enabled: true,
                duration: 1000,
                easing: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)'
            },
            ...options
        };

        this.elements = {
            readingProgress: null,
            sectionIndicators: [],
            circularProgress: []
        };

        this.scrollProgress = 0;
        this.sections = [];
        this.currentSection = 0;
        this.isScrolling = false;

        this.init();
    }

    init() {
        this.createReadingProgress();
        this.createSectionIndicators();
        this.setupSections();
        this.bindEvents();
        this.setupIntersectionObserver();
        
        console.log('📊 Progress Indicators initialized');
    }

    createReadingProgress() {
        if (!this.options.readingProgress.enabled) return;

        const progressContainer = document.createElement('div');
        progressContainer.className = 'scroll-progress';
        progressContainer.style.cssText = `
            position: fixed;
            ${this.options.readingProgress.position}: 0;
            left: 0;
            width: 100%;
            height: ${this.options.readingProgress.height}px;
            background: rgba(255, 255, 255, 0.1);
            backdrop-filter: blur(10px);
            z-index: 1000;
            transition: opacity 0.3s ease;
        `;

        const progressBar = document.createElement('div');
        progressBar.className = 'scroll-progress-bar';
        progressBar.style.cssText = `
            height: 100%;
            width: 0%;
            transition: width 0.1s ease-out;
            transform-origin: left;
        `;

        if (this.options.readingProgress.color === 'gradient') {
            progressBar.style.background = `
                linear-gradient(90deg, 
                    var(--color-primary, #2563eb),
                    var(--color-accent, #f59e0b),
                    var(--color-primary, #2563eb)
                )
            `;
            progressBar.style.backgroundSize = '200% 100%';
            progressBar.style.animation = 'gradient-shift 3s ease infinite';
        } else {
            progressBar.style.background = 'var(--color-primary, #2563eb)';
        }

        progressContainer.appendChild(progressBar);
        document.body.appendChild(progressContainer);

        this.elements.readingProgress = {
            container: progressContainer,
            bar: progressBar
        };

        // Add gradient animation keyframes
        if (!document.querySelector('#progress-styles')) {
            const style = document.createElement('style');
            style.id = 'progress-styles';
            style.textContent = `
                @keyframes gradient-shift {
                    0%, 100% { background-position: 0% 50%; }
                    50% { background-position: 100% 50%; }
                }
            `;
            document.head.appendChild(style);
        }
    }

    createSectionIndicators() {
        if (!this.options.sectionProgress.enabled) return;

        const indicatorsContainer = document.createElement('div');
        indicatorsContainer.className = 'section-progress-indicators';
        indicatorsContainer.style.cssText = `
            position: fixed;
            ${this.options.sectionProgress.position}: 2rem;
            top: 50%;
            transform: translateY(-50%);
            z-index: 100;
            display: flex;
            flex-direction: column;
            gap: 1rem;
            transition: opacity 0.3s ease;
        `;

        // Auto-hide on mobile
        if (window.innerWidth <= 768) {
            indicatorsContainer.style.display = 'none';
        }

        document.body.appendChild(indicatorsContainer);
        this.elements.sectionIndicatorsContainer = indicatorsContainer;
    }

    setupSections() {
        const sectionSelectors = [
            'section',
            '[data-section]',
            '.section',
            'main > div',
            'header',
            'footer'
        ];

        let sections = [];
        
        sectionSelectors.forEach(selector => {
            const elements = document.querySelectorAll(selector);
            elements.forEach(el => {
                if (!sections.includes(el) && el.offsetHeight > 100) {
                    sections.push(el);
                }
            });
        });

        // Sort sections by their position in the document
        this.sections = sections.sort((a, b) => {
            return a.getBoundingClientRect().top - b.getBoundingClientRect().top;
        });

        // Create indicators for each section
        this.createIndicatorsForSections();
    }

    createIndicatorsForSections() {
        if (!this.options.sectionProgress.enabled || !this.elements.sectionIndicatorsContainer) return;

        this.sections.forEach((section, index) => {
            const indicator = document.createElement('div');
            indicator.className = 'section-indicator';
            indicator.dataset.section = index;
            indicator.style.cssText = `
                width: 12px;
                height: 12px;
                border: 2px solid var(--color-text-secondary, #64748b);
                border-radius: 50%;
                cursor: pointer;
                transition: all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94);
                position: relative;
            `;

            // Add inner circle
            const innerCircle = document.createElement('div');
            innerCircle.style.cssText = `
                position: absolute;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%) scale(0);
                width: 6px;
                height: 6px;
                background: var(--color-primary, #2563eb);
                border-radius: 50%;
                transition: transform 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94);
            `;
            indicator.appendChild(innerCircle);

            // Add label if enabled
            if (this.options.sectionProgress.showLabels) {
                const label = document.createElement('span');
                label.textContent = section.dataset.sectionName || 
                                  section.querySelector('h1, h2, h3')?.textContent?.slice(0, 20) || 
                                  `Section ${index + 1}`;
                label.style.cssText = `
                    position: absolute;
                    ${this.options.sectionProgress.position === 'left' ? 'right' : 'left'}: 2rem;
                    top: 50%;
                    transform: translateY(-50%);
                    background: var(--color-surface, #ffffff);
                    padding: 0.5rem 1rem;
                    border-radius: 0.5rem;
                    font-size: 0.875rem;
                    white-space: nowrap;
                    opacity: 0;
                    pointer-events: none;
                    transition: opacity 0.3s ease;
                    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
                `;
                indicator.appendChild(label);

                // Show label on hover
                indicator.addEventListener('mouseenter', () => {
                    label.style.opacity = '1';
                });
                indicator.addEventListener('mouseleave', () => {
                    label.style.opacity = '0';
                });
            }

            // Click handler for smooth scroll
            indicator.addEventListener('click', () => {
                this.scrollToSection(index);
            });

            this.elements.sectionIndicatorsContainer.appendChild(indicator);
            this.elements.sectionIndicators.push({
                element: indicator,
                section: section,
                innerCircle: innerCircle,
                index: index
            });
        });
    }

    setupIntersectionObserver() {
        this.sectionObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                const sectionIndex = this.sections.indexOf(entry.target);
                if (sectionIndex !== -1 && entry.isIntersecting) {
                    this.setActiveSection(sectionIndex);
                }
            });
        }, {
            threshold: 0.3,
            rootMargin: '-20% 0px -20% 0px'
        });

        this.sections.forEach(section => {
            this.sectionObserver.observe(section);
        });
    }

    bindEvents() {
        // Throttled scroll event for reading progress
        let scrollTicking = false;
        window.addEventListener('scroll', () => {
            if (!scrollTicking) {
                requestAnimationFrame(() => {
                    this.updateReadingProgress();
                    this.updateSectionProgress();
                    scrollTicking = false;
                });
                scrollTicking = true;
            }
        }, { passive: true });

        // Resize event
        window.addEventListener('resize', () => {
            this.handleResize();
        }, { passive: true });

        // Hide indicators when scrolling stops
        let scrollTimeout;
        window.addEventListener('scroll', () => {
            this.showIndicators();
            clearTimeout(scrollTimeout);
            scrollTimeout = setTimeout(() => {
                if (this.options.sectionProgress.autoHide) {
                    this.hideIndicators();
                }
            }, 2000);
        }, { passive: true });
    }

    updateReadingProgress() {
        if (!this.elements.readingProgress) return;

        const scrollTop = window.pageYOffset;
        const documentHeight = document.documentElement.scrollHeight - window.innerHeight;
        const scrollProgress = Math.min(scrollTop / documentHeight, 1);

        this.scrollProgress = scrollProgress;
        this.elements.readingProgress.bar.style.width = `${scrollProgress * 100}%`;

        // Hide progress bar at top and show at bottom
        if (scrollTop < 100) {
            this.elements.readingProgress.container.style.opacity = '0';
        } else {
            this.elements.readingProgress.container.style.opacity = '1';
        }
    }

    updateSectionProgress() {
        // Calculate which section is currently most visible
        let maxVisibleArea = 0;
        let mostVisibleSection = 0;

        this.sections.forEach((section, index) => {
            const rect = section.getBoundingClientRect();
            const windowHeight = window.innerHeight;
            
            // Calculate visible area
            const visibleTop = Math.max(0, Math.min(rect.bottom, windowHeight) - Math.max(rect.top, 0));
            const visibleArea = visibleTop / rect.height;
            
            if (visibleArea > maxVisibleArea) {
                maxVisibleArea = visibleArea;
                mostVisibleSection = index;
            }
        });

        if (mostVisibleSection !== this.currentSection) {
            this.setActiveSection(mostVisibleSection);
        }
    }

    setActiveSection(index) {
        if (index === this.currentSection) return;

        // Remove active state from previous section
        if (this.elements.sectionIndicators[this.currentSection]) {
            const prevIndicator = this.elements.sectionIndicators[this.currentSection];
            prevIndicator.element.style.borderColor = 'var(--color-text-secondary, #64748b)';
            prevIndicator.element.style.transform = 'scale(1)';
            prevIndicator.innerCircle.style.transform = 'translate(-50%, -50%) scale(0)';
        }

        // Set active state for current section
        this.currentSection = index;
        if (this.elements.sectionIndicators[index]) {
            const indicator = this.elements.sectionIndicators[index];
            indicator.element.style.borderColor = 'var(--color-primary, #2563eb)';
            indicator.element.style.transform = 'scale(1.2)';
            indicator.innerCircle.style.transform = 'translate(-50%, -50%) scale(1)';
        }

        // Emit custom event
        window.dispatchEvent(new CustomEvent('sectionChange', {
            detail: { 
                index, 
                section: this.sections[index],
                progress: this.scrollProgress 
            }
        }));
    }

    scrollToSection(index) {
        if (index < 0 || index >= this.sections.length) return;

        const section = this.sections[index];
        const offsetTop = section.offsetTop;
        const navbarHeight = document.querySelector('.navbar')?.offsetHeight || 0;
        const targetPosition = offsetTop - navbarHeight - 20;

        this.smoothScrollTo(targetPosition);
    }

    smoothScrollTo(targetPosition) {
        if (!this.options.smoothScroll.enabled) {
            window.scrollTo(0, targetPosition);
            return;
        }

        const startPosition = window.pageYOffset;
        const distance = targetPosition - startPosition;
        const duration = this.options.smoothScroll.duration;
        let startTime = null;

        const animateScroll = (currentTime) => {
            if (startTime === null) startTime = currentTime;
            const timeElapsed = currentTime - startTime;
            const progress = Math.min(timeElapsed / duration, 1);

            // Easing function
            const easeProgress = this.easeInOutCubic(progress);
            const currentPosition = startPosition + (distance * easeProgress);

            window.scrollTo(0, currentPosition);

            if (timeElapsed < duration) {
                requestAnimationFrame(animateScroll);
            }
        };

        this.isScrolling = true;
        requestAnimationFrame(animateScroll);
        
        setTimeout(() => {
            this.isScrolling = false;
        }, duration);
    }

    easeInOutCubic(t) {
        return t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1;
    }

    // Circular progress indicators
    createCircularProgress(element, options = {}) {
        const config = {
            size: this.options.circularProgress.size,
            strokeWidth: this.options.circularProgress.strokeWidth,
            animationDuration: this.options.circularProgress.animationDuration,
            color: 'var(--color-primary, #2563eb)',
            backgroundColor: 'var(--color-text-secondary, #64748b)',
            showPercentage: true,
            ...options
        };

        const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
        svg.classList.add('circular-progress');
        svg.style.cssText = `
            width: ${config.size}px;
            height: ${config.size}px;
            transform: rotate(-90deg);
        `;

        const radius = (config.size - config.strokeWidth) / 2;
        const circumference = 2 * Math.PI * radius;

        // Background circle
        const backgroundCircle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
        backgroundCircle.style.cssText = `
            cx: ${config.size / 2};
            cy: ${config.size / 2};
            r: ${radius};
            fill: none;
            stroke: ${config.backgroundColor};
            stroke-width: ${config.strokeWidth};
        `;

        // Progress circle
        const progressCircle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
        progressCircle.classList.add('progress-circle');
        progressCircle.style.cssText = `
            cx: ${config.size / 2};
            cy: ${config.size / 2};
            r: ${radius};
            fill: none;
            stroke: ${config.color};
            stroke-width: ${config.strokeWidth};
            stroke-linecap: round;
            stroke-dasharray: ${circumference};
            stroke-dashoffset: ${circumference};
            transition: stroke-dashoffset ${config.animationDuration}ms cubic-bezier(0.25, 0.46, 0.45, 0.94);
        `;

        svg.appendChild(backgroundCircle);
        svg.appendChild(progressCircle);

        // Percentage text
        let percentageText = null;
        if (config.showPercentage) {
            percentageText = document.createElement('div');
            percentageText.classList.add('progress-text');
            percentageText.style.cssText = `
                position: absolute;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%) rotate(90deg);
                font-size: ${config.size * 0.15}px;
                font-weight: 600;
                color: var(--color-text-primary, #1e293b);
                text-align: center;
            `;
            percentageText.textContent = '0%';
        }

        // Container
        const container = document.createElement('div');
        container.style.cssText = `
            position: relative;
            display: inline-block;
            width: ${config.size}px;
            height: ${config.size}px;
        `;
        container.appendChild(svg);
        if (percentageText) {
            container.appendChild(percentageText);
        }

        element.appendChild(container);

        // Store reference for updates
        const progressData = {
            element: container,
            circle: progressCircle,
            text: percentageText,
            circumference,
            config
        };

        this.elements.circularProgress.push(progressData);

        return {
            setProgress: (progress) => this.updateCircularProgress(progressData, progress),
            destroy: () => this.destroyCircularProgress(progressData)
        };
    }

    updateCircularProgress(progressData, progress) {
        const { circle, text, circumference } = progressData;
        const offset = circumference * (1 - Math.max(0, Math.min(1, progress)));
        
        circle.style.strokeDashoffset = offset;
        
        if (text) {
            text.textContent = `${Math.round(progress * 100)}%`;
        }
    }

    destroyCircularProgress(progressData) {
        const index = this.elements.circularProgress.indexOf(progressData);
        if (index > -1) {
            this.elements.circularProgress.splice(index, 1);
            progressData.element.remove();
        }
    }

    // Utility methods
    showIndicators() {
        if (this.elements.sectionIndicatorsContainer) {
            this.elements.sectionIndicatorsContainer.style.opacity = '1';
        }
        if (this.elements.readingProgress) {
            this.elements.readingProgress.container.style.opacity = '1';
        }
    }

    hideIndicators() {
        if (this.elements.sectionIndicatorsContainer) {
            this.elements.sectionIndicatorsContainer.style.opacity = '0.3';
        }
    }

    handleResize() {
        // Hide section indicators on mobile
        if (window.innerWidth <= 768) {
            if (this.elements.sectionIndicatorsContainer) {
                this.elements.sectionIndicatorsContainer.style.display = 'none';
            }
        } else {
            if (this.elements.sectionIndicatorsContainer) {
                this.elements.sectionIndicatorsContainer.style.display = 'flex';
            }
        }

        // Recalculate section positions
        setTimeout(() => {
            this.updateSectionProgress();
        }, 100);
    }

    // Public API
    goToSection(index) {
        this.scrollToSection(index);
    }

    goToNext() {
        const nextIndex = Math.min(this.currentSection + 1, this.sections.length - 1);
        this.scrollToSection(nextIndex);
    }

    goToPrevious() {
        const prevIndex = Math.max(this.currentSection - 1, 0);
        this.scrollToSection(prevIndex);
    }

    getCurrentSection() {
        return {
            index: this.currentSection,
            element: this.sections[this.currentSection],
            progress: this.scrollProgress
        };
    }

    getScrollProgress() {
        return this.scrollProgress;
    }

    addSection(element, name = '') {
        this.sections.push(element);
        element.dataset.sectionName = name;
        
        // Recreate indicators
        this.elements.sectionIndicatorsContainer.innerHTML = '';
        this.elements.sectionIndicators = [];
        this.createIndicatorsForSections();
        
        // Re-observe sections
        this.sectionObserver.observe(element);
    }

    removeSection(element) {
        const index = this.sections.indexOf(element);
        if (index > -1) {
            this.sections.splice(index, 1);
            this.sectionObserver.unobserve(element);
            
            // Recreate indicators
            this.elements.sectionIndicatorsContainer.innerHTML = '';
            this.elements.sectionIndicators = [];
            this.createIndicatorsForSections();
        }
    }

    // Keyboard navigation
    setupKeyboardNavigation() {
        document.addEventListener('keydown', (e) => {
            if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;
            
            switch (e.key) {
                case 'ArrowUp':
                case 'PageUp':
                    e.preventDefault();
                    this.goToPrevious();
                    break;
                case 'ArrowDown':
                case 'PageDown':
                    e.preventDefault();
                    this.goToNext();
                    break;
                case 'Home':
                    e.preventDefault();
                    this.scrollToSection(0);
                    break;
                case 'End':
                    e.preventDefault();
                    this.scrollToSection(this.sections.length - 1);
                    break;
            }
        });
    }

    // Enable/disable features
    enableReadingProgress() {
        this.options.readingProgress.enabled = true;
        if (!this.elements.readingProgress) {
            this.createReadingProgress();
        }
    }

    disableReadingProgress() {
        this.options.readingProgress.enabled = false;
        if (this.elements.readingProgress) {
            this.elements.readingProgress.container.remove();
            this.elements.readingProgress = null;
        }
    }

    enableSectionProgress() {
        this.options.sectionProgress.enabled = true;
        if (!this.elements.sectionIndicatorsContainer) {
            this.createSectionIndicators();
            this.createIndicatorsForSections();
        }
    }

    disableSectionProgress() {
        this.options.sectionProgress.enabled = false;
        if (this.elements.sectionIndicatorsContainer) {
            this.elements.sectionIndicatorsContainer.remove();
            this.elements.sectionIndicatorsContainer = null;
            this.elements.sectionIndicators = [];
        }
    }

    // Cleanup
    destroy() {
        // Remove DOM elements
        if (this.elements.readingProgress) {
            this.elements.readingProgress.container.remove();
        }
        if (this.elements.sectionIndicatorsContainer) {
            this.elements.sectionIndicatorsContainer.remove();
        }
        
        // Remove circular progress indicators
        this.elements.circularProgress.forEach(progress => {
            progress.element.remove();
        });

        // Disconnect observers
        if (this.sectionObserver) {
            this.sectionObserver.disconnect();
        }

        // Clear references
        this.elements = {
            readingProgress: null,
            sectionIndicators: [],
            circularProgress: []
        };
        this.sections = [];

        console.log('🧹 Progress Indicators destroyed');
    }
}

export default ProgressIndicators;