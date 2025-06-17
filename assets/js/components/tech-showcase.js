// assets/js/components/tech-showcase.js
// Componente avanzado para mostrar todas las tecnologías con iconos reales

import { TECHNOLOGIES_CONFIG, getAllTechnologies, getTechnologiesByCategory } from '../config/technologies-config.js';
import { loadSVGIcon, createIconWithFallback } from '../data/icons-data.js';

export class TechShowcase {
    constructor(containerSelector) {
        this.container = document.querySelector(containerSelector);
        this.currentFilter = 'all';
        this.currentView = 'grid'; // grid, list, categories
        this.animationDelay = 100;
        
        if (this.container) {
            this.init();
        }
    }

    async init() {
        try {
            await this.render();
            this.setupEventListeners();
            this.setupAnimations();
            console.log('✅ TechShowcase inicializado');
        } catch (error) {
            console.error('❌ Error inicializando TechShowcase:', error);
        }
    }

    async render() {
        this.container.innerHTML = `
            <div class="tech-showcase">
                <div class="tech-showcase-header">
                    <h3>Stack Tecnológico Completo</h3>
                    <p>32 tecnologías dominadas en The Bridge (480h)</p>
                    
                    <div class="tech-controls">
                        <div class="tech-filters">
                            <button class="tech-filter active" data-filter="all">Todas (32)</button>
                            <button class="tech-filter" data-filter="frontend">Frontend (8)</button>
                            <button class="tech-filter" data-filter="backend">Backend (5)</button>
                            <button class="tech-filter" data-filter="database">Database (3)</button>
                            <button class="tech-filter" data-filter="devops">DevOps (3)</button>
                            <button class="tech-filter" data-filter="tools">Tools (7)</button>
                        </div>
                        
                        <div class="tech-views">
                            <button class="tech-view active" data-view="grid" title="Vista Grid">⊞</button>
                            <button class="tech-view" data-view="list" title="Vista Lista">☰</button>
                            <button class="tech-view" data-view="categories" title="Por Categorías">📂</button>
                        </div>
                    </div>
                </div>
                
                <div class="tech-showcase-content">
                    <div id="tech-grid-view" class="tech-view-content active">
                        ${await this.renderGridView()}
                    </div>
                    
                    <div id="tech-list-view" class="tech-view-content">
                        ${await this.renderListView()}
                    </div>
                    
                    <div id="tech-categories-view" class="tech-view-content">
                        ${await this.renderCategoriesView()}
                    </div>
                </div>
                
                <div class="tech-showcase-stats">
                    <div class="showcase-stat">
                        <span class="stat-number">${TECHNOLOGIES_CONFIG.stats.total_hours}</span>
                        <span class="stat-label">Horas Bootcamp</span>
                    </div>
                    <div class="showcase-stat">
                        <span class="stat-number">${TECHNOLOGIES_CONFIG.stats.technologies_learned}</span>
                        <span class="stat-label">Tecnologías</span>
                    </div>
                    <div class="showcase-stat">
                        <span class="stat-number">${TECHNOLOGIES_CONFIG.stats.advanced_skills}</span>
                        <span class="stat-label">Nivel Avanzado</span>
                    </div>
                    <div class="showcase-stat">
                        <span class="stat-number">${TECHNOLOGIES_CONFIG.stats.average_skill_level}%</span>
                        <span class="stat-label">Promedio</span>
                    </div>
                </div>
            </div>
        `;
    }

    async renderGridView() {
        const technologies = getAllTechnologies();
        let gridHTML = '<div class="tech-grid">';
        
        for (const tech of technologies) {
            const iconElement = await this.createTechIcon(tech);
            
            gridHTML += `
                <div class="tech-card" 
                     data-category="${tech.category}" 
                     data-level="${this.getSkillLevelClass(tech.level)}"
                     data-tech="${tech.name.toLowerCase()}">
                    <div class="tech-card-header">
                        <div class="tech-icon-container">
                            ${iconElement}
                        </div>
                        <div class="tech-level-badge ${this.getSkillLevelClass(tech.level)}">
                            ${tech.level}%
                        </div>
                    </div>
                    
                    <div class="tech-card-content">
                        <h4 class="tech-name">${tech.name}</h4>
                        <p class="tech-experience">${tech.experience}</p>
                        <p class="tech-description">${tech.description}</p>
                        
                        <div class="tech-skills">
                            ${tech.skills ? tech.skills.slice(0, 3).map(skill => 
                                `<span class="tech-skill-tag">${skill}</span>`
                            ).join('') : ''}
                        </div>
                        
                        <div class="tech-projects-count">
                            ${tech.projects ? tech.projects.length : 0} proyectos
                        </div>
                    </div>
                </div>
            `;
        }
        
        gridHTML += '</div>';
        return gridHTML;
    }

