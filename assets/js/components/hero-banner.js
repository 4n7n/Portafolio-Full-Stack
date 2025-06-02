import TypingEffect from './typing-effect.js';

class HeroBanner {
    constructor() {
        this.hero = document.querySelector('.hero');
        if (!this.hero) return;
        
        this.init();
    }
    
    init() {
        // Initialize typing effect
        this.initTypingEffect();
        
        // Initialize particles if available
        this.initParticles();
        
        // Smooth scroll to next section
        this.initScrollIndicator();
        
        // Parallax effect on scroll
        this.initParallax();
        
        // Initialize counter animation for about stats
        this.initCounters();
    }
    
    initTypingEffect() {
        const typingElement = document.getElementById('typing-text');
        if (!typingElement) return;
        
        // Get strings from config or use defaults
        const strings = window.portfolioConfig?.hero?.typingStrings || [
            'Full Stack Developer',
            'Frontend Specialist',
            'Backend Engineer',
            'UI/UX Enthusiast'
        ];
        
        this.typingEffect = new TypingEffect('typing-text', {
            strings: strings,
            typeSpeed: 80,
            deleteSpeed: 50,
            pauseTime: 2000
        });
    }
    
    initParticles() {
        // Check if particles.js is available
        if (typeof particlesJS === 'undefined') return;
        
        const particlesElement = document.getElementById('particles-js');
        if (!particlesElement) return;
        
        particlesJS('particles-js', {
            particles: {
                number: {
                    value: 80,
                    density: {
                        enable: true,
                        value_area: 800
                    }
                },
                color: {
                    value: '#2563eb'
                },
                shape: {
                    type: 'circle'
                },
                opacity: {
                    value: 0.5,
                    random: false
                },
                size: {
                    value: 3,
                    random: true
                },
                line_linked: {
                    enable: true,
                    distance: 150,
                    color: '#2563eb',
                    opacity: 0.2,
                    width: 1
                },
                move: {
                    enable: true,
                    speed: 2,
                    direction: 'none',
                    random: false,
                    straight: false,
                    out_mode: 'out',
                    bounce: false
                }
            },
            interactivity: {
                detect_on: 'canvas',
                events: {
                    onhover: {
                        enable: true,
                        mode: 'grab'
                    },
                    onclick: {
                        enable: true,
                        mode: 'push'
                    },
                    resize: true
                },
                modes: {
                    grab: {
                        distance: 140,
                        line_linked: {
                            opacity: 0.5
                        }
                    },
                    push: {
                        particles_nb: 4
                    }
                }
            },
            retina_detect: true
        });
    }
    
    initScrollIndicator() {
        const scrollIndicator = this.hero.querySelector('.hero__scroll');
        if (!scrollIndicator) return;
        
        scrollIndicator.addEventListener('click', (e) => {
            e.preventDefault();
            const aboutSection = document.getElementById('about');
            if (aboutSection) {
                aboutSection.scrollIntoView({ 
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    }
    
    initParallax() {
        let ticking = false;
        
        const updateParallax = () => {
            const scrolled = window.pageYOffset;
            const heroHeight = this.hero.offsetHeight;
            
            if (scrolled < heroHeight) {
                const speed = 0.5;
                const yPos = -(scrolled * speed);
                
                const heroContent = this.hero.querySelector('.hero__content');
                const heroImage = this.hero.querySelector('.hero__image');
                
                if (heroContent) {
                    heroContent.style.transform = `translateY(${yPos * 0.8}px)`;
                    heroContent.style.opacity = 1 - (scrolled / heroHeight * 0.8);
                }
                
                if (heroImage) {
                    heroImage.style.transform = `translateY(${yPos * 0.6}px)`;
                }
            }
            
            ticking = false;
        };
        
        const requestTick = () => {
            if (!ticking) {
                window.requestAnimationFrame(updateParallax);
                ticking = true;
            }
        };
        
        // Only enable parallax on desktop
        if (window.matchMedia('(min-width: 768px)').matches) {
            window.addEventListener('scroll', requestTick);
        }
    }
    
    initCounters() {
        const counters = document.querySelectorAll('.about__stat-number');
        if (!counters.length) return;
        
        const animateCounter = (counter) => {
            const target = parseInt(counter.getAttribute('data-count'));
            const duration = 2000; // 2 seconds
            const increment = target / (duration / 16); // 60fps
            let current = 0;
            
            const updateCounter = () => {
                current += increment;
                if (current < target) {
                    counter.textContent = Math.floor(current);
                    requestAnimationFrame(updateCounter);
                } else {
                    counter.textContent = target;
                }
            };
            
            updateCounter();
        };
        
        // Use Intersection Observer to trigger animation
        const observerOptions = {
            threshold: 0.5,
            rootMargin: '0px'
        };
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && !entry.target.classList.contains('counted')) {
                    entry.target.classList.add('counted');
                    animateCounter(entry.target);
                }
            });
        }, observerOptions);
        
        counters.forEach(counter => observer.observe(counter));
    }
}

// Export for use
export default HeroBanner;