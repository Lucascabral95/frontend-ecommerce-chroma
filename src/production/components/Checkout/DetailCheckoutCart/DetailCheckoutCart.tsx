"use client";
import { useMemo } from "react";

import { CartByIdInterface } from "@/Insfraestructure/Interfaces/Carts/Carts.interface";
import CheckoutCart from "../CheckoutCart/CheckoutCart";
import "./DetailCheckoutCart.scss";

interface Props {
  cart: CartByIdInterface | undefined;
}

const WIDTH_TABLE_PRODUCTS = "100%";

function DetailCheckoutCart({ cart }: Props) {
  const totalCart = useMemo(() => {
    return cart?.items?.reduce(
      (acc, item) => acc + item.variant.price * item.quantity,
      0
    );
  }, [cart]);

  return (
    <div className="detail-checkout-cart">
      <div className="detail-checkout-cart__container">
        <div className="title-checkout-cart">
          <h4> Detalles de la compra </h4>
        </div>
        <div className="table-details">
          <div className="tablee-of-products">
            <CheckoutCart cart={cart} width={WIDTH_TABLE_PRODUCTS} />
          </div>
          <div className="details">
            <div className="text">
              <p> Resumen de la compra </p>
            </div>
            <div className="div-text">
              <div className="text-first">
                <p> Subtotal </p>
              </div>
              <div className="text-first">
                <p> ${totalCart} </p>
              </div>
            </div>
            <div className="div-text">
              <div className="text-first">
                <p> Descuento total </p>
              </div>
              <div className="text-first">
                <p> $0 </p>
              </div>
            </div>
            <div className="div-text-buy">
              <div className="text-first">
                <p> Total </p>
              </div>
              <div className="text-first">
                <p> ${totalCart} </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DetailCheckoutCart;
