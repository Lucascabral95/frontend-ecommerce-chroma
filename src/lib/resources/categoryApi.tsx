import axiosInstance from "@/Insfraestructure/Api/Axios-config";
import {
  CreateCategoryInterface,
  UpdateCategoryInterface,
} from "@/Insfraestructure/Interfaces/Resources/Categories-interface";
import { isAxiosError } from "axios";

export async function getAllCategories() {
  try {
    const { data } = await axiosInstance.get("/categories");

    return data;
  } catch (error: unknown) {
    if (isAxiosError(error)) {
      const status = error.response?.status ?? null;
      const message =
        error.response?.data?.message ||
        error.message ||
        "Error al obtener las categorías";
      throw { status, message };
    }
    throw { status: null, message: "Error inesperado" };
  }
}

export async function createCategory(category: CreateCategoryInterface) {
  try {
    const { data } = await axiosInstance.post("/categories", category);

    return data;
  } catch (error: unknown) {
    if (isAxiosError(error)) {
      const status = error.response?.status ?? null;
      const message =
        error.response?.data?.message ||
        error.message ||
        "Error al crear la categoría";
      throw { status, message };
    }
    throw { status: null, message: "Error inesperado" };
  }
}

export async function updateOldCategory(
  id: string,
  category: UpdateCategoryInterface
) {
  try {
    const { data } = await axiosInstance.patch(`/categories/${id}`, category);

    return data;
  } catch (error: unknown) {
    if (isAxiosError(error)) {
      const status = error.response?.status ?? null;
      const message =
        error.response?.data?.message ||
        error.message ||
        "Error al actualizar la categoría";
      throw { status, message };
    }
    throw { status: null, message: "Error inesperado" };
  }
}

export async function deleteOldCategory(id: string) {
  try {
    const { data } = await axiosInstance.delete(`/categories/${id}`);

    return data;
  } catch (error: unknown) {
    if (isAxiosError(error)) {
      const status = error.response?.status ?? null;
      const message =
        error.response?.data?.message ||
        error.message ||
        "Error al eliminar la categoría";
      throw { status, message };
    }
    throw { status: null, message: "Error inesperado" };
  }
}
