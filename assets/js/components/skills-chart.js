class SkillsChart {
    constructor() {
        this.skillsData = null;
        this.activeFilter = 'all';
        this.animationTriggered = false;
        this.observer = null;
        
        this.init();
    }

    async init() {
        try {
            // Import skills data
            const { skillsData } = await import('../data/skills.js');
            this.skillsData = skillsData;
            
            this.renderSkills();
            this.setupFilterSystem();
            this.setupIntersectionObserver();
            this.bindEvents();
        } catch (error) {
            console.error('Error initializing SkillsChart:', error);
        }
    }

    renderSkills() {
        if (!this.skillsData) return;

        Object.keys(this.skillsData).forEach(category => {
            const container = document.getElementById(`${category}-skills`);
            if (!container) return;

            const skills = this.skillsData[category];
            container.innerHTML = '';

            skills.forEach(skill => {
                const skillElement = this.createSkillElement(skill);
                container.appendChild(skillElement);
            });
        });
    }

    createSkillElement(skill) {
        const skillItem = document.createElement('div');
        skillItem.className = 'skill-item';
        skillItem.dataset.level = skill.level;

        skillItem.innerHTML = `
            <div class="skill-header">
                <div class="skill-name">
                    <img src="${skill.icon}" alt="${skill.name}" class="skill-icon" loading="lazy">
                    ${skill.name}
                </div>
                <span class="skill-level">${skill.level}%</span>
            </div>
            <div class="skill-bar">
                <div class="skill-progress" style="--skill-level: ${skill.level}%"></div>
            </div>
        `;

        return skillItem;
    }

    setupFilterSystem() {
        const filterContainer = document.querySelector('[data-filter-container]');
        if (!filterContainer) return;

        filterContainer.addEventListener('click', (e) => {
            const filterBtn = e.target.closest('.filter-btn');
            if (!filterBtn) return;

            const filter = filterBtn.dataset.filter;
            this.setActiveFilter(filter);
            this.applyFilter(filter);
        });
    }

    setActiveFilter(filter) {
        // Update active button
        document.querySelectorAll('.filter-btn').forEach(btn => {
            btn.classList.remove('active');
        });
        
        document.querySelector(`[data-filter="${filter}"]`).classList.add('active');
        this.activeFilter = filter;
    }

    applyFilter(filter) {
        const categories = document.querySelectorAll('.skill-category');
        
        categories.forEach(category => {
            const categoryType = category.dataset.category;
            const shouldShow = filter === 'all' || filter === categoryType;
            
            category.classList.remove('show', 'hide');
            
            if (shouldShow) {
                category.classList.add('show');
            } else {
                category.classList.add('hide');
            }
        });

        // Re-trigger animations for visible items
        if (this.animationTriggered) {
            setTimeout(() => {
                this.triggerProgressAnimations();
            }, 300);
        }
    }

    setupIntersectionObserver() {
        const options = {
            threshold: 0.3,
            rootMargin: '0px 0px -50px 0px'
        };

        this.observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && !this.animationTriggered) {
                    this.triggerProgressAnimations();
                    this.animationTriggered = true;
                }
            });
        }, options);

        const skillsSection = document.querySelector('.skills-section');
        if (skillsSection) {
            this.observer.observe(skillsSection);
        }
    }

    triggerProgressAnimations() {
        const skillItems = document.querySelectorAll('.skill-item');
        
        skillItems.forEach((item, index) => {
            const category = item.closest('.skill-category');
            if (category && category.classList.contains('hide')) return;

            setTimeout(() => {
                item.classList.add('animate-in');
                const progress = item.querySelector('.skill-progress');
                const level = item.dataset.level;
                
                if (progress && level) {
                    progress.style.width = `${level}%`;
                }
            }, index * 100);
        });
    }

    // Method to update skills data dynamically
    updateSkills(newSkillsData) {
        this.skillsData = newSkillsData;
        this.renderSkills();
        
        if (this.animationTriggered) {
            setTimeout(() => {
                this.triggerProgressAnimations();
            }, 100);
        }
    }

    // Method to add new skill
    addSkill(category, skillData) {
        if (!this.skillsData[category]) {
            this.skillsData[category] = [];
        }
        
        this.skillsData[category].push(skillData);
        this.renderSkills();
    }

    // Method to get skills by category
    getSkillsByCategory(category) {
        return this.skillsData[category] || [];
    }

    // Method to get skill level
    getSkillLevel(category, skillName) {
        const skills = this.getSkillsByCategory(category);
        const skill = skills.find(s => s.name === skillName);
        return skill ? skill.level : 0;
    }

    // Cleanup method
    destroy() {
        if (this.observer) {
            this.observer.disconnect();
        }
    }
}

// Export for use in other modules
export default SkillsChart;