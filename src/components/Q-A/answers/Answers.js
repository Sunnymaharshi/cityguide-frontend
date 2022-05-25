import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Answer from "../answer/Answer";
import {
  getQuestion,
  postAnswer,
} from "../../../services/questions/questions.service";
import "./Answers.css";
import { isUserLoggedin } from "../../../common/functions";
import { POST_ANSWER_SUCCESS_MSG } from "../../../common/data";
import { toast } from "react-toastify";
function Answers() {
  const { id } = useParams(); // eslint-disable-next-line
  const [question, setQuestion] = useState(null);
  const [answers, setAnswers] = useState([]);
  const [newAnswer, setNewAnswer] = useState("");

  const addAnswer = () => {
    if (isUserLoggedin()) {
      if (newAnswer.trim().length > 0) {
        const ans = { description: newAnswer, ques_id: id };
        postAnswer(ans).then((res) => {
          setNewAnswer("");
          setAnswers((prev) => [...prev, res.data]);
          toast.success(POST_ANSWER_SUCCESS_MSG);
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
      setAnswers(res.data.answerList);
    });

    // eslint-disable-next-line
  }, []);

  const updateAnswers = (ans_id) => {
    const new_answers = answers.filter((ans) => ans.ans_id !== ans_id);
    setAnswers(new_answers);
  };
  return (
    <div className="answers-comp">
      <h2 className="ques">{question}</h2>
      <div className="content">
        <div className="answers">
          {answers.length > 0 &&
            answers.map((ans, ind) => (
              <Answer
                ans={ans}
                ind={ind}
                key={ans.ans_id}
                updateAnswers={updateAnswers}
              />
            ))}
        </div>
        <div className="add-ans">
          <h5>Add Your Answer</h5>
          <textarea
            type="text"
            placeholder="Your Answer"
            cols="30"
            onChange={(e) => {
              setNewAnswer(e.target.value);
            }}
            value={newAnswer}
            rows="10"
            className="add-ans-inp form-control"
          />
          <button className="add-btn" onClick={addAnswer}>
            Post
          </button>
        </div>
      </div>
    </div>
  );
}

export default Answers;
