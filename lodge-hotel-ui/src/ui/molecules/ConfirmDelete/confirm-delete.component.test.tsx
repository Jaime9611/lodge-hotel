import { describe, it, expect } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";
import ConfirmDelete from "./confirm-delete.component";

describe("ConfirmDelete Component", {}, () => {
  const mockOnConfirm = vi.fn();
  const mockOnCloseModal = vi.fn();

  afterEach(() => {
    vi.resetAllMocks();
  });

  it("renders ConfirmDelete with passed resource resource", () => {
    render(
      <ConfirmDelete
        resourceName="test-item"
        onConfirm={() => mockOnConfirm()}
        disabled={false}
      />
    );

    const confirmDelete = screen.getByText(
      `Are you sure you want to delete this test-item permanently? This action cannot be undone.`
    );

    expect(confirmDelete).toBeInTheDocument();
  });

  it("calls OnConfirm function when Delete button is clicked.", async () => {
    render(
      <ConfirmDelete
        resourceName="test-item"
        onConfirm={mockOnConfirm}
        disabled={false}
      />
    );

    const confirmButton = screen.getByRole("button", { name: /delete/i });

    await fireEvent.click(confirmButton);

    expect(mockOnConfirm).toHaveBeenCalled();
  });

  it("Delete button doesnt work when disable option is true.", async () => {
    render(
      <ConfirmDelete
        resourceName="test-item"
        onConfirm={mockOnConfirm}
        disabled={true}
      />
    );

    const confirmButton = screen.getByRole("button", { name: /delete/i });

    await fireEvent.click(confirmButton);

    expect(mockOnConfirm).not.toHaveBeenCalled();
  });

  it("calls OnCloseModal function when Cancel button is clicked.", async () => {
    render(
      <ConfirmDelete
        resourceName="test-item"
        onConfirm={mockOnConfirm}
        onCloseModal={mockOnCloseModal}
        disabled={false}
      />
    );

    const cancelButton = screen.getByRole("button", { name: /cancel/i });

    await fireEvent.click(cancelButton);

    expect(mockOnCloseModal).toHaveBeenCalled();
  });
});
