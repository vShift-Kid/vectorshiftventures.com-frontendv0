import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import OptimizedImage from './OptimizedImage';

const Navigation: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const navItems = [
    { path: '/', label: 'Home' },
    { path: '/services', label: 'Services' },
    { path: '/demo', label: 'Request Demo' },
    { path: '/contact', label: 'Contact' },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="fixed w-full z-50 bg-slate-900/80 backdrop-blur-lg border-b border-slate-400/20">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <OptimizedImage 
              src="/VsVLogo.png" 
              alt="Vector Shift Ventures LLC" 
              className="h-12 w-12 rounded-lg border border-slate-400/30" 
              lazy={false}
              priority={true}
              fallback="/VsVLogo.png"
            />
            <Link to="/" className="flex flex-col">
              <div className="flex items-center">
                <span className="text-lg font-mono font-medium text-slate-300">
                  Vector Shift
                </span>
                <span className="text-xl italic font-serif bg-gradient-to-r from-blue-400 via-green-400 to-blue-500 bg-clip-text text-transparent ml-1">
                  Ventures
                </span>
              </div>
              <span className="text-xs font-mono text-slate-400 mt-0.5">
                Technical AI Solutions
              </span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`font-mono text-sm transition-colors ${
                  isActive(item.path)
                    ? 'text-blue-400'
                    : 'text-slate-200 hover:text-blue-400'
                }`}
              >
                {item.label}
              </Link>
            ))}
            <Link
              to="/consultation"
              className="font-mono bg-gradient-to-r from-blue-500 to-green-500 px-6 py-2 rounded-full hover:shadow-lg hover:shadow-blue-500/20 transition-all text-sm"
            >
              Transform Your Business
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-slate-200 hover:text-blue-400"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 pb-4 border-t border-slate-400/20">
            <div className="flex flex-col space-y-4 pt-4">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`font-mono text-sm transition-colors ${
                    isActive(item.path)
                      ? 'text-blue-400'
                      : 'text-slate-200 hover:text-blue-400'
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.label}
                </Link>
              ))}
              <Link
                to="/consultation"
                className="font-mono bg-gradient-to-r from-blue-500 to-green-500 px-6 py-2 rounded-full hover:shadow-lg hover:shadow-blue-500/20 transition-all text-sm text-center"
                onClick={() => setIsMenuOpen(false)}
              >
                Transform Your Business
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation; 