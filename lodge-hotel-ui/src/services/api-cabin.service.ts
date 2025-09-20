import { PAGE_SIZE } from "@utils/constants";
import ApiClient from "./api-client.service";
import type { CabinModel, CabinModelFormResult, CabinModelPage } from "@models";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
const CABIN_PATH = "/api/v1/cabin";
const IMAGE_PATH = "/api/v1/storage/public/cabin";

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
    try {
      const hasImagePath =
        typeof newCabin.image === "string" &&
        (newCabin as CabinModel).image?.startsWith(API_BASE_URL);

      const imageName = `${Math.random()}-${
        (newCabin as CabinModelFormResult).image.name
      }`.replace("/", "");
      const imagePath = hasImagePath
        ? (newCabin as CabinModel).image
        : `${API_BASE_URL}${IMAGE_PATH}/${imageName}`;

      let cabinResponse = {};
      if (!id)
        cabinResponse = await this.post<CabinModel, object>(
          `${CABIN_PATH}`,
          { ...newCabin, image: imagePath } as CabinModel,
          {
            headers: { Authorization: `Bearer ${this.getToken()}` },
          }
        );

      if (id)
        await this.update<CabinModel>(
          `${CABIN_PATH}/${id}`,
          { ...newCabin, image: imagePath } as CabinModel,
          {
            headers: { Authorization: `Bearer ${this.getToken()}` },
          }
        );

      if (hasImagePath) return true;

      const formData = new FormData();
      formData.append("images", newCabin.image);
      formData.append("imageName", newCabin.image);

      const response = this.post<object, {}>(`${IMAGE_PATH}`, formData, {
        headers: {
          Authorization: `Bearer ${this.getToken()}`,
          "Content-Type": "multipart/form-data",
        },
      })
        .then((response) => {
          console.log("File uploaded successfully");
        })
        .catch((error) => {
          console.error("Error uploading file:", error);
          console.log(cabinResponse);
        });
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
