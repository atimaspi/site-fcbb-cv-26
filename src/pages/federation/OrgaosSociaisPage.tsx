
import PageLayout from '../PageLayout';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Users, Calendar, FileText, Gavel } from 'lucide-react';

const OrgaosSociaisPage = () => {
  const assembleia = [
    { name: "Dr. João Pereira", role: "Presidente da Mesa", mandate: "2021-2025" },
    { name: "Dra. Maria Santos", role: "Secretária", mandate: "2021-2025" },
    { name: "Eng. Carlos Monteiro", role: "Vice-Presidente", mandate: "2021-2025" }
  ];

  const conselho = [
    { name: "Dr. António Silva", role: "Presidente", mandate: "2021-2025" },
    { name: "Dra. Ana Rodrigues", role: "Vogal", mandate: "2021-2025" },
    { name: "Dr. Manuel Costa", role: "Vogal", mandate: "2021-2025" }
  ];

  const comissoes = [
    {
      name: "Comissão Técnica",
      president: "Prof. Pedro Gomes",
      members: ["João Silva", "Maria Tavares", "Carlos Mendes"],
      responsibilities: ["Desenvolvimento técnico", "Formação de treinadores", "Regulamentos técnicos"]
    },
    {
      name: "Comissão de Arbitragem",
      president: "Árbitro Internacional José Santos",
      members: ["Ana Pereira", "Miguel Fonseca", "Luísa Correia"],
      responsibilities: ["Formação de árbitros", "Nomeações para jogos", "Avaliação de desempenho"]
    },
    {
      name: "Comissão Disciplinar",
      president: "Dr. Fernando Lopes",
      members: ["Dra. Teresa Alves", "Dr. Rui Martins"],
      responsibilities: ["Processos disciplinares", "Aplicação de sanções", "Recursos"]
    },
    {
      name: "Comissão Médica",
      president: "Dr. Paulo Rocha",
      members: ["Dra. Sofia Lima", "Fisioterapeuta Marco António"],
      responsibilities: ["Controlo antidoping", "Medicina desportiva", "Prevenção de lesões"]
    }
  ];

  const proximas_reunioes = [
    {
      orgao: "Assembleia Geral",
      data: "15 de Julho de 2024",
      tipo: "Ordinária",
      agenda: ["Aprovação de contas", "Relatório de atividades", "Plano para nova época"]
    },
    {
      orgao: "Conselho de Administração",
      data: "30 de Junho de 2024",
      tipo: "Extraordinária",
      agenda: ["Calendário competitivo", "Parcerias estratégicas", "Infraestruturas"]
    }
  ];

  return (
    <PageLayout title="Órgãos Sociais">
      <div className="space-y-8">
        {/* Assembleia Geral */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center text-cv-blue">
              <Users className="mr-2 h-5 w-5" />
              Assembleia Geral
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600 mb-6">
              A Assembleia Geral é o órgão supremo da FCBB, constituída por todos os clubes filiados 
              e responsável pelas decisões mais importantes da federação.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {assembleia.map((member, index) => (
                <Card key={index} className="border">
                  <CardContent className="p-4 text-center">
                    <h3 className="font-semibold text-lg">{member.name}</h3>
                    <p className="text-cv-blue font-medium">{member.role}</p>
                    <Badge variant="outline" className="mt-2">
                      {member.mandate}
                    </Badge>
                  </CardContent>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Conselho de Administração */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center text-cv-blue">
              <Gavel className="mr-2 h-5 w-5" />
              Conselho de Administração
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600 mb-6">
              O Conselho de Administração é responsável pela gestão executiva da federação 
              e pela implementação das decisões da Assembleia Geral.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {conselho.map((member, index) => (
                <Card key={index} className="border">
                  <CardContent className="p-4 text-center">
                    <h3 className="font-semibold text-lg">{member.name}</h3>
                    <p className="text-cv-blue font-medium">{member.role}</p>
                    <Badge variant="outline" className="mt-2">
                      {member.mandate}
                    </Badge>
                  </CardContent>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Comissões Especializadas */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center text-cv-blue">
              <FileText className="mr-2 h-5 w-5" />
              Comissões Especializadas
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {comissoes.map((comissao, index) => (
                <Card key={index} className="border">
                  <CardHeader>
                    <CardTitle className="text-lg">{comissao.name}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div>
                        <h4 className="font-semibold text-sm text-gray-700">Presidente</h4>
                        <p className="text-cv-blue font-medium">{comissao.president}</p>
                      </div>
                      
                      <div>
                        <h4 className="font-semibold text-sm text-gray-700">Membros</h4>
                        <ul className="text-sm text-gray-600">
                          {comissao.members.map((member, idx) => (
                            <li key={idx}>• {member}</li>
                          ))}
                        </ul>
                      </div>
                      
                      <div>
                        <h4 className="font-semibold text-sm text-gray-700">Responsabilidades</h4>
                        <ul className="text-sm text-gray-600">
                          {comissao.responsibilities.map((resp, idx) => (
                            <li key={idx}>• {resp}</li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Próximas Reuniões */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center text-cv-blue">
              <Calendar className="mr-2 h-5 w-5" />
              Próximas Reuniões
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {proximas_reunioes.map((reuniao, index) => (
                <Card key={index} className="border">
                  <CardContent className="p-4">
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <h3 className="font-semibold text-lg">{reuniao.orgao}</h3>
                        <div className="flex items-center gap-4 mt-2 text-sm text-gray-600">
                          <span className="flex items-center">
                            <Calendar className="w-4 h-4 mr-1" />
                            {reuniao.data}
                          </span>
                          <Badge variant="outline">
                            {reuniao.tipo}
                          </Badge>
                        </div>
                      </div>
                    </div>
                    <div className="mt-4">
                      <h4 className="font-semibold text-sm text-gray-700 mb-2">Ordem de Trabalhos</h4>
                      <ul className="text-sm text-gray-600">
                        {reuniao.agenda.map((item, idx) => (
                          <li key={idx}>• {item}</li>
                        ))}
                      </ul>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Informações Adicionais */}
        <Card>
          <CardHeader>
            <CardTitle>Como Participar</CardTitle>
          </CardHeader>
          <CardContent className="prose prose-gray max-w-none">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold text-lg mb-3">Direitos dos Clubes</h4>
                <ul className="space-y-2">
                  <li>Participar na Assembleia Geral</li>
                  <li>Votar nas eleições dos órgãos sociais</li>
                  <li>Apresentar propostas e moções</li>
                  <li>Aceder a documentos oficiais</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold text-lg mb-3">Processo de Candidatura</h4>
                <ul className="space-y-2">
                  <li>Submissão de candidaturas até 30 dias antes das eleições</li>
                  <li>Apresentação de programa de ação</li>
                  <li>Campanha eleitoral de 15 dias</li>
                  <li>Votação secreta na Assembleia Geral</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </PageLayout>
  );
};

export default OrgaosSociaisPage;
