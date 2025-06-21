/**
 * TechShowcase - Componente para mostrar tecnologías con iconos
 * Versión corregida y optimizada
 */

import { TECHNOLOGIES_CONFIG, getAllTechnologies, getTechnologiesByCategory } from '../config/technologies-config.js';
import { loadSVGIcon, createIconWithFallback } from '../data/icons-data.js';

export class TechShowcase {
    constructor(containerSelector) {
        this.container = document.querySelector(containerSelector);
        this.currentFilter = 'all';
        this.currentView = 'grid'; // grid, list, categories
        this.animationDelay = 100;
        this.isInitialized = false;
        this.observers = [];
        this.animationFrames = [];
        this.cachedIcons = new Map();
        this.resizeObserver = null;
        
        if (!this.container) {
            console.error('❌ TechShowcase: Container no encontrado:', containerSelector);
            return;
        }

        this.init();
    }

    async init() {
        if (this.isInitialized) return;

        try {
            // Verificar dependencias
            if (!this.checkDependencies()) {
                throw new Error('Dependencias requeridas no están disponibles');
            }

            await this.render();
            this.setupEventListeners();
            this.setupAnimations();
            this.setupResizeObserver();
            this.isInitialized = true;
            console.log('✅ TechShowcase inicializado correctamente');
        } catch (error) {
            console.error('❌ Error inicializando TechShowcase:', error);
            this.renderFallback();
        }
    }

    checkDependencies() {
        if (typeof TECHNOLOGIES_CONFIG === 'undefined') {
            console.error('TECHNOLOGIES_CONFIG no está definido');
            return false;
        }
        if (typeof getAllTechnologies !== 'function') {
            console.error('getAllTechnologies no está disponible');
            return false;
        }
        return true;
    }

    setupResizeObserver() {
        if (typeof ResizeObserver === 'undefined') return;

        this.resizeObserver = new ResizeObserver((entries) => {
            this.handleResize();
        });

        this.resizeObserver.observe(this.container);
    }

    handleResize() {
        // Debounce resize handling
        if (this.resizeTimeout) {
            clearTimeout(this.resizeTimeout);
        }
        
        this.resizeTimeout = setTimeout(() => {
            this.adjustLayoutForViewport();
        }, 250);
    }

    adjustLayoutForViewport() {
        const width = this.container.offsetWidth;
        const techCards = this.container.querySelectorAll('.tech-card');
        
        // Ajustar grid en base al ancho disponible
        if (width < 768) {
            techCards.forEach(card => {
                card.style.minWidth = '100%';
            });
        } else if (width < 1024) {
            techCards.forEach(card => {
                card.style.minWidth = 'calc(50% - 1rem)';
            });
        } else {
            techCards.forEach(card => {
                card.style.minWidth = 'calc(33.333% - 1rem)';
            });
        }
    }

    async render() {
        if (!this.container) return;

        try {
            const stats = this.getValidStats();
            
            this.container.innerHTML = `
                <div class="tech-showcase">
                    <div class="tech-showcase-header">
                        <h3>Stack Tecnológico Completo</h3>
                        <p>${stats.technologies} tecnologías dominadas en The Bridge (${stats.hours}h)</p>
                        
                        <div class="tech-controls">
                            <div class="tech-filters">
                                ${this.renderFilters()}
                            </div>
                            
                            <div class="tech-views">
                                <button class="tech-view active" data-view="grid" title="Vista Grid" type="button">⊞</button>
                                <button class="tech-view" data-view="list" title="Vista Lista" type="button">☰</button>
                                <button class="tech-view" data-view="categories" title="Por Categorías" type="button">📂</button>
                            </div>
                        </div>
                    </div>
                    
                    <div class="tech-showcase-content">
                        <div id="tech-grid-view" class="tech-view-content active">
                            ${await this.renderGridView()}
                        </div>
                        
                        <div id="tech-list-view" class="tech-view-content" style="display: none;">
                            ${await this.renderListView()}
                        </div>
                        
                        <div id="tech-categories-view" class="tech-view-content" style="display: none;">
                            ${await this.renderCategoriesView()}
                        </div>
                    </div>
                    
                    <div class="tech-showcase-stats">
                        ${this.renderStats(stats)}
                    </div>
                </div>
            `;
        } catch (error) {
            console.error('Error en render:', error);
            this.renderFallback();
        }
    }

