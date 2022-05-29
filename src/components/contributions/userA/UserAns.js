import React, { useContext, useEffect, useState } from "react";
import UserContext from "../../../context/user/user.context";
import { getUserAns } from "../../../services/questions/questions.service";

export default function UserAns() {
  const { user } = useContext(UserContext);
  const [Ans, setAns] = useState([]);
  useEffect(() => {
    getUserAns(user.username)
      .then((res) => {
        setAns(res.data);
      })
      .catch((err) => {
        console.log("error", err);
      }); // eslint-disable-next-line
  }, []);

  return (
    <div>
      {Ans.length === 0 && <p>No Answers posted</p>}
      {Ans.length > 0 && <h3>You have posted {Ans.length} Answers</h3>}
      {Ans.map((p) => {
        return <p key={p.ans_id}>{p.description}</p>;
      })}
    </div>
  );
}
