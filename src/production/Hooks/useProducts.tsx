import { getProductById, getProducts } from "@/lib/products.api";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { ProductFilter } from "@/Insfraestructure/Interfaces/products/product.interface";

const useProducts = (id?: string, filter?: ProductFilter) => {
  // const queryClient = useQueryClient();

  const products = useQuery({
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

  return {
    products,
    productById,
  };
};

export default useProducts;
