"use client";
import React, { useState } from "react";

import { CiFilter } from "react-icons/ci";

import "./BodyFilterProducts.scss";
import useProducts from "@/production/Hooks/useProducts";
import AllCardMap from "@/production/components/CardProduct/Card/AllCardMap/AllCardMap";
import { ProductFilter } from "@/Insfraestructure/Interfaces/products/product.interface";

interface Props {
  id: string;
  params?: ProductFilter;
}

function BodyFilterProducts({ id, params }: Props) {
  const [orderSelected, setOrderSelected] = useState<string>("mas-vendidos");

  const handleOrderChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setOrderSelected(e.target.value);
  };

  const { products } = useProducts(undefined, {
    categoryId: id,
    ...params,
    limit: 8,
  });

  return (
    <div className="body-filter-products">
      <div className="body-filter-products__container">
        <div className="filter-products">
          <button className="filter">
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
                onChange={handleOrderChange}
                value={orderSelected}
              >
                <option value="mas-vendidos">Más vendidos</option>
                <option value="nombre-a-z">Nombre A - Z</option>
                <option value="nombre-z-a">Nombre Z - A</option>
                <option value="menos-caros">Menos precio</option>
                <option value="mas-caros">Mas precio</option>
              </select>
            </button>
          </div>
        </div>
        <AllCardMap allProducts={products.data ?? undefined} categoryId={id} />
      </div>
    </div>
  );
}

export default BodyFilterProducts;
