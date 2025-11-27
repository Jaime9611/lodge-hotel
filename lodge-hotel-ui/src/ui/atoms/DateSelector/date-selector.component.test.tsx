import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import DateSelector from "./date-selector.component";
import { MOCK_SETTINGS_RESPONSE } from "@mocks/settings-handlers";
import { MOCK_CABINS } from "@mocks/cabin-handlers";

describe("DateSelector Component", {}, () => {
  it("renders subcomponents", () => {
    render(
      <DateSelector
        settings={MOCK_SETTINGS_RESPONSE}
        cabin={MOCK_CABINS.content[0]}
        bookedDates={[new Date()]}
      />
    );

    expect(screen.getByTestId("day-calendar-picker")).toBeInTheDocument();
  });
});
