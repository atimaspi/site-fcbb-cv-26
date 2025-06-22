
import { Trophy, Users, Calendar } from 'lucide-react';

const QuickStatsBar = () => {
  const quickStats = [
    { icon: Trophy, label: "Clubes Licenciados", value: "24", color: "bg-cv-red" },
    { icon: Users, label: "Atletas Federados", value: "1,250+", color: "bg-cv-blue" },
    { icon: Calendar, label: "Jogos por Época", value: "180+", color: "bg-cv-yellow" }
  ];

  return (
    <>
      {/* Quick Stats Bar */}
      <div className="bg-cv-blue text-white py-4 md:py-6">
        <div className="cv-container">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            {quickStats.map((stat, index) => (
              <div key={index} className="flex items-center justify-center md:justify-start space-x-3 group hover:scale-105 transition-transform duration-200">
                <div className={`${stat.color} p-2 md:p-3 rounded-full flex-shrink-0 group-hover:rotate-12 transition-transform duration-200`}>
                  <stat.icon className="h-4 w-4 md:h-6 md:w-6 text-white" />
                </div>
                <div>
                  <div className="text-xl md:text-2xl font-bold">{stat.value}</div>
                  <div className="text-xs md:text-sm opacity-90">{stat.label}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Live Results Ticker */}
      <div className="bg-cv-dark text-white py-2 md:py-3 overflow-hidden">
        <div className="cv-container">
          <div className="flex items-center">
            <span className="bg-cv-red px-2 md:px-3 py-1 text-xs md:text-sm font-bold rounded mr-3 md:mr-4 flex-shrink-0 animate-pulse">
              AO VIVO
            </span>
            <div className="flex-1 overflow-hidden">
              <div className="animate-scroll-left whitespace-nowrap">
                <span className="text-xs md:text-sm">
                  ABC 78 - 65 Seven Stars • Académica 72 - 68 Inter • Spartak 85 - 79 Unidos • Mindelo 91 - 88 Praia
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default QuickStatsBar;
