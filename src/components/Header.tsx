
import { useState, useEffect, useRef } from 'react';
import { Button } from "@/components/ui/button";
import { Menu, X, ChevronDown, Lock, Globe, Search } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const location = useLocation();
  const headerRef = useRef<HTMLElement>(null);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const toggleDropdown = (dropdown: string) => {
    if (activeDropdown === dropdown) {
      setActiveDropdown(null);
    } else {
      setActiveDropdown(dropdown);
    }
  };

  const closeAllDropdowns = () => {
    setActiveDropdown(null);
    setMobileMenuOpen(false);
  };

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

  // Handle keyboard navigation
  const handleKeyDown = (event: React.KeyboardEvent, dropdown?: string) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      if (dropdown) {
        toggleDropdown(dropdown);
      }
    }
    if (event.key === 'Escape') {
      closeAllDropdowns();
    }
  };

  const navItems = [
    {
      title: "Sobre a FCBB",
      dropdown: true,
      key: "about",
      ariaLabel: "Menu sobre a Federação Cabo-verdiana de Basquetebol",
      items: [
        { name: "Missão e Visão", path: "/sobre/missao-visao", description: "Conheça a missão e visão da FCBB" },
        { name: "História", path: "/sobre/historia", description: "História da federação" },
        { name: "Direção", path: "/sobre/direcao", description: "Membros da direção atual" },
        { name: "Órgãos Sociais", path: "/sobre/orgaos-sociais", description: "Estrutura organizacional" },
        { name: "Estatutos", path: "/sobre/estatutos", description: "Estatutos da federação" },
        { name: "Contactos", path: "/sobre/contactos", description: "Informações de contacto" }
      ]
    },
    {
      title: "Competições",
      dropdown: true,
      key: "competitions",
      ariaLabel: "Menu de competições de basquetebol",
      items: [
        { name: "Nacional Masculino", path: "/competicoes/nacional-masculino", description: "Campeonato Nacional Masculino" },
        { name: "Liga Nacional", path: "/competicoes/liga-nacional", description: "Liga Nacional de Basquetebol" },
        { name: "Taça de Cabo Verde", path: "/competicoes/taca-cabo-verde", description: "Taça Nacional" },
        { name: "Super Taça", path: "/competicoes/super-taca", description: "Super Taça Nacional" },
        { name: "Competições Regionais", path: "/competicoes/competicoes-regionais", description: "Campeonatos regionais" },
        { name: "Classificações", path: "/competicoes/classificacoes", description: "Tabelas classificativas" },
        { name: "Calendário", path: "/competicoes/calendario", description: "Calendário de jogos" }
      ]
    },
    {
      title: "Seleções Nacionais",
      dropdown: true,
      key: "teams",
      ariaLabel: "Menu das seleções nacionais",
      items: [
        { name: "Sénior Masculina", path: "/selecoes/senior-masculina", description: "Seleção nacional masculina sénior" },
        { name: "Sénior Feminina", path: "/selecoes/senior-feminina", description: "Seleção nacional feminina sénior" },
        { name: "Sub-18 Masculina", path: "/selecoes/sub-18-masculina", description: "Seleção masculina sub-18" },
        { name: "Sub-18 Feminina", path: "/selecoes/sub-18-feminina", description: "Seleção feminina sub-18" },
        { name: "Sub-16 Masculina", path: "/selecoes/sub-16-masculina", description: "Seleção masculina sub-16" },
        { name: "Sub-16 Feminina", path: "/selecoes/sub-16-feminina", description: "Seleção feminina sub-16" }
      ]
    },
    {
      title: "Clubes",
      dropdown: true,
      key: "clubs",
      ariaLabel: "Menu de gestão de clubes",
      items: [
        { name: "Direção de Clubes", path: "/clubes", description: "Gestão e administração de clubes" },
        { name: "Transferências", path: "/transferencias", description: "Sistema de transferências" },
        { name: "Formação", path: "/formacao", description: "Programas de formação" },
        { name: "Arbitragem", path: "/arbitragem", description: "Gestão de árbitros" }
      ]
    },
    {
      title: "Resultados & Estatísticas",
      dropdown: true,
      key: "results",
      ariaLabel: "Menu de resultados e estatísticas",
      items: [
        { name: "Resultados ao Vivo", path: "/resultados/ao-vivo", description: "Acompanhe jogos em tempo real" },
        { name: "Estatísticas", path: "/estatisticas", description: "Estatísticas detalhadas" },
        { name: "Resultados", path: "/resultados", description: "Arquivo de resultados" },
        { name: "FIBA LiveStats", path: "/resultados/fiba-livestats", description: "Estatísticas oficiais FIBA" }
      ]
    },
    {
      title: "Multimédia",
      dropdown: true,
      key: "multimedia",
      ariaLabel: "Menu de conteúdo multimédia",
      items: [
        { name: "Notícias", path: "/noticias", description: "Últimas notícias do basquetebol" },
        { name: "Galeria de Imagens", path: "/galeria", description: "Galeria fotográfica" },
        { name: "Vídeos", path: "/videos", description: "Vídeos e highlights" },
        { name: "Área de Imprensa", path: "/imprensa", description: "Recursos para jornalistas" },
        { name: "Transmissões", path: "/transmissoes", description: "Transmissões em direto" }
      ]
    }
  ];

  return (
    <header ref={headerRef} className="bg-white shadow-md relative z-50" role="banner">
      {/* Top utility bar */}
      <div className="bg-cv-blue text-white">
        <div className="cv-container">
          <div className="flex justify-between items-center py-2 text-sm">
            <div className="flex items-center space-x-4">
              <span aria-label="Ranking FIBA atual">FIBA Ranking: #52 (Masculino) | #78 (Feminino)</span>
            </div>
            <div className="flex items-center space-x-4">
              <button 
                className="flex items-center gap-1 hover:text-cv-yellow focus-visible-cv transition-colors"
                aria-label="Pesquisar no site"
                title="Pesquisar"
              >
                <Search size={14} aria-hidden="true" />
                Pesquisar
              </button>
              <Link 
                to="?lang=pt" 
                className="hover:text-cv-yellow focus-visible-cv transition-colors"
                aria-label="Alterar idioma para Português"
                title="Português"
              >
                PT
              </Link>
              <Link 
                to="?lang=en" 
                className="hover:text-cv-yellow focus-visible-cv transition-colors"
                aria-label="Change language to English"
                title="English"
              >
                EN
              </Link>
              <Link 
                to="/area-reservada" 
                className="flex items-center gap-1 hover:text-cv-yellow focus-visible-cv transition-colors"
                aria-label="Aceder à área reservada"
                title="Área Reservada"
              >
                <Lock size={14} aria-hidden="true" />
                Área Reservada
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="cv-container">
        {/* Main header with logo and primary navigation */}
        <div className="flex justify-between items-center py-4">
          <div className="flex items-center">
            <Link to="/" className="flex items-center focus-visible-cv" aria-label="Página inicial da FCBB">
              <img 
                src="/lovable-uploads/8c0e50b0-b06a-42cf-b3fc-9a08063308b3.png" 
                alt="Logótipo da Federação Cabo-verdiana de Basquetebol" 
                className="h-16 w-auto mr-3"
                width="64"
                height="64"
              />
              <div className="flex flex-col">
                <h1 className="text-xl font-bold text-cv-blue">FCBB</h1>
                <p className="text-sm text-cv-dark">Federação Cabo-verdiana de Basquetebol</p>
              </div>
            </Link>
          </div>
          
          <div className="hidden lg:flex items-center space-x-6">
            <Button 
              variant="outline" 
              size="sm" 
              className="border-cv-red text-cv-red hover:bg-cv-red hover:text-white focus-visible-cv transition-colors"
              asChild
            >
              <Link 
                to="/resultados/fiba-livestats"
                title="Aceder às estatísticas FIBA em tempo real"
                aria-label="FIBA LiveStats - Estatísticas em tempo real"
              >
                FIBA LiveStats
              </Link>
            </Button>
            <Button 
              size="sm" 
              className="bg-cv-red hover:bg-red-700 focus-visible-cv transition-colors" 
              asChild
            >
              <Link 
                to="/contacto"
                title="Página de contactos da FCBB"
                aria-label="Contactar a FCBB"
              >
                Contactos
              </Link>
            </Button>
          </div>
        </div>
        
        {/* Main navigation */}
        <nav className="hidden lg:block border-t border-gray-200" role="navigation" aria-label="Menu principal">
          <ul className="flex">
            <li>
              <Link 
                to="/" 
                className="block px-4 py-4 text-cv-dark hover:bg-cv-blue hover:text-white font-medium border-r border-gray-200 focus-visible-cv transition-colors"
                title="Página inicial da FCBB"
                aria-label="Ir para a página inicial"
              >
                Início
              </Link>
            </li>
            {navItems.map((item) => (
              <li key={item.title} className="relative group border-r border-gray-200">
                <div>
                  <button 
                    onClick={() => toggleDropdown(item.key || "")}
                    onKeyDown={(e) => handleKeyDown(e, item.key)}
                    className="flex items-center px-4 py-4 text-cv-dark hover:bg-cv-blue hover:text-white font-medium focus-visible-cv transition-colors"
                    aria-expanded={activeDropdown === item.key}
                    aria-haspopup="menu"
                    aria-label={item.ariaLabel}
                    title={`Abrir menu ${item.title}`}
                  >
                    {item.title} 
                    <ChevronDown 
                      className={`ml-1 w-4 h-4 transition-transform ${activeDropdown === item.key ? 'rotate-180' : ''}`} 
                      aria-hidden="true"
                    />
                  </button>
                  <div 
                    className={`absolute left-0 top-full w-64 bg-white shadow-xl border border-gray-200 z-50
                              ${activeDropdown === item.key ? 'block' : 'hidden'} group-hover:block`}
                    role="menu"
                    aria-label={`Submenu ${item.title}`}
                  >
                    <div className="py-2">
                      {item.items?.map((subItem) => (
                        <Link 
                          key={subItem.name} 
                          to={subItem.path}
                          className="block px-4 py-3 text-sm text-cv-dark hover:bg-cv-blue hover:text-white border-b border-gray-100 last:border-0 focus-visible-cv transition-colors"
                          onClick={() => setActiveDropdown(null)}
                          title={subItem.description}
                          aria-label={subItem.description}
                          role="menuitem"
                        >
                          {subItem.name}
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </nav>

        {/* Mobile menu button */}
        <div className="lg:hidden flex justify-end py-3">
          <button 
            onClick={toggleMobileMenu} 
            onKeyDown={(e) => handleKeyDown(e)}
            className="p-2 focus-visible-cv rounded-md"
            aria-expanded={mobileMenuOpen}
            aria-label={mobileMenuOpen ? "Fechar menu de navegação" : "Abrir menu de navegação"}
            title={mobileMenuOpen ? "Fechar menu" : "Abrir menu"}
          >
            {mobileMenuOpen ? <X aria-hidden="true" /> : <Menu aria-hidden="true" />}
          </button>
        </div>
      </div>

      {/* Mobile navigation */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-t" role="navigation" aria-label="Menu móvel">
          <div className="cv-container py-2">
            <ul>
              <li className="py-2">
                <Link 
                  to="/" 
                  className="block py-2 px-4 text-cv-dark font-medium focus-visible-cv transition-colors" 
                  onClick={() => setMobileMenuOpen(false)}
                  title="Página inicial da FCBB"
                  aria-label="Ir para a página inicial"
                >
                  Início
                </Link>
              </li>
              {navItems.map((item) => (
                <li key={item.title} className="py-2">
                  <div>
                    <button 
                      onClick={() => toggleDropdown(item.key || "")}
                      onKeyDown={(e) => handleKeyDown(e, item.key)}
                      className="w-full text-left flex justify-between items-center py-2 px-4 text-cv-dark font-medium focus-visible-cv transition-colors"
                      aria-expanded={activeDropdown === item.key}
                      aria-haspopup="menu"
                      aria-label={item.ariaLabel}
                      title={`${activeDropdown === item.key ? 'Fechar' : 'Abrir'} menu ${item.title}`}
                    >
                      {item.title}
                      <ChevronDown 
                        className={`w-4 h-4 transition-transform ${activeDropdown === item.key ? 'transform rotate-180' : ''}`} 
                        aria-hidden="true"
                      />
                    </button>
                    {activeDropdown === item.key && (
                      <div className="pl-4 bg-gray-50" role="menu" aria-label={`Submenu ${item.title}`}>
                        {item.items?.map((subItem) => (
                          <Link 
                            key={subItem.name} 
                            to={subItem.path}
                            className="block py-2 px-4 text-sm text-cv-dark focus-visible-cv transition-colors"
                            onClick={() => {
                              setActiveDropdown(null);
                              setMobileMenuOpen(false);
                            }}
                            title={subItem.description}
                            aria-label={subItem.description}
                            role="menuitem"
                          >
                            {subItem.name}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                </li>
              ))}
              <li className="pt-4 border-t mt-2 flex space-x-4 px-4">
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="border-cv-red text-cv-red hover:bg-cv-red hover:text-white focus-visible-cv transition-colors"
                  asChild
                >
                  <Link 
                    to="/resultados/fiba-livestats"
                    onClick={() => setMobileMenuOpen(false)}
                    title="Aceder às estatísticas FIBA em tempo real"
                    aria-label="FIBA LiveStats - Estatísticas em tempo real"
                  >
                    FIBA LiveStats
                  </Link>
                </Button>
                <Button 
                  size="sm" 
                  className="bg-cv-red hover:bg-red-700 focus-visible-cv transition-colors" 
                  asChild
                >
                  <Link 
                    to="/contacto" 
                    onClick={() => setMobileMenuOpen(false)}
                    title="Página de contactos da FCBB"
                    aria-label="Contactar a FCBB"
                  >
                    Contactos
                  </Link>
                </Button>
              </li>
            </ul>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
