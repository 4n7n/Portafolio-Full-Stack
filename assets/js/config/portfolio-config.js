export const portfolioConfig = {
  responsive: {
    // Breakpoints configuration
    breakpoints: {
      xs: 0,
      sm: 480,
      md: 768,
      lg: 1024,
      xl: 1200,
      '2xl': 1440
    },
    
    // Device detection settings
    deviceDetection: {
      enabled: true,
      forceRefreshOnResize: true,
      debounceDelay: 200,
      orientationChangeDelay: 300
    },
    
    // Touch optimization settings
    touchOptimization: {
      enabled: true,
      minTouchTarget: 44, // pixels
      comfortableTouchTarget: 48,
      largeTouchTarget: 56,
      touchFeedbackDuration: 150,
      preventDefaultOnTouch: ['touchstart', 'touchmove'],
      enableRippleEffect: true,
      gestureThreshold: 50
    },
    
    // Performance optimization
    performanceOptimizations: {
      enableAdaptiveQuality: true,
      enableBatteryOptimization: true,
      enableNetworkAwareness: true,
      memoryThreshold: 75, // percentage
      lowBatteryThreshold: 20, // percentage
      criticalBatteryThreshold: 10,
      
      // Performance profiles
      profiles: {
        low: {
          maxAnimations: 3,
          enableParallax: false,
          enableComplexEffects: false,
          reducedAnimationDuration: 0.5,
          imageQuality: 60,
          lazyLoadThreshold: '50px'
        },
        medium: {
          maxAnimations: 5,
          enableParallax: false,
          enableComplexEffects: true,
          reducedAnimationDuration: 0.7,
          imageQuality: 80,
          lazyLoadThreshold: '100px'
        },
        high: {
          maxAnimations: 10,
          enableParallax: true,
          enableComplexEffects: true,
          reducedAnimationDuration: 1,
          imageQuality: 95,
          lazyLoadThreshold: '200px'
        }
      }
    },
    
    // Image optimization
    imageOptimization: {
      enableResponsiveImages: true,
      enableModernFormats: true,
      formatPriority: ['avif', 'webp', 'jpg', 'png'],
      densities: [1, 1.5, 2, 3],
      qualityByConnection: {
        'slow-2g': 40,
        '2g': 50,
        '3g': 70,
        '4g': 85,
        'default': 80
      },
      placeholderType: 'blur', // 'blur' | 'skeleton' | 'color'
      enableLazyLoading: true
    },
    
    // Network awareness
    networkAwareness: {
      enabled: true,
      dataSaveMode: {
        enableOnSlowConnection: true,
        enableOnSaveData: true,
        reduceImageQuality: true,
        disableAutoplay: true,
        limitAnimations: true
      },
      adaptiveLoading: {
        preloadCritical: true,
        deferNonCritical: true,
        loadOnInteraction: ['contact-form', 'project-modals']
      }
    },
    
    // Accessibility enhancements
    accessibility: {
      respectReducedMotion: true,
      respectHighContrast: true,
      enableKeyboardNavigation: true,
      announcePageChanges: true,
      focusManagement: true,
      minContrastRatio: 4.5,
      enableScreenReaderOptimizations: true
    }
  },

  hero: {
    // Existing hero config...
    typingStrings: [
      'Full Stack Developer',
      'Frontend Specialist',
      'Backend Engineer',
      'UI/UX Designer',
      'Problem Solver'
    ],
    typingSpeed: 100,
    deletingSpeed: 50,
    pauseDuration: 2000,
    
    // Responsive enhancements
    responsive: {
      enableParallax: {
        desktop: true,
        tablet: false,
        mobile: false
      },
      heightSettings: {
        desktop: '100vh',
        tablet: '80vh',
        mobile: '100svh' // Small viewport height for mobile
      },
      textScaling: {
        desktop: 1,
        tablet: 0.9,
        mobile: 0.8
      },
      touchOptimizations: {
        enlargeButtons: true,
        addTouchFeedback: true,
        optimizeScrollIndicator: true
      }
    },
    
    // Background optimization
    background: {
      enableParticles: {
        desktop: true,
        tablet: false,
        mobile: false
      },
      particleCount: {
        desktop: 80,
        tablet: 40,
        mobile: 0
      },
      enableVideoBackground: false, // Disabled for performance
      fallbackImage: '/assets/images/hero-bg-optimized.jpg'
    }
  },

  skills: {
    // Animation settings
    animationDuration: 2000,
    animationDelay: 200,
    enableStaggeredAnimation: true,
    
    // Responsive optimizations
    responsive: {
      grid: {
        mobile: '1fr',
        tablet: 'repeat(2, 1fr)',
        desktop: 'repeat(3, 1fr)'
      },
      cardMinHeight: {
        mobile: '120px',
        tablet: '140px',
        desktop: '160px'
      },
      touchOptimizations: {
        enableSwipeNavigation: true,
        enlargeFilterButtons: true,
        addTouchFeedback: true
      }
    },
    
    // Performance settings
    performance: {
      enableVirtualScrolling: false, // For large skill lists
      lazyLoadIcons: true,
      preloadCriticalSkills: ['React', 'JavaScript', 'Node.js'],
      animationThreshold: 0.3 // Intersection ratio
    }
  },

  projects: {
    // Existing projects config...
    itemsPerPage: 6,
    enableInfiniteScroll: false,
    enableLazyLoading: true,
    
    // Responsive enhancements
    responsive: {
      grid: {
        mobile: '1fr',
        tablet: 'repeat(2, 1fr)',
        desktop: 'repeat(3, 1fr)'
      },
      cardAspectRatio: {
        mobile: '16/10',
        tablet: '16/12',
        desktop: '16/10'
      },
      touchOptimizations: {
        enableSwipeNavigation: true,
        enablePullToRefresh: false,
        touchFriendlyFilters: true,
        modalSwipeToClose: true
      },
      modalBehavior: {
        fullscreenOnMobile: true,
        enableSwipeNavigation: true,
        autoCloseOnEscape: true
      }
    },
    
    // Image optimization
    images: {
      enableResponsive: true,
      sizes: {
        thumbnail: { width: 400, height: 250 },
        medium: { width: 800, height: 500 },
        large: { width: 1200, height: 750 }
      },
      formats: ['avif', 'webp', 'jpg'],
      enablePlaceholders: true,
      placeholderType: 'blur'
    }
  },

  contact: {
    // Form validation
    validation: {
      enableRealTime: true,
      showErrorsOnBlur: true,
      requireAllFields: false
    },
    
    // Responsive optimizations
    responsive: {
      layout: {
        mobile: 'single-column',
        tablet: 'two-column',
        desktop: 'two-column'
      },
      inputOptimizations: {
        enableAutocomplete: true,
        mobileKeyboardTypes: true,
        enlargeInputs: true,
        improvedFocusStates: true
      },
      touchOptimizations: {
        enlargeButtons: true,
        addTouchFeedback: true,
        enableSwipeToSubmit: false,
        voiceInputSupport: false // Future feature
      }
    },
    
    // Performance settings
    performance: {
      enableProgressiveEnhancement: true,
      enableOfflineSupport: false,
      enableFormPersistence: true,
      debounceValidation: 300
    }
  },

  navigation: {
    // Existing nav config...
    enableSmoothScroll: true,
    scrollOffset: 80,
    highlightActiveSection: true,
    
    // Mobile navigation enhancements
    mobile: {
      enableOffCanvas: true,
      enableBottomNavigation: false, // Alternative navigation
      animationType: 'slide', // 'slide' | 'fade' | 'scale'
      enableBackdrop: true,
      enableSwipeToClose: true,
      enableFocusTrap: true,
      position: 'left' // 'left' | 'right' | 'top' | 'bottom'
    },
    
    // Touch optimizations
    touch: {
      enableSwipeNavigation: true,
      swipeThreshold: 50,
      enableTouchFeedback: true,
      enlargeTargets: true,
      preventAccidentalTaps: true
    },
    
    // Scroll behavior
    scroll: {
      hideOnScroll: true,
      showOnScrollUp: true,
      threshold: 100,
      enableCompactMode: true // Smaller navbar on scroll
    }
  },

  animations: {
    // Global animation settings
    globalDuration: 300,
    globalEasing: 'cubic-bezier(0.4, 0, 0.2, 1)',
    enableStagger: true,
    staggerDelay: 100,
    
    // Responsive animation settings
    responsive: {
      enableOnMobile: true,
      reducedDurationMobile: 0.7,
      disableComplexOnLowEnd: true,
      enableGPUAcceleration: true,
      respectReducedMotion: true
    },
    
    // Performance thresholds
    performance: {
      maxConcurrentAnimations: {
        mobile: 3,
        tablet: 5,
        desktop: 10
      },
      frameRateThreshold: 30, // FPS
      memoryThreshold: 75, // percentage
      batteryThreshold: 20 // percentage
    },
    
    // Scroll animations
    scroll: {
      enableIntersectionObserver: true,
      threshold: 0.1,
      rootMargin: '50px',
      enableParallax: {
        desktop: true,
        tablet: false,
        mobile: false
      }
    }
  },

  theme: {
    // Existing theme config...
    defaultTheme: 'auto', // 'light' | 'dark' | 'auto'
    enableSystemPreference: true,
    persistPreference: true,
    
    // Responsive theme settings
    responsive: {
      adaptiveTransitions: true,
      reducedMotionCompatible: true,
      batteryAwareTransitions: true,
      networkAwareLoading: true
    },
    
    // Touch optimizations
    touch: {
      enlargeToggleButton: true,
      addTouchFeedback: true,
      enableSwipeToToggle: false,
      improvedAccessibility: true
    }
  },

  performance: {
    // Core Web Vitals monitoring
    monitoring: {
      enableCoreWebVitals: true,
      enableUserTiming: true,
      enableMemoryMonitoring: true,
      enableNetworkMonitoring: true,
      enableBatteryMonitoring: true
    },
    
    // Performance budgets
    budgets: {
      loadTime: {
        mobile: 3000, // ms
        desktop: 2000
      },
      firstContentfulPaint: {
        mobile: 1800,
        desktop: 1200
      },
      largestContentfulPaint: {
        mobile: 2500,
        desktop: 2000
      },
      cumulativeLayoutShift: 0.1,
      firstInputDelay: 100
    },
    
    // Optimization triggers
    optimization: {
      autoOptimizeOnSlowDevice: true,
      autoReduceQualityOnSlowNetwork: true,
      autoEnableBatterySaveMode: true,
      warningThresholds: {
        memory: 75,
        battery: 20,
        network: 'slow-2g'
      }
    }
  },

  analytics: {
    // Enhanced tracking for responsive features
    trackDeviceInfo: true,
    trackPerformanceMetrics: true,
    trackTouchInteractions: true,
    trackOrientationChanges: true,
    trackNetworkConditions: true,
    trackBatteryLevel: false, // Privacy consideration
    
    // Custom events
    customEvents: {
      deviceTypeDetection: true,
      performanceProfileDetection: true,
      touchGestureUsage: true,
      responsiveBreakpointChanges: false,
      orientationChangeFrequency: false
    }
  },

  accessibility: {
    // Enhanced accessibility for mobile
    mobileEnhancements: {
      enableVoiceOver: true,
      enableTalkBack: true,
      improvedFocusManagement: true,
      enhancedTouchTargets: true,
      alternativeInteractionMethods: true
    },
    
    // Screen reader optimizations
    screenReader: {
      enableLiveRegions: true,
      announcePageChanges: true,
      announceStateChanges: true,
      enableSkipLinks: true,
      improvedHeadingStructure: true
    },
    
    // Keyboard navigation
    keyboard: {
      enableTabTrapping: true,
      improvedFocusIndicators: true,
      customKeyboardShortcuts: false,
      enableArrowKeyNavigation: true
    }
  },

  development: {
    // Debug settings for responsive development
    debug: {
      enableDeviceSimulation: false,
      showBreakpointIndicator: false,
      enablePerformanceOverlay: false,
      enableTouchVisualization: false,
      logResponsiveChanges: true,
      enableA11yChecking: false
    },
    
    // Hot reload settings
    hotReload: {
      enableCSSHotReload: false,
      enableJSHotReload: false,
      watchResponsiveChanges: false
    }
  },

  social: {
    github: 'https://github.com/yourusername',
    linkedin: 'https://linkedin.com/in/yourprofile',
    twitter: 'https://twitter.com/yourusername',
    email: 'your.email@example.com',
    
    // Responsive display options
    responsive: {
      showAllOnDesktop: true,
      limitOnMobile: true,
      mobileLimit: 4,
      enableSwipeOnMobile: false
    }
  },

  api: {
    // Existing API config...
    baseUrl: process.env.API_BASE_URL || 'https://api.yourportfolio.com',
    timeout: 10000,
    
    // Responsive API settings
    responsive: {
      enableNetworkAwareTimeout: true,
      timeoutByConnection: {
        'slow-2g': 20000,
        '2g': 15000,
        '3g': 10000,
        '4g': 5000
      },
      enableRetry: true,
      maxRetries: 3,
      retryDelay: 1000
    }
  },

  features: {
    // Responsive feature flags
    enableResponsiveOptimization: true,
    enableTouchOptimization: true,
    enablePerformanceMonitoring: true,
    enableNetworkAwareness: true,
    enableBatteryOptimization: true,
    enableAdvancedAccessibility: true,
    
    // Experimental features
    experimental: {
      enableContainerQueries: false,
      enableViewTransitions: false,
      enableWebComponents: false,
      enableOfflineMode: false,
      enablePWAFeatures: false
    }
  }
};