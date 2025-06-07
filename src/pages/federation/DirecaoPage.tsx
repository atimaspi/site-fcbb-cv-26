
import PageLayout from '../PageLayout';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { User, Mail, Phone, MapPin } from 'lucide-react';

const DirecaoPage = () => {
  const direcao = [
    {
      nome: "João Silva Santos",
      cargo: "Presidente",
      mandato: "2024-2028",
      email: "presidente@fcbb.cv",
      telefone: "+238 262 1234",
      bio: "Licenciado em Gestão Desportiva com vasta experiência na liderança de organizações desportivas.",
      foto: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=200&h=200&q=80"
    },
    {
      nome: "Maria Fernanda Lopes",
      cargo: "Vice-Presidente",
      mandato: "2024-2028",
      email: "vice.presidente@fcbb.cv",
      telefone: "+238 262 5678",
      bio: "Ex-jogadora internacional e treinadora certificada pela FIBA com 15 anos de experiência.",
      foto: "https://images.unsplash.com/photo-1494790108755-2616b612b1db?auto=format&fit=crop&w=200&h=200&q=80"
    },
    {
      nome: "Carlos Manuel Évora",
      cargo: "Secretário-Geral",
      mandato: "2024-2028",
      email: "secretario@fcbb.cv",
      telefone: "+238 262 9012",
      bio: "Gestor com especialização em administração desportiva e desenvolvimento organizacional.",
      foto: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&h=200&q=80"
    },
    {
      nome: "Ana Paula Monteiro",
      cargo: "Tesoureira",
      mandato: "2024-2028",
      email: "tesouraria@fcbb.cv",
      telefone: "+238 262 3456",
      bio: "Contabilista certificada com experiência em gestão financeira de organizações sem fins lucrativos.",
      foto: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=200&h=200&q=80"
    }
  ];

  const vogais = [
    "Dr. Pedro Almada Correia",
    "Eng. Rita Fonseca Lima", 
    "Prof. Manuel Rodrigues",
    "Dra. Sandra Tavares Pina",
    "Sr. António Borges Semedo"
  ];

  return (
    <PageLayout title="Direção da FCBB">
      <div className="space-y-8">
        <Card>
          <CardHeader>
            <CardTitle className="text-cv-blue">Mesa da Assembleia Geral</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
              <div>
                <h4 className="font-semibold text-lg">Presidente</h4>
                <p className="text-gray-600">Dr. Francisco Tavares</p>
              </div>
              <div>
                <h4 className="font-semibold text-lg">Vice-Presidente</h4>
                <p className="text-gray-600">Dra. Eulália Monteiro</p>
              </div>
              <div>
                <h4 className="font-semibold text-lg">Secretário</h4>
                <p className="text-gray-600">Sr. José Carlos Silva</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-cv-blue">Direção Executiva</CardTitle>
            <p className="text-gray-600">Mandato 2024-2028</p>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {direcao.map((membro, index) => (
                <Card key={index} className="border hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-start space-x-4">
                      <img 
                        src={membro.foto} 
                        alt={membro.nome}
                        className="w-20 h-20 rounded-full object-cover"
                      />
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-2">
                          <h3 className="font-bold text-lg">{membro.nome}</h3>
                          <Badge className="bg-cv-blue text-white">{membro.cargo}</Badge>
                        </div>
                        <p className="text-sm text-gray-600 mb-3">{membro.bio}</p>
                        
                        <div className="space-y-1 text-sm">
                          <div className="flex items-center text-gray-500">
                            <Mail className="w-4 h-4 mr-2" />
                            <a href={`mailto:${membro.email}`} className="hover:text-cv-blue">
                              {membro.email}
                            </a>
                          </div>
                          <div className="flex items-center text-gray-500">
                            <Phone className="w-4 h-4 mr-2" />
                            <span>{membro.telefone}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-cv-blue">Vogais</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {vogais.map((vogal, index) => (
                <div key={index} className="flex items-center p-4 bg-gray-50 rounded-lg">
                  <User className="w-5 h-5 text-cv-blue mr-3" />
                  <span className="font-medium">{vogal}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-cv-blue">Conselho Fiscal</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
              <div>
                <h4 className="font-semibold text-lg">Presidente</h4>
                <p className="text-gray-600">Dr. Luís Fonseca</p>
              </div>
              <div>
                <h4 className="font-semibold text-lg">Vogal</h4>
                <p className="text-gray-600">Dra. Carla Rodrigues</p>
              </div>
              <div>
                <h4 className="font-semibold text-lg">Vogal</h4>
                <p className="text-gray-600">Sr. Manuel Santos</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-cv-blue">Contactos da Direção</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-3">
                <div className="flex items-center">
                  <MapPin className="w-5 h-5 text-cv-blue mr-3" />
                  <div>
                    <p className="font-semibold">Sede da FCBB</p>
                    <p className="text-gray-600">Plateau, Praia - Cabo Verde</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <Phone className="w-5 h-5 text-cv-blue mr-3" />
                  <div>
                    <p className="font-semibold">Telefone Geral</p>
                    <p className="text-gray-600">+238 262 1234</p>
                  </div>
                </div>
              </div>
              <div className="space-y-3">
                <div className="flex items-center">
                  <Mail className="w-5 h-5 text-cv-blue mr-3" />
                  <div>
                    <p className="font-semibold">Email Institucional</p>
                    <p className="text-gray-600">geral@fcbb.cv</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <Mail className="w-5 h-5 text-cv-blue mr-3" />
                  <div>
                    <p className="font-semibold">Imprensa</p>
                    <p className="text-gray-600">imprensa@fcbb.cv</p>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </PageLayout>
  );
};

export default DirecaoPage;
