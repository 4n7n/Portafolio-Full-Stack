// Solo importar las dependencias que realmente existen
let PORTFOLIO_CONFIG = null;
let SKILLS_DATA = null;
let DOMHelpers = null;

// ===== IMPORTACIONES NUEVAS DE ICONOS =====
let ICONS_DATA = null;
let TECHNOLOGIES_CONFIG = null;
let iconHelper = null;

// Importaciones dinámicas con manejo de errores
try {
    const configModule = await import('./config/portfolio-config.js').catch(() => null);
    PORTFOLIO_CONFIG = configModule?.PORTFOLIO_CONFIG || null;
} catch (error) {
    console.log('📝 portfolio-config.js no disponible, usando datos por defecto');
}

try {
    const skillsModule = await import('./data/skills.js').catch(() => null);
    SKILLS_DATA = skillsModule?.SKILLS_DATA || null;
} catch (error) {
    console.log('📝 skills.js no disponible, usando datos integrados');
}

try {
    const helpersModule = await import('./utils/dom-helpers.js').catch(() => null);
    DOMHelpers = helpersModule?.DOMHelpers || null;
} catch (error) {
    console.log('📝 dom-helpers.js no disponible, usando funciones nativas');
}

// Importar datos de iconos
try {
    const iconsModule = await import('./data/icons-data.js').catch(() => null);
    ICONS_DATA = iconsModule?.ICONS_DATA || null;
} catch (error) {
    console.log('📝 icons-data.js no disponible');
}

// Importar configuración de tecnologías  
try {
    const techModule = await import('./config/technologies-config.js').catch(() => null);
    TECHNOLOGIES_CONFIG = techModule?.TECHNOLOGIES_CONFIG || null;
} catch (error) {
    console.log('📝 technologies-config.js no disponible');
}

// Importar helper de iconos
try {
    const helperModule = await import('./components/icon-helper.js').catch(() => null);
    iconHelper = helperModule?.iconHelper || null;
} catch (error) {
    console.log('📝 icon-helper.js no disponible');
}

// DATOS DE FALLBACK integrados
const DEFAULT_CONFIG = {
    personal: {
        name: "Anthony Bonilla Paredes",
        title: "Desarrollador Web Full Stack",
        email: "anthonybonillaparedes7@gmail.com",
        phone: "+34 624 42 56 67"
    },
    seo: {
        description: "Anthony Bonilla Paredes - Desarrollador Full Stack especializado en MERN Stack. Graduado de The Bridge con 480h de formación intensiva."
    }
};

/**
 * Clase principal del Portfolio
 */
class PortfolioApp {
    constructor() {
        this.components = {};
        this.isInitialized = false;
        this.config = PORTFOLIO_CONFIG || DEFAULT_CONFIG;
        this.init();
    }

    async init() {
        try {
            console.log('🚀 Inicializando Portfolio de Anthony Bonilla Paredes...');
            
            // Esperar DOM listo
            await this.waitForDOM();
            
            // Actualizar información personal
            this.updatePersonalInfo();
            
            // Inicializar componentes principales
            await this.initializeComponents();
            
            // Configurar eventos globales
            this.setupGlobalEvents();
            
            // Inicializar animaciones
            this.initializeAnimations();
            
            this.isInitialized = true;
            console.log('✅ Portfolio inicializado correctamente');
            
        } catch (error) {
            console.error('❌ Error al inicializar portfolio:', error);
        }
    }

    /**
     * Esperar a que el DOM esté listo
     */
    waitForDOM() {
        return new Promise((resolve) => {
            if (document.readyState === 'loading') {
                document.addEventListener('DOMContentLoaded', resolve);
            } else {
                resolve();
            }
        });
    }

    /**
     * Actualizar información personal en la página
     */
    updatePersonalInfo() {
        const { personal } = this.config;
        
        // Actualizar título de la página
        document.title = `${personal.name} - ${personal.title}`;
        
        // Actualizar meta descripción
        const metaDesc = document.querySelector('meta[name="description"]');
        if (metaDesc && this.config.seo) {
            metaDesc.content = this.config.seo.description;
        }

        // Actualizar nombre en el hero
        const heroName = document.querySelector('.hero-name');
        if (heroName) {
            heroName.textContent = personal.name.toUpperCase();
        }

        // Actualizar email y teléfono en contacto
        const emailElements = document.querySelectorAll('[data-email], .font-code');
        emailElements.forEach(el => {
            if (el.textContent.includes('@') || el.textContent.includes('email')) {
                el.textContent = personal.email;
                if (el.tagName === 'A' || el.closest('a')) {
                    const link = el.tagName === 'A' ? el : el.closest('a');
                    link.href = `mailto:${personal.email}`;
                }
            }
        });

        const phoneElements = document.querySelectorAll('.font-code');
        phoneElements.forEach(el => {
            if (el.textContent.includes('+34') || el.textContent.includes('624')) {
                el.textContent = personal.phone;
            }
        });

        console.log('✅ Información personal actualizada');
    }

