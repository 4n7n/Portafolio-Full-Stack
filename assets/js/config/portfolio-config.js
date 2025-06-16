
export const PORTFOLIO_CONFIG = {
  // Información personal
  personal: {
    name: "Tu Nombre",
    title: "Desarrollador Full Stack",
    email: "tu.email@ejemplo.com",
    phone: "+34 XXX XXX XXX",
    location: "Oviedo, Asturias, España",
    linkedIn: "https://linkedin.com/in/tu-perfil",
    github: "https://github.com/tu-usuario",
    website: "https://tu-portfolio.com"
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
      loop: true
    }
  },

  // Configuración de formulario de contacto
  contact: {
    emailService: 'emailjs', // 'emailjs' | 'formspree' | 'custom'
    emailJsConfig: {
      serviceId: 'tu_service_id',
      templateId: 'tu_template_id',
      publicKey: 'tu_public_key'
    },
    recaptcha: {
      enabled: false,
      siteKey: 'tu_recaptcha_site_key'
    }
  },

  // Configuración de API
  api: {
    github: {
      username: 'tu-usuario',
      maxRepos: 6,
      excludeRepos: ['repo-privado', 'fork-irrelevante']
    }
  },

  // Configuración de SEO
  seo: {
    title: "Tu Nombre - Desarrollador Full Stack",
    description: "Portafolio de desarrollador Full Stack especializado en tecnologías modernas",
    keywords: ["desarrollador", "full stack", "javascript", "react", "node.js"],
    ogImage: "/assets/images/og-image.jpg"
  },

  // Configuración de redes sociales
  social: {
    github: "https://github.com/tu-usuario",
    linkedin: "https://linkedin.com/in/tu-perfil",
    twitter: "https://twitter.com/tu-usuario",
    instagram: "https://instagram.com/tu-usuario",
    behance: "https://behance.net/tu-usuario"
  },

  // Configuración de la galería de proyectos
  projects: {
    itemsPerPage: 6,
    enableFiltering: true,
    enableSearch: true,
    enableLightbox: true
  }
};