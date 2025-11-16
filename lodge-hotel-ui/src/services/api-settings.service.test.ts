import { describe, it, expect } from "vitest";

import { afterAll } from "vitest";
import { apiSettings } from "@services";
import { MOCK_SETTINGS_RESPONSE } from "@mocks/settings-handlers";

describe("Settings Service", {}, () => {
  afterAll(() => {
    vi.resetAllMocks();
  });

  it("returns the settings", async () => {
    const response = await apiSettings.getSettings();

    await expect(response).toStrictEqual(MOCK_SETTINGS_RESPONSE);
  });

  it("updates the settings", async () => {
    const response = await apiSettings.updateSettings({
      minBookingLength: 2,
      maxBookingLength: 3,
      logoImage: "http://test.jpg",
    });

    await expect(response).toBeTruthy;
  });
});
