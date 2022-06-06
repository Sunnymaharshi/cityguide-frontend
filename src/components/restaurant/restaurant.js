import { Box } from "@mui/system";
import { useEffect, useState } from "react";
import { getRestaurants } from "../../services/dashboard/dashboard.service";
import MyCard from "../mycard/MyCard";
import { toast } from "react-toastify";

export default function Restaurant({ city }) {
  const [Restaurants, setRestaurants] = useState([]);
  const loadRestaurants = () => {
    if (city !== null) {
      getRestaurants(city)
        .then((res) => {
          setRestaurants(res.data);
        })
        .catch((err) => {
          toast.error(err.response.data, { autoClose: 5000 });
        });
    }
  };
  useEffect(() => {
    loadRestaurants();
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    loadRestaurants();
    // eslint-disable-next-line
  }, [city]);

  return (
    <div className="home-cards">
      <h2 className="attr-heading">
        Want to Explore The Best Restaurants in {city} city?
      </h2>
      <h3 className="attr-tagline">Here We Got Some For You</h3>
      {Restaurants.length === 0 && <p>Restaurants Not Found</p>}
      <div style={{ margin: "30px" }}>
        <Box display="grid" gridTemplateColumns="repeat(12, 1fr)" gap={2}>
          {Restaurants.map((p) => {
            return (
              <Box gridColumn="span 3" key={p.res_id}>
                <MyCard details={p} />
              </Box>
            );
          })}
        </Box>
      </div>
    </div>
  );
}
