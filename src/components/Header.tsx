
import { useState, useEffect, useRef } from 'react';
import { Menu, X } from 'lucide-react';
import { useLocation } from 'react-router-dom';
import { useKeyboardNavigation } from '@/hooks/useKeyboardNavigation';
import { AccessibleButton } from '@/components/ui/accessible-button';
import TopBar from './header/TopBar';
import MainHeader from './header/MainHeader';
import NavigationMenu from './header/NavigationMenu';
import MobileMenu from './header/MobileMenu';

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [focusedItemIndex, setFocusedItemIndex] = useState(-1);
  const location = useLocation();
  const headerRef = useRef<HTMLElement>(null);

  const closeAllDropdowns = () => {
    setActiveDropdown(null);
    setMobileMenuOpen(false);
    setFocusedItemIndex(-1);
  };

  const toggleDropdown = (dropdown: string) => {
    if (activeDropdown === dropdown) {
      setActiveDropdown(null);
      setFocusedItemIndex(-1);
    } else {
      setActiveDropdown(dropdown);
      setFocusedItemIndex(-1);
    }
  };

  // Enhanced keyboard navigation
  useKeyboardNavigation({
    onEscape: closeAllDropdowns,
    onArrowDown: () => {
      if (activeDropdown) {
        setFocusedItemIndex(prev => Math.min(prev + 1, 5)); // Max 6 items per dropdown
      }
    },
    onArrowUp: () => {
      if (activeDropdown) {
        setFocusedItemIndex(prev => Math.max(prev - 1, -1));
      }
    },
    onEnter: () => {
      if (activeDropdown && focusedItemIndex >= 0) {
        // Handle enter key for focused items
        closeAllDropdowns();
      }
    },
    enabled: true
  });

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (headerRef.current && !headerRef.current.contains(event.target as Node)) {
        closeAllDropdowns();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Close dropdowns on route change
  useEffect(() => {
    closeAllDropdowns();
  }, [location.pathname]);

  return (
    <header ref={headerRef} className="bg-white shadow-md relative z-50" role="banner">
      {/* Skip navigation link for screen readers */}
      <a 
        href="#main-content" 
        className="skip-nav focus:top-0"
        aria-label="Saltar para o conteúdo principal"
      >
        Saltar para o conteúdo principal
      </a>

      <TopBar />
      <MainHeader />
      
      <div className="cv-container">
        <NavigationMenu 
          activeDropdown={activeDropdown}
          focusedItemIndex={focusedItemIndex}
          onToggleDropdown={toggleDropdown}
          onCloseDropdown={closeAllDropdowns}
        />

        {/* Mobile menu button */}
        <div className="lg:hidden flex justify-end py-3">
          <AccessibleButton
            variant="ghost"
            size="sm"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            ariaLabel={mobileMenuOpen ? "Fechar menu de navegação" : "Abrir menu de navegação"}
            icon={mobileMenuOpen ? <X /> : <Menu />}
            className="p-2"
          />
        </div>
      </div>

      <MobileMenu 
        isOpen={mobileMenuOpen}
        activeDropdown={activeDropdown}
        onToggleDropdown={toggleDropdown}
        onClose={() => setMobileMenuOpen(false)}
      />
    </header>
  );
};

export default Header;
