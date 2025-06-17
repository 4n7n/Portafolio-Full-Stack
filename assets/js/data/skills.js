export const SKILLS_DATA = {
  // Habilidades técnicas categorizadas - BOOTCAMP THE BRIDGE
  technical: {
    frontend: {
      title: "Frontend Development",
      icon: "monitor",
      skills: [
        {
          name: "HTML5",
          level: 90,
          icon: "html5",
          color: "#E34F26",
          experience: "480h bootcamp",
          logo: "./assets/images/technologies/frontend/html5.svg"
        },
        {
          name: "CSS3",
          level: 85,
          icon: "css3",
          color: "#1572B6", 
          experience: "480h bootcamp",
          logo: "./assets/images/technologies/frontend/css.svg"
        },
        {
          name: "JavaScript ES6+",
          level: 88,
          icon: "javascript",
          color: "#F7DF1E",
          experience: "480h bootcamp",
          logo: "./assets/images/technologies/frontend/javascript.svg"
        },
        {
          name: "React",
          level: 85,
          icon: "react",
          color: "#61DAFB",
          experience: "480h bootcamp",
          logo: "./assets/images/technologies/frontend/react.svg"
        },
        {
          name: "React Router",
          level: 80,
          icon: "reactrouter",
          color: "#CA4245",
          experience: "Bootcamp projects",
          logo: "./assets/images/technologies/frontend/reactrouter.svg"
        },
        {
          name: "Chart.js",
          level: 75,
          icon: "chartjs",
          color: "#FF6384",
          experience: "Data visualization",
          logo: "./assets/images/technologies/frontend/chartdotjs.svg"
        },
        {
          name: "Bootstrap",
          level: 80,
          icon: "bootstrap",
          color: "#7952B3",
          experience: "Responsive design",
          logo: "./assets/images/technologies/frontend/bootstrap.svg"
        },
        {
          name: "Sass",
          level: 75,
          icon: "sass",
          color: "#CC6699",
          experience: "CSS preprocessing",
          logo: "./assets/images/technologies/frontend/sass.svg"
        },
        {
          name: "Webpack",
          level: 70,
          icon: "webpack", 
          color: "#8DD6F9",
          experience: "Module bundling",
          logo: "./assets/images/technologies/frontend/webpack.svg"
        },
        {
          name: "Babel",
          level: 65,
          icon: "babel",
          color: "#F9DC3E",
          experience: "JS transpilation",
          logo: "./assets/images/technologies/frontend/babel.svg"
        },
        {
          name: "D3.js",
          level: 60,
          icon: "d3",
          color: "#F68E56",
          experience: "Data visualization",
          logo: "./assets/images/technologies/frontend/d3.svg"
        }
      ]
    },
    
    backend: {
      title: "Backend Development", 
      icon: "server",
      skills: [
        {
          name: "Node.js",
          level: 85,
          icon: "nodejs",
          color: "#339933",
          experience: "480h bootcamp",
          logo: "./assets/images/technologies/backend/nodedotjs.svg"
        },
        {
          name: "Express.js",
          level: 80,
          icon: "express",
          color: "#000000",
          experience: "API development",
          logo: "./assets/images/technologies/backend/express.svg"
        },
        {
          name: "NPM",
          level: 85,
          icon: "npm",
          color: "#CB3837",
          experience: "Package management",
          logo: "./assets/images/technologies/backend/npm.svg"
        },
        {
          name: "JWT",
          level: 75,
          icon: "jwt",
          color: "#000000",
          experience: "Authentication",
          logo: "./assets/images/technologies/backend/jsonwebtokens.svg"
        },
        {
          name: "Bcrypt",
          level: 70,
          icon: "bcrypt",
          color: "#4A90E2",
          experience: "Password encryption",
          logo: "./assets/images/technologies/backend/bcrypt.svg"
        },
        {
          name: "Nodemon",
          level: 80,
          icon: "nodemon",
          color: "#76D04B",
          experience: "Development tool",
          logo: "./assets/images/technologies/backend/nodemon.svg"
        }
      ]
    },

    database: {
      title: "Bases de Datos",
      icon: "database",
      skills: [
        {
          name: "MySQL",
          level: 80,
          icon: "mysql",
          color: "#4479A1",
          experience: "480h bootcamp",
          logo: "./assets/images/technologies/databases/mysql.svg"
        },
        {
          name: "MongoDB",
          level: 75,
          icon: "mongodb",
          color: "#47A248",
          experience: "MERN Stack",
          logo: "./assets/images/technologies/databases/mongodb.svg"
        },
        {
          name: "Sequelize ORM",
          level: 70,
          icon: "sequelize",
          color: "#52B0E7",
          experience: "SQL ORM",
          logo: "./assets/images/technologies/databases/sequelize.svg"
        }
      ]
    },

    devops: {
      title: "DevOps & Cloud",
      icon: "cloud",
      skills: [
        {
          name: "Docker",
          level: 75,
          icon: "docker",
          color: "#2496ED",
          experience: "Containerization",
          logo: "./assets/images/technologies/devops/docker.svg"
        },
        {
          name: "Kubernetes",
          level: 60,
          icon: "kubernetes",
          color: "#326CE5",
          experience: "Orchestration",
          logo: "./assets/images/technologies/devops/kubernetes.svg"
        },
        {
          name: "Jenkins",
          level: 65,
          icon: "jenkins",
          color: "#D33833",
          experience: "CI/CD",
          logo: "./assets/images/technologies/devops/jenkins.svg"
        },
        {
          name: "Heroku",
          level: 70,
          icon: "heroku",
          color: "#430098",
          experience: "Deployment",
          logo: "./assets/images/technologies/devops/heroku.svg"
        },
        {
          name: "Firebase",
          level: 65,
          icon: "firebase",
          color: "#FFCA28",
          experience: "BaaS platform",
          logo: "./assets/images/technologies/devops/firebase.svg"
        }
      ]
    },

    tools: {
      title: "Herramientas & DevOps",
      icon: "tool",
      skills: [
        {
          name: "Git",
          level: 85,
          icon: "git",
          color: "#F05032",
          experience: "Version control",
          logo: "./assets/images/technologies/tools/git.svg"
        },
        {
          name: "GitHub",
          level: 85,
          icon: "github",
          color: "#181717",
          experience: "Repository hosting",
          logo: "./assets/images/technologies/tools/github.svg"
        },
        {
          name: "VS Code",
          level: 90,
          icon: "vscode",
          color: "#007ACC",
          experience: "Primary IDE",
          logo: "./assets/images/technologies/tools/vscode.svg"
        },
        {
          name: "Bash",
          level: 75,
          icon: "bash",
          color: "#4EAA25",
          experience: "Terminal/CLI",
          logo: "./assets/images/technologies/tools/gnubash.svg"
        },
        {
          name: "Swagger",
          level: 70,
          icon: "swagger",
          color: "#85EA2D",
          experience: "API documentation",
          logo: "./assets/images/technologies/tools/swagger.svg"
        },
        {
          name: "Jest",
          level: 75,
          icon: "jest",
          color: "#C21325",
          experience: "Testing framework",
          logo: "./assets/images/technologies/tools/jest.svg"
        },
        {
          name: "Postman",
          level: 80,
          icon: "postman",
          color: "#FF6C37",
          experience: "API testing",
          logo: "./assets/images/technologies/tools/postman.svg"
        },
        {
          name: "SSH",
          level: 70,
          icon: "ssh",
          color: "#000000",
          experience: "Server access",
          logo: "./assets/images/technologies/tools/ssh.svg"
        },
        {
          name: "VirtualBox",
          level: 65,
          icon: "virtualbox",
          color: "#183A61",
          experience: "Virtual machines",
          logo: "./assets/images/technologies/tools/virtualbox.svg"
        }
      ]
    }
  },

  // Habilidades blandas - Desarrolladas en el bootcamp
  soft: [
    {
      name: "Trabajo en Equipo",
      level: 88,
      icon: "users",
      description: "Colaboración en proyectos grupales del bootcamp con metodologías ágiles"
    },
    {
      name: "Resolución de Problemas",
      level: 85,
      icon: "puzzle-piece",
      description: "Debugging y resolución de problemas técnicos complejos"
    },
    {
      name: "Comunicación Técnica",
      level: 80,
      icon: "message-circle",
      description: "Documentación de APIs y presentación de proyectos"
    },
    {
      name: "Adaptabilidad",
      level: 90,
      icon: "refresh-cw",
      description: "Rápido aprendizaje de nuevas tecnologías del stack MERN"
    },
    {
      name: "Metodologías Ágiles",
      level: 75,
      icon: "zap",
      description: "Trabajo con sprints y metodología Scrum en proyectos"
    },
    {
      name: "Gestión del Tiempo",
      level: 82,
      icon: "clock",
      description: "Cumplimiento de deadlines en proyectos intensivos"
    }
  ],

  // Idiomas
  languages: [
    {
      name: "Español",
      level: "Nativo",
      flag: "🇪🇸",
      proficiency: 100
    },
    {
      name: "Inglés",
      level: "Intermedio (B2)",
      flag: "🇬🇧",
      proficiency: 75
    }
  ],

  // Certificaciones - REAL de Anthony
  certifications: [
    {
      name: "Desarrollo Web Full Stack",
      issuer: "The Bridge Digital Talent Accelerator",
      date: "Febrero 2025",
      duration: "480 horas",
      url: "./assets/documents/Anthony Bonillla certificado_desarrollo_web_full_stack_bbk.pdf",
      badge: "./assets/images/certificates/Anthony-Bonillla-certificado_desarrollo_web_full_stack_bbk.jpg",
      logo: "./assets/images/institutions/The_Bridge.svg",
      description: "Bootcamp intensivo en stack MERN con metodologías ágiles",
      skills: ["MERN Stack", "Docker", "Testing", "DevOps", "APIs REST"]
    }
  ],

  // Información del bootcamp
  bootcamp: {
    name: "Desarrollo Web Full Stack",
    institution: "The Bridge Digital Talent Accelerator", 
    duration: "480 horas",
    completed: "07 de Febrero de 2025",
    logo: "./assets/images/institutions/The_Bridge.svg",
    certificate: "./assets/images/certificates/Anthony-Bonillla-certificado_desarrollo_web_full_stack_bbk.jpg",
    document: "./assets/documents/Anthony Bonillla certificado_desarrollo_web_full_stack_bbk.pdf",
    description: "Bootcamp intensivo especializado en stack MERN (MongoDB, Express, React, Node.js) con metodologías ágiles, proyectos reales y programa de empleabilidad.",
    authorities: [
      "Iker Arce Seco - CEO",
      "Diego Díaz López - Director Académico",
      "Gorka Martínez Salcedo - Director General BBK"
    ],
    skills_learned: [
      "Stack MERN completo",
      "Desarrollo Frontend con React",
      "Desarrollo Backend con Node.js/Express", 
      "Bases de datos MySQL y MongoDB",
      "DevOps con Docker y Kubernetes",
      "Testing con Jest",
      "APIs REST y documentación Swagger",
      "Metodologías ágiles",
      "Control de versiones con Git"
    ]
  }
};