"use client";
import { useMemo, useState } from "react";
import { IoMdClose } from "react-icons/io";
import { IoChevronBack } from "react-icons/io5";
import { useRouter } from "next/navigation";

import { brands, sizes, categoriesArray } from "@/lib/filters-products";
import ArrayCategory from "./ArrayCategory";

import "./FilterProducts.scss";

interface Props {
  setOpenFilters: (open: boolean) => void;
}

function FilterProducts({ setOpenFilters }: Props) {
  const linksCategoriesMemo = useMemo(() => categoriesArray, []);
  const linksSizesMemo = useMemo(() => sizes, []);
  const brandsMemo = useMemo(() => brands, []);
  const router = useRouter();

  const [priceCount, setPriceCount] = useState<{
    min?: number;
    max?: number;
    brandId?: string;
    sizes?: string[];
    categories?: string[];
  } | null>(null);

  const redirectProductFilters = () => {
    if (!priceCount) return;

    const hasMin = Boolean(priceCount.min);
    const hasMax = Boolean(priceCount.max);
    const brandId = priceCount.brandId;
    const sizes = priceCount.sizes;
    const categories = priceCount.categories;

    switch (true) {
      case hasMin && hasMax:
        router.push(
          `/section/product?minPrice=${priceCount.min}&maxPrice=${priceCount.max}`
        );
        break;
      case hasMin:
        router.push(`/section/product?minPrice=${priceCount.min}`);
        break;
      case hasMax:
        router.push(`/section/product?maxPrice=${priceCount.max}`);
        break;
      case brandId !== undefined:
        router.push(`/section/product?brandId=${brandId}`);
        break;
      case sizes !== undefined:
        router.push(`/section/product?size=${sizes}`);
        break;
      case categories !== undefined:
        router.push(`/section/product?categoryId=${categories}`);
        break;
      default:
        break;
    }

    setOpenFilters(false);
  };

  return (
    <div
      className="component-filter-products"
      onClick={() => setOpenFilters(false)}
    >
      <div
        className="component-filter-products__container"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="component-filter-products__container__container">
          <div className="filter-principal">
            <div className="title-fil">
              <div className="icon-back" onClick={() => setOpenFilters(false)}>
                <IoChevronBack className="icon" />
              </div>
              <h5> Filtrar </h5>
            </div>
            <div className="button-icono">
              <div className="button" onClick={() => redirectProductFilters()}>
                APLICAR
              </div>
              <div className="icono" onClick={() => setOpenFilters(false)}>
                <IoMdClose className="icon" />
              </div>
            </div>
          </div>
          <div className="categories">
            <ArrayCategory idem="Categorías">
              {linksCategoriesMemo.map((category, index) => (
                <div className="value" key={index}>
                  <input
                    name="category"
                    className="checkbox-category"
                    type="checkbox"
                    id={category.id}
                    value={category.id}
                    onChange={() =>
                      setPriceCount({
                        ...priceCount,
                        categories: [
                          ...(priceCount?.categories ?? []),
                          category.id,
                        ],
                      })
                    }
                  />
                  <label className="label" htmlFor={category.id}>
                    {category.name}
                  </label>
                </div>
              ))}
            </ArrayCategory>

            <ArrayCategory idem="Tallas">
              {linksSizesMemo.map((size, index) => (
                <div className="value" key={index}>
                  <input
                    name="size"
                    className="checkbox-category"
                    type="checkbox"
                    id={size.name}
                    value={size.name}
                    onChange={() =>
                      setPriceCount({
                        ...priceCount,
                        sizes: [...(priceCount?.sizes ?? []), size.name],
                      })
                    }
                  />
                  <label className="label" htmlFor={size.name}>
                    {size.name}
                  </label>
                </div>
              ))}
            </ArrayCategory>
            <ArrayCategory idem="Marcas">
              {brandsMemo.map((brand, index) => (
                <div className="value" key={index}>
                  <input
                    name="brand"
                    className="checkbox-category"
                    type="checkbox"
                    id={brand.id}
                    value={brand.id}
                    onChange={() =>
                      setPriceCount({ ...priceCount, brandId: brand.id })
                    }
                  />
                  <label className="label" htmlFor={brand.id}>
                    {brand.name}
                  </label>
                </div>
              ))}
            </ArrayCategory>
            <ArrayCategory idem="Precios">
              <div className="prices">
                <div className="price-min-max">
                  <input
                    min={0}
                    type="number"
                    placeholder="Mínimo"
                    onChange={(e) =>
                      setPriceCount({
                        ...priceCount,
                        min: parseInt(e.target.value),
                      })
                    }
                  />
                </div>
                <span>-</span>
                <div className="price-min-max">
                  <input
                    min={1}
                    type="number"
                    placeholder="Máximo"
                    onChange={(e) =>
                      setPriceCount({
                        ...priceCount,
                        max: parseInt(e.target.value),
                      })
                    }
                  />
                </div>
              </div>
            </ArrayCategory>
          </div>
        </div>
        <div className="apply-mobile" onClick={() => redirectProductFilters()}>
          <button> Aplicar</button>
        </div>
      </div>
    </div>
  );
}

export default FilterProducts;
