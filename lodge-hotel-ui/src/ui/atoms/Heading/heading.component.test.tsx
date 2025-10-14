import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import Heading from "./heading.component";

describe("Heading Component", {}, () => {
  it("renders passed title", () => {
    render(<Heading as="h1">Test Header</Heading>);

    expect(screen.getByText("Test Header")).toBeInTheDocument();
  });

  it.each([
    { as: "h1", expectedLevel: 1 },
    { as: "h2", expectedLevel: 2 },
    { as: "h3", expectedLevel: 3 },
    { as: "h4", expectedLevel: 4 },
  ] as const)("renders $as variant", ({ as, expectedLevel }) => {
    render(<Heading as={as}>Test Header</Heading>);

    expect(
      screen.getByRole("heading", { level: expectedLevel })
    ).toBeInTheDocument();
  });
});
