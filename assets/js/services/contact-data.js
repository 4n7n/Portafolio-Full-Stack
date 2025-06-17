// assets/js/data/contact-data.js
export const CONTACT_DATA = {
  // Información personal
  personal: {
    name: "Anthony Bonilla Paredes",
    title: "Desarrollador Web Full Stack",
    subtitle: "Especialista en Stack MERN - Graduado The Bridge",
    email: "anthony.bonilla@email.com",
    phone: "+34 XXX XXX XXX",
    location: "España",
    avatar: "./assets/images/profile/avatar.jpg",
    availability: "Disponible para nuevas oportunidades",
    yearsExperience: 1,
    projectsCompleted: 6
  },
  
  // Redes sociales con íconos
  social: [
    {
      name: "GitHub",
      url: "https://github.com/anthony-bonilla",
      icon: "./assets/images/icons/social/github.svg",
      username: "@anthony-bonilla",
      description: "Repositorios y proyectos de código",
      primary: true
    },
    {
      name: "LinkedIn", 
      url: "https://linkedin.com/in/anthony-bonilla-paredes",
      icon: "./assets/images/icons/social/linkedin.svg",
      username: "Anthony Bonilla",
      description: "Perfil profesional y networking",
      primary: true
    },
    {
      name: "Twitter",
      url: "https://twitter.com/anthony_bonilla", 
      icon: "./assets/images/icons/social/twitter.svg",
      username: "@anthony_bonilla",
      description: "Actualizaciones y tech news",
      primary: false
    },
    {
      name: "Instagram",
      url: "https://instagram.com/anthony_bonilla",
      icon: "./assets/images/icons/social/instagram.svg", 
      username: "@anthony_bonilla",
      description: "Vida personal y proyectos",
      primary: false
    },
    {
      name: "Email",
      url: "mailto:anthony.bonilla@email.com",
      icon: "./assets/images/icons/social/email.svg",
      username: "anthony.bonilla@email.com",
      description: "Contacto directo",
      primary: true
    }
  ],

  // Información de contacto con íconos
  contactInfo: [
    {
      type: "email",
      label: "Email",
      value: "anthony.bonilla@email.com",
      icon: "./assets/images/icons/contact/message.svg",
      href: "mailto:anthony.bonilla@email.com",
      primary: true,
      description: "Respuesta en 24h"
    },
    {
      type: "phone", 
      label: "Teléfono",
      value: "+34 XXX XXX XXX",
      icon: "./assets/images/icons/contact/phone.svg",
      href: "tel:+34XXXXXXXXX",
      primary: false,
      description: "Llamadas comerciales"
    },
    {
      type: "location",
      label: "Ubicación", 
      value: "España",
      icon: "./assets/images/icons/contact/location.svg",
      href: "#",
      primary: false,
      description: "Trabajo remoto disponible"
    },
    {
      type: "calendar",
      label: "Disponibilidad",
      value: "Lun - Vie, 9AM - 6PM",
      icon: "./assets/images/icons/contact/calendar.svg", 
      href: "#",
      primary: false,
      description: "Zona horaria española"
    }
  ],

  // Documentos descargables
  documents: [
    {
      name: "CV Español",
      description: "Currículum vitae en español",
      file: "./assets/documents/cv-es.pdf",
      icon: "./assets/images/icons/ui/download.svg",
      size: "PDF, 250KB",
      category: "cv"
    },
    {
      name: "CV English", 
      description: "Resume in English",
      file: "./assets/documents/cv-en.pdf",
      icon: "./assets/images/icons/ui/download.svg",
      size: "PDF, 250KB",
      category: "cv"
    },
    {
      name: "Portfolio PDF",
      description: "Portafolio completo en PDF",
      file: "./assets/documents/portfolio.pdf", 
      icon: "./assets/images/icons/ui/download.svg",
      size: "PDF, 5MB",
      category: "portfolio"
    },
    {
      name: "Certificado The Bridge",
      description: "Certificado oficial del bootcamp",
      file: "./assets/documents/Anthony Bonillla certificado_desarrollo_web_full_stack_bbk.pdf",
      icon: "./assets/images/icons/ui/download.svg",
      size: "PDF, 1MB",
      category: "certificate"
    }
  ],

  // Información del bootcamp para mostrar credibilidad
  education: {
    title: "Desarrollador Full Stack Certificado",
    institution: "The Bridge Digital Talent Accelerator",
    logo: "./assets/images/institutions/The_Bridge.svg",
    duration: "480 horas",
    completed: "07 de Febrero de 2025",
    stack: "MERN (MongoDB, Express, React, Node.js)",
    employability: "96%",
    certificate: "./assets/images/certificates/Anthony-Bonillla-certificado_desarrollo_web_full_stack_bbk.jpg",
    skills: [
      "Stack MERN completo",
      "Desarrollo Frontend con React",
      "APIs REST con Node.js/Express",
      "Bases de datos MySQL/MongoDB",
      "DevOps con Docker",
      "Testing con Jest"
    ]
  },

  // Configuración del formulario de contacto
  form: {
    // Campos del formulario
    fields: [
      {
        name: "name",
        type: "text",
        label: "Nombre completo",
        placeholder: "Tu nombre",
        required: true,
        minLength: 2,
        maxLength: 50
      },
      {
        name: "email",
        type: "email", 
        label: "Email",
        placeholder: "tu@email.com",
        required: true,
        pattern: "^[^@]+@[^@]+\\.[^@]+$"
      },
      {
        name: "company",
        type: "text",
        label: "Empresa (opcional)",
        placeholder: "Tu empresa",
        required: false,
        maxLength: 100
      },
      {
        name: "subject",
        type: "select",
        label: "Tipo de consulta",
        required: true,
        options: [
          { value: "", text: "Selecciona una opción" },
          { value: "job", text: "Oportunidad laboral" },
          { value: "freelance", text: "Proyecto freelance" },
          { value: "collaboration", text: "Colaboración" },
          { value: "consultation", text: "Consultoría técnica" },
          { value: "other", text: "Otra consulta" }
        ]
      },
      {
        name: "budget",
        type: "select",
        label: "Presupuesto estimado (opcional)",
        required: false,
        options: [
          { value: "", text: "No especificado" },
          { value: "small", text: "< 1.000€" },
          { value: "medium", text: "1.000€ - 5.000€" },
          { value: "large", text: "5.000€ - 10.000€" },
          { value: "enterprise", text: "> 10.000€" }
        ]
      },
      {
        name: "message",
        type: "textarea",
        label: "Mensaje",
        placeholder: "Cuéntame sobre tu proyecto o consulta. Incluye detalles sobre tecnologías, cronograma y objetivos...",
        required: true,
        rows: 6,
        minLength: 20,
        maxLength: 1000
      }
    ],
    
    // Configuración de EmailJS
    emailService: {
      serviceId: "service_anthony",
      templateId: "template_contact", 
      publicKey: "your_public_key_here"
    },

    // Mensajes del formulario
    messages: {
      sending: "Enviando mensaje...",
      success: "¡Mensaje enviado correctamente! Te responderé en las próximas 24 horas.",
      error: "Error al enviar el mensaje. Por favor, inténtalo de nuevo o contáctame directamente por email.",
      validation: {
        name: "Por favor, ingresa tu nombre (mínimo 2 caracteres)",
        email: "Por favor, ingresa un email válido",
        subject: "Por favor, selecciona el tipo de consulta",
        message: "Por favor, escribe tu mensaje (mínimo 20 caracteres)"
      }
    },

    // Configuración adicional
    settings: {
      enableAutoReply: true,
      enableNotifications: true,
      maxFileSize: "5MB",
      allowedFileTypes: [".pdf", ".doc", ".docx", ".txt"]
    }
  },

  // Servicios ofrecidos
  services: [
    {
      title: "Desarrollo Full Stack",
      description: "Aplicaciones web completas con MERN Stack",
      icon: "./assets/images/icons/ui/code.svg",
      technologies: ["React", "Node.js", "MongoDB", "Express"],
      timeframe: "4-12 semanas",
      priceRange: "€€€"
    },
    {
      title: "Frontend Development", 
      description: "Interfaces modernas y responsivas con React",
      icon: "./assets/images/icons/ui/layout.svg",
      technologies: ["React", "CSS3", "JavaScript", "Bootstrap"],
      timeframe: "2-6 semanas",
      priceRange: "€€"
    },
    {
      title: "Backend APIs",
      description: "APIs REST robustas con Node.js y Express",
      icon: "./assets/images/icons/ui/server.svg",
      technologies: ["Node.js", "Express", "MySQL", "MongoDB"],
      timeframe: "2-8 semanas",
      priceRange: "€€"
    },
    {
      title: "Consultoría Técnica",
      description: "Asesoramiento en arquitectura y mejores prácticas",
      icon: "./assets/images/icons/ui/lightbulb.svg",
      technologies: ["Architecture", "Code Review", "Performance"],
      timeframe: "Por horas",
      priceRange: "€"
    }
  ],

  // Call-to-action
  cta: {
    title: "¿Tienes un proyecto en mente?",
    subtitle: "Hablemos sobre cómo puedo ayudarte a hacerlo realidad",
    description: "Como desarrollador Full Stack especializado en MERN, puedo llevar tu idea desde el concepto hasta el deployment. Mi formación intensiva en The Bridge me ha preparado para crear soluciones modernas y escalables.",
    primaryButton: {
      text: "Contactar ahora",
      action: "openContactForm"
    },
    secondaryButton: {
      text: "Ver proyectos",
      action: "scrollToProjects"
    }
  },

  // Estadísticas para credibilidad
  stats: [
    {
      number: 480,
      label: "Horas de formación",
      description: "Bootcamp intensivo",
      icon: "./assets/images/icons/ui/clock.svg"
    },
    {
      number: 96,
      label: "% Empleabilidad",
      description: "The Bridge graduates",
      icon: "./assets/images/icons/ui/trending-up.svg"
    },
    {
      number: 25,
      label: "Tecnologías",
      description: "Stack completo",
      icon: "./assets/images/icons/ui/code.svg"
    },
    {
      number: 6,
      label: "Proyectos",
      description: "Portfolio activo",
      icon: "./assets/images/icons/ui/folder.svg"
    }
  ],

  // FAQ frecuentes
  faq: [
    {
      question: "¿Qué tecnologías manejas?",
      answer: "Me especializo en el stack MERN (MongoDB, Express, React, Node.js). También manejo MySQL, Docker, Testing con Jest, y herramientas DevOps básicas."
    },
    {
      question: "¿Trabajas en proyectos remotos?",
      answer: "Sí, estoy disponible para trabajo 100% remoto. Tengo experiencia colaborando con equipos distribuidos y usando metodologías ágiles."
    },
    {
      question: "¿Cuál es tu tarifa?",
      answer: "Mis tarifas varían según la complejidad del proyecto. Ofrezco tanto proyectos a precio fijo como trabajo por horas. Contacta para un presupuesto personalizado."
    },
    {
      question: "¿Ofreces mantenimiento post-desarrollo?",
      answer: "Sí, ofrezco planes de mantenimiento y soporte continuo para los proyectos que desarrollo. Incluye actualizaciones, bug fixes y mejoras menores."
    }
  ],

  // Testimonios (para futuro)
  testimonials: [
    {
      name: "Disponible pronto",
      role: "Cliente",
      company: "Empresa",
      text: "Los testimonios aparecerán aquí después de los primeros proyectos.",
      rating: 5,
      image: "./assets/images/testimonials/placeholder.jpg"
    }
  ]
};