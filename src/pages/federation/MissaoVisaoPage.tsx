
import PageLayout from '../PageLayout';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Target, Eye, Heart, Globe } from 'lucide-react';

const MissaoVisaoPage = () => {
  return (
    <PageLayout title="Missão e Visão">
      <div className="space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <Card className="border-l-4 border-cv-blue">
            <CardHeader>
              <CardTitle className="flex items-center text-cv-blue">
                <Target className="mr-3 h-6 w-6" />
                Nossa Missão
              </CardTitle>
            </CardHeader>
            <CardContent className="prose prose-lg">
              <p className="text-gray-700 leading-relaxed">
                Promover, desenvolver e organizar o basquetebol em Cabo Verde, garantindo 
                a excelência desportiva, a formação integral dos atletas e o crescimento 
                sustentável da modalidade em todas as ilhas do arquipélago.
              </p>
              <p className="text-gray-700 leading-relaxed mt-4">
                Trabalhamos para elevar o nível competitivo do basquetebol cabo-verdiano, 
                criando oportunidades para jovens talentos e promovendo valores como 
                fair-play, disciplina e trabalho em equipa.
              </p>
            </CardContent>
          </Card>

          <Card className="border-l-4 border-cv-red">
            <CardHeader>
              <CardTitle className="flex items-center text-cv-red">
                <Eye className="mr-3 h-6 w-6" />
                Nossa Visão
              </CardTitle>
            </CardHeader>
            <CardContent className="prose prose-lg">
              <p className="text-gray-700 leading-relaxed">
                Ser reconhecida como uma federação de referência em África, 
                posicionando Cabo Verde no cenário internacional do basquetebol 
                através da excelência organizacional e competitiva.
              </p>
              <p className="text-gray-700 leading-relaxed mt-4">
                Aspiramos a consolidar o basquetebol como uma das modalidades 
                mais praticadas e admiradas em Cabo Verde, contribuindo para 
                o desenvolvimento social e cultural do país.
              </p>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="text-center">
            <CardContent className="pt-6">
              <Heart className="mx-auto h-12 w-12 text-cv-blue mb-4" />
              <h3 className="text-lg font-semibold mb-2">Paixão pelo Desporto</h3>
              <p className="text-gray-600">
                Cultivamos o amor pelo basquetebol em todas as idades e níveis competitivos.
              </p>
            </CardContent>
          </Card>

          <Card className="text-center">
            <CardContent className="pt-6">
              <Globe className="mx-auto h-12 w-12 text-cv-red mb-4" />
              <h3 className="text-lg font-semibold mb-2">Projeção Internacional</h3>
              <p className="text-gray-600">
                Levamos o nome de Cabo Verde além fronteiras através do basquetebol.
              </p>
            </CardContent>
          </Card>

          <Card className="text-center">
            <CardContent className="pt-6">
              <Target className="mx-auto h-12 w-12 text-cv-yellow mb-4" />
              <h3 className="text-lg font-semibold mb-2">Excelência Técnica</h3>
              <p className="text-gray-600">
                Buscamos constantemente a melhoria dos padrões técnicos e organizacionais.
              </p>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="text-cv-blue">Valores Fundamentais</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="bg-cv-blue text-white rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-3">
                  <span className="font-bold text-lg">I</span>
                </div>
                <h4 className="font-semibold mb-2">Integridade</h4>
                <p className="text-sm text-gray-600">
                  Atuamos com transparência e ética em todas as nossas decisões.
                </p>
              </div>

              <div className="text-center">
                <div className="bg-cv-red text-white rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-3">
                  <span className="font-bold text-lg">R</span>
                </div>
                <h4 className="font-semibold mb-2">Respeito</h4>
                <p className="text-sm text-gray-600">
                  Valorizamos todos os intervenientes do basquetebol cabo-verdiano.
                </p>
              </div>

              <div className="text-center">
                <div className="bg-cv-yellow text-white rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-3">
                  <span className="font-bold text-lg">E</span>
                </div>
                <h4 className="font-semibold mb-2">Excelência</h4>
                <p className="text-sm text-gray-600">
                  Procuramos sempre o mais alto nível de qualidade em tudo o que fazemos.
                </p>
              </div>

              <div className="text-center">
                <div className="bg-cv-blue text-white rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-3">
                  <span className="font-bold text-lg">U</span>
                </div>
                <h4 className="font-semibold mb-2">União</h4>
                <p className="text-sm text-gray-600">
                  Trabalhamos em conjunto para o desenvolvimento da modalidade.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </PageLayout>
  );
};

export default MissaoVisaoPage;
