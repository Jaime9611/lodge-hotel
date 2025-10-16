import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import FileInput from "./file-input.component";

describe("FileInput Component", {}, () => {
  it("renders the file input with id and type", () => {
    render(<FileInput id="my-input" accept="image/*" />);

    const fileInput = screen.getByTestId("file-input");

    expect(fileInput).toBeInTheDocument();
    expect(fileInput).toHaveAttribute("id", "my-input");
    expect(fileInput).toHaveAttribute("type", "file");
  });
});
