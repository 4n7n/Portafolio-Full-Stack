/**
 * Datos de contacto e información personal
 * Configuración centralizada para formularios y comunicación
 * IMPORTANTE: No incluir datos sensibles reales en este archivo
 */

export const CONTACT_DATA = {
  // Información personal pública
  personal: {
    name: "Anthony Bonilla Paredes",
    firstName: "Anthony",
    lastName: "Bonilla Paredes",
    title: "Desarrollador Web Full Stack",
    subtitle: "Especialista en Stack MERN - Graduado The Bridge",
    tagline: "Transformando ideas en soluciones web innovadoras",
    email: "anthonybonillaparedes7@gmail.com", // Email real público
    emailDisplay: "anthonybonillaparedes7@gmail.com",
    phone: null, // No exponer teléfono público
    phoneDisplay: "Disponible por email",
    location: "España",
    locationSpecific: "Asturias, España",
    timezone: "Europe/Madrid",
    avatar: "./assets/images/profile/avatar.jpg",
    avatarAlt: "Foto de perfil de Anthony Bonilla",
    heroImage: "./assets/images/profile/hero-bg.jpg",
    
    // Estado profesional
    availability: "Disponible para nuevas oportunidades",
    status: "Graduado reciente - The Bridge",
    workType: ["Tiempo completo", "Freelance", "Remoto"],
    yearsExperience: 1.5,
    projectsCompleted: 8,
    bootcampHours: 480,
    
    // Preferencias profesionales
    preferences: {
      workRemote: true,
      workOnsite: true,
      workHybrid: true,
      travelWillingness: "Nacional",
      contractTypes: ["full-time", "part-time", "freelance", "contract"],
      noticePeriod: "Inmediata",
      salaryExpectation: "Según experiencia y responsabilidades"
    },

    // Elevator pitch
    pitch: "Desarrollador Full Stack recién graduado de The Bridge con 480 horas de formación intensiva en stack MERN. Especializado en crear aplicaciones web modernas, escalables y optimizadas. Experiencia práctica en 8+ proyectos reales, desde e-commerce hasta dashboards analíticos.",
    
    // Objetivos profesionales
    goals: [
      "Contribuir en proyectos innovadores con tecnologías modernas",
      "Continuar creciendo como desarrollador Full Stack",
      "Aplicar metodologías ágiles en equipos colaborativos",
      "Crear soluciones que generen impacto real en los usuarios"
    ]
  },
  
  // Redes sociales y presencia digital
  social: [
    {
      id: "github",
      name: "GitHub",
      url: "https://github.com/anthony-bonilla", // Placeholder - actualizar con real
      icon: "./assets/images/icons/social/github.svg",
      username: "@anthony-bonilla",
      handle: "anthony-bonilla",
      description: "Repositorios y proyectos de código abierto",
      primary: true,
      verified: true,
      followerCount: null,
      lastActive: "2025-01-15",
      stats: {
        repositories: "15+",
        commits: "500+",
        languages: ["JavaScript", "React", "Node.js"]
      }
    },
    {
      id: "linkedin", 
      name: "LinkedIn",
      url: "https://linkedin.com/in/anthony-bonilla-paredes", // Placeholder
      icon: "./assets/images/icons/social/linkedin.svg",
      username: "Anthony Bonilla Paredes",
      handle: "anthony-bonilla-paredes",
      description: "Perfil profesional y networking",
      primary: true,
      verified: false,
      followerCount: null,
      lastActive: "2025-01-15",
      stats: {
        connections: "100+",
        endorsements: "10+",
        recommendations: "3"
      }
    },
    {
      id: "x",
      name: "X (Twitter)",
      url: "https://x.com/anthony_bonilla", // Placeholder
      icon: "./assets/images/icons/social/x.svg",
      username: "@anthony_bonilla",
      handle: "anthony_bonilla",
      description: "Actualizaciones tech y aprendizaje continuo",
      primary: false,
      verified: false,
      followerCount: null,
      lastActive: "2025-01-10",
      stats: {
        tweets: "50+",
        following: "200+",
        lists: "Tech & Development"
      }
    },
    {
      id: "instagram",
      name: "Instagram",
      url: "https://instagram.com/anthony_bonilla", // Placeholder
      icon: "./assets/images/icons/social/instagram.svg", 
      username: "@anthony_bonilla",
      handle: "anthony_bonilla",
      description: "Vida personal y behind-the-scenes de proyectos",
      primary: false,
      verified: false,
      followerCount: null,
      lastActive: "2025-01-05",
      stats: {
        posts: "25+",
        stories: "Weekly",
        highlights: ["Coding", "Projects", "Learning"]
      }
    },
    {
      id: "email",
      name: "Email",
      url: "mailto:anthonybonillaparedes7@gmail.com",
      icon: "./assets/images/icons/social/gmail.svg",
      username: "anthonybonillaparedes7@gmail.com",
      handle: "email",
      description: "Contacto directo profesional",
      primary: true,
      verified: true,
      responseTime: "< 24 horas",
      availability: "Lun - Vie, 9AM - 6PM CET"
    }
  ],

  // Información de contacto estructurada
  contactInfo: [
    {
      id: "email",
      type: "email",
      label: "Email",
      value: "anthonybonillaparedes7@gmail.com",
      displayValue: "anthonybonillaparedes7@gmail.com",
      icon: "./assets/images/icons/contact/message.svg",
      href: "mailto:anthonybonillaparedes7@gmail.com",
      primary: true,
      public: true,
      description: "Respuesta garantizada en 24h",
      bestFor: "Consultas profesionales y oportunidades laborales",
      responseTime: "< 24 horas",
      availability: "24/7"
    },
    {
      id: "phone", 
      type: "phone",
      label: "Teléfono",
      value: null, // No exponer número real
      displayValue: "Disponible por email",
      icon: "./assets/images/icons/contact/phone.svg",
      href: null,
      primary: false,
      public: false,
      description: "Contacto telefónico previa coordinación",
      bestFor: "Entrevistas y reuniones programadas",
      responseTime: "Por cita previa",
      availability: "Lun - Vie, 9AM - 6PM CET"
    },
    {
      id: "location",
      type: "location",
      label: "Ubicación", 
      value: "Asturias, España",
      displayValue: "Asturias, España",
      icon: "./assets/images/icons/contact/location.svg",
      href: "https://maps.google.com/?q=Asturias,Spain",
      primary: false,
      public: true,
      description: "Trabajo remoto disponible globalmente",
      bestFor: "Reuniones presenciales en Asturias",
      responseTime: "N/A",
      availability: "Flexible"
    },
    {
      id: "calendar",
      type: "calendar",
      label: "Disponibilidad",
      value: "Lun - Vie, 9AM - 6PM CET",
      displayValue: "Lun - Vie, 9AM - 6PM",
      icon: "./assets/images/icons/contact/calendar.svg", 
      href: "#calendar", // Link a calendario de citas
      primary: false,
      public: true,
      description: "Zona horaria española (CET/CEST)",
      bestFor: "Programar reuniones y llamadas",
      responseTime: "Confirmación en 2-4h",
      availability: "Horario laboral español"
    },
    {
      id: "timezone",
      type: "timezone",
      label: "Zona Horaria",
      value: "Europe/Madrid",
      displayValue: "UTC+1 (CET)",
      icon: "./assets/images/icons/contact/clock.svg",
      href: "https://time.is/Madrid",
      primary: false,
      public: true,
      description: "Hora actual en España",
      bestFor: "Coordinar reuniones internacionales",
      responseTime: "N/A",
      availability: "Flexible para colaboración global"
    }
  ],

  // Documentos descargables
  documents: [
    {
      id: "cv-es",
      name: "CV Español",
      title: "Currículum Vitae - Anthony Bonilla",
      description: "Currículum vitae completo en español con experiencia y formación",
      file: "./assets/documents/cv-anthony-bonilla-es.pdf",
      icon: "./assets/images/icons/ui/download.svg",
      size: "PDF, 250KB",
      pages: 2,
      language: "es",
      category: "cv",
      lastUpdated: "2025-01-15",
      version: "v2.1",
      downloadCount: 0,
      public: true
    },
    {
      id: "cv-en",
      name: "CV English", 
      title: "Resume - Anthony Bonilla",
      description: "Complete resume in English with experience and education",
      file: "./assets/documents/cv-anthony-bonilla-en.pdf",
      icon: "./assets/images/icons/ui/download.svg",
      size: "PDF, 250KB",
      pages: 2,
      language: "en",
      category: "cv",
      lastUpdated: "2025-01-15",
      version: "v2.1",
      downloadCount: 0,
      public: true
    },
    {
      id: "portfolio-pdf",
      name: "Portfolio PDF",
      title: "Portfolio Completo - Anthony Bonilla",
      description: "Portafolio completo con proyectos, tecnologías y experiencia",
      file: "./assets/documents/portfolio-anthony-bonilla.pdf", 
      icon: "./assets/images/icons/ui/download.svg",
      size: "PDF, 8MB",
      pages: 15,
      language: "es",
      category: "portfolio",
      lastUpdated: "2025-01-15",
      version: "v1.3",
      downloadCount: 0,
      public: true
    },
    {
      id: "certificate-thebridge",
      name: "Certificado The Bridge",
      title: "Certificado Desarrollo Web Full Stack",
      description: "Certificado oficial del bootcamp The Bridge - 480 horas",
      file: "./assets/documents/Anthony-Bonilla-certificado_desarrollo_web_full_stack_bbk.pdf",
      icon: "./assets/images/icons/ui/certificate.svg",
      size: "PDF, 1.2MB",
      pages: 1,
      language: "es",
      category: "certificate",
      lastUpdated: "2025-02-07",
      version: "Original",
      downloadCount: 0,
      public: true,
      issuer: "The Bridge Digital Talent Accelerator",
      credentialId: "BBKTB-2025-DFS-001",
      verificationUrl: "https://thebridge.tech/verify"
    },
    {
      id: "tech-stack",
      name: "Tech Stack Guide",
      title: "Guía de Tecnologías - Anthony Bonilla",
      description: "Guía detallada de tecnologías dominadas y nivel de competencia",
      file: "./assets/documents/tech-stack-anthony-bonilla.pdf",
      icon: "./assets/images/icons/ui/code.svg",
      size: "PDF, 500KB",
      pages: 3,
      language: "es",
      category: "reference",
      lastUpdated: "2025-01-15",
      version: "v1.1",
      downloadCount: 0,
      public: true
    }
  ],

  // Información educativa para credibilidad
  education: {
    id: "thebridge-fullstack",
    title: "Desarrollador Full Stack Certificado",
    subtitle: "Graduado con Excelencia",
    institution: "The Bridge Digital Talent Accelerator",
    partner: "BBK (Banco Bilbao Vizcaya)",
    logo: "./assets/images/institutions/The_Bridge.svg",
    logoAlt: "Logo de The Bridge Digital Talent Accelerator",
    duration: "480 horas",
    startDate: "2024-09-01",
    endDate: "2025-02-07",
    completed: "07 de Febrero de 2025",
    format: "Presencial + Online",
    location: "Bilbao, España",
    stack: "MERN (MongoDB, Express, React, Node.js)",
    grade: "Excelente",
    employabilityRate: 96,
    graduatesSalary: "25K-35K€",
    certificate: "./assets/images/certificates/Anthony-Bonillla-certificado_desarrollo_web_full_stack_bbk.jpg",
    website: "https://thebridge.tech",
    description: "Bootcamp intensivo especializado en desarrollo Full Stack con metodologías ágiles",
    
    highlights: [
      "480 horas de formación práctica intensiva",
      "Graduado con calificación de Excelencia",
      "8+ proyectos reales desarrollados",
      "Metodologías ágiles (Scrum)",
      "96% de empleabilidad de graduados",
      "Programa de empleabilidad incluido"
    ],
    
    coreSkills: [
      "Stack MERN completo (MongoDB, Express, React, Node.js)",
      "Desarrollo Frontend moderno con React + Hooks",
      "APIs REST robustas con Node.js/Express",
      "Bases de datos SQL (MySQL) y NoSQL (MongoDB)",
      "DevOps básico con Docker y despliegue",
      "Testing automatizado con Jest",
      "Control de versiones avanzado con Git",
      "Metodologías ágiles y trabajo en equipo"
    ],
    
    curriculum: [
      { module: "Fundamentos Web", hours: 80, topics: ["HTML5", "CSS3", "JavaScript ES6+"] },
      { module: "React Frontend", hours: 120, topics: ["React", "Hooks", "Router", "Context"] },
      { module: "Node.js Backend", hours: 100, topics: ["Node.js", "Express", "APIs", "JWT"] },
      { module: "Bases de Datos", hours: 80, topics: ["MySQL", "MongoDB", "ORMs"] },
      { module: "DevOps & Deploy", hours: 60, topics: ["Docker", "Git", "Cloud Deploy"] },
      { module: "Proyecto Final", hours: 40, topics: ["Full Stack App", "Metodologías Ágiles"] }
    ]
  },

  // Configuración del formulario de contacto
  form: {
    id: "contact-form",
    title: "Contacta conmigo",
    subtitle: "¿Tienes un proyecto en mente? ¡Hablemos!",
    description: "Cuéntame sobre tu proyecto y veamos cómo puedo ayudarte a hacerlo realidad",
    
    // Campos del formulario
    fields: [
      {
        id: "name",
        name: "name",
        type: "text",
        label: "Nombre completo *",
        placeholder: "Tu nombre completo",
        required: true,
        minLength: 2,
        maxLength: 100,
        validation: {
          pattern: "^[a-zA-ZÀ-ÿ\\u00f1\\u00d1\\s]+$",
          message: "Solo se permiten letras y espacios"
        },
        autocomplete: "name",
        ariaLabel: "Introduce tu nombre completo"
      },
      {
        id: "email",
        name: "email",
        type: "email", 
        label: "Email *",
        placeholder: "tu@email.com",
        required: true,
        validation: {
          pattern: "^[^@\\s]+@[^@\\s]+\\.[^@\\s]+$",
          message: "Introduce un email válido"
        },
        autocomplete: "email",
        ariaLabel: "Introduce tu dirección de email"
      },
      {
        id: "company",
        name: "company",
        type: "text",
        label: "Empresa / Organización",
        placeholder: "Tu empresa (opcional)",
        required: false,
        maxLength: 150,
        autocomplete: "organization",
        ariaLabel: "Nombre de tu empresa u organización"
      },
      {
        id: "subject",
        name: "subject",
        type: "select",
        label: "Tipo de consulta *",
        required: true,
        placeholder: "Selecciona el tipo de consulta",
        options: [
          { value: "", text: "¿En qué puedo ayudarte?" },
          { value: "job-fulltime", text: "💼 Oportunidad laboral - Tiempo completo" },
          { value: "job-parttime", text: "⏰ Oportunidad laboral - Medio tiempo" },
          { value: "freelance-web", text: "🌐 Proyecto freelance - Desarrollo web" },
          { value: "freelance-app", text: "📱 Proyecto freelance - Aplicación" },
          { value: "collaboration", text: "🤝 Colaboración técnica" },
          { value: "consultation", text: "💡 Consultoría / Asesoramiento" },
          { value: "mentoring", text: "🎓 Mentoría técnica" },
          { value: "speaking", text: "🎤 Charla / Presentación" },
          { value: "other", text: "❓ Otra consulta" }
        ],
        ariaLabel: "Selecciona el tipo de consulta"
      },
      {
        id: "budget",
        name: "budget",
        type: "select",
        label: "Presupuesto estimado",
        required: false,
        placeholder: "Presupuesto del proyecto (opcional)",
        options: [
          { value: "", text: "No especificado" },
          { value: "micro", text: "< 500€ (Proyecto pequeño)" },
          { value: "small", text: "500€ - 2.000€ (Proyecto básico)" },
          { value: "medium", text: "2.000€ - 5.000€ (Proyecto medio)" },
          { value: "large", text: "5.000€ - 15.000€ (Proyecto grande)" },
          { value: "enterprise", text: "> 15.000€ (Proyecto enterprise)" },
          { value: "hourly", text: "💰 Trabajo por horas" },
          { value: "discuss", text: "💬 A discutir" }
        ],
        ariaLabel: "Selecciona el rango de presupuesto estimado"
      },
      {
        id: "timeline",
        name: "timeline",
        type: "select",
        label: "Timeline del proyecto",
        required: false,
        placeholder: "¿Para cuándo necesitas el proyecto?",
        options: [
          { value: "", text: "No especificado" },
          { value: "urgent", text: "🚨 Urgente (< 1 semana)" },
          { value: "short", text: "⚡ Corto plazo (1-4 semanas)" },
          { value: "medium", text: "📅 Medio plazo (1-3 meses)" },
          { value: "long", text: "📆 Largo plazo (3+ meses)" },
          { value: "flexible", text: "🔄 Flexible" }
        ],
        ariaLabel: "Selecciona el timeline del proyecto"
      },
      {
        id: "technologies",
        name: "technologies",
        type: "checkbox-group",
        label: "Tecnologías de interés",
        required: false,
        description: "Selecciona las tecnologías relevantes para tu proyecto",
        options: [
          { value: "react", text: "React", category: "frontend" },
          { value: "nodejs", text: "Node.js", category: "backend" },
          { value: "mongodb", text: "MongoDB", category: "database" },
          { value: "mysql", text: "MySQL", category: "database" },
          { value: "express", text: "Express.js", category: "backend" },
          { value: "javascript", text: "JavaScript", category: "language" },
          { value: "typescript", text: "TypeScript", category: "language" },
          { value: "docker", text: "Docker", category: "devops" },
          { value: "api", text: "APIs REST", category: "backend" },
          { value: "ecommerce", text: "E-commerce", category: "solution" },
          { value: "dashboard", text: "Dashboard", category: "solution" },
          { value: "mobile", text: "Mobile-first", category: "approach" }
        ],
        maxSelections: 6,
        ariaLabel: "Selecciona las tecnologías relevantes"
      },
      {
        id: "message",
        name: "message",
        type: "textarea",
        label: "Mensaje *",
        placeholder: "Cuéntame sobre tu proyecto...\n\n• ¿Qué quieres construir?\n• ¿Cuáles son tus objetivos?\n• ¿Tienes algún diseño o referencia?\n• ¿Hay algún deadline importante?\n\n¡Comparte todos los detalles que consideres relevantes!",
        required: true,
        rows: 8,
        minLength: 50,
        maxLength: 2000,
        characterCount: true,
        autocomplete: "off",
        ariaLabel: "Describe tu proyecto en detalle"
      },
      {
        id: "newsletter",
        name: "newsletter",
        type: "checkbox",
        label: "📬 Mantenerme informado",
        description: "Quiero recibir actualizaciones ocasionales sobre nuevos proyectos y contenido técnico",
        required: false,
        defaultChecked: false,
        ariaLabel: "Suscribirse a newsletter"
      },
      {
        id: "privacy",
        name: "privacy",
        type: "checkbox",
        label: "Acepto la política de privacidad *",
        description: "He leído y acepto el tratamiento de mis datos según la política de privacidad",
        required: true,
        defaultChecked: false,
        linkText: "Leer política de privacidad",
        linkUrl: "#privacy-policy",
        ariaLabel: "Aceptar política de privacidad"
      }
    ],
    
    // Configuración de EmailJS (variables de entorno en producción)
    emailService: {
      serviceId: process.env.EMAILJS_SERVICE_ID || "service_portfolio",
      templateId: process.env.EMAILJS_TEMPLATE_ID || "template_contact",
      publicKey: process.env.EMAILJS_PUBLIC_KEY || "your_public_key_here",
      // Configuración adicional
      settings: {
        enableAutoReply: true,
        enableNotifications: true,
        rateLimitPerHour: 10,
        enableSpamFilter: true
      }
    },

    // Mensajes del formulario
    messages: {
      sending: "📤 Enviando mensaje...",
      success: "✅ ¡Mensaje enviado correctamente!\n\nTe responderé en las próximas 24 horas. Mientras tanto, puedes revisar mi portfolio o conectar conmigo en LinkedIn.",
      error: "❌ Error al enviar el mensaje.\n\nPor favor, inténtalo de nuevo o contáctame directamente en: anthonybonillaparedes7@gmail.com",
      rateLimit: "⏰ Has enviado muchos mensajes recientemente.\n\nPor favor, espera un momento antes de enviar otro mensaje.",
      
      validation: {
        name: "👤 Por favor, introduce tu nombre completo (mínimo 2 caracteres)",
        email: "📧 Por favor, introduce un email válido",
        subject: "📋 Por favor, selecciona el tipo de consulta",
        message: "💬 Por favor, describe tu proyecto (mínimo 50 caracteres)",
        privacy: "✅ Debes aceptar la política de privacidad para continuar",
        general: "⚠️ Por favor, revisa los campos marcados en rojo"
      },
      
      autoReply: {
        subject: "✅ Mensaje recibido - Anthony Bonilla",
        content: `¡Hola [NAME]!

Gracias por contactarme. He recibido tu mensaje sobre "[SUBJECT]" y te responderé en las próximas 24 horas.

Mientras tanto, puedes:
• Revisar mi portfolio: [PORTFOLIO_URL]
• Conectar en LinkedIn: [LINKEDIN_URL]
• Ver mis proyectos en GitHub: [GITHUB_URL]

¡Hablamos pronto!

Anthony Bonilla
Desarrollador Full Stack`
      }
    },

    // Configuración adicional
    settings: {
      enableAutoReply: true,
      enableNotifications: true,
      enableAnalytics: true,
      maxFileSize: "10MB",
      allowedFileTypes: [".pdf", ".doc", ".docx", ".txt", ".png", ".jpg"],
      enableCaptcha: false, // Implementar en producción
      enableHoneypot: true,
      submitCooldown: 3000, // 3 segundos
      enableProgressSave: true, // Guardar progreso localmente
      enableFieldValidation: true,
      enableRealTimeValidation: false
    }
  },

  // Servicios ofrecidos
  services: [
    {
      id: "fullstack-development",
      title: "Desarrollo Full Stack",
      subtitle: "Aplicaciones web completas",
      description: "Desarrollo de aplicaciones web end-to-end con stack MERN (MongoDB, Express, React, Node.js)",
      icon: "./assets/images/icons/services/fullstack.svg",
      technologies: ["React", "Node.js", "MongoDB", "Express", "TypeScript"],
      features: [
        "Frontend moderno con React",
        "Backend robusto con Node.js",
        "Base de datos optimizada",
        "APIs REST seguras",
        "Deploy y DevOps",
        "Testing automatizado"
      ],
      timeframe: "4-16 semanas",
      priceRange: "€€€",
      startingPrice: "2.500€",
      ideal: "Startups y empresas que necesitan aplicaciones completas",
      examples: ["E-commerce", "SaaS", "Dashboards", "Plataformas web"],
      process: [
        "Análisis de requerimientos",
        "Diseño de arquitectura",
        "Desarrollo iterativo",
        "Testing y optimización",
        "Deploy y documentación"
      ]
    },
    {
      id: "frontend-development",
      title: "Frontend Development", 
      subtitle: "Interfaces modernas y responsivas",
      description: "Desarrollo de interfaces de usuario modernas, responsivas y optimizadas con React y tecnologías frontend",
      icon: "./assets/images/icons/services/frontend.svg",
      technologies: ["React", "JavaScript", "CSS3", "HTML5", "Bootstrap", "Sass"],
      features: [
        "Diseño responsive (mobile-first)",
        "Componentes reutilizables",
        "Optimización de rendimiento",
        "Accesibilidad (WCAG)",
        "SEO optimizado",
        "Cross-browser compatibility"
      ],
      timeframe: "2-8 semanas",
      priceRange: "€€",
      startingPrice: "800€",
      ideal: "Empresas que necesitan modernizar su frontend",
      examples: ["Landing pages", "Dashboards", "PWAs", "Redesign web"],
      process: [
        "Análisis de diseño/mockups",
        "Setup del proyecto",
        "Desarrollo de componentes",
        "Testing responsive",
        "Optimización y deploy"
      ]
    },
    {
      id: "backend-api",
      title: "Backend & APIs",
      subtitle: "APIs robustas y escalables",
      description: "Desarrollo de backends potentes y APIs REST seguras con Node.js, Express y bases de datos",
      icon: "./assets/images/icons/services/backend.svg",
      technologies: ["Node.js", "Express", "MongoDB", "MySQL", "JWT", "Docker"],
      features: [
        "APIs REST bien documentadas",
        "Autenticación y autorización",
        "Base de datos optimizada",
        "Validación de datos",
        "Logging y monitoreo",
        "Documentación Swagger"
      ],
      timeframe: "3-10 semanas",
      priceRange: "€€",
      startingPrice: "1.200€",
      ideal: "Aplicaciones que necesitan backend robusto",
      examples: ["APIs REST", "Microservicios", "Sistemas de auth", "Integraciones"],
      process: [
        "Diseño de arquitectura",
        "Modelado de datos",
        "Desarrollo de endpoints",
        "Testing y documentación",
        "Deploy y monitoreo"
      ]
    },
    {
      id: "technical-consulting",
      title: "Consultoría Técnica",
      subtitle: "Asesoramiento especializado",
      description: "Asesoramiento técnico en arquitectura, code review, optimización y mejores prácticas de desarrollo",
      icon: "./assets/images/icons/services/consulting.svg",
      technologies: ["Architecture", "Code Review", "Performance", "Security", "Best Practices"],
      features: [
        "Auditoría de código",
        "Optimización de rendimiento",
        "Recomendaciones de arquitectura",
        "Migración de tecnologías",
        "Formación del equipo",
        "Implementación de CI/CD"
      ],
      timeframe: "Por horas/días",
      priceRange: "€",
      startingPrice: "50€/hora",
      ideal: "Equipos que necesitan orientación técnica",
      examples: ["Code review", "Arquitectura", "Performance", "Migración tech"],
      process: [
        "Análisis de la situación actual",
        "Identificación de mejoras",
        "Recomendaciones específicas",
        "Implementación guiada",
        "Seguimiento y optimización"
      ]
    },
    {
      id: "website-optimization",
      title: "Optimización Web",
      subtitle: "Performance y SEO",
      description: "Optimización de sitios web existentes para mejorar velocidad, SEO y experiencia de usuario",
      icon: "./assets/images/icons/services/optimization.svg",
      technologies: ["Performance", "SEO", "Analytics", "Lighthouse", "Core Web Vitals"],
      features: [
        "Análisis de rendimiento",
        "Optimización de velocidad",
        "SEO técnico",
        "Mejoras de accesibilidad",
        "Monitoreo continuo",
        "Reportes detallados"
      ],
      timeframe: "1-4 semanas",
      priceRange: "€",
      startingPrice: "400€",
      ideal: "Sitios web que necesitan mejorar su rendimiento",
      examples: ["Speed optimization", "SEO audit", "Accessibility", "Core Web Vitals"],
      process: [
        "Auditoría completa",
        "Identificación de problemas",
        "Implementación de mejoras",
        "Testing y validación",
        "Monitoreo post-optimización"
      ]
    }
  ],

  // Call-to-action principal
  cta: {
    id: "main-cta",
    title: "¿Tienes un proyecto en mente?",
    subtitle: "Transformemos tu idea en realidad",
    description: "Como desarrollador Full Stack especializado en MERN, puedo llevar tu proyecto desde el concepto inicial hasta el deployment final. Mi formación intensiva en The Bridge y experiencia en proyectos reales me han preparado para crear soluciones modernas, escalables y orientadas al usuario.",
    
    highlights: [
      "✅ Graduado con Excelencia de The Bridge (480h)",
      "✅ Especialista en Stack MERN",
      "✅ 8+ proyectos reales completados",
      "✅ Enfoque en calidad y mejores prácticas",
      "✅ Comunicación transparente y continua",
      "✅ Soporte post-entrega incluido"
    ],
    
    primaryButton: {
      text: "Contactar ahora",
      action: "openContactForm",
      icon: "./assets/images/icons/ui/message.svg",
      href: "#contact-form"
    },
    
    secondaryButton: {
      text: "Ver proyectos",
      action: "scrollToProjects", 
      icon: "./assets/images/icons/ui/folder.svg",
      href: "#projects"
    },
    
    tertiaryButton: {
      text: "Descargar CV",
      action: "downloadCV",
      icon: "./assets/images/icons/ui/download.svg",
      href: "./assets/documents/cv-anthony-bonilla-es.pdf"
    },
    
    socialProof: {
      text: "Únete a clientes satisfechos",
      metric: "96% satisfacción",
      testimonialCount: 8
    },
    
    urgency: null, // No presión de urgencia falsa
    guarantee: "Garantía de satisfacción en primeros proyectos"
  },

  // Estadísticas para credibilidad
  stats: [
    {
      id: "bootcamp-hours",
      number: 480,
      label: "Horas intensivas",
      description: "Formación práctica en The Bridge",
      icon: "./assets/images/icons/ui/clock.svg",
      category: "education",
      highlight: true
    },
    {
      id: "employability",
      number: 96,
      label: "% Empleabilidad",
      description: "Tasa de graduados The Bridge",
      icon: "./assets/images/icons/ui/trending-up.svg",
      category: "education",
      highlight: true
    },
    {
      id: "technologies",
      number: 25,
      label: "Tecnologías",
      description: "Stack completo dominado",
      icon: "./assets/images/icons/ui/code.svg",
      category: "technical",
      highlight: true
    },
    {
      id: "projects",
      number: 8,
      label: "Proyectos",
      description: "Portfolio activo y diverso",
      icon: "./assets/images/icons/ui/folder.svg",
      category: "experience",
      highlight: true
    },
    {
      id: "commits",
      number: 500,
      label: "Commits",
      description: "Actividad en GitHub",
      icon: "./assets/images/icons/ui/git.svg",
      category: "activity",
      highlight: false,
      suffix: "+"
    },
    {
      id: "lines-code",
      number: 50,
      label: "K líneas",
      description: "Código escrito",
      icon: "./assets/images/icons/ui/terminal.svg",
      category: "technical",
      highlight: false,
      suffix: "K+"
    }
  ],

  // FAQ frecuentes
  faq: [
    {
      id: "technologies",
      question: "¿Qué tecnologías manejas?",
      answer: "Me especializo en el stack MERN (MongoDB, Express, React, Node.js) que aprendí durante mi formación intensiva de 480 horas en The Bridge. También manejo MySQL, TypeScript, Docker, testing con Jest, y herramientas DevOps básicas. Mi enfoque está en JavaScript/Node.js tanto en frontend como backend.",
      category: "technical",
      tags: ["MERN", "JavaScript", "React", "Node.js", "MongoDB"],
      priority: 1
    },
    {
      id: "remote-work",
      question: "¿Trabajas en proyectos remotos?",
      answer: "Absolutamente. Estoy completamente preparado para trabajo 100% remoto. Durante mi formación trabajé con metodologías ágiles, herramientas de colaboración como Git, y tengo experiencia en comunicación efectiva con equipos distribuidos. Mi horario es flexible para colaboración internacional.",
      category: "work",
      tags: ["remoto", "agile", "colaboración", "internacional"],
      priority: 1
    },
    {
      id: "pricing",
      question: "¿Cuáles son tus tarifas?",
      answer: "Mis tarifas varían según la complejidad y alcance del proyecto. Para proyectos Full Stack desde 2.500€, Frontend desde 800€, Backend desde 1.200€, y consultoría desde 50€/hora. Ofrezco tanto proyectos a precio fijo como trabajo por horas. Cada proyecto incluye una consulta inicial gratuita para evaluar necesidades y presupuesto.",
      category: "pricing",
      tags: ["tarifas", "presupuesto", "precio fijo", "por horas"],
      priority: 1
    },
    {
      id: "support",
      question: "¿Ofreces soporte post-desarrollo?",
      answer: "Sí, todos mis proyectos incluyen un período de soporte post-entrega (usualmente 30 días) para resolver bugs menores y dudas. También ofrezco planes de mantenimiento continuo que incluyen actualizaciones, mejoras de seguridad, y nuevas funcionalidades. El objetivo es establecer relaciones a largo plazo con mis clientes.",
      category: "support",
      tags: ["soporte", "mantenimiento", "bugs", "actualizaciones"],
      priority: 2
    },
    {
      id: "timeline",
      question: "¿Cuánto tiempo toma un proyecto típico?",
      answer: "Los timelines varían según la complejidad: Landing pages 1-2 semanas, aplicaciones Frontend 2-8 semanas, proyectos Full Stack 4-16 semanas. Trabajo con metodología ágil, entregando incrementos funcionales cada 1-2 semanas para mantener feedback continuo y asegurar que el proyecto va en la dirección correcta.",
      category: "timeline",
      tags: ["timeline", "metodología ágil", "entrega incremental"],
      priority: 2
    },
    {
      id: "experience-level",
      question: "¿Cuál es tu nivel de experiencia?",
      answer: "Soy un desarrollador junior con formación intensiva sólida. Completé 480 horas de bootcamp en The Bridge graduándome con Excelencia, y he desarrollado 8+ proyectos reales. Mi fortaleza está en la base técnica sólida, capacidad de aprendizaje rápido, y aplicación de mejores prácticas desde el inicio. Ideal para proyectos que valoran calidad y comunicación transparente.",
      category: "experience",
      tags: ["junior", "formación", "proyectos", "calidad"],
      priority: 1
    },
    {
      id: "communication",
      question: "¿Cómo es tu proceso de comunicación?",
      answer: "Mantengo comunicación transparente y regular. Uso herramientas como Slack/Discord para chat diario, reuniones semanales por videollamada, y reportes de progreso cada viernes. También proporciono acceso al repositorio GitHub para que puedas ver el progreso en tiempo real. Mi política es: no hay sorpresas, todo se comunica claramente.",
      category: "process",
      tags: ["comunicación", "transparencia", "reportes", "GitHub"],
      priority: 2
    },
    {
      id: "design",
      question: "¿Necesito tener el diseño listo?",
      answer: "No es necesario. Puedo trabajar con wireframes básicos, referencias de sitios que te gusten, o incluso solo una descripción de lo que necesitas. Si tienes diseños en Figma/Sketch, perfecto. Si no, puedo crear mockups básicos o recomendar colaboradores diseñadores para proyectos que requieran diseño más elaborado.",
      category: "design",
      tags: ["diseño", "mockups", "Figma", "wireframes"],
      priority: 2
    }
  ],

  // Testimonials placeholder (referencia a TESTIMONIALS_DATA)
  testimonials: {
    featured: [1, 2, 3], // IDs de testimonios destacados
    total: 8,
    averageRating: 4.8,
    showInContact: true,
    maxDisplay: 3
  },

  // Configuración de privacidad y GDPR
  privacy: {
    dataRetention: "Los datos se almacenan solo el tiempo necesario para responder consultas",
    dataUsage: "Solo uso los datos para responder a tu consulta y posible colaboración",
    sharing: "Nunca comparto datos personales con terceros",
    rights: "Puedes solicitar eliminación de tus datos en cualquier momento",
    contact: "anthonybonillaparedes7@gmail.com",
    lastUpdated: "2025-01-15",
    gdprCompliant: true,
    cookiePolicy: "Solo cookies técnicas necesarias, sin tracking",
    newsletter: {
      frequency: "Máximo 1 email al mes",
      content: "Actualizaciones de proyectos y contenido técnico",
      unsubscribe: "Fácil cancelación en cualquier momento"
    }
  },

  // Configuración de analytics y tracking
  analytics: {
    enableFormTracking: true,
    enableDownloadTracking: true,
    enableSocialTracking: false, // Respetar privacidad
    enableHeatmaps: false,
    provider: "self-hosted", // No Google Analytics por privacidad
    events: [
      "form_submit",
      "form_error", 
      "cv_download",
      "portfolio_download",
      "social_click",
      "service_inquiry"
    ]
  },

  // Meta información para SEO
  meta: {
    title: "Contacto - Anthony Bonilla | Desarrollador Full Stack",
    description: "Contacta conmigo para tu próximo proyecto web. Desarrollador Full Stack especializado en MERN, graduado de The Bridge con 480h de formación intensiva.",
    keywords: "desarrollador full stack, MERN, React, Node.js, contacto, freelance, España",
    ogTitle: "Anthony Bonilla - Desarrollador Full Stack | Contacto",
    ogDescription: "¿Tienes un proyecto en mente? Especialista en MERN Stack con formación intensiva. ¡Hablemos!",
    ogImage: "./assets/images/og/contact-anthony-bonilla.jpg",
    canonicalUrl: "https://anthonybonilla.dev/contacto",
    structuredData: {
      "@context": "https://schema.org",
      "@type": "Person",
      "name": "Anthony Bonilla Paredes",
      "jobTitle": "Desarrollador Web Full Stack",
      "email": "anthonybonillaparedes7@gmail.com",
      "url": "https://anthonybonilla.dev",
      "sameAs": [
        "https://github.com/anthony-bonilla",
        "https://linkedin.com/in/anthony-bonilla-paredes"
      ],
      "alumniOf": {
        "@type": "EducationalOrganization",
        "name": "The Bridge Digital Talent Accelerator"
      },
      "knowsAbout": ["JavaScript", "React", "Node.js", "MongoDB", "Full Stack Development"]
    }
  }
};

