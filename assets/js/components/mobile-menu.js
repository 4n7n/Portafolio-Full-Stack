export class MobileMenu {
    constructor() {
        this.toggleButton = null;
        this.overlay = null;
        this.isOpen = false;
        this.trapFocus = null;
    }

    init() {
        this.cacheElements();
        this.bindEvents();
        this.setupAccessibility();
    }

    cacheElements() {
        this.toggleButton = document.getElementById('mobile-menu-toggle');
        this.overlay = document.getElementById('mobile-menu-overlay');
        this.menuContent = document.querySelector('.mobile-menu-content');
        this.menuLinks = document.querySelectorAll('.mobile-menu-link');
    }

    bindEvents() {
        if (this.toggleButton) {
            this.toggleButton.addEventListener('click', this.toggle.bind(this));
        }

        if (this.overlay) {
            this.overlay.addEventListener('click', (e) => {
                if (e.target === this.overlay) {
                    this.close();
                }
            });
        }

        // Cerrar con escape
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && this.isOpen) {
                this.close();
            }
        });

        // Enlaces del menú
        this.menuLinks.forEach(link => {
            link.addEventListener('click', () => {
                this.close();
            });
        });
    }

    toggle() {
        if (this.isOpen) {
            this.close();
        } else {
            this.open();
        }
    }

    open() {
        if (this.isOpen) return;

        this.isOpen = true;
        
        // Añadir clases
        this.toggleButton.classList.add('active');
        this.overlay.classList.add('active');
        document.body.classList.add('menu-open');

        // Prevenir scroll del body
        document.body.style.overflow = 'hidden';

        // Enfocar primer elemento
        this.trapFocus = this.createFocusTrap();
        
        // Animar entrada
        this.animateOpen();

        // Accessibility
        this.toggleButton.setAttribute('aria-expanded', 'true');
        this.overlay.setAttribute('aria-hidden', 'false');
    }

    close() {
        if (!this.isOpen) return;

        this.isOpen = false;
        
        // Remover clases
        this.toggleButton.classList.remove('active');
        this.overlay.classList.remove('active');
        document.body.classList.remove('menu-open');

        // Restaurar scroll
        document.body.style.overflow = '';

        // Restaurar focus
        if (this.trapFocus) {
            this.trapFocus.destroy();
            this.trapFocus = null;
        }

        // Accessibility
        this.toggleButton.setAttribute('aria-expanded', 'false');
        this.overlay.setAttribute('aria-hidden', 'true');
        this.toggleButton.focus();
    }

    animateOpen() {
        // Animar items del menú con stagger
        this.menuLinks.forEach((link, index) => {
            link.style.transform = 'translateY(30px)';
            link.style.opacity = '0';
            
            setTimeout(() => {
                link.style.transition = 'all 0.3s ease';
                link.style.transform = 'translateY(0)';
                link.style.opacity = '1';
            }, index * 50);
        });
    }

    createFocusTrap() {
        const focusableElements = this.overlay.querySelectorAll(
            'a[href], button, textarea, input[type="text"], input[type="radio"], input[type="checkbox"], select'
        );
        
        const firstElement = focusableElements[0];
        const lastElement = focusableElements[focusableElements.length - 1];

        const trapFocus = (e) => {
            if (e.key === 'Tab') {
                if (e.shiftKey) {
                    if (document.activeElement === firstElement) {
                        lastElement.focus();
                        e.preventDefault();
                    }
                } else {
                    if (document.activeElement === lastElement) {
                        firstElement.focus();
                        e.preventDefault();
                    }
                }
            }
        };

        document.addEventListener('keydown', trapFocus);

        // Focus inicial
        if (firstElement) {
            firstElement.focus();
        }

        return {
            destroy: () => {
                document.removeEventListener('keydown', trapFocus);
            }
        };
    }

    setupAccessibility() {
        if (this.toggleButton) {
            this.toggleButton.setAttribute('aria-label', 'Abrir menú de navegación');
            this.toggleButton.setAttribute('aria-expanded', 'false');
            this.toggleButton.setAttribute('aria-controls', 'mobile-menu-overlay');
        }

        if (this.overlay) {
            this.overlay.setAttribute('aria-hidden', 'true');
            this.overlay.setAttribute('role', 'dialog');
            this.overlay.setAttribute('aria-modal', 'true');
            this.overlay.setAttribute('aria-label', 'Menú de navegación móvil');
        }
    }

    destroy() {
        if (this.isOpen) {
            this.close();
        }
        
        if (this.trapFocus) {
            this.trapFocus.destroy();
        }
    }
}