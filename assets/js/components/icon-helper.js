import { ICONS_DATA, getIcon, createIconElement } from '../data/icons-data.js';
import { TECHNOLOGIES_CONFIG } from '../config/technologies-config.js';

/**
 * Clase para gestión dinámica de iconos
 */
export class IconHelper {
    constructor() {
        this.iconsData = ICONS_DATA || {};
        this.techConfig = TECHNOLOGIES_CONFIG || { stack: {} };
        this.isInitialized = false;
    }

    /**
     * Crear icono social con enlace
     */
    createSocialIcon(platform, url, size = 40) {
        if (!platform || !url) return null;
        
        const iconData = getIcon('social', platform);
        if (!iconData) return null;

        const link = document.createElement('a');
        link.href = url;
        link.target = '_blank';
        link.rel = 'noopener noreferrer';
        link.className = `social-icon ${platform}`;
        link.style.cssText = `width: ${size}px; height: ${size}px; display: inline-flex; align-items: center; justify-content: center;`;
        link.innerHTML = iconData;
        link.title = `Visitar ${platform}`;

        return link;
    }

    /**
     * Crear icono de tecnología con tooltip
     */
    createTechIcon(techName, size = 60, showTooltip = true) {
        if (!techName) return null;
        
        const tech = this.techConfig.stack;
        let techData = null;

        // Buscar en todas las categorías
        try {
            Object.values(tech).forEach(category => {
                if (category && category.technologies) {
                    const found = category.technologies.find(t => 
                        t && t.name && t.name.toLowerCase() === techName.toLowerCase()
                    );
                    if (found) techData = found;
                }
            });
        } catch (error) {
            console.warn(`Error buscando tecnología ${techName}:`, error);
            return null;
        }

        if (!techData) return null;

        const container = document.createElement('div');
        container.className = `tech-icon ${techName.toLowerCase().replace(/[^a-z0-9]/g, '')}`;
        container.style.cssText = `width: ${size}px; height: ${size}px; position: relative;`;
        container.innerHTML = techData.icon || '';

        if (showTooltip && techData.name) {
            const tooltipText = `${techData.name}${techData.level ? ` - ${techData.level}%` : ''}${techData.experience ? ` - ${techData.experience}` : ''}`;
            container.title = tooltipText;
        }

        return container;
    }

    /**
     * Crear icono de contacto
     */
    createContactIcon(type, value, size = 50) {
        if (!type) return null;
        
        const iconData = getIcon('contact', type);
        if (!iconData) return null;

        const container = document.createElement('div');
        container.className = `contact-icon ${type}`;
        container.style.cssText = `width: ${size}px; height: ${size}px;`;
        container.innerHTML = iconData;
        if (value) container.title = value;

        return container;
    }

    /**
     * Crear botón con icono
     */
    createIconButton(iconCategory, iconName, text = '', onClick = null) {
        if (!iconCategory || !iconName) return null;
        
        const iconData = getIcon(iconCategory, iconName);
        if (!iconData) return null;

        const button = document.createElement('button');
        button.className = text ? 'btn btn-icon' : 'btn-icon-only';
        button.type = 'button';
        
        const iconSpan = document.createElement('span');
        iconSpan.className = 'icon';
        iconSpan.innerHTML = iconData;
        
        button.appendChild(iconSpan);
        
        if (text) {
            const textSpan = document.createElement('span');
            textSpan.textContent = text;
            button.appendChild(textSpan);
        }

        if (typeof onClick === 'function') {
            button.addEventListener('click', onClick);
        }

        return button;
    }

    /**
     * Renderizar grid de tecnologías
     */
    renderTechGrid(containerSelector, category = null) {
        const container = document.querySelector(containerSelector);
        if (!container) return false;

        const technologies = category 
            ? this.techConfig.stack[category]?.technologies || []
            : this.getAllTechnologies();

        if (technologies.length === 0) return false;

        const grid = document.createElement('div');
        grid.className = 'tech-grid';

        technologies.forEach(tech => {
            if (!tech || !tech.name) return;
            
            const techElement = this.createTechIcon(tech.name, 60, true);
            if (techElement) {
                const techCard = document.createElement('div');
                techCard.className = 'tech-card';
                
                techCard.appendChild(techElement);
                
                const techInfo = document.createElement('div');
                techInfo.className = 'tech-info';
                techInfo.innerHTML = `
                    <h4>${tech.name}</h4>
                    ${tech.level ? `<div class="tech-level">${tech.level}%</div>` : ''}
                    ${tech.experience ? `<div class="tech-experience">${tech.experience}</div>` : ''}
                `;
                
                techCard.appendChild(techInfo);
                grid.appendChild(techCard);
            }
        });

        container.appendChild(grid);
        return true;
    }

