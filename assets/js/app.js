// App.js - Contact Integration
// Update existing assets/js/app.js

import ContactForm from './components/contact-form.js';
import { createEmailService } from './services/email-service.js';
import { showNotification } from './utils/notifications.js';
import { contactConfig } from './config/portfolio-config.js';

// Add to existing PortfolioApp class
class PortfolioApp {
    constructor() {
        // ... existing properties
        this.contactForm = null;
        this.emailService = null;
        this.isContactInitialized = false;
        this.contactVisibilityObserver = null;
    }

    async init() {
        try {
            console.log('🚀 Initializing Portfolio App...');
            
            // ... existing initialization (DOM, components loading, etc.)
            
            // Initialize contact components
            await this.initializeContact();
            
            // ... rest of existing initialization
            
            console.log('✅ Portfolio App initialized successfully');
        } catch (error) {
            console.error('❌ Error initializing Portfolio App:', error);
            this.handleInitializationError(error);
        }
    }

    async initializeContact() {
        try {
            console.log('📧 Initializing Contact components...');
            
            // Initialize email service first
            await this.initializeEmailService();
            
            // Initialize contact form
            await this.initializeContactForm();
            
            // Setup contact events
            this.setupContactEvents();
            
            // Setup contact section visibility tracking
            this.setupContactVisibilityTracking();
            
            // Setup availability status
            this.setupAvailabilityStatus();
            
            this.isContactInitialized = true;
            console.log('✅ Contact components initialized');
            
        } catch (error) {
            console.error('❌ Error initializing contact:', error);
            throw error;
        }
    }

    async initializeEmailService() {
        try {
            this.emailService = createEmailService({
                primaryProvider: contactConfig.email.provider,
                fallbackProviders: contactConfig.email.fallbackProviders,
                enableAutoResponse: contactConfig.email.enableAutoResponse,
                enableAnalytics: contactConfig.email.enableAnalytics,
                timeout: contactConfig.email.timeout,
                retryAttempts: contactConfig.email.retryAttempts,
                
                // Provider-specific configurations
                emailjs: contactConfig.email.emailjs,
                formspree: contactConfig.email.formspree,
                netlify: contactConfig.email.netlify
            });
            
            console.log('✅ Email service initialized');
        } catch (error) {
            console.error('❌ Error initializing email service:', error);
            // Continue without email service
        }
    }

    async initializeContactForm() {
        try {
            // Wait for contact section to be visible or DOM ready
            await this.waitForElement('#contact-form');
            
            this.contactForm = new ContactForm();
            
            console.log('✅ ContactForm initialized');
        } catch (error) {
            console.error('❌ Error initializing ContactForm:', error);
            throw error;
        }
    }

    setupContactEvents() {
        // Listen for form submission events
        document.addEventListener('contactFormSubmitted', (event) => {
            this.handleContactFormSubmitted(event.detail);
        });

        // Listen for form validation events
        document.addEventListener('contactFormValidated', (event) => {
            this.handleContactFormValidated(event.detail);
        });

        // Listen for email service events
        document.addEventListener('emailServiceStatusChanged', (event) => {
            this.handleEmailServiceStatusChanged(event.detail);
        });

        // Setup social media link tracking
        this.setupSocialMediaTracking();
        
        // Setup download tracking
        this.setupDownloadTracking();
        
        // Setup CTA button tracking
        this.setupCTATracking();
    }

