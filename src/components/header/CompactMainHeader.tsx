
import { Link } from 'react-router-dom';

const CompactMainHeader = () => {
  return (
    <div className="cv-container py-4">
      <div className="flex justify-between items-center">
        <Link to="/" className="flex items-center focus-visible-cv" aria-label="FCBB">
          <img 
            src="/lovable-uploads/8c0e50b0-b06a-42cf-b3fc-9a08063308b3.png" 
            alt="FCBB" 
            className="h-12 w-auto mr-3"
            loading="eager"
          />
          <div>
            <h1 className="text-2xl font-bold text-cv-blue">FCBB</h1>
            <p className="text-sm text-cv-dark">Federação Cabo-verdiana de Basquetebol</p>
          </div>
        </Link>
        
        <div className="hidden lg:flex items-center space-x-6">
          <Link 
            to="/resultados/fiba-livestats"
            className="text-sm px-4 py-2 border border-cv-blue text-cv-blue hover:bg-cv-blue hover:text-white rounded transition-colors font-medium"
          >
            FIBA LiveStats
          </Link>
          <Link 
            to="/contacto"
            className="text-sm px-4 py-2 bg-cv-blue text-white hover:bg-blue-700 rounded transition-colors font-medium"
          >
            Contactos
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CompactMainHeader;
