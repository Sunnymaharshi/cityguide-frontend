import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Answer from "../answer/Answer";
import {
  getAnswers,
  getQuestion,
  postAnswer,
} from "../../../services/questions/questions.service";
import "./Answers.css";
import { isUserLoggedin } from "../../../common/functions";
import { POST_ANSWER_SUCCESS_MSG } from "../../../common/data";
import { toast } from "react-toastify";
import { Skeleton } from "@mui/material";
import { motion } from "framer-motion";
function Answers() {
  const { id } = useParams(); // eslint-disable-next-line
  const [question, setQuestion] = useState(null);
  const [answers, setAnswers] = useState([]);
  const [newAnswer, setNewAnswer] = useState("");
  const [loading, setLoading] = useState(true);
  const [Qloading, setQLoading] = useState(true);
  const addAnswer = () => {
    if (isUserLoggedin()) {
      if (newAnswer.trim().length > 0) {
        const ans = { description: newAnswer, ques_id: id };
        postAnswer(ans)
          .then((res) => {
            setNewAnswer("");
            setAnswers((prev) => [res.data, ...prev]);
            toast.success(POST_ANSWER_SUCCESS_MSG);
          })
          .catch((err) => {
            toast.error(err.response.data, { autoClose: 5000 });
          });
      } else {
        toast.error("Answer can't be empty");
      }
    } else {
      toast.error("Login to post Answer...");
    }
  };
  useEffect(() => {
    getQuestion(id).then((res) => {
      setQuestion(res.data.description);
      setQLoading(false);
    });
    getAnswers(id).then((res) => {
      setAnswers(res.data);
      setLoading(false);
    });

    // eslint-disable-next-line
  }, []);

  const updateAnswers = (ans_id) => {
    const new_answers = answers.filter((ans) => ans.ans_id !== ans_id);
    setAnswers(new_answers);
  };
  return (
    <div className="answers-comp">
      <h2 className="ques">{!Qloading && question}</h2>
      {Qloading && (
        <Skeleton
          height={50}
          width="60%"
          animation="wave"
          style={{ marginLeft: "200px" }}
        />
      )}
      <div className="answers-content">
        <div style={{ width: "100%" }}>
          <div style={{ fontSize: "large", paddingLeft: "10px" }}>
            Answers({answers?.length})
          </div>
          <div className="answers">
            {!loading &&
              answers?.length > 0 &&
              answers.map((ans, ind) => (
                <Answer
                  ans={ans}
                  ind={ind}
                  key={ans.ans_id}
                  updateAnswers={updateAnswers}
                />
              ))}
            {loading &&
              [...Array(3).keys()].map((i) => (
                <Skeleton height={300} animation="wave" />
              ))}
          </div>
        </div>
        <div className="add-ans">
          <h5>Add Your Answer</h5>
          <textarea
            type="text"
            placeholder="Your Answer"
            cols="60"
            onChange={(e) => {
              setNewAnswer(e.target.value);
            }}
            value={newAnswer}
            rows="10"
            className="add-ans-inp form-control"
          />
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
            className="add-btn"
            onClick={addAnswer}
          >
            Post
          </motion.button>
        </div>
      </div>
    </div>
  );
}

export default Answers;
