import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import type { UserModel } from "@models";
import UserGrid from "../user-grid.component";

const mockUsers: UserModel[] = [
  {
    email: "test-user1@email",
    fullName: "Test user1 name",
    id: 1,
    image: "http://test.jpg",
    password: "",
    phone: "123456",
    username: "testuser1",
  },
  {
    email: "test-user2@email",
    fullName: "Test user2 name",
    id: 1,
    image: "http://test.jpg",
    password: "",
    phone: "123456",
    username: "testuser2",
  },
];

const mockUsersHook = vi.hoisted(() => {
  return {
    useEmployee: vi.fn(),
  };
});
vi.mock("../use-employees.hook", () => ({
  useEmployees: mockUsersHook.useEmployee,
}));
vi.mock("../use-delete-employee.hook", () => ({
  useDeleteEmployee: () => ({ isDeleting: false, deleteEmployee: vi.fn() }),
}));

describe("UserGrid Component no content", {}, () => {
  afterAll(() => {
    vi.clearAllMocks();
    vi.resetAllMocks();
  });

  it("renders passed Empty resource", () => {
    mockUsersHook.useEmployee.mockReturnValueOnce({
      isPending: false,
      users: [],
    });
    render(<UserGrid />);

    expect(
      screen.getByText("No employees could be found.")
    ).toBeInTheDocument();
  });

  it("renders spinner", () => {
    mockUsersHook.useEmployee.mockReturnValueOnce({
      isPending: true,
      users: [],
    });
    render(<UserGrid />);

    expect(screen.getByTestId("spinner-component")).toBeInTheDocument();
  });
});

describe("UserGrid Component", {}, () => {
  afterAll(() => {
    vi.clearAllMocks();
    vi.resetAllMocks();
  });

  it("renders passed user list", () => {
    mockUsersHook.useEmployee.mockReturnValueOnce({
      isPending: false,
      users: mockUsers,
    });
    render(<UserGrid />);

    expect(screen.getByText(mockUsers[0].fullName)).toBeInTheDocument();
    expect(screen.getByText(mockUsers[0].email)).toBeInTheDocument();
    expect(screen.getByText(mockUsers[0].username)).toBeInTheDocument();
    expect(screen.getByText(mockUsers[1].fullName)).toBeInTheDocument();
    expect(screen.getByText(mockUsers[1].email)).toBeInTheDocument();
    expect(screen.getByText(mockUsers[1].username)).toBeInTheDocument();
  });
});
