import ApiClient from "./api-client.service";
import type { CabinModel } from "@models";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
const CABIN_PATH = "/api/v1/cabin";

class CabinsApi extends ApiClient {
  constructor() {
    super(API_BASE_URL);
  }

  async getCabin(cabinId: number): Promise<CabinModel> {
    try {
      const response = await this.get<CabinModel>(`${CABIN_PATH}/${cabinId}`, {
        headers: { Authorization: `Bearer ${this.getToken()}` },
      });

      return response;
    } catch (error) {
      console.error(error);
      throw Error("Error during Login");
    }
  }
}

export default new CabinsApi();