    renderFallback() {
        if (!this.container) return;
        
        this.container.innerHTML = `
            <div class="tech-showcase-fallback">
                <h3>Stack Tecnológico</h3>
                <p>⚠️ Error al cargar los datos de tecnologías</p>
                <button onclick="location.reload()" type="button">🔄 Reintentar</button>
            </div>
        `;
    }

    getValidStats() {
        try {
            const config = TECHNOLOGIES_CONFIG || {};
            const stats = config.stats || {};
            
            return {
                hours: stats.total_hours || 480,
                technologies: stats.technologies_learned || 32,
                advanced: stats.advanced_skills || 12,
                average: stats.average_skill_level || 80
            };
        } catch (error) {
            console.warn('Error obteniendo stats, usando valores por defecto:', error);
            return {
                hours: 480,
                technologies: 32,
                advanced: 12,
                average: 80
            };
        }
    }

    renderFilters() {
        try {
            const categories = this.getCategoriesWithCounts();
            let filtersHTML = '<button class="tech-filter active" data-filter="all" type="button">Todas</button>';
            
            categories.forEach(category => {
                filtersHTML += `<button class="tech-filter" data-filter="${category.id}" type="button">${category.name} (${category.count})</button>`;
            });
            
            return filtersHTML;
        } catch (error) {
            console.error('Error renderizando filtros:', error);
            return '<button class="tech-filter active" data-filter="all" type="button">Todas</button>';
        }
    }

    getCategoriesWithCounts() {
        try {
            const stack = TECHNOLOGIES_CONFIG?.stack || {};
            return Object.entries(stack).map(([id, category]) => ({
                id,
                name: category.title || id.charAt(0).toUpperCase() + id.slice(1),
                count: category.technologies?.length || 0
            }));
        } catch (error) {
            console.error('Error obteniendo categorías:', error);
            return [];
        }
    }

    renderStats(stats) {
        return `
            <div class="showcase-stat">
                <span class="stat-number">${stats.hours}</span>
                <span class="stat-label">Horas Bootcamp</span>
            </div>
            <div class="showcase-stat">
                <span class="stat-number">${stats.technologies}</span>
                <span class="stat-label">Tecnologías</span>
            </div>
            <div class="showcase-stat">
                <span class="stat-number">${stats.advanced}</span>
                <span class="stat-label">Nivel Avanzado</span>
            </div>
            <div class="showcase-stat">
                <span class="stat-number">${stats.average}%</span>
                <span class="stat-label">Promedio</span>
            </div>
        `;
    }

    async renderGridView() {
        try {
            const technologies = getAllTechnologies();
            if (!Array.isArray(technologies) || technologies.length === 0) {
                return '<div class="tech-grid-empty">No hay tecnologías disponibles</div>';
            }

            let gridHTML = '<div class="tech-grid">';
            
            for (const tech of technologies) {
                if (!tech || typeof tech !== 'object') continue;
                
                const iconElement = await this.createTechIcon(tech);
                
                gridHTML += `
                    <div class="tech-card" 
                         data-category="${this.escapeHtml(tech.category || 'unknown')}" 
                         data-level="${this.getSkillLevelClass(tech.level || 0)}"
                         data-tech="${this.escapeHtml((tech.name || '').toLowerCase())}">
                        <div class="tech-card-header">
                            <div class="tech-icon-container">
                                ${iconElement}
                            </div>
                            <div class="tech-level-badge ${this.getSkillLevelClass(tech.level || 0)}">
                                ${tech.level || 0}%
                            </div>
                        </div>
                        
                        <div class="tech-card-content">
                            <h4 class="tech-name">${this.escapeHtml(tech.name || 'Sin nombre')}</h4>
                            <p class="tech-experience">${this.escapeHtml(tech.experience || 'No especificado')}</p>
                            <p class="tech-description">${this.escapeHtml(tech.description || '')}</p>
                            
                            <div class="tech-skills">
                                ${this.renderSkillTags(tech.skills)}
                            </div>
                            
                            <div class="tech-projects-count">
                                ${this.getProjectsCount(tech)} proyectos
                            </div>
                        </div>
                    </div>
                `;
            }
            
            gridHTML += '</div>';
            return gridHTML;
        } catch (error) {
            console.error('Error en renderGridView:', error);
            return '<div class="tech-grid-error">Error al cargar la vista de grid</div>';
        }
    }

