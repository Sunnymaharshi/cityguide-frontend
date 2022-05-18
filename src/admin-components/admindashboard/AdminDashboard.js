import React, { useContext, useEffect } from "react";
import City from "../CRUDcity/City";
import UserContext from "../../context/user/user.context";
import "./AdminDashboard.css";
import Restaurant from "../CRUDrestaurants/Restaurant";
import Attraction from "../CRUDattractions/Attraction";
function AdminDashboard() {
  const { user, checkUserLogin } = useContext(UserContext);

  useEffect(() => {
    checkUserLogin();
  }, []);
  return (
    <div className="admin-comp">
      {user.role === "Admin" && (
        <div className="admin-content">
          <div className="city-comp">
          <City />
          </div>
          <div className="rest-comp">
          <Restaurant/>
          </div>
          <div className="attr-comp">
          <Attraction/>
          </div>
        </div>
      )}
      {user.role !== "Admin" && (
        <div className="unauthorised">Only admin can access this content!</div>
      )}
    </div>
  );
}

export default AdminDashboard;
