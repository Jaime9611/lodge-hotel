import { PAGE_SIZE } from "@utils/constants";
import ApiClient from "./api-client.service";
import type {
  BookingModel,
  BookingModelFormResult,
  BookingModelPage,
  BookingQuotationRequest,
} from "@models";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
const BOOKING_PATH = "/api/v1/booking";

export type FilterOptions = {
  field: string;
  value: string;
};
export type SortOptions = {
  field: string;
  direction: string;
};

class BookingsApi extends ApiClient {
  constructor() {
    super(API_BASE_URL);
  }

  async getAll(
    filter?: FilterOptions,
    sortBy?: SortOptions,
    pageNumber?: number
  ): Promise<BookingModelPage> {
    let params: { [key: string]: string | number } = { pageSize: PAGE_SIZE };

    // FILTER
    if (filter) {
      params[filter.field] = filter.value;
    }

    // SORT
    if (sortBy) {
      params["sortBy"] = sortBy.field;
      params["direction"] = sortBy.direction;
    }

    if (pageNumber) params["pageNumber"] = pageNumber;

    return await this.get<BookingModelPage>(BOOKING_PATH, {
      headers: { Authorization: `Bearer ${this.getToken()}` },
      params,
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
    newBooking: BookingModel | BookingModelFormResult,
    id?: number
  ): Promise<boolean> {
    try {
      if (!id)
        await this.post<BookingModelFormResult, void>(
          `${BOOKING_PATH}`,
          newBooking,
          {
            headers: { Authorization: `Bearer ${this.getToken()}` },
          }
        );

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

  async updateBookingStatus(id: number, status: string) {
    try {
      await this.patch(`${BOOKING_PATH}/${id}?status=${status}`, "", {
        headers: { Authorization: `Bearer ${this.getToken()}` },
      });
    } catch (error) {
      console.error(error);
      throw Error("Booking Status could not be updated.");
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

  async getQuotation(booking: BookingQuotationRequest): Promise<number> {
    return await this.post<BookingQuotationRequest, number>(
      `${BOOKING_PATH}/quotation`,
      booking,
      {
        headers: { Authorization: `Bearer ${this.getToken()}` },
      }
    );
  }

  async getBookingsAfterDate(
    date: Date,
    fromCreation: boolean = false
  ): Promise<BookingModelPage> {
    const dateOnlyStr = date.toISOString().split("T")[0];

    return await this.get<BookingModelPage>(`${BOOKING_PATH}/after`, {
      headers: { Authorization: `Bearer ${this.getToken()}` },
      params: { date: dateOnlyStr, fromCreation },
    });
  }

  async getTodayStays(): Promise<BookingModelPage> {
    const dateOnlyStr = new Date().toISOString().split("T")[0];

    return await this.get<BookingModelPage>(`${BOOKING_PATH}/today-activity`, {
      headers: { Authorization: `Bearer ${this.getToken()}` },
      params: { date: dateOnlyStr },
    });
  }

  async getBookedReservations(cabinId: number): Promise<BookingModel[]> {
    return await this.get<BookingModel[]>(
      `${BOOKING_PATH}/reservations/${cabinId}`,
      {
        headers: { Authorization: `Bearer ${this.getToken()}` },
      }
    );
  }
}

export default new BookingsApi();
