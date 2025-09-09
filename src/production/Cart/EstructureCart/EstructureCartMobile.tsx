"use client";
import { useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { CgMathPlus, CgMathMinus, CgTrash } from "react-icons/cg";

import { CartByIdInterface } from "@/Insfraestructure/Interfaces/Carts/Carts.interface";
import { useCartStore } from "@/lib/zustand/CartZustand";
import Toast from "@/Shared/Components/Toast";
import "./EstructureCart.scss";

interface Props {
  cartById: CartByIdInterface | undefined;
}

function EstructureCartMobile({ cartById }: Props) {
  const {
    cart,
    cartTotalPrice,
    incrementQuantity,
    decrementQuantity,
    removeItem,
    checkout,
    toast,
    isLoading,
  } = useCartStore();

  const currentCart = cart || cartById;
  const items = currentCart?.items || [];

  const displayTotal = cartTotalPrice || 0;

  const handleIncrement = useCallback(
    (itemId: string) => {
      incrementQuantity(itemId);
    },
    [incrementQuantity]
  );

  const handleDecrement = useCallback(
    (itemId: string) => {
      decrementQuantity(itemId);
    },
    [decrementQuantity]
  );

  const handleRemove = useCallback(
    (itemId: string) => {
      removeItem(itemId);
    },
    [removeItem]
  );

  if (!items.length) {
    return (
      <div className="empty-cart-mobile">
        <p>No hay productos en el carrito</p>
        <Link href="/" className="continue-shopping">
          Seguir comprando
        </Link>
      </div>
    );
  }

  return (
    <div className="estructure-cart-mobile">
      <div className="estructure-cart-mobile__container">
        <div className="cart-items">
          {items.map((item) => {
            const product = item.variant?.product;
            const variant = item.variant;
            const price = variant?.price || 0;
            const subtotal = price * item.quantity;

            return (
              <div key={item.id} className="cart-item">
                <div className="item-image">
                  <Link href={`/product/${product?.id}`}>
                    <Image
                      src={product?.images?.[0]?.url || ""}
                      alt={product?.name || "Producto"}
                      width={80}
                      height={120}
                      className="product-image"
                    />
                  </Link>
                </div>

                <div className="item-details">
                  <Link
                    href={`/product/${product?.id}`}
                    className="product-name"
                  >
                    {product?.name}
                  </Link>
                  <p className="variant-info">Talle: {variant?.size}</p>
                  <p className="price">${price}</p>

                  <div className="quantity-controls">
                    <button
                      onClick={() => handleDecrement(item.id)}
                      className="quantity-btn"
                      disabled={item.quantity <= 1}
                    >
                      <CgMathMinus className="icon" />
                    </button>
                    <span className="quantity">{item.quantity}</span>
                    <button
                      onClick={() => handleIncrement(item.id)}
                      className="quantity-btn"
                    >
                      <CgMathPlus className="icon" />
                    </button>
                  </div>

                  <div className="item-subtotal">
                    <span>Subtotal:</span>
                    <span>${subtotal}</span>
                  </div>
                </div>

                <button
                  onClick={() => handleRemove(item.id)}
                  className="remove-item"
                >
                  <CgTrash className="icon" />
                </button>
              </div>
            );
          })}
        </div>

        <div className="cart-summary">
          <div className="summary-row">
            <span>Subtotal</span>
            <span>${displayTotal}</span>
          </div>
          <div className="summary-row">
            <span>Envío</span>
            <span>Gratis</span>
          </div>
          <div className="summary-row total">
            <span>Total</span>
            <span>${displayTotal}</span>
          </div>

          <button
            className="checkout-btn"
            onClick={checkout}
            disabled={isLoading}
          >
            {isLoading ? "Procesando..." : "Iniciar compra"}
          </button>

          <Link href="/" className="continue-shopping">
            Seguir comprando
          </Link>
        </div>
      </div>

      {toast.message && <Toast message={toast.message} error={toast.error} />}
    </div>
  );
}

export default EstructureCartMobile;
