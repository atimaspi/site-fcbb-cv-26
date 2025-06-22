
import FCBBHeader from '@/components/header/FCBBHeader';
import Footer from '@/components/Footer';
import SEO from '@/components/SEO';

interface FCBBLayoutProps {
  title?: string;
  children: React.ReactNode;
  description?: string;
  keywords?: string;
  image?: string;
  showHeader?: boolean;
  showFooter?: boolean;
}

const FCBBLayout = ({ 
  title, 
  children, 
  description, 
  keywords, 
  image,
  showHeader = true,
  showFooter = true
}: FCBBLayoutProps) => {
  return (
    <>
      {title && (
        <SEO 
          title={title}
          description={description}
          keywords={keywords}
          image={image}
          url={window.location.pathname}
        />
      )}
      <div className="min-h-screen flex flex-col bg-gradient-to-br from-blue-50 via-white to-red-50">
        {showHeader && <FCBBHeader />}
        
        <main className={`flex-grow ${showHeader ? 'pt-20' : ''}`}>
          {children}
        </main>

        {showFooter && <Footer />}
      </div>
    </>
  );
};

export default FCBBLayout;
