import React from "react";

import { ProductsInterface } from "@/Insfraestructure/Interfaces/products/product.interface";
import CardChildren from "../CardChildren";

import "./AllCardMap.scss";
import Pagination from "@/production/components/Pagination/Pagination";

interface Props {
  allProducts: ProductsInterface | undefined;
  categoryId: string;
}

function AllCardMap({ allProducts, categoryId }: Props) {
  return (
    <div className="card-map">
      <div className="card-map__container">
        {allProducts?.products?.map((product) => (
          <div className="container-card" key={product.id}>
            <CardChildren products={[product]} />
          </div>
        ))}
      </div>
      <Pagination
        totalPages={allProducts?.totalPages ?? 0}
        page={allProducts?.page ?? 1}
        categoryId={categoryId}
      />
    </div>
  );
}

export default AllCardMap;
