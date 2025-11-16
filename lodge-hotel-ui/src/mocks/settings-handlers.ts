import type { SettingsModel } from "@models";
import { SETTINGS_PATH } from "@utils/constants";
import { http, HttpResponse } from "msw";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const MOCK_SETTINGS_RESPONSE: SettingsModel = {
  minBookingLength: 1,
  maxBookingLength: 2,
  logoImage: "test-image.jpg",
};

export const handlers = [
  http.get(`${API_BASE_URL}${SETTINGS_PATH}`, ({ request }) => {
    const authHeader = request.headers.get("Authorization");

    if (!authHeader?.startsWith("Bearer"))
      return new HttpResponse({}, { status: 404 });

    return HttpResponse.json(MOCK_SETTINGS_RESPONSE);
  }),
  http.put(`${API_BASE_URL}${SETTINGS_PATH}`, ({ request }) => {
    const authHeader = request.headers.get("Authorization");

    if (!authHeader?.startsWith("Bearer"))
      return new HttpResponse({}, { status: 404 });

    return HttpResponse.json(true);
  }),
];
