export const contactConfig = {
    // Personal Information
    personal: {
        name: 'Tu Nombre',
        email: 'tu@email.com',
        phone: '+34 123 456 789',
        location: 'Madrid, España',
        timezone: 'UTC+1 (CET)',
        availability: 'available', // available, busy, unavailable
        languages: ['es', 'en'],
        workingHours: {
            monday: { start: '09:00', end: '18:00' },
            tuesday: { start: '09:00', end: '18:00' },
            wednesday: { start: '09:00', end: '18:00' },
            thursday: { start: '09:00', end: '18:00' },
            friday: { start: '09:00', end: '18:00' },
            saturday: null,
            sunday: null
        }
    },

    // Form Configuration
    form: {
        enableValidation: true,
        validateOnBlur: true,
        validateOnInput: false,
        enableRealTimeValidation: true,
        enableAutoSave: true,
        enableSpamProtection: true,
        enableReCaptcha: false, // Set to true and add site key
        reCaptchaSiteKey: 'your-recaptcha-site-key',
        maxMessageLength: 1000,
        maxSubmitsPerHour: 3,
        minTimeBetweenSubmits: 60000, // 1 minute
        enableCharacterCount: true,
        enableProgressIndicator: false
    },

    // Email Service Configuration
    email: {
        provider: 'emailjs', // emailjs, formspree, netlify
        fallbackProviders: ['formspree', 'netlify'],
        enableAutoResponse: true,
        enableNotifications: true,
        enableAnalytics: true,
        timeout: 30000,
        retryAttempts: 3,
        
        // EmailJS Configuration
        emailjs: {
            serviceId: 'your_service_id',
            templateId: 'your_template_id',
            autoResponseTemplateId: 'auto_response_template_id',
            publicKey: 'your_public_key'
        },
        
        // Formspree Configuration
        formspree: {
            endpoint: 'https://formspree.io/f/your_form_id',
            apiKey: null // Optional for premium features
        },
        
        // Netlify Configuration
        netlify: {
            formName: 'contact',
            enableHoneypot: true
        }
    },

    // Social Media Links
    social: {
        linkedin: 'https://linkedin.com/in/tu-perfil',
        github: 'https://github.com/tu-usuario',
        twitter: 'https://twitter.com/tu-usuario',
        instagram: 'https://instagram.com/tu-usuario',
        email: 'mailto:tu@email.com',
        whatsapp: 'https://wa.me/34123456789',
        telegram: null,
        discord: null
    },

    // FAQ Configuration
    faq: [
        {
            question: '¿Cuánto tiempo tardas en responder?',
            answer: 'Normalmente respondo dentro de 24 horas durante días laborables. Para consultas urgentes, puedes contactarme por WhatsApp.'
        },
        {
            question: '¿Trabajas con clientes internacionales?',
            answer: 'Sí, trabajo con clientes de todo el mundo. Estoy acostumbrado a trabajar en diferentes zonas horarias y en inglés.'
        },
        {
            question: '¿Ofreces mantenimiento post-proyecto?',
            answer: 'Absolutamente. Ofrezco planes de mantenimiento y soporte continuo para todos mis proyectos.'
        },
        {
            question: '¿Cuál es tu proceso de trabajo?',
            answer: 'Sigo una metodología ágil: consulta inicial, propuesta detallada, desarrollo iterativo con feedback constante, y entrega final con documentación.'
        },
        {
            question: '¿Qué tipos de proyectos prefieres?',
            answer: 'Me especializo en aplicaciones web modernas, e-commerce, y soluciones full-stack. Me encantan los proyectos que presentan desafíos técnicos interesantes.'
        },
        {
            question: '¿Trabajas solo o en equipo?',
            answer: 'Dependiendo del proyecto, puedo trabajar solo para proyectos pequeños a medianos, o liderar/colaborar con equipos para proyectos más grandes.'
        }
    ],

    // Notification Settings
    notifications: {
        position: 'top-right', // top-left, top-right, bottom-left, bottom-right
        maxNotifications: 5,
        defaultDuration: 5000,
        enableSound: false,
        enableAnimations: true,
        types: {
            success: {
                title: 'Éxito',
                duration: 4000,
                persistent: false
            },
            error: {
                title: 'Error',
                duration: 8000,
                persistent: true
            },
            warning: {
                title: 'Advertencia',
                duration: 6000,
                persistent: false
            },
            info: {
                title: 'Información',
                duration: 5000,
                persistent: false
            }
        }
    },

    // Analytics Configuration
    analytics: {
        trackFormInteractions: true,
        trackFieldFocus: true,
        trackFormSubmission: true,
        trackFormErrors: true,
        trackButtonClicks: true,
        trackSocialClicks: true,
        trackDownloads: true,
        enableHeatmap: false,
        enableUserRecording: false
    },

    // UI/UX Settings
    ui: {
        enableFormAnimations: true,
        enableMicroInteractions: true,
        enableLoadingStates: true,
        enableSuccessAnimations: true,
        enableErrorShaking: true,
        enableProgressBar: false,
        enableFloatingLabels: false,
        enableWorkingHours: false,
        theme: 'auto', // light, dark, auto
        enableDarkMode: true
    },

    // Security Settings
    security: {
        enableHoneypot: true,
        enableRateLimit: true,
        enableInputSanitization: true,
        enableCSRFProtection: false, // For server-side forms
        enableFieldEncryption: false,
        allowedDomains: [], // Empty array means all domains allowed
        blockDisposableEmails: false,
        enableBotDetection: true
    },

    // Accessibility Settings
    accessibility: {
        enableScreenReaderSupport: true,
        enableKeyboardNavigation: true,
        enableFocusIndicators: true,
        enableAriaLabels: true,
        enableLiveRegions: true,
        enableHighContrast: true,
        enableReducedMotion: true,
        fontSize: 'normal', // small, normal, large
        enableVoiceAnnouncements: true
    },

    // Performance Settings
    performance: {
        enableLazyLoading: true,
        enableImageOptimization: true,
        enableCaching: true,
        enableCompression: true,
        enableMinification: true,
        enableCDN: false,
        maxFileSize: 5242880, // 5MB
        enableProgressiveLoading: true
    },

    // Localization
    localization: {
        defaultLanguage: 'es',
        enableMultiLanguage: false,
        supportedLanguages: ['es', 'en'],
        dateFormat: 'DD/MM/YYYY',
        timeFormat: '24h',
        timezone: 'Europe/Madrid',
        currency: 'EUR',
        numberFormat: 'es-ES'
    }
};

