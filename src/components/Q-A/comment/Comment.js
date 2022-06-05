import React, { useState, useContext } from "react";
import { Avatar } from "@mui/material";
import "./Comment.css";
import { IconButton, Menu, MenuItem } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import ReportIcon from "@mui/icons-material/Report";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import UserContext from "../../../context/user/user.context";
import {
  ADMIN,
  COMM_DELETED_RES,
  REPORT_COMMENT_TYPE,
} from "../../../common/data";
import {
  deleteComment,
  report,
} from "../../../services/questions/questions.service";
import { toast } from "react-toastify";
const Comment = ({ comm, updateComments }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const { user } = useContext(UserContext);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleDeleteComm = () => {
    handleClose();
    deleteComment(comm.comm_id).then((res) => {
      if (res.data === COMM_DELETED_RES) {
        toast.success("Comment deleted Succesfully");
        updateComments(comm.comm_id);
      }
    }).catch((err) => {
      toast.error(err.response.data, { autoClose: 5000 });
    });
  };
  const handleReportComm = () => {
    handleClose();
    report(REPORT_COMMENT_TYPE, comm.comm_id).then((res) => {
      if (res.data.report_type_id === comm.comm_id) {
        toast.success("Reported Successfully!");
      }
    }).catch((err) => {
      toast.error(err.response.data, { autoClose: 5000 });
    });
  };

  return (
    <div className="comment-comp">
      <div className="comment-content">
        <Avatar
          style={{
            backgroundColor: "var(--primary)",
            color: "var(--accent)",
          }}
        >
          {comm.username.charAt(0).toUpperCase()}
        </Avatar>
        <div className="comment-text">
          <div className="comm-username">{comm.username}</div>
          <div className="comm-description">{comm.description}</div>
        </div>
      </div>
      <IconButton
        aria-label="more"
        id="long-button"
        aria-controls={open ? "long-menu" : undefined}
        aria-expanded={open ? "true" : undefined}
        aria-haspopup="true"
        onClick={handleClick}
        style={{ height: "fit-content" }}
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
        {(user.username === comm.username || user.role === ADMIN) && (
          <MenuItem onClick={handleDeleteComm}>
            <DeleteIcon fontSize="small" style={{ color: "var(--accent)" }} />
            Delete
          </MenuItem>
        )}
        <MenuItem onClick={handleReportComm}>
          <ReportIcon fontSize="small" style={{ color: "var(--accent)" }} />
          Report
        </MenuItem>
      </Menu>
    </div>
  );
};

export default Comment;
