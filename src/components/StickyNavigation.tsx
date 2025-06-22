
import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const StickyNavigation = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');

  const navItems = [
    { id: 'hero', label: 'Início' },
    { id: 'sobre', label: 'Sobre a FCBB', submenu: [
      { label: 'História', link: '/federacao/historia' },
      { label: 'Missão e Visão', link: '/federacao/missao-visao' },
      { label: 'Direção', link: '/federacao/direcao' },
      { label: 'Órgãos Sociais', link: '/federacao/orgaos-sociais' },
      { label: 'Estatutos', link: '/federacao/estatutos' },
      { label: 'Contactos', link: '/federacao/contactos' }
    ]},
    { id: 'competicoes', label: 'Competições', submenu: [
      { label: 'Liga Nacional', link: '/competicoes/liga-nacional' },
      { label: 'Taça de Cabo Verde', link: '/competicoes/taca' },
      { label: 'Super Taça', link: '/competicoes/super-taca' },
      { label: 'Nacional Masculino', link: '/competicoes/nacional-masculino' },
      { label: 'Competições Regionais', link: '/competicoes/regionais' },
      { label: 'Calendário', link: '/competicoes/calendario' }
    ]},
    { id: 'resultados', label: 'Resultados', submenu: [
      { label: 'Resultados Recentes', link: '/resultados' },
      { label: 'Ao Vivo', link: '/resultados/ao-vivo' },
      { label: 'Classificações', link: '/classificacoes' },
      { label: 'Estatísticas', link: '/estatisticas' },
      { label: 'FIBA LiveStats', link: '/resultados/fiba-livestats' }
    ]},
    { id: 'selecoes', label: 'Seleções Nacionais', submenu: [
      { label: 'Seleção Masculina', link: '/selecoes/masculina' },
      { label: 'Seleção Feminina', link: '/selecoes/feminina' },
      { label: 'Seleções Jovens', link: '/selecoes/jovens' }
    ]},
    { id: 'clubes', label: 'Clubes', submenu: [
      { label: 'Diretório de Clubes', link: '/clubes' },
      { label: 'Lista Completa', link: '/clubes/completo' },
      { label: 'Transferências', link: '/transferencias' }
    ]},
    { id: 'multimedia', label: 'Multimédia', submenu: [
      { label: 'Notícias', link: '/noticias' },
      { label: 'Galeria', link: '/galeria' },
      { label: 'Vídeos', link: '/videos' },
      { label: 'Transmissões', link: '/transmissoes' }
    ]}
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
    }
    setIsMobileMenuOpen(false);
  };

  return (
    <motion.nav
      className="fcbb-nav fixed top-0 left-0 right-0 z-50"
      initial={{ y: 0 }}
      animate={{ y: 0 }}
    >
      <div className="fcbb-container">
        <div className="flex items-center justify-between py-4">
          {/* Logo */}
          <motion.div
            className="flex items-center space-x-3"
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.2 }}
          >
            <img 
              src="/lovable-uploads/8c0e50b0-b06a-42cf-b3fc-9a08063308b3.png" 
              alt="FCBB" 
              className="h-12 w-auto"
            />
            <div className="flex flex-col">
              <h1 className="text-xl font-bold text-white font-display leading-tight">FCBB</h1>
              <p className="text-sm text-gray-200 leading-tight">Federação Cabo-verdiana de Basquetebol</p>
            </div>
          </motion.div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-1">
            {navItems.map((item) => (
              <div key={item.id} className="relative group">
                <motion.button
                  onClick={() => scrollToSection(item.id)}
                  className="fcbb-nav-item px-4 py-2 rounded-lg font-medium transition-all duration-300"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {item.label}
                </motion.button>
                
                {/* Dropdown Menu */}
                {item.submenu && (
                  <div className="fcbb-dropdown absolute top-full left-0 w-64 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50">
                    <div className="py-2">
                      {item.submenu.map((subItem, index) => (
                        <a
                          key={index}
                          href={subItem.link}
                          className="fcbb-dropdown-item"
                        >
                          {subItem.label}
                        </a>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden p-2 rounded-lg transition-colors text-white hover:text-cv-secondary"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              className="lg:hidden bg-cv-primary border-t border-cv-secondary/20"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
            >
              <div className="py-4 space-y-2">
                {navItems.map((item) => (
                  <div key={item.id}>
                    <motion.button
                      onClick={() => scrollToSection(item.id)}
                      className="block w-full text-left px-4 py-3 font-medium text-white hover:text-cv-secondary hover:bg-white/10 rounded-lg transition-all"
                      whileHover={{ x: 5 }}
                      transition={{ duration: 0.2 }}
                    >
                      {item.label}
                    </motion.button>
                    {/* Mobile Submenu */}
                    {item.submenu && (
                      <div className="pl-4 bg-cv-primary/80 rounded-lg ml-4 mt-2">
                        {item.submenu.map((subItem, index) => (
                          <a
                            key={index}
                            href={subItem.link}
                            className="block px-4 py-2 text-sm text-gray-200 hover:text-white hover:bg-white/10 transition-colors rounded"
                          >
                            {subItem.label}
                          </a>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.nav>
  );
};

export default StickyNavigation;
