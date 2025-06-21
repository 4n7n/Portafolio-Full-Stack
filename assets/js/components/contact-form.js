import { FormValidator, ValidationRules } from '../utils/form-validator.js';
import { getEmailService } from '../services/email-service.js';
import { notify } from '../utils/notifications.js';
import { DOMHelpers } from '../utils/dom-helpers.js';
import { PORTFOLIO_CONFIG } from '../config/portfolio-config.js';

export class ContactForm {
  constructor(formSelector = '#contactForm') {
    this.form = DOMHelpers?.select ? DOMHelpers.select(formSelector) : document.querySelector(formSelector);
    this.submitButton = null;
    this.loadingSpinner = null;
    this.validator = null;
    this.emailService = null;
    this.isSubmitting = false;
    this.formSelector = formSelector;
    this.eventListeners = []; // Para limpiar listeners en destroy

    // Validar que se encontró el formulario
    if (!this.form) {
      console.warn(`⚠️ ContactForm: Formulario "${formSelector}" no encontrado`);
      return;
    }

    console.log(`✅ ContactForm: Formulario encontrado - ${formSelector}`);
    this.init();
  }

  /**
   * Inicializa el componente
   */
  init() {
    if (!this.form) {
      console.warn('ContactForm: No se puede inicializar sin formulario');
      return false;
    }

    try {
      this.setupElements();
      this.setupValidator();
      this.setupEmailService();
      this.setupEventListeners();
      this.setupHoneypot();
      
      console.log('✅ ContactForm: Inicializado correctamente');
      return true;
    } catch (error) {
      console.error('❌ Error al inicializar ContactForm:', error);
      return false;
    }
  }

  /**
   * Configura elementos del DOM
   */
  setupElements() {
    this.submitButton = this.form.querySelector('button[type="submit"]');
    
    if (!this.submitButton) {
      console.warn('⚠️ ContactForm: Botón de envío no encontrado');
      return;
    }
    
    // Crear spinner de carga si no existe
    if (!this.form.querySelector('.loading-spinner')) {
      const spinner = this.createElement('div', {
        className: 'loading-spinner',
        style: 'display: none; margin-left: 8px;',
        innerHTML: `
          <svg class="animate-spin" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M21 12a9 9 0 11-6.219-8.56"/>
          </svg>
        `
      });
      this.submitButton.appendChild(spinner);
      this.loadingSpinner = spinner;
    }
  }

  /**
   * Configura el validador de formulario
   */
  setupValidator() {
    try {
      if (typeof FormValidator !== 'undefined' && ValidationRules?.contact) {
        this.validator = new FormValidator(this.form, ValidationRules.contact, {
          showErrors: true,
          validateOnBlur: true,
          validateOnInput: true,
          errorClass: 'error',
          successClass: 'success'
        });
        console.log('✅ ContactForm: Validador configurado');
      } else {
        console.warn('⚠️ FormValidator o ValidationRules no disponibles');
        this.setupBasicValidation();
      }
    } catch (error) {
      console.warn('⚠️ Error al configurar validador:', error);
      this.setupBasicValidation();
    }
  }

  /**
   * Configuración básica de validación como fallback
   */
  setupBasicValidation() {
    this.validator = {
      validate: () => {
        const requiredFields = this.form.querySelectorAll('[required]');
        let isValid = true;
        
        requiredFields.forEach(field => {
          if (!field.value.trim()) {
            field.classList.add('error');
            isValid = false;
          } else {
            field.classList.remove('error');
          }
        });
        
        return isValid;
      },
      getValidatedData: () => {
        const formData = new FormData(this.form);
        const data = {};
        for (let [key, value] of formData.entries()) {
          data[key] = value;
        }
        return data;
      },
      clearErrors: () => {
        this.form.querySelectorAll('.error').forEach(el => el.classList.remove('error'));
      },
      hasErrors: () => {
        return this.form.querySelectorAll('.error').length > 0;
      },
      validateField: (fieldName) => {
        const field = this.form.querySelector(`[name="${fieldName}"]`);
        if (field && field.hasAttribute('required')) {
          if (!field.value.trim()) {
            field.classList.add('error');
            return false;
          } else {
            field.classList.remove('error');
            return true;
          }
        }
        return true;
      }
    };
  }

