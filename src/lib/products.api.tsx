import axiosInstance from "@/Insfraestructure/Api/Axios-config";
import { ProductFilter } from "@/Insfraestructure/Interfaces/products/product.interface";

export async function getProducts(filter: ProductFilter) {
  try {
    const { data } = await axiosInstance.get("/products", { params: filter });
    console.log(data);

    return data;
  } catch (error) {
    console.log(error);
  }
}

export async function getProductById(id: string) {
  try {
    const { data } = await axiosInstance.get(`/products/${id}`);
    console.log(data);

    return data;
  } catch (error) {
    console.log(error);
  }
}
