// From Products
// From Products
// From Products
export enum FilterSizeEnum {
  XS = "XS",
  S = "S",
  M = "M",
  L = "L",
  XL = "XL",
  XXL = "XXL",
}

export enum SortOrderEnum {
  ASC = "asc",
  DESC = "desc",
}

export enum FilterProductSortFieldEnum {
  PRICE = "basePrice",
  NAME = "name",
  CREATED_AT = "createdAt",
}

export enum FilterProductStatusEnum {
  ACTIVE = "ACTIVE",
  DRAFT = "DRAFT",
  ARCHIVED = "ARCHIVED",
}

// Role User
// Role User
// Role User
export enum RoleNameEnum {
  USER = "USER",
  MANAGER = "MANAGER",
  ADMIN = "ADMIN",
}

// Order
// Order
// Order
export enum OrderStatusEnum {
  PENDING = "PENDING",
  PAID = "PAID",
  FULFILLED = "FULFILLED",
  CANCELLED = "CANCELLED",
  REFUNDED = "REFUNDED",
}

export enum PaymentStatusEnum {
  PENDING = "PENDING",
  APPROVED = "APPROVED",
  REJECTED = "REJECTED",
  CANCELLED = "CANCELLED",
  REFUNDED = "REFUNDED",
}

export enum PaymentProviderEnum {
  MERCADOPAGO = "MERCADOPAGO",
}

export enum CurrencyEnum {
  ARS = "ARS",
  USD = "USD",
}
