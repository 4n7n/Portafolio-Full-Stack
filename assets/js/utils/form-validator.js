export class FormValidator {
  constructor(form, rules = {}, options = {}) {
    this.form = typeof form === 'string' ? document.querySelector(form) : form;
    this.rules = rules;
    this.options = {
      showErrors: true,
      errorClass: 'error',
      successClass: 'success',
      errorContainer: '.form-error',
      validateOnBlur: true,
      validateOnInput: true,
      debounceDelay: 300,
      ...options
    };
    this.errors = {};
    this.isInitialized = false;
    this.eventListeners = new Map(); // Para mejor gestión de eventos
    this.init();
  }

  /**
   * Inicializa el validador
   */
  init() {
    if (!this.form || !(this.form instanceof Element)) {
      console.warn('⚠️ FormValidator: Formulario no encontrado o inválido. Asegúrate de que el DOM esté cargado.');
      return false;
    }

    if (this.isInitialized) {
      console.warn('⚠️ FormValidator: Validador ya inicializado para este formulario');
      return true;
    }

    console.log('✅ FormValidator: Formulario encontrado:', this.form.id || this.form.className);
    this.setupEventListeners();
    this.isInitialized = true;
    return true;
  }

  /**
   * Configura los event listeners
   */
  setupEventListeners() {
    // Validación en envío del formulario
    const submitHandler = (e) => {
      console.log('📝 Validando formulario...');
      if (!this.validate()) {
        e.preventDefault();
        e.stopPropagation();
        console.log('❌ Formulario inválido, envío cancelado');
        
        // Hacer scroll al primer error
        this.scrollToFirstError();
      } else {
        console.log('✅ Formulario válido, enviando...');
      }
    };

    this.form.addEventListener('submit', submitHandler);
    this.eventListeners.set('submit', submitHandler);

    // Validación en tiempo real
    if (this.options.validateOnBlur || this.options.validateOnInput) {
      Object.keys(this.rules).forEach(fieldName => {
        const field = this.form.querySelector(`[name="${fieldName}"]`);
        if (field) {
          if (this.options.validateOnBlur) {
            const blurHandler = () => this.validateField(fieldName);
            field.addEventListener('blur', blurHandler);
            this.eventListeners.set(`blur-${fieldName}`, { element: field, handler: blurHandler });
          }
          
          if (this.options.validateOnInput) {
            const inputHandler = this.debounce(() => this.validateField(fieldName), this.options.debounceDelay);
            const eventType = field.type === 'checkbox' || field.type === 'radio' ? 'change' : 'input';
            field.addEventListener(eventType, inputHandler);
            this.eventListeners.set(`${eventType}-${fieldName}`, { element: field, handler: inputHandler });
          }
        } else {
          console.warn(`⚠️ Campo "${fieldName}" no encontrado en el formulario`);
        }
      });
    }
  }

  /**
   * Valida todo el formulario
   * @returns {boolean}
   */
  validate() {
    if (!this.form) {
      console.error('❌ No se puede validar: formulario no encontrado');
      return false;
    }

    this.errors = {};
    let isValid = true;

    Object.keys(this.rules).forEach(fieldName => {
      if (!this.validateField(fieldName)) {
        isValid = false;
      }
    });

    if (!isValid) {
      console.log('❌ Errores de validación:', this.errors);
    }

    return isValid;
  }

  /**
   * Valida un campo específico
   * @param {string} fieldName - Nombre del campo
   * @returns {boolean}
   */
  validateField(fieldName) {
    if (!fieldName || typeof fieldName !== 'string') {
      console.warn('⚠️ Nombre de campo inválido');
      return true;
    }

    const field = this.form.querySelector(`[name="${fieldName}"]`);
    if (!field) {
      console.warn(`⚠️ Campo "${fieldName}" no encontrado`);
      return true;
    }

    const value = this.getFieldValue(field);
    const rules = this.rules[fieldName];
    const errors = [];

    if (!rules) {
      return true;
    }

    try {
      // Ejecutar reglas de validación
      if (Array.isArray(rules)) {
        rules.forEach(rule => {
          if (rule && typeof rule === 'object') {
            const error = this.executeRule(value, rule, field);
            if (error) errors.push(error);
          }
        });
      } else if (typeof rules === 'object') {
        Object.keys(rules).forEach(ruleName => {
          const ruleConfig = rules[ruleName];
          if (ruleConfig && typeof ruleConfig === 'object') {
            const error = this.executeRule(value, { type: ruleName, ...ruleConfig }, field);
            if (error) errors.push(error);
          }
        });
      }

      // Almacenar errores
      if (errors.length > 0) {
        this.errors[fieldName] = errors;
        this.showFieldError(field, errors[0]);
        return false;
      } else {
        delete this.errors[fieldName];
        this.showFieldSuccess(field);
        return true;
      }
    } catch (error) {
      console.error(`Error validando campo ${fieldName}:`, error);
      return false;
    }
  }

  /**
   * Ejecuta una regla de validación
   * @param {any} value - Valor del campo
   * @param {Object} rule - Configuración de la regla
   * @param {Element} field - Elemento del campo
   * @returns {string|null}
   */
  executeRule(value, rule, field) {
    if (!rule || typeof rule !== 'object' || !rule.type) {
      console.warn('Regla de validación inválida:', rule);
      return null;
    }

    const { type, message, ...params } = rule;

    try {
      switch (type) {
        case 'required':
          return this.validateRequired(value) ? null : message || 'Este campo es obligatorio';

        case 'email':
          return this.validateEmail(value) ? null : message || 'Introduce un email válido';

        case 'minLength':
          return this.validateMinLength(value, params.min) ? null : 
                 message || `Mínimo ${params.min} caracteres`;

        case 'maxLength':
          return this.validateMaxLength(value, params.max) ? null : 
                 message || `Máximo ${params.max} caracteres`;

        case 'pattern':
          return this.validatePattern(value, params.regex) ? null : 
                 message || 'Formato no válido';

        case 'phone':
          return this.validatePhone(value) ? null : message || 'Número de teléfono no válido';

        case 'url':
          return this.validateUrl(value) ? null : message || 'URL no válida';

        case 'number':
          return this.validateNumber(value) ? null : message || 'Debe ser un número';

        case 'min':
          return this.validateMin(value, params.min) ? null : 
                 message || `El valor mínimo es ${params.min}`;

        case 'max':
          return this.validateMax(value, params.max) ? null : 
                 message || `El valor máximo es ${params.max}`;

        case 'match':
          const matchField = this.form.querySelector(`[name="${params.field}"]`);
          const matchValue = matchField ? this.getFieldValue(matchField) : '';
          return this.validateMatch(value, matchValue) ? null : 
                 message || 'Los campos no coinciden';

        case 'custom':
          if (typeof params.validator === 'function') {
            return params.validator(value, field) ? null : message || 'Valor no válido';
          } else {
            console.warn('Validador personalizado debe ser una función');
            return null;
          }

        default:
          console.warn(`Regla de validación desconocida: ${type}`);
          return null;
      }
    } catch (error) {
      console.error(`Error ejecutando regla ${type}:`, error);
      return message || 'Error de validación';
    }
  }

  /**
   * Validaciones individuales
   */
  validateRequired(value) {
    if (value === null || value === undefined) return false;
    if (typeof value === 'boolean') return value;
    if (Array.isArray(value)) return value.length > 0;
    return value.toString().trim() !== '';
  }

  validateEmail(value) {
    if (!value || typeof value !== 'string') return true; // Solo validar si hay valor
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(value.trim());
  }

  validateMinLength(value, min) {
    if (!value || typeof min !== 'number') return true;
    return value.toString().length >= min;
  }

  validateMaxLength(value, max) {
    if (!value || typeof max !== 'number') return true;
    return value.toString().length <= max;
  }

  validatePattern(value, regex) {
    if (!value) return true;
    
    try {
      const pattern = typeof regex === 'string' ? new RegExp(regex) : regex;
      if (!(pattern instanceof RegExp)) {
        console.warn('Patrón de validación inválido:', regex);
        return true;
      }
      return pattern.test(value.toString());
    } catch (error) {
      console.error('Error en validación de patrón:', error);
      return true;
    }
  }

  validatePhone(value) {
    if (!value || typeof value !== 'string') return true;
    // Regex mejorado para teléfonos españoles e internacionales
    const phoneRegex = /^(\+34|0034|34)?[6789]\d{8}$|^(\+\d{1,3})?[\s.-]?\(?\d{1,4}\)?[\s.-]?\d{1,14}$/;
    const cleanValue = value.replace(/[\s.-()]/g, '');
    return phoneRegex.test(cleanValue);
  }

  validateUrl(value) {
    if (!value || typeof value !== 'string') return true;
    
    try {
      const url = new URL(value);
      return ['http:', 'https:'].includes(url.protocol);
    } catch {
      return false;
    }
  }

  validateNumber(value) {
    if (!value) return true;
    const num = parseFloat(value);
    return !isNaN(num) && isFinite(num);
  }

  validateMin(value, min) {
    if (!value || typeof min !== 'number') return true;
    const num = parseFloat(value);
    return !isNaN(num) && num >= min;
  }

  validateMax(value, max) {
    if (!value || typeof max !== 'number') return true;
    const num = parseFloat(value);
    return !isNaN(num) && num <= max;
  }

  validateMatch(value1, value2) {
    return value1 === value2;
  }

  /**
   * Obtiene el valor de un campo
   * @param {Element} field - Elemento del campo
   * @returns {any}
   */
  getFieldValue(field) {
    if (!field) return '';

    try {
      switch (field.type) {
        case 'checkbox':
          return field.checked;
        case 'radio':
          const checked = this.form.querySelector(`[name="${field.name}"]:checked`);
          return checked ? checked.value : '';
        case 'file':
          return field.files;
        default:
          if (field.tagName === 'SELECT' && field.multiple) {
            return Array.from(field.selectedOptions).map(option => option.value);
          }
          return field.value || '';
      }
    } catch (error) {
      console.error('Error obteniendo valor del campo:', error);
      return '';
    }
  }

  /**
   * Muestra error en un campo
   * @param {Element} field - Elemento del campo
   * @param {string} message - Mensaje de error
   */
  showFieldError(field, message) {
    if (!this.options.showErrors || !field || !message) return;

    try {
      // Remover clases de éxito
      field.classList.remove(this.options.successClass);
      
      // Añadir clase de error
      field.classList.add(this.options.errorClass);

      // Buscar contenedor de error - múltiples selectores
      const errorSelectors = [
        this.options.errorContainer,
        '.form-error',
        '.error-message',
        'span[class*="error"]',
        '.field-error'
      ];

      let errorContainer = null;
      for (const selector of errorSelectors) {
        errorContainer = field.parentNode?.querySelector(selector);
        if (errorContainer) break;
      }

      if (errorContainer) {
        errorContainer.textContent = message;
        errorContainer.style.display = 'block';
        errorContainer.style.color = '#e74c3c';
        errorContainer.setAttribute('aria-live', 'polite');
      } else {
        // Crear contenedor de error si no existe
        errorContainer = this.createErrorContainer(message);
        if (errorContainer && field.parentNode) {
          field.parentNode.insertBefore(errorContainer, field.nextSibling);
        }
      }

      // Establecer atributos de accesibilidad
      field.setAttribute('aria-invalid', 'true');
      if (errorContainer) {
        const errorId = `error-${field.name || Date.now()}`;
        errorContainer.id = errorId;
        field.setAttribute('aria-describedby', errorId);
      }
    } catch (error) {
      console.error('Error mostrando error del campo:', error);
    }
  }

  /**
   * Crea un contenedor de error
   * @param {string} message - Mensaje de error
   * @returns {Element}
   */
  createErrorContainer(message) {
    try {
      const errorDiv = document.createElement('span');
      errorDiv.className = 'form-error';
      errorDiv.textContent = message;
      errorDiv.style.cssText = `
        color: #e74c3c;
        font-size: 0.875rem;
        margin-top: 0.25rem;
        display: block;
        line-height: 1.4;
      `;
      errorDiv.setAttribute('role', 'alert');
      return errorDiv;
    } catch (error) {
      console.error('Error creando contenedor de error:', error);
      return null;
    }
  }

  /**
   * Muestra éxito en un campo
   * @param {Element} field - Elemento del campo
   */
  showFieldSuccess(field) {
    if (!this.options.showErrors || !field) return;

    try {
      // Remover clase de error
      field.classList.remove(this.options.errorClass);
      
      // Añadir clase de éxito
      field.classList.add(this.options.successClass);

      // Ocultar mensaje de error
      const errorSelectors = [
        this.options.errorContainer,
        '.error-message',
        '.form-error',
        'span[class*="error"]',
        '.field-error'
      ];

      errorSelectors.forEach(selector => {
        const errorContainer = field.parentNode?.querySelector(selector);
        if (errorContainer) {
          errorContainer.style.display = 'none';
          errorContainer.textContent = '';
        }
      });

      // Limpiar atributos de accesibilidad
      field.removeAttribute('aria-invalid');
      field.removeAttribute('aria-describedby');
    } catch (error) {
      console.error('Error mostrando éxito del campo:', error);
    }
  }

  /**
   * Hace scroll al primer error
   */
  scrollToFirstError() {
    try {
      const firstErrorField = Object.keys(this.errors)[0];
      if (firstErrorField) {
        const field = this.form.querySelector(`[name="${firstErrorField}"]`);
        if (field) {
          field.scrollIntoView({ 
            behavior: 'smooth', 
            block: 'center',
            inline: 'nearest'
          });
          
          // Focus con delay para asegurar que el scroll termine
          setTimeout(() => {
            field.focus();
          }, 300);
        }
      }
    } catch (error) {
      console.error('Error haciendo scroll al primer error:', error);
    }
  }

  /**
   * Obtiene todos los errores
   * @returns {Object}
   */
  getErrors() {
    return { ...this.errors };
  }

  /**
   * Verifica si hay errores
   * @returns {boolean}
   */
  hasErrors() {
    return Object.keys(this.errors).length > 0;
  }

  /**
   * Limpia todos los errores
   */
  clearErrors() {
    this.errors = {};
    
    Object.keys(this.rules).forEach(fieldName => {
      const field = this.form.querySelector(`[name="${fieldName}"]`);
      if (field) {
        field.classList.remove(this.options.errorClass, this.options.successClass);
        field.removeAttribute('aria-invalid');
        field.removeAttribute('aria-describedby');
        
        // Ocultar todos los tipos de contenedores de error
        const errorSelectors = [
          this.options.errorContainer,
          '.error-message',
          '.form-error',
          'span[class*="error"]',
          '.field-error'
        ];

        errorSelectors.forEach(selector => {
          const errorContainer = field.parentNode?.querySelector(selector);
          if (errorContainer) {
            errorContainer.style.display = 'none';
            errorContainer.textContent = '';
          }
        });
      }
    });
  }

  /**
   * Restablece el formulario
   */
  reset() {
    if (this.form) {
      this.form.reset();
      this.clearErrors();
    }
  }

  /**
   * Obtiene los datos del formulario validados
   * @returns {Object|null}
   */
  getValidatedData() {
    if (!this.validate()) {
      return null;
    }

    try {
      const data = {};
      const formData = new FormData(this.form);
      
      for (let [key, value] of formData.entries()) {
        if (data[key]) {
          // Convertir a array si ya existe
          if (Array.isArray(data[key])) {
            data[key].push(value);
          } else {
            data[key] = [data[key], value];
          }
        } else {
          data[key] = value;
        }
      }

      return data;
    } catch (error) {
      console.error('Error obteniendo datos validados:', error);
      return null;
    }
  }

  /**
   * Destruye el validador y limpia eventos
   */
  destroy() {
    try {
      // Remover todos los event listeners
      this.eventListeners.forEach((listener, key) => {
        if (key === 'submit') {
          this.form.removeEventListener('submit', listener);
        } else if (listener.element && listener.handler) {
          const eventType = key.split('-')[0];
          listener.element.removeEventListener(eventType, listener.handler);
        }
      });

      this.eventListeners.clear();
      this.clearErrors();
      this.isInitialized = false;

      // Limpiar referencia del formulario
      if (this.form && this.form._formValidator === this) {
        delete this.form._formValidator;
      }
    } catch (error) {
      console.error('Error destruyendo validador:', error);
    }
  }

  /**
   * Debounce helper mejorado
   */
  debounce(func, wait) {
    if (typeof func !== 'function' || typeof wait !== 'number') {
      console.warn('Debounce: parámetros inválidos');
      return func;
    }

    let timeout;
    return function executedFunction(...args) {
      const later = () => {
        clearTimeout(timeout);
        timeout = null;
        try {
          func.apply(this, args);
        } catch (error) {
          console.error('Error en función debounced:', error);
        }
      };
      
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
    };
  }

  /**
   * Método estático para inicializar fácilmente
   */
  static init(formSelector, rules, options = {}) {
    if (!formSelector || typeof formSelector !== 'string') {
      console.error('FormValidator.init: selector de formulario requerido');
      return null;
    }

    // Esperar a que el DOM esté listo
    const initValidator = () => {
      try {
        const form = document.querySelector(formSelector);
        if (form) {
          // Evitar inicialización duplicada
          if (form._formValidator) {
            console.warn(`FormValidator ya inicializado para ${formSelector}`);
            return form._formValidator;
          }
          
          const validator = new FormValidator(form, rules, options);
          form._formValidator = validator;
          return validator;
        } else {
          console.warn(`⚠️ FormValidator: No se encontró el formulario "${formSelector}"`);
          return null;
        }
      } catch (error) {
        console.error('Error inicializando FormValidator:', error);
        return null;
      }
    };

    if (typeof document === 'undefined') {
      console.warn('FormValidator: document no disponible');
      return null;
    }

    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', initValidator);
      return null; // Retorna null porque se ejecutará después
    } else {
      return initValidator();
    }
  }
}

