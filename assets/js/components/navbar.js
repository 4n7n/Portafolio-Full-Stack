/**
 * Navbar Main Controller
 * Maneja toda la funcionalidad del sistema de navegación
 */

import { NavigationConfig } from '../config/navigation-config.js';
import { MobileMenu } from './mobile-menu.js';
import { ScrollNavbar } from './scroll-navbar.js';
import { ThemeSwitcher } from './theme-switcher.js';
import { DOMHelpers } from '../utils/dom-helpers.js';

export class Navbar {
    constructor() {
        this.navbar = null;
        this.navLinks = [];
        this.currentSection = 'home';
        this.isInitialized = false;
        
        // Subcomponentes
        this.mobileMenu = null;
        this.scrollNavbar = null;
        this.themeSwitcher = null;
    }

    /**
     * Inicializa el sistema de navegación
     */
    async init() {
        try {
            await this.loadNavbar();
            this.cacheElements();
            this.initSubComponents();
            this.bindEvents();
            this.setInitialState();
            
            this.isInitialized = true;
            console.log('✅ Navbar inicializado correctamente');
        } catch (error) {
            console.error('❌ Error inicializando navbar:', error);
        }
    }

    /**
     * Carga el HTML del navbar
     */
    async loadNavbar() {
        const navbarContainer = document.getElementById('navbar-container');
        if (!navbarContainer) {
            throw new Error('Contenedor del navbar no encontrado');
        }

        try {
            const response = await fetch('/components/navbar.html');
            const html = await response.text();
            navbarContainer.innerHTML = html;
        } catch (error) {
            throw new Error(`Error cargando navbar HTML: ${error.message}`);
        }
    }

    /**
     * Cachea referencias a elementos DOM
     */
    cacheElements() {
        this.navbar = document.getElementById('navbar');
        this.navLinks = document.querySelectorAll('.navbar-link, .mobile-menu-link');
        this.brandLink = document.querySelector('.brand-link');
        this.ctaButton = document.querySelector('.btn-cta');
        
        if (!this.navbar) {
            throw new Error('Elemento navbar no encontrado');
        }
    }

    /**
     * Inicializa subcomponentes
     */
    initSubComponents() {
        // Mobile Menu
        this.mobileMenu = new MobileMenu();
        this.mobileMenu.init();

        // Scroll Effects
        this.scrollNavbar = new ScrollNavbar(this.navbar);
        this.scrollNavbar.init();

        // Theme Switcher
        this.themeSwitcher = new ThemeSwitcher();
        this.themeSwitcher.init();
    }

    /**
     * Vincula eventos
     */
    bindEvents() {
        // Navigation links
        this.navLinks.forEach(link => {
            link.addEventListener('click', this.handleNavClick.bind(this));
        });

        // Brand logo click
        if (this.brandLink) {
            this.brandLink.addEventListener('click', this.handleBrandClick.bind(this));
        }

        // Language toggle
        this.bindLanguageToggle();

        // Intersection Observer para active states
        this.setupIntersectionObserver();

        // Keyboard navigation
        this.bindKeyboardEvents();
    }

    /**
     * Maneja clicks en links de navegación
     */
    handleNavClick(event) {
        event.preventDefault();
        
        const link = event.currentTarget;
        const section = link.dataset.section;
        const href = link.getAttribute('href');

        // Verificar si es link externo
        if (href.startsWith('http') || href.includes('.html')) {
            window.open(href, '_blank');
            return;
        }

        // Navegación interna
        if (section) {
            this.navigateToSection(section);
            this.setActiveLink(section);
            
            // Cerrar menú móvil si está abierto
            if (this.mobileMenu && this.mobileMenu.isOpen) {
                this.mobileMenu.close();
            }
        }
    }

    /**
     * Maneja click en logo/brand
     */
    handleBrandClick(event) {
        event.preventDefault();
        this.navigateToSection('home');
        this.setActiveLink('home');
    }

    /**
     * Navega a una sección específica
     */
    navigateToSection(sectionId) {
        const targetElement = document.getElementById(sectionId);
        
        if (targetElement) {
            const offsetTop = targetElement.offsetTop - (this.navbar.offsetHeight + 20);
            
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });

            // Actualizar URL
            this.updateURL(sectionId);
            
