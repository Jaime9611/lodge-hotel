import { describe, it, expect } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import Button from "./button.component";

describe("Button Component", {}, () => {
  it("renders passed text", () => {
    const testText = "Test Button";

    render(<Button>{testText}</Button>);

    const btn = screen.getByRole("button");

    expect(btn).toBeInTheDocument();
    expect(screen.getByText(testText)).toBeInTheDocument();
  });

  it("is clickable when not disabled", () => {
    const handleClick = vi.fn();
    render(<Button onClick={handleClick}>Test</Button>);

    const btn = screen.getByRole("button");
    fireEvent.click(btn);

    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it("is NOT clickable when disabled", () => {
    const handleClick = vi.fn();
    render(
      <Button disabled onClick={handleClick}>
        Test
      </Button>
    );

    const btn = screen.getByRole("button");
    fireEvent.click(btn);

    expect(handleClick).not.toHaveBeenCalled();
    expect(btn).toBeDisabled();
  });
});
