
import { Facebook, Instagram, Twitter, Youtube, Mail, Phone, MapPin } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-cv-dark text-white">
      <div className="cv-container py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4">FCBB</h3>
            <p className="text-gray-300 mb-4">
              Federação Cabo-verdiana de Basquetebol, promovendo o desenvolvimento do basquetebol em Cabo Verde.
            </p>
            <div className="flex space-x-3">
              <a href="#" className="text-white hover:text-cv-red transition-colors">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="text-white hover:text-cv-red transition-colors">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="text-white hover:text-cv-red transition-colors">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="text-white hover:text-cv-red transition-colors">
                <Youtube className="w-5 h-5" />
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="text-xl font-bold mb-4">Links Rápidos</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors">A Federação</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Competições</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Seleções</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Notícias</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Galeria</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-xl font-bold mb-4">Competições</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Liga Nacional</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Taça de Cabo Verde</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors">SuperTaça</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Campeonatos Regionais</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Campeonatos Jovens</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-xl font-bold mb-4">Contactos</h3>
            <ul className="space-y-3">
              <li className="flex items-start">
                <MapPin className="w-5 h-5 mr-2 flex-shrink-0 text-cv-red" />
                <span className="text-gray-300">Av. 5 de Julho, Praia, Ilha de Santiago, Cabo Verde</span>
              </li>
              <li className="flex items-center">
                <Phone className="w-5 h-5 mr-2 flex-shrink-0 text-cv-red" />
                <span className="text-gray-300">(+238) 123-4567</span>
              </li>
              <li className="flex items-center">
                <Mail className="w-5 h-5 mr-2 flex-shrink-0 text-cv-red" />
                <span className="text-gray-300">info@fcbb.cv</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
      
      <div className="bg-black py-4">
        <div className="cv-container">
          <div className="flex flex-col md:flex-row justify-between items-center text-sm text-gray-400">
            <p>© {new Date().getFullYear()} Federação Cabo-verdiana de Basquetebol. Todos os direitos reservados.</p>
            <div className="mt-2 md:mt-0">
              <a href="#" className="hover:text-white transition-colors">Política de Privacidade</a>
              <span className="mx-2">|</span>
              <a href="#" className="hover:text-white transition-colors">Termos de Uso</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
