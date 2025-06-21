/**
 * Configuración COMPLETA de tecnologías
 * Versión corregida y optimizada con validación y fallbacks
 */

import { ICONS_DATA } from '../data/icons-data.js';

export const TECHNOLOGIES_CONFIG = {
  // Stack principal organizado por categorías
  stack: {
    frontend: {
      title: "Frontend Development",
      description: "Tecnologías para interfaces modernas y responsivas",
      icon: "🎨",
      color: "#61DAFB",
      order: 1,
      technologies: [
        {
          id: "javascript",
          name: "JavaScript ES6+",
          level: 88,
          experience: "6 meses",
          description: "Lenguaje principal del bootcamp The Bridge",
          icon: this.getIconSafe('technologies.javascript.icon'),
          color: "#F7DF1E",
          category: "language",
          priority: "high",
          certified: true,
          projects: ["E-commerce MERN", "Dashboard React", "Portfolio"],
          skills: ["ES6+", "Async/Await", "Modules", "Classes", "DOM Manipulation"],
          documentation: "https://developer.mozilla.org/en-US/docs/Web/JavaScript",
          lastUsed: new Date("2025-02-01").toISOString()
        },
        {
          id: "react",
          name: "React",
          level: 85,
          experience: "5 meses",
          description: "Framework frontend principal aprendido en The Bridge",
          icon: this.getIconSafe('technologies.react.icon'),
          color: "#61DAFB",
          category: "framework",
          priority: "high",
          certified: true,
          projects: ["E-commerce Frontend", "Dashboard SPA", "Portfolio React"],
          skills: ["Hooks", "Context API", "JSX", "Components", "State Management"],
          documentation: "https://reactjs.org/docs",
          lastUsed: new Date("2025-02-01").toISOString()
        },
        {
          id: "html5",
          name: "HTML5",
          level: 95,
          experience: "8 meses",
          description: "Markup semántico y estructura web moderna",
          icon: this.getIconSafe('technologies.html5.icon'),
          color: "#E34F26",
          category: "markup",
          priority: "high",
          certified: true,
          projects: ["Todos los proyectos web"],
          skills: ["Semantic HTML", "Forms", "Accessibility", "SEO", "Web APIs"],
          documentation: "https://developer.mozilla.org/en-US/docs/Web/HTML",
          lastUsed: new Date("2025-02-01").toISOString()
        },
        {
          id: "css3",
          name: "CSS3",
          level: 90,
          experience: "8 meses", 
          description: "Estilos avanzados, Flexbox, Grid, animaciones",
          icon: this.getIconSafe('technologies.css3.icon'),
          color: "#1572B6",
          category: "styling",
          priority: "high",
          certified: true,
          projects: ["Portfolio responsivo", "Dashboard UI", "E-commerce styling"],
          skills: ["Flexbox", "Grid", "Animations", "Responsive Design", "CSS Variables"],
          documentation: "https://developer.mozilla.org/en-US/docs/Web/CSS",
          lastUsed: new Date("2025-02-01").toISOString()
        },
        {
          id: "bootstrap",
          name: "Bootstrap",
          level: 80,
          experience: "4 meses",
          description: "Framework CSS para desarrollo rápido",
          icon: this.getIconSafe('technologies.bootstrap.icon'),
          color: "#7952B3",
          category: "framework",
          priority: "medium",
          certified: false,
          projects: ["Prototipos rápidos", "Dashboard inicial"],
          skills: ["Grid System", "Components", "Utilities", "Responsive", "Theming"],
          documentation: "https://getbootstrap.com/docs",
          lastUsed: new Date("2024-12-01").toISOString()
        },
        {
          id: "sass",
          name: "Sass",
          level: 75,
          experience: "3 meses",
          description: "Preprocesador CSS con funcionalidades avanzadas",
          icon: this.getIconSafe('technologies.sass.icon'),
          color: "#CC6699",
          category: "preprocessor",
          priority: "medium",
          certified: false,
          projects: ["Portfolio avanzado", "Sistemas de diseño"],
          skills: ["Variables", "Mixins", "Nesting", "Functions", "Partials"],
          documentation: "https://sass-lang.com/documentation",
          lastUsed: new Date("2025-01-15").toISOString()
        },
        {
          id: "react-router",
          name: "React Router",
          level: 80,
          experience: "4 meses",
          description: "Navegación declarativa para React",
          icon: this.getIconSafe('technologies.reactrouter.icon'),
          color: "#CA4245",
          category: "library",
          priority: "medium",
          certified: false,
          projects: ["SPA con múltiples rutas"],
          skills: ["Routing", "Navigation", "Protected Routes", "Dynamic Routes"],
          documentation: "https://reactrouter.com/docs",
          lastUsed: new Date("2025-01-20").toISOString()
        },
        {
          id: "chartjs",
          name: "Chart.js",
          level: 70,
          experience: "3 meses",
          description: "Librería para gráficos interactivos",
          icon: this.getIconSafe('technologies.chartjs.icon'),
          color: "#FF6384",
          category: "library",
          priority: "low",
          certified: false,
          projects: ["Dashboard con analytics"],
          skills: ["Data Visualization", "Interactive Charts", "Responsive Charts"],
          documentation: "https://www.chartjs.org/docs",
          lastUsed: new Date("2025-01-10").toISOString()
        }
      ]
    },

    backend: {
      title: "Backend Development",
      description: "Desarrollo de APIs y lógica de servidor",
      icon: "⚙️",
      color: "#339933",
      order: 2,
      technologies: [
        {
          id: "nodejs",
          name: "Node.js",
          level: 82,
          experience: "5 meses",
          description: "Runtime de JavaScript para backend",
          icon: this.getIconSafe('technologies.nodejs.icon'),
          color: "#339933",
          category: "runtime",
          priority: "high",
          certified: true,
          projects: ["API REST E-commerce", "Servidor de autenticación", "API Portfolio"],
          skills: ["Event Loop", "Modules", "File System", "HTTP Server", "Streams"],
          documentation: "https://nodejs.org/docs",
          lastUsed: new Date("2025-02-01").toISOString()
        },
        {
          id: "express",
          name: "Express.js",
          level: 82,
          experience: "5 meses",
          description: "Framework web minimalista para Node.js",
          icon: this.getIconSafe('technologies.express.icon'),
          color: "#000000",
          category: "framework",
          priority: "high",
          certified: true,
          projects: ["API REST completa", "Servidor de E-commerce", "Microservicios"],
          skills: ["Routing", "Middleware", "Error Handling", "RESTful APIs", "Security"],
          documentation: "https://expressjs.com/",
          lastUsed: new Date("2025-02-01").toISOString()
        },
        {
          id: "jwt",
          name: "JWT",
          level: 75,
          experience: "4 meses",
          description: "Autenticación basada en tokens",
          icon: this.getIconSafe('technologies.jwt.icon'),
          color: "#000000",
          category: "authentication",
          priority: "high",
          certified: true,
          projects: ["Sistema de login", "API segura"],
          skills: ["Token Generation", "Validation", "Security", "Refresh Tokens"],
          documentation: "https://jwt.io/",
          lastUsed: new Date("2025-01-25").toISOString()
        },
        {
          id: "bcrypt",
          name: "bcrypt",
          level: 70,
          experience: "3 meses",
          description: "Hashing de contraseñas seguro",
          icon: this.getIconSafe('technologies.bcrypt.icon'),
          color: "#8B4513",
          category: "security",
          priority: "medium",
          certified: false,
          projects: ["Sistema de usuarios", "Autenticación segura"],
          skills: ["Password Hashing", "Salt Generation", "Security", "Validation"],
          documentation: "https://www.npmjs.com/package/bcrypt",
          lastUsed: new Date("2025-01-20").toISOString()
        },
        {
          id: "npm",
          name: "NPM",
          level: 85,
          experience: "6 meses",
          description: "Gestor de paquetes de Node.js",
          icon: this.getIconSafe('technologies.npm.icon'),
          color: "#CB3837",
          category: "package-manager",
          priority: "high",
          certified: false,
          projects: ["Todos los proyectos Node.js"],
          skills: ["Package Management", "Scripts", "Dependencies", "Versioning"],
          documentation: "https://docs.npmjs.com/",
          lastUsed: new Date("2025-02-01").toISOString()
        }
      ]
    },

    database: {
      title: "Database Management",
      description: "Gestión de datos NoSQL y SQL",
      icon: "🗃️",
      color: "#47A248",
      order: 3,
      technologies: [
        {
          id: "mongodb",
          name: "MongoDB",
          level: 78,
          experience: "4 meses",
          description: "Base de datos NoSQL para aplicaciones modernas",
          icon: this.getIconSafe('technologies.mongodb.icon'),
          color: "#47A248",
          category: "nosql",
          priority: "high",
          certified: true,
          projects: ["E-commerce Database", "User Management System", "Content Management"],
          skills: ["CRUD Operations", "Aggregation", "Indexing", "Schema Design", "Mongoose"],
          documentation: "https://docs.mongodb.com/",
          lastUsed: new Date("2025-01-30").toISOString()
        },
        {
          id: "mysql",
          name: "MySQL",
          level: 78,
          experience: "4 meses",
          description: "Base de datos relacional robusta",
          icon: this.getIconSafe('technologies.mysql.icon'),
          color: "#4479A1",
          category: "sql",
          priority: "high",
          certified: true,
          projects: ["Sistema de inventario", "API con relaciones", "Dashboard analytics"],
          skills: ["SQL Queries", "Joins", "Normalization", "Indexing", "Stored Procedures"],
          documentation: "https://dev.mysql.com/doc/",
          lastUsed: new Date("2025-01-25").toISOString()
        },
        {
          id: "sequelize",
          name: "Sequelize",
          level: 70,
          experience: "3 meses",
          description: "ORM para Node.js y SQL databases",
          icon: this.getIconSafe('technologies.sequelize.icon'),
          color: "#52B0E7",
          category: "orm",
          priority: "medium",
          certified: false,
          projects: ["API con MySQL", "Modelos relacionales"],
          skills: ["Models", "Associations", "Migrations", "Validations", "Hooks"],
          documentation: "https://sequelize.org/docs/",
          lastUsed: new Date("2025-01-15").toISOString()
        }
      ]
    },

    devops: {
      title: "DevOps & Cloud",
      description: "Despliegue y operaciones en la nube",
      icon: "☁️",
      color: "#2496ED",
      order: 4,
      technologies: [
        {
          id: "docker",
          name: "Docker",
          level: 70,
          experience: "3 meses",
          description: "Containerización de aplicaciones",
          icon: this.getIconSafe('technologies.docker.icon'),
          color: "#2496ED",
          category: "containerization",
          priority: "high",
          certified: true,
          projects: ["Containerización de APIs", "Docker Compose setups", "Production deployment"],
          skills: ["Containerization", "Docker Compose", "Images", "Volumes", "Networks"],
          documentation: "https://docs.docker.com/",
          lastUsed: new Date("2025-01-20").toISOString()
        },
        {
          id: "firebase",
          name: "Firebase",
          level: 65,
          experience: "2 meses",
          description: "Plataforma de desarrollo de Google",
          icon: this.getIconSafe('technologies.firebase.icon'),
          color: "#FFCA28",
          category: "cloud",
          priority: "medium",
          certified: false,
          projects: ["Deploy de SPAs", "Authentication"],
          skills: ["Hosting", "Authentication", "Real-time Database", "Cloud Functions"],
          documentation: "https://firebase.google.com/docs",
          lastUsed: new Date("2024-12-15").toISOString()
        },
        {
          id: "heroku",
          name: "Heroku",
          level: 68,
          experience: "3 meses",
          description: "Plataforma de despliegue en la nube",
          icon: this.getIconSafe('technologies.heroku.icon'),
          color: "#430098",
          category: "cloud",
          priority: "medium",
          certified: false,
          projects: ["Deploy de APIs", "Aplicaciones full-stack"],
          skills: ["Deployment", "Environment Variables", "Add-ons", "CI/CD"],
          documentation: "https://devcenter.heroku.com/",
          lastUsed: new Date("2025-01-10").toISOString()
        }
      ]
    },

    tools: {
      title: "Development Tools",
      description: "Herramientas de desarrollo y productividad",
      icon: "🛠️",
      color: "#F05032",
      order: 5,
      technologies: [
        {
          id: "git",
          name: "Git",
          level: 80,
          experience: "6 meses",
          description: "Control de versiones distribuido",
          icon: this.getIconSafe('technologies.git.icon'),
          color: "#F05032",
          category: "vcs",
          priority: "high",
          certified: true,
          projects: ["Todos los proyectos", "Colaboración en equipo", "Deployment workflows"],
          skills: ["Version Control", "Branching", "Merging", "Remote Repositories", "Conflict Resolution"],
          documentation: "https://git-scm.com/doc",
          lastUsed: new Date("2025-02-01").toISOString()
        },
        {
          id: "github",
          name: "GitHub",
          level: 85,
          experience: "6 meses",
          description: "Plataforma de desarrollo colaborativo",
          icon: this.getIconSafe('technologies.github.icon'),
          color: "#181717",
          category: "platform",
          priority: "high",
          certified: false,
          projects: ["Portfolio público", "Proyectos colaborativos"],
          skills: ["Repositories", "Pull Requests", "Issues", "Actions", "Project Management"],
          documentation: "https://docs.github.com/",
          lastUsed: new Date("2025-02-01").toISOString()
        },
        {
          id: "vscode",
          name: "VS Code",
          level: 90,
          experience: "8 meses",
          description: "Editor de código moderno y extensible",
          icon: this.getIconSafe('technologies.vscode.icon'),
          color: "#007ACC",
          category: "editor",
          priority: "high",
          certified: false,
          projects: ["Desarrollo diario"],
          skills: ["Extensions", "Debugging", "IntelliSense", "Integration", "Customization"],
          documentation: "https://code.visualstudio.com/docs",
          lastUsed: new Date("2025-02-01").toISOString()
        },
        {
          id: "jest",
          name: "Jest",
          level: 70,
          experience: "3 meses",
          description: "Framework de testing para JavaScript",
          icon: this.getIconSafe('technologies.jest.icon'),
          color: "#C21325",
          category: "testing",
          priority: "medium",
          certified: true,
          projects: ["Testing de APIs", "Unit tests"],
          skills: ["Unit Testing", "Mocking", "Coverage", "Test Suites", "Integration Testing"],
          documentation: "https://jestjs.io/docs",
          lastUsed: new Date("2025-01-20").toISOString()
        },
        {
          id: "postman",
          name: "Postman",
          level: 75,
          experience: "4 meses",
          description: "Herramienta para testing de APIs",
          icon: this.getIconSafe('technologies.postman.icon'),
          color: "#FF6C37",
          category: "testing",
          priority: "medium",
          certified: false,
          projects: ["Testing de APIs REST", "Documentación"],
          skills: ["API Testing", "Collections", "Environment Variables", "Automation"],
          documentation: "https://learning.postman.com/docs/",
          lastUsed: new Date("2025-01-25").toISOString()
        },
        {
          id: "swagger",
          name: "Swagger",
          level: 65,
          experience: "2 meses",
          description: "Documentación de APIs REST",
          icon: this.getIconSafe('technologies.swagger.icon'),
          color: "#85EA2D",
          category: "documentation",
          priority: "low",
          certified: false,
          projects: ["API Documentation", "OpenAPI Specification"],
          skills: ["API Documentation", "OpenAPI", "Interactive Docs", "Code Generation"],
          documentation: "https://swagger.io/docs/",
          lastUsed: new Date("2025-01-05").toISOString()
        },
        {
          id: "bash",
          name: "Bash",
          level: 60,
          experience: "3 meses",
          description: "Shell scripting y línea de comandos",
          icon: this.getIconSafe('technologies.bash.icon'),
          color: "#4EAA25",
          category: "shell",
          priority: "low",
          certified: false,
          projects: ["Automatización", "Scripts de deploy"],
          skills: ["Shell Scripting", "Command Line", "Automation", "System Administration"],
          documentation: "https://www.gnu.org/software/bash/manual/",
          lastUsed: new Date("2025-01-15").toISOString()
        }
      ]
    }
  },

  // Información del bootcamp actualizada
  bootcamp: {
    name: "The Bridge Digital Talent Accelerator",
    duration: "480 horas",
    completed: "07 de Febrero de 2025",
    completedTimestamp: new Date("2025-02-07").getTime(),
    employability: 96,
    employabilityString: "96%",
    stack: "MERN",
    logo: this.getIconSafe('institutions.thebridge'),
    certificate: "./assets/documents/Anthony Bonillla certificado_desarrollo_web_full_stack_bbk.pdf",
    certificate_image: this.getIconSafe('certificates.thebridge'),
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
    ],
    website: "https://www.thebridge.tech/",
    verified: true,
    location: "Madrid, España"
  },

  // Proyectos principales con tecnologías detalladas
  projects: [
    {
      id: "ecommerce-mern",
      name: "E-commerce MERN Stack",
      description: "Plataforma completa de comercio electrónico",
      technologies: ["react", "nodejs", "mongodb", "express", "jwt", "bootstrap"],
      features: ["Autenticación JWT", "Carrito de compras", "Panel admin", "Pasarela de pago"],
      status: "Completado",
      category: "fullstack",
      priority: "high",
      repository: "https://github.com/anthony-bonilla/ecommerce-mern",
      demo: "#",
      image: "./assets/images/projects/ecommerce.jpg",
      startDate: "2024-11-01",
      endDate: "2024-12-15",
      teamSize: 1,
      role: "Full Stack Developer"
    },
    {
      id: "dashboard-analytics",
      name: "Dashboard Analytics",
      description: "Panel de control con visualizaciones avanzadas",
      technologies: ["react", "chartjs", "css3", "javascript"],
      features: ["Gráficos interactivos", "Filtros dinámicos", "Responsive design", "Real-time data"],
      status: "Completado", 
      category: "frontend",
      priority: "medium",
      repository: "https://github.com/anthony-bonilla/dashboard-react",
      demo: "#",
      image: "./assets/images/projects/dashboard.jpg",
      startDate: "2024-10-15",
      endDate: "2024-11-10",
      teamSize: 1,
      role: "Frontend Developer"
    },
    {
      id: "api-rest-complete",
      name: "API REST con Testing",
      description: "API robusta con documentación y testing completo",
      technologies: ["nodejs", "express", "mysql", "sequelize", "jest", "swagger", "postman"],
      features: ["CRUD completo", "Autenticación", "Testing automatizado", "Documentación API"],
      status: "Completado",
      category: "backend",
      priority: "high",
      repository: "https://github.com/anthony-bonilla/api-rest-complete",
      demo: "#",
      image: "./assets/images/projects/api-rest.jpg",
      startDate: "2024-09-01",
      endDate: "2024-10-15",
      teamSize: 2,
      role: "Backend Developer"
    },
    {
      id: "portfolio-personal",
      name: "Portfolio Personal",
      description: "Portfolio moderno y responsive",
      technologies: ["javascript", "html5", "css3", "sass", "git"],
      features: ["Diseño responsivo", "Animaciones CSS", "SEO optimizado", "Progressive Web App"],
      status: "En desarrollo",
      category: "frontend",
      priority: "medium",
      repository: "https://github.com/anthony-bonilla/portfolio",
      demo: "#",
      image: "./assets/images/projects/portfolio.jpg",
      startDate: "2025-01-01",
      endDate: null,
      teamSize: 1,
      role: "Full Stack Developer"
    }
  ],

  // Estadísticas actualizadas y validadas
  stats: {
    total_hours: 480,
    technologies_learned: 32,
    projects_completed: 6,
    average_skill_level: 78,
    advanced_skills: 12, // Skills con nivel >= 80
    certificates: 1,
    employability_rate: 96,
    github_repos: 8,
    lines_of_code: 15000,
    commits: 250,
    pull_requests: 15,
    issues_resolved: 30
  },

  // Configuración y metadatos
  meta: {
    version: "2.0.0",
    lastUpdated: new Date().toISOString(),
    environment: typeof window !== 'undefined' ? 'browser' : 'node'
  },

  // Método para obtener iconos de forma segura
  getIconSafe(path) {
    try {
      if (typeof ICONS_DATA === 'undefined') {
        return './assets/images/icons/default.svg';
      }
      
      const keys = path.split('.');
      let value = ICONS_DATA;
      
      for (const key of keys) {
        if (value && typeof value === 'object' && key in value) {
          value = value[key];
        } else {
          return './assets/images/icons/default.svg';
        }
      }
      
      return value || './assets/images/icons/default.svg';
    } catch (error) {
      console.warn('Error obteniendo icono:', path, error);
      return './assets/images/icons/default.svg';
    }
  }
};

