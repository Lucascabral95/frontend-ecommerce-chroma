export interface ProductImageInterface {
  id: string;
  url: string;
  alt?: string;
  position?: number;
  productId?: string;
}

export interface CreateProductImageInterface {
  url: string;
  alt?: string;
  position?: number;
  productId?: string;
}

export interface UpdateProductImageInterface {
  url?: string;
  alt?: string;
  position?: number;
  productId?: string;
}
