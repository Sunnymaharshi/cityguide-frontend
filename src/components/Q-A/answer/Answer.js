import React from "react";

function Answer({ ans, comments }) {
  return (
    <>
      <h3>{ans}</h3>
      <p>Comments</p>
      {comments.map((com) => (
        <p>{com.description}</p>
      ))}
    </>
  );
}

export default Answer;
