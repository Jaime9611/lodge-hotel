import { IMAGE_PATH, SETTINGS_PATH } from "@utils/constants";
import ApiClient from "./api-client.service";
import type { SettingsModel, SettingsModelFormResult } from "@models";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

class SettingsApi extends ApiClient {
  constructor() {
    super(API_BASE_URL);
  }

  async getSettings(): Promise<SettingsModel> {
    try {
      return await this.get<SettingsModel>(SETTINGS_PATH, {
        headers: { Authorization: `Bearer ${this.getToken()}` },
      });
    } catch (error) {
      console.error(error);
      throw Error("Error getting settings.");
    }
  }

  async updateSettings(settings: SettingsModelFormResult): Promise<boolean> {
    try {
      const hasImagePath =
        typeof settings.logoImage === "string" &&
        (settings as SettingsModel).logoImage?.startsWith(API_BASE_URL);

      const imageName = `${Math.random()}-${
        (settings as SettingsModelFormResult).logoImage.name
      }`
        .replace("/", "")
        .replace(/\.[^/.]+$/, ".webp");

      const imagePath = hasImagePath
        ? (settings as SettingsModel).logoImage
        : `${API_BASE_URL}/api/v1/storage/public/cabin/${imageName}`;

      await this.update(
        SETTINGS_PATH,
        { ...settings, logoImage: imagePath },
        {
          headers: { Authorization: `Bearer ${this.getToken()}` },
        }
      );
      if (hasImagePath) return true;

      // Save Image
      const formData = new FormData();
      formData.append("images", settings.logoImage);
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
      throw Error("Settings could not be updated.");
    }

    return true;
  }
}

export default new SettingsApi();
