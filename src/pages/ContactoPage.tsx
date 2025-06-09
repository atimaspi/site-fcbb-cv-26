
import PageLayout from './PageLayout';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { MapPin, Phone, Mail, Clock, Send, Building } from 'lucide-react';

const ContactoPage = () => {
  const contactInfo = [
    {
      icon: <Building className="w-6 h-6" />,
      title: "Sede da FCBB",
      details: [
        "Federação Cabo-verdiana de Basquetebol",
        "Complexo Desportivo da Várzea",
        "CP 584, Praia - Santiago",
        "Cabo Verde"
      ]
    },
    {
      icon: <Phone className="w-6 h-6" />,
      title: "Contactos Telefónicos",
      details: [
        "Tel: (+238) 261 56 89",
        "Fax: (+238) 261 56 90",
        "Móvel: (+238) 991 23 45"
      ]
    },
    {
      icon: <Mail className="w-6 h-6" />,
      title: "Contactos Eletrónicos",
      details: [
        "geral@fcbb.cv",
        "presidente@fcbb.cv",
        "secretaria@fcbb.cv",
        "competicoes@fcbb.cv"
      ]
    },
    {
      icon: <Clock className="w-6 h-6" />,
      title: "Horário de Funcionamento",
      details: [
        "Segunda a Sexta: 08:00 - 17:00",
        "Sábado: 08:00 - 12:00",
        "Domingo: Fechado",
        "Feriados: Fechado"
      ]
    }
  ];

  const departments = [
    {
      name: "Presidência",
      email: "presidente@fcbb.cv",
      phone: "(+238) 991 23 45",
      responsible: "António Silva"
    },
    {
      name: "Secretaria-Geral",
      email: "secretaria@fcbb.cv",
      phone: "(+238) 261 56 89",
      responsible: "Maria Santos"
    },
    {
      name: "Competições",
      email: "competicoes@fcbb.cv",
      phone: "(+238) 991 34 56",
      responsible: "João Tavares"
    },
    {
      name: "Arbitragem",
      email: "arbitragem@fcbb.cv",
      phone: "(+238) 991 45 67",
      responsible: "Carlos Monteiro"
    },
    {
      name: "Formação",
      email: "formacao@fcbb.cv",
      phone: "(+238) 991 56 78",
      responsible: "Ana Rodrigues"
    },
    {
      name: "Comunicação",
      email: "comunicacao@fcbb.cv",
      phone: "(+238) 991 67 89",
      responsible: "Pedro Lima"
    }
  ];

  return (
    <PageLayout title="Contacto">
      <div className="space-y-8">
        {/* Contact Information */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {contactInfo.map((info, index) => (
            <Card key={index} className="border-l-4 border-cv-blue">
              <CardHeader>
                <CardTitle className="flex items-center space-x-3 text-cv-blue">
                  {info.icon}
                  <span>{info.title}</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {info.details.map((detail, idx) => (
                    <p key={idx} className="text-gray-700">{detail}</p>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Departments */}
        <Card>
          <CardHeader>
            <CardTitle className="text-cv-blue">Departamentos e Contactos Diretos</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {departments.map((dept, index) => (
                <div key={index} className="p-4 border rounded-lg bg-gray-50">
                  <h3 className="font-semibold text-cv-blue mb-2">{dept.name}</h3>
                  <p className="text-sm text-gray-600 mb-1">Responsável: {dept.responsible}</p>
                  <div className="space-y-1 text-sm">
                    <div className="flex items-center space-x-2">
                      <Mail className="w-4 h-4 text-cv-blue" />
                      <a href={`mailto:${dept.email}`} className="text-cv-blue hover:underline">
                        {dept.email}
                      </a>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Phone className="w-4 h-4 text-cv-blue" />
                      <span>{dept.phone}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Contact Form */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <Card>
            <CardHeader>
              <CardTitle className="text-cv-blue">Envie-nos uma Mensagem</CardTitle>
            </CardHeader>
            <CardContent>
              <form className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="firstName">Nome</Label>
                    <Input id="firstName" placeholder="Seu nome" />
                  </div>
                  <div>
                    <Label htmlFor="lastName">Apelido</Label>
                    <Input id="lastName" placeholder="Seu apelido" />
                  </div>
                </div>
                
                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" placeholder="seu.email@exemplo.com" />
                </div>
                
                <div>
                  <Label htmlFor="phone">Telefone</Label>
                  <Input id="phone" placeholder="(+238) 999 99 99" />
                </div>
                
                <div>
                  <Label htmlFor="subject">Assunto</Label>
                  <Input id="subject" placeholder="Assunto da mensagem" />
                </div>
                
                <div>
                  <Label htmlFor="message">Mensagem</Label>
                  <Textarea 
                    id="message" 
                    placeholder="Escreva sua mensagem aqui..." 
                    rows={5}
                  />
                </div>
                
                <Button className="w-full bg-cv-blue hover:bg-blue-700">
                  <Send className="w-4 h-4 mr-2" />
                  Enviar Mensagem
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Map and Location */}
          <Card>
            <CardHeader>
              <CardTitle className="text-cv-blue">Localização</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="bg-gray-200 h-64 rounded-lg flex items-center justify-center">
                  <div className="text-center text-gray-600">
                    <MapPin className="w-12 h-12 mx-auto mb-2" />
                    <p>Mapa da localização</p>
                    <p className="text-sm">Complexo Desportivo da Várzea</p>
                    <p className="text-sm">Praia, Santiago - Cabo Verde</p>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <h4 className="font-semibold text-cv-blue">Como Chegar:</h4>
                  <ul className="text-sm text-gray-700 space-y-1">
                    <li>• Do Aeroporto: 20 minutos de táxi</li>
                    <li>• Centro da Praia: 15 minutos a pé</li>
                    <li>• Transportes públicos: Linha 4 e 7</li>
                    <li>• Estacionamento disponível no local</li>
                  </ul>
                </div>
                
                <div className="p-3 bg-cv-blue/10 rounded-lg">
                  <p className="text-sm text-cv-blue font-medium">
                    💡 Dica: Para reuniões importantes, recomendamos agendar previamente através do telefone ou email.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Emergency Contacts */}
        <Card className="border-l-4 border-cv-red">
          <CardHeader>
            <CardTitle className="text-cv-red">Contactos de Emergência</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="text-center">
                <h4 className="font-semibold text-cv-blue mb-2">Emergências Médicas</h4>
                <p className="text-lg font-bold text-cv-red">Dr. Manuel Costa</p>
                <p className="text-sm">(+238) 991 11 11</p>
              </div>
              <div className="text-center">
                <h4 className="font-semibold text-cv-blue mb-2">Segurança</h4>
                <p className="text-lg font-bold text-cv-red">Segurança FCBB</p>
                <p className="text-sm">(+238) 991 22 22</p>
              </div>
              <div className="text-center">
                <h4 className="font-semibold text-cv-blue mb-2">Imprensa</h4>
                <p className="text-lg font-bold text-cv-red">Assessoria de Imprensa</p>
                <p className="text-sm">(+238) 991 33 33</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </PageLayout>
  );
};

export default ContactoPage;