    renderSkillTags(skills) {
        if (!Array.isArray(skills)) return '';
        
        return skills.slice(0, 3).map(skill => 
            `<span class="tech-skill-tag">${this.escapeHtml(skill)}</span>`
        ).join('');
    }

    getProjectsCount(tech) {
        if (!tech || !tech.projects) return 0;
        return Array.isArray(tech.projects) ? tech.projects.length : 0;
    }

    async renderListView() {
        try {
            const technologies = getAllTechnologies();
            if (!Array.isArray(technologies) || technologies.length === 0) {
                return '<div class="tech-list-empty">No hay tecnologías disponibles</div>';
            }

            let listHTML = '<div class="tech-list">';
            
            for (const tech of technologies) {
                if (!tech || typeof tech !== 'object') continue;
                
                const iconElement = await this.createTechIcon(tech, 32);
                
                listHTML += `
                    <div class="tech-list-item" 
                         data-category="${this.escapeHtml(tech.category || 'unknown')}" 
                         data-level="${this.getSkillLevelClass(tech.level || 0)}">
                        <div class="tech-list-icon">
                            ${iconElement}
                        </div>
                        
                        <div class="tech-list-content">
                            <div class="tech-list-header">
                                <h4 class="tech-name">${this.escapeHtml(tech.name || 'Sin nombre')}</h4>
                                <span class="tech-category-badge">${this.escapeHtml(tech.category || 'unknown')}</span>
                                <span class="tech-level-badge ${this.getSkillLevelClass(tech.level || 0)}">${tech.level || 0}%</span>
                            </div>
                            
                            <p class="tech-description">${this.escapeHtml(tech.description || '')}</p>
                            
                            <div class="tech-list-footer">
                                <span class="tech-experience">📅 ${this.escapeHtml(tech.experience || 'No especificado')}</span>
                                <span class="tech-projects">📂 ${this.getProjectsCount(tech)} proyectos</span>
                            </div>
                        </div>
                    </div>
                `;
            }
            
            listHTML += '</div>';
            return listHTML;
        } catch (error) {
            console.error('Error en renderListView:', error);
            return '<div class="tech-list-error">Error al cargar la vista de lista</div>';
        }
    }

    async renderCategoriesView() {
        try {
            const stack = TECHNOLOGIES_CONFIG?.stack || {};
            const categories = Object.entries(stack);
            
            if (categories.length === 0) {
                return '<div class="tech-categories-empty">No hay categorías disponibles</div>';
            }

            let categoriesHTML = '<div class="tech-categories">';
            
            for (const [categoryId, category] of categories) {
                if (!category || typeof category !== 'object') continue;
                
                categoriesHTML += `
                    <div class="tech-category-section" data-category="${this.escapeHtml(categoryId)}">
                        <div class="tech-category-header">
                            <div class="category-icon">${category.icon || '💻'}</div>
                            <div class="category-info">
                                <h3 class="category-title">${this.escapeHtml(category.title || categoryId)}</h3>
                                <p class="category-description">${this.escapeHtml(category.description || '')}</p>
                                <div class="category-stats">
                                    <span>${this.getTechnologiesCount(category)} tecnologías</span>
                                    <span>Promedio: ${this.calculateCategoryAverage(category)}%</span>
                                </div>
                            </div>
                        </div>
                        
                        <div class="category-technologies">
                            ${await this.renderCategoryTechnologies(category.technologies || [])}
                        </div>
                    </div>
                `;
            }
            
            categoriesHTML += '</div>';
            return categoriesHTML;
        } catch (error) {
            console.error('Error en renderCategoriesView:', error);
            return '<div class="tech-categories-error">Error al cargar la vista de categorías</div>';
        }
    }

    getTechnologiesCount(category) {
        if (!category || !category.technologies) return 0;
        return Array.isArray(category.technologies) ? category.technologies.length : 0;
    }

