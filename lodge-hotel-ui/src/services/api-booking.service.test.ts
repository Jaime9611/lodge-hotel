import { describe, it, expect } from "vitest";

import { afterAll } from "vitest";
import { apiBooking } from "@services";

import { MOCK_BOOKINGS } from "@mocks/booking-handlers";
import type { BookingModelFormResult, GuestModel } from "@models";

describe("Booking Service", {}, () => {
  afterAll(() => {
    vi.resetAllMocks();
  });

  it("returns the bookings data", async () => {
    const response = await apiBooking.getAll();

    await expect(response).toStrictEqual(MOCK_BOOKINGS);
  });

  it("returns the bookings data with params", async () => {
    const response = await apiBooking.getAll(
      { field: "status", value: "UNCONFIRMED" },
      { field: "id", direction: "asc" }
    );

    await expect(response).toStrictEqual(MOCK_BOOKINGS);
  });

  it("returns the bookings after date with boolean param", async () => {
    const response = await apiBooking.getBookingsAfterDate(new Date(), true);

    await expect(response).toStrictEqual(MOCK_BOOKINGS);
  });

  it("returns the bookings data for today", async () => {
    const response = await apiBooking.getTodayStays();

    await expect(response).toStrictEqual(MOCK_BOOKINGS);
  });

  it("returns the bookings reservations", async () => {
    const response = await apiBooking.getBookedReservations(1);

    await expect(response).toStrictEqual(MOCK_BOOKINGS.content);
  });

  it("returns the bookings quotation", async () => {
    const response = await apiBooking.getQuotation({
      cabins: [{ id: 1, name: "test" }],
      startDate: "2025-12-12",
      endDate: "2025-12-15",
    });

    await expect(response).toBeTypeOf("number");
  });

  it("return booking by id", async () => {
    const response = await apiBooking.getBooking(1);

    await expect(response).toStrictEqual(MOCK_BOOKINGS.content[0]);
  });

  it("return Error when bad request for booking by id", async () => {
    await expect(() => apiBooking.getBooking(2)).rejects.toThrowError(
      "Error Getting Booking"
    );
  });

  it("should create booking", async () => {
    const mockBooking: BookingModelFormResult = {
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
      startDate: "2025-12-12",
      endDate: "2025-12-15",
      guest: {} as GuestModel,
      isPaid: false,
      numGuests: 2,
      status: "UNCONFIRMED",
    };
    const response = await apiBooking.createEditBooking(mockBooking);

    await expect(response).toBeTruthy();
  });

  it("should update booking with id", async () => {
    const mockBooking: BookingModelFormResult = {
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
      startDate: "2025-12-12",
      endDate: "2025-12-15",
      guest: {} as GuestModel,
      isPaid: false,
      numGuests: 2,
      status: "UNCONFIRMED",
    };
    const response = await apiBooking.createEditBooking(
      mockBooking,
      mockBooking.id
    );

    await expect(response).toBeTruthy();
  });

  it("should throw Error on bad update request", async () => {
    const mockBooking: BookingModelFormResult = {
      id: 2000,
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
      startDate: "2025-12-12",
      endDate: "2025-12-15",
      guest: {} as GuestModel,
      isPaid: false,
      numGuests: 2,
      status: "UNCONFIRMED",
    };

    await expect(() =>
      apiBooking.createEditBooking(mockBooking, mockBooking.id)
    ).rejects.toThrowError("Booking could not be created.");
  });

  it("should update booking with status", async () => {
    const response = await apiBooking.updateBookingStatus(1, "UNCONFIRMED");

    await expect(response).toBeTruthy();
  });

  it("deletes booking by id", async () => {
    const response = await apiBooking.deleteBooking(1);

    await expect(response).toBeTruthy();
  });
  it("return Error when bad request for delete booking by id", async () => {
    await expect(() => apiBooking.deleteBooking(2000)).rejects.toThrowError(
      "Booking could not be deleted"
    );
  });
});
