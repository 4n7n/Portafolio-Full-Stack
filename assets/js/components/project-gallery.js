import { getGitHubAPI } from '../services/github-api.js';
import projectsData from '../data/projects.js';

class ProjectGallery {
    constructor() {
        this.projects = [];
        this.filteredProjects = [];
        this.featuredProjects = [];
        this.currentPage = 1;
        this.projectsPerPage = 6;
        this.isLoading = false;
        this.githubAPI = getGitHubAPI();
        this.observer = null;
        this.modalOpen = false;
        
        // DOM elements
        this.featuredContainer = null;
        this.projectsContainer = null;
        this.loadingElement = null;
        this.emptyElement = null;
        this.loadMoreBtn = null;
        this.modal = null;
        
        this.init();
    }

    async init() {
        try {
            this.findDOMElements();
            this.loadProjectsData();
            this.setupIntersectionObserver();
            this.setupModalHandlers();
            this.bindEvents();
            
            await this.renderFeaturedProjects();
            await this.renderProjects();
            
            // Load GitHub data in background
            this.loadGitHubData();
            
            console.log('✅ ProjectGallery initialized');
        } catch (error) {
            console.error('❌ Error initializing ProjectGallery:', error);
        }
    }

    findDOMElements() {
        this.featuredContainer = document.getElementById('featured-projects-container');
        this.projectsContainer = document.getElementById('projects-container');
        this.loadingElement = document.getElementById('projects-loading');
        this.emptyElement = document.getElementById('projects-empty');
        this.loadMoreBtn = document.getElementById('load-more-btn');
        this.modal = document.getElementById('project-modal');

        if (!this.projectsContainer) {
            throw new Error('Projects container not found');
        }
    }

    loadProjectsData() {
        this.projects = [...projectsData.allProjects];
        this.featuredProjects = projectsData.getFeaturedProjects();
        this.filteredProjects = [...this.projects];
        
        // Update GitHub repo count
        const repoCountElement = document.getElementById('github-repo-count');
        if (repoCountElement) {
            repoCountElement.textContent = this.projects.length;
        }
    }