// Funciones de utilidad mejoradas con validación
export function getAllTechnologies() {
  try {
    const allTechs = [];
    Object.values(TECHNOLOGIES_CONFIG.stack).forEach(category => {
      if (category.technologies && Array.isArray(category.technologies)) {
        allTechs.push(...category.technologies);
      }
    });
    return allTechs.sort((a, b) => b.level - a.level);
  } catch (error) {
    console.error('Error obteniendo todas las tecnologías:', error);
    return [];
  }
}

export function getTechnologiesByCategory(categoryName) {
  try {
    if (!categoryName || typeof categoryName !== 'string') {
      console.warn('Nombre de categoría inválido:', categoryName);
      return [];
    }
    
    const category = TECHNOLOGIES_CONFIG.stack[categoryName];
    return category?.technologies || [];
  } catch (error) {
    console.error('Error obteniendo tecnologías por categoría:', error);
    return [];
  }
}

export function getTechnologyByName(name) {
  try {
    if (!name || typeof name !== 'string') {
      console.warn('Nombre de tecnología inválido:', name);
      return null;
    }
    
    const allTechs = getAllTechnologies();
    return allTechs.find(tech => 
      tech.name.toLowerCase().includes(name.toLowerCase()) ||
      tech.id.toLowerCase().includes(name.toLowerCase())
    ) || null;
  } catch (error) {
    console.error('Error obteniendo tecnología por nombre:', error);
    return null;
  }
}

