"use client";
import { useQuery } from "@tanstack/react-query";
import { ProductFilter } from "@/Insfraestructure/Interfaces/products/product.interface";
import { GetAllUsers } from "@/Insfraestructure/Interfaces/Users/Users.interface";
import { getAllUsers, getUserById } from "@/lib/UsersApi";

const useUsers = (id?: string, filter?: ProductFilter) => {
  const users = useQuery<GetAllUsers>({
    queryKey: ["users", filter],
    queryFn: async () => await getAllUsers(filter || {}),
    refetchOnWindowFocus: false,
    staleTime: 120 * 1000,
  });

  const userById = useQuery({
    queryKey: ["getUserById", id],
    queryFn: async () => await getUserById(id || ""),
    enabled: !!id,
    refetchOnWindowFocus: false,
    staleTime: 120 * 1000,
  });

  return {
    users,
    userById,
  };
};

export default useUsers;
