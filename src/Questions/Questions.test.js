//Importing Framework
import React from "react";
import { render, screen } from "@testing-library/react";
import UserEvent from "@testing-library/user-event";
import "@testing-library/jest-dom/extend-expect";
// Importing component
import Questions from "./Questions";

test("Question header renders correct text", () => {
  render(<Questions />);
  const questionsPage = <Questions />;
  const currentQuestion = questionsPage.currentQuestion;
  const totalQuestions = questionsPage.totalQuestions;
  const questionHeader = screen.getByText(/Question\s\d\sof\s\d/i);
  expect(
    questionHeader ===
      "Question " + { currentQuestion } + " of " + { totalQuestions }
  );
});

test("Submitting correct answer increases score", () => {
  render(<Questions />);
  const previousScore = screen.getByText(/Score\s:\s\d/i).innerHTML;
  const expectedScore = Number(previousScore[8]) + 1;
  const submitButton = screen.getByRole("button", { name: /Submit/i });
  UserEvent.click(screen.getByTestId("correct-answer"));
  UserEvent.click(submitButton);
  expect(screen.getByText(/Score\s:\s\d/i).innerHTML).toEqual(
    "Score : " + expectedScore
  );
});

test("Submitting wrong answer does not increase score", () => {
  render(<Questions />);
  let previousScore = screen.getByText(/Score\s:\s\d/i).innerHTML;
  previousScore = previousScore[8];
  const submitButton = screen.getByRole("button", { name: /Submit/i });
  let wrongAnswer = screen.getAllByTestId("wrong-answer");
  wrongAnswer = wrongAnswer[0];
  UserEvent.click(wrongAnswer);
  UserEvent.click(submitButton);
  expect(screen.getByText(/Score\s:\s\d/i).innerHTML).toEqual(
    "Score : " + previousScore
  );
});

test("Clicking correct answer renders appropriate result text", () => {
  render(<Questions />);
  const submitButton = screen.getByRole("button", { name: /Submit/i });
  UserEvent.click(screen.getByTestId("correct-answer"));
  UserEvent.click(submitButton);
  let resultsText = screen.getByTestId("results-text").innerHTML;
  expect(resultsText).toContain("You got it right! 🥳");
});

test("Clicking wrong answer renders appropriate result text", () => {
  render(<Questions />);
  const submitButton = screen.getByRole("button", { name: /Submit/i });
  let wrongAnswer = screen.getAllByTestId("wrong-answer");
  wrongAnswer = wrongAnswer[0];
  UserEvent.click(wrongAnswer);
  UserEvent.click(submitButton);
  expect(screen.getByTestId("results-text").innerHTML).toContain(
    "That's incorrect 😔"
  );
});
