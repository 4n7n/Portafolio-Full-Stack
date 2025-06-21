/**
 * Datos de experiencia profesional, educación y formación
 * Estructura normalizada para el portfolio
 */
export const EXPERIENCE_DATA = {
  // Experiencia profesional
  professional: [
    {
      id: 1,
      position: "Desarrollador Full Stack Junior",
      company: "TechStart Solutions",
      location: "Oviedo, Asturias",
      type: "full-time", // full-time, part-time, contract, internship
      startDate: "2023-09-01",
      endDate: null, // null = trabajo actual
      current: true,
      duration: null, // Se calculará automáticamente
      description: "Desarrollo de aplicaciones web completas utilizando tecnologías modernas como React, Node.js y MongoDB. Colaboración en equipo ágil para entregar soluciones innovadoras a clientes.",
      responsibilities: [
        "Desarrollo de interfaces de usuario con React y TypeScript",
        "Implementación de APIs RESTful con Node.js y Express",
        "Gestión de bases de datos MongoDB y optimización de consultas",
        "Colaboración en metodologías ágiles (Scrum)",
        "Code review y mentoring a desarrolladores junior",
        "Implementación de tests unitarios y de integración"
      ],
      achievements: [
        "Mejoré el rendimiento de la aplicación principal en un 40%",
        "Lideré la migración de JavaScript vanilla a React",
        "Implementé sistema de autenticación JWT seguro",
        "Reduje el tiempo de carga de páginas en un 35%"
      ],
      technologies: ["React", "TypeScript", "Node.js", "Express", "MongoDB", "Docker", "Git", "Jest"],
      skills: ["Frontend Development", "Backend Development", "Database Management", "Agile Methodologies"],
      logo: "/assets/images/companies/techstart-logo.png",
      website: "https://techstart-solutions.com",
      industry: "Technology",
      companySize: "startup" // startup, small, medium, large, enterprise
    },

    {
      id: 2,
      position: "Desarrollador Frontend",
      company: "Digital Marketing Pro",
      location: "Remoto",
      type: "part-time",
      startDate: "2023-03-01",
      endDate: "2023-08-31",
      current: false,
      duration: "6 meses",
      description: "Desarrollo de landing pages y sitios web corporativos optimizados para conversión y SEO. Trabajo freelance con múltiples clientes del sector marketing digital.",
      responsibilities: [
        "Maquetación de diseños responsivos con HTML5 y CSS3",
        "Implementación de animaciones CSS y JavaScript",
        "Optimización SEO y velocidad de carga",
        "Integración con herramientas de analytics y marketing",
        "Mantenimiento y actualización de sitios existentes"
      ],
      achievements: [
        "Aumenté la tasa de conversión promedio en un 25%",
        "Desarrollé 15+ landing pages de alta calidad",
        "Implementé sistema de A/B testing",
        "Mejoré el SEO score promedio a 95/100"
      ],
      technologies: ["HTML5", "CSS3", "JavaScript", "SASS", "Webpack", "Figma", "Google Analytics"],
      skills: ["Frontend Development", "SEO Optimization", "Conversion Optimization", "Web Performance"],
      logo: "/assets/images/companies/dmp-logo.png",
      website: "https://digitalmarketingpro.es",
      industry: "Digital Marketing",
      companySize: "small"
    },

    {
      id: 3,
      position: "Prácticas Desarrollador Web",
      company: "Innovación Digital Asturias",
      location: "Gijón, Asturias",
      type: "internship",
      startDate: "2022-10-01",
      endDate: "2023-02-28",
      current: false,
      duration: "5 meses",
      description: "Prácticas profesionales enfocadas en el desarrollo web frontend y backend. Primera experiencia profesional en el sector tecnológico.",
      responsibilities: [
        "Maquetación de componentes web con HTML y CSS",
        "Desarrollo de funcionalidades con JavaScript",
        "Apoyo en el mantenimiento de aplicaciones PHP",
        "Testing manual de aplicaciones web",
        "Documentación técnica de proyectos"
      ],
      achievements: [
        "Completé satisfactoriamente las 400 horas de prácticas",
        "Desarrollé mi primer proyecto completo",
        "Recibí oferta de trabajo al finalizar las prácticas",
        "Contribuí a 5 proyectos diferentes"
      ],
      technologies: ["HTML5", "CSS3", "JavaScript", "PHP", "MySQL", "Bootstrap", "Git"],
      skills: ["Web Development", "Database Management", "Testing", "Technical Documentation"],
      logo: "/assets/images/companies/ida-logo.png",
      website: "https://innovaciondigitalasturias.com",
      industry: "Technology Services",
      companySize: "medium"
    }
  ],

  // Educación formal
  education: [
    {
      id: 1,
      degree: "Técnico Superior en Desarrollo de Aplicaciones Web (DAW)",
      institution: "IES San Juan Bautista",
      location: "Oviedo, Asturias",
      type: "higher_vocational", // higher_vocational, bachelor, master, phd
      level: "Grado Superior",
      startDate: "2021-09-01",
      endDate: "2023-06-30",
      current: false,
      duration: "2 años",
      grade: "8.5/10",
      gradeScale: "10",
      status: "completed",
      description: "Formación profesional especializada en desarrollo web full-stack, bases de datos y metodologías de desarrollo.",
      curriculum: [
        "Programación Web Frontend (HTML, CSS, JavaScript)",
        "Programación Web Backend (PHP, Java, Python)",
        "Bases de Datos (MySQL, PostgreSQL)",
        "Frameworks Web (Laravel, Spring Boot)",
        "Metodologías de Desarrollo Ágil",
        "Diseño de Interfaces Web",
        "Seguridad en Aplicaciones Web",
        "Despliegue de Aplicaciones Web"
      ],
      finalProject: {
        title: "Sistema de Gestión Escolar Web",
        description: "Aplicación web completa para gestión de centros educativos",
        technologies: ["PHP", "MySQL", "HTML5", "CSS3", "JavaScript"],
        grade: "9.2/10"
      },
      logo: "/assets/images/education/ies-logo.png",
      website: "https://iessanjuanbautista.edu.es"
    },

    {
      id: 2,
      degree: "Bachillerato Científico-Tecnológico",
      institution: "IES Aramo",
      location: "Oviedo, Asturias",
      type: "secondary",
      level: "Bachillerato",
      startDate: "2019-09-01",
      endDate: "2021-06-30",
      current: false,
      duration: "2 años",
      grade: "7.8/10",
      gradeScale: "10",
      status: "completed",
      description: "Bachillerato con especialización en ciencias y tecnología, que despertó mi interés por la programación y las matemáticas aplicadas.",
      curriculum: [
        "Matemáticas II",
        "Física",
        "Química",
        "Tecnología Industrial",
        "Dibujo Técnico",
        "Informática (Introducción a la programación)"
      ],
      logo: "/assets/images/education/aramo-logo.png",
      website: "https://iesaramo.edu.es"
    }
  ],

  // Cursos y certificaciones
  courses: [
    {
      id: 1,
      title: "JavaScript Algorithms and Data Structures",
      provider: "freeCodeCamp",
      type: "online",
      category: "programming",
      duration: "300 horas",
      startDate: "2023-01-01",
      endDate: "2023-03-15",
      status: "completed",
      certificateUrl: "https://freecodecamp.org/certification/anthonybonilla/javascript-algorithms-and-data-structures",
      certificateId: "fcc-js-alg-ds-2023",
      skills: ["JavaScript", "Algoritmos", "Estructuras de Datos", "ES6+", "Programación Funcional"],
      logo: "/assets/images/certificates/freecodecamp-logo.png"
    },
    {
      id: 2,
      title: "React - The Complete Guide",
      provider: "Udemy",
      instructor: "Maximilian Schwarzmüller",
      type: "online",
      category: "frontend",
      duration: "40 horas",
      startDate: "2023-04-01",
      endDate: "2023-05-20",
      status: "completed",
      certificateUrl: "https://udemy-certificate.s3.amazonaws.com/react-complete-guide-anthony-bonilla",
      certificateId: "udemy-react-2023",
      skills: ["React", "Hooks", "Context API", "Redux", "React Router", "Testing"],
      logo: "/assets/images/certificates/udemy-logo.png"
    },
    {
      id: 3,
      title: "Node.js Backend Development",
      provider: "Platzi",
      type: "online",
      category: "backend",
      duration: "25 horas",
      startDate: "2023-06-01",
      endDate: "2023-07-10",
      status: "completed",
      certificateUrl: "https://platzi.com/certificate/nodejs-backend-anthony-bonilla",
      certificateId: "platzi-nodejs-2023",
      skills: ["Node.js", "Express", "MongoDB", "JWT", "API REST", "Middleware"],
      logo: "/assets/images/certificates/platzi-logo.png"
    },
    {
      id: 4,
      title: "AWS Cloud Practitioner",
      provider: "Amazon Web Services",
      type: "certification",
      category: "cloud",
      duration: "80 horas de preparación",
      startDate: "2023-10-01",
      endDate: "2023-11-15",
      status: "completed",
      certificateUrl: "https://aws.amazon.com/verification/anthony-bonilla-cloud-practitioner",
      certificateId: "aws-cp-2023-11",
      validUntil: "2026-11-15",
      skills: ["AWS Services", "Cloud Computing", "Security", "Pricing", "Architecture"],
      logo: "/assets/images/certificates/aws-logo.png"
    },
    {
      id: 5,
      title: "Git & GitHub Complete Course",
      provider: "freeCodeCamp",
      type: "online",
      category: "tools",
      duration: "15 horas",
      startDate: "2022-12-01",
      endDate: "2022-12-20",
      status: "completed",
      certificateUrl: "https://freecodecamp.org/certification/anthonybonilla/git-github",
      certificateId: "fcc-git-2022",
      skills: ["Git", "GitHub", "Version Control", "Branching", "Merging", "Collaboration"],
      logo: "/assets/images/certificates/freecodecamp-logo.png"
    }
  ],

  // Proyectos académicos destacados
  academicProjects: [
    {
      id: 1,
      title: "Sistema de Gestión Escolar",
      description: "Aplicación web completa para gestión de centros educativos con diferentes roles de usuario (administrador, profesores, estudiantes, padres).",
      technologies: ["PHP", "MySQL", "HTML5", "CSS3", "JavaScript", "Bootstrap"],
      duration: "4 meses",
      startDate: "2023-02-01",
      endDate: "2023-06-01",
      team: "3 personas",
      role: "Full Stack Developer & Team Lead",
      grade: "9.2/10",
      repository: "https://github.com/anthony-bonilla/sistema-gestion-escolar",
      achievements: [
        "Sistema de autenticación multi-rol con JWT",
        "Gestión completa de estudiantes, profesores y cursos",
        "Sistema de calificaciones y reportes automatizados",
        "Panel de administración con estadísticas en tiempo real",
        "API REST documentada con Swagger"
      ],
      features: [
        "Dashboard personalizado por rol",
        "Sistema de notificaciones",
        "Generación de reportes PDF",
        "Chat interno entre usuarios",
        "Calendario académico integrado"
      ]
    },
    {
      id: 2,
      title: "E-commerce de Productos Locales",
      description: "Tienda online especializada en productos artesanales de Asturias con sistema de gestión de inventario.",
      technologies: ["JavaScript", "LocalStorage", "CSS Grid", "Responsive Design", "API REST"],
      duration: "2 meses",
      startDate: "2022-11-01",
      endDate: "2022-12-31",
      team: "Individual",
      role: "Frontend Developer",
      grade: "8.8/10",
      repository: "https://github.com/anthony-bonilla/ecommerce-asturias",
      achievements: [
        "Carrito de compras persistente con LocalStorage",
        "Sistema de filtros avanzados por categoría y precio",
        "Diseño completamente responsive (Mobile First)",
        "Optimización para dispositivos móviles",
        "Integración con pasarela de pago simulada"
      ],
      features: [
        "Catálogo de productos dinámico",
        "Sistema de wishlist",
        "Búsqueda avanzada",
        "Comparador de productos",
        "Reseñas y valoraciones"
      ]
    },
    {
      id: 3,
      title: "API REST para Sistema de Bibliotecas",
      description: "Backend completo para gestión de bibliotecas con sistema de préstamos y reservas.",
      technologies: ["Java", "Spring Boot", "MySQL", "JPA", "Maven", "JWT"],
      duration: "3 meses",
      startDate: "2023-03-01",
      endDate: "2023-05-31",
      team: "2 personas",
      role: "Backend Developer",
      grade: "9.0/10",
      repository: "https://github.com/anthony-bonilla/biblioteca-api",
      achievements: [
        "API RESTful completa con documentación Swagger",
        "Sistema de autenticación y autorización",
        "Gestión de préstamos con fechas de vencimiento",
        "Sistema de reservas y listas de espera",
        "Tests unitarios con cobertura del 85%"
      ],
      features: [
        "CRUD completo para libros y usuarios",
        "Sistema de multas automatizado",
        "Notificaciones por email",
        "Reportes estadísticos",
        "API versionada"
      ]
    }
  ],

  // Habilidades desarrolladas por experiencia
  skillsByExperience: {
    frontend: {
      years: 2.5,
      level: "intermedio-avanzado",
      confidence: 85,
      technologies: ["HTML5", "CSS3", "JavaScript", "React", "Vue.js", "TypeScript", "Sass", "Tailwind CSS"],
      frameworks: ["React", "Vue.js", "Angular (básico)"],
      tools: ["Webpack", "Vite", "Figma", "Adobe XD"],
      methodologies: ["Component-Based Design", "Mobile First", "Progressive Enhancement"]
    },
    backend: {
      years: 2,
      level: "intermedio",
      confidence: 75,
      technologies: ["Node.js", "Express", "PHP", "Python", "Java", "Spring Boot"],
      databases: ["MongoDB", "MySQL", "PostgreSQL"],
      tools: ["Postman", "Docker", "JWT", "API Design"],
      methodologies: ["RESTful APIs", "MVC Pattern", "Test-Driven Development"]
    },
    database: {
      years: 2,
      level: "intermedio",
      confidence: 70,
      technologies: ["MySQL", "MongoDB", "PostgreSQL"],
      skills: ["Query Optimization", "Database Design", "Migrations", "Indexing"],
      tools: ["phpMyAdmin", "MongoDB Compass", "DBeaver"]
    },
    tools: {
      years: 2.5,
      level: "intermedio-avanzado",
      confidence: 80,
      technologies: ["Git", "Docker", "Webpack", "Vite", "VS Code", "Postman", "Jest"],
      devops: ["Docker", "CI/CD básico", "Deployment"],
      design: ["Figma", "Adobe XD", "Canva"],
      testing: ["Jest", "Cypress", "Manual Testing"]
    },
    cloud: {
      years: 1,
      level: "básico-intermedio",
      confidence: 60,
      technologies: ["AWS", "Heroku", "Netlify", "Vercel"],
      services: ["EC2", "S3", "Lambda", "RDS"],
      skills: ["Deployment", "Monitoring", "Basic Security"]
    }
  },

  // Timeline de eventos importantes
  timeline: [
    {
      id: 1,
      date: "2019-09-01",
      event: "Inicio Bachillerato Científico-Tecnológico",
      type: "education",
      icon: "graduation-cap",
      description: "Comienzo del bachillerato con especialización en ciencias"
    },
    {
      id: 2,
      date: "2021-06-30",
      event: "Graduación Bachillerato",
      type: "education",
      icon: "award",
      description: "Finalización del bachillerato con nota media 7.8/10"
    },
    {
      id: 3,
      date: "2021-09-01",
      event: "Inicio Grado Superior DAW",
      type: "education",
      icon: "book-open",
      description: "Comienzo de la formación en Desarrollo de Aplicaciones Web"
    },
    {
      id: 4,
      date: "2022-10-01",
      event: "Prácticas en Innovación Digital Asturias",
      type: "work",
      icon: "briefcase",
      description: "Primera experiencia profesional en el sector tecnológico"
    },
    {
      id: 5,
      date: "2023-01-15",
      event: "Certificación JavaScript - freeCodeCamp",
      type: "certification",
      icon: "certificate",
      description: "Completado curso de algoritmos y estructuras de datos"
    },
    {
      id: 6,
      date: "2023-03-01",
      event: "Inicio trabajo part-time en Digital Marketing Pro",
      type: "work",
      icon: "briefcase",
      description: "Desarrollo frontend freelance especializado en marketing"
    },
    {
      id: 7,
      date: "2023-06-30",
      event: "Graduación DAW con nota media 8.5",
      type: "education",
      icon: "award",
      description: "Finalización del grado superior con excelentes calificaciones"
    },
    {
      id: 8,
      date: "2023-09-01",
      event: "Desarrollador Full Stack en TechStart Solutions",
      type: "work",
      icon: "code",
      description: "Primer trabajo full-time como desarrollador"
    },
    {
      id: 9,
      date: "2023-11-15",
      event: "Certificación AWS Cloud Practitioner",
      type: "certification",
      icon: "cloud",
      description: "Certificación oficial en servicios de Amazon Web Services"
    },
    {
      id: 10,
      date: "2024-01-01",
      event: "Promoción a desarrollador senior junior",
      type: "work",
      icon: "trending-up",
      description: "Reconocimiento por rendimiento y liderazgo en proyectos"
    }
  ],

  // Estadísticas generales
  stats: {
    totalWorkExperience: "1.5 años",
    totalProjects: 15,
    totalCertifications: 5,
    currentRole: "Desarrollador Full Stack Junior",
    programmingLanguages: 8,
    frameworks: 6,
    databases: 3
  },

  // Configuración para filtros y categorías
  filters: {
    experienceTypes: ["full-time", "part-time", "internship", "contract"],
    educationTypes: ["higher_vocational", "secondary", "bachelor", "master"],
    courseCategories: ["programming", "frontend", "backend", "cloud", "tools"],
    skillLevels: ["básico", "básico-intermedio", "intermedio", "intermedio-avanzado", "avanzado"],
    industries: ["Technology", "Digital Marketing", "Technology Services", "Education"]
  }
};

