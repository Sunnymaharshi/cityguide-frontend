import React, { useContext } from "react";
import { NavLink, useLocation } from "react-router-dom";
import UserContext from "../../context/user/user.context";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import HomeIcon from "@mui/icons-material/Home";
import AdminPanelSettingsOutlinedIcon from "@mui/icons-material/AdminPanelSettingsOutlined";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import DirectionsBusFilledOutlinedIcon from "@mui/icons-material/DirectionsBusFilledOutlined";
import DirectionsBusIcon from "@mui/icons-material/DirectionsBus";
import TramOutlinedIcon from "@mui/icons-material/TramOutlined";
import TramIcon from "@mui/icons-material/Tram";
import FastfoodOutlinedIcon from "@mui/icons-material/FastfoodOutlined";
import FastfoodIcon from "@mui/icons-material/Fastfood";
import HikingIcon from "@mui/icons-material/Hiking";
import HelpOutlineOutlinedIcon from "@mui/icons-material/HelpOutlineOutlined";
import HelpIcon from "@mui/icons-material/Help";

import "./sidebar.css";
import { ADMIN } from "../../common/data";
import { IconButton, Tooltip, Typography } from "@mui/material";

function Sidebar() {
  const location = useLocation();

  const { user } = useContext(UserContext);
  return (
    <div className="Sidebar">
      <ul className="SidebarList">
        <NavLink className="row" to="/home">
          <Tooltip
            title="Home"
            placement="right"
            arrow
            componentsProps={{
              tooltip: {
                sx: {
                  bgcolor: "var(--accent)",
                  "& .MuiTooltip-arrow": {
                    color: "var(--accent)",
                  },
                  color: "white",
                  fontSize: "1rem",
                },
              },
            }}
          >
            <IconButton>
              {location.pathname === "/home" ? (
                <HomeIcon
                  className="sidebar-icon"
                  style={{ fontSize: "2.2rem" }}
                />
              ) : (
                <HomeOutlinedIcon
                  className="sidebar-icon"
                  style={{ fontSize: "2.2rem" }}
                />
              )}
              <br />
              <Typography className="sidebar-title"> Home</Typography>
            </IconButton>
          </Tooltip>
        </NavLink>

        <NavLink className="row" to="/busdata">
          <Tooltip
            title="Buses"
            placement="right"
            arrow
            componentsProps={{
              tooltip: {
                sx: {
                  bgcolor: "var(--accent)",
                  "& .MuiTooltip-arrow": {
                    color: "var(--accent)",
                  },
                  color: "white",
                  fontSize: "1rem",
                },
              },
            }}
          >
            <IconButton>
              {location.pathname === "/busdata" ? (
                <DirectionsBusIcon
                  className="sidebar-icon"
                  style={{ fontSize: "2.2rem" }}
                />
              ) : (
                <DirectionsBusFilledOutlinedIcon
                  className="sidebar-icon"
                  style={{ fontSize: "2.2rem" }}
                />
              )}
              <Typography className="sidebar-title">Bus Data</Typography>
            </IconButton>
          </Tooltip>
        </NavLink>
        <NavLink className="row" to="/metromap">
          <Tooltip
            title="Metro Map"
            placement="right"
            arrow
            componentsProps={{
              tooltip: {
                sx: {
                  bgcolor: "var(--accent)",
                  "& .MuiTooltip-arrow": {
                    color: "var(--accent)",
                  },
                  color: "white",
                  fontSize: "1rem",
                },
              },
            }}
          >
            <IconButton>
              {location.pathname === "/metromap" ? (
                <TramIcon
                  className="sidebar-icon"
                  style={{ fontSize: "2.2rem" }}
                />
              ) : (
                <TramOutlinedIcon
                  className="sidebar-icon"
                  style={{ fontSize: "2.2rem" }}
                />
              )}
              <Typography className="sidebar-title">Metro Data</Typography>
            </IconButton>
          </Tooltip>
        </NavLink>
        <NavLink className="row" to="/restaurants">
          <Tooltip
            title="Restaurants"
            placement="right"
            arrow
            componentsProps={{
              tooltip: {
                sx: {
                  bgcolor: "var(--accent)",
                  "& .MuiTooltip-arrow": {
                    color: "var(--accent)",
                  },
                  color: "white",
                  fontSize: "1rem",
                },
              },
            }}
          >
            <IconButton>
              {location.pathname === "/restaurants" ? (
                <FastfoodIcon
                  className="sidebar-icon"
                  style={{ fontSize: "2.2rem" }}
                />
              ) : (
                <FastfoodOutlinedIcon
                  className="sidebar-icon"
                  style={{ fontSize: "2.2rem" }}
                />
              )}
              <Typography className="sidebar-title">Top Restaurants</Typography>
            </IconButton>
          </Tooltip>
        </NavLink>
        <NavLink className="row" to="/attractions">
          <Tooltip
            title="Attractions"
            placement="right"
            arrow
            componentsProps={{
              tooltip: {
                sx: {
                  bgcolor: "var(--accent)",
                  "& .MuiTooltip-arrow": {
                    color: "var(--accent)",
                  },
                  color: "white",
                  fontSize: "1rem",
                },
              },
            }}
          >
            <IconButton>
              {location.pathname === "/attractions" ? (
                <HikingIcon
                  className="sidebar-icon"
                  style={{ fontSize: "2.2rem" }}
                />
              ) : (
                <HikingIcon
                  className="sidebar-icon"
                  style={{ fontSize: "2.2rem" }}
                />
              )}
              <Typography className="sidebar-title">Top Attractions</Typography>
            </IconButton>
          </Tooltip>
        </NavLink>
        <NavLink
          className={
            "row " + (location.pathname.includes("answers") ? "active" : "")
          }
          to="/faq"
        >
          <Tooltip
            title="FAQ"
            placement="right"
            arrow
            componentsProps={{
              tooltip: {
                sx: {
                  bgcolor: "var(--accent)",
                  "& .MuiTooltip-arrow": {
                    color: "var(--accent)",
                  },
                  color: "white",
                  fontSize: "1rem",
                },
              },
            }}
          >
            <IconButton>
              {location.pathname === "/faq" ||
              location.pathname.includes("answers") ? (
                <HelpIcon
                  className="sidebar-icon"
                  style={{ fontSize: "2.2rem" }}
                />
              ) : (
                <HelpOutlineOutlinedIcon
                  className="sidebar-icon"
                  style={{ fontSize: "2.2rem" }}
                />
              )}
              <Typography className="sidebar-title">FAQ</Typography>
            </IconButton>
          </Tooltip>
        </NavLink>
        {user.role === ADMIN && (
          <NavLink className="row" to="/admin">
            <Tooltip
              title="Admin Dashboard"
              placement="right"
              arrow
              componentsProps={{
                tooltip: {
                  sx: {
                    bgcolor: "var(--accent)",
                    "& .MuiTooltip-arrow": {
                      color: "var(--accent)",
                    },
                    color: "white",
                    fontSize: "1rem",
                  },
                },
              }}
            >
              <IconButton>
                {/admin*/.test(location.pathname) ? (
                  <AdminPanelSettingsIcon
                    className="sidebar-icon"
                    style={{ fontSize: "2.2rem" }}
                  />
                ) : (
                  <AdminPanelSettingsOutlinedIcon
                    className="sidebar-icon"
                    style={{ fontSize: "2.2rem" }}
                  />
                )}
                <Typography className="sidebar-title">Admin</Typography>
              </IconButton>
            </Tooltip>
          </NavLink>
        )}
      </ul>
    </div>
  );
}

export default Sidebar;