    async renderCategoryTechnologies(technologies) {
        if (!Array.isArray(technologies)) return '';
        
        let techHTML = '';
        
        for (const tech of technologies) {
            if (!tech || typeof tech !== 'object') continue;
            
            const iconElement = await this.createTechIcon(tech, 40);
            
            techHTML += `
                <div class="category-tech-item" data-level="${this.getSkillLevelClass(tech.level || 0)}">
                    <div class="category-tech-icon">
                        ${iconElement}
                    </div>
                    <div class="category-tech-info">
                        <h5 class="tech-name">${this.escapeHtml(tech.name || 'Sin nombre')}</h5>
                        <div class="tech-level-bar" role="progressbar" aria-valuenow="${tech.level || 0}" aria-valuemin="0" aria-valuemax="100">
                            <div class="tech-level-fill" style="width: ${tech.level || 0}%; background: ${this.escapeHtml(tech.color || '#007bff')};"></div>
                        </div>
                        <span class="tech-level-text">${tech.level || 0}% - ${this.escapeHtml(tech.experience || 'No especificado')}</span>
                    </div>
                </div>
            `;
        }
        
        return techHTML;
    }

    async createTechIcon(tech, size = 48) {
        if (!tech || typeof tech !== 'object') {
            return this.createFallbackIcon('??', '#666', size);
        }

        try {
            // Cache check
            const cacheKey = `${tech.name}-${size}`;
            if (this.cachedIcons.has(cacheKey)) {
                return this.cachedIcons.get(cacheKey);
            }

            let iconElement = null;

            // Intentar cargar SVG icon
            if (tech.icon && typeof loadSVGIcon === 'function') {
                try {
                    const svgElement = await loadSVGIcon(tech.icon, size);
                    if (svgElement) {
                        const svg = svgElement.querySelector('svg');
                        if (svg && tech.color) {
                            svg.style.fill = tech.color;
                            svg.style.color = tech.color;
                        }
                        iconElement = svgElement.outerHTML;
                    }
                } catch (iconError) {
                    console.warn('Error cargando SVG para', tech.name, iconError);
                }
            }

            // Fallback si no hay icono
            if (!iconElement) {
                iconElement = this.createFallbackIcon(
                    tech.name || '??',
                    tech.color || '#007bff',
                    size
                );
            }

            // Cache result
            this.cachedIcons.set(cacheKey, iconElement);
            return iconElement;

        } catch (error) {
            console.warn('Error creando icono para', tech.name, error);
            return this.createFallbackIcon(
                tech.name || '??',
                tech.color || '#666',
                size
            );
        }
    }

    createFallbackIcon(name, color, size) {
        const initials = (name || '??').substring(0, 2).toUpperCase();
        return `
            <div class="tech-icon-fallback" style="
                width: ${size}px; 
                height: ${size}px; 
                background: ${this.hexToRgba(color, 0.1)};
                border: 2px solid ${this.hexToRgba(color, 0.3)};
                border-radius: 8px;
                display: flex;
                align-items: center;
                justify-content: center;
                font-weight: bold;
                color: ${color};
                font-size: ${size * 0.3}px;
                font-family: system-ui, -apple-system, sans-serif;
            ">
                ${this.escapeHtml(initials)}
            </div>
        `;
    }

    hexToRgba(hex, alpha = 1) {
        try {
            // Remove # if present
            hex = hex.replace('#', '');
            
            // Handle 3-digit hex
            if (hex.length === 3) {
                hex = hex.split('').map(char => char + char).join('');
            }
            
            if (hex.length !== 6) {
                return `rgba(0, 0, 0, ${alpha})`;
            }
            
            const r = parseInt(hex.substr(0, 2), 16);
            const g = parseInt(hex.substr(2, 2), 16);
            const b = parseInt(hex.substr(4, 2), 16);
            
            return `rgba(${r}, ${g}, ${b}, ${alpha})`;
        } catch {
            return `rgba(0, 0, 0, ${alpha})`;
        }
    }

    escapeHtml(text) {
        if (typeof text !== 'string') return '';
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }

    setupEventListeners() {
        if (!this.container) return;

        // Filtros de categoría
        const filters = this.container.querySelectorAll('.tech-filter');
        const handleFilterClick = (e) => {
            e.preventDefault();
            const category = e.target.dataset.filter;
            if (category) {
                this.filterTechnologies(category);
                
                filters.forEach(f => f.classList.remove('active'));
                e.target.classList.add('active');
            }
        };

        filters.forEach(filter => {
            filter.addEventListener('click', handleFilterClick);
        });

        // Cambio de vista
        const views = this.container.querySelectorAll('.tech-view');
        const handleViewClick = (e) => {
            e.preventDefault();
            const viewType = e.target.dataset.view;
            if (viewType) {
                this.changeView(viewType);
                
                views.forEach(v => v.classList.remove('active'));
                e.target.classList.add('active');
            }
        };

        views.forEach(view => {
            view.addEventListener('click', handleViewClick);
        });

        // Hover en tech cards con debounce
        this.setupHoverEffects();
    }

