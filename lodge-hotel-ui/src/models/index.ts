// AUTH MODELS

export interface UserModel {
  username: string;
  password: string;
}

export interface AuthUserModel {
  user: string;
  role: string;
}

export interface LoginModel {
  user: AuthUserModel;
  access_token: string;
}

export interface LoginResponse {
  access_token: string;
  expiresAt: number;
}

// CABIN MODELS

export interface CabinModel {
  id: number;
  name: string;
  price: number;
}
