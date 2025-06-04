// Import configurations
import PortfolioConfig from './config/portfolio-config.js';
import ScrollConfig from './config/scroll-config.js';

// Import existing components
import ThemeSwitcher from './components/theme-switcher.js';
import HeroBanner from './components/hero-banner.js';
import TypingEffect from './components/typing-effect.js';
import SkillsChart from './components/skills-chart.js';
import ProjectGallery from './components/project-gallery.js';
import ProjectFilter from './components/project-filter.js';
import ContactForm from './components/contact-form.js';

// Import Feature 8: Advanced Scroll Animations
import AdvancedScrollManager from './components/advanced-scroll-manager.js';
import ParallaxEngine from './components/parallax-engine.js';
import RevealAnimations from './components/reveal-animations.js';
import TextEffectsEngine from './components/text-effects-engine.js';
import ProgressIndicators from './components/progress-indicators.js';

// Import utilities
import DOMHelpers from './utils/dom-helpers.js';
import LazyLoading from './utils/lazy-loading.js';
import FormValidator from './utils/form-validator.js';
import Notifications from './utils/notifications.js';

class PortfolioApp {
    constructor() {
        this.config = PortfolioConfig;
        this.scrollConfig = ScrollConfig;
        this.components = new Map();
        this.isInitialized = false;
        this.performanceMetrics = {
            startTime: performance.now(),
            componentsLoaded: 0,
            totalComponents: 0
        };

        this.init();
    }

    async init() {
        try {
            console.log('🚀 Initializing Portfolio App...');
            
            // Detect device capabilities and set performance mode
            this.detectCapabilities();
            
            // Load critical components first
            await this.loadCriticalComponents();
            
            // Initialize scroll animations system (Feature 8)
            await this.initializeScrollAnimations();
            
            // Load remaining components
            await this.loadSecondaryComponents();
            
            // Bind global events
            this.bindGlobalEvents();
            
            // Initialize performance monitoring
            this.initializePerformanceMonitoring();
            
            this.isInitialized = true;
            
            const loadTime = performance.now() - this.performanceMetrics.startTime;
            console.log(`✅ Portfolio App initialized in ${loadTime.toFixed(2)}ms`);
            
            // Dispatch ready event
            window.dispatchEvent(new CustomEvent('portfolioReady', {
                detail: { loadTime, components: this.components.size }
            }));
            
        } catch (error) {
            console.error('❌ Error initializing Portfolio App:', error);
            this.handleInitializationError(error);
        }
    }

    detectCapabilities() {
        const capabilities = {
            mobile: /iPhone|iPad|iPod|Android/i.test(navigator.userAgent),
            touchDevice: 'ontouchstart' in window,
            reducedMotion: window.matchMedia('(prefers-reduced-motion: reduce)').matches,
            gpu: this.detectGPU(),
            connection: this.detectConnection(),
            memory: navigator.deviceMemory || 4,
            cores: navigator.hardwareConcurrency || 4
        };

        // Auto-adjust scroll config based on capabilities
        if (capabilities.reducedMotion) {
            this.scrollConfig.currentPreset = 'minimal';
            this.scrollConfig.currentPerformance = 'minimal';
        } else if (capabilities.mobile || capabilities.memory < 4) {
            this.scrollConfig.currentPerformance = 'medium';
        } else if (capabilities.gpu && capabilities.cores >= 4) {
            this.scrollConfig.currentPerformance = 'high';
        }

        this.deviceCapabilities = capabilities;
        console.log('📱 Device capabilities detected:', capabilities);
    }

    detectGPU() {
        try {
            const canvas = document.createElement('canvas');
            const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
            return !!gl;
        } catch (e) {
            return false;
        }
    }

    detectConnection() {
        if ('connection' in navigator) {
            const conn = navigator.connection;
            return {
                effectiveType: conn.effectiveType,
                downlink: conn.downlink,
                saveData: conn.saveData
            };
        }
        return { effectiveType: '4g', downlink: 10, saveData: false };
    }