    setupIntersectionObserver() {
        const options = {
            root: null,
            rootMargin: '50px',
            threshold: 0.1
        };

        this.observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    this.lazyLoadImage(entry.target);
                    this.observer.unobserve(entry.target);
                }
            });
        }, options);
    }

    lazyLoadImage(img) {
        const src = img.dataset.src;
        if (src) {
            img.src = src;
            img.onload = () => {
                img.classList.remove('loading');
                img.classList.add('loaded');
            };
            img.onerror = () => {
                img.src = 'assets/images/fallback-project.jpg';
                img.classList.remove('loading');
            };
        }
    }

    setupModalHandlers() {
        if (!this.modal) return;

        // Close modal handlers
        const closeButtons = this.modal.querySelectorAll('[data-modal-close]');
        closeButtons.forEach(btn => {
            btn.addEventListener('click', () => this.closeModal());
        });

        // Close on escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && this.modalOpen) {
                this.closeModal();
            }
        });

        // Prevent modal content clicks from closing modal
        const modalContent = this.modal.querySelector('.modal-content');
        if (modalContent) {
            modalContent.addEventListener('click', (e) => {
                e.stopPropagation();
            });
        }
    }

    bindEvents() {
        // Load more button
        if (this.loadMoreBtn) {
            this.loadMoreBtn.addEventListener('click', () => {
                this.loadMoreProjects();
            });
        }

        // Project card clicks
        document.addEventListener('click', (e) => {
            const projectCard = e.target.closest('.project-card');
            if (projectCard) {
                const projectId = projectCard.dataset.projectId;
                if (projectId) {
                    this.openProjectModal(projectId);
                }
            }
        });
    }

    async renderFeaturedProjects() {
        if (!this.featuredContainer || this.featuredProjects.length === 0) return;

        this.featuredContainer.innerHTML = '';

        for (const project of this.featuredProjects) {
            const projectElement = this.createProjectCard(project, true);
            this.featuredContainer.appendChild(projectElement);
        }

        // Animate featured projects
        this.animateProjectCards(this.featuredContainer);
    }

    async renderProjects() {
        if (!this.projectsContainer) return;

        this.showLoading();
        
        try {
            const paginatedData = projectsData.paginateProjects(
                this.filteredProjects, 
                this.currentPage, 
                this.projectsPerPage
            );

            if (this.currentPage === 1) {
                this.projectsContainer.innerHTML = '';
            }

            if (paginatedData.projects.length === 0) {
                this.showEmptyState();
                return;
            }

            for (const project of paginatedData.projects) {
                const projectElement = this.createProjectCard(project);
                this.projectsContainer.appendChild(projectElement);
            }

            // Update load more button
            this.updateLoadMoreButton(paginatedData);
            
            // Animate new project cards
            this.animateProjectCards(this.projectsContainer);
            
            this.hideLoading();
        } catch (error) {
            console.error('Error rendering projects:', error);
            this.showEmptyState();
        }
    }

    createProjectCard(project, isFeatured = false) {
        const card = document.createElement('div');
        card.className = `project-card ${isFeatured ? 'featured' : ''}`;
        card.dataset.projectId = project.id;
        card.dataset.category = project.category;
        card.dataset.technologies = project.technologies.join(',');

        const statusInfo = projectsData.projectStatus[project.status];
        const techTags = project.techStack.slice(0, 4).map(tech => 
            `<span class="tech-tag">${tech.name}</span>`
        ).join('');

        card.innerHTML = `
            <div class="project-image">
                <img 
                    data-src="${project.image}" 
                    alt="${project.title}"
                    class="loading"
                    loading="lazy"
                >
            </div>
            <div class="project-content">
                <h3 class="project-title">${project.title}</h3>
                <p class="project-description">${project.shortDescription || project.description}</p>
                <div class="project-tech">
                    ${techTags}
                    ${project.techStack.length > 4 ? `<span class="tech-tag">+${project.techStack.length - 4}</span>` : ''}
                </div>
                <div class="project-footer">
                    <div class="project-links">
                        ${project.links.demo !== '#' ? `
                            <a href="${project.links.demo}" target="_blank" rel="noopener" class="project-link" aria-label="Ver demo">
                                <i class="icon-external-link"></i>
                            </a>
                        ` : ''}
                        <a href="${project.links.repository}" target="_blank" rel="noopener" class="project-link" aria-label="Ver código">
                            <i class="icon-github"></i>
                        </a>
                    </div>
                    <div class="project-stats">
                        <div class="stat-item">
                            <i class="icon-star"></i>
                            <span>${project.github?.stars || 0}</span>
                        </div>
                        <div class="stat-item">
                            <i class="icon-git-branch"></i>
                            <span>${project.github?.forks || 0}</span>
                        </div>
                    </div>
                </div>
            </div>
        `;

        // Setup lazy loading for image
        const img = card.querySelector('img[data-src]');
        if (img) {
            this.observer.observe(img);
        }

        return card;
    }

    animateProjectCards(container) {
        const cards = container.querySelectorAll('.project-card:not(.animate-in)');
        cards.forEach((card, index) => {
            setTimeout(() => {
                card.classList.add('animate-in');
            }, index * 100);
        });
    }

    updateLoadMoreButton(paginatedData) {
        if (!this.loadMoreBtn) return;

        if (paginatedData.hasMore) {
            this.loadMoreBtn.style.display = 'block';
            this.loadMoreBtn.querySelector('span').textContent = 
                `Cargar más proyectos (${paginatedData.total - (this.currentPage * this.projectsPerPage)} restantes)`;
        } else {
            this.loadMoreBtn.style.display = 'none';
        }
    }

    loadMoreProjects() {
        this.currentPage++;
        this.renderProjects();
    }

    // Filter methods (called from ProjectFilter component)
    filterProjects(category, technology) {
        this.filteredProjects = projectsData.filterProjects(category, technology);
        this.currentPage = 1;
        this.renderProjects();
    }

    // Modal methods
    async openProjectModal(projectId) {
        const project = projectsData.getProjectById(projectId);
        if (!project || !this.modal) return;

        this.modalOpen = true;
        document.body.classList.add('modal-open');
        
        // Populate modal content
        this.populateModal(project);
        
        // Show modal
        this.modal.classList.add('active');
        
        // Focus management
        this.modal.focus();
        
        // Load fresh GitHub data for this project
        await this.updateModalWithGitHubData(project);
    }

    populateModal(project) {
        const modal = this.modal;
        
        // Title
        const titleElement = modal.querySelector('#modal-title');
        if (titleElement) titleElement.textContent = project.title;
        
        // Image
        const imageElement = modal.querySelector('#modal-image');
        if (imageElement) {
            imageElement.src = project.images?.desktop || project.image;
            imageElement.alt = project.title;
        }
        
        // Description
        const descriptionElement = modal.querySelector('#modal-description');
        if (descriptionElement) descriptionElement.textContent = project.description;
        
        // Tech tags
        const techTagsContainer = modal.querySelector('#modal-tech-tags');
        if (techTagsContainer) {
            techTagsContainer.innerHTML = project.techStack.map(tech => `
                <div class="tech-tag">
                    <img src="${tech.icon}" alt="${tech.name}" width="16" height="16">
                    ${tech.name}
                </div>
            `).join('');
        }
        
        // Links
        const demoLink = modal.querySelector('#modal-demo-link');
        const repoLink = modal.querySelector('#modal-repo-link');
        
        if (demoLink) {
            if (project.links.demo !== '#') {
                demoLink.href = project.links.demo;
                demoLink.style.display = 'inline-flex';
            } else {
                demoLink.style.display = 'none';
            }
        }
        
        if (repoLink) {
            repoLink.href = project.links.repository;
        }
        
        // Initial stats (will be updated with GitHub data)
        this.updateModalStats({
            stars: project.github?.stars || 0,
            forks: project.github?.forks || 0,
            issues: project.github?.issues || 0,
            language: project.github?.language || 'JavaScript'
        });
    }

    async updateModalWithGitHubData(project) {
        if (!project.github?.repo) return;
        
        try {
            const repoStats = await this.githubAPI.getRepositoryStats(project.github.repo);
            if (repoStats) {
                this.updateModalStats({
                    stars: repoStats.stargazers_count,
                    forks: repoStats.forks_count,
                    issues: repoStats.open_issues_count,
                    language: repoStats.language,
                    size: repoStats.size,
                    lastUpdate: repoStats.updated_at
                });
            }
        } catch (error) {
            console.error('Failed to update modal with GitHub data:', error);
        }
    }

    updateModalStats(stats) {
        const statsContainer = this.modal.querySelector('#modal-stats');
        if (!statsContainer) return;
        
        statsContainer.innerHTML = `
            <div class="stat-item">
                <span class="stat-value">${stats.stars}</span>
                <span class="stat-label">Stars</span>
            </div>
            <div class="stat-item">
                <span class="stat-value">${stats.forks}</span>
                <span class="stat-label">Forks</span>
            </div>
            <div class="stat-item">
                <span class="stat-value">${stats.issues}</span>
                <span class="stat-label">Issues</span>
            </div>
            <div class="stat-item">
                <span class="stat-value">${stats.language}</span>
                <span class="stat-label">Lenguaje</span>
            </div>
        `;
    }

    closeModal() {
        if (!this.modal || !this.modalOpen) return;
        
        this.modalOpen = false;
        document.body.classList.remove('modal-open');
        this.modal.classList.remove('active');
    }

    // Loading states
    showLoading() {
        if (this.loadingElement) this.loadingElement.style.display = 'flex';
        if (this.emptyElement) this.emptyElement.style.display = 'none';
    }

    hideLoading() {
        if (this.loadingElement) this.loadingElement.style.display = 'none';
    }

    showEmptyState() {
        this.hideLoading();
        if (this.emptyElement) this.emptyElement.style.display = 'block';
        if (this.loadMoreBtn) this.loadMoreBtn.style.display = 'none';
    }

    // GitHub data loading
    async loadGitHubData() {
        try {
            const repoNames = this.projects
                .filter(project => project.github?.repo)
                .map(project => project.github.repo);
            
            if (repoNames.length === 0) return;
            
            console.log('Loading GitHub data for projects...');
            const githubData = await this.githubAPI.getMultipleRepositories(repoNames);
            
            // Update projects with GitHub data
            this.updateProjectsWithGitHubData(githubData);
            
            // Re-render to show updated stats
            this.renderProjects();
            this.renderFeaturedProjects();
            
        } catch (error) {
            console.error('Failed to load GitHub data:', error);
        }
    }

    updateProjectsWithGitHubData(githubData) {
        this.projects.forEach(project => {
            if (project.github?.repo && githubData[project.github.repo]) {
                const repoData = githubData[project.github.repo];
                project.github = {
                    ...project.github,
                    stars: repoData.stargazers_count,
                    forks: repoData.forks_count,
                    issues: repoData.open_issues_count,
                    language: repoData.language,
                    size: repoData.size,
                    lastUpdate: repoData.updated_at
                };
            }
        });
        
        // Update featured projects as well
        this.featuredProjects = this.projects.filter(p => p.featured);
    }

    // Public API methods
    getProjects() {
        return this.projects;
    }

    getProject(id) {
        return this.projects.find(project => project.id === id);
    }

    searchProjects(query) {
        this.filteredProjects = projectsData.searchProjects(query);
        this.currentPage = 1;
        this.renderProjects();
    }

    // Cleanup
    destroy() {
        if (this.observer) {
            this.observer.disconnect();
        }
        
        if (this.loadMoreBtn) {
            this.loadMoreBtn.removeEventListener('click', this.loadMoreProjects);
        }
        
        document.removeEventListener('keydown', this.closeModal);
        document.body.classList.remove('modal-open');
    }
}

export default ProjectGallery;