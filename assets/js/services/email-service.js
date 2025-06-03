class EmailService {
    constructor(config = {}) {
        this.config = {
            primaryProvider: 'emailjs',
            fallbackProviders: ['formspree', 'netlify'],
            retryAttempts: 3,
            retryDelay: 1000,
            timeout: 30000,
            enableAutoResponse: true,
            enableAnalytics: true,
            ...config
        };
        
        this.providers = {
            emailjs: new EmailJSProvider(),
            formspree: new FormspreeProvider(),
            netlify: new NetlifyProvider()
        };
        
        this.lastSuccessfulProvider = null;
        this.failureCount = {};
    }

    async sendEmail(formData) {
        const startTime = Date.now();
        let lastError = null;
        
        // Try primary provider first, then fallbacks
        const providersToTry = [
            this.config.primaryProvider,
            ...this.config.fallbackProviders
        ];
        
        for (const providerName of providersToTry) {
            const provider = this.providers[providerName];
            if (!provider || !provider.isConfigured()) {
                continue;
            }
            
            try {
                console.log(`Attempting to send email via ${providerName}...`);
                
                const result = await this.attemptSend(provider, formData);
                
                if (result.success) {
                    this.handleSuccess(providerName, startTime);
                    
                    // Send auto-response if enabled
                    if (this.config.enableAutoResponse) {
                        this.sendAutoResponse(formData).catch(error => {
                            console.warn('Auto-response failed:', error);
                        });
                    }
                    
                    return result;
                }
                
                lastError = result.error;
                this.handleFailure(providerName, result.error);
                
            } catch (error) {
                console.error(`${providerName} provider failed:`, error);
                lastError = error.message;
                this.handleFailure(providerName, error.message);
            }
        }
        
        // All providers failed
        this.trackEmailFailure(lastError, Date.now() - startTime);
        
        return {
            success: false,
            error: lastError || 'Todos los servicios de email están temporalmente no disponibles'
        };
    }

    async attemptSend(provider, formData) {
        return new Promise(async (resolve, reject) => {
            const timeout = setTimeout(() => {
                reject(new Error('Email service timeout'));
            }, this.config.timeout);

            try {
                const result = await provider.send(formData);
                clearTimeout(timeout);
                resolve(result);
            } catch (error) {
                clearTimeout(timeout);
                reject(error);
            }
        });
    }

    async sendAutoResponse(formData) {
        try {
            const autoResponseData = {
                to: formData.email,
                name: formData.name,
                subject: 'Gracias por contactarme - Confirmación recibida',
                template: 'auto_response',
                data: {
                    name: formData.name,
                    subject: formData.subject,
                    timestamp: new Date().toLocaleString('es-ES')
                }
            };
            
            const provider = this.providers[this.lastSuccessfulProvider || this.config.primaryProvider];
            if (provider && provider.sendAutoResponse) {
                await provider.sendAutoResponse(autoResponseData);
            }
        } catch (error) {
            console.error('Auto-response error:', error);
        }
    }

    handleSuccess(providerName, startTime) {
        this.lastSuccessfulProvider = providerName;
        this.failureCount[providerName] = 0;
        
        const duration = Date.now() - startTime;
        console.log(`Email sent successfully via ${providerName} in ${duration}ms`);
        
        this.trackEmailSuccess(providerName, duration);
    }

    handleFailure(providerName, error) {
        this.failureCount[providerName] = (this.failureCount[providerName] || 0) + 1;
        console.error(`${providerName} failed (${this.failureCount[providerName]} times):`, error);
    }

    trackEmailSuccess(provider, duration) {
        if (!this.config.enableAnalytics || !window.gtag) return;
        
        window.gtag('event', 'email_sent', {
            event_category: 'Contact Form',
            event_label: provider,
            value: 1,
            custom_parameters: {
                duration: duration,
                provider: provider
            }
        });
    }

    trackEmailFailure(error, duration) {
        if (!this.config.enableAnalytics || !window.gtag) return;
        
        window.gtag('event', 'email_failed', {
            event_category: 'Contact Form',
            event_label: 'all_providers_failed',
            value: 0,
            custom_parameters: {
                error: error,
                duration: duration
            }
        });
    }

    // Test email connectivity
    async testConnection() {
        const testData = {
            name: 'Test',
            email: 'test@example.com',
            subject: 'test',
            message: 'Connection test',
            isTest: true
        };
        
        const results = {};
        
        for (const [providerName, provider] of Object.entries(this.providers)) {
            if (provider.isConfigured()) {
                try {
                    const result = await provider.test?.(testData) || { success: false, error: 'Test not implemented' };
                    results[providerName] = result;
                } catch (error) {
                    results[providerName] = { success: false, error: error.message };
                }
            } else {
                results[providerName] = { success: false, error: 'Not configured' };
            }
        }
        
        return results;
    }

    getStatus() {
        return {
            lastSuccessfulProvider: this.lastSuccessfulProvider,
            failureCount: { ...this.failureCount },
            configuredProviders: Object.keys(this.providers).filter(name => 
                this.providers[name].isConfigured()
            )
        };
    }
}

// EmailJS Provider
class EmailJSProvider {
    constructor() {
        this.serviceId = 'your_service_id';
        this.templateId = 'your_template_id';
        this.autoResponseTemplateId = 'auto_response_template_id';
        this.publicKey = 'your_public_key';
        this.isInitialized = false;
    }

    async init() {
        if (this.isInitialized || !window.emailjs) {
            return;
        }
        
        try {
            window.emailjs.init(this.publicKey);
            this.isInitialized = true;
        } catch (error) {
            console.error('EmailJS initialization failed:', error);
        }
    }

