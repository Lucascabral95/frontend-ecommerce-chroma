export interface UseSEOProps {
  title: string;
  description: string;
  path?: string;
  image?: string;
  keywords?: string;
  type?: "website" | "article" | "product";
  noIndex?: boolean;
}
