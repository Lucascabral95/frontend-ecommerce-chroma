"use client";
import { useState } from "react";

import "./ProductId.scss";
import { useParams } from "next/navigation";
import SectionStructure from "@/production/Section/SectionStructure";
import Link from "next/link";
import Image from "next/image";
import { FaPlus, FaMinus } from "react-icons/fa";
import MethodsPayments from "@/production/components/Collapse/MethodsPayments";
import useProducts from "@/production/Hooks/useProducts";
import { Size } from "@/Insfraestructure/Interfaces/enums/enums-global.interface";

function ProductID() {
  const { id } = useParams();
  const [quantity, setQuantity] = useState<number>(1);

  const [sizeSelected, setSizeSelected] = useState<Size | null>(null);
  const [stockLimit, setStockLimit] = useState<number>(0);

  const {
    productById: { data: productById },
  } = useProducts(id as string);

  const aumentarCantidad = () => {
    if (quantity < stockLimit) {
      setQuantity(quantity + 1);
    }
  };

  const disminuirCantidad = () => {
    if (quantity > 1 && quantity <= stockLimit) {
      setQuantity(quantity - 1);
    }
  };

  const selectSize = (size: Size) => {
    setQuantity(1);
    setSizeSelected(size);
    setStockLimit(
      productById?.variants.find((variant) => variant.size === size)?.stock || 0
    );
  };

  return (
    <SectionStructure>
      <div className="product-id">
        <div className="product-id__container">
          <div className="grid">
            <Link className="link" href="/">
              Home
            </Link>
            /<span>{productById?.name || "Nombre del producto"}</span>
          </div>
          <div className="product-id__content">
            <div className="product-images">
              <Image
                src={productById?.images[0].url || ""}
                alt={productById?.name || "Imágen del producto"}
                className="product-image-image"
                width={500}
                height={500}
              />
            </div>
            <div className="product-info">
              <h2 className="product-title">
                {productById?.name?.toUpperCase() || "Nombre del producto"}
              </h2>
              {/* <p className="code-title">Cod: {productById?.id} </p> */}
              <div className="divisorio"></div>
              <p className="product-price"> $ {productById?.basePrice} </p>
              <p className="withou-quotas">
                3 cuotas sin interes de ${" "}
                {Math.round(Number(productById?.basePrice) / 3)}
              </p>
              <p className="description">
                {productById?.description || "Descripción del producto"}
              </p>
              <div className="talles">
                <p className="talle-text">Talles: </p>
                <div className="tall">
                  {productById?.variants?.map((variant) => (
                    <div
                      onClick={() => selectSize(variant.size)}
                      className={
                        sizeSelected === variant.size
                          ? "talle talle-selected"
                          : "talle"
                      }
                      key={variant.id}
                    >
                      <p>{variant.size}</p>
                    </div>
                  ))}
                </div>
                {sizeSelected && (
                  <p className="stock-limit">
                    El stock actual del talle es de: {stockLimit}
                  </p>
                )}
              </div>
              <div className="button-add-cart-quantity">
                <div className="container-quantity">
                  <div className="icono" onClick={disminuirCantidad}>
                    <FaMinus
                      className="icon"
                      style={{
                        cursor: quantity === 1 ? "not-allowed" : "pointer",
                      }}
                    />
                  </div>
                  <div className="in">
                    <input
                      className="input"
                      type="number"
                      min={1}
                      style={{
                        color: quantity === stockLimit ? "red" : "black",
                      }}
                      value={quantity}
                      onChange={(e) => setQuantity(Number(e.target.value))}
                    />
                  </div>
                  <div className="icono" onClick={aumentarCantidad}>
                    <FaPlus
                      className="icon"
                      style={{
                        cursor:
                          quantity === stockLimit ? "not-allowed" : "pointer",
                      }}
                    />
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
