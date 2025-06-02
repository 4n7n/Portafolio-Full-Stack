import { Navbar } from './components/navbar.js';
import { NavigationConfig } from './config/navigation-config.js';
import { DOMHelpers } from './utils/dom-helpers.js';
import HeroBanner from './components/hero-banner.js';
import SkillsChart from './components/skills-chart.js';

const heroBanner = new HeroBanner();

class PortfolioApp {
    constructor() {
        this.components = {};
        this.isInitialized = false;
        this.skillsChart = null;
    }

    async init() {
        try {
            console.log('🚀 Inicializando Portfolio App...');
            
            // Esperar a que el DOM esté listo
            await this.waitForDOM();
            
            // Cargar componentes HTML
            await this.loadComponents();
            
            // Inicializar navegación
            await this.initNavigation();
            
            // Inicializar skills
            await this.initializeSkills();
            
            // Inicializar otros componentes
            this.initGlobalFeatures();
            
            // Eventos globales
            this.bindGlobalEvents();
            
            // Finalizar inicialización
            this.finishInitialization();
            
            console.log('✅ Portfolio App inicializado correctamente');
            
        } catch (error) {
            console.error('❌ Error inicializando aplicación:', error);
        }
    }

    async waitForDOM() {
        if (document.readyState === 'loading') {
            return new Promise(resolve => {
                document.addEventListener('DOMContentLoaded', resolve);
            });
        }
    }

    async loadComponents() {
        // Cargar navbar si no existe
        if (!document.querySelector('#navbar')) {
            await this.loadComponent('navbar', '#navbar-container');
        }
        
        // Cargar footer si no existe  
        if (!document.querySelector('#footer')) {
            await this.loadComponent('footer', '#footer-container');
        }
    }

    async loadComponent(componentName, containerSelector) {
        try {
            const container = document.querySelector(containerSelector);
            if (!container) return;

            const response = await fetch(`/components/${componentName}.html`);
            const html = await response.text();
            container.innerHTML = html;
            
        } catch (error) {
            console.warn(`⚠️ No se pudo cargar componente ${componentName}:`, error);
        }
    }

    async initNavigation() {
        this.components.navbar = new Navbar();
        await this.components.navbar.init();
    }

    async initializeSkills() {
        try {
            this.skillsChart = new SkillsChart();
            this.components.skillsChart = this.skillsChart;
            console.log('✅ Skills component initialized');
        } catch (error) {
            console.error('❌ Error initializing skills:', error);
        }
    }

    initGlobalFeatures() {
        // Lazy loading de imágenes
        this.initLazyLoading();
        
        // Smooth scroll para enlaces internos
        this.initSmoothScroll();
        
        // Analytics
        this.initAnalytics();
        
        // PWA features si aplicable
        this.initPWA();
    }

    initLazyLoading() {
        const images = document.querySelectorAll('img[loading="lazy"]');
        
        if ('IntersectionObserver' in window) {
            const imageObserver = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const img = entry.target;
                        img.src = img.dataset.src || img.src;
                        img.classList.remove('lazy');
                        imageObserver.unobserve(img);
                    }
                });
            });

            images.forEach(img => imageObserver.observe(img));
        }
    }

    initSmoothScroll() {
        // Ya manejado por el navbar, pero backup para otros enlaces
        document.addEventListener('click', (e) => {
            const link = e.target.closest('a[href^="#"]');
            if (link && !link.dataset.handled) {
                e.preventDefault();
                const targetId = link.getAttribute('href').substring(1);
                const targetElement = document.getElementById(targetId);
                
                if (targetElement) {
                    DOMHelpers.scrollToElement(targetElement, 80);
                }
            }
        });
    }

    initAnalytics() {
        // Google Analytics si está configurado
        if (typeof gtag !== 'undefined') {
            gtag('config', 'GA_MEASUREMENT_ID', {
                page_title: document.title,
                page_location: window.location.href
            });
        }
    }

    initPWA() {
        // Service Worker si está disponible
        if ('serviceWorker' in navigator) {
            navigator.serviceWorker.register('/sw.js')
                .then(registration => {
                    console.log('SW registrado:', registration);
                })
                .catch(error => {
                    console.log('SW falló:', error);
                });
        }
    }

    bindGlobalEvents() {
        // Manejo de errores globales
        window.addEventListener('error', this.handleGlobalError);
        
        // Cambios de conexión
        window.addEventListener('online', () => {
            console.log('📶 Conexión restaurada');
        });
        
        window.addEventListener('offline', () => {
            console.log('📵 Sin conexión');
        });
        
        // Cambio de visibilidad de página
        document.addEventListener('visibilitychange', () => {
            if (document.visibilityState === 'visible') {
                // Página visible - reactivar animaciones si es necesario
                if (this.skillsChart && this.skillsChart.animationTriggered) {
                    // Opcional: reactivar animaciones de skills si es necesario
                }
            }
        });
    }

    handleGlobalError(error) {
        console.error('Error global:', error);
        
        // Reportar a servicio de monitoring si está configurado
        if (window.Sentry) {
            window.Sentry.captureException(error);
        }
    }

    finishInitialization() {
        this.isInitialized = true;
        
        // Remover loading state si existe
        document.body.classList.remove('loading');
        document.body.classList.add('loaded');
        
        // Evento personalizado
        window.dispatchEvent(new CustomEvent('portfolioReady', {
            detail: { 
                components: this.components,
                skillsChart: this.skillsChart
            }
        }));
    }

    // Métodos públicos
    getComponent(name) {
        return this.components[name];
    }

    getSkillsChart() {
        return this.skillsChart;
    }

    isReady() {
        return this.isInitialized;
    }

    // Método para actualizar skills dinámicamente
    updateSkills(newSkillsData) {
        if (this.skillsChart) {
            this.skillsChart.updateSkills(newSkillsData);
        }
    }

    // Método para destruir componentes (cleanup)
    destroy() {
        if (this.skillsChart) {
            this.skillsChart.destroy();
        }
        
        Object.values(this.components).forEach(component => {
            if (component && typeof component.destroy === 'function') {
                component.destroy();
            }
        });
        
        this.components = {};
        this.skillsChart = null;
        this.isInitialized = false;
    }
}

// Inicialización automática
const app = new PortfolioApp();
app.init();

// Exportar para uso global
window.portfolioApp = app;

// Manejo de hot reload en desarrollo
if (module.hot) {
    module.hot.accept(() => {
        app.destroy();
        location.reload();
    });
}