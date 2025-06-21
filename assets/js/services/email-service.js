export class EmailService {
  constructor(config = {}) {
    this.config = {
      provider: 'emailjs', // 'emailjs' | 'formspree' | 'netlify' | 'custom'
      emailjs: {
        serviceId: '',
        templateId: '',
        publicKey: '',
        ...config.emailjs
      },
      formspree: {
        endpoint: '',
        ...config.formspree
      },
      netlify: {
        endpoint: '',
        ...config.netlify
      },
      custom: {
        endpoint: '',
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        ...config.custom
      },
      ...config
    };

    this.initialized = false;
  }

  /**
   * Inicializa el servicio de email
   */
  async init() {
    if (this.initialized) return;

    try {
      switch (this.config.provider) {
        case 'emailjs':
          await this.initEmailJS();
          break;
        case 'formspree':
          // Formspree no requiere inicialización especial
          break;
        case 'netlify':
          // Netlify Forms no requiere inicialización especial
          break;
        case 'custom':
          // Endpoint personalizado
          break;
        default:
          throw new Error(`Proveedor no soportado: ${this.config.provider}`);
      }

      this.initialized = true;
      console.log('Servicio de email inicializado correctamente');
    } catch (error) {
      console.error('Error inicializando servicio de email:', error);
      throw error;
    }
  }

  /**
   * Inicializa EmailJS
   */
  async initEmailJS() {
    if (typeof window !== 'undefined' && typeof window.emailjs === 'undefined') {
      // Cargar EmailJS dinámicamente
      await this.loadEmailJS();
    }

    if (!this.config.emailjs.publicKey) {
      throw new Error('Public Key de EmailJS no configurada');
    }

    // Verificar que emailjs esté disponible
    if (typeof window !== 'undefined' && window.emailjs) {
      window.emailjs.init(this.config.emailjs.publicKey);
    } else {
      throw new Error('EmailJS no está disponible');
    }
  }

  /**
   * Carga la librería de EmailJS
   */
  loadEmailJS() {
    return new Promise((resolve, reject) => {
      // Verificar si estamos en el browser
      if (typeof window === 'undefined' || typeof document === 'undefined') {
        reject(new Error('EmailJS solo funciona en el navegador'));
        return;
      }

      if (typeof window.emailjs !== 'undefined') {
        resolve();
        return;
      }

      const script = document.createElement('script');
      script.src = 'https://cdn.jsdelivr.net/npm/@emailjs/browser@3/dist/email.min.js';
      script.onload = () => {
        // Verificar que se haya cargado correctamente
        if (typeof window.emailjs !== 'undefined') {
          resolve();
        } else {
          reject(new Error('EmailJS no se cargó correctamente'));
        }
      };
      script.onerror = () => reject(new Error('Error cargando EmailJS'));
      document.head.appendChild(script);
    });
  }

  /**
   * Envía un email
   * @param {Object} data - Datos del email
   * @returns {Promise}
   */
  async send(data) {
    // Validar datos antes de enviar
    const validation = this.validateEmailData(data);
    if (!validation.isValid) {
      throw new Error(`Datos inválidos: ${validation.errors.join(', ')}`);
    }

    // Sanitizar datos
    const sanitizedData = this.sanitizeData(data);

    if (!this.initialized) {
      await this.init();
    }

    try {
      switch (this.config.provider) {
        case 'emailjs':
          return await this.sendWithEmailJS(sanitizedData);
        case 'formspree':
          return await this.sendWithFormspree(sanitizedData);
        case 'netlify':
          return await this.sendWithNetlify(sanitizedData);
        case 'custom':
          return await this.sendWithCustom(sanitizedData);
        default:
          throw new Error(`Proveedor no soportado: ${this.config.provider}`);
      }
    } catch (error) {
      console.error('Error enviando email:', error);
      throw error;
    }
  }

  /**
   * Envía email con EmailJS
   */
  async sendWithEmailJS(data) {
    if (typeof window === 'undefined' || !window.emailjs) {
      throw new Error('EmailJS no está disponible');
    }

    const templateParams = {
      from_name: data.name,
      from_email: data.email,
      to_name: 'Portfolio Owner',
      subject: data.subject,
      message: data.message,
      phone: data.phone || '',
      company: data.company || '',
      reply_to: data.email
    };

    try {
      const response = await window.emailjs.send(
        this.config.emailjs.serviceId,
        this.config.emailjs.templateId,
        templateParams
      );

      if (response.status === 200) {
        return {
          success: true,
          message: 'Email enviado correctamente',
          response
        };
      } else {
        throw new Error(`Error en el envío del email: ${response.text || 'Error desconocido'}`);
      }
    } catch (error) {
      throw new Error(`Error con EmailJS: ${error.message}`);
    }
  }

  /**
   * Envía email con Formspree
   */
  async sendWithFormspree(data) {
    if (!this.config.formspree.endpoint) {
      throw new Error('Endpoint de Formspree no configurado');
    }

    try {
      const response = await fetch(this.config.formspree.endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          name: data.name,
          email: data.email,
          subject: data.subject,
          message: data.message,
          phone: data.phone,
          company: data.company
        })
      });

      if (response.ok) {
        const result = await response.json();
        return {
          success: true,
          message: 'Email enviado correctamente',
          response: result
        };
      } else {
        const result = await response.json().catch(() => ({}));
        throw new Error(result.error || `Error HTTP: ${response.status}`);
      }
    } catch (error) {
      if (error.name === 'TypeError' && error.message.includes('fetch')) {
        throw new Error('Error de conexión con Formspree');
      }
      throw error;
    }
  }

  /**
   * Envía email con Netlify Forms
   */
  async sendWithNetlify(data) {
    try {
      const formData = new FormData();
      formData.append('form-name', 'contact');
      formData.append('name', data.name);
      formData.append('email', data.email);
      formData.append('subject', data.subject);
      formData.append('message', data.message);
      
      if (data.phone) formData.append('phone', data.phone);
      if (data.company) formData.append('company', data.company);

      const response = await fetch('/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams(formData).toString()
      });

      if (response.ok) {
        return {
          success: true,
          message: 'Email enviado correctamente'
        };
      } else {
        throw new Error(`Error HTTP: ${response.status} - ${response.statusText}`);
      }
    } catch (error) {
      if (error.name === 'TypeError' && error.message.includes('fetch')) {
        throw new Error('Error de conexión con Netlify');
      }
      throw error;
    }
  }

  /**
   * Envía email con endpoint personalizado
   */
  async sendWithCustom(data) {
    if (!this.config.custom.endpoint) {
      throw new Error('Endpoint personalizado no configurado');
    }

    try {
      const response = await fetch(this.config.custom.endpoint, {
        method: this.config.custom.method,
        headers: this.config.custom.headers,
        body: JSON.stringify(data)
      });

      if (response.ok) {
        const result = await response.json().catch(() => ({}));
        return {
          success: true,
          message: result.message || 'Email enviado correctamente',
          response: result
        };
      } else {
        const result = await response.json().catch(() => ({}));
        throw new Error(result.error || `Error HTTP: ${response.status}`);
      }
    } catch (error) {
      if (error.name === 'TypeError' && error.message.includes('fetch')) {
        throw new Error('Error de conexión con endpoint personalizado');
      }
      throw error;
    }
  }

  /**
   * Valida los datos del email antes del envío
   */
  validateEmailData(data) {
    const errors = [];

    if (!data || typeof data !== 'object') {
      errors.push('Los datos del email son requeridos');
      return { isValid: false, errors };
    }

    if (!data.name || typeof data.name !== 'string' || data.name.trim().length < 2) {
      errors.push('El nombre es obligatorio y debe tener al menos 2 caracteres');
    }

    if (!data.email || typeof data.email !== 'string' || !this.isValidEmail(data.email)) {
      errors.push('Email inválido');
    }

    if (!data.subject || typeof data.subject !== 'string' || data.subject.trim().length < 5) {
      errors.push('El asunto es obligatorio y debe tener al menos 5 caracteres');
    }

    if (!data.message || typeof data.message !== 'string' || data.message.trim().length < 10) {
      errors.push('El mensaje es obligatorio y debe tener al menos 10 caracteres');
    }

    if (data.phone && typeof data.phone === 'string' && !this.isValidPhone(data.phone)) {
      errors.push('Número de teléfono inválido');
    }

    return {
      isValid: errors.length === 0,
      errors
    };
  }

  /**
   * Valida formato de email
   */
  isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  /**
   * Valida formato de teléfono español
   */
  isValidPhone(phone) {
    const phoneRegex = /^(\+34|0034|34)?[6789]\d{8}$/;
    return phoneRegex.test(phone.replace(/\s/g, ''));
  }

  /**
   * Sanitiza los datos del email
   */
  sanitizeData(data) {
    const sanitized = {};
    
    // Sanitizar texto
    Object.keys(data).forEach(key => {
      if (typeof data[key] === 'string') {
        sanitized[key] = data[key]
          .trim()
          .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '') // Remover scripts
          .replace(/<[^>]*>/g, '') // Remover HTML tags
          .substring(0, key === 'message' ? 1000 : 100); // Limitar longitud
      } else if (data[key] !== null && data[key] !== undefined) {
        sanitized[key] = data[key];
      }
    });

    return sanitized;
  }

  /**
   * Configuración para diferentes proveedores
   */
  static getProviderConfig(provider, config = {}) {
    const configs = {
      emailjs: {
        provider: 'emailjs',
        emailjs: {
          serviceId: config.serviceId || 'your_service_id',
          templateId: config.templateId || 'your_template_id',
          publicKey: config.publicKey || 'your_public_key'
        }
      },
      
      formspree: {
        provider: 'formspree',
        formspree: {
          endpoint: config.endpoint || 'https://formspree.io/f/your_form_id'
        }
      },
      
      netlify: {
        provider: 'netlify',
        netlify: {
          endpoint: '/'
        }
      },
      
      custom: {
        provider: 'custom',
        custom: {
          endpoint: config.endpoint || '/api/contact',
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            ...(config.apiKey && { 'Authorization': `Bearer ${config.apiKey}` }),
            ...config.headers
          }
        }
      }
    };

    return configs[provider] || configs.emailjs;
  }
}

