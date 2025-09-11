"use client";
import { create } from "zustand";

import {
  CartByIdInterface,
  CreateItemInterface,
} from "@/Insfraestructure/Interfaces/Carts/Carts.interface";
import {
  createItem,
  getCartByUserId,
  updateCartItemByItemId,
  deleteItemById,
} from "../CartsApi";

interface ToastState {
  message: string;
  error: boolean;
}

interface CartStore {
  cart: CartByIdInterface | undefined;
  isLoading: boolean;
  error: string | null;
  toast: ToastState;

  cartTotalPrice: number;
  cartQuantityProducts: number;

  setCart: (cart: CartByIdInterface) => void;
  fetchCart: (userId: string) => Promise<void>;
  addToCart: (
    cartId: string,
    variantId: string,
    userId: string,
    createItem: CreateItemInterface
  ) => Promise<void>;

  incrementQuantity: (itemId: string) => Promise<void>;
  decrementQuantity: (itemId: string) => Promise<void>;
  removeItem: (itemId: string) => Promise<void>;
  checkout: () => void;

  showToast: (message: string, error?: boolean) => void;
  clearToast: () => void;

  calculateTotals: () => void;

  // Reset carrito
  resetCart: () => void;
}

export const useCartStore = create<CartStore>((set, get) => ({
  cart: undefined,
  isLoading: false,
  error: null,
  toast: { message: "", error: false },
  cartTotalPrice: 0,
  cartQuantityProducts: 0,

  setCart: (cart: CartByIdInterface) => {
    set({ cart });
    get().calculateTotals();
  },

  calculateTotals: () => {
    const { cart } = get();
    if (!cart?.items) {
      set({ cartTotalPrice: 0, cartQuantityProducts: 0 });
      return;
    }

    const totalPrice = cart.items.reduce(
      (acc, item) => acc + (item.quantity || 0) * (item.variant.price || 0),
      0
    );

    const totalQuantity = cart.items.reduce(
      (acc, item) => acc + (item.quantity || 0),
      0
    );

    set({
      cartTotalPrice: totalPrice,
      cartQuantityProducts: totalQuantity,
    });
  },

  fetchCart: async (userId: string) => {
    set({ isLoading: true, error: null });
    try {
      const cartData = await getCartByUserId(userId);
      if (cartData) {
        set({ cart: cartData });
        get().calculateTotals();
      }
    } catch (error) {
      set({ error: "Error al cargar el carrito" });
      get().showToast("Error al cargar el carrito", true);
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
      set({ isLoading: true });
      await createItem(cartId, variantId, createItemBody);

      const updatedCart = await getCartByUserId(userId);
      if (updatedCart) {
        set({ cart: updatedCart });
        get().calculateTotals();
        get().showToast("Producto agregado al carrito");
      }
    } catch (error) {
      get().showToast("Error al agregar producto", true);
      console.error("Error adding to cart:", error);
    } finally {
      set({ isLoading: false });
    }
  },

  incrementQuantity: async (itemId: string) => {
    const { cart } = get();
    if (!cart) return;

    const updatedCart = {
      ...cart,
      items: cart.items?.map((item) =>
        item.id === itemId ? { ...item, quantity: item.quantity + 1 } : item
      ),
    };

    set({ cart: updatedCart });
    get().calculateTotals();

    try {
      const currentItem = cart.items?.find((item) => item.id === itemId);
      if (currentItem) {
        await updateCartItemByItemId(itemId, {
          quantity: currentItem.quantity + 1,
        });
        get().showToast("Cantidad actualizada");
      }
    } catch (error) {
      set({ cart });
      get().calculateTotals();
      get().showToast("Error al actualizar cantidad", true);
      console.error("Error incrementing quantity:", error);
    }
  },

  decrementQuantity: async (itemId: string) => {
    const { cart } = get();
    if (!cart) return;

    const currentItem = cart.items?.find((item) => item.id === itemId);
    if (!currentItem || currentItem.quantity <= 1) return;

    const updatedCart = {
      ...cart,
      items: cart.items?.map((item) =>
        item.id === itemId ? { ...item, quantity: item.quantity - 1 } : item
      ),
    };

    set({ cart: updatedCart });
    get().calculateTotals();

    try {
      await updateCartItemByItemId(itemId, {
        quantity: currentItem.quantity - 1,
      });
      get().showToast("Cantidad actualizada");
    } catch (error) {
      set({ cart });
      get().calculateTotals();
      get().showToast("Error al actualizar cantidad", true);
      console.error("Error decrementing quantity:", error);
    }
  },

  removeItem: async (itemId: string) => {
    const { cart } = get();
    if (!cart) return;

    const updatedCart = {
      ...cart,
      items: cart.items?.filter((item) => item.id !== itemId),
    };

    set({ cart: updatedCart });
    get().calculateTotals();

    try {
      await deleteItemById(cart.id as string, itemId);
      get().showToast("Producto eliminado");
    } catch (error) {
      set({ cart });
      get().calculateTotals();
      get().showToast("Error al eliminar producto", true);
      console.error("Error removing item:", error);
    }
  },

  checkout: () => {
    window.location.href = "/checkout";
  },

  showToast: (message: string, error: boolean = false) => {
    set({ toast: { message, error } });

    setTimeout(() => {
      get().clearToast();
    }, 1900);
  },

  clearToast: () => {
    set({ toast: { message: "", error: false } });
  },

  resetCart: () => {
    set({ cart: undefined });
  },
}));
