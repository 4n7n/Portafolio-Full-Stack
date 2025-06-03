const experienceData = [
  {
    id: 1,
    title: "Senior Frontend Developer",
    company: "TechCorp Solutions",
    location: "Madrid, España",
    type: "work",
    startDate: "2023-01-15",
    endDate: null, // Current position
    description: "Lidero el desarrollo frontend de aplicaciones web complejas utilizando React, TypeScript y arquitecturas modernas. Colaboro estrechamente con equipos de design y backend para crear experiencias de usuario excepcionales.",
    skills: ["React", "TypeScript", "Next.js", "Tailwind CSS", "GraphQL", "Jest", "Cypress"],
    achievements: [
      "Implementé una nueva arquitectura de componentes que redujo el tiempo de desarrollo en 40%",
      "Lideré la migración de JavaScript a TypeScript mejorando la calidad del código",
      "Mentoricé a 3 desarrolladores junior en mejores prácticas de React",
      "Optimicé el bundle size resultando en 60% mejora en tiempo de carga"
    ],
    projectsCount: 8,
    companyUrl: "https://techcorp.com",
    isCurrent: true
  },
  {
    id: 2,
    title: "Full Stack Developer",
    company: "StartupHub",
    location: "Barcelona, España",
    type: "work",
    startDate: "2021-06-01",
    endDate: "2022-12-30",
    description: "Desarrollé aplicaciones full-stack desde cero utilizando el stack MERN. Participé en todas las fases del ciclo de desarrollo desde el diseño de la base de datos hasta el deployment en producción.",
    skills: ["React", "Node.js", "MongoDB", "Express.js", "AWS", "Docker", "Redux"],
    achievements: [
      "Construí una plataforma de e-commerce que procesó €500K en ventas en el primer año",
      "Implementé sistema de pagos con Stripe y autenticación OAuth",
      "Configuré CI/CD pipeline que redujo errores de deployment en 90%",
      "Desarrollé API REST que maneja 10K+ requests diarios"
    ],
    projectsCount: 6,
    companyUrl: "https://startuphub.es"
  },
  {
    id: 3,
    title: "Frontend Developer",
    company: "Digital Agency Pro",
    location: "Valencia, España",
    type: "work",
    startDate: "2020-03-01",
    endDate: "2021-05-31",
    description: "Especializado en desarrollo de sitios web corporativos y landing pages de alto rendimiento. Trabajé con múltiples clientes implementando soluciones personalizadas con foco en UX/UI.",
    skills: ["HTML5", "CSS3", "JavaScript", "Vue.js", "Sass", "Webpack", "PHP"],
    achievements: [
      "Desarrollé 15+ sitios web para clientes corporativos",
      "Implementé mejoras de performance resultando en 85% mejor Core Web Vitals",
      "Creé sistema de componentes reutilizables que aceleró desarrollo en 50%",
      "Logré 98% satisfacción de clientes en proyectos entregados"
    ],
    projectsCount: 15,
    companyUrl: "https://digitalagencypro.com"
  },
  {
    id: 4,
    title: "Freelance Web Developer",
    company: "Independiente",
    location: "Remoto",
    type: "freelance",
    startDate: "2019-01-01",
    endDate: "2020-02-28",
    description: "Ofrecí servicios de desarrollo web freelance a pequeñas y medianas empresas. Especializado en WordPress, e-commerce y aplicaciones web personalizadas con enfoque en resultados de negocio.",
    skills: ["WordPress", "WooCommerce", "PHP", "MySQL", "JavaScript", "Bootstrap"],
    achievements: [
      "Completé 25+ proyectos freelance con 100% satisfacción",
      "Generé €150K en ingresos para clientes a través de e-commerce desarrollado",
      "Construí red de 50+ clientes recurrentes",
      "Mantuve rating 5/5 estrellas en plataformas freelance"
    ],
    projectsCount: 25,
    companyUrl: null
  },
  {
    id: 5,
    title: "Bootcamp Full Stack Web Development",
    company: "IronHack Madrid",
    location: "Madrid, España",
    type: "education",
    startDate: "2018-09-01",
    endDate: "2018-12-15",
    description: "Bootcamp intensivo de 500+ horas cubriendo desarrollo full-stack moderno. Proyectos hands-on con tecnologías actuales del mercado y metodologías ágiles.",
    skills: ["HTML5", "CSS3", "JavaScript", "Node.js", "MongoDB", "Express.js", "React"],
    achievements: [
      "Graduado con honores en top 10% de la clase",
      "Proyecto final seleccionado para demo day",
      "Desarrollé 3 aplicaciones full-stack funcionales",
      "Completé hackathon interno ocupando 2do lugar"
    ],
    projectsCount: 5,
    companyUrl: "https://ironhack.com",
    isCertification: true,
    certificateUrl: "https://certificates.ironhack.com/xyz"
  },
  {
    id: 6,
    title: "AWS Solutions Architect Associate",
    company: "Amazon Web Services",
    location: "Online",
    type: "education",
    startDate: "2022-03-01",
    endDate: "2022-04-15",
    description: "Certificación oficial de AWS para arquitectura de soluciones en la nube. Cubre diseño de sistemas escalables, seguros y cost-effective.",
    skills: ["AWS", "Cloud Architecture", "EC2", "S3", "RDS", "Lambda", "CloudFormation"],
    achievements: [
      "Certificación obtenida en primer intento con 890/1000 puntos",
      "Aplicado conocimientos en 5+ proyectos profesionales",
      "Redujo costos de infraestructura en 35% en proyectos actuales"
    ],
    projectsCount: 0,
    companyUrl: "https://aws.amazon.com",
    isCertification: true,
    certificateUrl: "https://aws.amazon.com/verification/xyz"
  },
  {
    id: 7,
    title: "Google Analytics Certified",
    company: "Google",
    location: "Online",
    type: "education",
    startDate: "2021-11-01",
    endDate: "2021-11-30",
    description: "Certificación en Google Analytics para análisis avanzado de datos web y optimización de conversiones.",
    skills: ["Google Analytics", "Data Analysis", "Conversion Optimization", "SEO"],
    achievements: [
      "Implementado en 20+ proyectos para seguimiento de KPIs",
      "Mejoré conversion rate promedio en 25% para clientes",
      "Configuré funnels de conversión avanzados"
    ],
    projectsCount: 0,
    companyUrl: "https://skillshop.exceedlms.com",
    isCertification: true,
    certificateUrl: "https://skillshop.exceedlms.com/xyz"
  },
  {
    id: 8,
    title: "Ingeniería Informática",
    company: "Universidad Politécnica de Madrid",
    location: "Madrid, España",
    type: "education",
    startDate: "2014-09-01",
    endDate: "2018-06-30",
    description: "Grado en Ingeniería Informática con especialización en Tecnologías de la Información. Sólida base en programación, algoritmos, bases de datos y arquitectura de software.",
    skills: ["Java", "C++", "Python", "SQL", "Algorithms", "Data Structures", "Software Engineering"],
    achievements: [
      "Graduado con Matrícula de Honor (GPA: 8.5/10)",
      "Proyecto final: Sistema de gestión hospitalaria con Java y Oracle",
      "Beca de excelencia académica durante 3 años",
      "Participación en programa Erasmus en TU Delft (Holanda)"
    ],
    projectsCount: 12,
    companyUrl: "https://upm.es",
    isCertification: false
  }
];

export default experienceData;