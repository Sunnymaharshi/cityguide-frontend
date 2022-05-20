import React, { useContext, useState } from "react";
import UserContext from "../../../context/user/user.context";
import { postComment } from "../../../services/questions/questions.service";
import "./Comments.css";
function Comments({ commentList, handleCommentsUpdate, ans_id }) {
  const [comments, setComments] = useState(commentList);
  const [comment, setComment] = useState("");
  const { user } = useContext(UserContext);
  const addComment = () => {
    if (comment.length > 0) {
      postComment({ description: comment, ans_id }).then((res) => {
        const new_comments = [res.data, ...comments];

        setComments(new_comments);
        handleCommentsUpdate(new_comments);
        setComment("");
      });
    }
  };
  return (
    <div className="comments-comp">
      {user.username && (
        <div className="add-comment">
          <input
            className="add-comm form-control"
            type="text"
            placeholder="Your Comment"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />
          <button className="comment-btn" onClick={addComment}>
            Comment
          </button>
        </div>
      )}

      <div className="comments">
        <div style={{ color: "blue" }}>Comments</div>
        {comments?.map((com) => (
          <div className="comment" key={com.comm_id}>
            <div>
              {com.description}
              <span className="comm-username">
                ~<b>{com.username}</b>
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Comments;
