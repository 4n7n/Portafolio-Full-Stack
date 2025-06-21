/**
 * Portfolio App - Anthony Bonilla Paredes
 * Optimizado para máximo rendimiento y mantenibilidad
 * Stack: MERN | Bootcamp: The Bridge (480h)
 */

// ===== CONFIGURACIÓN INICIAL =====
const APP_CONFIG = {
    VERSION: '2.0.0',
    DEBUG: false,
    ANIMATION_DURATION: 1500,
    INTERSECTION_THRESHOLD: 0.1
};

// ===== GESTIÓN DE DEPENDENCIAS MEJORADA =====
class DependencyManager {
    constructor() {
        this.modules = new Map();
        this.loadPromises = new Map();
    }

    async loadModule(path, fallback = null) {
        if (this.modules.has(path)) {
            return this.modules.get(path);
        }

        if (this.loadPromises.has(path)) {
            return this.loadPromises.get(path);
        }

        const loadPromise = this.importWithFallback(path, fallback);
        this.loadPromises.set(path, loadPromise);
        
        const module = await loadPromise;
        this.modules.set(path, module);
        return module;
    }

    async importWithFallback(path, fallback) {
        try {
            const module = await import(path);
            console.log(`✅ ${path} cargado correctamente`);
            return module;
        } catch (error) {
            console.log(`📝 ${path} no disponible, usando fallback`);
            return fallback;
        }
    }
}

// ===== DATOS DE CONFIGURACIÓN =====
const DEFAULT_CONFIG = {
    personal: {
        name: "Anthony Bonilla Paredes",
        title: "Desarrollador Web Full Stack",
        email: "anthonybonillaparedes7@gmail.com",
        phone: "+34 624 42 56 67"
    },
    seo: {
        description: "Anthony Bonilla Paredes - Desarrollador Full Stack especializado en MERN Stack. Graduado de The Bridge con 480h de formación intensiva."
    },
    bootcamp: {
        school: "The Bridge Digital Talent Accelerator",
        duration: "480 horas",
        stack: "MERN",
        graduation: "07 de Febrero de 2025",
        employability: "96%"
    }
};

// ===== TEMPLATES OPTIMIZADOS =====
const TEMPLATES = {
    skillCard: (skill) => `
        <div class="skill-card" data-level="${skill.level}" data-animate="fadeInUp">
            <div class="skill-icon" style="background: ${skill.color}20;">
                <div style="width: 20px; height: 20px; background: ${skill.color}; border-radius: 50%;"></div>
            </div>
            <h5 class="skill-name">${skill.name}</h5>
            <div class="skill-progress-circle">
                <svg width="60" height="60">
                    <circle cx="30" cy="30" r="25" stroke="#e0e0e0" stroke-width="4" fill="transparent"/>
                    <circle cx="30" cy="30" r="25" stroke="${skill.color}" stroke-width="4" fill="transparent"
                            stroke-dasharray="157" stroke-dashoffset="${157 - (skill.percentage / 100) * 157}" 
                            class="progress-stroke" style="transition: stroke-dashoffset 1.5s ease-out"/>
                </svg>
                <span class="skill-percentage">${skill.percentage}%</span>
            </div>
            <span class="skill-experience">${skill.experience}</span>
        </div>
    `,

    skillsChartFallback: (skills, stats) => `
        <div class="skills-chart-fallback" data-animate="fadeIn">
            <div class="chart-header">
                <h3>🎓 Stack MERN - The Bridge Bootcamp</h3>
                <p>480 horas de formación intensiva</p>
            </div>
            
            <div class="skills-grid">
                ${skills.map(skill => TEMPLATES.skillCard(skill)).join('')}
            </div>
            
            <div class="chart-stats">
                ${stats.map(stat => `
                    <div class="stat-item">
                        <span class="stat-number" data-count="${stat.value}">${stat.display}</span>
                        <span class="stat-label">${stat.label}</span>
                    </div>
                `).join('')}
            </div>
        </div>
    `
};

// ===== DATOS DE SKILLS =====
const FALLBACK_SKILLS = [
    { name: 'JavaScript ES6+', percentage: 88, experience: '6 meses', color: '#F7DF1E', level: 'advanced' },
    { name: 'React', percentage: 85, experience: '5 meses', color: '#61DAFB', level: 'advanced' },
    { name: 'Node.js', percentage: 82, experience: '5 meses', color: '#339933', level: 'advanced' },
    { name: 'MongoDB', percentage: 78, experience: '4 meses', color: '#47A248', level: 'intermediate' }
];

