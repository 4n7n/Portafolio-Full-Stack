import { DOMHelpers } from '../utils/dom-helpers.js';
import { PORTFOLIO_CONFIG } from '../config/portfolio-config.js';

/**
 * Componente del selector de temas
 */
export class ThemeSwitcher {
  constructor(options = {}) {
    this.options = {
      defaultTheme: PORTFOLIO_CONFIG.theme?.defaultTheme || 'dark',
      enableSystemPreference: PORTFOLIO_CONFIG.theme?.enableSystemPreference || true,
      enableCustomColors: true,
      enableAnimations: true,
      persistTheme: true,
      transitionDuration: PORTFOLIO_CONFIG.theme?.transitionDuration || 300,
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

    // Asegurar que el DOM esté listo antes de inicializar
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', () => this.init());
    } else {
      this.init();
    }
  }

  /**
   * Inicializa el selector de temas
   */
  init() {
    this.detectSystemTheme();
    this.loadSavedTheme();
    this.createThemeSwitcher(); // DEBE ir antes que setupEventListeners y applyTheme
    
    // Solo continuar si se creó correctamente el elemento
    if (!this.themeSwitcherElement) {
      console.warn('⚠️ ThemeSwitcher: No se pudo crear el elemento, abortando inicialización');
      return false;
    }
    
    this.setupEventListeners();
    this.applyTheme(this.currentTheme);
    this.setupSystemThemeListener();
    
    console.log('✅ ThemeSwitcher: Inicializado correctamente');
    return true;
  }

