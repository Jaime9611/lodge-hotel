import { describe, it, expect } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";
import LoginForm from "../login-form.component";

const mockTestFn = vi.fn();

describe("Login Component", {}, () => {
  beforeAll(() => {
    vi.mock("../use-login.hook", () => ({
      useLogin: () => ({ login: mockTestFn, isLoading: false }),
    }));
  });

  beforeEach(() => {
    render(<LoginForm />);
  });

  afterAll(() => vi.resetAllMocks());

  it("renders the login form", () => {
    expect(screen.getByLabelText("Username")).toBeInTheDocument();
    expect(screen.getByLabelText("Password")).toBeInTheDocument();
  });

  it("calls Login function when submit", () => {
    const username = screen.getByRole("textbox", { name: "Username" });
    const password = screen.getByLabelText("Password");
    const btn = screen.getByRole("button", { name: "Log in" });

    fireEvent.change(username, { target: { value: "test" } });
    fireEvent.change(password, { target: { value: "123" } });

    fireEvent.click(btn);

    expect(mockTestFn).toHaveBeenCalled();
    expect(mockTestFn.mock.calls[0][0]).toStrictEqual({
      username: "test",
      password: "123",
    });
  });
});
