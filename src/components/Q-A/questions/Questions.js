import { useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import "./questions.css";
import QuestionsContext from "../../../context/questions/questions.context";

function Questions({ city }) {
  const { questions, loadQuestions } = useContext(QuestionsContext);

  useEffect(() => {
    loadQuestions(city);
    // eslint-disable-next-line
  }, []);
  useEffect(() => {
    loadQuestions(city);
    // eslint-disable-next-line
  }, [city]);

  const handleSearch = (e) => {};

  return (
    <div className="questions-comp">
      <div className="search">
        <input
          type="search"
          className="search-bar"
          placeholder="Search Questions"
        />
        <div>
          <button onClick={handleSearch} className="search-btn">
            Search
          </button>
        </div>
      </div>
      <div className="questions">
        <h5>Questions</h5>

        {questions.map((q, ind) => (
          <Link
            to={`/answers/${q.ques_id}`}
            className="question"
            key={q.ques_id}
          >
            {ind + 1}: {q.description}
          </Link>
        ))}
      </div>
    </div>
  );
}

export default Questions;
