import React, { useContext, useEffect, useState } from "react";
import UserContext from "../../../context/user/user.context";
import { getUserQues } from "../../../services/questions/questions.service";

export default function UserQues() {
  const { user } = useContext(UserContext);
  const [Ques, setQues] = useState([]);
  useEffect(() => {
    getUserQues(user.username)
      .then((res) => {
        setQues(res.data);
      })
      .catch((err) => {
        console.log("error", err);
      }); // eslint-disable-next-line
  }, []);

  return (
    <div>
      {Ques.length === 0 && <p>No Questions posted</p>}
      {Ques.length > 0 && <h3>You have posted {Ques.length} Questions</h3>}
      {Ques.map((p) => {
        return <p key={p.ques_id}>{p.description}</p>;
      })}
    </div>
  );
}