  /**
   * Configura el servicio de email
   */
  setupEmailService() {
    try {
      if (typeof getEmailService === 'function' && PORTFOLIO_CONFIG?.contact) {
        this.emailService = getEmailService(PORTFOLIO_CONFIG.contact);
      } else {
        console.warn('⚠️ ContactForm: getEmailService no disponible');
        // Fallback básico
        this.emailService = {
          send: async (data) => {
            console.log('📧 Simulando envío de email:', data);
            // Simular delay de red
            await new Promise(resolve => setTimeout(resolve, 1500));
            return { success: true, message: 'Email simulado enviado' };
          }
        };
      }
    } catch (error) {
      console.warn('⚠️ Error al configurar servicio de email:', error);
      this.emailService = {
        send: async () => ({ success: false, message: 'Servicio de email no disponible' })
      };
    }
  }

  /**
   * Configura los event listeners
   */
  setupEventListeners() {
    // Envío del formulario - usar arrow function para mantener contexto
    const handleSubmit = (e) => this.handleSubmit(e);
    this.form.addEventListener('submit', handleSubmit);
    this.eventListeners.push({ element: this.form, event: 'submit', handler: handleSubmit });

    // Contador de caracteres para textarea
    const messageField = this.form.querySelector('[name="message"]');
    if (messageField) {
      this.setupCharacterCounter(messageField);
    }

    // Auto-resize para textarea
    const textareas = this.form.querySelectorAll('textarea');
    textareas.forEach(textarea => {
      this.setupAutoResize(textarea);
    });

    // Validación en tiempo real mejorada
    this.setupEnhancedValidation();
  }

  /**
   * Configura protección honeypot anti-spam
   */
  setupHoneypot() {
    // Solo añadir si no existe ya
    if (this.form.querySelector('[name="website"]')) return;
    
    const honeypot = this.createElement('input', {
      type: 'text',
      name: 'website',
      style: 'position: absolute; left: -9999px; visibility: hidden;',
      tabindex: '-1',
      autocomplete: 'off',
      'aria-hidden': 'true'
    });
    this.form.appendChild(honeypot);
  }

  /**
   * Helper para crear elementos (fallback si DOMHelpers no está disponible)
   */
  createElement(tag, options = {}) {
    if (DOMHelpers?.createElement) {
      return DOMHelpers.createElement(tag, options);
    }
    
    // Fallback manual
    const element = document.createElement(tag);
    
    Object.keys(options).forEach(key => {
      if (key === 'className') {
        element.className = options[key];
      } else if (key === 'innerHTML') {
        element.innerHTML = options[key];
      } else if (key === 'style') {
        element.style.cssText = options[key];
      } else {
        element.setAttribute(key, options[key]);
      }
    });
    
    return element;
  }

  /**
   * Configura contador de caracteres
   */
  setupCharacterCounter(textarea) {
    const maxLength = parseInt(textarea.getAttribute('maxlength')) || 1000;
    
    // Solo añadir si no existe ya
    if (textarea.parentNode.querySelector('.character-counter')) return;
    
    const counter = this.createElement('div', {
      className: 'character-counter',
      style: 'font-size: 0.875rem; color: #6b7280; margin-top: 0.25rem;'
    });
    counter.textContent = `0/${maxLength}`;

    textarea.parentNode.appendChild(counter);

    const updateCounter = () => {
      const current = textarea.value.length;
      counter.textContent = `${current}/${maxLength}`;
      
      if (current > maxLength * 0.9) {
        counter.style.color = '#f59e0b';
      } else if (current > maxLength * 0.8) {
        counter.style.color = '#ef4444';
      } else {
        counter.style.color = '#6b7280';
      }
    };

    textarea.addEventListener('input', updateCounter);
    this.eventListeners.push({ element: textarea, event: 'input', handler: updateCounter });
  }

