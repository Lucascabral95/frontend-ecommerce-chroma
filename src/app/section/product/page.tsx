"use client";
import React, { Suspense, useMemo } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

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

  return (
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
  );
}

export default SectionAllProducts;