// Experience Section Configuration
export const experienceConfig = {
    // Animation settings
    animationDelay: 150,
    scrollOffset: 100,
    
    // Filter settings
    defaultFilter: 'all',
    enableFiltering: true,
    enableFilterAnimations: true,
    
    // Display settings
    showTestimonials: true,
    maxFeaturedTestimonials: 3,
    showAchievements: true,
    enableDetailModal: true,
    
    // Skills integration
    enableSkillsIntegration: true,
    highlightRelatedSkills: true,
    showSkillBadges: true,
    
    // Counter animation
    counterDuration: 2000,
    counterEasing: 'easeOutCubic',
    enableCounterAnimation: true,
    
    // Timeline visual settings
    timeline: {
        showLine: true,
        pointSize: 24,
        lineWidth: 2,
        mobileBreakpoint: 768,
        enableHoverEffects: true,
        showDates: true,
        dateFormat: 'MMM YYYY'
    },
    
    // Testimonials settings
    testimonials: {
        enableCarousel: false,
        autoplay: false,
        autoplayDelay: 5000,
        showRatings: false,
        enableLinkedInLinks: true,
        showPhotos: true,
        maxVisible: 3
    },
    
    // Interactive features
    interactions: {
        enableHoverPreview: true,
        enableClickToExpand: true,
        enableKeyboardNavigation: true,
        enableTooltips: true,
        enableShareButtons: false
    },
    
    // Performance settings
    performance: {
        enableLazyLoading: true,
        enableVirtualScrolling: false,
        batchSize: 10,
        debounceDelay: 300
    },
    
    // Accessibility
    accessibility: {
        enableScreenReader: true,
        enableKeyboardNavigation: true,
        enableFocusIndicators: true,
        announceChanges: true
    }
};

