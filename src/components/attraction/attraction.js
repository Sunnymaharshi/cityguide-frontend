import { useEffect, useState } from "react";
import { getAttractions } from "../../services/dashboard/dashboard.service";
import MyCard from "../mycard/MyCard";
import { Box } from "@mui/system";
import "./attraction.css";
import { toast } from "react-toastify";
export default function Attraction({ city }) {
  const [Attractions, setAttractions] = useState([]);
  const loadAttractions = () => {
    if (city !== null) {
      getAttractions(city)
        .then((res) => {
          setAttractions(res.data);
        })
        .catch((err) => {
          toast.error(err.response.data, { autoClose: 5000 });
        });
    }
  };

  useEffect(() => {
    loadAttractions();
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    loadAttractions();
    // eslint-disable-next-line
  }, [city]);

  return (
    <div className="home-cards">
      <h2 className="attr-heading">
        Want to Explore The Best Attractions in {city} city?
      </h2>
      <h3 className="attr-tagline">Here We Got Some For You</h3>
      {Attractions.length === 0 && <p>No Attractions Found</p>}
      <div style={{ margin: "30px" }}>
        <Box display="grid" gridTemplateColumns="repeat(12, 1fr)" gap={2}>
          {Attractions.map((p) => {
            return (
              <Box gridColumn="span 3" key={p.attr_id}>
                <MyCard details={p} />
              </Box>
            );
          })}
        </Box>
      </div>
    </div>
  );
}