    /**
     * Inicializar componentes principales - VERSIÓN CORREGIDA CON ICONOS
     */
    async initializeComponents() {
        console.log('🧩 Inicializando componentes...');

        // 1. SkillsChart - Con manejo robusto de errores
        await this.initializeSkillsChart();

        // 2. ThemeSwitcher
        await this.initializeThemeSwitcher();

        // 3. ContactForm
        await this.initializeContactForm();

        // 4. ScrollAnimations
        await this.initializeScrollAnimations();

        // 5. Icons Helper - Inicializar iconos del portfolio
        try {
            if (iconHelper) {
                iconHelper.initPortfolioIcons();
                console.log('✅ Icons Helper inicializado');
            } else {
                // Fallback: crear iconos sociales básicos
                this.createBasicSocialIcons();
            }
        } catch (error) {
            console.warn('⚠️ Error al inicializar Icons Helper:', error);
            this.createBasicSocialIcons();
        }
    }

    /**
     * Inicializar SkillsChart con fallback completo
     */
    async initializeSkillsChart() {
        try {
            // Buscar contenedor del chart
            const skillsContainer = document.querySelector('#skillsChart') || 
                                   document.querySelector('.skills-chart-wrapper canvas') ||
                                   document.querySelector('#skills canvas');
            
            if (skillsContainer) {
                try {
                    // Importar dinámicamente SkillsChart
                    const { SkillsChart } = await import('./components/skills-chart.js');
                    
                    if (SkillsChart) {
                        this.components.skillsChart = new SkillsChart('#skillsChart');
                        console.log('✅ SkillsChart inicializado correctamente');
                        return;
                    }
                } catch (importError) {
                    console.warn('⚠️ No se pudo importar SkillsChart:', importError.message);
                }
                
                // Fallback: Crear visualización simple
                this.createSkillsChartFallback();
                
            } else {
                console.log('📝 Canvas para SkillsChart no encontrado, creando contenedor');
                this.createSkillsSection();
            }
            
        } catch (error) {
            console.warn('⚠️ Error al inicializar SkillsChart:', error);
            this.createSkillsChartFallback();
        }
    }

