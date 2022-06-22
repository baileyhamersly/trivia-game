const Home = () => {
  const handleStart = () => {
    window.location.href = "/questions";
  };

  return (
    <div className="main-container">
      <div id="welcome-para">
        Welcome to Bailey Hamersly's trivia game. Click the button below to
        begin!
      </div>
      <button id="start-button" className="main-button" onClick={handleStart}>
        Let's Start!
      </button>
    </div>
  );
};

export default Home;