// Navigation Configuration (updated to include both contact and experience)
export const navigationConfig = {
    items: [
        {
            name: 'home',
            label: 'Inicio',
            href: '#hero',
            icon: 'icon-home',
            order: 1,
            enabled: true
        },
        {
            name: 'about',
            label: 'Sobre Mí',
            href: '#about',
            icon: 'icon-user',
            order: 2,
            enabled: true
        },
        {
            name: 'skills',
            label: 'Habilidades',
            href: '#skills',
            icon: 'icon-code',
            order: 3,
            enabled: true
        },
        {
            name: 'experience',
            label: 'Experiencia',
            href: '#experience',
            icon: 'icon-briefcase',
            order: 4,
            enabled: true
        },
        {
            name: 'projects',
            label: 'Proyectos',
            href: '#projects',
            icon: 'icon-portfolio',
            order: 5,
            enabled: true
        },
        {
            name: 'contact',
            label: 'Contacto',
            href: '#contact',
            icon: 'icon-mail',
            order: 6,
            enabled: true
        }
    ],
    
    // Navigation behavior
    behavior: {
        enableSmoothScroll: true,
        scrollOffset: 100,
        highlightOnScroll: true,
        enableMobileMenu: true,
        stickyNavigation: true
    }
};

// Scroll Spy Configuration (updated to include experience)
export const scrollSpyConfig = {
    targets: ['#hero', '#about', '#skills', '#experience', '#projects', '#contact'],
    offset: 100,
    threshold: 0.3,
    enableHistoryUpdate: true,
    smoothScroll: true,
    scrollDuration: 800
};

// Contact Form Field Configurations
export const formFieldsConfig = {
    name: {
        type: 'text',
        required: true,
        minLength: 2,
        maxLength: 50,
        pattern: /^[a-zA-ZÀ-ÿ\s]+$/,
        autocomplete: 'name',
        placeholder: 'Tu nombre completo',
        validation: {
            required: 'El nombre es obligatorio',
            minLength: 'El nombre debe tener al menos 2 caracteres',
            maxLength: 'El nombre no puede exceder 50 caracteres',
            pattern: 'El nombre solo puede contener letras y espacios'
        }
    },
    email: {
        type: 'email',
        required: true,
        maxLength: 100,
        autocomplete: 'email',
        placeholder: 'tu@email.com',
        validation: {
            required: 'El email es obligatorio',
            email: 'Por favor ingresa un email válido',
            maxLength: 'El email no puede exceder 100 caracteres'
        }
    },
    phone: {
        type: 'tel',
        required: false,
        pattern: /^[\+]?[0-9\s\-\(\)]{9,20}$/,
        autocomplete: 'tel',
        placeholder: '+34 123 456 789',
        validation: {
            pattern: 'Por favor ingresa un teléfono válido'
        }
    },
    subject: {
        type: 'select',
        required: true,
        options: [
            { value: '', label: 'Selecciona una opción' },
            { value: 'web-development', label: 'Desarrollo Web' },
            { value: 'mobile-app', label: 'Aplicación Móvil' },
            { value: 'fullstack', label: 'Proyecto Full Stack' },
            { value: 'consulting', label: 'Consultoría Técnica' },
            { value: 'maintenance', label: 'Mantenimiento' },
            { value: 'other', label: 'Otro' }
        ],
        validation: {
            required: 'Selecciona un tipo de proyecto'
        }
    },
    budget: {
        type: 'radio',
        required: false,
        options: [
            { value: 'under-5k', label: 'Menos de €5,000' },
            { value: '5k-15k', label: '€5,000 - €15,000' },
            { value: '15k-30k', label: '€15,000 - €30,000' },
            { value: 'over-30k', label: 'Más de €30,000' },
            { value: 'discuss', label: 'A convenir' }
        ]
    },
    timeline: {
        type: 'select',
        required: false,
        options: [
            { value: '', label: 'Selecciona un timeline' },
            { value: 'asap', label: 'Lo antes posible' },
            { value: '1-month', label: 'Dentro de 1 mes' },
            { value: '3-months', label: 'Dentro de 3 meses' },
            { value: '6-months', label: 'Dentro de 6 meses' },
            { value: 'flexible', label: 'Flexible' }
        ]
    },
    message: {
        type: 'textarea',
        required: true,
        minLength: 10,
        maxLength: 1000,
        rows: 6,
        placeholder: 'Cuéntame sobre tu proyecto, objetivos, y cualquier detalle importante que deba conocer...',
        validation: {
            required: 'El mensaje es obligatorio',
            minLength: 'El mensaje debe tener al menos 10 caracteres',
            maxLength: 'El mensaje no puede exceder 1000 caracteres'
        }
    },
    privacy: {
        type: 'checkbox',
        required: true,
        label: 'Acepto la Política de Privacidad y el procesamiento de mis datos personales.',
        validation: {
            required: 'Debes aceptar la política de privacidad'
        }
    },
    newsletter: {
        type: 'checkbox',
        required: false,
        label: 'Me gustaría recibir actualizaciones ocasionales sobre nuevos proyectos y artículos.'
    }
};