export function getTechnologyById(id) {
  try {
    if (!id || typeof id !== 'string') {
      console.warn('ID de tecnología inválido:', id);
      return null;
    }
    
    const allTechs = getAllTechnologies();
    return allTechs.find(tech => tech.id === id) || null;
  } catch (error) {
    console.error('Error obteniendo tecnología por ID:', error);
    return null;
  }
}

export function getSkillLevel(level) {
  try {
    const numLevel = parseInt(level);
    if (isNaN(numLevel)) return 'unknown';
    
    if (numLevel >= 85) return 'expert';
    if (numLevel >= 75) return 'advanced';  
    if (numLevel >= 60) return 'intermediate';
    return 'beginner';
  } catch (error) {
    console.error('Error calculando nivel de skill:', error);
    return 'unknown';
  }
}

export function calculateCategoryAverage(categoryName) {
  try {
    const techs = getTechnologiesByCategory(categoryName);
    if (techs.length === 0) return 0;
    
    const total = techs.reduce((sum, tech) => {
      const level = parseInt(tech.level) || 0;
      return sum + level;
    }, 0);
    
    return Math.round(total / techs.length);
  } catch (error) {
    console.error('Error calculando promedio de categoría:', error);
    return 0;
  }
}

export function getProjectsByTechnology(techName) {
  try {
    if (!techName || typeof techName !== 'string') {
      console.warn('Nombre de tecnología inválido para búsqueda de proyectos:', techName);
      return [];
    }
    
    return TECHNOLOGIES_CONFIG.projects.filter(project =>
      Array.isArray(project.technologies) && 
      project.technologies.includes(techName.toLowerCase())
    );
  } catch (error) {
    console.error('Error obteniendo proyectos por tecnología:', error);
    return [];
  }
}

