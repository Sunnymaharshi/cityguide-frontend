import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { getCities } from "../../services/dashboard/dashboard.service";
import "./CityModal.css";
import Backdrop from "../backdrop/Backdrop";
import { toast } from "react-toastify";
import { Skeleton } from "@mui/material";
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
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    getCities()
      .then((res) => {
        if (res.data.length > 0) {
          setCities(res.data);
          setLoading(false);
        }
      })
      .catch((err) => {
        toast.error("Error fetching cities!");
        // setLoading(false);
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
          <div style={{ fontSize: "large" }}>Choose a city</div>
          {loading && (
            <div
              style={{
                display: "flex",
                justifyContent: "space-around",
                width: "100%",
                paddingTop: "10px",
              }}
            >
              <Skeleton variant="rectangular" width={100} height={40} />

              <Skeleton variant="rectangular" width={100} height={40} />

              <Skeleton variant="rectangular" width={100} height={40} />
              <Skeleton variant="rectangular" width={100} height={40} />
            </div>
          )}
          <div className="cities-row">
            {!loading &&
              cities.map((city) => {
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
        </div>
      </motion.div>
    </Backdrop>
  );
}

export default CityModal;
