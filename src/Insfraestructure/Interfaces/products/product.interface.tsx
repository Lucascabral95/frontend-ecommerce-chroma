import { ProductStatus, Size } from "../enums/enums-global.interface";
import {
  FilterProductSortFieldEnum,
  SortOrderEnum,
} from "../filters/filters.interface";

export interface ProductFilter {
  sortOrder?: SortOrderEnum;
  sortBy?: FilterProductSortFieldEnum;
  page?: number;
  limit?: number;
  name?: string;
  minPrice?: number;
  maxPrice?: number;
  size?: Size[];
  stock?: number;
  status?: ProductStatus;
  categoryId?: string;
  brandId?: string;
}

export interface ProductsInterface {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
  prevPage: boolean;
  nextPage: boolean;
  products: Product[];
}

export interface Product {
  id: string;
  name: string;
  slug: string;
  description?: string;
  brandId?: string;
  categoryId?: string;
  basePrice: number;
  status: ProductStatus;

  variants: Variant[];
  images: Images[];
  tags: Tag[];

  createdAt: Date;
  updatedAt: Date;
}

interface Images {
  id: string;
  url: string;
  alt?: string;
  position: number;

  productId?: string;
  variantId?: string;

  createdAt: Date;
}

interface Tag {
  id: string;
  name: string;
  slug: string;
}

export interface Variant {
  id: string;
  productId: string;
  colorId: string;
  sku: string;
  barcode: string;
  size: Size;
  price: number;
  stock: number;
  weightGrams: number;
  createdAt: Date;
  updatedAt: Date;
}
