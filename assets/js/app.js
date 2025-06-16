// ===== IMPORTACIONES DE CONFIGURACIÓN =====
import { NAVIGATION_CONFIG } from './config/navigation-config.js';
import { PORTFOLIO_CONFIG } from './config/portfolio-config.js';

// ===== IMPORTACIONES DE DATOS =====
import { EXPERIENCE_DATA } from './data/experience.js';
import { PROJECTS_DATA } from './data/projects.js';
import { SKILLS_DATA } from './data/skills.js';
import { TESTIMONIALS_DATA } from './data/testimonials.js';

// ===== IMPORTACIONES DE UTILIDADES =====
import { DOMHelpers } from './utils/dom-helpers.js';
import { FormValidator, ValidationRules, initContactFormValidator } from './utils/form-validator.js';
import { NotificationSystem } from './utils/notifications.js';

// ===== IMPORTACIONES DE SERVICIOS =====
import { EmailService } from './services/email-service.js';
import { GitHubAPI } from './services/github-api.js';

// ===== IMPORTACIONES DE COMPONENTES PRINCIPALES =====
import { ThemeSwitcher } from './components/theme-switcher.js';

// ===== IMPORTACIONES DE COMPONENTES DE CONTENIDO =====
import { SkillsChart } from './components/skills-chart.js';
import { ExperienceTimeline } from './components/experience-timeline.js';
import { ContactForm } from './components/contact-form.js';

// ===== IMPORTACIONES DE EFECTOS Y ANIMACIONES =====
import { ScrollAnimations } from './components/scroll-animations.js';
import { ProgressIndicators } from './components/progress-indicators.js';
import { TypingEffect } from './components/typing-effect.js';

/**
 * Clase principal de la aplicación del portfolio
 */
class PortfolioApp {
    constructor() {
        this.components = {};
        this.services = {};
        this.utils = {};
        this.animations = {};
        this.isInitialized = false;
        
        // Bind methods
        this.init = this.init.bind(this);
        this.initializeUtils = this.initializeUtils.bind(this);
        this.initializeServices = this.initializeServices.bind(this);
        this.initializeComponents = this.initializeComponents.bind(this);
        this.initializeAnimations = this.initializeAnimations.bind(this);
        this.setupEventListeners = this.setupEventListeners.bind(this);
    }

    /**
     * Inicialización principal de la aplicación
     */
    async init() {
        try {
            console.log('🚀 Iniciando Portfolio App...');
            
            // Verificar que el DOM esté cargado
            if (document.readyState === 'loading') {
                document.addEventListener('DOMContentLoaded', this.init);
                return;
            }

            // Inicializar en orden específico para evitar dependencias undefined
            await this.initializeUtils();
            await this.initializeServices();
            await this.initializeComponents();
            await this.initializeAnimations();
            await this.setupEventListeners();
            
            this.isInitialized = true;
            console.log('✅ Portfolio App inicializado correctamente');
            
            // Notificar que la app está lista
            this.dispatchReadyEvent();
            
        } catch (error) {
            console.error('❌ Error al inicializar Portfolio App:', error);
            this.handleInitializationError(error);
        }
    }

    /**
     * Inicializar utilidades
     */
    async initializeUtils() {
        console.log('🔧 Inicializando utilidades...');
        
        try {
            // Inicializar utilidades básicas
            this.utils = {
                domHelpers: DOMHelpers || null,
                notifications: new NotificationSystem()
            };

            // Inicializar FormValidator para el formulario de contacto
            const contactForm = document.querySelector('#contactForm');
            if (contactForm) {
                this.utils.contactFormValidator = initContactFormValidator();
                console.log('✅ FormValidator del contacto inicializado');
            } else {
                console.log('⚠️ Formulario de contacto no encontrado, saltando FormValidator');
            }

        } catch (error) {
            console.warn('⚠️ Error al inicializar utilidades:', error);
            // Continuar sin fallar completamente
            this.utils = {
                domHelpers: null,
                notifications: null,
                contactFormValidator: null
            };
        }
    }

