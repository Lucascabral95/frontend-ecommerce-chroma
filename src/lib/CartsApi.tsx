import axiosInstance from "@/Insfraestructure/Api/Axios-config";
import { CartByIdInterface } from "@/Insfraestructure/Interfaces/Carts/Carts.interface";

export async function getCartById(id: string) {
  try {
    const { data } = await axiosInstance.get<CartByIdInterface>(`/cart/${id}`);

    console.log(data);

    return data;
  } catch (error) {
    console.log(error);
  }
}

export async function addProductToCart(id: string) {
  try {
    await axiosInstance.post(`/carts/${id}`);
  } catch (error) {
    console.log(error);
  }
}

export async function emptyCart(id: string) {
  try {
    await axiosInstance.delete(`/carts/${id}`);
  } catch (error) {
    console.log(error);
  }
}

export async function updateCart(id: string) {
  try {
    await axiosInstance.patch(`/carts/${id}`);
  } catch (error) {
    console.log(error);
  }
}

export async function createCart() {
  try {
  } catch (error) {
    console.log(error);
  }
}
