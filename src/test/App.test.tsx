import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import App from '../App';

// Mock the lazy-loaded components
vi.mock('../pages/Home', () => ({
  default: () => <div data-testid="home-page">Home Page</div>
}));

vi.mock('../pages/DemoTest', () => ({
  default: () => <div data-testid="demo-page">Demo Page</div>
}));

vi.mock('../pages/Services', () => ({
  default: () => <div data-testid="services-page">Services Page</div>
}));

vi.mock('../pages/Consultation', () => ({
  default: () => <div data-testid="consultation-page">Consultation Page</div>
}));

vi.mock('../pages/Contact', () => ({
  default: () => <div data-testid="contact-page">Contact Page</div>
}));

vi.mock('../pages/CompanyPage', () => ({
  default: () => <div data-testid="company-page">Company Page</div>
}));

// Mock components
vi.mock('../components/Navigation', () => ({
  default: () => <nav data-testid="navigation">Navigation</nav>
}));

vi.mock('../components/ErrorBoundary', () => ({
  default: ({ children }: { children: React.ReactNode }) => <div data-testid="error-boundary">{children}</div>
}));

vi.mock('../components/StickyCTA', () => ({
  default: () => <div data-testid="sticky-cta">Sticky CTA</div>
}));

vi.mock('../components/PerformanceMonitor', () => ({
  default: () => <div data-testid="performance-monitor">Performance Monitor</div>
}));

// Mock analytics
vi.mock('../lib/analytics', () => ({
  analytics: {
    trackPageView: vi.fn(),
    trackPerformance: vi.fn(),
  }
}));

const renderApp = () => {
  return render(
    <BrowserRouter>
      <App />
    </BrowserRouter>
  );
};

describe('App', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders without crashing', () => {
    renderApp();
    expect(screen.getByTestId('error-boundary')).toBeInTheDocument();
  });

  it('renders navigation', () => {
    renderApp();
    expect(screen.getByTestId('navigation')).toBeInTheDocument();
  });

  it('renders home page by default', () => {
    renderApp();
    expect(screen.getByTestId('home-page')).toBeInTheDocument();
  });

  it('renders sticky CTA', () => {
    renderApp();
    expect(screen.getByTestId('sticky-cta')).toBeInTheDocument();
  });

  it('renders performance monitor', () => {
    renderApp();
    expect(screen.getByTestId('performance-monitor')).toBeInTheDocument();
  });
});
