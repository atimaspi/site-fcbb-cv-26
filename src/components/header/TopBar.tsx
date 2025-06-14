
import { Search, Lock } from 'lucide-react';
import { Link } from 'react-router-dom';
import { AccessibleButton } from '@/components/ui/accessible-button';

const TopBar = () => {
  return (
    <div className="bg-cv-blue text-white">
      <div className="cv-container">
        <div className="flex justify-between items-center py-2 text-sm">
          <div className="flex items-center space-x-4">
            <span aria-label="Ranking FIBA atual">FIBA Ranking: #52 (Masculino) | #78 (Feminino)</span>
          </div>
          <div className="flex items-center space-x-4">
            <AccessibleButton 
              variant="ghost"
              size="sm"
              className="flex items-center gap-1 hover:text-cv-yellow text-white h-auto p-1"
              ariaLabel="Pesquisar no site"
              description="Abrir pesquisa"
              icon={<Search size={14} />}
            >
              Pesquisar
            </AccessibleButton>
            <Link 
              to="?lang=pt" 
              className="hover:text-cv-yellow focus-visible-cv transition-colors"
              aria-label="Alterar idioma para Português"
              title="Português"
            >
              PT
            </Link>
            <Link 
              to="?lang=en" 
              className="hover:text-cv-yellow focus-visible-cv transition-colors"
              aria-label="Change language to English"
              title="English"
            >
              EN
            </Link>
            <Link 
              to="/area-reservada" 
              className="flex items-center gap-1 hover:text-cv-yellow focus-visible-cv transition-colors"
              aria-label="Aceder à área reservada"
              title="Área Reservada"
            >
              <Lock size={14} aria-hidden="true" />
              Área Reservada
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TopBar;
