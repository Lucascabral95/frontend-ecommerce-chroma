"use client";
import { useEffect, useState, useCallback } from "react";

import EstructureCartCheckoutProfile from "@/production/components/EstructureCartCheckoutProfile/EstructureCartCheckoutProfile";
import useAuthStore from "@/lib/zustand/AuthZustand";
import EstructureCart from "@/production/Cart/EstructureCart/EstructureCart";
import ProductByIdError from "@/production/ProductById/ProductByIdError";
import ProductByIdLoading from "@/production/ProductById/ProductByIdLoading";
import { getCartByUserId } from "@/lib/CartsApi";
import { useCartStore } from "@/lib/zustand/CartZustand";
import { useSEO } from "@/production/Hooks/useSEO";
import SEO from "@/production/components/SEO";
import "./CartPage.scss";

type LoadingState = "idle" | "loading" | "success" | "error" | "empty";

function CartPage() {
  const { cart } = useCartStore();
  const { userDataSession } = useAuthStore();
  const [loadingState, setLoadingState] = useState<LoadingState>("idle");

  const useData = useSEO({
    title: "Mi Carrito - Revisar Productos | Chroma",
    description:
      "Revisa los productos en tu carrito de compras. Envío gratuito desde $25.000, múltiples métodos de pago y compra 100% segura en Chroma.",
    path: "/checkout/cart",
    image: "/img/logo-chroma-ecommerce.png",
    keywords:
      "carrito compras, revisar productos, envío gratis Chroma, métodos pago seguros, indumentaria masculina",
    type: "website",
    noIndex: true,
  });

  const fetchCartData = useCallback(
    async (userId: string, signal: AbortSignal) => {
      try {
        setLoadingState("loading");
        const cartData = await getCartByUserId(userId);

        if (signal.aborted) return;

        if (!cartData || !cartData.items?.length) {
          setLoadingState("empty");
        } else {
          setLoadingState("success");
        }
      } catch (error) {
        if (!signal.aborted) {
          console.error("Error fetching cart:", error);
          setLoadingState("error");
        }
      }
    },
    []
  );

  useEffect(() => {
    if (!userDataSession?.id) {
      setLoadingState("empty");
      return;
    }

    const abortController = new AbortController();

    fetchCartData(userDataSession.id, abortController.signal);

    return () => {
      abortController.abort();
    };
  }, [userDataSession?.id, fetchCartData]);

  if (loadingState === "loading") {
    return <ProductByIdLoading detail="carrito" />;
  }

  if (loadingState === "error") {
    return (
      <ProductByIdError
        title="Error al cargar el carrito"
        description="Intentalo más tarde nuevamente."
      />
    );
  }

  if (loadingState === "empty" || !cart?.items?.length) {
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
      <SEO {...useData} />
      <div className="cart-section">
        <div className="cart-section__container">
          <EstructureCart cartById={cart} />
        </div>
      </div>
    </EstructureCartCheckoutProfile>
  );
}

export default CartPage;
