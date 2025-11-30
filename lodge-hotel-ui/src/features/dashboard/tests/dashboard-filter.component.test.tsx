import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import DashboardFilter from "../dashboard-filter.component";
import { MemoryRouter } from "react-router-dom";

describe("Dashboard Filter Component", {}, () => {
  beforeAll(() => {
    render(
      <MemoryRouter>
        <DashboardFilter />
      </MemoryRouter>
    );
  });

  it("renders the dashboardbox", () => {
    expect(screen.getByText(/Last 7 days/i)).toBeInTheDocument();
    expect(screen.getByText(/Last 30 days/i)).toBeInTheDocument();
    expect(screen.getByText(/Last 90 days/i)).toBeInTheDocument();
  });
});
