
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Breadcrumbs from '@/components/Breadcrumbs';

interface PageLayoutProps {
  title: string;
  children: React.ReactNode;
}

const PageLayout = ({ title, children }: PageLayoutProps) => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <Breadcrumbs />
      <main className="flex-grow cv-container py-8">
        <h1 className="section-title text-2xl md:text-3xl font-bold text-cv-blue mb-6">{title}</h1>
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default PageLayout;
