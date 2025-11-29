import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Booking from "./booking.component";

const mockHook = vi.hoisted(() => {
  return {
    useBooking: vi.fn(),
  };
});
vi.mock("../features/bookings/use-booking.hook", () => ({
  useBooking: mockHook.useBooking,
}));
vi.mock("../features/bookings/use-delete-booking.hook", () => ({
  useDeleteBooking: () => ({ isDeleting: false, deleteBooking: {} }),
}));

describe("Booking Page", {}, () => {
  afterAll(() => vi.clearAllMocks());

  it("renders the Booking page", () => {
    mockHook.useBooking.mockReturnValue({
      isPending: false,
      booking: { status: "UNCONFIRMED" },
    });
    render(
      <MemoryRouter>
        <Booking />
      </MemoryRouter>
    );

    expect(screen.getByText("Booking #")).toBeInTheDocument();
    expect(screen.getAllByRole("button", { name: /back/i }).length).toBe(2);
    expect(screen.getByRole("button", { name: /delete/i })).toBeInTheDocument();
  });

  it("renders checkin button when status unconfirmed", () => {
    mockHook.useBooking.mockReturnValue({
      isPending: false,
      booking: { status: "UNCONFIRMED" },
    });

    render(
      <MemoryRouter>
        <Booking />
      </MemoryRouter>
    );

    expect(screen.getByText("Booking #")).toBeInTheDocument();
    expect(screen.getAllByRole("button", { name: /back/i }).length).toBe(2);
    expect(screen.getByRole("button", { name: /delete/i })).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /check in/i })
    ).toBeInTheDocument();
  });
  it("renders checkout button when status checked-in", () => {
    mockHook.useBooking.mockReturnValue({
      isPending: false,
      booking: { status: "CHECKED_IN" },
    });

    render(
      <MemoryRouter>
        <Booking />
      </MemoryRouter>
    );

    expect(screen.getByText("Booking #")).toBeInTheDocument();
    expect(screen.getAllByRole("button", { name: /back/i }).length).toBe(2);
    expect(screen.getByRole("button", { name: /delete/i })).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /check out/i })
    ).toBeInTheDocument();
  });
});
