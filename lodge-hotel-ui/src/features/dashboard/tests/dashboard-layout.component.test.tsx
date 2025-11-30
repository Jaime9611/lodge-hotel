import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import DashboardLayout from "../dashboard-layout.component";

import "../../dashboard/use-recent-stays.hook";
import { MOCK_BOOKINGS } from "@mocks/booking-handlers";
import { MOCK_CABINS } from "@mocks/cabin-handlers";
describe("Dashboard Layout Component", {}, () => {
  beforeAll(() => {
    vi.mock("../../dashboard/use-recent-bookings.hook", () => ({
      useRecentBookings: () => ({
        bookings: MOCK_BOOKINGS.content,
        isLoading: false,
      }),
    }));
    vi.mock("../../dashboard/use-recent-stays.hook", () => ({
      useRecentStays: () => ({
        confirmedStays: MOCK_BOOKINGS.content,
        numDays: 3,
        isLoading: false,
      }),
    }));
    vi.mock("../../cabins/use-cabins.hook", () => ({
      useCabins: () => ({
        cabins: MOCK_CABINS.content[0],
        isPending: false,
      }),
    }));
    vi.mock("../../check-in-out/use-today-activity.hook", () => ({
      useTodayActivity: () => ({
        activities: MOCK_BOOKINGS.content,
        isLoading: false,
      }),
    }));
    vi.mock("recharts", () => ({
      default: vi.fn(),
      ResponsiveContainer: vi.fn(),
      PieChart: vi.fn(),
      Pie: vi.fn(),
      Cell: vi.fn(),
      Tooltip: vi.fn(),
      Legend: vi.fn(),
      AreaChart: vi.fn(),
      XAxis: vi.fn(),
      YAxis: vi.fn(),
      CartesianGrid: vi.fn(),
      Area: vi.fn(),
    }));
  });

  it("renders the dashboardbox", () => {
    render(
      <MemoryRouter>
        <DashboardLayout />
      </MemoryRouter>
    );

    expect(screen.getByText(/Bookings/i)).toBeInTheDocument();
    expect(screen.getByText(/Check ins/i)).toBeInTheDocument();
    expect(screen.getByText(/Occupancy/i)).toBeInTheDocument();
  });
});
