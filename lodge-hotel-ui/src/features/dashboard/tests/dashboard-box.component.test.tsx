import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import DashboardBox from "../dashboard-box.component";

describe("DashboardBox Component", {}, () => {
  beforeAll(() => {
    render(
      <DashboardBox>
        <div>Children Component</div>
      </DashboardBox>
    );
  });

  it("renders the dashboardbox", () => {
    expect(screen.getByTestId("dashboard-box")).toBeInTheDocument();
  });
});