  /**
   * Configura auto-resize para textarea
   */
  setupAutoResize(textarea) {
    const autoResize = () => {
      textarea.style.height = 'auto';
      textarea.style.height = Math.min(textarea.scrollHeight, 200) + 'px'; // Máximo 200px
    };

    textarea.addEventListener('input', autoResize);
    this.eventListeners.push({ element: textarea, event: 'input', handler: autoResize });
    
    // Aplicar resize inicial
    autoResize();
  }

  /**
   * Configura validación mejorada
   */
  setupEnhancedValidation() {
    // Validación de email con sugerencias
    const emailField = this.form.querySelector('[name="email"]');
    if (emailField) {
      const validateEmail = () => this.validateEmailWithSuggestions(emailField);
      emailField.addEventListener('blur', validateEmail);
      this.eventListeners.push({ element: emailField, event: 'blur', handler: validateEmail });
    }

    // Validación de teléfono con formato (si existe)
    const phoneField = this.form.querySelector('[name="phone"]');
    if (phoneField) {
      const formatPhone = () => this.formatPhoneNumber(phoneField);
      phoneField.addEventListener('input', formatPhone);
      this.eventListeners.push({ element: phoneField, event: 'input', handler: formatPhone });
    }
  }

  /**
   * Valida email con sugerencias de corrección
   */
  validateEmailWithSuggestions(emailField) {
    const email = emailField.value.trim();
    if (!email || !email.includes('@')) return;

    const commonDomains = ['gmail.com', 'hotmail.com', 'outlook.com', 'yahoo.com', 'icloud.com'];
    const emailParts = email.split('@');
    
    if (emailParts.length === 2) {
      const domain = emailParts[1].toLowerCase();
      const suggestion = this.findClosestDomain(domain, commonDomains);
      
      if (suggestion && suggestion !== domain) {
        this.showEmailSuggestion(emailField, `${emailParts[0]}@${suggestion}`);
      }
    }
  }

  /**
   * Encuentra el dominio más cercano usando distancia de Levenshtein
   */
  findClosestDomain(domain, domains) {
    let closest = null;
    let minDistance = Infinity;

    domains.forEach(validDomain => {
      const distance = this.levenshteinDistance(domain, validDomain);
      if (distance < minDistance && distance <= 2) {
        minDistance = distance;
        closest = validDomain;
      }
    });

    return closest;
  }

  /**
   * Calcula distancia de Levenshtein
   */
  levenshteinDistance(str1, str2) {
    const matrix = Array(str2.length + 1).fill(null).map(() => Array(str1.length + 1).fill(null));

    for (let i = 0; i <= str1.length; i++) matrix[0][i] = i;
    for (let j = 0; j <= str2.length; j++) matrix[j][0] = j;

    for (let j = 1; j <= str2.length; j++) {
      for (let i = 1; i <= str1.length; i++) {
        const indicator = str1[i - 1] === str2[j - 1] ? 0 : 1;
        matrix[j][i] = Math.min(
          matrix[j][i - 1] + 1,     // deletion
          matrix[j - 1][i] + 1,     // insertion
          matrix[j - 1][i - 1] + indicator // substitution
        );
      }
    }

    return matrix[str2.length][str1.length];
  }

  /**
   * Muestra sugerencia de email
   */
  showEmailSuggestion(emailField, suggestion) {
    const existingSuggestion = emailField.parentNode.querySelector('.email-suggestion');
    if (existingSuggestion) {
      existingSuggestion.remove();
    }

    const suggestionEl = this.createElement('div', {
      className: 'email-suggestion',
      style: 'font-size: 0.875rem; color: #3b82f6; margin-top: 0.25rem;'
    });
    
    suggestionEl.innerHTML = `
      ¿Quisiste decir <button type="button" class="suggestion-link" style="color: #3b82f6; text-decoration: underline; background: none; border: none; cursor: pointer; padding: 0;">${suggestion}</button>?
    `;

    emailField.parentNode.appendChild(suggestionEl);

    const suggestionLink = suggestionEl.querySelector('.suggestion-link');
    const handleSuggestionClick = () => {
      emailField.value = suggestion;
      suggestionEl.remove();
      if (this.validator && this.validator.validateField) {
        this.validator.validateField('email');
      }
    };

    suggestionLink.addEventListener('click', handleSuggestionClick);

    // Auto-hide después de 10 segundos
    const timeoutId = setTimeout(() => {
      if (suggestionEl.parentNode) {
        suggestionEl.remove();
      }
    }, 10000);

    // Limpiar timeout si se remueve manualmente
    suggestionEl.timeoutId = timeoutId;
  }

