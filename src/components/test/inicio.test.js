import React from "react";
import { render } from "@testing-library/react";
import "@testing-library/jest-dom";
import Table from "../inicio/Table";

test("renders Content header", () => {
  const component = render(<Table />);

  component.getAllByTitle("Crypto Tracker");
});
