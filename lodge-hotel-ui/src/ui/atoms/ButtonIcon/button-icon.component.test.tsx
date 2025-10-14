import { describe, it, expect } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import ButtonIcon from "./button-icon.component";

describe("ButtonIcon Component", {}, () => {
  it("renders passed text", () => {
    const testText = "Test ButtonIcon";

    render(<ButtonIcon onClick={() => undefined}>{testText}</ButtonIcon>);

    const btn = screen.getByRole("button");

    expect(btn).toBeInTheDocument();
    expect(screen.getByText(testText)).toBeInTheDocument();
  });

  it("is clickable when not disabled", () => {
    const handleClick = vi.fn();
    render(<ButtonIcon onClick={handleClick}>Test</ButtonIcon>);

    const btn = screen.getByRole("button");
    fireEvent.click(btn);

    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it("is NOT clickable when disabled", () => {
    const handleClick = vi.fn();
    render(
      <ButtonIcon disabled onClick={handleClick}>
        Test
      </ButtonIcon>
    );

    const btn = screen.getByRole("button");
    fireEvent.click(btn);

    expect(handleClick).not.toHaveBeenCalled();
    expect(btn).toBeDisabled();
  });
});
