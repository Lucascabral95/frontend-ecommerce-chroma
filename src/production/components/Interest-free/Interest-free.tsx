"use client";
import React from "react";
import Image from "next/image";
import SectionStructure from "@/production/Section/SectionStructure";
import "./interest-free.scss";
import useProducts from "@/production/Hooks/useProducts";

function InterestFree() {
  const { products } = useProducts();

  return (
    <SectionStructure>
      <div className="interestFree">
        <Image
          src="/img/6-cuotas-s-interes.webp"
          alt="Interest Free"
          width={1920}
          height={80}
          quality={100}
          className="imageInterestFree"
        />
      </div>
    </SectionStructure>
  );
}

export default InterestFree;
