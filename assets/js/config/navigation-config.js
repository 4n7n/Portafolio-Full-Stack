export const NavigationConfig = {
    // Items del menú principal
    items: [
        {
            id: 'home',
            label: 'Inicio',
            icon: 'icon-home',
            href: '#home',
            order: 1,
            mobile: true
        },
        {
            id: 'about',
            label: 'Sobre Mí',
            icon: 'icon-user',
            href: '#about',
            order: 2,
            mobile: true
        },
        {
            id: 'skills',
            label: 'Habilidades',
            icon: 'icon-code',
            href: '#skills',
            order: 3,
            mobile: true
        },
        {
            id: 'projects',
            label: 'Proyectos',
            icon: 'icon-briefcase',
            href: '#projects',
            order: 4,
            mobile: true
        },
        {
            id: 'experience',
            label: 'Experiencia',
            icon: 'icon-award',
            href: '#experience',
            order: 5,
            mobile: true
        },
        {
            id: 'contact',
            label: 'Contacto',
            icon: 'icon-mail',
            href: '#contact',
            order: 6,
            mobile: true
        }
    ],

    // Links adicionales
    externalLinks: [
        {
            id: 'blog',
            label: 'Blog',
            href: '/pages/blog.html',
            target: '_blank',
            icon: 'icon-edit'
        },
        {
            id: 'github',
            label: 'GitHub',
            href: 'https://github.com/tu-usuario',
            target: '_blank',
            icon: 'icon-github'
        }
    ],

    // Configuración de scroll
    scroll: {
        offset: 80, // Offset desde top de navbar
        duration: 800, // Duración animación (ms)
        easing: 'easeInOutCubic'
    },

    // Configuración de intersection observer
    observer: {
        rootMargin: '-80px 0px -50% 0px',
        threshold: 0.1
    },

    // Breakpoints responsive
    breakpoints: {
        mobile: 768,
        tablet: 1024
    },

    // Configuración del tema
    theme: {
        auto: true, // Auto-detectar tema del sistema
        storage: 'theme-preference', // Key localStorage
        default: 'light'
    },

    // Idiomas soportados
    languages: {
        es: {
            label: 'Español',
            flag: '🇪🇸',
            cvFile: 'cv-es.pdf'
        },
        en: {
            label: 'English',
            flag: '🇺🇸',
            cvFile: 'cv-en.pdf'
        }
    },

    // Configuración de analytics
    analytics: {
        trackNavigation: true,
        trackThemeChanges: true,
        trackLanguageChanges: true
    }
};

export default NavigationConfig;