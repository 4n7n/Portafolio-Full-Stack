/**
 * Datos de habilidades y competencias técnicas
 * Estructura normalizada para el portfolio profesional
 */

export const SKILLS_DATA = {
  // Habilidades técnicas categorizadas - BOOTCAMP THE BRIDGE
  technical: {
    frontend: {
      title: "Frontend Development",
      description: "Desarrollo de interfaces de usuario modernas y responsivas",
      icon: "monitor",
      color: "#3B82F6",
      totalSkills: 11,
      averageLevel: 77,
      skills: [
        {
          id: "html5",
          name: "HTML5",
          level: 90,
          icon: "html5",
          color: "#E34F26",
          experience: "480h bootcamp + proyectos personales",
          experienceYears: 1.5,
          category: "markup",
          logo: "./assets/images/technologies/frontend/html5.svg",
          description: "Estructura semántica y accesible de páginas web",
          projects: ["E-Commerce", "Landing Corporativa", "Portfolio"],
          lastUsed: "2025-01-15"
        },
        {
          id: "css3",
          name: "CSS3",
          level: 85,
          icon: "css3",
          color: "#1572B6", 
          experience: "480h bootcamp + proyectos personales",
          experienceYears: 1.5,
          category: "styling",
          logo: "./assets/images/technologies/frontend/css.svg",
          description: "Estilos avanzados, Grid, Flexbox y animaciones",
          projects: ["E-Commerce", "Dashboard Analytics", "Portfolio"],
          lastUsed: "2025-01-15"
        },
        {
          id: "javascript",
          name: "JavaScript ES6+",
          level: 88,
          icon: "javascript",
          color: "#F7DF1E",
          experience: "480h bootcamp + proyectos continuos",
          experienceYears: 1.5,
          category: "programming",
          logo: "./assets/images/technologies/frontend/javascript.svg",
          description: "Programación moderna con ES6+, async/await, módulos",
          projects: ["E-Commerce", "Chat Real-time", "QR Generator"],
          lastUsed: "2025-01-15"
        },
        {
          id: "react",
          name: "React",
          level: 85,
          icon: "react",
          color: "#61DAFB",
          experience: "480h bootcamp + proyectos avanzados",
          experienceYears: 1,
          category: "framework",
          logo: "./assets/images/technologies/frontend/react.svg",
          description: "Desarrollo de SPAs con hooks, context y estado global",
          projects: ["E-Commerce", "Dashboard Analytics", "Task Manager"],
          lastUsed: "2025-01-10"
        },
        {
          id: "reactrouter",
          name: "React Router",
          level: 80,
          icon: "reactrouter",
          color: "#CA4245",
          experience: "Proyectos con React",
          experienceYears: 1,
          category: "library",
          logo: "./assets/images/technologies/frontend/reactrouter.svg",
          description: "Enrutamiento SPA y navegación programática",
          projects: ["E-Commerce", "Dashboard Analytics"],
          lastUsed: "2024-12-20"
        },
        {
          id: "chartjs",
          name: "Chart.js",
          level: 75,
          icon: "chartjs",
          color: "#FF6384",
          experience: "Visualización de datos",
          experienceYears: 0.5,
          category: "visualization",
          logo: "./assets/images/technologies/frontend/chartdotjs.svg",
          description: "Gráficos interactivos y visualización de datos",
          projects: ["Dashboard Analytics", "Task Manager"],
          lastUsed: "2024-11-30"
        },
        {
          id: "bootstrap",
          name: "Bootstrap",
          level: 80,
          icon: "bootstrap",
          color: "#7952B3",
          experience: "Diseño responsive",
          experienceYears: 1,
          category: "framework",
          logo: "./assets/images/technologies/frontend/bootstrap.svg",
          description: "Framework CSS para desarrollo rápido y responsive",
          projects: ["Landing Corporativa", "Portfolio"],
          lastUsed: "2024-10-15"
        },
        {
          id: "sass",
          name: "Sass",
          level: 75,
          icon: "sass",
          color: "#CC6699",
          experience: "Preprocesado CSS",
          experienceYears: 1,
          category: "preprocessor",
          logo: "./assets/images/technologies/frontend/sass.svg",
          description: "Estilos organizados con variables, mixins y funciones",
          projects: ["Task Manager", "Portfolio"],
          lastUsed: "2024-12-01"
        },
        {
          id: "webpack",
          name: "Webpack",
          level: 70,
          icon: "webpack", 
          color: "#8DD6F9",
          experience: "Empaquetado de módulos",
          experienceYears: 0.5,
          category: "build-tool",
          logo: "./assets/images/technologies/frontend/webpack.svg",
          description: "Bundling y optimización de assets",
          projects: ["E-Commerce", "QR Generator"],
          lastUsed: "2024-09-20"
        },
        {
          id: "babel",
          name: "Babel",
          level: 65,
          icon: "babel",
          color: "#F9DC3E",
          experience: "Transpilación JS",
          experienceYears: 0.5,
          category: "build-tool",
          logo: "./assets/images/technologies/frontend/babel.svg",
          description: "Transpilación de JavaScript moderno",
          projects: ["E-Commerce"],
          lastUsed: "2024-08-15"
        },
        {
          id: "d3",
          name: "D3.js",
          level: 60,
          icon: "d3",
          color: "#F68E56",
          experience: "Visualización avanzada",
          experienceYears: 0.3,
          category: "visualization",
          logo: "./assets/images/technologies/frontend/d3.svg",
          description: "Visualizaciones de datos complejas y personalizadas",
          projects: ["Dashboard Analytics"],
          lastUsed: "2024-07-10"
        }
      ]
    },
    
    backend: {
      title: "Backend Development",
      description: "Desarrollo de APIs y servicios del lado del servidor",
      icon: "server",
      color: "#10B981",
      totalSkills: 6,
      averageLevel: 79,
      skills: [
        {
          id: "nodejs",
          name: "Node.js",
          level: 85,
          icon: "nodejs",
          color: "#339933",
          experience: "480h bootcamp + proyectos continuos",
          experienceYears: 1,
          category: "runtime",
          logo: "./assets/images/technologies/backend/nodedotjs.svg",
          description: "Runtime JavaScript para desarrollo backend",
          projects: ["E-Commerce", "Blog API", "Chat Real-time"],
          lastUsed: "2025-01-10"
        },
        {
          id: "express",
          name: "Express.js",
          level: 80,
          icon: "express",
          color: "#000000",
          experience: "Desarrollo de APIs",
          experienceYears: 1,
          category: "framework",
          logo: "./assets/images/technologies/backend/express.svg",
          description: "Framework web minimalista para Node.js",
          projects: ["E-Commerce", "Blog API", "Weather API"],
          lastUsed: "2025-01-05"
        },
        {
          id: "npm",
          name: "NPM",
          level: 85,
          icon: "npm",
          color: "#CB3837",
          experience: "Gestión de paquetes",
          experienceYears: 1.5,
          category: "package-manager",
          logo: "./assets/images/technologies/backend/npm.svg",
          description: "Gestión de dependencias y scripts",
          projects: ["Todos los proyectos Node.js"],
          lastUsed: "2025-01-15"
        },
        {
          id: "jwt",
          name: "JWT",
          level: 75,
          icon: "jwt",
          color: "#000000",
          experience: "Autenticación",
          experienceYears: 0.8,
          category: "security",
          logo: "./assets/images/technologies/backend/jsonwebtokens.svg",
          description: "Tokens de autenticación y autorización",
          projects: ["E-Commerce", "Blog API", "Chat Real-time"],
          lastUsed: "2024-12-15"
        },
        {
          id: "bcrypt",
          name: "Bcrypt",
          level: 70,
          icon: "bcrypt",
          color: "#4A90E2",
          experience: "Encriptación de contraseñas",
          experienceYears: 0.8,
          category: "security",
          logo: "./assets/images/technologies/backend/bcrypt.svg",
          description: "Hash seguro de contraseñas",
          projects: ["E-Commerce", "Blog API"],
          lastUsed: "2024-12-10"
        },
        {
          id: "nodemon",
          name: "Nodemon",
          level: 80,
          icon: "nodemon",
          color: "#76D04B",
          experience: "Herramienta de desarrollo",
          experienceYears: 1,
          category: "dev-tool",
          logo: "./assets/images/technologies/backend/nodemon.svg",
          description: "Auto-restart para desarrollo con Node.js",
          projects: ["Todos los proyectos Node.js"],
          lastUsed: "2025-01-10"
        }
      ]
    },

    database: {
      title: "Bases de Datos",
      description: "Gestión y diseño de bases de datos relacionales y NoSQL",
      icon: "database",
      color: "#8B5CF6",
      totalSkills: 3,
      averageLevel: 75,
      skills: [
        {
          id: "mysql",
          name: "MySQL",
          level: 80,
          icon: "mysql",
          color: "#4479A1",
          experience: "480h bootcamp + proyectos",
          experienceYears: 1,
          category: "relational",
          logo: "./assets/images/technologies/databases/mysql.svg",
          description: "Base de datos relacional, consultas avanzadas y optimización",
          projects: ["Blog API", "Sistema Gestión Escolar"],
          lastUsed: "2024-11-20"
        },
        {
          id: "mongodb",
          name: "MongoDB",
          level: 75,
          icon: "mongodb",
          color: "#47A248",
          experience: "MERN Stack",
          experienceYears: 0.8,
          category: "nosql",
          logo: "./assets/images/technologies/databases/mongodb.svg",
          description: "Base de datos NoSQL, agregaciones y modelado de documentos",
          projects: ["E-Commerce", "Chat Real-time"],
          lastUsed: "2024-12-30"
        },
        {
          id: "sequelize",
          name: "Sequelize ORM",
          level: 70,
          icon: "sequelize",
          color: "#52B0E7",
          experience: "ORM para SQL",
          experienceYears: 0.5,
          category: "orm",
          logo: "./assets/images/technologies/databases/sequelize.svg",
          description: "ORM para bases de datos SQL con migrations y validaciones",
          projects: ["Blog API"],
          lastUsed: "2024-09-15"
        }
      ]
    },

    devops: {
      title: "DevOps & Cloud",
      description: "Despliegue, contenedorización y servicios en la nube",
      icon: "cloud",
      color: "#F59E0B",
      totalSkills: 5,
      averageLevel: 67,
      skills: [
        {
          id: "docker",
          name: "Docker",
          level: 75,
          icon: "docker",
          color: "#2496ED",
          experience: "Contenedorización",
          experienceYears: 0.5,
          category: "containerization",
          logo: "./assets/images/technologies/devops/docker.svg",
          description: "Contenedorización de aplicaciones y microservicios",
          projects: ["Weather API", "Blog API"],
          lastUsed: "2024-11-25"
        },
        {
          id: "kubernetes",
          name: "Kubernetes",
          level: 60,
          icon: "kubernetes",
          color: "#326CE5",
          experience: "Orquestación básica",
          experienceYears: 0.2,
          category: "orchestration",
          logo: "./assets/images/technologies/devops/kubernetes.svg",
          description: "Orquestación de contenedores a nivel básico",
          projects: ["Proyecto de aprendizaje"],
          lastUsed: "2024-08-30"
        },
        {
          id: "jenkins",
          name: "Jenkins",
          level: 65,
          icon: "jenkins",
          color: "#D33833",
          experience: "CI/CD básico",
          experienceYears: 0.3,
          category: "ci-cd",
          logo: "./assets/images/technologies/devops/jenkins.svg",
          description: "Pipelines de integración y despliegue continuo",
          projects: ["Proyecto de aprendizaje"],
          lastUsed: "2024-09-10"
        },
        {
          id: "heroku",
          name: "Heroku",
          level: 70,
          icon: "heroku",
          color: "#430098",
          experience: "Despliegue de aplicaciones",
          experienceYears: 0.8,
          category: "platform",
          logo: "./assets/images/technologies/devops/heroku.svg",
          description: "Plataforma como servicio para despliegue rápido",
          projects: ["Chat Real-time", "Weather API"],
          lastUsed: "2024-11-15"
        },
        {
          id: "firebase",
          name: "Firebase",
          level: 65,
          icon: "firebase",
          color: "#FFCA28",
          experience: "BaaS platform",
          experienceYears: 0.5,
          category: "platform",
          logo: "./assets/images/technologies/devops/firebase.svg",
          description: "Backend como servicio, autenticación y tiempo real",
          projects: ["Task Manager"],
          lastUsed: "2024-12-15"
        }
      ]
    },

    tools: {
      title: "Herramientas & Testing",
      description: "Herramientas de desarrollo, testing y productividad",
      icon: "tool",
      color: "#EF4444",
      totalSkills: 9,
      averageLevel: 76,
      skills: [
        {
          id: "git",
          name: "Git",
          level: 85,
          icon: "git",
          color: "#F05032",
          experience: "Control de versiones",
          experienceYears: 1.5,
          category: "version-control",
          logo: "./assets/images/technologies/tools/git.svg",
          description: "Control de versiones distribuido, branching y merging",
          projects: ["Todos los proyectos"],
          lastUsed: "2025-01-15"
        },
        {
          id: "github",
          name: "GitHub",
          level: 85,
          icon: "github",
          color: "#181717",
          experience: "Repositorios y colaboración",
          experienceYears: 1.5,
          category: "platform",
          logo: "./assets/images/technologies/tools/github.svg",
          description: "Hosting de repositorios, issues, pull requests y actions",
          projects: ["Todos los proyectos"],
          lastUsed: "2025-01-15"
        },
        {
          id: "vscode",
          name: "VS Code",
          level: 90,
          icon: "vscode",
          color: "#007ACC",
          experience: "IDE principal",
          experienceYears: 2,
          category: "editor",
          logo: "./assets/images/technologies/tools/vscode.svg",
          description: "Editor de código con extensiones y debugging",
          projects: ["Todos los proyectos"],
          lastUsed: "2025-01-15"
        },
        {
          id: "bash",
          name: "Bash",
          level: 75,
          icon: "bash",
          color: "#4EAA25",
          experience: "Terminal y scripting",
          experienceYears: 1,
          category: "shell",
          logo: "./assets/images/technologies/tools/gnubash.svg",
          description: "Comandos de terminal y scripting básico",
          projects: ["Administración de servidores"],
          lastUsed: "2025-01-10"
        },
        {
          id: "swagger",
          name: "Swagger",
          level: 70,
          icon: "swagger",
          color: "#85EA2D",
          experience: "Documentación de APIs",
          experienceYears: 0.5,
          category: "documentation",
          logo: "./assets/images/technologies/tools/swagger.svg",
          description: "Documentación interactiva de APIs REST",
          projects: ["Blog API", "Weather API"],
          lastUsed: "2024-09-30"
        },
        {
          id: "jest",
          name: "Jest",
          level: 75,
          icon: "jest",
          color: "#C21325",
          experience: "Testing framework",
          experienceYears: 0.5,
          category: "testing",
          logo: "./assets/images/technologies/tools/jest.svg",
          description: "Framework de testing para JavaScript",
          projects: ["Blog API", "E-Commerce"],
          lastUsed: "2024-10-20"
        },
        {
          id: "postman",
          name: "Postman",
          level: 80,
          icon: "postman",
          color: "#FF6C37",
          experience: "Testing de APIs",
          experienceYears: 1,
          category: "testing",
          logo: "./assets/images/technologies/tools/postman.svg",
          description: "Testing y documentación de APIs REST",
          projects: ["Todas las APIs desarrolladas"],
          lastUsed: "2024-12-05"
        },
        {
          id: "ssh",
          name: "SSH",
          level: 70,
          icon: "ssh",
          color: "#000000",
          experience: "Acceso remoto a servidores",
          experienceYears: 0.5,
          category: "network",
          logo: "./assets/images/technologies/tools/ssh.svg",
          description: "Protocolo de acceso seguro a servidores remotos",
          projects: ["Despliegue de aplicaciones"],
          lastUsed: "2024-11-10"
        },
        {
          id: "virtualbox",
          name: "VirtualBox",
          level: 65,
          icon: "virtualbox",
          color: "#183A61",
          experience: "Máquinas virtuales",
          experienceYears: 0.3,
          category: "virtualization",
          logo: "./assets/images/technologies/tools/virtualbox.svg",
          description: "Virtualización para entornos de desarrollo",
          projects: ["Entornos de testing"],
          lastUsed: "2024-08-20"
        }
      ]
    }
  },

  // Habilidades blandas - Desarrolladas en el bootcamp
  soft: [
    {
      id: "teamwork",
      name: "Trabajo en Equipo",
      level: 88,
      icon: "users",
      color: "#10B981",
      description: "Colaboración efectiva en proyectos grupales del bootcamp con metodologías ágiles",
      evidence: [
        "Proyectos colaborativos en The Bridge",
        "Pair programming sessions",
        "Code reviews constructivos"
      ],
      situations: [
        "Desarrollo de e-commerce en equipo de 4 personas",
        "Resolución de conflictos técnicos mediante comunicación",
        "Mentoring a compañeros en React"
      ]
    },
    {
      id: "problem-solving",
      name: "Resolución de Problemas",
      level: 85,
      icon: "puzzle-piece",
      color: "#3B82F6",
      description: "Análisis sistemático y debugging de problemas técnicos complejos",
      evidence: [
        "Debugging de aplicaciones MERN",
        "Optimización de consultas de base de datos",
        "Resolución de conflictos de dependencias"
      ],
      situations: [
        "Optimización de rendimiento en React (40% mejora)",
        "Resolución de memory leaks en Node.js",
        "Debug de problemas de CORS en APIs"
      ]
    },
    {
      id: "technical-communication",
      name: "Comunicación Técnica",
      level: 80,
      icon: "message-circle",
      color: "#8B5CF6",
      description: "Documentación clara y presentación efectiva de soluciones técnicas",
      evidence: [
        "Documentación de APIs con Swagger",
        "README detallados en GitHub",
        "Presentaciones de proyectos"
      ],
      situations: [
        "Presentación final del bootcamp",
        "Documentación de arquitectura de microservicios",
        "Explicación técnica a stakeholders no técnicos"
      ]
    },
    {
      id: "adaptability",
      name: "Adaptabilidad",
      level: 90,
      icon: "refresh-cw",
      color: "#F59E0B",
      description: "Rápida adaptación a nuevas tecnologías y cambios en requirements",
      evidence: [
        "Migración de JavaScript vanilla a React",
        "Adopción de TypeScript en proyectos",
        "Aprendizaje de Docker durante el bootcamp"
      ],
      situations: [
        "Cambio de MySQL a MongoDB en proyecto activo",
        "Migración de REST a GraphQL",
        "Adaptación a nuevas versiones de React"
      ]
    },
    {
      id: "agile-methodologies",
      name: "Metodologías Ágiles",
      level: 75,
      icon: "zap",
      color: "#EF4444",
      description: "Aplicación de Scrum y prácticas ágiles en desarrollo de software",
      evidence: [
        "Sprints de 2 semanas en bootcamp",
        "Daily stand-ups",
        "Sprint retrospectives"
      ],
      situations: [
        "Product Owner en proyecto final",
        "Scrum Master en desarrollo de API",
        "User stories y estimación con planning poker"
      ]
    },
    {
      id: "time-management",
      name: "Gestión del Tiempo",
      level: 82,
      icon: "clock",
      color: "#06B6D4",
      description: "Priorización efectiva y cumplimiento de deadlines en entornos de alta presión",
      evidence: [
        "100% proyectos entregados a tiempo",
        "Gestión de múltiples tareas simultáneas",
        "Planificación de sprints efectiva"
      ],
      situations: [
        "Entrega de 8 proyectos en 480h de bootcamp",
        "Balanceo entre aprendizaje y desarrollo",
        "Gestión de imprevistos técnicos sin afectar timelines"
      ]
    }
  ],

  // Idiomas
  languages: [
    {
      id: "spanish",
      name: "Español",
      level: "Nativo",
      flag: "🇪🇸",
      proficiency: 100,
      certified: false,
      description: "Lengua materna"
    },
    {
      id: "english",
      name: "Inglés",
      level: "Intermedio (B2)",
      flag: "🇬🇧",
      proficiency: 75,
      certified: false,
      description: "Capacidad para leer documentación técnica y comunicación básica",
      skills: {
        reading: 85,
        writing: 70,
        speaking: 65,
        listening: 75
      },
      evidence: [
        "Lectura de documentación técnica en inglés",
        "Participación en comunidades internacionales",
        "Seguimiento de tutoriales y cursos en inglés"
      ]
    }
  ],

  // Certificaciones - REAL de Anthony
  certifications: [
    {
      id: "fullstack-thebridge",
      name: "Desarrollo Web Full Stack",
      issuer: "The Bridge Digital Talent Accelerator",
      issuerId: "the-bridge",
      date: "2025-02-07",
      expirationDate: null,
      duration: "480 horas",
      credentialId: "BBKTB-2025-DFS-001",
      url: "./assets/documents/Anthony Bonillla certificado_desarrollo_web_full_stack_bbk.pdf",
      badge: "./assets/images/certificates/Anthony-Bonillla-certificado_desarrollo_web_full_stack_bbk.jpg",
      logo: "./assets/images/institutions/The_Bridge.svg",
      description: "Bootcamp intensivo en stack MERN con metodologías ágiles y proyectos reales",
      skills: [
        "MERN Stack",
        "Docker",
        "Testing con Jest",
        "DevOps básico",
        "APIs REST",
        "Metodologías Ágiles"
      ],
      verificationUrl: "https://thebridge.tech/verify/BBKTB-2025-DFS-001",
      grade: "Excelente",
      honors: ["Mejor proyecto final", "Participación destacada"],
      type: "bootcamp" // bootcamp, course, certification, degree
    }
  ],

  // Información detallada del bootcamp
  bootcamp: {
    id: "thebridge-fullstack-2025",
    name: "Desarrollo Web Full Stack",
    institution: "The Bridge Digital Talent Accelerator",
    partner: "BBK (Banco Bilbao Vizcaya)",
    duration: "480 horas",
    startDate: "2024-09-01",
    endDate: "2025-02-07",
    completionDate: "2025-02-07",
    modality: "Presencial + Online",
    location: "Bilbao, España",
    logo: "./assets/images/institutions/The_Bridge.svg",
    certificate: "./assets/images/certificates/Anthony-Bonillla-certificado_desarrollo_web_full_stack_bbk.jpg",
    document: "./assets/documents/Anthony Bonillla certificado_desarrollo_web_full_stack_bbk.pdf",
    description: "Bootcamp intensivo especializado en stack MERN (MongoDB, Express, React, Node.js) con enfoque en metodologías ágiles, proyectos reales y programa de empleabilidad.",
    website: "https://thebridge.tech",
    
    // Autoridades firmantes
    authorities: [
      {
        name: "Iker Arce Seco",
        position: "CEO",
        institution: "The Bridge"
      },
      {
        name: "Diego Díaz López",
        position: "Director Académico",
        institution: "The Bridge"
      },
      {
        name: "Gorka Martínez Salcedo",
        position: "Director General",
        institution: "BBK"
      }
    ],
    
    // Curriculum detallado
    curriculum: [
      {
        module: "Fundamentos Web",
        duration: "80h",
        topics: ["HTML5 semántico", "CSS3 avanzado", "JavaScript ES6+", "DOM Manipulation", "Responsive Design"]
      },
      {
        module: "Frontend con React",
        duration: "120h", 
        topics: ["React fundamentals", "Hooks y Context", "React Router", "Estado global", "Testing con Jest"]
      },
      {
        module: "Backend con Node.js",
        duration: "100h",
        topics: ["Node.js runtime", "Express.js", "APIs REST", "Middleware", "Autenticación JWT"]
      },
      {
        module: "Bases de Datos",
        duration: "80h",
        topics: ["MySQL relacional", "MongoDB NoSQL", "ORMs", "Optimización", "Modelado de datos"]
      },
      {
        module: "DevOps y Deploy",
        duration: "60h",
        topics: ["Docker", "CI/CD", "Git avanzado", "Cloud deployment", "Monitoring"]
      },
      {
        module: "Proyecto Final",
        duration: "40h",
        topics: ["Metodologías ágiles", "Trabajo en equipo", "Presentación", "Documentación"]
      }
    ],
    
    // Habilidades específicas adquiridas
    skillsLearned: [
      "Stack MERN completo",
      "Desarrollo Frontend con React + Hooks",
      "Desarrollo Backend con Node.js/Express", 
      "Bases de datos MySQL y MongoDB",
      "DevOps con Docker y Kubernetes básico",
      "Testing automatizado con Jest",
      "APIs REST y documentación Swagger",
      "Metodologías ágiles (Scrum)",
      "Control de versiones avanzado con Git",
      "Deployment en cloud (Heroku, Netlify)"
    ],
    
    // Proyectos realizados
    projects: [
      {
        name: "E-commerce MERN",
        description: "Tienda online completa con carrito y pagos",
        technologies: ["React", "Node.js", "MongoDB", "Stripe"],
        role: "Full Stack Developer"
      },
      {
        name: "API REST Blog",
        description: "Backend completo con autenticación",
        technologies: ["Node.js", "Express", "MySQL", "JWT"],
        role: "Backend Developer"
      },
      {
        name: "Dashboard React",
        description: "Panel administrativo con gráficos",
        technologies: ["React", "Chart.js", "Context API"],
        role: "Frontend Developer"
      }
    ],
    
    // Métricas de rendimiento
    performance: {
      finalGrade: "Excelente",
      projectsCompleted: "8/8",
      attendance: "98%",
      codeReviews: "95% aprobadas",
      teamwork: "Excelente",
      technicalSkills: "Avanzado",
      presentation: "Destacado"
    },
    
    // Metodología de enseñanza
    methodology: {
      approach: "Learning by doing",
      format: "Proyectos reales",
      schedule: "Intensivo - 40h/semana",
      mentorship: "1:8 ratio profesor/alumno",
      evaluation: "Proyectos + Peer review",
      placement: "Programa de empleabilidad incluido"
    }
  },

  // Estadísticas generales
  stats: {
    totalTechnicalSkills: 34,
    averageTechnicalLevel: 76,
    totalSoftSkills: 6,
    averageSoftLevel: 83,
    totalCertifications: 1,
    yearsOfExperience: 1.5,
    bootcampHours: 480,
    projectsCompleted: 8,
    technologiesLearned: 25,
    githubCommits: "500+",
    linesOfCode: "50K+"
  },

  // Configuración para mostrar habilidades
  display: {
    showLevels: true,
    showExperience: true,
    showProjects: true,
    showLogos: true,
    groupByCategory: true,
    sortBy: "level", // level, name, experience
    filterMinLevel: 0,
    showOnlyRecent: false,
    recentThreshold: 6, // meses
    animations: true
  },

  // Niveles de competencia
  competencyLevels: {
    beginner: {
      range: [0, 40],
      label: "Principiante",
      description: "Conocimientos básicos",
      color: "#EF4444"
    },
    intermediate: {
      range: [41, 70],
      label: "Intermedio", 
      description: "Competencia práctica",
      color: "#F59E0B"
    },
    advanced: {
      range: [71, 85],
      label: "Avanzado",
      description: "Dominio sólido",
      color: "#10B981"
    },
    expert: {
      range: [86, 100],
      label: "Experto",
      description: "Maestría completa",
      color: "#3B82F6"
    }
  }
};

