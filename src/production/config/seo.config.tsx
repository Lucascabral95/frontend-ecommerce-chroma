const MY_URL = process.env.NEXT_PUBLIC_FRONTEND_URL;

export const SEO_DEFAULTS = {
  siteName: "Chroma",
  baseUrl: MY_URL,
  defaultImage: "/images/og-default.jpg",
  twitterHandle: "@chroma",
} as const;