    isConfigured() {
        return !!(this.serviceId && this.templateId && this.publicKey);
    }

    async send(formData) {
        await this.init();
        
        if (!window.emailjs) {
            throw new Error('EmailJS not loaded');
        }
        
        const templateParams = {
            from_name: formData.name,
            from_email: formData.email,
            phone: formData.phone || 'No proporcionado',
            subject: this.getSubjectText(formData.subject),
            budget: this.getBudgetText(formData.budget),
            timeline: this.getTimelineText(formData.timeline),
            message: formData.message,
            newsletter: formData.newsletter ? 'Sí' : 'No',
            timestamp: formData.timestamp,
            user_agent: formData.userAgent,
            referrer: formData.referrer || 'Directo'
        };
        
        try {
            const response = await window.emailjs.send(
                this.serviceId,
                this.templateId,
                templateParams
            );
            
            return {
                success: true,
                provider: 'emailjs',
                data: response
            };
        } catch (error) {
            return {
                success: false,
                error: error.text || error.message || 'EmailJS error'
            };
        }
    }

    async sendAutoResponse(autoResponseData) {
        await this.init();
        
        if (!this.autoResponseTemplateId) return;
        
        const templateParams = {
            to_email: autoResponseData.to,
            to_name: autoResponseData.name,
            subject_received: autoResponseData.data.subject,
            timestamp: autoResponseData.data.timestamp
        };
        
        await window.emailjs.send(
            this.serviceId,
            this.autoResponseTemplateId,
            templateParams
        );
    }

    getSubjectText(subject) {
        const subjectMap = {
            'web-development': 'Desarrollo Web',
            'mobile-app': 'Aplicación Móvil',
            'fullstack': 'Proyecto Full Stack',
            'consulting': 'Consultoría Técnica',
            'maintenance': 'Mantenimiento',
            'other': 'Otro'
        };
        return subjectMap[subject] || subject;
    }

    getBudgetText(budget) {
        const budgetMap = {
            'under-5k': 'Menos de €5,000',
            '5k-15k': '€5,000 - €15,000',
            '15k-30k': '€15,000 - €30,000',
            'over-30k': 'Más de €30,000',
            'discuss': 'A convenir'
        };
        return budgetMap[budget] || 'No especificado';
    }

    getTimelineText(timeline) {
        const timelineMap = {
            'asap': 'Lo antes posible',
            '1-month': 'Dentro de 1 mes',
            '3-months': 'Dentro de 3 meses',
            '6-months': 'Dentro de 6 meses',
            'flexible': 'Flexible'
        };
        return timelineMap[timeline] || 'No especificado';
    }
}

// Formspree Provider
class FormspreeProvider {
    constructor() {
        this.endpoint = 'https://formspree.io/f/your_form_id';
        this.apiKey = null; // Optional for premium features
    }

    isConfigured() {
        return !!this.endpoint;
    }

    async send(formData) {
        const headers = {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        };
        
        if (this.apiKey) {
            headers['Authorization'] = `Bearer ${this.apiKey}`;
        }
        
        const payload = {
            name: formData.name,
            email: formData.email,
            phone: formData.phone,
            subject: formData.subject,
            budget: formData.budget,
            timeline: formData.timeline,
            message: formData.message,
            newsletter: formData.newsletter,
            _replyto: formData.email,
            _subject: `Nuevo mensaje de contacto de ${formData.name}`,
            _gotcha: '' // Honeypot field
        };
        
        try {
            const response = await fetch(this.endpoint, {
                method: 'POST',
                headers: headers,
                body: JSON.stringify(payload)
            });
            
            if (response.ok) {
                return {
                    success: true,
                    provider: 'formspree',
                    data: await response.json()
                };
            } else {
                const errorData = await response.json();
                return {
                    success: false,
                    error: errorData.error || 'Formspree error'
                };
            }
        } catch (error) {
            return {
                success: false,
                error: error.message
            };
        }
    }
}

// Netlify Provider
class NetlifyProvider {
    constructor() {
        this.endpoint = '/__forms.html'; // Netlify form endpoint
        this.formName = 'contact'; // Form name in Netlify
    }

    isConfigured() {
        // Check if we're on Netlify by looking for Netlify-specific headers or environment
        return window.location.hostname.includes('.netlify.') || 
               window.location.hostname.includes('.app') ||
               document.querySelector('meta[name="netlify"]');
    }

    async send(formData) {
        const formDataToSend = new FormData();
        
        formDataToSend.append('form-name', this.formName);
        formDataToSend.append('name', formData.name);
        formDataToSend.append('email', formData.email);
        formDataToSend.append('phone', formData.phone || '');
        formDataToSend.append('subject', formData.subject);
        formDataToSend.append('budget', formData.budget || '');
        formDataToSend.append('timeline', formData.timeline || '');
        formDataToSend.append('message', formData.message);
        formDataToSend.append('newsletter', formData.newsletter ? 'yes' : 'no');
        
        try {
            const response = await fetch('/', {
                method: 'POST',
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                body: new URLSearchParams(formDataToSend).toString()
            });
            
            if (response.ok) {
                return {
                    success: true,
                    provider: 'netlify',
                    data: response
                };
            } else {
                return {
                    success: false,
                    error: 'Netlify form submission failed'
                };
            }
        } catch (error) {
            return {
                success: false,
                error: error.message
            };
        }
    }
}

// Singleton instance
let emailServiceInstance = null;

export const getEmailService = (config) => {
    if (!emailServiceInstance) {
        emailServiceInstance = new EmailService(config);
    }
    return emailServiceInstance;
};

export const createEmailService = (config) => {
    emailServiceInstance = new EmailService(config);
    return emailServiceInstance;
};

export default EmailService;