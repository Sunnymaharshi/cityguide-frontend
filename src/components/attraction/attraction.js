import { useEffect, useState } from "react";
import Card from "../card/card";
import { getAttractions } from "../../services/dashboard/dashboard.service";

export default function Attraction({ city }) {
  const [Attractions, setAttractions] = useState([]);
  useEffect(() => {
    getAttractions(city)
      .then((res) => {
        setAttractions(res.data);
      })
      .catch((err) => {
        console.log("error", err);
      }); // eslint-disable-next-line
  }, [city]);

  return (
    <div className="home-cards">
      <h2 className="attr-heading">
        Want to Explore The Best Attractions in {city} city?
      </h2>
      <h3 className="attr-tagline">Here We Got Some For You</h3>
      {Attractions.length === 0 && <p>No Attractions Found</p>}
      {Attractions.map((p) => {
        return <Card details={p} key={p.attr_id} />;
      })}
    </div>
  );
}
