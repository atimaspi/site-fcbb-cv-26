
import PageLayout from './PageLayout';
import { useState } from 'react';

const AreaReservadaPage = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real application, you would validate credentials
    setIsLoggedIn(true);
  };
  
  return (
    <PageLayout title="Área Reservada">
      {!isLoggedIn ? (
        <div className="max-w-md mx-auto bg-white rounded-lg shadow-md p-8 mt-8">
          <h2 className="text-xl font-bold text-cv-blue mb-6 text-center">Login</h2>
          
          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                Email
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-cv-blue"
                required
              />
            </div>
            
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                Password
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-cv-blue"
                required
              />
            </div>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  type="checkbox"
                  className="h-4 w-4 text-cv-blue focus:ring-cv-blue border-gray-300 rounded"
                />
                <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-700">
                  Lembrar-me
                </label>
              </div>
              
              <a href="#" className="text-sm text-cv-blue hover:underline">
                Esqueceu a password?
              </a>
            </div>
            
            <button
              type="submit"
              className="w-full bg-cv-blue hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
              Entrar
            </button>
          </form>
          
          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
              Esta área é reservada para clubes, associações e oficiais. <br />
              Para obter acesso, contacte a FCBB.
            </p>
          </div>
        </div>
      ) : (
        <div className="mt-8">
          <div className="bg-white rounded-lg shadow-md p-6 mb-6">
            <h2 className="text-xl font-bold text-cv-blue mb-4">Bem-vindo à Área Reservada</h2>
            <p className="text-gray-700 mb-4">
              Aqui você pode aceder a documentos, informações e ferramentas exclusivas para membros.
            </p>
            <button
              onClick={() => setIsLoggedIn(false)}
              className="bg-cv-blue hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
              Sair
            </button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="font-semibold text-lg mb-3">Documentos</h3>
              <ul className="space-y-2 text-gray-700">
                <li>
                  <a href="#" className="hover:text-cv-blue flex items-center">
                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                    </svg>
                    Regulamento Interno
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-cv-blue flex items-center">
                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                    </svg>
                    Formulários de Inscrição
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-cv-blue flex items-center">
                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                    </svg>
                    Calendário Completo
                  </a>
                </li>
              </ul>
            </div>
            
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="font-semibold text-lg mb-3">Ferramentas</h3>
              <ul className="space-y-2 text-gray-700">
                <li>
                  <a href="#" className="hover:text-cv-blue flex items-center">
                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    Gerir Jogos
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-cv-blue flex items-center">
                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                    Gestão de Jogadores
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-cv-blue flex items-center">
                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
                    </svg>
                    Relatórios
                  </a>
                </li>
              </ul>
            </div>
            
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="font-semibold text-lg mb-3">Notificações</h3>
              <ul className="space-y-3 text-gray-700">
                <li className="border-l-4 border-cv-blue pl-3 py-1">
                  <p className="font-medium">Reunião de Clubes</p>
                  <p className="text-sm text-gray-500">Hoje - 15:00</p>
                </li>
                <li className="border-l-4 border-gray-300 pl-3 py-1">
                  <p className="font-medium">Envio de Documentação</p>
                  <p className="text-sm text-gray-500">Prazo: 25/05/2025</p>
                </li>
                <li className="border-l-4 border-gray-300 pl-3 py-1">
                  <p className="font-medium">Workshop de Arbitragem</p>
                  <p className="text-sm text-gray-500">30/05/2025 - 09:00</p>
                </li>
              </ul>
            </div>
          </div>
        </div>
      )}
    </PageLayout>
  );
};

export default AreaReservadaPage;
