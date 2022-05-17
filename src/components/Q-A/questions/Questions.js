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

  return (
    <div className="questions-comp">
      <h1>Questions</h1>

      {questions.map((q) => (
        <Link
          to={`/question/${q.ques_id}`}
          className="question"
          key={q.ques_id}
        >
          {q.description}
        </Link>
      ))}

      {questions?.map((ques) => JSON.stringify(ques))}
    </div>
  );
}

export default Questions;
