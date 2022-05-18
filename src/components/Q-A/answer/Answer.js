import React, { useState } from "react";
import like from "../../../assets/icons/like.svg";
import likeActive from "../../../assets/icons/like-active.svg";
import dislike from "../../../assets/icons/dislike.svg";
import dislikeActive from "../../../assets/icons/dislike-active.svg";
import comment from "../../../assets/icons/comment.svg";
import commentActive from "../../../assets/icons/comment-active.svg";
import "./Answer.css";
import Comments from "../comments/Comments";
function Answer({ ans, ind }) {
  const [showComments, setShowComments] = useState(false);
  const [answer, setAnswer] = useState(ans);

  const toggleComments = () => {
    setShowComments((showComments) => !showComments);
  };

  const handleCommentsUpdate = (commentList) => {
    setAnswer({ ...answer, commentList });
  };

  return (
    <div className="answer-comp">
      <h5>
        {ind + 1}: {answer.description}
      </h5>
      <div className="icons">
        <div className="i-count">
          <img className="icon" src={`${like}`} />
          {answer.upvotes}
        </div>
        <div className="i-count">
          <img className="icon" src={`${dislike}`} />
          {answer.downvotes}
        </div>
        <div className="i-count">
          <img className="icon" src={`${comment}`} onClick={toggleComments} />

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
