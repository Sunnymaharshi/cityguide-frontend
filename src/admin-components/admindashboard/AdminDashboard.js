import React, { useContext, useEffect } from "react";
import { Route, Routes, Navigate, NavLink } from "react-router-dom";
import City from "../CRUDcity/City";
import UserContext from "../../context/user/user.context";
import "./AdminDashboard.css";
import Restaurant from "../CRUDrestaurants/Restaurant";
import Attraction from "../CRUDattractions/Attraction";
function AdminDashboard() {
  const { user, checkUserLogin } = useContext(UserContext);

  useEffect(() => {
    checkUserLogin();
    // eslint-disable-next-line
  }, []);
  return (
    <div className="admin-comp">
      {user.role === "Admin" && (
        <div className="admin-content">
          <div className="admin-btns">
            <NavLink to="/admin/city" className="admin-btn">
              Cities
            </NavLink>
            <NavLink to="/admin/restaurant" className="admin-btn">
              Restaurants
            </NavLink>
            <NavLink to="/admin/attraction" className="admin-btn">
              Attractions
            </NavLink>
          </div>
          <Routes>
            <Route path="/" element={<Navigate replace to="city" />} />
            <Route path="city" element={<City />} />
            <Route path="restaurant" element={<Restaurant />} />
            <Route path="attraction" element={<Attraction />} />
          </Routes>
        </div>
      )}
      {user.role !== "Admin" && (
        <div className="unauthorised">Only admin can access this content!</div>
      )}
    </div>
  );
}

export default AdminDashboard;
