import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import Input from "./input.component";

describe("Input Component", {}, () => {
  it("renders input of text type", () => {
    render(<Input id="my-input" type="text" />);

    const input = screen.getByRole("textbox");

    expect(input).toBeInTheDocument();
    expect(input).toHaveAttribute("id", "my-input");
  });

  it("renders input of checkbox type", () => {
    render(<Input type="checkbox" />);

    const input = screen.getByRole("checkbox");

    expect(input).toBeInTheDocument();
  });

  it("renders a disabled input if disabled=true", () => {
    render(<Input type="text" disabled={true} />);

    const input = screen.getByRole("textbox");

    expect(input).toBeDisabled();
  });
});
