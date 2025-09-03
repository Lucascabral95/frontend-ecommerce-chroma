export interface CartByIdInterface {
  id: string;
  userId: string;
  sessionId: null;
  createdAt: Date;
  updatedAt: Date;
  items?: Item[];
}

export interface Item {
  id: string;
  cartId: string;
  variantId: string;
  quantity: number;
  unitPriceSnap: number;
  createdAt: Date;
  updatedAt: Date;
  variant: Variant;
}

export interface Variant {
  id: string;
  productId: string;
  colorId: string;
  sku: string;
  barcode: string;
  size: string;
  price: number;
  stock: number;
  weightGrams: number;
  createdAt: Date;
  updatedAt: Date;
  product: Product;
}

export interface Product {
  id: string;
  name: string;
  slug: string;
  description: string;
  brandId: string;
  categoryId: string;
  basePrice: number;
  status: string;
  createdAt: Date;
  updatedAt: Date;
}
