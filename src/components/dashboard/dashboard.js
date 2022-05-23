import React, { useState, useEffect, useContext } from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import Navbar from "../navbar/Navbar";
import Sidebar from "../sidenav/Sidebar";
import About from "../about/about";
import UserContext from "../../context/user/user.context";
import Attraction from "../attraction/attraction";
import Restaurant from "../restaurant/restaurant";
import AdminDashboard from "../../admin-components/admindashboard/AdminDashboard";
import Questions from "../Q-A/questions/Questions";
import Answers from "../Q-A/answers/Answers";
import Contributions from "../contributions/contributions"
import "./dashboard.css";

function Dashboard() {
  const [city, setCity] = useState("Bangalore");

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
        <div className="main-content">
          <Routes>
            <Route path="/" element={<Navigate replace to="dashboard" />} />
            <Route path="dashboard" element={<About city={city} />} />
            <Route path="attractions" element={<Attraction city={city} />} />
            <Route path="restaurants" element={<Restaurant city={city} />} />
            <Route path="admin/*" element={<AdminDashboard />} />
            <Route path="faq" element={<Questions city={city} />} />
            <Route path="answers/:id" element={<Answers />} />
            <Route path="contributions/*" element={<Contributions />} />
          </Routes>
        </div>
      </div>
    </>
  );
}

export default Dashboard;
