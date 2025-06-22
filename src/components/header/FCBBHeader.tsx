
import { useState, useEffect } from 'react';
import { Menu, X, Lock, Search, ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';

const FCBBHeader = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const { user, signOut } = useAuth();
  const location = useLocation();

  const navItems = [
    { 
      id: 'inicio', 
      label: 'Início',
      href: '/'
    },
    { 
      id: 'sobre', 
      label: 'Sobre a FCBB', 
      submenu: [
        { label: 'História', link: '/sobre/historia' },
        { label: 'Missão e Visão', link: '/sobre/missao-visao' },
        { label: 'Direção', link: '/federacao/direcao' },
        { label: 'Órgãos Sociais', link: '/federacao/orgaos-sociais' },
        { label: 'Estatutos', link: '/federacao/estatutos' },
        { label: 'Contactos', link: '/federacao/contactos' }
      ]
    },
    { 
      id: 'competicoes', 
      label: 'Competições', 
      submenu: [
        { label: 'Liga Nacional', link: '/competicoes/liga-nacional' },
        { label: 'Taça de Cabo Verde', link: '/competicoes/taca' },
        { label: 'Super Taça', link: '/competicoes/super-taca' },
        { label: 'Nacional Masculino', link: '/competicoes/nacional-masculino' },
        { label: 'Competições Regionais', link: '/competicoes/regionais' },
        { label: 'Calendário', link: '/competicoes/calendario' }
      ]
    },
    { 
      id: 'resultados', 
      label: 'Resultados', 
      submenu: [
        { label: 'Resultados Recentes', link: '/resultados' },
        { label: 'Ao Vivo', link: '/resultados/ao-vivo' },
        { label: 'Classificações', link: '/classificacoes' },
        { label: 'Estatísticas', link: '/estatisticas' },
        { label: 'FIBA LiveStats', link: '/resultados/fiba-livestats' }
      ]
    },
    { 
      id: 'selecoes', 
      label: 'Seleções Nacionais', 
      submenu: [
        { label: 'Seleção Masculina', link: '/selecoes/masculina' },
        { label: 'Seleção Feminina', link: '/selecoes/feminina' },
        { label: 'Seleções Jovens', link: '/selecoes/jovens' }
      ]
    },
    { 
      id: 'clubes', 
      label: 'Clubes', 
      href: '/clubes'
    },
    { 
      id: 'multimedia', 
      label: 'Multimédia', 
      submenu: [
        { label: 'Notícias', link: '/noticias' },
        { label: 'Galeria', link: '/galeria' },
        { label: 'Vídeos', link: '/videos' },
        { label: 'Transmissões', link: '/transmissoes' }
      ]
    }
  ];

  const toggleDropdown = (itemId: string) => {
    setActiveDropdown(activeDropdown === itemId ? null : itemId);
  };

  const closeAllDropdowns = () => {
    setActiveDropdown(null);
    setIsMobileMenuOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = () => {
      setActiveDropdown(null);
    };

    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, []);

  return (
    <header className="bg-cv-blue shadow-lg relative z-50">
      {/* Top Bar */}
      <div className="bg-cv-blue border-b border-blue-800">
        <div className="cv-container">
          <div className="flex justify-between items-center py-2 text-sm text-white">
            <span className="font-medium">FIBA: #52 (M) | #78 (F)</span>
            <div className="flex items-center space-x-4">
              <button className="hover:text-cv-yellow p-1 flex items-center gap-1" aria-label="Pesquisar">
                <Search size={14} />
                <span className="hidden sm:inline">Pesquisar</span>
              </button>
              <Link to="?lang=pt" className="hover:text-cv-yellow font-medium px-2">PT</Link>
              <Link to="?lang=en" className="hover:text-cv-yellow font-medium px-2">EN</Link>
              <Link 
                to="/area-reservada" 
                className="flex items-center gap-1 hover:text-cv-yellow font-medium bg-cv-yellow text-cv-blue px-3 py-1 rounded-md transition-colors"
              >
                <Lock size={14} />
                <span>Área Reservada</span>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <div className="cv-container">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3">
            <img 
              src="/lovable-uploads/8c0e50b0-b06a-42cf-b3fc-9a08063308b3.png" 
              alt="FCBB" 
              className="h-14 w-auto"
            />
            <div className="flex flex-col">
              <h1 className="text-2xl font-bold leading-tight text-white">
                FCBB
              </h1>
              <p className="text-sm leading-tight text-blue-100">
                Federação Cabo-verdiana de Basquetebol
              </p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-1">
            {navItems.map((item) => (
              <div key={item.id} className="relative group">
                {item.href ? (
                  <Link
                    to={item.href}
                    className={`px-4 py-3 rounded-lg font-medium transition-all duration-300 ${
                      location.pathname === item.href 
                        ? 'text-cv-yellow bg-white/10' 
                        : 'text-white hover:text-cv-yellow hover:bg-white/10'
                    }`}
                  >
                    {item.label}
                  </Link>
                ) : (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleDropdown(item.id);
                    }}
                    className="px-4 py-3 rounded-lg font-medium transition-all duration-300 flex items-center text-white hover:text-cv-yellow hover:bg-white/10"
                  >
                    {item.label}
                    <ChevronDown 
                      className={`ml-1 h-4 w-4 transition-transform duration-200 ${
                        activeDropdown === item.id ? 'rotate-180' : ''
                      }`}
                    />
                  </button>
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
                        className="absolute top-full left-0 w-72 bg-white rounded-xl shadow-2xl border border-gray-200 py-2 z-50 mt-1"
                      >
                        {item.submenu.map((subItem, index) => (
                          <Link
                            key={index}
                            to={subItem.link}
                            className="block px-4 py-3 text-gray-700 hover:bg-cv-blue hover:text-white transition-all duration-200 border-b border-gray-100 last:border-b-0"
                            onClick={closeAllDropdowns}
                          >
                            {subItem.label}
                          </Link>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                )}
              </div>
            ))}
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden p-2 rounded-lg text-white hover:text-cv-yellow hover:bg-white/10 transition-colors"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              className="lg:hidden bg-white border-t border-gray-200 rounded-b-2xl shadow-2xl mb-4"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
            >
              <div className="py-4 space-y-1 max-h-96 overflow-y-auto">
                {navItems.map((item) => (
                  <div key={item.id}>
                    {item.href ? (
                      <Link
                        to={item.href}
                        className="block px-4 py-3 font-medium text-gray-700 hover:text-cv-blue hover:bg-blue-50 rounded-lg mx-2 transition-all"
                        onClick={closeAllDropdowns}
                      >
                        {item.label}
                      </Link>
                    ) : (
                      <button
                        onClick={() => toggleDropdown(item.id)}
                        className="flex items-center justify-between w-full px-4 py-3 font-medium text-gray-700 hover:text-cv-blue hover:bg-blue-50 rounded-lg mx-2 transition-all"
                      >
                        {item.label}
                        <ChevronDown 
                          className={`h-4 w-4 transition-transform duration-200 ${
                            activeDropdown === item.id ? 'rotate-180' : ''
                          }`}
                        />
                      </button>
                    )}
                    
                    {/* Mobile Submenu */}
                    {item.submenu && activeDropdown === item.id && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="bg-gray-50 rounded-lg ml-4 mt-2 overflow-hidden"
                      >
                        {item.submenu.map((subItem, index) => (
                          <Link
                            key={index}
                            to={subItem.link}
                            className="block px-4 py-2 text-sm text-gray-600 hover:text-cv-blue hover:bg-white transition-colors"
                            onClick={closeAllDropdowns}
                          >
                            {subItem.label}
                          </Link>
                        ))}
                      </motion.div>
                    )}
                  </div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
};

export default FCBBHeader;
