import axiosInstance from "@/Insfraestructure/Api/Axios-config";
import {
  Product,
  ProductFilter,
} from "@/Insfraestructure/Interfaces/products/product.interface";

export async function getProducts(filter: ProductFilter) {
  try {
    const { data } = await axiosInstance.get("/products", {
      params: filter,
    });

    console.log(`params: ${filter}`);

    return data;
  } catch (error) {
    console.log(error);
  }
}

export async function getProductById(id: string) {
  try {
    const { data } = await axiosInstance.get<Product>(`/products/${id}`);

    return data;
  } catch (error) {
    console.log(error);
  }
}
