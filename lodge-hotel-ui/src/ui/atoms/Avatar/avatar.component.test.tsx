import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import Avatar from "./avatar.component";

describe("Avatar Component", {}, () => {
  it("renders passed src and alt values", () => {
    const url = "http://test/image.png";
    const altText = "Test Image";

    render(<Avatar src={url} alt={altText} />);

    const img = screen.getByRole("img");

    expect(img).toBeInTheDocument();
    expect(img).toHaveAttribute("src", url);
    expect(img).toHaveAttribute("alt", altText);
  });
});
