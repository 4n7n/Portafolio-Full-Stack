class ExperienceTimeline {
  constructor(options = {}) {
    this.options = {
      container: '#experience-timeline',
      filtersContainer: '.experience-filters',
      achievementsContainer: '.achievements-summary',
      testimonialsContainer: '#testimonials-container',
      animationDelay: 100,
      scrollOffset: 100,
      ...options
    };

    this.container = null;
    this.filtersContainer = null;
    this.achievementsContainer = null;
    this.testimonialsContainer = null;
    
    this.currentFilter = 'all';
    this.experiences = [];
    this.testimonials = [];
    this.achievements = {};
    
    this.observers = [];
    this.isInitialized = false;

    this.init();
  }

  async init() {
    try {
      this.container = document.querySelector(this.options.container);
      this.filtersContainer = document.querySelector(this.options.filtersContainer);
      this.achievementsContainer = document.querySelector(this.options.achievementsContainer);
      this.testimonialsContainer = document.querySelector(this.options.testimonialsContainer);

      if (!this.container) {
        throw new Error('Experience timeline container not found');
      }

      // Load data
      await this.loadData();
      
      // Setup components
      this.setupFilters();
      this.renderTimeline();
      this.renderTestimonials();
      this.updateAchievements();
      this.setupAnimations();
      this.setupSkillsIntegration();

      this.isInitialized = true;
      this.emit('timeline:initialized');

    } catch (error) {
      console.error('Experience Timeline initialization failed:', error);
      this.handleError(error);
    }
  }

  /**
   * Load experience data
   */
  async loadData() {
    try {
      // Load experience data
      if (window.portfolioData?.experience) {
        this.experiences = window.portfolioData.experience;
      } else {
        const { default: experienceData } = await import('../data/experience.js');
        this.experiences = experienceData;
      }

      // Load testimonials data
      if (window.portfolioData?.testimonials) {
        this.testimonials = window.portfolioData.testimonials;
      } else {
        const { default: testimonialsData } = await import('../data/testimonials.js');
        this.testimonials = testimonialsData;
      }

      // Calculate achievements
      this.calculateAchievements();

    } catch (error) {
      console.error('Failed to load experience data:', error);
      // Fallback to mock data or show error state
      this.experiences = this.getMockData();
    }
  }

  /**
   * Calculate achievement statistics
   */
  calculateAchievements() {
    const now = new Date();
    const workExperiences = this.experiences.filter(exp => exp.type === 'work');
    const uniqueCompanies = new Set(this.experiences.map(exp => exp.company)).size;
    const totalProjects = this.experiences.reduce((sum, exp) => sum + (exp.projectsCount || 0), 0);
    const certifications = this.experiences.filter(exp => exp.type === 'education' && exp.isCertification).length;

    // Calculate years of experience
    let totalMonths = 0;
    workExperiences.forEach(exp => {
      const startDate = new Date(exp.startDate);
      const endDate = exp.endDate ? new Date(exp.endDate) : now;
      const months = (endDate.getFullYear() - startDate.getFullYear()) * 12 + 
                    (endDate.getMonth() - startDate.getMonth());
      totalMonths += months;
    });

    this.achievements = {
      experience: Math.round(totalMonths / 12 * 10) / 10,
      companies: uniqueCompanies,
      projects: totalProjects,
      certifications: certifications
    };
  }

  /**
   * Setup filter functionality
   */
  setupFilters() {
    if (!this.filtersContainer) return;

    const filterButtons = this.filtersContainer.querySelectorAll('.filter-btn');
    
    // Update filter counts
    this.updateFilterCounts();

    // Add event listeners
    filterButtons.forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        const filter = btn.dataset.filter;
        this.setFilter(filter);
      });
    });
  }

  /**
   * Update filter counts
   */
  updateFilterCounts() {
    const counts = {
      all: this.experiences.length,
      work: this.experiences.filter(exp => exp.type === 'work').length,
      freelance: this.experiences.filter(exp => exp.type === 'freelance').length,
      education: this.experiences.filter(exp => exp.type === 'education').length
    };

    Object.entries(counts).forEach(([filter, count]) => {
      const countElement = this.filtersContainer?.querySelector(`[data-count="${filter}"]`);
      if (countElement) {
        countElement.textContent = count;
      }
    });
  }

  /**
   * Set active filter
   */
  setFilter(filter) {
    if (this.currentFilter === filter) return;

    this.currentFilter = filter;

    // Update button states
    const filterButtons = this.filtersContainer?.querySelectorAll('.filter-btn');
    filterButtons?.forEach(btn => {
      const isActive = btn.dataset.filter === filter;
      btn.classList.toggle('active', isActive);
      btn.setAttribute('aria-selected', isActive);
    });

    // Filter timeline items
    this.filterTimeline();
    
    // Update skills highlighting if integration exists
    this.updateSkillsHighlighting();

    this.emit('timeline:filtered', { filter });
  }

  /**
   * Filter timeline items
   */
  filterTimeline() {
    const timelineItems = this.container?.querySelectorAll('.timeline-item');
    
    timelineItems?.forEach((item, index) => {
      const experienceType = item.dataset.type;
      const shouldShow = this.currentFilter === 'all' || experienceType === this.currentFilter;
      
      item.classList.toggle('filtered-out', !shouldShow);
      
      // Stagger animation for showing items
      if (shouldShow) {
        setTimeout(() => {
          item.classList.add('visible');
        }, index * this.options.animationDelay);
      } else {
        item.classList.remove('visible');
      }
    });
  }

  /**
   * Render timeline
   */
  renderTimeline() {
    const timelineItemsContainer = this.container?.querySelector('.timeline-items');
    if (!timelineItemsContainer) return;

    // Clear loading state
    timelineItemsContainer.innerHTML = '';

    // Sort experiences by date (newest first)
    const sortedExperiences = [...this.experiences].sort((a, b) => {
      const dateA = new Date(a.startDate);
      const dateB = new Date(b.startDate);
      return dateB - dateA;
    });

    // Render each experience
    sortedExperiences.forEach((experience, index) => {
      const timelineItem = this.createTimelineItem(experience, index);
      timelineItemsContainer.appendChild(timelineItem);
    });

    // Initial filter application
    this.filterTimeline();
  }

  /**
   * Create timeline item element
   */
  createTimelineItem(experience, index) {
    const item = document.createElement('div');
    item.className = 'timeline-item';
    item.dataset.type = experience.type;
    item.dataset.index = index;

    const duration = this.formatDuration(experience.startDate, experience.endDate);
    const skillsHTML = experience.skills ? this.renderSkillsTags(experience.skills) : '';
    const achievementsHTML = experience.achievements ? this.renderAchievements(experience.achievements) : '';
    const companyLinkHTML = experience.companyUrl ? 
      `<a href="${experience.companyUrl}" target="_blank" rel="noopener" class="company-link">
        <span>Ver empresa</span>
        <i data-lucide="external-link"></i>
      </a>` : '';

    item.innerHTML = `
      <div class="timeline-point"></div>
      <div class="experience-card">
        <div class="card-header">
          <div class="card-title">
            <h3 class="experience-title">${experience.title}</h3>
            <div class="experience-company">${experience.company}</div>
            <div class="experience-location">
              <i data-lucide="map-pin"></i>
              <span>${experience.location}</span>
            </div>
          </div>
          <div class="card-meta">
            <div class="experience-duration">${duration}</div>
            <span class="experience-type ${experience.type}">${this.getTypeLabel(experience.type)}</span>
          </div>
        </div>
        
        <div class="experience-description">
          ${experience.description}
        </div>
        
        ${achievementsHTML}
        ${skillsHTML}
        ${companyLinkHTML}
      </div>
    `;

    return item;
  }

  /**
   * Render skills tags
   */
  renderSkillsTags(skills) {
    if (!skills || skills.length === 0) return '';

    const tagsHTML = skills.map(skill => 
      `<span class="skill-tag" data-skill="${skill.toLowerCase()}">${skill}</span>`
    ).join('');

    return `
      <div class="experience-skills">
        <h4 class="skills-title">
          <i data-lucide="code"></i>
          <span>Tecnologías</span>
        </h4>
        <div class="skills-tags">
          ${tagsHTML}
        </div>
      </div>
    `;
  }

  /**
   * Render achievements list
   */
  renderAchievements(achievements) {
    if (!achievements || achievements.length === 0) return '';

    const achievementsHTML = achievements.map(achievement => 
      `<li>${achievement}</li>`
    ).join('');

    return `
      <div class="experience-achievements">
        <h4 class="achievements-title">
          <i data-lucide="trophy"></i>
          <span>Logros destacados</span>
        </h4>
        <ul class="achievements-list">
          ${achievementsHTML}
        </ul>
      </div>
    `;
  }

  /**
   * Format duration string
   */
  formatDuration(startDate, endDate) {
    const start = new Date(startDate);
    const end = endDate ? new Date(endDate) : new Date();
    
    const startMonth = start.toLocaleDateString('es-ES', { month: 'short', year: 'numeric' });
    const endMonth = endDate ? 
      end.toLocaleDateString('es-ES', { month: 'short', year: 'numeric' }) : 
      'Presente';

    const months = (end.getFullYear() - start.getFullYear()) * 12 + 
                  (end.getMonth() - start.getMonth());
    
    const years = Math.floor(months / 12);
    const remainingMonths = months % 12;
    
    let durationText = '';
    if (years > 0) {
      durationText += `${years} año${years > 1 ? 's' : ''}`;
      if (remainingMonths > 0) {
        durationText += ` ${remainingMonths} mes${remainingMonths > 1 ? 'es' : ''}`;
      }
    } else {
      durationText = `${months} mes${months > 1 ? 'es' : ''}`;
    }

    return `${startMonth} - ${endMonth} • ${durationText}`;
  }

  /**
   * Get type label
   */
  getTypeLabel(type) {
    const labels = {
      work: 'Trabajo',
      freelance: 'Freelance',
      education: 'Educación'
    };
    return labels[type] || type;
  }

  /**
   * Render testimonials
   */
  renderTestimonials() {
    if (!this.testimonialsContainer || !this.testimonials.length) return;

    // Show featured testimonials (max 3)
    const featuredTestimonials = this.testimonials
      .filter(t => t.featured)
      .slice(0, 3);

    if (featuredTestimonials.length === 0) return;

    const testimonialsHTML = featuredTestimonials.map(testimonial => `
      <div class="testimonial-card">
        <div class="testimonial-content">
          ${testimonial.content}
        </div>
        <div class="testimonial-author">
          <img 
            src="${testimonial.author.avatar || '/assets/images/default-avatar.jpg'}" 
            alt="${testimonial.author.name}"
            class="author-avatar"
            loading="lazy"
          >
          <div class="author-info">
            <div class="author-name">${testimonial.author.name}</div>
            <div class="author-role">
              ${testimonial.author.role}
              <span class="author-company">@ ${testimonial.author.company}</span>
            </div>
          </div>
        </div>
      </div>
    `).join('');

    this.testimonialsContainer.innerHTML = testimonialsHTML;
  }

  /**
   * Update achievements counters
   */
  updateAchievements() {
    if (!this.achievementsContainer) return;

    const counters = this.achievementsContainer.querySelectorAll('.achievement-number');
    
    counters.forEach(counter => {
      const target = this.getAchievementValue(counter);
      if (target !== null) {
        counter.dataset.target = target;
        this.animateCounter(counter, target);
      }
    });
  }

  /**
   * Get achievement value by context
   */
  getAchievementValue(element) {
    const text = element.nextElementSibling?.textContent?.toLowerCase() || '';
    
    if (text.includes('experiencia')) return this.achievements.experience;
    if (text.includes('empresas')) return this.achievements.companies;
    if (text.includes('proyectos')) return this.achievements.projects;
    if (text.includes('certificaciones')) return this.achievements.certifications;
    
    return null;
  }

  /**
   * Animate counter
   */
  animateCounter(element, target) {
    let current = 0;
    const increment = target / 50;
    const timer = setInterval(() => {
      current += increment;
      if (current >= target) {
        element.textContent = target;
        clearInterval(timer);
      } else {
        element.textContent = Math.floor(current);
      }
    }, 30);
  }

  /**
   * Setup scroll animations
   */
  setupAnimations() {
    // Intersection Observer for timeline items
    const timelineObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    }, {
      threshold: 0.1,
      rootMargin: `${this.options.scrollOffset}px`
    });

    // Observe timeline items
    const timelineItems = this.container?.querySelectorAll('.timeline-item');
    timelineItems?.forEach(item => {
      timelineObserver.observe(item);
    });

    // Intersection Observer for achievements
    const achievementsObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const counters = entry.target.querySelectorAll('[data-animate="counter"]');
          counters.forEach(counter => {
            const numberElement = counter.querySelector('.achievement-number');
            const target = parseFloat(numberElement.dataset.target);
            if (target && !counter.dataset.animated) {
              counter.dataset.animated = 'true';
              this.animateCounter(numberElement, target);
            }
          });
        }
      });
    }, { threshold: 0.5 });

    // Observe achievements section
    if (this.achievementsContainer) {
      achievementsObserver.observe(this.achievementsContainer);
    }

    this.observers.push(timelineObserver, achievementsObserver);
  }

  /**
   * Setup skills integration
   */
  setupSkillsIntegration() {
    // Listen for skills hover events
    document.addEventListener('skill:hover', (e) => {
      this.highlightSkillInTimeline(e.detail.skill);
    });

    // Add click handlers to skill tags in timeline
    this.container?.addEventListener('click', (e) => {
      if (e.target.classList.contains('skill-tag')) {
        const skill = e.target.dataset.skill;
        this.emit('timeline:skill-selected', { skill });
        
        // Highlight in skills section if available
        const skillsSection = document.querySelector('#skills');
        if (skillsSection) {
          const skillElement = skillsSection.querySelector(`[data-skill="${skill}"]`);
          if (skillElement) {
            skillElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
            skillElement.classList.add('highlighted');
            setTimeout(() => skillElement.classList.remove('highlighted'), 2000);
          }
        }
      }
    });
  }

  /**
   * Highlight skill in timeline
   */
  highlightSkillInTimeline(skill) {
    const skillTags = this.container?.querySelectorAll('.skill-tag');
    skillTags?.forEach(tag => {
      tag.classList.toggle('highlighted', tag.dataset.skill === skill.toLowerCase());
    });
  }

  /**
   * Update skills highlighting based on current filter
   */
  updateSkillsHighlighting() {
    // Get skills for current filter
    const filteredExperiences = this.currentFilter === 'all' ? 
      this.experiences : 
      this.experiences.filter(exp => exp.type === this.currentFilter);

    const relevantSkills = new Set();
    filteredExperiences.forEach(exp => {
      exp.skills?.forEach(skill => relevantSkills.add(skill.toLowerCase()));
    });

    // Emit event for skills section
    this.emit('timeline:skills-updated', { 
      skills: Array.from(relevantSkills),
      filter: this.currentFilter 
    });
  }

  /**
   * Get mock data for fallback
   */
  getMockData() {
    return [
      {
        id: 1,
        title: "Frontend Developer",
        company: "Tech Company",
        location: "Madrid, España",
        type: "work",
        startDate: "2023-01-01",
        endDate: null,
        description: "Desarrollo de aplicaciones web modernas con React y TypeScript.",
        skills: ["React", "TypeScript", "Tailwind CSS"],
        achievements: ["Implementé una nueva arquitectura que mejoró el rendimiento en 40%"],
        projectsCount: 5,
        companyUrl: "https://techcompany.com"
      }
    ];
  }

  /**
   * Handle errors
   */
  handleError(error) {
    console.error('Experience Timeline Error:', error);
    
    // Show error state
    if (this.container) {
      this.container.innerHTML = `
        <div class="timeline-error">
          <p>Error al cargar la experiencia profesional.</p>
          <button onclick="location.reload()">Reintentar</button>
        </div>
      `;
    }
  }

  /**
   * Emit custom events
   */
  emit(eventName, detail = {}) {
    const event = new CustomEvent(eventName, { detail });
    document.dispatchEvent(event);
  }

  /**
   * Cleanup
   */
  destroy() {
    this.observers.forEach(observer => observer.disconnect());
    this.observers = [];
    this.isInitialized = false;
  }
}

export default ExperienceTimeline;