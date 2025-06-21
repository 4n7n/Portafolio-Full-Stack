/**
 * Datos de testimonios y reseñas de clientes
 * Estructura normalizada para mostrar credibilidad y experiencias
 */

export const TESTIMONIALS_DATA = {
  // Testimonios de clientes, colegas y mentores
  testimonials: [
    {
      id: 1,
      name: "María González",
      position: "Project Manager",
      company: "TechStart Solutions",
      companyLogo: "/assets/images/companies/techstart-logo.png",
      avatar: "/assets/images/testimonials/maria-gonzalez.jpg",
      avatarAlt: "Foto de perfil de María González",
      rating: 5,
      text: "Trabajar con Anthony ha sido una experiencia excepcional. Su capacidad para resolver problemas complejos y su atención al detalle son impresionantes. Siempre entrega código limpio y bien documentado, superando nuestras expectativas en cada sprint.",
      originalText: "Working with Anthony has been an exceptional experience. His ability to solve complex problems and attention to detail are impressive. He always delivers clean and well-documented code.",
      project: "Sistema de Gestión Empresarial",
      projectType: "full-stack",
      collaboration: "directo", // directo, remoto, equipo
      duration: "3 meses",
      date: "2024-02-15",
      featured: true,
      verified: true,
      public: true,
      tags: ["Profesionalismo", "Calidad de código", "Resolución de problemas", "Atención al detalle"],
      context: "Proyecto de modernización del sistema interno de gestión",
      outcome: "Reducción del 40% en tiempo de procesamiento",
      skills: ["React", "Node.js", "MongoDB", "Problem Solving"],
      relationship: "supervisor",
      linkedinUrl: "https://linkedin.com/in/maria-gonzalez-pm",
      contactInfo: {
        email: "maria.gonzalez@techstart.com",
        phone: "+34 600 123 456",
        available: true
      }
    },

    {
      id: 2,
      name: "Carlos Rodríguez",
      position: "CEO",
      company: "Digital Marketing Pro",
      companyLogo: "/assets/images/companies/dmp-logo.png",
      avatar: "/assets/images/testimonials/carlos-rodriguez.jpg",
      avatarAlt: "Foto de perfil de Carlos Rodríguez",
      rating: 5,
      text: "Las landing pages desarrolladas por Anthony han aumentado significativamente nuestras conversiones. Entiende perfectamente las necesidades del negocio y las traduce en soluciones técnicas efectivas. Su enfoque en UX y performance es excepcional.",
      project: "Landing Pages Corporativas",
      projectType: "frontend",
      collaboration: "remoto",
      duration: "6 meses",
      date: "2023-08-20",
      featured: true,
      verified: true,
      public: true,
      tags: ["Resultados medibles", "Comprensión del negocio", "Conversiones", "UX/UI"],
      context: "Desarrollo de 15+ landing pages para campañas de marketing",
      outcome: "Aumento del 25% en tasa de conversión promedio",
      skills: ["HTML5", "CSS3", "JavaScript", "SEO", "Conversion Optimization"],
      relationship: "cliente",
      linkedinUrl: "https://linkedin.com/in/carlos-rodriguez-ceo",
      contactInfo: {
        email: "carlos@digitalmarketingpro.es",
        phone: "+34 600 234 567",
        available: true
      }
    },

    {
      id: 3,
      name: "Ana Martín",
      position: "Senior Developer",
      company: "TechStart Solutions",
      companyLogo: "/assets/images/companies/techstart-logo.png",
      avatar: "/assets/images/testimonials/ana-martin.jpg",
      avatarAlt: "Foto de perfil de Ana Martín",
      rating: 5,
      text: "Como mentor de Anthony, puedo afirmar que es uno de los desarrolladores junior más prometedores que he conocido. Aprende increíblemente rápido, hace preguntas inteligentes y siempre está dispuesto a ayudar al equipo. Su evolución técnica ha sido impresionante.",
      project: "Mentoring y Colaboración en Equipo",
      projectType: "mentoring",
      collaboration: "equipo",
      duration: "8 meses",
      date: "2024-01-10",
      featured: true,
      verified: true,
      public: true,
      tags: ["Aprendizaje rápido", "Trabajo en equipo", "Potencial", "Mentoría"],
      context: "Proceso de onboarding y desarrollo profesional",
      outcome: "Promoción a desarrollador senior junior en 6 meses",
      skills: ["Learning Agility", "Teamwork", "Technical Growth", "Communication"],
      relationship: "mentor",
      linkedinUrl: "https://linkedin.com/in/ana-martin-dev",
      contactInfo: {
        email: "ana.martin@techstart.com",
        phone: "+34 600 345 678",
        available: true
      }
    },

    {
      id: 4,
      name: "David López",
      position: "UX/UI Designer",
      company: "Freelance",
      companyLogo: "/assets/images/companies/freelance-logo.png",
      avatar: "/assets/images/testimonials/david-lopez.jpg",
      avatarAlt: "Foto de perfil de David López",
      rating: 4,
      text: "Excelente colaboración en múltiples proyectos. Anthony traduce perfectamente los diseños de Figma a código y propone mejoras técnicas que benefician la experiencia del usuario. Su comunicación es fluida y siempre está abierto al feedback.",
      project: "Múltiples Proyectos Web",
      projectType: "frontend",
      collaboration: "remoto",
      duration: "1 año",
      date: "2023-11-05",
      featured: false,
      verified: true,
      public: true,
      tags: ["Colaboración", "Pixel perfect", "UX awareness", "Comunicación"],
      context: "Colaboración en 8+ proyectos de diseño web",
      outcome: "100% de diseños implementados fielmente",
      skills: ["HTML/CSS", "Responsive Design", "Figma", "Cross-browser Compatibility"],
      relationship: "colaborador",
      linkedinUrl: "https://linkedin.com/in/david-lopez-ux",
      contactInfo: {
        email: "david.lopez.design@gmail.com",
        phone: "+34 600 456 789",
        available: true
      }
    },

    {
      id: 5,
      name: "Laura Fernández",
      position: "Marketing Director",
      company: "StartUp Asturias",
      companyLogo: "/assets/images/companies/startup-asturias-logo.png",
      avatar: "/assets/images/testimonials/laura-fernandez.jpg",
      avatarAlt: "Foto de perfil de Laura Fernández",
      rating: 5,
      text: "Anthony desarrolló nuestra web corporativa superando todas las expectativas. El resultado es moderno, rápido y perfectamente optimizado para SEO. El proceso fue transparente, con updates regulares, y todos los plazos se cumplieron puntualmente.",
      project: "Sitio Web Corporativo",
      projectType: "frontend",
      collaboration: "directo",
      duration: "2 meses",
      date: "2023-07-12",
      featured: false,
      verified: true,
      public: true,
      tags: ["SEO", "Diseño moderno", "Cumplimiento de plazos", "Transparencia"],
      context: "Rediseño completo de la presencia web corporativa",
      outcome: "Mejora del 300% en tráfico orgánico en 3 meses",
      skills: ["SEO", "Performance Optimization", "Modern Design", "Project Management"],
      relationship: "cliente",
      linkedinUrl: "https://linkedin.com/in/laura-fernandez-marketing",
      contactInfo: {
        email: "laura@startupasturias.com",
        phone: "+34 600 567 890",
        available: true
      }
    },

    {
      id: 6,
      name: "Roberto Sánchez",
      position: "Technical Lead",
      company: "Innovación Digital Asturias",
      companyLogo: "/assets/images/companies/ida-logo.png",
      avatar: "/assets/images/testimonials/roberto-sanchez.jpg",
      avatarAlt: "Foto de perfil de Roberto Sánchez",
      rating: 4,
      text: "Durante su período de prácticas, Anthony demostró una capacidad de aprendizaje y adaptación extraordinaria. En solo 5 meses pasó de conocimientos básicos a contribuir significativamente en proyectos reales. Su actitud proactiva y profesionalismo son ejemplares.",
      project: "Período de Prácticas Profesionales",
      projectType: "internship",
      collaboration: "presencial",
      duration: "5 meses",
      date: "2023-02-28",
      featured: false,
      verified: true,
      public: true,
      tags: ["Prácticas", "Evolución técnica", "Adaptación", "Proactividad"],
      context: "Primer contacto profesional con desarrollo web",
      outcome: "Oferta de trabajo al finalizar las prácticas",
      skills: ["Learning Curve", "Professional Growth", "Technical Foundation"],
      relationship: "supervisor",
      linkedinUrl: "https://linkedin.com/in/roberto-sanchez-tech",
      contactInfo: {
        email: "roberto.sanchez@innovaciondigital.com",
        phone: "+34 600 678 901",
        available: true
      }
    },

    {
      id: 7,
      name: "Elena Vega",
      position: "Product Owner",
      company: "TechStart Solutions",
      companyLogo: "/assets/images/companies/techstart-logo.png",
      avatar: "/assets/images/testimonials/elena-vega.jpg",
      avatarAlt: "Foto de perfil de Elena Vega",
      rating: 5,
      text: "La capacidad de Anthony para entender los requirements del producto y traducirlos en features funcionales es excepcional. Siempre propone soluciones creativas y está muy enfocado en la experiencia del usuario final.",
      project: "E-Commerce Platform",
      projectType: "full-stack",
      collaboration: "equipo",
      duration: "4 meses",
      date: "2024-03-10",
      featured: false,
      verified: true,
      public: true,
      tags: ["Product Vision", "User Focus", "Creative Solutions", "Requirements Analysis"],
      context: "Desarrollo de funcionalidades clave del e-commerce",
      outcome: "Launch exitoso con 95% user satisfaction",
      skills: ["Product Development", "User Experience", "Feature Implementation"],
      relationship: "stakeholder",
      linkedinUrl: "https://linkedin.com/in/elena-vega-po",
      contactInfo: {
        email: "elena.vega@techstart.com",
        phone: "+34 600 789 012",
        available: true
      }
    },

    {
      id: 8,
      name: "Miguel Torres",
      position: "Compañero de Bootcamp",
      company: "The Bridge Digital Talent Accelerator",
      companyLogo: "/assets/images/institutions/The_Bridge.svg",
      avatar: "/assets/images/testimonials/miguel-torres.jpg",
      avatarAlt: "Foto de perfil de Miguel Torres",
      rating: 5,
      text: "Anthony fue un compañero excepcional durante el bootcamp. Siempre dispuesto a ayudar, explicar conceptos complejos y colaborar en proyectos grupales. Su dedication y conocimiento técnico eran evidentes desde el primer día.",
      project: "Bootcamp Full Stack Development",
      projectType: "education",
      collaboration: "equipo",
      duration: "5 meses",
      date: "2025-02-07",
      featured: false,
      verified: true,
      public: true,
      tags: ["Compañerismo", "Ayuda mutua", "Conocimiento técnico", "Colaboración"],
      context: "Compañeros de promoción en The Bridge",
      outcome: "Graduación exitosa de ambos",
      skills: ["Teamwork", "Knowledge Sharing", "Peer Support"],
      relationship: "compañero",
      linkedinUrl: "https://linkedin.com/in/miguel-torres-dev",
      contactInfo: {
        email: "miguel.torres.dev@gmail.com",
        phone: "+34 600 890 123",
        available: true
      }
    }
  ],

  // Estadísticas de testimonios
  stats: {
    totalTestimonials: 8,
    averageRating: 4.8,
    ratingDistribution: {
      5: 6,
      4: 2,
      3: 0,
      2: 0,
      1: 0
    },
    byProjectType: {
      "full-stack": 3,
      "frontend": 3,
      "mentoring": 1,
      "education": 1
    },
    byRelationship: {
      "cliente": 2,
      "supervisor": 2,
      "mentor": 1,
      "colaborador": 1,
      "stakeholder": 1,
      "compañero": 1
    },
    totalProjects: 18,
    clientSatisfaction: 96,
    repeatClients: 3,
    verifiedTestimonials: 8,
    publicTestimonials: 8,
    featuredTestimonials: 3,
    averageProjectDuration: "3.8 meses",
    totalCollaborationTime: "30+ meses"
  },

  // Configuración de visualización
  display: {
    showRatings: true,
    showAvatars: true,
    showCompanies: true,
    showCompanyLogos: true,
    showDates: true,
    showTags: true,
    showProjects: true,
    showOutcomes: true,
    showContactInfo: false, // Por privacidad
    maxTestimonialsPerPage: 3,
    autoRotate: true,
    rotationInterval: 6000, // 6 segundos
    enableNavigation: true,
    enableFilters: true,
    enableSearch: true,
    showVerificationBadge: true,
    lazyLoadImages: true,
    enableFullscreen: false
  },

  // Filtros disponibles
  filters: {
    byRating: {
      all: "Todas las valoraciones",
      5: "5 estrellas",
      4: "4+ estrellas",
      3: "3+ estrellas"
    },
    byCompany: {
      all: "Todas las empresas",
      "TechStart Solutions": "TechStart Solutions",
      "Digital Marketing Pro": "Digital Marketing Pro", 
      "Innovación Digital Asturias": "Innovación Digital Asturias",
      "The Bridge": "The Bridge",
      "Freelance": "Freelance",
      "StartUp Asturias": "StartUp Asturias"
    },
    byProjectType: {
      all: "Todos los tipos",
      "full-stack": "Full Stack",
      "frontend": "Frontend", 
      "backend": "Backend",
      "mentoring": "Mentoría",
      "education": "Formación"
    },
    byRelationship: {
      all: "Todas las relaciones",
      cliente: "Clientes",
      supervisor: "Supervisores",
      mentor: "Mentores",
      colaborador: "Colaboradores",
      compañero: "Compañeros"
    },
    byFeatured: {
      all: "Todos",
      featured: "Destacados",
      recent: "Recientes"
    },
    byVerification: {
      all: "Todos",
      verified: "Verificados",
      public: "Públicos"
    }
  },

  // Categorías para organización
  categories: {
    technical: {
      name: "Habilidades Técnicas",
      testimonialIds: [1, 3, 6, 8],
      description: "Testimonios sobre competencias técnicas y desarrollo"
    },
    business: {
      name: "Impacto en Negocio", 
      testimonialIds: [2, 5, 7],
      description: "Testimonios sobre resultados y valor empresarial"
    },
    collaboration: {
      name: "Colaboración",
      testimonialIds: [4, 6, 8],
      description: "Testimonios sobre trabajo en equipo y comunicación"
    },
    featured: {
      name: "Destacados",
      testimonialIds: [1, 2, 3],
      description: "Testimonios más relevantes y recientes"
    },
    leadership: {
      name: "Liderazgo",
      testimonialIds: [3, 7],
      description: "Testimonios sobre capacidades de liderazgo"
    },
    growth: {
      name: "Crecimiento",
      testimonialIds: [3, 6, 8],
      description: "Testimonios sobre evolución y aprendizaje"
    }
  },

  // Call to action
  cta: {
    title: "¿Trabajamos juntos?",
    subtitle: "Únete a estos clientes y colegas satisfechos",
    description: "Más de 8 profesionales han compartido su experiencia trabajando conmigo",
    buttonText: "Iniciar proyecto",
    buttonLink: "#contact",
    secondaryButtonText: "Ver portfolio",
    secondaryButtonLink: "#projects",
    socialProof: "96% de satisfacción del cliente",
    trustIndicators: [
      "Proyectos entregados a tiempo",
      "Comunicación transparente", 
      "Código de calidad",
      "Soporte post-entrega"
    ]
  },

  // Configuración de testimonios widget
  widget: {
    title: "Lo que dicen de mi trabajo",
    subtitle: "Experiencias reales de clientes y colaboradores",
    layout: "carousel", // carousel, grid, list
    theme: "modern", // modern, classic, minimal
    showNavigation: true,
    showIndicators: true,
    autoplay: true,
    pauseOnHover: true,
    showQuoteIcon: true,
    showStarRating: true,
    enableSocialShare: false,
    maxHeight: "400px",
    responsive: {
      mobile: { itemsPerSlide: 1 },
      tablet: { itemsPerSlide: 2 },
      desktop: { itemsPerSlide: 3 }
    }
  }
};

