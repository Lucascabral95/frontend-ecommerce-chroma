import axiosInstance from "@/Insfraestructure/Api/Axios-config";
import {
  RegisterUserInterface,
  UpdateUserDtoInterface,
  UsersFilters,
} from "@/Insfraestructure/Interfaces/Users/Users.interface";
import { isAxiosError } from "axios";

export async function getAllUsers(filter: UsersFilters) {
  try {
    const { data } = await axiosInstance.get("/users", {
      params: filter,
    });

    console.log(data);

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

export async function getUserById(id: string) {
  try {
    const { data } = await axiosInstance.get(`/users/${id}`);

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

export async function createUser(registerUser: RegisterUserInterface) {
  try {
    const { data } = await axiosInstance.post(`/auth/register`, registerUser);

    return data;
  } catch (error) {
    if (isAxiosError(error)) {
      const status = error.response?.status ?? null;
      const message =
        error.response?.data?.message ||
        error.message ||
        "Error al crear el usuario";
      throw { status, message };
    }
  }
}
export async function deleteUserById(id: string) {
  try {
    const { data } = await axiosInstance.delete(`/users/${id}`);

    return data;
  } catch (error) {
    if (isAxiosError(error)) {
      const status = error.response?.status ?? null;
      const message =
        error.response?.data?.message ||
        error.message ||
        "Error al crear el usuario";
      throw { status, message };
    }
  }
}

export async function updateUserById(id: string, user: UpdateUserDtoInterface) {
  try {
    const { data } = await axiosInstance.patch(`/users/${id}`, user);

    return data;
  } catch (error) {
    if (isAxiosError(error)) {
      const status = error.response?.status ?? null;
      const message =
        error.response?.data?.message ||
        error.message ||
        "Error al crear el usuario";
      throw { status, message };
    }
  }
}
