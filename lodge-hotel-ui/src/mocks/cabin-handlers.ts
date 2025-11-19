import type { CabinModel, CabinModelPage } from "@models";
import { CABIN_PATH } from "@utils/constants";
import { http, HttpResponse } from "msw";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const MOCK_CABINS: CabinModelPage = {
  content: [
    {
      id: 1,
      name: "cabin test",
      createdAt: "2014-14-1",
      description: "",
      maxCapacity: 4,
      image: "",
      regularPrice: 200,
      discount: 0,
    },
  ],
  first: false,
  last: true,
  number: 1,
  size: 1,
  totalElements: 1,
  totalPages: 1,
};

export const handlers = [
  http.get(`${API_BASE_URL}${CABIN_PATH}`, ({ request }) => {
    const authHeader = request.headers.get("Authorization");

    if (!authHeader?.startsWith("Bearer"))
      return new HttpResponse({}, { status: 404 });

    return HttpResponse.json(MOCK_CABINS);
  }),
  http.get(`${API_BASE_URL}${CABIN_PATH}/capacity`, ({ request }) => {
    if (request.url.includes("min=") && request.url.includes("max="))
      return HttpResponse.json(MOCK_CABINS.content);

    return new HttpResponse({}, { status: 404 });
  }),
  http.get(`${API_BASE_URL}${CABIN_PATH}/:cabinId`, ({ request }) => {
    const authHeader = request.headers.get("Authorization");

    if (!authHeader?.startsWith("Bearer"))
      return new HttpResponse({}, { status: 404 });

    if (!request.url[request.url.length - 1].endsWith("1")) {
      return new HttpResponse({}, { status: 404 });
    }

    return HttpResponse.json(MOCK_CABINS.content[0]);
  }),
  http.post(`${API_BASE_URL}${CABIN_PATH}`, ({ request }) => {
    const authHeader = request.headers.get("Authorization");

    if (!authHeader?.startsWith("Bearer"))
      return new HttpResponse({}, { status: 401 });

    return HttpResponse.json(true);
  }),
  http.put(`${API_BASE_URL}${CABIN_PATH}/:cabinId`, ({ request }) => {
    const authHeader = request.headers.get("Authorization");

    if (!authHeader?.startsWith("Bearer"))
      return new HttpResponse({}, { status: 401 });

    if (!request.url[request.url.length - 1].endsWith("1")) {
      return new HttpResponse({}, { status: 404 });
    }

    return HttpResponse.json(true);
  }),
  http.delete(`${API_BASE_URL}${CABIN_PATH}/:cabinId`, ({ request }) => {
    const authHeader = request.headers.get("Authorization");

    if (!authHeader?.startsWith("Bearer"))
      return new HttpResponse({}, { status: 404 });

    if (!request.url[request.url.length - 1].endsWith("1")) {
      return new HttpResponse({}, { status: 404 });
    }

    return HttpResponse.json(MOCK_CABINS.content[0]);
  }),
];
