
import { useState, useEffect } from 'react';
import { Menu, X, ChevronDown, Lock } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';

const FCBBHeader = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const location = useLocation();

  const navItems = [
    { 
      id: 'inicio', 
      label: 'Início',
      href: '/',
      isActive: location.pathname === '/'
    },
    { 
      id: 'sobre', 
      label: 'Sobre a FCBB', 
      submenu: [
        { label: 'História', link: '/sobre/historia' },
        { label: 'Missão e Visão', link: '/sobre/missao-visao' },
        { label: 'Direção', link: '/sobre/direcao' },
        { label: 'Órgãos Sociais', link: '/sobre/orgaos-sociais' },
        { label: 'Estatutos', link: '/sobre/estatutos' },
        { label: 'Contactos', link: '/sobre/contactos' }
      ],
      isActive: location.pathname.startsWith('/sobre')
    },
    { 
      id: 'competicoes', 
      label: 'Competições', 
      submenu: [
        { label: 'Liga Nacional', link: '/competicoes/liga-nacional' },
        { label: 'Taça de Cabo Verde', link: '/competicoes/taca-cabo-verde' },
        { label: 'Super Taça', link: '/competicoes/super-taca' },
        { label: 'Nacional Masculino', link: '/competicoes/nacional-masculino' },
        { label: 'Competições Regionais', link: '/competicoes/competicoes-regionais' },
        { label: 'Calendário', link: '/competicoes/calendario' },
        { label: 'Classificações', link: '/competicoes/classificacoes' }
      ],
      isActive: location.pathname.startsWith('/competicoes')
    },
    { 
      id: 'resultados', 
      label: 'Resultados', 
      submenu: [
        { label: 'Resultados Recentes', link: '/resultados' },
        { label: 'Ao Vivo', link: '/resultados/ao-vivo' },
        { label: 'Classificações', link: '/resultados/classificacoes' },
        { label: 'Estatísticas', link: '/estatisticas' }
      ],
      isActive: location.pathname.startsWith('/resultados') || location.pathname.startsWith('/estatisticas')
    },
    { 
      id: 'selecoes', 
      label: 'Seleções', 
      submenu: [
        { label: 'Seleção Masculina', link: '/selecoes/senior-masculina' },
        { label: 'Seleção Feminina', link: '/selecoes/senior-feminina' },
        { label: 'Sub-18 Masculina', link: '/selecoes/sub-18-masculina' },
        { label: 'Sub-18 Feminina', link: '/selecoes/sub-18-feminina' }
      ],
      isActive: location.pathname.startsWith('/selecoes')
    },
    { 
      id: 'clubes', 
      label: 'Clubes', 
      submenu: [
        { label: 'Diretório de Clubes', link: '/clubes' },
        { label: 'Lista Completa', link: '/clubes/completo' },
        { label: 'Transferências', link: '/transferencias' },
        { label: 'Formação', link: '/formacao' }
      ],
      isActive: location.pathname.startsWith('/clubes') || 
                location.pathname.startsWith('/transferencias') || 
                location.pathname.startsWith('/formacao')
    },
    { 
      id: 'multimedia', 
      label: 'Multimédia', 
      submenu: [
        { label: 'Notícias', link: '/noticias' },
        { label: 'Galeria', link: '/galeria' },
        { label: 'Vídeos', link: '/videos' },
        { label: 'Transmissões', link: '/transmissoes' }
      ],
      isActive: location.pathname.startsWith('/noticias') || 
                location.pathname.startsWith('/galeria') || 
                location.pathname.startsWith('/videos') || 
                location.pathname.startsWith('/transmissoes')
    }
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleDropdown = (itemId: string) => {
    setActiveDropdown(activeDropdown === itemId ? null : itemId);
  };

  const closeDropdowns = () => {
    setActiveDropdown(null);
  };

  return (
    <motion.header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-white/95 backdrop-blur-md shadow-xl border-b border-gray-200' 
          : 'bg-gradient-to-r from-cv-blue via-cv-blue to-cv-red shadow-lg'
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <div className="cv-container">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <motion.div
            className="flex items-center space-x-4"
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.2 }}
          >
            <Link to="/" className="flex items-center space-x-4">
              <motion.img 
                src="/lovable-uploads/8c0e50b0-b06a-42cf-b3fc-9a08063308b3.png" 
                alt="FCBB Logo" 
                className="h-16 w-auto"
                whileHover={{ rotate: 5 }}
                transition={{ duration: 0.3 }}
              />
              <div className="flex flex-col">
                <h1 className={`text-2xl font-bold font-display leading-tight transition-colors duration-300 ${
                  isScrolled ? 'text-cv-blue' : 'text-white'
                }`}>
                  FCBB
                </h1>
                <p className={`text-sm leading-tight transition-colors duration-300 ${
                  isScrolled ? 'text-gray-600' : 'text-cv-yellow'
                }`}>
                  Federação Cabo-verdiana de Basquetebol
                </p>
              </div>
            </Link>
          </motion.div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-2">
            {navItems.map((item) => (
              <div key={item.id} className="relative group">
                {item.href ? (
                  <Link
                    to={item.href}
                    className={`px-4 py-3 rounded-lg font-semibold font-display transition-all duration-300 flex items-center relative border-b-2 border-transparent ${
                      item.isActive
                        ? isScrolled 
                          ? 'text-cv-blue bg-cv-yellow/10 border-cv-yellow' 
                          : 'text-cv-yellow bg-white/10 border-cv-yellow'
                        : isScrolled 
                          ? 'text-gray-700 hover:text-cv-blue hover:bg-cv-blue/5 hover:border-cv-yellow' 
                          : 'text-white hover:text-cv-yellow hover:bg-white/10 hover:border-cv-yellow'
                    }`}
                  >
                    {item.label}
                  </Link>
                ) : (
                  <motion.button
                    onClick={() => toggleDropdown(item.id)}
                    className={`px-4 py-3 rounded-lg font-semibold font-display transition-all duration-300 flex items-center relative border-b-2 border-transparent cursor-pointer ${
                      item.isActive
                        ? isScrolled 
                          ? 'text-cv-blue bg-cv-yellow/10 border-cv-yellow' 
                          : 'text-cv-yellow bg-white/10 border-cv-yellow'
                        : isScrolled 
                          ? 'text-gray-700 hover:text-cv-blue hover:bg-cv-blue/5 hover:border-cv-yellow' 
                          : 'text-white hover:text-cv-yellow hover:bg-white/10 hover:border-cv-yellow'
                    }`}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    {item.label}
                    <motion.div
                      className="ml-2"
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
                        className="absolute top-full left-0 w-80 bg-white rounded-2xl shadow-2xl border border-gray-100 py-3 z-50 mt-2"
                        onMouseLeave={closeDropdowns}
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
                              className="block px-6 py-3 text-gray-700 hover:bg-cv-blue/5 hover:text-cv-blue transition-all duration-200 font-medium border-b border-gray-50 last:border-b-0"
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
            
            {/* Área Reservada */}
            <Link
              to="/area-reservada"
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-semibold font-display transition-all duration-300 border-2 ml-4 ${
                isScrolled 
                  ? 'border-cv-blue text-cv-blue hover:bg-cv-blue hover:text-white' 
                  : 'border-cv-yellow text-cv-yellow hover:bg-cv-yellow hover:text-cv-blue'
              }`}
            >
              <Lock size={18} />
              <span>Área Reservada</span>
            </Link>
          </nav>

          {/* Mobile Menu Button */}
          <motion.button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className={`lg:hidden p-3 rounded-lg transition-colors ${
              isScrolled ? 'text-gray-700 hover:text-cv-blue hover:bg-cv-blue/5' : 'text-white hover:text-cv-yellow'
            }`}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </motion.button>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              className="lg:hidden bg-white border-t border-gray-200 rounded-b-2xl shadow-2xl"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
            >
              <div className="py-6 space-y-2 max-h-96 overflow-y-auto">
                {navItems.map((item) => (
                  <div key={item.id}>
                    {item.href ? (
                      <Link
                        to={item.href}
                        className={`block px-6 py-3 font-semibold font-display rounded-lg mx-3 transition-all ${
                          item.isActive 
                            ? 'text-cv-blue bg-cv-blue/10 border-l-4 border-cv-blue'
                            : 'text-gray-700 hover:text-cv-blue hover:bg-cv-blue/5'
                        }`}
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        {item.label}
                      </Link>
                    ) : (
                      <motion.button
                        onClick={() => toggleDropdown(item.id)}
                        className={`block w-full text-left px-6 py-3 font-semibold font-display rounded-lg mx-3 transition-all ${
                          item.isActive 
                            ? 'text-cv-blue bg-cv-blue/10 border-l-4 border-cv-blue'
                            : 'text-gray-700 hover:text-cv-blue hover:bg-cv-blue/5'
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
                        className="pl-6 bg-gray-50 rounded-lg ml-6 mr-3 mt-2 overflow-hidden"
                      >
                        {item.submenu.map((subItem, index) => (
                          <Link
                            key={index}
                            to={subItem.link}
                            className="block px-4 py-3 text-sm text-gray-600 hover:text-cv-blue hover:bg-white transition-colors rounded font-medium"
                            onClick={() => setIsMobileMenuOpen(false)}
                          >
                            {subItem.label}
                          </Link>
                        ))}
                      </motion.div>
                    )}
                  </div>
                ))}
                
                {/* Mobile Área Reservada */}
                <div className="border-t border-gray-200 pt-4 mt-4">
                  <Link
                    to="/area-reservada"
                    className="flex items-center space-x-3 px-6 py-3 font-semibold font-display text-cv-blue hover:bg-cv-blue/5 rounded-lg mx-3 transition-all border-2 border-cv-blue"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <Lock size={20} />
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

export default FCBBHeader;