            // Analytics
            this.trackNavigation(sectionId);
        }
    }

    /**
     * Establece el link activo
     */
    setActiveLink(sectionId) {
        // Remover active de todos los links
        this.navLinks.forEach(link => {
            link.classList.remove('active');
        });

        // Añadir active al link correspondiente
        const activeLinks = document.querySelectorAll(`[data-section="${sectionId}"]`);
        activeLinks.forEach(link => {
            link.classList.add('active');
        });

        this.currentSection = sectionId;
    }

    /**
     * Configura Intersection Observer para detección automática de secciones
     */
    setupIntersectionObserver() {
        const sections = document.querySelectorAll('section[id]');
        
        const observerOptions = {
            root: null,
            rootMargin: `-${this.navbar.offsetHeight + 50}px 0px -50% 0px`,
            threshold: 0.1
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const sectionId = entry.target.id;
                    this.setActiveLink(sectionId);
                    this.updateURL(sectionId);
                }
            });
        }, observerOptions);

        sections.forEach(section => {
            observer.observe(section);
        });
    }

    /**
     * Vincula toggle de idioma
     */
    bindLanguageToggle() {
        const langButtons = document.querySelectorAll('.lang-btn');
        
        langButtons.forEach(btn => {
            btn.addEventListener('click', (e) => {
                const lang = e.target.dataset.lang;
                this.changeLanguage(lang);
            });
        });
    }

    /**
     * Cambia el idioma
     */
    changeLanguage(lang) {
        // Actualizar botones activos
        document.querySelectorAll('.lang-btn').forEach(btn => {
            btn.classList.toggle('active', btn.dataset.lang === lang);
        });

        // Actualizar href del CV
        const cvButton = document.querySelector('.btn-cta');
        if (cvButton) {
            cvButton.href = `/assets/documents/cv-${lang}.pdf`;
        }

        // Disparar evento personalizado
        window.dispatchEvent(new CustomEvent('languageChanged', {
            detail: { language: lang }
        }));

        // Guardar preferencia
        localStorage.setItem('preferred-language', lang);
    }

    /**
     * Eventos de teclado
     */
    bindKeyboardEvents() {
        document.addEventListener('keydown', (e) => {
            // ESC para cerrar menú móvil
            if (e.key === 'Escape' && this.mobileMenu && this.mobileMenu.isOpen) {
                this.mobileMenu.close();
            }

            // Alt + número para navegación rápida
            if (e.altKey && !isNaN(e.key)) {
                const sectionIndex = parseInt(e.key) - 1;
                const sections = NavigationConfig.items;
                
                if (sections[sectionIndex]) {
                    e.preventDefault();
                    this.navigateToSection(sections[sectionIndex].id);
                }
            }
        });
    }

    /**
     * Establece estado inicial
     */
    setInitialState() {
        // Detectar sección actual desde URL
        const hash = window.location.hash.replace('#', '');
        const currentSection = hash || 'home';
        
        this.setActiveLink(currentSection);

        // Establecer idioma preferido
        const savedLang = localStorage.getItem('preferred-language') || 'es';
        this.changeLanguage(savedLang);

        // Scroll inicial si hay hash
        if (hash) {
            setTimeout(() => {
                this.navigateToSection(hash);
            }, 100);
        }
    }

    /**
     * Actualiza URL sin recargar página
     */
    updateURL(sectionId) {
        if (sectionId !== 'home') {
            history.replaceState(null, null, `#${sectionId}`);
        } else {
            history.replaceState(null, null, window.location.pathname);
        }
    }

    /**
     * Tracking de navegación para analytics
     */
    trackNavigation(sectionId) {
        // Google Analytics
        if (typeof gtag !== 'undefined') {
            gtag('event', 'navigation', {
                'section': sectionId,
                'method': 'navbar'
            });
        }

        // Custom analytics
        if (window.analytics) {
            window.analytics.track('Navigation', {
                section: sectionId,
                timestamp: new Date().toISOString()
            });
        }
    }

    /**
     * Destroy - Limpia event listeners
     */
    destroy() {
        if (this.scrollNavbar) {
            this.scrollNavbar.destroy();
        }
        
        if (this.mobileMenu) {
            this.mobileMenu.destroy();
        }
        
        if (this.themeSwitcher) {
            this.themeSwitcher.destroy();
        }

        this.isInitialized = false;
    }

    /**
     * Métodos públicos para control externo
     */
    goToSection(sectionId) {
        if (this.isInitialized) {
            this.navigateToSection(sectionId);
        }
    }

    getCurrentSection() {
        return this.currentSection;
    }

    showNavbar() {
        if (this.scrollNavbar) {
            this.scrollNavbar.show();
        }
    }

    hideNavbar() {
        if (this.scrollNavbar) {
            this.scrollNavbar.hide();
        }
    }
}

// Auto-inicialización cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', () => {
    window.navbar = new Navbar();
    window.navbar.init();
});