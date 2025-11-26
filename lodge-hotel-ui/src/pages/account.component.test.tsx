import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Account from "./account.component";

vi.mock("../features/authentication/use-user.hook", () => ({
  useUser: () => ({ isPending: false, user: {} }),
}));
vi.mock("../features/authentication/use-create-employee.hook", () => ({
  useCreateEmployee: () => ({ isPending: false, createEmployee: vi.fn() }),
}));
vi.mock("../features/authentication/use-edit-employee.hook", () => ({
  useEditEmployee: () => ({ isPending: false, updateEmployee: vi.fn() }),
}));

describe("Account Page", {}, () => {
  afterAll(() => vi.clearAllMocks());

  it("renders the Account page", () => {
    render(
      <MemoryRouter>
        <Account />
      </MemoryRouter>
    );

    expect(screen.getByText(/Update your account/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/full name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/phone number/i)).toBeInTheDocument();
  });
});
