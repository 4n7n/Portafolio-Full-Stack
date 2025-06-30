import { ICONS_DATA, getIcon, createIconElement } from '../data/icons-data.js';
import { TECHNOLOGIES_CONFIG } from '../config/technologies-config.js';

/**
 * Clase optimizada para gestión dinámica de iconos con soporte completo para tecnologías
 */
export class IconHelper {
    constructor() {
        this.iconsData = ICONS_DATA || {};
        this.techConfig = TECHNOLOGIES_CONFIG || { stack: {} };
        this.isInitialized = false;
        
        // Configuración de tamaños uniformes
        this.sizes = {
            tech: {
                desktop: 28,
                tablet: 24,
                mobile: 20,
                timeline: 18,
                project: 18
            },
            social: {
                hero: 20,
                contact: 16,
                floating: 24
            },
            ui: {
                button: 16,
                hero_button: 18,
                small: 14
            }
        };

        // Lista completa de tecnologías con configuración uniforme
        this.techStack = {
            frontend: [
                'html5', 'css', 'javascript', 'react', 'reactrouter', 
                'sass', 'chartdotjs', 'bootstrap', 'webpack', 'babel', 'd3'
            ],
            backend: [
                'nodedotjs', 'express', 'npm', 'jsonwebtokens', 
                'bcrypt', 'nodemon', 'mongoose'
            ],
            databases: [
                'mongodb', 'mysql', 'sequelize', 'mongoose'
            ],
            devops: [
                'docker', 'git', 'github', 'vscode', 'jest', 'postman', 
                'swagger', 'heroku', 'firebase', 'jenkins', 'kubernetes', 
                'figma', 'netlify'
            ]
        };
    }

    /**
     * Crear icono social con enlace y tamaño uniforme
     */
    createSocialIcon(platform, url, context = 'hero') {
        if (!platform || !url) return null;
        
        const iconData = getIcon('social', platform);
        if (!iconData) return null;

        const size = this.sizes.social[context] || this.sizes.social.hero;
        const containerSize = size + 16; // Padding incluido

        const link = document.createElement('a');
        link.href = url;
        link.target = '_blank';
        link.rel = 'noopener noreferrer';
        link.className = `social-link ${platform}-link`;
        link.setAttribute('data-platform', platform);
        
        link.style.cssText = `
            width: ${containerSize}px; 
            height: ${containerSize}px; 
            display: inline-flex; 
            align-items: center; 
            justify-content: center;
            border-radius: 50%;
            background: rgba(42, 42, 42, 0.6);
            border: 1px solid rgba(220, 38, 38, 0.2);
            transition: all 0.3s ease;
            text-decoration: none;
            padding: 8px;
        `;

        const iconElement = document.createElement('img');
        iconElement.src = `./assets/images/icons/social/${platform}.svg`;
        iconElement.alt = platform;
        iconElement.style.cssText = `
            width: ${size}px !important;
            height: ${size}px !important;
            max-width: ${size}px !important;
            max-height: ${size}px !important;
            object-fit: contain;
            filter: brightness(0.8);
            transition: filter 0.3s ease;
        `;

        link.appendChild(iconElement);
        link.title = `Visitar ${platform}`;

        // Hover effects
        link.addEventListener('mouseenter', () => {
            link.style.transform = 'translateY(-2px) scale(1.05)';
            link.style.background = 'var(--gradient-red, linear-gradient(135deg, #dc2626, #ef4444))';
            link.style.borderColor = 'var(--red-medium, #ef4444)';
            link.style.boxShadow = '0 6px 20px rgba(220, 38, 38, 0.3)';
            iconElement.style.filter = 'brightness(1.2)';
        });

        link.addEventListener('mouseleave', () => {
            link.style.transform = 'none';
            link.style.background = 'rgba(42, 42, 42, 0.6)';
            link.style.borderColor = 'rgba(220, 38, 38, 0.2)';
            link.style.boxShadow = 'none';
            iconElement.style.filter = 'brightness(0.8)';
        });

        return link;
    }

