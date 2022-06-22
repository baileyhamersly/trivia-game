//Importing Framework
import React from "react";
import { render, screen } from "@testing-library/react";
import UserEvent from "@testing-library/user-event";
import "@testing-library/jest-dom/extend-expect";
// Importing component
import Results from "./Results";

test("Button takes user to questions page", () => {
  render(<Results />);
  const questionsButton = screen.getByRole("button", {
    name: /Take Quiz/i,
    equals: false
  });
  UserEvent.click(questionsButton);
  expect(window.location.pathname === "/questions");
});
