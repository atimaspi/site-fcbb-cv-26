
import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Home } from 'lucide-react';

const Breadcrumbs = () => {
  const location = useLocation();
  const pathnames = location.pathname.split('/').filter((x) => x);

  const breadcrumbNameMap: { [key: string]: string } = {
    'federacao': 'Federação',
    'historia': 'História',
    'missao-visao': 'Missão e Visão',
    'direcao': 'Direção',
    'orgaos-sociais': 'Órgãos Sociais',
    'estatutos': 'Estatutos',
    'contactos': 'Contactos',
    'competicoes': 'Competições',
    'liga-nacional': 'Liga Nacional',
    'nacional-masculino': 'Nacional Masculino',
    'taca-de-cabo-verde': 'Taça de Cabo Verde',
    'super-taca': 'Super Taça',
    'competicoes-regionais': 'Competições Regionais',
    'calendario': 'Calendário',
    'classificacoes': 'Classificações',
    'resultados': 'Resultados',
    'selecoes': 'Seleções',
    'masculina': 'Masculina',
    'senior-masculina': 'Sénior Masculina',
    'feminina': 'Feminina',
    'senior-feminina': 'Sénior Feminina',
    'jovens': 'Jovens',
    'estatisticas': 'Estatísticas',
    'arbitragem': 'Arbitragem',
    'clubes': 'Clubes',
    'formacao': 'Formação',
    'eventos': 'Eventos',
    'transmissoes': 'Transmissões',
    'transferencias': 'Transferências',
    'fiba-livestats': 'FIBA LiveStats',
    'videos': 'Vídeos',
    'imprensa': 'Imprensa',
    'noticias': 'Notícias',
    'galeria': 'Galeria',
    'area-reservada': 'Área Reservada',
    'contacto': 'Contacto',
    'ao-vivo': 'Ao Vivo'
  };

  if (pathnames.length === 0) {
    return null;
  }

  return (
    <div className="cv-container py-2">
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link to="/" className="flex items-center">
                <Home className="h-4 w-4" />
              </Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          {pathnames.map((pathname, index) => {
            const routeTo = `/${pathnames.slice(0, index + 1).join('/')}`;
            const isLast = index === pathnames.length - 1;
            const name = breadcrumbNameMap[pathname] || pathname;

            return (
              <React.Fragment key={routeTo}>
                <BreadcrumbItem>
                  {isLast ? (
                    <BreadcrumbPage>{name}</BreadcrumbPage>
                  ) : (
                    <BreadcrumbLink asChild>
                      <Link to={routeTo}>{name}</Link>
                    </BreadcrumbLink>
                  )}
                </BreadcrumbItem>
                {!isLast && <BreadcrumbSeparator />}
              </React.Fragment>
            );
          })}
        </BreadcrumbList>
      </Breadcrumb>
    </div>
  );
};

export default Breadcrumbs;
