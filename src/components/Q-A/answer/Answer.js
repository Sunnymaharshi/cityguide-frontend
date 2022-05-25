import React, { useContext, useEffect, useState } from "react";
import Comments from "../comments/Comments";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import {
  addDislike,
  addLike,
  checkLike,
  deleteAnswer,
  getAnswer,
} from "../../../services/questions/questions.service";
import "./Answer.css";
import { isUserLoggedin } from "../../../common/functions";
import { toast } from "react-toastify";
import { ADMIN, ANS_DELETED_RES } from "../../../common/data";
import UserContext from "../../../context/user/user.context";
import { IconButton, Menu, MenuItem } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import ReportIcon from "@mui/icons-material/Report";
import ThumbUpAltIcon from "@mui/icons-material/ThumbUpAlt";
import ThumbUpOffAltIcon from "@mui/icons-material/ThumbUpOffAlt";
import ThumbDownOffAltIcon from "@mui/icons-material/ThumbDownOffAlt";
import ThumbDownAltIcon from "@mui/icons-material/ThumbDownAlt";
import CommentIcon from "@mui/icons-material/Comment";
import CommentOutlinedIcon from "@mui/icons-material/CommentOutlined";
function Answer({ ans, ind, updateAnswers }) {
  const [showComments, setShowComments] = useState(false);
  const [answer, setAnswer] = useState(ans);

  const [liked, setLiked] = useState(false);
  const [disliked, setDisliked] = useState(false);
  const { user } = useContext(UserContext);
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  useEffect(() => {
    updateLikes();
    // eslint-disable-next-line
  }, []);

  const updateLikes = () => {
    if (isUserLoggedin()) {
      checkLike(answer.ans_id).then((res) => {
        setLiked(res.data.hasupvoted);
        setDisliked(res.data.hasdownvoted);
      });
    }
  };

  const handleDeleteAns = () => {
    handleClose();
    deleteAnswer(answer.ans_id).then((res) => {
      if (res.data === ANS_DELETED_RES) {
        toast.success("Successfully Deleted!");
        updateAnswers(answer.ans_id);
      }
    });
  };
  const handleReportAns = () => {
    handleClose();
  };

  const updateAnswer = () => {
    getAnswer(answer.ans_id).then((res) => {
      setAnswer({ ...answer, ...res.data });
    });
  };
  const toggleComments = () => {
    setShowComments((showComments) => !showComments);
  };

  const handleCommentsUpdate = (commentList) => {
    setAnswer({ ...answer, commentList });
  };
  const handleLike = () => {
    if (isUserLoggedin()) {
      setLiked(!liked);
      if (disliked) setDisliked(false);
      addLike(answer.ans_id)
        .then((res) => {
          updateLikes();
          updateAnswer();
        })
        .catch((err) => {
          console.log("lik err", err.response);
        });
    } else toast.error("Please login");
  };
  const handleDisLike = () => {
    if (isUserLoggedin()) {
      setDisliked(!disliked);
      if (liked) setLiked(false);
      addDislike(answer.ans_id)
        .then((res) => {
          updateLikes();
          updateAnswer();
        })
        .catch((err) => {
          console.log("dislik err", err.response);
        });
    } else toast.error("Please login");
  };

  return (
    <div className="answer-comp">
      <div className="answer-option">
        <div className="answer-text">
          {ind + 1}: {answer.description}
        </div>
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
          {(user.username === answer.username || user.role === ADMIN) && (
            <MenuItem onClick={handleDeleteAns}>
              <DeleteIcon fontSize="small" style={{ color: "var(--accent)" }} />
              Delete
            </MenuItem>
          )}
          <MenuItem onClick={handleReportAns}>
            <ReportIcon fontSize="small" style={{ color: "var(--accent)" }} />
            Report
          </MenuItem>
        </Menu>
      </div>
      <div className="answer-react-icons">
        <div className="i-count">
          {liked ? (
            <ThumbUpAltIcon
              onClick={handleLike}
              className="answer-react-icon"
            />
          ) : (
            <ThumbUpOffAltIcon
              onClick={handleLike}
              className="answer-react-icon"
            />
          )}
          {answer.upvotes}
        </div>
        <div className="i-count">
          {disliked ? (
            <ThumbDownAltIcon
              onClick={handleDisLike}
              className="answer-react-icon"
            />
          ) : (
            <ThumbDownOffAltIcon
              onClick={handleDisLike}
              className="answer-react-icon"
            />
          )}
          {answer.downvotes}
        </div>
        <div className="i-count">
          {showComments ? (
            <CommentIcon
              onClick={toggleComments}
              className="answer-react-icon"
            />
          ) : (
            <CommentOutlinedIcon
              onClick={toggleComments}
              className="answer-react-icon"
            />
          )}
          {answer.commentList.length}
        </div>
      </div>
      <div
        style={{
          display: showComments ? "block" : "none",
        }}
      >
        <Comments
          commentList={answer.commentList}
          ans_id={answer.ans_id}
          handleCommentsUpdate={handleCommentsUpdate}
        />
      </div>
    </div>
  );
}

export default Answer;