    /**
     * Crear icono de tecnología con tamaño uniforme y tooltip
     */
    createTechIcon(techName, context = 'desktop', showTooltip = true) {
        if (!techName) return null;
        
        const normalizedTechName = techName.toLowerCase().replace(/[^a-z0-9]/g, '');
        const size = this.sizes.tech[context] || this.sizes.tech.desktop;
        
        // Buscar la categoría de la tecnología
        let category = null;
        let techPath = null;
        
        for (const [cat, techs] of Object.entries(this.techStack)) {
            if (techs.includes(normalizedTechName)) {
                category = cat;
                break;
            }
        }

        if (!category) {
            console.warn(`Tecnología ${techName} no encontrada en el stack`);
            return null;
        }

        // Determinar la ruta del archivo
        if (category === 'devops') {
            // Para devops, algunos van en tools/ y otros en devops/
            const devopsIcons = ['docker', 'firebase', 'heroku', 'jenkins', 'kubernetes'];
            const toolsIcons = ['git', 'github', 'vscode', 'jest', 'postman', 'swagger', 'figma', 'netlify'];
            
            if (devopsIcons.includes(normalizedTechName)) {
                techPath = `./assets/images/technologies/devops/${normalizedTechName}.svg`;
            } else if (toolsIcons.includes(normalizedTechName)) {
                techPath = `./assets/images/technologies/tools/${normalizedTechName}.svg`;
            } else {
                techPath = `./assets/images/technologies/devops/${normalizedTechName}.svg`;
            }
        } else {
            techPath = `./assets/images/technologies/${category}/${normalizedTechName}.svg`;
        }

        const container = document.createElement('div');
        container.className = `tech-item ${normalizedTechName}-tech`;
        container.setAttribute('data-tech', techName);
        container.setAttribute('data-category', category);
        
        container.style.cssText = `
            display: flex;
            flex-direction: column;
            align-items: center;
            gap: 6px;
            padding: 0.8rem;
            background: rgba(42, 42, 42, 0.4);
            border-radius: 10px;
            transition: all 0.3s ease;
            border: 1px solid rgba(220, 38, 38, 0.1);
            text-align: center;
            min-height: 80px;
            justify-content: center;
        `;

        const iconElement = document.createElement('img');
        iconElement.src = techPath;
        iconElement.alt = techName;
        iconElement.style.cssText = `
            width: ${size}px !important;
            height: ${size}px !important;
            max-width: ${size}px !important;
            max-height: ${size}px !important;
            object-fit: contain;
            transition: transform 0.3s ease;
            flex-shrink: 0;
        `;

        const label = document.createElement('span');
        label.textContent = techName;
        label.style.cssText = `
            font-size: 11px;
            color: var(--gray-light, #e5e5e5);
            font-weight: 500;
            line-height: 1.2;
        `;

        container.appendChild(iconElement);
        container.appendChild(label);

        if (showTooltip) {
            container.title = `${techName} - Tecnología ${category}`;
        }

        // Hover effects
        container.addEventListener('mouseenter', () => {
            container.style.transform = 'translateY(-2px)';
            container.style.background = 'rgba(42, 42, 42, 0.7)';
            container.style.borderColor = 'var(--red-medium, #ef4444)';
            container.style.boxShadow = '0 4px 15px rgba(220, 38, 38, 0.2)';
            iconElement.style.transform = 'scale(1.1)';
        });

        container.addEventListener('mouseleave', () => {
            container.style.transform = 'none';
            container.style.background = 'rgba(42, 42, 42, 0.4)';
            container.style.borderColor = 'rgba(220, 38, 38, 0.1)';
            container.style.boxShadow = 'none';
            iconElement.style.transform = 'none';
        });

        return container;
    }

    /**
     * Crear icono de contacto con tamaño uniforme
     */
    createContactIcon(type, value, context = 'contact') {
        if (!type) return null;
        
        const size = this.sizes.social[context] || 18;
        const iconPath = `./assets/images/icons/contact/${type}.svg`;

        const container = document.createElement('div');
        container.className = `contact-item ${type}-contact`;
        container.setAttribute('data-contact-type', type);
        
        container.style.cssText = `
            display: flex;
            align-items: center;
            gap: 10px;
            padding: 0.75rem;
            background: rgba(42, 42, 42, 0.3);
            border-radius: 8px;
            transition: background 0.3s ease;
        `;

        const iconElement = document.createElement('img');
        iconElement.src = iconPath;
        iconElement.alt = type;
        iconElement.style.cssText = `
            width: ${size}px !important;
            height: ${size}px !important;
            max-width: ${size}px !important;
            max-height: ${size}px !important;
            object-fit: contain;
            opacity: 0.8;
            flex-shrink: 0;
        `;

        container.appendChild(iconElement);
        
        if (value) {
            const valueSpan = document.createElement('span');
            valueSpan.textContent = value;
            valueSpan.className = 'contact-value';
            container.appendChild(valueSpan);
            container.title = value;
        }

        // Hover effect
        container.addEventListener('mouseenter', () => {
            container.style.background = 'rgba(42, 42, 42, 0.5)';
        });

        container.addEventListener('mouseleave', () => {
            container.style.background = 'rgba(42, 42, 42, 0.3)';
        });

        return container;
    }

