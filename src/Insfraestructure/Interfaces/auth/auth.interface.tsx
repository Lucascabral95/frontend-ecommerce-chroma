export interface RegisterUserInteface {
  email: string;
  hashedPassword: string;
  name: string;
}

export interface ResponseRegisterInterface {
  user: {
    id: string;
    email: string;
    name: string;
  };
  message: string;
}

export interface LoginUserInteface {
  email: string;
  hashedPassword: string;
}

export interface ResponseLoginInterface {
  message: string;
  accessToken: string;
}

export interface JwtPayload {
  id: string;
  name: string;
  email: string;
  iat: number;
  exp: number;
}
