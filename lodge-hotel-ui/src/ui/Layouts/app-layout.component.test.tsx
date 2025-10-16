import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import AppLayout from "./app-layout.component";
import { MemoryRouter } from "react-router-dom";

describe("AppLayout Component", {}, () => {
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
