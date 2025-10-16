import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import TextArea from "./text-area.component";

describe("TextArea Component", {}, () => {
  it("renders TextArea of file type", () => {
    render(<TextArea id="my-text-area" />);

    const texAreaInput = screen.getByRole("textbox");

    expect(texAreaInput).toBeInTheDocument();
    expect(texAreaInput).toHaveAttribute("id", "my-text-area");
  });
});
