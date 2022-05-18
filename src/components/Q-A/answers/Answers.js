import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Answer from "../answer/Answer";
import { getQuestion } from "../../../services/questions/questions.service";
import "./Answers.css";
function Answers() {
  const { id } = useParams(); // eslint-disable-next-line
  const [question, setQuestion] = useState(null);
  const [answers, setAnswers] = useState([]);
  useEffect(() => {
    getQuestion(id).then((res) => {
      setQuestion(res.data.description);
      setAnswers(res.data.answerList);
    });

    // eslint-disable-next-line
  }, []);

  return (
    <div className="answers-comp">
      <h2 className="ques">{question}</h2>
      <div className="content">
        <div className="answers">
          {answers?.map((ans, ind) => (
            <Answer ans={ans} ind={ind} key={ans.ans_id} />
          ))}
        </div>
        <div className="add-ans">
          <h5>Add Your Answer</h5>
          <textarea
            type="text"
            placeholder="Your Answer"
            cols="30"
            rows="10"
            className="add-ans-inp form-control"
          />
          <button className="add-btn">Post</button>
        </div>
      </div>
    </div>
  );
}

export default Answers;
