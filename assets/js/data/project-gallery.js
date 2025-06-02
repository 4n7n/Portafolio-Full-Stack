export const featuredProjects = [
    {
        id: 'ecommerce-platform',
        title: 'E-commerce Platform',
        description: 'Plataforma de comercio electrónico completa con gestión de inventario, pagos integrados y panel de administración. Incluye carrito de compras, wishlist, y sistema de reseñas.',
        shortDescription: 'Plataforma completa de e-commerce con React y Node.js',
        image: 'assets/images/projects/ecommerce/thumbnail.jpg',
        images: {
            desktop: 'assets/images/projects/ecommerce/desktop.jpg',
            mobile: 'assets/images/projects/ecommerce/mobile.jpg',
            tablet: 'assets/images/projects/ecommerce/tablet.jpg'
        },
        category: 'fullstack',
        technologies: ['react', 'node', 'mongodb', 'stripe', 'tailwind'],
        techStack: [
            { name: 'React', icon: 'assets/images/technologies/frontend/react.svg' },
            { name: 'Node.js', icon: 'assets/images/technologies/backend/nodejs.svg' },
            { name: 'MongoDB', icon: 'assets/images/technologies/databases/mongodb.svg' },
            { name: 'Stripe', icon: 'assets/images/technologies/tools/stripe.svg' },
            { name: 'Tailwind CSS', icon: 'assets/images/technologies/frontend/tailwind.svg' }
        ],
        links: {
            demo: 'https://ecommerce-demo.vercel.app',
            repository: 'https://github.com/tu-usuario/ecommerce-platform',
            case_study: '#'
        },
        status: 'completed',
        featured: true,
        github: {
            repo: 'ecommerce-platform',
            stars: 245,
            forks: 67,
            issues: 3,
            language: 'JavaScript',
            size: 15420
        },
        stats: {
            lines_of_code: 25000,
            commits: 180,
            contributors: 3,
            last_update: '2024-12-15'
        },
        highlights: [
            'Sistema de autenticación JWT',
            'Integración con Stripe para pagos',
            'Panel de administración completo',
            'API RESTful documentada',
            'Tests automatizados con Jest'
        ],
        createdAt: '2024-10-01',
        updatedAt: '2024-12-15'
    },
    {
        id: 'task-management-app',
        title: 'Task Management App',
        description: 'Aplicación de gestión de tareas con colaboración en tiempo real, drag & drop, y notificaciones push. Inspirada en Trello pero con funcionalidades adicionales.',
        shortDescription: 'App de gestión de tareas con colaboración en tiempo real',
        image: 'assets/images/projects/task-manager/thumbnail.jpg',
        images: {
            desktop: 'assets/images/projects/task-manager/desktop.jpg',
            mobile: 'assets/images/projects/task-manager/mobile.jpg'
        },
        category: 'web',
        technologies: ['vue', 'express', 'postgresql', 'socket.io'],
        techStack: [
            { name: 'Vue.js', icon: 'assets/images/technologies/frontend/vue.svg' },
            { name: 'Express.js', icon: 'assets/images/technologies/backend/express.svg' },
            { name: 'PostgreSQL', icon: 'assets/images/technologies/databases/postgresql.svg' },
            { name: 'Socket.io', icon: 'assets/images/technologies/tools/socketio.svg' }
        ],
        links: {
            demo: 'https://taskapp-demo.netlify.app',
            repository: 'https://github.com/tu-usuario/task-management-app'
        },
        status: 'completed',
        featured: true,
        github: {
            repo: 'task-management-app',
            stars: 156,
            forks: 32,
            issues: 1,
            language: 'Vue',
            size: 8950
        },
        stats: {
            lines_of_code: 18000,
            commits: 124,
            contributors: 2,
            last_update: '2024-11-28'
        },
        highlights: [
            'Drag & drop interface intuitiva',
            'Colaboración en tiempo real',
            'Notificaciones push',
            'Modo offline funcional',
            'Exportación a PDF'
        ],
        createdAt: '2024-08-15',
        updatedAt: '2024-11-28'
    }
];

