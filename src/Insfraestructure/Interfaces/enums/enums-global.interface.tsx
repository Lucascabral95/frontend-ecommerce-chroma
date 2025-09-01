export enum ProductStatus {
  ACTIVE,
  DRAFT,
  ARCHIVED,
}

export enum Size {
  XS,
  S,
  M,
  L,
  XL,
  XXL,
}

export enum OrderStatus {
  PENDING,
  PAID,
  FULFILLED,
  CANCELLED,
  REFUNDED,
}

export enum PaymentStatus {
  PENDING,
  APPROVED,
  REJECTED,
  CANCELLED,
  REFUNDED,
}

export enum PaymentProvider {
  MERCADOPAGO,
}

export enum Currency {
  ARS,
  USD,
}

export enum RoleName {
  USER,
  MANAGER,
  ADMIN,
}
