/**
 * SkillsChart - Compatible con canvas #skillsChart y estructura existente
 * Versión corregida y optimizada
 */
export class SkillsChart {
  constructor(canvasSelector = '#skillsChart') {
    this.canvasElement = document.querySelector(canvasSelector);
    this.container = this.canvasElement?.parentElement;
    this.chart = null;
    this.currentView = 'chart'; // chart, bars
    this.isInitialized = false;
    this.observers = [];
    this.animationFrames = [];
    this.resizeObserver = null;

    // Datos del stack MERN de The Bridge (480h)
    this.skillsData = {
      technical: {
        frontend: {
          title: "Frontend",
          icon: "code",
          skills: [
            { name: "JavaScript ES6+", level: 88, experience: "6 meses", color: "#F7DF1E" },
            { name: "React", level: 85, experience: "5 meses", color: "#61DAFB" },
            { name: "HTML5", level: 95, experience: "8 meses", color: "#E34F26" },
            { name: "CSS3", level: 90, experience: "8 meses", color: "#1572B6" },
            { name: "Bootstrap", level: 85, experience: "4 meses", color: "#7952B3" }
          ]
        },
        backend: {
          title: "Backend",
          icon: "server",
          skills: [
            { name: "Node.js", level: 82, experience: "5 meses", color: "#339933" },
            { name: "Express", level: 82, experience: "5 meses", color: "#000000" },
            { name: "JWT", level: 75, experience: "3 meses", color: "#d63aff" }
          ]
        },
        database: {
          title: "Database",
          icon: "database",
          skills: [
            { name: "MongoDB", level: 78, experience: "4 meses", color: "#47A248" },
            { name: "MySQL", level: 78, experience: "4 meses", color: "#4479A1" }
          ]
        },
        tools: {
          title: "Tools & DevOps",
          icon: "tool",
          skills: [
            { name: "Git", level: 80, experience: "6 meses", color: "#F05032" },
            { name: "Docker", level: 70, experience: "3 meses", color: "#2496ED" },
            { name: "Jest", level: 75, experience: "3 meses", color: "#C21325" },
            { name: "Swagger", level: 65, experience: "2 meses", color: "#85EA2D" }
          ]
        }
      }
    };

    this.init();
  }

  /**
   * Inicializa el componente
   */
  init() {
    if (!this.canvasElement || this.isInitialized) return;

    try {
      // Intentar crear gráfico con Chart.js
      this.loadChartJS().then(() => {
        this.createChart();
        this.setupResizeObserver();
        this.isInitialized = true;
        console.log('✅ SkillsChart inicializado con Chart.js');
      }).catch((error) => {
        console.warn('⚠️ Chart.js no disponible, usando fallback:', error.message);
        // Fallback a barras HTML
        this.createFallbackChart();
        this.setupResizeObserver();
        this.isInitialized = true;
        console.log('✅ SkillsChart inicializado con fallback HTML');
      });
    } catch (error) {
      console.error('❌ Error al inicializar SkillsChart:', error);
      this.createFallbackChart();
      this.isInitialized = true;
    }
  }

