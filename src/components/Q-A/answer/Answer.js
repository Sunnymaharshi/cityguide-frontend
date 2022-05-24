import React, { useContext, useEffect, useState } from "react";
import Comments from "../comments/Comments";
import like from "../../../assets/icons/like.svg";
import dislike from "../../../assets/icons/dislike.svg";
import comment from "../../../assets/icons/comment.svg";
import likeActive from "../../../assets/icons/like-active.svg";
import dislikeActive from "../../../assets/icons/dislike-active.svg";
import commentActive from "../../../assets/icons/comment-active.svg";
import dots from "../../../assets/icons/dots.svg";

import {
  addDislike,
  addLike,
  checkLike,
  getAnswer,
} from "../../../services/questions/questions.service";
import "./Answer.css";
import { isUserLoggedin } from "../../../common/functions";
import { toast } from "react-toastify";
import { ADMIN } from "../../../common/data";
import UserContext from "../../../context/user/user.context";
function Answer({ ans, ind }) {
  const [showComments, setShowComments] = useState(false);
  const [answer, setAnswer] = useState(ans);

  const [liked, setLiked] = useState(false);
  const [disliked, setDisliked] = useState(false);
  const { user } = useContext(UserContext);

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

  const handleDeleteAns = () => {};
  const handleReportAns = () => {};

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
        <div className="dropend">
          <img
            className="dropdown-toggle option-icon"
            type="button"
            alt="options"
            src={dots}
            id="answer-options-id"
            data-bs-toggle="dropdown"
            // aria-expanded="false"
          />

          <ul className="dropdown-menu" aria-labelledby="answer-options-id">
            {(user.username === answer.username || user.role === ADMIN) && (
              <li>
                <div
                  className="dropdown-item"
                  onClick={() => {
                    handleDeleteAns();
                  }}
                >
                  Delete
                </div>
              </li>
            )}
            <li>
              <div
                className="dropdown-item"
                onClick={() => {
                  handleReportAns();
                }}
              >
                Report
              </div>
            </li>
          </ul>
        </div>
      </div>
      <div className="icons">
        <div className="i-count" onClick={handleLike}>
          <img
            className="icon"
            alt="Like"
            src={liked ? `${likeActive}` : `${like}`}
          />
          {answer.upvotes}
        </div>
        <div className="i-count" onClick={handleDisLike}>
          <img
            className="icon"
            alt="DisLike"
            src={disliked ? `${dislikeActive}` : `${dislike}`}
          />
          {answer.downvotes}
        </div>
        <div className="i-count">
          <img
            className="icon"
            alt="comment"
            src={showComments ? `${commentActive}` : `${comment}`}
            onClick={toggleComments}
          />

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
