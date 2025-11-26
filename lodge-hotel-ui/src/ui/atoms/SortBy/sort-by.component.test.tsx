import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import SortBy from "./sort-by.component";

const mockParams = vi.hoisted(() => {
  return {
    useSearchParams: vi.fn(),
  };
});
const mockSearchParam: { [key: string]: string } = { sortBy: "id" };

vi.mock("react-router-dom", () => ({
  useSearchParams: mockParams.useSearchParams,
}));

describe("Sortby Component", {}, () => {
  beforeAll(() => {
    mockParams.useSearchParams.mockReturnValue([
      { get: (id: string) => mockSearchParam[id] },
      vi.fn,
    ]);
  });

  afterAll(() => {
    vi.clearAllMocks();
    vi.resetAllMocks();
  });

  it("renders passed options", () => {
    const testOptions = [
      { value: "id", label: "sort by id" },
      { value: "name", label: "sort by name" },
    ];

    render(<SortBy options={testOptions} />);

    expect(screen.getByText(/sort by id/)).toBeInTheDocument();
    expect(screen.getByText(/sort by name/)).toBeInTheDocument();
  });
});

describe("Sortby Component empty param", {}, () => {
  beforeAll(() => {
    mockParams.useSearchParams.mockReturnValue([{ get: () => "" }, vi.fn]);
  });

  afterAll(() => {
    vi.clearAllMocks();
    vi.resetAllMocks();
  });

  it("renders passed options", () => {
    const testOptions = [
      { value: "id", label: "sort by id" },
      { value: "name", label: "sort by name" },
    ];

    render(<SortBy options={testOptions} />);

    expect(screen.getByText(/sort by id/)).toBeInTheDocument();
    expect(screen.getByText(/sort by name/)).toBeInTheDocument();
  });
});
