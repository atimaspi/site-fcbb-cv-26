
import { useState, useEffect } from 'react';
import { Menu, X, Globe, Lock, ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';
import { createNavItems } from './navData';

const FibaStyleHeader = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const location = useLocation();

  const navItems = createNavItems(location.pathname);

  const toggleDropdown = (itemId: string) => {
    setActiveDropdown(activeDropdown === itemId ? null : itemId);
  };

  const closeDropdowns = () => {
    setActiveDropdown(null);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
    setActiveDropdown(null);
  };

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = () => {
      closeDropdowns();
    };

    if (activeDropdown) {
      document.addEventListener('click', handleClickOutside);
      return () => document.removeEventListener('click', handleClickOutside);
    }
  }, [activeDropdown]);

  return (
    <motion.header
      className="bg-[#002868] shadow-lg relative z-50"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo and Brand */}
          <motion.div
            className="flex items-center space-x-4 flex-shrink-0"
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.2 }}
          >
            <Link to="/" className="flex items-center space-x-4">
              <motion.img 
                src="/lovable-uploads/8c0e50b0-b06a-42cf-b3fc-9a08063308b3.png" 
                alt="FCBB Logo" 
                className="h-12 w-auto"
                whileHover={{ rotate: 5 }}
                transition={{ duration: 0.3 }}
              />
              <div className="hidden sm:flex flex-col">
                <h1 className="text-xl font-bold font-display leading-tight text-white">
                  FCBB
                </h1>
                <p className="text-xs leading-tight text-[#FDB927] font-medium">
                  FEDERAÇÃO CABO-VERDIANA DE BASQUETEBOL
                </p>
              </div>
            </Link>
          </motion.div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-1">
            {navItems.map((item) => (
              <div key={item.id} className="relative group">
                {item.href ? (
                  <Link
                    to={item.href}
                    className={`px-4 py-2 rounded-md font-medium transition-all duration-300 flex items-center space-x-1 ${
                      item.isActive
                        ? 'text-[#FDB927] bg-white/10' 
                        : 'text-white hover:text-[#FDB927] hover:bg-white/10'
                    }`}
                  >
                    <span>{item.label}</span>
                  </Link>
                ) : (
                  <motion.button
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleDropdown(item.id);
                    }}
                    className={`px-4 py-2 rounded-md font-medium transition-all duration-300 flex items-center space-x-1 ${
                      item.isActive
                        ? 'text-[#FDB927] bg-white/10' 
                        : 'text-white hover:text-[#FDB927] hover:bg-white/10'
                    }`}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <span>{item.label}</span>
                    <motion.div
                      animate={{ rotate: activeDropdown === item.id ? 180 : 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <ChevronDown size={16} />
                    </motion.div>
                  </motion.button>
                )}
                
                {/* Dropdown Menu */}
                {item.submenu && (
                  <AnimatePresence>
                    {activeDropdown === item.id && (
                      <motion.div
                        initial={{ opacity: 0, y: -10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -10, scale: 0.95 }}
                        transition={{ duration: 0.2 }}
                        className="absolute top-full left-0 w-72 bg-white rounded-lg shadow-2xl border border-gray-200 py-2 z-50 mt-1"
                        onClick={(e) => e.stopPropagation()}
                      >
                        {item.submenu.map((subItem, index) => (
                          <motion.div
                            key={index}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.05 }}
                          >
                            <Link
                              to={subItem.link}
                              className="block px-4 py-3 text-gray-700 hover:bg-[#002868]/5 hover:text-[#002868] transition-all duration-200 font-medium border-b border-gray-100 last:border-b-0"
                              onClick={closeDropdowns}
                            >
                              {subItem.label}
                            </Link>
                          </motion.div>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                )}
              </div>
            ))}
          </nav>

          {/* Right Side Items */}
          <div className="flex items-center space-x-4">
            {/* Language Selector */}
            <div className="hidden lg:flex items-center space-x-2 text-white">
              <Globe size={16} />
              <span className="text-sm font-medium">PT</span>
            </div>

            {/* Área Reservada Button */}
            <Link
              to="/area-reservada"
              className="hidden lg:flex items-center space-x-2 px-4 py-2 bg-[#FDB927] text-[#002868] rounded-md font-semibold hover:bg-yellow-400 transition-all duration-300 transform hover:scale-105"
            >
              <Lock size={16} />
              <span>Área Reservada</span>
            </Link>

            {/* Mobile Menu Button */}
            <motion.button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2 rounded-md text-white hover:text-[#FDB927] hover:bg-white/10 transition-colors"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </motion.button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              className="lg:hidden bg-[#002868] border-t border-white/20"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
            >
              <div className="py-4 space-y-2 max-h-96 overflow-y-auto">
                {navItems.map((item) => (
                  <div key={item.id}>
                    {item.href ? (
                      <Link
                        to={item.href}
                        className={`block px-4 py-3 font-medium rounded-md mx-2 transition-all ${
                          item.isActive 
                            ? 'text-[#FDB927] bg-white/10'
                            : 'text-white hover:text-[#FDB927] hover:bg-white/10'
                        }`}
                        onClick={closeMobileMenu}
                      >
                        {item.label}
                      </Link>
                    ) : (
                      <motion.button
                        onClick={() => toggleDropdown(item.id)}
                        className={`block w-full text-left px-4 py-3 font-medium rounded-md mx-2 transition-all ${
                          item.isActive 
                            ? 'text-[#FDB927] bg-white/10'
                            : 'text-white hover:text-[#FDB927] hover:bg-white/10'
                        }`}
                        whileHover={{ x: 5 }}
                        transition={{ duration: 0.2 }}
                      >
                        <div className="flex items-center justify-between">
                          {item.label}
                          <motion.div
                            animate={{ rotate: activeDropdown === item.id ? 180 : 0 }}
                            transition={{ duration: 0.2 }}
                          >
                            <ChevronDown size={16} />
                          </motion.div>
                        </div>
                      </motion.button>
                    )}
                    
                    {/* Mobile Submenu */}
                    {item.submenu && activeDropdown === item.id && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="pl-4 bg-white/5 rounded-lg ml-4 mr-2 mt-2 overflow-hidden"
                      >
                        {item.submenu.map((subItem, index) => (
                          <Link
                            key={index}
                            to={subItem.link}
                            className="block px-4 py-3 text-sm text-white/80 hover:text-[#FDB927] hover:bg-white/10 transition-colors rounded font-medium"
                            onClick={closeMobileMenu}
                          >
                            {subItem.label}
                          </Link>
                        ))}
                      </motion.div>
                    )}
                  </div>
                ))}
                
                {/* Mobile Language & Área Reservada */}
                <div className="border-t border-white/20 pt-4 mt-4 space-y-2">
                  <div className="flex items-center space-x-2 px-4 py-2 text-white">
                    <Globe size={16} />
                    <span className="text-sm font-medium">Português</span>
                  </div>
                  <Link
                    to="/area-reservada"
                    className="flex items-center space-x-2 px-4 py-3 mx-2 bg-[#FDB927] text-[#002868] rounded-md font-semibold"
                    onClick={closeMobileMenu}
                  >
                    <Lock size={16} />
                    <span>Área Reservada</span>
                  </Link>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.header>
  );
};

export default FibaStyleHeader;
