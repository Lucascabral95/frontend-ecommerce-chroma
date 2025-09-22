import axiosInstance from "@/Insfraestructure/Api/Axios-config";
import { ProductFilter } from "@/Insfraestructure/Interfaces/products/product.interface";
import { isAxiosError } from "axios";

export async function getProducts(filter: ProductFilter) {
  try {
    const { data } = await axiosInstance.get("/products", {
      params: filter,
    });

    return data;
  } catch (error) {
    if (isAxiosError(error)) {
      const status = error.response?.status ?? null;
      const message =
        error.response?.data?.message ||
        error.message ||
        "Error al obtener los productos";
      throw { status, message };
    }
  }
}
