
import { DOMHelpers } from '../utils/dom-helpers.js';
import { EXPERIENCE_DATA } from '../data/experience.js';

/**
 * Componente Timeline de Experiencia
 */
export class ExperienceTimeline {
  constructor(containerSelector = '#experience-timeline') {
    this.container = DOMHelpers.select(containerSelector);
    this.timelineItems = [];
    this.currentFilter = 'all';
    this.animationObserver = null;

    this.init();
  }

  /**
   * Inicializa el componente
   */
  init() {
    if (!this.container) {
      console.warn('Contenedor de timeline no encontrado');
      return;
    }

    this.render();
    this.setupFilters();
    this.setupAnimations();
    this.setupInteractions();
  }

  /**
   * Renderiza el timeline completo
   */
  render() {
    const timelineData = this.prepareTimelineData();
    
    const timelineHTML = `
      <div class="timeline-container">
        <div class="timeline-filters">
          ${this.renderFilters()}
        </div>
        <div class="timeline-wrapper">
          <div class="timeline-line"></div>
          ${timelineData.map((item, index) => this.renderTimelineItem(item, index)).join('')}
        </div>
        <div class="timeline-stats">
          ${this.renderStats()}
        </div>
      </div>
    `;

    this.container.innerHTML = timelineHTML;
    this.timelineItems = this.container.querySelectorAll('.timeline-item');
  }

  /**
   * Prepara los datos del timeline combinando todas las fuentes
   */
  prepareTimelineData() {
    const items = [];

    // Agregar experiencia profesional
    EXPERIENCE_DATA.professional.forEach(exp => {
      items.push({
        id: `work-${exp.id}`,
        type: 'work',
        title: exp.position,
        subtitle: exp.company,
        description: exp.description,
        startDate: exp.startDate,
        endDate: exp.endDate,
        current: exp.current,
        location: exp.location,
        technologies: exp.technologies,
        achievements: exp.achievements,
        logo: exp.logo
      });
    });

    // Agregar educación
    EXPERIENCE_DATA.education.forEach(edu => {
      items.push({
        id: `edu-${edu.id}`,
        type: 'education',
        title: edu.degree,
        subtitle: edu.institution,
        description: edu.description,
        startDate: edu.startDate,
        endDate: edu.endDate,
        location: edu.location,
        grade: edu.grade,
        subjects: edu.subjects,
        logo: edu.logo
      });
    });

    // Agregar cursos importantes
    EXPERIENCE_DATA.courses.forEach(course => {
      if (course.duration.includes('horas') && parseInt(course.duration) >= 20) {
        items.push({
          id: `course-${course.id}`,
          type: 'course',
          title: course.title,
          subtitle: course.provider,
          description: `Curso de ${course.duration}`,
          startDate: course.startDate,
          endDate: course.endDate,
          skills: course.skills,
          certificateUrl: course.certificateUrl
        });
      }
    });

    // Ordenar por fecha (más reciente primero)
    return items.sort((a, b) => {
      const dateA = new Date(a.startDate);
      const dateB = new Date(b.startDate);
      return dateB - dateA;
    });
  }

  /**
   * Renderiza los filtros
   */
  renderFilters() {
    const filters = [
      { id: 'all', label: 'Todo', icon: 'list' },
      { id: 'work', label: 'Trabajo', icon: 'briefcase' },
      { id: 'education', label: 'Educación', icon: 'graduation-cap' },
      { id: 'course', label: 'Cursos', icon: 'book-open' }
    ];

    return filters.map(filter => `
      <button class="timeline-filter ${filter.id === 'all' ? 'active' : ''}" 
              data-filter="${filter.id}">
        <i class="icon-${filter.icon}"></i>
        <span>${filter.label}</span>
      </button>
    `).join('');
  }

