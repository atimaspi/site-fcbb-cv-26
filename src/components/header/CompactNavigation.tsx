
import { useState } from 'react';
import { ChevronDown, Menu, X } from 'lucide-react';
import { Link } from 'react-router-dom';

const navItems = [
  { title: 'Início', path: '/' },
  { 
    title: 'Sobre a FCBB', 
    items: [
      { name: 'Missão e Visão', path: '/sobre/missao-visao' },
      { name: 'História', path: '/sobre/historia' },
      { name: 'Direção', path: '/sobre/direcao' },
      { name: 'Órgãos Sociais', path: '/sobre/orgaos-sociais' },
      { name: 'Estatutos', path: '/sobre/estatutos' },
      { name: 'Contactos', path: '/sobre/contactos' }
    ]
  },
  { 
    title: 'Competições', 
    items: [
      { name: 'Nacional Masculino', path: '/competicoes/nacional-masculino' },
      { name: 'Liga Nacional', path: '/competicoes/liga-nacional' },
      { name: 'Taça de Cabo Verde', path: '/competicoes/taca-cabo-verde' },
      { name: 'Super Taça', path: '/competicoes/super-taca' },
      { name: 'Competições Regionais', path: '/competicoes/competicoes-regionais' },
      { name: 'Classificações', path: '/competicoes/classificacoes' },
      { name: 'Calendário', path: '/competicoes/calendario' }
    ]
  },
  { 
    title: 'Seleções Nacionais', 
    items: [
      { name: 'Sénior Masculina', path: '/selecoes/senior-masculina' },
      { name: 'Sénior Feminina', path: '/selecoes/senior-feminina' },
      { name: 'Sub-18 Masculina', path: '/selecoes/sub-18-masculina' },
      { name: 'Sub-18 Feminina', path: '/selecoes/sub-18-feminina' },
      { name: 'Sub-16 Masculina', path: '/selecoes/sub-16-masculina' },
      { name: 'Sub-16 Feminina', path: '/selecoes/sub-16-feminina' }
    ]
  },
  { 
    title: 'Clubes', 
    items: [
      { name: 'Direção de Clubes', path: '/clubes' },
      { name: 'Transferências', path: '/transferencias' },
      { name: 'Formação', path: '/formacao' },
      { name: 'Arbitragem', path: '/arbitragem' }
    ]
  },
  { 
    title: 'Resultados & Estatísticas', 
    items: [
      { name: 'Resultados ao Vivo', path: '/resultados/ao-vivo' },
      { name: 'Estatísticas', path: '/estatisticas' },
      { name: 'Resultados', path: '/resultados' },
      { name: 'FIBA LiveStats', path: '/resultados/fiba-livestats' }
    ]
  },
  { 
    title: 'Multimédia', 
    items: [
      { name: 'Notícias', path: '/noticias' },
      { name: 'Galeria de Imagens', path: '/galeria' },
      { name: 'Vídeos', path: '/videos' },
      { name: 'Área de Imprensa', path: '/imprensa' },
      { name: 'Transmissões', path: '/transmissoes' }
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
            <li key={item.title} className="relative group">
              {item.path ? (
                <Link 
                  to={item.path}
                  className="block px-6 py-3 text-sm text-cv-dark hover:text-cv-blue font-medium transition-colors"
                >
                  {item.title}
                </Link>
              ) : (
                <div className="relative">
                  <button 
                    className="flex items-center px-6 py-3 text-sm text-cv-dark hover:text-cv-blue font-medium transition-colors"
                    onMouseEnter={() => setActiveDropdown(item.title)}
                    onMouseLeave={() => setActiveDropdown(null)}
                  >
                    {item.title}
                    <ChevronDown className="ml-1 w-4 h-4" />
                  </button>
                  {activeDropdown === item.title && (
                    <div 
                      className="absolute left-0 top-full w-64 bg-white shadow-xl border border-gray-200 z-50 rounded-md"
                      onMouseEnter={() => setActiveDropdown(item.title)}
                      onMouseLeave={() => setActiveDropdown(null)}
                    >
                      <div className="py-2">
                        {item.items?.map((subItem) => (
                          <Link 
                            key={subItem.name}
                            to={subItem.path}
                            className="block px-4 py-2.5 text-sm text-cv-dark hover:bg-cv-blue hover:text-white transition-colors"
                          >
                            {subItem.name}
                          </Link>
                        ))}
                      </div>
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
          {mobileOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="lg:hidden bg-white border-t shadow-lg">
          <div className="py-2">
            {navItems.map((item) => (
              <div key={item.title}>
                {item.path ? (
                  <Link 
                    to={item.path}
                    className="block py-3 px-4 text-cv-dark hover:bg-gray-50"
                    onClick={() => setMobileOpen(false)}
                  >
                    {item.title}
                  </Link>
                ) : (
                  <div>
                    <button 
                      className="w-full text-left py-3 px-4 text-cv-dark font-medium hover:bg-gray-50"
                      onClick={() => setActiveDropdown(activeDropdown === item.title ? null : item.title)}
                    >
                      <span className="flex items-center justify-between">
                        {item.title}
                        <ChevronDown className={`w-4 h-4 transition-transform ${activeDropdown === item.title ? 'rotate-180' : ''}`} />
                      </span>
                    </button>
                    {activeDropdown === item.title && (
                      <div className="bg-gray-50">
                        {item.items?.map((subItem) => (
                          <Link 
                            key={subItem.name}
                            to={subItem.path}
                            className="block py-2 px-8 text-sm text-cv-dark hover:bg-gray-100"
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
