// assets/js/config/technologies-config.js
// Configuración COMPLETA con todas las tecnologías disponibles

import { ICONS_DATA } from '../data/icons-data.js';

export const TECHNOLOGIES_CONFIG = {
  // Stack principal organizado por categorías
  stack: {
    frontend: {
      title: "Frontend Development",
      description: "Tecnologías para interfaces modernas y responsivas",
      icon: "🎨",
      color: "#61DAFB",
      technologies: [
        {
          name: "JavaScript ES6+",
          level: 88,
          experience: "6 meses",
          description: "Lenguaje principal del bootcamp The Bridge",
          icon: ICONS_DATA.technologies.javascript.icon,
          color: "#F7DF1E",
          category: "language",
          projects: ["E-commerce MERN", "Dashboard React", "Portfolio"],
          skills: ["ES6+", "Async/Await", "Modules", "Classes"]
        },
        {
          name: "React",
          level: 85,
          experience: "5 meses",
          description: "Framework frontend principal aprendido en The Bridge",
          icon: ICONS_DATA.technologies.react.icon,
          color: "#61DAFB",
          category: "framework",
          projects: ["E-commerce Frontend", "Dashboard SPA", "Portfolio React"],
          skills: ["Hooks", "Context API", "JSX", "Components"]
        },
        {
          name: "HTML5",
          level: 95,
          experience: "8 meses",
          description: "Markup semántico y estructura web moderna",
          icon: ICONS_DATA.technologies.html5.icon,
          color: "#E34F26",
          category: "markup",
          projects: ["Todos los proyectos web"],
          skills: ["Semantic HTML", "Forms", "Accessibility", "SEO"]
        },
        {
          name: "CSS3",
          level: 90,
          experience: "8 meses", 
          description: "Estilos avanzados, Flexbox, Grid, animaciones",
          icon: ICONS_DATA.technologies.css3.icon,
          color: "#1572B6",
          category: "styling",
          projects: ["Portfolio responsivo", "Dashboard UI", "E-commerce styling"],
          skills: ["Flexbox", "Grid", "Animations", "Responsive Design"]
        },
        {
          name: "Bootstrap",
          level: 80,
          experience: "4 meses",
          description: "Framework CSS para desarrollo rápido",
          icon: ICONS_DATA.technologies.bootstrap.icon,
          color: "#7952B3",
          category: "framework",
          projects: ["Prototipos rápidos", "Dashboard inicial"],
          skills: ["Grid System", "Components", "Utilities", "Responsive"]
        },
        {
          name: "Sass",
          level: 75,
          experience: "3 meses",
          description: "Preprocesador CSS con funcionalidades avanzadas",
          icon: ICONS_DATA.technologies.sass.icon,
          color: "#CC6699",
          category: "preprocessor",
          projects: ["Portfolio avanzado", "Sistemas de diseño"],
          skills: ["Variables", "Mixins", "Nesting", "Functions"]
        },
        {
          name: "React Router",
          level: 80,
          experience: "4 meses",
          description: "Navegación declarativa para React",
          icon: ICONS_DATA.technologies.reactrouter.icon,
          color: "#CA4245",
          category: "library",
          projects: ["SPA con múltiples rutas"],
          skills: ["Routing", "Navigation", "Protected Routes"]
        },
        {
          name: "Chart.js",
          level: 70,
          experience: "3 meses",
          description: "Librería para gráficos interactivos",
          icon: ICONS_DATA.technologies.chartjs.icon,
          color: "#FF6384",
          category: "library",
          projects: ["Dashboard con analytics"],
          skills: ["Data Visualization", "Interactive Charts"]
        }
      ]
    },

    backend: {
      title: "Backend Development",
      description: "Desarrollo de APIs y lógica de servidor",
      icon: "⚙️",
      color: "#339933",
      technologies: [
        {
          name: "Node.js",
          level: 82,
          experience: "5 meses",
          description: "Runtime de JavaScript para backend",
          icon: ICONS_DATA.technologies.nodejs.icon,
          color: "#339933",
          category: "runtime",
          projects: ["API REST E-commerce", "Servidor de autenticación", "API Portfolio"],
          skills: ["Event Loop", "Modules", "File System", "HTTP Server"]
        },
        {
          name: "Express.js",
          level: 82,
          experience: "5 meses",
          description: "Framework web minimalista para Node.js",
          icon: ICONS_DATA.technologies.express.icon,
          color: "#000000",
          category: "framework",
          projects: ["API REST completa", "Servidor de E-commerce", "Microservicios"],
          skills: ["Routing", "Middleware", "Error Handling", "RESTful APIs"]
        },
        {
          name: "JWT",
          level: 75,
          experience: "4 meses",
          description: "Autenticación basada en tokens",
          icon: ICONS_DATA.technologies.jwt.icon,
          color: "#000000",
          category: "authentication",
          projects: ["Sistema de login", "API segura"],
          skills: ["Token Generation", "Validation", "Security"]
        },
        {
          name: "bcrypt",
          level: 70,
          experience: "3 meses",
          description: "Hashing de contraseñas seguro",
          icon: ICONS_DATA.technologies.bcrypt.icon,
          color: "#8B4513",
          category: "security",
          projects: ["Sistema de usuarios", "Autenticación segura"],
          skills: ["Password Hashing", "Salt Generation", "Security"]
        },
        {
          name: "NPM",
          level: 85,
          experience: "6 meses",
          description: "Gestor de paquetes de Node.js",
          icon: ICONS_DATA.technologies.npm.icon,
          color: "#CB3837",
          category: "package-manager",
          projects: ["Todos los proyectos Node.js"],
          skills: ["Package Management", "Scripts", "Dependencies"]
        }
      ]
    },

    database: {
      title: "Database Management",
      description: "Gestión de datos NoSQL y SQL",
      icon: "🗃️",
      color: "#47A248",
      technologies: [
        {
          name: "MongoDB",
          level: 78,
          experience: "4 meses",
          description: "Base de datos NoSQL para aplicaciones modernas",
          icon: ICONS_DATA.technologies.mongodb.icon,
          color: "#47A248",
          category: "nosql",
          projects: ["E-commerce Database", "User Management System", "Content Management"],
          skills: ["CRUD Operations", "Aggregation", "Indexing", "Schema Design"]
        },
        {
          name: "MySQL",
          level: 78,
          experience: "4 meses",
          description: "Base de datos relacional robusta",
          icon: ICONS_DATA.technologies.mysql.icon,
          color: "#4479A1",
          category: "sql",
          projects: ["Sistema de inventario", "API con relaciones", "Dashboard analytics"],
          skills: ["SQL Queries", "Joins", "Normalization", "Indexing"]
        },
        {
          name: "Sequelize",
          level: 70,
          experience: "3 meses",
          description: "ORM para Node.js y SQL databases",
          icon: ICONS_DATA.technologies.sequelize.icon,
          color: "#52B0E7",
          category: "orm",
          projects: ["API con MySQL", "Modelos relacionales"],
          skills: ["Models", "Associations", "Migrations", "Validations"]
        }
      ]
    },

    devops: {
      title: "DevOps & Cloud",
      description: "Despliegue y operaciones en la nube",
      icon: "☁️",
      color: "#2496ED",
      technologies: [
        {
          name: "Docker",
          level: 70,
          experience: "3 meses",
          description: "Containerización de aplicaciones",
          icon: ICONS_DATA.technologies.docker.icon,
          color: "#2496ED",
          category: "containerization",
          projects: ["Containerización de APIs", "Docker Compose setups", "Production deployment"],
          skills: ["Containerization", "Docker Compose", "Images", "Volumes"]
        },
        {
          name: "Firebase",
          level: 65,
          experience: "2 meses",
          description: "Plataforma de desarrollo de Google",
          icon: ICONS_DATA.technologies.firebase.icon,
          color: "#FFCA28",
          category: "cloud",
          projects: ["Deploy de SPAs", "Authentication"],
          skills: ["Hosting", "Authentication", "Real-time Database"]
        },
        {
          name: "Heroku",
          level: 68,
          experience: "3 meses",
          description: "Plataforma de despliegue en la nube",
          icon: ICONS_DATA.technologies.heroku.icon,
          color: "#430098",
          category: "cloud",
          projects: ["Deploy de APIs", "Aplicaciones full-stack"],
          skills: ["Deployment", "Environment Variables", "Add-ons"]
        }
      ]
    },

    tools: {
      title: "Development Tools",
      description: "Herramientas de desarrollo y productividad",
      icon: "🛠️",
      color: "#F05032",
      technologies: [
        {
          name: "Git",
          level: 80,
          experience: "6 meses",
          description: "Control de versiones distribuido",
          icon: ICONS_DATA.technologies.git.icon,
          color: "#F05032",
          category: "vcs",
          projects: ["Todos los proyectos", "Colaboración en equipo", "Deployment workflows"],
          skills: ["Version Control", "Branching", "Merging", "Remote Repositories"]
        },
        {
          name: "GitHub",
          level: 85,
          experience: "6 meses",
          description: "Plataforma de desarrollo colaborativo",
          icon: ICONS_DATA.technologies.github.icon,
          color: "#181717",
          category: "platform",
          projects: ["Portfolio público", "Proyectos colaborativos"],
          skills: ["Repositories", "Pull Requests", "Issues", "Actions"]
        },
        {
          name: "VS Code",
          level: 90,
          experience: "8 meses",
          description: "Editor de código moderno y extensible",
          icon: ICONS_DATA.technologies.vscode.icon,
          color: "#007ACC",
          category: "editor",
          projects: ["Desarrollo diario"],
          skills: ["Extensions", "Debugging", "IntelliSense", "Integration"]
        },
        {
          name: "Jest",
          level: 70,
          experience: "3 meses",
          description: "Framework de testing para JavaScript",
          icon: ICONS_DATA.technologies.jest.icon,
          color: "#C21325",
          category: "testing",
          projects: ["Testing de APIs", "Unit tests"],
          skills: ["Unit Testing", "Mocking", "Coverage", "Test Suites"]
        },
        {
          name: "Postman",
          level: 75,
          experience: "4 meses",
          description: "Herramienta para testing de APIs",
          icon: ICONS_DATA.technologies.postman.icon,
          color: "#FF6C37",
          category: "testing",
          projects: ["Testing de APIs REST", "Documentación"],
          skills: ["API Testing", "Collections", "Environment Variables"]
        },
        {
          name: "Swagger",
          level: 65,
          experience: "2 meses",
          description: "Documentación de APIs REST",
          icon: ICONS_DATA.technologies.swagger.icon,
          color: "#85EA2D",
          category: "documentation",
          projects: ["API Documentation", "OpenAPI Specification"],
          skills: ["API Documentation", "OpenAPI", "Interactive Docs"]
        },
        {
          name: "Bash",
          level: 60,
          experience: "3 meses",
          description: "Shell scripting y línea de comandos",
          icon: ICONS_DATA.technologies.bash.icon,
          color: "#4EAA25",
          category: "shell",
          projects: ["Automatización", "Scripts de deploy"],
          skills: ["Shell Scripting", "Command Line", "Automation"]
        }
      ]
    }
  },

  // Información del bootcamp actualizada
  bootcamp: {
    name: "The Bridge Digital Talent Accelerator",
    duration: "480 horas",
    completed: "07 de Febrero de 2025",
    employability: "96%",
    stack: "MERN",
    logo: ICONS_DATA.institutions.thebridge,
    certificate: "./assets/documents/Anthony Bonillla certificado_desarrollo_web_full_stack_bbk.pdf",
    certificate_image: ICONS_DATA.certificates.thebridge,
    skills_acquired: 25,
    projects_completed: 6,
    methodologies: ["Scrum", "Agile", "TDD", "Pair Programming"],
    focus: [
      "Desarrollo Full Stack con MERN",
      "Metodologías ágiles",
      "Testing con Jest",
      "DevOps con Docker",
      "Trabajo en equipo",
      "Proyectos reales"
    ]
  },

  // Proyectos principales con tecnologías detalladas
  projects: [
    {
      name: "E-commerce MERN Stack",
      description: "Plataforma completa de comercio electrónico",
      technologies: ["react", "nodejs", "mongodb", "express", "jwt", "bootstrap"],
      features: ["Autenticación JWT", "Carrito de compras", "Panel admin", "Pasarela de pago"],
      status: "Completado",
      category: "fullstack",
      repository: "https://github.com/anthony-bonilla/ecommerce-mern",
      demo: "#"
    },
    {
      name: "Dashboard Analytics",
      description: "Panel de control con visualizaciones avanzadas",
      technologies: ["react", "chartjs", "css3", "javascript", "d3"],
      features: ["Gráficos interactivos", "Filtros dinámicos", "Responsive design", "Real-time data"],
      status: "Completado", 
      category: "frontend",
      repository: "https://github.com/anthony-bonilla/dashboard-react",
      demo: "#"
    },
    {
      name: "API REST con Testing",
      description: "API robusta con documentación y testing completo",
      technologies: ["nodejs", "express", "mysql", "sequelize", "jest", "swagger", "postman"],
      features: ["CRUD completo", "Autenticación", "Testing automatizado", "Documentación API"],
      status: "Completado",
      category: "backend",
      repository: "https://github.com/anthony-bonilla/api-rest-complete",
      demo: "#"
    },
    {
      name: "Portfolio Personal",
      description: "Portfolio moderno y responsive",
      technologies: ["javascript", "html5", "css3", "sass", "git"],
      features: ["Diseño responsivo", "Animaciones CSS", "SEO optimizado", "Progressive Web App"],
      status: "En desarrollo",
      category: "frontend",
      repository: "https://github.com/anthony-bonilla/portfolio",
      demo: "#"
    }
  ],

  // Estadísticas actualizadas
  stats: {
    total_hours: 480,
    technologies_learned: 32, // Contando todas las tecnologías
    projects_completed: 6,
    average_skill_level: 78,
    advanced_skills: 12, // Skills con nivel >= 80
    certificates: 1,
    employability_rate: 96,
    github_repos: 8,
    lines_of_code: 15000
  }
};