    setupContactVisibilityTracking() {
        const contactSection = document.getElementById('contact');
        if (!contactSection) return;

        const options = {
            threshold: 0.3,
            rootMargin: '0px 0px -50px 0px'
        };

        this.contactVisibilityObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    this.trackContactSectionView();
                    this.contactVisibilityObserver.unobserve(entry.target);
                }
            });
        }, options);

        this.contactVisibilityObserver.observe(contactSection);
    }

    setupAvailabilityStatus() {
        const statusElement = document.querySelector('.availability-status');
        if (!statusElement) return;

        const availability = contactConfig.personal.availability;
        const indicator = statusElement.querySelector('.status-indicator');
        const text = statusElement.querySelector('span');

        if (indicator && text) {
            indicator.className = `status-indicator ${availability}`;
            
            const statusTexts = {
                available: 'Disponible para nuevos proyectos',
                busy: 'Ocupado actualmente',
                unavailable: 'No disponible'
            };
            
            text.textContent = statusTexts[availability] || statusTexts.available;
        }

        // Update working hours if enabled
        if (contactConfig.ui.enableWorkingHours) {
            this.updateWorkingHoursDisplay();
        }
    }

    updateWorkingHoursDisplay() {
        const workingHours = contactConfig.personal.workingHours;
        const timezone = contactConfig.personal.timezone;
        const now = new Date();
        const currentDay = now.toLocaleLowerCase().slice(0, 3) + 'day';
        
        const todayHours = workingHours[currentDay];
        
        if (todayHours) {
            const isWorkingTime = this.isCurrentlyWorkingHours(todayHours);
            
            // Update status based on working hours
            const statusElement = document.querySelector('.availability-status');
            if (statusElement && contactConfig.personal.availability === 'available') {
                const indicator = statusElement.querySelector('.status-indicator');
                const text = statusElement.querySelector('span');
                
                if (isWorkingTime) {
                    indicator.classList.add('online');
                    text.textContent = 'En línea ahora';
                } else {
                    indicator.classList.remove('online');
                    text.textContent = `Disponible mañana a las ${todayHours.start}`;
                }
            }
        }
    }

    isCurrentlyWorkingHours(dayHours) {
        const now = new Date();
        const currentTime = now.getHours() * 60 + now.getMinutes();
        
        const [startHour, startMin] = dayHours.start.split(':').map(Number);
        const [endHour, endMin] = dayHours.end.split(':').map(Number);
        
        const startTime = startHour * 60 + startMin;
        const endTime = endHour * 60 + endMin;
        
        return currentTime >= startTime && currentTime <= endTime;
    }

    setupSocialMediaTracking() {
        const socialLinks = document.querySelectorAll('.social-link');
        socialLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                const platform = this.getSocialPlatform(link.href);
                this.trackSocialClick(platform, link.href);
            });
        });
    }

    setupDownloadTracking() {
        const downloadLinks = document.querySelectorAll('a[download], a[href*=".pdf"]');
        downloadLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                const fileName = link.download || link.href.split('/').pop();
                this.trackDownload(fileName, link.href);
            });
        });
    }

    setupCTATracking() {
        const ctaButtons = document.querySelectorAll('.cta-buttons .btn');
        ctaButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                const action = button.textContent.trim();
                this.trackCTAClick(action, button.href || '#');
            });
        });
    }

    getSocialPlatform(url) {
        const platforms = {
            'linkedin.com': 'LinkedIn',
            'github.com': 'GitHub',
            'twitter.com': 'Twitter',
            'instagram.com': 'Instagram',
            'wa.me': 'WhatsApp',
            't.me': 'Telegram',
            'discord': 'Discord',
            'mailto:': 'Email'
        };

        for (const [domain, platform] of Object.entries(platforms)) {
            if (url.includes(domain)) {
                return platform;
            }
        }
        
        return 'Unknown';
    }

    // Event handlers
    handleContactFormSubmitted(detail) {
        const { success, data, error } = detail;
        
        if (success) {
            // Show success notification
            showNotification(
                contactConfig.success?.contact?.emailSent || 
                '¡Mensaje enviado exitosamente! Te responderé pronto.',
                'success',
                { duration: 6000 }
            );
            
            // Track successful submission
            this.trackFormSubmission(true, data);
            
            // Update UI state
            this.updateContactUIAfterSuccess();
            
        } else {
            // Show error notification
            showNotification(
                error || contactConfig.errors?.contact?.submitFailed || 
                'Error al enviar el mensaje. Por favor, inténtalo de nuevo.',
                'error',
                { duration: 8000 }
            );
            
            // Track failed submission
            this.trackFormSubmission(false, null, error);
        }
    }

    handleContactFormValidated(detail) {
        const { isValid, errors, fieldName } = detail;
        
        // Track validation events for analytics
        if (contactConfig.analytics.trackFormErrors && !isValid) {
            this.trackFormValidationError(fieldName, errors);
        }
    }

    handleEmailServiceStatusChanged(detail) {
        const { status, provider, error } = detail;
        
        console.log(`Email service status changed: ${status} (${provider})`);
        
        if (status === 'failed') {
            console.warn(`Email provider ${provider} failed:`, error);
        }
    }

    updateContactUIAfterSuccess() {
        // Update availability status if needed
        const availability = contactConfig.personal.availability;
        if (availability === 'busy') {
            const statusElement = document.querySelector('.availability-status');
            if (statusElement) {
                const text = statusElement.querySelector('span');
                if (text) {
                    text.textContent = 'Ocupado actualmente - responderé pronto';
                }
            }
        }
        
        // Show auto-response notification if enabled
        if (contactConfig.email.enableAutoResponse) {
            setTimeout(() => {
                showNotification(
                    contactConfig.success?.contact?.autoResponse ||
                    'Recibirás una confirmación en tu email en breve.',
                    'info',
                    { duration: 4000 }
                );
            }, 2000);
        }
    }

    // Analytics methods
    trackContactSectionView() {
        if (!contactConfig.analytics.trackFormInteractions || !window.gtag) return;
        
        window.gtag('event', 'page_view', {
            page_title: 'Contact Section',
            page_location: window.location.href + '#contact'
        });
    }

    trackFormSubmission(success, data = null, error = null) {
        if (!contactConfig.analytics.trackFormSubmission || !window.gtag) return;
        
        window.gtag('event', 'form_submit', {
            event_category: 'Contact Form',
            event_label: success ? 'success' : 'error',
            value: success ? 1 : 0,
            custom_parameters: {
                subject: data?.subject || '',
                has_phone: !!(data?.phone),
                has_budget: !!(data?.budget),
                message_length: data?.message?.length || 0,
                error_message: error
            }
        });
        
        // Track conversion if successful
        if (success) {
            window.gtag('event', 'conversion', {
                send_to: 'AW-CONVERSION_ID/CONVERSION_LABEL' // Replace with actual conversion ID
            });
        }
    }

    trackFormValidationError(fieldName, errors) {
        if (!window.gtag) return;
        
        window.gtag('event', 'form_error', {
            event_category: 'Contact Form',
            event_label: fieldName,
            custom_parameters: {
                error_message: errors.join(', ')
            }
        });
    }

    trackSocialClick(platform, url) {
        if (!contactConfig.analytics.trackSocialClicks || !window.gtag) return;
        
        window.gtag('event', 'social_click', {
            event_category: 'Social Media',
            event_label: platform,
            custom_parameters: {
                url: url
            }
        });
    }

    trackDownload(fileName, url) {
        if (!contactConfig.analytics.trackDownloads || !window.gtag) return;
        
        window.gtag('event', 'file_download', {
            event_category: 'Downloads',
            event_label: fileName,
            custom_parameters: {
                url: url
            }
        });
    }

    trackCTAClick(action, url) {
        if (!contactConfig.analytics.trackButtonClicks || !window.gtag) return;
        
        window.gtag('event', 'cta_click', {
            event_category: 'Contact CTA',
            event_label: action,
            custom_parameters: {
                url: url
            }
        });
    }

    // Utility methods
    async waitForElement(selector, timeout = 5000) {
        return new Promise((resolve, reject) => {
            const element = document.querySelector(selector);
            if (element) {
                resolve(element);
                return;
            }

            const observer = new MutationObserver((mutations, obs) => {
                const element = document.querySelector(selector);
                if (element) {
                    obs.disconnect();
                    resolve(element);
                }
            });

            observer.observe(document.body, {
                childList: true,
                subtree: true
            });

            setTimeout(() => {
                observer.disconnect();
                reject(new Error(`Element ${selector} not found within ${timeout}ms`));
            }, timeout);
        });
    }

    // Contact-specific utility methods
    getContactFormData() {
        if (this.contactForm) {
            return this.contactForm.getFormData();
        }
        return null;
    }

    isContactFormValid() {
        if (this.contactForm) {
            return this.contactForm.isValid();
        }
        return false;
    }

    resetContactForm() {
        if (this.contactForm) {
            this.contactForm.reset();
        }
    }

    testEmailService() {
        if (this.emailService) {
            return this.emailService.testConnection();
        }
        return Promise.resolve({ error: 'Email service not initialized' });
    }

    // Error handling for contact
    handleContactError(error, context = 'contact') {
        console.error(`Contact error in ${context}:`, error);
        
        // Show user-friendly error message
        const errorMessage = contactConfig.errors?.contact?.[context] || 
                           'Ha ocurrido un error en la sección de contacto.';
        
        showNotification(errorMessage, 'error');
        
        // Track error for analytics
        if (window.gtag) {
            window.gtag('event', 'exception', {
                description: `Contact error: ${error.message}`,
                fatal: false
            });
        }
    }

    // Public API methods for contact
    getContactForm() {
        return this.contactForm;
    }

    getEmailService() {
        return this.emailService;
    }

    // Cleanup methods
    destroyContact() {
        if (this.contactForm) {
            this.contactForm.destroy();
            this.contactForm = null;
        }
        
        if (this.contactVisibilityObserver) {
            this.contactVisibilityObserver.disconnect();
            this.contactVisibilityObserver = null;
        }
        
        this.isContactInitialized = false;
    }

    // Add to existing destroy method
    destroy() {
        // ... existing cleanup
        this.destroyContact();
    }

    // Custom event emitter for contact events
    emitContactEvent(eventName, data) {
        const event = new CustomEvent(eventName, { detail: data });
        document.dispatchEvent(event);
    }

    // Health check method
    getContactHealthStatus() {
        return {
            contactFormInitialized: !!this.contactForm,
            emailServiceInitialized: !!this.emailService,
            isContactInitialized: this.isContactInitialized,
            contactSectionVisible: !!document.getElementById('contact'),
            emailServiceStatus: this.emailService?.getStatus() || null
        };
    }
}

// Update DOMContentLoaded listener to include contact
document.addEventListener('DOMContentLoaded', async () => {
    try {
        const app = new PortfolioApp();
        await app.init();
        
        // Make app globally available for debugging
        window.portfolioApp = app;
        
        // Add contact-specific global methods for debugging
        window.debugContact = {
            getFormData: () => app.getContactFormData(),
            isFormValid: () => app.isContactFormValid(),
            resetForm: () => app.resetContactForm(),
            testEmail: () => app.testEmailService(),
            getHealthStatus: () => app.getContactHealthStatus()
        };
        
    } catch (error) {
        console.error('Failed to initialize portfolio app:', error);
    }
});