export function getTechIcon(techName) {
  try {
    const tech = getTechnologyByName(techName);
    return tech?.icon || './assets/images/icons/default.svg';
  } catch (error) {
    console.error('Error obteniendo icono de tecnología:', error);
    return './assets/images/icons/default.svg';
  }
}

export function getTechColor(techName) {
  try {
    const tech = getTechnologyByName(techName);
    return tech?.color || '#666666';
  } catch (error) {
    console.error('Error obteniendo color de tecnología:', error);
    return '#666666';
  }
}

export function getTopTechnologies(limit = 10) {
  try {
    const validLimit = Math.max(1, Math.min(50, parseInt(limit) || 10));
    return getAllTechnologies().slice(0, validLimit);
  } catch (error) {
    console.error('Error obteniendo top tecnologías:', error);
    return [];
  }
}

export function getTechnologiesByLevel(minLevel = 75) {
  try {
    const validMinLevel = Math.max(0, Math.min(100, parseInt(minLevel) || 75));
    return getAllTechnologies().filter(tech => {
      const level = parseInt(tech.level) || 0;
      return level >= validMinLevel;
    });
  } catch (error) {
    console.error('Error obteniendo tecnologías por nivel:', error);
    return [];
  }
}

export function getTechnologiesByPriority(priority = 'high') {
  try {
    const validPriorities = ['high', 'medium', 'low'];
    const validPriority = validPriorities.includes(priority) ? priority : 'high';
    
    return getAllTechnologies().filter(tech => tech.priority === validPriority);
  } catch (error) {
    console.error('Error obteniendo tecnologías por prioridad:', error);
    return [];
  }
}

