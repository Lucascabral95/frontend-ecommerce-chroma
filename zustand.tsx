import { create } from "zustand";

interface CartStore {
  cart: unknown[];
  addToCart: (product: unknown) => void;
}

export const useCartStore = create<CartStore>((set) => ({
  cart: [],
  addToCart: (product: unknown) =>
    set((state) => ({ cart: [...state.cart, product] })),
}));
