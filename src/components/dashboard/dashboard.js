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
import Contributions from "../contributions/contributions";
import "./dashboard.css";
import CityModal from "../citymodal/CityModal";
import { AnimatePresence } from "framer-motion";
import { getCityFromLocal, isCitySelected } from "../../common/functions";
import Metro from "../metro/metro";
import Bus from "../bus/Bus";
function Dashboard() {
  const [city, setCity] = useState(null);
  const [modal, setModal] = useState(false);
  const close = () => setModal(false);
  const open = () => setModal(true);
  const handleCity = (city) => {
    setCity(city);
  };
  const { checkUserLogin } = useContext(UserContext);

  useEffect(() => {
    checkUserLogin();
    if (!isCitySelected()) {
      setModal(true);
    } else {
      const selected_city = getCityFromLocal();
      setCity(selected_city);
    }
    // eslint-disable-next-line
  }, []);

  return (
    <>
      <AnimatePresence initial={false} exitBeforeEnter={true}>
        {modal && <CityModal handleClose={close} setCity={setCity} />}
      </AnimatePresence>
      <Navbar handleCity={handleCity} openModal={open} city={city} />
      <div className="main">
        <Sidebar />
        <div className="main-content">
          <Routes>
            <Route path="/" element={<Navigate replace to="home" />} />
            <Route path="home" element={<About city={city} />} />
            <Route path="attractions" element={<Attraction city={city} />} />
            <Route path="restaurants" element={<Restaurant city={city} />} />
            <Route path="admin/*" element={<AdminDashboard />} />
            <Route path="faq" element={<Questions city={city} />} />
            <Route path="answers/:id" element={<Answers />} />
            <Route path="contributions/*" element={<Contributions />} />
            <Route path="metromap" element={<Metro city={city}/>} />
            <Route path="busdata" element={<Bus city={city}/>}/>

          </Routes>
        </div>
      </div>
    </>
  );
}

export default Dashboard;
