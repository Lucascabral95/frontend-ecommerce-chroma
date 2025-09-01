import React from "react";
import Link from "next/link";
import Image from "next/image";

import "./Card.scss";
import { Product } from "@/production/SectionOffers/SectionOfferts";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

interface Props {
  products: Product[];
}

function Card({ products }: Props) {
  return (
    <div className="product-slider-container">
      {products.map((item) => (
        <div className="image-card-contenedor" key={item.id}>
          <div className="image-card">
            <Link href={item.url}>
              <Image
                className="image-card-image"
                width={500}
                height={500}
                src={item.url || "/img/oferta-1.webp"}
                alt={item.title}
                quality={100}
              />
            </Link>
          </div>
          <Link href={item.url} className="title-card">
            <p className="title-text"> {item.title.toLocaleUpperCase()} </p>
          </Link>
          <div className="price-card">
            <p className="price-text"> ${item.price} </p>
          </div>
          <div className="price-in-quotes-card">
            <p className="price-text-in-quotes">
              3 cuotas sin interés de ${(item.price / 3).toFixed(2)}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Card;
