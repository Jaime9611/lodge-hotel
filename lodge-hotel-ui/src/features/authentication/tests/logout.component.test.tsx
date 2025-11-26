import { describe, it, expect } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";
import Logout from "../logout.component";

const mockTestFn = vi.fn();

describe("Logout Component", {}, () => {
  beforeAll(() => {
    vi.mock("../use-logout.hook", () => ({
      useLogout: () => ({ logout: mockTestFn, isLoading: false }),
    }));
  });

  beforeEach(() => {
    render(<Logout />);
  });

  afterAll(() => vi.resetAllMocks());

  it("renders the logout button", () => {
    expect(screen.getByRole("button")).toBeInTheDocument();
  });

  it("calls Logout function when clicked", () => {
    const btn = screen.getByRole("button");

    fireEvent.click(btn);

    expect(mockTestFn).toHaveBeenCalled();
  });
});