    /**
     * Renderizar iconos sociales
     */
    renderSocialIcons(containerSelector, socialLinks) {
        const container = document.querySelector(containerSelector);
        if (!container || !Array.isArray(socialLinks)) return false;

        const socialGrid = document.createElement('div');
        socialGrid.className = 'social-icons';

        socialLinks.forEach(link => {
            if (!link || !link.platform || !link.url) return;
            
            const socialIcon = this.createSocialIcon(link.platform, link.url, link.size || 40);
            if (socialIcon) {
                socialGrid.appendChild(socialIcon);
            }
        });

        if (socialGrid.children.length > 0) {
            container.appendChild(socialGrid);
            return true;
        }
        
        return false;
    }

    /**
     * Agregar iconos flotantes
     */
    addFloatingIcons(icons) {
        if (!Array.isArray(icons) || icons.length === 0) return;

        // Remover existentes
        const existing = document.querySelector('.floating-icons');
        if (existing) existing.remove();

        const container = document.createElement('div');
        container.className = 'floating-icons';
        container.style.cssText = `
            position: fixed;
            right: 20px;
            bottom: 20px;
            z-index: 1000;
            display: flex;
            flex-direction: column;
            gap: 10px;
        `;

        icons.forEach(iconConfig => {
            if (!iconConfig || !iconConfig.category || !iconConfig.name) return;
            
            const button = this.createIconButton(
                iconConfig.category, 
                iconConfig.name, 
                '', 
                iconConfig.onClick
            );
            
            if (button) {
                button.className = 'floating-icon';
                button.style.cssText = `
                    width: 50px;
                    height: 50px;
                    border-radius: 50%;
                    border: none;
                    background: var(--primary-color, #ef4444);
                    color: white;
                    cursor: pointer;
                    transition: transform 0.2s ease;
                `;
                if (iconConfig.title) button.title = iconConfig.title;
                container.appendChild(button);
            }
        });

        if (container.children.length > 0) {
            document.body.appendChild(container);
        }
    }

    /**
     * Obtener todas las tecnologías
     */
    getAllTechnologies() {
        const allTechs = [];
        
        try {
            Object.values(this.techConfig.stack).forEach(category => {
                if (category && category.technologies && Array.isArray(category.technologies)) {
                    allTechs.push(...category.technologies.filter(tech => tech && tech.name));
                }
            });
        } catch (error) {
            console.warn('Error obteniendo tecnologías:', error);
        }
        
        return allTechs.sort((a, b) => (b.level || 0) - (a.level || 0));
    }

    /**
     * Agregar animaciones a iconos
     */
    animateIcons(selector, animation = 'pulse') {
        const icons = document.querySelectorAll(selector);
        if (icons.length === 0) return;

        icons.forEach((icon, index) => {
            setTimeout(() => {
                icon.classList.add(`icon-${animation}`);
            }, index * 100);
        });
    }

    /**
     * Actualizar iconos dinámicamente
     */
    updateIconColors(theme = 'dark') {
        const icons = document.querySelectorAll('.icon svg, .social-icon svg, .tech-icon svg');
        const colorMap = {
            dark: { primary: '#ef4444', secondary: '#e5e5e5' },
            light: { primary: '#dc2626', secondary: '#333333' }
        };

        const colors = colorMap[theme] || colorMap.dark;

        icons.forEach(icon => {
            if (!icon.hasAttribute('data-preserve-color')) {
                icon.style.fill = colors.secondary;
            }
        });
    }

    /**
     * Crear indicador de nivel de skill
     */
    createSkillIndicator(level) {
        const numLevel = parseInt(level) || 0;
        const indicator = document.createElement('div');
        indicator.className = 'skill-level-indicator';
        
        const levelClass = numLevel >= 80 ? 'expert' : 
                          numLevel >= 60 ? 'advanced' : 
                          numLevel >= 40 ? 'intermediate' : 'beginner';
        
        indicator.classList.add(levelClass);
        
        const dotsCount = Math.ceil(numLevel / 20);
        const dots = Array.from({length: 5}, (_, i) => 
            `<div class="skill-dot ${i < dotsCount ? 'filled' : ''}"></div>`
        ).join('');
        
        indicator.innerHTML = `
            <div class="skill-dots">${dots}</div>
            <span class="skill-percentage">${numLevel}%</span>
        `;
        
        return indicator;
    }

