"use client";
import React from "react";
import Image from "next/image";

import "./OfferHome.scss";

interface Image {
  src: string;
  alt: string;
}

function OfferHome() {
  const images: Image[] = [
    { src: "/img/coleccion-2025.webp", alt: "Colección 2025" },
    { src: "/img/3x2.webp", alt: "3x2" },
  ];

  return (
    <div className="offer-home">
      <div className="offer-home__container">
        {images.map((image, index) => (
          <div className="image-container" key={index}>
            <Image
              className="image-inside"
              key={index}
              src={image.src}
              alt={image.alt}
              width={1920 / 2}
              height={500}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default OfferHome;
