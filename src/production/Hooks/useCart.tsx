"use client";

import { useQuery } from "@tanstack/react-query";
import { getCartById } from "@/lib/CartsApi";

const useCart = (id?: string) => {
  const cartById = useQuery({
    queryKey: ["cart", id],
    queryFn: async () => await getCartById(id || ""),
    refetchOnWindowFocus: false,
    staleTime: 120 * 1000,
  });

  return {
    cartById,
  };
};

export default useCart;
