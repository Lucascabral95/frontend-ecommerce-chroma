import axiosInstance from "@/Insfraestructure/Api/Axios-config";
import {
  CreateOrderInterface,
  FilstersOrdersInterface,
  GetOrdersByUserIdInterface,
  GetOrdersByUserIdInterfaceArray,
  OrderStatus,
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
    throw { status: null, message: "Error inesperado" };
  }
}

export async function cancelOrderByOrderId(orderId: string) {
  try {
    const { data } = await axiosInstance.post(`/orders/${orderId}/cancel`);

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

export async function getOrderByUserId(
  userId: string,
  filters?: FilstersOrdersInterface
) {
  try {
    const { data } = await axiosInstance.get<GetOrdersByUserIdInterfaceArray>(
      `/orders/user/${userId}`,
      {
        params: filters,
      }
    );

    return data;
  } catch (error) {
    if (isAxiosError(error)) {
      const status = error.response?.status ?? null;
      const message =
        error.response?.data?.message ||
        error.message ||
        "Error al obtener la orden";
      throw { status, message };
    }
  }
}

export async function getOrderById(orderId: string) {
  try {
    const { data } = await axiosInstance.get<GetOrdersByUserIdInterface>(
      `/orders/${orderId}`
    );

    return data;
  } catch (error) {
    if (isAxiosError(error)) {
      const status = error.response?.status ?? null;
      const message =
        error.response?.data?.message ||
        error.message ||
        "Error al obtener la orden";
      throw { status, message };
    }
  }
}
