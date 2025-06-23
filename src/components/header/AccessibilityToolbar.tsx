
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Accessibility, Type, Contrast, Volume2, Eye, Keyboard } from 'lucide-react';

interface AccessibilityToolbarProps {
  isScrolled?: boolean;
}

const AccessibilityToolbar = ({ isScrolled = false }: AccessibilityToolbarProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [fontSize, setFontSize] = useState(100);
  const [highContrast, setHighContrast] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [keyboardNavigation, setKeyboardNavigation] = useState(false);

  useEffect(() => {
    // Restore accessibility settings from localStorage
    const savedFontSize = localStorage.getItem('accessibility-font-size');
    const savedHighContrast = localStorage.getItem('accessibility-high-contrast') === 'true';
    const savedReducedMotion = localStorage.getItem('accessibility-reduced-motion') === 'true';
    const savedKeyboardNav = localStorage.getItem('accessibility-keyboard-nav') === 'true';

    if (savedFontSize) {
      const size = parseInt(savedFontSize);
      setFontSize(size);
      document.documentElement.style.fontSize = `${size}%`;
    }

    if (savedHighContrast) {
      setHighContrast(true);
      document.documentElement.classList.add('high-contrast');
    }

    if (savedReducedMotion) {
      setReducedMotion(true);
      document.documentElement.classList.add('reduce-motion');
    }

    if (savedKeyboardNav) {
      setKeyboardNavigation(true);
      document.documentElement.classList.add('keyboard-navigation');
    }
  }, []);

  const adjustFontSize = (increment: number) => {
    const newSize = Math.max(80, Math.min(150, fontSize + increment));
    setFontSize(newSize);
    document.documentElement.style.fontSize = `${newSize}%`;
    localStorage.setItem('accessibility-font-size', newSize.toString());
    
    // Announce change to screen readers
    announceToScreenReader(`Tamanho da fonte alterado para ${newSize}%`);
  };

  const toggleHighContrast = () => {
    const newState = !highContrast;
    setHighContrast(newState);
    document.documentElement.classList.toggle('high-contrast', newState);
    localStorage.setItem('accessibility-high-contrast', newState.toString());
    announceToScreenReader(`Alto contraste ${newState ? 'ativado' : 'desativado'}`);
  };

  const toggleReducedMotion = () => {
    const newState = !reducedMotion;
    setReducedMotion(newState);
    document.documentElement.classList.toggle('reduce-motion', newState);
    localStorage.setItem('accessibility-reduced-motion', newState.toString());
    announceToScreenReader(`Movimento reduzido ${newState ? 'ativado' : 'desativado'}`);
  };

  const toggleKeyboardNavigation = () => {
    const newState = !keyboardNavigation;
    setKeyboardNavigation(newState);
    document.documentElement.classList.toggle('keyboard-navigation', newState);
    localStorage.setItem('accessibility-keyboard-nav', newState.toString());
    announceToScreenReader(`Navegação por teclado ${newState ? 'melhorada' : 'padrão'}`);
  };

  const announceToScreenReader = (message: string) => {
    const announcement = document.createElement('div');
    announcement.setAttribute('aria-live', 'polite');
    announcement.setAttribute('aria-atomic', 'true');
    announcement.className = 'sr-only';
    announcement.textContent = message;
    document.body.appendChild(announcement);
    
    setTimeout(() => {
      document.body.removeChild(announcement);
    }, 1000);
  };

  const resetAccessibility = () => {
    setFontSize(100);
    setHighContrast(false);
    setReducedMotion(false);
    setKeyboardNavigation(false);
    
    document.documentElement.style.fontSize = '';
    document.documentElement.classList.remove('high-contrast', 'reduce-motion', 'keyboard-navigation');
    
    localStorage.removeItem('accessibility-font-size');
    localStorage.removeItem('accessibility-high-contrast');
    localStorage.removeItem('accessibility-reduced-motion');
    localStorage.removeItem('accessibility-keyboard-nav');
    
    announceToScreenReader('Todas as configurações de acessibilidade foram restauradas');
  };

  return (
    <div className="relative">
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className={`p-2 rounded-lg transition-all duration-300 focus-visible-cv ${
          isScrolled 
            ? 'text-gray-700 hover:text-cv-blue hover:bg-cv-blue/5' 
            : 'text-white hover:text-cv-yellow hover:bg-white/10'
        }`}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        aria-label="Ferramentas de acessibilidade"
        aria-expanded={isOpen}
        title="Ferramentas de acessibilidade"
      >
        <Accessibility size={20} />
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="absolute top-full right-0 mt-2 w-80 bg-white rounded-2xl shadow-2xl border border-gray-100 p-6 z-50"
            role="dialog"
            aria-labelledby="accessibility-title"
          >
            <h3 id="accessibility-title" className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
              <Accessibility size={20} className="mr-2" />
              Ferramentas de Acessibilidade
            </h3>

            {/* Font Size Controls */}
            <div className="mb-6">
              <div className="flex items-center justify-between mb-3">
                <span className="text-sm font-medium text-gray-600 flex items-center">
                  <Type size={16} className="mr-2" />
                  Tamanho da Fonte
                </span>
                <span className="text-sm text-gray-500">{fontSize}%</span>
              </div>
              <div className="flex items-center space-x-3">
                <button
                  onClick={() => adjustFontSize(-10)}
                  className="px-3 py-2 bg-gray-100 hover:bg-gray-200 rounded text-sm font-medium transition-colors focus-visible-cv"
                  aria-label="Diminuir tamanho da fonte"
                  disabled={fontSize <= 80}
                >
                  A-
                </button>
                <div className="flex-1 h-2 bg-gray-200 rounded" role="progressbar" aria-label="Tamanho da fonte">
                  <div 
                    className="h-full bg-cv-blue rounded transition-all duration-300"
                    style={{ width: `${((fontSize - 80) / 70) * 100}%` }}
                  />
                </div>
                <button
                  onClick={() => adjustFontSize(10)}
                  className="px-3 py-2 bg-gray-100 hover:bg-gray-200 rounded text-sm font-medium transition-colors focus-visible-cv"
                  aria-label="Aumentar tamanho da fonte"
                  disabled={fontSize >= 150}
                >
                  A+
                </button>
              </div>
            </div>

            {/* High Contrast Toggle */}
            <div className="mb-4">
              <label className="flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={highContrast}
                  onChange={toggleHighContrast}
                  className="sr-only"
                  aria-describedby="contrast-description"
                />
                <div className={`relative w-12 h-6 rounded-full transition-colors focus-visible-cv ${
                  highContrast ? 'bg-cv-blue' : 'bg-gray-300'
                }`}>
                  <div className={`absolute top-1 left-1 w-4 h-4 bg-white rounded-full transition-transform ${
                    highContrast ? 'translate-x-6' : ''
                  }`} />
                </div>
                <span className="ml-3 text-sm font-medium text-gray-600 flex items-center">
                  <Contrast size={16} className="mr-2" />
                  Alto Contraste
                </span>
              </label>
              <p id="contrast-description" className="text-xs text-gray-500 ml-12 mt-1">
                Melhora a legibilidade com cores de maior contraste
              </p>
            </div>

            {/* Reduced Motion Toggle */}
            <div className="mb-4">
              <label className="flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={reducedMotion}
                  onChange={toggleReducedMotion}
                  className="sr-only"
                  aria-describedby="motion-description"
                />
                <div className={`relative w-12 h-6 rounded-full transition-colors focus-visible-cv ${
                  reducedMotion ? 'bg-cv-blue' : 'bg-gray-300'
                }`}>
                  <div className={`absolute top-1 left-1 w-4 h-4 bg-white rounded-full transition-transform ${
                    reducedMotion ? 'translate-x-6' : ''
                  }`} />
                </div>
                <span className="ml-3 text-sm font-medium text-gray-600 flex items-center">
                  <Eye size={16} className="mr-2" />
                  Reduzir Movimento
                </span>
              </label>
              <p id="motion-description" className="text-xs text-gray-500 ml-12 mt-1">
                Reduz animações e efeitos de movimento
              </p>
            </div>

            {/* Enhanced Keyboard Navigation */}
            <div className="mb-6">
              <label className="flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={keyboardNavigation}
                  onChange={toggleKeyboardNavigation}
                  className="sr-only"
                  aria-describedby="keyboard-description"
                />
                <div className={`relative w-12 h-6 rounded-full transition-colors focus-visible-cv ${
                  keyboardNavigation ? 'bg-cv-blue' : 'bg-gray-300'
                }`}>
                  <div className={`absolute top-1 left-1 w-4 h-4 bg-white rounded-full transition-transform ${
                    keyboardNavigation ? 'translate-x-6' : ''
                  }`} />
                </div>
                <span className="ml-3 text-sm font-medium text-gray-600 flex items-center">
                  <Keyboard size={16} className="mr-2" />
                  Navegação Melhorada
                </span>
              </label>
              <p id="keyboard-description" className="text-xs text-gray-500 ml-12 mt-1">
                Melhora a navegação por teclado com indicadores visuais
              </p>
            </div>

            {/* Reset Button */}
            <button
              onClick={resetAccessibility}
              className="w-full px-4 py-3 bg-cv-blue text-white rounded-lg hover:bg-cv-blue/90 transition-colors font-medium focus-visible-cv"
            >
              Restaurar Configurações Padrão
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default AccessibilityToolbar;
