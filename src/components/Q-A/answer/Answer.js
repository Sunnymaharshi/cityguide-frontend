import React from "react";
import "./Answer.css";
function Answer({ ans }) {
  return (
    <>
      <h5>{ans.description}</h5>
      <div className="answers">
        <p>Comments</p>
        {ans.commentList.map((com) => (
          <p>{com.description}</p>
        ))}
      </div>
    </>
  );
}

export default Answer;
