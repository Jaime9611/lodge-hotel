import { describe, it, expect } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";
import Pagination from "./pagination.component";
import { PAGE_SIZE } from "@utils/constants";

const mockParams = vi.hoisted(() => {
  return {
    useSearchParams: vi.fn(),
  };
});
const mockSearchParam: { [key: string]: number } = { page: 1 };

vi.mock("react-router-dom", () => ({
  useSearchParams: mockParams.useSearchParams,
}));

describe("Pagination Component", {}, () => {
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

  it("does not render pagination buttons when count < PAGE_SIZE", () => {
    render(<Pagination count={PAGE_SIZE - 1} />);

    expect(
      screen.queryByRole("button", { name: "Previous" })
    ).not.toBeInTheDocument();
    expect(
      screen.queryByRole("button", { name: "Next" })
    ).not.toBeInTheDocument();
  });

  it("renders pagination buttons when count > PAGE_SIZE", () => {
    render(<Pagination count={PAGE_SIZE + 1} />);

    expect(
      screen.getByRole("button", { name: "Previous" })
    ).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Next" })).toBeInTheDocument();
  });
});

describe("Pagination Component Handle function", {}, () => {
  const mockSetParam = vi.fn();
  beforeAll(() => {
    mockParams.useSearchParams.mockReturnValue([
      { get: () => "", set: mockSetParam },
      mockSetParam,
    ]);
  });

  afterAll(() => {
    vi.clearAllMocks();
    vi.resetAllMocks();
  });

  it("calls set function when Next is clicked", () => {
    render(<Pagination count={PAGE_SIZE + 1} />);

    const nextBtn = screen.getByRole("button", { name: "Next" });

    fireEvent.click(nextBtn);

    expect(mockSetParam).toHaveBeenCalled();
    expect(mockSetParam.mock.calls[0][0]).toBe("page");
  });

  it("calls set function when Previous is clicked", () => {
    render(<Pagination count={PAGE_SIZE + 1} />);

    const prevBtn = screen.getByRole("button", { name: "Previous" });

    fireEvent.click(prevBtn);

    expect(mockSetParam).toHaveBeenCalled();
    expect(mockSetParam.mock.calls[0][0]).toBe("page");
  });
});
