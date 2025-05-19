
import PageLayout from './PageLayout';
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { User, FileText, Calendar, Users, LogIn } from 'lucide-react';
import { Link } from 'react-router-dom';

const AreaReservadaPage = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    
    // Simulate API call
    setTimeout(() => {
      // For demo purposes, let's just check if email contains "@" and password is not empty
      if (email.includes('@') && password.length > 0) {
        setIsLoggedIn(true);
        setError(null);
      } else {
        setError('Email ou password inválidos. Por favor tente novamente.');
      }
      setIsLoading(false);
    }, 1000);
  };
  
  return (
    <PageLayout title="Área Reservada">
      {!isLoggedIn ? (
        <div className="max-w-md mx-auto bg-white rounded-lg shadow-md p-8 mt-8">
          <div className="flex justify-center mb-6">
            <div className="bg-cv-blue rounded-full p-3">
              <LogIn className="h-8 w-8 text-white" />
            </div>
          </div>
          
          <h2 className="text-xl font-bold text-cv-blue mb-6 text-center">Login Área Reservada</h2>
          
          {error && (
            <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-4" role="alert">
              <p>{error}</p>
            </div>
          )}
          
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
                disabled={isLoading}
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
                disabled={isLoading}
              />
            </div>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  type="checkbox"
                  className="h-4 w-4 text-cv-blue focus:ring-cv-blue border-gray-300 rounded"
                  disabled={isLoading}
                />
                <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-700">
                  Lembrar-me
                </label>
              </div>
              
              <a href="#" className="text-sm text-cv-blue hover:underline">
                Esqueceu a password?
              </a>
            </div>
            
            <Button
              type="submit"
              className="w-full bg-cv-blue hover:bg-blue-700"
              disabled={isLoading}
            >
              {isLoading ? 'A processar...' : 'Entrar'}
            </Button>
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
            <div className="flex justify-between items-center">
              <div>
                <h2 className="text-xl font-bold text-cv-blue mb-2">Bem-vindo à Área Reservada</h2>
                <p className="text-gray-700">
                  Aqui você pode aceder a documentos, informações e ferramentas exclusivas para membros.
                </p>
              </div>
              <Button
                onClick={() => setIsLoggedIn(false)}
                variant="outline"
                className="border-cv-blue text-cv-blue hover:bg-cv-blue hover:text-white"
              >
                Sair
              </Button>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex items-center mb-4">
                <FileText className="h-6 w-6 text-cv-blue mr-2" />
                <h3 className="font-semibold text-lg">Documentos</h3>
              </div>
              <ul className="space-y-3 text-gray-700">
                <li>
                  <Link to="#" className="hover:text-cv-blue flex items-center">
                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                    </svg>
                    Regulamento Interno
                  </Link>
                </li>
                <li>
                  <Link to="#" className="hover:text-cv-blue flex items-center">
                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                    </svg>
                    Formulários de Inscrição
                  </Link>
                </li>
                <li>
                  <Link to="#" className="hover:text-cv-blue flex items-center">
                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                    </svg>
                    Calendário Completo
                  </Link>
                </li>
                <li>
                  <Link to="#" className="hover:text-cv-blue flex items-center">
                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                    </svg>
                    Regras Oficiais
                  </Link>
                </li>
              </ul>
            </div>
            
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex items-center mb-4">
                <Calendar className="h-6 w-6 text-cv-blue mr-2" />
                <h3 className="font-semibold text-lg">Ferramentas</h3>
              </div>
              <ul className="space-y-3 text-gray-700">
                <li>
                  <Link to="#" className="hover:text-cv-blue flex items-center">
                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    Gerir Jogos
                  </Link>
                </li>
                <li>
                  <Link to="#" className="hover:text-cv-blue flex items-center">
                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                    Gestão de Jogadores
                  </Link>
                </li>
                <li>
                  <Link to="#" className="hover:text-cv-blue flex items-center">
                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
                    </svg>
                    Relatórios
                  </Link>
                </li>
                <li>
                  <Link to="#" className="hover:text-cv-blue flex items-center">
                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                    Estatísticas Avançadas
                  </Link>
                </li>
              </ul>
            </div>
            
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex items-center mb-4">
                <Users className="h-6 w-6 text-cv-blue mr-2" />
                <h3 className="font-semibold text-lg">Notificações</h3>
              </div>
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
                <li className="border-l-4 border-gray-300 pl-3 py-1">
                  <p className="font-medium">Curso de Treinadores</p>
                  <p className="text-sm text-gray-500">10/06/2025 - 10:00</p>
                </li>
              </ul>
              <div className="mt-4">
                <Link to="#" className="text-cv-blue hover:underline text-sm flex items-center">
                  Ver todas as notificações
                  <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              </div>
            </div>
          </div>
          
          <div className="mt-6 bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center mb-4">
              <User className="h-6 w-6 text-cv-blue mr-2" />
              <h3 className="font-semibold text-lg">Perfil do Usuário</h3>
            </div>
            
            <div className="flex flex-wrap">
              <div className="w-full md:w-1/3 mb-4 md:mb-0">
                <h4 className="text-sm font-medium text-gray-500 mb-2">Informações Pessoais</h4>
                <dl className="space-y-2">
                  <div>
                    <dt className="text-xs text-gray-500">Nome</dt>
                    <dd className="font-medium">João Silva</dd>
                  </div>
                  <div>
                    <dt className="text-xs text-gray-500">Email</dt>
                    <dd>{email}</dd>
                  </div>
                  <div>
                    <dt className="text-xs text-gray-500">Função</dt>
                    <dd>Representante de Clube</dd>
                  </div>
                </dl>
              </div>
              
              <div className="w-full md:w-1/3 mb-4 md:mb-0">
                <h4 className="text-sm font-medium text-gray-500 mb-2">Organização</h4>
                <dl className="space-y-2">
                  <div>
                    <dt className="text-xs text-gray-500">Clube</dt>
                    <dd className="font-medium">ABC Basquete</dd>
                  </div>
                  <div>
                    <dt className="text-xs text-gray-500">Região</dt>
                    <dd>Santiago</dd>
                  </div>
                  <div>
                    <dt className="text-xs text-gray-500">Último Acesso</dt>
                    <dd>19/05/2025 - 10:30</dd>
                  </div>
                </dl>
              </div>
              
              <div className="w-full md:w-1/3">
                <h4 className="text-sm font-medium text-gray-500 mb-2">Ações Rápidas</h4>
                <div className="flex flex-col space-y-2">
                  <Button variant="outline" size="sm" className="justify-start">
                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                    </svg>
                    Editar Perfil
                  </Button>
                  <Button variant="outline" size="sm" className="justify-start">
                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                    Alterar Password
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </PageLayout>
  );
};

export default AreaReservadaPage;
