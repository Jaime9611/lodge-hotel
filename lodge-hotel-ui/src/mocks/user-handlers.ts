import type { UserModel } from "@models";
import { USER_PATH } from "@utils/constants";
import { http, HttpResponse } from "msw";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const MOCK_USER = "test";
export const MOCK_PASSWORD = "123";
const MOCK_RESPONSE: UserModel = {
  id: 1,
  username: "test",
  email: "test@email.com",
  fullName: "test name",
  image: "http://image.jpg",
  password: "",
  phone: "1234556",
};

export const handlers = [
  http.get(`${API_BASE_URL}${USER_PATH}/data`, ({ request }) => {
    const authHeader = request.headers.get("Authorization");

    if (!authHeader?.startsWith("Bearer"))
      return new HttpResponse({}, { status: 401 });

    return HttpResponse.json(MOCK_RESPONSE);
  }),
  http.get(`${API_BASE_URL}${USER_PATH}`, ({ request }) => {
    const authHeader = request.headers.get("Authorization");

    if (!authHeader?.startsWith("Bearer"))
      return new HttpResponse({}, { status: 401 });

    return HttpResponse.json([MOCK_RESPONSE]);
  }),
  http.post(`${API_BASE_URL}${USER_PATH}/register`, ({ request }) => {
    const authHeader = request.headers.get("Authorization");

    if (!authHeader?.startsWith("Bearer"))
      return new HttpResponse({}, { status: 401 });

    return HttpResponse.json(true);
  }),
  http.put(`${API_BASE_URL}${USER_PATH}/:userId`, ({ request }) => {
    const authHeader = request.headers.get("Authorization");

    if (!authHeader?.startsWith("Bearer"))
      return new HttpResponse({}, { status: 401 });

    if (!request.url[request.url.length - 1].endsWith("1")) {
      return new HttpResponse({}, { status: 404 });
    }

    return HttpResponse.json(true);
  }),
  http.delete(`${API_BASE_URL}${USER_PATH}/:userId`, ({ request }) => {
    const authHeader = request.headers.get("Authorization");

    if (!authHeader?.startsWith("Bearer"))
      return new HttpResponse({}, { status: 401 });

    if (request.url[request.url.length - 1].endsWith("2")) {
      return new HttpResponse({}, { status: 404 });
    }

    return HttpResponse.json(true);
  }),
];
