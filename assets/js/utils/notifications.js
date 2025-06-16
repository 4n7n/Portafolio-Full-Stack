
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
      ...options
    };

    this.notifications = [];
    this.container = null;
    this.init();
  }

  /**
   * Inicializa el sistema de notificaciones
   */
  init() {
    this.createContainer();
    this.injectStyles();
  }

  /**
   * Crea el contenedor de notificaciones
   */
  createContainer() {
    this.container = document.createElement('div');
    this.container.className = `notification-container notification-${this.options.position}`;
    this.container.setAttribute('aria-live', 'polite');
    this.container.setAttribute('aria-label', 'Notificaciones');
    
    if (typeof this.options.container === 'string') {
      document.querySelector(this.options.container).appendChild(this.container);
    } else {
      this.options.container.appendChild(this.container);
    }
  }

  /**
   * Inyecta los estilos CSS necesarios
   */
  injectStyles() {
    if (document.getElementById('notification-styles')) return;

    const styles = document.createElement('style');
    styles.id = 'notification-styles';
    styles.textContent = `
      .notification-container {
        position: fixed;
        z-index: 9999;
        pointer-events: none;
        max-width: 400px;
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
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
        margin-bottom: 10px;
        overflow: hidden;
        position: relative;
        min-width: 300px;
        max-width: 400px;
        border-left: 4px solid #3498db;
        transition: all 0.3s ease;
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
      }
      
      .notification-title {
        font-weight: 600;
        margin-bottom: 4px;
        color: #2c3e50;
        font-size: 14px;
      }
      
      .notification-message {
        color: #7f8c8d;
        font-size: 13px;
        line-height: 1.4;
      }
      
      .notification-close {
        background: none;
        border: none;
        cursor: pointer;
        padding: 4px;
        color: #95a5a6;
        transition: color 0.2s ease;
        flex-shrink: 0;
      }
      
      .notification-close:hover {
        color: #2c3e50;
      }
      
      .notification-progress {
        position: absolute;
        bottom: 0;
        left: 0;
        height: 3px;
        background: rgba(0, 0, 0, 0.1);
        transition: width linear;
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
      }
      
      .notification.bounce-enter {
        transform: scale(0.3);
        opacity: 0;
      }
      
      .notification.bounce-enter-active {
        animation: bounceIn 0.5s ease-out forwards;
      }
      
      @keyframes bounceIn {
        0% { transform: scale(0.3); opacity: 0; }
        50% { transform: scale(1.05); }
        70% { transform: scale(0.9); }
        100% { transform: scale(1); opacity: 1; }
      }
      
      /* Tema oscuro */
      @media (prefers-color-scheme: dark) {
        .notification {
          background: #2c3e50;
          color: #ecf0f1;
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
        }
      }
    `;
    
    document.head.appendChild(styles);
  }

  /**
   * Muestra una notificación
   * @param {string} type - Tipo de notificación (success, error, warning, info)
   * @param {string} title - Título de la notificación
   * @param {string} message - Mensaje de la notificación
   * @param {Object} options - Opciones adicionales
   * @returns {Object} - Objeto de la notificación
   */
  show(type, title, message, options = {}) {
    const notification = {
      id: this.generateId(),
      type,
      title,
      message,
      options: { ...this.options, ...options },
      element: null,
      progressElement: null,
      timer: null
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
   * Métodos de conveniencia para diferentes tipos
   */
  success(title, message, options = {}) {
    return this.show('success', title, message, options);
  }

  error(title, message, options = {}) {
    return this.show('error', title, message, options);
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
    const element = document.createElement('div');
    element.className = `notification ${notification.type} ${this.options.animation}-enter`;
    element.setAttribute('role', 'alert');
    element.setAttribute('aria-live', 'assertive');

    const icon = this.getIcon(notification.type);
    
    element.innerHTML = `
      <div class="notification-content">
        <div class="notification-icon">${icon}</div>
        <div class="notification-text">
          <div class="notification-title">${notification.title}</div>
          <div class="notification-message">${notification.message}</div>
        </div>
        <button class="notification-close" aria-label="Cerrar notificación">
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

    // Event listeners
    const closeButton = element.querySelector('.notification-close');
    closeButton.addEventListener('click', () => this.remove(notification.id));

    // Hover para pausar/reanudar timer
    if (notification.options.autoClose) {
      element.addEventListener('mouseenter', () => this.pauseTimer(notification.id));
      element.addEventListener('mouseleave', () => this.resumeTimer(notification.id));
    }

    // Añadir al contenedor
    this.container.appendChild(element);

    // Activar animación de entrada
    requestAnimationFrame(() => {
      element.classList.remove(`${this.options.animation}-enter`);
      element.classList.add(`${this.options.animation}-enter-active`);
    });

    // Auto close
    if (notification.options.autoClose) {
      this.startTimer(notification);
    }
  }

  /**
   * Inicia el timer de auto-close
   * @param {Object} notification - Objeto de notificación
   */
  startTimer(notification) {
    if (notification.timer) return;

    const progressElement = notification.element.querySelector('.notification-progress');
    let startTime = Date.now();
    let pausedTime = 0;

    const updateProgress = () => {
      const elapsed = Date.now() - startTime - pausedTime;
      const progress = Math.min(elapsed / notification.options.autoCloseDelay, 1);

      if (progressElement) {
        progressElement.style.width = `${progress * 100}%`;
      }

      if (progress >= 1) {
        this.remove(notification.id);
      } else {
        notification.timer = requestAnimationFrame(updateProgress);
      }
    };

    notification.timer = requestAnimationFrame(updateProgress);
    notification.startTime = startTime;
    notification.pausedTime = 0;
  }

  /**
   * Pausa el timer
   * @param {string} id - ID de la notificación
   */
  pauseTimer(id) {
    const notification = this.notifications.find(n => n.id === id);
    if (notification && notification.timer) {
      cancelAnimationFrame(notification.timer);
      notification.timer = null;
      notification.pausedAt = Date.now();
    }
  }

  /**
   * Reanuda el timer
   * @param {string} id - ID de la notificación
   */
  resumeTimer(id) {
    const notification = this.notifications.find(n => n.id === id);
    if (notification && !notification.timer && notification.pausedAt) {
      notification.pausedTime += Date.now() - notification.pausedAt;
      notification.pausedAt = null;
      this.startTimer(notification);
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
    
    // Cancelar timer
    if (notification.timer) {
      cancelAnimationFrame(notification.timer);
    }

    // Animación de salida
    notification.element.classList.add(`${this.options.animation}-exit-active`);
    
    setTimeout(() => {
      if (notification.element && notification.element.parentNode) {
        notification.element.parentNode.removeChild(notification.element);
      }
      this.notifications.splice(index, 1);
    }, 300);
  }

  /**
   * Remueve todas las notificaciones
   */
  clear() {
    this.notifications.forEach(notification => {
      this.remove(notification.id);
    });
  }

  /**
   * Obtiene el icono para un tipo de notificación
   * @param {string} type - Tipo de notificación
   * @returns {string} - SVG del icono
   */
  getIcon(type) {
    const icons = {
      success: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#27ae60" stroke-width="2">
        <polyline points="20,6 9,17 4,12"></polyline>
      </svg>`,
      error: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#e74c3c" stroke-width="2">
        <circle cx="12" cy="12" r="10"></circle>
        <line x1="15" y1="9" x2="9" y2="15"></line>
        <line x1="9" y1="9" x2="15" y2="15"></line>
      </svg>`,
      warning: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#f39c12" stroke-width="2">
        <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"></path>
        <line x1="12" y1="9" x2="12" y2="13"></line>
        <line x1="12" y1="17" x2="12.01" y2="17"></line>
      </svg>`,
      info: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#3498db" stroke-width="2">
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
}

/**
 * Instancia global del sistema de notificaciones
 */
export const notifications = new NotificationSystem();

/**
 * Métodos de conveniencia globales
 */
export const notify = {
  success: (title, message, options) => notifications.success(title, message, options),
  error: (title, message, options) => notifications.error(title, message, options),
  warning: (title, message, options) => notifications.warning(title, message, options),
  info: (title, message, options) => notifications.info(title, message, options),
  clear: () => notifications.clear()
};
