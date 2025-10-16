import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import Sidebar from "./sidebar.component";
import { MemoryRouter } from "react-router-dom";
import { ROLE, ROUTES } from "@utils/constants";
import { AuthContext, type AuthContextState } from "@contexts";
import type { ReactNode } from "react";

// Helper to render component with a specific auth context
const renderWithAuth = (component: ReactNode, authValue: AuthContextState) => {
  return render(
    <AuthContext.Provider value={authValue}>{component}</AuthContext.Provider>
  );
};

describe("Sidebar Component ", {}, () => {
  describe("Sidebar for Manager view", {}, () => {
    beforeEach(() => {
      renderWithAuth(
        <MemoryRouter>
          <Sidebar />
        </MemoryRouter>,
        {
          role: ROLE.MANAGER,
          isAuthenticated: true,
          setAuth: vi.fn(),
          user: "",
        }
      );
    });

    it("renders all links", () => {
      expect(screen.getAllByRole("link")).toHaveLength(4);
    });

    it.each([
      { name: "home", srcLink: ROUTES.dashboard_path },
      { name: "cabins", srcLink: ROUTES.cabins_path },
      { name: "bookings", srcLink: ROUTES.bookings_path },
      { name: "users", srcLink: ROUTES.users_path },
    ] as const)("renders $as link with route", ({ name, srcLink }) => {
      const linkBtn = screen.getByRole("link", {
        name: new RegExp(name, "i"),
      });

      expect(linkBtn).toBeInTheDocument();
      expect(linkBtn).toHaveProperty("href", `http://localhost:3000${srcLink}`);
    });
  });

  describe("Sidebar for Staff view", {}, () => {
    beforeEach(() => {
      renderWithAuth(
        <MemoryRouter>
          <Sidebar />
        </MemoryRouter>,
        {
          role: ROLE.STAFF,
          isAuthenticated: true,
          setAuth: vi.fn(),
          user: "",
        }
      );
    });

    it("renders all links", () => {
      expect(screen.getAllByRole("link")).toHaveLength(3);
    });

    it.each([
      { name: "home", srcLink: ROUTES.dashboard_path },
      { name: "cabins", srcLink: ROUTES.cabins_path },
      { name: "bookings", srcLink: ROUTES.bookings_path },
    ] as const)("renders $as variant", ({ name, srcLink }) => {
      const linkBtn = screen.getByRole("link", {
        name: new RegExp(name, "i"),
      });

      expect(linkBtn).toBeInTheDocument();
      expect(linkBtn).toHaveProperty("href", `http://localhost:3000${srcLink}`);
    });
  });
});
