import { DOMHelpers } from '../utils/dom-helpers.js';
import { PORTFOLIO_CONFIG } from '../config/portfolio-config.js';

/**
 * Componente del selector de temas
 * Versión corregida y optimizada
 */
export class ThemeSwitcher {
  constructor(options = {}) {
    // Configuración con valores por defecto seguros
    this.options = {
      defaultTheme: this.getConfigValue('theme.defaultTheme', 'dark'),
      enableSystemPreference: this.getConfigValue('theme.enableSystemPreference', true),
      enableCustomColors: true,
      enableAnimations: true,
      persistTheme: true,
      transitionDuration: this.getConfigValue('theme.transitionDuration', 300),
      ...options
    };

    this.currentTheme = this.options.defaultTheme;
    this.systemTheme = 'light';
    this.isSystemPreferenceEnabled = this.options.enableSystemPreference;
    this.customColors = {
      primary: '#3b82f6',
      secondary: '#10b981',
      accent: '#f59e0b'
    };

    this.themeSwitcherElement = null;
    this.isInitialized = false;
    this.listeners = [];
    this.resizeObserver = null;
    this.systemThemeQuery = null;

    this.init();
  }

  /**
   * Obtiene valores de configuración de forma segura
   */
  getConfigValue(path, defaultValue) {
    try {
      if (typeof PORTFOLIO_CONFIG === 'undefined') {
        return defaultValue;
      }

      const keys = path.split('.');
      let value = PORTFOLIO_CONFIG;
      
      for (const key of keys) {
        if (value && typeof value === 'object' && key in value) {
          value = value[key];
        } else {
          return defaultValue;
        }
      }
      
      return value !== undefined ? value : defaultValue;
    } catch (error) {
      console.warn('Error obteniendo configuración:', path, error);
      return defaultValue;
    }
  }

