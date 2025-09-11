enum OrderStatus {
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
  shippingAddress: ShippingAddress[];
  billingAddress?: BillingAddress[];
  mpPreferenceId?: string;
  createdAt: string;
  updatedAt: string;
}
