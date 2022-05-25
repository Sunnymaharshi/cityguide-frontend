import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { getCities } from "../../services/dashboard/dashboard.service";
import "./CityModal.css";
import Backdrop from "../backdrop/Backdrop";
const dropIn = {
  hidden: {
    y: "-100vh",
    opacity: 0,
  },
  visible: {
    y: "70px",
    opacity: 1,
  },
  exit: {
    y: "100vh",
    opacity: 0,
  },
};
function CityModal({ handleClose, setCity }) {
  const [cities, setCities] = useState([]);
  useEffect(() => {
    getCities()
      .then((res) => {
        if (res.data.length > 0) {
          setCities(res.data);
        }
      })
      .catch((err) => {
        console.log("city names error", err);
      }); // eslint-disable-next-line
  }, []);

  const handleSelect = (e) => {
    setCity(e.target.value);
    localStorage.setItem("city", e.target.value);
    handleClose();
  };
  return (
    <Backdrop onClick={handleClose}>
      <motion.div
        onClick={(e) => e.stopPropagation()}
        className="modal"
        variants={dropIn}
        initial="hidden"
        animate="visible"
        exit="exit"
      >
        <div className="modal-content">
          {cities.map((city) => {
            return (
              <option
                className="city"
                key={city}
                onClick={handleSelect}
                value={city}
              >
                {city}
              </option>
            );
          })}
        </div>
      </motion.div>
    </Backdrop>
  );
}

export default CityModal;
