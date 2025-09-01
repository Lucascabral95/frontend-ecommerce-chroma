import InterestFree from "@/production/components/Interest-free/Interest-free";
import SectionOffers from "@/production/components/SectionOffers/SectionOffers";
import Hero from "@/production/Hero/Hero";
import OfferHome from "../production/components/OffetHome/OfferHome";

import Benefits from "@/production/Benefits/Benefits";
import { Product } from "@/Insfraestructure/Interfaces/products/product.interface";
import {
  ProductStatus,
  Size,
} from "@/Insfraestructure/Interfaces/enums/enums-global.interface";
import CardMap from "@/production/components/CardProduct/Card/CardArray";

const productos: Product[] = [
  {
    id: "1",
    name: "CHAQUEta gamuzada beige",
    slug: "/img/oferta-1.webp",
    basePrice: 100,
    status: ProductStatus.ACTIVE,
    variants: [
      {
        id: "1",
        productId: "1",
        colorId: "1",
        sku: "1",
        price: 100,
        barcode: "1",
        size: Size.M,
        stock: 10,
        weightGrams: 100,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ],
    images: [],
    tags: [],
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: "2",
    name: "CHAQUEta gamuzada beige",
    slug: "/img/oferta-2.webp",
    basePrice: 100,
    status: ProductStatus.ACTIVE,
    variants: [
      {
        id: "2",
        productId: "2",
        colorId: "2",
        sku: "2",
        price: 200,
        barcode: "2",
        size: Size.L,
        stock: 20,
        weightGrams: 200,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ],
    images: [],
    tags: [],
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: "3",
    name: "CHAQUEta gamuzada beige",
    slug: "/img/oferta-3.webp",
    basePrice: 100,
    status: ProductStatus.ACTIVE,
    variants: [
      {
        id: "1",
        productId: "1",
        colorId: "1",
        sku: "1",
        price: 100,
        barcode: "1",
        size: Size.M,
        stock: 10,
        weightGrams: 100,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ],
    images: [],
    tags: [],
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: "4",
    name: "CHAQUEta gamuzada beige",
    slug: "/img/oferta-4.webp",
    basePrice: 100,
    status: ProductStatus.ACTIVE,
    variants: [
      {
        id: "2",
        productId: "2",
        colorId: "2",
        sku: "2",
        price: 200,
        barcode: "2",
        size: Size.L,
        stock: 20,
        weightGrams: 200,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ],
    images: [],
    tags: [],
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];

export default function Home() {
  return (
    <>
      <Hero />
      <InterestFree />
      <SectionOffers />

      <CardMap products={productos} />
      <CardMap products={productos} />
      <CardMap products={productos} />

      <OfferHome />
      <Benefits />
    </>
  );
}
