
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Menu, X, ChevronDown, Lock, Globe, Search } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const location = useLocation();

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

  const navItems = [
    {
      title: "Sobre a FCBB",
      dropdown: true,
      key: "about",
      items: [
        { name: "Missão e Visão", path: "/sobre/missao-visao" },
        { name: "História", path: "/sobre/historia" },
        { name: "Direção", path: "/sobre/direcao" },
        { name: "Órgãos Sociais", path: "/sobre/orgaos-sociais" },
        { name: "Estatutos", path: "/sobre/estatutos" },
        { name: "Contactos", path: "/sobre/contactos" }
      ]
    },
    {
      title: "Competições",
      dropdown: true,
      key: "competitions",
      items: [
        { name: "Nacional Masculino", path: "/competicoes/nacional-masculino" },
        { name: "Nacional Feminino", path: "/competicoes/nacional-feminino" },
        { name: "Taça de Cabo Verde", path: "/competicoes/taca-cabo-verde" },
        { name: "Super Taça", path: "/competicoes/super-taca" },
        { name: "Campeonatos Regionais", path: "/competicoes/regionais" },
        { name: "Classificações", path: "/competicoes/classificacoes" },
        { name: "Calendário", path: "/competicoes/calendario" }
      ]
    },
    {
      title: "Seleções Nacionais",
      dropdown: true,
      key: "teams",
      items: [
        { name: "Sénior Masculina", path: "/selecoes/senior-masculina" },
        { name: "Sénior Feminina", path: "/selecoes/senior-feminina" },
        { name: "Sub-18 Masculina", path: "/selecoes/sub18-masculina" },
        { name: "Sub-18 Feminina", path: "/selecoes/sub18-feminina" },
        { name: "Sub-16 Masculina", path: "/selecoes/sub16-masculina" },
        { name: "Sub-16 Feminina", path: "/selecoes/sub16-feminina" }
      ]
    },
    {
      title: "Clubes",
      dropdown: true,
      key: "clubs",
      items: [
        { name: "Direção de Clubes", path: "/clubes" },
        { name: "Licenciamento", path: "/clubes/licenciamento" },
        { name: "Regulamentos", path: "/clubes/regulamentos" },
        { name: "Transferências", path: "/clubes/transferencias" }
      ]
    },
    {
      title: "Resultados & Estatísticas",
      dropdown: true,
      key: "results",
      items: [
        { name: "Resultados ao Vivo", path: "/resultados/ao-vivo" },
        { name: "Estatísticas", path: "/resultados/estatisticas" },
        { name: "Arquivo", path: "/resultados/arquivo" },
        { name: "FIBA LiveStats", path: "/resultados/fiba-livestats" }
      ]
    },
    {
      title: "Multimédia",
      dropdown: true,
      key: "multimedia",
      items: [
        { name: "Notícias", path: "/noticias" },
        { name: "Galeria de Imagens", path: "/galeria" },
        { name: "Vídeos", path: "/videos" },
        { name: "Área de Imprensa", path: "/imprensa" },
        { name: "Transmissões", path: "/transmissoes" }
      ]
    }
  ];

  return (
    <header className="bg-white shadow-md relative z-50">
      {/* Top utility bar */}
      <div className="bg-cv-blue text-white">
        <div className="cv-container">
          <div className="flex justify-between items-center py-2 text-sm">
            <div className="flex items-center space-x-4">
              <span>FIBA Ranking: #52 (Masculino) | #78 (Feminino)</span>
            </div>
            <div className="flex items-center space-x-4">
              <button className="flex items-center gap-1 hover:text-cv-yellow">
                <Search size={14} />
                Pesquisar
              </button>
              <Link to="?lang=pt" className="hover:text-cv-yellow">PT</Link>
              <Link to="?lang=en" className="hover:text-cv-yellow">EN</Link>
              <Link to="/area-reservada" className="flex items-center gap-1 hover:text-cv-yellow">
                <Lock size={14} />
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
            <Link to="/" className="flex items-center">
              <img 
                src="/lovable-uploads/8c0e50b0-b06a-42cf-b3fc-9a08063308b3.png" 
                alt="FCBB Logo" 
                className="h-16 w-auto mr-3"
              />
              <div className="flex flex-col">
                <h1 className="text-xl font-bold text-cv-blue">FCBB</h1>
                <p className="text-sm text-cv-dark">Federação Cabo-verdiana de Basquetebol</p>
              </div>
            </Link>
          </div>
          
          <div className="hidden lg:flex items-center space-x-6">
            <Button variant="outline" size="sm" className="border-cv-red text-cv-red hover:bg-cv-red hover:text-white">
              FIBA LiveStats
            </Button>
            <Button size="sm" className="bg-cv-red hover:bg-red-700" asChild>
              <Link to="/contacto">Contactos</Link>
            </Button>
          </div>
        </div>
        
        {/* Main navigation */}
        <nav className="hidden lg:block border-t border-gray-200">
          <ul className="flex">
            <li>
              <Link to="/" className="block px-4 py-4 text-cv-dark hover:bg-cv-blue hover:text-white font-medium border-r border-gray-200">
                Início
              </Link>
            </li>
            {navItems.map((item) => (
              <li key={item.title} className="relative group border-r border-gray-200">
                <div>
                  <button 
                    onClick={() => toggleDropdown(item.key || "")}
                    className="flex items-center px-4 py-4 text-cv-dark hover:bg-cv-blue hover:text-white font-medium"
                  >
                    {item.title} <ChevronDown className="ml-1 w-4 h-4" />
                  </button>
                  <div 
                    className={`absolute left-0 top-full w-64 bg-white shadow-xl border border-gray-200 z-50
                              ${activeDropdown === item.key ? 'block' : 'hidden'} group-hover:block`}
                  >
                    <div className="py-2">
                      {item.items?.map((subItem) => (
                        <Link 
                          key={subItem.name} 
                          to={subItem.path}
                          className="block px-4 py-3 text-sm text-cv-dark hover:bg-cv-blue hover:text-white border-b border-gray-100 last:border-0"
                          onClick={() => setActiveDropdown(null)}
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
          <button onClick={toggleMobileMenu} className="p-2">
            {mobileMenuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </div>

      {/* Mobile navigation */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-t">
          <div className="cv-container py-2">
            <ul>
              <li className="py-2">
                <Link to="/" className="block py-2 px-4 text-cv-dark font-medium" onClick={() => setMobileMenuOpen(false)}>
                  Início
                </Link>
              </li>
              {navItems.map((item) => (
                <li key={item.title} className="py-2">
                  <div>
                    <button 
                      onClick={() => toggleDropdown(item.key || "")}
                      className="w-full text-left flex justify-between items-center py-2 px-4 text-cv-dark font-medium"
                    >
                      {item.title}
                      <ChevronDown className={`w-4 h-4 transition-transform ${activeDropdown === item.key ? 'transform rotate-180' : ''}`} />
                    </button>
                    {activeDropdown === item.key && (
                      <div className="pl-4 bg-gray-50">
                        {item.items?.map((subItem) => (
                          <Link 
                            key={subItem.name} 
                            to={subItem.path}
                            className="block py-2 px-4 text-sm text-cv-dark"
                            onClick={() => {
                              setActiveDropdown(null);
                              setMobileMenuOpen(false);
                            }}
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
                <Button variant="outline" size="sm" className="border-cv-red text-cv-red">
                  FIBA LiveStats
                </Button>
                <Button size="sm" className="bg-cv-red" asChild>
                  <Link to="/contacto" onClick={() => setMobileMenuOpen(false)}>Contactos</Link>
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
