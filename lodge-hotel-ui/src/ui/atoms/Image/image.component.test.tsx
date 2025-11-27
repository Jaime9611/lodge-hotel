import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import Image from "./image.component";

describe("Image Component", {}, () => {
  it("renders passed src and alt values for cabin", () => {
    const url = "default-cabin.jpg";
    const altText = "Test Image";

    render(<Image className="" src={url} alt={altText} type="cabin" />);

    const img = screen.getByRole("img");

    expect(img).toBeInTheDocument();
    expect(img).toHaveAttribute("src", url);
    expect(img).toHaveAttribute("alt", altText);
  });
  it("renders passed src and alt values for user", () => {
    const url = "default-user.jpg";
    const altText = "Test Image";

    render(<Image className="" src={url} alt={altText} type="user" />);

    const img = screen.getByRole("img");

    expect(img).toBeInTheDocument();
    expect(img).toHaveAttribute("src", url);
    expect(img).toHaveAttribute("alt", altText);
  });

  it("renders default when no src", () => {
    const url = "default-user.jpg";
    const altText = "Test Image";

    render(<Image className="" src="" alt={altText} type="user" />);

    const img = screen.getByRole("img");

    expect(img).toBeInTheDocument();
    expect(img).toHaveAttribute("src", url);
    expect(img).toHaveAttribute("alt", altText);
  });
});
