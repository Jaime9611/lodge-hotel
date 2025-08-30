import { PAGE_SIZE } from "@utils/constants";
import ApiClient from "./api-client.service";
import type { BookingModel, BookingModelPage } from "@models";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
const BOOKING_PATH = "/api/v1/booking";

class BookingsApi extends ApiClient {
  constructor() {
    super(API_BASE_URL);
  }

  async getAll(pageNumber?: number): Promise<BookingModelPage> {
    let url = `${BOOKING_PATH}`;

    if (pageNumber)
      url =
        url + "?" + `pageNumber=${pageNumber}` + "&" + `pageSize=${PAGE_SIZE}`;

    return await this.get<BookingModelPage>(url, {
      headers: { Authorization: `Bearer ${this.getToken()}` },
    });
  }

  async getBooking(bookingId: number): Promise<BookingModel> {
    try {
      const response = await this.get<BookingModel>(
        `${BOOKING_PATH}/${bookingId}`,
        {
          headers: { Authorization: `Bearer ${this.getToken()}` },
        }
      );

      return response;
    } catch (error) {
      console.error(error);
      throw Error("Error Getting Booking");
    }
  }

  async createEditBooking(
    newBooking: BookingModel,
    id?: number
  ): Promise<boolean> {
    try {
      if (!id)
        await this.post<BookingModel, void>(`${BOOKING_PATH}`, newBooking, {
          headers: { Authorization: `Bearer ${this.getToken()}` },
        });

      if (id)
        await this.update<BookingModel>(
          `${BOOKING_PATH}/${id}`,
          newBooking as BookingModel,
          {
            headers: { Authorization: `Bearer ${this.getToken()}` },
          }
        );
    } catch (error) {
      console.error(error);
      throw Error("Booking could not be created.");
    }

    return true;
  }

  async deleteBooking(id: number): Promise<boolean> {
    try {
      await this.delete(`${BOOKING_PATH}/${id}`, {
        headers: { Authorization: `Bearer ${this.getToken()}` },
      });
    } catch (error) {
      console.error(error);
      throw Error("Booking could not be deleted");
    }

    return true;
  }
}

export default new BookingsApi();