  /**
   * Renderiza un item del timeline
   */
  renderTimelineItem(item, index) {
    const isEven = index % 2 === 0;
    const duration = this.calculateDuration(item.startDate, item.endDate);
    
    return `
      <div class="timeline-item ${item.type} ${isEven ? 'left' : 'right'}" 
           data-type="${item.type}" 
           data-aos="fade-${isEven ? 'right' : 'left'}"
           data-aos-delay="${index * 100}">
        
        <div class="timeline-dot">
          <div class="timeline-dot-inner ${item.current ? 'current' : ''}">
            ${this.getTypeIcon(item.type)}
          </div>
        </div>

        <div class="timeline-content">
          <div class="timeline-card">
            ${item.logo ? `<div class="timeline-logo">
              <img src="${item.logo}" alt="${item.subtitle}" loading="lazy">
            </div>` : ''}
            
            <div class="timeline-header">
              <h3 class="timeline-title">${item.title}</h3>
              <h4 class="timeline-subtitle">${item.subtitle}</h4>
              <div class="timeline-meta">
                <span class="timeline-duration">${duration}</span>
                ${item.current ? '<span class="timeline-current">Actual</span>' : ''}
                ${item.location ? `<span class="timeline-location">${item.location}</span>` : ''}
              </div>
            </div>

            <div class="timeline-body">
              <p class="timeline-description">${item.description}</p>
              
              ${item.achievements ? `
                <div class="timeline-achievements">
                  <h5>Logros principales:</h5>
                  <ul>
                    ${item.achievements.slice(0, 3).map(achievement => 
                      `<li>${achievement}</li>`
                    ).join('')}
                  </ul>
                </div>
              ` : ''}

              ${item.technologies ? `
                <div class="timeline-technologies">
                  ${item.technologies.map(tech => 
                    `<span class="tech-tag">${tech}</span>`
                  ).join('')}
                </div>
              ` : ''}

              ${item.skills ? `
                <div class="timeline-skills">
                  ${item.skills.map(skill => 
                    `<span class="skill-tag">${skill}</span>`
                  ).join('')}
                </div>
              ` : ''}

              ${item.grade ? `
                <div class="timeline-grade">
                  <strong>Nota media:</strong> ${item.grade}
                </div>
              ` : ''}
            </div>

            <div class="timeline-footer">
              <div class="timeline-dates">
                <span class="start-date">${this.formatDate(item.startDate)}</span>
                <span class="date-separator">—</span>
                <span class="end-date">
                  ${item.current ? 'Presente' : this.formatDate(item.endDate)}
                </span>
              </div>

              ${item.certificateUrl ? `
                <a href="${item.certificateUrl}" 
                   target="_blank" 
                   class="timeline-certificate-link">
                  <i class="icon-external-link"></i>
                  Ver certificado
                </a>
              ` : ''}
            </div>
          </div>
        </div>
      </div>
    `;
  }

  /**
   * Renderiza estadísticas
   */
  renderStats() {
    const stats = this.calculateStats();
    
    return `
      <div class="timeline-statistics">
        <div class="stat-item">
          <span class="stat-number">${stats.totalExperience}</span>
          <span class="stat-label">Años de experiencia</span>
        </div>
        <div class="stat-item">
          <span class="stat-number">${stats.totalJobs}</span>
          <span class="stat-label">Trabajos</span>
        </div>
        <div class="stat-item">
          <span class="stat-number">${stats.totalEducation}</span>
          <span class="stat-label">Formación</span>
        </div>
        <div class="stat-item">
          <span class="stat-number">${stats.totalCertifications}</span>
          <span class="stat-label">Certificaciones</span>
        </div>
      </div>
    `;
  }

  /**
   * Obtiene el icono por tipo
   */
  getTypeIcon(type) {
    const icons = {
      work: '<i class="icon-briefcase"></i>',
      education: '<i class="icon-graduation-cap"></i>',
      course: '<i class="icon-book-open"></i>'
    };
    return icons[type] || '<i class="icon-circle"></i>';
  }

  /**
   * Calcula la duración entre fechas
   */
  calculateDuration(startDate, endDate) {
    const start = new Date(startDate);
    const end = endDate ? new Date(endDate) : new Date();
    
    const diffTime = Math.abs(end - start);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    const diffMonths = Math.floor(diffDays / 30);
    const diffYears = Math.floor(diffMonths / 12);
    
    if (diffYears > 0) {
      const remainingMonths = diffMonths % 12;
      if (remainingMonths > 0) {
        return `${diffYears} año${diffYears > 1 ? 's' : ''} ${remainingMonths} mes${remainingMonths > 1 ? 'es' : ''}`;
      }
      return `${diffYears} año${diffYears > 1 ? 's' : ''}`;
    } else if (diffMonths > 0) {
      return `${diffMonths} mes${diffMonths > 1 ? 'es' : ''}`;
    } else {
      return `${diffDays} día${diffDays > 1 ? 's' : ''}`;
    }
  }

