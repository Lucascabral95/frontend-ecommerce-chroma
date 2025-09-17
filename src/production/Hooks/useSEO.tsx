import { UseSEOProps } from "@/Insfraestructure/Interfaces/SEO/seo.interface";
import { SEO_DEFAULTS } from "../config/seo.config";

export const useSEO = ({
  title,
  description,
  path = "",
  image,
  keywords,
  type = "website",
  noIndex = false,
}: UseSEOProps) => {
  const canonical = `${SEO_DEFAULTS.baseUrl}${path}`;

  const absoluteImage = image
    ? image.startsWith("http")
      ? image
      : `${SEO_DEFAULTS.baseUrl}${image}`
    : SEO_DEFAULTS.defaultImage;

  const getSchema = () => {
    const baseSchema = {
      "@context": "https://schema.org",
      "@type": type === "article" ? "Article" : "WebPage",
      name: title,
      description: description,
      image: absoluteImage,
      url: canonical,
    };

    return baseSchema;
  };

  return {
    title,
    description,
    keywords,
    canonical,
    image: absoluteImage,
    type,
    schemaMarkup: getSchema(),
    siteName: SEO_DEFAULTS.siteName,
    twitterHandle: SEO_DEFAULTS.twitterHandle,
    noIndex,
  };
};
