import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";

import Stats from "../stats.component";
import { MOCK_BOOKINGS } from "@mocks/booking-handlers";

describe("Stats component", {}, () => {
  beforeAll(() => {
    render(
      <MemoryRouter>
        <Stats
          bookings={MOCK_BOOKINGS.content}
          confirmedStays={MOCK_BOOKINGS.content}
          numDays={3}
          cabinCount={3}
        />
      </MemoryRouter>
    );
  });

  it("renders the dashboardbox", () => {
    expect(screen.getByText(/Bookings/i)).toBeInTheDocument();
    expect(screen.getByText(/Sales/i)).toBeInTheDocument();
    expect(screen.getByText(/Occupancy/i)).toBeInTheDocument();
  });
});
