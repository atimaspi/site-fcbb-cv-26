
import PageLayout from '../PageLayout';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { MapPin, Phone, Mail, Clock, Users, Building, Calendar } from 'lucide-react';

const ContactosPage = () => {
  const departamentos = [
    {
      nome: "Presidência",
      responsavel: "João Silva",
      email: "presidencia@fcbb.cv",
      telefone: "+238 262 1000",
      extensao: "100"
    },
    {
      nome: "Secretariado Geral",
      responsavel: "Maria Santos",
      email: "secretariado@fcbb.cv", 
      telefone: "+238 262 1001",
      extensao: "101"
    },
    {
      nome: "Competições",
      responsavel: "Carlos Mendes",
      email: "competicoes@fcbb.cv",
      telefone: "+238 262 1002", 
      extensao: "102"
    },
    {
      nome: "Comunicação",
      responsavel: "Ana Pereira",
      email: "comunicacao@fcbb.cv",
      telefone: "+238 262 1003",
      extensao: "103"
    },
    {
      nome: "Formação",
      responsavel: "Pedro Gomes", 
      email: "formacao@fcbb.cv",
      telefone: "+238 262 1004",
      extensao: "104"
    },
    {
      nome: "Arbitragem",
      responsavel: "José Santos",
      email: "arbitragem@fcbb.cv",
      telefone: "+238 262 1005",
      extensao: "105"
    }
  ];

  const horarios = [
    { dia: "Segunda a Quinta", horario: "08:00 - 17:00", tipo: "normal" },
    { dia: "Sexta-feira", horario: "08:00 - 16:00", tipo: "normal" },
    { dia: "Sábado", horario: "Apenas para eventos", tipo: "especial" },
    { dia: "Domingo", horario: "Encerrado", tipo: "encerrado" }
  ];

  const delegacoes = [
    {
      ilha: "Santiago",
      responsavel: "Dr. Manuel Costa",
      endereco: "Av. Cidade de Lisboa, Plateau, Praia",
      telefone: "+238 262 2000",
      email: "santiago@fcbb.cv"
    },
    {
      ilha: "São Vicente",
      responsavel: "Eng. Teresa Alves", 
      endereco: "Rua Lisboa, Mindelo",
      telefone: "+238 232 3000",
      email: "saovicente@fcbb.cv"
    },
    {
      ilha: "Sal",
      responsavel: "Prof. António Silva",
      endereco: "Espargos, Zona Industrial", 
      telefone: "+238 241 4000",
      email: "sal@fcbb.cv"
    }
  ];

  return (
    <PageLayout title="Contactos">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Sede Principal */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center text-cv-blue">
                <Building className="mr-2 h-5 w-5" />
                Sede Principal
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-start space-x-3">
                <MapPin className="h-5 w-5 text-cv-blue mt-1" />
                <div>
                  <p className="font-medium">Endereço</p>
                  <p className="text-gray-600">
                    Complexo Desportivo Nacional<br />
                    Várzea, Cidade da Praia<br />
                    Cabo Verde
                  </p>
                </div>
              </div>
              
              <div className="flex items-center space-x-3">
                <Phone className="h-5 w-5 text-cv-blue" />
                <div>
                  <p className="font-medium">Telefone Principal</p>
                  <p className="text-gray-600">+238 262 1000</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-3">
                <Mail className="h-5 w-5 text-cv-blue" />
                <div>
                  <p className="font-medium">Email Geral</p>
                  <p className="text-gray-600">geral@fcbb.cv</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Horários de Funcionamento */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center text-cv-blue">
                <Clock className="mr-2 h-5 w-5" />
                Horários de Funcionamento
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {horarios.map((horario, index) => (
                  <div key={index} className="flex justify-between items-center p-3 rounded-lg bg-gray-50">
                    <span className="font-medium">{horario.dia}</span>
                    <span className={`${
                      horario.tipo === 'encerrado' ? 'text-red-600' :
                      horario.tipo === 'especial' ? 'text-orange-600' : 'text-green-600'
                    }`}>
                      {horario.horario}
                    </span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Formulário de Contacto */}
          <Card>
            <CardHeader>
              <CardTitle className="text-cv-blue">Envie uma Mensagem</CardTitle>
            </CardHeader>
            <CardContent>
              <form className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">Nome</label>
                    <Input placeholder="Seu nome completo" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Email</label>
                    <Input type="email" placeholder="seu@email.com" />
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-1">Assunto</label>
                  <Input placeholder="Assunto da sua mensagem" />
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-1">Mensagem</label>
                  <Textarea 
                    placeholder="Escreva aqui a sua mensagem..."
                    rows={4}
                  />
                </div>
                
                <Button className="w-full">
                  Enviar Mensagem
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>

        {/* Departamentos e Delegações */}
        <div className="space-y-6">
          {/* Departamentos */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center text-cv-blue">
                <Users className="mr-2 h-5 w-5" />
                Departamentos
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {departamentos.map((dept, index) => (
                  <Card key={index} className="border">
                    <CardContent className="p-4">
                      <h3 className="font-semibold text-lg mb-2">{dept.nome}</h3>
                      <div className="space-y-2 text-sm">
                        <div className="flex items-center">
                          <Users className="h-4 w-4 mr-2 text-gray-400" />
                          <span className="text-gray-600">Responsável: </span>
                          <span className="font-medium">{dept.responsavel}</span>
                        </div>
                        <div className="flex items-center">
                          <Mail className="h-4 w-4 mr-2 text-gray-400" />
                          <a href={`mailto:${dept.email}`} className="text-cv-blue hover:underline">
                            {dept.email}
                          </a>
                        </div>
                        <div className="flex items-center">
                          <Phone className="h-4 w-4 mr-2 text-gray-400" />
                          <span>{dept.telefone} (ext. {dept.extensao})</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Delegações Regionais */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center text-cv-blue">
                <MapPin className="mr-2 h-5 w-5" />
                Delegações Regionais
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {delegacoes.map((delegacao, index) => (
                  <Card key={index} className="border">
                    <CardContent className="p-4">
                      <h3 className="font-semibold text-lg mb-2">Delegação de {delegacao.ilha}</h3>
                      <div className="space-y-2 text-sm">
                        <div className="flex items-start">
                          <Users className="h-4 w-4 mr-2 text-gray-400 mt-0.5" />
                          <div>
                            <span className="text-gray-600">Responsável: </span>
                            <span className="font-medium">{delegacao.responsavel}</span>
                          </div>
                        </div>
                        <div className="flex items-start">
                          <MapPin className="h-4 w-4 mr-2 text-gray-400 mt-0.5" />
                          <span className="text-gray-600">{delegacao.endereco}</span>
                        </div>
                        <div className="flex items-center">
                          <Phone className="h-4 w-4 mr-2 text-gray-400" />
                          <span>{delegacao.telefone}</span>
                        </div>
                        <div className="flex items-center">
                          <Mail className="h-4 w-4 mr-2 text-gray-400" />
                          <a href={`mailto:${delegacao.email}`} className="text-cv-blue hover:underline">
                            {delegacao.email}
                          </a>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Informações de Emergência */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center text-cv-blue">
                <Calendar className="mr-2 h-5 w-5" />
                Contactos de Emergência
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="p-3 bg-red-50 rounded-lg border border-red-200">
                  <h4 className="font-semibold text-red-800 mb-2">Situações Urgentes</h4>
                  <p className="text-sm text-red-700">
                    Para situações que requerem atenção imediata (acidentes, emergências médicas durante eventos):
                  </p>
                  <p className="font-semibold text-red-800">+238 9XX XXXX (24h)</p>
                </div>
                
                <div className="p-3 bg-blue-50 rounded-lg border border-blue-200">
                  <h4 className="font-semibold text-blue-800 mb-2">Fim de Semana</h4>
                  <p className="text-sm text-blue-700">
                    Contacto disponível durante eventos oficiais aos fins de semana:
                  </p>
                  <p className="font-semibold text-blue-800">diretor.competicoes@fcbb.cv</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </PageLayout>
  );
};

export default ContactosPage;
