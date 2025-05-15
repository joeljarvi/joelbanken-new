import { render, screen } from "@testing-library/react";
import React from "react";

function Hello() {
  return <div>Hello world!</div>;
}

test("renders hello", () => {
  render(<Hello />);
  expect(screen.getByText("Hello world!")).toBeInTheDocument();
});
