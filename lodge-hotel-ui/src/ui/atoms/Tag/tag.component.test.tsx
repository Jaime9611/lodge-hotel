import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import Tag from "./tag.component";

describe("Tag Component", {}, () => {
  it("renders passed children", () => {
    const testMsg = "Test Children";

    render(<Tag type="blue">{testMsg}</Tag>);

    expect(screen.getByText(testMsg)).toBeInTheDocument();
  });
});
