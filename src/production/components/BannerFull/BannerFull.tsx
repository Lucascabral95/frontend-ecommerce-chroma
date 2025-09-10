"use client";
import { useMemo } from "react";
import Link from "next/link";
import Image from "next/image";

import "./BannerFull.scss";

interface ImageInterface {
  img: string;
  url: string;
}

const Images: ImageInterface[] = [
  {
    img: "/img/port-uno.webp",
    url: "/section/product/all?categoryId=6fddfssdf-0d1e-4234-f567-6789abcdef01",
  },
  {
    img: "/img/port-dos.webp",
    url: "/section/product?categoryId=3c4d5e6f-7a8b-4901-c234-3456789abcde&minPrice=25990",
  },
  {
    img: "/img/port-tres.webp",
    url: "/section/product?categoryId=6f7a8b9c-0d1e-32432-f567-6789abcdef01",
  },
];

function BannerFull() {
  const images = useMemo(() => Images, []);

  return (
    <div className="banner-full">
      <div className="banner-full__container">
        {images.map((image, index) => (
          <Link href={image.url} className="images-banner-full" key={index}>
            <Image
              className="image-banner-full"
              width={600}
              height={950}
              quality={100}
              src={image.img}
              alt={`Banner Full ${index + 1}`}
            />
          </Link>
        ))}
      </div>
    </div>
  );
}

export default BannerFull;
