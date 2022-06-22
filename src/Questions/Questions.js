import { useEffect, useState } from "react";

const Questions = () => {
  const totalQuestions = 5;
  const [currentQuestion, setQuestion] = useState(0);
  const [latestScore, setScore] = useState(0);
  const [answerFlag, setAnswerFlag] = useState(false);
  const [answerCorrect, setAnswerCorrect] = useState(false);
  const correctText = "You got it right! 🥳";
  const wrongText = "That's incorrect 😔";

  localStorage.setItem("totalQuestions", totalQuestions);

  // Data to be passed in for the questions - this could also be served through an api and fetched dynamically
  const questionData = [
    {
      question:
        "If you have 10 mangos and another person gives you 12 more, how‌ ‌many‌ ‌mangos‌ ‌will‌ ‌you‌ ‌have‌ ‌in‌ ‌total?‌",
      multi: false,
      answers: [
        { ans: "1 Mango", correct: false },
        { ans: "2 Mangos", correct: false },
        { ans: "10 Mangos", correct: false },
        { ans: "22 Mangos", correct: true }
      ]
    },
    {
      question:
        "If‌ ‌a‌ ‌train‌ ‌is‌ ‌supposed‌ ‌to‌ ‌reach‌ ‌the‌ ‌station‌ ‌at‌ ‌4:10‌ ‌am‌. but‌ ‌it‌ ‌is ‌35‌ ‌minutes‌ late,‌ ‌at‌ ‌what‌ ‌time‌ ‌will ‌the‌ ‌train‌ ‌reach‌ ‌the‌ ‌station?‌",
      multi: false,
      answers: [
        { ans: "4:45am", correct: true },
        { ans: "3:00am", correct: false },
        { ans: "4:45pm", correct: false },
        { ans: "6:00pm", correct: false }
      ]
    },
    {
      question: "Which of these animals can fly?‌",
      multi: true,
      answers: [
        { ans: "Cats", correct: false },
        { ans: "Bats", correct: true },
        { ans: "Birds", correct: true },
        { ans: "Worms", correct: false }
      ]
    },
    {
      question: "Which of the following is a list of colors?",
      multi: false,
      answers: [
        { ans: "Dog, cat, fish", correct: false },
        {
          ans: "Earth, Mars, Venus, Saturn, Mercury, Jupiter, Neptune, Uranus",
          correct: false
        },
        {
          ans: "Guitar, drums, piano, harmonica, tambourine, trumpet",
          correct: false
        },
        {
          ans: "Red, orange, yellow, green, blue, indigo, violet",
          correct: true
        }
      ]
    },
    {
      question:
        "If you are reading a book and are on page 374, what will the number of the next page be?‌",
      multi: false,
      answers: [
        { ans: "375", correct: true },
        { ans: "373", correct: false },
        { ans: "474", correct: false },
        { ans: "400", correct: false }
      ]
    }
  ];

  useEffect(() => {
    const answerContainer = document.getElementById("answer-text");
    //Once we have started the game, we want the old choices removed and replaced with new choices on every new question
    if (answerContainer.children.length > 0) {
      while (answerContainer.firstChild) {
        answerContainer.removeChild(answerContainer.firstChild);
      }
    }
    //Hide the Next Question button and set Submit button to visible until user enters their choice
    document.getElementById("submit").removeAttribute("hidden");
    document.getElementById("next").setAttribute("hidden", true);

    //Build the answer choices
    buildAnswers(answerContainer);
    //Run this on first render of page and every time we go to a new question
  }, [currentQuestion]);

  const questionInfo = questionData[currentQuestion];

  // If we have updated answer to be correct, add 1 to the score
  useEffect(() => {
    if (answerCorrect) {
      const score = latestScore + 1;
      setScore(score); // set new state
    }
  }, [answerCorrect]);

  //Check for score update and re-render score on page
  useEffect(() => {
    const score = document.getElementById("score");
    score.textContent = "Score : " + latestScore;
  }, [latestScore]);

  const buildAnswers = (answerContainer) => {
    questionInfo.answers.forEach((answer, index) => {
      let input = document.createElement("input");
      if (questionInfo.multi) {
        handleMultiAnswers(answerContainer, input, index);
      } else {
        handleSingleAnswers(answerContainer, input, index);
      }
      // Set the data-correct to correct if it is the correct answer - check this later on submission
      if (answer.correct) {
        input.dataset.correct = answer.correct;
        input.dataset.testid = "correct-answer";
      } else {
        input.dataset.testid = "wrong-answer";
      }
      //Setting up labels for each choice
      var label = document.createElement("label");
      label.setAttribute("for", `answer ${index}`);
      if (questionInfo.multi) {
        label.setAttribute("id", "multi");
      }
      label.innerHTML = answer.ans;
      answerContainer.appendChild(label);
    });
  };

  const handleMultiAnswers = (answerContainer, input, index) => {
    //Handle setting up multiple choice answers
    answerContainer.appendChild(input);
    input.setAttribute("id", "answer" + index);
    input.setAttribute("type", "checkbox");
    input.setAttribute("name", "answer");
    input.addEventListener("click", multiCheck);
  };

  const handleSingleAnswers = (answerContainer, input, index) => {
    //Handle setting up single choice answers
    answerContainer.appendChild(input);
    input.setAttribute("id", "answer" + index);
    input.setAttribute("type", "radio");
    input.setAttribute("name", "answer");
    input.addEventListener("click", singleCheck);
    // Default to selecting the first choice
    if (index === 0) {
      input.setAttribute("checked", true);
    }
  };

  const singleCheck = (e) => {
    //Remove the checked attribute from the previously or default checked answer and add it to newly checked answer
    const answerChoices = document.getElementsByName("answer");
    const selected = e.target;
    answerChoices.forEach((each) => {
      if (each.hasAttribute("checked")) {
        each.removeAttribute("checked");
      }
    });
    // Set checked for the answer that is selected
    selected.setAttribute("checked", true);
  };

  //If checkbox is already checked, uncheck it - otherwise check the box
  function multiCheck(e) {
    const selected = e.target;
    selected.hasAttribute("checked")
      ? selected.removeAttribute("checked")
      : selected.setAttribute("checked", true);
  }

  const handleSubmit = () => {
    const nextButton = document.getElementById("next");
    const submitButton = document.getElementById("submit");
    const answerChoices = document.getElementsByName("answer");

    //Disable all options on clicking submit
    questionInfo.answers.map((each, index) =>
      document.getElementById("answer" + index).setAttribute("disabled", true)
    );

    //Checking if we are on the last question and if the button should take us to results
    if (currentQuestion === totalQuestions - 1) {
      nextButton.textContent = "See Results";
    }

    // Major logic for multiple choice - accumulating all the selected answers and comparing them to all the correct answers
    if (questionInfo.multi === true) {
      let selectedAnswers = [];
      let correctAnswers = [];
      questionInfo.answers.forEach((each, index) => {
        if (each.correct) {
          correctAnswers.push(index);
        }
      });
      answerChoices.forEach((each, index) => {
        if (each.hasAttribute("checked")) {
          selectedAnswers.push(index);
        }
      });
      // If the array of indexes of selected answers and correct answers match, the answer is correct
      selectedAnswers.length === correctAnswers.length &&
      selectedAnswers.every((value, index) => value === correctAnswers[index])
        ? setAnswerCorrect(true)
        : setAnswerCorrect(false);
    } else {
      //Logic for single choice - Check which answer is checked
      let selected;
      answerChoices.forEach((each) => {
        if (each.hasAttribute("checked")) {
          selected = each;
        }
      });
      //If the selected choice has data-correct true then it is the correct answer
      selected.getAttribute("data-correct")
        ? setAnswerCorrect(true)
        : setAnswerCorrect(false);
    }
    //Show the result of their answer and switch out which button shows
    setAnswerFlag(true);
    nextButton.removeAttribute("hidden");
    submitButton.setAttribute("hidden", true);
  };

  // On next, enable the inputs, remove answer correct message, update the question and answer information
  const handleNext = () => {
    //If we have hit the last question, prepare the results and update the high score information
    if (currentQuestion === totalQuestions - 1) {
      const highScore = localStorage.getItem("highScore") ?? 0;
      // Set the localstorage to remember the high schore and date if the high score is larger than previous high score
      if (latestScore > highScore) {
        const today = new Date().toLocaleDateString();
        localStorage.setItem("highScore", latestScore);
        localStorage.setItem("date", today);
      }
      localStorage.setItem("latestScore", latestScore);
      window.location.href = "/results";
    } else {
      // If we aren't on the last question, re-enable all the answer inputs
      questionInfo.answers.forEach((each, index) => {
        document.getElementById("answer" + index).removeAttribute("disabled");
      });

      //Add 1 to question number to re-render with next question's information
      setQuestion(currentQuestion + 1);
    }
    setAnswerFlag(false);
    setAnswerCorrect(false);
  };

  return (
    <div className="main-container">
      <div id="q-container">
        <div id="question-header">
          Question {currentQuestion + 1} of {totalQuestions}
          <span id="score"></span>
        </div>
        <div id="question-text">{questionInfo.question}</div>
        <div id="answer-text"></div>
        <div id="results-text" data-testid="results-text">
          {answerFlag ? (
            answerCorrect ? (
              <div id="result-correct">{correctText}</div>
            ) : (
              <div id="result-wrong">{wrongText}</div>
            )
          ) : (
            ""
          )}
        </div>
      </div>
      <div id="button-container">
        <button id="submit" onClick={handleSubmit}>
          Submit
        </button>
        <button id="next" onClick={handleNext}>
          Next Question
        </button>
      </div>
    </div>
  );
};

export default Questions;
