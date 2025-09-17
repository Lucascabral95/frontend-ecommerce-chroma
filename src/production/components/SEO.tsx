"use client";
import { Helmet } from "react-helmet-async";

interface SEOProps {
  title: string;
  description: string;
  keywords?: string;
  canonical?: string;
  image?: string;
  type?: string;
  siteName?: string;
  twitterHandle?: string;
  schemaMarkup?: Record<string, any> | null;
}

const SEO: React.FC<SEOProps> = ({
  title,
  description,
  keywords,
  canonical,
  image,
  type,
  siteName,
  twitterHandle,
  schemaMarkup,
}) => {
  return (
    <Helmet>
      <title>
        {title} | {siteName}
      </title>
      <meta name="description" content={description} />
      {keywords && <meta name="keywords" content={keywords} />}

      {canonical && <link rel="canonical" href={canonical} />}

      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content={type} />
      <meta property="og:site_name" content={siteName} />
      {image && <meta property="og:image" content={image} />}
      {canonical && <meta property="og:url" content={canonical} />}

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content={twitterHandle} />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      {image && <meta name="twitter:image" content={image} />}

      {schemaMarkup && (
        <script type="application/ld+json">
          {JSON.stringify(schemaMarkup)}
        </script>
      )}
    </Helmet>
  );
};

export default SEO;
