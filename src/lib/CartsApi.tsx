import axiosInstance from "@/Insfraestructure/Api/Axios-config";
import {
  CartByIdInterface,
  CreateItemInterface,
  ResponseUpdateItemForItemIDInterface,
  UpdateItemInterface,
} from "@/Insfraestructure/Interfaces/Carts/Carts.interface";
import { isAxiosError } from "axios";

export async function getCartByUserId(userId: string) {
  try {
    const { data } = await axiosInstance.get<CartByIdInterface>(
      `/cart/user/${userId}`
    );

    return data;
  } catch (error) {
    console.log(error);
  }
}

export async function emptyCart(cartId: string) {
  try {
    const { data } = await axiosInstance.delete<string>(
      `/cart/${cartId}/clear`
    );

    return data;
  } catch (error) {
    if (isAxiosError(error)) {
      const status = error.response?.status ?? null;
      const message =
        error.response?.data?.message ||
        error.message ||
        "Error al vaciar el carrito";
      throw { status, message };
    }
  }
}

export async function updateCartItemByItemId(
  itemId: string,
  update: UpdateItemInterface
) {
  try {
    const { data } =
      await axiosInstance.patch<ResponseUpdateItemForItemIDInterface>(
        `/cart/${itemId}/items`,
        update
      );

    return data;
  } catch (error) {
    if (isAxiosError(error)) {
      const status = error.response?.status ?? null;
      const message =
        error.response?.data?.message ||
        error.message ||
        "Error al actualizar el carrito";
      throw { status, message };
    }
  }
}

export async function deleteItemById(cartId: string, itemId: string) {
  try {
    const { data } = await axiosInstance.delete<string>(
      `/cart/${cartId}/items/${itemId}`
    );

    return data;
  } catch (error) {
    if (isAxiosError(error)) {
      const status = error.response?.status ?? null;
      const message =
        error.response?.data?.message ||
        error.message ||
        "Error al eliminar el carrito";
      throw { status, message };
    }
  }
}

export async function createItem(
  cartId: string,
  variantId: string,
  createItem: CreateItemInterface
) {
  try {
    const { data } = await axiosInstance.post<string>(
      `/cart/add/${cartId}/items/${variantId}`,
      createItem
    );

    return data;
  } catch (error) {
    if (isAxiosError(error)) {
      const status = error.response?.status ?? null;
      const message =
        error.response?.data?.message ||
        error.message ||
        "Error al crear el carrito";
      throw { status, message };
    }
  }
}
