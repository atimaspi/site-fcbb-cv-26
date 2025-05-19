
import Header from '@/components/Header';
import Footer from '@/components/Footer';

interface PageLayoutProps {
  title: string;
  children: React.ReactNode;
}

const PageLayout = ({ title, children }: PageLayoutProps) => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow cv-container py-8">
        <h1 className="section-title">{title}</h1>
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default PageLayout;
