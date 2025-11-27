import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Checkin from "./checkin.component";
import { MOCK_BOOKINGS } from "@mocks/booking-handlers";

const mockHook = vi.hoisted(() => {
  return {
    useBooking: vi.fn(),
  };
});
vi.mock("../features/check-in-out/use-checkin.hook", () => ({
  useCheckin: () => ({ checkin: vi.fn() }),
}));
vi.mock("../features/bookings/use-booking.hook", () => ({
  useBooking: mockHook.useBooking,
}));

describe("CheckIn Page", {}, () => {
  afterAll(() => vi.clearAllMocks());

  it("renders the Checkin page", () => {
    mockHook.useBooking.mockReturnValue({
      isPending: false,
      booking: MOCK_BOOKINGS.content[0],
    });
    render(
      <MemoryRouter>
        <Checkin />
      </MemoryRouter>
    );

    expect(screen.getByText(/confirm that has paid/)).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /check in booking/i })
    ).toBeInTheDocument();
  });
});
