export enum OrderStatus {
  PENDING = "PENDING",
  PAID = "PAID",
  FULFILLED = "FULFILLED",
  CANCELLED = "CANCELLED",
  REFUNDED = "REFUNDED",
}

enum Currency {
  ARS = "ARS",
  USD = "USD",
}

enum Size {
  XS = "XS",
  S = "S",
  M = "M",
  L = "L",
  XL = "XL",
  XXL = "XXL",
}

interface Product {
  id: string;
  images: {
    url: string;
  }[];
}

interface Item {
  id: string;
  orderId: string;
  variantId: string;
  quantity: number;
  unitPrice: number;
  productName: string;
  sku: string;
  size: Size;
  colorName: string;
  createdAt: string;
  variant: {
    product: Product;
  };
}

interface BillingAddress {
  street: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
  contactName: string;
  phone?: string;
}

export interface ShippingAddress extends BillingAddress {
  taxId: string; // DNI
}

export interface ShippingAddress2 {
  taxId: string; // DNI
}

export interface CreateOrderInterface {
  userId: string;
  status?: OrderStatus;
  currency?: Currency;
  subtotal: number;
  shipping?: number;
  tax?: number;
  discount?: number;
  total: number;
  billingAddress?: BillingAddress;
  shippingAddress: ShippingAddress;
  mpPreferenceId?: string;
}

// Response Order
export interface ResponseCreateOrderInterface {
  id: string;
  userId: string;
  status: OrderStatus;
  currency: Currency;
  subtotal: number;
  shipping?: number;
  tax?: number;
  discount?: number;
  total: number;
  shippingAddress: ShippingAddress;
  billingAddress?: BillingAddress;
  mpPreferenceId?: string;
  createdAt: string;
  updatedAt: string;
}

export interface FilstersOrdersInterface {
  status?: OrderStatus;
  limit?: number;
  page?: number;
}

// Obtener ordenes de usuarios (por userId)
export interface GetOrdersByUserIdInterface {
  id: string;
  number: number;
  userId: string;
  status: OrderStatus;
  currency: Currency;
  subtotal: number;
  shipping?: number;
  tax?: number;
  discount?: number;
  total: number;
  shippingAddress: ShippingAddress;
  billingAddress?: BillingAddress;
  mpPreferenceId?: string;
  createdAt: string;
  updatedAt: string;
  items: Item[];
}

export interface GetOrdersByUserIdInterfaceArray {
  total: number;
  totalPages: number;
  prevPage: number;
  nextPage: number;
  page: number;
  limit: number;
  orders: GetOrdersByUserIdInterface[];
}