    async renderListView() {
        const technologies = getAllTechnologies();
        let listHTML = '<div class="tech-list">';
        
        for (const tech of technologies) {
            const iconElement = await this.createTechIcon(tech, 32);
            
            listHTML += `
                <div class="tech-list-item" 
                     data-category="${tech.category}" 
                     data-level="${this.getSkillLevelClass(tech.level)}">
                    <div class="tech-list-icon">
                        ${iconElement}
                    </div>
                    
                    <div class="tech-list-content">
                        <div class="tech-list-header">
                            <h4 class="tech-name">${tech.name}</h4>
                            <span class="tech-category-badge">${tech.category}</span>
                            <span class="tech-level-badge ${this.getSkillLevelClass(tech.level)}">${tech.level}%</span>
                        </div>
                        
                        <p class="tech-description">${tech.description}</p>
                        
                        <div class="tech-list-footer">
                            <span class="tech-experience">📅 ${tech.experience}</span>
                            <span class="tech-projects">📂 ${tech.projects ? tech.projects.length : 0} proyectos</span>
                        </div>
                    </div>
                </div>
            `;
        }
        
        listHTML += '</div>';
        return listHTML;
    }

    async renderCategoriesView() {
        const categories = Object.entries(TECHNOLOGIES_CONFIG.stack);
        let categoriesHTML = '<div class="tech-categories">';
        
        for (const [categoryId, category] of categories) {
            categoriesHTML += `
                <div class="tech-category-section" data-category="${categoryId}">
                    <div class="tech-category-header">
                        <div class="category-icon">${category.icon}</div>
                        <div class="category-info">
                            <h3 class="category-title">${category.title}</h3>
                            <p class="category-description">${category.description}</p>
                            <div class="category-stats">
                                <span>${category.technologies.length} tecnologías</span>
                                <span>Promedio: ${this.calculateCategoryAverage(category)}%</span>
                            </div>
                        </div>
                    </div>
                    
                    <div class="category-technologies">
                        ${await this.renderCategoryTechnologies(category.technologies)}
                    </div>
                </div>
            `;
        }
        
        categoriesHTML += '</div>';
        return categoriesHTML;
    }

    async renderCategoryTechnologies(technologies) {
        let techHTML = '';
        
        for (const tech of technologies) {
            const iconElement = await this.createTechIcon(tech, 40);
            
            techHTML += `
                <div class="category-tech-item" data-level="${this.getSkillLevelClass(tech.level)}">
                    <div class="category-tech-icon">
                        ${iconElement}
                    </div>
                    <div class="category-tech-info">
                        <h5 class="tech-name">${tech.name}</h5>
                        <div class="tech-level-bar">
                            <div class="tech-level-fill" style="width: ${tech.level}%; background: ${tech.color};"></div>
                        </div>
                        <span class="tech-level-text">${tech.level}% - ${tech.experience}</span>
                    </div>
                </div>
            `;
        }
        
        return techHTML;
    }

    async createTechIcon(tech, size = 48) {
        try {
            const iconContainer = document.createElement('div');
            iconContainer.className = 'tech-icon-wrapper';
            iconContainer.style.width = `${size}px`;
            iconContainer.style.height = `${size}px`;
            
            if (tech.icon) {
                const svgElement = await loadSVGIcon(tech.icon, size);
                if (svgElement) {
                    // Aplicar color de la tecnología al SVG
                    const svg = svgElement.querySelector('svg');
                    if (svg) {
                        svg.style.fill = tech.color;
                        svg.style.color = tech.color;
                    }
                    return svgElement.outerHTML;
                }
            }
            
            // Fallback con color de fondo
            return `
                <div class="tech-icon-fallback" style="
                    width: ${size}px; 
                    height: ${size}px; 
                    background: ${tech.color}20;
                    border: 2px solid ${tech.color}40;
                    border-radius: 8px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    font-weight: bold;
                    color: ${tech.color};
                    font-size: ${size * 0.3}px;
                ">
                    ${tech.name.substring(0, 2).toUpperCase()}
                </div>
            `;
        } catch (error) {
            console.warn('Error creando icono para', tech.name, error);
            return `<div style="width: ${size}px; height: ${size}px; background: ${tech.color}; border-radius: 4px;"></div>`;
        }
    }

