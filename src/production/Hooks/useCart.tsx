"use client";

import { useQuery } from "@tanstack/react-query";
import { getCartByUserId } from "@/lib/CartsApi";

const useCart = (id?: string) => {
  const cartById = useQuery({
    queryKey: ["cart", id],
    queryFn: async () => await getCartByUserId(id || ""),
    refetchOnWindowFocus: false,
    staleTime: 120 * 1000,
  });

  return {
    cartById,
  };
};

export default useCart;
