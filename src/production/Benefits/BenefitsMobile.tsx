"use client";
import React, {
  useCallback,
  useEffect,
  useRef,
  useState,
  ReactNode,
} from "react";
import SectionStructure from "../Section/SectionStructure";
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";

interface Benefit {
  icon: ReactNode;
  title: string;
  detail: string;
}
interface Props {
  benefits: Benefit[];
}

export default function BenefitsMobile({ benefits }: Props) {
  const [index, setIndex] = useState(0);
  const trackRef = useRef<HTMLDivElement | null>(null);
  const viewportRef = useRef<HTMLDivElement | null>(null);

  const goPrev = useCallback(() => {
    setIndex((i) => (i - 1 + benefits.length) % benefits.length);
  }, [benefits.length]);

  const goNext = useCallback(() => {
    setIndex((i) => (i + 1) % benefits.length);
  }, [benefits.length]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") goPrev();
      if (e.key === "ArrowRight") goNext();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [goPrev, goNext]);

  useEffect(() => {
    const el = viewportRef.current;
    if (!el) return;
    let startX = 0;
    let deltaX = 0;

    const onTouchStart = (e: TouchEvent) => {
      startX = e.touches[0].clientX;
      deltaX = 0;
    };
    const onTouchMove = (e: TouchEvent) => {
      deltaX = e.touches[0].clientX - startX;
    };
    const onTouchEnd = () => {
      const threshold = 40;
      if (deltaX > threshold) goPrev();
      else if (deltaX < -threshold) goNext();
      deltaX = 0;
    };

    el.addEventListener("touchstart", onTouchStart, { passive: true });
    el.addEventListener("touchmove", onTouchMove, { passive: true });
    el.addEventListener("touchend", onTouchEnd);
    return () => {
      el.removeEventListener("touchstart", onTouchStart);
      el.removeEventListener("touchmove", onTouchMove);
      el.removeEventListener("touchend", onTouchEnd);
    };
  }, [goPrev, goNext]);

  return (
    <div
      className="benefits-mobile"
      aria-roledescription="carousel"
      aria-label="Beneficios"
    >
      <SectionStructure>
        <div className="carousel">
          <button
            className="carousel__btn prev"
            aria-label="Anterior"
            onClick={goPrev}
          >
            <MdKeyboardArrowLeft />
          </button>

          <div className="carousel__viewport" ref={viewportRef}>
            <div
              className="carousel__track"
              ref={trackRef}
              style={{ transform: `translateX(-${index * 100}%)` }}
            >
              {benefits.map((b, i) => (
                <div
                  className="carousel__slide"
                  role="group"
                  aria-roledescription="slide"
                  aria-label={`${i + 1} de ${benefits.length}`}
                  key={i}
                >
                  <div className="benefits">
                    <div className="benefit-icon">{b.icon}</div>
                    <div className="benefit-title">
                      <p>{b.title}</p>
                    </div>
                    <div className="benefit-detail">
                      <p>{b.detail}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <button
            className="carousel__btn next"
            aria-label="Siguiente"
            onClick={goNext}
          >
            <MdKeyboardArrowRight />
          </button>
        </div>

        <div className="carousel__dots" role="tablist" aria-label="Ir a slide">
          {benefits.map((_, i) => (
            <button
              key={i}
              className={`dot ${i === index ? "active" : ""}`}
              role="tab"
              aria-selected={i === index}
              aria-label={`Slide ${i + 1}`}
              onClick={() => setIndex(i)}
            />
          ))}
        </div>
      </SectionStructure>
    </div>
  );
}
