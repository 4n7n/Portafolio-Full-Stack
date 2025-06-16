export const SKILLS_DATA = {
  // Habilidades técnicas categorizadas
  technical: {
    frontend: {
      title: "Frontend",
      icon: "monitor",
      skills: [
        {
          name: "HTML5",
          level: 95,
          icon: "html5",
          color: "#E34F26",
          experience: "3+ años"
        },
        {
          name: "CSS3/SASS",
          level: 90,
          icon: "css3",
          color: "#1572B6",
          experience: "3+ años"
        },
        {
          name: "JavaScript",
          level: 88,
          icon: "javascript",
          color: "#F7DF1E",
          experience: "2+ años"
        },
        {
          name: "React",
          level: 85,
          icon: "react",
          color: "#61DAFB",
          experience: "2 años"
        },
        {
          name: "Vue.js",
          level: 75,
          icon: "vue",
          color: "#4FC08D",
          experience: "1 año"
        },
        {
          name: "TypeScript",
          level: 80,
          icon: "typescript",
          color: "#3178C6",
          experience: "1 año"
        },
        {
          name: "Tailwind CSS",
          level: 85,
          icon: "tailwind",
          color: "#06B6D4",
          experience: "1+ años"
        }
      ]
    },
    
    backend: {
      title: "Backend",
      icon: "server",
      skills: [
        {
          name: "Node.js",
          level: 82,
          icon: "nodejs",
          color: "#339933",
          experience: "2 años"
        },
        {
          name: "Express.js",
          level: 85,
          icon: "express",
          color: "#000000",
          experience: "2 años"
        },
        {
          name: "Python",
          level: 78,
          icon: "python",
          color: "#3776AB",
          experience: "1+ años"
        },
        {
          name: "Django",
          level: 70,
          icon: "django",
          color: "#092E20",
          experience: "1 año"
        },
        {
          name: "PHP",
          level: 75,
          icon: "php",
          color: "#777BB4",
          experience: "1+ años"
        },
        {
          name: "Java",
          level: 65,
          icon: "java",
          color: "#ED8B00",
          experience: "6 meses"
        }
      ]
    },

    database: {
      title: "Bases de Datos",
      icon: "database",
      skills: [
        {
          name: "MongoDB",
          level: 80,
          icon: "mongodb",
          color: "#47A248",
          experience: "1+ años"
        },
        {
          name: "MySQL",
          level: 85,
          icon: "mysql",
          color: "#4479A1",
          experience: "2 años"
        },
        {
          name: "PostgreSQL",
          level: 75,
          icon: "postgresql",
          color: "#336791",
          experience: "1 año"
        },
        {
          name: "Redis",
          level: 65,
          icon: "redis",
          color: "#DC382D",
          experience: "6 meses"
        }
      ]
    },

    tools: {
      title: "Herramientas & DevOps",
      icon: "tool",
      skills: [
        {
          name: "Git",
          level: 90,
          icon: "git",
          color: "#F05032",
          experience: "3+ años"
        },
        {
          name: "Docker",
          level: 75,
          icon: "docker",
          color: "#2496ED",
          experience: "1 año"
        },
        {
          name: "AWS",
          level: 70,
          icon: "aws",
          color: "#FF9900",
          experience: "1 año"
        },
        {
          name: "Webpack",
          level: 72,
          icon: "webpack",
          color: "#8DD6F9",
          experience: "1+ años"
        },
        {
          name: "Jest",
          level: 68,
          icon: "jest",
          color: "#C21325",
          experience: "6 meses"
        },
        {
          name: "Figma",
          level: 85,
          icon: "figma",
          color: "#F24E1E",
          experience: "2 años"
        }
      ]
    }
  },

  // Habilidades blandas
  soft: [
    {
      name: "Trabajo en Equipo",
      level: 90,
      icon: "users",
      description: "Experiencia colaborando en equipos multidisciplinarios"
    },
    {
      name: "Resolución de Problemas",
      level: 88,
      icon: "puzzle-piece",
      description: "Capacidad para analizar y resolver problemas complejos"
    },
    {
      name: "Comunicación",
      level: 85,
      icon: "message-circle",
      description: "Habilidad para comunicar ideas técnicas de forma clara"
    },
    {
      name: "Adaptabilidad",
      level: 92,
      icon: "refresh-cw",
      description: "Rápida adaptación a nuevas tecnologías y metodologías"
    },
    {
      name: "Liderazgo",
      level: 75,
      icon: "star",
      description: "Experiencia liderando pequeños equipos de desarrollo"
    },
    {
      name: "Gestión del Tiempo",
      level: 82,
      icon: "clock",
      description: "Eficiente en la planificación y cumplimiento de deadlines"
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
      level: "Intermedio-Alto (B2)",
      flag: "🇬🇧",
      proficiency: 78
    },
    {
      name: "Francés",
      level: "Básico (A2)",
      flag: "🇫🇷",
      proficiency: 35
    }
  ],

  // Certificaciones
  certifications: [
    {
      name: "JavaScript Algorithms and Data Structures",
      issuer: "freeCodeCamp",
      date: "2024",
      url: "https://freecodecamp.org/certification/username/javascript-algorithms-and-data-structures",
      badge: "/assets/images/certificates/freecodecamp-js.png"
    },
    {
      name: "Responsive Web Design",
      issuer: "freeCodeCamp",
      date: "2023",
      url: "https://freecodecamp.org/certification/username/responsive-web-design",
      badge: "/assets/images/certificates/freecodecamp-rwd.png"
    },
    {
      name: "AWS Cloud Practitioner",
      issuer: "Amazon Web Services",
      date: "2024",
      url: "#",
      badge: "/assets/images/certificates/aws-cloud-practitioner.png"
    }
  ]
};