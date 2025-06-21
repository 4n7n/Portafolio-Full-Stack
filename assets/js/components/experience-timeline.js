import { DOMHelpers } from '../utils/dom-helpers.js';
import { EXPERIENCE_DATA } from '../data/experience.js';

/**
 * Componente Timeline de Experiencia
 */
export class ExperienceTimeline {
  constructor(containerSelector = '#experience-timeline') {
    this.container = DOMHelpers?.select ? DOMHelpers.select(containerSelector) : document.querySelector(containerSelector);
    this.timelineItems = [];
    this.currentFilter = 'all';
    this.animationObserver = null;
    this.lineAnimationObserver = null;
    this.eventListeners = [];
    this.containerSelector = containerSelector;

    if (!this.container) {
      console.warn(`ExperienceTimeline: Contenedor "${containerSelector}" no encontrado`);
      return;
    }

    this.init();
  }

  /**
   * Inicializa el componente
   */
  init() {
    if (!this.container) {
      console.warn('ExperienceTimeline: No se puede inicializar sin contenedor');
      return false;
    }

    try {
      this.render();
      this.setupFilters();
      this.setupAnimations();
      this.setupInteractions();
      console.log('✅ ExperienceTimeline: Inicializado correctamente');
      return true;
    } catch (error) {
      console.error('❌ Error al inicializar ExperienceTimeline:', error);
      return false;
    }
  }

  /**
   * Renderiza el timeline completo
   */
  render() {
    try {
      const timelineData = this.prepareTimelineData();
      
      if (!timelineData || timelineData.length === 0) {
        this.container.innerHTML = '<div class="timeline-empty">No hay datos de experiencia disponibles</div>';
        return;
      }
      
      const timelineHTML = `
        <div class="timeline-container">
          <div class="timeline-filters">
            ${this.renderFilters()}
          </div>
          <div class="timeline-wrapper">
            <div class="timeline-line" aria-hidden="true"></div>
            ${timelineData.map((item, index) => this.renderTimelineItem(item, index)).join('')}
          </div>
          <div class="timeline-stats">
            ${this.renderStats()}
          </div>
        </div>
      `;

      this.container.innerHTML = timelineHTML;
      this.timelineItems = Array.from(this.container.querySelectorAll('.timeline-item'));
    } catch (error) {
      console.error('Error al renderizar timeline:', error);
      this.container.innerHTML = '<div class="timeline-error">Error al cargar el timeline</div>';
    }
  }

  /**
   * Prepara los datos del timeline combinando todas las fuentes
   */
  prepareTimelineData() {
    if (!EXPERIENCE_DATA) {
      console.warn('EXPERIENCE_DATA no está disponible');
      return [];
    }

    const items = [];

    try {
      // Agregar experiencia profesional
      if (Array.isArray(EXPERIENCE_DATA.professional)) {
        EXPERIENCE_DATA.professional.forEach((exp, index) => {
          if (exp && exp.position && exp.company) {
            items.push({
              id: `work-${exp.id || index}`,
              type: 'work',
              title: exp.position,
              subtitle: exp.company,
              description: exp.description || '',
              startDate: exp.startDate,
              endDate: exp.endDate,
              current: exp.current || false,
              location: exp.location,
              technologies: Array.isArray(exp.technologies) ? exp.technologies : [],
              achievements: Array.isArray(exp.achievements) ? exp.achievements : [],
              logo: exp.logo
            });
          }
        });
      }

      // Agregar educación
      if (Array.isArray(EXPERIENCE_DATA.education)) {
        EXPERIENCE_DATA.education.forEach((edu, index) => {
          if (edu && edu.degree && edu.institution) {
            items.push({
              id: `edu-${edu.id || index}`,
              type: 'education',
              title: edu.degree,
              subtitle: edu.institution,
              description: edu.description || '',
              startDate: edu.startDate,
              endDate: edu.endDate,
              location: edu.location,
              grade: edu.grade,
              subjects: Array.isArray(edu.subjects) ? edu.subjects : [],
              logo: edu.logo
            });
          }
        });
      }

      // Agregar cursos importantes
      if (Array.isArray(EXPERIENCE_DATA.courses)) {
        EXPERIENCE_DATA.courses.forEach((course, index) => {
          if (course && course.title && course.provider) {
            // Filtrar solo cursos importantes (más de 20 horas)
            const duration = course.duration || '';
            const hoursMatch = duration.match(/(\d+)\s*horas?/i);
            const hours = hoursMatch ? parseInt(hoursMatch[1]) : 0;
            
            if (hours >= 20) {
              items.push({
                id: `course-${course.id || index}`,
                type: 'course',
                title: course.title,
                subtitle: course.provider,
                description: `Curso de ${course.duration}`,
                startDate: course.startDate,
                endDate: course.endDate,
                skills: Array.isArray(course.skills) ? course.skills : [],
                certificateUrl: course.certificateUrl
              });
            }
          }
        });
      }

      // Ordenar por fecha (más reciente primero)
      return items.sort((a, b) => {
        const dateA = this.parseDate(a.startDate);
        const dateB = this.parseDate(b.startDate);
        return dateB - dateA;
      });

    } catch (error) {
      console.error('Error al preparar datos del timeline:', error);
      return [];
    }
  }