    /**
     * Crear fallback visual para skills
     */
    createSkillsChartFallback() {
        const skillsWrapper = document.querySelector('.skills-chart-wrapper') ||
                             document.querySelector('#skills .skills-container > div:last-child');
        
        if (skillsWrapper) {
            skillsWrapper.innerHTML = `
                <div class="skills-chart-fallback">
                    <div class="chart-header">
                        <h3>🎓 Stack MERN - The Bridge Bootcamp</h3>
                        <p>480 horas de formación intensiva</p>
                    </div>
                    
                    <div class="skills-grid">
                        <div class="skill-card" data-level="advanced">
                            <div class="skill-icon" style="background: #F7DF1E20;">
                                <div style="width: 20px; height: 20px; background: #F7DF1E; border-radius: 50%;"></div>
                            </div>
                            <h5 class="skill-name">JavaScript ES6+</h5>
                            <div class="skill-progress-circle">
                                <svg width="60" height="60">
                                    <circle cx="30" cy="30" r="25" stroke="#e0e0e0" stroke-width="4" fill="transparent"/>
                                    <circle cx="30" cy="30" r="25" stroke="#F7DF1E" stroke-width="4" fill="transparent"
                                            stroke-dasharray="157" stroke-dashoffset="${157 - (88 / 100) * 157}" class="progress-stroke"/>
                                </svg>
                                <span class="skill-percentage">88%</span>
                            </div>
                            <span class="skill-experience">6 meses</span>
                        </div>
                        
                        <div class="skill-card" data-level="advanced">
                            <div class="skill-icon" style="background: #61DAFB20;">
                                <div style="width: 20px; height: 20px; background: #61DAFB; border-radius: 50%;"></div>
                            </div>
                            <h5 class="skill-name">React</h5>
                            <div class="skill-progress-circle">
                                <svg width="60" height="60">
                                    <circle cx="30" cy="30" r="25" stroke="#e0e0e0" stroke-width="4" fill="transparent"/>
                                    <circle cx="30" cy="30" r="25" stroke="#61DAFB" stroke-width="4" fill="transparent"
                                            stroke-dasharray="157" stroke-dashoffset="${157 - (85 / 100) * 157}" class="progress-stroke"/>
                                </svg>
                                <span class="skill-percentage">85%</span>
                            </div>
                            <span class="skill-experience">5 meses</span>
                        </div>
                        
                        <div class="skill-card" data-level="advanced">
                            <div class="skill-icon" style="background: #33993320;">
                                <div style="width: 20px; height: 20px; background: #339933; border-radius: 50%;"></div>
                            </div>
                            <h5 class="skill-name">Node.js</h5>
                            <div class="skill-progress-circle">
                                <svg width="60" height="60">
                                    <circle cx="30" cy="30" r="25" stroke="#e0e0e0" stroke-width="4" fill="transparent"/>
                                    <circle cx="30" cy="30" r="25" stroke="#339933" stroke-width="4" fill="transparent"
                                            stroke-dasharray="157" stroke-dashoffset="${157 - (82 / 100) * 157}" class="progress-stroke"/>
                                </svg>
                                <span class="skill-percentage">82%</span>
                            </div>
                            <span class="skill-experience">5 meses</span>
                        </div>
                        
                        <div class="skill-card" data-level="intermediate">
                            <div class="skill-icon" style="background: #47A24820;">
                                <div style="width: 20px; height: 20px; background: #47A248; border-radius: 50%;"></div>
                            </div>
                            <h5 class="skill-name">MongoDB</h5>
                            <div class="skill-progress-circle">
                                <svg width="60" height="60">
                                    <circle cx="30" cy="30" r="25" stroke="#e0e0e0" stroke-width="4" fill="transparent"/>
                                    <circle cx="30" cy="30" r="25" stroke="#47A248" stroke-width="4" fill="transparent"
                                            stroke-dasharray="157" stroke-dashoffset="${157 - (78 / 100) * 157}" class="progress-stroke"/>
                                </svg>
                                <span class="skill-percentage">78%</span>
                            </div>
                            <span class="skill-experience">4 meses</span>
                        </div>
                    </div>
                    
                    <div class="chart-stats">
                        <div class="stat-item">
                            <span class="stat-number">480</span>
                            <span class="stat-label">Horas Bootcamp</span>
                        </div>
                        <div class="stat-item">
                            <span class="stat-number">25+</span>
                            <span class="stat-label">Tecnologías</span>
                        </div>
                        <div class="stat-item">
                            <span class="stat-number">96%</span>
                            <span class="stat-label">Empleabilidad</span>
                        </div>
                        <div class="stat-item">
                            <span class="stat-number">MERN</span>
                            <span class="stat-label">Stack</span>
                        </div>
                    </div>
                </div>
            `;
            
            // Animar los círculos de progreso
            setTimeout(() => {
                const circles = skillsWrapper.querySelectorAll('.progress-stroke');
                circles.forEach((circle, index) => {
                    setTimeout(() => {
                        circle.style.transition = 'stroke-dashoffset 1.5s ease-out';
                    }, index * 200);
                });
            }, 500);
            
            console.log('📊 Fallback visual de SkillsChart creado');
        }
    }

    /**
     * Crear sección de skills si no existe
     */
    createSkillsSection() {
        const skillsSection = document.querySelector('#skills');
        if (skillsSection && !skillsSection.querySelector('.skills-chart-wrapper')) {
            const container = skillsSection.querySelector('.container') || 
                             skillsSection.querySelector('.skills-container');
            
            if (container) {
                container.insertAdjacentHTML('beforeend', `
                    <div class="skills-chart-wrapper">
                        <canvas id="skillsChart" width="400" height="400"></canvas>
                    </div>
                `);
                
                // Intentar inicializar de nuevo
                this.initializeSkillsChart();
            }
        }
    }