/**
 * Utilidades para trabajar con testimonios
 */
export const testimonialsUtils = {
  /**
   * Obtener testimonios por rating mínimo
   */
  getByMinRating: (minRating) => {
    return TESTIMONIALS_DATA.testimonials.filter(t => t.rating >= minRating);
  },

  /**
   * Obtener testimonios destacados
   */
  getFeatured: () => {
    return TESTIMONIALS_DATA.testimonials.filter(t => t.featured === true);
  },

  /**
   * Obtener testimonios por tipo de proyecto
   */
  getByProjectType: (projectType) => {
    return TESTIMONIALS_DATA.testimonials.filter(t => t.projectType === projectType);
  },

  /**
   * Obtener testimonios por empresa
   */
  getByCompany: (company) => {
    return TESTIMONIALS_DATA.testimonials.filter(t => t.company === company);
  },

  /**
   * Obtener testimonios por relación
   */
  getByRelationship: (relationship) => {
    return TESTIMONIALS_DATA.testimonials.filter(t => t.relationship === relationship);
  },

  /**
   * Obtener testimonios por categoría
   */
  getByCategory: (categoryId) => {
    const category = TESTIMONIALS_DATA.categories[categoryId];
    if (!category) return [];
    
    return TESTIMONIALS_DATA.testimonials.filter(t => 
      category.testimonialIds.includes(t.id)
    );
  },

  /**
   * Buscar testimonios por texto
   */
  search: (query) => {
    const searchTerm = query.toLowerCase();
    return TESTIMONIALS_DATA.testimonials.filter(testimonial =>
      testimonial.name.toLowerCase().includes(searchTerm) ||
      testimonial.company.toLowerCase().includes(searchTerm) ||
      testimonial.text.toLowerCase().includes(searchTerm) ||
      testimonial.tags.some(tag => tag.toLowerCase().includes(searchTerm))
    );
  },

  /**
   * Obtener testimonios recientes
   */
  getRecent: (months = 12) => {
    const cutoffDate = new Date();
    cutoffDate.setMonth(cutoffDate.getMonth() - months);
    
    return TESTIMONIALS_DATA.testimonials.filter(t => {
      return new Date(t.date) >= cutoffDate;
    }).sort((a, b) => new Date(b.date) - new Date(a.date));
  },

  /**
   * Ordenar testimonios
   */
  sort: (testimonials, sortBy = 'date', order = 'desc') => {
    return [...testimonials].sort((a, b) => {
      let aValue, bValue;
      
      switch (sortBy) {
        case 'name':
          aValue = a.name.toLowerCase();
          bValue = b.name.toLowerCase();
          break;
        case 'rating':
          aValue = a.rating;
          bValue = b.rating;
          break;
        case 'date':
          aValue = new Date(a.date);
          bValue = new Date(b.date);
          break;
        case 'company':
          aValue = a.company.toLowerCase();
          bValue = b.company.toLowerCase();
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
   * Calcular estadísticas
   */
  calculateStats: () => {
    const testimonials = TESTIMONIALS_DATA.testimonials;
    
    const stats = {
      total: testimonials.length,
      averageRating: (testimonials.reduce((acc, t) => acc + t.rating, 0) / testimonials.length).toFixed(1),
      featured: testimonials.filter(t => t.featured).length,
      verified: testimonials.filter(t => t.verified).length,
      byRating: {},
      byProjectType: {},
      byCompany: {},
      byRelationship: {},
      totalProjects: new Set(testimonials.map(t => t.project)).size
    };

    // Distribución por rating
    [1, 2, 3, 4, 5].forEach(rating => {
      stats.byRating[rating] = testimonials.filter(t => t.rating === rating).length;
    });

    // Distribución por tipo de proyecto
    testimonials.forEach(t => {
      stats.byProjectType[t.projectType] = (stats.byProjectType[t.projectType] || 0) + 1;
    });

    // Distribución por empresa
    testimonials.forEach(t => {
      stats.byCompany[t.company] = (stats.byCompany[t.company] || 0) + 1;
    });

    // Distribución por relación
    testimonials.forEach(t => {
      stats.byRelationship[t.relationship] = (stats.byRelationship[t.relationship] || 0) + 1;
    });

    return stats;
  },

  /**
   * Obtener testimonios randomizados
   */
  getRandom: (count = 3) => {
    const shuffled = [...TESTIMONIALS_DATA.testimonials].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
  },

  /**
   * Validar estructura de testimonio
   */
  validate: (testimonial) => {
    const required = ['id', 'name', 'position', 'company', 'rating', 'text', 'date'];
    const missing = required.filter(field => !testimonial[field]);
    
    const warnings = [];
    if (!testimonial.avatar) warnings.push('avatar');
    if (!testimonial.verified) warnings.push('verification');
    if (!testimonial.tags || testimonial.tags.length === 0) warnings.push('tags');
    if (!testimonial.outcome) warnings.push('outcome');

    return {
      isValid: missing.length === 0,
      missingFields: missing,
      warnings
    };
  },

  /**
   * Formatear testimonio para display
   */
  formatForDisplay: (testimonial, maxLength = 150) => {
    return {
      ...testimonial,
      shortText: testimonial.text.length > maxLength 
        ? testimonial.text.substring(0, maxLength) + '...'
        : testimonial.text,
      formattedDate: new Intl.DateTimeFormat('es-ES', {
        year: 'numeric',
        month: 'long'
      }).format(new Date(testimonial.date)),
      starRating: '★'.repeat(testimonial.rating) + '☆'.repeat(5 - testimonial.rating)
    };
  }
};

// Calcular estadísticas automáticamente
TESTIMONIALS_DATA.stats = {
  ...TESTIMONIALS_DATA.stats,
  ...testimonialsUtils.calculateStats()
};

export default TESTIMONIALS_DATA;