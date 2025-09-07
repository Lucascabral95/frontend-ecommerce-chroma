"use client";
import useAuthStore from "@/lib/zustand/AuthZustand";
import { useCartStore } from "@/lib/zustand/CartZustand";
import { ReactNode, useEffect } from "react";

interface StoreInitializerProps {
  children: ReactNode;
}

export function StoreInitializer({ children }: StoreInitializerProps) {
  const { initializeFromStorage, userDataSession } = useAuthStore();
  const { fetchCart } = useCartStore();

  useEffect(() => {
    initializeFromStorage();
    if (userDataSession?.id) {
      fetchCart(userDataSession.id);
    }
  }, [initializeFromStorage, fetchCart, userDataSession?.id]);

  return <>{children}</>;
}
