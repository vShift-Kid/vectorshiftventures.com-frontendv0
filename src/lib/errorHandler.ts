import { analytics } from './analytics';

export interface ErrorContext {
  component?: string;
  action?: string;
  userId?: string;
  timestamp?: string;
  userAgent?: string;
  url?: string;
  additionalData?: any;
}

class ErrorHandler {
  private isDevelopment: boolean;

  constructor() {
    this.isDevelopment = import.meta.env.DEV;
  }

  // Handle JavaScript errors
  handleError(error: Error, context?: ErrorContext) {
    const errorContext: ErrorContext = {
      component: context?.component || 'unknown',
      action: context?.action || 'unknown',
      timestamp: new Date().toISOString(),
      userAgent: navigator.userAgent,
      url: window.location.href,
      ...context,
    };

    // Log to console in development
    if (this.isDevelopment) {
      console.error('Error caught:', error);
      console.error('Error context:', errorContext);
    }

    // Track error in analytics
    analytics.trackError(error, errorContext.component);

    // Send to error reporting service (if configured)
    this.reportError(error, errorContext);

    // Show user-friendly error message
    this.showUserError(error, errorContext);
  }

  // Handle async errors
  handleAsyncError(error: any, context?: ErrorContext) {
    const jsError = error instanceof Error ? error : new Error(String(error));
    this.handleError(jsError, context);
  }

  // Handle API errors
  handleApiError(error: any, endpoint: string, context?: ErrorContext) {
    const apiError = new Error(`API Error: ${endpoint} - ${error.message || 'Unknown error'}`);
    this.handleError(apiError, {
      ...context,
      action: `api_${endpoint}`,
      additionalData: {
        endpoint,
        status: error.status,
        response: error.response,
      },
    });
  }

  // Handle VAPI errors
  handleVapiError(error: any, action: string, context?: ErrorContext) {
    const vapiError = new Error(`VAPI Error: ${action} - ${error.message || 'Unknown error'}`);
    this.handleError(vapiError, {
      ...context,
      action: `vapi_${action}`,
      additionalData: {
        vapiAction: action,
        errorCode: error.code,
        errorDetails: error.details,
      },
    });
  }

  // Report error to external service
  private async reportError(error: Error, context: ErrorContext) {
    if (!import.meta.env.VITE_ERROR_REPORTING_ENDPOINT) return;

    try {
      await fetch(import.meta.env.VITE_ERROR_REPORTING_ENDPOINT, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          error: {
            message: error.message,
            stack: error.stack,
            name: error.name,
          },
          context,
          environment: this.isDevelopment ? 'development' : 'production',
        }),
      });
    } catch (reportingError) {
      if (this.isDevelopment) {
        console.error('Failed to report error:', reportingError);
      }
    }
  }

  // Show user-friendly error message
  private showUserError(error: Error, context: ErrorContext) {
    // Don't show error messages for certain types of errors
    if (this.shouldSuppressError(error, context)) return;

    // Create error notification
    this.showErrorNotification(this.getUserFriendlyMessage(error, context));
  }

  // Determine if error should be suppressed
  private shouldSuppressError(error: Error, context: ErrorContext): boolean {
    // Suppress network errors that are likely temporary
    if (error.message.includes('NetworkError') || error.message.includes('Failed to fetch')) {
      return true;
    }

    // Suppress VAPI errors that are user-initiated
    if (context.action?.startsWith('vapi_') && context.action.includes('user_cancelled')) {
      return true;
    }

    return false;
  }

  // Get user-friendly error message
  private getUserFriendlyMessage(error: Error, context: ErrorContext): string {
    // VAPI errors
    if (context.action?.startsWith('vapi_')) {
      if (error.message.includes('Invalid phone number')) {
        return 'Please enter a valid phone number in international format (e.g., +1234567890)';
      }
      if (error.message.includes('Insufficient credits')) {
        return 'Unable to make calls at this time. Please try again later.';
      }
      if (error.message.includes('Rate limit')) {
        return 'Too many requests. Please wait a moment before trying again.';
      }
      return 'Unable to complete the call. Please check your connection and try again.';
    }

    // API errors
    if (context.action?.startsWith('api_')) {
      if (error.message.includes('404')) {
        return 'The requested service is temporarily unavailable.';
      }
      if (error.message.includes('500')) {
        return 'Our servers are experiencing issues. Please try again later.';
      }
      return 'Unable to process your request. Please try again.';
    }

    // Network errors
    if (error.message.includes('NetworkError') || error.message.includes('Failed to fetch')) {
      return 'Connection problem. Please check your internet connection and try again.';
    }

    // Generic error
    return 'Something went wrong. Please try again or contact support if the problem persists.';
  }

  // Show error notification
  private showErrorNotification(message: string) {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = 'fixed top-4 right-4 z-50 bg-red-500/90 backdrop-blur-sm text-white p-4 rounded-lg shadow-lg max-w-sm font-mono text-sm';
    notification.innerHTML = `
      <div class="flex items-start gap-3">
        <div class="w-5 h-5 rounded-full bg-red-400 flex items-center justify-center flex-shrink-0 mt-0.5">
          <span class="text-xs">!</span>
        </div>
        <div>
          <p class="font-semibold mb-1">Error</p>
          <p>${message}</p>
        </div>
        <button onclick="this.parentElement.parentElement.remove()" class="text-red-200 hover:text-white ml-auto">
          ×
        </button>
      </div>
    `;

    document.body.appendChild(notification);

    // Auto-remove after 5 seconds
    setTimeout(() => {
      if (notification.parentElement) {
        notification.remove();
      }
    }, 5000);
  }

  // Initialize global error handlers
  init() {
    // Handle unhandled promise rejections
    window.addEventListener('unhandledrejection', (event) => {
      this.handleAsyncError(event.reason, {
        component: 'global',
        action: 'unhandled_promise_rejection',
      });
    });

    // Handle uncaught errors
    window.addEventListener('error', (event) => {
      this.handleError(event.error || new Error(event.message), {
        component: 'global',
        action: 'uncaught_error',
        additionalData: {
          filename: event.filename,
          lineno: event.lineno,
          colno: event.colno,
        },
      });
    });
  }
}

// Create singleton instance
export const errorHandler = new ErrorHandler();

// Initialize error handlers (safely)
try {
  errorHandler.init();
} catch (initError) {
  console.warn('Error handler initialization failed:', initError);
}

// Export error handler
export default errorHandler;
