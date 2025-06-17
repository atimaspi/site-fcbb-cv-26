
import { useState, useRef, useEffect } from 'react';
import { ChevronDown } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { navItems } from './navigationData';

const CompactNavigation = () => {
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const location = useLocation();
  const navRef = useRef<HTMLDivElement>(null);

  const toggleDropdown = (dropdown: string) => {
    setActiveDropdown(activeDropdown === dropdown ? null : dropdown);
  };

  const closeDropdowns = () => setActiveDropdown(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(event.target as Node)) {
        closeDropdowns();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    closeDropdowns();
  }, [location.pathname]);

  return (
    <nav ref={navRef} className="hidden lg:block bg-cv-blue py-1">
      <div className="cv-container">
        <div className="flex items-center justify-center space-x-4">
          {navItems.map((item) => (
            <div key={item.title} className="relative">
              {item.dropdown ? (
                <button
                  onClick={() => toggleDropdown(item.title)}
                  className="flex items-center px-2 py-1 text-white hover:text-cv-yellow transition-colors text-sm font-medium focus-visible-cv"
                  aria-expanded={activeDropdown === item.title}
                  aria-haspopup="true"
                >
                  {item.title}
                  <ChevronDown 
                    size={12} 
                    className={`ml-1 transition-transform ${
                      activeDropdown === item.title ? 'rotate-180' : ''
                    }`} 
                  />
                </button>
              ) : (
                <Link
                  to={item.path || '/'}
                  className="block px-2 py-1 text-white hover:text-cv-yellow transition-colors text-sm font-medium focus-visible-cv"
                >
                  {item.title}
                </Link>
              )}

              {item.dropdown && item.items && activeDropdown === item.title && (
                <div className="absolute top-full left-0 mt-1 dropdown-menu shadow-lg z-50 min-w-48">
                  {item.items.map((child) => (
                    <Link
                      key={child.name}
                      to={child.path || '/'}
                      className="dropdown-item text-xs"
                      onClick={closeDropdowns}
                    >
                      {child.name}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default CompactNavigation;