  /**
   * Formatea número de teléfono
   */
  formatPhoneNumber(phoneField) {
    let value = phoneField.value.replace(/\D/g, ''); // Solo números
    
    // Formato español: +34 XXX XXX XXX
    if (value.startsWith('34') && value.length > 2) {
      value = value.substring(2);
    }
    
    if (value.length >= 9) {
      value = value.substring(0, 9);
      value = `+34 ${value.substring(0, 3)} ${value.substring(3, 6)} ${value.substring(6)}`;
    } else if (value.length >= 6) {
      value = `+34 ${value.substring(0, 3)} ${value.substring(3, 6)} ${value.substring(6)}`;
    } else if (value.length >= 3) {
      value = `+34 ${value.substring(0, 3)} ${value.substring(3)}`;
    } else if (value.length > 0) {
      value = `+34 ${value}`;
    }

    phoneField.value = value;
  }

  /**
   * Maneja el envío del formulario
   */
  async handleSubmit(e) {
    e.preventDefault();

    if (this.isSubmitting) {
      console.log('Form submission already in progress');
      return;
    }

    // Verificar honeypot
    const honeypot = this.form.querySelector('[name="website"]');
    if (honeypot && honeypot.value.trim()) {
      this.showNotification('Error: Envío detectado como spam', 'error');
      return;
    }

    // Validar formulario
    if (!this.validator || !this.validator.validate()) {
      this.showNotification('Por favor corrige los errores antes de enviar', 'warning');
      this.focusFirstError();
      return;
    }

    this.setLoadingState(true);

    try {
      const formData = this.validator.getValidatedData();
      
      // Añadir metadata
      formData.timestamp = new Date().toISOString();
      formData.userAgent = navigator.userAgent;
      formData.url = window.location.href;

      const result = await this.emailService.send(formData);

      if (result.success) {
        this.showNotification('¡Mensaje enviado! Te responderé lo antes posible', 'success');
        this.handleSuccess();
      } else {
        throw new Error(result.message || 'Error en el envío');
      }

    } catch (error) {
      console.error('Error enviando formulario:', error);
      this.showNotification('Error al enviar. Inténtalo de nuevo o contáctame directamente', 'error');
      this.handleError(error);
    } finally {
      this.setLoadingState(false);
    }
  }

  /**
   * Muestra notificaciones (fallback si notify no está disponible)
   */
  showNotification(message, type = 'info') {
    if (typeof notify !== 'undefined' && notify[type]) {
      switch (type) {
        case 'success':
          notify.success('¡Éxito!', message);
          break;
        case 'error':
          notify.error('Error', message);
          break;
        case 'warning':
          notify.warning('Atención', message);
          break;
        default:
          notify.info('Info', message);
      }
    } else {
      // Fallback más elegante que alert
      console.log(`${type.toUpperCase()}: ${message}`);
      // Crear notificación simple en el DOM
      this.createSimpleNotification(message, type);
    }
  }

  /**
   * Crea una notificación simple en el DOM
   */
  createSimpleNotification(message, type) {
    const notification = this.createElement('div', {
      className: `notification notification-${type}`,
      style: `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 12px 16px;
        border-radius: 4px;
        color: white;
        z-index: 1000;
        max-width: 300px;
        background-color: ${type === 'success' ? '#10b981' : type === 'error' ? '#ef4444' : type === 'warning' ? '#f59e0b' : '#3b82f6'};
      `
    });
    notification.textContent = message;

    document.body.appendChild(notification);

    // Auto-remove después de 5 segundos
    setTimeout(() => {
      if (notification.parentNode) {
        notification.remove();
      }
    }, 5000);
  }

