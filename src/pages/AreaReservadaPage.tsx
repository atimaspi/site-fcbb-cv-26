
import PageLayout from './PageLayout';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Lock, User, Shield, Download, FileText, Calendar, Users, Trophy, AlertTriangle } from 'lucide-react';

const AreaReservadaPage = () => {
  const documents = [
    {
      title: "Regulamento Liga Nacional 2024/25",
      type: "PDF",
      size: "2.4 MB",
      date: "15/09/2024",
      access: "Clubes"
    },
    {
      title: "Relatório Arbitragem - Março",
      type: "PDF",
      size: "1.8 MB",
      date: "01/04/2024",
      access: "Árbitros"
    },
    {
      title: "Formulário Transferência Jogadores",
      type: "DOC",
      size: "245 KB",
      date: "20/08/2024",
      access: "Clubes"
    },
    {
      title: "Manual do Treinador FCBB",
      type: "PDF",
      size: "5.2 MB",
      date: "10/07/2024",
      access: "Treinadores"
    },
    {
      title: "Atas Assembleia Geral 2024",
      type: "PDF",
      size: "3.1 MB",
      date: "25/03/2024",
      access: "Dirigentes"
    }
  ];

  const notices = [
    {
      title: "Convocatória Assembleia Geral Ordinária",
      date: "08/06/2025",
      priority: "high",
      category: "Assembleia"
    },
    {
      title: "Alteração Calendário Liga Nacional",
      date: "05/06/2025",
      priority: "medium",
      category: "Competições"
    },
    {
      title: "Workshop Arbitragem - São Vicente",
      date: "02/06/2025",
      priority: "low",
      category: "Formação"
    },
    {
      title: "Prazo Inscrições Taça de Cabo Verde",
      date: "30/05/2025",
      priority: "high",
      category: "Competições"
    }
  ];

  const services = [
    {
      title: "Registo de Jogadores",
      description: "Sistema online para registo e transferência de atletas",
      icon: <Users className="w-8 h-8" />,
      access: "Clubes"
    },
    {
      title: "Calendário de Competições",
      description: "Consulta e gestão do calendário oficial",
      icon: <Calendar className="w-8 h-8" />,
      access: "Todos"
    },
    {
      title: "Resultados e Classificações",
      description: "Inserção de resultados e consulta de classificações",
      icon: <Trophy className="w-8 h-8" />,
      access: "Clubes"
    },
    {
      title: "Biblioteca Documental",
      description: "Acesso a regulamentos, formulários e documentos oficiais",
      icon: <FileText className="w-8 h-8" />,
      access: "Membros"
    }
  ];

  return (
    <PageLayout title="Área Reservada">
      <div className="space-y-6">
        {/* Login Section */}
        <Card className="border-l-4 border-cv-blue">
          <CardHeader>
            <CardTitle className="flex items-center space-x-3 text-cv-blue">
              <Lock className="w-6 h-6" />
              <span>Acesso à Área Reservada</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div>
                <form className="space-y-4">
                  <div>
                    <Label htmlFor="username">Nome de Utilizador</Label>
                    <Input id="username" placeholder="Digite seu nome de utilizador" />
                  </div>
                  <div>
                    <Label htmlFor="password">Palavra-passe</Label>
                    <Input id="password" type="password" placeholder="Digite sua palavra-passe" />
                  </div>
                  <div className="flex items-center space-x-2">
                    <input type="checkbox" id="remember" className="rounded" />
                    <Label htmlFor="remember" className="text-sm">Lembrar-me</Label>
                  </div>
                  <Button className="w-full bg-cv-blue hover:bg-blue-700">
                    <User className="w-4 h-4 mr-2" />
                    Entrar
                  </Button>
                  <div className="text-center space-y-2">
                    <a href="#" className="text-sm text-cv-blue hover:underline block">
                      Esqueceu a palavra-passe?
                    </a>
                    <a href="#" className="text-sm text-cv-blue hover:underline block">
                      Primeiro acesso? Ativar conta
                    </a>
                  </div>
                </form>
              </div>
              
              <div className="space-y-4">
                <h3 className="font-semibold text-cv-blue">Tipos de Acesso</h3>
                <div className="space-y-3">
                  <div className="p-3 border rounded-lg">
                    <div className="flex items-center space-x-3">
                      <Shield className="w-5 h-5 text-green-600" />
                      <div>
                        <h4 className="font-medium">Clubes Afiliados</h4>
                        <p className="text-sm text-gray-600">Gestão de jogadores, resultados e documentação</p>
                      </div>
                    </div>
                  </div>
                  <div className="p-3 border rounded-lg">
                    <div className="flex items-center space-x-3">
                      <Shield className="w-5 h-5 text-blue-600" />
                      <div>
                        <h4 className="font-medium">Árbitros</h4>
                        <p className="text-sm text-gray-600">Relatórios, formação e escalas</p>
                      </div>
                    </div>
                  </div>
                  <div className="p-3 border rounded-lg">
                    <div className="flex items-center space-x-3">
                      <Shield className="w-5 h-5 text-purple-600" />
                      <div>
                        <h4 className="font-medium">Dirigentes</h4>
                        <p className="text-sm text-gray-600">Atas, decisões e documentação executiva</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Tabs defaultValue="services" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="services">Serviços</TabsTrigger>
            <TabsTrigger value="documents">Documentos</TabsTrigger>
            <TabsTrigger value="notices">Comunicados</TabsTrigger>
            <TabsTrigger value="help">Ajuda</TabsTrigger>
          </TabsList>

          {/* Services */}
          <TabsContent value="services" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {services.map((service, index) => (
                <Card key={index} className="hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-start space-x-4">
                      <div className="text-cv-blue">
                        {service.icon}
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-cv-blue mb-2">{service.title}</h3>
                        <p className="text-gray-600 text-sm mb-3">{service.description}</p>
                        <div className="flex justify-between items-center">
                          <Badge variant="outline">{service.access}</Badge>
                          <Button size="sm" disabled>
                            <Lock className="w-4 h-4 mr-1" />
                            Requer Login
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Documents */}
          <TabsContent value="documents" className="space-y-4">
            <div className="space-y-3">
              {documents.map((doc, index) => (
                <Card key={index}>
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <FileText className="w-8 h-8 text-cv-blue" />
                        <div>
                          <h3 className="font-medium">{doc.title}</h3>
                          <div className="flex items-center space-x-4 text-sm text-gray-600">
                            <span>{doc.type} • {doc.size}</span>
                            <span>{doc.date}</span>
                            <Badge variant="secondary">{doc.access}</Badge>
                          </div>
                        </div>
                      </div>
                      <Button size="sm" disabled>
                        <Download className="w-4 h-4 mr-1" />
                        Download
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Notices */}
          <TabsContent value="notices" className="space-y-4">
            <div className="space-y-3">
              {notices.map((notice, index) => (
                <Card key={index} className={`border-l-4 ${
                  notice.priority === 'high' ? 'border-red-500' :
                  notice.priority === 'medium' ? 'border-yellow-500' : 'border-green-500'
                }`}>
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-medium">{notice.title}</h3>
                        <div className="flex items-center space-x-4 text-sm text-gray-600 mt-1">
                          <span>{notice.date}</span>
                          <Badge variant="outline">{notice.category}</Badge>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        {notice.priority === 'high' && (
                          <AlertTriangle className="w-5 h-5 text-red-500" />
                        )}
                        <Badge variant={
                          notice.priority === 'high' ? 'destructive' :
                          notice.priority === 'medium' ? 'default' : 'secondary'
                        }>
                          {notice.priority === 'high' ? 'Urgente' :
                           notice.priority === 'medium' ? 'Importante' : 'Normal'}
                        </Badge>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Help */}
          <TabsContent value="help" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-cv-blue">Como Obter Acesso</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3 text-sm">
                    <div>
                      <h4 className="font-medium">Clubes Afiliados:</h4>
                      <p className="text-gray-600">Contacte a secretaria com o certificado de filiação</p>
                    </div>
                    <div>
                      <h4 className="font-medium">Árbitros:</h4>
                      <p className="text-gray-600">Apresente a licença de arbitragem válida</p>
                    </div>
                    <div>
                      <h4 className="font-medium">Dirigentes:</h4>
                      <p className="text-gray-600">Credencial de dirigente emitida pela FCBB</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-cv-blue">Suporte Técnico</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3 text-sm">
                    <div>
                      <h4 className="font-medium">Email:</h4>
                      <p className="text-gray-600">suporte@fcbb.cv</p>
                    </div>
                    <div>
                      <h4 className="font-medium">Telefone:</h4>
                      <p className="text-gray-600">(+238) 261 56 89</p>
                    </div>
                    <div>
                      <h4 className="font-medium">Horário:</h4>
                      <p className="text-gray-600">Segunda a Sexta: 08:00 - 17:00</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </PageLayout>
  );
};

export default AreaReservadaPage;
