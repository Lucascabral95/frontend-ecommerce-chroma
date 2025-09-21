export interface GetAllUsers {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
  prevPage: boolean;
  nextPage: boolean;
  users: User[];
}

export interface User {
  id: string;
  email: string;
  name: string;
  roles?: Role[];
  addresses: Address[];
  carts: Cart[];
}

export interface Address {
  id: string;
  userId: string;
  firstName: string;
  lastName: string;
  phone: string;
  street1?: string;
  street2?: string;
  city: string;
  state: string;
  postalCode?: string;
  country: string;
  isDefault: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface Cart {
  id: string;
  userId: string;
  sessionId?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Role {
  role: {
    name?: string;
  };
}

export interface UsersFilters {
  page?: number;
  limit?: number;
  email?: string;
  name?: string;
}

/// Create/Registe user
export interface RegisterUserInterface {
  email: string;
  name: string;
  hashedPassword: string;
}

export interface ResponseRegisterUserInterface {
  user: UserRR;
  message: string;
}

export interface UserRR {
  id: string;
  email: string;
  name: string;
}

// Update User
export interface UpdateUserDtoInterface {
  name?: string;
  email?: string;
}

export interface ResponseUpdateUserInterface {
  id: string;
  email: string;
  name: string;
}
