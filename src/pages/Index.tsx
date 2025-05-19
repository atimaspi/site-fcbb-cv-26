
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import NewsSection from '@/components/NewsSection';
import CompetitionsSection from '@/components/CompetitionsSection';
import TeamsSection from '@/components/TeamsSection';
import PartnersSection from '@/components/PartnersSection';
import Footer from '@/components/Footer';

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main>
        <Hero />
        <NewsSection />
        <CompetitionsSection />
        <TeamsSection />
        <PartnersSection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
