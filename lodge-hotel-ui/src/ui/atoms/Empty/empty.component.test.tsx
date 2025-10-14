import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import Empty from "./empty.component";

describe("Empty Component", {}, () => {
  it("renders passed resource", () => {
    const testResource = "Item";
    render(<Empty resource={testResource} />);

    expect(screen.getByRole("paragraph")).toBeInTheDocument();
    expect(
      screen.getByText(`No ${testResource} could be found.`)
    ).toBeInTheDocument();
  });
});
