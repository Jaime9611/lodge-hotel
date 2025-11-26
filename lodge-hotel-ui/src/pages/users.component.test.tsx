import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Users from "./users.component";

vi.mock("../features/authentication/use-employees.hook", () => ({
  useEmployees: () => ({ isPending: false, users: [] }),
}));
vi.mock("../features/authentication/use-delete-employee.hook", () => ({
  useDeleteEmployee: () => ({ isDeleting: false, deleteEmployee: vi.fn() }),
}));

describe("Users Page", {}, () => {
  afterAll(() => vi.clearAllMocks());

  it("renders the Users page", () => {
    render(
      <MemoryRouter>
        <Users />
      </MemoryRouter>
    );

    expect(screen.getByText("Users")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /Add new employee/i }));
  });
});
