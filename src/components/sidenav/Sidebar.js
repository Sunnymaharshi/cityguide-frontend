import React from "react";
import { SidebarData } from "./SidebarData";
import "./sidebar.css"

function Sidebar() {
  return (
    <div className="Sidebar">
      <ul className="SidebarList">
        {SidebarData.map((val, key) => {
          return (
            <li
              key={key}
              className="row"
              id={window.location.pathname == val.link ? "active" : ""}
              onClick={() => {
                window.location.pathname = val.link;
              }}
            >
               {val.title}
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default Sidebar;