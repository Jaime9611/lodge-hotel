import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Cabins from "./cabins.component";

vi.mock("../features/cabins/use-cabins.hook", () => ({
  useCabins: () => ({ isLoading: false, cabins: [] }),
}));

describe("Cabins Page", {}, () => {
  afterAll(() => vi.clearAllMocks());

  it("renders the Cabins page", () => {
    render(
      <MemoryRouter>
        <Cabins />
      </MemoryRouter>
    );

    expect(screen.getByText("Cabins")).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /Add new cabin/ })
    ).toBeInTheDocument();
    expect(screen.getByText("Sort by Name (ASC)")).toBeInTheDocument();
    expect(screen.getByText("Sort by Price (ASC)")).toBeInTheDocument();
    expect(screen.getByText("Sort by Capacity (ASC)")).toBeInTheDocument();
  });

  it("renders the No Cabins", () => {
    render(
      <MemoryRouter>
        <Cabins />
      </MemoryRouter>
    );

    expect(screen.getByText("Cabins")).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /Add new cabin/ })
    ).toBeInTheDocument();
    expect(screen.getByText("No cabins could be found.")).toBeInTheDocument();
  });
});
