import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import DataItem from "./data-item.component";

describe("DataItem Component", {}, () => {
  it("renders passed label", () => {
    const testLabel = "Test label";

    render(
      <DataItem label={testLabel} icon={<span>Icon</span>}>
        <span>Text 1</span>
        <span>Text 2</span>
      </DataItem>
    );

    expect(screen.getByText(testLabel)).toBeInTheDocument();
    expect(screen.getByText("Icon")).toBeInTheDocument();
    expect(screen.getByText("Text 1")).toBeInTheDocument();
    expect(screen.getByText("Text 2")).toBeInTheDocument();
  });
});
