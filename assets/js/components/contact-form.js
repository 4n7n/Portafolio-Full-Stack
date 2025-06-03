import FormValidator from '../utils/form-validator.js';
import { getEmailService } from '../services/email-service.js';
import { showNotification } from '../utils/notifications.js';

class ContactForm {
    constructor() {
        this.form = null;
        this.validator = null;
        this.emailService = null;
        this.isSubmitting = false;
        this.submitCount = 0;
        this.lastSubmitTime = 0;
        this.reCaptchaToken = null;
        
        // DOM elements
        this.submitBtn = null;
        this.formStatus = null;
        this.characterCount = null;
        
        // Configuration
        this.config = {
            maxSubmitsPerHour: 3,
            minTimeBetweenSubmits: 60000, // 1 minute
            maxMessageLength: 1000,
            enableReCaptcha: true,
            enableAnalytics: true
        };
        
        this.init();
    }

    async init() {
        try {
            this.findDOMElements();
            await this.initializeServices();
            this.setupValidation();
            this.bindEvents();
            this.setupCharacterCount();
            this.loadFormState();
            
            console.log('✅ ContactForm initialized');
        } catch (error) {
            console.error('❌ Error initializing ContactForm:', error);
            this.showError('Error al inicializar el formulario. Recarga la página e inténtalo de nuevo.');
        }
    }

    findDOMElements() {
        this.form = document.getElementById('contact-form');
        if (!this.form) {
            throw new Error('Contact form not found');
        }

        this.submitBtn = document.getElementById('submit-btn');
        this.formStatus = document.getElementById('form-status');
        this.characterCount = document.getElementById('message-count');
        
        // Form fields
        this.fields = {
            name: this.form.querySelector('#contact-name'),
            email: this.form.querySelector('#contact-email'),
            phone: this.form.querySelector('#contact-phone'),
            subject: this.form.querySelector('#contact-subject'),
            budget: this.form.querySelector('input[name="budget"]:checked'),
            timeline: this.form.querySelector('#contact-timeline'),
            message: this.form.querySelector('#contact-message'),
            privacy: this.form.querySelector('#contact-privacy'),
            newsletter: this.form.querySelector('#contact-newsletter')
        };
    }

    async initializeServices() {
        // Initialize email service
        this.emailService = getEmailService();
        
        // Initialize reCAPTCHA if enabled
        if (this.config.enableReCaptcha) {
            await this.initializeReCaptcha();
        }
    }

    async initializeReCaptcha() {
        try {
            // Load reCAPTCHA script if not already loaded
            if (!window.grecaptcha) {
                await this.loadReCaptchaScript();
            }
            
            // Initialize reCAPTCHA v3
            await window.grecaptcha.ready(() => {
                console.log('reCAPTCHA ready');
            });
        } catch (error) {
            console.warn('reCAPTCHA initialization failed:', error);
            this.config.enableReCaptcha = false;
        }
    }

    loadReCaptchaScript() {
        return new Promise((resolve, reject) => {
            const script = document.createElement('script');
            script.src = `https://www.google.com/recaptcha/api.js?render=${this.getReCaptchaSiteKey()}`;
            script.onload = resolve;
            script.onerror = reject;
            document.head.appendChild(script);
        });
    }

    getReCaptchaSiteKey() {
        // This should come from config
        return 'your-recaptcha-site-key';
    }

