"use client";

import InterestFree from "@/production/components/Interest-free/Interest-free";
import Hero from "@/production/Hero/Hero";
import OfferHome from "../production/components/OffetHome/OfferHome";

import Benefits from "@/production/Benefits/Benefits";
import CardArrayComponent from "@/production/components/CardProduct/Card/CardArrayComponent";
import BannerFull from "@/production/components/BannerFull/BannerFull";
import YoutubeVideo from "@/production/components/YoutubeVideo/YoutubeVideo";

const URL_VIDEO = process.env.NEXT_PUBLIC_URL_VIDEO_YOUTUBE ?? "";

export default function Home() {
  return (
    <>
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
