export enum Size {
  XS = "XS",
  S = "S",
  M = "M",
  L = "L",
  XL = "XL",
  XXL = "XXL",
}

export interface ProductVariantOriginalInterface {
  id: string;
  productId: string;
  colorId?: string;
  sku: string;
  barcode?: string;
  size: Size;
  price: number;
  stock: number;
  weightGrams?: number;
  createdAt: string;
  updatedAt: string;
}

// Create product variant
export interface CreateProductVariantInterface {
  productId: string;
  colorId?: string;
  sku: string;
  barcode?: string;
  size: Size;
  price: number;
  stock: number;
  weightGrams?: number;
}

export interface ResponseCreateProductVariantInterface {
  id: string;
}

// Update product variant
export interface UpdateProductVariant {
  colorId?: string;
  sku?: string;
  barcode?: string;
  size?: Size;
  price?: number;
  stock?: number;
  weightGrams?: number;
}

export interface ResponseUpdateProductVariant {
  variant: ProductVariantOriginalInterface;
  message: string;
}
