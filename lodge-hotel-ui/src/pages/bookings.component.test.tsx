import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Bookings from "./bookings.component";

vi.mock("../features/bookings/use-bookings.hook", () => ({
  useBookings: () => ({ isLoading: false, bookings: [] }),
}));

describe("Bookings Page", {}, () => {
  afterAll(() => vi.clearAllMocks());

  it("renders the Cabins page", () => {
    render(
      <MemoryRouter>
        <Bookings />
      </MemoryRouter>
    );

    screen.debug();
    expect(screen.getByText("Bookings")).toBeInTheDocument();
    expect(screen.getByText("Sort by id (ASC)")).toBeInTheDocument();
    expect(screen.getByText("Sort by date (ASC)")).toBeInTheDocument();
  });

  it("renders the No Bookings", () => {
    render(
      <MemoryRouter>
        <Bookings />
      </MemoryRouter>
    );

    expect(screen.getByText("Bookings")).toBeInTheDocument();
    expect(screen.getByText("No bookings could be found.")).toBeInTheDocument();
  });
});
