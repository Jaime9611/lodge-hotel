import { describe, it, expect } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";
import IconStackMenu from "./icon-stack.component";

describe("IconStack Component", {}, () => {
  it("renders passed values", () => {
    render(
      <IconStackMenu>
        <IconStackMenu.List>
          <IconStackMenu.Button
            icon={<span>icon</span>}
            displayText="My Button"
          />
        </IconStackMenu.List>
      </IconStackMenu>
    );

    const btn = screen.getByText(/my button/i);

    expect(btn).toBeInTheDocument();
    expect(screen.getByText("icon")).toBeInTheDocument();
  });

  it("adds the handler to the button", () => {
    const mockFn = vi.fn();

    render(
      <IconStackMenu>
        <IconStackMenu.List>
          <IconStackMenu.Button
            icon={<span>icon</span>}
            displayText="My Button"
            onClick={mockFn}
          />
        </IconStackMenu.List>
      </IconStackMenu>
    );

    const btn = screen.getByRole("button");
    fireEvent.click(btn);

    expect(mockFn).toHaveBeenCalledOnce();
  });
});
