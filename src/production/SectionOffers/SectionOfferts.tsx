import React from "react";

export interface Product {
  id: string;
  title: string;
  url: string;
  price: number;
}

interface Props {
  products: Product[];
}

import SectionStructure from "@/production/Section/SectionStructure";
import CardProduct from "@/production/components/CardProduct/CardProduct";

function SectionOfferts({ products }: Props) {
  return (
    <SectionStructure>
      <CardProduct products={products} />
    </SectionStructure>
  );
}

export default SectionOfferts;
