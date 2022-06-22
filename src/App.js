import { Route, Routes } from "react-router-dom";
import Questions from "./Questions/Questions";
import Home from "./Home/Home";
import Results from "./Results/Results";

//Styling imports
import "./App.scss";
import "./Questions/Questions.scss";
import "./Results/Results.scss";

const App = () => {
  return (
    <div className="App">
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route path="/questions" element={<Questions />} />
        <Route path="/results" element={<Results />} />
      </Routes>
    </div>
  );
};

export default App;
