import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import Cabins from "./cabins.page";
import { MemoryRouter } from "react-router-dom";
import { MOCK_CABINS } from "@mocks/cabin-handlers";

const mockHook = vi.hoisted(() => {
  return {
    useCabinsByCapacity: vi.fn(),
  };
});

vi.mock("../../features/cabins/use-cabins-capacity.hook", () => ({
  useCabinsByCapacity: mockHook.useCabinsByCapacity,
}));

describe("CountrySelector Component", {}, () => {
  it("renders the selector", () => {
    mockHook.useCabinsByCapacity.mockReturnValue({
      isLoading: false,
      cabins: [],
    });

    render(
      <MemoryRouter>
        <Cabins />
      </MemoryRouter>
    );

    expect(screen.getByText("Our Cabins")).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /all cabins/i })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /2-3 guests/i })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /4-6 guests/i })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /7-8 guests/i })
    ).toBeInTheDocument();
  });

  it("renders the cabins", () => {
    mockHook.useCabinsByCapacity.mockReturnValue({
      isLoading: false,
      cabins: MOCK_CABINS.content,
    });

    render(
      <MemoryRouter>
        <Cabins />
      </MemoryRouter>
    );

    expect(screen.getByText("Our Cabins")).toBeInTheDocument();
    expect(
      screen.getByRole("link", { name: /Details & reservation/i })
    ).toBeInTheDocument();
  });
});