  /**
   * Formatea fechas
   */
  formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('es-ES', {
      month: 'short',
      year: 'numeric'
    });
  }

  /**
   * Calcula estadísticas
   */
  calculateStats() {
    const now = new Date();
    let earliestStart = now;
    
    // Encontrar la fecha de inicio más temprana en trabajos
    EXPERIENCE_DATA.professional.forEach(exp => {
      const startDate = new Date(exp.startDate);
      if (startDate < earliestStart) {
        earliestStart = startDate;
      }
    });

    const experienceYears = Math.floor((now - earliestStart) / (1000 * 60 * 60 * 24 * 365));

    return {
      totalExperience: experienceYears,
      totalJobs: EXPERIENCE_DATA.professional.length,
      totalEducation: EXPERIENCE_DATA.education.length,
      totalCertifications: EXPERIENCE_DATA.courses.length
    };
  }

  /**
   * Configura los filtros
   */
  setupFilters() {
    const filters = this.container.querySelectorAll('.timeline-filter');
    
    filters.forEach(filter => {
      filter.addEventListener('click', () => {
        const filterType = filter.dataset.filter;
        this.applyFilter(filterType);
        
        // Actualizar estado activo
        filters.forEach(f => f.classList.remove('active'));
        filter.classList.add('active');
      });
    });
  }

  /**
   * Aplica filtro al timeline
   */
  applyFilter(filterType) {
    this.currentFilter = filterType;
    
    this.timelineItems.forEach(item => {
      const itemType = item.dataset.type;
      
      if (filterType === 'all' || itemType === filterType) {
        item.style.display = 'block';
        item.classList.add('visible');
      } else {
        item.style.display = 'none';
        item.classList.remove('visible');
      }
    });

    // Reactivar animaciones para elementos visibles
    this.refreshAnimations();
  }

  /**
   * Configura animaciones
   */
  setupAnimations() {
    // Intersection Observer para animaciones al hacer scroll
    this.animationObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-in');
        }
      });
    }, {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    });

    // Observar todos los items del timeline
    this.timelineItems.forEach(item => {
      this.animationObserver.observe(item);
    });

    // Animación de la línea de tiempo
    this.animateTimelineLine();
  }

  /**
   * Anima la línea principal del timeline
   */
  animateTimelineLine() {
    const timelineLine = this.container.querySelector('.timeline-line');
    if (!timelineLine) return;

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          timelineLine.classList.add('animate');
        }
      });
    }, { threshold: 0.1 });

    observer.observe(timelineLine);
  }

  /**
   * Refresca las animaciones después de filtrar
   */
  refreshAnimations() {
    // Remover clases de animación
    this.timelineItems.forEach(item => {
      item.classList.remove('animate-in');
    });

    // Volver a observar elementos visibles
    setTimeout(() => {
      const visibleItems = this.container.querySelectorAll('.timeline-item.visible');
      visibleItems.forEach((item, index) => {
        setTimeout(() => {
          item.classList.add('animate-in');
        }, index * 100);
      });
    }, 100);
  }

  /**
   * Configura interacciones adicionales
   */
  setupInteractions() {
    // Click en items para expandir/colapsar detalles
    this.timelineItems.forEach(item => {
      const card = item.querySelector('.timeline-card');
      if (card) {
        card.addEventListener('click', () => {
          this.toggleItemDetails(item);
        });
      }
    });

    // Navegación por teclado
    this.setupKeyboardNavigation();
  }

  /**
   * Alterna detalles de un item
   */
  toggleItemDetails(item) {
    const achievements = item.querySelector('.timeline-achievements');
    const isExpanded = item.classList.contains('expanded');

    if (isExpanded) {
      item.classList.remove('expanded');
      if (achievements) {
        achievements.style.maxHeight = '0';
      }
    } else {
      item.classList.add('expanded');
      if (achievements) {
        achievements.style.maxHeight = achievements.scrollHeight + 'px';
      }
    }
  }

  /**
   * Configura navegación por teclado
   */
  setupKeyboardNavigation() {
    this.container.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        const focusedElement = document.activeElement;
        if (focusedElement.classList.contains('timeline-filter')) {
          e.preventDefault();
          focusedElement.click();
        }
      }
    });
  }

  /**
   * Métodos públicos
   */
  
  /**
   * Actualiza el timeline con nuevos datos
   */
  updateTimeline(newData) {
    if (newData) {
      // Actualizar datos y re-renderizar
      Object.assign(EXPERIENCE_DATA, newData);
      this.render();
      this.setupFilters();
      this.setupAnimations();
      this.setupInteractions();
    }
  }

  /**
   * Navega a un item específico
   */
  navigateToItem(itemId) {
    const item = this.container.querySelector(`[data-id="${itemId}"]`);
    if (item) {
      item.scrollIntoView({ behavior: 'smooth', block: 'center' });
      item.classList.add('highlight');
      setTimeout(() => item.classList.remove('highlight'), 2000);
    }
  }

  /**
   * Obtiene estadísticas actuales
   */
  getStats() {
    return this.calculateStats();
  }

  /**
   * Destructor del componente
   */
  destroy() {
    if (this.animationObserver) {
      this.animationObserver.disconnect();
    }
  }
}

// Auto-inicialización
DOMHelpers.ready(() => {
  const timelineContainer = DOMHelpers.select('#experience-timeline');
  if (timelineContainer) {
    window.experienceTimelineInstance = new ExperienceTimeline('#experience-timeline');
  }
});