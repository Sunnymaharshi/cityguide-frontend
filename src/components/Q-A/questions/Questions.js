import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import {
  deleteQuestion,
  getAllQuestions,
  getSimilarQuestions,
  postQuestion,
} from "../../../services/questions/questions.service";
import { isUserLoggedin } from "../../../common/functions";
import { QUES_DELETED_RES, QUES_DELETE_UNAUTH } from "../../../common/data";
import dots from "../../../assets/icons/dots.svg";
import "./questions.css";
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
    getAllQuestions(city).then((res) => {
      setQuestions(res.data);
    });
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
  const handleDeleteQues = (ques_id) => {
    deleteQuestion(ques_id)
      .then((res) => {
        if (res.data === QUES_DELETED_RES) {
          setQuestions(questions.filter((q) => q.ques_id !== ques_id));
          toast.success("Question Deleted Successfully");
        }
      })
      .catch((err) => {
        if (err.response.data === QUES_DELETE_UNAUTH) {
          toast.error("Unauthorised!");
        } else toast.error("Unknown error!");
      });
  };
  const handleReportQues = (ques_id) => {};
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

          {questions.map((q, ind) => (
            <div key={q.ques_id} className="question">
              <Link to={`/answers/${q.ques_id}`} className="question-link">
                {ind + 1}: {q.description}
              </Link>
              <div className="dropdown">
                <img
                  className="dropdown-toggle option-icon"
                  type="button"
                  alt="options"
                  src={dots}
                  id="dropdownMenuButton1"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                />

                <ul
                  className="dropdown-menu"
                  aria-labelledby="dropdownMenuButton1"
                >
                  {
                    <li>
                      <div
                        className="dropdown-item"
                        onClick={() => {
                          handleDeleteQues(q.ques_id);
                        }}
                      >
                        Delete
                      </div>
                    </li>
                  }
                  <li>
                    <div
                      className="dropdown-item"
                      onClick={() => {
                        handleReportQues(q.ques_id);
                      }}
                    >
                      Report
                    </div>
                  </li>
                </ul>
              </div>
            </div>
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
