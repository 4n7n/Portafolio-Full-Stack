export const TESTIMONIALS_DATA = {
  // Testimonios de clientes y colegas
  testimonials: [
    {
      id: 1,
      name: "María González",
      position: "Project Manager",
      company: "TechStart Solutions",
      avatar: "/assets/images/testimonials/maria-gonzalez.jpg",
      rating: 5,
      text: "Trabajar con él ha sido una experiencia excepcional. Su capacidad para resolver problemas complejos y su atención al detalle son impresionantes. Siempre entrega código limpio y bien documentado.",
      project: "Sistema de Gestión Empresarial",
      date: "2024-02-15",
      featured: true,
      tags: ["Profesionalismo", "Calidad de código", "Resolución de problemas"]
    },

    {
      id: 2,
      name: "Carlos Rodríguez",
      position: "CEO",
      company: "Digital Marketing Pro",
      avatar: "/assets/images/testimonials/carlos-rodriguez.jpg",
      rating: 5,
      text: "Sus landing pages han aumentado significativamente nuestras conversiones. Entiende perfectamente las necesidades del negocio y las traduce en soluciones técnicas efectivas. Muy recomendable.",
      project: "Landing Pages Corporativas",
      date: "2023-08-20",
      featured: true,
      tags: ["Resultados", "Comprensión del negocio", "Conversiones"]
    },

    {
      id: 3,
      name: "Ana Martín",
      position: "Senior Developer",
      company: "TechStart Solutions",
      avatar: "/assets/images/testimonials/ana-martin.jpg",
      rating: 5,
      text: "Como mentor, puedo decir que es uno de los desarrolladores junior más prometedores que he conocido. Aprende rápido, hace buenas preguntas y siempre está dispuesto a ayudar al equipo.",
      project: "Colaboración en equipo",
      date: "2024-01-10",
      featured: true,
      tags: ["Aprendizaje rápido", "Trabajo en equipo", "Potencial"]
    },

    {
      id: 4,
      name: "David López",
      position: "UX/UI Designer",
      company: "Freelance",
      avatar: "/assets/images/testimonials/david-lopez.jpg",
      rating: 4,
      text: "Excelente colaboración en varios proyectos. Traduce perfectamente los diseños a código y propone mejoras técnicas que benefician la experiencia del usuario. Comunicación fluida y profesional.",
      project: "Múltiples proyectos web",
      date: "2023-11-05",
      featured: false,
      tags: ["Colaboración", "Pixel perfect", "UX awareness"]
    },

    {
      id: 5,
      name: "Laura Fernández",
      position: "Marketing Director",
      company: "StartUp Asturias",
      avatar: "/assets/images/testimonials/laura-fernandez.jpg",
      rating: 5,
      text: "Desarrolló nuestra web corporativa superando todas las expectativas. El resultado es moderno, rápido y perfectamente optimizado para SEO. El proceso fue transparente y los plazos se cumplieron.",
      project: "Sitio Web Corporativo",
      date: "2023-07-12",
      featured: false,
      tags: ["SEO", "Diseño moderno", "Cumplimiento de plazos"]
    },

    {
      id: 6,
      name: "Roberto Sánchez",
      position: "Technical Lead",
      company: "Innovación Digital Asturias",
      avatar: "/assets/images/testimonials/roberto-sanchez.jpg",
      rating: 4,
      text: "Durante sus prácticas demostró gran capacidad de aprendizaje y adaptación. Pasó de conocimientos básicos a contribuir significativamente en proyectos reales en muy poco tiempo.",
      project: "Período de prácticas",
      date: "2023-02-28",
      featured: false,
      tags: ["Prácticas", "Evolución", "Adaptación"]
    }
  ],

  // Estadísticas de testimonios
  stats: {
    totalTestimonials: 6,
    averageRating: 4.8,
    ratingDistribution: {
      5: 5,
      4: 1,
      3: 0,
      2: 0,
      1: 0
    },
    totalProjects: 15,
    clientSatisfaction: 98,
    repeatClients: 3
  },

  // Configuración de visualización
  display: {
    showRatings: true,
    showAvatars: true,
    showCompanies: true,
    showDates: true,
    showTags: true,
    maxTestimonialsPerPage: 3,
    autoRotate: true,
    rotationInterval: 5000, // 5 segundos
    enableNavigation: true
  },

  filters: {
    byRating: [5, 4, 3, 2, 1],
    byCompany: [
      "TechStart Solutions",
      "Digital Marketing Pro", 
      "Innovación Digital Asturias",
      "Freelance",
      "StartUp Asturias"
    ],
    byProject: [
      "Frontend",
      "Backend", 
      "Full Stack",
      "UI/UX",
      "SEO/Marketing"
    ],
    byFeatured: ["featured", "all"]
  },

  categories: {
    technical: [1, 3, 6], // IDs de testimonios técnicos
    business: [2, 5], // IDs de testimonios de negocio
    collaboration: [4, 6], // IDs de testimonios de colaboración
    featured: [1, 2, 3] // IDs de testimonios destacados
  },

  cta: {
    title: "¿Trabajamos juntos?",
    subtitle: "Únete a estos clientes satisfechos",
    buttonText: "Contactar ahora",
    buttonLink: "#contact"
  }
};