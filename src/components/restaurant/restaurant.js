import axios from "axios";
import { useEffect, useState } from "react";
import Card from "../card/card";


export default function Restaurant({ city }) {
    const [Restaurants, setRestaurants] = useState([]);
    useEffect(() => {
        axios
          .get("http://localhost:8080/getrest/"+city)
          .then((res) => {
            if (!res.data.length) return <div>No data</div>;
            else if (res.data.length > 0) {
                  setRestaurants(res.data);
            }
          })
          .catch((err) => {
            console.log("error", err);
          }); // eslint-disable-next-line
      }, [city]);

    return ( 
        <div className="home-cards">
        {city}
        <p>Hello from {city} city!!</p>
        {Restaurants.map(p => {
              return (
                <Card details={p}/>
              );
            })}
    </div>
    );
  }