"use client";
import { useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { FaPlus, FaMinus } from "react-icons/fa";

import SectionStructure from "@/production/Section/SectionStructure";
import MethodsPayments from "@/production/components/Collapse/MethodsPayments";
import useProducts from "@/production/Hooks/useProducts";
import { Size } from "@/Insfraestructure/Interfaces/enums/enums-global.interface";
import ProductByIdLoading from "@/production/ProductById/ProductByIdLoading";
import ProductByIdError from "@/production/ProductById/ProductByIdError";
import { useCartStore } from "@/lib/zustand/CartZustand";
import Toast from "@/Shared/Components/Toast";
import { useSEO } from "@/production/Hooks/useSEO";
import SEO from "@/production/components/SEO";
import "./ProductId.scss";

const TOAST_TIME = 1800;

function ProductID() {
  const { id } = useParams();

  const [quantity, setQuantity] = useState<number>(1);
  const [sizeSelected, setSizeSelected] = useState<Size | null>(null);
  const [stockLimit, setStockLimit] = useState<number>(0);
  const [toastMessage, setToastMessage] = useState<{
    message: string;
    error: boolean;
  }>({ message: "", error: false });

  const {
    productById: { data: productById, isLoading, isError },
  } = useProducts(id as string);

  const { cart, addToCart } = useCartStore();

  const seoData = useSEO({
    title: (() => {
      if (isLoading) return "Cargando Producto - Chroma";
      if (isError) return "Error al Cargar Producto - Chroma";
      if (!productById) return "Producto No Encontrado - Chroma";
      return `${productById.name} - Indumentaria Masculina`;
    })(),

    description: (() => {
      if (isLoading) return "Cargando información del producto...";
      if (isError) return "Error al cargar el producto. Intenta nuevamente.";
      if (!productById) return "El producto solicitado no fue encontrado.";

      const desc =
        productById.description?.substring(0, 100) || productById.name;
      return `${desc}... Desde $${productById.basePrice}. Envío gratis desde $25.000. 3 cuotas sin interés en Chroma.`;
    })(),

    path: `/product/${id}`,
    image: productById?.images?.[0]?.url ?? "/img/logo-chroma-ecommerce.png",
    keywords: productById
      ? `${productById.name}, indumentaria masculina, ropa hombre, Chroma`
      : "productos, ropa masculina, Chroma",
    type: "product",
    noIndex: false,
  });

  const aumentarCantidad = () => {
    setQuantity((prev) => (prev < stockLimit ? prev + 1 : prev));
  };

  const disminuirCantidad = () => {
    setQuantity((prev) => (prev > 1 && prev <= stockLimit ? prev - 1 : prev));
  };

  const selectSize = (size: Size) => {
    setQuantity(1);
    setSizeSelected(size);
    setStockLimit(
      productById?.variants.find((variant) => variant.size === size)?.stock ?? 0
    );
  };

  if (isLoading) {
    return <ProductByIdLoading detail="producto" />;
  }

  if (isError || !productById) {
    return (
      <ProductByIdError
        title="Error al Cargar el Producto"
        description="Lo sentimos, no pudimos encontrar el producto que buscas. Por favor, revisa la URL o intenta de nuevo."
      />
    );
  }

  const showToast = (message: string, error: boolean) => {
    setToastMessage({ message, error });
    setTimeout(
      () => setToastMessage({ message: "", error: false }),
      TOAST_TIME
    );
  };

  const handleAddToCart = (variantId: string) => {
    if (sizeSelected && cart?.id) {
      addToCart(cart.id, variantId, cart.userId, {
        quantity: quantity,
        cartId: cart.id,
        variantId: variantId,
      });
      showToast("Producto agregado al carrito", false);
    } else {
      console.error(
        "No se puede agregar al carrito: tamaño no seleccionado o carrito no disponible"
      );
      showToast(
        "No se puede agregar al carrito: tamaño no seleccionado o carrito no disponible",
        true
      );
    }
  };

  return (
    <SectionStructure>
      <SEO {...seoData} />
      <div className="product-id">
        <div className="product-id__container">
          <div className="grid">
            <Link className="link" href="/">
              Home
            </Link>
            /<span>{productById.name}</span>
          </div>
          <div className="product-id__content">
            <div className="product-images">
              <Image
                src={productById.images[0]?.url ?? ""}
                alt={productById.name}
                className="product-image-image"
                width={500}
                height={500}
                priority
              />
            </div>
            <div className="product-info">
              <h2 className="product-title">
                {productById.name.toUpperCase()}
              </h2>
              <div className="divisorio"></div>
              <p className="product-price"> $ {productById.basePrice} </p>
              <p className="withou-quotas">
                3 cuotas sin interés de ${" "}
                {Math.round(Number(productById.basePrice) / 3)}
              </p>
              <p className="description">{productById.description}</p>
              <div className="talles">
                <p className="talle-text">Talles: </p>
                <div className="tall">
                  {productById.variants?.map((variant) => (
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
                    Stock disponible para este talle: {stockLimit}
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
                <button
                  className="button-add-cart"
                  disabled={!sizeSelected || stockLimit === 0}
                  style={{
                    cursor:
                      !sizeSelected || stockLimit === 0
                        ? "not-allowed"
                        : "pointer",
                  }}
                  onClick={() =>
                    handleAddToCart(
                      productById?.variants.find(
                        (variant) => variant.size === sizeSelected
                      )?.id ?? ""
                    )
                  }
                >
                  Agregar al carrito
                </button>
              </div>
              <MethodsPayments />
            </div>
          </div>
        </div>
      </div>
      {toastMessage && (
        <Toast message={toastMessage.message} error={toastMessage.error} />
      )}
    </SectionStructure>
  );
}

export default ProductID;
