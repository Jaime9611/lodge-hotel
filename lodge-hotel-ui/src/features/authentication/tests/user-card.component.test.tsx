import { describe, it, expect } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";
import UserCard from "../user-card.component";
import type { UserModel } from "@models";

const mockUser: UserModel = {
  email: "test@email",
  fullName: "Test name",
  id: 1,
  image: "http://test.jpg",
  password: "",
  phone: "123456",
  username: "testuser1",
};

describe("UserCard Component", {}, () => {
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

  it("renders passed user object", () => {
    render(
      <UserCard
        isDeleting={false}
        user={mockUser}
        key="my-key"
        onDelete={() => undefined}
      />
    );

    const img = screen.getByRole("img");
    const editBtn = screen.getByRole("button", { name: "Edit" });
    const deleteBtn = screen.getByRole("button", { name: "Delete" });

    expect(img).toBeInTheDocument();
    expect(editBtn).toBeInTheDocument();
    expect(deleteBtn).toBeInTheDocument();
    expect(screen.getByText(mockUser.fullName)).toBeInTheDocument();
    expect(screen.getByText(mockUser.email)).toBeInTheDocument();
    expect(screen.getByText(mockUser.phone)).toBeInTheDocument();
  });

  it("Opens User Form when Edit button is clicked", () => {
    render(
      <UserCard
        isDeleting={false}
        user={mockUser}
        key="my-key"
        onDelete={() => undefined}
      />
    );

    const editBtn = screen.getByRole("button", { name: "Edit" });
    fireEvent.click(editBtn);

    expect(screen.getByLabelText("Full Name")).toBeInTheDocument();
    expect(screen.getByLabelText("Email")).toBeInTheDocument();
    expect(screen.getByLabelText("Phone Number")).toBeInTheDocument();
    expect(screen.getByLabelText("Password")).toBeInTheDocument();
  });

  it("Opens Confirm Delete when Delete button is clicked", () => {
    render(
      <UserCard
        isDeleting={false}
        user={mockUser}
        key="my-key"
        onDelete={() => undefined}
      />
    );

    const deleteBtn = screen.getByRole("button", { name: "Delete" });
    fireEvent.click(deleteBtn);

    expect(
      screen.getByText(/Are you sure you want to delete this user/)
    ).toBeInTheDocument();
  });
});