// Funciones de utilidad para trabajar con los datos
export const experienceUtils = {
  /**
   * Calcular duración automáticamente
   */
  calculateDuration: (startDate, endDate = null) => {
    const start = new Date(startDate);
    const end = endDate ? new Date(endDate) : new Date();
    const diffTime = Math.abs(end - start);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    const months = Math.floor(diffDays / 30);
    const years = Math.floor(months / 12);
    
    if (years > 0) {
      const remainingMonths = months % 12;
      return remainingMonths > 0 ? `${years} años, ${remainingMonths} meses` : `${years} años`;
    }
    return `${months} meses`;
  },

  /**
   * Obtener experiencia por tipo
   */
  getExperienceByType: (type) => {
    return EXPERIENCE_DATA.professional.filter(exp => exp.type === type);
  },

  /**
   * Obtener experiencia actual
   */
  getCurrentExperience: () => {
    return EXPERIENCE_DATA.professional.find(exp => exp.current === true);
  },

  /**
   * Obtener todas las tecnologías únicas
   */
  getAllTechnologies: () => {
    const allTech = new Set();
    
    EXPERIENCE_DATA.professional.forEach(exp => {
      exp.technologies.forEach(tech => allTech.add(tech));
    });
    
    EXPERIENCE_DATA.courses.forEach(course => {
      course.skills.forEach(skill => allTech.add(skill));
    });
    
    return Array.from(allTech).sort();
  },

  /**
   * Obtener experiencia ordenada por fecha
   */
  getExperienceByDate: (order = 'desc') => {
    return [...EXPERIENCE_DATA.professional].sort((a, b) => {
      const dateA = new Date(a.startDate);
      const dateB = new Date(b.startDate);
      return order === 'desc' ? dateB - dateA : dateA - dateB;
    });
  },

  /**
   * Obtener timeline ordenado
   */
  getTimelineOrdered: (order = 'desc') => {
    return [...EXPERIENCE_DATA.timeline].sort((a, b) => {
      const dateA = new Date(a.date);
      const dateB = new Date(b.date);
      return order === 'desc' ? dateB - dateA : dateA - dateB;
    });
  }
};

export default EXPERIENCE_DATA;