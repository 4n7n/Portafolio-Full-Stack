import projectsData from '../data/projects.js';

class ProjectFilter {
    constructor(projectGallery) {
        this.projectGallery = projectGallery;
        this.activeCategory = 'all';
        this.activeTechnology = 'all';
        this.searchQuery = '';
        
        // DOM elements
        this.filterContainer = null;
        this.categoryButtons = [];
        this.techSelect = null;
        this.searchInput = null;
        
        // Statistics
        this.projectStats = projectsData.getProjectsStats();
        
        this.init();
    }

    init() {
        try {
            this.findDOMElements();
            this.setupCategoryFilters();
            this.setupTechFilters();
            this.setupSearchFilter();
            this.updateFilterCounts();
            this.bindEvents();
            
            console.log('✅ ProjectFilter initialized');
        } catch (error) {
            console.error('❌ Error initializing ProjectFilter:', error);
        }
    }

    findDOMElements() {
        this.filterContainer = document.querySelector('[data-projects-filter]');
        if (!this.filterContainer) {
            throw new Error('Projects filter container not found');
        }

        this.categoryButtons = this.filterContainer.querySelectorAll('.filter-btn[data-filter]');
        this.techSelect = this.filterContainer.querySelector('[data-tech-filter]');
        this.searchInput = document.querySelector('[data-search-projects]'); // Optional search input
    }

    setupCategoryFilters() {
        // Ensure all category buttons exist
        const categories = Object.keys(projectsData.projectCategories);
        categories.forEach(category => {
            const button = this.filterContainer.querySelector(`[data-filter="${category}"]`);
            if (button) {
                this.setupCategoryButton(button, category);
            }
        });
    }

    setupCategoryButton(button, category) {
        const categoryData = projectsData.projectCategories[category];
        
        // Add icon if configured
        if (categoryData.icon && !button.querySelector('i')) {
            const icon = document.createElement('i');
            icon.className = categoryData.icon;
            button.querySelector('span').insertAdjacentElement('beforebegin', icon);
        }
        
        // Ensure count element exists
        let countElement = button.querySelector('.filter-count');
        if (!countElement) {
            countElement = document.createElement('span');
            countElement.className = 'filter-count';
            button.appendChild(countElement);
        }
    }

    setupTechFilters() {
        if (!this.techSelect) return;

        // Clear existing options except the first one
        const firstOption = this.techSelect.querySelector('option[value="all"]');
        this.techSelect.innerHTML = '';
        if (firstOption) {
            this.techSelect.appendChild(firstOption);
        } else {
            const defaultOption = document.createElement('option');
            defaultOption.value = 'all';
            defaultOption.textContent = 'Todas las tecnologías';
            this.techSelect.appendChild(defaultOption);
        }

        // Add technology options from data
        projectsData.technologyFilters.forEach(tech => {
            if (tech.value !== 'all') {
                const option = document.createElement('option');
                option.value = tech.value;
                option.textContent = tech.label;
                this.techSelect.appendChild(option);
            }
        });
    }

    setupSearchFilter() {
        if (!this.searchInput) {
            // Create search input if it doesn't exist
            this.createSearchInput();
        }
    }

    createSearchInput() {
        const searchContainer = document.createElement('div');
        searchContainer.className = 'filter-search';
        searchContainer.innerHTML = `
            <label class="filter-label" for="project-search">Buscar:</label>
            <div class="search-input-container">
                <input 
                    type="text" 
                    id="project-search"
                    data-search-projects
                    placeholder="Buscar proyectos por nombre o tecnología..."
                    class="search-input"
                >
                <i class="icon-search search-icon"></i>
                <button class="search-clear" style="display: none;" aria-label="Limpiar búsqueda">
                    <i class="icon-x"></i>
                </button>
            </div>
        `;

        // Insert after tech filter
        const techContainer = this.filterContainer.querySelector('.filter-tech');
        if (techContainer) {
            techContainer.insertAdjacentElement('afterend', searchContainer);
        } else {
            this.filterContainer.appendChild(searchContainer);
        }

        this.searchInput = searchContainer.querySelector('[data-search-projects]');
        this.searchClearBtn = searchContainer.querySelector('.search-clear');
    }

