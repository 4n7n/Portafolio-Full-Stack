class TypingEffect {
    constructor(elementId, options = {}) {
        this.element = document.getElementById(elementId);
        if (!this.element) return;
        
        this.options = {
            strings: options.strings || [
                'Full Stack Developer',
                'Frontend Specialist',
                'Backend Engineer',
                'UI/UX Enthusiast'
            ],
            typeSpeed: options.typeSpeed || 80,
            deleteSpeed: options.deleteSpeed || 50,
            pauseTime: options.pauseTime || 2000,
            loop: options.loop !== false
        };
        
        this.stringIndex = 0;
        this.charIndex = 0;
        this.isDeleting = false;
        this.isPaused = false;
        
        this.init();
    }
    
    init() {
        this.type();
        
        // Pause on page visibility change
        document.addEventListener('visibilitychange', () => {
            if (document.hidden) {
                this.pause();
            } else {
                this.resume();
            }
        });
    }
    
    type() {
        if (this.isPaused) return;
        
        const currentString = this.options.strings[this.stringIndex];
        const currentChar = this.isDeleting 
            ? currentString.substring(0, this.charIndex - 1)
            : currentString.substring(0, this.charIndex + 1);
        
        this.element.textContent = currentChar;
        
        let typeSpeed = this.isDeleting 
            ? this.options.deleteSpeed 
            : this.options.typeSpeed;
        
        // Natural typing variation
        if (!this.isDeleting && currentChar !== '') {
            typeSpeed += Math.random() * 50;
        }
        
        if (!this.isDeleting && this.charIndex === currentString.length) {
            // Pause at end of string
            typeSpeed = this.options.pauseTime;
            this.isDeleting = true;
        } else if (this.isDeleting && this.charIndex === 0) {
            // Move to next string
            this.isDeleting = false;
            this.stringIndex++;
            
            if (this.stringIndex === this.options.strings.length) {
                if (this.options.loop) {
                    this.stringIndex = 0;
                } else {
                    return; // Stop typing
                }
            }
            
            typeSpeed = 500; // Pause before typing next string
        }
        
        this.charIndex += this.isDeleting ? -1 : 1;
        
        setTimeout(() => this.type(), typeSpeed);
    }
    
    pause() {
        this.isPaused = true;
    }
    
    resume() {
        this.isPaused = false;
        this.type();
    }
    
    updateStrings(newStrings) {
        this.options.strings = newStrings;
    }
}

// Export for use
export default TypingEffect;