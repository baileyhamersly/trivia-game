const Results = () => {
  const totalQuestions = localStorage.getItem("totalQuestions");
  const highScore = localStorage.getItem("highScore");
  const date = localStorage.getItem("date");
  const latestScore = localStorage.getItem("latestScore");
  const congratsImg =
    "https://media.istockphoto.com/vectors/congratulations-card-with-light-rays-vector-id960999328?k=20&m=960999328&s=612x612&w=0&h=astL9J46lO0fTOAvyj0zoGqNu8ZSH4gRBZRVm4YVlXY=";

  const toQuestions = () => (window.location.href = "/questions");

  return (
    <div className="main-container">
      {highScore ? (
        <div>
          <img src={congratsImg} alt="Congratulations" width="300px"></img>
          <div id="results-title">You're a Trivia Master!</div>
          <div id="results-body">
            <p>
              You got {latestScore} out of {totalQuestions} questions right!
            </p>
            <p>
              Your best score so far was {highScore} out of {totalQuestions}{" "}
              which you got on {date}.
            </p>
            <div>Want to try again?</div>
            <button onClick={toQuestions}>Retake Quiz</button>
          </div>
        </div>
      ) : (
        <div>
          <div id="results-title">Uh-oh! You've fallen into a white void!</div>
          <div>
            There won't be much to see here until you complete the quiz! Click
            the button below to test your wits.
          </div>
          <button onClick={toQuestions}>Take Quiz</button>
        </div>
      )}
    </div>
  );
};

export default Results;
