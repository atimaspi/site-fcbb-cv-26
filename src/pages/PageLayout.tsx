
import FCBBLayout from '@/components/layout/FCBBLayout';
import Breadcrumbs from '@/components/Breadcrumbs';
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
  const breadcrumbs = [
    { name: 'Início', url: '/' },
    { name: title, url: window.location.pathname }
  ];

  return (
    <FCBBLayout 
      title={title} 
      description={description} 
      keywords={keywords} 
      image={image}
    >
      <div className="bg-gradient-to-b from-blue-50 to-white min-h-screen">
        <Breadcrumbs />
        <main 
          id="main-content" 
          className="pb-16"
          role="main"
          aria-labelledby="page-title"
        >
          <ResponsiveContainer maxWidth="xl" padding="md" className="py-8">
            <SmoothTransition direction="up" duration={0.3}>
              <header className="mb-8 text-center">
                <h1 
                  id="page-title"
                  className="text-3xl md:text-4xl font-bold text-cv-blue mb-4"
                >
                  {title}
                </h1>
                {description && (
                  <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                    {description}
                  </p>
                )}
              </header>
              <section className="space-y-8" aria-label={`Conteúdo da página ${title}`}>
                {children}
              </section>
            </SmoothTransition>
          </ResponsiveContainer>
        </main>
      </div>
    </FCBBLayout>
  );
};

export default PageLayout;
