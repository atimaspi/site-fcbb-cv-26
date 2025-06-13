
import PageLayout from './PageLayout';
import CompetitionManagement from '@/components/CompetitionManagement';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Trophy, Calendar, Users, Target, Download, FileText } from 'lucide-react';

const CompeticoesPage = () => {
  const competitionCategories = [
    {
      title: "Competições Nacionais",
      competitions: [
        {
          name: "Liga Nacional Masculina",
          status: "Em Curso",
          participants: 12,
          format: "Todos contra todos (2 voltas)",
          duration: "Outubro 2024 - Abril 2025"
        },
        {
          name: "Liga Nacional Feminina", 
          status: "Em Curso",
          participants: 8,
          format: "Todos contra todos (2 voltas)",
          duration: "Novembro 2024 - Maio 2025"
        },
        {
          name: "Taça de Cabo Verde",
          status: "Fase Final",
          participants: 32,
          format: "Eliminação direta",
          duration: "Dezembro 2024 - Junho 2025"
        },
        {
          name: "Super Taça",
          status: "Programada",
          participants: 2,
          format: "Jogo único",
          duration: "Setembro 2025"
        }
      ]
    },
    {
      title: "Competições Regionais",
      competitions: [
        {
          name: "Campeonato Regional Norte",
          status: "Concluído",
          participants: 8,
          format: "Fase de grupos + Playoffs",
          duration: "Março - Julho 2024"
        },
        {
          name: "Campeonato Regional Centro",
          status: "Concluído", 
          participants: 6,
          format: "Todos contra todos",
          duration: "Abril - Agosto 2024"
        },
        {
          name: "Campeonato Regional Sul",
          status: "Concluído",
          participants: 10,
          format: "Fase de grupos + Playoffs",
          duration: "Maio - Setembro 2024"
        }
      ]
    },
    {
      title: "Competições de Formação",
      competitions: [
        {
          name: "Campeonato Nacional Sub-18 Masculino",
          status: "Programado",
          participants: 16,
          format: "Fase de grupos + Eliminatórias",
          duration: "Janeiro - Março 2025"
        },
        {
          name: "Campeonato Nacional Sub-18 Feminino",
          status: "Programado",
          participants: 12,
          format: "Fase de grupos + Eliminatórias", 
          duration: "Fevereiro - Abril 2025"
        },
        {
          name: "Campeonato Nacional Sub-16",
          status: "Programado",
          participants: 20,
          format: "Torneio concentrado",
          duration: "Julho 2025"
        }
      ]
    }
  ];

  const documents = [
    {
      name: "Regulamento Geral das Competições",
      type: "PDF",
      size: "2.3 MB",
      updated: "2024-09-15"
    },
    {
      name: "Regulamento Disciplinar",
      type: "PDF", 
      size: "1.8 MB",
      updated: "2024-08-20"
    },
    {
      name: "Normas de Arbitragem",
      type: "PDF",
      size: "1.2 MB", 
      updated: "2024-10-01"
    },
    {
      name: "Formulário de Inscrição",
      type: "DOCX",
      size: "85 KB",
      updated: "2024-09-01"
    }
  ];

  return (
    <PageLayout 
      title="Competições"
      description="Acompanhe todas as competições de basquetebol organizadas pela FCBB"
    >
      <div className="space-y-8">
        {/* Sistema de gestão de competições */}
        <CompetitionManagement />
        
        {/* Todas as competições por categoria */}
        <div className="space-y-6">
          {competitionCategories.map((category, categoryIndex) => (
            <Card key={categoryIndex}>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Trophy className="w-5 h-5 mr-2 text-cv-blue" />
                  {category.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {category.competitions.map((comp, index) => (
                    <Card key={index} className="border border-gray-200 hover:shadow-lg transition-shadow">
                      <CardHeader className="pb-3">
                        <div className="flex items-center justify-between">
                          <CardTitle className="text-lg">{comp.name}</CardTitle>
                          <Badge 
                            variant={
                              comp.status === "Em Curso" ? "default" :
                              comp.status === "Concluído" ? "secondary" : "outline"
                            }
                          >
                            {comp.status}
                          </Badge>
                        </div>
                      </CardHeader>
                      <CardContent className="space-y-3">
                        <div className="space-y-2 text-sm">
                          <div className="flex items-center">
                            <Users className="w-4 h-4 mr-2 text-gray-500" />
                            <span>{comp.participants} equipas</span>
                          </div>
                          <div className="flex items-center">
                            <Target className="w-4 h-4 mr-2 text-gray-500" />
                            <span>{comp.format}</span>
                          </div>
                          <div className="flex items-center">
                            <Calendar className="w-4 h-4 mr-2 text-gray-500" />
                            <span>{comp.duration}</span>
                          </div>
                        </div>
                        <Button variant="outline" className="w-full mt-3">
                          Ver Detalhes
                        </Button>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Calendário de Competições */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Calendar className="w-5 h-5 mr-2 text-cv-blue" />
              Calendário de Competições 2024/2025
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <div className="p-4 bg-blue-50 rounded-lg">
                <h4 className="font-semibold text-blue-900 mb-2">Outubro - Dezembro 2024</h4>
                <ul className="text-sm space-y-1 text-blue-800">
                  <li>• Início Liga Nacional Masculina</li>
                  <li>• Início Liga Nacional Feminina</li>
                  <li>• 1ª Fase Taça de Cabo Verde</li>
                </ul>
              </div>
              <div className="p-4 bg-green-50 rounded-lg">
                <h4 className="font-semibold text-green-900 mb-2">Janeiro - Março 2025</h4>
                <ul className="text-sm space-y-1 text-green-800">
                  <li>• Campeonatos Sub-18</li>
                  <li>• Meias-finais Taça CV</li>
                  <li>• Playoffs Liga Nacional</li>
                </ul>
              </div>
              <div className="p-4 bg-orange-50 rounded-lg">
                <h4 className="font-semibold text-orange-900 mb-2">Abril - Junho 2025</h4>
                <ul className="text-sm space-y-1 text-orange-800">
                  <li>• Finais Liga Nacional</li>
                  <li>• Final Taça de Cabo Verde</li>
                  <li>• Campeonatos Sub-16</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Documentos e Regulamentos */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <FileText className="w-5 h-5 mr-2 text-cv-blue" />
              Documentos e Regulamentos
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {documents.map((doc, index) => (
                <div key={index} className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50">
                  <div className="flex items-center space-x-3">
                    <FileText className="w-5 h-5 text-gray-500" />
                    <div>
                      <h4 className="font-medium">{doc.name}</h4>
                      <p className="text-sm text-gray-500">
                        {doc.type} • {doc.size} • Atualizado em {doc.updated}
                      </p>
                    </div>
                  </div>
                  <Button variant="outline" size="sm">
                    <Download className="w-4 h-4 mr-1" />
                    Download
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Informações Importantes */}
        <Card className="bg-blue-50 border-blue-200">
          <CardContent className="p-6">
            <h3 className="font-semibold text-blue-900 mb-3">Informações Importantes</h3>
            <div className="space-y-2 text-blue-800 text-sm">
              <p>• As inscrições para as competições da época 2025/2026 abrem em Julho de 2025</p>
              <p>• Todos os clubes devem estar em situação regular para participar nas competições</p>
              <p>• Os regulamentos podem ser atualizados durante a época conforme necessário</p>
              <p>• Para dúvidas sobre inscrições, contacte o Departamento de Competições da FCBB</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </PageLayout>
  );
};

export default CompeticoesPage;
