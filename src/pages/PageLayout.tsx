
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Breadcrumbs from '@/components/Breadcrumbs';
import SEO from '@/components/SEO';
import ResponsiveContainer from '@/components/ui/responsive-container';
import SmoothTransition from '@/components/ui/smooth-transition';

interface PageLayoutProps {
  title: string;
  children: React.ReactNode;
  description?: string;
  keywords?: string;
  image?: string;
}

const PageLayout = ({ title, children, description, keywords, image }: PageLayoutProps) => {
  return (
    <>
      <SEO 
        title={title}
        description={description}
        keywords={keywords}
        image={image}
        url={window.location.pathname}
      />
      <div className="min-h-screen flex flex-col">
        <Header />
        <Breadcrumbs />
        <main 
          id="main-content" 
          className="flex-grow"
          role="main"
          aria-labelledby="page-title"
        >
          <ResponsiveContainer maxWidth="xl" padding="md" className="py-2">
            <SmoothTransition direction="up" duration={0.3}>
              <header className="mb-3">
                <h1 
                  id="page-title"
                  className="text-xl md:text-2xl font-bold text-cv-blue mb-1"
                >
                  {title}
                </h1>
                {description && (
                  <p className="text-base text-gray-600 max-w-3xl">
                    {description}
                  </p>
                )}
              </header>
              <section className="space-y-4">
                {children}
              </section>
            </SmoothTransition>
          </ResponsiveContainer>
        </main>
        <Footer />
      </div>
    </>
  );
};

export default PageLayout;
