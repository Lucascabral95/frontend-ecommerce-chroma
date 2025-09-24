import { ComponentType } from "react";

export interface ProcessedProductData {
  name: string;
  basePriceQuotas: string;
  basePrice: string;
  lengthVariants: number;
  stockTotal: number;
  hasVariants: boolean;
  mainImage: string;
  description: string;
  id: string;
}

export interface StatCardProps {
  icon: ComponentType<{ className?: string }>;
  label: string;
  value: number;
  testId: string;
}
