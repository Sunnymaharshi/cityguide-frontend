import React from "react";
import "./Answer.css";
import Comments from "../comments/Comments";
function Answer({ ans, ind }) {
  return (
    <div className="answer-comp">
      <h5>
        {ind + 1}: {ans.description}
      </h5>
      <div className="icons">
        <div className="i-count">
          <div className="material-symbols-rounded icon">thumb_up</div>
          {ans.upvotes}
        </div>
        <div className="i-count">
          <div className="material-symbols-rounded icon">thumb_down</div>
          {ans.downvotes}
        </div>
        <div className="i-count">
          <div className="material-symbols-rounded icon">comment</div>
          {ans.commentList.length}
        </div>
      </div>
      <div className="show-comments">
        <Comments comments={ans.commentList} />
      </div>
    </div>
  );
}

export default Answer;
