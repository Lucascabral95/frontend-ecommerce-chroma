"use client";
import SectionStructure from "@/production/Section/SectionStructure";
import React from "react";
import Image from "next/image";

import "./SectionOffers.scss";

function SectionOffers() {
  const images: string[] = [
    "/img/oferta-1.webp",
    "/img/oferta-2.webp",
    "/img/oferta-3.webp",
  ];

  return (
    <SectionStructure>
      <div className="sectionOffers flex gap-2.5 justify-between items-center">
        {images.map((src, index) => (
          <Image
            key={index}
            src={src}
            alt={`Oferta ${index + 1}`}
            width={500}
            height={500}
            quality={100}
            className="imageOffer"
          />
        ))}
      </div>
    </SectionStructure>
  );
}

export default SectionOffers;
