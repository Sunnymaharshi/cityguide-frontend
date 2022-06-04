import { MenuItem } from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { QUES_DELETED_RES } from "../../../common/data";
import UserContext from "../../../context/user/user.context";
import {
  deleteQuestion,
  getUserQues,
} from "../../../services/questions/questions.service";
import "./UserQues.css";
import DeleteIcon from "@mui/icons-material/Delete";

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

  const handleDeleteQues = (ques_id) => {
    deleteQuestion(ques_id).then((res) => {
      if (res.data === QUES_DELETED_RES) {
        toast.success("Question Deleted Successfully");
        const new_ques = Ques.filter((q) => q.ques_id !== ques_id);
        setQues(new_ques);
      }
    });
  };

  return (
    <div className="user-ques-comp">
      {Ques.length === 0 && <p>No Questions posted</p>}
      {Ques.length > 0 && (
        <div style={{ fontSize: "large", padding: "5px" }}>
          Questions({Ques.length})
        </div>
      )}
      {Ques.map(({ ques_id, description }, ind) => {
        return (
          <div key={ques_id} className="user-ques-des">
            <div>{ind + 1}:</div>
            <div className="answer-text">{description}</div>
            <MenuItem onClick={() => handleDeleteQues(ques_id)}>
              <DeleteIcon fontSize="small" style={{ color: "var(--accent)" }} />
            </MenuItem>
          </div>
        );
      })}
    </div>
  );
}
