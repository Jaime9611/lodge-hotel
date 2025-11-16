import { describe, it, expect } from "vitest";
import {
  formatCurrency,
  formatDistanceFromNow,
  statusToTagName,
} from "./helpers";
import { formatDistance, parseISO } from "date-fns";

describe("Helper Functions", {}, () => {
  it("Test formatCurrency", () => {
    // Arrange
    const value = 300;

    // Act
    const result = formatCurrency(value);

    // Assert
    expect(result).toBe("$300.00");
  });

  it("Test formatDistanceFromNow", () => {
    // Arrange
    const value = "2023-11-16T10:30:00.123Z";

    // Act
    const result = formatDistanceFromNow("2023-11-16T10:30:00.123Z");

    // Assert
    const expected = formatDistance(parseISO(value), new Date(), {
      addSuffix: true,
    })
      .replace("about ", "")
      .replace("in", "In");

    expect(result).toBe(expected);
  });

  it("Test StatusTagName object", () => {
    // Arrange
    const value1 = "CHECKED_IN";
    const value2 = "CHECKED_OUT";
    const value3 = "UNCONFIRMED";

    // Act
    const result_ci = statusToTagName[value1];
    const result_co = statusToTagName[value2];
    const result_un = statusToTagName[value3];

    // Assert
    expect(result_ci).toBe("green");
    expect(result_co).toBe("silver");
    expect(result_un).toBe("blue");
  });
});
