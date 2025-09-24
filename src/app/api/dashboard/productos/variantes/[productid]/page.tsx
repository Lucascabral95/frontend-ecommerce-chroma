"use client";
import { useCallback, useMemo } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import { SiAwselasticloadbalancing } from "react-icons/si";
import { AiOutlineStock } from "react-icons/ai";

import LoadingState from "@/production/Dashboard/components/shared/LoadingState";
import ErrorState from "@/production/Dashboard/components/shared/ErrorState";
import EmptyState from "@/production/Dashboard/components/shared/EmptyState";
import StructureDashboard from "@/production/Dashboard/components/StructureDashboard";
import useProductVariants from "@/production/Hooks/useProductVariants";
import Variants from "@/production/Dashboard/components/Variants/Variants";
import "./ProductVariants.scss";
import { ProcessedProductData } from "@/production/Dashboard/components/shared/Dashboars-interfaces";
import StatCard from "@/production/Dashboard/components/shared/StatCard";

const FALLBACK_IMAGE = "/img/product-image-not-found.webp";
const INSTALLMENTS_COUNT = 3;

function VariantsProducts() {
  const { productid } = useParams();
  const { productVariantById } = useProductVariants(productid as string);

  const handleRetry = useCallback(() => {
    if (productVariantById.refetch) {
      productVariantById.refetch();
    } else {
      window.location.reload();
    }
  }, [productVariantById.refetch]);

  const handleAddVariant = useCallback(() => {
    console.log("Agregar primera variante");
  }, []);

  const processedData: ProcessedProductData | null = useMemo(() => {
    if (!productVariantById.data) return null;

    const data = productVariantById.data;
    const variants = data.variants || [];

    const stockTotal = variants.reduce(
      (total, variant) => total + (variant?.stock || 0),
      0
    );

    const basePrice = typeof data.basePrice === "number" ? data.basePrice : 0;
    const basePriceQuotas = basePrice > 0 ? basePrice / INSTALLMENTS_COUNT : 0;

    return {
      name: data.name || "Producto sin nombre",
      basePriceQuotas: basePriceQuotas.toFixed(2),
      basePrice: basePrice.toFixed(2),
      lengthVariants: variants.length,
      stockTotal,
      hasVariants: variants.length > 0,
      mainImage: data.images?.[0]?.url || FALLBACK_IMAGE,
      description: data.description || "Sin descripción disponible",
      id: data.id || "",
    };
  }, [productVariantById.data]);

  if (productVariantById.isLoading) {
    return (
      <StructureDashboard title="Cargando producto...">
        <LoadingState message="Cargando información del producto..." />
      </StructureDashboard>
    );
  }

  if (productVariantById.isError) {
    return (
      <StructureDashboard title="Error">
        <ErrorState
          error={productVariantById.error || "Error al cargar el producto"}
          onRetry={handleRetry}
          title="Error al cargar el producto"
          retryLabel="Reintentar carga"
        />
      </StructureDashboard>
    );
  }

  if (!processedData) {
    return (
      <StructureDashboard title="Producto no encontrado">
        <EmptyState
          onAdd={() => window.history.back()}
          title="Producto no encontrado"
          buttonText="Volver atrás"
          description="El producto que buscas no existe o ha sido eliminado."
        />
      </StructureDashboard>
    );
  }

  return (
    <StructureDashboard title={processedData.name}>
      <div className="container-variant-products-details">
        <div className="image-product">
          <Image
            width={600}
            height={800}
            src={processedData.mainImage}
            alt={`Imagen del producto ${processedData.name}`}
            className="product-image"
            priority
            placeholder="blur"
            blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCdABmX/9k="
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.src = FALLBACK_IMAGE;
            }}
          />
        </div>

        <div className="details-products">
          <div className="title-of-the-product">
            <h3>{processedData.name}</h3>
          </div>

          <div className="price-of-the-product">
            <div className="div-price">
              <p className="price">$ {processedData.basePrice}</p>
            </div>
            {parseFloat(processedData.basePriceQuotas) > 0 && (
              <div className="div-quotas">
                <p className="quotas">
                  {INSTALLMENTS_COUNT} cuotas sin interés de ${" "}
                  {processedData.basePriceQuotas}
                </p>
              </div>
            )}
          </div>

          <div className="description-of-the-product">
            <p>{processedData.description}</p>
          </div>

          <div className="variants-products">
            <StatCard
              icon={SiAwselasticloadbalancing}
              label="Cantidad de variantes"
              value={processedData.lengthVariants}
              testId="variants-count"
            />

            <StatCard
              icon={AiOutlineStock}
              label="Stock total"
              value={processedData.stockTotal}
              testId="total-stock"
            />
          </div>
        </div>
      </div>

      {processedData.hasVariants ? (
        <Variants
          variants={productVariantById.data?.variants}
          title={`Variantes de ${processedData.name}`}
          productId={processedData.id}
        />
      ) : (
        <EmptyState
          onAdd={handleAddVariant}
          title="No hay variantes disponibles"
          buttonText="Agregar primera variante"
          description="Este producto aún no tiene variantes configuradas. Agrega la primera variante para empezar."
        />
      )}
    </StructureDashboard>
  );
}

export default VariantsProducts;