// All Projects Data
export const allProjects = [
    ...featuredProjects,
    {
        id: 'weather-dashboard',
        title: 'Weather Dashboard',
        description: 'Dashboard meteorológico con mapas interactivos, pronósticos extendidos y alertas personalizadas. Utiliza múltiples APIs para datos precisos.',
        shortDescription: 'Dashboard meteorológico con mapas y alertas',
        image: 'assets/images/projects/weather-app/thumbnail.jpg',
        category: 'web',
        technologies: ['react', 'typescript', 'chartjs'],
        techStack: [
            { name: 'React', icon: 'assets/images/technologies/frontend/react.svg' },
            { name: 'TypeScript', icon: 'assets/images/technologies/frontend/typescript.svg' },
            { name: 'Chart.js', icon: 'assets/images/technologies/tools/chartjs.svg' }
        ],
        links: {
            demo: 'https://weather-dashboard-demo.vercel.app',
            repository: 'https://github.com/tu-usuario/weather-dashboard'
        },
        status: 'completed',
        featured: false,
        github: {
            repo: 'weather-dashboard',
            stars: 89,
            forks: 23,
            issues: 2,
            language: 'TypeScript',
            size: 4200
        },
        createdAt: '2024-09-10',
        updatedAt: '2024-12-01'
    },
    {
        id: 'blog-cms',
        title: 'Blog CMS',
        description: 'Sistema de gestión de contenidos para blogs con editor WYSIWYG, SEO optimizado y sistema de comentarios moderado.',
        shortDescription: 'CMS para blogs con editor avanzado',
        image: 'assets/images/projects/blog-app/thumbnail.jpg',
        category: 'fullstack',
        technologies: ['next', 'prisma', 'postgresql'],
        techStack: [
            { name: 'Next.js', icon: 'assets/images/technologies/frontend/nextjs.svg' },
            { name: 'Prisma', icon: 'assets/images/technologies/tools/prisma.svg' },
            { name: 'PostgreSQL', icon: 'assets/images/technologies/databases/postgresql.svg' }
        ],
        links: {
            demo: 'https://blog-cms-demo.vercel.app',
            repository: 'https://github.com/tu-usuario/blog-cms'
        },
        status: 'in-progress',
        featured: false,
        github: {
            repo: 'blog-cms',
            stars: 67,
            forks: 15,
            issues: 8,
            language: 'JavaScript',
            size: 7800
        },
        createdAt: '2024-11-01',
        updatedAt: '2024-12-10'
    },
    {
        id: 'mobile-fitness-app',
        title: 'Fitness Tracker Mobile',
        description: 'Aplicación móvil para seguimiento de ejercicios con planes personalizados, estadísticas detalladas y integración con wearables.',
        shortDescription: 'App móvil para tracking de fitness',
        image: 'assets/images/projects/fitness-app/thumbnail.jpg',
        category: 'mobile',
        technologies: ['react-native', 'firebase'],
        techStack: [
            { name: 'React Native', icon: 'assets/images/technologies/mobile/react-native.svg' },
            { name: 'Firebase', icon: 'assets/images/technologies/databases/firebase.svg' }
        ],
        links: {
            demo: '#',
            repository: 'https://github.com/tu-usuario/fitness-tracker-mobile'
        },
        status: 'completed',
        featured: false,
        github: {
            repo: 'fitness-tracker-mobile',
            stars: 123,
            forks: 41,
            issues: 0,
            language: 'JavaScript',
            size: 12500
        },
        createdAt: '2024-07-20',
        updatedAt: '2024-10-15'
    },
    {
        id: 'api-gateway',
        title: 'API Gateway Service',
        description: 'Gateway de APIs con autenticación, rate limiting, logging y monitoreo. Maneja múltiples microservicios con balanceador de carga.',
        shortDescription: 'Gateway para microservicios con seguridad avanzada',
        image: 'assets/images/projects/api-gateway/thumbnail.jpg',
        category: 'api',
        technologies: ['node', 'redis', 'docker'],
        techStack: [
            { name: 'Node.js', icon: 'assets/images/technologies/backend/nodejs.svg' },
            { name: 'Redis', icon: 'assets/images/technologies/databases/redis.svg' },
            { name: 'Docker', icon: 'assets/images/technologies/tools/docker.svg' }
        ],
        links: {
            demo: '#',
            repository: 'https://github.com/tu-usuario/api-gateway-service'
        },
        status: 'completed',
        featured: false,
        github: {
            repo: 'api-gateway-service',
            stars: 234,
            forks: 78,
            issues: 5,
            language: 'JavaScript',
            size: 6700
        },
        createdAt: '2024-06-05',
        updatedAt: '2024-11-20'
    },
    {
        id: 'data-visualization',
        title: 'Data Visualization Dashboard',
        description: 'Dashboard interactivo para visualización de datos con gráficos D3.js, filtros avanzados y exportación de reportes.',
        shortDescription: 'Dashboard de visualización con D3.js',
        image: 'assets/images/projects/data-viz/thumbnail.jpg',
        category: 'web',
        technologies: ['angular', 'd3', 'python'],
        techStack: [
            { name: 'Angular', icon: 'assets/images/technologies/frontend/angular.svg' },
            { name: 'D3.js', icon: 'assets/images/technologies/tools/d3.svg' },
            { name: 'Python', icon: 'assets/images/technologies/backend/python.svg' }
        ],
        links: {
            demo: 'https://dataviz-demo.netlify.app',
            repository: 'https://github.com/tu-usuario/data-visualization-dashboard'
        },
        status: 'completed',
        featured: false,
        github: {
            repo: 'data-visualization-dashboard',
            stars: 167,
            forks: 52,
            issues: 3,
            language: 'TypeScript',
            size: 9200
        },
        createdAt: '2024-05-12',
        updatedAt: '2024-09-30'
    }
];