const FALLBACK_STATS = [
    { value: 480, display: '480', label: 'Horas Bootcamp' },
    { value: 25, display: '25+', label: 'Tecnologías' },
    { value: 96, display: '96%', label: 'Empleabilidad' },
    { value: 0, display: 'MERN', label: 'Stack' }
];

/**
 * Clase principal del Portfolio - Optimizada
 */
class PortfolioApp {
    constructor() {
        this.components = new Map();
        this.observers = new Map();
        this.animations = new Map();
        this.isInitialized = false;
        this.dependencyManager = new DependencyManager();
        this.config = DEFAULT_CONFIG;
        
        this.init().catch(this.handleFatalError.bind(this));
    }

    async init() {
        console.log('🚀 Inicializando Portfolio de Anthony Bonilla Paredes...');
        
        try {
            // 1. Cargar configuración
            await this.loadConfiguration();
            
            // 2. Esperar DOM y configurar básicos
            await this.waitForDOM();
            this.updatePersonalInfo();
            
            // 3. Inicializar sistema de observadores unificado
            this.initializeObserverSystem();
            
            // 4. Cargar componentes de forma lazy
            await this.initializeComponents();
            
            // 5. Configurar eventos y animaciones
            this.setupGlobalEvents();
            this.initializeAnimations();
            
            this.isInitialized = true;
            console.log('✅ Portfolio inicializado correctamente');
            
            // Post-inicialización
            this.schedulePostInit();
            
        } catch (error) {
            this.handleFatalError(error);
        }
    }

    async loadConfiguration() {
        const configModule = await this.dependencyManager.loadModule(
            './config/portfolio-config.js', 
            { PORTFOLIO_CONFIG: DEFAULT_CONFIG }
        );
        
        this.config = configModule?.PORTFOLIO_CONFIG || DEFAULT_CONFIG;
        console.log('⚙️ Configuración cargada');
    }

    waitForDOM() {
        return new Promise(resolve => {
            if (document.readyState === 'loading') {
                document.addEventListener('DOMContentLoaded', resolve, { once: true });
            } else {
                resolve();
            }
        });
    }

    updatePersonalInfo() {
        const { personal, seo } = this.config;
        
        // Batch DOM updates para mejor performance
        document.title = `${personal.name} - ${personal.title}`;
        
        const metaDesc = document.querySelector('meta[name="description"]');
        if (metaDesc && seo) metaDesc.content = seo.description;

        // Actualizar elementos con mejor selección
        const updates = [
            { selector: '.hero-name', content: personal.name.toUpperCase() },
            { selector: '[data-email], .font-code', content: personal.email, isEmail: true },
            { selector: '.font-code', content: personal.phone, isPhone: true }
        ];

        updates.forEach(({ selector, content, isEmail, isPhone }) => {
            document.querySelectorAll(selector).forEach(el => {
                if (isEmail && (el.textContent.includes('@') || el.textContent.includes('email'))) {
                    el.textContent = content;
                    const link = el.tagName === 'A' ? el : el.closest('a');
                    if (link) link.href = `mailto:${content}`;
                } else if (isPhone && (el.textContent.includes('+34') || el.textContent.includes('624'))) {
                    el.textContent = content;
                } else if (!isEmail && !isPhone) {
                    el.textContent = content;
                }
            });
        });

        console.log('✅ Información personal actualizada');
    }

    /**
     * Sistema de observadores unificado - GRAN MEJORA
     */
    initializeObserverSystem() {
        // Observer principal para animaciones
        const animationObserver = new IntersectionObserver(
            (entries) => this.handleAnimationIntersection(entries),
            { threshold: APP_CONFIG.INTERSECTION_THRESHOLD, rootMargin: '0px 0px -50px 0px' }
        );

        // Observer para contadores
        const counterObserver = new IntersectionObserver(
            (entries) => this.handleCounterIntersection(entries),
            { threshold: 0.5, rootMargin: '0px 0px -100px 0px' }
        );

        this.observers.set('animation', animationObserver);
        this.observers.set('counter', counterObserver);

        console.log('👁️ Sistema de observadores inicializado');
    }