  /**
   * Configurar ResizeObserver para responsividad
   */
  setupResizeObserver() {
    if (!this.container || typeof ResizeObserver === 'undefined') return;

    this.resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        if (this.chart) {
          this.chart.resize();
        }
      }
    });

    this.resizeObserver.observe(this.container);
  }

  /**
   * Cargar Chart.js desde CDN
   */
  async loadChartJS() {
    // Si ya está cargado, resolver inmediatamente
    if (typeof Chart !== 'undefined') {
      return Promise.resolve();
    }

    return new Promise((resolve, reject) => {
      // Verificar si ya hay un script cargándose
      const existingScript = document.querySelector('script[src*="chart"]');
      if (existingScript) {
        existingScript.onload = resolve;
        existingScript.onerror = reject;
        return;
      }

      const script = document.createElement('script');
      script.src = 'https://cdnjs.cloudflare.com/ajax/libs/Chart.js/3.9.1/chart.min.js';
      script.async = true;
      script.onload = () => {
        if (typeof Chart !== 'undefined') {
          resolve();
        } else {
          reject(new Error('Chart.js no se cargó correctamente'));
        }
      };
      script.onerror = () => reject(new Error('Error al cargar Chart.js'));
      
      // Timeout de 10 segundos
      setTimeout(() => reject(new Error('Timeout al cargar Chart.js')), 10000);
      
      document.head.appendChild(script);
    });
  }

  /**
   * Crear gráfico Chart.js
   */
  createChart() {
    if (!this.canvasElement || typeof Chart === 'undefined') {
      throw new Error('Canvas o Chart.js no disponible');
    }

    const ctx = this.canvasElement.getContext('2d');
    if (!ctx) {
      throw new Error('No se pudo obtener el contexto 2D del canvas');
    }

    const allSkills = this.getAllSkills();

    this.chart = new Chart(ctx, {
      type: 'polarArea',
      data: {
        labels: allSkills.map(skill => skill.name),
        datasets: [{
          label: 'Nivel de competencia (%)',
          data: allSkills.map(skill => skill.level),
          backgroundColor: allSkills.map(skill => this.hexToRgba(skill.color, 0.5)),
          borderColor: allSkills.map(skill => skill.color),
          borderWidth: 2,
          hoverBackgroundColor: allSkills.map(skill => this.hexToRgba(skill.color, 0.8)),
          hoverBorderWidth: 3
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        interaction: {
          intersect: false,
          mode: 'nearest'
        },
        plugins: {
          title: {
            display: true,
            text: 'Stack MERN - The Bridge Bootcamp (480h)',
            color: this.getCSSVariable('--text-primary', '#333'),
            font: { size: 16, weight: 'bold' },
            padding: { top: 10, bottom: 20 }
          },
          legend: {
            display: false
          },
          tooltip: {
            backgroundColor: 'rgba(0, 0, 0, 0.9)',
            titleColor: '#fff',
            bodyColor: '#fff',
            borderColor: 'rgba(255, 255, 255, 0.1)',
            borderWidth: 1,
            cornerRadius: 8,
            displayColors: true,
            callbacks: {
              label: (context) => {
                return `Nivel: ${context.raw}%`;
              },
              afterLabel: (context) => {
                const skill = allSkills[context.dataIndex];
                return `Experiencia: ${skill.experience}`;
              }
            }
          }
        },
        scales: {
          r: {
            beginAtZero: true,
            max: 100,
            min: 0,
            ticks: {
              display: true,
              stepSize: 20,
              color: this.getCSSVariable('--text-secondary', '#666'),
              backdropColor: 'transparent'
            },
            grid: {
              color: this.getCSSVariable('--border-color', 'rgba(0, 0, 0, 0.1)')
            },
            angleLines: {
              color: this.getCSSVariable('--border-color', 'rgba(0, 0, 0, 0.1)')
            },
            pointLabels: {
              color: this.getCSSVariable('--text-primary', '#333'),
              font: { size: 12 }
            }
          }
        },
        animation: {
          duration: 2000,
          easing: 'easeOutQuart'
        }
      }
    });

    // Agregar controles
    this.addChartControls();
  }

  /**
   * Obtener variable CSS con fallback
   */
  getCSSVariable(variable, fallback) {
    try {
      const value = getComputedStyle(document.documentElement).getPropertyValue(variable);
      return value.trim() || fallback;
    } catch {
      return fallback;
    }
  }

  /**
   * Convertir hex a rgba
   */
  hexToRgba(hex, alpha = 1) {
    try {
      const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
      if (!result) return `rgba(0, 0, 0, ${alpha})`;
      
      return `rgba(${parseInt(result[1], 16)}, ${parseInt(result[2], 16)}, ${parseInt(result[3], 16)}, ${alpha})`;
    } catch {
      return `rgba(0, 0, 0, ${alpha})`;
    }
  }

  /**
   * Crear fallback HTML cuando Chart.js no está disponible
   */
  createFallbackChart() {
    if (!this.container) return;

    const allSkills = this.getAllSkills();
    const categories = Object.entries(this.skillsData.technical);

    // Limpiar el canvas y crear contenedor HTML
    this.canvasElement.style.display = 'none';

    this.container.innerHTML = `
      <div class="skills-chart-fallback">
        <div class="chart-header">
          <h3>🎓 Stack MERN - The Bridge Bootcamp</h3>
          <p>480 horas de formación intensiva</p>
          <div class="chart-controls">
            <button class="chart-btn active" data-view="chart" type="button">📊 Vista General</button>
            <button class="chart-btn" data-view="bars" type="button">📋 Por Categorías</button>
          </div>
        </div>
        
        <div class="chart-content">
          <div id="chart-view" class="chart-view active">
            ${this.renderSkillsGrid(allSkills)}
          </div>
          
          <div id="bars-view" class="chart-view" style="display: none;">
            ${this.renderCategorizedSkills(categories)}
          </div>
        </div>
        
        <div class="chart-stats">
          <div class="stat-item">
            <span class="stat-number">${allSkills.length}</span>
            <span class="stat-label">Tecnologías</span>
          </div>
          <div class="stat-item">
            <span class="stat-number">${Math.round(allSkills.reduce((sum, s) => sum + s.level, 0) / allSkills.length)}%</span>
            <span class="stat-label">Promedio</span>
          </div>
          <div class="stat-item">
            <span class="stat-number">${allSkills.filter(s => s.level >= 80).length}</span>
            <span class="stat-label">Avanzadas</span>
          </div>
        </div>
      </div>
    `;

    this.setupFallbackEvents();
  }

  /**
   * Renderizar grid de skills
   */
  renderSkillsGrid(skills) {
    return `
      <div class="skills-grid">
        ${skills.map((skill, index) => `
          <div class="skill-card" data-level="${this.getSkillLevel(skill.level)}" style="animation-delay: ${index * 0.1}s;">
            <div class="skill-icon" style="background: ${this.hexToRgba(skill.color, 0.1)};">
              <div style="width: 20px; height: 20px; background: ${skill.color}; border-radius: 50%;"></div>
            </div>
            <h5 class="skill-name">${this.escapeHtml(skill.name)}</h5>
            <div class="skill-progress-circle">
              <svg width="60" height="60" viewBox="0 0 60 60" role="img" aria-label="Progreso ${skill.level}%">
                <circle cx="30" cy="30" r="25" 
                        stroke="#e0e0e0" 
                        stroke-width="4" 
                        fill="transparent"/>
                <circle cx="30" cy="30" r="25" 
                        stroke="${skill.color}" 
                        stroke-width="4" 
                        fill="transparent"
                        stroke-dasharray="157.08"
                        stroke-dashoffset="${157.08 - (skill.level / 100) * 157.08}"
                        stroke-linecap="round"
                        class="progress-stroke"
                        style="transition: stroke-dashoffset 1.5s ease-out;"/>
              </svg>
              <span class="skill-percentage" aria-hidden="true">${skill.level}%</span>
            </div>
            <span class="skill-experience">${this.escapeHtml(skill.experience)}</span>
          </div>
        `).join('')}
      </div>
    `;
  }

  /**
   * Renderizar skills por categorías
   */
  renderCategorizedSkills(categories) {
    return `
      <div class="skills-categories">
        ${categories.map(([categoryId, category]) => `
          <div class="skill-category">
            <h4 class="category-title">
              ${this.getCategoryIcon(categoryId)} ${this.escapeHtml(category.title)}
            </h4>
            <div class="category-skills">
              ${category.skills.map((skill, index) => `
                <div class="skill-bar-item" style="animation-delay: ${index * 0.1}s;">
                  <div class="skill-info">
                    <span class="skill-name">${this.escapeHtml(skill.name)}</span>
                    <span class="skill-percentage">${skill.level}%</span>
                  </div>
                  <div class="skill-bar" role="progressbar" aria-valuenow="${skill.level}" aria-valuemin="0" aria-valuemax="100">
                    <div class="skill-fill" 
                         style="width: 0%; background: ${skill.color}; transition: width 1.5s ease-out ${index * 0.1}s;">
                    </div>
                  </div>
                  <span class="skill-experience">${this.escapeHtml(skill.experience)}</span>
                </div>
              `).join('')}
            </div>
          </div>
        `).join('')}
      </div>
    `;
  }

  /**
   * Escape HTML para prevenir XSS
   */
  escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
  }

  /**
   * Agregar controles para Chart.js
   */
  addChartControls() {
    if (!this.container || !this.chart) return;

    const existingControls = this.container.querySelector('.chart-controls-overlay');
    if (existingControls) {
      existingControls.remove();
    }

    const controlsHTML = `
      <div class="chart-controls-overlay">
        <button class="chart-control-btn" data-action="changeType" type="button">🔄 Cambiar vista</button>
        <button class="chart-control-btn" data-action="toggleLegend" type="button">📋 Leyenda</button>
      </div>
    `;

    this.container.insertAdjacentHTML('beforeend', controlsHTML);

    // Event listeners para controles con cleanup
    const handleControlClick = (e) => {
      e.preventDefault();
      const action = e.target.dataset.action;
      
      if (action === 'changeType') {
        this.toggleChartType();
      } else if (action === 'toggleLegend') {
        this.toggleLegend();
      }
    };

    this.container.querySelectorAll('.chart-control-btn').forEach(btn => {
      btn.addEventListener('click', handleControlClick);
    });
  }

  /**
   * Setup events para fallback
   */
  setupFallbackEvents() {
    if (!this.container) return;

    const chartBtns = this.container.querySelectorAll('.chart-btn');
    const chartViews = this.container.querySelectorAll('.chart-view');

    const handleViewChange = (e) => {
      e.preventDefault();
      const view = e.target.dataset.view;
      if (!view) return;
      
      // Update active button
      chartBtns.forEach(b => b.classList.remove('active'));
      e.target.classList.add('active');
      
      // Update active view
      chartViews.forEach(v => {
        v.classList.remove('active');
        v.style.display = 'none';
      });
      
      const targetView = this.container.querySelector(`#${view}-view`);
      if (targetView) {
        targetView.classList.add('active');
        targetView.style.display = 'block';
        
        // Animar barras si es vista de barras
        if (view === 'bars') {
          this.animateSkillBars();
        }
      }
    };

    chartBtns.forEach(btn => {
      btn.addEventListener('click', handleViewChange);
    });

    // Animate progress circles
    this.animateProgressCircles();
  }

  /**
   * Animar círculos de progreso
   */
  animateProgressCircles() {
    if (!this.container) return;

    const circles = this.container.querySelectorAll('.progress-stroke');
    
    circles.forEach((circle, index) => {
      const frameId = setTimeout(() => {
        circle.style.transition = 'stroke-dashoffset 1.5s ease-out';
      }, index * 100);
      
      this.animationFrames.push(frameId);
    });
  }

  /**
   * Animar barras de skills
   */
  animateSkillBars() {
    if (!this.container) return;

    const skillBars = this.container.querySelectorAll('.skill-fill');
    
    skillBars.forEach((bar, index) => {
      const frameId = setTimeout(() => {
        const parentItem = bar.closest('.skill-bar-item');
        const progressBar = bar.closest('[role="progressbar"]');
        if (progressBar) {
          const value = progressBar.getAttribute('aria-valuenow');
          bar.style.width = `${value}%`;
        }
      }, index * 100);
      
      this.animationFrames.push(frameId);
    });
  }

  /**
   * Métodos auxiliares
   */
  getAllSkills() {
    const allSkills = [];
    
    try {
      Object.values(this.skillsData.technical).forEach(category => {
        if (category.skills && Array.isArray(category.skills)) {
          allSkills.push(...category.skills);
        }
      });
    } catch (error) {
      console.error('Error al obtener skills:', error);
    }
    
    return allSkills.sort((a, b) => b.level - a.level);
  }

  getSkillLevel(level) {
    const numLevel = parseInt(level);
    if (numLevel <= 40) return 'beginner';
    if (numLevel <= 70) return 'intermediate';
    return 'advanced';
  }

  getCategoryIcon(categoryId) {
    const icons = {
      frontend: '🎨',
      backend: '⚙️',
      database: '🗃️',
      tools: '🛠️'
    };
    return icons[categoryId] || '💻';
  }

  toggleChartType() {
    if (!this.chart) return;
    
    try {
      const currentType = this.chart.config.type;
      const newType = currentType === 'polarArea' ? 'doughnut' : 'polarArea';
      
      this.chart.config.type = newType;
      this.chart.update('active');
    } catch (error) {
      console.error('Error al cambiar tipo de gráfico:', error);
    }
  }

  toggleLegend() {
    if (!this.chart) return;
    
    try {
      const legendVisible = this.chart.options.plugins.legend.display;
      this.chart.options.plugins.legend.display = !legendVisible;
      this.chart.update('active');
    } catch (error) {
      console.error('Error al cambiar leyenda:', error);
    }
  }

  /**
   * Métodos públicos
   */
  updateData(newSkillsData) {
    if (!newSkillsData || typeof newSkillsData !== 'object') {
      console.error('Datos de skills inválidos');
      return;
    }

    this.skillsData = { ...this.skillsData, ...newSkillsData };
    
    try {
      if (this.chart) {
        const allSkills = this.getAllSkills();
        this.chart.data.labels = allSkills.map(skill => skill.name);
        this.chart.data.datasets[0].data = allSkills.map(skill => skill.level);
        this.chart.data.datasets[0].backgroundColor = allSkills.map(skill => this.hexToRgba(skill.color, 0.5));
        this.chart.data.datasets[0].borderColor = allSkills.map(skill => skill.color);
        this.chart.update('active');
      } else if (this.isInitialized) {
        this.createFallbackChart();
      }
    } catch (error) {
      console.error('Error al actualizar datos:', error);
    }
  }

  destroy() {
    try {
      // Limpiar Chart.js
      if (this.chart) {
        this.chart.destroy();
        this.chart = null;
      }

      // Limpiar ResizeObserver
      if (this.resizeObserver) {
        this.resizeObserver.disconnect();
        this.resizeObserver = null;
      }

      // Limpiar timeouts
      this.animationFrames.forEach(frameId => clearTimeout(frameId));
      this.animationFrames = [];

      // Limpiar event listeners del container
      if (this.container) {
        const controls = this.container.querySelector('.chart-controls-overlay');
        if (controls) {
          controls.remove();
        }
      }

      this.isInitialized = false;
      console.log('✅ SkillsChart destruido correctamente');
    } catch (error) {
      console.error('Error al destruir SkillsChart:', error);
    }
  }

  getSkillsData() {
    return { ...this.skillsData };
  }

  // Método para verificar si está inicializado
  isReady() {
    return this.isInitialized;
  }

  // Método para obtener estadísticas
  getStats() {
    const allSkills = this.getAllSkills();
    return {
      totalSkills: allSkills.length,
      averageLevel: Math.round(allSkills.reduce((sum, s) => sum + s.level, 0) / allSkills.length) || 0,
      advancedSkills: allSkills.filter(s => s.level >= 80).length,
      categories: Object.keys(this.skillsData.technical).length,
      hasChart: !!this.chart,
      isInitialized: this.isInitialized
    };
  }
}

// Exportar también como default
export default SkillsChart;

// Auto-inicialización con manejo de errores
document.addEventListener('DOMContentLoaded', () => {
  try {
    const skillsCanvas = document.querySelector('#skillsChart');
    if (skillsCanvas && !window.skillsChartInstance) {
      window.skillsChartInstance = new SkillsChart('#skillsChart');
      console.log('📊 SkillsChart auto-inicializado');
    }
  } catch (error) {
    console.error('Error en auto-inicialización de SkillsChart:', error);
  }
});

console.log('📊 SkillsChart v2.1 - Versión corregida y optimizada');