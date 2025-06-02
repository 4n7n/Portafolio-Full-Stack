import { createGitHubAPI } from './services/github-api.js';
import ProjectGallery from './components/project-gallery.js';
import ProjectFilter from './components/project-filter.js';
import { projectsConfig } from './config/portfolio-config.js';

// Add to existing PortfolioApp class
class PortfolioApp {
    constructor() {
        // ... existing properties
        this.projectGallery = null;
        this.projectFilter = null;
        this.githubAPI = null;
        this.isProjectsInitialized = false;
    }

    async init() {
        try {
            console.log('🚀 Initializing Portfolio App...');
            
            // ... existing initialization (DOM, components loading, etc.)
            
            // Initialize projects components
            await this.initializeProjects();
            
            // ... rest of existing initialization
            
            console.log('✅ Portfolio App initialized successfully');
        } catch (error) {
            console.error('❌ Error initializing Portfolio App:', error);
            this.handleInitializationError(error);
        }
    }

    async initializeProjects() {
        try {
            console.log('📁 Initializing Projects components...');
            
            // Initialize GitHub API first
            await this.initializeGitHubAPI();
            
            // Initialize project gallery
            await this.initializeProjectGallery();
            
            // Initialize project filters
            await this.initializeProjectFilter();
            
            // Setup projects event listeners
            this.setupProjectsEvents();
            
            // Load URL state for projects
            this.loadProjectsURLState();
            
            this.isProjectsInitialized = true;
            console.log('✅ Projects components initialized');
            
        } catch (error) {
            console.error('❌ Error initializing projects:', error);
            throw error;
        }
    }

    async initializeGitHubAPI() {
        try {
            this.githubAPI = createGitHubAPI({
                username: projectsConfig.github.username,
                token: projectsConfig.github.token
            });
            
            // Preload some GitHub data in background
            if (projectsConfig.github.enableAPI) {
                this.githubAPI.preloadData().catch(error => {
                    console.warn('GitHub API preload failed:', error);
                });
            }
            
            console.log('✅ GitHub API initialized');
        } catch (error) {
            console.error('❌ Error initializing GitHub API:', error);
            // Continue without GitHub API
        }
    }

    async initializeProjectGallery() {
        try {
            // Wait for projects section to be visible or DOM ready
            await this.waitForElement('#projects');
            
            this.projectGallery = new ProjectGallery();
            
            console.log('✅ ProjectGallery initialized');
        } catch (error) {
            console.error('❌ Error initializing ProjectGallery:', error);
            throw error;
        }
    }

    async initializeProjectFilter() {
        try {
            if (!this.projectGallery) {
                throw new Error('ProjectGallery must be initialized before ProjectFilter');
            }
            
            this.projectFilter = new ProjectFilter(this.projectGallery);
            
            console.log('✅ ProjectFilter initialized');
        } catch (error) {
            console.error('❌ Error initializing ProjectFilter:', error);
            throw error;
        }
    }

    setupProjectsEvents() {
        // Listen for project filter changes
        document.addEventListener('projectsFiltered', (event) => {
            this.handleProjectsFiltered(event.detail);
        });

        // Listen for project modal events
        document.addEventListener('projectModalOpened', (event) => {
            this.handleProjectModalOpened(event.detail);
        });

        document.addEventListener('projectModalClosed', (event) => {
            this.handleProjectModalClosed(event.detail);
        });

        // Listen for GitHub data updates
        document.addEventListener('githubDataUpdated', (event) => {
            this.handleGitHubDataUpdated(event.detail);
        });

        // Handle browser back/forward for project URLs
        window.addEventListener('popstate', (event) => {
            if (event.state && event.state.filters) {
                this.loadProjectsURLState();
            }
        });

        // Handle intersection with projects section for analytics
        this.setupProjectsIntersectionObserver();
    }