    setupValidation() {
        const validationRules = {
            name: [
                { rule: 'required', message: 'El nombre es obligatorio' },
                { rule: 'minLength', value: 2, message: 'El nombre debe tener al menos 2 caracteres' },
                { rule: 'maxLength', value: 50, message: 'El nombre no puede exceder 50 caracteres' },
                { rule: 'pattern', value: /^[a-zA-ZÀ-ÿ\s]+$/, message: 'El nombre solo puede contener letras y espacios' }
            ],
            email: [
                { rule: 'required', message: 'El email es obligatorio' },
                { rule: 'email', message: 'Por favor ingresa un email válido' },
                { rule: 'maxLength', value: 100, message: 'El email no puede exceder 100 caracteres' }
            ],
            phone: [
                { rule: 'pattern', value: /^[\+]?[0-9\s\-\(\)]{9,20}$/, message: 'Por favor ingresa un teléfono válido' }
            ],
            subject: [
                { rule: 'required', message: 'Selecciona un tipo de proyecto' }
            ],
            message: [
                { rule: 'required', message: 'El mensaje es obligatorio' },
                { rule: 'minLength', value: 10, message: 'El mensaje debe tener al menos 10 caracteres' },
                { rule: 'maxLength', value: this.config.maxMessageLength, message: `El mensaje no puede exceder ${this.config.maxMessageLength} caracteres` }
            ],
            privacy: [
                { rule: 'required', message: 'Debes aceptar la política de privacidad' }
            ]
        };

        this.validator = new FormValidator(this.form, validationRules, {
            validateOnBlur: true,
            validateOnInput: true,
            debounceTime: 300
        });
    }

