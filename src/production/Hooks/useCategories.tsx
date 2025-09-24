"use client";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useQueryClient } from "@tanstack/react-query";
import {
  createCategory,
  deleteOldCategory,
  getAllCategories,
  updateOldCategory,
} from "@/lib/resources/categoryApi";
import {
  CategoryInterface,
  CreateCategoryInterface,
  UpdateCategoryInterface,
} from "@/Insfraestructure/Interfaces/Resources/Categories-interface";

const useCategories = (id?: string) => {
  const qc = useQueryClient();

  const categories = useQuery<CategoryInterface[]>({
    queryKey: ["categories", id],
    queryFn: async () => await getAllCategories(),
    refetchOnWindowFocus: false,
    staleTime: 120 * 1000,
  });

  const createNewCategory = useMutation({
    mutationFn: async (category: CreateCategoryInterface) => {
      const response = await createCategory(category);
      return response;
    },
    onSuccess: () => {
      qc.invalidateQueries({
        queryKey: ["categories"],
      });
    },
  });

  const updateCategory = useMutation({
    mutationFn: async ({
      id,
      category,
    }: {
      id: string;
      category: UpdateCategoryInterface;
    }) => {
      const response = await updateOldCategory(id, category);
      return response;
    },
    onSuccess: () => {
      qc.invalidateQueries({
        queryKey: ["categories"],
      });
    },
  });

  const deleteCategory = useMutation({
    mutationFn: async (id: string) => {
      const response = await deleteOldCategory(id);
      return response;
    },
    onSuccess: () => {
      qc.invalidateQueries({
        queryKey: ["categories"],
      });
    },
  });

  return {
    categories,
    createNewCategory,
    updateCategory,
    deleteCategory,
  };
};

export default useCategories;
