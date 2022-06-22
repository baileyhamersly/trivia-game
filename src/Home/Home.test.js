//Importing Framework
import React from "react";
import { render, screen } from "@testing-library/react";
import UserEvent from "@testing-library/user-event";
import "@testing-library/jest-dom/extend-expect";
// Importing component
import Home from "./Home";

test("Button appears with correct text", () => {
  render(<Home />);
  const button = screen.getByRole("button", { name: /Let's Start!/i });
  expect(button.length > 0);
});

test("Button takes user to questions page", () => {
  render(<Home />);
  const button = screen.getByRole("button", { name: /Let's Start!/i });
  UserEvent.click(button);
  expect(window.location.pathname === "/questions");
});
