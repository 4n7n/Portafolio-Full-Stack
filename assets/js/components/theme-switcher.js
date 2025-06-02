export class ThemeSwitcher {
    constructor() {
        this.currentTheme = 'light';
        this.toggleButton = null;
        this.mobileToggleButton = null;
        this.storageKey = 'portfolio-theme';
        
        // Detectar preferencia del sistema
        this.systemPreference = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    }

    init() {
        this.cacheElements();
        this.loadSavedTheme();
        this.bindEvents();
        this.setupSystemPreferenceListener();
    }

    cacheElements() {
        this.toggleButton = document.getElementById('theme-toggle');
        this.mobileToggleButton = document.getElementById('mobile-theme-toggle');
    }

    bindEvents() {
        if (this.toggleButton) {
            this.toggleButton.addEventListener('click', this.toggleTheme.bind(this));
        }

        if (this.mobileToggleButton) {
            this.mobileToggleButton.addEventListener('click', this.toggleTheme.bind(this));
        }

        // Keyboard shortcut: Ctrl/Cmd + Shift + T
        document.addEventListener('keydown', (e) => {
            if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key === 'T') {
                e.preventDefault();
                this.toggleTheme();
            }
        });
    }

    loadSavedTheme() {
        const savedTheme = localStorage.getItem(this.storageKey);
        
        if (savedTheme) {
            this.currentTheme = savedTheme;
        } else {
            // Usar preferencia del sistema si no hay tema guardado
            this.currentTheme = this.systemPreference;
        }
        
        this.applyTheme(this.currentTheme);
    }

    toggleTheme() {
        const newTheme = this.currentTheme === 'light' ? 'dark' : 'light';
        this.setTheme(newTheme);
        
        // Analytics
        this.trackThemeChange(newTheme);
    }

    setTheme(theme) {
        this.currentTheme = theme;
        this.applyTheme(theme);
        this.saveTheme(theme);
        
        // Evento personalizado
        window.dispatchEvent(new CustomEvent('themeChanged', {
            detail: { theme: theme }
        }));
    }

    applyTheme(theme) {
        // Aplicar al document
        document.documentElement.setAttribute('data-theme', theme);
        
        // Actualizar meta theme-color para móviles
        this.updateMetaThemeColor(theme);
        
        // Actualizar iconos de los botones
        this.updateToggleIcons(theme);
        
        // Clase en body para CSS adicional si necesario
        document.body.classList.toggle('dark-theme', theme === 'dark');
    }

    updateMetaThemeColor(theme) {
        let metaThemeColor = document.querySelector('meta[name="theme-color"]');
        
        if (!metaThemeColor) {
            metaThemeColor = document.createElement('meta');
            metaThemeColor.name = 'theme-color';
            document.head.appendChild(metaThemeColor);
        }
        
        const colors = {
            light: '#ffffff',
            dark: '#111827'
        };
        
        metaThemeColor.content = colors[theme];
    }

    updateToggleIcons(theme) {
        const buttons = [this.toggleButton, this.mobileToggleButton].filter(Boolean);
        
        buttons.forEach(button => {
            const lightIcon = button.querySelector('.theme-icon-light, .icon-sun');
            const darkIcon = button.querySelector('.theme-icon-dark, .icon-moon');
            
            if (lightIcon && darkIcon) {
                if (theme === 'dark') {
                    lightIcon.style.opacity = '0.3';
                    darkIcon.style.opacity = '1';
                } else {
                    lightIcon.style.opacity = '1';
                    darkIcon.style.opacity = '0.3';
                }
            }
        });
    }

    saveTheme(theme) {
        localStorage.setItem(this.storageKey, theme);
    }

    setupSystemPreferenceListener() {
        const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
        
        mediaQuery.addListener((e) => {
            // Solo aplicar si no hay tema guardado explícitamente
            if (!localStorage.getItem(this.storageKey)) {
                const systemTheme = e.matches ? 'dark' : 'light';
                this.setTheme(systemTheme);
            }
        });
    }

    trackThemeChange(theme) {
        // Google Analytics
        if (typeof gtag !== 'undefined') {
            gtag('event', 'theme_change', {
                'theme': theme
            });
        }

        // Custom analytics
        if (window.analytics) {
            window.analytics.track('Theme Changed', {
                theme: theme,
                timestamp: new Date().toISOString()
            });
        }
    }

    // Métodos públicos
    getCurrentTheme() {
        return this.currentTheme;
    }

    isDarkMode() {
        return this.currentTheme === 'dark';
    }

    destroy() {
        // Remover event listeners si es necesario
    }
}