    /**
     * Inicializar servicios
     */
    async initializeServices() {
        console.log('🌐 Inicializando servicios...');
        
        try {
            this.services = {};

            // EmailService
            try {
                this.services.emailService = new EmailService();
                console.log('✅ EmailService inicializado');
            } catch (error) {
                console.warn('⚠️ Error al inicializar EmailService:', error);
                this.services.emailService = null;
            }

            // GitHubAPI
            try {
                this.services.githubAPI = new GitHubAPI();
                if (this.services.githubAPI && this.services.githubAPI.init) {
                    await this.services.githubAPI.init();
                }
                console.log('✅ GitHubAPI inicializado');
            } catch (error) {
                console.warn('⚠️ Error al inicializar GitHubAPI:', error);
                this.services.githubAPI = null;
            }

        } catch (error) {
            console.warn('⚠️ Error general al inicializar servicios:', error);
        }
    }

    /**
     * Inicializar componentes principales
     */
    async initializeComponents() {
        console.log('🧩 Inicializando componentes...');
        
        this.components = {};

        // ThemeSwitcher - PRIMERO porque otros componentes pueden depender de él
        try {
            // Verificar si el botón de tema existe antes de crear el ThemeSwitcher
            const themeButton = document.querySelector('#themeToggle');
            if (themeButton) {
                this.components.themeSwitcher = new ThemeSwitcher();
                console.log('✅ ThemeSwitcher inicializado');
            } else {
                console.log('⚠️ Botón de tema no encontrado, saltando ThemeSwitcher');
            }
        } catch (error) {
            console.warn('⚠️ Error al inicializar ThemeSwitcher:', error);
        }

        // SkillsChart - usar selector en lugar de datos
        try {
            const skillsContainer = document.querySelector('#skillsChart') || 
                                   document.querySelector('.skills-chart') ||
                                   document.querySelector('#skills');
            if (skillsContainer) {
                this.components.skillsChart = new SkillsChart('#skillsChart');
                
                if (this.components.skillsChart.init) {
                    await this.components.skillsChart.init();
                }
                console.log('✅ SkillsChart inicializado');
            } else {
                console.log('📝 Contenedor de habilidades no encontrado, saltando SkillsChart...');
            }
        } catch (error) {
            console.warn('⚠️ Error al inicializar SkillsChart:', error);
        }

        // ExperienceTimeline - usar selector en lugar de datos
        try {
            const experienceContainer = document.querySelector('.experience-timeline') ||
                                       document.querySelector('#experience') ||
                                       document.querySelector('.timeline');
            if (experienceContainer) {
                this.components.experienceTimeline = new ExperienceTimeline('.experience-timeline');
                
                if (this.components.experienceTimeline.init) {
                    await this.components.experienceTimeline.init();
                }
                console.log('✅ ExperienceTimeline inicializado');
            } else {
                console.log('📝 Contenedor de experiencia no encontrado, saltando ExperienceTimeline...');
            }
        } catch (error) {
            console.warn('⚠️ Error al inicializar ExperienceTimeline:', error);
        }

        // ContactForm
        try {
            const contactFormElement = document.querySelector('#contactForm');
            if (contactFormElement) {
                // ContactForm solo necesita el selector, maneja el emailService internamente
                this.components.contactForm = new ContactForm('#contactForm');
                
                if (this.components.contactForm.init) {
                    await this.components.contactForm.init();
                }
                console.log('✅ ContactForm inicializado');
            } else {
                console.log('📝 Formulario de contacto no encontrado, saltando ContactForm...');
            }
        } catch (error) {
            console.warn('⚠️ Error al inicializar ContactForm:', error);
        }

        console.log(`📊 Componentes inicializados: ${Object.keys(this.components).length}`);
    }

