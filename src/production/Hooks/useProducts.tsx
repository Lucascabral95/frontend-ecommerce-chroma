"use client";
import {
  getProductById,
  getProducts,
  createNewProduct,
  updateOfProduct,
} from "@/lib/products.api";
import { useMutation, useQuery } from "@tanstack/react-query";
import {
  CreateProduct,
  ProductFilter,
  ProductsInterface,
  UpdateProduct,
} from "@/Insfraestructure/Interfaces/products/product.interface";
import { useQueryClient } from "@tanstack/react-query";

const useProducts = (id?: string, filter?: ProductFilter) => {
  const qc = useQueryClient();

  const products = useQuery<ProductsInterface>({
    queryKey: ["products", filter],
    queryFn: async () => await getProducts(filter || {}),
    refetchOnWindowFocus: false,
    staleTime: 120 * 1000,
  });

  const productById = useQuery({
    queryKey: ["product", id],
    queryFn: async () => await getProductById(id || ""),
    enabled: !!id,
    refetchOnWindowFocus: false,
    staleTime: 120 * 1000,
  });

  const createProduct = useMutation({
    mutationFn: async (product: CreateProduct) => {
      const response = await createNewProduct(product);
      return response;
    },
    onSuccess: (data) => {
      qc.invalidateQueries({ queryKey: ["products", filter || {}] });

      qc.setQueryData<ProductsInterface>(["products", { ...filter }], (old) =>
        old
          ? {
              ...old,
              products: [...old.products, data],
              total: old.total + 1,
            }
          : {
              page: 1,
              limit: 1000,
              total: 1,
              totalPages: 1,
              prevPage: false,
              nextPage: false,
              products: [data],
            }
      );
    },
  });

  const updateProduct = useMutation({
    mutationFn: async ({
      id,
      product,
    }: {
      id: string;
      product: UpdateProduct;
    }) => {
      const response = await updateOfProduct(id, product);
      return response;
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["products", filter || {}] });

      qc.setQueryData<ProductsInterface>(
        ["products", filter || {}],
        (oldData) => oldData
      );
    },
  });

  return {
    products,
    productById,
    createProduct,
    updateProduct,
  };
};

export default useProducts;
