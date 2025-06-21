/**
 * Configuración del Portfolio - ANTHONY BONILLA PAREDES
 * Versión corregida y optimizada con validación y fallbacks
 */

export const PORTFOLIO_CONFIG = {
  // Información personal - ANTHONY BONILLA PAREDES
  personal: {
    name: "Anthony Bonilla Paredes",
    title: "Desarrollador Web Full Stack",
    subtitle: "Especialista en Stack MERN",
    email: "anthonybonillaparedes7@gmail.com",
    phone: "+34 624 42 56 67",
    location: "España",
    timezone: "Europe/Madrid",
    languages: ["Español (Nativo)", "Inglés (Intermedio)"],
    linkedIn: "https://linkedin.com/in/anthony-bonilla-paredes",
    github: "https://github.com/anthony-bonilla",
    website: "https://anthony-portfolio.com",
    avatar: "./assets/images/profile/avatar.jpg",
    heroImage: "./assets/images/profile/hero-bg.jpg",
    aboutImage: "./assets/images/profile/about-me.jpg",
    // Fallbacks para imágenes
    fallbackImages: {
      avatar: "./assets/images/profile/default-avatar.jpg",
      heroImage: "./assets/images/profile/default-hero.jpg",
      aboutImage: "./assets/images/profile/default-about.jpg"
    },
    // Configuración de bio
    bio: {
      short: "Desarrollador Full Stack apasionado por crear soluciones web innovadoras",
      long: "Desarrollador Full Stack especializado en MERN Stack con formación intensiva en The Bridge. Me apasiona crear experiencias web que combinan diseño intuitivo con código limpio y eficiente."
    }
  },

  // Certificación oficial con validación
  education: {
    bootcamp: {
      name: "Desarrollo Web Full Stack",
      institution: "The Bridge Digital Talent Accelerator",
      duration: "480 horas",
      completed: "07 de Febrero de 2025",
      completedTimestamp: new Date("2025-02-07").getTime(),
      logo: "./assets/images/institutions/The_Bridge.svg",
      certificate: "./assets/images/certificates/Anthony-Bonillla-certificado_desarrollo_web_full_stack_bbk.jpg",
      document: "./assets/documents/Anthony Bonillla certificado_desarrollo_web_full_stack_bbk.pdf",
      stack: "MERN",
      employability: 96, // Número en lugar de string
      description: "Bootcamp intensivo con metodologías ágiles, proyectos reales y programa de empleabilidad",
      skills: [
        "React & Frontend Development",
        "Node.js & Express Backend",
        "MongoDB & MySQL Databases",
        "RESTful API Development",
        "Git & Version Control",
        "Testing & Quality Assurance",
        "DevOps & Deployment",
        "Agile Methodologies"
      ],
      website: "https://www.thebridge.tech/",
      verified: true
    },
    // Educación adicional si existe
    additional: [
      {
        type: "course",
        name: "JavaScript Avanzado",
        institution: "Online",
        completed: "2024",
        verified: false
      }
    ]
  },

  // Configuración de imágenes y recursos con validación
  assets: {
    // Configuración base para assets
    baseUrl: "./assets/",
    fallbackIcon: "./assets/images/icons/ui/default.svg",
    
    // Logos de tecnologías por categoría
    technologies: {
      frontend: {
        basePath: "./assets/images/technologies/frontend/",
        fallbackPath: "./assets/images/technologies/fallback.svg",
        logos: {
          html5: "html5.svg",
          css3: "css.svg", 
          javascript: "javascript.svg",
          react: "react.svg",
          reactRouter: "reactrouter.svg",
          chartjs: "chartdotjs.svg",
          bootstrap: "bootstrap.svg",
          sass: "sass.svg",
          webpack: "webpack.svg",
          babel: "babel.svg",
          d3js: "d3.svg"
        }
      },
      backend: {
        basePath: "./assets/images/technologies/backend/",
        fallbackPath: "./assets/images/technologies/fallback.svg",
        logos: {
          nodejs: "nodedotjs.svg",
          express: "express.svg",
          npm: "npm.svg",
          jwt: "jsonwebtokens.svg",
          bcrypt: "bcrypt.svg",
          nodemon: "nodemon.svg"
        }
      },
      databases: {
        basePath: "./assets/images/technologies/databases/",
        fallbackPath: "./assets/images/technologies/fallback.svg",
        logos: {
          mysql: "mysql.svg",
          mongodb: "mongodb.svg",
          sequelize: "sequelize.svg"
        }
      },
      devops: {
        basePath: "./assets/images/technologies/devops/",
        fallbackPath: "./assets/images/technologies/fallback.svg",
        logos: {
          docker: "docker.svg",
          kubernetes: "kubernetes.svg", 
          jenkins: "jenkins.svg",
          heroku: "heroku.svg",
          firebase: "firebase.svg"
        }
      },
      tools: {
        basePath: "./assets/images/technologies/tools/",
        fallbackPath: "./assets/images/technologies/fallback.svg",
        logos: {
          git: "git.svg",
          github: "github.svg",
          vscode: "vscode.svg",
          bash: "gnubash.svg",
          swagger: "swagger.svg",
          jest: "jest.svg",
          postman: "postman.svg",
          ssh: "ssh.svg",
          virtualbox: "virtualbox.svg"
        }
      }
    },

    // Íconos de interfaz - RUTAS VALIDADAS
    icons: {
      social: {
        basePath: "./assets/images/icons/social/",
        fallbackIcon: "./assets/images/icons/ui/default.svg",
        icons: {
          github: "github.svg",
          linkedin: "linkedin.svg",
          twitter: "x.svg", // CORREGIDO
          instagram: "instagram.svg",
          email: "gmail.svg" // CORREGIDO
        }
      },
      contact: {
        basePath: "./assets/images/icons/contact/",
        fallbackIcon: "./assets/images/icons/ui/default.svg",
        icons: {
          phone: "phone.svg",
          location: "placeholder.svg", // CORREGIDO
          calendar: "calendar.svg",
          message: "chat.svg" // CORREGIDO
        }
      },
      ui: {
        basePath: "./assets/images/icons/ui/",
        fallbackIcon: "./assets/images/icons/ui/default.svg",
        icons: {
          menu: "menu.svg",
          close: "close-x.svg", // CORREGIDO
          arrowDown: "bottom-arrow.svg", // CORREGIDO
          arrowRight: "right-arrow.svg", // CORREGIDO
          download: "download-button.svg", // CORREGIDO
          externalLink: "external-link.svg",
          themeToggle: "dark-mode.svg" // CORREGIDO
        }
      }
    },

    // Imágenes de instituciones
    institutions: {
      basePath: "./assets/images/institutions/",
      fallbackLogo: "./assets/images/institutions/default.svg",
      logos: {
        theBridge: "The_Bridge.svg",
        bbk: "BBK.svg"
      }
    }
  },

  // Configuración de redes sociales - VALIDADAS
  social: {
    github: {
      url: "https://github.com/anthony-bonilla",
      username: "@anthony-bonilla",
      displayName: "Anthony Bonilla",
      icon: "./assets/images/icons/social/github.svg",
      verified: true,
      public: true
    },
    linkedin: {
      url: "https://linkedin.com/in/anthony-bonilla-paredes", 
      username: "Anthony Bonilla Paredes",
      displayName: "Anthony Bonilla",
      icon: "./assets/images/icons/social/linkedin.svg",
      verified: true,
      public: true
    },
    twitter: {
      url: "https://twitter.com/anthony_bonilla",
      username: "@anthony_bonilla",
      displayName: "Anthony Bonilla",
      icon: "./assets/images/icons/social/x.svg", // CORREGIDO
      verified: false,
      public: false // Opcional
    },
    instagram: {
      url: "https://instagram.com/anthony_bonilla",
      username: "@anthony_bonilla",
      displayName: "Anthony Bonilla",
      icon: "./assets/images/icons/social/instagram.svg",
      verified: false,
      public: false // Opcional
    }
  },

  // Información de contacto - VALIDADA
  contact: {
    info: [
      {
        id: "email",
        type: "email",
        label: "Email",
        value: "anthonybonillaparedes7@gmail.com",
        icon: "./assets/images/icons/social/gmail.svg", // CORREGIDO - usar gmail para email
        href: "mailto:anthonybonillaparedes7@gmail.com",
        primary: true,
        public: true,
        verified: true
      },
      {
        id: "phone",
        type: "phone",
        label: "Teléfono", 
        value: "+34 624 42 56 67",
        displayValue: "+34 624 42 56 67",
        icon: "./assets/images/icons/contact/phone.svg",
        href: "tel:+34624425667",
        primary: true,
        public: true,
        verified: true
      },
      {
        id: "location",
        type: "location",
        label: "Ubicación",
        value: "España",
        icon: "./assets/images/icons/contact/placeholder.svg", // CORREGIDO
        primary: false,
        public: true
      },
      {
        id: "availability",
        type: "availability",
        label: "Disponibilidad",
        value: "Disponible para nuevas oportunidades",
        icon: "./assets/images/icons/contact/calendar.svg",
        status: "available", // available, busy, unavailable
        lastUpdated: new Date().toISOString(),
        primary: false,
        public: true
      }
    ],
    
    // Documentos descargables - VALIDADOS
    documents: [
      {
        id: "cv-es",
        name: "CV Español",
        description: "Curriculum Vitae en español",
        file: "./assets/documents/cv-es.pdf",
        icon: "./assets/images/icons/ui/download-button.svg", // CORREGIDO
        language: "es",
        fileSize: "1.2 MB",
        lastUpdated: "2025-02-01",
        public: true
      },
      {
        id: "cv-en",
        name: "CV English",
        description: "Curriculum Vitae in English",
        file: "./assets/documents/cv-en.pdf",
        icon: "./assets/images/icons/ui/download-button.svg", // CORREGIDO
        language: "en",
        fileSize: "1.2 MB",
        lastUpdated: "2025-02-01",
        public: true
      },
      {
        id: "certificate-bridge",
        name: "Certificado The Bridge",
        description: "Certificado oficial de The Bridge Bootcamp",
        file: "./assets/documents/Anthony Bonillla certificado_desarrollo_web_full_stack_bbk.pdf",
        icon: "./assets/images/icons/ui/download-button.svg", // CORREGIDO
        language: "es",
        fileSize: "2.1 MB",
        lastUpdated: "2025-02-07",
        public: true,
        verified: true
      }
    ]
  },

  // Configuración de tema con validación
  theme: {
    defaultTheme: 'dark',
    enableSystemPreference: true,
    transitionDuration: 300,
    supportedThemes: ['light', 'dark', 'auto'],
    customColors: {
      primary: '#3b82f6',
      secondary: '#10b981',
      accent: '#f59e0b'
    },
    persistence: {
      enabled: true,
      storageKey: 'anthony-portfolio-theme'
    }
  },

  // Configuración de animaciones con validación
  animations: {
    enabled: true,
    respectReducedMotion: true,
    scrollReveal: {
      distance: '50px',
      duration: 800,
      delay: 100,
      easing: 'ease-out',
      reset: false,
      viewFactor: 0.1
    },
    typingEffect: {
      typeSpeed: 50,
      backSpeed: 30,
      backDelay: 2000,
      loop: true,
      showCursor: true,
      cursorChar: '|',
      strings: [
        "Desarrollador Full Stack",
        "Especialista en MERN Stack", 
        "Graduado de The Bridge",
        "Apasionado por JavaScript"
      ]
    },
    pageTransitions: {
      enabled: true,
      duration: 300,
      easing: 'ease-in-out'
    }
  },

  // Configuración de formulario de contacto
  contactForm: {
    enabled: true,
    emailService: 'emailjs',
    emailJsConfig: {
      serviceId: 'service_anthony',
      templateId: 'template_contact',
      publicKey: 'your_public_key'
    },
    recaptcha: {
      enabled: false,
      siteKey: 'your_recaptcha_site_key',
      version: 'v2' // v2 o v3
    },
    validation: {
      required: ['name', 'email', 'message'],
      maxLength: {
        name: 100,
        email: 254,
        subject: 200,
        message: 2000
      },
      patterns: {
        email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
        phone: /^[\+]?[1-9][\d]{0,15}$/
      }
    },
    rateLimit: {
      enabled: true,
      maxSubmissions: 3,
      timeWindow: 3600000 // 1 hora en ms
    }
  },

  // Configuración de API con validación
  api: {
    github: {
      username: 'anthony-bonilla',
      baseUrl: 'https://api.github.com',
      maxRepos: 6,
      excludeRepos: ['private-repo', 'config-files'],
      featured: ['mern-ecommerce', 'react-dashboard', 'fullstack-api'],
      sortBy: 'updated', // updated, created, pushed, full_name
      direction: 'desc', // asc, desc
      type: 'public', // all, public, private
      cacheTime: 300000 // 5 minutos en ms
    },
    rateLimit: {
      github: 60, // requests per hour
      emailjs: 5   // emails per hour
    }
  },

  // Configuración de SEO mejorada
  seo: {
    title: "Anthony Bonilla Paredes - Desarrollador Full Stack",
    titleTemplate: "%s | Anthony Bonilla - Portfolio",
    description: "Desarrollador Full Stack especializado en MERN Stack. Graduado de The Bridge con 480h de formación intensiva en tecnologías modernas.",
    keywords: [
      "Anthony Bonilla",
      "Desarrollador Full Stack", 
      "MERN Stack",
      "React",
      "Node.js",
      "MongoDB",
      "Express",
      "JavaScript",
      "The Bridge",
      "Bootcamp",
      "Frontend Developer",
      "Backend Developer",
      "Portfolio"
    ],
    ogImage: "./assets/images/profile/og-image.jpg",
    twitterImage: "./assets/images/profile/twitter-image.jpg",
    author: "Anthony Bonilla Paredes",
    canonical: "https://anthony-portfolio.com",
    language: "es",
    robots: "index, follow",
    sitemap: "/sitemap.xml",
    structuredData: {
      enabled: true,
      type: "Person",
      jobTitle: "Desarrollador Full Stack",
      worksFor: {
        name: "Freelance",
        type: "Organization"
      }
    }
  },

  // Configuración de la galería de proyectos
  projects: {
    itemsPerPage: 6,
    enableFiltering: true,
    enableSearch: true,
    enableLightbox: true,
    enableSorting: true,
    sortOptions: ['date', 'name', 'technology'],
    defaultSort: 'date',
    categories: [
      {
        id: "mern",
        name: "MERN Stack",
        color: "#61DAFB"
      },
      {
        id: "frontend",
        name: "Frontend",
        color: "#F7DF1E"
      },
      {
        id: "backend",
        name: "Backend",
        color: "#339933"
      },
      {
        id: "fullstack",
        name: "Full Stack",
        color: "#3B82F6"
      },
      {
        id: "api",
        name: "API REST",
        color: "#10B981"
      }
    ],
    technologies: [
      "React", "Node.js", "Express", "MongoDB", "MySQL",
      "JavaScript", "HTML5", "CSS3", "Bootstrap", "Sass"
    ]
  },

  // Configuración específica del bootcamp
  bootcampInfo: {
    stackFocus: "MERN",
    hoursCompleted: 480,
    graduated: "07/02/2025",
    graduatedTimestamp: new Date("2025-02-07").getTime(),
    employabilityRate: 96,
    methodology: "Agile",
    projectBased: true,
    location: "Madrid, España",
    mode: "Presencial",
    certification: "Certificado oficial",
    skills: [
      "Frontend con React",
      "Backend con Node.js/Express",
      "Bases de datos MySQL/MongoDB", 
      "DevOps con Docker",
      "Testing con Jest",
      "APIs REST",
      "Metodologías ágiles",
      "Git & Version Control",
      "Deployment & Production"
    ],
    projects: {
      individual: 3,
      group: 2,
      final: 1
    },
    statistics: {
      linesOfCode: 50000,
      commits: 500,
      repositories: 15,
      technologies: 20
    }
  },

  // Configuración de performance
  performance: {
    lazyLoading: {
      enabled: true,
      images: true,
      sections: true,
      threshold: 0.1
    },
    caching: {
      enabled: true,
      duration: 3600000, // 1 hora
      api: true,
      images: true
    },
    compression: {
      images: true,
      minify: true
    }
  },

  // Configuración de analytics
  analytics: {
    enabled: false, // Solo habilitar en producción
    provider: 'google', // google, plausible, custom
    trackingId: 'GA_TRACKING_ID',
    events: {
      contactForm: true,
      downloads: true,
      externalLinks: true,
      projectViews: true
    },
    privacy: {
      anonymizeIP: true,
      cookieConsent: true,
      respectDNT: true
    }
  },

  // Configuración de accesibilidad
  accessibility: {
    enabled: true,
    features: {
      skipLinks: true,
      altTexts: true,
      ariaLabels: true,
      keyboardNavigation: true,
      reducedMotion: true,
      highContrast: false,
      focusIndicators: true
    },
    announcements: {
      pageChanges: true,
      formErrors: true,
      dynamicContent: true
    }
  },

  // Validadores y utilidades
  validators: {
    /**
     * Valida configuración personal
     */
    validatePersonal(personal) {
      const required = ['name', 'title', 'email'];
      const missing = required.filter(field => !personal[field]);
      return {
        isValid: missing.length === 0,
        errors: missing.map(field => `Campo requerido: ${field}`)
      };
    },

    /**
     * Valida email
     */
    validateEmail(email) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return emailRegex.test(email);
    },

    /**
     * Valida URL
     */
    validateUrl(url) {
      try {
        new URL(url);
        return true;
      } catch {
        return false;
      }
    },

    /**
     * Sanitiza texto para prevenir XSS
     */
    sanitizeText(text) {
      if (typeof text !== 'string') return '';
      return text
        .replace(/[<>]/g, '')
        .replace(/javascript:/gi, '')
        .trim();
    }
  },

  // Utilidades
  utils: {
    /**
     * Obtiene URL completa de asset
     */
    getAssetUrl(category, subcategory, filename) {
      try {
        const basePath = this.assets[category]?.[subcategory]?.basePath;
        if (!basePath) return this.assets.fallbackIcon;
        return `${basePath}${filename}`;
      } catch (error) {
        console.warn('Error obteniendo asset URL:', error);
        return this.assets.fallbackIcon;
      }
    },

    /**
     * Obtiene información de contacto por tipo
     */
    getContactInfo(type) {
      return this.contact.info.find(item => item.type === type);
    },

    /**
     * Obtiene documentos públicos
     */
    getPublicDocuments() {
      return this.contact.documents.filter(doc => doc.public !== false);
    },

    /**
     * Obtiene redes sociales públicas
     */
    getPublicSocialLinks() {
      return Object.entries(this.social)
        .filter(([key, value]) => value.public !== false)
        .reduce((acc, [key, value]) => {
          acc[key] = value;
          return acc;
        }, {});
    },

    /**
     * Calcula edad desde fecha de nacimiento
     */
    calculateAge(birthDate) {
      if (!birthDate) return null;
      const today = new Date();
      const birth = new Date(birthDate);
      let age = today.getFullYear() - birth.getFullYear();
      const monthDiff = today.getMonth() - birth.getMonth();
      if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
        age--;
      }
      return age;
    }
  },

  // Metadatos de configuración
  meta: {
    version: "2.0.0",
    lastUpdated: new Date().toISOString(),
    author: "Anthony Bonilla Paredes",
    description: "Configuración del portfolio personal",
    environment: typeof window !== 'undefined' ? 'browser' : 'node'
  }
};

