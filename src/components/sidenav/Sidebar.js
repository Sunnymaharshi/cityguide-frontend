import React from "react";
import { NavLink } from "react-router-dom";
import { SidebarData } from "./SidebarData";
import "./sidebar.css";

function Sidebar() {
  return (
    <div className="Sidebar">
      <ul className="SidebarList">
        {SidebarData.map((val, key) => {
          return (
            <NavLink
              key={key}
              className="row"
              id={window.location.pathname === val.link ? "active" : ""}
              to={val.link}
            >
              {val.title}
            </NavLink>
          );
        })}
      </ul>
    </div>
  );
}

export default Sidebar;
