
import React, { useState } from 'react';
import { Facebook, Instagram, Twitter, Youtube, Mail, Phone, MapPin, Send, ExternalLink } from "lucide-react";
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const EnhancedFooter = () => {
  const [email, setEmail] = useState('');

  const handleNewsletterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Implementar lógica de newsletter
    console.log('Newsletter subscription:', email);
    setEmail('');
  };

  return (
    <footer className="bg-gradient-to-br from-cv-dark to-gray-900 text-white relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Cpath d='M30 0c16.569 0 30 13.431 30 30s-13.431 30-30 30S0 46.569 0 30 13.431 0 30 0z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }} />
      </div>

      {/* Newsletter Section */}
      <div className="border-b border-white/10">
        <div className="cv-container py-12">
          <div className="max-w-4xl mx-auto text-center">
            <h3 className="text-2xl md:text-3xl font-bold mb-4 gradient-text">
              Mantenha-se Atualizado
            </h3>
            <p className="text-gray-300 mb-8 text-lg">
              Receba as últimas notícias do basquetebol cabo-verdiano diretamente no seu email
            </p>
            
            <form onSubmit={handleNewsletterSubmit} className="max-w-md mx-auto">
              <div className="flex gap-3">
                <Input
                  type="email"
                  placeholder="O seu email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="glass-card bg-white/10 border-white/20 text-white placeholder:text-gray-300 flex-1"
                  required
                />
                <Button 
                  type="submit" 
                  className="bg-cv-red hover:bg-red-600 px-6"
                >
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="cv-container py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* FCBB Info */}
          <div className="lg:col-span-1">
            <div className="flex items-center mb-6">
              <img 
                src="/lovable-uploads/8c0e50b0-b06a-42cf-b3fc-9a08063308b3.png" 
                alt="FCBB Logo" 
                className="h-14 w-auto mr-4"
              />
              <div>
                <h3 className="text-2xl font-bold gradient-text">FCBB</h3>
                <p className="text-sm text-gray-300">Fundada em 1986</p>
              </div>
            </div>
            
            <p className="text-gray-300 mb-6 leading-relaxed">
              A Federação Cabo-verdiana de Basquetebol promove e desenvolve o basquetebol 
              em todas as ilhas, unindo comunidades através do desporto.
            </p>

            {/* Social Media */}
            <div className="flex space-x-4">
              {[
                { icon: Facebook, href: "https://facebook.com/fcbb", label: "Facebook" },
                { icon: Instagram, href: "https://instagram.com/fcbb_oficial", label: "Instagram" },
                { icon: Twitter, href: "https://twitter.com/fcbb_oficial", label: "Twitter" },
                { icon: Youtube, href: "https://youtube.com/fcbb", label: "YouTube" }
              ].map(({ icon: Icon, href, label }) => (
                <a 
                  key={label}
                  href={href} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="glass-card p-3 text-white hover:text-cv-yellow transition-all duration-300 hover-glow rounded-full"
                  aria-label={label}
                >
                  <Icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>
          
          {/* Quick Links */}
          <div>
            <h4 className="text-xl font-bold mb-6 text-cv-yellow">Links Rápidos</h4>
            <ul className="space-y-3">
              {[
                { name: "História da FCBB", path: "/sobre/historia" },
                { name: "Direção", path: "/sobre/direcao" },
                { name: "Estatutos", path: "/sobre/estatutos" },
                { name: "Licenciamento", path: "/clubes" },
                { name: "Área de Imprensa", path: "/imprensa" },
                { name: "Área Reservada", path: "/area-reservada" }
              ].map(({ name, path }) => (
                <li key={name}>
                  <Link 
                    to={path} 
                    className="text-gray-300 hover:text-white hover:translate-x-1 transition-all duration-300 inline-block"
                  >
                    {name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          
          {/* Competition Links */}
          <div>
            <h4 className="text-xl font-bold mb-6 text-cv-yellow">Competições</h4>
            <ul className="space-y-3">
              {[
                { name: "Liga Nacional Masculina", path: "/competicoes/nacional-masculino" },
                { name: "Liga Nacional Feminina", path: "/competicoes/nacional-feminino" },
                { name: "Taça de Cabo Verde", path: "/competicoes/taca-cabo-verde" },
                { name: "Super Taça", path: "/competicoes/super-taca" },
                { name: "Seleção Nacional", path: "/selecoes/masculina" }
              ].map(({ name, path }) => (
                <li key={name}>
                  <Link 
                    to={path} 
                    className="text-gray-300 hover:text-white hover:translate-x-1 transition-all duration-300 inline-block"
                  >
                    {name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          
          {/* Contact Info */}
          <div>
            <h4 className="text-xl font-bold mb-6 text-cv-yellow">Contactos</h4>
            
            <div className="space-y-4 mb-8">
              <div className="flex items-start space-x-3">
                <MapPin className="w-5 h-5 text-cv-red mt-1 flex-shrink-0" />
                <div className="text-gray-300">
                  <p className="font-medium">Sede Nacional</p>
                  <p>Av. Cidade de Lisboa, CP 540</p>
                  <p>Praia, Ilha de Santiago</p>
                  <p>Cabo Verde</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-3">
                <Phone className="w-5 h-5 text-cv-red flex-shrink-0" />
                <span className="text-gray-300">(+238) 261 22 34</span>
              </div>
              
              <div className="flex items-center space-x-3">
                <Mail className="w-5 h-5 text-cv-red flex-shrink-0" />
                <span className="text-gray-300">geral@fcbb.cv</span>
              </div>
            </div>

            {/* Partners */}
            <div>
              <h5 className="font-semibold mb-3 text-cv-yellow">Parceiros Oficiais</h5>
              <div className="flex flex-wrap gap-3">
                {[
                  { name: "FIBA", url: "https://fiba.basketball" },
                  { name: "FIBA Africa", url: "https://fiba.basketball/africa" }
                ].map(({ name, url }) => (
                  <a 
                    key={name}
                    href={url} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="glass-card px-3 py-1 text-sm text-gray-300 hover:text-white transition-colors rounded-full"
                  >
                    {name}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Bottom Bar */}
      <div className="border-t border-white/10 bg-black/20">
        <div className="cv-container py-6">
          <div className="flex flex-col md:flex-row justify-between items-center text-sm text-gray-400">
            <div className="mb-4 md:mb-0">
              <p>© {new Date().getFullYear()} Federação Cabo-verdiana de Basquetebol. Todos os direitos reservados.</p>
            </div>
            
            <div className="flex items-center space-x-6">
              <Link to="/politica-privacidade" className="hover:text-white transition-colors">
                Política de Privacidade
              </Link>
              <span className="text-gray-600">|</span>
              <Link to="/termos-uso" className="hover:text-white transition-colors">
                Termos de Uso
              </Link>
              <span className="text-gray-600">|</span>
              <a 
                href="https://fiba.basketball" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="hover:text-white transition-colors flex items-center"
              >
                FIBA <ExternalLink className="ml-1 h-3 w-3" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default EnhancedFooter;
