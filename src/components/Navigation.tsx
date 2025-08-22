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
    { path: '/consultation', label: 'Book Consultation' },
    { path: '/demo', label: 'Demo' },
    { path: '/contact', label: 'Contact' },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="fixed w-full z-50 bg-[#0A0B1E]/80 backdrop-blur-lg border-b border-cyan-500/20">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <OptimizedImage 
              src="/VsVLogo.png" 
              alt="Vector Shift Ventures LLC" 
              className="h-10 w-10" 
              lazy={false}
              placeholder="#0A0B1E"
            />
            <Link to="/" className="flex flex-col">
              <div className="flex items-center">
                <span className="text-lg font-mono font-medium text-gray-400">
                  Vectorshift
                </span>
                <span className="text-xl italic font-serif bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent ml-1">
                  Ventures
                </span>
              </div>
              <span className="text-xs font-mono text-gray-500 mt-0.5">
                Automation Agency
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
                    ? 'text-cyan-400'
                    : 'text-gray-300 hover:text-cyan-400'
                }`}
              >
                {item.label}
              </Link>
            ))}
            <Link
              to="/consultation"
              className="font-mono bg-gradient-to-r from-cyan-500 to-blue-500 px-6 py-2 rounded-full hover:shadow-lg hover:shadow-cyan-500/20 transition-all text-sm"
            >
              Transform Your Business
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-gray-300 hover:text-cyan-400"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 pb-4 border-t border-cyan-500/20">
            <div className="flex flex-col space-y-4 pt-4">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`font-mono text-sm transition-colors ${
                    isActive(item.path)
                      ? 'text-cyan-400'
                      : 'text-gray-300 hover:text-cyan-400'
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.label}
                </Link>
              ))}
              <Link
                to="/consultation"
                className="font-mono bg-gradient-to-r from-cyan-500 to-blue-500 px-6 py-2 rounded-full hover:shadow-lg hover:shadow-cyan-500/20 transition-all text-sm text-center"
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