import { expect, test } from "vitest";
import { screen, render } from "@testing-library/react";
import App from "./app.component";

test("renders name", async () => {
  render(<App />);
});
