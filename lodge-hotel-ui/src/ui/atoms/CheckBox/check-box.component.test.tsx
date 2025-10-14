import { describe, it, expect } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";
import CheckBox from "./check-box.component";
import { useState, type ReactNode } from "react";

describe("CheckBox Component", {}, () => {
  it("renders passed title", () => {
    render(
      <CheckBox id="" checked={false} onChange={() => undefined}>
        Test Header
      </CheckBox>
    );

    expect(screen.getByText("Test Header")).toBeInTheDocument();
    expect(screen.getByRole("checkbox")).toBeInTheDocument();
  });

  describe("Verify click event", {}, () => {
    beforeEach(() => {
      const Wrapper = () => {
        const [isChecked, setIsChecked] = useState(false);

        return (
          <CheckBox
            id=""
            checked={isChecked}
            onChange={() => setIsChecked((checked) => !checked)}
            disabled={isChecked}
          >
            Test Header
          </CheckBox>
        );
      };
      render(<Wrapper />);
    });

    it("checked=false value when first render", () => {
      const inputCheckBox = screen.getByRole("checkbox");

      expect(inputCheckBox).not.toBeChecked();
    });

    it("checked=true value when clicked", () => {
      const inputCheckBox = screen.getByRole("checkbox");
      fireEvent.click(inputCheckBox);

      expect(inputCheckBox).toBeChecked();
    });

    it("checkbox is disable, checked doesnt change", () => {
      const inputCheckBox = screen.getByRole("checkbox");
      fireEvent.click(inputCheckBox);

      expect(inputCheckBox).toBeDisabled();
    });
  });
});
