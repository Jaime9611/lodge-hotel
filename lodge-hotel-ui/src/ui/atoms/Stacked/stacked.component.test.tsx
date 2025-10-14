import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import Stacked from "./stacked.component";

describe("Stacked Component", {}, () => {
  it("renders passed children", () => {
    const testMsg = "Test Children";

    render(
      <Stacked>
        <p>{`${testMsg} 1`}</p>
        <p>{`${testMsg} 2`}</p>
      </Stacked>
    );

    expect(screen.getByText(`${testMsg} 1`)).toBeInTheDocument();
    expect(screen.getByText(`${testMsg} 2`)).toBeInTheDocument();
    expect(screen.getAllByRole("paragraph")).toHaveLength(2);
  });
});
