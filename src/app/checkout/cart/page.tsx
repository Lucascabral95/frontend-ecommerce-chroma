"use client";

import EstructureCartCheckoutProfile from "@/production/components/EstructureCartCheckoutProfile/EstructureCartCheckoutProfile";

import "./CartPage.scss";

import useCart from "@/production/Hooks/useCart";
import useAuthStore from "@/lib/zustand/AuthZustand";
import EstructureCart from "@/production/Cart/EstructureCart/EstructureCart";
import ProductByIdError from "@/production/ProductById/ProductByIdError";
import ProductByIdLoading from "@/production/ProductById/ProductByIdLoading";
import { useEffect, useState } from "react";
import { CartByIdInterface } from "@/Insfraestructure/Interfaces/Carts/Carts.interface";

function CartPage() {
  const { userDataSession } = useAuthStore();
  const {
    cartById: { data: cartById, isLoading, isError },
  } = useCart(userDataSession?.id);
  const [cartTotal, setCartTotal] = useState<number>(0);
  const [cartItems, setCartItems] = useState<CartByIdInterface | undefined>(
    undefined
  );
  const [cartEmpty, setCartEmpty] = useState<boolean>(false);

  useEffect(() => {
    setCartItems(cartById);
  }, [cartById]);

  useEffect(() => {
    setCartTotal(
      cartItems?.items?.reduce(
        (acc, item) => acc + (item.quantity || 0) * (item.variant.price || 0),
        0
      ) || 0
    );
  }, [cartItems?.items]);

  useEffect(() => {
    setCartEmpty(!cartItems?.items?.length);
  }, [cartItems?.items]);

  if (isLoading) {
    return <ProductByIdLoading detail="carrito" />;
  }

  if (isError) {
    return (
      <ProductByIdError
        title="Error al cargar el carrito"
        description="Intentalo más tarde nuevamente."
      />
    );
  }

  if (cartEmpty) {
    return (
      <ProductByIdError
        title="Carrito vacío"
        description="Aún no has agregado ningún producto al carrito."
      />
    );
  }

  return (
    <EstructureCartCheckoutProfile
      title="Carrito de compras"
      background="#F5F5F5"
    >
      <div className="cart-section">
        <div className="cart-section__container">
          <EstructureCart
            cartById={cartById}
            cartTotal={cartTotal}
            cartItems={cartItems}
            setCartItems={setCartItems}
          />
        </div>
      </div>
    </EstructureCartCheckoutProfile>
  );
}

export default CartPage;
