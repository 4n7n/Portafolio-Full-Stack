class FormValidator {
    constructor(form, rules, options = {}) {
        this.form = form;
        this.rules = rules;
        this.options = {
            validateOnBlur: true,
            validateOnInput: false,
            validateOnSubmit: true,
            debounceTime: 300,
            showErrors: true,
            scrollToError: false,
            ...options
        };
        
        this.errors = {};
        this.isValidated = false;
        this.debounceTimers = {};
        
        this.init();
    }

    init() {
        this.bindEvents();
        this.setupErrorContainers();
    }

    bindEvents() {
        if (this.options.validateOnBlur) {
            this.form.addEventListener('blur', this.handleBlur.bind(this), true);
        }
        
        if (this.options.validateOnInput) {
            this.form.addEventListener('input', this.handleInput.bind(this), true);
        }
    }

    handleBlur(event) {
        const field = event.target;
        const fieldName = this.getFieldName(field);
        
        if (fieldName && this.rules[fieldName]) {
            this.validateField(fieldName, field);
        }
    }

    handleInput(event) {
        const field = event.target;
        const fieldName = this.getFieldName(field);
        
        if (fieldName && this.rules[fieldName]) {
            // Debounce input validation
            clearTimeout(this.debounceTimers[fieldName]);
            this.debounceTimers[fieldName] = setTimeout(() => {
                this.validateField(fieldName, field);
            }, this.options.debounceTime);
        }
    }

    getFieldName(field) {
        return field.name || field.id?.replace(/^[^-]+-/, '');
    }

    setupErrorContainers() {
        Object.keys(this.rules).forEach(fieldName => {
            const field = this.getField(fieldName);
            if (field) {
                this.ensureErrorContainer(fieldName);
            }
        });
    }

    ensureErrorContainer(fieldName) {
        const errorId = `${fieldName}-error`;
        let errorContainer = document.getElementById(errorId);
        
        if (!errorContainer) {
            const field = this.getField(fieldName);
            if (field) {
                errorContainer = document.createElement('span');
                errorContainer.id = errorId;
                errorContainer.className = 'form-error';
                errorContainer.setAttribute('role', 'alert');
                errorContainer.setAttribute('aria-live', 'polite');
                
                // Insert after field or its container
                const container = field.closest('.form-group') || field.parentNode;
                container.appendChild(errorContainer);
            }
        }
        
        return errorContainer;
    }

    getField(fieldName) {
        // Try different ways to find the field
        return this.form.querySelector(`[name="${fieldName}"]`) ||
               this.form.querySelector(`#${fieldName}`) ||
               this.form.querySelector(`#contact-${fieldName}`);
    }

    async validate() {
        this.errors = {};
        this.isValidated = true;
        
        const validationPromises = Object.keys(this.rules).map(async (fieldName) => {
            const field = this.getField(fieldName);
            if (field) {
                await this.validateField(fieldName, field);
            }
        });
        
        await Promise.all(validationPromises);
        
        const hasErrors = Object.keys(this.errors).length > 0;
        
        if (hasErrors && this.options.scrollToError) {
            this.scrollToFirstError();
        }
        
        return !hasErrors;
    }

    async validateField(fieldName, field) {
        const fieldRules = this.rules[fieldName];
        if (!fieldRules) return true;
        
        const value = this.getFieldValue(field);
        let isValid = true;
        let errorMessage = '';
        
        for (const rule of fieldRules) {
            const ruleResult = await this.applyRule(value, rule, field);
            if (!ruleResult.valid) {
                isValid = false;
                errorMessage = ruleResult.message;
                break; // Stop at first error
            }
        }
        
        this.updateFieldState(fieldName, field, isValid, errorMessage);
        return isValid;
    }

    getFieldValue(field) {
        if (!field) return '';
        
        switch (field.type) {
            case 'checkbox':
                return field.checked;
            case 'radio':
                const checkedRadio = this.form.querySelector(`[name="${field.name}"]:checked`);
                return checkedRadio ? checkedRadio.value : '';
            case 'select-multiple':
                return Array.from(field.selectedOptions).map(option => option.value);
            default:
                return field.value;
        }
    }

    async applyRule(value, rule, field) {
        const { rule: ruleName, message, value: ruleValue } = rule;
        
        switch (ruleName) {
            case 'required':
                return this.validateRequired(value, message);
                
            case 'email':
                return this.validateEmail(value, message);
                
            case 'minLength':
                return this.validateMinLength(value, ruleValue, message);
                
            case 'maxLength':
                return this.validateMaxLength(value, ruleValue, message);
                
            case 'pattern':
                return this.validatePattern(value, ruleValue, message);
                
            case 'min':
                return this.validateMin(value, ruleValue, message);
                
            case 'max':
                return this.validateMax(value, ruleValue, message);
                
            case 'match':
                return this.validateMatch(value, ruleValue, message);
                
            case 'custom':
                return await this.validateCustom(value, ruleValue, message, field);
                
            default:
                console.warn(`Unknown validation rule: ${ruleName}`);
                return { valid: true };
        }
    }

    validateRequired(value, message) {
        const isValid = value !== '' && value !== null && value !== undefined && 
                       (typeof value !== 'boolean' || value === true);
        return {
            valid: isValid,
            message: isValid ? '' : (message || 'Este campo es obligatorio')
        };
    }

    validateEmail(value, message) {
        if (!value) return { valid: true }; // Optional field
        
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const isValid = emailRegex.test(value);
        
        return {
            valid: isValid,
            message: isValid ? '' : (message || 'Por favor ingresa un email válido')
        };
    }

    validateMinLength(value, minLength, message) {
        if (!value) return { valid: true }; // Optional field
        
        const isValid = value.length >= minLength;
        return {
            valid: isValid,
            message: isValid ? '' : (message || `Debe tener al menos ${minLength} caracteres`)
        };
    }

    validateMaxLength(value, maxLength, message) {
        if (!value) return { valid: true }; // Optional field
        
        const isValid = value.length <= maxLength;
        return {
            valid: isValid,
            message: isValid ? '' : (message || `No puede exceder ${maxLength} caracteres`)
        };
    }

    validatePattern(value, pattern, message) {
        if (!value) return { valid: true }; // Optional field
        
        const isValid = pattern.test(value);
        return {
            valid: isValid,
            message: isValid ? '' : (message || 'Formato inválido')
        };
    }

    validateMin(value, min, message) {
        if (!value) return { valid: true }; // Optional field
        
        const numValue = parseFloat(value);
        const isValid = !isNaN(numValue) && numValue >= min;
        
        return {
            valid: isValid,
            message: isValid ? '' : (message || `El valor mínimo es ${min}`)
        };
    }

    validateMax(value, max, message) {
        if (!value) return { valid: true }; // Optional field
        
        const numValue = parseFloat(value);
        const isValid = !isNaN(numValue) && numValue <= max;
        
        return {
            valid: isValid,
            message: isValid ? '' : (message || `El valor máximo es ${max}`)
        };
    }

    validateMatch(value, fieldName, message) {
        const matchField = this.getField(fieldName);
        const matchValue = matchField ? this.getFieldValue(matchField) : '';
        
        const isValid = value === matchValue;
        return {
            valid: isValid,
            message: isValid ? '' : (message || 'Los campos no coinciden')
        };
    }

    async validateCustom(value, validatorFunction, message, field) {
        try {
            const result = await validatorFunction(value, field, this.form);
            
            if (typeof result === 'boolean') {
                return {
                    valid: result,
                    message: result ? '' : (message || 'Valor inválido')
                };
            }
            
            return result;
        } catch (error) {
            console.error('Custom validation error:', error);
            return {
                valid: false,
                message: message || 'Error de validación'
            };
        }
    }

    updateFieldState(fieldName, field, isValid, errorMessage) {
        if (isValid) {
            delete this.errors[fieldName];
        } else {
            this.errors[fieldName] = errorMessage;
        }
        
        if (this.options.showErrors) {
            this.showFieldError(fieldName, errorMessage);
        }
        
        this.updateFieldClasses(field, isValid);
        this.updateFieldAria(field, isValid, errorMessage);
    }

    showFieldError(fieldName, errorMessage) {
        const errorContainer = this.ensureErrorContainer(fieldName);
        if (errorContainer) {
            errorContainer.textContent = errorMessage;
            errorContainer.style.display = errorMessage ? 'block' : 'none';
        }
    }

    updateFieldClasses(field, isValid) {
        if (!field) return;
        
        // Remove existing validation classes
        field.classList.remove('valid', 'invalid', 'error');
        
        // Add appropriate class
        if (this.isValidated) {
            field.classList.add(isValid ? 'valid' : 'invalid');
        }
    }

    updateFieldAria(field, isValid, errorMessage) {
        if (!field) return;
        
        if (isValid) {
            field.removeAttribute('aria-invalid');
            field.removeAttribute('aria-describedby');
        } else {
            field.setAttribute('aria-invalid', 'true');
            const errorId = `${this.getFieldName(field)}-error`;
            field.setAttribute('aria-describedby', errorId);
        }
    }

    scrollToFirstError() {
        const firstErrorField = Object.keys(this.errors)[0];
        if (firstErrorField) {
            const field = this.getField(firstErrorField);
            if (field) {
                field.scrollIntoView({
                    behavior: 'smooth',
                    block: 'center'
                });
                
                // Focus the field after scrolling
                setTimeout(() => {
                    field.focus();
                }, 500);
            }
        }
    }

    // Sanitization methods
    sanitizeInput(value, type = 'text') {
        if (typeof value !== 'string') return value;
        
        switch (type) {
            case 'email':
                return value.toLowerCase().trim();
            case 'text':
            case 'textarea':
                return this.sanitizeText(value);
            case 'phone':
                return this.sanitizePhone(value);
            default:
                return value.trim();
        }
    }

    sanitizeText(text) {
        return text
            .trim()
            .replace(/\s+/g, ' ') // Multiple spaces to single space
            .replace(/[<>]/g, ''); // Remove potential HTML characters
    }

    sanitizePhone(phone) {
        return phone
            .replace(/[^\d\+\-\s\(\)]/g, '') // Keep only phone characters
            .trim();
    }

    // Public API methods
    isValid() {
        return Object.keys(this.errors).length === 0;
    }

    getErrors() {
        return { ...this.errors };
    }

    hasError(fieldName) {
        return fieldName in this.errors;
    }

    getError(fieldName) {
        return this.errors[fieldName] || '';
    }

    clearErrors() {
        this.errors = {};
        this.isValidated = false;
        
        Object.keys(this.rules).forEach(fieldName => {
            this.showFieldError(fieldName, '');
            const field = this.getField(fieldName);
            if (field) {
                this.updateFieldClasses(field, true);
                this.updateFieldAria(field, true, '');
            }
        });
    }

    reset() {
        this.clearErrors();
        
        // Clear all debounce timers
        Object.values(this.debounceTimers).forEach(timer => {
            clearTimeout(timer);
        });
        this.debounceTimers = {};
    }

    addRule(fieldName, rule) {
        if (!this.rules[fieldName]) {
            this.rules[fieldName] = [];
        }
        this.rules[fieldName].push(rule);
    }

    removeRule(fieldName, ruleName) {
        if (this.rules[fieldName]) {
            this.rules[fieldName] = this.rules[fieldName].filter(rule => rule.rule !== ruleName);
        }
    }

    updateRules(newRules) {
        this.rules = { ...this.rules, ...newRules };
        this.setupErrorContainers();
    }

    // Utility method for real-time validation display
    enableRealtimeValidation() {
        this.options.validateOnInput = true;
        this.form.addEventListener('input', this.handleInput.bind(this), true);
    }

    disableRealtimeValidation() {
        this.options.validateOnInput = false;
        this.form.removeEventListener('input', this.handleInput.bind(this), true);
    }

    // Destroy method for cleanup
    destroy() {
        // Clear timers
        Object.values(this.debounceTimers).forEach(timer => {
            clearTimeout(timer);
        });
        
        // Remove event listeners
        this.form.removeEventListener('blur', this.handleBlur, true);
        this.form.removeEventListener('input', this.handleInput, true);
        
        // Clear errors
        this.clearErrors();
    }
}

// Predefined validation rule sets
export const ValidationRules = {
    email: [
        { rule: 'required', message: 'El email es obligatorio' },
        { rule: 'email', message: 'Por favor ingresa un email válido' }
    ],
    
    password: [
        { rule: 'required', message: 'La contraseña es obligatoria' },
        { rule: 'minLength', value: 8, message: 'La contraseña debe tener al menos 8 caracteres' },
        { rule: 'pattern', value: /(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/, message: 'La contraseña debe contener al menos una mayúscula, una minúscula y un número' }
    ],
    
    name: [
        { rule: 'required', message: 'El nombre es obligatorio' },
        { rule: 'minLength', value: 2, message: 'El nombre debe tener al menos 2 caracteres' },
        { rule: 'pattern', value: /^[a-zA-ZÀ-ÿ\s]+$/, message: 'El nombre solo puede contener letras y espacios' }
    ],
    
    phone: [
        { rule: 'pattern', value: /^[\+]?[0-9\s\-\(\)]{9,20}$/, message: 'Por favor ingresa un teléfono válido' }
    ]
};

export default FormValidator;