// Error Messages
export const errorMessages = {
    contact: {
        submitFailed: 'Error al enviar el mensaje. Por favor, inténtalo de nuevo.',
        validationFailed: 'Por favor corrige los errores en el formulario antes de enviar.',
        rateLimited: 'Has enviado demasiados mensajes recientemente. Espera un momento antes de intentar de nuevo.',
        networkError: 'Error de conexión. Verifica tu conexión a internet e inténtalo de nuevo.',
        serverError: 'Error del servidor. Por favor inténtalo más tarde.',
        timeout: 'La solicitud ha tardado demasiado. Inténtalo de nuevo.',
        recaptchaFailed: 'Error de verificación. Inténtalo de nuevo.',
        emailServiceDown: 'El servicio de email está temporalmente no disponible.',
        invalidData: 'Los datos enviados no son válidos.',
        sessionExpired: 'Tu sesión ha expirado. Recarga la página e inténtalo de nuevo.'
    },
    experience: {
        loadFailed: 'Error al cargar la información de experiencia.',
        filterFailed: 'Error al filtrar elementos.',
        timelineFailed: 'Error al cargar el timeline.',
        testimonialsFailed: 'Error al cargar testimonios.',
        animationFailed: 'Error en las animaciones.'
    },
    general: {
        networkError: 'Error de conexión. Verifica tu conexión a internet.',
        unexpectedError: 'Ha ocurrido un error inesperado. Recarga la página.',
        dataCorrupted: 'Los datos están corruptos. Contacta al administrador.'
    }
};

// Success Messages
export const successMessages = {
    contact: {
        emailSent: '¡Mensaje enviado exitosamente! Te responderé pronto.',
        autoResponse: 'Recibirás una confirmación en tu email en breve.',
        formSaved: 'Tus datos han sido guardados automáticamente.',
        subscribed: 'Te has suscrito exitosamente a las actualizaciones.',
        downloadStarted: 'La descarga de tu CV ha comenzado.'
    },
    experience: {
        loaded: 'Experiencia cargada exitosamente.',
        filtered: 'Filtros aplicados.',
        expanded: 'Información expandida.',
        testimonialLoaded: 'Testimonio cargado.'
    }
};

// Feature Flags
export const contactFeatureFlags = {
    enableContactForm: true,
    enableEmailIntegration: true,
    enableSocialLinks: true,
    enableFAQ: true,
    enableCallToAction: true,
    enableAvailabilityStatus: true,
    enableWorkingHours: false,
    enableLiveChat: false,
    enableVideoCall: false,
    enableCalendlyIntegration: false,
    enableMapIntegration: false,
    enableTestimonials: false,
    enableContactAnalytics: true,
    enableABTesting: false
};

export const experienceFeatureFlags = {
    enableExperienceSection: true,
    enableTimeline: true,
    enableFiltering: true,
    enableTestimonials: true,
    enableAchievements: true,
    enableSkillsIntegration: true,
    enableAnimations: true,
    enableModalView: true,
    enableExport: false,
    enablePrint: false,
    enableShare: false,
    enableExperienceAnalytics: true
};

// A/B Testing Configurations
export const abTestingConfig = {
    contact: {
        enabled: false,
        experiments: [
            {
                name: 'form_layout',
                variants: ['single_column', 'two_column'],
                trafficSplit: 50
            },
            {
                name: 'cta_text',
                variants: ['Enviar Mensaje', 'Contactar Ahora', 'Hablemos'],
                trafficSplit: 33
            }
        ]
    },
    experience: {
        enabled: false,
        experiments: [
            {
                name: 'timeline_style',
                variants: ['vertical', 'horizontal'],
                trafficSplit: 50
            },
            {
                name: 'filter_position',
                variants: ['top', 'sidebar'],
                trafficSplit: 50
            }
        ]
    }
};