    setupHoverEffects() {
        const techCards = this.container.querySelectorAll('.tech-card, .tech-list-item');
        
        techCards.forEach(card => {
            let hoverTimeout = null;
            
            card.addEventListener('mouseenter', () => {
                if (hoverTimeout) clearTimeout(hoverTimeout);
                
                hoverTimeout = setTimeout(() => {
                    card.style.transform = 'translateY(-5px) scale(1.02)';
                    card.style.boxShadow = '0 10px 30px rgba(220, 38, 38, 0.2)';
                    card.style.transition = 'all 0.3s ease';
                }, 50);
            });
            
            card.addEventListener('mouseleave', () => {
                if (hoverTimeout) clearTimeout(hoverTimeout);
                
                card.style.transform = 'translateY(0) scale(1)';
                card.style.boxShadow = '';
            });
        });
    }

    filterTechnologies(category) {
        this.currentFilter = category;
        const items = this.container.querySelectorAll('[data-category]');
        
        items.forEach((item, index) => {
            const shouldShow = category === 'all' || item.dataset.category === category;
            
            if (shouldShow) {
                item.style.display = 'block';
                // Animación de entrada escalonada
                const frameId = setTimeout(() => {
                    item.style.opacity = '1';
                    item.style.transform = 'translateY(0)';
                }, index * 50);
                this.animationFrames.push(frameId);
            } else {
                item.style.opacity = '0';
                item.style.transform = 'translateY(20px)';
                const frameId = setTimeout(() => {
                    item.style.display = 'none';
                }, 300);
                this.animationFrames.push(frameId);
            }
        });
    }

    changeView(viewType) {
        if (!['grid', 'list', 'categories'].includes(viewType)) {
            console.warn('Tipo de vista inválido:', viewType);
            return;
        }

        this.currentView = viewType;
        const viewContents = this.container.querySelectorAll('.tech-view-content');
        
        viewContents.forEach(content => {
            content.classList.remove('active');
            content.style.display = 'none';
        });
        
        const targetView = this.container.querySelector(`#tech-${viewType}-view`);
        if (targetView) {
            targetView.classList.add('active');
            targetView.style.display = 'block';
        }
    }

    setupAnimations() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const items = entry.target.querySelectorAll('.tech-card, .tech-list-item, .tech-category-section');
                    
                    items.forEach((item, index) => {
                        // Configurar estado inicial
                        item.style.opacity = '0';
                        item.style.transform = 'translateY(30px)';
                        
                        const frameId = setTimeout(() => {
                            item.style.transition = 'all 0.6s ease-out';
                            item.style.opacity = '1';
                            item.style.transform = 'translateY(0)';
                        }, index * this.animationDelay);
                        
                        this.animationFrames.push(frameId);
                    });
                    
                    observer.unobserve(entry.target);
                }
            });
        }, { 
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        });

        this.observers.push(observer);
        observer.observe(this.container);
    }

    getSkillLevelClass(level) {
        const numLevel = parseInt(level) || 0;
        if (numLevel >= 85) return 'expert';
        if (numLevel >= 75) return 'advanced';
        if (numLevel >= 60) return 'intermediate';
        return 'beginner';
    }

    calculateCategoryAverage(category) {
        if (!category || !Array.isArray(category.technologies) || category.technologies.length === 0) {
            return 0;
        }
        
        const total = category.technologies.reduce((sum, tech) => {
            return sum + (parseInt(tech.level) || 0);
        }, 0);
        
        return Math.round(total / category.technologies.length);
    }

    // Métodos públicos
    updateFilter(category) {
        if (typeof category === 'string') {
            this.filterTechnologies(category);
        }
    }

    updateView(viewType) {
        if (typeof viewType === 'string') {
            this.changeView(viewType);
        }
    }

    async refreshData() {
        try {
            await this.render();
            this.setupEventListeners();
        } catch (error) {
            console.error('Error refrescando datos:', error);
        }
    }

    getStats() {
        return {
            currentFilter: this.currentFilter,
            currentView: this.currentView,
            isInitialized: this.isInitialized,
            cachedIcons: this.cachedIcons.size,
            observers: this.observers.length
        };
    }

    destroy() {
        try {
            // Limpiar observers
            this.observers.forEach(observer => observer.disconnect());
            this.observers = [];

            // Limpiar resize observer
            if (this.resizeObserver) {
                this.resizeObserver.disconnect();
                this.resizeObserver = null;
            }

            // Limpiar animation frames
            this.animationFrames.forEach(frameId => clearTimeout(frameId));
            this.animationFrames = [];

            // Limpiar timeouts
            if (this.resizeTimeout) {
                clearTimeout(this.resizeTimeout);
            }

            // Limpiar cache
            this.cachedIcons.clear();

            // Reset state
            this.isInitialized = false;
            
            console.log('✅ TechShowcase destruido correctamente');
        } catch (error) {
            console.error('Error destruyendo TechShowcase:', error);
        }
    }
}

