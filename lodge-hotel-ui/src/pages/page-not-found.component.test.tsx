import { describe, it, expect } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";
import PageNotFound from "./page-not-found.component";

const mockHook = vi.hoisted(() => {
  return {
    useMoveBack: vi.fn(),
  };
});

vi.mock("../hooks", () => ({
  useMoveBack: mockHook.useMoveBack,
}));

describe("PageNotFound Component", {}, () => {
  const mockMoveBack = vi.fn();
  afterAll(() => {
    vi.clearAllMocks();
  });

  it("renders the Not Found Message", () => {
    const testMsg = /The page you are looking for could not be found/;

    render(<PageNotFound />);

    expect(screen.getByText(testMsg)).toBeInTheDocument();
  });

  it("calls the move back functionality", () => {
    mockHook.useMoveBack.mockReturnValue(mockMoveBack);
    render(<PageNotFound />);

    const btn = screen.getByRole("button", { name: /Go back/ });
    fireEvent.click(btn);

    expect(mockMoveBack).toHaveBeenCalled();
  });
});
