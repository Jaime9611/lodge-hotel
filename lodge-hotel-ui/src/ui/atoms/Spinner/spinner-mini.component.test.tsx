import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import SpinnerMini from "./spinner-mini.component";

describe("SpinnerMini Component", {}, () => {
  it("renders spinner", () => {
    render(<SpinnerMini />);

    expect(screen.getByTestId("spinner-mini-component")).toBeInTheDocument();
  });
});
