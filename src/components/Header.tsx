
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Menu, X, ChevronDown, Lock, LogIn, User } from 'lucide-react';
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
      title: "A Federação",
      dropdown: true,
      key: "federation",
      items: [
        { name: "História", path: "/federacao/historia" },
        { name: "Orgãos Sociais", path: "/federacao/orgaos-sociais" },
        { name: "Estatutos", path: "/federacao/estatutos" },
        { name: "Contactos", path: "/federacao/contactos" }
      ]
    },
    {
      title: "Competições",
      dropdown: true,
      key: "competitions",
      items: [
        { name: "Liga Nacional", path: "/competicoes/liga-nacional" },
        { name: "Taça de Cabo Verde", path: "/competicoes/taca-de-cabo-verde" },
        { name: "Super Taça", path: "/competicoes/super-taca" },
        { name: "Competições Regionais", path: "/competicoes/competicoes-regionais" },
        { name: "Classificações", path: "/competicoes/classificacoes" },
        { name: "Resultados e Calendário", path: "/competicoes/resultados" }
      ]
    },
    {
      title: "Seleções",
      dropdown: true,
      key: "teams",
      items: [
        { name: "Seleção Masculina", path: "/selecoes/masculina" },
        { name: "Seleção Feminina", path: "/selecoes/feminina" },
        { name: "Seleções Jovens", path: "/selecoes/jovens" }
      ]
    },
    {
      title: "Basquetebol",
      dropdown: true,
      key: "basketball",
      items: [
        { name: "Estatísticas", path: "/estatisticas" },
        { name: "Arbitragem", path: "/arbitragem" },
        { name: "Clubes e Atletas", path: "/clubes" },
        { name: "Formação", path: "/formacao" }
      ]
    },
    {
      title: "Multimédia",
      dropdown: true,
      key: "multimedia",
      items: [
        { name: "Notícias", path: "/noticias" },
        { name: "Galeria", path: "/galeria" },
        { name: "Transmissões", path: "/transmissoes" },
        { name: "Eventos", path: "/eventos" }
      ]
    }
  ];

  return (
    <header className="bg-white shadow-md relative z-50">
      <div className="cv-container">
        {/* Top bar with logo and secondary navigation */}
        <div className="flex justify-between items-center py-3">
          <div className="flex items-center">
            <Link to="/" className="font-bold text-xl text-cv-blue">
              FCBB
            </Link>
          </div>
          <div className="hidden md:flex items-center space-x-4">
            <Link to="/area-reservada" className="text-sm hover:text-cv-blue flex items-center gap-1">
              <Lock size={16} />
              Área Reservada
            </Link>
            <Link to="?lang=pt" className="text-sm hover:text-cv-blue">PT</Link>
            <Link to="?lang=en" className="text-sm hover:text-cv-blue">EN</Link>
            <Button size="sm" className="bg-cv-blue hover:bg-blue-700" asChild>
              <Link to="/contacto">Contacto</Link>
            </Button>
          </div>
        </div>
        
        {/* Main navigation */}
        <nav className="hidden md:block pb-3">
          <ul className="flex space-x-6">
            {navItems.map((item) => (
              <li key={item.title} className="relative group">
                <div>
                  <button 
                    onClick={() => toggleDropdown(item.key || "")}
                    className="nav-link flex items-center"
                  >
                    {item.title} <ChevronDown className="ml-1 w-4 h-4" />
                  </button>
                  <div 
                    className={`absolute left-0 mt-2 w-56 bg-white shadow-lg rounded-md overflow-hidden z-50 border
                              ${activeDropdown === item.key ? 'block' : 'hidden'} group-hover:block`}
                  >
                    <div className="py-2">
                      {item.items?.map((subItem) => (
                        <Link 
                          key={subItem.name} 
                          to={subItem.path}
                          className="block px-4 py-2 text-sm text-cv-dark hover:bg-cv-blue hover:text-white"
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
        <div className="md:hidden flex justify-end py-3">
          <button onClick={toggleMobileMenu} className="p-2">
            {mobileMenuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </div>

      {/* Mobile navigation */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-t">
          <div className="cv-container py-2">
            <ul>
              {navItems.map((item) => (
                <li key={item.title} className="py-2">
                  <div>
                    <button 
                      onClick={() => toggleDropdown(item.key || "")}
                      className="w-full text-left flex justify-between items-center nav-link-mobile"
                    >
                      {item.title}
                      <ChevronDown className={`w-4 h-4 transition-transform ${activeDropdown === item.key ? 'transform rotate-180' : ''}`} />
                    </button>
                    {activeDropdown === item.key && (
                      <div className="pl-4">
                        {item.items?.map((subItem) => (
                          <Link 
                            key={subItem.name} 
                            to={subItem.path}
                            className="block py-2 px-4 text-sm"
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
              <li className="pt-4 border-t mt-2">
                <Link to="/area-reservada" className="nav-link-mobile flex items-center gap-1" onClick={() => setMobileMenuOpen(false)}>
                  <Lock size={16} />
                  Área Reservada
                </Link>
              </li>
              <li className="pt-2 flex space-x-4 px-4">
                <Link to="?lang=pt" className="text-sm hover:text-cv-blue">PT</Link>
                <Link to="?lang=en" className="text-sm hover:text-cv-blue">EN</Link>
              </li>
              <li className="py-2 px-4">
                <Button size="sm" className="w-full bg-cv-blue hover:bg-blue-700" asChild>
                  <Link to="/contacto" onClick={() => setMobileMenuOpen(false)}>Contacto</Link>
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
