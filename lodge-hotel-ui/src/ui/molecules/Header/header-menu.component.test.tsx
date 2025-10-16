import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import HeaderMenu from "./header-menu.component";

describe("HeaderMenu Component", {}, () => {
  it("renders passed title", () => {
    render(
      <HeaderMenu>
        <span>Test text 1</span>
        <span>Test text 2</span>
        <span>Test text 3</span>
      </HeaderMenu>
    );

    expect(screen.getByText("Test text 1")).toBeInTheDocument();
    expect(screen.getByText("Test text 2")).toBeInTheDocument();
    expect(screen.getByText("Test text 3")).toBeInTheDocument();
  });
});
