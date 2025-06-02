window.portfolioConfig = {
    ...window.portfolioConfig,
   
    // Hero configuration
    hero: {
        typingStrings: [
            'Full Stack Developer',
            'Frontend Specialist',
            'Backend Engineer',
            'UI/UX Enthusiast',
            'Problem Solver',
            'Tech Innovator'
        ],
        particlesEnabled: true,
        parallaxEnabled: true
    },
   
    // About configuration
    about: {
        yearsExperience: 3,
        projectsCompleted: 25,
        happyClients: 15,
        technologies: [
            'JavaScript (ES6+)',
            'React / Next.js',
            'Node.js / Express',
            'TypeScript',
            'Python / Django',
            'PostgreSQL / MongoDB',
            'AWS / Docker',
            'Git / CI/CD'
        ]
    },

    // Skills Configuration
    skills: {
        enableAnimations: true,
        animationDelay: 100,
        progressDuration: 1500,
        enableFilters: true,
        defaultFilter: 'all',
        showPercentages: true,
        enableTooltips: true,
        lazyLoadIcons: true
    },

    // Navigation configuration
    navigation: {
        items: [
            {
                name: 'home',
                label: 'Inicio',
                href: '#hero',
                icon: 'icon-home',
                order: 1
            },
            {
                name: 'about',
                label: 'Acerca',
                href: '#about',
                icon: 'icon-user',
                order: 2
            },
            {
                name: 'skills',
                label: 'Habilidades',
                href: '#skills',
                icon: 'icon-code',
                order: 3
            },
            {
                name: 'projects',
                label: 'Proyectos',
                href: '#projects',
                icon: 'icon-folder',
                order: 4
            },
            {
                name: 'experience',
                label: 'Experiencia',
                href: '#experience',
                icon: 'icon-briefcase',
                order: 5
            },
            {
                name: 'contact',
                label: 'Contacto',
                href: '#contact',
                icon: 'icon-mail',
                order: 6
            }
        ]
    },

    // Scroll spy configuration
    scrollSpy: {
        targets: ['#hero', '#about', '#skills', '#projects', '#experience', '#contact'],
        offset: 100,
        smoothScroll: true,
        duration: 800
    },
   
    // Social links
    social: {
        github: 'https://github.com/yourusername',
        linkedin: 'https://linkedin.com/in/yourusername',
        twitter: 'https://twitter.com/yourusername',
        email: 'your.email@example.com'
    },

    // Additional configurations
    theme: {
        darkMode: true,
        primaryColor: '#3b82f6',
        accentColor: '#10b981'
    },

    // Performance settings
    performance: {
        lazyLoading: true,
        imageOptimization: true,
        preloadCritical: true
    },

    // Animation settings
    animations: {
        enableAOS: true,
        duration: 1000,
        easing: 'ease-out-cubic',
        once: true,
        mirror: false
    }
};