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
      logo: "/assets/images/companies/techstart-logo.png",
      website: "https://techstart-solutions.com"
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
      logo: "/assets/images/companies/dmp-logo.png",
      website: "https://digitalmarketingpro.es"
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
      logo: "/assets/images/companies/ida-logo.png",
      website: "https://innovaciondigitalasturias.com"
    }
  ],

  education: [
    {
      id: 1,
      degree: "Desarrollo de Aplicaciones Web (DAW)",
      institution: "IES San Juan Bautista",
      location: "Oviedo, Asturias",
      type: "Grado Superior",
      startDate: "2021-09-01",
      endDate: "2023-06-30",
      current: false,
      grade: "8.5/10",
      description: "Formación profesional especializada en desarrollo web full-stack, bases de datos y metodologías de desarrollo.",
      subjects: [
        "Programación Web Frontend (HTML, CSS, JavaScript)",
        "Programación Web Backend (PHP, Java, Python)",
        "Bases de Datos (MySQL, PostgreSQL)",
        "Frameworks Web (Laravel, Spring Boot)",
        "Metodologías de Desarrollo Ágil",
        "Diseño de Interfaces Web",
        "Seguridad en Aplicaciones Web",
        "Despliegue de Aplicaciones Web"
      ],
      projects: [
        "Aplicación web de gestión escolar (PHP + MySQL)",
        "E-commerce con carrito de compras (JavaScript + LocalStorage)",
        "API REST para sistema de bibliotecas (Java + Spring Boot)"
      ],
      logo: "/assets/images/education/ies-logo.png"
    },

    {
      id: 2,
      degree: "Bachillerato Científico-Tecnológico",
      institution: "IES Aramo",
      location: "Oviedo, Asturias",
      type: "Bachillerato",
      startDate: "2019-09-01",
      endDate: "2021-06-30",
      current: false,
      grade: "7.8/10",
      description: "Bachillerato con especialización en matemáticas, física y tecnología, que despertó mi interés por la programación.",
      subjects: [
        "Matemáticas II",
        "Física",
        "Química",
        "Tecnología Industrial",
        "Dibujo Técnico",
        "Informática (introducción a la programación)"
      ],
      logo: "/assets/images/education/aramo-logo.png"
    }
  ],

  courses: [
    {
      id: 1,
      title: "JavaScript Algorithms and Data Structures",
      provider: "freeCodeCamp",
      type: "online",
      duration: "300 horas",
      startDate: "2023-01-01",
      endDate: "2023-03-15",
      certificateUrl: "https://freecodecamp.org/certification/username/javascript-algorithms-and-data-structures",
      skills: ["JavaScript", "Algoritmos", "Estructuras de Datos", "ES6+", "Programación Funcional"]
    },
    {
      id: 2,
      title: "React - The Complete Guide",
      provider: "Udemy",
      type: "online",
      duration: "40 horas",
      startDate: "2023-04-01",
      endDate: "2023-05-20",
      certificateUrl: "https://udemy-certificate.s3.amazonaws.com/react-complete-guide",
      skills: ["React", "Hooks", "Context API", "Redux", "React Router", "Testing"]
    },
    {
      id: 3,
      title: "Node.js Backend Development",
      provider: "Platzi",
      type: "online",
      duration: "25 horas",
      startDate: "2023-06-01",
      endDate: "2023-07-10",
      certificateUrl: "https://platzi.com/certificate/nodejs-backend",
      skills: ["Node.js", "Express", "MongoDB", "JWT", "API REST", "Middleware"]
    },
    {
      id: 4,
      title: "AWS Cloud Practitioner",
      provider: "Amazon Web Services",
      type: "certification",
      duration: "Preparación: 80 horas",
      startDate: "2023-10-01",
      endDate: "2023-11-15",
      certificateUrl: "https://aws.amazon.com/certification/certified-cloud-practitioner",
      skills: ["AWS Services", "Cloud Computing", "Security", "Pricing", "Architecture"]
    }
  ],

  // Proyectos académicos destacados
  academicProjects: [
    {
      id: 1,
      title: "Sistema de Gestión Escolar",
      description: "Aplicación web completa para gestión de centros educativos con diferentes roles de usuario.",
      technologies: ["PHP", "MySQL", "HTML5", "CSS3", "JavaScript", "Bootstrap"],
      duration: "4 meses",
      team: "3 personas",
      role: "Full Stack Developer",
      achievements: [
        "Sistema de autenticación multi-rol",
        "Gestión completa de estudiantes y profesores",
        "Sistema de calificaciones y reportes",
        "Panel de administración completo"
      ]
    },
    {
      id: 2,
      title: "E-commerce de Productos Locales",
      description: "Tienda online especializada en productos artesanales de Asturias.",
      technologies: ["JavaScript", "LocalStorage", "CSS Grid", "Responsive Design"],
      duration: "2 meses",
      team: "Individual",
      role: "Frontend Developer",
      achievements: [
        "Carrito de compras persistente",
        "Sistema de filtros avanzados",
        "Diseño completamente responsive",
        "Optimización para dispositivos móviles"
      ]
    }
  ],

  // Habilidades desarrolladas por experiencia
  skillsByExperience: {
    "frontend": {
      years: 2,
      level: "Intermedio-Avanzado",
      technologies: ["HTML5", "CSS3", "JavaScript", "React", "Vue.js", "TypeScript", "Sass", "Tailwind CSS"]
    },
    "backend": {
      years: 1.5,
      level: "Intermedio",
      technologies: ["Node.js", "Express", "PHP", "Python", "MongoDB", "MySQL", "PostgreSQL", "JWT"]
    },
    "tools": {
      years: 2,
      level: "Intermedio",
      technologies: ["Git", "Docker", "Webpack", "Figma", "VS Code", "Postman", "Jest"]
    },
    "cloud": {
      years: 0.5,
      level: "Básico-Intermedio",
      technologies: ["AWS", "Heroku", "Netlify", "Vercel"]
    }
  },

  timeline: [
    {
      date: "2019-09",
      event: "Inicio Bachillerato Científico-Tecnológico",
      type: "education",
      icon: "graduation-cap"
    },
    {
      date: "2021-06",
      event: "Graduación Bachillerato",
      type: "education",
      icon: "award"
    },
    {
      date: "2021-09",
      event: "Inicio Grado Superior DAW",
      type: "education",
      icon: "book-open"
    },
    {
      date: "2022-10",
      event: "Prácticas en Innovación Digital Asturias",
      type: "work",
      icon: "briefcase"
    },
    {
      date: "2023-01",
      event: "Certificación JavaScript - freeCodeCamp",
      type: "certification",
      icon: "certificate"
    },
    {
      date: "2023-03",
      event: "Inicio trabajo part-time en Digital Marketing Pro",
      type: "work",
      icon: "briefcase"
    },
    {
      date: "2023-06",
      event: "Graduación DAW con nota media 8.5",
      type: "education",
      icon: "award"
    },
    {
      date: "2023-09",
      event: "Desarrollador Full Stack en TechStart Solutions",
      type: "work",
      icon: "code"
    },
    {
      date: "2023-11",
      event: "Certificación AWS Cloud Practitioner",
      type: "certification",
      icon: "cloud"
    },
    {
      date: "2024-01",
      event: "Promoción a desarrollador senior junior",
      type: "work",
      icon: "trending-up"
    }
  ]
};