"use client";
import { useEffect, useRef, useState } from "react";

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
  const [dragStart, setDragStart] = useState({ x: 0, y: 0, scrollLeft: 0 });
  const [currentIndex, setCurrentIndex] = useState(0);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const [visibleCards, setVisibleCards] = useState(1);
  const [touchDirection, setTouchDirection] = useState<
    "horizontal" | "vertical" | "none"
  >("none");
  const [initialTouch, setInitialTouch] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const calculateVisibleCards = () => {
      const width = window.innerWidth;
      if (width > 1200) setVisibleCards(4);
      else if (width > 768) setVisibleCards(3);
      else if (width > 480) setVisibleCards(2);
      else setVisibleCards(1.25);
    };

    calculateVisibleCards();
    window.addEventListener("resize", calculateVisibleCards);
    return () => window.removeEventListener("resize", calculateVisibleCards);
  }, []);

  const updateArrowStates = (index: number) => {
    const maxIndex = Math.max(0, products.length - Math.floor(visibleCards));
    setCanScrollLeft(index > 0);
    setCanScrollRight(index < maxIndex);
  };

  useEffect(() => {
    updateArrowStates(currentIndex);
  }, [currentIndex, visibleCards, products.length]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleStart = (clientX: number, clientY: number) => {
      setIsDragging(true);
      setDragStart({
        x: clientX,
        y: clientY,
        scrollLeft: container.scrollLeft,
      });
      setInitialTouch({ x: clientX, y: clientY });
      setTouchDirection("none");

      container.style.cursor = "grabbing";
      container.style.scrollBehavior = "auto";
    };

    const handleMove = (clientX: number, clientY: number) => {
      if (!isDragging) return;

      const deltaX = Math.abs(clientX - initialTouch.x);
      const deltaY = Math.abs(clientY - initialTouch.y);

      if (touchDirection === "none" && (deltaX > 5 || deltaY > 5)) {
        if (deltaX > deltaY) {
          setTouchDirection("horizontal");
        } else {
          setTouchDirection("vertical");
        }
      }

      if (touchDirection === "horizontal") {
        const deltaXMove = clientX - dragStart.x;
        const newScrollLeft = dragStart.scrollLeft - deltaXMove;

        container.scrollLeft = Math.max(
          0,
          Math.min(newScrollLeft, container.scrollWidth - container.clientWidth)
        );
      }
    };

    const handleEnd = () => {
      if (!isDragging) return;

      setIsDragging(false);
      setTouchDirection("none");
      container.style.cursor = "grab";
      container.style.scrollBehavior = "smooth";

      if (touchDirection === "horizontal") {
        snapToNearestCard();
      }
    };

    const snapToNearestCard = () => {
      const cardWidth = container.querySelector(".card-item")?.clientWidth || 0;
      const gap = 16;
      const cardWithGap = cardWidth + gap;
      const targetIndex = Math.round(container.scrollLeft / cardWithGap);

      setCurrentIndex(targetIndex);
      updateArrowStates(targetIndex);
      container.scrollTo({
        left: targetIndex * cardWithGap,
        behavior: "smooth",
      });
    };

    const handleScroll = () => {
      if (isDragging) return;

      const cardWidth = container.querySelector(".card-item")?.clientWidth || 0;
      const gap = 16;
      const cardWithGap = cardWidth + gap;
      const index = Math.round(container.scrollLeft / cardWithGap);

      if (index !== currentIndex) {
        setCurrentIndex(index);
        updateArrowStates(index);
      }
    };

    const handleMouseDown = (e: MouseEvent) => {
      e.preventDefault();
      handleStart(e.clientX, e.clientY);
    };

    const handleMouseMove = (e: MouseEvent) => {
      e.preventDefault();
      handleMove(e.clientX, e.clientY);
    };

    const handleMouseUp = () => handleEnd();
    const handleMouseLeave = () => handleEnd();

    const handleTouchStart = (e: TouchEvent) => {
      const touch = e.touches[0];
      handleStart(touch.clientX, touch.clientY);
    };

    const handleTouchMove = (e: TouchEvent) => {
      const touch = e.touches[0];
      handleMove(touch.clientX, touch.clientY);

      if (touchDirection === "horizontal") {
        e.preventDefault();
      }
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
    container.addEventListener("scroll", handleScroll, { passive: true });

    container.addEventListener("touchstart", handleTouchStart, {
      passive: true,
    });
    container.addEventListener("touchmove", handleTouchMove, {
      passive: false,
    });
    container.addEventListener("touchend", handleTouchEnd, {
      passive: true,
    });
    container.addEventListener("dragstart", preventDrag);

    return () => {
      container.removeEventListener("mousedown", handleMouseDown);
      container.removeEventListener("mousemove", handleMouseMove);
      container.removeEventListener("mouseup", handleMouseUp);
      container.removeEventListener("mouseleave", handleMouseLeave);
      container.removeEventListener("scroll", handleScroll);
      container.removeEventListener("touchstart", handleTouchStart);
      container.removeEventListener("touchmove", handleTouchMove);
      container.removeEventListener("touchend", handleTouchEnd);
      container.removeEventListener("dragstart", preventDrag);
    };
  }, [isDragging, dragStart, currentIndex, touchDirection, initialTouch]);

  const goToSlide = (index: number) => {
    const container = containerRef.current;
    if (!container) return;

    const cardWidth = container.querySelector(".card-item")?.clientWidth || 0;
    const gap = 16;
    const cardWithGap = cardWidth + gap;

    setCurrentIndex(index);
    updateArrowStates(index);
    container.scrollTo({
      left: index * cardWithGap,
      behavior: "smooth",
    });
  };

  const nextSlide = () => {
    if (window.innerWidth <= 768) {
      const nextIndex =
        currentIndex >= products.length - 1 ? 0 : currentIndex + 1;
      goToSlide(nextIndex);
    } else {
      const cardsPerPage = Math.floor(visibleCards);
      const maxIndex = Math.max(0, products.length - cardsPerPage);
      const nextIndex = Math.min(currentIndex + cardsPerPage, maxIndex);
      goToSlide(nextIndex);
    }
  };

  const prevSlide = () => {
    if (window.innerWidth <= 768) {
      const prevIndex =
        currentIndex <= 0 ? products.length - 1 : currentIndex - 1;
      goToSlide(prevIndex);
    } else {
      const cardsPerPage = Math.floor(visibleCards);
      const prevIndex = Math.max(currentIndex - cardsPerPage, 0);
      goToSlide(prevIndex);
    }
  };

  return (
    <SectionStructure>
      <div className="carousel-wrapper">
        <button
          className={`carousel-arrow-desktop carousel-arrow-desktop-prev ${
            !canScrollLeft ? "disabled" : ""
          }`}
          onClick={prevSlide}
          disabled={!canScrollLeft}
          aria-label="Productos anteriores"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path
              d="M15 18L9 12L15 6"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>

        <div className="carousel-container">
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

          <button
            className="carousel-arrow-mobile carousel-arrow-mobile-prev"
            onClick={prevSlide}
            aria-label="Producto anterior"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
              <path
                d="M15 18L9 12L15 6"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
          <button
            className="carousel-arrow-mobile carousel-arrow-mobile-next"
            onClick={nextSlide}
            aria-label="Producto siguiente"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
              <path
                d="M9 18L15 12L9 6"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </div>

        <button
          className={`carousel-arrow-desktop carousel-arrow-desktop-next ${
            !canScrollRight ? "disabled" : ""
          }`}
          onClick={nextSlide}
          disabled={!canScrollRight}
          aria-label="Productos siguientes"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path
              d="M9 18L15 12L9 6"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      </div>
    </SectionStructure>
  );
}

export default CardMap;
