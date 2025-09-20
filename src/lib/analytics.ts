// Analytics configuration and utilities
interface AnalyticsEvent {
  action: string;
  category: string;
  label?: string;
  value?: number;
}

interface PageView {
  page: string;
  title: string;
  url: string;
}

class Analytics {
  private isEnabled: boolean;
  private isDevelopment: boolean;

  constructor() {
    this.isDevelopment = import.meta.env.DEV;
    this.isEnabled = import.meta.env.VITE_ANALYTICS_ENABLED === 'true' || this.isDevelopment;
  }

  // Initialize analytics
  init() {
    if (!this.isEnabled) return;

    // Google Analytics 4
    if (import.meta.env.VITE_GA_MEASUREMENT_ID) {
      this.initGoogleAnalytics();
    }

    // Custom analytics endpoint
    if (import.meta.env.VITE_ANALYTICS_ENDPOINT) {
      this.initCustomAnalytics();
    }

    console.log('Analytics initialized');
  }

  private initGoogleAnalytics() {
    const measurementId = import.meta.env.VITE_GA_MEASUREMENT_ID;
    
    // Load Google Analytics script
    const script = document.createElement('script');
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${measurementId}`;
    document.head.appendChild(script);

    // Initialize gtag
    window.dataLayer = window.dataLayer || [];
    function gtag(...args: any[]) {
      window.dataLayer.push(args);
    }
    window.gtag = gtag;

    gtag('js', new Date());
    gtag('config', measurementId, {
      page_title: document.title,
      page_location: window.location.href,
    });
  }

  private initCustomAnalytics() {
    // Custom analytics implementation
    console.log('Custom analytics initialized');
  }

  // Track page views
  trackPageView(pageView: PageView) {
    if (!this.isEnabled) return;

    // Google Analytics
    if (window.gtag) {
      window.gtag('config', import.meta.env.VITE_GA_MEASUREMENT_ID, {
        page_title: pageView.title,
        page_location: pageView.url,
      });
    }

    // Custom analytics
    this.sendEvent('page_view', {
      page: pageView.page,
      title: pageView.title,
      url: pageView.url,
    });

    if (this.isDevelopment) {
      console.log('Page view tracked:', pageView);
    }
  }

  // Track custom events
  trackEvent(event: AnalyticsEvent) {
    if (!this.isEnabled) return;

    // Google Analytics
    if (window.gtag) {
      window.gtag('event', event.action, {
        event_category: event.category,
        event_label: event.label,
        value: event.value,
      });
    }

    // Custom analytics
    this.sendEvent('custom_event', event);

    if (this.isDevelopment) {
      console.log('Event tracked:', event);
    }
  }

  // Track VAPI phone calls
  trackPhoneCall(phoneNumber: string, purpose: string, status: string) {
    this.trackEvent({
      action: 'phone_call',
      category: 'vapi',
      label: `${purpose}_${status}`,
    });

    this.sendEvent('phone_call', {
      phoneNumber: phoneNumber.replace(/\d(?=\d{4})/g, '*'), // Mask phone number
      purpose,
      status,
    });
  }

  // Track form submissions
  trackFormSubmission(formName: string, success: boolean) {
    this.trackEvent({
      action: 'form_submit',
      category: 'engagement',
      label: formName,
      value: success ? 1 : 0,
    });
  }

  // Track user engagement
  trackEngagement(action: string, details?: any) {
    this.trackEvent({
      action,
      category: 'engagement',
      label: details?.component || 'unknown',
    });
  }

  // Send event to custom analytics endpoint
  private async sendEvent(eventType: string, data: any) {
    if (!import.meta.env.VITE_ANALYTICS_ENDPOINT) return;

    try {
      await fetch(import.meta.env.VITE_ANALYTICS_ENDPOINT, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          eventType,
          data,
          timestamp: new Date().toISOString(),
          url: window.location.href,
          userAgent: navigator.userAgent,
        }),
      });
    } catch (error) {
      if (this.isDevelopment) {
        console.error('Analytics error:', error);
      }
    }
  }

  // Track performance metrics
  trackPerformance(metrics: any) {
    if (!this.isEnabled) return;

    this.trackEvent({
      action: 'performance',
      category: 'technical',
      label: 'page_load',
      value: Math.round(metrics.loadTime || 0),
    });
  }

  // Track errors
  trackError(error: Error, context?: string) {
    if (!this.isEnabled) return;

    this.trackEvent({
      action: 'error',
      category: 'technical',
      label: context || 'unknown',
    });

    this.sendEvent('error', {
      message: error.message,
      stack: error.stack,
      context,
      url: window.location.href,
    });
  }
}

// Create singleton instance
export const analytics = new Analytics();

// Initialize on module load
analytics.init();

// Export types
export type { AnalyticsEvent, PageView };
