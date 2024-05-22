import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { Home } from "../src/app/(user)/page";
describe("Page", () => {
  it("renders a heading", () => {
    render(<Home />);
  });
});
