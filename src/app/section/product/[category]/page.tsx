"use client";

import SectionStructure from "@/production/Section/SectionStructure";
import { useParams, useSearchParams } from "next/navigation";
import Link from "next/link";
import BodyFilterProducts from "@/production/FilterProducts/BodyFilterProducts/BodyFilterProducts";
import { ProductFilter } from "@/Insfraestructure/Interfaces/products/product.interface";

import { useMemo, useState } from "react";
import BodyProductsCategories from "@/Shared/BodyProducts/BodyProductsCategories";
import { BodyProductsCategoriesInterface } from "@/Insfraestructure/Interfaces/bodyproducts/bodyproducts.interface";

import "./ProductByCategory.scss";

function ProductByCategory() {
  const [allCategories] = useState<BodyProductsCategoriesInterface[]>(
    BodyProductsCategories
  );
  const { category } = useParams() as { category: string };

  const searchParams = useSearchParams();
  const paramsProduct: ProductFilter = Object.fromEntries(searchParams);

  const categorySearched = useMemo(() => {
    return allCategories.find((cat) => cat.id === category);
  }, [allCategories, category]);

  return (
    <SectionStructure>
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
          <div className="title-category">
            <h2 className="title-category-text"> {categorySearched?.title} </h2>
          </div>
          <div className="description-category">
            <h2 className="description-category-text">
              {categorySearched?.description}
            </h2>
          </div>
          <BodyFilterProducts id={category} params={paramsProduct} />
        </div>
      </div>
    </SectionStructure>
  );
}

export default ProductByCategory;
