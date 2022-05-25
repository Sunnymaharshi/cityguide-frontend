import React, { useContext, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import UserContext from "../../context/user/user.context";
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import HomeIcon from '@mui/icons-material/Home';
import AdminPanelSettingsOutlinedIcon from '@mui/icons-material/AdminPanelSettingsOutlined';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import DirectionsBusFilledOutlinedIcon from '@mui/icons-material/DirectionsBusFilledOutlined';
import DirectionsBusIcon from '@mui/icons-material/DirectionsBus';
import TramOutlinedIcon from '@mui/icons-material/TramOutlined';
import TramIcon from '@mui/icons-material/Tram';
import FastfoodOutlinedIcon from '@mui/icons-material/FastfoodOutlined';
import FastfoodIcon from '@mui/icons-material/Fastfood';
import TourOutlinedIcon from '@mui/icons-material/TourOutlined';
import TourIcon from '@mui/icons-material/Tour';
import QuestionAnswerOutlinedIcon from '@mui/icons-material/QuestionAnswerOutlined';
import QuestionAnswerIcon from '@mui/icons-material/QuestionAnswer';
import HikingIcon from '@mui/icons-material/Hiking';

import "./sidebar.css";
import { ADMIN } from "../../common/data";
import { IconButton, Typography } from "@mui/material";

function Sidebar() {
  const location = useLocation();

 // const [isActive, setisActive] = useState({home:true})
  const { user } = useContext(UserContext);
  console.log(location.pathname);
  return (
    <div className="Sidebar">
      <ul className="SidebarList">
        <div>
      <NavLink className="row" to="/home">
        <IconButton>
        {location.pathname==="/home" ? <HomeIcon className="sidebar-icon" style={{fontSize: "2.2rem"}}/> : <HomeOutlinedIcon className="sidebar-icon" style={{fontSize: "2.2rem"}}/>}
        <br/>
            <Typography className="sidebar-title"> Home</Typography>
            </IconButton>
          </NavLink>

          </div>
          <NavLink className="row" to="/busdata">
          <IconButton>
        {location.pathname==="/busdata" ? <DirectionsBusIcon className="sidebar-icon" style={{fontSize: "2.2rem"}}/> : <DirectionsBusFilledOutlinedIcon className="sidebar-icon" style={{fontSize: "2.2rem"}}/>}
            <Typography className="sidebar-title">Bus Data</Typography>
            </IconButton>
          </NavLink>
          <NavLink className="row" to="/metromap">
          <IconButton>
        {location.pathname==="/metromap" ? <TramIcon className="sidebar-icon" style={{fontSize: "2.2rem"}}/> : <TramOutlinedIcon className="sidebar-icon" style={{fontSize: "2.2rem"}}/>}
            <Typography className="sidebar-title">Metro Data</Typography>
            </IconButton>
          </NavLink>
          <NavLink className="row" to="/restaurants">
          <IconButton>
        {location.pathname==="/restaurants" ? <FastfoodIcon className="sidebar-icon" style={{fontSize: "2.2rem"}}/> : <FastfoodOutlinedIcon className="sidebar-icon" style={{fontSize: "2.2rem"}}/>}
            <Typography className="sidebar-title">Top Restaurants</Typography>
            </IconButton>          </NavLink>
          <NavLink className="row" to="/attractions">
          <IconButton>
        {location.pathname==="/attractions" ? <HikingIcon className="sidebar-icon" style={{fontSize: "2.2rem"}}/> : <HikingIcon className="sidebar-icon" style={{fontSize: "2.2rem"}}/>}
            <Typography className="sidebar-title">Top Attractions</Typography>
            </IconButton>          </NavLink>
          <NavLink className="row" to="/faq">
          <IconButton>
        {location.pathname==="/faq" ? <QuestionAnswerIcon className="sidebar-icon" style={{fontSize: "2.2rem"}}/> : <QuestionAnswerOutlinedIcon className="sidebar-icon" style={{fontSize: "2.2rem"}}/>}
            <Typography className="sidebar-title">FAQ</Typography>
            </IconButton>
          </NavLink>
          <NavLink className="row" to="/contributions">
          <IconButton>
        {location.pathname==="/contributions/userques" || location.pathname==="/contributions/userans"? <HomeIcon className="sidebar-icon" style={{fontSize: "2.2rem"}}/> : <HomeOutlinedIcon className="sidebar-icon" style={{fontSize: "2.2rem"}}/>}
            <Typography className="sidebar-title">Your Contributions</Typography>
            </IconButton>          
            </NavLink>

        {user.role === ADMIN && (
          <NavLink className="row" to="/admin">
            <IconButton>
        {/admin*/.test(location.pathname) ? <AdminPanelSettingsIcon className="sidebar-icon" style={{fontSize: "2.2rem"}}/> : <AdminPanelSettingsOutlinedIcon className="sidebar-icon" style={{fontSize: "2.2rem"}}/>}
            <Typography className="sidebar-title">Admin</Typography>
            </IconButton>
          </NavLink>
        )}
      </ul>
    </div>
  );
}

export default Sidebar;
