import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import CabinTable from "../cabin-table.component";
import { MOCK_CABINS } from "@mocks/cabin-handlers";

describe("CabinTable Component", {}, () => {
  beforeAll(() => {
    vi.mock("../use-cabins.hook", () => ({
      useCabins: () => ({
        cabins: MOCK_CABINS.content,
        isLoading: false,
      }),
    }));
    vi.mock("../use-delete-cabin.hook", () => ({
      useDeleteCabin: () => ({
        deleteCabin: vi.fn(),
        isLoading: false,
      }),
    }));
  });

  afterAll(() => {
    vi.clearAllMocks();
  });

  it("renders the cabin table", () => {
    render(
      <MemoryRouter>
        <CabinTable />
      </MemoryRouter>
    );

    expect(screen.getByText("Name")).toBeInTheDocument();
    expect(screen.getByText("Capacity")).toBeInTheDocument();
    expect(screen.getByText("Price")).toBeInTheDocument();
    expect(screen.getByText("Discount")).toBeInTheDocument();
    expect(screen.getByText(/cabin test/i)).toBeInTheDocument();
    expect(screen.getByText(/See Details/i)).toBeInTheDocument();
  });
});
