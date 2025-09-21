import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { X, MessageSquare, Phone } from 'lucide-react';

const StickyCTA: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const location = useLocation();

  // Pages where CTA should not show (users are already in contact mode)
  const hiddenPages = ['/demo', '/contact'];

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      
      // Show CTA after scrolling 20% of the page
      if (scrollTop > windowHeight * 0.2) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Don't show CTA on pages where users are already contacting
  if (hiddenPages.includes(location.pathname)) return null;

  if (!isVisible) return null;

  return (
    <div className={`fixed bottom-6 right-6 z-50 transition-all duration-300 ${
      isMinimized ? 'transform translate-y-0' : 'transform translate-y-0'
    }`}>
      {!isMinimized ? (
        <div className="bg-gradient-to-r from-cyan-500 to-blue-500 rounded-2xl p-6 shadow-2xl shadow-cyan-500/25 max-w-sm">
          <button
            onClick={() => setIsMinimized(true)}
            className="absolute top-2 right-2 text-white/70 hover:text-white transition-colors"
            aria-label="Minimize CTA"
          >
            <X className="w-4 h-4" />
          </button>
          
          <div className="pr-6">
            <h3 className="font-mono font-bold text-white text-lg mb-2">
              Ready to Transform Your Operations?
            </h3>
            <p className="text-cyan-100 font-mono text-sm mb-4">
              Get your custom AI automation demo in 24 hours
            </p>
            
            <div className="space-y-3">
              <Link
                to="/demo"
                className="block w-full bg-white text-cyan-600 font-mono font-semibold py-3 px-4 rounded-lg text-center hover:bg-cyan-50 transition-colors"
              >
                Request Demo
              </Link>
              
              <div className="flex space-x-2">
                <Link
                  to="/contact"
                  className="flex-1 bg-cyan-600 text-white font-mono font-semibold py-2 px-3 rounded-lg text-center text-sm hover:bg-cyan-700 transition-colors flex items-center justify-center"
                >
                  <MessageSquare className="w-4 h-4 mr-1" />
                  Contact
                </Link>
                <a
                  href="tel:+1-833-957-2961"
                  className="flex-1 bg-cyan-600 text-white font-mono font-semibold py-2 px-3 rounded-lg text-center text-sm hover:bg-cyan-700 transition-colors flex items-center justify-center"
                >
                  <Phone className="w-4 h-4 mr-1" />
                  Call
                </a>
              </div>
            </div>
            
            <div className="mt-3 text-xs text-cyan-100 font-mono">
              ✓ Free consultation ✓ Custom solutions ✓ 24/7 support
            </div>
          </div>
        </div>
      ) : (
        <button
          onClick={() => setIsMinimized(false)}
          className="bg-gradient-to-r from-cyan-500 to-blue-500 text-white p-4 rounded-full shadow-2xl shadow-cyan-500/25 hover:shadow-cyan-500/40 transition-all transform hover:scale-105"
          aria-label="Show CTA details"
        >
          <MessageSquare className="w-6 h-6" />
        </button>
      )}
    </div>
  );
};

export default StickyCTA;
