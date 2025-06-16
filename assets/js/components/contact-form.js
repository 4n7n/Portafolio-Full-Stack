import { FormValidator, ValidationRules } from '../utils/form-validator.js';
import { getEmailService } from '../services/email-service.js';
import { notify } from '../utils/notifications.js';
import { DOMHelpers } from '../utils/dom-helpers.js';
import { PORTFOLIO_CONFIG } from '../config/portfolio-config.js';

export class ContactForm {
  constructor(formSelector = '#contactForm') { // Corregido: usar #contactForm
    // Manejar caso donde DOMHelpers no esté disponible
    this.form = DOMHelpers?.select ? DOMHelpers.select(formSelector) : document.querySelector(formSelector);
    this.submitButton = null;
    this.loadingSpinner = null;
    this.validator = null;
    this.emailService = null;
    this.isSubmitting = false;
    this.formSelector = formSelector;

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
      this.setupHoneypot(); // Protección anti-spam
      
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
      this.validator = new FormValidator(this.form, ValidationRules.contact, {
        showErrors: true,
        validateOnBlur: true,
        validateOnInput: true,
        errorClass: 'error',
        successClass: 'success'
      });
      console.log('✅ ContactForm: Validador configurado');
    } catch (error) {
      console.warn('⚠️ Error al configurar validador:', error);
    }
  }

  /**
   * Configura el servicio de email
   */
  setupEmailService() {
    try {
      if (typeof getEmailService === 'function') {
        this.emailService = getEmailService(PORTFOLIO_CONFIG?.contact);
      } else {
        console.warn('⚠️ ContactForm: getEmailService no disponible');
        // Fallback básico
        this.emailService = {
          send: async (data) => {
            console.log('📧 Simulando envío de email:', data);
            return { success: true, message: 'Email simulado enviado' };
          }
        };
      }
    } catch (error) {
      console.warn('⚠️ Error al configurar servicio de email:', error);
    }
  }

  /**
   * Configura los event listeners
   */
  setupEventListeners() {
    // Envío del formulario
    this.form.addEventListener('submit', (e) => this.handleSubmit(e));

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
      autocomplete: 'off'
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
    if (options.className) element.className = options.className;
    if (options.innerHTML) element.innerHTML = options.innerHTML;
    if (options.style) element.style.cssText = options.style;
    if (options.tabindex) element.tabIndex = options.tabindex;
    if (options.autocomplete) element.autocomplete = options.autocomplete;
    if (options.type) element.type = options.type;
    if (options.name) element.name = options.name;
    return element;
  }

  /**
   * Configura contador de caracteres
   */
  setupCharacterCounter(textarea) {
    const maxLength = textarea.getAttribute('maxlength') || 1000;
    
    // Solo añadir si no existe ya
    if (textarea.parentNode.querySelector('.character-counter')) return;
    
    const counter = this.createElement('div', {
      className: 'character-counter',
      style: 'font-size: 0.875rem; color: #6b7280; margin-top: 0.25rem;'
    });
    counter.textContent = `0/${maxLength}`;

    textarea.parentNode.appendChild(counter);

    textarea.addEventListener('input', () => {
      const current = textarea.value.length;
      counter.textContent = `${current}/${maxLength}`;
      
      if (current > maxLength * 0.9) {
        counter.style.color = '#f59e0b';
      } else {
        counter.style.color = '#6b7280';
      }
    });
  }

  /**
   * Configura auto-resize para textarea
   */
  setupAutoResize(textarea) {
    textarea.addEventListener('input', () => {
      textarea.style.height = 'auto';
      textarea.style.height = textarea.scrollHeight + 'px';
    });
    
    // Aplicar resize inicial
    textarea.style.height = 'auto';
    textarea.style.height = textarea.scrollHeight + 'px';
  }

  /**
   * Configura validación mejorada
   */
  setupEnhancedValidation() {
    // Validación de email con sugerencias
    const emailField = this.form.querySelector('[name="email"]');
    if (emailField) {
      emailField.addEventListener('blur', () => {
        this.validateEmailWithSuggestions(emailField);
      });
    }

    // Validación de teléfono con formato (si existe)
    const phoneField = this.form.querySelector('[name="phone"]');
    if (phoneField) {
      phoneField.addEventListener('input', () => {
        this.formatPhoneNumber(phoneField);
      });
    }
  }

  /**
   * Valida email con sugerencias de corrección
   */
  validateEmailWithSuggestions(emailField) {
    const email = emailField.value.trim();
    if (!email || email.includes('@')) return;

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
   * Encuentra el dominio más cercano
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
    const matrix = [];

    for (let i = 0; i <= str2.length; i++) {
      matrix[i] = [i];
    }

    for (let j = 0; j <= str1.length; j++) {
      matrix[0][j] = j;
    }

    for (let i = 1; i <= str2.length; i++) {
      for (let j = 1; j <= str1.length; j++) {
        if (str2.charAt(i - 1) === str1.charAt(j - 1)) {
          matrix[i][j] = matrix[i - 1][j - 1];
        } else {
          matrix[i][j] = Math.min(
            matrix[i - 1][j - 1] + 1,
            matrix[i][j - 1] + 1,
            matrix[i - 1][j] + 1
          );
        }
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
      ¿Quisiste decir <button type="button" class="suggestion-link" style="color: #3b82f6; text-decoration: underline; background: none; border: none; cursor: pointer;">${suggestion}</button>?
    `;

    emailField.parentNode.appendChild(suggestionEl);

    const suggestionLink = suggestionEl.querySelector('.suggestion-link');
    suggestionLink.addEventListener('click', () => {
      emailField.value = suggestion;
      suggestionEl.remove();
      if (this.validator) {
        this.validator.validateField('email');
      }
    });

    // Auto-hide después de 10 segundos
    setTimeout(() => {
      if (suggestionEl.parentNode) {
        suggestionEl.remove();
      }
    }, 10000);
  }

  /**
   * Formatea número de teléfono
   */
  formatPhoneNumber(phoneField) {
    let value = phoneField.value.replace(/\D/g, ''); // Solo números
    
    // Formato español: +34 XXX XXX XXX
    if (value.startsWith('34')) {
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

    if (this.isSubmitting) return;

    // Verificar honeypot
    const honeypot = this.form.querySelector('[name="website"]');
    if (honeypot && honeypot.value) {
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
      // Fallback simple
      alert(message);
    }
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
    if (this.validator) {
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
    this.form.reset();
    if (this.validator) {
      this.validator.clearErrors();
    }
  }

  setFieldValue(fieldName, value) {
    const field = this.form.querySelector(`[name="${fieldName}"]`);
    if (field) {
      field.value = value;
      if (this.validator) {
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
    if (this.form) {
      // Limpiar event listeners añadidos
      this.form.removeEventListener('submit', this.handleSubmit);
    }
  }
}

// Auto-inicialización inteligente si existe el formulario en el DOM
const autoInitContactForm = () => {
  // Buscar formularios con IDs comunes
  const formSelectors = ['#contactForm', '#contact-form', '.contact-form'];
  
  for (const selector of formSelectors) {
    const form = document.querySelector(selector);
    if (form && !form._contactFormInstance) {
      console.log(`🎯 Auto-inicializando ContactForm para ${selector}...`);
      form._contactFormInstance = new ContactForm(selector);
      window.contactFormInstance = form._contactFormInstance;
      break;
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