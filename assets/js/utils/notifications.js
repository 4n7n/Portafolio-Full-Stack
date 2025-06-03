class NotificationSystem {
    constructor() {
        this.container = null;
        this.notifications = new Map();
        this.maxNotifications = 5;
        this.defaultDuration = 5000;
        this.zIndexBase = 10000;
        
        this.init();
    }

    init() {
        this.createContainer();
        this.setupStyles();
    }

    createContainer() {
        this.container = document.createElement('div');
        this.container.id = 'notifications-container';
        this.container.className = 'notifications-container';
        this.container.setAttribute('aria-live', 'polite');
        this.container.setAttribute('aria-label', 'Notificaciones');
        
        document.body.appendChild(this.container);
    }

    setupStyles() {
        const styleId = 'notifications-styles';
        if (document.getElementById(styleId)) return;

        const style = document.createElement('style');
        style.id = styleId;
        style.textContent = `
            .notifications-container {
                position: fixed;
                top: 20px;
                right: 20px;
                z-index: ${this.zIndexBase};
                max-width: 400px;
                pointer-events: none;
            }

            .notification {
                background: white;
                border-radius: 8px;
                box-shadow: 0 10px 25px rgba(0, 0, 0, 0.15);
                margin-bottom: 10px;
                overflow: hidden;
                transform: translateX(100%);
                transition: all 0.3s cubic-bezier(0.68, -0.55, 0.265, 1.55);
                pointer-events: auto;
                border-left: 4px solid #e5e7eb;
                max-width: 100%;
                min-width: 300px;
            }

            .notification.show {
                transform: translateX(0);
            }

            .notification.hide {
                transform: translateX(100%);
                opacity: 0;
            }

            .notification-content {
                display: flex;
                align-items: flex-start;
                padding: 16px;
                gap: 12px;
            }

            .notification-icon {
                flex-shrink: 0;
                width: 24px;
                height: 24px;
                border-radius: 50%;
                display: flex;
                align-items: center;
                justify-content: center;
                color: white;
                font-size: 14px;
                margin-top: 2px;
            }

            .notification-body {
                flex: 1;
                min-width: 0;
            }

            .notification-title {
                font-weight: 600;
                font-size: 14px;
                color: #111827;
                margin-bottom: 4px;
                line-height: 1.3;
            }

            .notification-message {
                font-size: 13px;
                color: #6b7280;
                line-height: 1.4;
                word-wrap: break-word;
            }

            .notification-close {
                flex-shrink: 0;
                background: none;
                border: none;
                color: #9ca3af;
                cursor: pointer;
                padding: 4px;
                border-radius: 4px;
                width: 24px;
                height: 24px;
                display: flex;
                align-items: center;
                justify-content: center;
                transition: all 0.2s ease;
            }

            .notification-close:hover {
                background: #f3f4f6;
                color: #374151;
            }

            .notification-progress {
                position: absolute;
                bottom: 0;
                left: 0;
                height: 3px;
                background: rgba(0, 0, 0, 0.1);
                transition: width linear;
            }

            /* Notification Types */
            .notification.success {
                border-left-color: #10b981;
            }
            .notification.success .notification-icon {
                background: #10b981;
            }

            .notification.error {
                border-left-color: #ef4444;
            }
            .notification.error .notification-icon {
                background: #ef4444;
            }

            .notification.warning {
                border-left-color: #f59e0b;
            }
            .notification.warning .notification-icon {
                background: #f59e0b;
            }

            .notification.info {
                border-left-color: #3b82f6;
            }
            .notification.info .notification-icon {
                background: #3b82f6;
            }

            /* Dark Mode Support */
            @media (prefers-color-scheme: dark) {
                .notification {
                    background: #1f2937;
                    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.3);
                }
                
                .notification-title {
                    color: #f9fafb;
                }
                
                .notification-message {
                    color: #d1d5db;
                }
                
                .notification-close {
                    color: #6b7280;
                }
                
                .notification-close:hover {
                    background: #374151;
                    color: #d1d5db;
                }
            }

            /* Mobile Responsive */
            @media (max-width: 640px) {
                .notifications-container {
                    top: 10px;
                    right: 10px;
                    left: 10px;
                    max-width: none;
                }
                
                .notification {
                    min-width: auto;
                    margin-bottom: 8px;
                }
                
                .notification-content {
                    padding: 12px;
                }
            }

            /* Animations */
            @keyframes notification-slide-in {
                from {
                    transform: translateX(100%);
                    opacity: 0;
                }
                to {
                    transform: translateX(0);
                    opacity: 1;
                }
            }

            @keyframes notification-slide-out {
                from {
                    transform: translateX(0);
                    opacity: 1;
                }
                to {
                    transform: translateX(100%);
                    opacity: 0;
                }
            }

            /* Reduced Motion */
            @media (prefers-reduced-motion: reduce) {
                .notification {
                    transition: none;
                }
                
                .notification.show {
                    animation: none;
                }
            }
        `;
        
        document.head.appendChild(style);
    }

    show(message, type = 'info', options = {}) {
        const config = {
            title: '',
            duration: this.defaultDuration,
            persistent: false,
            actions: [],
            id: null,
            ...options
        };

        // Generate unique ID if not provided
        const id = config.id || this.generateId();
        
        // Remove existing notification with same ID
        if (this.notifications.has(id)) {
            this.hide(id);
        }

        // Limit maximum notifications
        if (this.notifications.size >= this.maxNotifications) {
            const oldestId = this.notifications.keys().next().value;
            this.hide(oldestId);
        }

        const notification = this.createNotification(id, message, type, config);
        this.notifications.set(id, notification);
        
        this.container.appendChild(notification.element);
        
        // Trigger show animation
        requestAnimationFrame(() => {
            notification.element.classList.add('show');
        });

        // Auto-hide if not persistent
        if (!config.persistent && config.duration > 0) {
            notification.timer = setTimeout(() => {
                this.hide(id);
            }, config.duration);
            
            // Add progress bar
            this.addProgressBar(notification, config.duration);
        }

        // Announce to screen readers
        this.announceToScreenReader(message, type);

        return id;
    }

    createNotification(id, message, type, config) {
        const element = document.createElement('div');
        element.className = `notification ${type}`;
        element.setAttribute('role', 'alert');
        element.setAttribute('data-notification-id', id);

        const icon = this.getIcon(type);
        const title = config.title || this.getDefaultTitle(type);

        element.innerHTML = `
            <div class="notification-content">
                <div class="notification-icon">
                    ${icon}
                </div>
                <div class="notification-body">
                    ${title ? `<div class="notification-title">${title}</div>` : ''}
                    <div class="notification-message">${message}</div>
                </div>
                <button class="notification-close" aria-label="Cerrar notificación">
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="currentColor">
                        <path d="M6 4.586L9.707.879a1 1 0 011.414 1.414L7.414 6l3.707 3.707a1 1 0 01-1.414 1.414L6 7.414l-3.707 3.707a1 1 0 01-1.414-1.414L4.586 6 .879 2.293A1 1 0 012.293.879L6 4.586z"/>
                    </svg>
                </button>
            </div>
        `;

        // Add close functionality
        const closeBtn = element.querySelector('.notification-close');
        closeBtn.addEventListener('click', () => {
            this.hide(id);
        });

        // Add actions if provided
        if (config.actions && config.actions.length > 0) {
            this.addActions(element, config.actions, id);
        }

        return {
            element,
            timer: null,
            type,
            message,
            config
        };
    }

    addProgressBar(notification, duration) {
        const progressBar = document.createElement('div');
        progressBar.className = 'notification-progress';
        notification.element.appendChild(progressBar);

        // Animate progress bar
        requestAnimationFrame(() => {
            progressBar.style.width = '100%';
            progressBar.style.transitionDuration = `${duration}ms`;
            
            requestAnimationFrame(() => {
                progressBar.style.width = '0%';
            });
        });
    }

    addActions(element, actions, notificationId) {
        const actionsContainer = document.createElement('div');
        actionsContainer.className = 'notification-actions';
        actionsContainer.style.cssText = `
            display: flex;
            gap: 8px;
            margin-top: 8px;
            padding-top: 8px;
            border-top: 1px solid #e5e7eb;
        `;

        actions.forEach(action => {
            const button = document.createElement('button');
            button.className = 'notification-action';
            button.textContent = action.label;
            button.style.cssText = `
                background: #f3f4f6;
                border: none;
                border-radius: 4px;
                padding: 4px 8px;
                font-size: 12px;
                cursor: pointer;
                transition: background 0.2s ease;
            `;
            
            button.addEventListener('click', () => {
                action.handler(notificationId);
                if (action.closeOnClick !== false) {
                    this.hide(notificationId);
                }
            });

            button.addEventListener('mouseover', () => {
                button.style.background = '#e5e7eb';
            });

            button.addEventListener('mouseout', () => {
                button.style.background = '#f3f4f6';
            });

            actionsContainer.appendChild(button);
        });

        element.querySelector('.notification-body').appendChild(actionsContainer);
    }

    hide(id) {
        const notification = this.notifications.get(id);
        if (!notification) return;

        // Clear timer
        if (notification.timer) {
            clearTimeout(notification.timer);
        }

        // Add hide animation
        notification.element.classList.add('hide');
        
        // Remove after animation
        setTimeout(() => {
            if (notification.element.parentNode) {
                notification.element.parentNode.removeChild(notification.element);
            }
            this.notifications.delete(id);
        }, 300);
    }

    hideAll() {
        const ids = Array.from(this.notifications.keys());
        ids.forEach(id => this.hide(id));
    }

    update(id, message, type, options = {}) {
        const notification = this.notifications.get(id);
        if (!notification) return false;

        const messageElement = notification.element.querySelector('.notification-message');
        const titleElement = notification.element.querySelector('.notification-title');
        
        if (messageElement) {
            messageElement.textContent = message;
        }
        
        if (options.title && titleElement) {
            titleElement.textContent = options.title;
        }
        
        if (type && type !== notification.type) {
            notification.element.className = `notification ${type} show`;
            const iconElement = notification.element.querySelector('.notification-icon');
            if (iconElement) {
                iconElement.innerHTML = this.getIcon(type);
            }
        }

        return true;
    }

    getIcon(type) {
        const icons = {
            success: `<svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                <path d="M13.854 3.646a.5.5 0 010 .708l-7 7a.5.5 0 01-.708 0l-3.5-3.5a.5.5 0 11.708-.708L6.5 10.293l6.646-6.647a.5.5 0 01.708 0z"/>
            </svg>`,
            error: `<svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                <path d="M8 15A7 7 0 118 1a7 7 0 010 14zM8 4a.905.905 0 00-.9.995l.35 3.507a.552.552 0 001.1 0l.35-3.507A.905.905 0 008 4zm.002 6a1 1 0 100 2 1 1 0 000-2z"/>
            </svg>`,
            warning: `<svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                <path d="M8.982 1.566a1.13 1.13 0 00-1.96 0L.165 13.233c-.457.778.091 1.767.98 1.767h13.713c.889 0 1.438-.99.98-1.767L8.982 1.566zM8 5c.535 0 .954.462.9.995l-.35 3.507a.552.552 0 01-1.1 0L7.1 5.995A.905.905 0 018 5zm.002 6a1 1 0 100 2 1 1 0 000-2z"/>
            </svg>`,
            info: `<svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                <path d="M8 15A7 7 0 118 1a7 7 0 010 14zm0-11a1 1 0 00-1 1v3a1 1 0 002 0V5a1 1 0 00-1-1zM6.025 9a1.975 1.975 0 103.95 0 1.975 1.975 0 00-3.95 0z"/>
            </svg>`
        };
        
        return icons[type] || icons.info;
    }

    getDefaultTitle(type) {
        const titles = {
            success: 'Éxito',
            error: 'Error',
            warning: 'Advertencia',
            info: 'Información'
        };
        
        return titles[type] || '';
    }

    announceToScreenReader(message, type) {
        const announcement = document.createElement('div');
        announcement.setAttribute('aria-live', 'assertive');
        announcement.setAttribute('aria-atomic', 'true');
        announcement.className = 'sr-only';
        announcement.textContent = `${this.getDefaultTitle(type)}: ${message}`;
        
        document.body.appendChild(announcement);
        
        setTimeout(() => {
            document.body.removeChild(announcement);
        }, 1000);
    }

    generateId() {
        return `notification-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    }

    // Public API methods
    success(message, options = {}) {
        return this.show(message, 'success', options);
    }

    error(message, options = {}) {
        return this.show(message, 'error', options);
    }

    warning(message, options = {}) {
        return this.show(message, 'warning', options);
    }

    info(message, options = {}) {
        return this.show(message, 'info', options);
    }

    // Utility methods
    count() {
        return this.notifications.size;
    }

    exists(id) {
        return this.notifications.has(id);
    }

    clear() {
        this.hideAll();
    }

    destroy() {
        this.hideAll();
        if (this.container && this.container.parentNode) {
            this.container.parentNode.removeChild(this.container);
        }
        
        const styles = document.getElementById('notifications-styles');
        if (styles) {
            styles.parentNode.removeChild(styles);
        }
    }
}

// Create singleton instance
let notificationInstance = null;

const getNotificationSystem = () => {
    if (!notificationInstance) {
        notificationInstance = new NotificationSystem();
    }
    return notificationInstance;
};

// Public API functions
export const showNotification = (message, type = 'info', options = {}) => {
    return getNotificationSystem().show(message, type, options);
};

export const hideNotification = (id) => {
    return getNotificationSystem().hide(id);
};

export const updateNotification = (id, message, type, options = {}) => {
    return getNotificationSystem().update(id, message, type, options);
};

export const clearNotifications = () => {
    return getNotificationSystem().clear();
};

// Convenience methods
export const showSuccess = (message, options = {}) => {
    return getNotificationSystem().success(message, options);
};

export const showError = (message, options = {}) => {
    return getNotificationSystem().error(message, options);
};

export const showWarning = (message, options = {}) => {
    return getNotificationSystem().warning(message, options);
};

export const showInfo = (message, options = {}) => {
    return getNotificationSystem().info(message, options);
};

export default NotificationSystem;