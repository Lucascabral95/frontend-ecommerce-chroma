import axiosInstance from "@/Insfraestructure/Api/Axios-config";
import {
  CartByIdInterface,
  CreateItemInterface,
  ResponseUpdateItemForItemIDInterface,
  UpdateItemInterface,
} from "@/Insfraestructure/Interfaces/Carts/Carts.interface";

export async function getCartByUserId(userId: string) {
  // Obtener carrito por id de usuario
  try {
    const { data } = await axiosInstance.get<CartByIdInterface>(
      `/cart/user/${userId}`
    );
    console.log(data);

    return data;
  } catch (error) {
    console.log(error);
  }
}

export async function emptyCart(cartId: string) {
  // Vaciar todo el carrito
  try {
    const { data } = await axiosInstance.delete<string>(
      `/cart/${cartId}/clear`
    );
    console.log(data);

    return data;
  } catch (error) {
    console.log(error);
  }
}

export async function updateCartItemByItemId( // Actualizar cantidad de un producto
  itemId: string,
  update: UpdateItemInterface
) {
  try {
    const { data } =
      await axiosInstance.patch<ResponseUpdateItemForItemIDInterface>(
        `/cart/${itemId}/items`,
        update
      );
    console.log(data);

    return data;
  } catch (error) {
    console.log(error);
  }
}

export async function deleteItemById(cartId: string, itemId: string) {
  // Eliminar un producto del carrito
  try {
    const { data } = await axiosInstance.delete<string>(
      `/cart/${cartId}/items/${itemId}`
    );
    console.log(data);

    return data;
  } catch (error) {
    console.log(error);
  }
}

export async function createItem(
  cartId: string,
  variantId: string,
  createItem: CreateItemInterface
) {
  // Agregar un producto al carrito, si ya lo tenes, se suma un quantity
  try {
    const { data } = await axiosInstance.post<string>(
      `/cart/add/${cartId}/items/${variantId}`,
      createItem
    );
    console.log(data);

    return data;
  } catch (error) {
    console.log(error);
  }
}
