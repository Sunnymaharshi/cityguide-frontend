import React, { useEffect, useContext, useState } from "react";
import { useParams } from "react-router-dom";
import QuestionsContext from "../../../context/questions/questions.context";
import Answer from "../answer/Answer";
import "./QuestionDetail.css";
function QuestionDetail() {
  const { questions } = useContext(QuestionsContext);
  const { id } = useParams(); // eslint-disable-next-line
  const [cur_question, setCur_question] = useState(null);
  useEffect(() => {
    console.log(questions);
    const cur = async () => {
      return await questions.filter((q) => q.ques_id === parseInt(id));
    };
    cur().then((q) => {
      console.log(q);
      setCur_question(q[0]);
    });
    // eslint-disable-next-line
  }, [questions]);

  return (
    <div className="ques-detail-comp">
      <h2>{cur_question && cur_question.description}</h2>

      {(cur_question?.answerList || []).map((ans) => (
        <Answer ans={ans} key={ans.ans_id} />
      ))}
    </div>
  );
}

export default QuestionDetail;
