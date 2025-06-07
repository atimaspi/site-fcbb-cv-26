
import PageLayout from '../PageLayout';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Download, FileText, Scale, Users, Gavel, Calendar } from 'lucide-react';

const EstatutosPage = () => {
  const documentos = [
    {
      title: "Estatutos da FCBB",
      description: "Documento fundacional que rege o funcionamento da federação",
      version: "Versão 3.2 - Aprovada em Assembleia Geral de 15/03/2023",
      size: "2.1 MB",
      downloadUrl: "#"
    },
    {
      title: "Regulamento Geral das Competições",
      description: "Normas que regem todas as competições organizadas pela FCBB",
      version: "Época 2024/25",
      size: "1.8 MB", 
      downloadUrl: "#"
    },
    {
      title: "Regulamento Disciplinar",
      description: "Código disciplinar aplicável a todos os intervenientes",
      version: "Atualização de Janeiro 2024",
      size: "945 KB",
      downloadUrl: "#"
    },
    {
      title: "Regulamento de Transferências",
      description: "Normas para transferências de jogadores entre clubes",
      version: "Época 2024/25",
      size: "756 KB",
      downloadUrl: "#"
    }
  ];

  const capitulos = [
    {
      numero: "I",
      titulo: "Disposições Gerais",
      artigos: ["Art. 1º - Denominação", "Art. 2º - Sede", "Art. 3º - Duração", "Art. 4º - Fins"]
    },
    {
      numero: "II", 
      titulo: "Dos Associados",
      artigos: ["Art. 5º - Categorias", "Art. 6º - Admissão", "Art. 7º - Direitos", "Art. 8º - Deveres"]
    },
    {
      numero: "III",
      titulo: "Dos Órgãos Sociais",
      artigos: ["Art. 9º - Órgãos", "Art. 10º - Assembleia Geral", "Art. 11º - Conselho de Administração", "Art. 12º - Conselho Fiscal"]
    },
    {
      numero: "IV",
      titulo: "Do Regime Financeiro",
      artigos: ["Art. 13º - Receitas", "Art. 14º - Despesas", "Art. 15º - Orçamento", "Art. 16º - Contas"]
    },
    {
      numero: "V",
      titulo: "Das Disposições Finais",
      artigos: ["Art. 17º - Alterações", "Art. 18º - Dissolução", "Art. 19º - Entrada em vigor"]
    }
  ];

  const alteracoes = [
    {
      data: "15/03/2023",
      versao: "3.2",
      alteracoes: ["Atualização dos procedimentos eleitorais", "Revisão do regime disciplinar", "Clarificação das competências dos órgãos"]
    },
    {
      data: "20/11/2021", 
      versao: "3.1",
      alteracoes: ["Inclusão de novos órgãos especializados", "Atualização das quotas de filiação", "Revisão do processo de admissão de clubes"]
    },
    {
      data: "10/07/2019",
      versao: "3.0",
      alteracoes: ["Reforma estrutural dos estatutos", "Harmonização com legislação desportiva", "Modernização dos procedimentos"]
    }
  ];

  return (
    <PageLayout title="Estatutos e Regulamentos">
      <Tabs defaultValue="documentos" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="documentos">Documentos</TabsTrigger>
          <TabsTrigger value="estatutos">Estatutos</TabsTrigger>
          <TabsTrigger value="regulamentos">Regulamentos</TabsTrigger>
          <TabsTrigger value="alteracoes">Alterações</TabsTrigger>
        </TabsList>

        <TabsContent value="documentos" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center text-cv-blue">
                <FileText className="mr-2 h-5 w-5" />
                Documentos Oficiais
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {documentos.map((doc, index) => (
                  <Card key={index} className="border hover:shadow-lg transition-shadow">
                    <CardContent className="p-6">
                      <div className="text-center mb-4">
                        <div className="w-16 h-16 bg-cv-blue text-white rounded-full flex items-center justify-center mx-auto mb-3">
                          <FileText className="w-8 h-8" />
                        </div>
                        <h3 className="font-semibold text-lg mb-2">{doc.title}</h3>
                        <p className="text-gray-600 text-sm mb-2">{doc.description}</p>
                        <p className="text-xs text-gray-500 mb-4">{doc.version}</p>
                      </div>
                      
                      <div className="flex justify-between items-center text-sm text-gray-500 mb-4">
                        <span>{doc.size}</span>
                        <span>PDF</span>
                      </div>
                      
                      <Button className="w-full" size="sm">
                        <Download className="w-4 h-4 mr-2" />
                        Descarregar
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="estatutos" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center text-cv-blue">
                <Scale className="mr-2 h-5 w-5" />
                Estrutura dos Estatutos
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {capitulos.map((capitulo, index) => (
                  <Card key={index} className="border">
                    <CardContent className="p-4">
                      <h3 className="font-semibold text-lg mb-3">
                        Capítulo {capitulo.numero} - {capitulo.titulo}
                      </h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                        {capitulo.artigos.map((artigo, idx) => (
                          <div key={idx} className="text-sm text-gray-600 p-2 bg-gray-50 rounded">
                            {artigo}
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Principais Disposições</CardTitle>
            </CardHeader>
            <CardContent className="prose prose-gray max-w-none">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold text-lg mb-3 flex items-center">
                    <Users className="w-5 h-5 mr-2" />
                    Filiação
                  </h4>
                  <ul className="space-y-2 text-sm">
                    <li>Clubes e associações regionais podem filiar-se</li>
                    <li>Processo de candidatura com documentação específica</li>
                    <li>Pagamento de quotas anuais obrigatório</li>
                    <li>Cumprimento dos regulamentos federativos</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold text-lg mb-3 flex items-center">
                    <Gavel className="w-5 h-5 mr-2" />
                    Órgãos Sociais
                  </h4>
                  <ul className="space-y-2 text-sm">
                    <li>Assembleia Geral como órgão supremo</li>
                    <li>Conselho de Administração executivo</li>
                    <li>Conselho Fiscal para controlo financeiro</li>
                    <li>Mandatos de 4 anos com possibilidade de reeleição</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="regulamentos" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-cv-blue">Regulamentos Específicos</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card className="border">
                  <CardHeader>
                    <CardTitle className="text-lg">Competições</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2 text-sm">
                      <li>• Calendário e formato das competições</li>
                      <li>• Critérios de participação</li>
                      <li>• Sistemas de classificação</li>
                      <li>• Normas técnicas e arbitragem</li>
                    </ul>
                  </CardContent>
                </Card>

                <Card className="border">
                  <CardHeader>
                    <CardTitle className="text-lg">Disciplinar</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2 text-sm">
                      <li>• Infrações e sanções disciplinares</li>
                      <li>• Procedimentos de processo disciplinar</li>
                      <li>• Direitos de defesa e recurso</li>
                      <li>• Suspensões e multas</li>
                    </ul>
                  </CardContent>
                </Card>

                <Card className="border">
                  <CardHeader>
                    <CardTitle className="text-lg">Transferências</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2 text-sm">
                      <li>• Períodos de transferência</li>
                      <li>• Documentação necessária</li>
                      <li>• Taxas e procedimentos</li>
                      <li>• Transferências internacionais</li>
                    </ul>
                  </CardContent>
                </Card>

                <Card className="border">
                  <CardHeader>
                    <CardTitle className="text-lg">Licenciamento</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2 text-sm">
                      <li>• Licenças de jogadores e treinadores</li>
                      <li>• Renovações anuais</li>
                      <li>• Controlo médico-desportivo</li>
                      <li>• Seguro desportivo obrigatório</li>
                    </ul>
                  </CardContent>
                </Card>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="alteracoes" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center text-cv-blue">
                <Calendar className="mr-2 h-5 w-5" />
                Histórico de Alterações
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {alteracoes.map((alteracao, index) => (
                  <Card key={index} className="border">
                    <CardContent className="p-4">
                      <div className="flex justify-between items-start mb-3">
                        <div>
                          <h3 className="font-semibold text-lg">Versão {alteracao.versao}</h3>
                          <p className="text-gray-600 text-sm">{alteracao.data}</p>
                        </div>
                        <Button variant="outline" size="sm">
                          <Download className="w-4 h-4 mr-1" />
                          Ver Alterações
                        </Button>
                      </div>
                      <div>
                        <h4 className="font-medium mb-2">Principais Modificações:</h4>
                        <ul className="space-y-1">
                          {alteracao.alteracoes.map((alt, idx) => (
                            <li key={idx} className="text-sm text-gray-600">• {alt}</li>
                          ))}
                        </ul>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Processo de Alteração dos Estatutos</CardTitle>
            </CardHeader>
            <CardContent className="prose prose-gray max-w-none">
              <ol className="space-y-3">
                <li><strong>Proposta:</strong> Qualquer órgão social ou 1/3 dos clubes filiados pode propor alterações</li>
                <li><strong>Análise:</strong> Proposta é analisada pela Comissão de Estatutos e Regulamentos</li>
                <li><strong>Parecer:</strong> Emissão de parecer fundamentado sobre a proposta</li>
                <li><strong>Convocatória:</strong> Convocação de Assembleia Geral Extraordinária</li>
                <li><strong>Discussão:</strong> Debate da proposta em Assembleia Geral</li>
                <li><strong>Votação:</strong> Aprovação por maioria qualificada de 2/3 dos presentes</li>
                <li><strong>Publicação:</strong> Publicação das alterações no site oficial</li>
              </ol>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </PageLayout>
  );
};

export default EstatutosPage;
