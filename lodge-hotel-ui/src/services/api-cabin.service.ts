import { PAGE_SIZE } from "@utils/constants";
import ApiClient from "./api-client.service";
import type { CabinModel, CabinModelFormResult, CabinModelPage } from "@models";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
const CABIN_PATH = "/api/v1/cabin";
const IMAGE_PATH = "/api/v1/storage/cabin-images";

export type SortOptions = {
  field: string;
  direction: string;
};

class CabinsApi extends ApiClient {
  constructor() {
    super(API_BASE_URL);
  }

  async getAll(
    sortBy?: SortOptions,
    pageNumber?: number
  ): Promise<CabinModelPage> {
    let params: { [key: string]: string | number } = { pageSize: PAGE_SIZE };

    // SORT
    if (sortBy) {
      params["sortBy"] = sortBy.field;
      params["direction"] = sortBy.direction;
    }

    if (pageNumber) params["pageNumber"] = pageNumber;

    return await this.get<CabinModelPage>(CABIN_PATH, {
      headers: { Authorization: `Bearer ${this.getToken()}` },
      params,
    });
  }

  async getAllByCapacity(
    minCapacity: number,
    maxCapacity: number
  ): Promise<CabinModel[]> {
    let params = { min: minCapacity, max: maxCapacity };

    return await this.get<CabinModel[]>(`${CABIN_PATH}/capacity`, {
      params,
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
      }`
        .replace("/", "")
        .replace(/\.[^/.]+$/, ".webp");

      const imagePath = hasImagePath
        ? (newCabin as CabinModel).image
        : `${API_BASE_URL}/api/v1/storage/public/cabin/${imageName}`;

      if (!id)
        await this.post<CabinModel, object>(
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

      // Save Image
      const formData = new FormData();
      formData.append("images", newCabin.image);
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
