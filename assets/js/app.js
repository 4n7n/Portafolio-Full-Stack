// Import configuration
import { portfolioConfig } from './config/portfolio-config.js';

// Import existing components
import { HeroBanner } from './components/hero-banner.js';
import { TypingEffect } from './components/typing-effect.js';
import { SkillsChart } from './components/skills-chart.js';
import { ProjectGallery } from './components/project-gallery.js';
import { ProjectFilter } from './components/project-filter.js';
import { ContactForm } from './components/contact-form.js';
import { ThemeSwitcher } from './components/theme-switcher.js';
import { ScrollAnimations } from './components/scroll-animations.js';

// Import utilities
import { DOMHelpers } from './utils/dom-helpers.js';
import { LazyLoading } from './utils/lazy-loading.js';
import { Performance } from './utils/performance.js';

// Import services
import { EmailService } from './services/email-service.js';
import { Analytics } from './services/analytics.js';

class PortfolioApp {
  constructor() {
    this.config = portfolioConfig;
    this.components = new Map();
    this.isInitialized = false;
    this.deviceInfo = null;
    this.performanceProfile = null;
    this.networkInfo = null;
    this.batteryInfo = null;
    
    // Responsive optimization flags
    this.responsiveFeatures = {
      touchOptimization: false,
      adaptiveQuality: false,
      batteryOptimization: false,
      networkAwareness: false,
      orientationHandling: false
    };
    
    // Performance monitoring
    this.performanceObserver = null;
    this.resizeObserver = null;
    this.orientationHandler = null;
    
    this.init();
  }

