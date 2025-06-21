/**
 * Datos de proyectos del portfolio
 * Estructura normalizada y completa para mostrar trabajos realizados
 */

export const PROJECTS_DATA = {
  // Proyectos principales destacados
  featured: [
    {
      id: 1,
      title: "E-Commerce Full Stack",
      subtitle: "Tienda online completa con gestión avanzada",
      description: "Tienda online completa con panel de administración, carrito de compras, pasarela de pagos y gestión de inventario.",
      longDescription: "Aplicación web completa de e-commerce desarrollada con React en el frontend y Node.js/Express en el backend. Incluye autenticación de usuarios, carrito de compras persistente, integración con Stripe para pagos, panel de administración completo y sistema de notificaciones en tiempo real.",
      image: "/assets/images/projects/ecommerce-preview.jpg",
      imageAlt: "Vista previa del e-commerce con productos destacados",
      gallery: [
        {
          url: "/assets/images/projects/ecommerce-1.jpg",
          alt: "Página principal del e-commerce",
          caption: "Diseño moderno y responsive de la página principal"
        },
        {
          url: "/assets/images/projects/ecommerce-2.jpg",
          alt: "Panel de administración",
          caption: "Dashboard completo para gestión de productos"
        },
        {
          url: "/assets/images/projects/ecommerce-3.jpg",
          alt: "Proceso de checkout",
          caption: "Proceso de pago integrado con Stripe"
        }
      ],
      technologies: ["React", "Node.js", "Express", "MongoDB", "Stripe", "JWT", "Socket.io"],
      category: "full-stack",
      status: "completed",
      featured: true,
      priority: 1,
      demoUrl: "https://mi-ecommerce-demo.netlify.app",
      githubUrl: "https://github.com/anthony-bonilla/ecommerce-project",
      codeUrl: "https://github.com/anthony-bonilla/ecommerce-project",
      liveUrl: "https://mi-ecommerce-demo.netlify.app",
      startDate: "2024-01-15",
      endDate: "2024-03-20",
      duration: "2 meses",
      team: "Individual",
      role: "Full Stack Developer",
      client: "Proyecto personal",
      features: [
        "Autenticación y autorización de usuarios",
        "Carrito de compras persistente",
        "Integración con Stripe para pagos",
        "Panel de administración completo",
        "Sistema de notificaciones en tiempo real",
        "Gestión de inventario automática",
        "Responsive design",
        "SEO optimizado"
      ],
      challenges: [
        "Implementación de pagos seguros con Stripe",
        "Optimización de consultas a la base de datos",
        "Sistema de notificaciones en tiempo real",
        "Manejo de estados complejos en React"
      ],
      learnings: [
        "Integración de APIs de pago",
        "Manejo de estados complejos en React",
        "Arquitectura de microservicios",
        "Optimización de rendimiento"
      ],
      metrics: {
        users: "500+ usuarios registrados",
        performance: "95% Lighthouse score",
        uptime: "99.9% uptime",
        loadTime: "< 2s tiempo de carga"
      }
    },
    
    {
      id: 2,
      title: "App de Gestión de Tareas",
      subtitle: "Herramienta de productividad colaborativa",
      description: "Aplicación para gestión de proyectos y tareas con funcionalidades colaborativas y seguimiento de tiempo.",
      longDescription: "Herramienta de productividad desarrollada con Vue.js que permite crear proyectos, asignar tareas, hacer seguimiento del tiempo y colaborar en equipo. Incluye dashboard analítico, notificaciones push y sincronización en tiempo real.",
      image: "/assets/images/projects/task-manager-preview.jpg",
      imageAlt: "Dashboard de gestión de tareas con gráficos",
      gallery: [
        {
          url: "/assets/images/projects/task-manager-1.jpg",
          alt: "Dashboard principal",
          caption: "Vista general del dashboard con estadísticas"
        },
        {
          url: "/assets/images/projects/task-manager-2.jpg",
          alt: "Vista de proyecto",
          caption: "Gestión detallada de tareas por proyecto"
        }
      ],
      technologies: ["Vue.js", "Vuex", "Firebase", "Chart.js", "PWA", "Sass"],
      category: "frontend",
      status: "completed",
      featured: true,
      priority: 2,
      demoUrl: "https://task-manager-vue.vercel.app",
      githubUrl: "https://github.com/anthony-bonilla/task-manager-vue",
      codeUrl: "https://github.com/anthony-bonilla/task-manager-vue",
      liveUrl: "https://task-manager-vue.vercel.app",
      startDate: "2023-10-01",
      endDate: "2023-12-15",
      duration: "2.5 meses",
      team: "Individual",
      role: "Frontend Developer",
      client: "Proyecto personal",
      features: [
        "Gestión de proyectos y tareas",
        "Seguimiento de tiempo",
        "Colaboración en equipo",
        "Dashboard analítico",
        "Notificaciones push",
        "Progressive Web App",
        "Sincronización en tiempo real",
        "Modo offline"
      ],
      challenges: [
        "Sincronización en tiempo real con Firebase",
        "Implementación de PWA",
        "Diseño responsive complejo",
        "Optimización de rendimiento"
      ],
      learnings: [
        "Vue.js ecosystem completo",
        "Firebase Realtime Database",
        "Progressive Web Apps",
        "Arquitectura de componentes"
      ],
      metrics: {
        users: "200+ usuarios activos",
        performance: "92% Lighthouse score",
        offline: "Funcionalidad offline completa",
        sync: "Sincronización < 100ms"
      }
    },

    {
      id: 3,
      title: "API REST para Blog",
      subtitle: "Backend robusto con documentación completa",
      description: "API robusta para gestión de contenido con autenticación, roles de usuario y documentación completa.",
      longDescription: "API RESTful desarrollada con Node.js y Express que proporciona endpoints completos para la gestión de un blog. Incluye autenticación JWT, sistema de roles, validación de datos, documentación con Swagger y testing automatizado.",
      image: "/assets/images/projects/blog-api-preview.jpg",
      imageAlt: "Documentación Swagger de la API",
      gallery: [
        {
          url: "/assets/images/projects/blog-api-swagger.jpg",
          alt: "Documentación Swagger",
          caption: "Documentación interactiva con Swagger UI"
        },
        {
          url: "/assets/images/projects/blog-api-postman.jpg",
          alt: "Testing con Postman",
          caption: "Colección de tests en Postman"
        }
      ],
      technologies: ["Node.js", "Express", "MongoDB", "JWT", "Swagger", "Jest", "Helmet"],
      category: "backend",
      status: "completed",
      featured: true,
      priority: 3,
      demoUrl: "https://blog-api-docs.herokuapp.com",
      githubUrl: "https://github.com/anthony-bonilla/blog-api",
      codeUrl: "https://github.com/anthony-bonilla/blog-api",
      liveUrl: "https://blog-api-docs.herokuapp.com",
      startDate: "2023-08-01",
      endDate: "2023-09-30",
      duration: "2 meses",
      team: "Individual",
      role: "Backend Developer",
      client: "Proyecto personal",
      features: [
        "API RESTful completa",
        "Autenticación JWT",
        "Sistema de roles",
        "Validación de datos",
        "Documentación Swagger",
        "Testing automatizado",
        "Middleware de seguridad",
        "Rate limiting"
      ],
      challenges: [
        "Implementación de middleware de seguridad",
        "Testing automatizado completo",
        "Documentación API con Swagger",
        "Optimización de consultas"
      ],
      learnings: [
        "Arquitectura RESTful",
        "Testing con Jest y Supertest",
        "Documentación de APIs",
        "Seguridad en APIs"
      ],
      metrics: {
        endpoints: "25+ endpoints",
        coverage: "95% test coverage",
        response: "< 200ms promedio",
        security: "A+ security rating"
      }
    }
  ],

  // Todos los proyectos (incluyendo featured + adicionales)
  all: [
    // Los featured se incluyen automáticamente
    {
      id: 4,
      title: "Landing Page Corporativa",
      subtitle: "Sitio web moderno con animaciones",
      description: "Sitio web corporativo moderno con animaciones CSS y optimización SEO.",
      longDescription: "Landing page corporativa desarrollada con tecnologías vanilla, enfocada en rendimiento y SEO. Incluye animaciones fluidas con GSAP, optimización de imágenes y estructura semántica perfecta.",
      image: "/assets/images/projects/corporate-landing.jpg",
      imageAlt: "Landing page corporativa con diseño moderno",
      gallery: [
        {
          url: "/assets/images/projects/corporate-landing-1.jpg",
          alt: "Sección hero",
          caption: "Hero section con animaciones GSAP"
        }
      ],
      technologies: ["HTML5", "CSS3", "JavaScript", "GSAP", "Webpack"],
      category: "frontend",
      status: "completed",
      featured: false,
      priority: 4,
      demoUrl: "https://corporate-landing-demo.netlify.app",
      githubUrl: "https://github.com/anthony-bonilla/corporate-landing",
      codeUrl: "https://github.com/anthony-bonilla/corporate-landing",
      liveUrl: "https://corporate-landing-demo.netlify.app",
      startDate: "2023-07-01",
      endDate: "2023-07-15",
      duration: "2 semanas",
      team: "Individual",
      role: "Frontend Developer",
      client: "Empresa local",
      features: [
        "Diseño responsive moderno",
        "Animaciones GSAP",
        "Optimización SEO",
        "Formulario de contacto",
        "Galería de imágenes",
        "Integración con Google Analytics"
      ],
      challenges: [
        "Optimización de rendimiento",
        "Animaciones complejas",
        "Cross-browser compatibility"
      ],
      learnings: [
        "Animaciones avanzadas con GSAP",
        "Optimización de rendimiento",
        "SEO técnico"
      ],
      metrics: {
        seo: "100% SEO score",
        performance: "98% performance",
        accessibility: "100% accessibility",
        loadTime: "< 1s tiempo de carga"
      }
    },

    {
      id: 5,
      title: "Dashboard Analytics",
      subtitle: "Panel de análisis de datos interactivo",
      description: "Panel de análisis de datos con gráficos interactivos y filtros avanzados.",
      longDescription: "Dashboard analítico desarrollado con React y TypeScript que permite visualizar datos complejos mediante gráficos interactivos. Incluye filtros avanzados, exportación de datos y personalización completa.",
      image: "/assets/images/projects/analytics-dashboard.jpg",
      imageAlt: "Dashboard con gráficos y métricas",
      gallery: [
        {
          url: "/assets/images/projects/analytics-1.jpg",
          alt: "Vista general del dashboard",
          caption: "Dashboard principal con métricas clave"
        }
      ],
      technologies: ["React", "TypeScript", "D3.js", "Material-UI", "Redux Toolkit"],
      category: "frontend",
      status: "in-progress",
      featured: false,
      priority: 5,
      demoUrl: "https://analytics-dashboard-demo.vercel.app",
      githubUrl: "https://github.com/anthony-bonilla/analytics-dashboard",
      codeUrl: "https://github.com/anthony-bonilla/analytics-dashboard",
      liveUrl: "https://analytics-dashboard-demo.vercel.app",
      startDate: "2024-04-01",
      endDate: null,
      duration: "En desarrollo",
      team: "Individual",
      role: "Frontend Developer",
      client: "Proyecto personal",
      features: [
        "Gráficos interactivos D3.js",
        "Filtros avanzados",
        "Exportación de datos",
        "Tema dark/light",
        "Responsive design",
        "TypeScript completo"
      ],
      challenges: [
        "Visualización de datos complejos",
        "Performance con grandes datasets",
        "Interactividad avanzada"
      ],
      learnings: [
        "D3.js para visualizaciones",
        "TypeScript avanzado",
        "Optimización de rendimiento",
        "Arquitectura de componentes"
      ],
      metrics: {
        dataPoints: "10M+ data points",
        charts: "15+ tipos de gráficos",
        filters: "20+ filtros disponibles",
        export: "5+ formatos de exportación"
      }
    },

    {
      id: 6,
      title: "Chat en Tiempo Real",
      subtitle: "Aplicación de mensajería instantánea",
      description: "Aplicación de chat con salas privadas, emojis y notificaciones push.",
      longDescription: "Aplicación de chat en tiempo real desarrollada con Socket.io que permite comunicación instantánea entre usuarios. Incluye salas privadas, sistema de emojis, notificaciones push y historial de mensajes.",
      image: "/assets/images/projects/realtime-chat.jpg",
      imageAlt: "Interfaz de chat con mensajes en tiempo real",
      gallery: [
        {
          url: "/assets/images/projects/chat-interface.jpg",
          alt: "Interfaz de chat",
          caption: "Chat interface con emojis y archivos"
        }
      ],
      technologies: ["Socket.io", "React", "Node.js", "Redis", "JWT", "MongoDB"],
      category: "full-stack",
      status: "completed",
      featured: false,
      priority: 6,
      demoUrl: "https://realtime-chat-app.herokuapp.com",
      githubUrl: "https://github.com/anthony-bonilla/realtime-chat",
      codeUrl: "https://github.com/anthony-bonilla/realtime-chat",
      liveUrl: "https://realtime-chat-app.herokuapp.com",
      startDate: "2023-05-01",
      endDate: "2023-06-15",
      duration: "1.5 meses",
      team: "Individual",
      role: "Full Stack Developer",
      client: "Proyecto personal",
      features: [
        "Chat en tiempo real",
        "Salas privadas y grupales",
        "Sistema de emojis",
        "Notificaciones push",
        "Historial de mensajes",
        "Compartir archivos",
        "Estado de usuarios online"
      ],
      challenges: [
        "Manejo de conexiones WebSocket",
        "Sincronización de mensajes",
        "Optimización de memoria",
        "Escalabilidad"
      ],
      learnings: [
        "Socket.io y WebSockets",
        "Redis para cache",
        "Arquitectura event-driven",
        "Optimización de real-time apps"
      ],
      metrics: {
        users: "100+ usuarios concurrentes",
        messages: "10K+ mensajes/día",
        latency: "< 50ms latencia",
        uptime: "99.5% uptime"
      }
    },

    {
      id: 7,
      title: "API de Clima",
      subtitle: "Microservicio meteorológico con cache",
      description: "Microservicio para consultar datos meteorológicos con caché Redis.",
      longDescription: "Microservicio desarrollado con Python y FastAPI que proporciona datos meteorológicos actualizados. Incluye cache inteligente con Redis, documentación automática y containerización con Docker.",
      image: "/assets/images/projects/weather-api.jpg",
      imageAlt: "Documentación de API de clima",
      gallery: [
        {
          url: "/assets/images/projects/weather-docs.jpg",
          alt: "Documentación FastAPI",
          caption: "Documentación automática con FastAPI"
        }
      ],
      technologies: ["Python", "FastAPI", "Redis", "Docker", "PostgreSQL", "Pytest"],
      category: "backend",
      status: "completed",
      featured: false,
      priority: 7,
      demoUrl: "https://weather-api-docs.herokuapp.com",
      githubUrl: "https://github.com/anthony-bonilla/weather-api",
      codeUrl: "https://github.com/anthony-bonilla/weather-api",
      liveUrl: "https://weather-api-docs.herokuapp.com",
      startDate: "2023-11-01",
      endDate: "2023-11-20",
      duration: "3 semanas",
      team: "Individual",
      role: "Backend Developer",
      client: "Proyecto personal",
      features: [
        "API RESTful con FastAPI",
        "Cache inteligente con Redis",
        "Múltiples fuentes de datos",
        "Documentación automática",
        "Rate limiting",
        "Docker containerization",
        "Testing automatizado"
      ],
      challenges: [
        "Integración de múltiples APIs",
        "Estrategia de cache óptima",
        "Manejo de rate limits",
        "Dockerización completa"
      ],
      learnings: [
        "FastAPI framework",
        "Redis para caching",
        "Docker y containerización",
        "Python async/await"
      ],
      metrics: {
        requests: "1M+ requests/mes",
        response: "< 100ms con cache",
        uptime: "99.8% uptime",
        coverage: "90% test coverage"
      }
    },

    {
      id: 8,
      title: "Generador de QR Codes",
      subtitle: "Herramienta web para códigos QR",
      description: "Herramienta web para generar códigos QR personalizados con diferentes estilos.",
      longDescription: "Aplicación web que permite generar códigos QR personalizados con múltiples opciones de diseño. Incluye personalización de colores, logos, formatos de descarga y API para integración.",
      image: "/assets/images/projects/qr-generator.jpg",
      imageAlt: "Interfaz del generador de códigos QR",
      gallery: [
        {
          url: "/assets/images/projects/qr-customization.jpg",
          alt: "Opciones de personalización",
          caption: "Panel de personalización de QR codes"
        }
      ],
      technologies: ["JavaScript", "Canvas API", "HTML5", "CSS3", "Webpack"],
      category: "frontend",
      status: "completed",
      featured: false,
      priority: 8,
      demoUrl: "https://qr-generator-tool.netlify.app",
      githubUrl: "https://github.com/anthony-bonilla/qr-generator",
      codeUrl: "https://github.com/anthony-bonilla/qr-generator",
      liveUrl: "https://qr-generator-tool.netlify.app",
      startDate: "2023-04-15",
      endDate: "2023-04-25",
      duration: "1.5 semanas",
      team: "Individual",
      role: "Frontend Developer",
      client: "Proyecto personal",
      features: [
        "Generación de QR codes",
        "Personalización de colores",
        "Inserción de logos",
        "Múltiples formatos de descarga",
        "Vista previa en tiempo real",
        "Códigos QR por lotes",
        "API REST disponible"
      ],
      challenges: [
        "Manipulación de Canvas API",
        "Optimización de imágenes",
        "Generación de PDFs",
        "Responsive design"
      ],
      learnings: [
        "Canvas API avanzado",
        "Generación de archivos",
        "Optimización de imágenes",
        "Algoritmos de QR"
      ],
      metrics: {
        qrCodes: "5K+ QR codes generados",
        formats: "5+ formatos disponibles",
        customization: "20+ opciones de diseño",
        downloads: "1K+ descargas/mes"
      }
    }
  ],

  // Categorías de proyectos
  categories: [
    {
      id: "all",
      name: "Todos",
      description: "Todos los proyectos realizados",
      count: 8,
      icon: "grid",
      color: "#6B7280"
    },
    {
      id: "full-stack",
      name: "Full Stack",
      description: "Proyectos con frontend y backend",
      count: 3,
      icon: "layers",
      color: "#10B981"
    },
    {
      id: "frontend",
      name: "Frontend",
      description: "Interfaces de usuario y experiencias",
      count: 4,
      icon: "monitor",
      color: "#3B82F6"
    },
    {
      id: "backend",
      name: "Backend",
      description: "APIs y servicios del servidor",
      count: 2,
      icon: "server",
      color: "#8B5CF6"
    }
  ],

  // Estados de proyectos
  statuses: {
    completed: {
      name: "Completado",
      description: "Proyecto finalizado y desplegado",
      color: "#10B981",
      bgColor: "#D1FAE5",
      icon: "check-circle"
    },
    "in-progress": {
      name: "En Progreso",
      description: "Actualmente en desarrollo",
      color: "#F59E0B",
      bgColor: "#FEF3C7",
      icon: "clock"
    },
    planned: {
      name: "Planificado",
      description: "En fase de planificación",
      color: "#6B7280",
      bgColor: "#F3F4F6",
      icon: "calendar"
    },
    paused: {
      name: "Pausado",
      description: "Temporalmente pausado",
      color: "#EF4444",
      bgColor: "#FEE2E2",
      icon: "pause-circle"
    }
  },

  // Configuración de tecnologías por categoría
  technologyCategories: {
    frontend: ["React", "Vue.js", "JavaScript", "TypeScript", "HTML5", "CSS3", "Sass", "Material-UI", "GSAP"],
    backend: ["Node.js", "Express", "Python", "FastAPI", "PHP", "Laravel"],
    database: ["MongoDB", "MySQL", "PostgreSQL", "Redis"],
    tools: ["Docker", "Webpack", "Jest", "Git", "Swagger"],
    cloud: ["Heroku", "Netlify", "Vercel", "Firebase"]
  },

  // Configuración de filtros
  filters: {
    enableSearch: true,
    enableCategoryFilter: true,
    enableTechnologyFilter: true,
    enableStatusFilter: true,
    enableDateSort: true,
    enableFeaturedFilter: true,
    searchPlaceholder: "Buscar proyectos...",
    defaultSort: "priority", // priority, date, title
    defaultOrder: "asc" // asc, desc
  },

  // Métricas generales
  stats: {
    totalProjects: 8,
    completedProjects: 6,
    inProgressProjects: 1,
    plannedProjects: 0,
    featuredProjects: 3,
    technologiesUsed: 25,
    totalCommits: "500+",
    totalLines: "50K+"
  }
};