// Funciones de utilidad actualizadas
export function getAllTechnologies() {
  const allTechs = [];
  Object.values(TECHNOLOGIES_CONFIG.stack).forEach(category => {
    allTechs.push(...category.technologies);
  });
  return allTechs.sort((a, b) => b.level - a.level);
}

export function getTechnologiesByCategory(categoryName) {
  return TECHNOLOGIES_CONFIG.stack[categoryName]?.technologies || [];
}

export function getTechnologyByName(name) {
  const allTechs = getAllTechnologies();
  return allTechs.find(tech => 
    tech.name.toLowerCase().includes(name.toLowerCase())
  );
}

export function getSkillLevel(level) {
  if (level >= 85) return 'expert';
  if (level >= 75) return 'advanced';  
  if (level >= 60) return 'intermediate';
  return 'beginner';
}

export function calculateCategoryAverage(categoryName) {
  const techs = getTechnologiesByCategory(categoryName);
  if (techs.length === 0) return 0;
  
  const total = techs.reduce((sum, tech) => sum + tech.level, 0);
  return Math.round(total / techs.length);
}

export function getProjectsByTechnology(techName) {
  return TECHNOLOGIES_CONFIG.projects.filter(project =>
    project.technologies.includes(techName.toLowerCase())
  );
}

export function getTechIcon(techName) {
  const tech = getTechnologyByName(techName);
  return tech?.icon || null;
}

export function getTechColor(techName) {
  const tech = getTechnologyByName(techName);
  return tech?.color || '#666666';
}

export function getTopTechnologies(limit = 10) {
  return getAllTechnologies().slice(0, limit);
}

export function getTechnologiesByLevel(minLevel = 75) {
  return getAllTechnologies().filter(tech => tech.level >= minLevel);
}

// Exportar configuración completa por defecto
export default TECHNOLOGIES_CONFIG;