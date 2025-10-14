import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import Spinner from "./spinner.component";

describe("Spinner Component", {}, () => {
  it("renders spinner", () => {
    render(<Spinner />);

    expect(screen.getByTestId("spinner-component")).toBeInTheDocument();
  });
});
