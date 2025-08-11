import ApiClient from "./api-client.service";
import type { LoginResponse, UserModel } from "@models";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
const LOGIN_PATH = "/auth/login";

class AuthApi extends ApiClient {
  constructor() {
    super(API_BASE_URL);
  }

  async login(user: UserModel): Promise<LoginResponse> {
    try {
      return this.post<string, LoginResponse>(
        `${LOGIN_PATH}?username=${user.username}&password=${user.password}`,
        ""
      );
    } catch (error) {
      console.error(error);
      throw Error("Error during Login");
    }
  }
}

export default new AuthApi();
