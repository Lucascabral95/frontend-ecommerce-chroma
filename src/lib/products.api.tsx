import axiosInstance from "@/Insfraestructure/Api/Axios-config";
import {
  CreateProduct,
  Product,
  ProductFilter,
} from "@/Insfraestructure/Interfaces/products/product.interface";
import { isAxiosError } from "axios";
import { UpdateProduct } from "../Insfraestructure/Interfaces/products/product.interface";

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

export async function getProductById(id: string) {
  try {
    const { data } = await axiosInstance.get<Product>(`/products/${id}`);

    return data;
  } catch (error) {
    if (isAxiosError(error)) {
      const status = error.response?.status ?? null;
      const message =
        error.response?.data?.message ||
        error.message ||
        "Error al obtener el producto";
      throw { status, message };
    }
  }
}

export async function createNewProduct(createProduct: CreateProduct) {
  try {
    const { data } = await axiosInstance.post(`/products`, createProduct);

    return data;
  } catch (error) {
    if (isAxiosError(error)) {
      const status = error.response?.status ?? null;
      const message =
        error.response?.data?.message ||
        error.message ||
        "Error al crear el producto";
      throw { status, message };
    }
  }
}

export async function updateOfProduct(
  id: string,
  updateProduct: UpdateProduct
) {
  try {
    const { data } = await axiosInstance.patch(
      `/products/${id}`,
      updateProduct
    );

    return data;
  } catch (error) {
    if (isAxiosError(error)) {
      const status = error.response?.status ?? null;
      const message =
        error.response?.data?.message ||
        error.message ||
        "Error al crear el producto";
      throw { status, message };
    }
  }
}