    bindEvents() {
        // Form submission
        this.form.addEventListener('submit', (e) => {
            e.preventDefault();
            this.handleSubmit();
        });

        // Real-time character count for message
        this.fields.message.addEventListener('input', () => {
            this.updateCharacterCount();
        });

        // Budget selection
        const budgetInputs = this.form.querySelectorAll('input[name="budget"]');
        budgetInputs.forEach(input => {
            input.addEventListener('change', () => {
                this.trackBudgetSelection(input.value);
            });
        });

        // Form field focus events for analytics
        Object.keys(this.fields).forEach(fieldName => {
            const field = this.fields[fieldName];
            if (field && field.addEventListener) {
                field.addEventListener('focus', () => {
                    this.trackFieldFocus(fieldName);
                });
            }
        });

        // Auto-save form data
        this.form.addEventListener('input', this.debounce(() => {
            this.saveFormState();
        }, 1000));

        // Prevent form submission on Enter in text inputs
        this.form.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' && e.target.type !== 'textarea' && e.target.type !== 'submit') {
                e.preventDefault();
            }
        });
    }

    setupCharacterCount() {
        if (this.characterCount && this.fields.message) {
            this.updateCharacterCount();
        }
    }

    updateCharacterCount() {
        const currentLength = this.fields.message.value.length;
        const maxLength = this.config.maxMessageLength;
        
        if (this.characterCount) {
            this.characterCount.textContent = currentLength;
            
            // Update styling based on length
            const percentage = (currentLength / maxLength) * 100;
            if (percentage > 90) {
                this.characterCount.style.color = 'var(--color-error)';
            } else if (percentage > 75) {
                this.characterCount.style.color = 'var(--color-warning)';
            } else {
                this.characterCount.style.color = 'var(--color-text-muted)';
            }
        }
    }

    async handleSubmit() {
        if (this.isSubmitting) return;

        try {
            // Check rate limiting
            if (!this.checkRateLimit()) {
                this.showError('Has enviado demasiados mensajes recientemente. Espera un momento antes de intentar de nuevo.');
                return;
            }

            this.setSubmittingState(true);

            // Validate form
            const isValid = await this.validator.validate();
            if (!isValid) {
                this.setSubmittingState(false);
                this.showError('Por favor corrige los errores en el formulario antes de enviar.');
                return;
            }

            // Get reCAPTCHA token if enabled
            if (this.config.enableReCaptcha) {
                this.reCaptchaToken = await this.getReCaptchaToken();
                if (!this.reCaptchaToken) {
                    this.setSubmittingState(false);
                    this.showError('Error de verificación. Inténtalo de nuevo.');
                    return;
                }
            }

            // Prepare form data
            const formData = this.prepareFormData();

            // Send email
            const result = await this.emailService.sendEmail(formData);
            
            if (result.success) {
                this.handleSubmitSuccess();
            } else {
                this.handleSubmitError(result.error);
            }

        } catch (error) {
            console.error('Submit error:', error);
            this.handleSubmitError(error.message);
        }
    }

    checkRateLimit() {
        const now = Date.now();
        const timeSinceLastSubmit = now - this.lastSubmitTime;
        
        // Check minimum time between submits
        if (timeSinceLastSubmit < this.config.minTimeBetweenSubmits) {
            return false;
        }
        
        // Check maximum submits per hour
        const submitsInLastHour = this.getSubmitsInLastHour();
        if (submitsInLastHour >= this.config.maxSubmitsPerHour) {
            return false;
        }
        
        return true;
    }

    getSubmitsInLastHour() {
        const submits = JSON.parse(localStorage.getItem('contactFormSubmits') || '[]');
        const oneHourAgo = Date.now() - (60 * 60 * 1000);
        return submits.filter(timestamp => timestamp > oneHourAgo).length;
    }

    recordSubmit() {
        const submits = JSON.parse(localStorage.getItem('contactFormSubmits') || '[]');
        submits.push(Date.now());
        
        // Keep only last 24 hours
        const oneDayAgo = Date.now() - (24 * 60 * 60 * 1000);
        const recentSubmits = submits.filter(timestamp => timestamp > oneDayAgo);
        
        localStorage.setItem('contactFormSubmits', JSON.stringify(recentSubmits));
        this.lastSubmitTime = Date.now();
    }

    async getReCaptchaToken() {
        try {
            const token = await window.grecaptcha.execute(this.getReCaptchaSiteKey(), {
                action: 'contact_form'
            });
            return token;
        } catch (error) {
            console.error('reCAPTCHA error:', error);
            return null;
        }
    }

    prepareFormData() {
        // Get selected budget
        const selectedBudget = this.form.querySelector('input[name="budget"]:checked');
        
        return {
            name: this.fields.name.value.trim(),
            email: this.fields.email.value.trim(),
            phone: this.fields.phone.value.trim(),
            subject: this.fields.subject.value,
            budget: selectedBudget ? selectedBudget.value : '',
            timeline: this.fields.timeline.value,
            message: this.fields.message.value.trim(),
            newsletter: this.fields.newsletter.checked,
            timestamp: new Date().toISOString(),
            userAgent: navigator.userAgent,
            referrer: document.referrer,
            reCaptchaToken: this.reCaptchaToken
        };
    }

    setSubmittingState(isSubmitting) {
        this.isSubmitting = isSubmitting;
        
        if (this.submitBtn) {
            const btnText = this.submitBtn.querySelector('.btn-text');
            const btnLoading = this.submitBtn.querySelector('.btn-loading');
            
            if (isSubmitting) {
                this.submitBtn.disabled = true;
                if (btnText) btnText.style.display = 'none';
                if (btnLoading) btnLoading.style.display = 'flex';
            } else {
                this.submitBtn.disabled = false;
                if (btnText) btnText.style.display = 'block';
                if (btnLoading) btnLoading.style.display = 'none';
            }
        }
    }

    handleSubmitSuccess() {
        this.setSubmittingState(false);
        this.recordSubmit();
        this.clearFormState();
        
        // Show success message
        this.showSuccess();
        
        // Reset form
        this.form.reset();
        this.updateCharacterCount();
        this.validator.reset();
        
        // Track conversion
        this.trackFormSubmission(true);
        
        // Show notification
        showNotification('¡Mensaje enviado exitosamente! Te responderé pronto.', 'success');
        
        // Scroll to success message
        this.scrollToStatus();
    }

    handleSubmitError(errorMessage) {
        this.setSubmittingState(false);
        
        // Show error message
        this.showError(errorMessage || 'Ha ocurrido un error al enviar el mensaje. Inténtalo de nuevo.');
        
        // Track error
        this.trackFormSubmission(false, errorMessage);
        
        // Show notification
        showNotification('Error al enviar el mensaje. Por favor inténtalo de nuevo.', 'error');
        
        // Scroll to error message
        this.scrollToStatus();
    }

    showSuccess() {
        if (this.formStatus) {
            const successElement = this.formStatus.querySelector('#status-success');
            const errorElement = this.formStatus.querySelector('#status-error');
            
            if (errorElement) errorElement.style.display = 'none';
            if (successElement) successElement.style.display = 'flex';
            this.formStatus.style.display = 'block';
        }
    }

    showError(message) {
        if (this.formStatus) {
            const successElement = this.formStatus.querySelector('#status-success');
            const errorElement = this.formStatus.querySelector('#status-error');
            const errorText = errorElement?.querySelector('p');
            
            if (successElement) successElement.style.display = 'none';
            if (errorElement) {
                errorElement.style.display = 'flex';
                if (errorText) errorText.textContent = message;
            }
            this.formStatus.style.display = 'block';
        }
    }

    scrollToStatus() {
        setTimeout(() => {
            if (this.formStatus) {
                this.formStatus.scrollIntoView({ 
                    behavior: 'smooth', 
                    block: 'center' 
                });
            }
        }, 100);
    }

    // Form state persistence
    saveFormState() {
        const formData = {};
        
        Object.keys(this.fields).forEach(key => {
            const field = this.fields[key];
            if (field && field.type !== 'checkbox') {
                formData[key] = field.value;
            } else if (field && field.type === 'checkbox') {
                formData[key] = field.checked;
            }
        });
        
        // Save budget selection
        const selectedBudget = this.form.querySelector('input[name="budget"]:checked');
        if (selectedBudget) {
            formData.budget = selectedBudget.value;
        }
        
        localStorage.setItem('contactFormData', JSON.stringify(formData));
    }

    loadFormState() {
        try {
            const savedData = localStorage.getItem('contactFormData');
            if (!savedData) return;
            
            const formData = JSON.parse(savedData);
            
            Object.keys(formData).forEach(key => {
                const field = this.fields[key];
                
                if (key === 'budget') {
                    const budgetInput = this.form.querySelector(`input[name="budget"][value="${formData[key]}"]`);
                    if (budgetInput) budgetInput.checked = true;
                } else if (field && field.type !== 'checkbox') {
                    field.value = formData[key] || '';
                } else if (field && field.type === 'checkbox') {
                    field.checked = formData[key] || false;
                }
            });
            
            this.updateCharacterCount();
        } catch (error) {
            console.error('Error loading form state:', error);
        }
    }

    clearFormState() {
        localStorage.removeItem('contactFormData');
    }

    // Analytics methods
    trackFormSubmission(success, error = null) {
        if (!this.config.enableAnalytics || !window.gtag) return;
        
        window.gtag('event', 'form_submit', {
            event_category: 'Contact Form',
            event_label: success ? 'success' : 'error',
            value: success ? 1 : 0,
            custom_parameters: {
                error_message: error
            }
        });
    }

    trackFieldFocus(fieldName) {
        if (!this.config.enableAnalytics || !window.gtag) return;
        
        window.gtag('event', 'form_field_focus', {
            event_category: 'Contact Form',
            event_label: fieldName
        });
    }

    trackBudgetSelection(budget) {
        if (!this.config.enableAnalytics || !window.gtag) return;
        
        window.gtag('event', 'budget_selection', {
            event_category: 'Contact Form',
            event_label: budget,
            value: 1
        });
    }

    // Utility methods
    debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }

    // Public API methods
    reset() {
        this.form.reset();
        this.validator.reset();
        this.updateCharacterCount();
        this.clearFormState();
        
        if (this.formStatus) {
            this.formStatus.style.display = 'none';
        }
    }

    getFormData() {
        return this.prepareFormData();
    }

    isValid() {
        return this.validator.isValid();
    }

    // Cleanup
    destroy() {
        this.clearFormState();
        
        if (this.validator) {
            this.validator.destroy();
        }
        
        // Remove event listeners
        this.form.removeEventListener('submit', this.handleSubmit);
        this.fields.message.removeEventListener('input', this.updateCharacterCount);
    }
}

export default ContactForm;