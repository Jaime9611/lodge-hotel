import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import Select from "./select.component";

describe("Select Component", {}, () => {
  it("renders passed options", () => {
    const testOptions = [
      { value: "id", label: "sort by id" },
      { value: "name", label: "sort by name" },
    ];

    render(
      <Select options={testOptions} onChange={() => undefined} register={{}} />
    );

    expect(screen.getByText(/sort by id/)).toBeInTheDocument();
    expect(screen.getByText(/sort by name/)).toBeInTheDocument();
  });
});