  /**
   * Parsea fechas de forma segura
   */
  parseDate(dateString) {
    if (!dateString) return new Date(0);
    const date = new Date(dateString);
    return isNaN(date.getTime()) ? new Date(0) : date;
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
              data-filter="${filter.id}"
              type="button"
              aria-label="Filtrar por ${filter.label}">
        <i class="icon-${filter.icon}" aria-hidden="true"></i>
        <span>${filter.label}</span>
      </button>
    `).join('');
  }

  /**
   * Renderiza un item del timeline
   */
  renderTimelineItem(item, index) {
    if (!item || !item.title) return '';

    const isEven = index % 2 === 0;
    const duration = this.calculateDuration(item.startDate, item.endDate);
    
    return `
      <article class="timeline-item ${item.type} ${isEven ? 'left' : 'right'}" 
               data-type="${item.type}" 
               data-id="${item.id}"
               data-aos="fade-${isEven ? 'right' : 'left'}"
               data-aos-delay="${Math.min(index * 100, 1000)}"
               role="article"
               tabindex="0">
        
        <div class="timeline-dot" aria-hidden="true">
          <div class="timeline-dot-inner ${item.current ? 'current' : ''}">
            ${this.getTypeIcon(item.type)}
          </div>
        </div>

        <div class="timeline-content">
          <div class="timeline-card">
            ${item.logo ? `<div class="timeline-logo">
              <img src="${this.escapeHtml(item.logo)}" 
                   alt="Logo de ${this.escapeHtml(item.subtitle)}" 
                   loading="lazy"
                   onerror="this.style.display='none'">
            </div>` : ''}
            
            <header class="timeline-header">
              <h3 class="timeline-title">${this.escapeHtml(item.title)}</h3>
              <h4 class="timeline-subtitle">${this.escapeHtml(item.subtitle)}</h4>
              <div class="timeline-meta">
                <span class="timeline-duration">${duration}</span>
                ${item.current ? '<span class="timeline-current">Actual</span>' : ''}
                ${item.location ? `<span class="timeline-location">${this.escapeHtml(item.location)}</span>` : ''}
              </div>
            </header>

            <div class="timeline-body">
              <p class="timeline-description">${this.escapeHtml(item.description)}</p>
              
              ${item.achievements && item.achievements.length > 0 ? `
                <div class="timeline-achievements">
                  <h5>Logros principales:</h5>
                  <ul>
                    ${item.achievements.slice(0, 3).map(achievement => 
                      `<li>${this.escapeHtml(achievement)}</li>`
                    ).join('')}
                    ${item.achievements.length > 3 ? 
                      `<li class="show-more-trigger">
                        <button type="button" class="show-more-btn">
                          Ver ${item.achievements.length - 3} más...
                        </button>
                      </li>` : ''
                    }
                  </ul>
                </div>
              ` : ''}

              ${item.technologies && item.technologies.length > 0 ? `
                <div class="timeline-technologies">
                  <h5>Tecnologías:</h5>
                  <div class="tags-container">
                    ${item.technologies.map(tech => 
                      `<span class="tech-tag">${this.escapeHtml(tech)}</span>`
                    ).join('')}
                  </div>
                </div>
              ` : ''}

              ${item.skills && item.skills.length > 0 ? `
                <div class="timeline-skills">
                  <h5>Habilidades:</h5>
                  <div class="tags-container">
                    ${item.skills.map(skill => 
                      `<span class="skill-tag">${this.escapeHtml(skill)}</span>`
                    ).join('')}
                  </div>
                </div>
              ` : ''}

              ${item.grade ? `
                <div class="timeline-grade">
                  <strong>Nota media:</strong> ${this.escapeHtml(item.grade)}
                </div>
              ` : ''}
            </div>

            <footer class="timeline-footer">
              <div class="timeline-dates">
                <time class="start-date" datetime="${item.startDate}">
                  ${this.formatDate(item.startDate)}
                </time>
                <span class="date-separator" aria-hidden="true">—</span>
                <time class="end-date" datetime="${item.endDate || ''}">
                  ${item.current ? 'Presente' : this.formatDate(item.endDate)}
                </time>
              </div>

              ${item.certificateUrl ? `
                <a href="${this.escapeHtml(item.certificateUrl)}" 
                   target="_blank" 
                   rel="noopener noreferrer"
                   class="timeline-certificate-link"
                   aria-label="Ver certificado de ${item.title}">
                  <i class="icon-external-link" aria-hidden="true"></i>
                  Ver certificado
                </a>
              ` : ''}
            </footer>
          </div>
        </div>
      </article>
    `;
  }

  /**
   * Escapa HTML para prevenir XSS
   */
  escapeHtml(text) {
    if (!text) return '';
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
  }

  /**
   * Renderiza estadísticas
   */
  renderStats() {
    const stats = this.calculateStats();
    
    return `
      <div class="timeline-statistics" role="region" aria-label="Estadísticas de experiencia">
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
      work: '<i class="icon-briefcase" aria-hidden="true"></i>',
      education: '<i class="icon-graduation-cap" aria-hidden="true"></i>',
      course: '<i class="icon-book-open" aria-hidden="true"></i>'
    };
    return icons[type] || '<i class="icon-circle" aria-hidden="true"></i>';
  }

  /**
   * Calcula la duración entre fechas
   */
  calculateDuration(startDate, endDate) {
    const start = this.parseDate(startDate);
    const end = endDate ? this.parseDate(endDate) : new Date();
    
    if (start.getTime() === 0) return 'Fecha no válida';
    
    const diffTime = Math.abs(end - start);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    const diffMonths = Math.floor(diffDays / 30.44); // Promedio más preciso
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
      return `${Math.max(1, diffDays)} día${diffDays > 1 ? 's' : ''}`;
    }
  }

  /**
   * Formatea fechas
   */
  formatDate(dateString) {
    if (!dateString) return '';
    
    const date = this.parseDate(dateString);
    if (date.getTime() === 0) return 'Fecha no válida';
    
    try {
      return date.toLocaleDateString('es-ES', {
        month: 'short',
        year: 'numeric'
      });
    } catch (error) {
      console.warn('Error al formatear fecha:', error);
      return dateString;
    }
  }

  /**
   * Calcula estadísticas
   */
  calculateStats() {
    if (!EXPERIENCE_DATA) {
      return {
        totalExperience: 0,
        totalJobs: 0,
        totalEducation: 0,
        totalCertifications: 0
      };
    }

    const now = new Date();
    let earliestStart = now;
    
    try {
      // Encontrar la fecha de inicio más temprana en trabajos
      if (Array.isArray(EXPERIENCE_DATA.professional)) {
        EXPERIENCE_DATA.professional.forEach(exp => {
          if (exp && exp.startDate) {
            const startDate = this.parseDate(exp.startDate);
            if (startDate.getTime() > 0 && startDate < earliestStart) {
              earliestStart = startDate;
            }
          }
        });
      }

      const experienceYears = earliestStart < now ? 
        Math.floor((now - earliestStart) / (1000 * 60 * 60 * 24 * 365.25)) : 0;

      return {
        totalExperience: Math.max(0, experienceYears),
        totalJobs: Array.isArray(EXPERIENCE_DATA.professional) ? EXPERIENCE_DATA.professional.length : 0,
        totalEducation: Array.isArray(EXPERIENCE_DATA.education) ? EXPERIENCE_DATA.education.length : 0,
        totalCertifications: Array.isArray(EXPERIENCE_DATA.courses) ? EXPERIENCE_DATA.courses.length : 0
      };
    } catch (error) {
      console.error('Error al calcular estadísticas:', error);
      return {
        totalExperience: 0,
        totalJobs: 0,
        totalEducation: 0,
        totalCertifications: 0
      };
    }
  }

  /**
   * Configura los filtros
   */
  setupFilters() {
    const filters = this.container.querySelectorAll('.timeline-filter');
    
    filters.forEach(filter => {
      const handleFilterClick = (e) => {
        e.preventDefault();
        const filterType = filter.dataset.filter;
        this.applyFilter(filterType);
        
        // Actualizar estado activo
        filters.forEach(f => f.classList.remove('active'));
        filter.classList.add('active');
      };

      filter.addEventListener('click', handleFilterClick);
      this.eventListeners.push({
        element: filter,
        event: 'click',
        handler: handleFilterClick
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
        item.setAttribute('aria-hidden', 'false');
      } else {
        item.style.display = 'none';
        item.classList.remove('visible');
        item.setAttribute('aria-hidden', 'true');
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
    if ('IntersectionObserver' in window) {
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
        if (this.animationObserver) {
          this.animationObserver.observe(item);
        }
      });

      // Animación de la línea de tiempo
      this.animateTimelineLine();
    } else {
      // Fallback para navegadores sin soporte
      this.timelineItems.forEach(item => {
        item.classList.add('animate-in');
      });
    }
  }

  /**
   * Anima la línea principal del timeline
   */
  animateTimelineLine() {
    const timelineLine = this.container.querySelector('.timeline-line');
    if (!timelineLine || !('IntersectionObserver' in window)) return;

    this.lineAnimationObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          timelineLine.classList.add('animate');
        }
      });
    }, { threshold: 0.1 });

    this.lineAnimationObserver.observe(timelineLine);
  }

  /**
   * Refresca las animaciones después de filtrar
   */
  refreshAnimations() {
    // Remover clases de animación
    this.timelineItems.forEach(item => {
      item.classList.remove('animate-in');
    });

    // Volver a animar elementos visibles
    setTimeout(() => {
      const visibleItems = this.container.querySelectorAll('.timeline-item.visible');
      visibleItems.forEach((item, index) => {
        setTimeout(() => {
          item.classList.add('animate-in');
        }, Math.min(index * 100, 1000));
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
        const handleCardClick = (e) => {
          // No expandir si se clickea en un enlace
          if (e.target.tagName === 'A' || e.target.closest('a')) {
            return;
          }
          this.toggleItemDetails(item);
        };

        card.addEventListener('click', handleCardClick);
        this.eventListeners.push({
          element: card,
          event: 'click',
          handler: handleCardClick
        });
      }

      // Manejar botones "Ver más"
      const showMoreBtn = item.querySelector('.show-more-btn');
      if (showMoreBtn) {
        const handleShowMore = (e) => {
          e.stopPropagation();
          this.showAllAchievements(item);
        };

        showMoreBtn.addEventListener('click', handleShowMore);
        this.eventListeners.push({
          element: showMoreBtn,
          event: 'click',
          handler: handleShowMore
        });
      }
    });

    // Navegación por teclado
    this.setupKeyboardNavigation();
  }

  /**
   * Muestra todos los logros de un item
   */
  showAllAchievements(item) {
    const achievementsContainer = item.querySelector('.timeline-achievements ul');
    const itemData = this.findItemData(item.dataset.id);
    
    if (achievementsContainer && itemData && itemData.achievements) {
      achievementsContainer.innerHTML = itemData.achievements.map(achievement => 
        `<li>${this.escapeHtml(achievement)}</li>`
      ).join('');
    }
  }

  /**
   * Encuentra los datos de un item por ID
   */
  findItemData(itemId) {
    const timelineData = this.prepareTimelineData();
    return timelineData.find(item => item.id === itemId);
  }

  /**
   * Alterna detalles de un item
   */
  toggleItemDetails(item) {
    const achievements = item.querySelector('.timeline-achievements');
    const isExpanded = item.classList.contains('expanded');

    if (isExpanded) {
      item.classList.remove('expanded');
      item.setAttribute('aria-expanded', 'false');
      if (achievements) {
        achievements.style.maxHeight = '0';
      }
    } else {
      item.classList.add('expanded');
      item.setAttribute('aria-expanded', 'true');
      if (achievements) {
        achievements.style.maxHeight = achievements.scrollHeight + 'px';
      }
    }
  }

  /**
   * Configura navegación por teclado
   */
  setupKeyboardNavigation() {
    const handleKeydown = (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        const focusedElement = document.activeElement;
        
        if (focusedElement.classList.contains('timeline-filter')) {
          e.preventDefault();
          focusedElement.click();
        } else if (focusedElement.classList.contains('timeline-item')) {
          e.preventDefault();
          this.toggleItemDetails(focusedElement);
        }
      }
    };

    this.container.addEventListener('keydown', handleKeydown);
    this.eventListeners.push({
      element: this.container,
      event: 'keydown',
      handler: handleKeydown
    });
  }

  /**
   * Métodos públicos
   */
  
  /**
   * Actualiza el timeline con nuevos datos
   */
  updateTimeline(newData) {
    if (!newData) return false;

    try {
      // Limpiar observers anteriores
      this.destroy();
      
      // Actualizar datos y re-renderizar
      Object.assign(EXPERIENCE_DATA, newData);
      this.render();
      this.setupFilters();
      this.setupAnimations();
      this.setupInteractions();
      
      return true;
    } catch (error) {
      console.error('Error al actualizar timeline:', error);
      return false;
    }
  }

  /**
   * Navega a un item específico
   */
  navigateToItem(itemId) {
    if (!itemId) return false;

    const item = this.container.querySelector(`[data-id="${itemId}"]`);
    if (item) {
      item.scrollIntoView({ behavior: 'smooth', block: 'center' });
      item.classList.add('highlight');
      item.focus();
      
      setTimeout(() => {
        item.classList.remove('highlight');
      }, 2000);
      
      return true;
    }
    return false;
  }

  /**
   * Obtiene estadísticas actuales
   */
  getStats() {
    return this.calculateStats();
  }

  /**
   * Obtiene el filtro actual
   */
  getCurrentFilter() {
    return this.currentFilter;
  }

  /**
   * Obtiene todos los items visibles
   */
  getVisibleItems() {
    return Array.from(this.container.querySelectorAll('.timeline-item.visible'));
  }

  /**
   * Destructor del componente
   */
  destroy() {
    // Limpiar observers
    if (this.animationObserver) {
      this.animationObserver.disconnect();
      this.animationObserver = null;
    }

    if (this.lineAnimationObserver) {
      this.lineAnimationObserver.disconnect();
      this.lineAnimationObserver = null;
    }

    // Limpiar event listeners
    this.eventListeners.forEach(({ element, event, handler }) => {
      if (element && typeof element.removeEventListener === 'function') {
        element.removeEventListener(event, handler);
      }
    });
    this.eventListeners = [];

    // Limpiar referencias
    this.timelineItems = [];
    this.container = null;
  }
}

// Auto-inicialización segura
const initExperienceTimeline = () => {
  try {
    const timelineContainer = DOMHelpers?.select ? 
      DOMHelpers.select('#experience-timeline') : 
      document.querySelector('#experience-timeline');
    
    if (timelineContainer && !timelineContainer._experienceTimelineInstance) {
      console.log('🎯 Auto-inicializando ExperienceTimeline...');
      timelineContainer._experienceTimelineInstance = new ExperienceTimeline('#experience-timeline');
      
      if (typeof window !== 'undefined') {
        window.experienceTimelineInstance = timelineContainer._experienceTimelineInstance;
      }
    }
  } catch (error) {
    console.error('Error en auto-inicialización de ExperienceTimeline:', error);
  }
};

// Auto-inicialización inteligente
if (typeof window !== 'undefined' && !window.portfolioApp) {
  if (DOMHelpers?.ready) {
    DOMHelpers.ready(initExperienceTimeline);
  } else if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initExperienceTimeline);
  } else {
    initExperienceTimeline();
  }
}