    bindEvents() {
        // Category filter buttons
        this.categoryButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                e.preventDefault();
                const category = button.dataset.filter;
                this.setActiveCategory(category);
            });
        });

        // Technology select
        if (this.techSelect) {
            this.techSelect.addEventListener('change', (e) => {
                this.setActiveTechnology(e.target.value);
            });
        }

        // Search input
        if (this.searchInput) {
            let searchTimeout;
            this.searchInput.addEventListener('input', (e) => {
                clearTimeout(searchTimeout);
                searchTimeout = setTimeout(() => {
                    this.setSearchQuery(e.target.value);
                }, 300); // Debounce search
            });

            // Clear search button
            if (this.searchClearBtn) {
                this.searchClearBtn.addEventListener('click', () => {
                    this.clearSearch();
                });
            }

            // Show/hide clear button based on input
            this.searchInput.addEventListener('input', (e) => {
                if (this.searchClearBtn) {
                    this.searchClearBtn.style.display = e.target.value ? 'flex' : 'none';
                }
            });
        }

        // Keyboard shortcuts
        document.addEventListener('keydown', (e) => {
            // Ctrl/Cmd + F to focus search
            if ((e.ctrlKey || e.metaKey) && e.key === 'f' && this.searchInput) {
                e.preventDefault();
                this.searchInput.focus();
            }
            
            // Escape to clear search
            if (e.key === 'Escape' && this.searchInput && document.activeElement === this.searchInput) {
                this.clearSearch();
            }
        });
    }

    setActiveCategory(category) {
        if (this.activeCategory === category) return;

        this.activeCategory = category;
        this.updateCategoryButtons();
        this.applyFilters();
        this.updateURL();
    }

    setActiveTechnology(technology) {
        if (this.activeTechnology === technology) return;

        this.activeTechnology = technology;
        this.applyFilters();
        this.updateURL();
    }

    setSearchQuery(query) {
        this.searchQuery = query.trim();
        this.applyFilters();
        this.updateURL();
    }

    updateCategoryButtons() {
        this.categoryButtons.forEach(button => {
            const category = button.dataset.filter;
            if (category === this.activeCategory) {
                button.classList.add('active');
            } else {
                button.classList.remove('active');
            }
        });
    }

    applyFilters() {
        let filteredProjects = [...projectsData.allProjects];

        // Apply category filter
        if (this.activeCategory !== 'all') {
            filteredProjects = filteredProjects.filter(project => 
                project.category === this.activeCategory
            );
        }

        // Apply technology filter
        if (this.activeTechnology !== 'all') {
            filteredProjects = filteredProjects.filter(project => 
                project.technologies.includes(this.activeTechnology)
            );
        }

        // Apply search filter
        if (this.searchQuery) {
            const query = this.searchQuery.toLowerCase();
            filteredProjects = filteredProjects.filter(project => 
                project.title.toLowerCase().includes(query) ||
                project.description.toLowerCase().includes(query) ||
                project.technologies.some(tech => tech.toLowerCase().includes(query)) ||
                project.techStack.some(tech => tech.name.toLowerCase().includes(query))
            );
        }

        // Update gallery
        if (this.projectGallery) {
            this.projectGallery.filteredProjects = filteredProjects;
            this.projectGallery.currentPage = 1;
            this.projectGallery.renderProjects();
        }

        // Update filter counts
        this.updateFilterCounts(filteredProjects);

        // Emit custom event
        this.emitFilterChange(filteredProjects);
    }

    updateFilterCounts(filteredProjects = null) {
        const baseProjects = filteredProjects || projectsData.allProjects;
        
        // Update category counts
        this.categoryButtons.forEach(button => {
            const category = button.dataset.filter;
            const countElement = button.querySelector('.filter-count');
            
            if (countElement) {
                let count;
                if (category === 'all') {
                    count = baseProjects.length;
                } else {
                    count = baseProjects.filter(project => project.category === category).length;
                }
                countElement.textContent = count;
                
                // Disable button if no projects
                button.disabled = count === 0 && category !== this.activeCategory;
                if (button.disabled) {
                    button.classList.add('disabled');
                } else {
                    button.classList.remove('disabled');
                }
            }
        });
    }

    clearSearch() {
        if (this.searchInput) {
            this.searchInput.value = '';
            if (this.searchClearBtn) {
                this.searchClearBtn.style.display = 'none';
            }
        }
        this.setSearchQuery('');
    }

    clearAllFilters() {
        this.setActiveCategory('all');
        this.setActiveTechnology('all');
        this.clearSearch();
        
        if (this.techSelect) {
            this.techSelect.value = 'all';
        }
    }

    updateURL() {
        if (!window.history?.pushState) return;

        const params = new URLSearchParams();
        
        if (this.activeCategory !== 'all') {
            params.set('category', this.activeCategory);
        }
        
        if (this.activeTechnology !== 'all') {
            params.set('tech', this.activeTechnology);
        }
        
        if (this.searchQuery) {
            params.set('search', this.searchQuery);
        }

        const newURL = params.toString() ? 
            `${window.location.pathname}?${params.toString()}${window.location.hash}` : 
            `${window.location.pathname}${window.location.hash}`;
            
        window.history.pushState({ filters: this.getActiveFilters() }, '', newURL);
    }

    loadFiltersFromURL() {
        const params = new URLSearchParams(window.location.search);
        
        const category = params.get('category') || 'all';
        const technology = params.get('tech') || 'all';
        const search = params.get('search') || '';

        // Apply filters without triggering URL update
        this.activeCategory = category;
        this.activeTechnology = technology;
        this.searchQuery = search;

        // Update UI
        this.updateCategoryButtons();
        
        if (this.techSelect) {
            this.techSelect.value = technology;
        }
        
        if (this.searchInput) {
            this.searchInput.value = search;
            if (this.searchClearBtn) {
                this.searchClearBtn.style.display = search ? 'flex' : 'none';
            }
        }

        // Apply filters
        this.applyFilters();
    }

    emitFilterChange(filteredProjects) {
        const event = new CustomEvent('projectsFiltered', {
            detail: {
                projects: filteredProjects,
                filters: this.getActiveFilters(),
                count: filteredProjects.length
            }
        });
        
        document.dispatchEvent(event);
    }

    getActiveFilters() {
        return {
            category: this.activeCategory,
            technology: this.activeTechnology,
            search: this.searchQuery
        };
    }

    getFilteredCount() {
        return this.projectGallery ? this.projectGallery.filteredProjects.length : 0;
    }

    // Analytics methods
    trackFilterUsage(filterType, filterValue) {
        // Track filter usage for analytics
        if (window.gtag) {
            window.gtag('event', 'filter_used', {
                event_category: 'Projects',
                event_label: `${filterType}:${filterValue}`,
                value: 1
            });
        }
    }

    // Public API methods
    setCategoryFilter(category) {
        this.setActiveCategory(category);
    }

    setTechnologyFilter(technology) {
        this.setActiveTechnology(technology);
    }

    setSearch(query) {
        if (this.searchInput) {
            this.searchInput.value = query;
        }
        this.setSearchQuery(query);
    }

    reset() {
        this.clearAllFilters();
    }

    // Advanced filtering
    filterByDateRange(startDate, endDate) {
        const filtered = projectsData.allProjects.filter(project => {
            const projectDate = new Date(project.createdAt);
            return projectDate >= startDate && projectDate <= endDate;
        });
        
        if (this.projectGallery) {
            this.projectGallery.filteredProjects = filtered;
            this.projectGallery.currentPage = 1;
            this.projectGallery.renderProjects();
        }
    }

    filterByStatus(status) {
        const filtered = projectsData.getProjectsByStatus(status);
        
        if (this.projectGallery) {
            this.projectGallery.filteredProjects = filtered;
            this.projectGallery.currentPage = 1;
            this.projectGallery.renderProjects();
        }
    }

    // Cleanup
    destroy() {
        // Remove event listeners
        this.categoryButtons.forEach(button => {
            button.removeEventListener('click', this.setActiveCategory);
        });
        
        if (this.techSelect) {
            this.techSelect.removeEventListener('change', this.setActiveTechnology);
        }
        
        if (this.searchInput) {
            this.searchInput.removeEventListener('input', this.setSearchQuery);
        }
        
        document.removeEventListener('keydown', this.handleKeyboardShortcuts);
    }
}

export default ProjectFilter;