// Validación automática al cargar
(() => {
  try {
    const validation = PORTFOLIO_CONFIG.validators.validatePersonal(PORTFOLIO_CONFIG.personal);
    if (!validation.isValid) {
      console.warn('⚠️ Errores en configuración personal:', validation.errors);
    }
    
    // Validar email
    if (!PORTFOLIO_CONFIG.validators.validateEmail(PORTFOLIO_CONFIG.personal.email)) {
      console.warn('⚠️ Email inválido en configuración personal');
    }
    
    // Validar URLs sociales
    Object.entries(PORTFOLIO_CONFIG.social).forEach(([key, social]) => {
      if (social.public !== false && !PORTFOLIO_CONFIG.validators.validateUrl(social.url)) {
        console.warn(`⚠️ URL inválida para ${key}:`, social.url);
      }
    });
    
    console.log('✅ PORTFOLIO_CONFIG validado correctamente');
  } catch (error) {
    console.error('❌ Error validando PORTFOLIO_CONFIG:', error);
  }
})();

// Freeze configuraciones críticas para prevenir modificación accidental
Object.freeze(PORTFOLIO_CONFIG.personal);
Object.freeze(PORTFOLIO_CONFIG.education);
Object.freeze(PORTFOLIO_CONFIG.meta);

export default PORTFOLIO_CONFIG;