    handleAnimationIntersection(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const element = entry.target;
                const animationType = element.dataset.animate || 'fadeInUp';
                
                this.playAnimation(element, animationType);
                this.observers.get('animation').unobserve(element);
            }
        });
    }

    handleCounterIntersection(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const counter = entry.target;
                const target = parseInt(counter.getAttribute('data-count')) || 0;
                
                if (target > 0) {
                    this.animateCounter(counter, 0, target);
                }
                this.observers.get('counter').unobserve(counter);
            }
        });
    }

    async initializeComponents() {
        console.log('🧩 Inicializando componentes...');

        const componentTasks = [
            this.initializeSkillsChart(),
            this.initializeContactForm(),
            this.initializeScrollAnimations()
        ];

        // Ejecutar en paralelo para mejor performance
        await Promise.allSettled(componentTasks);
        console.log('✅ Componentes inicializados');
    }

    async initializeSkillsChart() {
        const skillsContainer = this.findSkillsContainer();
        if (!skillsContainer) {
            console.log('📝 Contenedor de skills no encontrado');
            return;
        }

        try {
            const skillsModule = await this.dependencyManager.loadModule('./components/skills-chart.js');
            
            if (skillsModule?.SkillsChart) {
                this.components.set('skillsChart', new skillsModule.SkillsChart('#skillsChart'));
                console.log('✅ SkillsChart inicializado');
            } else {
                this.createOptimizedSkillsFallback(skillsContainer);
            }
        } catch (error) {
            console.warn('⚠️ Error en SkillsChart:', error.message);
            this.createOptimizedSkillsFallback(skillsContainer);
        }
    }

    findSkillsContainer() {
        const selectors = [
            '#skillsChart',
            '.skills-chart-wrapper canvas',
            '#skills canvas',
            '.skills-chart-wrapper',
            '#skills .skills-container > div:last-child'
        ];

        return selectors.map(sel => document.querySelector(sel)).find(el => el);
    }

    createOptimizedSkillsFallback(container) {
        // Usar template optimizado
        container.innerHTML = TEMPLATES.skillsChartFallback(FALLBACK_SKILLS, FALLBACK_STATS);

        // Registrar elementos para animación
        container.querySelectorAll('[data-animate]').forEach(el => {
            this.observers.get('animation').observe(el);
        });

        // Registrar contadores
        container.querySelectorAll('[data-count]').forEach(el => {
            this.observers.get('counter').observe(el);
        });

        console.log('📊 Fallback optimizado de Skills creado');
    }

    async initializeContactForm() {
        const contactForm = document.querySelector('#contactForm');
        if (!contactForm) return;

        try {
            const formModule = await this.dependencyManager.loadModule('./components/contact-form.js');
            
            if (formModule?.ContactForm) {
                this.components.set('contactForm', new formModule.ContactForm('#contactForm'));
                console.log('✅ ContactForm inicializado');
            } else {
                this.setupOptimizedContactForm(contactForm);
            }
        } catch (error) {
            this.setupOptimizedContactForm(contactForm);
        }
    }

    setupOptimizedContactForm(form) {
        // Optimización: usar delegación de eventos
        form.addEventListener('submit', this.handleFormSubmit.bind(this), { passive: false });
        
        // Validación en tiempo real
        form.addEventListener('input', this.handleFormInput.bind(this), { passive: true });
    }

    handleFormSubmit(e) {
        e.preventDefault();
        
        const formData = new FormData(e.target);
        const data = Object.fromEntries(formData);
        
        if (!this.validateFormData(data)) return;
        
        this.submitForm(e.target, data);
    }

    handleFormInput(e) {
        const field = e.target;
        if (field.type === 'email') {
            field.setCustomValidity(
                field.validity.typeMismatch ? 'Por favor ingresa un email válido' : ''
            );
        }
    }

    validateFormData({ name, email, message }) {
        if (!name?.trim() || !email?.trim() || !message?.trim()) {
            this.showFormMessage('Por favor, completa todos los campos obligatorios.', 'error');
            return false;
        }
        return true;
    }

    async submitForm(form, data) {
        const submitBtn = form.querySelector('button[type="submit"]');
        const originalText = submitBtn.textContent;
        
        submitBtn.textContent = 'Enviando...';
        submitBtn.disabled = true;
        
        // Simular envío con promesa
        await new Promise(resolve => setTimeout(resolve, 2000));
        
        this.showFormMessage('¡Mensaje enviado! Te contactaré pronto.', 'success');
        form.reset();
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
    }

    showFormMessage(message, type) {
        // Mejorar UX con mejor feedback
        const existingMessage = document.querySelector('.form-message');
        if (existingMessage) existingMessage.remove();

        const messageEl = document.createElement('div');
        messageEl.className = `form-message form-message--${type}`;
        messageEl.textContent = message;
        messageEl.style.cssText = `
            padding: 1rem; margin: 1rem 0; border-radius: 8px; text-align: center;
            background: ${type === 'success' ? '#10b981' : '#ef4444'}20;
            color: ${type === 'success' ? '#10b981' : '#ef4444'};
            border: 1px solid ${type === 'success' ? '#10b981' : '#ef4444'}40;
        `;

        const form = document.querySelector('#contactForm');
        form.appendChild(messageEl);
        
        setTimeout(() => messageEl.remove(), 5000);
    }

    async initializeScrollAnimations() {
        try {
            const scrollModule = await this.dependencyManager.loadModule('./components/scroll-animations.js');
            
            if (scrollModule?.ScrollAnimations) {
                this.components.set('scrollAnimations', new scrollModule.ScrollAnimations());
                console.log('✅ ScrollAnimations inicializado');
            } else {
                this.setupOptimizedAnimations();
            }
        } catch (error) {
            this.setupOptimizedAnimations();
        }
    }

    setupOptimizedAnimations() {
        // Registrar elementos para animación usando el sistema unificado
        const elementsToAnimate = document.querySelectorAll(
            '.section-title, .section-subtitle, .project-card, .skill-item, .timeline-item'
        );

        elementsToAnimate.forEach(el => {
            el.dataset.animate = 'fadeInUp';
            el.style.cssText = 'opacity: 0; transform: translateY(30px); transition: all 0.6s ease-out;';
            this.observers.get('animation').observe(el);
        });

        console.log('✅ Animaciones optimizadas configuradas');
    }

    /**
     * Sistema de animaciones mejorado
     */
    playAnimation(element, type) {
        const animations = {
            fadeInUp: () => {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            },
            fadeIn: () => {
                element.style.opacity = '1';
            },
            slideInLeft: () => {
                element.style.opacity = '1';
                element.style.transform = 'translateX(0)';
            }
        };

        if (animations[type]) {
            requestAnimationFrame(() => animations[type]());
        }
    }

    setupGlobalEvents() {
        // Navegación suave optimizada
        document.addEventListener('click', this.handleGlobalClick.bind(this), true);
        
        // Progress bar de scroll
        this.setupScrollProgress();
        
        // Registro de contadores existentes
        document.querySelectorAll('[data-count]').forEach(counter => {
            this.observers.get('counter').observe(counter);
        });

        console.log('✅ Eventos globales optimizados');
    }

    handleGlobalClick(e) {
        const link = e.target.closest('a[href^="#"]');
        if (!link) return;
        
        e.preventDefault();
        const target = document.querySelector(link.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    }

    setupScrollProgress() {
        const progressBar = document.querySelector('.scroll-progress');
        if (!progressBar) return;

        let ticking = false;
        
        const updateProgress = () => {
            const windowHeight = document.documentElement.scrollHeight - window.innerHeight;
            const scrolled = window.scrollY;
            const progress = Math.min((scrolled / windowHeight) * 100, 100);
            
            progressBar.style.width = `${progress}%`;
            ticking = false;
        };

        window.addEventListener('scroll', () => {
            if (!ticking) {
                requestAnimationFrame(updateProgress);
                ticking = true;
            }
        }, { passive: true });
    }

    initializeAnimations() {
        // El sistema unificado ya maneja esto
        console.log('✅ Sistema de animaciones inicializado');
    }

    /**
     * Animación de contadores optimizada
     */
    animateCounter(element, start, end, duration = APP_CONFIG.ANIMATION_DURATION) {
        const startTime = performance.now();
        const suffix = element.textContent.includes('+') ? '+' : '';
        
        const updateCounter = (currentTime) => {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            
            // Easing function mejorada
            const easeOutCubic = 1 - Math.pow(1 - progress, 3);
            const current = Math.floor(start + (end - start) * easeOutCubic);
            
            element.textContent = current + suffix;
            
            if (progress < 1) {
                requestAnimationFrame(updateCounter);
            }
        };
        
        requestAnimationFrame(updateCounter);
    }

    schedulePostInit() {
        // Tareas post-inicialización
        setTimeout(() => {
            this.updateBootcampInfo();
            this.preloadCriticalResources();
        }, 1000);
    }

    updateBootcampInfo() {
        // Optimización: usar Map para mejor performance
        const updates = new Map([
            ['20', '25'],
            ['480', '480'],
            ['96', '96']
        ]);

        document.querySelectorAll('[data-count]').forEach(stat => {
            const currentValue = stat.getAttribute('data-count');
            if (updates.has(currentValue)) {
                const newValue = updates.get(currentValue);
                stat.setAttribute('data-count', newValue);
                if (newValue === '25') {
                    stat.textContent = '25+';
                }
            }
        });

        console.log('✅ Información del bootcamp actualizada');
    }

    preloadCriticalResources() {
        // Precargar recursos críticos para mejor UX
        const criticalImages = document.querySelectorAll('img[data-src]');
        if (criticalImages.length > 0) {
            const imageObserver = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const img = entry.target;
                        img.src = img.dataset.src;
                        img.removeAttribute('data-src');
                        imageObserver.unobserve(img);
                    }
                });
            });

            criticalImages.forEach(img => imageObserver.observe(img));
        }
    }

    handleFatalError(error) {
        console.error('❌ Error fatal:', error);
        
        // Error handling elegante manteniendo el diseño
        const errorContent = `
            <div class="error-container" style="
                display: flex; align-items: center; justify-content: center; min-height: 100vh;
                background: linear-gradient(135deg, #0a0a0a, #1a1a1a); color: white; text-align: center;
            ">
                <div class="error-content" style="
                    background: linear-gradient(135deg, #1a1a1a, #0a0a0a); padding: 3rem; border-radius: 20px;
                    box-shadow: 0 15px 35px rgba(0, 0, 0, 0.5); border: 1px solid rgba(220, 38, 38, 0.3);
                ">
                    <h1 style="color: #dc2626; margin-bottom: 1rem;">⚠️ Error de Carga</h1>
                    <p style="margin-bottom: 2rem; color: #e5e5e5;">
                        Portfolio de Anthony Bonilla temporalmente no disponible
                    </p>
                    <button onclick="location.reload()" style="
                        background: linear-gradient(135deg, #dc2626, #ef4444); color: white; border: none;
                        padding: 1rem 2rem; border-radius: 12px; cursor: pointer; font-weight: 600;
                        transition: all 0.3s ease; box-shadow: 0 4px 15px rgba(220, 38, 38, 0.3);
                    ">🔄 Recargar Portfolio</button>
                </div>
            </div>
        `;
        
        document.body.innerHTML = errorContent;
    }

    // ===== API PÚBLICA =====
    getComponent(name) {
        return this.components.get(name) || null;
    }

    isReady() {
        return this.isInitialized;
    }

    getStats() {
        return {
            components: this.components.size,
            observers: this.observers.size,
            config: this.config,
            version: APP_CONFIG.VERSION
        };
    }

    // Método para debugging
    debug() {
        if (APP_CONFIG.DEBUG) {
            console.table(this.getStats());
        }
    }
}

/**
 * Función de inicialización optimizada
 */
async function initPortfolioApp() {
    try {
        console.time('Portfolio Init');
        
        const app = new PortfolioApp();
        
        // Hacer disponible globalmente para debugging
        window.portfolioApp = app;
        window.portfolioDebug = () => app.debug();
        
        console.timeEnd('Portfolio Init');
        return app;
        
    } catch (error) {
        console.error('❌ Error fatal en inicialización:', error);
        return null;
    }
}

// ===== INICIALIZACIÓN =====
const portfolioApp = await initPortfolioApp();

// ===== LOGGING OPTIMIZADO =====
console.group('🎯 Portfolio Anthony Bonilla Paredes');
console.log('📚 Bootcamp: The Bridge Digital Talent Accelerator');
console.log('💻 Stack: MERN (MongoDB, Express, React, Node.js)');
console.log('⏱️ Duración: 480 horas');
console.log('🎓 Graduado: 07 de Febrero de 2025');
console.log('🚀 Versión optimizada 2.0');
console.log('⚡ Performance: Lazy loading + Observer unificado');
console.groupEnd();

// ===== EXPORTACIÓN =====
export default portfolioApp;
export { PortfolioApp, DependencyManager, TEMPLATES };