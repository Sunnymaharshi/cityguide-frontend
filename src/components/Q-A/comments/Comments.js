import { Skeleton } from "@mui/material";
import React, { useContext, useState, useEffect } from "react";
import { toast } from "react-toastify";
import { isUserLoggedin } from "../../../common/functions";
import UserContext from "../../../context/user/user.context";
import {
  getComments,
  postComment,
} from "../../../services/questions/questions.service";
import Comment from "../comment/Comment";
import { motion } from "framer-motion";
import "./Comments.css";
function Comments({ ans_id, handleCommentsUpdate }) {
  const [comments, setComments] = useState([]);
  const [comment, setComment] = useState("");
  const { user } = useContext(UserContext);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    getComments(ans_id).then((res) => {
      setComments(res.data);
      setLoading(false);
    });
    // eslint-disable-next-line
  }, []);

  const addComment = () => {
    if (isUserLoggedin()) {
      if (comment.trim().length > 0) {
        postComment({ description: comment, ans_id })
          .then((res) => {
            const new_comments = [res.data, ...comments];

            setComments(new_comments);
            handleCommentsUpdate(new_comments.length);
            setComment("");
          })
          .catch((err) => {
            toast.error(err.response.data, { autoClose: 5000 });
          });
      } else {
        toast.error("Comment can't be empty");
      }
    } else {
      toast.error("Login to comment...");
    }
  };

  const updateComments = (comm_id) => {
    const new_comments = comments.filter((com) => com.comm_id !== comm_id);
    setComments(new_comments);
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
            style={{ outlineColor: "var(--secondary)" }}
          />
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
            className="comment-btn"
            onClick={addComment}
          >
            Comment
          </motion.button>
        </div>
      )}

      <div className="comments">
        <div style={{ color: "blue", marginTop: "10px" }}>
          Comments({comments?.length})
        </div>
        {!loading &&
          comments?.map((comm) => (
            <Comment
              comm={comm}
              key={comm.comm_id}
              updateComments={updateComments}
            />
          ))}
        {loading &&
          [...Array(2).keys()].map(() => (
            <div style={{ display: "flex", margin: "10px" }}>
              <Skeleton
                animation="wave"
                variant="circular"
                width={50}
                height={50}
              />
              <div style={{ width: "100%", marginLeft: "15px" }}>
                <Skeleton animation="wave" height={20} width="20%" />
                <Skeleton animation="wave" height={20} width="80%" />
                <Skeleton animation="wave" height={20} width="80%" />
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}

export default Comments;
