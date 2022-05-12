import React from "react";
import { Link } from "react-router-dom";
import { SidebarData } from "./SidebarData";
import "./sidebar.css";

function Sidebar() {
  return (
    <div className="Sidebar">
      <ul className="SidebarList">
        {SidebarData.map((val, key) => {
          return (
            <Link
              key={key}
              className="row"
              id={window.location.pathname === val.link ? "active" : ""}
              to={val.link}
            >
              {val.title}
            </Link>
          );
        })}
      </ul>
    </div>
  );
}

export default Sidebar;
