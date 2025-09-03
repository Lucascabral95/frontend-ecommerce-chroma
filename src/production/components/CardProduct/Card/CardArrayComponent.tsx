"use client";
import React from "react";
import useProducts from "@/production/Hooks/useProducts";
import CardMap from "./CardArray";
import CardError from "./CardError/CardError";
import SkeletonProducts from "./SkeletonProducts/SkeletonProducts";

const PRODUCTS_ONE = process.env.NEXT_PUBLIC_PRODUCTS_ONE;
const PRODUCTS_TWO = process.env.NEXT_PUBLIC_PRODUCTS_TWO;
const PRODUCTS_THREE = process.env.NEXT_PUBLIC_PRODUCTS_THREE;

function CardArrayComponent() {
  const { products: query1 } = useProducts(undefined, {
    limit: 16,
    categoryId: PRODUCTS_ONE,
  });

  const { products: query2 } = useProducts(undefined, {
    limit: 16,
    categoryId: PRODUCTS_TWO,
  });

  const { products: query3 } = useProducts(undefined, {
    limit: 16,
    categoryId: PRODUCTS_THREE,
  });

  const sections = [
    { ...query1, categoryId: PRODUCTS_ONE },
    { ...query2, categoryId: PRODUCTS_TWO },
    { ...query3, categoryId: PRODUCTS_THREE },
  ];

  const allSectionsFailed = sections.every((section) => section.isError);

  if (allSectionsFailed) {
    return (
      <CardError
        title="Error de Conexión"
        primaryText="En este momento no podemos mostrar nuestros productos."
        secondaryText="Nuestros sistemas pueden estar experimentando problemas. Por favor, inténtelo de nuevo más tarde."
        onRetry={() => sections.forEach((section) => section.refetch())}
      />
    );
  }

  return (
    <>
      {sections.map((section, index) => {
        if (!section.categoryId) {
          return null;
        }

        const key = `${section.categoryId}-${index}`;

        if (section.isLoading) {
          return <SkeletonProducts key={key} />;
        }
        if (section.isError) {
          return (
            <CardError
              key={key}
              primaryText="No se pudo cargar esta sección."
              onRetry={() => section.refetch()}
            />
          );
        }

        const productList = section.data?.products ?? [];

        if (productList.length === 0) {
          return (
            <CardError
              key={key}
              title="Sin Resultados"
              primaryText="No se encontraron productos en esta categoría."
            />
          );
        }

        return <CardMap key={key} products={productList} />;
      })}
    </>
  );
}

export default CardArrayComponent;
