import { create } from "zustand";

interface CartStore {
  cart: number;
  addToCart: (product: unknown) => void;
  clearCart: () => void;

  logueo: string;
}

export const useCartStore = create<CartStore>((set) => ({
  cart: 1,
  addToCart: (product: unknown) => set((state) => ({ cart: state.cart + 1 })),
  clearCart: () => set(() => ({ cart: 0 })),

  logueo: localStorage.getItem("auth") || "No estas logueado.",
}));