  /**
   * Inicializa el selector de temas
   */
  init() {
    if (this.isInitialized) {
      console.warn('ThemeSwitcher ya está inicializado');
      return false;
    }

    try {
      // Asegurar que el DOM esté listo
      if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => this.initializeComponents());
        return true;
      } else {
        return this.initializeComponents();
      }
    } catch (error) {
      console.error('❌ Error inicializando ThemeSwitcher:', error);
      return false;
    }
  }

  /**
   * Inicializa los componentes después de que el DOM esté listo
   */
  initializeComponents() {
    try {
      this.detectSystemTheme();
      this.loadSavedTheme();
      
      if (!this.createThemeSwitcher()) {
        throw new Error('No se pudo crear el ThemeSwitcher');
      }
      
      this.setupEventListeners();
      this.applyTheme(this.currentTheme);
      this.setupSystemThemeListener();
      this.loadSavedSettings();
      
      this.isInitialized = true;
      console.log('✅ ThemeSwitcher: Inicializado correctamente');
      return true;
      
    } catch (error) {
      console.error('❌ Error en initializeComponents:', error);
      this.renderFallback();
      return false;
    }
  }

  /**
   * Renderiza un fallback básico si hay errores
   */
  renderFallback() {
    try {
      const existingButton = document.getElementById('themeToggle');
      if (existingButton) {
        existingButton.innerHTML = this.getThemeIcon(this.currentTheme);
        existingButton.onclick = () => this.toggleTheme();
        console.log('✅ Fallback básico aplicado al botón existente');
      }
    } catch (error) {
      console.error('Error en fallback:', error);
    }
  }

  /**
   * Detecta el tema del sistema
   */
  detectSystemTheme() {
    try {
      if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
        this.systemTheme = 'dark';
      } else {
        this.systemTheme = 'light';
      }
    } catch (error) {
      console.warn('Error detectando tema del sistema:', error);
      this.systemTheme = 'light';
    }
  }

  /**
   * Carga el tema guardado de forma segura
   */
  loadSavedTheme() {
    if (!this.options.persistTheme) return;

    try {
      const savedTheme = localStorage.getItem('portfolio-theme');
      const savedSystemPref = localStorage.getItem('portfolio-system-theme');
      const savedColors = localStorage.getItem('portfolio-custom-colors');

      if (savedTheme && ['light', 'dark', 'auto'].includes(savedTheme)) {
        this.currentTheme = savedTheme;
      }

      if (savedSystemPref !== null) {
        this.isSystemPreferenceEnabled = savedSystemPref === 'true';
      }

      if (savedColors) {
        try {
          const parsedColors = JSON.parse(savedColors);
          if (parsedColors && typeof parsedColors === 'object') {
            this.customColors = { ...this.customColors, ...parsedColors };
          }
        } catch (e) {
          console.warn('Error parseando colores guardados:', e);
        }
      }

      // Si está habilitada la preferencia del sistema, usar tema del sistema
      if (this.isSystemPreferenceEnabled) {
        this.currentTheme = this.systemTheme;
      }
    } catch (error) {
      console.warn('Error cargando configuración guardada:', error);
    }
  }

  /**
   * Carga configuraciones adicionales guardadas
   */
  loadSavedSettings() {
    try {
      const animations = localStorage.getItem('portfolio-animations');
      const highContrast = localStorage.getItem('portfolio-high-contrast');
      const reducedMotion = localStorage.getItem('portfolio-reduce-motion');

      if (animations !== null) {
        this.options.enableAnimations = animations === 'true';
        this.toggleAnimations(this.options.enableAnimations);
      }

      if (highContrast === 'true') {
        this.toggleHighContrast(true);
      }

      if (reducedMotion === 'true') {
        this.toggleReducedMotion(true);
      }
    } catch (error) {
      console.warn('Error cargando configuraciones:', error);
    }
  }

  /**
   * Crea el selector de temas en el DOM
   */
  createThemeSwitcher() {
    try {
      // Buscar el botón existente en el HTML primero
      const existingButton = document.getElementById('themeToggle');
      
      if (existingButton) {
        console.log('✅ Botón de tema encontrado en HTML, adaptándolo...');
        return this.adaptExistingButton(existingButton);
      } else {
        console.log('⚠️ Botón de tema no encontrado, creando uno nuevo...');
        return this.createNewButton();
      }
    } catch (error) {
      console.error('❌ Error al crear ThemeSwitcher:', error);
      return false;
    }
  }

  /**
   * Adapta un botón existente
   */
  adaptExistingButton(existingButton) {
    try {
      // Crear wrapper para el botón existente
      const wrapper = document.createElement('div');
      wrapper.className = 'theme-switcher-wrapper';
      wrapper.style.cssText = 'position: relative; display: inline-block;';
      
      // Insertar wrapper antes del botón y mover el botón dentro
      existingButton.parentNode.insertBefore(wrapper, existingButton);
      wrapper.appendChild(existingButton);
      
      // Actualizar el contenido del botón existente
      existingButton.innerHTML = `
        <div class="theme-icon">
          ${this.getThemeIcon(this.currentTheme)}
        </div>
      `;
      existingButton.className = 'theme-toggle';
      existingButton.setAttribute('title', 'Cambiar tema');
      existingButton.setAttribute('aria-label', 'Cambiar tema');
      
      // Crear el dropdown
      const dropdown = this.createDropdown();
      wrapper.appendChild(dropdown);
      
      this.themeSwitcherElement = wrapper;
      this.injectStyles();
      
      return true;
    } catch (error) {
      console.error('Error adaptando botón existente:', error);
      return false;
    }
  }

  /**
   * Crea un nuevo botón
   */
  createNewButton() {
    try {
      const themeSwitcher = document.createElement('div');
      themeSwitcher.id = 'theme-switcher-generated';
      themeSwitcher.className = 'theme-switcher';
      
      const button = document.createElement('button');
      button.className = 'theme-toggle';
      button.setAttribute('aria-label', 'Cambiar tema');
      button.setAttribute('title', 'Cambiar tema');
      button.innerHTML = `
        <div class="theme-icon">
          ${this.getThemeIcon(this.currentTheme)}
        </div>
      `;
      
      const dropdown = this.createDropdown();
      
      themeSwitcher.appendChild(button);
      themeSwitcher.appendChild(dropdown);

      // Insertar en el navbar o en el body
      const navbar = document.querySelector('.navbar') || 
                    document.querySelector('header') || 
                    document.querySelector('nav');
      
      if (navbar) {
        navbar.appendChild(themeSwitcher);
      } else {
        document.body.appendChild(themeSwitcher);
      }

      this.themeSwitcherElement = themeSwitcher;
      this.injectStyles();
      
      return true;
    } catch (error) {
      console.error('Error creando nuevo botón:', error);
      return false;
    }
  }

  /**
   * Crea el contenido del dropdown
   */
  createDropdown() {
    const dropdown = document.createElement('div');
    dropdown.className = 'theme-dropdown';
    dropdown.innerHTML = `
      <div class="theme-dropdown-content">
        <!-- Opciones de tema principales -->
        <div class="theme-section">
          <h4 class="theme-section-title">Tema</h4>
          <div class="theme-options">
            <button class="theme-option ${this.currentTheme === 'light' ? 'active' : ''}" 
                    data-theme="light" type="button">
              <i class="icon-sun">☀️</i>
              <span>Claro</span>
            </button>
            <button class="theme-option ${this.currentTheme === 'dark' ? 'active' : ''}" 
                    data-theme="dark" type="button">
              <i class="icon-moon">🌙</i>
              <span>Oscuro</span>
            </button>
            <button class="theme-option ${this.currentTheme === 'auto' ? 'active' : ''}" 
                    data-theme="auto" type="button">
              <i class="icon-monitor">💻</i>
              <span>Sistema</span>
            </button>
          </div>
        </div>

        <!-- Temas predefinidos -->
        <div class="theme-section">
          <h4 class="theme-section-title">Temas predefinidos</h4>
          <div class="preset-themes">
            <button class="preset-theme blue" 
                    data-preset="blue" type="button"
                    style="background: linear-gradient(135deg, #3b82f6, #1d4ed8)">
              <span>Azul</span>
            </button>
            <button class="preset-theme green" 
                    data-preset="green" type="button"
                    style="background: linear-gradient(135deg, #10b981, #047857)">
              <span>Verde</span>
            </button>
            <button class="preset-theme purple" 
                    data-preset="purple" type="button"
                    style="background: linear-gradient(135deg, #8b5cf6, #5b21b6)">
              <span>Púrpura</span>
            </button>
            <button class="preset-theme orange" 
                    data-preset="orange" type="button"
                    style="background: linear-gradient(135deg, #f59e0b, #d97706)">
              <span>Naranja</span>
            </button>
            <button class="preset-theme red" 
                    data-preset="red" type="button"
                    style="background: linear-gradient(135deg, #ef4444, #dc2626)">
              <span>Rojo</span>
            </button>
            <button class="preset-theme custom" 
                    data-preset="custom" type="button"
                    style="background: var(--border-color, #e5e7eb); color: var(--text-color, #374151);">
              <i class="icon-palette">🎨</i>
              <span>Custom</span>
            </button>
          </div>
        </div>

        ${this.options.enableCustomColors ? `
          <!-- Personalizador de colores -->
          <div class="theme-section color-customizer" style="display: none;">
            <h4 class="theme-section-title">Colores personalizados</h4>
            <div class="color-inputs">
              <div class="color-input-group">
                <label for="primary-color">Principal</label>
                <input type="color" 
                       id="primary-color" 
                       value="${this.customColors.primary}">
              </div>
              <div class="color-input-group">
                <label for="secondary-color">Secundario</label>
                <input type="color" 
                       id="secondary-color" 
                       value="${this.customColors.secondary}">
              </div>
              <div class="color-input-group">
                <label for="accent-color">Acento</label>
                <input type="color" 
                       id="accent-color" 
                       value="${this.customColors.accent}">
              </div>
            </div>
            <div class="color-actions">
              <button class="btn-reset-colors" type="button">Restablecer</button>
              <button class="btn-apply-colors" type="button">Aplicar</button>
            </div>
          </div>
        ` : ''}

        <!-- Configuraciones adicionales -->
        <div class="theme-section">
          <div class="theme-settings">
            <label class="setting-item">
              <input type="checkbox" 
                     id="enable-animations" 
                     ${this.options.enableAnimations ? 'checked' : ''}>
              <span class="checkmark"></span>
              <span>Animaciones</span>
            </label>
            
            <label class="setting-item">
              <input type="checkbox" 
                     id="high-contrast" 
                     ${this.isHighContrastEnabled() ? 'checked' : ''}>
              <span class="checkmark"></span>
              <span>Alto contraste</span>
            </label>
            
            <label class="setting-item">
              <input type="checkbox" 
                     id="reduce-motion" 
                     ${this.isReducedMotionEnabled() ? 'checked' : ''}>
              <span class="checkmark"></span>
              <span>Reducir movimiento</span>
            </label>
          </div>
        </div>
      </div>
    `;
    
    return dropdown;
  }

  /**
   * Configura event listeners de forma segura
   */
  setupEventListeners() {
    if (!this.themeSwitcherElement) {
      console.error('❌ themeSwitcherElement no está definido');
      return;
    }

    try {
      // Toggle del dropdown
      this.setupDropdownToggle();
      
      // Opciones de tema
      this.setupThemeOptions();
      
      // Temas predefinidos
      this.setupPresetThemes();
      
      // Color customizer
      if (this.options.enableCustomColors) {
        this.setupColorCustomizer();
      }
      
      // Configuraciones
      this.setupThemeSettings();
      
      // Atajos de teclado
      this.setupKeyboardShortcuts();
      
      // Click fuera para cerrar
      this.setupOutsideClick();

      console.log('✅ Event listeners configurados correctamente');
    } catch (error) {
      console.error('Error configurando event listeners:', error);
    }
  }

  /**
   * Configura el toggle del dropdown
   */
  setupDropdownToggle() {
    const themeToggle = this.themeSwitcherElement.querySelector('.theme-toggle');
    const dropdown = this.themeSwitcherElement.querySelector('.theme-dropdown');

    if (!themeToggle || !dropdown) {
      console.error('❌ No se encontraron elementos theme-toggle o theme-dropdown');
      return;
    }

    const toggleHandler = (e) => {
      e.preventDefault();
      e.stopPropagation();
      dropdown.classList.toggle('active');
    };

    themeToggle.addEventListener('click', toggleHandler);
    this.addListener(themeToggle, 'click', toggleHandler);
  }

  /**
   * Configura opciones de tema
   */
  setupThemeOptions() {
    const themeOptions = this.themeSwitcherElement.querySelectorAll('.theme-option');
    const dropdown = this.themeSwitcherElement.querySelector('.theme-dropdown');
    
    themeOptions.forEach(option => {
      const optionHandler = (e) => {
        e.preventDefault();
        const theme = option.dataset.theme;
        if (theme && ['light', 'dark', 'auto'].includes(theme)) {
          this.setTheme(theme);
          this.updateActiveThemeOption(theme);
          if (dropdown) dropdown.classList.remove('active');
        }
      };
      
      option.addEventListener('click', optionHandler);
      this.addListener(option, 'click', optionHandler);
    });
  }

  /**
   * Configura temas predefinidos
   */
  setupPresetThemes() {
    const presetThemes = this.themeSwitcherElement.querySelectorAll('.preset-theme');
    
    presetThemes.forEach(preset => {
      const presetHandler = (e) => {
        e.preventDefault();
        const presetName = preset.dataset.preset;
        if (presetName === 'custom') {
          this.toggleColorCustomizer();
        } else if (presetName) {
          this.applyPresetTheme(presetName);
        }
      };
      
      preset.addEventListener('click', presetHandler);
      this.addListener(preset, 'click', presetHandler);
    });
  }

  /**
   * Configura el personalizador de colores
   */
  setupColorCustomizer() {
    const colorInputs = this.themeSwitcherElement.querySelectorAll('input[type="color"]');
    const resetBtn = this.themeSwitcherElement.querySelector('.btn-reset-colors');
    const applyBtn = this.themeSwitcherElement.querySelector('.btn-apply-colors');

    // Inputs de color con debounce
    colorInputs.forEach(input => {
      const inputHandler = this.debounce(() => {
        this.updateCustomColor(input.id, input.value);
      }, 100);
      
      input.addEventListener('input', inputHandler);
      this.addListener(input, 'input', inputHandler);
    });

    // Botón reset
    if (resetBtn) {
      const resetHandler = (e) => {
        e.preventDefault();
        this.resetCustomColors();
      };
      
      resetBtn.addEventListener('click', resetHandler);
      this.addListener(resetBtn, 'click', resetHandler);
    }

    // Botón aplicar
    if (applyBtn) {
      const applyHandler = (e) => {
        e.preventDefault();
        this.saveCustomColors();
        this.toggleColorCustomizer();
      };
      
      applyBtn.addEventListener('click', applyHandler);
      this.addListener(applyBtn, 'click', applyHandler);
    }
  }

  /**
   * Configura las configuraciones del tema
   */
  setupThemeSettings() {
    const animationsToggle = this.themeSwitcherElement.querySelector('#enable-animations');
    const highContrastToggle = this.themeSwitcherElement.querySelector('#high-contrast');
    const reduceMotionToggle = this.themeSwitcherElement.querySelector('#reduce-motion');

    if (animationsToggle) {
      const animationsHandler = () => {
        this.toggleAnimations(animationsToggle.checked);
      };
      
      animationsToggle.addEventListener('change', animationsHandler);
      this.addListener(animationsToggle, 'change', animationsHandler);
    }

    if (highContrastToggle) {
      const contrastHandler = () => {
        this.toggleHighContrast(highContrastToggle.checked);
      };
      
      highContrastToggle.addEventListener('change', contrastHandler);
      this.addListener(highContrastToggle, 'change', contrastHandler);
    }

    if (reduceMotionToggle) {
      const motionHandler = () => {
        this.toggleReducedMotion(reduceMotionToggle.checked);
      };
      
      reduceMotionToggle.addEventListener('change', motionHandler);
      this.addListener(reduceMotionToggle, 'change', motionHandler);
    }
  }

  /**
   * Configura click fuera del dropdown
   */
  setupOutsideClick() {
    const outsideClickHandler = (e) => {
      const dropdown = this.themeSwitcherElement?.querySelector('.theme-dropdown');
      if (dropdown && !this.themeSwitcherElement.contains(e.target)) {
        dropdown.classList.remove('active');
      }
    };

    document.addEventListener('click', outsideClickHandler);
    this.addListener(document, 'click', outsideClickHandler);
  }

  /**
   * Añade listener con tracking para cleanup
   */
  addListener(element, event, handler) {
    this.listeners.push({ element, event, handler });
  }

  /**
   * Configura atajos de teclado
   */
  setupKeyboardShortcuts() {
    const keyboardHandler = (e) => {
      // Ctrl/Cmd + Shift + T para toggle del tema
      if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key === 'T') {
        e.preventDefault();
        this.toggleTheme();
      }

      // Ctrl/Cmd + Shift + D para abrir dropdown
      if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key === 'D') {
        e.preventDefault();
        const dropdown = this.themeSwitcherElement?.querySelector('.theme-dropdown');
        if (dropdown) {
          dropdown.classList.toggle('active');
        }
      }

      // Escape para cerrar dropdown
      if (e.key === 'Escape') {
        const dropdown = this.themeSwitcherElement?.querySelector('.theme-dropdown');
        if (dropdown && dropdown.classList.contains('active')) {
          dropdown.classList.remove('active');
          e.preventDefault();
        }
      }
    };

    document.addEventListener('keydown', keyboardHandler);
    this.addListener(document, 'keydown', keyboardHandler);
  }

  /**
   * Función debounce segura
   */
  debounce(func, wait) {
    if (typeof DOMHelpers !== 'undefined' && DOMHelpers.debounce) {
      return DOMHelpers.debounce(func, wait);
    }
    
    // Fallback manual
    let timeout;
    return function executedFunction(...args) {
      const later = () => {
        clearTimeout(timeout);
        func.apply(this, args);
      };
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
    };
  }

  /**
   * Configura listener para cambios del tema del sistema
   */
  setupSystemThemeListener() {
    if (!window.matchMedia) return;

    try {
      this.systemThemeQuery = window.matchMedia('(prefers-color-scheme: dark)');
      
      const handleSystemThemeChange = (e) => {
        this.systemTheme = e.matches ? 'dark' : 'light';
        
        if (this.isSystemPreferenceEnabled || this.currentTheme === 'auto') {
          this.applyTheme(this.systemTheme);
        }
      };

      // Usar addEventListener si está disponible, sino usar addListener
      if (this.systemThemeQuery.addEventListener) {
        this.systemThemeQuery.addEventListener('change', handleSystemThemeChange);
      } else {
        // Fallback para navegadores más antiguos
        this.systemThemeQuery.addListener(handleSystemThemeChange);
      }
    } catch (error) {
      console.warn('Error configurando listener del tema del sistema:', error);
    }
  }

  /**
   * Aplica un tema de forma segura
   */
  applyTheme(theme) {
    if (!['light', 'dark', 'auto'].includes(theme)) {
      console.warn('Tema inválido:', theme);
      return;
    }

    try {
      const effectiveTheme = theme === 'auto' ? this.systemTheme : theme;
      
      // Remover clases de tema anteriores
      document.documentElement.classList.remove('theme-light', 'theme-dark');
      
      // Aplicar nuevo tema
      document.documentElement.classList.add(`theme-${effectiveTheme}`);
      
      // Actualizar atributo data-theme
      document.documentElement.setAttribute('data-theme', effectiveTheme);
      
      // Aplicar colores personalizados
      this.applyCustomColors();
      
      // Actualizar icono
      this.updateThemeIcon(effectiveTheme);
      
      // Trigger para otros componentes
      window.dispatchEvent(new CustomEvent('themeChanged', {
        detail: { theme: effectiveTheme, originalTheme: theme }
      }));

      // Guardar en localStorage
      if (this.options.persistTheme) {
        this.saveToStorage('portfolio-theme', theme);
      }
    } catch (error) {
      console.error('Error aplicando tema:', error);
    }
  }

  /**
   * Guardar en localStorage de forma segura
   */
  saveToStorage(key, value) {
    try {
      localStorage.setItem(key, value);
    } catch (error) {
      console.warn('Error guardando en localStorage:', key, error);
    }
  }

  /**
   * Establece un tema
   */
  setTheme(theme) {
    if (!['light', 'dark', 'auto'].includes(theme)) {
      console.warn('Tema inválido:', theme);
      return;
    }

    this.currentTheme = theme;
    this.isSystemPreferenceEnabled = theme === 'auto';
    this.applyTheme(theme);
    
    if (this.options.persistTheme) {
      this.saveToStorage('portfolio-system-theme', this.isSystemPreferenceEnabled.toString());
    }
  }

  /**
   * Alterna entre temas
   */
  toggleTheme() {
    const themes = ['light', 'dark'];
    const currentIndex = themes.indexOf(this.currentTheme);
    const nextTheme = themes[(currentIndex + 1) % themes.length];
    this.setTheme(nextTheme);
    this.updateActiveThemeOption(nextTheme);
  }

  /**
   * Aplica un tema predefinido
   */
  applyPresetTheme(presetName) {
    const presets = {
      blue: { primary: '#3b82f6', secondary: '#1d4ed8', accent: '#60a5fa' },
      green: { primary: '#10b981', secondary: '#047857', accent: '#34d399' },
      purple: { primary: '#8b5cf6', secondary: '#5b21b6', accent: '#a78bfa' },
      orange: { primary: '#f59e0b', secondary: '#d97706', accent: '#fbbf24' },
      red: { primary: '#ef4444', secondary: '#dc2626', accent: '#f87171' }
    };

    if (presets[presetName]) {
      this.customColors = { ...presets[presetName] };
      this.applyCustomColors();
      this.saveCustomColors();
    }
  }

  /**
   * Aplica colores personalizados de forma segura
   */
  applyCustomColors() {
    try {
      const root = document.documentElement;
      
      Object.entries(this.customColors).forEach(([key, value]) => {
        if (this.isValidHexColor(value)) {
          const rgb = this.hexToRgb(value);
          if (rgb) {
            root.style.setProperty(`--${key}-color`, value);
            root.style.setProperty(`--${key}-color-rgb`, `${rgb.r}, ${rgb.g}, ${rgb.b}`);
            
            // Generar variantes
            root.style.setProperty(`--${key}-color-light`, this.lightenColor(value, 0.2));
            root.style.setProperty(`--${key}-color-dark`, this.darkenColor(value, 0.2));
          }
        }
      });
    } catch (error) {
      console.error('Error aplicando colores personalizados:', error);
    }
  }

  /**
   * Valida si un color hex es válido
   */
  isValidHexColor(hex) {
    return /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/.test(hex);
  }

  /**
   * Convierte hex a RGB de forma segura
   */
  hexToRgb(hex) {
    try {
      const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
      return result ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16)
      } : null;
    } catch (error) {
      console.warn('Error convirtiendo hex a RGB:', hex, error);
      return null;
    }
  }

  /**
   * Actualiza el color personalizado
   */
  updateCustomColor(colorType, value) {
    if (!this.isValidHexColor(value)) {
      console.warn('Color hex inválido:', value);
      return;
    }

    const colorKey = colorType.replace('-color', '');
    if (this.customColors.hasOwnProperty(colorKey)) {
      this.customColors[colorKey] = value;
      this.applyCustomColors();
    }
  }

  /**
   * Resetea colores personalizados
   */
  resetCustomColors() {
    this.customColors = {
      primary: '#3b82f6',
      secondary: '#10b981',
      accent: '#f59e0b'
    };

    // Actualizar inputs si existen
    if (this.themeSwitcherElement) {
      const colorInputs = this.themeSwitcherElement.querySelectorAll('input[type="color"]');
      colorInputs.forEach(input => {
        const colorKey = input.id.replace('-color', '');
        if (this.customColors[colorKey]) {
          input.value = this.customColors[colorKey];
        }
      });
    }

    this.applyCustomColors();
  }

  /**
   * Guarda colores personalizados
   */
  saveCustomColors() {
    if (this.options.persistTheme) {
      this.saveToStorage('portfolio-custom-colors', JSON.stringify(this.customColors));
    }
  }

  /**
   * Alterna el personalizador de colores
   */
  toggleColorCustomizer() {
    if (!this.themeSwitcherElement) return;

    const customizer = this.themeSwitcherElement.querySelector('.color-customizer');
    if (customizer) {
      const isVisible = customizer.style.display !== 'none';
      customizer.style.display = isVisible ? 'none' : 'block';
    }
  }

  /**
   * Alterna animaciones
   */
  toggleAnimations(enabled) {
    this.options.enableAnimations = enabled;
    document.documentElement.classList.toggle('no-animations', !enabled);
    
    if (this.options.persistTheme) {
      this.saveToStorage('portfolio-animations', enabled.toString());
    }
  }

  /**
   * Alterna alto contraste
   */
  toggleHighContrast(enabled) {
    document.documentElement.classList.toggle('high-contrast', enabled);
    
    if (this.options.persistTheme) {
      this.saveToStorage('portfolio-high-contrast', enabled.toString());
    }
  }

  /**
   * Alterna movimiento reducido
   */
  toggleReducedMotion(enabled) {
    document.documentElement.classList.toggle('reduce-motion', enabled);
    
    if (this.options.persistTheme) {
      this.saveToStorage('portfolio-reduce-motion', enabled.toString());
    }
  }

  /**
   * Obtiene el icono del tema
   */
  getThemeIcon(theme) {
    const icons = {
      light: '☀️',
      dark: '🌙',
      auto: '💻'
    };
    return icons[theme] || icons.light;
  }

  /**
   * Actualiza el icono del tema
   */
  updateThemeIcon(theme) {
    if (!this.themeSwitcherElement) {
      console.warn('⚠️ ThemeSwitcher: No se puede actualizar icono, elemento no disponible');
      return;
    }
    
    const themeIcon = this.themeSwitcherElement.querySelector('.theme-icon');
    if (themeIcon) {
      themeIcon.innerHTML = this.getThemeIcon(theme);
    }
  }

  /**
   * Actualiza la opción activa del tema
   */
  updateActiveThemeOption(theme) {
    if (!this.themeSwitcherElement) {
      console.warn('⚠️ ThemeSwitcher: No se puede actualizar opción activa, elemento no disponible');
      return;
    }
    
    const themeOptions = this.themeSwitcherElement.querySelectorAll('.theme-option');
    themeOptions.forEach(option => {
      option.classList.toggle('active', option.dataset.theme === theme);
    });
  }

  /**
   * Verifica si alto contraste está habilitado
   */
  isHighContrastEnabled() {
    try {
      return localStorage.getItem('portfolio-high-contrast') === 'true';
    } catch {
      return false;
    }
  }

  /**
   * Verifica si movimiento reducido está habilitado
   */
  isReducedMotionEnabled() {
    try {
      return localStorage.getItem('portfolio-reduce-motion') === 'true' ||
             (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches);
    } catch {
      return false;
    }
  }

  /**
   * Funciones auxiliares de color
   */
  lightenColor(color, amount) {
    try {
      const usePound = color[0] === '#';
      const col = usePound ? color.slice(1) : color;
      
      if (!/^[0-9A-F]{6}$/i.test(col)) {
        return color; // Retornar color original si es inválido
      }
      
      const num = parseInt(col, 16);
      let r = (num >> 16) + Math.round(amount * 255);
      let g = (num >> 8 & 0x00FF) + Math.round(amount * 255);
      let b = (num & 0x0000FF) + Math.round(amount * 255);
      
      r = Math.max(0, Math.min(255, r));
      g = Math.max(0, Math.min(255, g));
      b = Math.max(0, Math.min(255, b));
      
      return (usePound ? '#' : '') + (r << 16 | g << 8 | b).toString(16).padStart(6, '0');
    } catch (error) {
      console.warn('Error aclarando color:', color, error);
      return color;
    }
  }

  darkenColor(color, amount) {
    return this.lightenColor(color, -amount);
  }

  /**
   * Inyecta estilos CSS necesarios
   */
  injectStyles() {
    if (document.getElementById('theme-switcher-styles')) return;

    try {
      const styles = document.createElement('style');
      styles.id = 'theme-switcher-styles';
      styles.textContent = `
        .theme-switcher-wrapper,
        .theme-switcher {
          position: relative;
          display: inline-block;
        }
        
        .theme-toggle {
          background: none;
          border: none;
          cursor: pointer;
          padding: 8px;
          border-radius: 6px;
          transition: all 0.3s ease;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1.2em;
        }
        
        .theme-toggle:hover {
          background: rgba(var(--text-color-rgb, 0, 0, 0), 0.1);
          transform: scale(1.1);
        }
        
        .theme-dropdown {
          position: absolute;
          top: 100%;
          right: 0;
          background: var(--background-color, white);
          border: 1px solid var(--border-color, #e5e7eb);
          border-radius: 12px;
          box-shadow: 0 10px 25px rgba(0, 0, 0, 0.15);
          backdrop-filter: blur(10px);
          opacity: 0;
          visibility: hidden;
          transform: translateY(-10px);
          transition: all 0.3s ease;
          z-index: 1000;
          min-width: 280px;
          max-height: 70vh;
          overflow-y: auto;
        }
        
        .theme-dropdown.active {
          opacity: 1;
          visibility: visible;
          transform: translateY(5px);
        }
        
        .theme-dropdown-content {
          padding: 20px;
        }
        
        .theme-section {
          margin-bottom: 20px;
        }
        
        .theme-section:last-child {
          margin-bottom: 0;
        }
        
        .theme-section-title {
          font-size: 14px;
          font-weight: 600;
          margin-bottom: 12px;
          color: var(--text-color, #374151);
        }
        
        .theme-options {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 8px;
        }
        
        .theme-option {
          background: none;
          border: 1px solid var(--border-color, #e5e7eb);
          border-radius: 8px;
          padding: 12px 8px;
          cursor: pointer;
          transition: all 0.3s ease;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 4px;
          font-size: 12px;
          color: var(--text-color, #374151);
        }
        
        .theme-option:hover {
          border-color: var(--primary-color, #3b82f6);
          background: rgba(var(--primary-color-rgb, 59, 130, 246), 0.1);
        }
        
        .theme-option.active {
          background: var(--primary-color, #3b82f6);
          color: white;
          border-color: var(--primary-color, #3b82f6);
        }
        
        .preset-themes {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 8px;
        }
        
        .preset-theme {
          border: none;
          border-radius: 8px;
          padding: 20px 12px;
          cursor: pointer;
          color: white;
          font-weight: 600;
          font-size: 12px;
          transition: all 0.3s ease;
          position: relative;
          overflow: hidden;
        }
        
        .preset-theme:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 20px rgba(0, 0, 0, 0.2);
        }
        
        .preset-theme.custom {
          background: var(--border-color, #e5e7eb);
          color: var(--text-color, #374151);
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 4px;
        }
        
        .color-customizer {
          border-top: 1px solid var(--border-color, #e5e7eb);
          padding-top: 16px;
          margin-top: 16px;
        }
        
        .color-inputs {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 12px;
          margin-bottom: 16px;
        }
        
        .color-input-group {
          display: flex;
          flex-direction: column;
          gap: 4px;
        }
        
        .color-input-group label {
          font-size: 12px;
          color: var(--text-color-secondary, #6b7280);
        }
        
        .color-input-group input[type="color"] {
          width: 100%;
          height: 40px;
          border: none;
          border-radius: 6px;
          cursor: pointer;
        }
        
        .color-actions {
          display: flex;
          gap: 8px;
        }
        
        .btn-reset-colors,
        .btn-apply-colors {
          flex: 1;
          padding: 8px 16px;
          border: 1px solid var(--border-color, #e5e7eb);
          border-radius: 6px;
          cursor: pointer;
          font-size: 12px;
          transition: all 0.3s ease;
          background: var(--background-color, white);
          color: var(--text-color, #374151);
        }
        
        .btn-apply-colors {
          background: var(--primary-color, #3b82f6);
          color: white;
          border-color: var(--primary-color, #3b82f6);
        }
        
        .btn-reset-colors:hover,
        .btn-apply-colors:hover {
          opacity: 0.8;
        }
        
        .theme-settings {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }
        
        .setting-item {
          display: flex;
          align-items: center;
          gap: 8px;
          cursor: pointer;
          font-size: 14px;
          color: var(--text-color, #374151);
        }
        
        .setting-item input[type="checkbox"] {
          width: 16px;
          height: 16px;
        }
        
        /* Modo oscuro */
        [data-theme="dark"] .theme-dropdown {
          background: var(--background-color, #1f2937);
          border-color: var(--border-color, #374151);
        }
        
        [data-theme="dark"] .theme-section-title {
          color: var(--text-color, #f9fafb);
        }
        
        [data-theme="dark"] .theme-option {
          color: var(--text-color, #f9fafb);
          border-color: var(--border-color, #374151);
        }
        
        [data-theme="dark"] .preset-theme.custom {
          background: var(--border-color, #374151);
          color: var(--text-color, #f9fafb);
        }
        
        [data-theme="dark"] .btn-reset-colors {
          background: var(--background-color, #1f2937);
          color: var(--text-color, #f9fafb);
          border-color: var(--border-color, #374151);
        }
        
        [data-theme="dark"] .setting-item {
          color: var(--text-color, #f9fafb);
        }
        
        /* Animaciones reducidas */
        .reduce-motion .theme-toggle,
        .reduce-motion .theme-dropdown,
        .reduce-motion .theme-option,
        .reduce-motion .preset-theme {
          transition: none !important;
        }
        
        /* Alto contraste */
        .high-contrast .theme-dropdown {
          border-width: 2px;
          box-shadow: 0 0 0 2px var(--primary-color, #3b82f6);
        }
        
        .high-contrast .theme-option:focus,
        .high-contrast .preset-theme:focus {
          outline: 2px solid var(--primary-color, #3b82f6);
          outline-offset: 2px;
        }
        
        @media (max-width: 768px) {
          .theme-dropdown {
            right: -20px;
            left: -20px;
            min-width: auto;
          }
          
          .theme-options {
            grid-template-columns: repeat(2, 1fr);
          }
          
          .color-inputs {
            grid-template-columns: 1fr;
          }
        }
      `;
      document.head.appendChild(styles);
    } catch (error) {
      console.error('Error inyectando estilos:', error);
    }
  }

  /**
   * Métodos públicos
   */

  /**
   * Obtiene el tema actual
   */
  getCurrentTheme() {
    return this.currentTheme;
  }

  /**
   * Obtiene colores personalizados
   */
  getCustomColors() {
    return { ...this.customColors };
  }

  /**
   * Verifica si está inicializado
   */
  isReady() {
    return this.isInitialized;
  }

  /**
   * Exporta configuración del tema
   */
  exportThemeConfig() {
    return {
      theme: this.currentTheme,
      systemPreference: this.isSystemPreferenceEnabled,
      customColors: this.customColors,
      animations: this.options.enableAnimations,
      highContrast: this.isHighContrastEnabled(),
      reducedMotion: this.isReducedMotionEnabled()
    };
  }

  /**
   * Importa configuración del tema
   */
  importThemeConfig(config) {
    if (!config || typeof config !== 'object') {
      console.warn('Configuración de tema inválida');
      return;
    }

    try {
      if (config.theme && ['light', 'dark', 'auto'].includes(config.theme)) {
        this.setTheme(config.theme);
      }
      
      if (config.customColors && typeof config.customColors === 'object') {
        this.customColors = { ...this.customColors, ...config.customColors };
        this.applyCustomColors();
        this.saveCustomColors();
      }
      
      if (typeof config.animations === 'boolean') {
        this.toggleAnimations(config.animations);
      }
      
      if (typeof config.highContrast === 'boolean') {
        this.toggleHighContrast(config.highContrast);
      }
      
      if (typeof config.reducedMotion === 'boolean') {
        this.toggleReducedMotion(config.reducedMotion);
      }
    } catch (error) {
      console.error('Error importando configuración:', error);
    }
  }

  /**
   * Refresca el componente
   */
  refresh() {
    try {
      this.loadSavedTheme();
      this.loadSavedSettings();
      this.applyTheme(this.currentTheme);
      this.updateActiveThemeOption(this.currentTheme);
    } catch (error) {
      console.error('Error refrescando ThemeSwitcher:', error);
    }
  }

  /**
   * Destructor
   */
  destroy() {
    try {
      // Limpiar event listeners
      this.listeners.forEach(({ element, event, handler }) => {
        if (element && typeof element.removeEventListener === 'function') {
          element.removeEventListener(event, handler);
        }
      });
      this.listeners = [];

      // Limpiar system theme query
      if (this.systemThemeQuery) {
        try {
          if (this.systemThemeQuery.removeEventListener) {
            // Método moderno
            this.systemThemeQuery.removeEventListener('change', this.handleSystemThemeChange);
          } else if (this.systemThemeQuery.removeListener) {
            // Método legacy
            this.systemThemeQuery.removeListener(this.handleSystemThemeChange);
          }
        } catch (error) {
          console.warn('Error limpiando system theme listener:', error);
        }
        this.systemThemeQuery = null;
      }

      // Remover elemento del DOM
      if (this.themeSwitcherElement && this.themeSwitcherElement.parentNode) {
        this.themeSwitcherElement.parentNode.removeChild(this.themeSwitcherElement);
      }
      this.themeSwitcherElement = null;

      // Remover estilos
      const styles = document.getElementById('theme-switcher-styles');
      if (styles && styles.parentNode) {
        styles.parentNode.removeChild(styles);
      }

      // Reset state
      this.isInitialized = false;
      
      console.log('✅ ThemeSwitcher destruido correctamente');
    } catch (error) {
      console.error('Error destruyendo ThemeSwitcher:', error);
    }
  }
}

// Auto-inicialización con mejor manejo de errores
if (typeof window !== 'undefined') {
  const initThemeSwitcher = () => {
    try {
      // Evitar múltiples instancias
      if (window.themeSwitcherInstance) {
        console.log('ThemeSwitcher ya está inicializado');
        return;
      }

      window.themeSwitcherInstance = new ThemeSwitcher();
      console.log('✅ ThemeSwitcher auto-inicializado');
    } catch (error) {
      console.error('❌ Error al auto-inicializar ThemeSwitcher:', error);
    }
  };

  // Múltiples métodos de inicialización para mayor compatibilidad
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initThemeSwitcher);
  } else if (document.readyState === 'interactive' || document.readyState === 'complete') {
    // DOM ya está listo
    initThemeSwitcher();
  }

  // Fallback adicional con setTimeout para casos edge
  setTimeout(() => {
    if (!window.themeSwitcherInstance) {
      initThemeSwitcher();
    }
  }, 100);
}

export default ThemeSwitcher;