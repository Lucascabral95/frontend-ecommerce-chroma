"use client";

import InterestFree from "@/production/components/Interest-free/Interest-free";
import SectionOffers from "@/production/components/SectionOffers/SectionOffers";
import Hero from "@/production/Hero/Hero";
import OfferHome from "../production/components/OffetHome/OfferHome";

import Benefits from "@/production/Benefits/Benefits";
import CardArrayComponent from "@/production/components/CardProduct/Card/CardArrayComponent";

export default function Home() {
  return (
    <>
      <Hero />
      <InterestFree />
      <SectionOffers />

      <CardArrayComponent />

      <OfferHome />
      <Benefits />
    </>
  );
}
