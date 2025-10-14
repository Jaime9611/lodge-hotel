import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import Row from "./row.compoonent";

describe("Row Component", {}, () => {
  it("renders passed children", () => {
    const testMsg = "Test Children";

    render(
      <Row>
        <p>{`${testMsg} 1`}</p>
        <p>{`${testMsg} 2`}</p>
      </Row>
    );

    expect(screen.getByText(`${testMsg} 1`)).toBeInTheDocument();
    expect(screen.getByText(`${testMsg} 2`)).toBeInTheDocument();
    expect(screen.getAllByRole("paragraph")).toHaveLength(2);
  });
});
