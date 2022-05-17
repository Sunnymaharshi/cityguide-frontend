import { useState } from "react";
import QuestionsContext from "./questions.context";
import { getAllQuestions } from "../../services/questions/questions.service";
const QuestionsState = (props) => {
  const [questions, setQuestions] = useState([]);

  const loadQuestions = (city) => {
    getAllQuestions(city)
      .then((res) => {
        setQuestions(res.data);
      })
      .catch((err) => {
        console.log("ques error", err.response);
      });
  };

  return (
    <QuestionsContext.Provider value={{ questions, loadQuestions }}>
      {props.children}
    </QuestionsContext.Provider>
  );
};

export default QuestionsState;
