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
import {
  CreateProductVariantInterface,
  ResponseUpdateProductVariant,
  UpdateProductVariant,
} from "@/Insfraestructure/Interfaces/products/variants/variants.interface";
import {
  createNewProductVariant,
  deleteOldProductVariant,
  updateOldProductVariant,
} from "@/lib/product-variants";

const useProductVariants = (id?: string, filter?: ProductFilter) => {
  const qc = useQueryClient();

  const productVariant = useQuery<ProductsInterface>({
    queryKey: ["productVariants", filter],
    queryFn: async () => await getProducts(filter || {}),
    refetchOnWindowFocus: false,
    staleTime: 120 * 1000,
  });

  const productVariantById = useQuery({
    queryKey: ["productVariants", id],
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

  const createProductVariant = useMutation({
    mutationFn: async (productVariant: CreateProductVariantInterface) => {
      const response = await createNewProductVariant(productVariant);
      return response;
    },
    onSuccess: (data, variables) => {
      qc.invalidateQueries({ queryKey: ["products", filter || {}] });
      qc.invalidateQueries({
        queryKey: ["productVariants", variables.productId],
      });

      qc.setQueryData(
        ["productVariants", variables.productId],
        (oldData: any) => {
          if (!oldData) return oldData;

          if (oldData.variants) {
            return {
              ...oldData,
              variants: [...oldData.variants, data],
            };
          }

          return oldData;
        }
      );

      qc.setQueryData<ProductsInterface>(
        ["products", filter || {}],
        (oldData) => {
          if (!oldData) return oldData;

          return {
            ...oldData,
            products: oldData.products.map((product) => {
              if (product.id === variables.productId) {
                return {
                  ...product,
                  variants: [...(product.variants || []), data],
                };
              }
              return product;
            }),
          };
        }
      );
    },
  });

  const updateProductVariant = useMutation<
    ResponseUpdateProductVariant,
    Error,
    {
      id: string;
      productVariant: UpdateProductVariant;
    }
  >({
    mutationFn: async ({ id, productVariant }) => {
      const response = await updateOldProductVariant(id, productVariant);
      return response;
    },
    onSuccess: (data) => {
      qc.invalidateQueries({ queryKey: ["products"] });
      qc.invalidateQueries({
        queryKey: ["productVariants", data.variant.productId],
      });

      qc.setQueryData(
        ["productVariants", data.variant.productId],
        (oldData: any) => {
          if (!oldData) return oldData;

          if (oldData.variants) {
            return {
              ...oldData,
              variants: oldData.variants.map((variant: any) => {
                if (variant.id === data.variant.id) {
                  return data.variant;
                }
                return variant;
              }),
            };
          }

          return oldData;
        }
      );
    },
  });

  const deleteProductVariant = useMutation({
    mutationFn: async (id: string) => {
      const response = await deleteOldProductVariant(id);
      return response;
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["products"] });
      qc.invalidateQueries({
        queryKey: ["productVariants", id],
      });
    },
  });

  return {
    productVariant,
    productVariantById,
    createProduct,
    updateProduct,
    createProductVariant,
    updateProductVariant,
    deleteProductVariant,
  };
};

export default useProductVariants;
