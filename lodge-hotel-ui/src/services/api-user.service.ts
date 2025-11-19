import { IMAGE_PATH, USER_PATH } from "@utils/constants";
import ApiClient from "./api-client.service";
import type { UserModel, UserModelFormResult } from "@models";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

class UserApi extends ApiClient {
  constructor() {
    super(API_BASE_URL);
  }

  async getData(): Promise<UserModel> {
    try {
      return await this.get<UserModel>(`${USER_PATH}/data`, {
        headers: { Authorization: `Bearer ${this.getToken()}` },
      });
    } catch (error) {
      console.error(error);
      throw Error("Error getting user data.");
    }
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
    newUser: UserModel | UserModelFormResult,
    id?: number
  ): Promise<boolean> {
    try {
      const hasImagePath =
        typeof newUser.image === "string" &&
        (newUser as UserModel).image?.startsWith(API_BASE_URL);

      const imageName = `${Math.random()}-${
        (newUser as UserModelFormResult).image.name
      }`
        .replace("/", "")
        .replace(/\.[^/.]+$/, ".webp");

      const imagePath = hasImagePath
        ? (newUser as UserModel).image
        : `${API_BASE_URL}/api/v1/storage/public/cabin/${imageName}`;

      if (!id)
        await this.post<Omit<UserModel, "id">, object>(
          `${USER_PATH}/register`,
          { ...newUser, image: imagePath },
          {
            headers: { Authorization: `Bearer ${this.getToken()}` },
          }
        );

      if (id)
        await this.update<Omit<UserModel, "id">>(
          `${USER_PATH}/${id}`,
          { ...newUser, image: imagePath },
          {
            headers: { Authorization: `Bearer ${this.getToken()}` },
          }
        );

      if (hasImagePath) return true;

      // Save Image
      const formData = new FormData();
      formData.append("images", newUser.image);
      formData.append("imageName", imageName);

      const response = this.post<object, {}>(
        `${API_BASE_URL}${IMAGE_PATH}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${this.getToken()}`,
            "Content-Type": "multipart/form-data",
          },
        }
      )
        .then((response) => {
          console.log("File uploaded successfully");
        })
        .catch((error) => {
          console.error("Error uploading file:", error);
        });
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
