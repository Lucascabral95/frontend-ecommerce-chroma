export interface AddressInterface {
  userId?: string;
  firstName: string;
  lastName: string;
  phone: string;
  street1: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
}

export interface ResponseAddressInterface {
  id: string;
  userId: string;
  firstName: string;
  lastName: string;
  phone: string;
  street1: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
  isDefault: boolean;
  createdAt?: string;
  updatedAt?: string;
}

export interface UpdateAddressInterface {
  firstName: string;
  lastName: string;
  phone: string;
  street1: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
}

// Obtener direcciones por userId
export interface GetAddressByUserIdInterface {
  addressCount: number;
  firstAddress?: ResponseAddressInterface;
  addresses?: ResponseAddressInterface[];
}
