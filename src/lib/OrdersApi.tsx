import axiosInstance from "@/Insfraestructure/Api/Axios-config";
import {
  CreateOrderInterface,
  ResponseCreateOrderInterface,
} from "@/Insfraestructure/Interfaces/Orders/Orders";
import { isAxiosError } from "axios";

export async function createOrder(
  userId: string,
  createOrderInterface: CreateOrderInterface
) {
  try {
    const { data } = await axiosInstance.post<ResponseCreateOrderInterface>(
      `/orders/${userId}`,
      createOrderInterface
    );
    console.log(data);

    return data;
  } catch (error: unknown) {
    if (isAxiosError(error)) {
      const status = error.response?.status ?? null;
      const message =
        error.response?.data?.message ||
        error.message ||
        "Error al crear la orden";
      throw { status, message };
    }
    console.log(error);
    throw { status: null, message: "Error inesperado" };
  }
}

export async function cancelOrderByOrderId(orderId: string) {
  try {
    const { data } = await axiosInstance.post(`/orders/${orderId}/cancel`);
    console.log(data);

    return data;
  } catch (error) {
    if (isAxiosError(error)) {
      const status = error.response?.status ?? null;
      const message =
        error.response?.data?.message ||
        error.message ||
        "Error al cancelar la orden";
      throw { status, message };
    }
  }
}
