export class NotificationSystem {
  constructor(options = {}) {
    this.options = {
      container: document.body,
      position: 'top-right', // top-right, top-left, bottom-right, bottom-left, top-center, bottom-center
      autoClose: true,
      autoCloseDelay: 5000,
      maxNotifications: 5,
      animation: 'slide', // slide, fade, bounce
      showProgress: true,
      preventDuplicates: true,
      stackable: true,
      zIndex: 9999,
      ...options
    };

    this.notifications = [];
    this.container = null;
    this.isInitialized = false;
    this.styleSheet = null;
    this.init();
  }

  /**
   * Inicializa el sistema de notificaciones
   */
  init() {
    if (this.isInitialized) {
      console.warn('NotificationSystem ya está inicializado');
      return false;
    }

    try {
      this.createContainer();
      this.injectStyles();
      this.isInitialized = true;
      return true;
    } catch (error) {
      console.error('Error inicializando NotificationSystem:', error);
      return false;
    }
  }

  /**
   * Crea el contenedor de notificaciones
   */
  createContainer() {
    if (this.container) {
      console.warn('Contenedor de notificaciones ya existe');
      return;
    }

    this.container = document.createElement('div');
    this.container.className = `notification-container notification-${this.options.position}`;
    this.container.setAttribute('aria-live', 'polite');
    this.container.setAttribute('aria-label', 'Notificaciones');
    this.container.style.zIndex = this.options.zIndex;

    let targetContainer;
    
    try {
      if (typeof this.options.container === 'string') {
        targetContainer = document.querySelector(this.options.container);
        if (!targetContainer) {
          console.warn(`Contenedor "${this.options.container}" no encontrado, usando document.body`);
          targetContainer = document.body;
        }
      } else if (this.options.container instanceof Element) {
        targetContainer = this.options.container;
      } else {
        targetContainer = document.body;
      }

      targetContainer.appendChild(this.container);
    } catch (error) {
      console.error('Error creando contenedor:', error);
      document.body.appendChild(this.container);
    }
  }

  /**
   * Inyecta los estilos CSS necesarios
   */
  injectStyles() {
    if (document.getElementById('notification-styles') || this.styleSheet) {
      return;
    }

    try {
      const styles = document.createElement('style');
      styles.id = 'notification-styles';
      styles.textContent = this.getCSSStyles();
      document.head.appendChild(styles);
      this.styleSheet = styles;
    } catch (error) {
      console.error('Error inyectando estilos:', error);
    }
  }

