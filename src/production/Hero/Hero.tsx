"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import "./Hero.scss";

const bpMd = 768;

function useWindowWidth() {
  const [width, setWidth] = useState<number | null>(null);

  useEffect(() => {
    const update = () => setWidth(window.innerWidth);
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);
  return width;
}

const settings = {
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
  autoplay: true,
  autoplaySpeed: 2800,
  arrows: false,
  adaptiveHeight: true,
};

const imagesDesktop: string[] = [
  "/img/port-horizont-uno.webp",
  "/img/port-horizont-dos.webp",
];

const imagesMobile: string[] = ["/img/port-horizont-uno-mobile.webp"];

const ImageCarousel = () => {
  const width = useWindowWidth();
  const isDesktop = (width ?? 0) >= bpMd;
  const images = isDesktop ? imagesDesktop : imagesMobile;

  return (
    <div className="hero">
      <Slider {...settings}>
        {images.map((src, index) => (
          <div key={src} className="imagesHero">
            <Image
              src={src}
              alt={`slide ${index + 1}`}
              width={1920}
              height={900}
              quality={85}
              priority={index === 0}
              className="imageHeroInterior"
            />
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default ImageCarousel;
