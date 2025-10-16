import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import Header from "./header.component";
import { MemoryRouter } from "react-router-dom";

describe("Header Component", {}, () => {
  it("renders passed title", () => {
    render(
      <MemoryRouter>
        <Header />
      </MemoryRouter>
    );

    expect(screen.getAllByRole("button")).toHaveLength(2);
  });
});
