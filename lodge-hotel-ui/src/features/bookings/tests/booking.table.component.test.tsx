import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import BookingTable from "../booking-table.component";
import { MOCK_BOOKINGS } from "@mocks/booking-handlers";
import { MemoryRouter } from "react-router-dom";

describe("BookingTable Component", {}, () => {
  beforeAll(() => {
    vi.mock("../use-bookings.hook", () => ({
      useBookings: () => ({
        bookings: MOCK_BOOKINGS.content,
        isLoading: false,
      }),
    }));
    vi.mock("../use-delete-booking.hook", () => ({
      useDeleteBooking: () => ({
        deleteBooking: vi.fn(),
        isLoading: false,
      }),
    }));
    vi.mock("../../check-in-out/use-checkout.hook", () => ({
      useCheckout: () => ({
        checkout: vi.fn(),
        isLoading: false,
      }),
    }));
  });

  afterAll(() => {
    vi.clearAllMocks();
  });

  it("renders the booking table", () => {
    render(
      <MemoryRouter>
        <BookingTable />
      </MemoryRouter>
    );

    expect(screen.getByText("ID")).toBeInTheDocument();
    expect(screen.getByText("Guest")).toBeInTheDocument();
    expect(screen.getByText("Dates")).toBeInTheDocument();
    expect(screen.getByText("Status")).toBeInTheDocument();
    expect(screen.getByText("Amount")).toBeInTheDocument();
    expect(screen.getByText("BK-1")).toBeInTheDocument();
    expect(screen.getByText("UNCONFIRMED")).toBeInTheDocument();
  });
});
