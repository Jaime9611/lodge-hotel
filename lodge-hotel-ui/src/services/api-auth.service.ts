import { jwtDecode } from "jwt-decode";
import ApiClient from "./api-client.service";
import type { LoginModel, LoginResponse, UserLoginModel } from "@models";
import { LOGIN_PATH } from "@utils/constants";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

class AuthApi extends ApiClient {
  constructor() {
    super(API_BASE_URL);
  }

  async login(user: UserLoginModel): Promise<LoginModel> {
    try {
      const response = await this.post<string, LoginResponse>(
        `${LOGIN_PATH}?username=${user.username}&password=${user.password}`,
        ""
      );

      const decoded = jwtDecode(response.access_token);

      return {
        user: {
          user: user.username,
          role: decoded.role[0],
        },
        access_token: response.access_token,
      };
    } catch (error) {
      console.error(error);
      throw Error("Error during Login");
    }
  }
}

export default new AuthApi();
