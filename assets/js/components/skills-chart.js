// assets/js/components/skills-chart.js
// VERSIÓN CORREGIDA Y COMPATIBLE con tu HTML actual

/**
 * SkillsChart - Compatible con canvas #skillsChart y estructura existente
 */
export class SkillsChart {
  constructor(canvasSelector = '#skillsChart') {
    this.canvasElement = document.querySelector(canvasSelector);
    this.container = this.canvasElement?.parentElement;
    this.chart = null;
    this.currentView = 'chart'; // chart, bars
    this.isInitialized = false;

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
            { name: "JWT", level: 75, experience: "3 meses", color: "#000000" }
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
        this.isInitialized = true;
        console.log('✅ SkillsChart inicializado con Chart.js');
      }).catch(() => {
        // Fallback a barras HTML
        this.createFallbackChart();
        this.isInitialized = true;
        console.log('✅ SkillsChart inicializado con fallback HTML');
      });
    } catch (error) {
      console.warn('⚠️ Error al inicializar SkillsChart:', error);
      this.createFallbackChart();
    }
  }

  /**
   * Cargar Chart.js desde CDN
   */
  async loadChartJS() {
    if (typeof Chart !== 'undefined') return Promise.resolve();

    return new Promise((resolve, reject) => {
      const script = document.createElement('script');
      script.src = 'https://cdnjs.cloudflare.com/ajax/libs/Chart.js/3.9.1/chart.min.js';
      script.onload = resolve;
      script.onerror = reject;
      document.head.appendChild(script);
    });
  }

  /**
   * Crear gráfico Chart.js
   */
  createChart() {
    if (!this.canvasElement) return;

    const ctx = this.canvasElement.getContext('2d');
    const allSkills = this.getAllSkills();

    this.chart = new Chart(ctx, {
      type: 'polarArea',
      data: {
        labels: allSkills.map(skill => skill.name),
        datasets: [{
          label: 'Nivel de competencia (%)',
          data: allSkills.map(skill => skill.level),
          backgroundColor: allSkills.map(skill => skill.color + '80'),
          borderColor: allSkills.map(skill => skill.color),
          borderWidth: 2
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          title: {
            display: true,
            text: 'Stack MERN - The Bridge Bootcamp (480h)',
            color: getComputedStyle(document.documentElement).getPropertyValue('--text-primary') || '#333',
            font: { size: 16, weight: 'bold' }
          },
          legend: {
            display: false
          },
          tooltip: {
            backgroundColor: 'rgba(0, 0, 0, 0.8)',
            titleColor: '#fff',
            bodyColor: '#fff',
            callbacks: {
              label: (context) => `${context.label}: ${context.raw}%`,
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
            ticks: {
              display: false
            },
            grid: {
              color: 'rgba(0, 0, 0, 0.1)'
            }
          }
        },
        animation: {
          duration: 2000,
          easing: 'easeOutBounce'
        }
      }
    });

    // Agregar controles
    this.addChartControls();
  }

  /**
   * Crear fallback HTML cuando Chart.js no está disponible
   */
  createFallbackChart() {
    if (!this.container) return;

    const allSkills = this.getAllSkills();
    const categories = Object.entries(this.skillsData.technical);

    this.container.innerHTML = `
      <div class="skills-chart-fallback">
        <div class="chart-header">
          <h3>🎓 Stack MERN - The Bridge Bootcamp</h3>
          <p>480 horas de formación intensiva</p>
          <div class="chart-controls">
            <button class="chart-btn active" data-view="chart">📊 Vista General</button>
            <button class="chart-btn" data-view="bars">📋 Por Categorías</button>
          </div>
        </div>
        
        <div class="chart-content">
          <div id="chart-view" class="chart-view active">
            ${this.renderSkillsGrid(allSkills)}
          </div>
          
          <div id="bars-view" class="chart-view">
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
        ${skills.map(skill => `
          <div class="skill-card" data-level="${this.getSkillLevel(skill.level)}">
            <div class="skill-icon" style="background: ${skill.color}20;">
              <div style="width: 20px; height: 20px; background: ${skill.color}; border-radius: 50%;"></div>
            </div>
            <h5 class="skill-name">${skill.name}</h5>
            <div class="skill-progress-circle">
              <svg width="60" height="60">
                <circle cx="30" cy="30" r="25" 
                        stroke="#e0e0e0" 
                        stroke-width="4" 
                        fill="transparent"/>
                <circle cx="30" cy="30" r="25" 
                        stroke="${skill.color}" 
                        stroke-width="4" 
                        fill="transparent"
                        stroke-dasharray="157"
                        stroke-dashoffset="${157 - (skill.level / 100) * 157}"
                        class="progress-stroke"/>
              </svg>
              <span class="skill-percentage">${skill.level}%</span>
            </div>
            <span class="skill-experience">${skill.experience}</span>
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
              ${this.getCategoryIcon(categoryId)} ${category.title}
            </h4>
            <div class="category-skills">
              ${category.skills.map(skill => `
                <div class="skill-bar-item">
                  <div class="skill-info">
                    <span class="skill-name">${skill.name}</span>
                    <span class="skill-percentage">${skill.level}%</span>
                  </div>
                  <div class="skill-bar">
                    <div class="skill-fill" 
                         style="width: ${skill.level}%; background: ${skill.color};">
                    </div>
                  </div>
                  <span class="skill-experience">${skill.experience}</span>
                </div>
              `).join('')}
            </div>
          </div>
        `).join('')}
      </div>
    `;
  }

  /**
   * Agregar controles para Chart.js
   */
  addChartControls() {
    if (!this.container || !this.chart) return;

    const controlsHTML = `
      <div class="chart-controls-overlay">
        <button class="chart-control-btn" data-action="changeType">🔄 Cambiar vista</button>
        <button class="chart-control-btn" data-action="toggleLegend">📋 Leyenda</button>
      </div>
    `;

    this.container.insertAdjacentHTML('beforeend', controlsHTML);

    // Event listeners para controles
    this.container.querySelectorAll('.chart-control-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const action = e.target.dataset.action;
        
        if (action === 'changeType') {
          this.toggleChartType();
        } else if (action === 'toggleLegend') {
          this.toggleLegend();
        }
      });
    });
  }

  /**
   * Setup events para fallback
   */
  setupFallbackEvents() {
    const chartBtns = this.container.querySelectorAll('.chart-btn');
    const chartViews = this.container.querySelectorAll('.chart-view');

    chartBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        const view = btn.dataset.view;
        
        // Update active button
        chartBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        
        // Update active view
        chartViews.forEach(v => v.classList.remove('active'));
        this.container.querySelector(`#${view}-view`).classList.add('active');
      });
    });

    // Animate progress circles
    this.animateProgressCircles();
  }

  /**
   * Animar círculos de progreso
   */
  animateProgressCircles() {
    const circles = this.container.querySelectorAll('.progress-stroke');
    
    circles.forEach((circle, index) => {
      setTimeout(() => {
        circle.style.transition = 'stroke-dashoffset 1.5s ease-out';
      }, index * 100);
    });
  }

  /**
   * Métodos auxiliares
   */
  getAllSkills() {
    const allSkills = [];
    Object.values(this.skillsData.technical).forEach(category => {
      allSkills.push(...category.skills);
    });
    return allSkills.sort((a, b) => b.level - a.level);
  }

  getSkillLevel(level) {
    if (level <= 40) return 'beginner';
    if (level <= 70) return 'intermediate';
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
    
    const currentType = this.chart.config.type;
    const newType = currentType === 'polarArea' ? 'doughnut' : 'polarArea';
    
    this.chart.config.type = newType;
    this.chart.update();
  }

  toggleLegend() {
    if (!this.chart) return;
    
    const legendVisible = this.chart.options.plugins.legend.display;
    this.chart.options.plugins.legend.display = !legendVisible;
    this.chart.update();
  }

  /**
   * Métodos públicos
   */
  updateData(newSkillsData) {
    this.skillsData = newSkillsData;
    
    if (this.chart) {
      const allSkills = this.getAllSkills();
      this.chart.data.labels = allSkills.map(skill => skill.name);
      this.chart.data.datasets[0].data = allSkills.map(skill => skill.level);
      this.chart.update();
    } else {
      this.createFallbackChart();
    }
  }

  destroy() {
    if (this.chart) {
      this.chart.destroy();
      this.chart = null;
    }
    this.isInitialized = false;
  }

  getSkillsData() {
    return this.skillsData;
  }
}

// Exportar también como default
export default SkillsChart;

// Log de carga
console.log('📊 SkillsChart v2.0 - Compatible con The Bridge stack MERN');