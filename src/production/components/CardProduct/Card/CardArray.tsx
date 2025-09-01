"use client";

import React, { useEffect, useRef, useState } from "react";
import { Product } from "@/Insfraestructure/Interfaces/products/product.interface";
import CardChildren from "./CardChildren";
import SectionStructure from "@/production/Section/SectionStructure";

import "./CardArray.scss";

interface Props {
  products: Product[];
}

function CardMap({ products }: Props) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, scrollLeft: 0 });

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleStart = (clientX: number) => {
      setIsDragging(true);
      setDragStart({
        x: clientX,
        scrollLeft: container.scrollLeft,
      });
      container.style.cursor = "grabbing";
      container.style.scrollBehavior = "auto";
    };

    const handleMove = (clientX: number) => {
      if (!isDragging) return;

      const deltaX = clientX - dragStart.x;
      const newScrollLeft = dragStart.scrollLeft - deltaX;

      container.scrollLeft = Math.max(
        0,
        Math.min(newScrollLeft, container.scrollWidth - container.clientWidth)
      );
    };

    const handleEnd = () => {
      if (!isDragging) return;

      setIsDragging(false);
      container.style.cursor = "grab";
      container.style.scrollBehavior = "smooth";
      snapToNearestCard();
    };

    const snapToNearestCard = () => {
      const cardWidth = container.querySelector(".card-item")?.clientWidth || 0;
      const gap = 16;
      const cardWithGap = cardWidth + gap;
      const targetIndex = Math.round(container.scrollLeft / cardWithGap);

      container.scrollTo({
        left: targetIndex * cardWithGap,
        behavior: "smooth",
      });
    };

    const handleMouseDown = (e: MouseEvent) => {
      e.preventDefault();
      handleStart(e.clientX);
    };

    const handleMouseMove = (e: MouseEvent) => {
      e.preventDefault();
      handleMove(e.clientX);
    };

    const handleMouseUp = () => handleEnd();
    const handleMouseLeave = () => handleEnd();

    const handleTouchStart = (e: TouchEvent) => {
      handleStart(e.touches[0].clientX);
    };

    const handleTouchMove = (e: TouchEvent) => {
      e.preventDefault();
      handleMove(e.touches[0].clientX);
    };

    const handleTouchEnd = () => handleEnd();

    const preventDrag = (e: DragEvent) => {
      e.preventDefault();
      return false;
    };

    container.addEventListener("mousedown", handleMouseDown);
    container.addEventListener("mousemove", handleMouseMove);
    container.addEventListener("mouseup", handleMouseUp);
    container.addEventListener("mouseleave", handleMouseLeave);
    container.addEventListener("touchstart", handleTouchStart, {
      passive: false,
    });
    container.addEventListener("touchmove", handleTouchMove, {
      passive: false,
    });
    container.addEventListener("touchend", handleTouchEnd);
    container.addEventListener("dragstart", preventDrag);

    return () => {
      container.removeEventListener("mousedown", handleMouseDown);
      container.removeEventListener("mousemove", handleMouseMove);
      container.removeEventListener("mouseup", handleMouseUp);
      container.removeEventListener("mouseleave", handleMouseLeave);
      container.removeEventListener("touchstart", handleTouchStart);
      container.removeEventListener("touchmove", handleTouchMove);
      container.removeEventListener("touchend", handleTouchEnd);
      container.removeEventListener("dragstart", preventDrag);
    };
  }, [isDragging, dragStart]);

  return (
    <SectionStructure>
      <div
        ref={containerRef}
        className={`card-carousel ${isDragging ? "dragging" : ""}`}
      >
        {products.map((product) => (
          <div className="card-item" key={product.id}>
            <CardChildren products={[product]} />
          </div>
        ))}
      </div>
    </SectionStructure>
  );
}

export default CardMap;
