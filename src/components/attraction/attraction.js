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
      <p>Hello from {city} city!!</p>
      {Attractions.length === 0 && <p>No Attractions Found</p>}
      {Attractions.map((p) => {
        return <Card details={p} key={p.attr_id} />;
      })}
    </div>
  );
}
