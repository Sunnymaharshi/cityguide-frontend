import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import DeleteIcon from "@mui/icons-material/Delete";
import ReportIcon from "@mui/icons-material/Report";
import { IconButton, Menu, MenuItem } from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import {
  ADMIN,
  QUES_DELETED_RES,
  QUES_DELETE_UNAUTH,
  REPORT_QUESTION_TYPE,
} from "../../../common/data";
import UserContext from "../../../context/user/user.context";
import { toast } from "react-toastify";
import {
  deleteQuestion,
  report,
} from "../../../services/questions/questions.service";
import "./Question.css";
const Question = ({ ques, ind, updateQuestions }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const { user } = useContext(UserContext);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleDeleteQues = (ques_id) => {
    handleClose();

    deleteQuestion(ques_id)
      .then((res) => {
        if (res.data === QUES_DELETED_RES) {
          toast.success("Question Deleted Successfully");
          updateQuestions(ques_id);
        }
      })
      .catch((err) => {
        if (err.response.data === QUES_DELETE_UNAUTH) {
          toast.error("Unauthorised!");
        } else toast.error("Unknown error!");
      });
  };
  const handleReportQues = (ques_id) => {
    handleClose();
    report(REPORT_QUESTION_TYPE, ques_id).then((res) => {
      if (res.data.report_type_id === ques_id) {
        toast.success("Reported Successfully!");
      }
    });
  };
  return (
    <div className="question">
      <Link to={`/answers/${ques.ques_id}`} className="question-link">
        {ind + 1}: {ques.description}
      </Link>
      <IconButton
        aria-label="more"
        id="long-button"
        aria-controls={open ? "long-menu" : undefined}
        aria-expanded={open ? "true" : undefined}
        aria-haspopup="true"
        onClick={handleClick}
      >
        <MoreVertIcon style={{ color: "var(--accent)" }} />
      </IconButton>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
        anchorOrigin={{ vertical: "center", horizontal: "right" }}
        transformOrigin={{ vertical: "top", horizontal: "left" }}
      >
        {(user.username === ques.username || user.role === ADMIN) && (
          <MenuItem
            onClick={() => {
              handleDeleteQues(ques.ques_id);
            }}
          >
            <DeleteIcon fontSize="small" style={{ color: "var(--accent)" }} />
            Delete
          </MenuItem>
        )}
        <MenuItem
          onClick={() => {
            handleReportQues(ques.ques_id);
          }}
        >
          <ReportIcon fontSize="small" style={{ color: "var(--accent)" }} />
          Report
        </MenuItem>
      </Menu>
    </div>
  );
};

export default Question;
