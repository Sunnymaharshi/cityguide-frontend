import { MenuItem } from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import UserContext from "../../../context/user/user.context";
import {
  deleteAnswer,
  getUserAns,
} from "../../../services/questions/questions.service";
import DeleteIcon from "@mui/icons-material/Delete";

import "./UserAns.css";
import { ANS_DELETED_RES } from "../../../common/data";
import { toast } from "react-toastify";
export default function UserAns() {
  const { user } = useContext(UserContext);
  const [Ans, setAns] = useState([]);

  const loadUserAns = () => {
    getUserAns(user.username)
      .then((res) => {
        setAns(res.data);
      })
      .catch((err) => {
        console.log("error", err);
      });
  };
  useEffect(() => {
    loadUserAns();
    // eslint-disable-next-line
  }, []);

  const handleDeleteAns = (ans_id) => {
    deleteAnswer(ans_id).then((res) => {
      if (res.data === ANS_DELETED_RES) {
        toast.success("Answer Deleted Successfully");
        const new_ans = Ans.filter((ans) => ans.ans_id !== ans_id);
        setAns(new_ans);
      }
    });
  };
  return (
    <div className="user-ans-comp">
      {Ans.length === 0 && <p>No Answers posted</p>}
      {Ans.length > 0 && (
        <div style={{ fontSize: "large", padding: "5px" }}>
          Answers({Ans.length})
        </div>
      )}
      {Ans.map(({ ans_id, description }, ind) => {
        return (
          <div className="user-ans-des" key={ans_id}>
            <div>{ind + 1}:</div>
            <div className="answer-text">{description}</div>
            <MenuItem onClick={() => handleDeleteAns(ans_id)}>
              <DeleteIcon fontSize="small" style={{ color: "var(--accent)" }} />
            </MenuItem>
          </div>
        );
      })}
    </div>
  );
}
