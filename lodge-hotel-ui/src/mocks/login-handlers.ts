import type { LoginResponse } from "@models";
import { LOGIN_PATH } from "@utils/constants";
import { http, HttpResponse } from "msw";
import { URL } from "url";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const MOCK_USER = "test";
export const MOCK_PASSWORD = "123";
const MOCK_RESPONSE: LoginResponse = {
  access_token: "MY_TOKEN",
  expiresAt: 3600,
};

export const handlers = [
  http.post(`${API_BASE_URL}${LOGIN_PATH}`, ({ request }) => {
    const url = new URL(request.url);
    const username = url.searchParams.get("username");
    const password = url.searchParams.get("password");

    if (!username || !password) {
      return new HttpResponse({}, { status: 404 });
    }

    return HttpResponse.json(MOCK_RESPONSE);
  }),
];