    setupEventListeners() {
        // Filtros de categoría
        const filters = this.container.querySelectorAll('.tech-filter');
        filters.forEach(filter => {
            filter.addEventListener('click', () => {
                const category = filter.dataset.filter;
                this.filterTechnologies(category);
                
                filters.forEach(f => f.classList.remove('active'));
                filter.classList.add('active');
            });
        });

        // Cambio de vista
        const views = this.container.querySelectorAll('.tech-view');
        views.forEach(view => {
            view.addEventListener('click', () => {
                const viewType = view.dataset.view;
                this.changeView(viewType);
                
                views.forEach(v => v.classList.remove('active'));
                view.classList.add('active');
            });
        });

        // Hover en tech cards
        const techCards = this.container.querySelectorAll('.tech-card, .tech-list-item');
        techCards.forEach(card => {
            card.addEventListener('mouseenter', () => {
                card.style.transform = 'translateY(-5px) scale(1.02)';
                card.style.boxShadow = '0 10px 30px rgba(220, 38, 38, 0.2)';
            });
            
            card.addEventListener('mouseleave', () => {
                card.style.transform = 'translateY(0) scale(1)';
                card.style.boxShadow = '';
            });
        });
    }

    filterTechnologies(category) {
        this.currentFilter = category;
        const items = this.container.querySelectorAll('[data-category]');
        
        items.forEach(item => {
            if (category === 'all' || item.dataset.category === category) {
                item.style.display = 'block';
                item.style.opacity = '1';
            } else {
                item.style.display = 'none';
                item.style.opacity = '0';
            }
        });
    }

    changeView(viewType) {
        this.currentView = viewType;
        const viewContents = this.container.querySelectorAll('.tech-view-content');
        
        viewContents.forEach(content => content.classList.remove('active'));
        this.container.querySelector(`#tech-${viewType}-view`).classList.add('active');
    }

    setupAnimations() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const items = entry.target.querySelectorAll('.tech-card, .tech-list-item, .tech-category-section');
                    
                    items.forEach((item, index) => {
                        setTimeout(() => {
                            item.style.opacity = '1';
                            item.style.transform = 'translateY(0)';
                        }, index * this.animationDelay);
                    });
                    
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1 });

        observer.observe(this.container);
    }

    getSkillLevelClass(level) {
        if (level >= 85) return 'expert';
        if (level >= 75) return 'advanced';
        if (level >= 60) return 'intermediate';
        return 'beginner';
    }

    calculateCategoryAverage(category) {
        const total = category.technologies.reduce((sum, tech) => sum + tech.level, 0);
        return Math.round(total / category.technologies.length);
    }

    // Métodos públicos
    updateFilter(category) {
        this.filterTechnologies(category);
    }

    updateView(viewType) {
        this.changeView(viewType);
    }

    refreshData() {
        this.render();
    }
}

// Función para crear tech badges para proyectos
export function createTechBadges(technologies, containerSelector) {
    const container = document.querySelector(containerSelector);
    if (!container) return;

    container.innerHTML = '';
    
    technologies.forEach(async (techName) => {
        const tech = TECHNOLOGIES_CONFIG.stack;
        let techData = null;
        
        // Buscar tecnología en todas las categorías
        Object.values(tech).forEach(category => {
            const found = category.technologies.find(t => 
                t.name.toLowerCase().includes(techName.toLowerCase())
            );
            if (found) techData = found;
        });

        if (techData) {
            const badge = document.createElement('span');
            badge.className = 'tech-badge';
            badge.style.cssText = `
                display: inline-flex;
                align-items: center;
                gap: 0.5rem;
                padding: 0.25rem 0.75rem;
                background: ${techData.color}20;
                color: ${techData.color};
                border: 1px solid ${techData.color}40;
                border-radius: 20px;
                font-size: 0.8rem;
                font-weight: 500;
                margin: 0.25rem 0.25rem 0.25rem 0;
            `;

            try {
                const iconElement = await loadSVGIcon(techData.icon, 16);
                if (iconElement) {
                    badge.appendChild(iconElement);
                }
            } catch (error) {
                // Fallback sin icono
            }
            
            const text = document.createElement('span');
            text.textContent = techData.name;
            badge.appendChild(text);
            
            container.appendChild(badge);
        }
    });
}

// Exportar por defecto
export default TechShowcase;