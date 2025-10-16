import { vi } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";
import Filter from "./filter.component";

const mockSearchParams = vi.fn();
const mockSetSearchParams = vi.fn();

describe("Filter component", () => {
  const filterOptions = [
    { value: "7", label: "Last 7 days" },
    { value: "30", label: "Last 30 days" },
    { value: "90", label: "Last 90 days" },
  ];

  beforeEach(() => {
    // Mock the useSearchParams hook from react-router-dom
    vi.mock("react-router-dom", async (importActual) => {
      const actual = await importActual();
      return {
        ...(actual as Object),
        useSearchParams: () => [
          new URLSearchParams(mockSearchParams()),
          mockSetSearchParams,
        ],
      };
    });
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("should display search param value", () => {
    mockSearchParams.mockReturnValue("");

    render(<Filter filterField="last" options={filterOptions} />);

    expect(screen.getByText(filterOptions[0].label)).toBeInTheDocument();
    expect(screen.getByText(filterOptions[1].label)).toBeInTheDocument();
    expect(screen.getByText(filterOptions[2].label)).toBeInTheDocument();
  });

  it("should first option should be active on first render", async () => {
    mockSearchParams.mockReturnValue("");

    render(<Filter filterField="last" options={filterOptions} />);
    const button1 = screen.getByRole("button", {
      name: filterOptions[0].label,
    });
    const button2 = screen.getByRole("button", {
      name: filterOptions[1].label,
    });
    const button3 = screen.getByRole("button", {
      name: filterOptions[2].label,
    });

    expect(mockSetSearchParams).not.toHaveBeenCalled();
    expect(button1).toHaveClass(/active/i);
    expect(button2).not.toHaveClass(/active/i);
    expect(button3).not.toHaveClass(/active/i);
  });

  it("should call setSearchParams when button is clicked", async () => {
    mockSearchParams.mockReturnValue("");

    render(<Filter filterField="last" options={filterOptions} />);
    const button = screen.getByRole("button", { name: filterOptions[1].label });

    await fireEvent.click(button);

    expect(button).toBeInTheDocument();
    expect(mockSetSearchParams).toHaveBeenCalled();
  });
});