    /**
     * Crear botón con icono y tamaño uniforme
     */
    createIconButton(iconCategory, iconName, text = '', onClick = null, context = 'button') {
        if (!iconCategory || !iconName) return null;
        
        const size = this.sizes.ui[context] || this.sizes.ui.button;
        const iconPath = `./assets/images/icons/${iconCategory}/${iconName}.svg`;

        const button = document.createElement('button');
        button.className = text ? 'btn btn-icon' : 'btn-icon-only';
        button.type = 'button';
        
        const iconElement = document.createElement('img');
        iconElement.src = iconPath;
        iconElement.alt = iconName;
        iconElement.className = 'btn-icon';
        iconElement.style.cssText = `
            width: ${size}px !important;
            height: ${size}px !important;
            max-width: ${size}px !important;
            max-height: ${size}px !important;
            object-fit: contain;
            margin-right: ${text ? '6px' : '0'};
            opacity: 0.9;
            flex-shrink: 0;
            transition: all 0.3s ease;
        `;

        button.appendChild(iconElement);
        
        if (text) {
            const textSpan = document.createElement('span');
            textSpan.textContent = text;
            button.appendChild(textSpan);
        }

        if (typeof onClick === 'function') {
            button.addEventListener('click', onClick);
        }

        // Hover effect
        button.addEventListener('mouseenter', () => {
            iconElement.style.opacity = '1';
            iconElement.style.transform = 'translateX(1px)';
        });

        button.addEventListener('mouseleave', () => {
            iconElement.style.opacity = '0.9';
            iconElement.style.transform = 'none';
        });

        return button;
    }

    /**
     * Renderizar grid de tecnologías por categoría con tamaños uniformes
     */
    renderTechGrid(containerSelector, category = null) {
        const container = document.querySelector(containerSelector);
        if (!container) return false;

        // Limpiar contenido existente
        container.innerHTML = '';

        const technologies = category 
            ? this.techStack[category] || []
            : Object.values(this.techStack).flat();

        if (technologies.length === 0) return false;

        const grid = document.createElement('div');
        grid.className = 'tech-grid';
        grid.style.cssText = `
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(90px, 1fr));
            gap: 1rem;
            padding: 1rem 0;
        `;

        technologies.forEach(techName => {
            const techElement = this.createTechIcon(techName, 'desktop', true);
            if (techElement) {
                grid.appendChild(techElement);
            }
        });

        container.appendChild(grid);
        return true;
    }

    /**
     * Renderizar iconos sociales con tamaños uniformes
     */
    renderSocialIcons(containerSelector, socialLinks) {
        const container = document.querySelector(containerSelector);
        if (!container || !Array.isArray(socialLinks)) return false;

        const socialGrid = document.createElement('div');
        socialGrid.className = 'hero-social';
        socialGrid.style.cssText = `
            display: flex;
            gap: 0.75rem;
            align-items: center;
            margin: 1.5rem 0;
        `;

        socialLinks.forEach(link => {
            if (!link || !link.platform || !link.url) return;
            
            const socialIcon = this.createSocialIcon(link.platform, link.url, 'hero');
            if (socialIcon) {
                socialGrid.appendChild(socialIcon);
            }
        });

        if (socialGrid.children.length > 0) {
            container.innerHTML = '';
            container.appendChild(socialGrid);
            return true;
        }
        
        return false;
    }

    /**
     * Crear badges de tecnología para proyectos
     */
    createProjectTechBadges(technologies) {
        if (!Array.isArray(technologies)) return null;

        const badgesContainer = document.createElement('div');
        badgesContainer.className = 'project-technologies';
        badgesContainer.style.cssText = `
            display: flex;
            gap: 8px;
            margin-top: 1rem;
            justify-content: center;
            flex-wrap: wrap;
            align-items: center;
        `;

        technologies.forEach(techName => {
            const techIcon = this.createTechIcon(techName, 'project', false);
            if (techIcon) {
                // Simplificar para proyecto - solo icono
                const simpleIcon = techIcon.querySelector('img').cloneNode(true);
                simpleIcon.style.cssText = `
                    width: 18px !important;
                    height: 18px !important;
                    max-width: 18px !important;
                    max-height: 18px !important;
                    object-fit: contain;
                    opacity: 0.8;
                    transition: all 0.3s ease;
                    flex-shrink: 0;
                `;
                simpleIcon.title = techName;
                
                simpleIcon.addEventListener('mouseenter', () => {
                    simpleIcon.style.opacity = '1';
                    simpleIcon.style.transform = 'scale(1.1)';
                });

                simpleIcon.addEventListener('mouseleave', () => {
                    simpleIcon.style.opacity = '0.8';
                    simpleIcon.style.transform = 'none';
                });

                badgesContainer.appendChild(simpleIcon);
            }
        });

        return badgesContainer;
    }

