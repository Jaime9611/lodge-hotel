import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import AppLayout from "./app-layout.component";
import { MemoryRouter } from "react-router-dom";

describe("AppLayout Component", {}, () => {
  vi.mock("../../features/settings", () => ({
    useSettings: () => ({
      isLoading: false,
      error: null,
      settings: {
        minBookingLength: 2,
        maxBookingLength: 3,
        logoImage: "test.jpg",
      },
    }),
  }));

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders passed title", () => {
    render(
      <MemoryRouter>
        <AppLayout />
      </MemoryRouter>
    );

    expect(screen.getByTestId("header-dashboard-view")).toBeInTheDocument();
    expect(screen.getByTestId("sidebar-dashboard-view")).toBeInTheDocument();
  });
});