// Función para crear tech badges para proyectos
export function createTechBadges(technologies, containerSelector) {
    const container = document.querySelector(containerSelector);
    if (!container) {
        console.warn('Container no encontrado para tech badges:', containerSelector);
        return;
    }

    if (!Array.isArray(technologies)) {
        console.warn('Technologies debe ser un array');
        return;
    }

    container.innerHTML = '';
    
    technologies.forEach(async (techName) => {
        if (typeof techName !== 'string') return;
        
        try {
            const stack = TECHNOLOGIES_CONFIG?.stack || {};
            let techData = null;
            
            // Buscar tecnología en todas las categorías
            Object.values(stack).forEach(category => {
                if (category.technologies && Array.isArray(category.technologies)) {
                    const found = category.technologies.find(t => 
                        t.name && t.name.toLowerCase().includes(techName.toLowerCase())
                    );
                    if (found) techData = found;
                }
            });

            if (techData) {
                const badge = document.createElement('span');
                badge.className = 'tech-badge';
                badge.style.cssText = `
                    display: inline-flex;
                    align-items: center;
                    gap: 0.5rem;
                    padding: 0.25rem 0.75rem;
                    background: ${techData.color || '#007bff'}20;
                    color: ${techData.color || '#007bff'};
                    border: 1px solid ${techData.color || '#007bff'}40;
                    border-radius: 20px;
                    font-size: 0.8rem;
                    font-weight: 500;
                    margin: 0.25rem 0.25rem 0.25rem 0;
                    font-family: system-ui, -apple-system, sans-serif;
                `;

                // Intentar cargar icono
                if (techData.icon && typeof loadSVGIcon === 'function') {
                    try {
                        const iconElement = await loadSVGIcon(techData.icon, 16);
                        if (iconElement) {
                            badge.appendChild(iconElement);
                        }
                    } catch (error) {
                        console.warn('Error cargando icono para badge:', techData.name);
                    }
                }
                
                const text = document.createElement('span');
                text.textContent = techData.name || techName;
                badge.appendChild(text);
                
                container.appendChild(badge);
            } else {
                // Badge genérico si no se encuentra la tecnología
                const badge = document.createElement('span');
                badge.className = 'tech-badge tech-badge-generic';
                badge.style.cssText = `
                    display: inline-flex;
                    align-items: center;
                    gap: 0.5rem;
                    padding: 0.25rem 0.75rem;
                    background: #f3f4f6;
                    color: #6b7280;
                    border: 1px solid #d1d5db;
                    border-radius: 20px;
                    font-size: 0.8rem;
                    font-weight: 500;
                    margin: 0.25rem 0.25rem 0.25rem 0;
                    font-family: system-ui, -apple-system, sans-serif;
                `;
                badge.textContent = techName;
                container.appendChild(badge);
            }
        } catch (error) {
            console.error('Error creando badge para:', techName, error);
        }
    });
}

// Auto-inicialización
document.addEventListener('DOMContentLoaded', () => {
    try {
        const techShowcaseContainer = document.querySelector('#tech-showcase');
        if (techShowcaseContainer && !window.techShowcaseInstance) {
            window.techShowcaseInstance = new TechShowcase('#tech-showcase');
            console.log('📊 TechShowcase auto-inicializado');
        }
    } catch (error) {
        console.error('Error en auto-inicialización de TechShowcase:', error);
    }
});

// Exportar por defecto
export default TechShowcase;

console.log('🚀 TechShowcase v2.1 - Versión corregida y optimizada');