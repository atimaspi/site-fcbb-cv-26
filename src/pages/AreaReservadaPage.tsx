
import PageLayout from './PageLayout';
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { 
  User, 
  FileText, 
  Calendar, 
  Users, 
  LogIn, 
  PenLine, 
  ImagePlus, 
  Database,
  Settings,
  LayoutGrid
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter
} from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { 
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage 
} from "@/components/ui/form";

const AreaReservadaPage = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  // Content management states
  const [activeTab, setActiveTab] = useState('dashboard');
  const [showNewsDialog, setShowNewsDialog] = useState(false);
  const [showPhotoDialog, setShowPhotoDialog] = useState(false);
  const [showAdDialog, setShowAdDialog] = useState(false);
  const [newsTitle, setNewsTitle] = useState('');
  const [newsContent, setNewsContent] = useState('');
  const [newsCategory, setNewsCategory] = useState('Competições');
  const [photoTitle, setPhotoTitle] = useState('');
  const [photoDescription, setPhotoDescription] = useState('');
  const [photoEvent, setPhotoEvent] = useState('');
  const [adTitle, setAdTitle] = useState('');
  const [adLink, setAdLink] = useState('');
  const [adPosition, setAdPosition] = useState('sidebar');
  
  // Sample data
  const newsList = [
    { id: 1, title: 'ABC vence a SuperTaça de Cabo Verde 2025', date: '23/03/2025', category: 'Competições', status: 'Publicado' },
    { id: 2, title: 'Seleção Nacional convoca 20 jogadores para o AfroBasket', date: '20/03/2025', category: 'Seleções', status: 'Publicado' },
    { id: 3, title: 'Final Four da Liga Nacional em São Vicente', date: '15/03/2025', category: 'Competições', status: 'Rascunho' }
  ];
  
  const photosList = [
    { id: 1, title: 'Final Liga Nacional 2025', event: 'Liga Nacional', date: '15/04/2025', status: 'Publicado' },
    { id: 2, title: 'Workshop Treinadores', event: 'Formação', date: '10/03/2025', status: 'Publicado' },
    { id: 3, title: 'Selecção Nacional', event: 'Seleções', date: '05/02/2025', status: 'Rascunho' }
  ];
  
  const adsList = [
    { id: 1, title: 'Patrocínio Nike', position: 'Cabeçalho', status: 'Ativo' },
    { id: 2, title: 'Parceria com Banco de Cabo Verde', position: 'Sidebar', status: 'Ativo' },
    { id: 3, title: 'Promoção Equipamentos', position: 'Rodapé', status: 'Inativo' }
  ];
  
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
  
  const handleAddNews = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, this would send the data to an API
    console.log('Add news:', { newsTitle, newsContent, newsCategory });
    setShowNewsDialog(false);
    // Reset form fields
    setNewsTitle('');
    setNewsContent('');
    setNewsCategory('Competições');
    // Show success message in a real app
    alert('Notícia adicionada com sucesso!');
  };
  
  const handleAddPhoto = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, this would send the data to an API
    console.log('Add photo:', { photoTitle, photoDescription, photoEvent });
    setShowPhotoDialog(false);
    // Reset form fields
    setPhotoTitle('');
    setPhotoDescription('');
    setPhotoEvent('');
    // Show success message in a real app
    alert('Foto adicionada com sucesso!');
  };
  
  const handleAddAd = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, this would send the data to an API
    console.log('Add ad:', { adTitle, adLink, adPosition });
    setShowAdDialog(false);
    // Reset form fields
    setAdTitle('');
    setAdLink('');
    setAdPosition('sidebar');
    // Show success message in a real app
    alert('Anúncio adicionado com sucesso!');
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
                  Aqui você pode gerir conteúdos, informações e ferramentas do site.
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
          
          {/* Admin Navigation Tabs */}
          <div className="bg-white rounded-lg shadow-md mb-6 overflow-hidden">
            <div className="flex flex-wrap border-b">
              <button 
                className={`px-6 py-4 focus:outline-none ${activeTab === 'dashboard' ? 'bg-cv-blue text-white' : 'hover:bg-gray-100'}`}
                onClick={() => setActiveTab('dashboard')}
              >
                Dashboard
              </button>
              <button 
                className={`px-6 py-4 focus:outline-none ${activeTab === 'news' ? 'bg-cv-blue text-white' : 'hover:bg-gray-100'}`}
                onClick={() => setActiveTab('news')}
              >
                Notícias
              </button>
              <button 
                className={`px-6 py-4 focus:outline-none ${activeTab === 'gallery' ? 'bg-cv-blue text-white' : 'hover:bg-gray-100'}`}
                onClick={() => setActiveTab('gallery')}
              >
                Galeria
              </button>
              <button 
                className={`px-6 py-4 focus:outline-none ${activeTab === 'ads' ? 'bg-cv-blue text-white' : 'hover:bg-gray-100'}`}
                onClick={() => setActiveTab('ads')}
              >
                Publicidade
              </button>
              <button 
                className={`px-6 py-4 focus:outline-none ${activeTab === 'profile' ? 'bg-cv-blue text-white' : 'hover:bg-gray-100'}`}
                onClick={() => setActiveTab('profile')}
              >
                Perfil
              </button>
            </div>
          </div>
          
          {/* Dashboard Content */}
          {activeTab === 'dashboard' && (
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
          )}
          
          {/* News Management Tab */}
          {activeTab === 'news' && (
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-semibold text-cv-blue">Gestão de Notícias</h3>
                <Button 
                  className="bg-cv-blue hover:bg-blue-700 flex items-center gap-2"
                  onClick={() => setShowNewsDialog(true)}
                >
                  <PenLine size={18} />
                  Adicionar Notícia
                </Button>
              </div>
              
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>ID</TableHead>
                    <TableHead>Título</TableHead>
                    <TableHead>Data</TableHead>
                    <TableHead>Categoria</TableHead>
                    <TableHead>Estado</TableHead>
                    <TableHead>Ações</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {newsList.map((news) => (
                    <TableRow key={news.id}>
                      <TableCell>{news.id}</TableCell>
                      <TableCell>{news.title}</TableCell>
                      <TableCell>{news.date}</TableCell>
                      <TableCell>{news.category}</TableCell>
                      <TableCell>
                        <span className={`px-2 py-1 rounded-full text-xs ${
                          news.status === 'Publicado' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                        }`}>
                          {news.status}
                        </span>
                      </TableCell>
                      <TableCell>
                        <div className="flex space-x-2">
                          <button className="text-blue-600 hover:text-blue-800">
                            <PenLine size={16} />
                          </button>
                          <button className="text-red-600 hover:text-red-800">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                            </svg>
                          </button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
          
          {/* Gallery Management Tab */}
          {activeTab === 'gallery' && (
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-semibold text-cv-blue">Gestão de Galeria</h3>
                <Button 
                  className="bg-cv-blue hover:bg-blue-700 flex items-center gap-2"
                  onClick={() => setShowPhotoDialog(true)}
                >
                  <ImagePlus size={18} />
                  Adicionar Fotos
                </Button>
              </div>
              
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>ID</TableHead>
                    <TableHead>Título</TableHead>
                    <TableHead>Evento</TableHead>
                    <TableHead>Data</TableHead>
                    <TableHead>Estado</TableHead>
                    <TableHead>Ações</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {photosList.map((photo) => (
                    <TableRow key={photo.id}>
                      <TableCell>{photo.id}</TableCell>
                      <TableCell>{photo.title}</TableCell>
                      <TableCell>{photo.event}</TableCell>
                      <TableCell>{photo.date}</TableCell>
                      <TableCell>
                        <span className={`px-2 py-1 rounded-full text-xs ${
                          photo.status === 'Publicado' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                        }`}>
                          {photo.status}
                        </span>
                      </TableCell>
                      <TableCell>
                        <div className="flex space-x-2">
                          <button className="text-blue-600 hover:text-blue-800">
                            <PenLine size={16} />
                          </button>
                          <button className="text-red-600 hover:text-red-800">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                            </svg>
                          </button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
          
          {/* Ads Management Tab */}
          {activeTab === 'ads' && (
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-semibold text-cv-blue">Gestão de Publicidade</h3>
                <Button 
                  className="bg-cv-blue hover:bg-blue-700 flex items-center gap-2"
                  onClick={() => setShowAdDialog(true)}
                >
                  <LayoutGrid size={18} />
                  Adicionar Anúncio
                </Button>
              </div>
              
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>ID</TableHead>
                    <TableHead>Título</TableHead>
                    <TableHead>Posição</TableHead>
                    <TableHead>Estado</TableHead>
                    <TableHead>Ações</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {adsList.map((ad) => (
                    <TableRow key={ad.id}>
                      <TableCell>{ad.id}</TableCell>
                      <TableCell>{ad.title}</TableCell>
                      <TableCell>{ad.position}</TableCell>
                      <TableCell>
                        <span className={`px-2 py-1 rounded-full text-xs ${
                          ad.status === 'Ativo' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                        }`}>
                          {ad.status}
                        </span>
                      </TableCell>
                      <TableCell>
                        <div className="flex space-x-2">
                          <button className="text-blue-600 hover:text-blue-800">
                            <PenLine size={16} />
                          </button>
                          <button className="text-red-600 hover:text-red-800">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                            </svg>
                          </button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
          
          {/* Profile Tab */}
          {activeTab === 'profile' && (
            <div className="bg-white rounded-lg shadow-md p-6">
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
          )}

          {/* Add News Dialog */}
          <Dialog open={showNewsDialog} onOpenChange={setShowNewsDialog}>
            <DialogContent className="sm:max-w-[525px]">
              <DialogHeader>
                <DialogTitle>Adicionar Nova Notícia</DialogTitle>
                <DialogDescription>
                  Preencha os campos abaixo para adicionar uma nova notícia ao site.
                </DialogDescription>
              </DialogHeader>
              <form onSubmit={handleAddNews}>
                <div className="grid gap-4 py-4">
                  <div className="grid gap-2">
                    <label htmlFor="newsTitle" className="text-sm font-medium">
                      Título da Notícia
                    </label>
                    <input
                      id="newsTitle"
                      value={newsTitle}
                      onChange={(e) => setNewsTitle(e.target.value)}
                      className="px-3 py-2 border border-gray-300 rounded-md"
                      required
                    />
                  </div>
                  
                  <div className="grid gap-2">
                    <label htmlFor="newsCategory" className="text-sm font-medium">
                      Categoria
                    </label>
                    <select
                      id="newsCategory"
                      value={newsCategory}
                      onChange={(e) => setNewsCategory(e.target.value)}
                      className="px-3 py-2 border border-gray-300 rounded-md"
                    >
                      <option value="Competições">Competições</option>
                      <option value="Seleções">Seleções</option>
                      <option value="Formação">Formação</option>
                      <option value="Arbitragem">Arbitragem</option>
                    </select>
                  </div>
                  
                  <div className="grid gap-2">
                    <label htmlFor="newsContent" className="text-sm font-medium">
                      Conteúdo
                    </label>
                    <textarea
                      id="newsContent"
                      value={newsContent}
                      onChange={(e) => setNewsContent(e.target.value)}
                      className="px-3 py-2 border border-gray-300 rounded-md h-32"
                      required
                    ></textarea>
                  </div>
                  
                  <div className="grid gap-2">
                    <label htmlFor="newsImage" className="text-sm font-medium">
                      Imagem
                    </label>
                    <input
                      id="newsImage"
                      type="file"
                      accept="image/*"
                      className="px-3 py-2 border border-gray-300 rounded-md"
                    />
                    <p className="text-xs text-gray-500">
                      Recomendado: imagem de 1200x628 pixels, máx. 2MB
                    </p>
                  </div>
                </div>
                <DialogFooter>
                  <Button type="submit" className="bg-cv-blue">Publicar Notícia</Button>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>
          
          {/* Add Photo Dialog */}
          <Dialog open={showPhotoDialog} onOpenChange={setShowPhotoDialog}>
            <DialogContent className="sm:max-w-[525px]">
              <DialogHeader>
                <DialogTitle>Adicionar Fotos à Galeria</DialogTitle>
                <DialogDescription>
                  Carregue fotos para adicionar à galeria do site.
                </DialogDescription>
              </DialogHeader>
              <form onSubmit={handleAddPhoto}>
                <div className="grid gap-4 py-4">
                  <div className="grid gap-2">
                    <label htmlFor="photoTitle" className="text-sm font-medium">
                      Título do Álbum
                    </label>
                    <input
                      id="photoTitle"
                      value={photoTitle}
                      onChange={(e) => setPhotoTitle(e.target.value)}
                      className="px-3 py-2 border border-gray-300 rounded-md"
                      required
                    />
                  </div>
                  
                  <div className="grid gap-2">
                    <label htmlFor="photoEvent" className="text-sm font-medium">
                      Evento
                    </label>
                    <input
                      id="photoEvent"
                      value={photoEvent}
                      onChange={(e) => setPhotoEvent(e.target.value)}
                      className="px-3 py-2 border border-gray-300 rounded-md"
                    />
                  </div>
                  
                  <div className="grid gap-2">
                    <label htmlFor="photoDescription" className="text-sm font-medium">
                      Descrição
                    </label>
                    <textarea
                      id="photoDescription"
                      value={photoDescription}
                      onChange={(e) => setPhotoDescription(e.target.value)}
                      className="px-3 py-2 border border-gray-300 rounded-md h-20"
                    ></textarea>
                  </div>
                  
                  <div className="grid gap-2">
                    <label htmlFor="photoFiles" className="text-sm font-medium">
                      Fotos
                    </label>
                    <input
                      id="photoFiles"
                      type="file"
                      accept="image/*"
                      multiple
                      className="px-3 py-2 border border-gray-300 rounded-md"
                    />
                    <p className="text-xs text-gray-500">
                      Você pode selecionar várias imagens. Tamanho máximo: 5MB por imagem.
                    </p>
                  </div>
                </div>
                <DialogFooter>
                  <Button type="submit" className="bg-cv-blue">Carregar Fotos</Button>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>
          
          {/* Add Ad Dialog */}
          <Dialog open={showAdDialog} onOpenChange={setShowAdDialog}>
            <DialogContent className="sm:max-w-[525px]">
              <DialogHeader>
                <DialogTitle>Adicionar Novo Anúncio</DialogTitle>
                <DialogDescription>
                  Preencha os campos abaixo para adicionar um novo anúncio ao site.
                </DialogDescription>
              </DialogHeader>
              <form onSubmit={handleAddAd}>
                <div className="grid gap-4 py-4">
                  <div className="grid gap-2">
                    <label htmlFor="adTitle" className="text-sm font-medium">
                      Título do Anúncio
                    </label>
                    <input
                      id="adTitle"
                      value={adTitle}
                      onChange={(e) => setAdTitle(e.target.value)}
                      className="px-3 py-2 border border-gray-300 rounded-md"
                      required
                    />
                  </div>
                  
                  <div className="grid gap-2">
                    <label htmlFor="adLink" className="text-sm font-medium">
                      Link
                    </label>
                    <input
                      id="adLink"
                      type="url"
                      value={adLink}
                      onChange={(e) => setAdLink(e.target.value)}
                      className="px-3 py-2 border border-gray-300 rounded-md"
                      placeholder="https://..."
                    />
                  </div>
                  
                  <div className="grid gap-2">
                    <label htmlFor="adPosition" className="text-sm font-medium">
                      Posição
                    </label>
                    <select
                      id="adPosition"
                      value={adPosition}
                      onChange={(e) => setAdPosition(e.target.value)}
                      className="px-3 py-2 border border-gray-300 rounded-md"
                    >
                      <option value="header">Cabeçalho</option>
                      <option value="sidebar">Barra Lateral</option>
                      <option value="footer">Rodapé</option>
                      <option value="content">Entre Conteúdo</option>
                    </select>
                  </div>
                  
                  <div className="grid gap-2">
                    <label htmlFor="adImage" className="text-sm font-medium">
                      Imagem do Anúncio
                    </label>
                    <input
                      id="adImage"
                      type="file"
                      accept="image/*"
                      className="px-3 py-2 border border-gray-300 rounded-md"
                    />
                    <p className="text-xs text-gray-500">
                      Formatos recomendados: Banner (728x90), Retângulo (300x250)
                    </p>
                  </div>
                </div>
                <DialogFooter>
                  <Button type="submit" className="bg-cv-blue">Publicar Anúncio</Button>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>
        </div>
      )}
    </PageLayout>
  );
};

export default AreaReservadaPage;
