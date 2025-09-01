import InterestFree from "@/production/components/Interest-free/Interest-free";
import SectionOffers from "@/production/components/SectionOffers/SectionOffers";
import Hero from "@/production/Hero/Hero";
import OfferHome from "../production/components/OffetHome/OfferHome";

import SectionOfferts, {
  Product,
} from "@/production/SectionOffers/SectionOfferts";
import Benefits from "@/production/Benefits/Benefits";

const productos: Product[] = [
  {
    id: "1",
    title: "CHAQUEta gamuzada beige",
    url: "/img/oferta-1.webp",
    price: 100,
  },
  {
    id: "2",
    title: "CHAQUEta gamuzada beige",
    url: "/img/oferta-2.webp",
    price: 200,
  },
  {
    id: "3",
    title: "CHAQUEta gamuzada beige",
    url: "/img/oferta-3.webp",
    price: 300,
  },
  {
    id: "4",
    title: "CHAQUEta gamuzada beige",
    url: "/img/oferta-3.webp",
    price: 400,
  },
  {
    id: "1",
    title: "CHAQUEta gamuzada beige",
    url: "/img/oferta-1.webp",
    price: 100,
  },
  {
    id: "2",
    title: "CHAQUEta gamuzada beige",
    url: "/img/oferta-2.webp",
    price: 200,
  },
  {
    id: "3",
    title: "CHAQUEta gamuzada beige",
    url: "/img/oferta-3.webp",
    price: 300,
  },
  {
    id: "4",
    title: "CHAQUEta gamuzada beige",
    url: "/img/oferta-3.webp",
    price: 400,
  },
  {
    id: "1",
    title: "CHAQUEta gamuzada beige",
    url: "/img/oferta-1.webp",
    price: 100,
  },
  {
    id: "2",
    title: "CHAQUEta gamuzada beige",
    url: "/img/oferta-2.webp",
    price: 200,
  },
  {
    id: "3",
    title: "CHAQUEta gamuzada beige",
    url: "/img/oferta-3.webp",
    price: 300,
  },
  {
    id: "4",
    title: "CHAQUEta gamuzada beige",
    url: "/img/oferta-3.webp",
    price: 400,
  },
  {
    id: "1",
    title: "CHAQUEta gamuzada beige",
    url: "/img/oferta-1.webp",
    price: 100,
  },
  {
    id: "2",
    title: "CHAQUEta gamuzada beige",
    url: "/img/oferta-2.webp",
    price: 200,
  },
  {
    id: "3",
    title: "CHAQUEta gamuzada beige",
    url: "/img/oferta-3.webp",
    price: 300,
  },
  {
    id: "4",
    title: "CHAQUEta gamuzada beige",
    url: "/img/oferta-3.webp",
    price: 400,
  },
];

export default function Home() {
  return (
    <>
      <Hero />
      <InterestFree />
      <SectionOffers />
      <SectionOfferts products={productos} />
      <SectionOfferts products={productos} />
      <SectionOfferts products={productos} />
      <OfferHome />
      <Benefits />
    </>
  );
}
