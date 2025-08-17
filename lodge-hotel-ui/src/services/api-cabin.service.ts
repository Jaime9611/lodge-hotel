import { PAGE_SIZE } from "@utils/constants";
import ApiClient from "./api-client.service";
import type { CabinModel, CabinModelFormResult, CabinModelPage } from "@models";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
const CABIN_PATH = "/api/v1/cabin";

class CabinsApi extends ApiClient {
  constructor() {
    super(API_BASE_URL);
  }

  async getAll(pageNumber?: number): Promise<CabinModelPage> {
    let url = `${CABIN_PATH}`;

    if (pageNumber)
      url =
        url + "?" + `pageNumber=${pageNumber}` + "&" + `pageSize=${PAGE_SIZE}`;

    return await this.get<CabinModelPage>(url, {
      headers: { Authorization: `Bearer ${this.getToken()}` },
    });
  }

  async getCabin(cabinId: number): Promise<CabinModel> {
    try {
      const response = await this.get<CabinModel>(`${CABIN_PATH}/${cabinId}`, {
        headers: { Authorization: `Bearer ${this.getToken()}` },
      });

      return response;
    } catch (error) {
      console.error(error);
      throw Error("Error Getting Cabin");
    }
  }

  async createEditCabin(
    newCabin: CabinModel | CabinModelFormResult,
    id?: number
  ): Promise<boolean> {
    let query = () => {};

    if (!id)
      query = async () =>
        await this.post<CabinModelFormResult, void>(`${CABIN_PATH}`, newCabin, {
          headers: { Authorization: `Bearer ${this.getToken()}` },
        });

    if (id)
      query = async () =>
        await this.update<CabinModel>(
          `${CABIN_PATH}/${id}`,
          newCabin as CabinModel,
          {
            headers: { Authorization: `Bearer ${this.getToken()}` },
          }
        );

    try {
      query();
    } catch (error) {
      console.error(error);
      throw Error("Cabin could not be created.");
    }

    return true;
  }

  async deleteCabin(id: number): Promise<boolean> {
    try {
      await this.delete(`${CABIN_PATH}/${id}`, {
        headers: { Authorization: `Bearer ${this.getToken()}` },
      });
    } catch (error) {
      console.error(error);
      throw Error("Cabin could not be deleted");
    }

    return true;
  }
}

export default new CabinsApi();