    /**
     * Inicializar animaciones y efectos
     */
    async initializeAnimations() {
        console.log('🎬 Inicializando animaciones...');
        
        this.animations = {};

        // ScrollAnimations
        try {
            this.animations.scrollAnimations = new ScrollAnimations();
            if (this.animations.scrollAnimations.init) {
                await this.animations.scrollAnimations.init();
            }
            console.log('✅ ScrollAnimations inicializado');
        } catch (error) {
            console.warn('⚠️ Error al inicializar ScrollAnimations:', error);
        }

        // ProgressIndicators
        try {
            this.animations.progressIndicators = new ProgressIndicators();
            if (this.animations.progressIndicators.init) {
                await this.animations.progressIndicators.init();
            }
            console.log('✅ ProgressIndicators inicializado');
        } catch (error) {
            console.warn('⚠️ Error al inicializar ProgressIndicators:', error);
        }

        // TypingEffect - usar función helper que maneja la detección automática
        try {
            // Importar la función helper
            const { initTypingEffect } = await import('./components/typing-effect.js');
            
            // Buscar elementos comunes donde aplicar el efecto
            const typingElement = document.querySelector('.typing-text') || 
                                 document.querySelector('#typing-text') ||
                                 document.querySelector('.hero-subtitle') ||
                                 document.querySelector('[data-typing]');
            
            if (typingElement) {
                this.animations.typingEffect = initTypingEffect(typingElement, {
                    texts: ['Desarrollador Full Stack', 'Frontend Developer', 'Backend Developer'],
                    loop: true
                });
                
                if (this.animations.typingEffect) {
                    console.log('✅ TypingEffect inicializado');
                } else {
                    console.log('⚠️ TypingEffect no se pudo inicializar, pero no es crítico');
                }
            } else {
                console.log('📝 No se encontró elemento para TypingEffect, saltando...');
                this.animations.typingEffect = null;
            }
        } catch (error) {
            console.warn('⚠️ Error al inicializar TypingEffect:', error);
            this.animations.typingEffect = null;
        }

        console.log(`🎭 Animaciones inicializadas: ${Object.keys(this.animations).length}`);
    }

    /**
     * Configurar event listeners globales
     */
    setupEventListeners() {
        console.log('👂 Configurando event listeners...');
        
        try {
            // Listener para cambios de tema
            document.addEventListener('themeChanged', this.handleThemeChange.bind(this));
            
            // Listener para cambios de viewport
            window.addEventListener('resize', this.debounce(this.handleViewportChange.bind(this), 250));
            
            // Listener para scroll
            window.addEventListener('scroll', this.throttle(this.handleScroll.bind(this), 16));
            
            // Listener para errores globales
            window.addEventListener('error', this.handleGlobalError.bind(this));
            
            // Listener para promesas rechazadas
            window.addEventListener('unhandledrejection', this.handleUnhandledRejection.bind(this));

            console.log('✅ Event listeners configurados');
        } catch (error) {
            console.warn('⚠️ Error al configurar event listeners:', error);
        }
    }

    /**
     * Manejar cambios de tema
     */
    handleThemeChange(event) {
        console.log('🎨 Tema cambiado:', event.detail);
        
        // Propagar cambio a componentes que lo necesiten
        Object.values(this.components).forEach(component => {
            if (component && component.updateTheme) {
                try {
                    component.updateTheme(event.detail);
                } catch (error) {
                    console.warn('⚠️ Error al actualizar tema en componente:', error);
                }
            }
        });
    }

    /**
     * Manejar cambios de viewport
     */
    handleViewportChange() {
        Object.values(this.components).forEach(component => {
            if (component && component.handleResize) {
                try {
                    component.handleResize();
                } catch (error) {
                    console.warn('⚠️ Error al manejar resize en componente:', error);
                }
            }
        });
    }

    /**
     * Manejar scroll global
     */
    handleScroll() {
        Object.values(this.animations || {}).forEach(animation => {
            if (animation && animation.update) {
                try {
                    animation.update();
                } catch (error) {
                    // Silenciar errores de scroll para no spamear consola
                }
            }
        });
    }

    /**
     * Manejar errores globales
     */
    handleGlobalError(event) {
        console.error('❌ Error global:', event.error);
        
        if (this.utils.notifications && this.utils.notifications.showError) {
            this.utils.notifications.showError('Ocurrió un error inesperado');
        }
    }

    /**
     * Manejar promesas rechazadas
     */
    handleUnhandledRejection(event) {
        console.error('❌ Promesa rechazada:', event.reason);
        
        if (this.utils.notifications && this.utils.notifications.showError) {
            this.utils.notifications.showError('Error en operación asíncrona');
        }
        
        // Prevenir que se muestre en consola del navegador
        event.preventDefault();
    }

