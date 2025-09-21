"use client";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { ProductFilter } from "@/Insfraestructure/Interfaces/products/product.interface";
import {
  GetAllUsers,
  RegisterUserInterface,
  UpdateUserDtoInterface,
} from "@/Insfraestructure/Interfaces/Users/Users.interface";
import {
  createUser,
  deleteUserById,
  getAllUsers,
  getUserById,
  updateUserById,
} from "@/lib/UsersApi";

const COUNT_LIMIT = 1000;

const useUsers = (id?: string, filter?: ProductFilter) => {
  const qc = useQueryClient();

  const users = useQuery<GetAllUsers>({
    queryKey: ["users", filter || {}],
    queryFn: async () => await getAllUsers({ ...filter, limit: COUNT_LIMIT }),
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

  const newUser = useMutation({
    mutationFn: async (user: RegisterUserInterface) => {
      const response = await createUser(user);
      return response;
    },
    onSuccess: (data) => {
      qc.invalidateQueries({ queryKey: ["users", filter || {}] });

      qc.setQueryData<GetAllUsers>(["users", filter || {}], (oldData) => {
        if (!oldData) {
          return {
            page: 1,
            limit: COUNT_LIMIT,
            total: 1,
            totalPages: 1,
            prevPage: false,
            nextPage: false,
            users: [data],
          };
        }

        const userExists = oldData.users.some((u) => u.id === data.id);
        if (userExists) {
          return oldData;
        }

        return {
          ...oldData,
          users: [data, ...oldData.users],
          total: oldData.total + 1,
        };
      });
    },
    onError: (error) => {
      console.error("Error al crear el usuario:", error);
    },
  });

  const deleteUser = useMutation({
    mutationFn: (userId: string) => deleteUserById(userId),
    onSuccess: (_, userId) => {
      qc.setQueryData<GetAllUsers>(["users", filter || {}], (old) =>
        old
          ? {
              ...old,
              users: old.users.filter((u) => u.id !== userId),
              total: old.total - 1,
            }
          : old
      );
    },
  });

  const updateUser = useMutation({
    mutationFn: ({ id, user }: { id: string; user: UpdateUserDtoInterface }) =>
      updateUserById(id, user),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["users", filter || {}] });

      qc.setQueryData<GetAllUsers>(
        ["users", filter || {}],
        (oldData) => oldData
      );
    },
  });

  return {
    users,
    userById,
    newUser,
    deleteUser,
    updateUser,
  };
};

export default useUsers;
