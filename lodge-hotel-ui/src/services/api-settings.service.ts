import ApiClient from "./api-client.service";
import type { SettingsModel } from "@models";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
const SETTINGS_PATH = "/api/v1/settings";

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

  async updateSettings(settings: SettingsModel): Promise<boolean> {
    try {
      await this.update(SETTINGS_PATH, settings, {
        headers: { Authorization: `Bearer ${this.getToken()}` },
      });
    } catch (error) {
      console.error(error);
      throw Error("Settings could not be updated.");
    }

    return true;
  }
}

export default new SettingsApi();
