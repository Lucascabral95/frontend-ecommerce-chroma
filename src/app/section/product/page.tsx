"use client";
import { Suspense, useMemo } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

import SEO from "@/production/components/SEO";
import { useSEO } from "@/production/Hooks/useSEO";
import SectionStructure from "@/production/Section/SectionStructure";
import BodyFilterProducts from "@/production/FilterProducts/BodyFilterProducts/BodyFilterProducts";
import { ProductFilter } from "@/Insfraestructure/Interfaces/products/product.interface";
import "./[category]/ProductByCategory.scss";

function SectionAllProducts() {
  return (
    <SectionStructure>
      <Suspense fallback={<div>Cargando productos...</div>}>
        <ProductsWrapper />
      </Suspense>
    </SectionStructure>
  );
}

function ProductsWrapper() {
  const searchParams = useSearchParams();
  const paramsProduct: ProductFilter = useMemo(
    () => Object.fromEntries(searchParams),
    [searchParams]
  );

  const seoData = useSEO({
    title: "Todos los productos - Indumentaria Masculina Premium | Chroma",
    description:
      "Descubre toda nuestra colección de indumentaria masculina en Chroma. Camisas, pantalones, remeras y más. Envío gratis desde $25.000 y 3 cuotas sin interés.",
    path: "/section/product/all",
    image: "/img/logo-chroma-ecommerce.png",
    keywords:
      "indumentaria masculina, ropa hombre, camisas hombre, pantalones masculinos, remeras hombre, moda masculina, catálogo completo, Chroma",
    type: "website",
    noIndex: false,
  });

  return (
    <>
      <SEO {...seoData} />
      <div className="product-by-category">
        <div className="product-by-category__container">
          <div className="sections-index">
            <Link className="link" href="/">
              Home
            </Link>
            <p className="separator-bar">/</p>
            <Link className="link" href="/section/product/all">
              TODOS
            </Link>
          </div>
          <BodyFilterProducts id="all" params={paramsProduct} />
        </div>
      </div>
    </>
  );
}

export default SectionAllProducts;
