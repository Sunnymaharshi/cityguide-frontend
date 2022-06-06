import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { toast } from "react-toastify";
import {
  getAllQuestions,
  getSimilarQuestions,
  postQuestion,
} from "../../../services/questions/questions.service";
import { isUserLoggedin } from "../../../common/functions";

import "./questions.css";
import Question from "../question/Question";
import { Skeleton } from "@mui/material";

function Questions({ city }) {
  const [questions, setQuestions] = useState([]);
  const [newQuestion, setNewQuestion] = useState("");
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadQuestions(city);
    // eslint-disable-next-line
  }, []);
  useEffect(() => {
    loadQuestions(city);
    // eslint-disable-next-line
  }, [city]);
  const handleQuery = (e) => {
    setQuery(e.target.value);
    if (e.target.value === "") loadQuestions(city);
  };
  const updateQuestions = (ques_id) => {
    const new_questions = questions.filter((ques) => ques.ques_id !== ques_id);
    setQuestions(new_questions);
  };
  const handleSearch = () => {
    if (query.length < 3) {
      toast.error("Query must be atleast 3 characters");
    } else {
      setLoading(true);
      getSimilarQuestions(city, query)
        .then((res) => {
          if (res.data.length > 0) {
            setQuestions(res.data);
          } else {
            toast.info("Cannot find question you are looking for");
          }
          setLoading(false);
        })
        .catch((err) => {
          toast.error(err.response.data, { autoClose: 5000 });
          setLoading(false);
        });
    }
  };
  const loadQuestions = () => {
    setLoading(true);
    if (city !== null) {
      getAllQuestions(city)
        .then((res) => {
          setQuestions(res.data);
          setLoading(false);
        })
        .catch((err) => {
          toast.error(err.response.data, { autoClose: 5000 });
          setLoading(false);
        });
    }
  };
  const addQuestion = () => {
    if (isUserLoggedin()) {
      if (newQuestion.trim().length > 0) {
        const ques = { description: newQuestion, city_name: city };
        postQuestion(ques)
          .then((res) => {
            setQuestions([res.data, ...questions]);
            toast.success("Question posted Successfully");
            setNewQuestion("");
          })
          .catch((err) => {
            toast.error(err.response.data, { autoClose: 5000 });
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
          onChange={handleQuery}
        />

        <motion.button
          onClick={handleSearch}
          className="search-btn"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.98 }}
        >
          Search
        </motion.button>
      </div>
      <div className="questions-content">
        <div style={{ width: "100%" }}>
          <div style={{ fontSize: "large", paddingLeft: "10px" }}>
            Questions({questions.length})
          </div>
          <div className="questions">
            {loading &&
              [...Array(7).keys()].map((i) => (
                <Skeleton
                  height={45}
                  style={{ marginBottom: "10px" }}
                  width="90%"
                />
              ))}

            {!loading &&
              questions.map((ques, ind) => (
                <Question
                  ques={ques}
                  key={ques.ques_id}
                  ind={ind}
                  updateQuestions={updateQuestions}
                />
              ))}
          </div>
        </div>
        <div className="add-ques">
          <h5>Add Your Question</h5>
          <textarea
            type="text"
            placeholder="Your Question"
            cols="60"
            onChange={(e) => {
              setNewQuestion(e.target.value);
            }}
            value={newQuestion}
            rows="10"
            className="add-ans-inp form-control"
          />
          <motion.button
            className="add-btn"
            onClick={addQuestion}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
          >
            Post
          </motion.button>
        </div>
      </div>
    </div>
  );
}

export default Questions;