  /**
   * Retorna los estilos CSS
   */
  getCSSStyles() {
    return `
      .notification-container {
        position: fixed;
        z-index: ${this.options.zIndex};
        pointer-events: none;
        max-width: 400px;
        min-width: 300px;
      }
      
      .notification-top-right {
        top: 20px;
        right: 20px;
      }
      
      .notification-top-left {
        top: 20px;
        left: 20px;
      }
      
      .notification-bottom-right {
        bottom: 20px;
        right: 20px;
      }
      
      .notification-bottom-left {
        bottom: 20px;
        left: 20px;
      }
      
      .notification-top-center {
        top: 20px;
        left: 50%;
        transform: translateX(-50%);
      }
      
      .notification-bottom-center {
        bottom: 20px;
        left: 50%;
        transform: translateX(-50%);
      }
      
      .notification {
        pointer-events: auto;
        background: white;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        margin-bottom: 10px;
        overflow: hidden;
        position: relative;
        min-width: 300px;
        max-width: 400px;
        border-left: 4px solid #3498db;
        transition: all 0.3s ease;
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
        word-wrap: break-word;
      }
      
      .notification:hover {
        box-shadow: 0 6px 16px rgba(0, 0, 0, 0.2);
        transform: translateY(-2px);
      }
      
      .notification.success {
        border-left-color: #27ae60;
      }
      
      .notification.error {
        border-left-color: #e74c3c;
      }
      
      .notification.warning {
        border-left-color: #f39c12;
      }
      
      .notification.info {
        border-left-color: #3498db;
      }
      
      .notification-content {
        padding: 16px;
        display: flex;
        align-items: flex-start;
        gap: 12px;
      }
      
      .notification-icon {
        flex-shrink: 0;
        width: 20px;
        height: 20px;
        margin-top: 2px;
      }
      
      .notification-text {
        flex: 1;
        min-width: 0;
      }
      
      .notification-title {
        font-weight: 600;
        margin-bottom: 4px;
        color: #2c3e50;
        font-size: 14px;
        line-height: 1.3;
      }
      
      .notification-message {
        color: #7f8c8d;
        font-size: 13px;
        line-height: 1.4;
        word-break: break-word;
      }
      
      .notification-close {
        background: none;
        border: none;
        cursor: pointer;
        padding: 4px;
        color: #95a5a6;
        transition: color 0.2s ease;
        flex-shrink: 0;
        border-radius: 4px;
        display: flex;
        align-items: center;
        justify-content: center;
      }
      
      .notification-close:hover {
        color: #2c3e50;
        background: rgba(0, 0, 0, 0.05);
      }
      
      .notification-close:focus {
        outline: 2px solid #3498db;
        outline-offset: 2px;
      }
      
      .notification-progress {
        position: absolute;
        bottom: 0;
        left: 0;
        height: 3px;
        background: rgba(0, 0, 0, 0.1);
        transition: width linear;
        width: 0%;
      }
      
      .notification.success .notification-progress {
        background: #27ae60;
      }
      
      .notification.error .notification-progress {
        background: #e74c3c;
      }
      
      .notification.warning .notification-progress {
        background: #f39c12;
      }
      
      .notification.info .notification-progress {
        background: #3498db;
      }
      
      /* Animaciones */
      .notification.slide-enter {
        transform: translateX(100%);
        opacity: 0;
      }
      
      .notification.slide-enter-active {
        transform: translateX(0);
        opacity: 1;
      }
      
      .notification.slide-exit {
        transform: translateX(0);
        opacity: 1;
      }
      
      .notification.slide-exit-active {
        transform: translateX(100%);
        opacity: 0;
        margin-bottom: 0;
        max-height: 0;
        padding: 0;
      }
      
      .notification.fade-enter {
        opacity: 0;
        transform: scale(0.9);
      }
      
      .notification.fade-enter-active {
        opacity: 1;
        transform: scale(1);
      }
      
      .notification.fade-exit {
        opacity: 1;
        transform: scale(1);
      }
      
      .notification.fade-exit-active {
        opacity: 0;
        transform: scale(0.9);
        margin-bottom: 0;
        max-height: 0;
        padding: 0;
      }
      
      .notification.bounce-enter {
        transform: scale(0.3);
        opacity: 0;
      }
      
      .notification.bounce-enter-active {
        animation: bounceIn 0.5s ease-out forwards;
      }
      
      .notification.bounce-exit-active {
        animation: bounceOut 0.3s ease-in forwards;
      }
      
      @keyframes bounceIn {
        0% { 
          transform: scale(0.3); 
          opacity: 0; 
        }
        50% { 
          transform: scale(1.05); 
        }
        70% { 
          transform: scale(0.9); 
        }
        100% { 
          transform: scale(1); 
          opacity: 1; 
        }
      }
      
      @keyframes bounceOut {
        0% { 
          transform: scale(1); 
          opacity: 1; 
        }
        100% { 
          transform: scale(0.3); 
          opacity: 0;
          margin-bottom: 0;
          max-height: 0;
          padding: 0;
        }
      }
      
      /* Posiciones para animaciones de entrada desde diferentes lados */
      .notification-top-left .notification.slide-enter,
      .notification-bottom-left .notification.slide-enter {
        transform: translateX(-100%);
      }
      
      .notification-top-center .notification.slide-enter,
      .notification-bottom-center .notification.slide-enter {
        transform: translateY(-100%);
      }
      
      .notification-bottom-center .notification.slide-enter {
        transform: translateY(100%);
      }
      
      /* Tema oscuro */
      @media (prefers-color-scheme: dark) {
        .notification {
          background: #2c3e50;
          color: #ecf0f1;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
        }
        
        .notification:hover {
          box-shadow: 0 6px 16px rgba(0, 0, 0, 0.4);
        }
        
        .notification-title {
          color: #ecf0f1;
        }
        
        .notification-message {
          color: #bdc3c7;
        }
        
        .notification-close {
          color: #95a5a6;
        }
        
        .notification-close:hover {
          color: #ecf0f1;
          background: rgba(255, 255, 255, 0.1);
        }
      }
      
      /* Responsive */
      @media (max-width: 480px) {
        .notification-container {
          left: 10px !important;
          right: 10px !important;
          max-width: none;
          transform: none !important;
        }
        
        .notification {
          min-width: auto;
          max-width: none;
        }
      }
    `;
  }

