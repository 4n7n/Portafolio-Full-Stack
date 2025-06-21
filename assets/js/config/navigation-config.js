/**
 * Configuración de navegación - Versión corregida y optimizada
 * Incluye validación, fallbacks y mejores prácticas
 */

export const NAVIGATION_CONFIG = {
  // Elementos del menú principal con validación mejorada
  mainNav: [
    {
      id: 'inicio',
      label: 'Inicio',
      href: '#hero',
      icon: 'home',
      active: true,
      order: 1,
      visible: true,
      description: 'Ir al inicio de la página'
    },
    {
      id: 'sobre-mi',
      label: 'Sobre Mí',
      href: '#about',
      icon: 'user',
      active: false,
      order: 2,
      visible: true,
      description: 'Conocer más sobre mi experiencia'
    },
    {
      id: 'habilidades',
      label: 'Habilidades',
      href: '#skills',
      icon: 'code',
      active: false,
      order: 3,
      visible: true,
      description: 'Ver mis competencias técnicas'
    },
    {
      id: 'experiencia',
      label: 'Experiencia',
      href: '#experience',
      icon: 'briefcase',
      active: false,
      order: 4,
      visible: true,
      description: 'Revisar mi trayectoria profesional'
    },
    {
      id: 'proyectos',
      label: 'Proyectos',
      href: '#projects',
      icon: 'folder',
      active: false,
      order: 5,
      visible: true,
      description: 'Explorar mis trabajos realizados'
    },
    {
      id: 'contacto',
      label: 'Contacto',
      href: '#contact',
      icon: 'mail',
      active: false,
      order: 6,
      visible: true,
      description: 'Ponerse en contacto conmigo'
    }
  ],

  // Configuración de scroll con validación de rangos
  scroll: {
    offset: 80, // Offset para el navbar fijo (0-200px válido)
    duration: 800, // Duración en ms (200-2000ms válido)
    easing: 'easeInOutCubic', // Función de easing
    behavior: 'smooth', // 'smooth' | 'auto'
    block: 'start', // 'start' | 'center' | 'end' | 'nearest'
    updateURL: true, // Actualizar URL en navegación
    updateHistory: true, // Agregar a historial del navegador
    focusTarget: true, // Enfocar elemento de destino para accesibilidad
    preventDefaultOnLinks: true, // Prevenir comportamiento por defecto en enlaces
    tolerance: {
      up: 20, // Tolerancia hacia arriba para detección de scroll
      down: 20 // Tolerancia hacia abajo
    }
  },

  // Configuración del navbar con opciones responsivas
  navbar: {
    sticky: true,
    hideOnScroll: false, // Ocultar al hacer scroll hacia abajo
    hideOnScrollUp: false, // Mostrar al hacer scroll hacia arriba
    showProgressBar: true,
    mobileBreakpoint: 768,
    tabletBreakpoint: 1024,
    desktopBreakpoint: 1200,
    animationDuration: 300, // ms
    zIndex: 1000,
    backgroundColor: 'var(--navbar-bg, #ffffff)',
    backdropFilter: 'blur(10px)',
    borderBottom: '1px solid var(--border-color, #e5e7eb)',
    boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
    height: {
      mobile: '60px',
      tablet: '70px',
      desktop: '80px'
    },
    padding: {
      mobile: '0 1rem',
      tablet: '0 2rem',
      desktop: '0 3rem'
    }
  },

  // Configuración del menú móvil mejorada
  mobileMenu: {
    animationType: 'slide', // 'slide' | 'fade' | 'scale' | 'push'
    animationDuration: 300, // ms
    closeOnLinkClick: true,
    closeOnOutsideClick: true,
    closeOnEscape: true,
    overlayEnabled: true,
    overlayOpacity: 0.5,
    overlayColor: 'rgba(0, 0, 0, 0.5)',
    position: 'right', // 'left' | 'right' | 'top' | 'bottom'
    width: '280px',
    maxWidth: '90vw',
    minWidth: '250px',
    zIndex: 1001,
    blurBackground: true,
    showCloseButton: true,
    swipeToClose: true,
    gestureThreshold: 50, // px para gestos de cierre
    accessibilityFeatures: {
      trapFocus: true,
      restoreFocus: true,
      announceState: true
    }
  },

  // Breadcrumbs con configuración completa
  breadcrumbs: {
    enabled: false,
    separator: '/',
    separatorIcon: 'chevron-right',
    showHome: true,
    homeLabel: 'Inicio',
    homeIcon: 'home',
    maxItems: 5,
    truncateThreshold: 3,
    truncatePosition: 'middle', // 'start' | 'middle' | 'end'
    showCurrentPage: true,
    linkLastItem: false,
    schema: {
      enabled: true, // JSON-LD schema markup
      type: 'BreadcrumbList'
    },
    accessibility: {
      ariaLabel: 'Navegación breadcrumb',
      announceNavigation: true
    }
  },

  // Enlaces externos con validación y seguridad
  externalLinks: [
    {
      id: 'github',
      label: 'GitHub',
      href: 'https://github.com/tu-usuario',
      icon: 'github',
      target: '_blank',
      rel: 'noopener noreferrer',
      order: 1,
      visible: true,
      category: 'social',
      description: 'Ver mi perfil de GitHub'
    },
    {
      id: 'linkedin',
      label: 'LinkedIn',
      href: 'https://linkedin.com/in/tu-perfil',
      icon: 'linkedin',
      target: '_blank',
      rel: 'noopener noreferrer',
      order: 2,
      visible: true,
      category: 'social',
      description: 'Conectar en LinkedIn'
    },
    {
      id: 'twitter',
      label: 'Twitter',
      href: 'https://twitter.com/tu-usuario',
      icon: 'twitter',
      target: '_blank',
      rel: 'noopener noreferrer',
      order: 3,
      visible: false, // Opcional
      category: 'social',
      description: 'Seguir en Twitter'
    },
    {
      id: 'email',
      label: 'Email',
      href: 'mailto:tu-email@ejemplo.com',
      icon: 'mail',
      target: '_self',
      order: 4,
      visible: true,
      category: 'contact',
      description: 'Enviar email directo'
    },
    {
      id: 'cv',
      label: 'Descargar CV',
      href: '/assets/docs/cv.pdf',
      icon: 'download',
      target: '_blank',
      rel: 'noopener noreferrer',
      download: 'CV-Nombre-Apellido.pdf',
      order: 5,
      visible: true,
      category: 'document',
      description: 'Descargar curriculum vitae en PDF',
      fileSize: '2.1 MB', // Opcional, para mostrar tamaño
      fileType: 'PDF'
    }
  ],

  // Configuración de indicadores de progreso mejorada
  progressIndicators: {
    enabled: true,
    showPercentage: false,
    showSectionNames: true,
    style: 'bar', // 'bar' | 'circle' | 'dots' | 'line'
    position: 'top', // 'top' | 'bottom' | 'side' | 'floating'
    thickness: 3, // px para el grosor de la barra
    color: 'var(--primary-color, #3b82f6)',
    backgroundColor: 'var(--progress-bg, #e5e7eb)',
    animationDuration: 300, // ms
    smoothTransition: true,
    hideWhenComplete: false,
    zIndex: 1002,
    accessibility: {
      announce: true,
      label: 'Progreso de navegación',
      live: 'polite'
    },
    responsive: {
      mobile: { enabled: true, thickness: 2 },
      tablet: { enabled: true, thickness: 3 },
      desktop: { enabled: true, thickness: 3 }
    }
  },

  // Configuración de accesibilidad global
  accessibility: {
    skipLinks: {
      enabled: true,
      links: [
        { href: '#main-content', label: 'Saltar al contenido principal' },
        { href: '#main-nav', label: 'Saltar a la navegación principal' },
        { href: '#search', label: 'Saltar a la búsqueda' }
      ]
    },
    focusManagement: {
      enabled: true,
      showFocusRing: true,
      trapFocusInModals: true,
      restoreFocusOnClose: true
    },
    announcements: {
      enabled: true,
      navigationChanges: true,
      pageTransitions: true,
      formValidation: true
    },
    keyboardNavigation: {
      enabled: true,
      arrowKeys: true,
      homeEndKeys: true,
      escapeKey: true,
      tabNavigation: true
    },
    reducedMotion: {
      respectPreference: true,
      fallbackAnimations: 'fade',
      disableParallax: true
    }
  },

  // Configuración de animaciones
  animations: {
    enabled: true,
    respectReducedMotion: true,
    duration: {
      fast: 150,
      normal: 300,
      slow: 500
    },
    easing: {
      ease: 'ease',
      easeIn: 'ease-in',
      easeOut: 'ease-out',
      easeInOut: 'ease-in-out',
      custom: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)'
    },
    transitions: {
      navItems: 'all 0.3s ease',
      mobileMenu: 'transform 0.3s ease',
      progressBar: 'width 0.3s ease',
      scrollIndicator: 'opacity 0.2s ease'
    }
  },

  // Configuración de gestos (para dispositivos táctiles)
  gestures: {
    enabled: true,
    swipeThreshold: 50, // px
    swipeTimeout: 300, // ms
    allowHorizontalSwipe: true,
    allowVerticalSwipe: false,
    enablePullToRefresh: false,
    gestures: {
      swipeLeft: 'nextSection',
      swipeRight: 'previousSection',
      swipeUp: 'closeMenu',
      swipeDown: 'openMenu'
    }
  },

  // Configuración de rendimiento
  performance: {
    lazyLoadImages: true,
    preloadCriticalImages: true,
    deferNonCriticalCSS: true,
    minimizeRepaints: true,
    throttleScrollEvents: true,
    throttleResizeEvents: true,
    scrollThrottle: 16, // ms (60fps)
    resizeDebounce: 250, // ms
    useIntersectionObserver: true,
    prefetchOnHover: false, // Precargar al hacer hover
    cacheScrollPosition: true
  },

  // Configuración de análitics y tracking
  analytics: {
    enabled: false, // Habilitar solo si se necesita
    trackPageViews: true,
    trackNavigationClicks: true,
    trackScrollDepth: true,
    trackTimeOnSection: true,
    trackMobileMenuUsage: true,
    provider: 'google', // 'google' | 'custom' | null
    events: {
      navigation: 'navigation_click',
      sectionView: 'section_view',
      mobileMenu: 'mobile_menu_toggle',
      externalLink: 'external_link_click'
    }
  },

  // Configuración de debugging y desarrollo
  debug: {
    enabled: false, // Solo en desarrollo
    logScrollEvents: false,
    logNavigationEvents: false,
    showSectionBoundaries: false,
    highlightActiveSection: false,
    verboseLogging: false,
    performanceMonitoring: false
  },

  // Configuración de temas y estilos
  theming: {
    supportMultipleThemes: true,
    inheritFromGlobalTheme: true,
    customProperties: {
      navbarHeight: '--navbar-height',
      primaryColor: '--primary-color',
      backgroundColor: '--background-color',
      textColor: '--text-color',
      borderColor: '--border-color'
    },
    darkMode: {
      auto: true, // Detectar preferencia del sistema
      toggle: true, // Permitir toggle manual
      persistence: true, // Recordar preferencia
      className: 'dark-theme'
    }
  },

  // Validación y constantes
  constants: {
    MIN_SCROLL_OFFSET: 0,
    MAX_SCROLL_OFFSET: 200,
    MIN_ANIMATION_DURATION: 100,
    MAX_ANIMATION_DURATION: 2000,
    DEFAULT_MOBILE_BREAKPOINT: 768,
    DEFAULT_Z_INDEX: 1000,
    SCROLL_THROTTLE_MS: 16,
    RESIZE_DEBOUNCE_MS: 250
  },

  // Funciones de validación
  validators: {
    /**
     * Valida configuración de navegación
     */
    validateConfig(config) {
      const errors = [];
      
      // Validar mainNav
      if (!Array.isArray(config.mainNav) || config.mainNav.length === 0) {
        errors.push('mainNav debe ser un array no vacío');
      }
      
      // Validar offset de scroll
      if (config.scroll?.offset < this.constants.MIN_SCROLL_OFFSET || 
          config.scroll?.offset > this.constants.MAX_SCROLL_OFFSET) {
        errors.push(`scroll.offset debe estar entre ${this.constants.MIN_SCROLL_OFFSET} y ${this.constants.MAX_SCROLL_OFFSET}`);
      }
      
      // Validar duración de animación
      if (config.scroll?.duration < this.constants.MIN_ANIMATION_DURATION || 
          config.scroll?.duration > this.constants.MAX_ANIMATION_DURATION) {
        errors.push(`scroll.duration debe estar entre ${this.constants.MIN_ANIMATION_DURATION} y ${this.constants.MAX_ANIMATION_DURATION}`);
      }
      
      return {
        isValid: errors.length === 0,
        errors
      };
    },

    /**
     * Valida un elemento de navegación
     */
    validateNavItem(item) {
      const required = ['id', 'label', 'href'];
      const missing = required.filter(field => !item[field]);
      
      return {
        isValid: missing.length === 0,
        errors: missing.map(field => `Campo requerido: ${field}`)
      };
    },

    /**
     * Sanitiza href para prevenir XSS
     */
    sanitizeHref(href) {
      if (typeof href !== 'string') return '#';
      
      // Permitir solo URLs seguras
      const allowedProtocols = ['http:', 'https:', 'mailto:', 'tel:', '#'];
      const isAllowed = allowedProtocols.some(protocol => 
        href.startsWith(protocol) || href.startsWith('/')
      );
      
      return isAllowed ? href : '#';
    }
  },

  // Funciones de utilidad
  utils: {
    /**
     * Obtiene elementos de navegación visibles
     */
    getVisibleNavItems(items = this.mainNav) {
      return items.filter(item => item.visible !== false)
                  .sort((a, b) => (a.order || 0) - (b.order || 0));
    },

    /**
     * Obtiene enlaces externos por categoría
     */
    getExternalLinksByCategory(category, items = this.externalLinks) {
      return items.filter(item => item.category === category && item.visible !== false)
                  .sort((a, b) => (a.order || 0) - (b.order || 0));
    },

    /**
     * Encuentra elemento de navegación por ID
     */
    findNavItemById(id, items = this.mainNav) {
      return items.find(item => item.id === id);
    },

    /**
     * Genera configuración responsiva
     */
    getResponsiveConfig(breakpoint = 'desktop') {
      const configs = {
        mobile: {
          hideText: true,
          showIcons: true,
          compactMode: true
        },
        tablet: {
          hideText: false,
          showIcons: true,
          compactMode: false
        },
        desktop: {
          hideText: false,
          showIcons: true,
          compactMode: false
        }
      };
      
      return configs[breakpoint] || configs.desktop;
    }
  }
};

// Validar configuración al cargar
(() => {
  try {
    const validation = NAVIGATION_CONFIG.validators.validateConfig(NAVIGATION_CONFIG);
    if (!validation.isValid) {
      console.warn('⚠️ Errores en NAVIGATION_CONFIG:', validation.errors);
    } else {
      console.log('✅ NAVIGATION_CONFIG validado correctamente');
    }
  } catch (error) {
    console.error('❌ Error validando NAVIGATION_CONFIG:', error);
  }
})();

// Freeze para prevenir modificaciones accidentales
Object.freeze(NAVIGATION_CONFIG.mainNav);
Object.freeze(NAVIGATION_CONFIG.externalLinks);
Object.freeze(NAVIGATION_CONFIG.constants);

export default NAVIGATION_CONFIG;