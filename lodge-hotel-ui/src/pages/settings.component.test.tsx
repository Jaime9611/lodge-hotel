import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import Settings from "./settings.component";
import { MemoryRouter } from "react-router-dom";

vi.mock("../features/settings/use-settings.hook", () => ({
  useSettings: () => ({ isLoading: false, settings: {} }),
}));
vi.mock("../features/settings/use-update-settings.hook", () => ({
  useUpdateSetting: () => ({ isUpdating: false, updateSettings: vi.fn() }),
}));
describe("Settings Component", {}, () => {
  afterAll(() => vi.clearAllMocks());

  it("renders the Settings page", () => {
    render(
      <MemoryRouter>
        <Settings />
      </MemoryRouter>
    );

    expect(screen.getByText("Settings")).toBeInTheDocument();
    expect(screen.getByLabelText(/Minimum nights/)).toBeInTheDocument();
    expect(screen.getByLabelText(/Maximum nights/)).toBeInTheDocument();
    expect(screen.getByLabelText(/Select new logo/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /cancel/i })).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /update settings/i })
    ).toBeInTheDocument();
  });
});
