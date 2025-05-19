
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Menu, X, ChevronDown } from 'lucide-react';

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

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
      items: ["História", "Orgãos Sociais", "Estatutos", "Contactos"]
    },
    {
      title: "Competições",
      dropdown: true,
      key: "competitions",
      items: ["Liga Nacional", "Taça de Cabo Verde", "Super Taça", "Competições Regionais"]
    },
    {
      title: "Seleções",
      dropdown: true,
      key: "teams",
      items: ["Seleção Masculina", "Seleção Feminina", "Seleções Jovens"]
    },
    {
      title: "Notícias",
      dropdown: false
    },
    {
      title: "Galeria",
      dropdown: false
    },
  ];

  return (
    <header className="bg-white shadow-md">
      <div className="cv-container">
        {/* Top bar with logo and secondary navigation */}
        <div className="flex justify-between items-center py-3">
          <div className="flex items-center">
            <a href="/" className="font-bold text-xl text-cv-blue">
              FCBB
            </a>
          </div>
          <div className="hidden md:flex items-center space-x-4">
            <a href="#" className="text-sm hover:text-cv-blue">Área Reservada</a>
            <a href="#" className="text-sm hover:text-cv-blue">PT</a>
            <a href="#" className="text-sm hover:text-cv-blue">EN</a>
            <Button size="sm" className="bg-cv-blue hover:bg-blue-700">Contacto</Button>
          </div>
        </div>
        
        {/* Main navigation */}
        <nav className="hidden md:block pb-3">
          <ul className="flex space-x-6">
            {navItems.map((item) => (
              <li key={item.title} className="relative">
                {item.dropdown ? (
                  <div className="group">
                    <button 
                      onClick={() => toggleDropdown(item.key || "")}
                      className="nav-link flex items-center"
                    >
                      {item.title} <ChevronDown className="ml-1 w-4 h-4" />
                    </button>
                    <div className={`absolute left-0 mt-2 w-56 bg-white shadow-lg rounded-md overflow-hidden transition-all duration-300 ${activeDropdown === item.key ? 'block' : 'hidden'}`}>
                      <div className="py-2">
                        {item.items?.map((subItem) => (
                          <a 
                            key={subItem} 
                            href="#" 
                            className="block px-4 py-2 text-sm text-cv-dark hover:bg-cv-blue hover:text-white"
                          >
                            {subItem}
                          </a>
                        ))}
                      </div>
                    </div>
                  </div>
                ) : (
                  <a href="#" className="nav-link">{item.title}</a>
                )}
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
                  {item.dropdown ? (
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
                            <a key={subItem} href="#" className="block py-2 px-4 text-sm">
                              {subItem}
                            </a>
                          ))}
                        </div>
                      )}
                    </div>
                  ) : (
                    <a href="#" className="nav-link-mobile">{item.title}</a>
                  )}
                </li>
              ))}
              <li className="pt-4 border-t mt-2">
                <a href="#" className="nav-link-mobile">Área Reservada</a>
              </li>
              <li className="pt-2 flex space-x-4 px-4">
                <a href="#" className="text-sm hover:text-cv-blue">PT</a>
                <a href="#" className="text-sm hover:text-cv-blue">EN</a>
              </li>
              <li className="py-2 px-4">
                <Button size="sm" className="w-full bg-cv-blue hover:bg-blue-700">Contacto</Button>
              </li>
            </ul>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