export function getCertifiedTechnologies() {
  try {
    return getAllTechnologies().filter(tech => tech.certified === true);
  } catch (error) {
    console.error('Error obteniendo tecnologías certificadas:', error);
    return [];
  }
}

export function getRecentlyUsedTechnologies(days = 30) {
  try {
    const daysAgo = new Date();
    daysAgo.setDate(daysAgo.getDate() - days);
    
    return getAllTechnologies().filter(tech => {
      if (!tech.lastUsed) return false;
      const lastUsedDate = new Date(tech.lastUsed);
      return lastUsedDate >= daysAgo;
    }).sort((a, b) => new Date(b.lastUsed) - new Date(a.lastUsed));
  } catch (error) {
    console.error('Error obteniendo tecnologías recientes:', error);
    return [];
  }
}

export function getTechnologiesByCategory2(category) {
  try {
    if (!category || typeof category !== 'string') {
      console.warn('Categoría inválida:', category);
      return [];
    }
    
    return getAllTechnologies().filter(tech => 
      tech.category && tech.category.toLowerCase() === category.toLowerCase()
    );
  } catch (error) {
    console.error('Error obteniendo tecnologías por categoría de tech:', error);
    return [];
  }
}

export function getProjectById(projectId) {
  try {
    if (!projectId || typeof projectId !== 'string') {
      console.warn('ID de proyecto inválido:', projectId);
      return null;
    }
    
    return TECHNOLOGIES_CONFIG.projects.find(project => project.id === projectId) || null;
  } catch (error) {
    console.error('Error obteniendo proyecto por ID:', error);
    return null;
  }
}

