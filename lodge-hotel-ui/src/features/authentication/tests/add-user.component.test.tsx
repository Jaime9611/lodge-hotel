import { describe, it, expect } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";
import AddUser from "../add-user.component";

const mockTestFn = vi.fn();

describe("Add user Component", {}, () => {
  beforeAll(() => {
    vi.mock("../use-create-employee.hook", () => ({
      useCreateEmployee: () => ({ isCreating: false, createEmployee: vi.fn() }),
    }));
    vi.mock("../use-edit-employee.hook", () => ({
      useEditEmployee: () => ({ isEditing: false, editEmployee: vi.fn() }),
    }));
    vi.mock;
  });

  afterAll(() => vi.resetAllMocks());

  beforeEach(() => {
    render(<AddUser />);
  });

  afterAll(() => vi.resetAllMocks());

  it("renders the logout button", () => {
    expect(
      screen.getByRole("button", { name: "Add new employee" })
    ).toBeInTheDocument();
  });

  it("opens user form when clicked", () => {
    const btn = screen.getByRole("button");

    fireEvent.click(btn);

    expect(screen.getByLabelText("Full Name")).toBeInTheDocument();
    expect(screen.getByLabelText("Email")).toBeInTheDocument();
    expect(screen.getByLabelText("Phone Number")).toBeInTheDocument();
    expect(screen.getByLabelText("Password")).toBeInTheDocument();
  });
});
