import { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { logout } from "../../services/auth/auth.service";
import "./Navbar.css";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import UserContext from "../../context/user/user.context";
import {
  Avatar,
  Divider,
  IconButton,
  ListItemIcon,
  Menu,
  MenuItem,
} from "@mui/material";
import { motion } from "framer-motion";
import { Logout } from "@mui/icons-material";
import BookmarksIcon from "@mui/icons-material/Bookmarks";
import QuestionAnswerIcon from "@mui/icons-material/QuestionAnswer";
function Navbar({ openModal, city }) {
  const { user } = useContext(UserContext);
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const navigate = useNavigate();
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleYourQuestions = () => {
    navigate("/contributions/userques", { replace: true });
  };
  const handleBookmarks = () => {
    navigate("/bookmarks", { replace: true });
  };
  const handleLogout = () => {
    logout();
    window.location.reload();
  };

  return (
    <nav className="nav-bar">
      <div className="logo">CityGuide</div>

      <div className="last">
        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.98 }}
          className="city-select"
          onClick={() => {
            openModal();
          }}
        >
          <div className="city-name not-selectable">
            {city ? city : "Select a city"}
          </div>
          <ArrowDropDownIcon />
        </motion.div>

        {!user.username && (
          <div className="links">
            <Link to="/login" className="nav-link not-selectable">
              Login
            </Link>
          </div>
        )}
        {user.username && (
          <>
            <div className="username">
              <IconButton
                onClick={handleClick}
                size="small"
                sx={{ ml: 2 }}
                aria-controls={open ? "account-menu" : undefined}
                aria-haspopup="true"
                aria-expanded={open ? "true" : undefined}
              >
                <Avatar
                  style={{
                    backgroundColor: "var(--primary)",
                    color: "var(--accent)",
                  }}
                >
                  {user.username.charAt(0).toUpperCase()}
                </Avatar>
              </IconButton>
              <Menu
                anchorEl={anchorEl}
                id="account-menu"
                open={open}
                onClose={handleClose}
                onClick={handleClose}
                PaperProps={{
                  elevation: 0,
                  sx: {
                    overflow: "visible",
                    filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
                    mt: 1.5,
                    "& .MuiAvatar-root": {
                      width: 32,
                      height: 32,
                      ml: -0.5,
                      mr: 1,
                    },
                    "&:before": {
                      content: '""',
                      display: "block",
                      position: "absolute",
                      top: 0,
                      right: 14,
                      width: 10,
                      height: 10,
                      bgcolor: "background.paper",
                      transform: "translateY(-50%) rotate(45deg)",
                      zIndex: 0,
                    },
                  },
                }}
                transformOrigin={{ horizontal: "right", vertical: "top" }}
                anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
              >
                <div className="user-details">
                  <Avatar
                    style={{
                      backgroundColor: "var(--primary)",
                      color: "var(--accent)",
                    }}
                  >
                    {user.username.charAt(0).toUpperCase()}
                  </Avatar>
                  <div>{user.username}</div>
                </div>

                <MenuItem onClick={handleYourQuestions}>
                  <ListItemIcon>
                    <QuestionAnswerIcon fontSize="small" />
                  </ListItemIcon>
                  Your Q&A's
                </MenuItem>

                <MenuItem onClick={handleBookmarks}>
                  <ListItemIcon>
                    <BookmarksIcon fontSize="small" />
                  </ListItemIcon>
                  Bookmarks
                </MenuItem>
                <Divider />
                <MenuItem onClick={handleLogout}>
                  <ListItemIcon>
                    <Logout fontSize="small" />
                  </ListItemIcon>
                  Logout
                </MenuItem>
              </Menu>
            </div>
          </>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
