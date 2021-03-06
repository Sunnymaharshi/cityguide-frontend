import React, { useContext, useEffect } from "react";
import { Route, Routes, Navigate, NavLink } from "react-router-dom";
import City from "../CRUDcity/City";
import UserContext from "../../context/user/user.context";
import "./AdminDashboard.css";
import Restaurant from "../CRUDrestaurants/Restaurant";
import Attraction from "../CRUDattractions/Attraction";
import Bus from "../CRUDbus/Bus";
import Metro from "../CRUDmetro/Metro";
import { ADMIN } from "../../common/data";
import Report from "../Report/Report";

function AdminDashboard() {
  const { user, checkUserLogin } = useContext(UserContext);

  useEffect(() => {
    checkUserLogin();
    // eslint-disable-next-line
  }, []);
  return (
    <div className="admin-comp">
      {user.role === ADMIN && (
        <div className="admin-content">
          <div className="admin-bar">
            <div className="admin-btns not-selectable">
              <NavLink to="/admin/city" className="admin-btn">
                Cities
              </NavLink>
              <NavLink to="/admin/restaurant" className="admin-btn">
                Restaurants
              </NavLink>
              <NavLink to="/admin/attraction" className="admin-btn">
                Attractions
              </NavLink>
              <NavLink to="/admin/bus" className="admin-btn">
                Bus
              </NavLink>
              <NavLink to="/admin/metro" className="admin-btn">
                Metro
              </NavLink>
              <NavLink to="/admin/report" className="admin-btn">
                Report
              </NavLink>
            </div>
          </div>

          <Routes>
            <Route path="/" element={<Navigate replace to="city" />} />
            <Route path="city" element={<City />} />
            <Route path="restaurant" element={<Restaurant />} />
            <Route path="attraction" element={<Attraction />} />
            <Route path="bus" element={<Bus />} />
            <Route path="metro" element={<Metro />} />
            <Route path="report" element={<Report />} />
          </Routes>
        </div>
      )}
      {user.role !== ADMIN && (
        <div className="unauthorised">Only admin can access this content!</div>
      )}
    </div>
  );
}

export default AdminDashboard;
