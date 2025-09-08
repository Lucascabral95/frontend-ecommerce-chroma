"use client";
import React, { useMemo, useState } from "react";
import { CiFilter } from "react-icons/ci";

import useProducts from "@/production/Hooks/useProducts";
import AllCardMap from "@/production/components/CardProduct/Card/AllCardMap/AllCardMap";
import { ProductFilter } from "@/Insfraestructure/Interfaces/products/product.interface";
import "./BodyFilterProducts.scss";

import {
  FilterProductSortFieldEnum,
  SortOrderEnum,
} from "@/Insfraestructure/Interfaces/filters/filters.interface";
import FilterProducts from "@/production/components/FilterProducts/FilterProducts";

interface Props {
  id: string;
  params?: ProductFilter;
}

function BodyFilterProducts({ id, params }: Props) {
  const [orderSelected, setOrderSelected] =
    useState<FilterProductSortFieldEnum>(FilterProductSortFieldEnum.CREATED_AT);
  const [orderDirection, setOrderDirection] = useState<SortOrderEnum>(
    SortOrderEnum.DESC
  );
  const [openFilters, setOpenFilters] = useState<boolean>(false);

  const filter = useMemo<ProductFilter>(() => {
    const baseFilter: ProductFilter = {
      ...(params ?? {}),
      limit: 8,
      sortBy: orderSelected,
      sortOrder: orderDirection,
    };

    if (id && id !== "all") {
      return { ...baseFilter, categoryId: id };
    }

    return baseFilter;
  }, [id, params, orderSelected, orderDirection]);

  const { products } = useProducts(undefined, filter);

  const handleOrderSelectedChange = (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const [field, dir] = e.target.value.split("|") as [
      FilterProductSortFieldEnum,
      SortOrderEnum
    ];
    setOrderSelected(field);
    setOrderDirection(dir);
  };

  const selectValue = `${orderSelected}|${orderDirection}`;

  return (
    <div className="body-filter-products">
      <div className="body-filter-products__container">
        <div className="filter-products">
          <button
            className="filter"
            onClick={() => setOpenFilters(!openFilters)}
          >
            <div className="icono">
              <CiFilter className="icon" />
            </div>
            <div className="text">
              <strong> FILTRAR </strong>
            </div>
          </button>

          <div className="orders-products">
            <div className="text-order">
              <p> Ordenar </p>
            </div>
            <button className="button-order">
              <select
                className="order"
                value={selectValue}
                onChange={handleOrderSelectedChange}
              >
                <option
                  value={`${FilterProductSortFieldEnum.CREATED_AT}|${SortOrderEnum.DESC}`}
                >
                  Más recientes
                </option>
                <option
                  value={`${FilterProductSortFieldEnum.NAME}|${SortOrderEnum.ASC}`}
                >
                  Nombre A - Z
                </option>
                <option
                  value={`${FilterProductSortFieldEnum.NAME}|${SortOrderEnum.DESC}`}
                >
                  Nombre Z - A
                </option>
                <option
                  value={`${FilterProductSortFieldEnum.PRICE}|${SortOrderEnum.ASC}`}
                >
                  Menor precio
                </option>
                <option
                  value={`${FilterProductSortFieldEnum.PRICE}|${SortOrderEnum.DESC}`}
                >
                  Mayor precio
                </option>
              </select>
            </button>
          </div>
        </div>

        <AllCardMap allProducts={products.data ?? undefined} categoryId={id} />
        {openFilters && <FilterProducts setOpenFilters={setOpenFilters} />}
      </div>
    </div>
  );
}

export default BodyFilterProducts;