    /**
     * Crear badge de tecnología
     */
    createTechBadge(techName, small = false) {
        if (!techName) return null;
        
        const tech = this.getAllTechnologies().find(t => 
            t && t.name && t.name.toLowerCase() === techName.toLowerCase()
        );
        
        if (!tech) return null;

        const badge = document.createElement('span');
        const className = tech.name.toLowerCase().replace(/[^a-z0-9]/g, '');
        badge.className = `tech-badge ${small ? 'small' : ''} ${className}`;
        
        const color = tech.color || '#6b7280';
        badge.style.cssText = `
            background: ${color}20;
            color: ${color};
            border: 1px solid ${color}40;
            padding: ${small ? '4px 8px' : '6px 12px'};
            border-radius: 12px;
            font-size: ${small ? '0.75rem' : '0.875rem'};
            display: inline-flex;
            align-items: center;
            gap: 4px;
        `;
        
        if (!small && tech.icon) {
            badge.innerHTML = `
                <span class="tech-badge-icon" style="width: 16px; height: 16px;">${tech.icon}</span>
                <span class="tech-badge-text">${tech.name}</span>
            `;
        } else {
            badge.textContent = tech.name;
        }
        
        return badge;
    }

    /**
     * Renderizar badges para un proyecto
     */
    renderProjectTechBadges(containerSelector, technologies) {
        const container = document.querySelector(containerSelector);
        if (!container || !Array.isArray(technologies)) return false;

        const badgesContainer = document.createElement('div');
        badgesContainer.className = 'tech-badges';
        badgesContainer.style.cssText = 'display: flex; flex-wrap: wrap; gap: 8px; margin-top: 12px;';

        technologies.forEach(techName => {
            const badge = this.createTechBadge(techName, true);
            if (badge) {
                badgesContainer.appendChild(badge);
            }
        });

        if (badgesContainer.children.length > 0) {
            container.appendChild(badgesContainer);
            return true;
        }
        
        return false;
    }

    /**
     * Inicializar todos los iconos del portfolio
     */
    initPortfolioIcons() {
        if (this.isInitialized) return;

        try {
            // Iconos sociales básicos
            const socialData = [
                { platform: 'github', url: 'https://github.com/anthony-bonilla', size: 40 },
                { platform: 'linkedin', url: 'https://linkedin.com/in/anthony-bonilla-paredes', size: 40 },
                { platform: 'email', url: 'mailto:anthonybonillaparedes7@gmail.com', size: 40 }
            ];

            this.renderSocialIcons('.social-icons-container', socialData);

            // Animar iconos después de un delay
            setTimeout(() => {
                this.animateIcons('.social-icon', 'bounce');
                this.animateIcons('.tech-icon', 'pulse');
            }, 1000);

            this.isInitialized = true;
            console.log('✅ Portfolio icons initialized');
            
        } catch (error) {
            console.warn('⚠️ Error inicializando iconos:', error);
        }
    }

    /**
     * Actualizar tema de iconos
     */
    updateTheme(theme = 'dark') {
        this.updateIconColors(theme);
        
        // Actualizar variables CSS
        const root = document.documentElement;
        if (theme === 'dark') {
            root.style.setProperty('--icon-color', '#e5e5e5');
            root.style.setProperty('--icon-hover-color', '#ef4444');
        } else {
            root.style.setProperty('--icon-color', '#333333');
            root.style.setProperty('--icon-hover-color', '#dc2626');
        }
    }

    /**
     * Limpiar iconos flotantes
     */
    cleanup() {
        const floating = document.querySelector('.floating-icons');
        if (floating) floating.remove();
        this.isInitialized = false;
    }
}

// Instancia global para usar en toda la aplicación
export const iconHelper = new IconHelper();

// Funciones de utilidad exportadas - con validación básica
export function createIcon(category, name, size = 24, className = '') {
    if (!category || !name) return null;
    return createIconElement(category, name, size, className);
}

export function getTechIcon(techName) {
    if (!techName) return null;
    return iconHelper.createTechIcon(techName);
}

export function getSocialIcon(platform, url) {
    if (!platform || !url) return null;
    return iconHelper.createSocialIcon(platform, url);
}

// Auto-inicialización cuando el DOM esté listo - con verificación
if (typeof document !== 'undefined') {
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => {
            iconHelper.initPortfolioIcons();
        });
    } else {
        // DOM ya está listo
        setTimeout(() => iconHelper.initPortfolioIcons(), 100);
    }
}

// Exportar por defecto
export default IconHelper;