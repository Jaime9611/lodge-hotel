import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import AvatarMini from "./avatar-mini.component";

describe("Avatar Mini Component", {}, () => {
  it("renders passed src and alt values", () => {
    const url = "http://test/image.png";
    const altText = "Test Image";

    render(<AvatarMini src={url} alt={altText} />);

    const img = screen.getByRole("img");

    expect(img).toBeInTheDocument();
    expect(img).toHaveAttribute("src", url);
    expect(img).toHaveAttribute("alt", altText);
  });
});
