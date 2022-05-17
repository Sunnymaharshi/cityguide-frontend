import React, { useEffect, useContext, useState } from "react";
import { useParams } from "react-router-dom";
import QuestionsContext from "../../../context/questions/questions.context";
import Accordion from "../accordion/Accordion";
function QuestionDetail() {
  const { questions } = useContext(QuestionsContext);
  const { id } = useParams(); // eslint-disable-next-line
  const [cur_question, setCur_question] = useState(null);
  useEffect(() => {
    const cur = async () => {
      return await questions.filter((q) => q.ques_id === id);
    };
    cur().then((q) => {
      setCur_question(q[0]);
    });
    // eslint-disable-next-line
  }, [questions]);

  return (
    <>
      <h3>{cur_question && cur_question.description}</h3>
      <div>
        {(cur_question?.answerList || []).map((ans) => (
          <Accordion ans={ans} key={ans.ans_id} />
        ))}
      </div>
    </>
  );
}

export default QuestionDetail;