    /**
     * Obtener tamaño responsivo basado en viewport
     */
    getResponsiveSize(context) {
        const width = window.innerWidth;
        
        if (width <= 480) {
            return this.sizes.tech.mobile;
        } else if (width <= 768) {
            return this.sizes.tech.tablet;
        } else {
            return this.sizes.tech.desktop;
        }
    }

    /**
     * Actualizar tamaños en responsive
     */
    updateResponsiveSizes() {
        const techIcons = document.querySelectorAll('.tech-item img');
        const newSize = this.getResponsiveSize('desktop');

        techIcons.forEach(icon => {
            icon.style.width = `${newSize}px !important`;
            icon.style.height = `${newSize}px !important`;
            icon.style.maxWidth = `${newSize}px !important`;
            icon.style.maxHeight = `${newSize}px !important`;
        });
    }

    /**
     * Inicializar todos los iconos del portfolio
     */
    initPortfolioIcons() {
        if (this.isInitialized) return;

        try {
            // Iconos sociales actualizados
            const socialData = [
                { platform: 'github', url: 'https://github.com/4n7n' },
                { platform: 'linkedin', url: 'https://www.linkedin.com/in/anthony-bonilla-paredes-b31090333/' },
                { platform: 'gmail', url: 'mailto:anthonybonillaparedes7@gmail.com' }
            ];

            // Renderizar si existe el contenedor
            const socialContainer = document.querySelector('.hero-social');
            if (socialContainer) {
                this.renderSocialIcons('.hero-social', socialData);
            }

            // Renderizar grids de tecnologías por categoría
            this.renderTechGrid('.frontend-tech-grid', 'frontend');
            this.renderTechGrid('.backend-tech-grid', 'backend');
            this.renderTechGrid('.databases-tech-grid', 'databases');
            this.renderTechGrid('.devops-tech-grid', 'devops');

            // Listener para responsive
            window.addEventListener('resize', () => {
                this.updateResponsiveSizes();
            });

            this.isInitialized = true;
            console.log('✅ Portfolio icons initialized with uniform sizes');
            
        } catch (error) {
            console.warn('⚠️ Error inicializando iconos:', error);
        }
    }

    /**
     * Crear indicadores de timeline con iconos uniformes
     */
    createTimelineMarker(iconName, category = 'technologies') {
        const marker = document.createElement('div');
        marker.className = 'timeline-marker';
        marker.style.cssText = `
            width: 44px;
            height: 44px;
            background: var(--gradient-red, linear-gradient(135deg, #dc2626, #ef4444));
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            position: absolute;
            left: -22px;
            border: 3px solid var(--bg-primary, #1a1a1a);
            padding: 8px;
        `;

        const iconPath = category === 'institutions' 
            ? `./assets/images/institutions/${iconName}.svg`
            : `./assets/images/technologies/frontend/${iconName}.svg`;

        const iconElement = document.createElement('img');
        iconElement.src = iconPath;
        iconElement.alt = iconName;
        iconElement.style.cssText = `
            width: 20px !important;
            height: 20px !important;
            max-width: 20px !important;
            max-height: 20px !important;
            object-fit: contain;
            filter: brightness(1.2);
            flex-shrink: 0;
        `;

        marker.appendChild(iconElement);
        return marker;
    }

    /**
     * Limpiar recursos
     */
    cleanup() {
        const floating = document.querySelector('.floating-icons');
        if (floating) floating.remove();
        
        window.removeEventListener('resize', this.updateResponsiveSizes);
        this.isInitialized = false;
    }

    /**
     * Obtener estadísticas del stack tecnológico
     */
    getTechStats() {
        const stats = {};
        Object.keys(this.techStack).forEach(category => {
            stats[category] = this.techStack[category].length;
        });
        stats.total = Object.values(this.techStack).flat().length;
        return stats;
    }
}

// Instancia global optimizada
export const iconHelper = new IconHelper();

// Funciones de utilidad con validación mejorada
export function createIcon(category, name, size = 24, className = '') {
    if (!category || !name) {
        console.warn('createIcon: category and name are required');
        return null;
    }
    return iconHelper.createIconButton(category, name, '', null, 'button');
}

export function getTechIcon(techName, context = 'desktop') {
    if (!techName) {
        console.warn('getTechIcon: techName is required');
        return null;
    }
    return iconHelper.createTechIcon(techName, context);
}

export function getSocialIcon(platform, url) {
    if (!platform || !url) {
        console.warn('getSocialIcon: platform and url are required');
        return null;
    }
    return iconHelper.createSocialIcon(platform, url);
}

// Auto-inicialización optimizada
if (typeof document !== 'undefined') {
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => {
            setTimeout(() => iconHelper.initPortfolioIcons(), 100);
        });
    } else {
        setTimeout(() => iconHelper.initPortfolioIcons(), 100);
    }
}

// Exportar por defecto
export default IconHelper;