import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import Stack from "./stack.component";

describe("Stack Component", {}, () => {
  it("renders passed children", () => {
    const testMsg = "Test Children";

    render(
      <Stack columns="1fr 1fr">
        <p>{`${testMsg} 1`}</p>
        <p>{`${testMsg} 2`}</p>
      </Stack>
    );

    expect(screen.getByText(`${testMsg} 1`)).toBeInTheDocument();
    expect(screen.getByText(`${testMsg} 2`)).toBeInTheDocument();
    expect(screen.getAllByRole("paragraph")).toHaveLength(2);
  });
});
