import { IMAGE_PATH } from "@utils/constants";
import { http, HttpResponse } from "msw";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const handlers = [
  http.post(`${API_BASE_URL}${IMAGE_PATH}`, ({ request }) => {
    const authHeader = request.headers.get("Authorization");
    const multipartHeader = request.headers.get("Content-Type");

    if (!authHeader?.startsWith("Bearer"))
      return new HttpResponse({}, { status: 404 });

    if (multipartHeader !== "multipart/form-data")
      return new HttpResponse({}, { status: 404 });

    return HttpResponse.json(true);
  }),
];