/**
 * Utilidades para trabajar con habilidades
 */
export const skillsUtils = {
  /**
   * Obtener todas las habilidades técnicas
   */
  getAllTechnicalSkills: () => {
    const allSkills = [];
    Object.values(SKILLS_DATA.technical).forEach(category => {
      if (category.skills) {
        allSkills.push(...category.skills.map(skill => ({
          ...skill,
          categoryId: Object.keys(SKILLS_DATA.technical).find(key => 
            SKILLS_DATA.technical[key] === category
          ),
          categoryName: category.title
        })));
      }
    });
    return allSkills;
  },

  /**
   * Obtener habilidades por categoría
   */
  getSkillsByCategory: (categoryId) => {
    return SKILLS_DATA.technical[categoryId]?.skills || [];
  },

  /**
   * Obtener habilidades por nivel mínimo
   */
  getSkillsByMinLevel: (minLevel) => {
    return skillsUtils.getAllTechnicalSkills().filter(skill => skill.level >= minLevel);
  },

  /**
   * Obtener top habilidades
   */
  getTopSkills: (limit = 10) => {
    return skillsUtils.getAllTechnicalSkills()
      .sort((a, b) => b.level - a.level)
      .slice(0, limit);
  },

  /**
   * Buscar habilidades por nombre
   */
  searchSkills: (query) => {
    const searchTerm = query.toLowerCase();
    return skillsUtils.getAllTechnicalSkills().filter(skill =>
      skill.name.toLowerCase().includes(searchTerm) ||
      skill.description?.toLowerCase().includes(searchTerm) ||
      skill.category?.toLowerCase().includes(searchTerm)
    );
  },

  /**
   * Obtener habilidades usadas recientemente
   */
  getRecentSkills: (months = 6) => {
    const cutoffDate = new Date();
    cutoffDate.setMonth(cutoffDate.getMonth() - months);
    
    return skillsUtils.getAllTechnicalSkills().filter(skill => {
      if (!skill.lastUsed) return false;
      return new Date(skill.lastUsed) >= cutoffDate;
    });
  },

  /**
   * Calcular estadísticas por categoría
   */
  getCategoryStats: () => {
    const stats = {};
    
    Object.entries(SKILLS_DATA.technical).forEach(([categoryId, category]) => {
      if (category.skills) {
        const skills = category.skills;
        stats[categoryId] = {
          title: category.title,
          total: skills.length,
          average: Math.round(skills.reduce((acc, skill) => acc + skill.level, 0) / skills.length),
          highest: Math.max(...skills.map(s => s.level)),
          lowest: Math.min(...skills.map(s => s.level)),
          expert: skills.filter(s => s.level >= 86).length,
          advanced: skills.filter(s => s.level >= 71 && s.level <= 85).length,
          intermediate: skills.filter(s => s.level >= 41 && s.level <= 70).length,
          beginner: skills.filter(s => s.level <= 40).length
        };
      }
    });
    
    return stats;
  },

  /**
   * Obtener nivel de competencia
   */
  getCompetencyLevel: (level) => {
    for (const [key, competency] of Object.entries(SKILLS_DATA.competencyLevels)) {
      if (level >= competency.range[0] && level <= competency.range[1]) {
        return { id: key, ...competency };
      }
    }
    return SKILLS_DATA.competencyLevels.beginner;
  },

  /**
   * Filtrar habilidades por tecnología
   */
  getSkillsByTechnology: (technologies) => {
    const techArray = Array.isArray(technologies) ? technologies : [technologies];
    return skillsUtils.getAllTechnicalSkills().filter(skill =>
      techArray.some(tech => skill.name.toLowerCase().includes(tech.toLowerCase()))
    );
  },

  /**
   * Obtener proyectos que usan una habilidad
   */
  getProjectsForSkill: (skillName) => {
    const skill = skillsUtils.getAllTechnicalSkills().find(s => 
      s.name.toLowerCase() === skillName.toLowerCase()
    );
    return skill?.projects || [];
  },

  /**
   * Calcular años de experiencia total
   */
  getTotalExperience: () => {
    const allSkills = skillsUtils.getAllTechnicalSkills();
    if (allSkills.length === 0) return 0;
    
    const maxExperience = Math.max(...allSkills.map(skill => skill.experienceYears || 0));
    return maxExperience;
  },

  /**
   * Obtener distribución de habilidades por nivel
   */
  getSkillDistribution: () => {
    const allSkills = skillsUtils.getAllTechnicalSkills();
    const distribution = {
      expert: 0,
      advanced: 0, 
      intermediate: 0,
      beginner: 0
    };

    allSkills.forEach(skill => {
      const competency = skillsUtils.getCompetencyLevel(skill.level);
      distribution[competency.id]++;
    });

    return distribution;
  },

  /**
   * Validar estructura de habilidad
   */
  validateSkill: (skill) => {
    const required = ['id', 'name', 'level', 'experience'];
    const missing = required.filter(field => !skill[field]);
    
    const warnings = [];
    if (!skill.description) warnings.push('description');
    if (!skill.projects || skill.projects.length === 0) warnings.push('projects');
    if (!skill.lastUsed) warnings.push('lastUsed');

    return {
      isValid: missing.length === 0,
      missingFields: missing,
      warnings
    };
  },

  /**
   * Generar recomendaciones de mejora
   */
  getImprovementSuggestions: () => {
    const allSkills = skillsUtils.getAllTechnicalSkills();
    const suggestions = [];

    // Habilidades que necesitan actualización
    const outdatedSkills = allSkills.filter(skill => {
      if (!skill.lastUsed) return true;
      const lastUsed = new Date(skill.lastUsed);
      const sixMonthsAgo = new Date();
      sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6);
      return lastUsed < sixMonthsAgo;
    });

    if (outdatedSkills.length > 0) {
      suggestions.push({
        type: 'update',
        title: 'Actualizar habilidades',
        description: `${outdatedSkills.length} habilidades no se han usado en 6+ meses`,
        skills: outdatedSkills.map(s => s.name),
        priority: 'medium'
      });
    }

    // Habilidades con nivel bajo pero críticas
    const lowCriticalSkills = allSkills.filter(skill => 
      skill.level < 70 && (skill.projects?.length > 2 || skill.category === 'programming')
    );

    if (lowCriticalSkills.length > 0) {
      suggestions.push({
        type: 'improve',
        title: 'Mejorar habilidades críticas',
        description: `${lowCriticalSkills.length} habilidades importantes con nivel bajo`,
        skills: lowCriticalSkills.map(s => s.name),
        priority: 'high'
      });
    }

    // Categorías desbalanceadas
    const categoryStats = skillsUtils.getCategoryStats();
    Object.entries(categoryStats).forEach(([categoryId, stats]) => {
      if (stats.average < 70) {
        suggestions.push({
          type: 'strengthen',
          title: `Fortalecer ${stats.title}`,
          description: `Promedio de categoría: ${stats.average}%`,
          category: categoryId,
          priority: 'low'
        });
      }
    });

    return suggestions.sort((a, b) => {
      const priorityOrder = { high: 3, medium: 2, low: 1 };
      return priorityOrder[b.priority] - priorityOrder[a.priority];
    });
  }
};

// Calcular estadísticas automáticamente
Object.values(SKILLS_DATA.technical).forEach(category => {
  if (category.skills) {
    category.totalSkills = category.skills.length;
    category.averageLevel = Math.round(
      category.skills.reduce((acc, skill) => acc + skill.level, 0) / category.skills.length
    );
  }
});

// Calcular estadísticas generales
SKILLS_DATA.stats.totalTechnicalSkills = skillsUtils.getAllTechnicalSkills().length;
SKILLS_DATA.stats.averageTechnicalLevel = Math.round(
  skillsUtils.getAllTechnicalSkills().reduce((acc, skill) => acc + skill.level, 0) / 
  skillsUtils.getAllTechnicalSkills().length
);
SKILLS_DATA.stats.averageSoftLevel = Math.round(
  SKILLS_DATA.soft.reduce((acc, skill) => acc + skill.level, 0) / SKILLS_DATA.soft.length
);

export default SKILLS_DATA;