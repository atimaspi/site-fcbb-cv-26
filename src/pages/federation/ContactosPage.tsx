
import PageLayout from '../PageLayout';

const ContactosPage = () => {
  return (
    <PageLayout title="Contactos">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-bold text-cv-blue mb-4">Informações de Contacto</h2>
          
          <div className="space-y-4">
            <div>
              <h3 className="font-semibold">Morada</h3>
              <p className="text-gray-700">
                Federação Cabo-verdiana de Basquetebol<br />
                Rua Cidade de Lisboa, 20<br />
                Plateô<br />
                Praia, Cabo Verde
              </p>
            </div>
            
            <div>
              <h3 className="font-semibold">Telefone</h3>
              <p className="text-gray-700">(+238) 260 XX XX</p>
            </div>
            
            <div>
              <h3 className="font-semibold">Email</h3>
              <p className="text-gray-700">info@fcbb.cv</p>
            </div>
            
            <div>
              <h3 className="font-semibold">Horário de Funcionamento</h3>
              <p className="text-gray-700">
                Segunda a Sexta: 9h00 - 17h00<br />
                Sábado e Domingo: Fechado
              </p>
            </div>
            
            <div className="mt-6">
              <h3 className="font-semibold">Redes Sociais</h3>
              <div className="flex space-x-4 mt-2">
                <a href="#" className="text-cv-blue hover:text-blue-700">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" />
                  </svg>
                </a>
                <a href="#" className="text-cv-blue hover:text-blue-700">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 2C6.475 2 2 6.475 2 12s4.475 10 10 10 10-4.475 10-10S17.525 2 12 2zm4.11 8.29A4.201 4.201 0 0 1 13.03 13a4.2 4.2 0 0 1-.82.35v3.18h-1.99v-3.18a4.201 4.201 0 0 1-.82-.35 4.206 4.206 0 0 1-1.48-1.71 4.203 4.203 0 1 1 8.18-.05zm-4.11-3.65C10.26 6.64 8.83 8.07 8.83 9.8c0 1.73 1.43 3.16 3.16 3.16 1.73 0 3.16-1.43 3.16-3.16.01-1.73-1.42-3.16-3.16-3.16z" />
                  </svg>
                </a>
                <a href="#" className="text-cv-blue hover:text-blue-700">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path d="M20.947 8.305a6.53 6.53 0 0 0-.419-2.216 4.61 4.61 0 0 0-2.633-2.633 6.606 6.606 0 0 0-2.186-.42C14.3 2.999 13.933 3 12 3c-1.933 0-2.301.001-3.709.036a6.606 6.606 0 0 0-2.185.42 4.607 4.607 0 0 0-2.633 2.633 6.554 6.554 0 0 0-.419 2.185C2.999 9.729 3 10.097 3 12s-.001 2.271.035 3.678a6.606 6.606 0 0 0 .419 2.186 4.607 4.607 0 0 0 2.634 2.632 6.554 6.554 0 0 0 2.185.45c1.409.034 1.776.035 3.709.035 1.934 0 2.301-.001 3.71-.035a6.606 6.606 0 0 0 2.186-.42 4.607 4.607 0 0 0 2.633-2.632c.263-.7.404-1.438.419-2.187.034-1.407.035-1.774.035-3.707s-.001-2.3-.035-3.709zm-8.947 8.034a4.34 4.34 0 0 1-4.339-4.338 4.34 4.34 0 0 1 4.339-4.338 4.34 4.34 0 0 1 4.338 4.338 4.34 4.34 0 0 1-4.338 4.338zm4.51-7.834a1.014 1.014 0 0 1-1.014-1.013c0-.56.454-1.013 1.013-1.013.56 0 1.014.453 1.014 1.013 0 .56-.454 1.013-1.014 1.013z" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-bold text-cv-blue mb-4">Envie-nos uma Mensagem</h2>
          
          <form className="space-y-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Nome</label>
              <input 
                type="text" 
                id="name" 
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-cv-blue"
                required
              />
            </div>
            
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email</label>
              <input 
                type="email" 
                id="email" 
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-cv-blue"
                required
              />
            </div>
            
            <div>
              <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">Assunto</label>
              <input 
                type="text" 
                id="subject" 
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-cv-blue"
                required
              />
            </div>
            
            <div>
              <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">Mensagem</label>
              <textarea 
                id="message" 
                rows={5}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-cv-blue"
                required
              ></textarea>
            </div>
            
            <div>
              <button 
                type="submit" 
                className="bg-cv-blue hover:bg-blue-700 text-white font-bold py-2 px-6 rounded"
              >
                Enviar Mensagem
              </button>
            </div>
          </form>
        </div>
      </div>
      
      <div className="mt-8 bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-bold text-cv-blue mb-4">Nossa Localização</h2>
        <div className="aspect-w-16 aspect-h-9">
          <iframe 
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15656.41357000035!2d-23.52639!3d14.91778!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTTCsDU1JzA0LjEiTiAyM8KwMzEnMzUuMCJX!5e0!3m2!1sen!2scv!4v1640001234567!5m2!1sen!2scv" 
            className="w-full h-96 border-0 rounded-md" 
            allowFullScreen 
            loading="lazy"
            title="Mapa da Localização da FCBB"
          ></iframe>
        </div>
      </div>
    </PageLayout>
  );
};

export default ContactosPage;
