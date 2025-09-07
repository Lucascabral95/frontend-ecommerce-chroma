import {
  CartByIdInterface,
  CreateItemInterface,
} from "@/Insfraestructure/Interfaces/Carts/Carts.interface";
import { create } from "zustand";
import { createItem, getCartByUserId } from "../CartsApi";

interface CartStore {
  cart: CartByIdInterface | undefined;
  isLoading: boolean;
  error: string | null;
  setCart: (cart: CartByIdInterface) => void;
  fetchCart: (userId: string) => Promise<void>;
  addToCart: (
    cartId: string,
    variantId: string,
    userId: string,
    createItem: CreateItemInterface
  ) => void;
}

export const useCartStore = create<CartStore>((set) => ({
  cart: undefined,
  isLoading: false,
  error: null,

  setCart: (cart: CartByIdInterface) => set({ cart }),

  fetchCart: async (userId: string) => {
    set({ isLoading: true, error: null });
    try {
      const cartData = await getCartByUserId(userId);
      if (cartData) {
        set({ cart: cartData });
      }
    } catch (error) {
      set({ error: "Error al cargar el carrito" });
      console.error("Error fetching cart:", error);
    } finally {
      set({ isLoading: false });
    }
  },

  addToCart: async (
    cartId: string,
    variantId: string,
    userId: string,
    createItemBody: CreateItemInterface
  ) => {
    try {
      const data = await createItem(cartId, variantId, createItemBody);
      console.log(data);

      set({ cart: await getCartByUserId(userId) });
    } catch (error) {
      console.log(error);
    }
  },
}));
