import ApiClient from "./api-client.service";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
const LOGIN_PATH = "/auth/login";

export interface UserModel {
  username: string;
  password: string;
}

export interface LoginResponse {
  access_token: string;
}

class AuthApi extends ApiClient {
  constructor() {
    super(API_BASE_URL);
  }

  async login(user: UserModel): Promise<{ access_token: string } | void> {
    try {
      return this.post<string, LoginResponse>(
        `${LOGIN_PATH}?username=testuser&password=123`,
        ""
      );
    } catch (error) {
      console.error(error);
      throw Error("Error during Login");
    }
  }
}

export default new AuthApi();
