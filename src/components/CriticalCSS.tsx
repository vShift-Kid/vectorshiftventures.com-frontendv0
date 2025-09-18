import React from 'react';

const CriticalCSS: React.FC = () => {
  return (
    <style dangerouslySetInnerHTML={{
      __html: `
        /* Critical CSS for above-the-fold content */
        * {
          box-sizing: border-box;
        }
        
        body {
          margin: 0;
          font-family: 'Inter', sans-serif;
          background-color: #0A0B1E;
          color: #ffffff;
          line-height: 1.6;
        }
        
        .font-mono {
          font-family: 'Space Mono', monospace;
        }
        
        /* Hero section critical styles */
        .hero-section {
          min-height: 100vh;
          background: linear-gradient(135deg, #0A0B1E 0%, #0A0B1E 100%);
          position: relative;
          overflow: hidden;
        }
        
        .hero-section::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: linear-gradient(180deg, rgba(79, 209, 197, 0.1) 0%, transparent 100%);
          pointer-events: none;
        }
        
        .container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 1.5rem;
        }
        
        .hero-content {
          position: relative;
          z-index: 1;
          padding-top: 8rem;
          padding-bottom: 5rem;
        }
        
        .hero-title {
          font-size: 3rem;
          font-weight: 700;
          line-height: 1.2;
          margin-bottom: 1.5rem;
          color: #ffffff;
        }
        
        .gradient-text {
          background: linear-gradient(90deg, #4FD1C5 0%, #3B82F6 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
        
        .hero-description {
          font-size: 1.25rem;
          color: #9CA3AF;
          margin-bottom: 2rem;
          max-width: 48rem;
        }
        
        .cta-buttons {
          display: flex;
          gap: 1rem;
          flex-wrap: wrap;
        }
        
        .btn-primary {
          background: linear-gradient(90deg, #4FD1C5 0%, #3B82F6 100%);
          color: #ffffff;
          padding: 0.75rem 2rem;
          border-radius: 9999px;
          font-weight: 600;
          text-decoration: none;
          display: inline-block;
          transition: all 0.3s ease;
          border: none;
          cursor: pointer;
        }
        
        .btn-primary:hover {
          box-shadow: 0 10px 25px rgba(79, 209, 197, 0.2);
          transform: translateY(-2px);
        }
        
        .btn-secondary {
          background: transparent;
          color: #4FD1C5;
          padding: 0.75rem 2rem;
          border: 1px solid rgba(79, 209, 197, 0.3);
          border-radius: 9999px;
          font-weight: 600;
          text-decoration: none;
          display: inline-block;
          transition: all 0.3s ease;
        }
        
        .btn-secondary:hover {
          background: rgba(79, 209, 197, 0.1);
        }
        
        /* Navigation critical styles */
        .nav-container {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          z-index: 50;
          background: rgba(10, 11, 30, 0.95);
          backdrop-filter: blur(10px);
          border-bottom: 1px solid rgba(79, 209, 197, 0.2);
        }
        
        .nav-content {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 1rem 1.5rem;
          max-width: 1200px;
          margin: 0 auto;
        }
        
        .logo {
          font-size: 1.5rem;
          font-weight: 700;
          color: #4FD1C5;
          text-decoration: none;
        }
        
        .nav-links {
          display: flex;
          gap: 2rem;
          list-style: none;
          margin: 0;
          padding: 0;
        }
        
        .nav-link {
          color: #ffffff;
          text-decoration: none;
          font-weight: 500;
          transition: color 0.3s ease;
        }
        
        .nav-link:hover {
          color: #4FD1C5;
        }
        
        /* Loading spinner */
        .loading-spinner {
          display: inline-block;
          width: 3rem;
          height: 3rem;
          border: 2px solid #374151;
          border-top: 2px solid #4FD1C5;
          border-radius: 50%;
          animation: spin 1s linear infinite;
        }
        
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        
        /* Responsive design */
        @media (max-width: 768px) {
          .hero-title {
            font-size: 2.5rem;
          }
          
          .hero-description {
            font-size: 1.125rem;
          }
          
          .cta-buttons {
            flex-direction: column;
            align-items: stretch;
          }
          
          .nav-links {
            display: none;
          }
        }
        
        @media (max-width: 640px) {
          .hero-title {
            font-size: 2rem;
          }
          
          .container {
            padding: 0 1rem;
          }
        }
        
        /* Font loading optimization */
        @font-face {
          font-family: 'Inter';
          font-style: normal;
          font-weight: 400 700;
          font-display: swap;
          src: url('https://fonts.gstatic.com/s/inter/v12/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuLyfAZ9hiJ-Ek-_EeA.woff2') format('woff2');
        }
        
        @font-face {
          font-family: 'Space Mono';
          font-style: normal;
          font-weight: 400 700;
          font-display: swap;
          src: url('https://fonts.gstatic.com/s/spacemono/v13/i7dPIFZifjKcF5VDWdruUEZ2RFq7AwU.woff2') format('woff2');
        }
      `
    }} />
  );
};

export default CriticalCSS;