    /**
     * Crear iconos sociales básicos si el helper falla
     */
    createBasicSocialIcons() {
        // Buscar contenedor para iconos sociales en contacto
        const contactInfo = document.querySelector('.contact-info');
        if (contactInfo) {
            const socialContainer = document.createElement('div');
            socialContainer.className = 'social-icons-basic';
            socialContainer.style.cssText = `
                display: flex;
                gap: 1rem;
                margin-top: 1.5rem;
                align-items: center;
            `;
            
            const socialLinks = [
                { name: 'GitHub', url: 'https://github.com/anthony-bonilla', emoji: '💻' },
                { name: 'LinkedIn', url: 'https://linkedin.com/in/anthony-bonilla-paredes', emoji: '💼' },
                { name: 'Email', url: 'mailto:anthonybonillaparedes7@gmail.com', emoji: '📧' }
            ];
            
            socialLinks.forEach(social => {
                const link = document.createElement('a');
                link.href = social.url;
                link.target = '_blank';
                link.rel = 'noopener noreferrer';
                link.style.cssText = `
                    width: 40px;
                    height: 40px;
                    background: var(--gradient-red, linear-gradient(135deg, #dc2626, #ef4444));
                    border-radius: 50%;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    text-decoration: none;
                    font-size: 18px;
                    transition: all 0.3s ease;
                    box-shadow: 0 4px 15px rgba(220, 38, 38, 0.3);
                `;
                link.innerHTML = social.emoji;
                link.title = social.name;
                
                link.addEventListener('mouseenter', () => {
                    link.style.transform = 'translateY(-3px) scale(1.1)';
                    link.style.boxShadow = '0 8px 25px rgba(220, 38, 38, 0.5)';
                });
                
                link.addEventListener('mouseleave', () => {
                    link.style.transform = 'translateY(0) scale(1)';
                    link.style.boxShadow = '0 4px 15px rgba(220, 38, 38, 0.3)';
                });
                
                socialContainer.appendChild(link);
            });
            
            contactInfo.appendChild(socialContainer);
            console.log('📱 Iconos sociales básicos creados');
        }
    }

    /**
     * Inicializar ThemeSwitcher
     */
    async initializeThemeSwitcher() {
        try {
            let themeButton = document.querySelector('#themeToggle') || 
                             document.querySelector('[data-theme-toggle]') ||
                             document.querySelector('.theme-toggle');
            
            if (!themeButton) {
                themeButton = this.createThemeToggle();
            }

            if (themeButton) {
                try {
                    const { ThemeSwitcher } = await import('./components/theme-switcher.js');
                    this.components.themeSwitcher = new ThemeSwitcher();
                    console.log('✅ ThemeSwitcher inicializado');
                } catch (importError) {
                    console.log('📝 ThemeSwitcher no disponible, usando funcionalidad básica');
                    this.setupBasicThemeToggle(themeButton);
                }
            }
        } catch (error) {
            console.warn('⚠️ Error al inicializar ThemeSwitcher:', error);
        }
    }

    /**
     * Configurar toggle básico de tema
     */
    setupBasicThemeToggle(button) {
        // Cargar tema guardado
        const savedTheme = localStorage.getItem('portfolio-theme') || 'dark';
        document.documentElement.setAttribute('data-theme', savedTheme);
        button.innerHTML = savedTheme === 'dark' ? '🌙' : '☀️';
        
        button.addEventListener('click', () => {
            const currentTheme = document.documentElement.getAttribute('data-theme');
            const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
            document.documentElement.setAttribute('data-theme', newTheme);
            button.innerHTML = newTheme === 'dark' ? '🌙' : '☀️';
            localStorage.setItem('portfolio-theme', newTheme);
        });
    }

    /**
     * Inicializar ContactForm
     */
    async initializeContactForm() {
        try {
            const contactForm = document.querySelector('#contactForm');
            if (contactForm) {
                try {
                    const { ContactForm } = await import('./components/contact-form.js');
                    this.components.contactForm = new ContactForm('#contactForm');
                    console.log('✅ ContactForm inicializado');
                } catch (importError) {
                    console.log('📝 ContactForm no disponible, usando funcionalidad básica');
                    this.setupBasicContactForm(contactForm);
                }
            }
        } catch (error) {
            console.warn('⚠️ Error al inicializar ContactForm:', error);
        }
    }