/**
 * Instancia del servicio de email con configuración por defecto
 */
let emailServiceInstance = null;

/**
 * Obtiene la instancia del servicio de email
 */
export function getEmailService(config) {
  if (!emailServiceInstance || config) {
    emailServiceInstance = new EmailService(config);
  }
  return emailServiceInstance;
}

/**
 * Configuración de servicios de email populares
 */
export const EMAIL_PROVIDERS = {
  EMAILJS: 'emailjs',
  FORMSPREE: 'formspree', 
  NETLIFY: 'netlify',
  CUSTOM: 'custom'
};

/**
 * Templates de email predefinidos
 */
export const EMAIL_TEMPLATES = {
  contact: {
    subject: 'Nuevo mensaje de contacto desde el portfolio',
    template: `
      Nuevo mensaje recibido desde el portfolio:
      
      Nombre: {{name}}
      Email: {{email}}
      Teléfono: {{phone}}
      Empresa: {{company}}
      Asunto: {{subject}}
      
      Mensaje:
      {{message}}
      
      ---
      Enviado desde: {{website}}
      Fecha: {{date}}
    `
  },
  
  newsletter: {
    subject: 'Nueva suscripción al newsletter',
    template: `
      Nueva suscripción al newsletter:
      
      Email: {{email}}
      Fecha: {{date}}
      
      ---
      Enviado desde: {{website}}
    `
  },
  
  autoReply: {
    subject: 'Gracias por contactarme',
    template: `
      Hola {{name}},
      
      Gracias por contactarme a través de mi portfolio. He recibido tu mensaje y me pondré en contacto contigo lo antes posible.
      
      Tu mensaje:
      "{{message}}"
      
      Saludos,
      [Tu Nombre]
    `
  }
};

/**
 * Funciones de utilidad para emails
 */
export const EmailUtils = {
  /**
   * Procesa un template de email con datos
   */
  processTemplate(template, data) {
    if (!template || typeof template !== 'string') {
      return '';
    }
    
    let processed = template;
    Object.keys(data || {}).forEach(key => {
      const placeholder = new RegExp(`{{${key}}}`, 'g');
      processed = processed.replace(placeholder, data[key] || '');
    });
    return processed;
  },

  /**
   * Genera metadata para el email
   */
  generateMetadata() {
    const metadata = {
      date: new Date().toLocaleString('es-ES'),
      timestamp: Date.now()
    };

    // Solo agregar datos del browser si estamos en el cliente
    if (typeof window !== 'undefined') {
      metadata.website = window.location.origin;
      metadata.userAgent = navigator.userAgent;
    }

    return metadata;
  },

  /**
   * Crea un resumen del email para logs
   */
  createEmailSummary(data) {
    if (!data || typeof data !== 'object') {
      return null;
    }

    return {
      from: data.email || 'No especificado',
      name: data.name || 'No especificado',
      subject: data.subject || 'Sin asunto',
      timestamp: new Date().toISOString(),
      length: data.message ? data.message.length : 0
    };
  }
};