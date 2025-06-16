export const PROJECTS_DATA = {
  // Proyectos principales
  featured: [
    {
      id: 1,
      title: "E-Commerce Full Stack",
      description: "Tienda online completa con panel de administración, carrito de compras, pasarela de pagos y gestión de inventario.",
      longDescription: "Aplicación web completa de e-commerce desarrollada con React en el frontend y Node.js/Express en el backend. Incluye autenticación de usuarios, carrito de compras persistente, integración con Stripe para pagos, panel de administración completo y sistema de notificaciones en tiempo real.",
      image: "/assets/images/projects/ecommerce-preview.jpg",
      gallery: [
        "/assets/images/projects/ecommerce-1.jpg",
        "/assets/images/projects/ecommerce-2.jpg",
        "/assets/images/projects/ecommerce-3.jpg"
      ],
      technologies: ["React", "Node.js", "Express", "MongoDB", "Stripe", "JWT", "Socket.io"],
      category: "full-stack",
      status: "completed",
      featured: true,
      demoUrl: "https://mi-ecommerce-demo.netlify.app",
      githubUrl: "https://github.com/usuario/ecommerce-project",
      startDate: "2024-01-15",
      endDate: "2024-03-20",
      challenges: [
        "Implementación de pagos seguros con Stripe",
        "Optimización de consultas a la base de datos",
        "Sistema de notificaciones en tiempo real"
      ],
      learnings: [
        "Integración de APIs de pago",
        "Manejo de estados complejos en React",
        "Arquitectura de microservicios"
      ]
    },
    
    {
      id: 2,
      title: "App de Gestión de Tareas",
      description: "Aplicación para gestión de proyectos y tareas con funcionalidades colaborativas y seguimiento de tiempo.",
      longDescription: "Herramienta de productividad desarrollada con Vue.js que permite crear proyectos, asignar tareas, hacer seguimiento del tiempo y colaborar en equipo. Incluye dashboard analítico, notificaciones push y sincronización en tiempo real.",
      image: "/assets/images/projects/task-manager-preview.jpg",
      gallery: [
        "/assets/images/projects/task-manager-1.jpg",
        "/assets/images/projects/task-manager-2.jpg"
      ],
      technologies: ["Vue.js", "Vuex", "Firebase", "Chart.js", "PWA", "Sass"],
      category: "frontend",
      status: "completed",
      featured: true,
      demoUrl: "https://task-manager-vue.vercel.app",
      githubUrl: "https://github.com/usuario/task-manager-vue",
      startDate: "2023-10-01",
      endDate: "2023-12-15",
      challenges: [
        "Sincronización en tiempo real con Firebase",
        "Implementación de PWA",
        "Diseño responsive complejo"
      ],
      learnings: [
        "Vue.js ecosystem",
        "Firebase Realtime Database",
        "Progressive Web Apps"
      ]
    },

    {
      id: 3,
      title: "API REST para Blog",
      description: "API robusta para gestión de contenido con autenticación, roles de usuario y documentación completa.",
      longDescription: "API RESTful desarrollada con Node.js y Express que proporciona endpoints completos para la gestión de un blog. Incluye autenticación JWT, sistema de roles, validación de datos, documentación con Swagger y testing automatizado.",
      image: "/assets/images/projects/blog-api-preview.jpg",
      technologies: ["Node.js", "Express", "MongoDB", "JWT", "Swagger", "Jest", "Helmet"],
      category: "backend",
      status: "completed",
      featured: true,
      demoUrl: "https://blog-api-docs.herokuapp.com",
      githubUrl: "https://github.com/usuario/blog-api",
      startDate: "2023-08-01",
      endDate: "2023-09-30",
      challenges: [
        "Implementación de middleware de seguridad",
        "Testing automatizado completo",
        "Documentación API con Swagger"
      ],
      learnings: [
        "Arquitectura RESTful",
        "Testing con Jest",
        "Documentación de APIs"
      ]
    }
  ],

  // Todos los proyectos
  all: [
    {
      id: 4,
      title: "Landing Page Corporativa",
      description: "Sitio web corporativo moderno con animaciones CSS y optimización SEO.",
      image: "/assets/images/projects/corporate-landing.jpg",
      technologies: ["HTML5", "CSS3", "JavaScript", "GSAP", "Webpack"],
      category: "frontend",
      status: "completed",
      featured: false,
      demoUrl: "https://corporate-landing-demo.netlify.app",
      githubUrl: "https://github.com/usuario/corporate-landing",
      startDate: "2023-07-01",
      endDate: "2023-07-15"
    },

    {
      id: 5,
      title: "Dashboard Analytics",
      description: "Panel de análisis de datos con gráficos interactivos y filtros avanzados.",
      image: "/assets/images/projects/analytics-dashboard.jpg",
      technologies: ["React", "D3.js", "Material-UI", "TypeScript"],
      category: "frontend",
      status: "in-progress",
      featured: false,
      demoUrl: "https://analytics-dashboard-demo.vercel.app",
      githubUrl: "https://github.com/usuario/analytics-dashboard",
      startDate: "2024-04-01",
      endDate: null
    },

    {
      id: 6,
      title: "Chat en Tiempo Real",
      description: "Aplicación de chat con salas privadas, emojis y notificaciones push.",
      image: "/assets/images/projects/realtime-chat.jpg",
      technologies: ["Socket.io", "React", "Node.js", "Redis", "JWT"],
      category: "full-stack",
      status: "completed",
      featured: false,
      demoUrl: "https://realtime-chat-app.herokuapp.com",
      githubUrl: "https://github.com/usuario/realtime-chat",
      startDate: "2023-05-01",
      endDate: "2023-06-15"
    },

    {
      id: 7,
      title: "API de Clima",
      description: "Microservicio para consultar datos meteorológicos con caché Redis.",
      image: "/assets/images/projects/weather-api.jpg",
      technologies: ["Python", "FastAPI", "Redis", "Docker", "PostgreSQL"],
      category: "backend",
      status: "completed",
      featured: false,
      demoUrl: "https://weather-api-docs.herokuapp.com",
      githubUrl: "https://github.com/usuario/weather-api",
      startDate: "2023-11-01",
      endDate: "2023-11-20"
    },

    {
      id: 8,
      title: "Generador de QR Codes",
      description: "Herramienta web para generar códigos QR personalizados con diferentes estilos.",
      image: "/assets/images/projects/qr-generator.jpg",
      technologies: ["JavaScript", "Canvas API", "HTML5", "CSS3"],
      category: "frontend",
      status: "completed",
      featured: false,
      demoUrl: "https://qr-generator-tool.netlify.app",
      githubUrl: "https://github.com/usuario/qr-generator",
      startDate: "2023-04-15",
      endDate: "2023-04-25"
    }
  ],

  // Categorías de proyectos
  categories: [
    {
      id: "all",
      name: "Todos",
      count: 8
    },
    {
      id: "full-stack",
      name: "Full Stack",
      count: 2
    },
    {
      id: "frontend",
      name: "Frontend",
      count: 4
    },
    {
      id: "backend",
      name: "Backend",
      count: 2
    }
  ],

  // Estados de proyectos
  statuses: {
    "completed": {
      name: "Completado",
      color: "#10B981",
      icon: "check-circle"
    },
    "in-progress": {
      name: "En Progreso",
      color: "#F59E0B",
      icon: "clock"
    },
    "planned": {
      name: "Planificado",
      color: "#6B7280",
      icon: "calendar"
    }
  },

  filters: {
    enableSearch: true,
    enableCategoryFilter: true,
    enableTechnologyFilter: true,
    enableStatusFilter: true,
    enableDateSort: true
  }
};