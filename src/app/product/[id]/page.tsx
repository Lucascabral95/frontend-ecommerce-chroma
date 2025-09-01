"use client";
import React, { useState } from "react";

import "./ProductId.scss";
import { useParams } from "next/navigation";
import SectionStructure from "@/production/Section/SectionStructure";
import Link from "next/link";
import Image from "next/image";
import { FaPlus, FaMinus } from "react-icons/fa";
import MethodsPayments from "@/production/components/Collapse/MethodsPayments";

function ProductID() {
  const { id } = useParams();
  const [quantity, setQuantity] = useState<number>(1);

  const aumentarCantidad = () => {
    setQuantity(quantity + 1);
  };

  const disminuirCantidad = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  return (
    <SectionStructure>
      <div className="product-id">
        <div className="product-id__container">
          <div className="grid">
            <Link className="link" href="/">
              Home
            </Link>
            / <span>{id}</span>
          </div>
          <div className="product-id__content">
            <div className="product-images">
              <Image
                src="https://www.devre.la/media/catalog/product/d/e/devre-chaqueta_72d000011-014_000.jpg?optimize=high&bg-color=255,255,255&fit=bounds&height=1350&width=900&canvas=900:1350"
                alt="product"
                className="product-image-image"
                width={500}
                height={500}
              />
            </div>
            <div className="product-info">
              <h2 className="product-title">CHAQUETA DEVRE </h2>
              <p className="code-title">
                Cod: 32948328u49382u4238u49238ujdkjnsdkjn
              </p>
              <div className="divisorio"></div>
              <p className="product-price"> $ 99.990</p>
              <p className="withou-quotas">3 cuotas sin interes de $ 33.330 </p>
              <p className="description">
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Consequuntur, debitis. Delectus inventore voluptate
                exercitationem iusto eveniet quibusdam voluptatibus incidunt
                temporibus accusamus aliquam, itaque quidem! Inventore similique
                fugiat reprehenderit iste id?
              </p>
              <div className="talles">
                <p className="talle-text">Talles: </p>
                <div className="tall">
                  <div className="talle">
                    <p>XS</p>
                  </div>
                  <div className="talle">
                    <p>S</p>
                  </div>
                  <div className="talle">
                    <p>M</p>
                  </div>
                  <div className="talle">
                    <p>L</p>
                  </div>
                  <div className="talle">
                    <p>XL</p>
                  </div>
                </div>
              </div>
              <div className="button-add-cart-quantity">
                <div className="container-quantity">
                  <div className="icono" onClick={disminuirCantidad}>
                    <FaMinus className="icon" />
                  </div>
                  <div className="in">
                    <input
                      className="input"
                      type="number"
                      min={1}
                      value={quantity}
                      onChange={(e) => setQuantity(Number(e.target.value))}
                    />
                  </div>
                  <div className="icono" onClick={aumentarCantidad}>
                    <FaPlus className="icon" />
                  </div>
                </div>
                <button className="button-add-cart">Agregar al carrito</button>
              </div>
              <MethodsPayments />
            </div>
          </div>
        </div>
      </div>
    </SectionStructure>
  );
}

export default ProductID;
