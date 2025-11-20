import type { BookingModelPage, GuestModel } from "@models";
import { BOOKING_PATH } from "@utils/constants";
import { http, HttpResponse } from "msw";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const MOCK_BOOKINGS: BookingModelPage = {
  content: [
    {
      id: 1,
      cabins: [
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
      createdAt: "2025-12-12",
      startDate: "2025-12-12",
      endDate: "2025-12-15",
      guest: {} as GuestModel,
      isPaid: false,
      numGuests: 2,
      numNights: 3,
      status: "UNCONFIRMED",
      totalPrice: 300,
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
  http.get(`${API_BASE_URL}${BOOKING_PATH}`, ({ request }) => {
    const authHeader = request.headers.get("Authorization");

    if (!authHeader?.startsWith("Bearer"))
      return new HttpResponse({}, { status: 404 });

    return HttpResponse.json(MOCK_BOOKINGS);
  }),
  http.get(`${API_BASE_URL}${BOOKING_PATH}/after`, ({ request }) => {
    const authHeader = request.headers.get("Authorization");

    if (!authHeader?.startsWith("Bearer"))
      return new HttpResponse({}, { status: 404 });

    return HttpResponse.json(MOCK_BOOKINGS);
  }),
  http.get(`${API_BASE_URL}${BOOKING_PATH}/today-activity`, ({ request }) => {
    const authHeader = request.headers.get("Authorization");

    if (!authHeader?.startsWith("Bearer"))
      return new HttpResponse({}, { status: 404 });

    return HttpResponse.json(MOCK_BOOKINGS);
  }),
  http.get(`${API_BASE_URL}${BOOKING_PATH}/:bookingId`, ({ request }) => {
    const authHeader = request.headers.get("Authorization");

    if (!authHeader?.startsWith("Bearer"))
      return new HttpResponse({}, { status: 404 });

    if (!request.url[request.url.length - 1].endsWith("1")) {
      return new HttpResponse({}, { status: 404 });
    }

    return HttpResponse.json(MOCK_BOOKINGS.content[0]);
  }),
  http.get(`${API_BASE_URL}${BOOKING_PATH}/reservations/:cabinId`, () => {
    return HttpResponse.json(MOCK_BOOKINGS.content);
  }),
  http.post(`${API_BASE_URL}${BOOKING_PATH}/quotation`, ({ request }) => {
    const authHeader = request.headers.get("Authorization");

    if (!authHeader?.startsWith("Bearer"))
      return new HttpResponse({}, { status: 404 });

    return HttpResponse.json(2000);
  }),
  http.post(`${API_BASE_URL}${BOOKING_PATH}`, ({ request }) => {
    const authHeader = request.headers.get("Authorization");

    if (!authHeader?.startsWith("Bearer"))
      return new HttpResponse({}, { status: 401 });

    return HttpResponse.json(true);
  }),
  http.put(`${API_BASE_URL}${BOOKING_PATH}/:bookingId`, ({ request }) => {
    const authHeader = request.headers.get("Authorization");

    if (!authHeader?.startsWith("Bearer"))
      return new HttpResponse({}, { status: 401 });

    if (!request.url[request.url.length - 1].endsWith("1")) {
      return new HttpResponse({}, { status: 404 });
    }

    return HttpResponse.json(true);
  }),
  http.patch(`${API_BASE_URL}${BOOKING_PATH}/:bookingId`, ({ request }) => {
    const authHeader = request.headers.get("Authorization");

    if (!authHeader?.startsWith("Bearer"))
      return new HttpResponse({}, { status: 401 });

    return HttpResponse.json(true);
  }),
  http.delete(`${API_BASE_URL}${BOOKING_PATH}/:bookingId`, ({ request }) => {
    const authHeader = request.headers.get("Authorization");

    if (!authHeader?.startsWith("Bearer"))
      return new HttpResponse({}, { status: 404 });

    if (!request.url[request.url.length - 1].endsWith("1")) {
      return new HttpResponse({}, { status: 404 });
    }

    return HttpResponse.json(MOCK_BOOKINGS.content[0]);
  }),
];
