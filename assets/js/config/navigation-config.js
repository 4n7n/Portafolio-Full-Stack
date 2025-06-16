export const NAVIGATION_CONFIG = {
  // Elementos del menú principal
  mainNav: [
    {
      id: 'inicio',
      label: 'Inicio',
      href: '#hero',
      icon: 'home',
      active: true
    },
    {
      id: 'sobre-mi',
      label: 'Sobre Mí',
      href: '#about',
      icon: 'user'
    },
    {
      id: 'habilidades',
      label: 'Habilidades',
      href: '#skills',
      icon: 'code'
    },
    {
      id: 'experiencia',
      label: 'Experiencia',
      href: '#experience',
      icon: 'briefcase'
    },
    {
      id: 'proyectos',
      label: 'Proyectos',
      href: '#projects',
      icon: 'folder'
    },
    {
      id: 'contacto',
      label: 'Contacto',
      href: '#contact',
      icon: 'mail'
    }
  ],

  // Configuración de scroll
  scroll: {
    offset: 80, // Offset para el navbar fijo
    duration: 800,
    easing: 'easeInOutCubic'
  },

  // Configuración del navbar
  navbar: {
    sticky: true,
    hideOnScroll: false,
    showProgressBar: true,
    mobileBreakpoint: 768
  },

  // Configuración del menú móvil
  mobileMenu: {
    animationType: 'slide', // 'slide' | 'fade' | 'scale'
    closeOnLinkClick: true,
    overlayEnabled: true
  },

  // Breadcrumbs (si se implementan)
  breadcrumbs: {
    enabled: false,
    separator: '/',
    showHome: true
  },

  // Enlaces externos
  externalLinks: [
    {
      id: 'github',
      label: 'GitHub',
      href: 'https://github.com/tu-usuario',
      icon: 'github',
      target: '_blank'
    },
    {
      id: 'linkedin',
      label: 'LinkedIn',
      href: 'https://linkedin.com/in/tu-perfil',
      icon: 'linkedin',
      target: '_blank'
    },
    {
      id: 'cv',
      label: 'Descargar CV',
      href: '/assets/docs/cv.pdf',
      icon: 'download',
      target: '_blank',
      download: true
    }
  ],

  // Configuración de indicadores de progreso
  progressIndicators: {
    enabled: true,
    showPercentage: false,
    style: 'bar', // 'bar' | 'circle' | 'dots'
    position: 'top' // 'top' | 'bottom' | 'side'
  }
};