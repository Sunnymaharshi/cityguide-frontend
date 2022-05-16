import React, { useState, useEffect, useContext } from "react";
import { Route, Routes } from "react-router-dom";
import Navbar from "../navbar/Navbar";
import Sidebar from "../sidenav/Sidebar";
import About from "../about/about";
import UserContext from "../../context/user/user.context";
import "./dashboard.css";
import Attraction from "../attraction/attraction";
import Restaurant from "../restaurant/restaurant";


function Dashboard() {
  const [city, setCity] = useState("City 1");
  const handleCity = (city) => {
    setCity(city);
  };
  const { checkUserLogin } = useContext(UserContext);

  useEffect(() => {
    checkUserLogin();
    // eslint-disable-next-line
  }, []);
  return (
    <>
      <Navbar handleCity={handleCity} />
      <div className="main">
        <Sidebar />
        <Routes>
          <Route path="/" element={<About city={city} />} />
          <Route path="/attractions" element={<Attraction city={city} />} />
          <Route path="/restaurants" element={<Restaurant city={city} />} />

        </Routes>
      </div>
    </>
  );
}

export default Dashboard;
