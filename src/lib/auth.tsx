import { isAxiosError } from "axios";

import axiosInstance from "@/Insfraestructure/Api/Axios-config";
import {
  RegisterUserInteface,
  LoginUserInteface,
  ResponseLoginInterface,
  ResponseRegisterInterface,
} from "@/Insfraestructure/Interfaces/auth/auth.interface";
import {
  AddressInterface,
  GetAddressByUserIdInterface,
  ResponseAddressInterface,
  UpdateAddressInterface,
} from "@/Insfraestructure/Interfaces/auth/address.interface";

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

export async function createAddress(userId: string, address: AddressInterface) {
  try {
    const { data } = await axiosInstance.post<ResponseAddressInterface>(
      `/users/${userId}/address`,
      {
        ...address,
      }
    );
    console.log(data);

    return data;
  } catch (err: unknown) {
    if (isAxiosError(err)) {
      const status = err.response?.status ?? null;
      const message =
        err.response?.data?.message || err.message || "Error al autenticar";
      throw { status, message };
    }
    console.log(err);
    throw { status: null, message: "Error inesperado" };
  }
}

export async function getAddressByUserId(userId: string) {
  try {
    const { data } = await axiosInstance.get<GetAddressByUserIdInterface>(
      `/users/${userId}/address`
    );
    console.log(data);

    return data;
  } catch (err: unknown) {
    if (isAxiosError(err)) {
      const status = err.response?.status ?? null;
      const message =
        err.response?.data?.message || err.message || "Error al autenticar";
      throw { status, message };
    }
    console.log(err);
    throw { status: null, message: "Error inesperado" };
  }
}

export async function updateAddressById(
  userId: string,
  address: UpdateAddressInterface
) {
  try {
    const { data } = await axiosInstance.patch<ResponseAddressInterface>(
      `/users/${userId}/address`,
      {
        ...address,
      }
    );
    console.log(data);

    return data;
  } catch (err: unknown) {
    if (isAxiosError(err)) {
      const status = err.response?.status ?? null;
      const message =
        err.response?.data?.message || err.message || "Error al autenticar";
      throw { status, message };
    }
    console.log(err);
    throw { status: null, message: "Error inesperado" };
  }
}
