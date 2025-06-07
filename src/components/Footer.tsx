
import { Facebook, Instagram, Twitter, Youtube, Mail, Phone, MapPin, ExternalLink } from "lucide-react";
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-cv-dark text-white">
      {/* Main footer content */}
      <div className="cv-container py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* FCBB Info */}
          <div className="lg:col-span-1">
            <div className="flex items-center mb-4">
              <img 
                src="/lovable-uploads/8c0e50b0-b06a-42cf-b3fc-9a08063308b3.png" 
                alt="FCBB Logo" 
                className="h-12 w-auto mr-3"
              />
              <div>
                <h3 className="text-lg font-bold">FCBB</h3>
                <p className="text-sm text-gray-300">Est. 1986</p>
              </div>
            </div>
            <p className="text-gray-300 mb-4 text-sm">
              A Federação Cabo-verdiana de Basquetebol é o órgão máximo que rege o basquetebol em Cabo Verde, promovendo o desenvolvimento da modalidade em todas as ilhas.
            </p>
            <div className="flex space-x-3">
              <a href="https://facebook.com/fcbb" target="_blank" rel="noopener noreferrer" className="text-white hover:text-cv-blue transition-colors">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="https://instagram.com/fcbb_oficial" target="_blank" rel="noopener noreferrer" className="text-white hover:text-cv-blue transition-colors">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="https://twitter.com/fcbb_oficial" target="_blank" rel="noopener noreferrer" className="text-white hover:text-cv-blue transition-colors">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="https://youtube.com/fcbb" target="_blank" rel="noopener noreferrer" className="text-white hover:text-cv-blue transition-colors">
                <Youtube className="w-5 h-5" />
              </a>
            </div>
          </div>
          
          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-bold mb-4 text-cv-yellow">Links Rápidos</h3>
            <ul className="space-y-2 text-sm">
              <li><Link to="/sobre/historia" className="text-gray-300 hover:text-white transition-colors">História da FCBB</Link></li>
              <li><Link to="/sobre/direcao" className="text-gray-300 hover:text-white transition-colors">Direção</Link></li>
              <li><Link to="/sobre/estatutos" className="text-gray-300 hover:text-white transition-colors">Estatutos</Link></li>
              <li><Link to="/clubes/licenciamento" className="text-gray-300 hover:text-white transition-colors">Licenciamento</Link></li>
              <li><Link to="/imprensa" className="text-gray-300 hover:text-white transition-colors">Área de Imprensa</Link></li>
              <li><Link to="/area-reservada" className="text-gray-300 hover:text-white transition-colors">Área Reservada</Link></li>
            </ul>
          </div>
          
          {/* Competitions */}
          <div>
            <h3 className="text-lg font-bold mb-4 text-cv-yellow">Competições</h3>
            <ul className="space-y-2 text-sm">
              <li><Link to="/competicoes/nacional-masculino" className="text-gray-300 hover:text-white transition-colors">Liga Nacional Masculina</Link></li>
              <li><Link to="/competicoes/nacional-feminino" className="text-gray-300 hover:text-white transition-colors">Liga Nacional Feminina</Link></li>
              <li><Link to="/competicoes/taca-cabo-verde" className="text-gray-300 hover:text-white transition-colors">Taça de Cabo Verde</Link></li>
              <li><Link to="/competicoes/super-taca" className="text-gray-300 hover:text-white transition-colors">Super Taça</Link></li>
              <li><Link to="/competicoes/regionais" className="text-gray-300 hover:text-white transition-colors">Campeonatos Regionais</Link></li>
              <li><Link to="/selecoes/senior-masculina" className="text-gray-300 hover:text-white transition-colors">Seleção Nacional</Link></li>
            </ul>
          </div>
          
          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-bold mb-4 text-cv-yellow">Contactos</h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start">
                <MapPin className="w-4 h-4 mr-2 flex-shrink-0 text-cv-red mt-0.5" />
                <span className="text-gray-300">
                  Av. Cidade de Lisboa, CP 540<br />
                  Praia, Ilha de Santiago<br />
                  Cabo Verde
                </span>
              </li>
              <li className="flex items-center">
                <Phone className="w-4 h-4 mr-2 flex-shrink-0 text-cv-red" />
                <span className="text-gray-300">(+238) 261 22 34</span>
              </li>
              <li className="flex items-center">
                <Mail className="w-4 h-4 mr-2 flex-shrink-0 text-cv-red" />
                <span className="text-gray-300">geral@fcbb.cv</span>
              </li>
            </ul>

            {/* Partners */}
            <div className="mt-6">
              <h4 className="font-semibold mb-3 text-cv-yellow">Parceiros</h4>
              <div className="flex space-x-3">
                <a href="https://fiba.basketball" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-white transition-colors">
                  <span className="text-xs">FIBA</span>
                </a>
                <a href="https://fibaeurope.com" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-white transition-colors">
                  <span className="text-xs">FIBA Africa</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Bottom bar */}
      <div className="bg-black py-4">
        <div className="cv-container">
          <div className="flex flex-col md:flex-row justify-between items-center text-sm text-gray-400">
            <div className="flex items-center space-x-4">
              <p>© {new Date().getFullYear()} Federação Cabo-verdiana de Basquetebol. Todos os direitos reservados.</p>
            </div>
            <div className="mt-2 md:mt-0 flex items-center space-x-4">
              <Link to="/politica-privacidade" className="hover:text-white transition-colors">Política de Privacidade</Link>
              <span>|</span>
              <Link to="/termos-uso" className="hover:text-white transition-colors">Termos de Uso</Link>
              <span>|</span>
              <a href="https://fiba.basketball" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors flex items-center">
                FIBA <ExternalLink className="ml-1 h-3 w-3" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
