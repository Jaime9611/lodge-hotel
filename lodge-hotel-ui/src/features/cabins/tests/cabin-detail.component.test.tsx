import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { MOCK_CABINS } from "@mocks/cabin-handlers";
import CabinUserDetail from "../cabin-detail.component";
import { MOCK_BOOKINGS } from "@mocks/booking-handlers";
import { MOCK_SETTINGS_RESPONSE } from "@mocks/settings-handlers";

describe("CabinDetail Component", {}, () => {
  beforeAll(() => {
    vi.mock("../use-cabin.hook", () => ({
      useCabin: () => ({
        cabin: MOCK_CABINS.content[0],
        isLoading: false,
      }),
    }));
    vi.mock("../../bookings/use-booked-reservations.hook", () => ({
      useBookedReservations: () => ({
        bookings: MOCK_BOOKINGS.content[0],
        isLoading: false,
      }),
    }));
    vi.mock("../../settings/use-settings.hook", () => ({
      useSettings: () => ({
        settings: MOCK_SETTINGS_RESPONSE,
        isLoading: false,
      }),
    }));
    vi.mock("../use-delete-cabin.hook", () => ({
      useDeleteCabin: () => ({
        deleteCabin: vi.fn(),
        isLoading: false,
      }),
    }));
  });

  afterAll(() => {
    vi.clearAllMocks();
  });

  it("renders the cabin table", () => {
    render(
      <MemoryRouter>
        <CabinUserDetail />
      </MemoryRouter>
    );

    expect(screen.getByText(/Cabin Detail/i)).toBeInTheDocument();
    expect(screen.getByText(/cabin test/i)).toBeInTheDocument();
    expect(screen.getAllByText(/back/i).length).toBe(2);
    expect(screen.getByText(/Reservation/i)).toBeInTheDocument();
  });
});
