// "use client";
// import React from "react";
// import Image from "next/image";
// import Link from "next/link";

// import "./CardProduct.scss";
// import SliderSimple from "@/production/Sliders/SliderSimple";

// interface Product {
//   id: string;
//   title: string;
//   url: string;
//   price: number;
// }

// interface Props {
//   products: Product[];
// }

// function ProductSlider({ products }: Props) {
//   return (
//     <div className="product-slider-container">
//       <SliderSimple>
//         {products.map((item) => (
//           <div className="image-card-contenedor" key={item.id}>
//             <div className="image-card">
//               <Link href={item.url}>
//                 <Image
//                   className="image-card-image"
//                   width={500}
//                   height={500}
//                   src={item.url || "/img/oferta-1.webp"}
//                   alt={item.title}
//                   quality={100}
//                 />
//               </Link>
//             </div>
//             <Link href={item.url} className="title-card">
//               <p className="title-text"> {item.title.toLocaleUpperCase()} </p>
//             </Link>
//             <div className="price-card">
//               <p className="price-text"> ${item.price} </p>
//             </div>
//             <div className="price-in-quotes-card">
//               <p className="price-text-in-quotes">
//                 3 cuotas sin interés de ${(item.price / 3).toFixed(2)}
//               </p>
//             </div>
//           </div>
//         ))}
//       </SliderSimple>
//     </div>
//   );
// }

// export default ProductSlider;
"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";

import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";

import "./CardProduct.scss";

interface Product {
  id: string;
  title: string;
  url: string;
  price: number;
}

interface Props {
  products: Product[];
}

function ProductSlider({ products }: Props) {
  return (
    <div className="product-slider-container">
      <div className="icono">
        <IoIosArrowBack className="icon" />
      </div>
      {products.map((item, index) => (
        <div className="image-card-contenedor" key={index}>
          <div className="image-card">
            <Link href={item.url}>
              <Image
                className="image-card-image"
                width={500}
                height={500}
                src={item.url || "/img/oferta-1.webp"}
                alt={item.title}
                quality={100}
              />
            </Link>
          </div>
          <Link href={item.url} className="title-card">
            <p className="title-text"> {item.title.toLocaleUpperCase()} </p>
          </Link>
          <div className="price-card">
            <p className="price-text"> ${item.price} </p>
          </div>
          <div className="price-in-quotes-card">
            <p className="price-text-in-quotes">
              3 cuotas sin interés de ${(item.price / 3).toFixed(2)}
            </p>
          </div>
        </div>
      ))}
      <div className="icono">
        <IoIosArrowForward className="icon" />
      </div>
    </div>
  );
}

export default ProductSlider;
