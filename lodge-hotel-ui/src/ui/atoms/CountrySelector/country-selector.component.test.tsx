import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import CountrySelector from "./country-selector.component";

describe("CountrySelector Component", {}, () => {
  it("renders the selector", () => {
    render(<CountrySelector key={"my-selector"} onUpdate={vi.fn()} />);

    expect(screen.getByTestId("rfs")).toBeInTheDocument();
    expect(screen.getByTestId("rfs-btn")).toBeInTheDocument();
    expect(screen.getByText("Select a country")).toBeInTheDocument();
  });
});
