"use client";
import React, { useState, useEffect } from "react";
import SectionStructure from "@/production/Section/SectionStructure";
import "./SkeletonProducts.scss";

function SkeletonProducts() {
  const [itemsCount, setItemsCount] = useState(4);
  const bpDesktop = 1200;
  const bpTablet = 768;
  const bpMobile = 480;

  useEffect(() => {
    const updateItemsCount = () => {
      const width = window.innerWidth;
      if (width >= bpDesktop) {
        setItemsCount(4);
      } else if (width >= bpTablet) {
        setItemsCount(3);
      } else if (width >= bpMobile) {
        setItemsCount(2);
      } else {
        setItemsCount(1);
      }
    };
    updateItemsCount();
    window.addEventListener("resize", updateItemsCount);

    return () => window.removeEventListener("resize", updateItemsCount);
  }, []);

  return (
    <SectionStructure>
      <section
        className="skeleton-products"
        aria-busy="true"
        aria-live="polite"
        role="status"
      >
        <div className="skeleton-products__container">
          {Array.from({ length: itemsCount }).map((_, i) => (
            <div key={i} className="skeleton-card" aria-hidden="true">
              <div className="skeleton-card__media" />
              <div className="skeleton-card__title" />
              <div className="skeleton-card__price" />
              <div className="skeleton-card__installments" />
            </div>
          ))}
        </div>
        <span className="visually-hidden">Cargando productos…</span>
      </section>
    </SectionStructure>
  );
}

export default SkeletonProducts;
