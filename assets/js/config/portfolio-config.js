export const PORTFOLIO_CONFIG = {
  // Información personal - ANTHONY BONILLA PAREDES
  personal: {
    name: "Anthony Bonilla Paredes",
    title: "Desarrollador Web Full Stack",
    subtitle: "Especialista en Stack MERN",
    email: "anthony.bonilla@email.com",
    phone: "+34 XXX XXX XXX",
    location: "España",
    linkedIn: "https://linkedin.com/in/anthony-bonilla-paredes",
    github: "https://github.com/anthony-bonilla",
    website: "https://anthony-portfolio.com",
    avatar: "./assets/images/profile/avatar.jpg",
    heroImage: "./assets/images/profile/hero-bg.jpg",
    aboutImage: "./assets/images/profile/about-me.jpg"
  },

  // Certificación oficial
  education: {
    bootcamp: {
      name: "Desarrollo Web Full Stack",
      institution: "The Bridge Digital Talent Accelerator",
      duration: "480 horas",
      completed: "07 de Febrero de 2025",
      logo: "./assets/images/institutions/The_Bridge.svg",
      certificate: "./assets/images/certificates/Anthony-Bonillla-certificado_desarrollo_web_full_stack_bbk.jpg",
      document: "./assets/documents/Anthony Bonillla certificado_desarrollo_web_full_stack_bbk.pdf",
      stack: "MERN",
      employability: "96%",
      description: "Bootcamp intensivo con metodologías ágiles, proyectos reales y programa de empleabilidad"
    }
  },

  // Configuración de imágenes y recursos
  assets: {
    // Logos de tecnologías por categoría
    technologies: {
      frontend: {
        basePath: "./assets/images/technologies/frontend/",
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
        logos: {
          mysql: "mysql.svg",
          mongodb: "mongodb.svg",
          sequelize: "sequelize.svg"
        }
      },
      devops: {
        basePath: "./assets/images/technologies/devops/",
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

    // Íconos de interfaz
    icons: {
      social: {
        basePath: "./assets/images/icons/social/",
        icons: {
          github: "github.svg",
          linkedin: "linkedin.svg",
          twitter: "twitter.svg",
          instagram: "instagram.svg",
          email: "email.svg"
        }
      },
      contact: {
        basePath: "./assets/images/icons/contact/",
        icons: {
          phone: "phone.svg",
          location: "location.svg",
          calendar: "calendar.svg",
          message: "message.svg"
        }
      },
      ui: {
        basePath: "./assets/images/icons/ui/",
        icons: {
          menu: "menu.svg",
          close: "close.svg",
          arrowDown: "arrow-down.svg",
          arrowRight: "arrow-right.svg",
          download: "download.svg",
          externalLink: "external-link.svg",
          themeToggle: "theme-toggle.svg"
        }
      }
    },

    // Imágenes de instituciones
    institutions: {
      basePath: "./assets/images/institutions/",
      logos: {
        theBridge: "The_Bridge.svg",
        bbk: "BBK.svg"
      }
    }
  },

  // Configuración de redes sociales
  social: {
    github: {
      url: "https://github.com/anthony-bonilla",
      username: "@anthony-bonilla",
      icon: "./assets/images/icons/social/github.svg"
    },
    linkedin: {
      url: "https://linkedin.com/in/anthony-bonilla-paredes", 
      username: "Anthony Bonilla",
      icon: "./assets/images/icons/social/linkedin.svg"
    },
    twitter: {
      url: "https://twitter.com/anthony_bonilla",
      username: "@anthony_bonilla",
      icon: "./assets/images/icons/social/twitter.svg"
    },
    instagram: {
      url: "https://instagram.com/anthony_bonilla",
      username: "@anthony_bonilla", 
      icon: "./assets/images/icons/social/instagram.svg"
    }
  },

  // Información de contacto
  contact: {
    info: [
      {
        type: "email",
        label: "Email",
        value: "anthony.bonilla@email.com",
        icon: "./assets/images/icons/contact/message.svg",
        href: "mailto:anthony.bonilla@email.com"
      },
      {
        type: "phone",
        label: "Teléfono", 
        value: "+34 XXX XXX XXX",
        icon: "./assets/images/icons/contact/phone.svg",
        href: "tel:+34XXXXXXXXX"
      },
      {
        type: "location",
        label: "Ubicación",
        value: "España",
        icon: "./assets/images/icons/contact/location.svg"
      },
      {
        type: "availability",
        label: "Disponibilidad",
        value: "Disponible para nuevas oportunidades",
        icon: "./assets/images/icons/contact/calendar.svg"
      }
    ],
    
    // Documentos descargables
    documents: [
      {
        name: "CV Español",
        file: "./assets/documents/cv-es.pdf",
        icon: "./assets/images/icons/ui/download.svg"
      },
      {
        name: "CV English",
        file: "./assets/documents/cv-en.pdf", 
        icon: "./assets/images/icons/ui/download.svg"
      },
      {
        name: "Certificado The Bridge",
        file: "./assets/documents/Anthony Bonillla certificado_desarrollo_web_full_stack_bbk.pdf",
        icon: "./assets/images/icons/ui/download.svg"
      }
    ]
  },

  // Configuración de tema
  theme: {
    defaultTheme: 'dark',
    enableSystemPreference: true,
    transitionDuration: 300
  },

  // Configuración de animaciones
  animations: {
    scrollReveal: {
      distance: '50px',
      duration: 800,
      delay: 100,
      easing: 'ease-out'
    },
    typingEffect: {
      typeSpeed: 50,
      backSpeed: 30,
      backDelay: 2000,
      loop: true,
      strings: [
        "Desarrollador Full Stack",
        "Especialista en MERN Stack", 
        "Graduado de The Bridge",
        "Apasionado por JavaScript"
      ]
    }
  },

  // Configuración de formulario de contacto
  contactForm: {
    emailService: 'emailjs',
    emailJsConfig: {
      serviceId: 'service_anthony',
      templateId: 'template_contact',
      publicKey: 'your_public_key'
    },
    recaptcha: {
      enabled: false,
      siteKey: 'your_recaptcha_site_key'
    }
  },

  // Configuración de API
  api: {
    github: {
      username: 'anthony-bonilla',
      maxRepos: 6,
      excludeRepos: ['private-repo'],
      featured: ['mern-ecommerce', 'react-dashboard', 'fullstack-api']
    }
  },

  // Configuración de SEO
  seo: {
    title: "Anthony Bonilla Paredes - Desarrollador Full Stack",
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
      "Bootcamp"
    ],
    ogImage: "./assets/images/profile/og-image.jpg",
    author: "Anthony Bonilla Paredes"
  },

  // Configuración de la galería de proyectos
  projects: {
    itemsPerPage: 6,
    enableFiltering: true,
    enableSearch: true,
    enableLightbox: true,
    categories: [
      "MERN Stack",
      "Frontend", 
      "Backend",
      "Full Stack",
      "API REST"
    ]
  },

  // Configuración específica del bootcamp
  bootcampInfo: {
    stackFocus: "MERN",
    hoursCompleted: 480,
    graduated: "07/02/2025",
    employabilityRate: "96%",
    methodology: "Agile",
    projectBased: true,
    skills: [
      "Frontend con React",
      "Backend con Node.js/Express",
      "Bases de datos MySQL/MongoDB", 
      "DevOps con Docker",
      "Testing con Jest",
      "APIs REST",
      "Metodologías ágiles"
    ]
  }
};