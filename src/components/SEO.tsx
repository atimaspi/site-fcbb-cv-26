
import { Helmet } from 'react-helmet-async';

interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string;
  image?: string;
  url?: string;
  type?: 'website' | 'article';
  author?: string;
  publishedTime?: string;
  modifiedTime?: string;
  breadcrumbs?: Array<{ name: string; url: string }>;
}

const SEO = ({ 
  title = 'Federação Cabo-verdiana de Basquetebol - FCBB',
  description = 'Site oficial da Federação Cabo-verdiana de Basquetebol com notícias, competições, seleções e mais informações sobre o basquetebol em Cabo Verde.',
  keywords = 'basquetebol, cabo verde, fcbb, federação, competições, seleções, liga nacional',
  image = '/lovable-uploads/8c0e50b0-b06a-42cf-b3fc-9a08063308b3.png',
  url = 'https://fcbb.cv',
  type = 'website',
  author,
  publishedTime,
  modifiedTime,
  breadcrumbs
}: SEOProps) => {
  const fullTitle = title.includes('FCBB') ? title : `${title} | FCBB`;
  const fullUrl = url.startsWith('http') ? url : `https://fcbb.cv${url}`;
  const fullImage = image.startsWith('http') ? image : `https://fcbb.cv${image}`;

  const organizationStructuredData = {
    "@context": "https://schema.org",
    "@type": "SportsOrganization",
    "name": "Federação Cabo-verdiana de Basquetebol",
    "alternateName": "FCBB",
    "url": "https://fcbb.cv",
    "logo": {
      "@type": "ImageObject",
      "url": fullImage,
      "width": 400,
      "height": 400
    },
    "description": description,
    "sport": "Basketball",
    "address": {
      "@type": "PostalAddress",
      "addressCountry": "CV",
      "addressLocality": "Praia",
      "addressRegion": "Santiago"
    },
    "sameAs": [
      "https://www.facebook.com/fcbb.oficial",
      "https://www.instagram.com/fcbb_oficial",
      "https://twitter.com/fcbb_oficial"
    ],
    "foundingDate": "1986",
    "memberOf": {
      "@type": "Organization",
      "name": "FIBA Africa"
    }
  };

  const websiteStructuredData = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "FCBB - Federação Cabo-verdiana de Basquetebol",
    "url": "https://fcbb.cv",
    "potentialAction": {
      "@type": "SearchAction",
      "target": "https://fcbb.cv/search?q={search_term_string}",
      "query-input": "required name=search_term_string"
    }
  };

  const breadcrumbStructuredData = breadcrumbs ? {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": breadcrumbs.map((crumb, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": crumb.name,
      "item": crumb.url.startsWith('http') ? crumb.url : `https://fcbb.cv${crumb.url}`
    }))
  } : null;

  return (
    <Helmet>
      {/* Basic Meta Tags */}
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <meta name="author" content={author || "FCBB - Federação Cabo-verdiana de Basquetebol"} />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta name="robots" content="index, follow" />
      <meta name="language" content="pt-CV" />
      <meta name="revisit-after" content="7 days" />
      <link rel="canonical" href={fullUrl} />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content={type} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={fullImage} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:url" content={fullUrl} />
      <meta property="og:site_name" content="FCBB - Federação Cabo-verdiana de Basquetebol" />
      <meta property="og:locale" content="pt_CV" />
      {publishedTime && <meta property="article:published_time" content={publishedTime} />}
      {modifiedTime && <meta property="article:modified_time" content={modifiedTime} />}
      {author && <meta property="article:author" content={author} />}

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content="@fcbb_oficial" />
      <meta name="twitter:creator" content="@fcbb_oficial" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={fullImage} />

      {/* Additional SEO */}
      <meta name="theme-color" content="#1e40af" />
      <meta name="msapplication-TileColor" content="#1e40af" />
      <meta name="msapplication-navbutton-color" content="#1e40af" />
      <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />

      {/* Structured Data */}
      <script type="application/ld+json">
        {JSON.stringify(organizationStructuredData)}
      </script>
      <script type="application/ld+json">
        {JSON.stringify(websiteStructuredData)}
      </script>
      {breadcrumbStructuredData && (
        <script type="application/ld+json">
          {JSON.stringify(breadcrumbStructuredData)}
        </script>
      )}
    </Helmet>
  );
};

export default SEO;
