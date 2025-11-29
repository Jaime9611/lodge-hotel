import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import LandingLayout from "./layout.component";

describe("CountrySelector Component", {}, () => {
  it("renders the selector", () => {
    render(
      <MemoryRouter>
        <LandingLayout />
      </MemoryRouter>
    );

    expect(screen.getByTestId("landing-main")).toBeInTheDocument();
  });
});
