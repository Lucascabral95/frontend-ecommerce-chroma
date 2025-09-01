"use client";

import React from "react";
import Slider from "react-slick";
import Image from "next/image";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./Hero.scss";

const ImageCarousel = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2800,
    arrows: false,
    adaptiveHeight: false,
  };

  const images = [
    "/devre-promo-1.webp",
    "/devre-promo-2.webp",
    "/devre-promo-3.webp",
    "/devre-promo-4.webp",
  ];

  return (
    <div className="hero">
      <Slider {...settings}>
        {images.map((src, index) => (
          <div key={index} className="imagesHero">
            <Image
              src={src}
              alt={`slide ${index + 1}`}
              width={1920}
              height={900}
              quality={100}
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