    async loadCriticalComponents() {
        console.log('⚡ Loading critical components...');
        
        try {
            // Load HTML components first
            await this.loadHTMLComponents();
            
            // Initialize theme system
            const themeSwitcher = new ThemeSwitcher(this.config.theme);
            this.components.set('themeSwitcher', themeSwitcher);
            
            // Initialize DOM helpers
            const domHelpers = new DOMHelpers();
            this.components.set('domHelpers', domHelpers);
            
            // Initialize notifications
            const notifications = new Notifications();
            this.components.set('notifications', notifications);
            
            this.performanceMetrics.componentsLoaded += 3;
            console.log('✅ Critical components loaded');
            
        } catch (error) {
            console.error('❌ Error loading critical components:', error);
            throw error;
        }
    }

    async initializeScrollAnimations() {
        console.log('🎬 Initializing Advanced Scroll Animations...');
        
        try {
            // Get optimal settings based on device
            const scrollSettings = this.scrollConfig.getOptimalSettings();
            
            // Initialize core scroll manager
            const scrollManager = new AdvancedScrollManager({
                ...scrollSettings,
                threshold: 0.1,
                rootMargin: '0px 0px -50px 0px'
            });
            this.components.set('scrollManager', scrollManager);
            
            // Initialize parallax engine if enabled
            if (scrollSettings.parallaxEnabled && !scrollSettings.mobile) {
                const parallaxEngine = new ParallaxEngine({
                    mouseEnabled: scrollSettings.desktop,
                    performance: scrollSettings.performanceMode
                });
                this.components.set('parallaxEngine', parallaxEngine);
            }
            
            // Initialize reveal animations
            if (scrollSettings.revealEnabled) {
                const revealAnimations = new RevealAnimations({
                    threshold: 0.1,
                    staggerDelay: scrollSettings.mobile ? 50 : 100,
                    defaultDuration: scrollSettings.mobile ? 400 : 600
                });
                this.components.set('revealAnimations', revealAnimations);
            }
            
            // Initialize text effects
            if (scrollSettings.textEffectsEnabled) {
                const textEffects = new TextEffectsEngine({
                    typewriterSpeed: scrollSettings.mobile ? 80 : 50,
                    scrambleSpeed: scrollSettings.mobile ? 50 : 30
                });
                this.components.set('textEffects', textEffects);
            }
            
            // Initialize progress indicators
            const progressIndicators = new ProgressIndicators({
                readingProgress: {
                    enabled: true,
                    position: 'top',
                    height: scrollSettings.mobile ? 3 : 4
                },
                sectionProgress: {
                    enabled: !scrollSettings.mobile,
                    position: 'right'
                },
                smoothScroll: {
                    enabled: true,
                    duration: scrollSettings.mobile ? 800 : 1000
                }
            });
            this.components.set('progressIndicators', progressIndicators);
            
            // Setup keyboard navigation for progress indicators
            if (!scrollSettings.mobile) {
                progressIndicators.setupKeyboardNavigation();
            }
            
            this.performanceMetrics.componentsLoaded += scrollSettings.parallaxEnabled ? 5 : 4;
            console.log('✅ Advanced Scroll Animations initialized');
            
        } catch (error) {
            console.error('❌ Error initializing scroll animations:', error);
            // Continue with basic functionality if scroll animations fail
            console.warn('⚠️ Continuing with basic scroll functionality');
        }
    }

    async loadSecondaryComponents() {
        console.log('🔧 Loading secondary components...');
        
        try {
            const componentsToLoad = [];
            
            // Hero section components
            if (document.querySelector('#hero')) {
                componentsToLoad.push(this.initializeHeroComponents());
            }
            
            // Skills section
            if (document.querySelector('#skills')) {
                componentsToLoad.push(this.initializeSkillsComponents());
            }
            
            // Projects section
            if (document.querySelector('#projects')) {
                componentsToLoad.push(this.initializeProjectsComponents());
            }
            
            // Contact section
            if (document.querySelector('#contact')) {
                componentsToLoad.push(this.initializeContactComponents());
            }
            
            // Initialize lazy loading
            componentsToLoad.push(this.initializeLazyLoading());
            
            // Load all components in parallel
            await Promise.all(componentsToLoad);
            
            console.log('✅ Secondary components loaded');
            
        } catch (error) {
            console.error('❌ Error loading secondary components:', error);
        }
    }

