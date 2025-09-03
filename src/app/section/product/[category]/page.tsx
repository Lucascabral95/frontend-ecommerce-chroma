"use client";

import SectionStructure from "@/production/Section/SectionStructure";
import { useParams, useSearchParams } from "next/navigation";

import Link from "next/link";
import BodyFilterProducts from "@/production/FilterProducts/BodyFilterProducts/BodyFilterProducts";

import { ProductFilter } from "@/Insfraestructure/Interfaces/products/product.interface";

import "./ProductByCategory.scss";

const TITLE: string = "CAMPERAS DESDE $49.900";
const DESCRIPTION: string =
  "Lorem ipsum dolor sit amet consectetur adipisicing elit.";

function ProductByCategory() {
  const { category } = useParams() as { category: string };

  const searchParams = useSearchParams();
  const paramsProduct: ProductFilter = Object.fromEntries(searchParams);

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
            <h2 className="title-category-text"> {TITLE} </h2>
          </div>
          <div className="description-category">
            <h2 className="description-category-text">
              {DESCRIPTION} Possimus vitae totam repudiandae! Temporibus, eum!
              Magnam eveniet sint odio commodi eligendi doloribus
              exercitationem, facilis dolores aspernatur consequatur? Assumenda
              nisi quam et. Lorem ipsum dolor sit amet consectetur adipisicing
              elit. Possimus vitae totam repudiandae! Temporibus, eum! Magnam
              eveniet sint odio commodi eligendi doloribus exercitationem,
              facilis dolores aspernatur consequatur? Assumenda nisi quam et.
            </h2>
          </div>
          <BodyFilterProducts id={category} params={paramsProduct} />
        </div>
      </div>
    </SectionStructure>
  );
}

export default ProductByCategory;