    /**
     * Manejar errores de inicialización
     */
    handleInitializationError(error) {
        const errorMessage = 'Error al cargar el portfolio. Por favor, recarga la página.';
        
        // Mostrar mensaje de error al usuario
        const errorDiv = document.createElement('div');
        errorDiv.className = 'error-message';
        errorDiv.style.cssText = `
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            background: #ff4444;
            color: white;
            padding: 20px;
            border-radius: 8px;
            text-align: center;
            z-index: 9999;
            box-shadow: 0 4px 6px rgba(0,0,0,0.1);
            font-family: Arial, sans-serif;
        `;
        errorDiv.innerHTML = `
            <h2>⚠️ Error de inicialización</h2>
            <p>${errorMessage}</p>
            <button onclick="location.reload()" style="
                background: white;
                color: #ff4444;
                border: none;
                padding: 10px 20px;
                border-radius: 4px;
                cursor: pointer;
                margin-top: 10px;
                font-weight: bold;
            ">Recargar página</button>
        `;
        
        document.body.appendChild(errorDiv);
    }

    /**
     * Disparar evento de aplicación lista
     */
    dispatchReadyEvent() {
        const readyEvent = new CustomEvent('portfolioReady', {
            detail: {
                components: Object.keys(this.components),
                services: Object.keys(this.services),
                animations: Object.keys(this.animations),
                utils: Object.keys(this.utils),
                timestamp: Date.now()
            }
        });
        
        document.dispatchEvent(readyEvent);
        console.log('📢 Evento portfolioReady disparado');
    }

    /**
     * Utilidades de rendimiento
     */
    debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }

    throttle(func, limit) {
        let inThrottle;
        return function() {
            const args = arguments;
            const context = this;
            if (!inThrottle) {
                func.apply(context, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        };
    }

    /**
     * Métodos públicos para acceder a instancias
     */
    getComponent(name) {
        return this.components[name] || null;
    }

    getService(name) {
        return this.services[name] || null;
    }

    getUtil(name) {
        return this.utils[name] || null;
    }

    getAnimation(name) {
        return this.animations[name] || null;
    }

    isReady() {
        return this.isInitialized;
    }

    /**
     * Destruir la aplicación (limpieza)
     */
    destroy() {
        console.log('🧹 Limpiando Portfolio App...');
        
        // Destruir componentes
        Object.values(this.components).forEach(component => {
            if (component && component.destroy) {
                try {
                    component.destroy();
                } catch (error) {
                    console.warn('⚠️ Error al destruir componente:', error);
                }
            }
        });

        // Destruir animaciones
        Object.values(this.animations).forEach(animation => {
            if (animation && animation.destroy) {
                try {
                    animation.destroy();
                } catch (error) {
                    console.warn('⚠️ Error al destruir animación:', error);
                }
            }
        });

        // Limpiar referencias
        this.components = {};
        this.services = {};
        this.utils = {};
        this.animations = {};
        this.isInitialized = false;
    }
}

// Función de inicialización segura
function initializePortfolioApp() {
    try {
        // Crear instancia global de la aplicación
        const portfolioApp = new PortfolioApp();
        
        // Inicializar cuando el DOM esté listo
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => {
                console.log('📄 DOM cargado, inicializando app...');
                portfolioApp.init();
            });
        } else {
            console.log('📄 DOM ya estaba listo, inicializando app...');
            portfolioApp.init();
        }

        // Hacer disponible globalmente
        window.portfolioApp = portfolioApp;
        
        return portfolioApp;
    } catch (error) {
        console.error('❌ Error fatal al crear PortfolioApp:', error);
        
        // Mostrar error básico al usuario
        document.body.innerHTML = `
            <div style="
                display: flex;
                align-items: center;
                justify-content: center;
                min-height: 100vh;
                background: #f8f9fa;
                font-family: Arial, sans-serif;
                text-align: center;
                padding: 20px;
            ">
                <div style="
                    background: white;
                    padding: 40px;
                    border-radius: 8px;
                    box-shadow: 0 4px 6px rgba(0,0,0,0.1);
                    max-width: 500px;
                ">
                    <h1 style="color: #dc3545; margin-bottom: 20px;">⚠️ Error de Carga</h1>
                    <p style="color: #6c757d; margin-bottom: 30px;">
                        No se pudo cargar el portfolio correctamente. 
                        Por favor, recarga la página o contacta al administrador.
                    </p>
                    <button onclick="location.reload()" style="
                        background: #007bff;
                        color: white;
                        border: none;
                        padding: 12px 24px;
                        border-radius: 4px;
                        cursor: pointer;
                        font-size: 16px;
                    ">Recargar Página</button>
                </div>
            </div>
        `;
        
        return null;
    }
}

// Inicializar la aplicación
const portfolioApp = initializePortfolioApp();

// Exportar para módulos ES6
export default portfolioApp;