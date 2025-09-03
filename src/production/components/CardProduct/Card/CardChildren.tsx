import React from "react";

import { Product } from "@/Insfraestructure/Interfaces/products/product.interface";
import Link from "next/link";
import Image from "next/image";

import "./CardChildren.scss";

interface Props {
  products: Product[];
}

function CardChildren({ products }: Props) {
  return (
    <div className="image-card-contenedor">
      <div className="image-card">
        <Link href={`/product/${products[0].id}`} className="link-image">
          <Image
            loading="lazy"
            quality={100}
            className="image-card-image"
            width={500}
            height={500}
            src={products[0]?.images[0]?.url || "/img/oferta-1.webp"}
            alt={products[0].name}
          />
        </Link>
      </div>
      <Link href={`/product/${products[0].id}`} className="title-card">
        <p className="title-text"> {products[0].name} </p>
      </Link>
      <div className="price-card">
        <p className="price-text"> $ {products[0]?.variants[0]?.price} </p>
      </div>
      <div className="price-in-quotes-card">
        <p className="price-text-in-quotes">
          3 cuotas sin interés de $
          {(products[0]?.variants[0]?.price / 3).toFixed(2)}
        </p>
      </div>
    </div>
  );
}

export default CardChildren;
