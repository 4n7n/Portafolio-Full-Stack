export class FormValidator {
  constructor(form, rules = {}, options = {}) {
    this.form = typeof form === 'string' ? document.querySelector(form) : form;
    this.rules = rules;
    this.options = {
      showErrors: true,
      errorClass: 'error',
      successClass: 'success',
      errorContainer: '.form-error', // Cambiado para coincidir con el HTML
      validateOnBlur: true,
      validateOnInput: true,
      ...options
    };
    this.errors = {};
    this.init();
  }

  /**
   * Inicializa el validador
   */
  init() {
    if (!this.form) {
      console.warn('⚠️ FormValidator: Formulario no encontrado. Asegúrate de que el DOM esté cargado.');
      return false;
    }

    console.log('✅ FormValidator: Formulario encontrado:', this.form.id || this.form.className);
    this.setupEventListeners();
    return true;
  }

  /**
   * Configura los event listeners
   */
  setupEventListeners() {
    // Validación en envío del formulario
    this.form.addEventListener('submit', (e) => {
      console.log('📝 Validando formulario...');
      if (!this.validate()) {
        e.preventDefault();
        console.log('❌ Formulario inválido, envío cancelado');
      } else {
        console.log('✅ Formulario válido, enviando...');
      }
    });

    // Validación en tiempo real
    if (this.options.validateOnBlur || this.options.validateOnInput) {
      Object.keys(this.rules).forEach(fieldName => {
        const field = this.form.querySelector(`[name="${fieldName}"]`);
        if (field) {
          if (this.options.validateOnBlur) {
            field.addEventListener('blur', () => this.validateField(fieldName));
          }
          if (this.options.validateOnInput) {
            field.addEventListener('input', this.debounce(() => this.validateField(fieldName), 300));
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
    const field = this.form.querySelector(`[name="${fieldName}"]`);
    if (!field) {
      console.warn(`⚠️ Campo "${fieldName}" no encontrado`);
      return true;
    }

    const value = this.getFieldValue(field);
    const rules = this.rules[fieldName];
    const errors = [];

    // Ejecutar reglas de validación
    if (Array.isArray(rules)) {
      rules.forEach(rule => {
        const error = this.executeRule(value, rule, field);
        if (error) errors.push(error);
      });
    } else if (typeof rules === 'object') {
      Object.keys(rules).forEach(ruleName => {
        const ruleConfig = rules[ruleName];
        const error = this.executeRule(value, { type: ruleName, ...ruleConfig }, field);
        if (error) errors.push(error);
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
  }

  /**
   * Ejecuta una regla de validación
   * @param {any} value - Valor del campo
   * @param {Object} rule - Configuración de la regla
   * @param {Element} field - Elemento del campo
   * @returns {string|null}
   */
  executeRule(value, rule, field) {
    const { type, message, ...params } = rule;

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
        return params.validator(value, field) ? null : message || 'Valor no válido';

      default:
        console.warn(`Regla de validación desconocida: ${type}`);
        return null;
    }
  }

  /**
   * Validaciones individuales
   */
  validateRequired(value) {
    return value !== null && value !== undefined && value.toString().trim() !== '';
  }

  validateEmail(value) {
    if (!value) return true; // Solo validar si hay valor
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(value);
  }

  validateMinLength(value, min) {
    if (!value) return true;
    return value.toString().length >= min;
  }

  validateMaxLength(value, max) {
    if (!value) return true;
    return value.toString().length <= max;
  }

  validatePattern(value, regex) {
    if (!value) return true;
    const pattern = typeof regex === 'string' ? new RegExp(regex) : regex;
    return pattern.test(value);
  }

  validatePhone(value) {
    if (!value) return true;
    // Regex para teléfonos españoles e internacionales
    const phoneRegex = /^(\+34|0034|34)?[6789]\d{8}$|^(\+\d{1,3})?[\s.-]?\d{1,14}$/;
    return phoneRegex.test(value.replace(/[\s.-]/g, ''));
  }

  validateUrl(value) {
    if (!value) return true;
    try {
      new URL(value);
      return true;
    } catch {
      return false;
    }
  }

  validateNumber(value) {
    if (!value) return true;
    return !isNaN(value) && !isNaN(parseFloat(value));
  }

  validateMin(value, min) {
    if (!value) return true;
    return parseFloat(value) >= min;
  }

  validateMax(value, max) {
    if (!value) return true;
    return parseFloat(value) <= max;
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
    if (field.type === 'checkbox') {
      return field.checked;
    } else if (field.type === 'radio') {
      const checked = this.form.querySelector(`[name="${field.name}"]:checked`);
      return checked ? checked.value : '';
    } else if (field.tagName === 'SELECT' && field.multiple) {
      return Array.from(field.selectedOptions).map(option => option.value);
    } else {
      return field.value;
    }
  }

  /**
   * Muestra error en un campo
   * @param {Element} field - Elemento del campo
   * @param {string} message - Mensaje de error
   */
  showFieldError(field, message) {
    if (!this.options.showErrors) return;

    // Remover clases de éxito
    field.classList.remove(this.options.successClass);
    
    // Añadir clase de error
    field.classList.add(this.options.errorClass);

    // Buscar contenedor de error - múltiples selectores
    let errorContainer = field.parentNode.querySelector(this.options.errorContainer);
    
    // Si no encuentra .form-error, buscar .error-message
    if (!errorContainer) {
      errorContainer = field.parentNode.querySelector('.error-message');
    }
    
    // Si aún no encuentra, buscar span con clase similar
    if (!errorContainer) {
      errorContainer = field.parentNode.querySelector('span[class*="error"]');
    }

    if (errorContainer) {
      errorContainer.textContent = message;
      errorContainer.style.display = 'block';
      errorContainer.style.color = '#e74c3c';
    } else {
      // Crear contenedor de error si no existe
      const errorDiv = document.createElement('span');
      errorDiv.className = 'form-error';
      errorDiv.textContent = message;
      errorDiv.style.color = '#e74c3c';
      errorDiv.style.fontSize = '0.875rem';
      errorDiv.style.marginTop = '0.25rem';
      errorDiv.style.display = 'block';
      
      // Insertar después del campo
      field.parentNode.insertBefore(errorDiv, field.nextSibling);
    }
  }

  /**
   * Muestra éxito en un campo
   * @param {Element} field - Elemento del campo
   */
  showFieldSuccess(field) {
    if (!this.options.showErrors) return;

    // Remover clase de error
    field.classList.remove(this.options.errorClass);
    
    // Añadir clase de éxito
    field.classList.add(this.options.successClass);

    // Ocultar mensaje de error
    const errorSelectors = [
      this.options.errorContainer,
      '.error-message',
      '.form-error',
      'span[class*="error"]'
    ];

    errorSelectors.forEach(selector => {
      const errorContainer = field.parentNode.querySelector(selector);
      if (errorContainer) {
        errorContainer.style.display = 'none';
      }
    });
  }

  /**
   * Obtiene todos los errores
   * @returns {Object}
   */
  getErrors() {
    return this.errors;
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
        
        // Ocultar todos los tipos de contenedores de error
        const errorSelectors = [
          this.options.errorContainer,
          '.error-message',
          '.form-error',
          'span[class*="error"]'
        ];

        errorSelectors.forEach(selector => {
          const errorContainer = field.parentNode.querySelector(selector);
          if (errorContainer) {
            errorContainer.style.display = 'none';
          }
        });
      }
    });
  }

  /**
   * Restablece el formulario
   */
  reset() {
    this.form.reset();
    this.clearErrors();
  }

  /**
   * Obtiene los datos del formulario validados
   * @returns {Object|null}
   */
  getValidatedData() {
    if (!this.validate()) {
      return null;
    }

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
  }

  /**
   * Debounce helper
   */
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

  /**
   * Método estático para inicializar fácilmente
   */
  static init(formSelector, rules, options = {}) {
    // Esperar a que el DOM esté listo
    const initValidator = () => {
      const form = document.querySelector(formSelector);
      if (form) {
        return new FormValidator(form, rules, options);
      } else {
        console.warn(`⚠️ FormValidator: No se encontró el formulario "${formSelector}"`);
        return null;
      }
    };

    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', initValidator);
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
      { type: 'maxLength', max: 50, message: 'El nombre no puede exceder 50 caracteres' }
    ],
    email: [
      { type: 'required', message: 'El email es obligatorio' },
      { type: 'email', message: 'Introduce un email válido' }
    ],
    subject: [
      { type: 'required', message: 'El asunto es obligatorio' },
      { type: 'minLength', min: 5, message: 'El asunto debe tener al menos 5 caracteres' }
    ],
    message: [
      { type: 'required', message: 'El mensaje es obligatorio' },
      { type: 'minLength', min: 10, message: 'El mensaje debe tener al menos 10 caracteres' },
      { type: 'maxLength', max: 1000, message: 'El mensaje no puede exceder 1000 caracteres' }
    ]
    // ELIMINADO: phone (no existe en el HTML)
  },

  // Contacto completo con teléfono (para uso futuro)
  contactWithPhone: {
    name: [
      { type: 'required', message: 'El nombre es obligatorio' },
      { type: 'minLength', min: 2, message: 'El nombre debe tener al menos 2 caracteres' },
      { type: 'maxLength', max: 50, message: 'El nombre no puede exceder 50 caracteres' }
    ],
    email: [
      { type: 'required', message: 'El email es obligatorio' },
      { type: 'email', message: 'Introduce un email válido' }
    ],
    phone: [
      { type: 'phone', message: 'Introduce un teléfono válido' }
    ],
    subject: [
      { type: 'required', message: 'El asunto es obligatorio' },
      { type: 'minLength', min: 5, message: 'El asunto debe tener al menos 5 caracteres' }
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
      { type: 'email', message: 'Introduce un email válido' }
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
      { type: 'minLength', min: 2, message: 'El nombre debe tener al menos 2 caracteres' }
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
  const contactForm = document.querySelector('#contactForm');
  if (!contactForm) {
    console.log('📝 FormValidator: Formulario #contactForm no encontrado');
    return null;
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

  console.log(`📋 FormValidator: Campos detectados en formulario:`, presentFields);

  // Usar solo las reglas para los campos que existen
  return FormValidator.init('#contactForm', formFields, {
    errorContainer: '.form-error',
    validateOnBlur: true,
    validateOnInput: true
  });
};

// Auto-inicialización inteligente del formulario de contacto
if (typeof window !== 'undefined') {
  const autoInitContactForm = () => {
    const contactForm = document.querySelector('#contactForm');
    if (contactForm && !contactForm._formValidator) {
      console.log('🎯 Auto-inicializando validador del formulario de contacto...');
      const validator = initContactFormValidator();
      if (validator) {
        contactForm._formValidator = validator;
        console.log('✅ FormValidator inicializado automáticamente');
      }
    }
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', autoInitContactForm);
  } else {
    autoInitContactForm();
  }
}