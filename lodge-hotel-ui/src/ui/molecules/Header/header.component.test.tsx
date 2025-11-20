import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import Header from "./header.component";
import { MemoryRouter } from "react-router-dom";

describe("Header Component", {}, () => {
  beforeAll(() => {
    vi.mock("../../../features/authentication/use-user.hook", () => ({
      useUser: () => ({ user: {}, isLoading: false }),
    }));
  });

  afterAll(() => {
    vi.clearAllMocks();
  });

  it("renders passed title", () => {
    render(
      <MemoryRouter>
        <Header />
      </MemoryRouter>
    );

    expect(screen.getAllByRole("button")).toHaveLength(2);
  });
});