  /**
   * Establece estado de carga
   */
  setLoadingState(loading) {
    this.isSubmitting = loading;

    if (!this.submitButton) return;

    if (loading) {
      this.submitButton.disabled = true;
      this.submitButton.classList.add('loading');
      if (this.loadingSpinner) {
        this.loadingSpinner.style.display = 'inline-block';
      }
    } else {
      this.submitButton.disabled = false;
      this.submitButton.classList.remove('loading');
      if (this.loadingSpinner) {
        this.loadingSpinner.style.display = 'none';
      }
    }
  }

  /**
   * Maneja envío exitoso
   */
  handleSuccess() {
    // Limpiar formulario
    this.form.reset();
    if (this.validator && this.validator.clearErrors) {
      this.validator.clearErrors();
    }

    // Reset auto-resize textareas
    const textareas = this.form.querySelectorAll('textarea');
    textareas.forEach(textarea => {
      textarea.style.height = 'auto';
    });

    // Scroll al formulario para mostrar el mensaje
    this.form.scrollIntoView({ behavior: 'smooth', block: 'center' });

    // Analíticas (si están configuradas)
    if (typeof gtag !== 'undefined') {
      gtag('event', 'form_submit', {
        event_category: 'contact',
        event_label: 'contact_form'
      });
    }
  }

  /**
   * Maneja errores
   */
  handleError(error) {
    // Log del error para debugging
    console.error('Contact form error:', {
      error: error.message,
      stack: error.stack,
      timestamp: new Date().toISOString()
    });

    // Analíticas de error
    if (typeof gtag !== 'undefined') {
      gtag('event', 'form_error', {
        event_category: 'contact',
        event_label: error.message
      });
    }
  }

  /**
   * Enfoca el primer campo con error
   */
  focusFirstError() {
    const firstError = this.form.querySelector('.error');
    if (firstError) {
      firstError.focus();
      firstError.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  }

  /**
   * Métodos públicos para control externo
   */
  reset() {
    if (!this.form) return;
    
    this.form.reset();
    if (this.validator && this.validator.clearErrors) {
      this.validator.clearErrors();
    }
    
    // Reset textareas
    const textareas = this.form.querySelectorAll('textarea');
    textareas.forEach(textarea => {
      textarea.style.height = 'auto';
    });
  }

  setFieldValue(fieldName, value) {
    if (!this.form) return;
    
    const field = this.form.querySelector(`[name="${fieldName}"]`);
    if (field) {
      field.value = value;
      if (this.validator && this.validator.validateField) {
        this.validator.validateField(fieldName);
      }
    }
  }

  getFormData() {
    return this.validator ? this.validator.getValidatedData() : null;
  }

  isValid() {
    return this.validator ? !this.validator.hasErrors() : false;
  }

  /**
   * Destructor
   */
  destroy() {
    // Limpiar todos los event listeners
    this.eventListeners.forEach(({ element, event, handler }) => {
      element.removeEventListener(event, handler);
    });
    this.eventListeners = [];

    // Limpiar timeouts de sugerencias
    const suggestions = this.form?.querySelectorAll('.email-suggestion');
    suggestions?.forEach(suggestion => {
      if (suggestion.timeoutId) {
        clearTimeout(suggestion.timeoutId);
      }
    });

    // Limpiar referencias
    this.form = null;
    this.submitButton = null;
    this.loadingSpinner = null;
    this.validator = null;
    this.emailService = null;
  }
}

// Auto-inicialización inteligente
const autoInitContactForm = () => {
  const formSelectors = ['#contactForm', '#contact-form', '.contact-form'];
  
  for (const selector of formSelectors) {
    const form = document.querySelector(selector);
    if (form && !form._contactFormInstance) {
      console.log(`🎯 Auto-inicializando ContactForm para ${selector}...`);
      try {
        form._contactFormInstance = new ContactForm(selector);
        if (typeof window !== 'undefined') {
          window.contactFormInstance = form._contactFormInstance;
        }
        break;
      } catch (error) {
        console.error(`Error al auto-inicializar ContactForm:`, error);
      }
    }
  }
};

// Solo auto-inicializar si no se está usando desde app.js
if (typeof window !== 'undefined' && !window.portfolioApp) {
  if (DOMHelpers?.ready) {
    DOMHelpers.ready(autoInitContactForm);
  } else if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', autoInitContactForm);
  } else {
    autoInitContactForm();
  }
}