/**
 * Utilidades para trabajar con datos de contacto
 */
export const contactUtils = {
  /**
   * Obtener información de contacto por tipo
   */
  getContactByType: (type) => {
    return CONTACT_DATA.contactInfo.find(contact => contact.type === type);
  },

  /**
   * Obtener redes sociales principales
   */
  getPrimarySocial: () => {
    return CONTACT_DATA.social.filter(social => social.primary === true);
  },

  /**
   * Obtener documentos por categoría
   */
  getDocumentsByCategory: (category) => {
    return CONTACT_DATA.documents.filter(doc => doc.category === category);
  },

  /**
   * Obtener servicios por rango de precio
   */
  getServicesByPrice: (priceRange) => {
    return CONTACT_DATA.services.filter(service => service.priceRange === priceRange);
  },

  /**
   * Validar formulario de contacto
   */
  validateForm: (formData) => {
    const errors = {};
    const fields = CONTACT_DATA.form.fields;

    fields.forEach(field => {
      const value = formData[field.name];
      
      if (field.required && (!value || value.trim() === '')) {
        errors[field.name] = CONTACT_DATA.form.messages.validation[field.name] || `${field.label} es requerido`;
      }

      if (value && field.minLength && value.length < field.minLength) {
        errors[field.name] = `${field.label} debe tener al menos ${field.minLength} caracteres`;
      }

      if (value && field.maxLength && value.length > field.maxLength) {
        errors[field.name] = `${field.label} no puede exceder ${field.maxLength} caracteres`;
      }

      if (value && field.validation && field.validation.pattern) {
        const regex = new RegExp(field.validation.pattern);
        if (!regex.test(value)) {
          errors[field.name] = field.validation.message;
        }
      }
    });

    return {
      isValid: Object.keys(errors).length === 0,
      errors
    };
  },

  /**
   * Formatear datos del formulario para envío
   */
  formatFormData: (formData) => {
    return {
      ...formData,
      timestamp: new Date().toISOString(),
      source: 'portfolio_website',
      userAgent: navigator.userAgent,
      timezone: Intl.DateTimeFormat().resolvedOptions().timeZone
    };
  },

  /**
   * Obtener FAQ por categoría
   */
  getFAQByCategory: (category) => {
    return CONTACT_DATA.faq.filter(item => item.category === category);
  },

  /**
   * Buscar en FAQ
   */
  searchFAQ: (query) => {
    const searchTerm = query.toLowerCase();
    return CONTACT_DATA.faq.filter(item =>
      item.question.toLowerCase().includes(searchTerm) ||
      item.answer.toLowerCase().includes(searchTerm) ||
      item.tags.some(tag => tag.toLowerCase().includes(searchTerm))
    );
  },

  /**
   * Obtener estadísticas por categoría
   */
  getStatsByCategory: (category) => {
    return CONTACT_DATA.stats.filter(stat => stat.category === category);
  },

  /**
   * Calcular tiempo de respuesta estimado
   */
  getResponseTime: (inquiryType) => {
    const responseMap = {
      'job-fulltime': '4-8 horas',
      'job-parttime': '4-8 horas', 
      'freelance-web': '2-4 horas',
      'freelance-app': '2-4 horas',
      'collaboration': '12-24 horas',
      'consultation': '24 horas',
      'mentoring': '24-48 horas',
      'speaking': '48 horas',
      'other': '24 horas'
    };
    
    return responseMap[inquiryType] || '24 horas';
  },

  /**
   * Generar enlace de WhatsApp (si se decide agregar)
   */
  generateWhatsAppLink: (message = '') => {
    const defaultMessage = "Hola Anthony, me interesa hablar sobre un proyecto web...";
    const phone = ""; // No exponer número público
    const encodedMessage = encodeURIComponent(message || defaultMessage);
    return phone ? `https://wa.me/${phone}?text=${encodedMessage}` : null;
  },

  /**
   * Obtener información de disponibilidad actual
   */
  getAvailabilityStatus: () => {
    const now = new Date();
    const hour = now.getHours();
    const day = now.getDay(); // 0 = domingo

    // Horario laboral: Lun-Vie 9AM-6PM CET
    if (day >= 1 && day <= 5 && hour >= 9 && hour < 18) {
      return {
        status: 'available',
        message: 'Disponible ahora',
        nextAvailable: null,
        responseTime: '2-4 horas'
      };
    } else {
      const nextWorkDay = day === 6 ? 2 : day === 0 ? 1 : 1; // Lunes
      return {
        status: 'away',
        message: 'Fuera del horario laboral',
        nextAvailable: 'Próximo día laboral 9AM CET',
        responseTime: '< 24 horas'
      };
    }
  },

  /**
   * Registrar interacción para analytics
   */
  trackInteraction: (event, data = {}) => {
    if (!CONTACT_DATA.analytics.enableFormTracking) return;
    
    // Implementar tracking sin comprometer privacidad
    console.log('Analytics Event:', { event, data, timestamp: new Date().toISOString() });
  }
};

export default CONTACT_DATA;