    setupProjectsIntersectionObserver() {
        const projectsSection = document.getElementById('projects');
        if (!projectsSection) return;

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    this.trackProjectsSectionView();
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.3 });

        observer.observe(projectsSection);
    }

    loadProjectsURLState() {
        if (!this.projectFilter) return;

        try {
            this.projectFilter.loadFiltersFromURL();
        } catch (error) {
            console.error('Error loading projects URL state:', error);
        }
    }

    // Event handlers
    handleProjectsFiltered(detail) {
        const { projects, filters, count } = detail;
        
        // Track filter usage for analytics
        if (projectsConfig.analytics.trackFilterUsage) {
            this.trackFilterUsage(filters);
        }
        
        // Update page title if needed
        this.updatePageTitleForFilters(filters, count);
        
        // Custom event for other components
        this.emit('projectsStateChanged', { projects, filters, count });
    }

    handleProjectModalOpened(detail) {
        const { projectId, project } = detail;
        
        // Track modal opens for analytics
        if (projectsConfig.analytics.trackModalOpens) {
            this.trackProjectModalOpen(projectId);
        }
        
        // Update meta tags for social sharing
        this.updateMetaTagsForProject(project);
        
        // Pause other animations/videos if any
        this.pauseBackgroundAnimations();
    }

    handleProjectModalClosed(detail) {
        // Restore original meta tags
        this.restoreOriginalMetaTags();
        
        // Resume background animations
        this.resumeBackgroundAnimations();
    }

    handleGitHubDataUpdated(detail) {
        console.log('GitHub data updated:', detail);
        
        // Refresh projects display if needed
        if (this.projectGallery && detail.repositories) {
            this.projectGallery.updateProjectsWithGitHubData(detail.repositories);
        }
    }

    // Utility methods
    async waitForElement(selector, timeout = 5000) {
        return new Promise((resolve, reject) => {
            const element = document.querySelector(selector);
            if (element) {
                resolve(element);
                return;
            }

            const observer = new MutationObserver((mutations, obs) => {
                const element = document.querySelector(selector);
                if (element) {
                    obs.disconnect();
                    resolve(element);
                }
            });

            observer.observe(document.body, {
                childList: true,
                subtree: true
            });

            setTimeout(() => {
                observer.disconnect();
                reject(new Error(`Element ${selector} not found within ${timeout}ms`));
            }, timeout);
        });
    }

    updatePageTitleForFilters(filters, count) {
        if (filters.category !== 'all' || filters.technology !== 'all' || filters.search) {
            let titleSuffix = ` (${count} proyecto${count !== 1 ? 's' : ''})`;
            if (filters.category !== 'all') titleSuffix += ` - ${filters.category}`;
            if (filters.technology !== 'all') titleSuffix += ` - ${filters.technology}`;
            if (filters.search) titleSuffix += ` - "${filters.search}"`;
            
            document.title = `Proyectos${titleSuffix} | Mi Portfolio`;
        } else {
            document.title = 'Proyectos | Mi Portfolio';
        }
    }

    updateMetaTagsForProject(project) {
        if (!project) return;

        // Store original meta tags
        this.originalMetaTags = {
            title: document.title,
            description: document.querySelector('meta[name="description"]')?.content,
            ogTitle: document.querySelector('meta[property="og:title"]')?.content,
            ogDescription: document.querySelector('meta[property="og:description"]')?.content,
            ogImage: document.querySelector('meta[property="og:image"]')?.content
        };

        // Update meta tags
        document.title = `${project.title} | Mi Portfolio`;
        
        this.updateMetaTag('name', 'description', project.description);
        this.updateMetaTag('property', 'og:title', project.title);
        this.updateMetaTag('property', 'og:description', project.description);
        this.updateMetaTag('property', 'og:image', project.image);
        this.updateMetaTag('name', 'twitter:title', project.title);
        this.updateMetaTag('name', 'twitter:description', project.description);
        this.updateMetaTag('name', 'twitter:image', project.image);
    }

    updateMetaTag(attribute, name, content) {
        let tag = document.querySelector(`meta[${attribute}="${name}"]`);
        if (!tag) {
            tag = document.createElement('meta');
            tag.setAttribute(attribute, name);
            document.head.appendChild(tag);
        }
        tag.content = content;
    }

    restoreOriginalMetaTags() {
        if (!this.originalMetaTags) return;

        document.title = this.originalMetaTags.title;
        
        if (this.originalMetaTags.description) {
            this.updateMetaTag('name', 'description', this.originalMetaTags.description);
        }
        if (this.originalMetaTags.ogTitle) {
            this.updateMetaTag('property', 'og:title', this.originalMetaTags.ogTitle);
        }
        if (this.originalMetaTags.ogDescription) {
            this.updateMetaTag('property', 'og:description', this.originalMetaTags.ogDescription);
        }
        if (this.originalMetaTags.ogImage) {
            this.updateMetaTag('property', 'og:image', this.originalMetaTags.ogImage);
        }
    }

    pauseBackgroundAnimations() {
        // Pause any background animations when modal is open
        const heroSection = document.getElementById('hero');
        if (heroSection) {
            heroSection.style.animationPlayState = 'paused';
        }
    }

    resumeBackgroundAnimations() {
        // Resume background animations when modal is closed
        const heroSection = document.getElementById('hero');
        if (heroSection) {
            heroSection.style.animationPlayState = 'running';
        }
    }

    // Analytics methods
    trackProjectsSectionView() {
        if (window.gtag && projectsConfig.analytics.trackProjectViews) {
            window.gtag('event', 'page_view', {
                page_title: 'Projects Section',
                page_location: window.location.href + '#projects'
            });
        }
    }

    trackFilterUsage(filters) {
        if (!window.gtag) return;

        Object.entries(filters).forEach(([filterType, filterValue]) => {
            if (filterValue && filterValue !== 'all' && filterValue !== '') {
                window.gtag('event', 'filter_used', {
                    event_category: 'Projects',
                    event_label: `${filterType}:${filterValue}`,
                    value: 1
                });
            }
        });
    }

    trackProjectModalOpen(projectId) {
        if (window.gtag && projectsConfig.analytics.trackModalOpens) {
            window.gtag('event', 'project_view', {
                event_category: 'Projects',
                event_label: projectId,
                value: 1
            });
        }
    }

    // Public API methods for projects
    getProjectGallery() {
        return this.projectGallery;
    }

    getProjectFilter() {
        return this.projectFilter;
    }

    getGitHubAPI() {
        return this.githubAPI;
    }

    // Error handling for projects
    handleProjectsError(error, context = 'projects') {
        console.error(`Projects error in ${context}:`, error);
        
        // Show user-friendly error message
        this.showErrorNotification(
            projectsConfig.errors?.[context] || 'Ha ocurrido un error en los proyectos.'
        );
        
        // Track error for analytics
        if (window.gtag) {
            window.gtag('event', 'exception', {
                description: `Projects error: ${error.message}`,
                fatal: false
            });
        }
    }

    showErrorNotification(message) {
        // Create or show error notification
        // This could integrate with your notification system
        console.error('User notification:', message);
    }

    // Custom event emitter
    emit(eventName, data) {
        const event = new CustomEvent(eventName, { detail: data });
        document.dispatchEvent(event);
    }

    // Cleanup methods
    destroyProjects() {
        if (this.projectGallery) {
            this.projectGallery.destroy();
            this.projectGallery = null;
        }
        
        if (this.projectFilter) {
            this.projectFilter.destroy();
            this.projectFilter = null;
        }
        
        if (this.githubAPI) {
            this.githubAPI.clearCache();
            this.githubAPI = null;
        }
        
        this.isProjectsInitialized = false;
    }

    // Add to existing destroy method
    destroy() {
        // ... existing cleanup
        this.destroyProjects();
    }
}

// Update DOMContentLoaded listener to include projects
document.addEventListener('DOMContentLoaded', async () => {
    try {
        const app = new PortfolioApp();
        await app.init();
        
        // Make app globally available for debugging
        window.portfolioApp = app;
        
    } catch (error) {
        console.error('Failed to initialize portfolio app:', error);
    }
});