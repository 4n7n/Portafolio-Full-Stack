import { ScrollUtils } from './scroll-navbar.js';

export class ScrollNavbar {
    constructor(navbarElement) {
        this.navbar = navbarElement;
        this.lastScrollY = 0;
        this.scrollThreshold = 100;
        this.isScrolling = false;
        this.ticking = false;
        
        // Estados
        this.isHidden = false;
        this.isScrolled = false;
    }

    init() {
        this.bindScrollEvents();
        this.setInitialState();
    }

    bindScrollEvents() {
        // Throttled scroll event
        window.addEventListener('scroll', this.handleScroll.bind(this), { passive: true });
        
        // Resize event
        window.addEventListener('resize', this.handleResize.bind(this));
    }

    handleScroll() {
        if (!this.ticking) {
            requestAnimationFrame(() => {
                this.updateNavbar();
                this.ticking = false;
            });
            this.ticking = true;
        }
    }

    updateNavbar() {
        const currentScrollY = window.pageYOffset;
        const scrollingDown = currentScrollY > this.lastScrollY;
        const scrollDistance = Math.abs(currentScrollY - this.lastScrollY);

        // Añadir clase 'scrolled' después del threshold
        if (currentScrollY > 50 && !this.isScrolled) {
            this.navbar.classList.add('scrolled');
            this.isScrolled = true;
        } else if (currentScrollY <= 50 && this.isScrolled) {
            this.navbar.classList.remove('scrolled');
            this.isScrolled = false;
        }

        // Hide/Show navbar basado en dirección de scroll
        if (scrollDistance > 10) {
            if (scrollingDown && currentScrollY > this.scrollThreshold && !this.isHidden) {
                this.hideNavbar();
            } else if (!scrollingDown && this.isHidden) {
                this.showNavbar();
            }
        }

        this.lastScrollY = currentScrollY;
    }

    hideNavbar() {
        this.navbar.classList.add('hidden');
        this.isHidden = true;
        
        // Evento personalizado
        window.dispatchEvent(new CustomEvent('navbarHidden'));
    }

    showNavbar() {
        this.navbar.classList.remove('hidden');
        this.isHidden = false;
        
        // Evento personalizado
        window.dispatchEvent(new CustomEvent('navbarShown'));
    }

    handleResize() {
        // Resetear estado en resize
        this.setInitialState();
    }

    setInitialState() {
        const currentScrollY = window.pageYOffset;
        
        if (currentScrollY > 50) {
            this.navbar.classList.add('scrolled');
            this.isScrolled = true;
        }
        
        this.lastScrollY = currentScrollY;
    }

    // Métodos públicos
    forceShow() {
        this.showNavbar();
    }

    forceHide() {
        this.hideNavbar();
    }

    destroy() {
        window.removeEventListener('scroll', this.handleScroll);
        window.removeEventListener('resize', this.handleResize);
    }
}