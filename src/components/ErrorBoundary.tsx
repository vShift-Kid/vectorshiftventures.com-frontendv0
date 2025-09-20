import React, { Component, ErrorInfo, ReactNode } from 'react';
import { errorHandler } from '../lib/errorHandler';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Error caught by boundary:', error, errorInfo);
    
    // Use error handler for better error tracking
    errorHandler.handleError(error, {
      component: 'ErrorBoundary',
      action: 'component_did_catch',
      additionalData: {
        componentStack: errorInfo.componentStack,
        errorBoundary: true,
      },
    });
  }

  public render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-[#0A0B1E] text-white flex items-center justify-center px-6">
          <div className="text-center max-w-md">
            <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-red-500/20 flex items-center justify-center">
              <svg
                className="w-8 h-8 text-red-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-2.694-.833-3.464 0L3.34 16.5c-.77.833.192 2.5 1.732 2.5z"
                />
              </svg>
            </div>
            <h1 className="text-2xl font-mono font-bold mb-4 text-red-400">
              Oops! Something went wrong
            </h1>
            <p className="text-gray-400 mb-6 font-mono">
              We're experiencing a technical issue. Please try refreshing the page.
            </p>
            <button
              onClick={() => window.location.reload()}
              className="font-mono bg-gradient-to-r from-cyan-500 to-blue-500 px-6 py-3 rounded-full hover:shadow-lg hover:shadow-cyan-500/20 transition-all"
            >
              Refresh Page
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;