export function getProjectsByStatus(status = 'Completado') {
  try {
    if (!status || typeof status !== 'string') {
      console.warn('Status inválido:', status);
      return [];
    }
    
    return TECHNOLOGIES_CONFIG.projects.filter(project => 
      project.status && project.status.toLowerCase() === status.toLowerCase()
    );
  } catch (error) {
    console.error('Error obteniendo proyectos por status:', error);
    return [];
  }
}

export function getProjectsByCategory(category) {
  try {
    if (!category || typeof category !== 'string') {
      console.warn('Categoría de proyecto inválida:', category);
      return [];
    }
    
    return TECHNOLOGIES_CONFIG.projects.filter(project => 
      project.category && project.category.toLowerCase() === category.toLowerCase()
    );
  } catch (error) {
    console.error('Error obteniendo proyectos por categoría:', error);
    return [];
  }
}

export function validateTechnologyData() {
  try {
    const errors = [];
    const warnings = [];
    
    // Validar estructura principal
    if (!TECHNOLOGIES_CONFIG.stack || typeof TECHNOLOGIES_CONFIG.stack !== 'object') {
      errors.push('stack debe ser un objeto');
      return { isValid: false, errors, warnings };
    }
    
    // Validar cada categoría
    Object.entries(TECHNOLOGIES_CONFIG.stack).forEach(([categoryKey, category]) => {
      if (!category.title) {
        warnings.push(`Categoría ${categoryKey} no tiene título`);
      }
      
      if (!Array.isArray(category.technologies)) {
        errors.push(`Categoría ${categoryKey} no tiene array de tecnologías`);
        return;
      }
      
      // Validar cada tecnología
      category.technologies.forEach((tech, index) => {
        if (!tech.id) {
          errors.push(`Tecnología en ${categoryKey}[${index}] no tiene ID`);
        }
        
        if (!tech.name) {
          errors.push(`Tecnología en ${categoryKey}[${index}] no tiene nombre`);
        }
        
        if (typeof tech.level !== 'number' || tech.level < 0 || tech.level > 100) {
          errors.push(`Tecnología ${tech.name || 'sin nombre'} tiene nivel inválido: ${tech.level}`);
        }
        
        if (!tech.color || !tech.color.startsWith('#')) {
          warnings.push(`Tecnología ${tech.name || 'sin nombre'} no tiene color válido`);
        }
        
        if (!Array.isArray(tech.skills)) {
          warnings.push(`Tecnología ${tech.name || 'sin nombre'} no tiene array de skills`);
        }
        
        if (!Array.isArray(tech.projects)) {
          warnings.push(`Tecnología ${tech.name || 'sin nombre'} no tiene array de proyectos`);
        }
      });
    });
    
    // Validar proyectos
    if (Array.isArray(TECHNOLOGIES_CONFIG.projects)) {
      TECHNOLOGIES_CONFIG.projects.forEach((project, index) => {
        if (!project.id) {
          errors.push(`Proyecto en índice ${index} no tiene ID`);
        }
        
        if (!project.name) {
          errors.push(`Proyecto en índice ${index} no tiene nombre`);
        }
        
        if (!Array.isArray(project.technologies)) {
          warnings.push(`Proyecto ${project.name || 'sin nombre'} no tiene array de tecnologías`);
        }
      });
    }
    
    return {
      isValid: errors.length === 0,
      errors,
      warnings
    };
  } catch (error) {
    console.error('Error en validación de datos:', error);
    return {
      isValid: false,
      errors: ['Error interno en validación'],
      warnings: []
    };
  }
}

