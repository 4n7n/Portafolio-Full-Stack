import { ICONS_DATA, getIcon, createIconElement } from '../data/icons-data.js';
import { TECHNOLOGIES_CONFIG } from '../config/technologies-config.js';

/**
 * Clase para gestión dinámica de iconos
 */
export class IconHelper {
    constructor() {
        this.iconsData = ICONS_DATA;
        this.techConfig = TECHNOLOGIES_CONFIG;
    }

    /**
     * Crear icono social con enlace
     */
    createSocialIcon(platform, url, size = 40) {
        const iconData = getIcon('social', platform);
        if (!iconData) return null;

        const link = document.createElement('a');
        link.href = url;
        link.target = '_blank';
        link.rel = 'noopener noreferrer';
        link.className = `social-icon ${platform}`;
        link.style.width = `${size}px`;
        link.style.height = `${size}px`;
        link.innerHTML = iconData;
        link.title = `Visitar ${platform}`;

        return link;
    }

    /**
     * Crear icono de tecnología con tooltip
     */
    createTechIcon(techName, size = 60, showTooltip = true) {
        const tech = TECHNOLOGIES_CONFIG.stack;
        let techData = null;

        // Buscar en todas las categorías
        Object.values(tech).forEach(category => {
            const found = category.technologies.find(t => 
                t.name.toLowerCase() === techName.toLowerCase()
            );
            if (found) techData = found;
        });

        if (!techData) return null;

        const container = document.createElement('div');
        container.className = `tech-icon ${techName.toLowerCase().replace(/[^a-z0-9]/g, '')}`;
        container.style.width = `${size}px`;
        container.style.height = `${size}px`;
        container.innerHTML = techData.icon;

        if (showTooltip) {
            container.title = `${techData.name} - ${techData.level}% - ${techData.experience}`;
            
            // Tooltip personalizado
            const tooltip = document.createElement('div');
            tooltip.className = 'tech-tooltip';
            tooltip.innerHTML = `
                <strong>${techData.name}</strong><br>
                Nivel: ${techData.level}%<br>
                Experiencia: ${techData.experience}<br>
                <small>${techData.description}</small>
            `;
            container.appendChild(tooltip);
        }

        return container;
    }

    /**
     * Crear icono de contacto
     */
    createContactIcon(type, value, size = 50) {
        const iconData = getIcon('contact', type);
        if (!iconData) return null;

        const container = document.createElement('div');
        container.className = `contact-icon ${type}`;
        container.style.width = `${size}px`;
        container.style.height = `${size}px`;
        container.innerHTML = iconData;
        container.title = value;

        return container;
    }

    /**
     * Crear botón con icono
     */
    createIconButton(iconCategory, iconName, text = '', onClick = null) {
        const iconData = getIcon(iconCategory, iconName);
        if (!iconData) return null;

        const button = document.createElement('button');
        button.className = text ? 'btn btn-icon' : 'btn-icon-only';
        
        const iconSpan = document.createElement('span');
        iconSpan.className = 'icon';
        iconSpan.innerHTML = iconData;
        
        button.appendChild(iconSpan);
        
        if (text) {
            const textSpan = document.createElement('span');
            textSpan.textContent = text;
            button.appendChild(textSpan);
        }

        if (onClick) {
            button.addEventListener('click', onClick);
        }

        return button;
    }

    /**
     * Renderizar grid de tecnologías
     */
    renderTechGrid(containerSelector, category = null) {
        const container = document.querySelector(containerSelector);
        if (!container) return;

        const technologies = category 
            ? TECHNOLOGIES_CONFIG.stack[category]?.technologies || []
            : this.getAllTechnologies();

        const grid = document.createElement('div');
        grid.className = 'tech-grid';

        technologies.forEach(tech => {
            const techElement = this.createTechIcon(tech.name, 60, true);
            if (techElement) {
                // Agregar información adicional
                const techCard = document.createElement('div');
                techCard.className = 'tech-card';
                
                techCard.appendChild(techElement);
                
                const techInfo = document.createElement('div');
                techInfo.className = 'tech-info';
                techInfo.innerHTML = `
                    <h4>${tech.name}</h4>
                    <div class="tech-level">${tech.level}%</div>
                    <div class="tech-experience">${tech.experience}</div>
                `;
                
                techCard.appendChild(techInfo);
                grid.appendChild(techCard);
            }
        });

        container.appendChild(grid);
    }

    /**
     * Renderizar iconos sociales
     */
    renderSocialIcons(containerSelector, socialLinks) {
        const container = document.querySelector(containerSelector);
        if (!container) return;

        const socialGrid = document.createElement('div');
        socialGrid.className = 'social-icons';

        socialLinks.forEach(link => {
            const socialIcon = this.createSocialIcon(link.platform, link.url, link.size);
            if (socialIcon) {
                socialGrid.appendChild(socialIcon);
            }
        });

        container.appendChild(socialGrid);
    }

    /**
     * Agregar iconos flotantes
     */
    addFloatingIcons(icons) {
        const existing = document.querySelector('.floating-icons');
        if (existing) existing.remove();

        const container = document.createElement('div');
        container.className = 'floating-icons';

        icons.forEach(iconConfig => {
            const button = this.createIconButton(
                iconConfig.category, 
                iconConfig.name, 
                '', 
                iconConfig.onClick
            );
            
            if (button) {
                button.className = 'floating-icon';
                button.title = iconConfig.title;
                container.appendChild(button);
            }
        });

        document.body.appendChild(container);
    }

    /**
     * Obtener todas las tecnologías
     */
    getAllTechnologies() {
        const allTechs = [];
        Object.values(TECHNOLOGIES_CONFIG.stack).forEach(category => {
            allTechs.push(...category.technologies);
        });
        return allTechs.sort((a, b) => b.level - a.level);
    }

