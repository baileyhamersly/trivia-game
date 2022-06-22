## Bailey Hamersly's Trivia Game!

Welcome to my project for Indeed's recruitment process! This Javascript-based application will allow users to test their knowledge in a trivia game. The framework/library used was React and tests are created using Jest and React Testing Library.

## Project Structure

There are three main parts to the project: Home -> Questions -> Results
Users should start on the homepage (path: /) which allows them to start the quiz. However, if a user knows the path to the questions ( /questions ) they can use that and bypass the homepage.

Questions is where the meat of the project is and holds all the logic for reading in the data, building the questions and answers, and handling whether the user chooses the correct or wrong answer. On the last question, a user will be presented with a button that takes them to results.

On the results page ( path: /results) the user is shown their score as well as the high score that has been stored in their local storage and the date that they received that high score. It also provides a button to take them back to the questions if they would like to try their hand at the game again!

## Things that I would like to implement in the future

- A separate possibility for the results page where the user is told if they have not beaten their high score instead of always telling the user congratulations

- Keeping track of the user's progress as they go through the quiz so that if they refresh in the middle of the game it doesn't take them back to the first question every time

- More testing coverage, right now I focused on getting the basic button functionality tested but there is more testing that could be done to check that text and images correctly render on the page

- Ability to take in a user's input that lets them choose what kind of questions they would like to answer
