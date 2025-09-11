enum PaymentStatus {
  PENDING = "PENDING",
  PAID = "PAID",
  FULFILLED = "FULFILLED",
  CANCELLED = "CANCELLED",
  REFUNDED = "REFUNDED",
}

enum PaymentProvider {
  MERCADOPAGO = "MERCADOPAGO",
}

enum Currency {
  ARS = "ARS",
  USD = "USD",
}

export interface ResponsePaymentInterface {
  id: string;
  orderId: string;
  provider: PaymentProvider;
  status: PaymentStatus;
  amount: number;
  currency: Currency;
  providerPaymentId?: string;
  installments?: number;
  method?: string;
  capturedAt?: string;
  raw: any;
  createdAt: string;
  updatedAt: string;
}

export interface CreatePaymentInterface {
  orderId: string;
  provider?: PaymentProvider;
  status?: PaymentStatus;
  amount: number;
  currency?: Currency;
  providerPaymentId?: string;
  installments?: number;
  method?: string;
  capturedAt?: string;
  raw?: any;
}
