
import { useState } from 'react';
import { ChevronDown, Menu, X } from 'lucide-react';
import { Link } from 'react-router-dom';

const navItems = [
  { title: 'Início', path: '/' },
  { 
    title: 'Sobre', 
    items: [
      { name: 'História', path: '/sobre/historia' },
      { name: 'Direção', path: '/sobre/direcao' },
      { name: 'Contactos', path: '/sobre/contactos' }
    ]
  },
  { 
    title: 'Competições', 
    items: [
      { name: 'Nacional Masculino', path: '/competicoes/nacional-masculino' },
      { name: 'Liga Nacional', path: '/competicoes/liga-nacional' },
      { name: 'Classificações', path: '/competicoes/classificacoes' }
    ]
  },
  { 
    title: 'Seleções', 
    items: [
      { name: 'Sénior Masculina', path: '/selecoes/senior-masculina' },
      { name: 'Sénior Feminina', path: '/selecoes/senior-feminina' }
    ]
  },
  { 
    title: 'Multimédia', 
    items: [
      { name: 'Notícias', path: '/noticias' },
      { name: 'Galeria', path: '/galeria' },
      { name: 'Vídeos', path: '/videos' }
    ]
  }
];

const CompactNavigation = () => {
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className="cv-container">
      {/* Desktop Navigation */}
      <nav className="hidden lg:block border-t border-gray-200">
        <ul className="flex">
          {navItems.map((item) => (
            <li key={item.title} className="relative group border-r border-gray-200 last:border-r-0">
              {item.path ? (
                <Link 
                  to={item.path}
                  className="block px-3 py-2 text-sm text-cv-dark hover:bg-cv-blue hover:text-white"
                >
                  {item.title}
                </Link>
              ) : (
                <div>
                  <button 
                    className="flex items-center px-3 py-2 text-sm text-cv-dark hover:bg-cv-blue hover:text-white w-full"
                    onMouseEnter={() => setActiveDropdown(item.title)}
                    onMouseLeave={() => setActiveDropdown(null)}
                  >
                    {item.title}
                    <ChevronDown className="ml-1 w-3 h-3" />
                  </button>
                  {activeDropdown === item.title && (
                    <div 
                      className="absolute left-0 top-full w-48 bg-white shadow-lg border border-gray-200 z-50"
                      onMouseEnter={() => setActiveDropdown(item.title)}
                      onMouseLeave={() => setActiveDropdown(null)}
                    >
                      {item.items?.map((subItem) => (
                        <Link 
                          key={subItem.name}
                          to={subItem.path}
                          className="block px-3 py-2 text-sm text-cv-dark hover:bg-cv-blue hover:text-white border-b border-gray-100 last:border-0"
                        >
                          {subItem.name}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </li>
          ))}
        </ul>
      </nav>

      {/* Mobile Menu Button */}
      <div className="lg:hidden flex justify-end py-2">
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="p-2"
          aria-label="Menu"
        >
          {mobileOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="lg:hidden bg-white border-t">
          <div className="py-2">
            {navItems.map((item) => (
              <div key={item.title}>
                {item.path ? (
                  <Link 
                    to={item.path}
                    className="block py-2 px-4 text-cv-dark"
                    onClick={() => setMobileOpen(false)}
                  >
                    {item.title}
                  </Link>
                ) : (
                  <div>
                    <button 
                      className="w-full text-left py-2 px-4 text-cv-dark font-medium"
                      onClick={() => setActiveDropdown(activeDropdown === item.title ? null : item.title)}
                    >
                      {item.title}
                    </button>
                    {activeDropdown === item.title && (
                      <div className="bg-gray-50">
                        {item.items?.map((subItem) => (
                          <Link 
                            key={subItem.name}
                            to={subItem.path}
                            className="block py-2 px-8 text-sm text-cv-dark"
                            onClick={() => setMobileOpen(false)}
                          >
                            {subItem.name}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default CompactNavigation;
