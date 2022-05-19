import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import { SidebarData } from "./SidebarData";
import UserContext from "../../context/user/user.context";
import "./sidebar.css";
import { ADMIN } from "../../common/data";

function Sidebar() {
  const { user } = useContext(UserContext);
  return (
    <div className="Sidebar">
      <ul className="SidebarList">
        {SidebarData.map((val, key) => {
          return (
            <NavLink key={key} className="row" to={val.link}>
              {val.title}
            </NavLink>
          );
        })}
        {user.role === ADMIN && (
          <NavLink className="row" to="/admin">
            Admin
          </NavLink>
        )}
      </ul>
    </div>
  );
}

export default Sidebar;
