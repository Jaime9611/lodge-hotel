import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { MOCK_CABINS } from "@mocks/cabin-handlers";
import BookedCabinDetail from "./booked-cabin-detail.component";
import { MOCK_BOOKINGS } from "@mocks/booking-handlers";

const mockHook = vi.hoisted(() => {
  return {
    useCabinDetail: vi.fn(),
  };
});

vi.mock("./use-cabin-detail.hook", () => ({
  useCabinDetail: mockHook.useCabinDetail,
}));
vi.mock("../settings/use-settings.hook", () => ({
  useSettings: () => ({ settings: {}, isLoading: false }),
}));
vi.mock("../../features/bookings/use-booked-reservations.hook", () => ({
  useBookedReservations: () => ({
    bookedDates: [
      {
        start: MOCK_BOOKINGS.content[0].startDate,
        end: MOCK_BOOKINGS.content[0].endDate,
      },
    ],
  }),
}));

describe("BookedCabinDetail Component", {}, () => {
  it("renders the no cabin message", () => {
    mockHook.useCabinDetail.mockReturnValue({
      isLoading: false,
      cabins: [],
    });

    render(
      <MemoryRouter>
        <BookedCabinDetail />
      </MemoryRouter>
    );

    expect(screen.getByText("No cabin could be found.")).toBeInTheDocument();
  });

  it("renders the cabin detail", () => {
    mockHook.useCabinDetail.mockReturnValue({
      isLoading: false,
      cabin: MOCK_CABINS.content[0],
    });

    render(
      <MemoryRouter>
        <BookedCabinDetail />
      </MemoryRouter>
    );

    expect(screen.getByText("Cabin Detail")).toBeInTheDocument();
    expect(screen.getByText(/cabin test/i)).toBeInTheDocument();
  });
});
