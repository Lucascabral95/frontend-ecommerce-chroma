"use client";
import React, { useMemo, useState, Suspense } from "react";
import { useParams, useSearchParams } from "next/navigation";
import Link from "next/link";

import SectionStructure from "@/production/Section/SectionStructure";
import BodyFilterProducts from "@/production/FilterProducts/BodyFilterProducts/BodyFilterProducts";
import { ProductFilter } from "@/Insfraestructure/Interfaces/products/product.interface";
import BodyProductsCategories from "@/Shared/BodyProducts/BodyProductsCategories";
import { BodyProductsCategoriesInterface } from "@/Insfraestructure/Interfaces/bodyproducts/bodyproducts.interface";
import "./ProductByCategory.scss";

function ProductByCategoryContent() {
  const [allCategories] = useState<BodyProductsCategoriesInterface[]>(
    BodyProductsCategories
  );

  const { category } = useParams() as { category: string };
  const searchParams = useSearchParams();

  const paramsProduct: ProductFilter = useMemo(
    () => Object.fromEntries(searchParams),
    [searchParams]
  );

  const categorySearched = useMemo(() => {
    return allCategories.find((cat) => cat.id === category);
  }, [allCategories, category]);

  return (
    <div className="product-by-category">
      <div className="product-by-category__container">
        <div className="sections-index">
          <Link className="link" href="/">
            Home
          </Link>
          <p className="separator-bar">/</p>
          <Link className="link" href={`/section/product/${category}`}>
            {category?.toUpperCase()}
          </Link>
        </div>

        {categorySearched && (
          <>
            <div className="title-category">
              <h2 className="title-category-text">{categorySearched.title}</h2>
            </div>
            <div className="description-category">
              <h2 className="description-category-text">
                {categorySearched.description}
              </h2>
            </div>
          </>
        )}

        <BodyFilterProducts id={category} params={paramsProduct} />
      </div>
    </div>
  );
}

function ProductByCategoryLoading() {
  return (
    <div className="product-by-category">
      <div className="product-by-category__container">
        <div className="sections-index">
          <span>Home / Cargando...</span>
        </div>
        <p>Cargando categoría...</p>
      </div>
    </div>
  );
}

function ProductByCategory() {
  return (
    <SectionStructure>
      <Suspense fallback={<ProductByCategoryLoading />}>
        <ProductByCategoryContent />
      </Suspense>
    </SectionStructure>
  );
}

export default ProductByCategory;
