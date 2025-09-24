import axiosInstance from "@/Insfraestructure/Api/Axios-config";
import { ProductFilter } from "@/Insfraestructure/Interfaces/products/product.interface";
import {
  CreateProductVariantInterface,
  UpdateProductVariant,
} from "@/Insfraestructure/Interfaces/products/variants/variants.interface";
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

export async function createNewProductVariant(
  createProductVariat: CreateProductVariantInterface
) {
  try {
    const { data } = await axiosInstance.post(
      "/products/variant",
      createProductVariat
    );

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

export async function updateOldProductVariant(
  id: string,
  createProductVariat: UpdateProductVariant
) {
  try {
    const { data } = await axiosInstance.patch(
      `/products/variant/${id}`,
      createProductVariat
    );

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

export async function deleteOldProductVariant(id: string) {
  try {
    const { data } = await axiosInstance.delete(`/products/variant/${id}`);

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
