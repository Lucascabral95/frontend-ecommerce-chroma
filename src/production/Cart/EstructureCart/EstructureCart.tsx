"use client";
import { useMemo } from "react";

import { CartByIdInterface } from "@/Insfraestructure/Interfaces/Carts/Carts.interface";
import CartCard from "./CartCard/CartCard";
import Toast from "@/Shared/Components/Toast";
import { useCartStore } from "@/lib/zustand/CartZustand";
import "./EstructureCart.scss";

interface Props {
  cartById: CartByIdInterface | undefined;
}

function EstructureCart({ cartById }: Props) {
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

  const displayTotal = useMemo(() => {
    return cartTotalPrice || 0;
  }, [cartTotalPrice]);

  const cartActions = useMemo(
    () => ({
      aumentQuantity: incrementQuantity,
      decrementQuantity: decrementQuantity,
      handleRemoveItem: removeItem,
      checkout: checkout,
    }),
    [incrementQuantity, decrementQuantity, removeItem, checkout]
  );

  return (
    <div className="estructure-cart">
      <div className="estructure-cart__container">
        <div className="container-cards">
          <CartCard cartItems={currentCart} {...cartActions} />
        </div>

        <div className="container-info">
          <h3>Resumen de compra</h3>

          <div className="container-sections-break">
            <div className="subtotal-price">
              <div className="subtotal">
                <p>Subtotal</p>
              </div>
              <div className="price">
                <p>${displayTotal}</p>
              </div>
            </div>
          </div>

          <div className="container-sections-break">
            <div className="subtotal-price">
              <div className="subtotal">
                <p>Descuento total</p>
              </div>
              <div className="price">
                <p>$0</p>
              </div>
            </div>
          </div>

          <div className="container-sections-break">
            <div className="total-price">
              <div className="total">
                <p>Total</p>
              </div>
              <div className="price">
                <p>${displayTotal}</p>
              </div>
            </div>
          </div>

          <div className="container-sections-break-button">
            <button
              onClick={checkout}
              disabled={isLoading || !currentCart?.items?.length}
            >
              {isLoading ? "PROCESANDO..." : "INICIAR COMPRA"}
            </button>
          </div>
        </div>
      </div>

      {toast.message && <Toast message={toast.message} error={toast.error} />}
    </div>
  );
}

export default EstructureCart;