// Project Categories Configuration
export const projectCategories = {
    all: {
        label: 'Todos',
        description: 'Todos los proyectos',
        icon: 'icon-grid'
    },
    web: {
        label: 'Web Apps',
        description: 'Aplicaciones web modernas',
        icon: 'icon-monitor',
        color: '#3b82f6'
    },
    mobile: {
        label: 'Mobile',
        description: 'Aplicaciones móviles nativas e híbridas',
        icon: 'icon-smartphone',
        color: '#10b981'
    },
    api: {
        label: 'APIs',
        description: 'Servicios backend y microservicios',
        icon: 'icon-server',
        color: '#f59e0b'
    },
    fullstack: {
        label: 'Full Stack',
        description: 'Proyectos completos end-to-end',
        icon: 'icon-layers',
        color: '#8b5cf6'
    }
};

// Technology Filters
export const technologyFilters = [
    { value: 'all', label: 'Todas las tecnologías' },
    { value: 'react', label: 'React' },
    { value: 'vue', label: 'Vue.js' },
    { value: 'angular', label: 'Angular' },
    { value: 'next', label: 'Next.js' },
    { value: 'node', label: 'Node.js' },
    { value: 'python', label: 'Python' },
    { value: 'typescript', label: 'TypeScript' },
    { value: 'mongodb', label: 'MongoDB' },
    { value: 'postgresql', label: 'PostgreSQL' },
    { value: 'firebase', label: 'Firebase' },
    { value: 'docker', label: 'Docker' },
    { value: 'aws', label: 'AWS' }
];

// Project Status Types
export const projectStatus = {
    completed: {
        label: 'Completado',
        color: '#10b981',
        icon: 'icon-check-circle'
    },
    'in-progress': {
        label: 'En Desarrollo',
        color: '#f59e0b',
        icon: 'icon-clock'
    },
    archived: {
        label: 'Archivado',
        color: '#6b7280',
        icon: 'icon-archive'
    }
};

// Helper Functions
export const getProjectsByCategory = (category) => {
    if (category === 'all') return allProjects;
    return allProjects.filter(project => project.category === category);
};

export const getProjectsByTechnology = (tech) => {
    if (tech === 'all') return allProjects;
    return allProjects.filter(project => 
        project.technologies.includes(tech)
    );
};

export const getProjectsByStatus = (status) => {
    return allProjects.filter(project => project.status === status);
};

export const getFeaturedProjects = () => {
    return allProjects.filter(project => project.featured);
};

export const getProjectById = (id) => {
    return allProjects.find(project => project.id === id);
};

// Search functionality
export const searchProjects = (query) => {
    const lowercaseQuery = query.toLowerCase();
    return allProjects.filter(project => 
        project.title.toLowerCase().includes(lowercaseQuery) ||
        project.description.toLowerCase().includes(lowercaseQuery) ||
        project.technologies.some(tech => tech.includes(lowercaseQuery))
    );
};

// Filter combination
export const filterProjects = (category, technology, status = null) => {
    let filtered = allProjects;
    
    if (category && category !== 'all') {
        filtered = filtered.filter(project => project.category === category);
    }
    
    if (technology && technology !== 'all') {
        filtered = filtered.filter(project => 
            project.technologies.includes(technology)
        );
    }
    
    if (status) {
        filtered = filtered.filter(project => project.status === status);
    }
    
    return filtered;
};

// Pagination helper
export const paginateProjects = (projects, page = 1, limit = 6) => {
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;
    
    return {
        projects: projects.slice(startIndex, endIndex),
        totalPages: Math.ceil(projects.length / limit),
        currentPage: page,
        hasMore: endIndex < projects.length,
        total: projects.length
    };
};

// Statistics
export const getProjectsStats = () => {
    const stats = {
        total: allProjects.length,
        completed: getProjectsByStatus('completed').length,
        inProgress: getProjectsByStatus('in-progress').length,
        featured: getFeaturedProjects().length,
        categories: {}
    };
    
    // Count by category
    Object.keys(projectCategories).forEach(category => {
        if (category !== 'all') {
            stats.categories[category] = getProjectsByCategory(category).length;
        }
    });
    
    return stats;
};

// Export default object with all data and functions
export default {
    featuredProjects,
    allProjects,
    projectCategories,
    technologyFilters,
    projectStatus,
    getProjectsByCategory,
    getProjectsByTechnology,
    getProjectsByStatus,
    getFeaturedProjects,
    getProjectById,
    searchProjects,
    filterProjects,
    paginateProjects,
    getProjectsStats
};