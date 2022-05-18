import React from "react";

function Comments({ comments }) {
  return (
    <div className="comments-comp">
      <div className="add-comment">
        <input className="add-comm" type="text" placeholder="Add Comment" />
        <button className="comment-btn">Comment</button>
      </div>
      <div className="comments">
        {comments?.map((com) => (
          <div className="comment" key={com.comm_id}>
            <div>
              <b>{com.username}</b>
            </div>
            <div>{com.description}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Comments;
