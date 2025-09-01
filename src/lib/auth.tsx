import { isAxiosError } from "axios";

import axiosInstance from "@/Insfraestructure/Api/Axios-config";
import {
  RegisterUserInteface,
  LoginUserInteface,
  ResponseLoginInterface,
  ResponseRegisterInterface,
} from "@/Insfraestructure/Interfaces/auth/auth.interface";

export async function registerUser(user: RegisterUserInteface) {
  try {
    const { data } = await axiosInstance.post<ResponseRegisterInterface>(
      "/auth/register",
      user
    );

    return data;
  } catch (err: unknown) {
    if (isAxiosError(err)) {
      const status = err.response?.status ?? null;
      const message =
        err.response?.data?.message || err.message || "Error al autenticar";
      throw { status, message };
    }
    throw { status: null, message: "Error inesperado" };
  }
}

export async function loginUser(user: LoginUserInteface) {
  try {
    const { data } = await axiosInstance.post<ResponseLoginInterface>(
      "/auth/login",
      user
    );

    return data;
  } catch (err: unknown) {
    if (isAxiosError(err)) {
      const status = err.response?.status ?? null;
      const message =
        err.response?.data?.message || err.message || "Error al autenticar";
      throw { status, message };
    }
    throw { status: null, message: "Error inesperado" };
  }
}