    /**
     * Agregar animaciones a iconos
     */
    animateIcons(selector, animation = 'pulse') {
        const icons = document.querySelectorAll(selector);
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
        const icons = document.querySelectorAll('.icon svg');
        const colorMap = {
            dark: {
                primary: '#ef4444',
                secondary: '#e5e5e5'
            },
            light: {
                primary: '#dc2626',
                secondary: '#333333'
            }
        };

        icons.forEach(icon => {
            if (!icon.hasAttribute('data-preserve-color')) {
                icon.style.fill = colorMap[theme].secondary;
            }
        });
    }

    /**
     * Crear indicador de nivel de skill
     */
    createSkillIndicator(level) {
        const indicator = document.createElement('div');
        indicator.className = 'skill-level-indicator';
        
        const levelClass = level >= 80 ? 'expert' : 
                          level >= 60 ? 'advanced' : 
                          level >= 40 ? 'intermediate' : 'beginner';
        
        indicator.classList.add(levelClass);
        indicator.innerHTML = `
            <div class="skill-dots">
                ${Array.from({length: 5}, (_, i) => 
                    `<div class="skill-dot ${i < Math.ceil(level/20) ? 'filled' : ''}"></div>`
                ).join('')}
            </div>
            <span class="skill-percentage">${level}%</span>
        `;
        
        return indicator;
    }

    /**
     * Crear badge de tecnología
     */
    createTechBadge(techName, small = false) {
        const tech = this.getAllTechnologies().find(t => 
            t.name.toLowerCase() === techName.toLowerCase()
        );
        
        if (!tech) return null;

        const badge = document.createElement('span');
        badge.className = `tech-badge ${small ? 'small' : ''} ${tech.name.toLowerCase().replace(/[^a-z0-9]/g, '')}`;
        badge.style.background = `${tech.color}20`;
        badge.style.color = tech.color;
        badge.style.border = `1px solid ${tech.color}40`;
        
        if (!small) {
            badge.innerHTML = `
                <span class="tech-badge-icon">${tech.icon}</span>
                <span class="tech-badge-text">${tech.name}</span>
            `;
        } else {
            badge.innerHTML = tech.name;
        }
        
        return badge;
    }

    /**
     * Renderizar badges para un proyecto
     */
    renderProjectTechBadges(containerSelector, technologies) {
        const container = document.querySelector(containerSelector);
        if (!container) return;

        const badgesContainer = document.createElement('div');
        badgesContainer.className = 'tech-badges';

        technologies.forEach(techName => {
            const badge = this.createTechBadge(techName, true);
            if (badge) {
                badgesContainer.appendChild(badge);
            }
        });

        container.appendChild(badgesContainer);
    }

    /**
     * Crear tooltip interactivo
     */
    createTooltip(element, content, position = 'top') {
        const tooltip = document.createElement('div');
        tooltip.className = `tooltip tooltip-${position}`;
        tooltip.innerHTML = content;
        tooltip.style.opacity = '0';
        tooltip.style.pointerEvents = 'none';
        
        element.style.position = 'relative';
        element.appendChild(tooltip);

        element.addEventListener('mouseenter', () => {
            tooltip.style.opacity = '1';
        });

        element.addEventListener('mouseleave', () => {
            tooltip.style.opacity = '0';
        });

        return tooltip;
    }

    /**
     * Inicializar todos los iconos del portfolio
     */
    initPortfolioIcons() {
        // Iconos sociales
        const socialData = [
            { platform: 'github', url: 'https://github.com/anthony-bonilla', size: 40 },
            { platform: 'linkedin', url: 'https://linkedin.com/in/anthony-bonilla-paredes', size: 40 },
            { platform: 'instagram', url: 'https://instagram.com/anthony_bonilla', size: 40 },
            { platform: 'email', url: 'mailto:anthonybonillaparedes7@gmail.com', size: 40 }
        ];

        this.renderSocialIcons('.social-icons-container', socialData);

        // Iconos flotantes
        const floatingIcons = [
            {
                category: 'ui',
                name: 'arrow_down',
                title: 'Scroll hacia abajo',
                onClick: () => window.scrollTo({ top: window.innerHeight, behavior: 'smooth' })
            }
        ];

        this.addFloatingIcons(floatingIcons);

        // Animar iconos al cargar
        setTimeout(() => {
            this.animateIcons('.social-icon', 'bounce');
            this.animateIcons('.tech-icon', 'pulse');
        }, 1000);

        console.log('✅ Portfolio icons initialized');
    }

    /**
     * Actualizar tema de iconos
     */
    updateTheme(theme) {
        this.updateIconColors(theme);
        
        // Actualizar variables CSS si es necesario
        const root = document.documentElement;
        if (theme === 'dark') {
            root.style.setProperty('--icon-color', '#e5e5e5');
            root.style.setProperty('--icon-hover-color', '#ef4444');
        } else {
            root.style.setProperty('--icon-color', '#333333');
            root.style.setProperty('--icon-hover-color', '#dc2626');
        }
    }
}

// Instancia global para usar en toda la aplicación
export const iconHelper = new IconHelper();

// Funciones de utilidad exportadas
export function createIcon(category, name, size = 24, className = '') {
    return createIconElement(category, name, size, className);
}

export function getTechIcon(techName) {
    return iconHelper.createTechIcon(techName);
}

export function getSocialIcon(platform, url) {
    return iconHelper.createSocialIcon(platform, url);
}

// Auto-inicialización cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', () => {
    iconHelper.initPortfolioIcons();
});

// Exportar por defecto
export default IconHelper;