  /**
   * Initialize the application
   */
  async init() {
    try {
      console.log('🚀 Initializing Portfolio App with Responsive Optimization...');
      
      // Device detection and capability assessment
      await this.detectDeviceCapabilities();
      
      // Performance profiling
      await this.profilePerformance();
      
      // Network awareness setup
      await this.setupNetworkAwareness();
      
      // Battery monitoring (if available)
      await this.setupBatteryMonitoring();
      
      // DOM ready check
      if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => this.initializeApp());
      } else {
        await this.initializeApp();
      }
      
    } catch (error) {
      console.error('❌ Error initializing app:', error);
      this.handleInitializationError(error);
    }
  }

  async detectDeviceCapabilities() {
    this.deviceInfo = {
      // Device type detection
      isMobile: DOMHelpers.isMobile(),
      isTablet: DOMHelpers.isTablet(),
      isDesktop: DOMHelpers.isDesktop(),
      
      // Touch capabilities
      hasTouch: DOMHelpers.hasTouch(),
      maxTouchPoints: navigator.maxTouchPoints || 0,
      
      // Screen information
      screenWidth: window.screen.width,
      screenHeight: window.screen.height,
      pixelRatio: window.devicePixelRatio || 1,
      
      // Viewport information
      viewportWidth: window.innerWidth,
      viewportHeight: window.innerHeight,
      orientation: DOMHelpers.getOrientation(),
      
      // Hardware capabilities
      hardwareConcurrency: navigator.hardwareConcurrency || 4,
      deviceMemory: navigator.deviceMemory || 4,
      
      // Browser capabilities
      userAgent: navigator.userAgent,
      platform: navigator.platform,
      language: navigator.language,
      
      // Modern features support
      supportsPWA: 'serviceWorker' in navigator,
      supportsWebP: await this.checkWebPSupport(),
      supportsAVIF: await this.checkAVIFSupport(),
      supportsContainerQueries: CSS.supports('container-type: inline-size'),
      supportsViewportUnits: CSS.supports('height: 100dvh'),
      
      // Accessibility
      prefersReducedMotion: window.matchMedia('(prefers-reduced-motion: reduce)').matches,
      prefersColorScheme: window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light',
      prefersContrast: window.matchMedia('(prefers-contrast: high)').matches ? 'high' : 'normal'
    };
    
    console.log('📱 Device Capabilities:', this.deviceInfo);
  }

  /**
   * Profile device performance for adaptive behavior
   */
  async profilePerformance() {
    const startTime = performance.now();
    
    // Basic performance assessment
    const performanceScore = Performance.getPerformanceProfile();
    const memoryInfo = Performance.getMemoryInfo();
    const connectionInfo = Performance.getConnectionInfo();
    
    this.performanceProfile = {
      profile: performanceScore, // 'low', 'medium', 'high'
      memory: memoryInfo,
      connection: connectionInfo,
      benchmarkTime: performance.now() - startTime,
      
      // Adaptive settings based on performance
      maxAnimations: this.getMaxAnimations(performanceScore),
      imageQuality: this.getImageQuality(performanceScore, connectionInfo),
      enableParallax: performanceScore !== 'low',
      enableComplexAnimations: performanceScore === 'high',
      enableAutoplay: performanceScore !== 'low' && !this.deviceInfo.isMobile
    };
    
    console.log('⚡ Performance Profile:', this.performanceProfile);
  }

  /**
   * Setup network awareness for adaptive loading
   */
  async setupNetworkAwareness() {
    if ('connection' in navigator) {
      this.networkInfo = {
        effectiveType: navigator.connection.effectiveType,
        downlink: navigator.connection.downlink,
        rtt: navigator.connection.rtt,
        saveData: navigator.connection.saveData
      };
      
      // Listen for connection changes
      navigator.connection.addEventListener('change', () => {
        this.handleNetworkChange();
      });
      
      this.responsiveFeatures.networkAwareness = true;
    }
    
    // Online/offline detection
    window.addEventListener('online', () => this.handleOnlineStatus(true));
    window.addEventListener('offline', () => this.handleOnlineStatus(false));
  }

  /**
   * Setup battery monitoring for power-aware optimization
   */
  async setupBatteryMonitoring() {
    if ('getBattery' in navigator) {
      try {
        const battery = await navigator.getBattery();
        
        this.batteryInfo = {
          level: battery.level,
          charging: battery.charging,
          chargingTime: battery.chargingTime,
          dischargingTime: battery.dischargingTime
        };
        
        // Listen for battery changes
        battery.addEventListener('levelchange', () => this.handleBatteryChange(battery));
        battery.addEventListener('chargingchange', () => this.handleBatteryChange(battery));
        
        this.responsiveFeatures.batteryOptimization = true;
        
        console.log('🔋 Battery Monitoring Enabled:', this.batteryInfo);
      } catch (error) {
        console.warn('⚠️ Battery API not available:', error);
      }
    }
  }

  /**
   * Initialize all application components
   */
  async initializeApp() {
    try {
      console.log('🎯 Initializing components with responsive optimization...');
      
      // Setup responsive event listeners
      this.setupResponsiveListeners();
      
      // Apply responsive optimizations
      this.applyResponsiveOptimizations();
      
      // Initialize lazy loading with responsive settings
      await this.initializeLazyLoading();
      
      // Initialize theme system with responsive awareness
      await this.initializeThemeSystem();
      
      // Initialize components with responsive config
      await this.initializeComponents();
      
      // Initialize services with mobile optimization
      await this.initializeServices();
      
      // Setup performance monitoring
      this.setupPerformanceMonitoring();
      
      // Mark as initialized
      this.isInitialized = true;
      
      console.log('✅ Portfolio App initialized successfully!');
      
      // Dispatch custom initialization event
      this.dispatchEvent('app:initialized', {
        deviceInfo: this.deviceInfo,
        performanceProfile: this.performanceProfile,
        responsiveFeatures: this.responsiveFeatures
      });
      
    } catch (error) {
      console.error('❌ Error during app initialization:', error);
      this.handleInitializationError(error);
    }
  }

  /**
   * Setup responsive event listeners
   */
  setupResponsiveListeners() {
    // Viewport resize handler with throttling
    this.resizeObserver = new ResizeObserver(
      DOMHelpers.throttle((entries) => {
        this.handleViewportResize(entries);
      }, 100)
    );
    
    if (document.documentElement) {
      this.resizeObserver.observe(document.documentElement);
    }
    
    // Orientation change handler
    this.orientationHandler = DOMHelpers.throttle(() => {
      this.handleOrientationChange();
    }, 200);
    
    window.addEventListener('orientationchange', this.orientationHandler);
    
    // Visibility change for performance optimization
    document.addEventListener('visibilitychange', () => {
      this.handleVisibilityChange();
    });
    
    // Focus/blur for mobile optimization
    window.addEventListener('focus', () => this.handleWindowFocus(true));
    window.addEventListener('blur', () => this.handleWindowFocus(false));
    
    this.responsiveFeatures.orientationHandling = true;
  }

  /**
   * Apply responsive optimizations based on device capabilities
   */
  applyResponsiveOptimizations() {
    const { isMobile, isTablet, hasTouch, prefersReducedMotion } = this.deviceInfo;
    const { profile } = this.performanceProfile;
    
    // Add device classes to body
    document.body.classList.add(
      isMobile ? 'device-mobile' : isTablet ? 'device-tablet' : 'device-desktop',
      hasTouch ? 'has-touch' : 'no-touch',
      `performance-${profile}`
    );
    
    // Apply reduced motion if preferred
    if (prefersReducedMotion) {
      document.body.classList.add('reduce-motion');
    }
    
    // Touch optimization
    if (hasTouch) {
      this.enableTouchOptimizations();
    }
    
    // Mobile-specific optimizations
    if (isMobile) {
      this.applyMobileOptimizations();
    }
    
    // Performance-based optimizations
    this.applyPerformanceOptimizations(profile);
  }

  /**
   * Enable touch-specific optimizations
   */
  enableTouchOptimizations() {
    // Add touch-friendly classes
    document.body.classList.add('touch-optimized');
    
    // Disable hover effects on touch devices
    const style = document.createElement('style');
    style.textContent = `
      @media (hover: none) {
        .hover\\:scale-105:hover { transform: none; }
        .hover\\:shadow-lg:hover { box-shadow: none; }
      }
    `;
    document.head.appendChild(style);
    
    // Enable touch feedback
    this.enableTouchFeedback();
    
    this.responsiveFeatures.touchOptimization = true;
    console.log('👆 Touch optimizations enabled');
  }

  /**
   * Apply mobile-specific optimizations
   */
  applyMobileOptimizations() {
    // Viewport meta optimization
    const viewport = document.querySelector('meta[name="viewport"]');
    if (viewport) {
      viewport.setAttribute('content', 
        'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no'
      );
    }
    
    // Disable text size adjust
    document.body.style.webkitTextSizeAdjust = '100%';
    document.body.style.textSizeAdjust = '100%';
    
    // Add mobile-specific classes
    document.body.classList.add('mobile-optimized');
    
    console.log('📱 Mobile optimizations applied');
  }

  /**
   * Apply performance-based optimizations
   */
  applyPerformanceOptimizations(profile) {
    const optimizations = {
      low: {
        animations: false,
        parallax: false,
        heavyEffects: false,
        autoplay: false,
        lazyThreshold: '50px'
      },
      medium: {
        animations: true,
        parallax: false,
        heavyEffects: false,
        autoplay: false,
        lazyThreshold: '100px'
      },
      high: {
        animations: true,
        parallax: true,
        heavyEffects: true,
        autoplay: true,
        lazyThreshold: '200px'
      }
    };
    
    const config = optimizations[profile];
    document.body.classList.add(`perf-${profile}`);
    
    // Store optimization config for components
    this.config.responsive.performanceOptimizations = config;
    
    console.log(`⚡ Performance optimizations applied for ${profile} profile`);
  }

  /**
   * Initialize lazy loading with responsive settings
   */
  async initializeLazyLoading() {
    const lazyConfig = {
      threshold: this.performanceProfile.profile === 'low' ? '50px' : '200px',
      enablePlaceholders: true,
      adaptiveQuality: this.responsiveFeatures.networkAwareness,
      preferWebP: this.deviceInfo.supportsWebP,
      preferAVIF: this.deviceInfo.supportsAVIF
    };
    
    const lazyLoading = new LazyLoading(lazyConfig);
    await lazyLoading.init();
    
    this.components.set('lazyLoading', lazyLoading);
    console.log('🖼️ Responsive lazy loading initialized');
  }

  /**
   * Initialize theme system with responsive awareness
   */
  async initializeThemeSystem() {
    const themeConfig = {
      respectMotionPreference: this.deviceInfo.prefersReducedMotion,
      adaptiveTransitions: this.deviceInfo.isMobile,
      batteryAware: this.responsiveFeatures.batteryOptimization,
      performanceMode: this.performanceProfile.profile
    };
    
    const themeSwitcher = new ThemeSwitcher(themeConfig);
    await themeSwitcher.init();
    
    this.components.set('themeSwitcher', themeSwitcher);
    console.log('🎨 Responsive theme system initialized');
  }

  /**
   * Initialize all components with responsive configuration
   */
  async initializeComponents() {
    const componentInitializers = [
      { name: 'heroBanner', class: HeroBanner, selector: '#hero' },
      { name: 'typingEffect', class: TypingEffect, selector: '.typing-text' },
      { name: 'skillsChart', class: SkillsChart, selector: '#skills' },
      { name: 'projectGallery', class: ProjectGallery, selector: '#projects' },
      { name: 'projectFilter', class: ProjectFilter, selector: '.project-filters' },
      { name: 'contactForm', class: ContactForm, selector: '#contact-form' },
      { name: 'scrollAnimations', class: ScrollAnimations, selector: 'body' }
    ];
    
    for (const { name, class: ComponentClass, selector } of componentInitializers) {
      try {
        const element = document.querySelector(selector);
        if (element) {
          const config = this.getComponentConfig(name);
          const component = new ComponentClass(element, config);
          await component.init();
          this.components.set(name, component);
          console.log(`✅ ${name} component initialized`);
        }
      } catch (error) {
        console.warn(`⚠️ Failed to initialize ${name}:`, error);
      }
    }
  }

  /**
   * Initialize services with mobile optimization
   */
  async initializeServices() {
    try {
      // Email service with mobile optimization
      const emailConfig = {
        networkAware: this.responsiveFeatures.networkAwareness,
        mobileOptimized: this.deviceInfo.isMobile,
        retryStrategy: this.getRetryStrategy()
      };
      
      const emailService = new EmailService(emailConfig);
      await emailService.init();
      this.components.set('emailService', emailService);
      
      // Analytics with device information
      const analyticsConfig = {
        deviceInfo: this.deviceInfo,
        performanceProfile: this.performanceProfile,
        responsiveFeatures: this.responsiveFeatures
      };
      
      const analytics = new Analytics(analyticsConfig);
      await analytics.init();
      this.components.set('analytics', analytics);
      
      console.log('📊 Services initialized with responsive optimization');
      
    } catch (error) {
      console.warn('⚠️ Error initializing services:', error);
    }
  }

  /**
   * Setup performance monitoring
   */
  setupPerformanceMonitoring() {
    if ('PerformanceObserver' in window) {
      this.performanceObserver = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          this.handlePerformanceEntry(entry);
        }
      });
      
      // Observe various performance metrics
      try {
        this.performanceObserver.observe({ 
          entryTypes: ['measure', 'navigation', 'paint', 'largest-contentful-paint'] 
        });
      } catch (error) {
        console.warn('⚠️ Performance Observer not fully supported:', error);
      }
    }
    
    // Memory monitoring for mobile devices
    if (this.deviceInfo.isMobile && Performance.supportsMemoryAPI()) {
      setInterval(() => {
        this.monitorMemoryUsage();
      }, 30000); // Check every 30 seconds
    }
  }

  /**
   * Get component-specific configuration with responsive optimizations
   */
  getComponentConfig(componentName) {
    const baseConfig = this.config[componentName] || {};
    const responsiveConfig = {
      deviceInfo: this.deviceInfo,
      performanceProfile: this.performanceProfile,
      adaptiveQuality: this.responsiveFeatures.adaptiveQuality,
      touchOptimized: this.responsiveFeatures.touchOptimization,
      networkAware: this.responsiveFeatures.networkAwareness
    };
    
    return { ...baseConfig, responsive: responsiveConfig };
  }

  /**
   * Enable touch feedback for interactive elements
   */
  enableTouchFeedback() {
    const touchElements = document.querySelectorAll(
      'button, .btn, .card, .touch-feedback, a[href], [role="button"]'
    );
    
    touchElements.forEach(element => {
      element.addEventListener('touchstart', () => {
        element.classList.add('touch-active');
      }, { passive: true });
      
      element.addEventListener('touchend', () => {
        setTimeout(() => {
          element.classList.remove('touch-active');
        }, 150);
      }, { passive: true });
    });
  }

  /**
   * Handle viewport resize events
   */
  handleViewportResize(entries) {
    const { width, height } = entries[0].contentRect;
    
    // Update device info
    this.deviceInfo.viewportWidth = width;
    this.deviceInfo.viewportHeight = height;
    
    // Check for device type changes (tablet rotation, etc.)
    const newDeviceType = DOMHelpers.getDeviceType();
    if (newDeviceType !== this.getDeviceType()) {
      this.handleDeviceTypeChange(newDeviceType);
    }
    
    // Notify components of resize
    this.components.forEach(component => {
      if (component.handleResize) {
        component.handleResize(width, height);
      }
    });
    
    // Dispatch resize event
    this.dispatchEvent('app:resize', { width, height });
  }

  /**
   * Handle orientation change events
   */
  handleOrientationChange() {
    const newOrientation = DOMHelpers.getOrientation();
    
    if (newOrientation !== this.deviceInfo.orientation) {
      this.deviceInfo.orientation = newOrientation;
      
      // Add orientation class to body
      document.body.classList.remove('orientation-portrait', 'orientation-landscape');
      document.body.classList.add(`orientation-${newOrientation}`);
      
      // Notify components
      this.components.forEach(component => {
        if (component.handleOrientationChange) {
          component.handleOrientationChange(newOrientation);
        }
      });
      
      // Dispatch orientation change event
      this.dispatchEvent('app:orientationchange', { orientation: newOrientation });
      
      console.log(`📱 Orientation changed to: ${newOrientation}`);
    }
  }

  /**
   * Handle network condition changes
   */
  handleNetworkChange() {
    if (this.networkInfo && 'connection' in navigator) {
      const connection = navigator.connection;
      const oldEffectiveType = this.networkInfo.effectiveType;
      
      this.networkInfo = {
        effectiveType: connection.effectiveType,
        downlink: connection.downlink,
        rtt: connection.rtt,
        saveData: connection.saveData
      };
      
      // Adjust quality based on connection
      if (oldEffectiveType !== connection.effectiveType) {
        this.adaptToNetworkConditions();
      }
      
      console.log('🌐 Network conditions changed:', this.networkInfo);
    }
  }

  /**
   * Handle battery level changes
   */
  handleBatteryChange(battery) {
    this.batteryInfo = {
      level: battery.level,
      charging: battery.charging,
      chargingTime: battery.chargingTime,
      dischargingTime: battery.dischargingTime
    };
    
    // Apply battery optimizations
    if (battery.level < 0.2 && !battery.charging) {
      this.enableBatterySaveMode();
    } else if (battery.level > 0.5 || battery.charging) {
      this.disableBatterySaveMode();
    }
    
    console.log('🔋 Battery status changed:', this.batteryInfo);
  }

  /**
   * Handle online/offline status changes
   */
  handleOnlineStatus(isOnline) {
    document.body.classList.toggle('offline', !isOnline);
    
    this.components.forEach(component => {
      if (component.handleConnectionChange) {
        component.handleConnectionChange(isOnline);
      }
    });
    
    this.dispatchEvent('app:connectionchange', { isOnline });
    console.log(`🌐 Connection status: ${isOnline ? 'online' : 'offline'}`);
  }

  /**
   * Handle visibility change for performance optimization
   */
  handleVisibilityChange() {
    const isVisible = !document.hidden;
    
    this.components.forEach(component => {
      if (component.handleVisibilityChange) {
        component.handleVisibilityChange(isVisible);
      }
    });
    
    // Pause/resume animations based on visibility
    if (!isVisible) {
      document.body.classList.add('page-hidden');
    } else {
      document.body.classList.remove('page-hidden');
    }
  }

  /**
   * Handle window focus/blur for mobile optimization
   */
  handleWindowFocus(hasFocus) {
    document.body.classList.toggle('window-blurred', !hasFocus);
    
    // Optimize performance when window loses focus
    if (!hasFocus && this.deviceInfo.isMobile) {
      this.pauseNonEssentialAnimations();
    } else if (hasFocus) {
      this.resumeAnimations();
    }
  }

  /**
   * Enable battery save mode optimizations
   */
  enableBatterySaveMode() {
    document.body.classList.add('battery-save-mode');
    
    // Reduce animations and effects
    this.components.forEach(component => {
      if (component.enableBatterySaveMode) {
        component.enableBatterySaveMode();
      }
    });
    
    console.log('🔋 Battery save mode enabled');
  }

  /**
   * Disable battery save mode
   */
  disableBatterySaveMode() {
    document.body.classList.remove('battery-save-mode');
    
    this.components.forEach(component => {
      if (component.disableBatterySaveMode) {
        component.disableBatterySaveMode();
      }
    });
    
    console.log('🔋 Battery save mode disabled');
  }

  /**
   * Adapt to network conditions
   */
  adaptToNetworkConditions() {
    const { effectiveType, saveData } = this.networkInfo;
    const isSlowConnection = effectiveType === 'slow-2g' || effectiveType === '2g' || saveData;
    
    if (isSlowConnection) {
      document.body.classList.add('slow-connection');
      // Reduce image quality, disable autoplay, etc.
      this.applyLowBandwidthOptimizations();
    } else {
      document.body.classList.remove('slow-connection');
      this.removeLowBandwidthOptimizations();
    }
  }

  /**
   * Apply low bandwidth optimizations
   */
  applyLowBandwidthOptimizations() {
    this.components.forEach(component => {
      if (component.enableDataSaveMode) {
        component.enableDataSaveMode();
      }
    });
    console.log('📶 Low bandwidth optimizations applied');
  }

  /**
   * Remove low bandwidth optimizations
   */
  removeLowBandwidthOptimizations() {
    this.components.forEach(component => {
      if (component.disableDataSaveMode) {
        component.disableDataSaveMode();
      }
    });
    console.log('📶 Low bandwidth optimizations removed');
  }

  /**
   * Utility methods for device and performance detection
   */
  getDeviceType() {
    if (this.deviceInfo.isMobile) return 'mobile';
    if (this.deviceInfo.isTablet) return 'tablet';
    return 'desktop';
  }

  getMaxAnimations(profile) {
    const limits = { low: 3, medium: 5, high: 10 };
    return limits[profile] || 5;
  }

  getImageQuality(profile, connection) {
    if (connection && (connection.saveData || connection.effectiveType === '2g')) {
      return 'low';
    }
    return profile === 'low' ? 'medium' : 'high';
  }

  getRetryStrategy() {
    return this.deviceInfo.isMobile ? 'exponential' : 'linear';
  }

  /**
   * Check image format support
   */
  async checkWebPSupport() {
    return new Promise(resolve => {
      const webP = new Image();
      webP.onload = webP.onerror = () => resolve(webP.height === 2);
      webP.src = 'data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA';
    });
  }

  async checkAVIFSupport() {
    return new Promise(resolve => {
      const avif = new Image();
      avif.onload = avif.onerror = () => resolve(avif.height === 2);
      avif.src = 'data:image/avif;base64,AAAAIGZ0eXBhdmlmAAAAAGF2aWZtaWYxbWlhZk1BMUIAAADybWV0YQAAAAAAAAAoaGRscgAAAAAAAAAAcGljdAAAAAAAAAAAAAAAAGxpYmF2aWYAAAAADnBpdG0AAAAAAAEAAAAeaWxvYwAAAABEAAABAAEAAAABAAABGgAAAB0AAAAoaWluZgAAAAAAAQAAABppbmZlAgAAAAABAABhdjAxQ29sb3IAAAAAamlwcnAAAABLaXBjbwAAABRpc3BlAAAAAAAAAAIAAAACAAAAEHBpeGkAAAAAAwgICAAAAAxhdjFDgQ0MAAAAABNjb2xybmNseAACAAIAAYAAAAAXaXBtYQAAAAAAAAABAAEEAQKDBAAAACVtZGF0EgAKCBgABogQEAwgMg8f8D///8WfhwB8+ErK42A=';
    });
  }

  /**
   * Performance entry handler
   */
  handlePerformanceEntry(entry) {
    if (entry.entryType === 'largest-contentful-paint') {
      if (entry.startTime > 2500) {
        console.warn('⚠️ LCP is slower than recommended:', entry.startTime);
        this.applyPerformanceOptimizations('low');
      }
    }
    
    if (entry.entryType === 'navigation') {
      console.log('📊 Navigation timing:', {
        domContentLoaded: entry.domContentLoadedEventEnd - entry.domContentLoadedEventStart,
        loadComplete: entry.loadEventEnd - entry.loadEventStart
      });
    }
  }

  /**
   * Monitor memory usage on mobile devices
   */
  monitorMemoryUsage() {
    if (performance.memory) {
      const memoryUsage = {
        used: performance.memory.usedJSHeapSize,
        total: performance.memory.totalJSHeapSize,
        limit: performance.memory.jsHeapSizeLimit
      };
      
      const usagePercentage = (memoryUsage.used / memoryUsage.limit) * 100;
      
      if (usagePercentage > 75) {
        console.warn('⚠️ High memory usage detected:', usagePercentage.toFixed(2) + '%');
        this.triggerMemoryCleanup();
      }
    }
  }

  /**
   * Trigger memory cleanup
   */
  triggerMemoryCleanup() {
    this.components.forEach(component => {
      if (component.cleanup) {
        component.cleanup();
      }
    });
    
    // Force garbage collection if available
    if (window.gc) {
      window.gc();
    }
  }

  /**
   * Pause non-essential animations
   */
  pauseNonEssentialAnimations() {
    document.body.classList.add('animations-paused');
    
    this.components.forEach(component => {
      if (component.pauseAnimations) {
        component.pauseAnimations();
      }
    });
  }

  /**
   * Resume animations
   */
  resumeAnimations() {
    document.body.classList.remove('animations-paused');
    
    this.components.forEach(component => {
      if (component.resumeAnimations) {
        component.resumeAnimations();
      }
    });
  }

  /**
   * Handle initialization errors
   */
  handleInitializationError(error) {
    console.error('❌ Portfolio initialization failed:', error);
    
    // Show user-friendly error message
    const errorElement = document.createElement('div');
    errorElement.className = 'initialization-error';
    errorElement.innerHTML = `
      <div class="error-content">
        <h2>Loading Error</h2>
        <p>There was a problem loading the portfolio. Please refresh the page.</p>
        <button onclick="window.location.reload()">Refresh Page</button>
      </div>
    `;
    
    document.body.appendChild(errorElement);
    
    // Track error
    if (this.components.has('analytics')) {
      this.components.get('analytics').trackError('initialization_failed', error);
    }
  }

  /**
   * Dispatch custom events
   */
  dispatchEvent(eventName, detail = {}) {
    const event = new CustomEvent(eventName, { detail });
    window.dispatchEvent(event);
  }

  /**
   * Cleanup method for proper disposal
   */
  destroy() {
    // Remove event listeners
    if (this.resizeObserver) {
      this.resizeObserver.disconnect();
    }
    
    if (this.performanceObserver) {
      this.performanceObserver.disconnect();
    }
    
    if (this.orientationHandler) {
      window.removeEventListener('orientationchange', this.orientationHandler);
    }
    
    // Cleanup components
    this.components.forEach(component => {
      if (component.destroy) {
        component.destroy();
      }
    });
    
    this.components.clear();
    this.isInitialized = false;
    
    console.log('🧹 Portfolio app cleaned up');
  }
}

// Initialize the application
const portfolioApp = new PortfolioApp();

// Export for global access
window.PortfolioApp = portfolioApp;

// Handle page unload
window.addEventListener('beforeunload', () => {
  portfolioApp.destroy();
});

export default portfolioApp;