export function getConfigStats() {
  try {
    const allTechs = getAllTechnologies();
    const stats = {
      totalTechnologies: allTechs.length,
      categoriesCount: Object.keys(TECHNOLOGIES_CONFIG.stack).length,
      projectsCount: TECHNOLOGIES_CONFIG.projects.length,
      averageSkillLevel: 0,
      expertSkills: 0,
      advancedSkills: 0,
      intermediateSkills: 0,
      beginnerSkills: 0,
      certifiedCount: 0,
      highPriorityCount: 0
    };
    
    if (allTechs.length > 0) {
      // Calcular promedio
      const totalLevel = allTechs.reduce((sum, tech) => sum + (parseInt(tech.level) || 0), 0);
      stats.averageSkillLevel = Math.round(totalLevel / allTechs.length);
      
      // Contar por niveles
      allTechs.forEach(tech => {
        const level = parseInt(tech.level) || 0;
        const skillLevel = getSkillLevel(level);
        
        switch (skillLevel) {
          case 'expert':
            stats.expertSkills++;
            break;
          case 'advanced':
            stats.advancedSkills++;
            break;
          case 'intermediate':
            stats.intermediateSkills++;
            break;
          default:
            stats.beginnerSkills++;
        }
        
        if (tech.certified) stats.certifiedCount++;
        if (tech.priority === 'high') stats.highPriorityCount++;
      });
    }
    
    return stats;
  } catch (error) {
    console.error('Error obteniendo estadísticas:', error);
    return {
      totalTechnologies: 0,
      categoriesCount: 0,
      projectsCount: 0,
      averageSkillLevel: 0,
      expertSkills: 0,
      advancedSkills: 0,
      intermediateSkills: 0,
      beginnerSkills: 0,
      certifiedCount: 0,
      highPriorityCount: 0
    };
  }
}

// Validación automática al cargar
(() => {
  try {
    const validation = validateTechnologyData();
    
    if (validation.errors.length > 0) {
      console.error('❌ Errores en TECHNOLOGIES_CONFIG:', validation.errors);
    }
    
    if (validation.warnings.length > 0) {
      console.warn('⚠️ Advertencias en TECHNOLOGIES_CONFIG:', validation.warnings);
    }
    
    if (validation.isValid) {
      console.log('✅ TECHNOLOGIES_CONFIG validado correctamente');
      const stats = getConfigStats();
      console.log('📊 Estadísticas:', stats);
    }
  } catch (error) {
    console.error('❌ Error en validación automática:', error);
  }
})();

// Exportar configuración completa por defecto
export default TECHNOLOGIES_CONFIG;