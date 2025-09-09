"use client";
import { CSSProperties, useMemo, useState } from "react";
import { IoMdClose } from "react-icons/io";
import { IoChevronBack } from "react-icons/io5";
import { useRouter, useSearchParams } from "next/navigation";

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
  const searchParams = useSearchParams();

  const [priceCount, setPriceCount] = useState<{
    min?: number;
    max?: number;
    brandId?: string;
    sizes?: string;
    categories?: string;
  } | null>(null);

  const redirectProductFilters = () => {
    if (!priceCount) return;

    const params = new URLSearchParams(searchParams);
    params.delete("page");

    if (priceCount.min) {
      params.set("minPrice", priceCount.min.toString());
    }
    if (priceCount.max) {
      params.set("maxPrice", priceCount.max.toString());
    }
    if (priceCount.brandId) {
      params.set("brandId", priceCount.brandId);
    }
    if (priceCount.sizes) {
      params.set("size", priceCount.sizes);
    }
    if (priceCount.categories) {
      params.set("categoryId", priceCount.categories);
    }

    // const currentPath = window.location.pathname;
    router.push(`/section/product?${params.toString()}`);
    setOpenFilters(false);
  };

  const handleCategoryChange = (categoryId: string, checked: boolean) => {
    setPriceCount((prev) => {
      const currentCategories = prev?.categories ?? "";
      let newCategories: string;

      if (checked) {
        newCategories = [...currentCategories, categoryId].join(",");
      } else {
        newCategories = currentCategories.replace(`,${categoryId}`, "");
      }

      return {
        ...prev,
        categories: newCategories.length > 0 ? newCategories : undefined,
      };
    });
  };

  const handleSizeChange = (sizeName: string) => {
    setPriceCount((prev) => ({
      ...prev,
      sizes: sizeName,
    }));
  };

  const styleSelected: CSSProperties = {
    textDecoration: "underline",
    textDecorationThickness: "2px",
    textUnderlineOffset: "2px",
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
                <div
                  className="value"
                  key={index}
                  onClick={() => handleCategoryChange(category.id, true)}
                >
                  <label
                    className="label"
                    htmlFor={category.id}
                    style={
                      priceCount?.categories?.includes(category.id)
                        ? styleSelected
                        : {}
                    }
                  >
                    {category.name}
                  </label>
                </div>
              ))}
            </ArrayCategory>
            <ArrayCategory idem="Tallas">
              {linksSizesMemo.map((size, index) => (
                <div
                  className="value"
                  key={index}
                  onClick={() => handleSizeChange(size.name)}
                >
                  <label
                    className="label"
                    htmlFor={size.name}
                    style={priceCount?.sizes === size.name ? styleSelected : {}}
                  >
                    {size.name}
                  </label>
                </div>
              ))}
            </ArrayCategory>

            <ArrayCategory idem="Marcas">
              {brandsMemo.map((brand, index) => (
                <div className="value" key={index}>
                  <label
                    onClick={() =>
                      setPriceCount({ ...priceCount, brandId: brand.id })
                    }
                    className="label"
                    htmlFor={brand.id}
                    style={
                      priceCount?.brandId === brand.id ? styleSelected : {}
                    }
                  >
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
                        min: e.target.value
                          ? parseInt(e.target.value)
                          : undefined,
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
                        max: e.target.value
                          ? parseInt(e.target.value)
                          : undefined,
                      })
                    }
                  />
                </div>
              </div>
            </ArrayCategory>
          </div>
        </div>
        <div className="apply-mobile" onClick={() => redirectProductFilters()}>
          <button> Aplicar </button>
        </div>
      </div>
    </div>
  );
}

export default FilterProducts;
