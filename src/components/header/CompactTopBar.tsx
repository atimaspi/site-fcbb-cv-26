
import { Search, Lock } from 'lucide-react';
import { Link } from 'react-router-dom';

const CompactTopBar = () => {
  return (
    <div className="bg-cv-blue text-white py-0.5">
      <div className="cv-container">
        <div className="flex justify-between items-center text-xs">
          <span className="font-medium text-xs">FIBA Ranking: #52 (Masculino) | #78 (Feminino)</span>
          <div className="flex items-center space-x-2">
            <button className="hover:text-cv-yellow p-0.5 flex items-center gap-1 text-xs" aria-label="Pesquisar">
              <Search size={10} />
              <span className="text-xs">Pesquisar</span>
            </button>
            <Link to="?lang=pt" className="hover:text-cv-yellow font-medium text-xs">PT</Link>
            <Link to="?lang=en" className="hover:text-cv-yellow font-medium text-xs">EN</Link>
            <Link to="/area-reservada" className="flex items-center gap-1 hover:text-cv-yellow font-medium text-xs">
              <Lock size={10} />
              <span className="text-xs">Área Reservada</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompactTopBar;
