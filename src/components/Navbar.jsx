import React, { useState, useEffect } from 'react';
import { Menu, X, Sun, Moon } from 'lucide-react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [theme, setTheme] = useState('dark'); // Removed localStorage for Claude artifacts

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    // Apply theme to document root
    const root = document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
      root.style.colorScheme = 'dark';
    } else {
      root.classList.remove('dark');
      root.style.colorScheme = 'light';
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prevTheme => prevTheme === 'dark' ? 'light' : 'dark');
  };

  const navItems = [
    { href: '#home', label: 'Home' },
    { href: '#about', label: 'About' },
    { href: '#education', label: 'Education' },
    { href: '#skills', label: 'Skills' },
    { href: '#projects', label: 'Projects' },
    { href: '#experience', label: 'Experience' },
    { href: '#certificates', label: 'Certificates' },
    { href: '#contact', label: 'Contact' },
  ];

  const scrollToSection = (href) => {
    const element = document.querySelector(href);
    element?.scrollIntoView({ behavior: 'smooth' });
    setIsOpen(false);
  };

  const scrollToHome = () => {
    // Scroll to top of page or to home section
    const homeElement = document.querySelector('#home');
    if (homeElement) {
      homeElement.scrollIntoView({ behavior: 'smooth' });
    } else {
      // If no home section exists, scroll to top
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
    setIsOpen(false); // Close mobile menu if open
  };

  return (
    <div className={theme === 'dark' ? 'dark' : ''}>
      <nav
        className={`fixed top-0 w-full z-50 transition-all duration-300 ${
          scrolled
            ? theme === 'dark' 
              ? 'bg-gray-900/80 backdrop-blur-lg border-b border-cyan-400/20'
              : 'bg-black/70 backdrop-blur-lg border-b border-gray-200'
            : 'bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div 
              onClick={scrollToHome}
              className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-purple-600 bg-clip-text text-transparent cursor-pointer hover:scale-105 transition-transform"
            >
              ND
            </div>

            {/* Desktop Menu */}
            <div className="hidden md:flex space-x-8">
              {navItems.map((item) => (
                <button
                  key={item.href}
                  onClick={() => scrollToSection(item.href)}
                  className={`transition-all duration-200 relative group hover:-translate-y-0.5 ${
                    theme === 'dark' 
                      ? 'text-gray-300 hover:text-cyan-400' 
                      : 'text-gray-300 hover:text-purple-600'
                  }`}
                >
                  {item.label}
                  <span 
                    className={`absolute -bottom-1 left-0 w-0 h-0.5 group-hover:w-full transition-all duration-300 ${
                      theme === 'dark' ? 'bg-cyan-400' : 'bg-purple-600'
                    }`}
                  ></span>
                </button>
              ))}
            </div>

            <div className="flex items-center space-x-4">
              {/* <button
                onClick={toggleTheme}
                className={`p-2 rounded-lg transition-all duration-200 hover:scale-105 active:scale-95 ${
                  theme === 'dark'
                    ? 'bg-gray-800 text-cyan-400 hover:bg-gray-700'
                    : 'bg-gray-100 text-purple-600 hover:bg-gray-200'
                }`}
              >
                {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
              </button> */}

              <button
                onClick={() => setIsOpen(!isOpen)}
                className={`md:hidden p-2 transition-colors duration-200 ${
                  theme === 'dark'
                    ? 'text-gray-300 hover:text-cyan-400'
                    : 'text-gray-700 hover:text-purple-600'
                }`}
              >
                {isOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        <div
          className={`md:hidden transition-all duration-300 ease-in-out overflow-hidden ${
            isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
          } ${
            theme === 'dark'
              ? 'bg-gray-900/95 backdrop-blur-lg border-t border-cyan-400/20'
              : 'bg-white/95 backdrop-blur-lg border-t border-gray-200'
          }`}
        >
          <div className="px-2 pt-2 pb-3 space-y-1">
            {navItems.map((item) => (
              <button
                key={item.href}
                onClick={() => scrollToSection(item.href)}
                className={`block w-full text-left px-3 py-2 rounded-md transition-colors duration-200 ${
                  theme === 'dark'
                    ? 'text-gray-300 hover:text-cyan-400 hover:bg-gray-800/50'
                    : 'text-gray-700 hover:text-purple-600 hover:bg-gray-100/50'
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>
      </nav>

      {/* Demo Background for Testing */}
      {/* <div className={`min-h-screen pt-20 transition-colors duration-300 ${
        theme === 'dark' 
          ? 'bg-gray-900 text-white' 
          : 'bg-gray-50 text-gray-900'
      }`}>
        <div className="max-w-4xl mx-auto p-8">
          <h1 className="text-4xl font-bold mb-8 text-center">
            Dark/Light Mode Test
          </h1>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {navItems.map((item, index) => (
              <div
                key={item.href}
                id={item.href.replace('#', '')}
                className={`p-6 rounded-lg transition-colors duration-300 ${
                  theme === 'dark'
                    ? 'bg-gray-800 border border-gray-700'
                    : 'bg-white border border-gray-200 shadow-sm'
                }`}
              >
                <h2 className="text-2xl font-semibold mb-4 capitalize">
                  {item.label}
                </h2>
                <p className={`${
                  theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
                }`}>
                  This is the {item.label} section. Lorem ipsum dolor sit amet, 
                  consectetur adipiscing elit. Sed do eiusmod tempor incididunt 
                  ut labore et dolore magna aliqua.
                </p>
                <div className="mt-4 flex items-center justify-between">
                  <span className={`text-sm ${
                    theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
                  }`}>
                    Section {index + 1}
                  </span>
                  <button className={`px-3 py-1 text-sm rounded transition-colors ${
                    theme === 'dark'
                      ? 'bg-cyan-600 hover:bg-cyan-700 text-white'
                      : 'bg-purple-600 hover:bg-purple-700 text-white'
                  }`}>
                    Learn More
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div> */}
    </div>
  );
};

export default Navbar;