  /**
   * Detecta el tema del sistema
   */
  detectSystemTheme() {
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      this.systemTheme = 'dark';
    } else {
      this.systemTheme = 'light';
    }
  }

  /**
   * Carga el tema guardado
   */
  loadSavedTheme() {
    if (!this.options.persistTheme) return;

    const savedTheme = localStorage.getItem('portfolio-theme');
    const savedSystemPref = localStorage.getItem('portfolio-system-theme');
    const savedColors = localStorage.getItem('portfolio-custom-colors');

    if (savedTheme) {
      this.currentTheme = savedTheme;
    }

    if (savedSystemPref !== null) {
      this.isSystemPreferenceEnabled = savedSystemPref === 'true';
    }

    if (savedColors) {
      try {
        this.customColors = { ...this.customColors, ...JSON.parse(savedColors) };
      } catch (e) {
        console.warn('Error cargando colores personalizados:', e);
      }
    }

    // Si está habilitada la preferencia del sistema, usar tema del sistema
    if (this.isSystemPreferenceEnabled) {
      this.currentTheme = this.systemTheme;
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
        
        // Crear wrapper para el botón existente
        const wrapper = document.createElement('div');
        wrapper.className = 'theme-switcher-wrapper';
        wrapper.style.position = 'relative';
        wrapper.style.display = 'inline-block';
        
        // Insertar wrapper antes del botón y mover el botón dentro
        existingButton.parentNode.insertBefore(wrapper, existingButton);
        wrapper.appendChild(existingButton);
        
        // Actualizar el contenido del botón existente para que funcione como toggle
        existingButton.innerHTML = `
          <div class="theme-icon">
            ${this.getThemeIcon(this.currentTheme)}
          </div>
        `;
        existingButton.className = 'theme-toggle';
        existingButton.setAttribute('title', 'Cambiar tema');
        
        // Crear el dropdown y añadirlo al wrapper
        const dropdown = document.createElement('div');
        dropdown.className = 'theme-dropdown';
        dropdown.innerHTML = `
          <div class="theme-dropdown-content">
            <!-- Opciones de tema principales -->
            <div class="theme-section">
              <h4 class="theme-section-title">Tema</h4>
              <div class="theme-options">
                <button class="theme-option ${this.currentTheme === 'light' ? 'active' : ''}" 
                        data-theme="light">
                  <i class="icon-sun">☀️</i>
                  <span>Claro</span>
                </button>
                <button class="theme-option ${this.currentTheme === 'dark' ? 'active' : ''}" 
                        data-theme="dark">
                  <i class="icon-moon">🌙</i>
                  <span>Oscuro</span>
                </button>
                <button class="theme-option ${this.currentTheme === 'auto' ? 'active' : ''}" 
                        data-theme="auto">
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
                        data-preset="blue"
                        style="background: linear-gradient(135deg, #3b82f6, #1d4ed8)">
                  <span>Azul</span>
                </button>
                <button class="preset-theme green" 
                        data-preset="green"
                        style="background: linear-gradient(135deg, #10b981, #047857)">
                  <span>Verde</span>
                </button>
                <button class="preset-theme purple" 
                        data-preset="purple"
                        style="background: linear-gradient(135deg, #8b5cf6, #5b21b6)">
                  <span>Púrpura</span>
                </button>
                <button class="preset-theme orange" 
                        data-preset="orange"
                        style="background: linear-gradient(135deg, #f59e0b, #d97706)">
                  <span>Naranja</span>
                </button>
                <button class="preset-theme red" 
                        data-preset="red"
                        style="background: linear-gradient(135deg, #ef4444, #dc2626)">
                  <span>Rojo</span>
                </button>
                <button class="preset-theme custom" 
                        data-preset="custom"
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
                  <button class="btn-reset-colors">Restablecer</button>
                  <button class="btn-apply-colors">Aplicar</button>
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
        
        wrapper.appendChild(dropdown);
        this.themeSwitcherElement = wrapper;
        
      } else {
        console.log('⚠️ Botón de tema no encontrado, creando uno nuevo...');
        
        // Si no existe el botón, crear uno nuevo (código original)
        const themeSwitcher = this.createElement('div', {
          id: 'theme-switcher-generated',
          className: 'theme-switcher',
          innerHTML: `
            <button class="theme-toggle" 
                    aria-label="Cambiar tema" 
                    title="Cambiar tema">
              <div class="theme-icon">
                ${this.getThemeIcon(this.currentTheme)}
              </div>
            </button>
            
            <div class="theme-dropdown">
              <!-- Mismo contenido del dropdown -->
            </div>
          `
        });

        // Insertar en el navbar o en el body
        const navbar = document.querySelector('.navbar') || document.querySelector('header');
        if (navbar) {
          navbar.appendChild(themeSwitcher);
        } else {
          document.body.appendChild(themeSwitcher);
        }

        this.themeSwitcherElement = themeSwitcher;
      }

      this.injectStyles();
      
      // Verificar que se creó correctamente
      if (!this.themeSwitcherElement) {
        throw new Error('No se pudo crear el elemento themeSwitcher');
      }
      
      return true;
      
    } catch (error) {
      console.error('❌ Error al crear ThemeSwitcher:', error);
      this.themeSwitcherElement = null;
      return false;
    }
  }

  /**
   * Helper para crear elementos (fallback si DOMHelpers no está disponible)
   */
  createElement(tag, options = {}) {
    if (typeof DOMHelpers !== 'undefined' && DOMHelpers.createElement) {
      return DOMHelpers.createElement(tag, options);
    }
    
    // Fallback manual
    const element = document.createElement(tag);
    if (options.id) element.id = options.id;
    if (options.className) element.className = options.className;
    if (options.innerHTML) element.innerHTML = options.innerHTML;
    return element;
  }

  /**
   * Configura event listeners
   */
  setupEventListeners() {
    if (!this.themeSwitcherElement) {
      console.error('❌ themeSwitcherElement no está definido');
      return;
    }

    // Toggle del dropdown
    const themeToggle = this.themeSwitcherElement.querySelector('.theme-toggle');
    const dropdown = this.themeSwitcherElement.querySelector('.theme-dropdown');

    if (!themeToggle || !dropdown) {
      console.error('❌ No se encontraron elementos theme-toggle o theme-dropdown');
      return;
    }

    themeToggle.addEventListener('click', (e) => {
      e.preventDefault();
      dropdown.classList.toggle('active');
    });

    // Cerrar dropdown al hacer click fuera
    document.addEventListener('click', (e) => {
      if (!this.themeSwitcherElement.contains(e.target)) {
        dropdown.classList.remove('active');
      }
    });

    // Opciones de tema
    const themeOptions = this.themeSwitcherElement.querySelectorAll('.theme-option');
    themeOptions.forEach(option => {
      option.addEventListener('click', () => {
        const theme = option.dataset.theme;
        this.setTheme(theme);
        this.updateActiveThemeOption(theme);
        dropdown.classList.remove('active'); // Cerrar dropdown después de seleccionar
      });
    });

    // Temas predefinidos
    const presetThemes = this.themeSwitcherElement.querySelectorAll('.preset-theme');
    presetThemes.forEach(preset => {
      preset.addEventListener('click', () => {
        const presetName = preset.dataset.preset;
        if (presetName === 'custom') {
          this.toggleColorCustomizer();
        } else {
          this.applyPresetTheme(presetName);
        }
      });
    });

    // Color customizer
    if (this.options.enableCustomColors) {
      this.setupColorCustomizer();
    }

    // Configuraciones
    this.setupThemeSettings();

    // Atajos de teclado
    this.setupKeyboardShortcuts();

    console.log('✅ Event listeners configurados correctamente');
  }

  /**
   * Configura el personalizador de colores
   */
  setupColorCustomizer() {
    const colorInputs = this.themeSwitcherElement.querySelectorAll('input[type="color"]');
    const resetBtn = this.themeSwitcherElement.querySelector('.btn-reset-colors');
    const applyBtn = this.themeSwitcherElement.querySelector('.btn-apply-colors');

    // Inputs de color
    colorInputs.forEach(input => {
      input.addEventListener('input', this.debounce(() => {
        this.updateCustomColor(input.id, input.value);
      }, 100));
    });

    // Botón reset
    if (resetBtn) {
      resetBtn.addEventListener('click', () => {
        this.resetCustomColors();
      });
    }

    // Botón aplicar
    if (applyBtn) {
      applyBtn.addEventListener('click', () => {
        this.saveCustomColors();
        this.toggleColorCustomizer();
      });
    }
  }

  /**
   * Función debounce simple (fallback si DOMHelpers no está disponible)
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
        func(...args);
      };
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
    };
  }

  /**
   * Configura las configuraciones del tema
   */
  setupThemeSettings() {
    const animationsToggle = this.themeSwitcherElement.querySelector('#enable-animations');
    const highContrastToggle = this.themeSwitcherElement.querySelector('#high-contrast');
    const reduceMotionToggle = this.themeSwitcherElement.querySelector('#reduce-motion');

    if (animationsToggle) {
      animationsToggle.addEventListener('change', () => {
        this.toggleAnimations(animationsToggle.checked);
      });
    }

    if (highContrastToggle) {
      highContrastToggle.addEventListener('change', () => {
        this.toggleHighContrast(highContrastToggle.checked);
      });
    }

    if (reduceMotionToggle) {
      reduceMotionToggle.addEventListener('change', () => {
        this.toggleReducedMotion(reduceMotionToggle.checked);
      });
    }
  }

  /**
   * Configura atajos de teclado
   */
  setupKeyboardShortcuts() {
    document.addEventListener('keydown', (e) => {
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
    });
  }

  /**
   * Configura listener para cambios del tema del sistema
   */
  setupSystemThemeListener() {
    if (!window.matchMedia) return;

    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    
    const handleSystemThemeChange = (e) => {
      this.systemTheme = e.matches ? 'dark' : 'light';
      
      if (this.isSystemPreferenceEnabled || this.currentTheme === 'auto') {
        this.applyTheme(this.systemTheme);
      }
    };

    mediaQuery.addEventListener('change', handleSystemThemeChange);
  }

  /**
   * Aplica un tema
   */
  applyTheme(theme) {
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
      localStorage.setItem('portfolio-theme', theme);
    }
  }

  /**
   * Establece un tema
   */
  setTheme(theme) {
    this.currentTheme = theme;
    this.isSystemPreferenceEnabled = theme === 'auto';
    this.applyTheme(theme);
    
    if (this.options.persistTheme) {
      localStorage.setItem('portfolio-system-theme', this.isSystemPreferenceEnabled.toString());
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
      blue: {
        primary: '#3b82f6',
        secondary: '#1d4ed8',
        accent: '#60a5fa'
      },
      green: {
        primary: '#10b981',
        secondary: '#047857',
        accent: '#34d399'
      },
      purple: {
        primary: '#8b5cf6',
        secondary: '#5b21b6',
        accent: '#a78bfa'
      },
      orange: {
        primary: '#f59e0b',
        secondary: '#d97706',
        accent: '#fbbf24'
      },
      red: {
        primary: '#ef4444',
        secondary: '#dc2626',
        accent: '#f87171'
      }
    };

    if (presets[presetName]) {
      this.customColors = { ...presets[presetName] };
      this.applyCustomColors();
      this.saveCustomColors();
    }
  }

  /**
   * Aplica colores personalizados
   */
  applyCustomColors() {
    const root = document.documentElement;
    
    // Convertir hex a RGB para variables CSS
    const hexToRgb = (hex) => {
      const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
      return result ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16)
      } : null;
    };

    Object.entries(this.customColors).forEach(([key, value]) => {
      const rgb = hexToRgb(value);
      if (rgb) {
        root.style.setProperty(`--${key}-color`, value);
        root.style.setProperty(`--${key}-color-rgb`, `${rgb.r}, ${rgb.g}, ${rgb.b}`);
        
        // Generar variantes más claras y oscuras
        root.style.setProperty(`--${key}-color-light`, this.lightenColor(value, 0.2));
        root.style.setProperty(`--${key}-color-dark`, this.darkenColor(value, 0.2));
      }
    });
  }

  /**
   * Actualiza el color personalizado
   */
  updateCustomColor(colorType, value) {
    const colorKey = colorType.replace('-color', '');
    this.customColors[colorKey] = value;
    this.applyCustomColors();
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

    // Actualizar inputs
    const colorInputs = this.themeSwitcherElement.querySelectorAll('input[type="color"]');
    colorInputs.forEach(input => {
      const colorKey = input.id.replace('-color', '');
      if (this.customColors[colorKey]) {
        input.value = this.customColors[colorKey];
      }
    });

    this.applyCustomColors();
  }

  /**
   * Guarda colores personalizados
   */
  saveCustomColors() {
    if (this.options.persistTheme) {
      localStorage.setItem('portfolio-custom-colors', JSON.stringify(this.customColors));
    }
  }

  /**
   * Alterna el personalizador de colores
   */
  toggleColorCustomizer() {
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
      localStorage.setItem('portfolio-animations', enabled.toString());
    }
  }

  /**
   * Alterna alto contraste
   */
  toggleHighContrast(enabled) {
    document.documentElement.classList.toggle('high-contrast', enabled);
    
    if (this.options.persistTheme) {
      localStorage.setItem('portfolio-high-contrast', enabled.toString());
    }
  }

  /**
   * Alterna movimiento reducido
   */
  toggleReducedMotion(enabled) {
    document.documentElement.classList.toggle('reduce-motion', enabled);
    
    if (this.options.persistTheme) {
      localStorage.setItem('portfolio-reduce-motion', enabled.toString());
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
    return localStorage.getItem('portfolio-high-contrast') === 'true';
  }

  /**
   * Verifica si movimiento reducido está habilitado
   */
  isReducedMotionEnabled() {
    return localStorage.getItem('portfolio-reduce-motion') === 'true' ||
           window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  }

  /**
   * Funciones auxiliares de color
   */
  lightenColor(color, amount) {
    const usePound = color[0] === '#';
    const col = usePound ? color.slice(1) : color;
    const num = parseInt(col, 16);
    let r = (num >> 16) + amount * 255;
    let g = (num >> 8 & 0x00FF) + amount * 255;
    let b = (num & 0x0000FF) + amount * 255;
    r = r > 255 ? 255 : r < 0 ? 0 : r;
    g = g > 255 ? 255 : g < 0 ? 0 : g;
    b = b > 255 ? 255 : b < 0 ? 0 : b;
    return (usePound ? '#' : '') + (r << 16 | g << 8 | b).toString(16).padStart(6, '0');
  }

  darkenColor(color, amount) {
    return this.lightenColor(color, -amount);
  }

  /**
   * Inyecta estilos CSS necesarios
   */
  injectStyles() {
    if (document.getElementById('theme-switcher-styles')) return;

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
    if (config.theme) {
      this.setTheme(config.theme);
    }
    
    if (config.customColors) {
      this.customColors = { ...config.customColors };
      this.applyCustomColors();
      this.saveCustomColors();
    }
    
    if (config.animations !== undefined) {
      this.toggleAnimations(config.animations);
    }
    
    if (config.highContrast !== undefined) {
      this.toggleHighContrast(config.highContrast);
    }
    
    if (config.reducedMotion !== undefined) {
      this.toggleReducedMotion(config.reducedMotion);
    }
  }

  /**
   * Destructor
   */
  destroy() {
    if (this.themeSwitcherElement && this.themeSwitcherElement.parentNode) {
      this.themeSwitcherElement.parentNode.removeChild(this.themeSwitcherElement);
    }
  }
}

// Auto-inicialización con mejor manejo de errores
if (typeof window !== 'undefined') {
  const initThemeSwitcher = () => {
    try {
      if (!window.themeSwitcherInstance) {
        window.themeSwitcherInstance = new ThemeSwitcher();
        console.log('✅ ThemeSwitcher inicializado correctamente');
      }
    } catch (error) {
      console.error('❌ Error al inicializar ThemeSwitcher:', error);
    }
  };

  // Múltiples formas de asegurar la inicialización
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initThemeSwitcher);
  } else {
    // DOM ya está listo
    initThemeSwitcher();
  }

  // Fallback adicional
  if (typeof DOMHelpers !== 'undefined' && DOMHelpers.ready) {
    DOMHelpers.ready(initThemeSwitcher);
  }
}