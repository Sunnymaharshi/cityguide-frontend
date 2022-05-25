import { useEffect, useState } from "react";

import { toast } from "react-toastify";
import {
  getAllQuestions,
  getSimilarQuestions,
  postQuestion,
} from "../../../services/questions/questions.service";
import { isUserLoggedin } from "../../../common/functions";

import "./questions.css";
import Question from "../question/Question";

function Questions({ city }) {
  const [questions, setQuestions] = useState([]);
  const [newQuestion, setNewQuestion] = useState("");
  const [query, setQuery] = useState("");

  useEffect(() => {
    loadQuestions(city);
    // eslint-disable-next-line
  }, []);
  useEffect(() => {
    loadQuestions(city);
    // eslint-disable-next-line
  }, [city]);

  const updateQuestions = (ques_id) => {
    const new_questions = questions.filter((ques) => ques.ques_id !== ques_id);
    setQuestions(new_questions);
  };
  const handleSearch = () => {
    if (query.length < 3) {
      toast.error("Query must be atleast 3 characters");
    } else {
      getSimilarQuestions(city, query).then((res) => {
        if (res.data.length > 0) {
          setQuestions(res.data);
        } else {
          toast.info("Cannot find question you are looking for");
        }
      });
    }
  };
  const loadQuestions = () => {
    if (city !== null) {
      getAllQuestions(city).then((res) => {
        setQuestions(res.data);
      });
    }
  };
  const addQuestion = () => {
    if (isUserLoggedin()) {
      if (newQuestion.trim().length > 0) {
        const ques = { description: newQuestion, city_name: city };
        postQuestion(ques).then((res) => {
          setQuestions([res.data, ...questions]);
          toast.success("Question posted Successfully");
          setNewQuestion("");
        });
      } else {
        toast.error("Question can't be empty");
      }
    } else {
      toast.error("Login to post Question...");
    }
  };

  return (
    <div className="questions-comp">
      <div className="search">
        <input
          type="search"
          className="search-bar"
          placeholder="Search Questions"
          onChange={(e) => {
            setQuery(e.target.value);
          }}
        />

        <button onClick={handleSearch} className="search-btn">
          Search
        </button>
      </div>
      <div className="questions-content">
        <div className="questions">
          <h5>Questions</h5>

          {questions.map((ques, ind) => (
            <Question
              ques={ques}
              key={ques.ques_id}
              ind={ind}
              updateQuestions={updateQuestions}
            />
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
          <button className="add-btn" onClick={addQuestion}>
            Post
          </button>
        </div>
      </div>
    </div>
  );
}

export default Questions;
