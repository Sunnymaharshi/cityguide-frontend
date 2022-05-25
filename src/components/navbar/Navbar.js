import { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { logout } from "../../services/auth/auth.service";
import "./Navbar.css";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import UserContext from "../../context/user/user.context";
import { Avatar } from "@mui/material";
import { motion } from "framer-motion";
function Navbar({ openModal, city }) {
  const { user } = useContext(UserContext);

  const handleLogout = () => {
    logout();
    window.location.reload();
  };

  return (
    <nav className="nav-bar">
      <div className="logo-drop">

        <div className="logo">City Guide</div>

        {/* <div className="drop-down">
          <select name="cities" id="city" title="City" onClick={handleDropdown}>
            {cities.map((val, key) => {
              return (
                <option key={key} value={val}>
                  {val}
                </option>
              );
            })}
          </select>
        </div> */}
      </div>
      <div className="last">
        <motion.div
          whileHover={{ scale: 1.01 }}
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
            <Link to="/login" className="nav-link">
              Login
            </Link>
            <Link className="nav-link" to="/signup">
              Signup
            </Link>
          </div>
        )}
        {user.username && (
          <>
            <div className="username">
              <Avatar style={{backgroundColor: "#f2f4f3", color:"#161b33"}}>{user.username.charAt(0).toUpperCase()}</Avatar>
              <div className="logout-content">
                <div className="logout-btn" onClick={handleLogout}>
                  Logout
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