    /**
     * Configurar formulario básico
     */
    setupBasicContactForm(form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // Validación básica
            const name = form.querySelector('#name')?.value.trim();
            const email = form.querySelector('#email')?.value.trim();
            const message = form.querySelector('#message')?.value.trim();
            
            if (!name || !email || !message) {
                alert('Por favor, completa todos los campos obligatorios.');
                return;
            }
            
            // Simular envío
            const submitBtn = form.querySelector('button[type="submit"]');
            const originalText = submitBtn.textContent;
            
            submitBtn.textContent = 'Enviando...';
            submitBtn.disabled = true;
            
            setTimeout(() => {
                alert('¡Mensaje enviado! Te contactaré pronto.');
                form.reset();
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
            }, 2000);
        });
    }

    /**
     * Inicializar ScrollAnimations
     */
    async initializeScrollAnimations() {
        try {
            try {
                const { ScrollAnimations } = await import('./components/scroll-animations.js');
                this.components.scrollAnimations = new ScrollAnimations();
                console.log('✅ ScrollAnimations inicializado');
            } catch (importError) {
                console.log('📝 ScrollAnimations no disponible, usando animaciones básicas');
                this.setupBasicAnimations();
            }
        } catch (error) {
            console.warn('⚠️ Error al inicializar ScrollAnimations:', error);
        }
    }

    /**
     * Configurar animaciones básicas
     */
    setupBasicAnimations() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        }, { threshold: 0.1 });

        document.querySelectorAll('.section-title, .section-subtitle, .project-card, .skill-item').forEach(el => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(30px)';
            el.style.transition = 'all 0.6s ease-out';
            observer.observe(el);
        });
    }

    /**
     * Crear botón de tema simple
     */
    createThemeToggle() {
        const button = document.createElement('button');
        button.id = 'themeToggle';
        button.className = 'theme-toggle';
        button.innerHTML = '🌙';
        button.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: var(--red-intense, #dc2626);
            color: white;
            border: none;
            border-radius: 50%;
            width: 50px;
            height: 50px;
            cursor: pointer;
            font-size: 20px;
            z-index: 1000;
            transition: all 0.3s ease;
            box-shadow: 0 4px 15px rgba(220, 38, 38, 0.3);
        `;

        button.addEventListener('mouseenter', () => {
            button.style.transform = 'scale(1.1)';
            button.style.boxShadow = '0 8px 25px rgba(220, 38, 38, 0.5)';
        });

        button.addEventListener('mouseleave', () => {
            button.style.transform = 'scale(1)';
            button.style.boxShadow = '0 4px 15px rgba(220, 38, 38, 0.3)';
        });

        document.body.appendChild(button);
        return button;
    }

    /**
     * Configurar eventos globales
     */
    setupGlobalEvents() {
        // Navegación suave
        const navLinks = document.querySelectorAll('a[href^="#"]');
        navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const target = document.querySelector(link.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({ behavior: 'smooth' });
                }
            });
        });

        // Animación de contadores
        this.animateCounters();

        // Progress bar de scroll
        this.setupScrollProgress();

        console.log('✅ Eventos globales configurados');
    }

    /**
     * Animar contadores de estadísticas
     */
    animateCounters() {
        const counters = document.querySelectorAll('[data-count]');
        
        const observerOptions = {
            threshold: 0.5,
            rootMargin: '0px 0px -100px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const counter = entry.target;
                    const target = parseInt(counter.getAttribute('data-count'));
                    
                    this.animateNumber(counter, 0, target, 2000);
                    observer.unobserve(counter);
                }
            });
        }, observerOptions);

        counters.forEach(counter => observer.observe(counter));
    }

    /**
     * Animar número individualmente
     */
    animateNumber(element, start, end, duration) {
        const startTime = performance.now();
        
        const updateNumber = (currentTime) => {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            
            // Easing function
            const easeOut = 1 - Math.pow(1 - progress, 3);
            const current = Math.floor(start + (end - start) * easeOut);
            
            element.textContent = current + (element.textContent.includes('+') ? '+' : '');
            
            if (progress < 1) {
                requestAnimationFrame(updateNumber);
            }
        };
        
        requestAnimationFrame(updateNumber);
    }

    /**
     * Configurar barra de progreso de scroll
     */
    setupScrollProgress() {
        const progressBar = document.querySelector('.scroll-progress');
        if (!progressBar) return;

        window.addEventListener('scroll', () => {
            const windowHeight = document.documentElement.scrollHeight - window.innerHeight;
            const scrolled = window.scrollY;
            const progress = (scrolled / windowHeight) * 100;
            
            progressBar.style.width = `${Math.min(progress, 100)}%`;
        });
    }

    /**
     * Inicializar animaciones básicas
     */
    initializeAnimations() {
        // Fade in elements cuando entran en vista
        const elementsToAnimate = document.querySelectorAll(
            '.section-title, .section-subtitle, .project-card, .timeline-item, .skill-item'
        );

        const fadeObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                    fadeObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1 });

        elementsToAnimate.forEach(el => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(30px)';
            el.style.transition = 'all 0.6s ease-out';
            fadeObserver.observe(el);
        });

        // Animar barras de habilidades
        this.animateSkillBars();

        console.log('✅ Animaciones básicas inicializadas');
    }

    /**
     * Animar barras de habilidades
     */
    animateSkillBars() {
        const skillBars = document.querySelectorAll('.skill-progress');
        
        const skillObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const bar = entry.target;
                    const width = bar.style.width;
                    
                    bar.style.width = '0%';
                    bar.style.transition = 'width 1.5s ease-out';
                    
                    setTimeout(() => {
                        bar.style.width = width;
                    }, 100);
                    
                    skillObserver.unobserve(bar);
                }
            });
        }, { threshold: 0.5 });

        skillBars.forEach(bar => skillObserver.observe(bar));
    }

    /**
     * Métodos públicos
     */
    getComponent(name) {
        return this.components[name] || null;
    }

    isReady() {
        return this.isInitialized;
    }

    // Actualizar datos del bootcamp dinámicamente
    updateBootcampInfo() {
        // Actualizar estadísticas con datos reales del bootcamp
        const stats = document.querySelectorAll('.hero-stat-number, .stat-number');
        stats.forEach(stat => {
            const countAttr = stat.getAttribute('data-count');
            if (countAttr === '20') {
                stat.setAttribute('data-count', '25'); // 25 tecnologías aprendidas
                stat.textContent = '25+';
            }
        });

        console.log('✅ Información del bootcamp actualizada');
    }
}

// Función de inicialización
function initPortfolioApp() {
    try {
        const app = new PortfolioApp();
        
        // Hacer disponible globalmente para debugging
        window.portfolioApp = app;
        
        // Actualizar info del bootcamp después de inicializar
        setTimeout(() => {
            app.updateBootcampInfo();
        }, 1000);
        
        return app;
        
    } catch (error) {
        console.error('❌ Error fatal al inicializar portfolio:', error);
        
        // Mostrar mensaje de error simple pero con estilo de tu tema
        document.body.innerHTML = `
            <div style="
                display: flex;
                align-items: center;
                justify-content: center;
                min-height: 100vh;
                text-align: center;
                font-family: Arial, sans-serif;
                background: #0a0a0a;
                color: white;
            ">
                <div style="
                    background: linear-gradient(135deg, #1a1a1a, #0a0a0a);
                    padding: 3rem;
                    border-radius: 20px;
                    box-shadow: 0 15px 35px rgba(0, 0, 0, 0.5);
                    border: 1px solid rgba(220, 38, 38, 0.3);
                ">
                    <h1 style="color: #dc2626; margin-bottom: 1rem;">⚠️ Error de Carga</h1>
                    <p style="margin-bottom: 2rem; color: #e5e5e5;">No se pudo cargar el portfolio de Anthony Bonilla.</p>
                    <button onclick="location.reload()" style="
                        background: linear-gradient(135deg, #dc2626, #ef4444);
                        color: white;
                        border: none;
                        padding: 1rem 2rem;
                        border-radius: 12px;
                        cursor: pointer;
                        font-weight: 600;
                        transition: all 0.3s ease;
                        box-shadow: 0 4px 15px rgba(220, 38, 38, 0.3);
                    " onmouseover="this.style.transform='scale(1.05)'" onmouseout="this.style.transform='scale(1)'">
                        🔄 Recargar Portfolio
                    </button>
                </div>
            </div>
        `;
        
        return null;
    }
}

// Inicializar aplicación
const portfolioApp = initPortfolioApp();

// Log de inicialización
console.log('🎯 Portfolio de Anthony Bonilla Paredes');
console.log('📚 Bootcamp: The Bridge Digital Talent Accelerator');
console.log('💻 Stack: MERN (MongoDB, Express, React, Node.js)');
console.log('⏱️ Duración: 480 horas');
console.log('🎓 Graduado: 07 de Febrero de 2025');
console.log('🚀 Inicialización robusta con fallbacks activada');
console.log('🎨 Sistema de iconos integrado');

// Exportar para módulos ES6
export default portfolioApp;