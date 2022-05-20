import { useEffect, useState } from "react";
import Card from "../card/card";
import { getRestaurants } from "../../services/dashboard/dashboard.service";

export default function Restaurant({ city }) {
  const [Restaurants, setRestaurants] = useState([]);
  useEffect(() => {
    getRestaurants(city)
      .then((res) => {
        setRestaurants(res.data);
      })
      .catch((err) => {
        console.log("rest error", err);
      }); // eslint-disable-next-line
  }, [city]);

  return (
    <div className="home-cards">
      <h2 className="attr-heading">Want to Explore The Best Restaurants in {city} city?</h2>
      <h3 className="attr-tagline">Here We Got Some For You</h3>      
      {Restaurants.length === 0 && <p>Restaurants Not Found</p>}

      {Restaurants.map((p) => {
        return <Card details={p} key={p.res_id}/>;
      })}
    </div>
  );
}