// Theme Configuration
export const themeConfig = {
    // Colors for both contact and experience sections
    colors: {
        primary: '#007bff',
        secondary: '#6c757d',
        success: '#28a745',
        danger: '#dc3545',
        warning: '#ffc107',
        info: '#17a2b8',
        light: '#f8f9fa',
        dark: '#343a40',
        
        // Experience specific colors
        timeline: {
            line: '#e9ecef',
            point: '#007bff',
            pointActive: '#0056b3',
            background: '#ffffff',
            backgroundAlt: '#f8f9fa'
        },
        
        // Contact specific colors
        form: {
            border: '#ced4da',
            focus: '#80bdff',
            error: '#dc3545',
            success: '#28a745'
        }
    },
    
    // Typography
    typography: {
        fontFamily: {
            primary: '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
            secondary: '"Poppins", sans-serif',
            mono: '"Fira Code", "Consolas", monospace'
        },
        fontSize: {
            xs: '0.75rem',
            sm: '0.875rem',
            base: '1rem',
            lg: '1.125rem',
            xl: '1.25rem',
            '2xl': '1.5rem',
            '3xl': '1.875rem',
            '4xl': '2.25rem'
        }
    },
    
    // Spacing
    spacing: {
        xs: '0.25rem',
        sm: '0.5rem',
        md: '1rem',
        lg: '1.5rem',
        xl: '2rem',
        '2xl': '3rem',
        '3xl': '4rem'
    },
    
    // Breakpoints
    breakpoints: {
        sm: '576px',
        md: '768px',
        lg: '992px',
        xl: '1200px',
        '2xl': '1400px'
    }
};

// Animation Configuration
export const animationConfig = {
    // Duration presets
    duration: {
        fast: 200,
        normal: 300,
        slow: 500,
        verySlow: 800
    },
    
    // Easing functions
    easing: {
        linear: 'linear',
        easeIn: 'ease-in',
        easeOut: 'ease-out',
        easeInOut: 'ease-in-out',
        bounce: 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
        smooth: 'cubic-bezier(0.4, 0, 0.2, 1)'
    },
    
    // Animation presets
    presets: {
        fadeIn: {
            from: { opacity: 0 },
            to: { opacity: 1 },
            duration: 300
        },
        slideUp: {
            from: { opacity: 0, transform: 'translateY(20px)' },
            to: { opacity: 1, transform: 'translateY(0)' },
            duration: 400
        },
        scaleIn: {
            from: { opacity: 0, transform: 'scale(0.9)' },
            to: { opacity: 1, transform: 'scale(1)' },
            duration: 300
        }
    }
};

// Complete Portfolio Configuration Object
export const portfolioConfig = {
    // Core sections
    contact: contactConfig,
    experience: experienceConfig,
    navigation: navigationConfig,
    scrollSpy: scrollSpyConfig,
    
    // Form and data
    formFields: formFieldsConfig,
    
    // Messages
    errors: errorMessages,
    success: successMessages,
    
    // Feature flags
    features: {
        contact: contactFeatureFlags,
        experience: experienceFeatureFlags
    },
    
    // Testing and optimization
    abTesting: abTestingConfig,
    
    // Design system
    theme: themeConfig,
    animations: animationConfig,
    
    // Global settings
    global: {
        enableAnalytics: true,
        enableErrorTracking: true,
        enablePerformanceMonitoring: true,
        enableAccessibility: true,
        enableResponsiveDesign: true,
        enableDarkMode: true,
        enablePWA: false,
        enableOfflineMode: false
    }
};

// Backward compatibility exports
export default portfolioConfig;

// Individual section exports for modular usage
export {
    contactConfig,
    experienceConfig,
    navigationConfig,
    scrollSpyConfig,
    formFieldsConfig,
    errorMessages,
    successMessages,
    contactFeatureFlags,
    experienceFeatureFlags,
    abTestingConfig,
    themeConfig,
    animationConfig
};