  /**
   * Muestra una notificación
   * @param {string} type - Tipo de notificación (success, error, warning, info)
   * @param {string} title - Título de la notificación
   * @param {string} message - Mensaje de la notificación
   * @param {Object} options - Opciones adicionales
   * @returns {Object|null} - Objeto de la notificación
   */
  show(type, title, message, options = {}) {
    if (!this.isInitialized) {
      console.error('NotificationSystem no está inicializado');
      return null;
    }

    // Validar parámetros
    if (!type || typeof type !== 'string') {
      console.error('Tipo de notificación requerido');
      return null;
    }

    if (!title || typeof title !== 'string') {
      console.error('Título de notificación requerido');
      return null;
    }

    // Sanitizar contenido
    const sanitizedTitle = this.sanitizeHTML(title);
    const sanitizedMessage = this.sanitizeHTML(message || '');

    // Verificar duplicados si está habilitado
    if (this.options.preventDuplicates && this.isDuplicate(sanitizedTitle, sanitizedMessage)) {
      console.log('Notificación duplicada ignorada');
      return null;
    }

    const notification = {
      id: this.generateId(),
      type: this.validateType(type),
      title: sanitizedTitle,
      message: sanitizedMessage,
      options: { ...this.options, ...options },
      element: null,
      progressElement: null,
      timer: null,
      startTime: null,
      pausedTime: 0,
      pausedAt: null,
      isRemoved: false
    };

    // Limitar número de notificaciones
    if (this.notifications.length >= this.options.maxNotifications) {
      this.remove(this.notifications[0].id);
    }

    this.notifications.push(notification);
    this.render(notification);

    return notification;
  }

  /**
   * Valida el tipo de notificación
   * @param {string} type - Tipo a validar
   * @returns {string} - Tipo válido
   */
  validateType(type) {
    const validTypes = ['success', 'error', 'warning', 'info'];
    return validTypes.includes(type) ? type : 'info';
  }

  /**
   * Sanitiza contenido HTML
   * @param {string} content - Contenido a sanitizar
   * @returns {string} - Contenido sanitizado
   */
  sanitizeHTML(content) {
    if (typeof content !== 'string') return '';
    
    const div = document.createElement('div');
    div.textContent = content;
    return div.innerHTML;
  }

  /**
   * Verifica si es una notificación duplicada
   * @param {string} title - Título
   * @param {string} message - Mensaje
   * @returns {boolean}
   */
  isDuplicate(title, message) {
    return this.notifications.some(notification => 
      !notification.isRemoved &&
      notification.title === title && 
      notification.message === message
    );
  }

  /**
   * Métodos de conveniencia para diferentes tipos
   */
  success(title, message, options = {}) {
    return this.show('success', title, message, options);
  }

  error(title, message, options = {}) {
    return this.show('error', title, message, { ...options, autoClose: false });
  }

  warning(title, message, options = {}) {
    return this.show('warning', title, message, options);
  }

  info(title, message, options = {}) {
    return this.show('info', title, message, options);
  }

  /**
   * Renderiza una notificación
   * @param {Object} notification - Objeto de notificación
   */
  render(notification) {
    if (!notification || !this.container) {
      console.error('No se puede renderizar la notificación');
      return;
    }

    try {
      const element = document.createElement('div');
      element.className = `notification ${notification.type} ${this.options.animation}-enter`;
      element.setAttribute('role', 'alert');
      element.setAttribute('aria-live', 'assertive');
      element.setAttribute('data-notification-id', notification.id);

      const icon = this.getIcon(notification.type);
      
      element.innerHTML = `
        <div class="notification-content">
          <div class="notification-icon">${icon}</div>
          <div class="notification-text">
            <div class="notification-title">${notification.title}</div>
            ${notification.message ? `<div class="notification-message">${notification.message}</div>` : ''}
          </div>
          <button class="notification-close" aria-label="Cerrar notificación" type="button">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        </div>
        ${this.options.showProgress && notification.options.autoClose ? 
          '<div class="notification-progress"></div>' : ''}
      `;

      notification.element = element;
      notification.progressElement = element.querySelector('.notification-progress');

      // Event listeners
      this.setupEventListeners(notification);

      // Añadir al contenedor
      this.container.appendChild(element);

      // Activar animación de entrada
      requestAnimationFrame(() => {
        if (element.parentNode) {
          element.classList.remove(`${this.options.animation}-enter`);
          element.classList.add(`${this.options.animation}-enter-active`);
        }
      });

      // Auto close
      if (notification.options.autoClose) {
        this.startTimer(notification);
      }
    } catch (error) {
      console.error('Error renderizando notificación:', error);
      this.removeFromArray(notification.id);
    }
  }