    async initializeHeroComponents() {
        try {
            // Initialize hero banner
            const heroBanner = new HeroBanner(this.config.hero);
            this.components.set('heroBanner', heroBanner);
            
            // Initialize typing effect for hero
            const typingElement = document.querySelector('.typing-text');
            if (typingElement) {
                const typingEffect = new TypingEffect(typingElement, {
                    strings: this.config.hero.typingStrings || [
                        'Full-Stack Developer',
                        'React Specialist',
                        'Node.js Developer',
                        'UI/UX Enthusiast'
                    ],
                    typeSpeed: 80,
                    backSpeed: 40,
                    loop: true
                });
                this.components.set('typingEffect', typingEffect);
            }
            
            this.performanceMetrics.componentsLoaded += 2;
            
        } catch (error) {
            console.error('❌ Error initializing hero components:', error);
        }
    }

    async initializeSkillsComponents() {
        try {
            const skillsChart = new SkillsChart(this.config.skills);
            this.components.set('skillsChart', skillsChart);
            
            this.performanceMetrics.componentsLoaded += 1;
            
        } catch (error) {
            console.error('❌ Error initializing skills components:', error);
        }
    }

    async initializeProjectsComponents() {
        try {
            const projectGallery = new ProjectGallery(this.config.projects);
            const projectFilter = new ProjectFilter();
            
            this.components.set('projectGallery', projectGallery);
            this.components.set('projectFilter', projectFilter);
            
            this.performanceMetrics.componentsLoaded += 2;
            
        } catch (error) {
            console.error('❌ Error initializing projects components:', error);
        }
    }

    async initializeContactComponents() {
        try {
            const formValidator = new FormValidator();
            const contactForm = new ContactForm(this.config.contact, formValidator);
            
            this.components.set('formValidator', formValidator);
            this.components.set('contactForm', contactForm);
            
            this.performanceMetrics.componentsLoaded += 2;
            
        } catch (error) {
            console.error('❌ Error initializing contact components:', error);
        }
    }

    async initializeLazyLoading() {
        try {
            const lazyLoading = new LazyLoading({
                threshold: 0.1,
                rootMargin: '50px'
            });
            this.components.set('lazyLoading', lazyLoading);
            
            this.performanceMetrics.componentsLoaded += 1;
            
        } catch (error) {
            console.error('❌ Error initializing lazy loading:', error);
        }
    }

    async loadHTMLComponents() {
        const domHelpers = this.components.get('domHelpers') || new DOMHelpers();
        
        try {
            // Load navbar
            await domHelpers.loadComponent('navbar', './components/navbar.html');
            
            // Load footer
            await domHelpers.loadComponent('footer', './components/footer.html');
            
            console.log('✅ HTML components loaded');
            
        } catch (error) {
            console.error('❌ Error loading HTML components:', error);
        }
    }

    bindGlobalEvents() {
        // Handle reduced motion preference changes
        const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
        mediaQuery.addListener((e) => {
            if (e.matches) {
                this.disableAnimations();
            } else {
                this.enableAnimations();
            }
        });

        // Handle visibility change (tab switching)
        document.addEventListener('visibilitychange', () => {
            if (document.hidden) {
                this.pauseAnimations();
            } else {
                this.resumeAnimations();
            }
        });

        // Handle page unload
        window.addEventListener('beforeunload', () => {
            this.cleanup();
        });

        // Handle resize with debouncing
        let resizeTimeout;
        window.addEventListener('resize', () => {
            clearTimeout(resizeTimeout);
            resizeTimeout = setTimeout(() => {
                this.handleResize();
            }, 250);
        });

        // Global error handler
        window.addEventListener('error', (event) => {
            console.error('Global error:', event.error);
            this.handleError(event.error);
        });

        // Handle theme changes
        window.addEventListener('themeChange', (event) => {
            this.handleThemeChange(event.detail);
        });

        console.log('✅ Global events bound');
    }

