import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";

import "../../../contexts";
import { AuthContext, type AuthContextState } from "../../../contexts";
import type { ReactNode } from "react";
import { MemoryRouter } from "react-router-dom";
import ProtectedRoute from "../protected-route.component";
import { ROLE } from "@utils/constants";

const renderWithAuth = (component: ReactNode, authValue: AuthContextState) => {
  return render(
    <AuthContext.Provider value={authValue}>{component}</AuthContext.Provider>
  );
};
const mockNavigate = vi.fn();

describe("Protected route Component for Manager", {}, () => {
  beforeEach(() => {
    renderWithAuth(
      <MemoryRouter>
        <ProtectedRoute matchRole={[ROLE.MANAGER, ROLE.STAFF]}>
          <div>
            <p>Access Granted</p>
          </div>
        </ProtectedRoute>
      </MemoryRouter>,
      {
        role: ROLE.MANAGER,
        isAuthenticated: true,
        setAuth: vi.fn(),
        user: "",
      }
    );
  });

  afterAll(() => vi.resetAllMocks());

  it("renders the text", () => {
    expect(screen.getByText("Access Granted")).toBeInTheDocument();
  });
});

describe("Protected route Component for Staff", {}, () => {
  beforeEach(() => {
    renderWithAuth(
      <MemoryRouter>
        <ProtectedRoute matchRole={[ROLE.STAFF, ROLE.STAFF]}>
          <div>
            <p>Access Granted</p>
          </div>
        </ProtectedRoute>
      </MemoryRouter>,
      {
        role: ROLE.STAFF,
        isAuthenticated: true,
        setAuth: vi.fn(),
        user: "",
      }
    );
  });

  afterAll(() => vi.resetAllMocks());

  it("renders the text", () => {
    expect(screen.getByText("Access Granted")).toBeInTheDocument();
  });
});

describe("Protected route Component Not Authenticated", {}, () => {
  beforeEach(() => {
    renderWithAuth(
      <MemoryRouter>
        <ProtectedRoute matchRole={[ROLE.STAFF, ROLE.STAFF]}>
          <div>
            <p>Access Granted</p>
          </div>
        </ProtectedRoute>
      </MemoryRouter>,
      {
        role: ROLE.STAFF,
        isAuthenticated: false,
        setAuth: vi.fn(),
        user: "",
      }
    );
  });

  afterAll(() => vi.resetAllMocks());

  it("renders the text", () => {
    expect(screen.queryByText("Access Granted")).not.toBeInTheDocument();
  });
});