/**
 * Utilidades para trabajar con proyectos
 */
export const projectUtils = {
  /**
   * Obtener proyectos por categoría
   */
  getProjectsByCategory: (category) => {
    if (category === 'all') return PROJECTS_DATA.all;
    return PROJECTS_DATA.all.filter(project => project.category === category);
  },

  /**
   * Obtener proyectos por estado
   */
  getProjectsByStatus: (status) => {
    return PROJECTS_DATA.all.filter(project => project.status === status);
  },

  /**
   * Obtener proyectos destacados
   */
  getFeaturedProjects: () => {
    return PROJECTS_DATA.all.filter(project => project.featured === true);
  },

  /**
   * Buscar proyectos por término
   */
  searchProjects: (query) => {
    const searchTerm = query.toLowerCase();
    return PROJECTS_DATA.all.filter(project => 
      project.title.toLowerCase().includes(searchTerm) ||
      project.description.toLowerCase().includes(searchTerm) ||
      project.technologies.some(tech => tech.toLowerCase().includes(searchTerm))
    );
  },

  /**
   * Obtener proyectos por tecnología
   */
  getProjectsByTechnology: (technology) => {
    return PROJECTS_DATA.all.filter(project => 
      project.technologies.includes(technology)
    );
  },

  /**
   * Ordenar proyectos
   */
  sortProjects: (projects, sortBy = 'priority', order = 'asc') => {
    return [...projects].sort((a, b) => {
      let aValue, bValue;
      
      switch (sortBy) {
        case 'title':
          aValue = a.title.toLowerCase();
          bValue = b.title.toLowerCase();
          break;
        case 'date':
          aValue = new Date(a.startDate);
          bValue = new Date(b.startDate);
          break;
        case 'priority':
          aValue = a.priority || 999;
          bValue = b.priority || 999;
          break;
        default:
          return 0;
      }
      
      if (order === 'desc') {
        return aValue < bValue ? 1 : -1;
      }
      return aValue > bValue ? 1 : -1;
    });
  },

  /**
   * Calcular duración del proyecto
   */
  calculateDuration: (startDate, endDate = null) => {
    const start = new Date(startDate);
    const end = endDate ? new Date(endDate) : new Date();
    const diffTime = Math.abs(end - start);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    const months = Math.floor(diffDays / 30);
    const weeks = Math.floor(diffDays / 7);
    
    if (months > 0) {
      const remainingWeeks = Math.floor((diffDays % 30) / 7);
      return remainingWeeks > 0 ? `${months} meses, ${remainingWeeks} semanas` : `${months} meses`;
    }
    return `${weeks} semanas`;
  },

  /**
   * Obtener todas las tecnologías únicas
   */
  getAllTechnologies: () => {
    const allTech = new Set();
    PROJECTS_DATA.all.forEach(project => {
      project.technologies.forEach(tech => allTech.add(tech));
    });
    return Array.from(allTech).sort();
  },

  /**
   * Obtener estadísticas de tecnologías
   */
  getTechnologyStats: () => {
    const techCount = {};
    PROJECTS_DATA.all.forEach(project => {
      project.technologies.forEach(tech => {
        techCount[tech] = (techCount[tech] || 0) + 1;
      });
    });
    
    return Object.entries(techCount)
      .map(([tech, count]) => ({ technology: tech, count, percentage: (count / PROJECTS_DATA.all.length * 100).toFixed(1) }))
      .sort((a, b) => b.count - a.count);
  },

  /**
   * Validar estructura de proyecto
   */
  validateProject: (project) => {
    const required = ['id', 'title', 'description', 'technologies', 'category', 'status'];
    const missing = required.filter(field => !project[field]);
    return {
      isValid: missing.length === 0,
      missingFields: missing
    };
  }
};

// Auto-generar conteo de categorías
PROJECTS_DATA.categories.forEach(category => {
  if (category.id === 'all') {
    category.count = PROJECTS_DATA.all.length;
  } else {
    category.count = PROJECTS_DATA.all.filter(p => p.category === category.id).length;
  }
});

export default PROJECTS_DATA;