    initializePerformanceMonitoring() {
        if ('PerformanceObserver' in window) {
            // Monitor Largest Contentful Paint
            const lcpObserver = new PerformanceObserver((list) => {
                const entries = list.getEntries();
                const lastEntry = entries[entries.length - 1];
                console.log('📊 LCP:', lastEntry.startTime.toFixed(2), 'ms');
            });
            lcpObserver.observe({ entryTypes: ['largest-contentful-paint'] });

            // Monitor First Input Delay
            const fidObserver = new PerformanceObserver((list) => {
                const entries = list.getEntries();
                entries.forEach(entry => {
                    console.log('📊 FID:', entry.processingStart - entry.startTime, 'ms');
                });
            });
            fidObserver.observe({ entryTypes: ['first-input'] });

            // Monitor Cumulative Layout Shift
            const clsObserver = new PerformanceObserver((list) => {
                let cls = 0;
                list.getEntries().forEach(entry => {
                    if (!entry.hadRecentInput) {
                        cls += entry.value;
                    }
                });
                console.log('📊 CLS:', cls.toFixed(4));
            });
            clsObserver.observe({ entryTypes: ['layout-shift'] });
        }
    }

    // Event handlers
    handleResize() {
        this.components.forEach(component => {
            if (component.onResize) {
                component.onResize();
            }
        });
    }

    handleThemeChange(themeData) {
        // Update scroll animations colors if needed
        const scrollManager = this.components.get('scrollManager');
        if (scrollManager && scrollManager.updateTheme) {
            scrollManager.updateTheme(themeData);
        }
    }

    handleError(error) {
        const notifications = this.components.get('notifications');
        if (notifications) {
            notifications.show('Ha ocurrido un error. Por favor, recarga la página.', 'error');
        }
    }

    handleInitializationError(error) {
        console.error('Critical initialization error:', error);
        
        // Show fallback content
        document.body.innerHTML = `
            <div style="
                display: flex; 
                align-items: center; 
                justify-content: center; 
                min-height: 100vh; 
                font-family: system-ui; 
                text-align: center;
                padding: 2rem;
            ">
                <div>
                    <h1>Oops! Something went wrong</h1>
                    <p>Please refresh the page or try again later.</p>
                    <button onclick="window.location.reload()" style="
                        padding: 12px 24px; 
                        background: #2563eb; 
                        color: white; 
                        border: none; 
                        border-radius: 8px; 
                        cursor: pointer;
                        margin-top: 1rem;
                    ">
                        Refresh Page
                    </button>
                </div>
            </div>
        `;
    }

    // Control methods
    disableAnimations() {
        this.components.forEach(component => {
            if (component.disableAnimations) {
                component.disableAnimations();
            }
        });
        document.body.classList.add('reduced-motion');
    }

    enableAnimations() {
        this.components.forEach(component => {
            if (component.enableAnimations) {
                component.enableAnimations();
            }
        });
        document.body.classList.remove('reduced-motion');
    }

    pauseAnimations() {
        this.components.forEach(component => {
            if (component.pause) {
                component.pause();
            }
        });
    }

    resumeAnimations() {
        this.components.forEach(component => {
            if (component.resume) {
                component.resume();
            }
        });
    }

    // Public API
    getComponent(name) {
        return this.components.get(name);
    }

    addComponent(name, component) {
        this.components.set(name, component);
    }

    removeComponent(name) {
        const component = this.components.get(name);
        if (component && component.destroy) {
            component.destroy();
        }
        this.components.delete(name);
    }

    // Cleanup
    cleanup() {
        console.log('🧹 Cleaning up Portfolio App...');
        
        this.components.forEach((component, name) => {
            if (component.destroy) {
                component.destroy();
            }
        });
        
        this.components.clear();
    }
}

// Initialize app when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        window.portfolioApp = new PortfolioApp();
    });
} else {
    window.portfolioApp = new PortfolioApp();
}

export default PortfolioApp;