  /**
   * Configura los event listeners para una notificación
   * @param {Object} notification - Objeto de notificación
   */
  setupEventListeners(notification) {
    if (!notification.element) return;

    try {
      const closeButton = notification.element.querySelector('.notification-close');
      if (closeButton) {
        closeButton.addEventListener('click', (e) => {
          e.preventDefault();
          this.remove(notification.id);
        });
      }

      // Hover para pausar/reanudar timer
      if (notification.options.autoClose) {
        notification.element.addEventListener('mouseenter', () => {
          this.pauseTimer(notification.id);
        });
        
        notification.element.addEventListener('mouseleave', () => {
          this.resumeTimer(notification.id);
        });
      }

      // Soporte para teclado
      notification.element.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
          this.remove(notification.id);
        }
      });
    } catch (error) {
      console.error('Error configurando event listeners:', error);
    }
  }

  /**
   * Inicia el timer de auto-close
   * @param {Object} notification - Objeto de notificación
   */
  startTimer(notification) {
    if (!notification || notification.timer || notification.isRemoved) return;

    try {
      notification.startTime = Date.now();
      notification.pausedTime = 0;

      const updateProgress = () => {
        if (notification.isRemoved || !notification.element) return;

        const elapsed = Date.now() - notification.startTime - notification.pausedTime;
        const progress = Math.min(elapsed / notification.options.autoCloseDelay, 1);

        if (notification.progressElement) {
          notification.progressElement.style.width = `${progress * 100}%`;
        }

        if (progress >= 1) {
          this.remove(notification.id);
        } else if (!notification.isRemoved) {
          notification.timer = requestAnimationFrame(updateProgress);
        }
      };

      notification.timer = requestAnimationFrame(updateProgress);
    } catch (error) {
      console.error('Error iniciando timer:', error);
    }
  }

  /**
   * Pausa el timer
   * @param {string} id - ID de la notificación
   */
  pauseTimer(id) {
    const notification = this.notifications.find(n => n.id === id);
    if (!notification || !notification.timer || notification.isRemoved) return;

    try {
      cancelAnimationFrame(notification.timer);
      notification.timer = null;
      notification.pausedAt = Date.now();
    } catch (error) {
      console.error('Error pausando timer:', error);
    }
  }

  /**
   * Reanuda el timer
   * @param {string} id - ID de la notificación
   */
  resumeTimer(id) {
    const notification = this.notifications.find(n => n.id === id);
    if (!notification || notification.timer || notification.isRemoved || !notification.pausedAt) return;

    try {
      notification.pausedTime += Date.now() - notification.pausedAt;
      notification.pausedAt = null;
      this.startTimer(notification);
    } catch (error) {
      console.error('Error reanudando timer:', error);
    }
  }

  /**
   * Remueve una notificación
   * @param {string} id - ID de la notificación
   */
  remove(id) {
    const index = this.notifications.findIndex(n => n.id === id);
    if (index === -1) return;

    const notification = this.notifications[index];
    if (notification.isRemoved) return;

    notification.isRemoved = true;

    try {
      // Cancelar timer
      if (notification.timer) {
        cancelAnimationFrame(notification.timer);
        notification.timer = null;
      }

      if (notification.element && notification.element.parentNode) {
        // Animación de salida
        notification.element.classList.remove(`${this.options.animation}-enter-active`);
        notification.element.classList.add(`${this.options.animation}-exit`);
        
        requestAnimationFrame(() => {
          if (notification.element && notification.element.parentNode) {
            notification.element.classList.add(`${this.options.animation}-exit-active`);
          }
        });

        // Remover del DOM después de la animación
        setTimeout(() => {
          if (notification.element && notification.element.parentNode) {
            notification.element.parentNode.removeChild(notification.element);
          }
          this.removeFromArray(id);
        }, 350); // Tiempo extra para asegurar que la animación termine
      } else {
        this.removeFromArray(id);
      }
    } catch (error) {
      console.error('Error removiendo notificación:', error);
      this.removeFromArray(id);
    }
  }

  /**
   * Remueve una notificación del array
   * @param {string} id - ID de la notificación
   */
  removeFromArray(id) {
    const index = this.notifications.findIndex(n => n.id === id);
    if (index !== -1) {
      this.notifications.splice(index, 1);
    }
  }

  /**
   * Remueve todas las notificaciones
   */
  clear() {
    // Crear copia del array para evitar problemas de mutación
    const notificationsToRemove = [...this.notifications];
    notificationsToRemove.forEach(notification => {
      this.remove(notification.id);
    });
  }

  /**
   * Destruye el sistema de notificaciones
   */
  destroy() {
    try {
      this.clear();
      
      if (this.container && this.container.parentNode) {
        this.container.parentNode.removeChild(this.container);
      }
      
      if (this.styleSheet && this.styleSheet.parentNode) {
        this.styleSheet.parentNode.removeChild(this.styleSheet);
      }

      this.container = null;
      this.styleSheet = null;
      this.notifications = [];
      this.isInitialized = false;
    } catch (error) {
      console.error('Error destruyendo NotificationSystem:', error);
    }
  }

  /**
   * Obtiene el icono para un tipo de notificación
   * @param {string} type - Tipo de notificación
   * @returns {string} - SVG del icono
   */
  getIcon(type) {
    const icons = {
      success: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#27ae60" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <polyline points="20,6 9,17 4,12"></polyline>
      </svg>`,
      error: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#e74c3c" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <circle cx="12" cy="12" r="10"></circle>
        <line x1="15" y1="9" x2="9" y2="15"></line>
        <line x1="9" y1="9" x2="15" y2="15"></line>
      </svg>`,
      warning: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#f39c12" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"></path>
        <line x1="12" y1="9" x2="12" y2="13"></line>
        <line x1="12" y1="17" x2="12.01" y2="17"></line>
      </svg>`,
      info: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#3498db" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <circle cx="12" cy="12" r="10"></circle>
        <line x1="12" y1="16" x2="12" y2="12"></line>
        <line x1="12" y1="8" x2="12.01" y2="8"></line>
      </svg>`
    };

    return icons[type] || icons.info;
  }

  /**
   * Genera un ID único
   * @returns {string}
   */
  generateId() {
    return `notification_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }

  /**
   * Obtiene todas las notificaciones activas
   * @returns {Array}
   */
  getAll() {
    return this.notifications.filter(n => !n.isRemoved);
  }

  /**
   * Obtiene una notificación por ID
   * @param {string} id - ID de la notificación
   * @returns {Object|null}
   */
  getById(id) {
    return this.notifications.find(n => n.id === id && !n.isRemoved) || null;
  }

  /**
   * Actualiza las opciones del sistema
   * @param {Object} newOptions - Nuevas opciones
   */
  updateOptions(newOptions) {
    if (typeof newOptions === 'object' && newOptions !== null) {
      this.options = { ...this.options, ...newOptions };
      
      // Actualizar contenedor si cambió la posición
      if (this.container && newOptions.position) {
        this.container.className = `notification-container notification-${this.options.position}`;
      }
      
      // Actualizar z-index si cambió
      if (this.container && newOptions.zIndex) {
        this.container.style.zIndex = this.options.zIndex;
      }
    }
  }
}

/**
 * Instancia global del sistema de notificaciones
 */
let globalNotificationSystem = null;

/**
 * Obtiene o crea la instancia global
 * @param {Object} options - Opciones para la instancia
 * @returns {NotificationSystem}
 */
function getNotificationSystem(options = {}) {
  if (!globalNotificationSystem) {
    globalNotificationSystem = new NotificationSystem(options);
  }
  return globalNotificationSystem;
}

export const notifications = getNotificationSystem();

/**
 * Métodos de conveniencia globales
 */
export const notify = {
  success: (title, message, options) => notifications.success(title, message, options),
  error: (title, message, options) => notifications.error(title, message, options),
  warning: (title, message, options) => notifications.warning(title, message, options),
  info: (title, message, options) => notifications.info(title, message, options),
  clear: () => notifications.clear(),
  updateOptions: (options) => notifications.updateOptions(options),
  getAll: () => notifications.getAll(),
  getById: (id) => notifications.getById(id),
  remove: (id) => notifications.remove(id)
};