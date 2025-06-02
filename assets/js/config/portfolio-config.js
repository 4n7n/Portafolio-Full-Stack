// Portfolio Config - Projects Extension
// Add to existing assets/js/config/portfolio-config.js

// Projects Configuration
export const projectsConfig = {
    // Display settings
    projectsPerPage: 6,
    featuredProjectsLimit: 2,
    enableLazyLoading: true,
    enableInfiniteScroll: false,
    showGitHubStats: true,
    showProjectStats: true,
    
    // Animation settings
    animationDelay: 100,
    staggerDelay: 100,
    loadMoreDelay: 300,
    modalAnimationDuration: 300,
    
    // Filter settings
    enableCategoryFilter: true,
    enableTechFilter: true,
    enableSearchFilter: true,
    enableStatusFilter: false,
    enableDateFilter: false,
    defaultCategory: 'all',
    defaultTech: 'all',
    
    // Modal settings
    enableModal: true,
    enableModalKeyboard: true,
    enableModalStats: true,
    enableModalImages: true,
    modalImageFallback: 'assets/images/fallback-project.jpg',
    
    // GitHub Integration
    github: {
        username: 'tu-usuario',
        token: null, // Add your GitHub personal access token for higher rate limits
        enableAPI: true,
        enableCache: true,
        cacheTimeout: 300000, // 5 minutes
        fallbackToStatic: true,
        rateLimit: {
            enabled: true,
            maxRequests: 50,
            timeWindow: 3600000 // 1 hour
        }
    },
    
    // Performance settings
    performance: {
        enableVirtualScrolling: false,
        enableImageOptimization: true,
        enableWebP: true,
        enableLazyImages: true,
        preloadFeatured: true,
        debounceSearch: 300,
        throttleScroll: 16
    },
    
    // SEO and Analytics
    seo: {
        enableStructuredData: true,
        enableMetaTags: true,
        enableOpenGraph: true,
        enableTwitterCards: true
    },
    
    analytics: {
        trackProjectViews: true,
        trackFilterUsage: true,
        trackModalOpens: true,
        trackLinkClicks: true
    }
};

// Update existing navigation config
export const navigationConfig = {
    // ... existing navigation items
    items: [
        // ... existing items (home, about, skills)
        {
            name: 'projects',
            label: 'Proyectos',
            href: '#projects',
            icon: 'icon-folder',
            order: 4,
            enabled: true
        }
        // ... rest of navigation items
    ]
};

// Update scroll spy targets
export const scrollSpyConfig = {
    targets: ['#hero', '#about', '#skills', '#projects', '#experience', '#contact'],
    offset: 100,
    threshold: 0.3
};

// Image optimization settings
export const imageConfig = {
    formats: ['webp', 'jpg', 'png'],
    qualities: {
        thumbnail: 70,
        medium: 80,
        large: 85
    },
    sizes: {
        thumbnail: { width: 400, height: 250 },
        medium: { width: 800, height: 500 },
        large: { width: 1200, height: 750 }
    },
    lazy: {
        threshold: 0.1,
        rootMargin: '50px'
    }
};

// Technology mapping for icons and colors
export const technologyMap = {
    react: {
        name: 'React',
        icon: 'assets/images/technologies/frontend/react.svg',
        color: '#61DAFB',
        category: 'frontend'
    },
    vue: {
        name: 'Vue.js',
        icon: 'assets/images/technologies/frontend/vue.svg',
        color: '#4FC08D',
        category: 'frontend'
    },
    angular: {
        name: 'Angular',
        icon: 'assets/images/technologies/frontend/angular.svg',
        color: '#DD0031',
        category: 'frontend'
    },
    next: {
        name: 'Next.js',
        icon: 'assets/images/technologies/frontend/nextjs.svg',
        color: '#000000',
        category: 'frontend'
    },
    node: {
        name: 'Node.js',
        icon: 'assets/images/technologies/backend/nodejs.svg',
        color: '#339933',
        category: 'backend'
    },
    python: {
        name: 'Python',
        icon: 'assets/images/technologies/backend/python.svg',
        color: '#3776AB',
        category: 'backend'
    },
    mongodb: {
        name: 'MongoDB',
        icon: 'assets/images/technologies/databases/mongodb.svg',
        color: '#47A248',
        category: 'database'
    },
    postgresql: {
        name: 'PostgreSQL',
        icon: 'assets/images/technologies/databases/postgresql.svg',
        color: '#336791',
        category: 'database'
    },
    typescript: {
        name: 'TypeScript',
        icon: 'assets/images/technologies/frontend/typescript.svg',
        color: '#3178C6',
        category: 'frontend'
    },
    tailwind: {
        name: 'Tailwind CSS',
        icon: 'assets/images/technologies/frontend/tailwind.svg',
        color: '#06B6D4',
        category: 'frontend'
    },
    docker: {
        name: 'Docker',
        icon: 'assets/images/technologies/tools/docker.svg',
        color: '#2496ED',
        category: 'tools'
    },
    aws: {
        name: 'AWS',
        icon: 'assets/images/technologies/tools/aws.svg',
        color: '#FF9900',
        category: 'tools'
    }
};

// URL patterns for projects
export const urlPatterns = {
    project: '/project/:id',
    projects: '/projects',
    projectsCategory: '/projects/category/:category',
    projectsTech: '/projects/tech/:technology'
};

// Error messages
export const errorMessages = {
    projects: {
        loadFailed: 'Error al cargar los proyectos. Inténtalo de nuevo.',
        notFound: 'Proyecto no encontrado.',
        githubFailed: 'No se pudieron cargar los datos de GitHub.',
        modalFailed: 'Error al abrir los detalles del proyecto.',
        filterFailed: 'Error al aplicar los filtros.'
    }
};

// Loading states
export const loadingStates = {
    projects: {
        initial: 'Cargando proyectos...',
        loadMore: 'Cargando más proyectos...',
        filtering: 'Aplicando filtros...',
        github: 'Actualizando datos de GitHub...',
        modal: 'Cargando detalles...'
    }
};

// Feature flags
export const featureFlags = {
    projects: {
        enableAdvancedFilters: true,
        enableProjectComments: false,
        enableProjectLikes: false,
        enableProjectSharing: true,
        enableProjectDownload: false,
        enableProjectBookmarks: false,
        enableProjectTags: true,
        enableProjectCategories: true
    }
};

// Default export with all configurations
export default {
    projects: projectsConfig,
    navigation: navigationConfig,
    scrollSpy: scrollSpyConfig,
    images: imageConfig,
    technologies: technologyMap,
    urls: urlPatterns,
    errors: errorMessages,
    loading: loadingStates,
    features: featureFlags
};