/**
 * Reglas de validación predefinidas
 */
export const ValidationRules = {
  // Contacto - coincide exactamente con el HTML del formulario
  contact: {
    name: [
      { type: 'required', message: 'El nombre es obligatorio' },
      { type: 'minLength', min: 2, message: 'El nombre debe tener al menos 2 caracteres' },
      { type: 'maxLength', max: 50, message: 'El nombre no puede exceder 50 caracteres' },
      { type: 'pattern', regex: /^[a-zA-ZáéíóúüñÁÉÍÓÚÜÑ\s]+$/, 
        message: 'El nombre solo puede contener letras y espacios' }
    ],
    email: [
      { type: 'required', message: 'El email es obligatorio' },
      { type: 'email', message: 'Introduce un email válido' },
      { type: 'maxLength', max: 254, message: 'Email demasiado largo' }
    ],
    subject: [
      { type: 'required', message: 'El asunto es obligatorio' },
      { type: 'minLength', min: 5, message: 'El asunto debe tener al menos 5 caracteres' },
      { type: 'maxLength', max: 100, message: 'El asunto no puede exceder 100 caracteres' }
    ],
    message: [
      { type: 'required', message: 'El mensaje es obligatorio' },
      { type: 'minLength', min: 10, message: 'El mensaje debe tener al menos 10 caracteres' },
      { type: 'maxLength', max: 1000, message: 'El mensaje no puede exceder 1000 caracteres' }
    ]
  },

  // Contacto completo con teléfono (para uso futuro)
  contactWithPhone: {
    name: [
      { type: 'required', message: 'El nombre es obligatorio' },
      { type: 'minLength', min: 2, message: 'El nombre debe tener al menos 2 caracteres' },
      { type: 'maxLength', max: 50, message: 'El nombre no puede exceder 50 caracteres' },
      { type: 'pattern', regex: /^[a-zA-ZáéíóúüñÁÉÍÓÚÜÑ\s]+$/, 
        message: 'El nombre solo puede contener letras y espacios' }
    ],
    email: [
      { type: 'required', message: 'El email es obligatorio' },
      { type: 'email', message: 'Introduce un email válido' },
      { type: 'maxLength', max: 254, message: 'Email demasiado largo' }
    ],
    phone: [
      { type: 'phone', message: 'Introduce un teléfono válido' }
    ],
    subject: [
      { type: 'required', message: 'El asunto es obligatorio' },
      { type: 'minLength', min: 5, message: 'El asunto debe tener al menos 5 caracteres' },
      { type: 'maxLength', max: 100, message: 'El asunto no puede exceder 100 caracteres' }
    ],
    message: [
      { type: 'required', message: 'El mensaje es obligatorio' },
      { type: 'minLength', min: 10, message: 'El mensaje debe tener al menos 10 caracteres' },
      { type: 'maxLength', max: 1000, message: 'El mensaje no puede exceder 1000 caracteres' }
    ]
  },

  // Newsletter
  newsletter: {
    email: [
      { type: 'required', message: 'El email es obligatorio' },
      { type: 'email', message: 'Introduce un email válido' },
      { type: 'maxLength', max: 254, message: 'Email demasiado largo' }
    ]
  },

  // Login
  login: {
    email: [
      { type: 'required', message: 'El email es obligatorio' },
      { type: 'email', message: 'Introduce un email válido' }
    ],
    password: [
      { type: 'required', message: 'La contraseña es obligatoria' },
      { type: 'minLength', min: 6, message: 'La contraseña debe tener al menos 6 caracteres' }
    ]
  },

  // Registro
  register: {
    name: [
      { type: 'required', message: 'El nombre es obligatorio' },
      { type: 'minLength', min: 2, message: 'El nombre debe tener al menos 2 caracteres' },
      { type: 'pattern', regex: /^[a-zA-ZáéíóúüñÁÉÍÓÚÜÑ\s]+$/, 
        message: 'El nombre solo puede contener letras y espacios' }
    ],
    email: [
      { type: 'required', message: 'El email es obligatorio' },
      { type: 'email', message: 'Introduce un email válido' }
    ],
    password: [
      { type: 'required', message: 'La contraseña es obligatoria' },
      { type: 'minLength', min: 8, message: 'La contraseña debe tener al menos 8 caracteres' },
      { type: 'pattern', regex: /(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/, 
        message: 'La contraseña debe contener mayúsculas, minúsculas y números' }
    ],
    confirmPassword: [
      { type: 'required', message: 'Confirma tu contraseña' },
      { type: 'match', field: 'password', message: 'Las contraseñas no coinciden' }
    ]
  }
};

/**
 * Función helper para inicializar validador de contacto fácilmente
 */
export const initContactFormValidator = () => {
  try {
    const contactForm = document.querySelector('#contactForm');
    if (!contactForm) {
      console.log('📝 FormValidator: Formulario #contactForm no encontrado');
      return null;
    }

    // Evitar inicialización duplicada
    if (contactForm._formValidator) {
      console.log('📝 FormValidator: Formulario #contactForm ya inicializado');
      return contactForm._formValidator;
    }

    // Detectar qué campos están realmente presentes en el formulario
    const availableFields = ['name', 'email', 'phone', 'subject', 'message'];
    const formFields = {};
    const presentFields = [];

    availableFields.forEach(fieldName => {
      const field = contactForm.querySelector(`[name="${fieldName}"]`);
      if (field) {
        presentFields.push(fieldName);
        if (ValidationRules.contact[fieldName]) {
          formFields[fieldName] = ValidationRules.contact[fieldName];
        } else if (ValidationRules.contactWithPhone[fieldName]) {
          formFields[fieldName] = ValidationRules.contactWithPhone[fieldName];
        }
      }
    });

    if (presentFields.length === 0) {
      console.warn('📝 FormValidator: No se encontraron campos válidos en el formulario');
      return null;
    }

    console.log(`📋 FormValidator: Campos detectados en formulario:`, presentFields);

    // Usar solo las reglas para los campos que existen
    return FormValidator.init('#contactForm', formFields, {
      errorContainer: '.form-error',
      validateOnBlur: true,
      validateOnInput: true,
      debounceDelay: 300
    });
  } catch (error) {
    console.error('Error inicializando validador de contacto:', error);
    return null;
  }
};

// Auto-inicialización inteligente del formulario de contacto
if (typeof window !== 'undefined') {
  const autoInitContactForm = () => {
    try {
      const contactForm = document.querySelector('#contactForm');
      if (contactForm && !contactForm._formValidator) {
        console.log('🎯 Auto-inicializando validador del formulario de contacto...');
        const validator = initContactFormValidator();
        if (validator) {
          console.log('✅ FormValidator inicializado automáticamente');
        }
      }
    } catch (error) {
      console.error('Error en auto-inicialización:', error);
    }
  };

  // Ejecutar cuando el DOM esté listo
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', autoInitContactForm);
  } else {
    // DOM ya está listo, ejecutar con un pequeño delay para asegurar que otros scripts se hayan ejecutado
    setTimeout(autoInitContactForm, 100);
  }
}