
import PageLayout from '../PageLayout';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, Users, Trophy, Star } from 'lucide-react';

const HistoriaPage = () => {
  const timelineEvents = [
    {
      year: 1977,
      title: "Fundação da FCBB",
      description: "Criação da Federação Cabo-verdiana de Basquetebol com o objetivo de organizar e desenvolver o basquetebol nacional.",
      type: "foundation"
    },
    {
      year: 1985,
      title: "Primeira Liga Nacional",
      description: "Inauguração da primeira Liga Nacional de Basquetebol com 8 equipas participantes.",
      type: "competition"
    },
    {
      year: 1992,
      title: "Filiação na FIBA",
      description: "Cabo Verde torna-se membro oficial da Federação Internacional de Basquetebol.",
      type: "international"
    },
    {
      year: 1998,
      title: "Primeira Participação Internacional",
      description: "Estreia da Seleção Nacional no AfroBasket realizado no Senegal.",
      type: "achievement"
    },
    {
      year: 2005,
      title: "Centro de Formação",
      description: "Inauguração do primeiro Centro Nacional de Formação de Jovens Talentos.",
      type: "development"
    },
    {
      year: 2012,
      title: "Liga Feminina",
      description: "Criação da Liga Nacional Feminina, marcando um momento histórico para o basquetebol feminino.",
      type: "competition"
    },
    {
      year: 2018,
      title: "Melhor Classificação",
      description: "Seleção Nacional alcança o 8º lugar no AfroBasket, a melhor classificação de sempre.",
      type: "achievement"
    },
    {
      year: 2023,
      title: "Novo Pavilhão Nacional",
      description: "Inauguração do moderno Pavilhão Nacional com capacidade para 5.000 espectadores.",
      type: "infrastructure"
    }
  ];

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'foundation': return 'bg-cv-blue text-white';
      case 'competition': return 'bg-green-500 text-white';
      case 'international': return 'bg-orange-500 text-white';
      case 'achievement': return 'bg-cv-red text-white';
      case 'development': return 'bg-purple-500 text-white';
      case 'infrastructure': return 'bg-gray-600 text-white';
      default: return 'bg-gray-500 text-white';
    }
  };

  const statistics = [
    { label: "Anos de História", value: "47", icon: Calendar },
    { label: "Clubes Filiados", value: "32", icon: Users },
    { label: "Campeonatos Organizados", value: "45", icon: Trophy },
    { label: "Jogadores Formados", value: "500+", icon: Star }
  ];

  return (
    <PageLayout title="História da FCBB">
      <div className="space-y-8">
        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {statistics.map((stat, index) => (
            <Card key={index}>
              <CardContent className="p-6 text-center">
                <stat.icon className="h-8 w-8 text-cv-blue mx-auto mb-3" />
                <div className="text-3xl font-bold text-cv-blue mb-2">{stat.value}</div>
                <p className="text-gray-600">{stat.label}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Mission Statement */}
        <Card>
          <CardHeader>
            <CardTitle className="text-cv-blue">A Nossa História</CardTitle>
          </CardHeader>
          <CardContent className="prose prose-gray max-w-none">
            <p>
              A Federação Cabo-verdiana de Basquetebol (FCBB) foi fundada em 1977 com a missão de 
              promover, organizar e desenvolver o basquetebol em todo o arquipélago cabo-verdiano. 
              Ao longo de mais de quatro décadas, temos sido a força motriz por trás do crescimento 
              exponencial desta modalidade no nosso país.
            </p>
            <p>
              Desde os primeiros passos hesitantes até às conquistas internacionais, a FCBB tem 
              trabalhado incansavelmente para criar uma estrutura sólida que permita aos nossos 
              atletas competir ao mais alto nível, tanto nacional como internacionalmente.
            </p>
          </CardContent>
        </Card>

        {/* Timeline */}
        <Card>
          <CardHeader>
            <CardTitle className="text-cv-blue">Marcos Históricos</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {timelineEvents.map((event, index) => (
                <div key={index} className="flex gap-4">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 bg-cv-blue text-white rounded-full flex items-center justify-center font-bold">
                      {event.year.toString().slice(-2)}
                    </div>
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <h3 className="text-lg font-semibold">{event.title}</h3>
                      <Badge className={getTypeColor(event.type)}>
                        {event.year}
                      </Badge>
                    </div>
                    <p className="text-gray-600">{event.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Legacy Section */}
        <Card>
          <CardHeader>
            <CardTitle className="text-cv-blue">O Nosso Legado</CardTitle>
          </CardHeader>
          <CardContent className="prose prose-gray max-w-none">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold text-lg mb-3">Desenvolvimento do Basquetebol</h4>
                <ul className="space-y-2">
                  <li>Criação de competições estruturadas em todas as categorias</li>
                  <li>Formação de centenas de jogadores e técnicos</li>
                  <li>Estabelecimento de programas de desenvolvimento juvenil</li>
                  <li>Promoção do basquetebol feminino</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold text-lg mb-3">Conquistas Internacionais</h4>
                <ul className="space-y-2">
                  <li>Participações consecutivas no AfroBasket</li>
                  <li>Melhor classificação: 8º lugar (2018)</li>
                  <li>Desenvolvimento de talentos para ligas internacionais</li>
                  <li>Parcerias com federações africanas e europeias</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </PageLayout>
  );
};

export default HistoriaPage;
