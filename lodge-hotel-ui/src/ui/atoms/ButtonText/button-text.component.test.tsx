import { describe, it, expect } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import ButtonText from "./button-text.component";

describe("ButtonText Component", {}, () => {
  it("renders passed text", () => {
    const testText = "Test ButtonText";

    render(<ButtonText onClick={() => undefined}>{testText}</ButtonText>);

    const btn = screen.getByRole("button");

    expect(btn).toBeInTheDocument();
    expect(screen.getByText(testText)).toBeInTheDocument();
  });

  it("is clickable and correctly calls the passed function", () => {
    const handleClick = vi.fn();
    render(<ButtonText onClick={handleClick}>Test</ButtonText>);

    const btn = screen.getByRole("button");
    fireEvent.click(btn);

    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});
