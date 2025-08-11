// AUTH MODELS

export interface UserModel {
  username: string;
  password: string;
}

export interface LoginResponse {
  access_token: string;
  expiresAt: number;
}
