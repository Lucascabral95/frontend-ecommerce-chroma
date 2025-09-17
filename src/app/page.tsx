"use client";

import InterestFree from "@/production/components/Interest-free/Interest-free";
import Hero from "@/production/Hero/Hero";
import OfferHome from "../production/components/OffetHome/OfferHome";
import Benefits from "@/production/Benefits/Benefits";
import CardArrayComponent from "@/production/components/CardProduct/Card/CardArrayComponent";
import BannerFull from "@/production/components/BannerFull/BannerFull";
import YoutubeVideo from "@/production/components/YoutubeVideo/YoutubeVideo";
import { useSEO } from "@/production/Hooks/useSEO";
import SEO from "@/production/components/SEO";

const URL_VIDEO = process.env.NEXT_PUBLIC_URL_VIDEO_YOUTUBE ?? "";

export default function Home() {
  const seoData = useSEO({
    title:
      "Chroma - Indumentaria Masculina Premium | Ropa de Hombre con Estilo",
    description:
      "Descubrí la mejor indumentaria masculina en Chroma. Ropa premium para hombre: camisas, pantalones, remeras y accesorios. Estilo auténtico y calidad superior. Envíos a todo el país.",
    path: "/",
    image: "/img/logo-chroma-ecommerce.png",
    keywords:
      "indumentaria masculina, ropa hombre, moda masculina, camisas hombre, pantalones hombre, remeras masculinas, estilo masculino, ropa premium hombre, Chroma, tienda online ropa hombre",
    type: "website",
  });

  return (
    <>
      <SEO {...seoData} />
      <Hero />
      <InterestFree />
      <BannerFull />

      <CardArrayComponent />

      <YoutubeVideo videoId={URL_VIDEO} title="Video de Youtube de Chroma" />

      <OfferHome />
      <Benefits />
    </>
  );
}
