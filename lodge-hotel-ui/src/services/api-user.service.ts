import ApiClient from "./api-client.service";
import type { UserModel } from "@models";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
const USER_PATH = "/employee";

class UserApi extends ApiClient {
  constructor() {
    super(API_BASE_URL);
  }

  async getEmployees(): Promise<UserModel[]> {
    try {
      return await this.get<UserModel[]>(USER_PATH, {
        headers: { Authorization: `Bearer ${this.getToken()}` },
      });
    } catch (error) {
      console.error(error);
      throw Error("Error getting employees.");
    }
  }

  async createEditEmployee(
    newUser: Omit<UserModel, "id">,
    id?: number
  ): Promise<boolean> {
    try {
      if (!id)
        await this.post<Omit<UserModel, "id">, object>(
          `${USER_PATH}/register`,
          newUser,
          {
            headers: { Authorization: `Bearer ${this.getToken()}` },
          }
        );

      if (id)
        await this.update<Omit<UserModel, "id">>(
          `${USER_PATH}/${id}`,
          newUser,
          {
            headers: { Authorization: `Bearer ${this.getToken()}` },
          }
        );
    } catch (error) {
      console.error(error);
      throw Error("Employee could not be created.");
    }

    return true;
  }

  async deleteEmployee(id: number): Promise<boolean> {
    try {
      await this.delete(`${USER_PATH}/${id}`, {
        headers: { Authorization: `Bearer ${this.getToken()}` },
      });
    } catch (error) {
      console.error(error);
      throw Error("Employee could not be deleted");
    }

    return true;
  }
}

export default new UserApi();
