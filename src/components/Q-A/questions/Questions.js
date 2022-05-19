import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./questions.css";
import {
  getAllQuestions,
  postQuestion,
} from "../../../services/questions/questions.service";
import { isUserLoggedin } from "../../../common/functions";
function Questions({ city }) {
  const [questions, setQuestions] = useState([]);
  const [newQuestion, setNewQuestion] = useState("");
  const [errMsg, setErrMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  const loadQuestions = () => {
    getAllQuestions(city).then((res) => {
      setQuestions(res.data);
    });
  };
  const addQuestion = () => {
    if (isUserLoggedin()) {
      if (newQuestion.trim().length > 0) {
        const ques = { description: newQuestion, city_name: city };
        postQuestion(ques).then((res) => {
          setQuestions([...questions, res.data]);
          setSuccessMsg("Question posted Successfully");
          setNewQuestion("");
          setErrMsg("");
        });
      } else {
        setErrMsg("Question can't be empty");
      }
    } else {
      setErrMsg("Login to post Question...");
    }
  };
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

        <button onClick={handleSearch} className="search-btn">
          Search
        </button>
      </div>
      <div className="questions-content">
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
        <div className="add-ques">
          <h5>Add Your Question</h5>
          <textarea
            type="text"
            placeholder="Your Question"
            cols="30"
            onChange={(e) => {
              setNewQuestion(e.target.value);
            }}
            value={newQuestion}
            rows="10"
            className="add-ans-inp form-control"
          />
          <div>
            <div>{successMsg}</div>
            <small>{errMsg}</small>
          </div>
          <button className="add-btn" onClick={addQuestion}>
            Post
          </button>
        </div>
      </div>
    </div>
  );
}

export default Questions;
