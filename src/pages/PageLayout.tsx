
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Breadcrumbs from '@/components/Breadcrumbs';

interface PageLayoutProps {
  title: string;
  children: React.ReactNode;
  description?: string;
}

const PageLayout = ({ title, children, description }: PageLayoutProps) => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <Breadcrumbs />
      <main 
        id="main-content" 
        className="flex-grow cv-container py-8"
        role="main"
        aria-labelledby="page-title"
      >
        <header className="mb-6">
          <h1 
            id="page-title"
            className="section-title text-2xl md:text-3xl font-bold text-cv-blue mb-2"
          >
            {title}
          </h1>
          {description && (
            <p className="text-lg text-gray-600 max-w-3xl">
              {description}
            </p>
          )}
        </header>
        <section className="content-spacing">
          {children}
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default PageLayout;
