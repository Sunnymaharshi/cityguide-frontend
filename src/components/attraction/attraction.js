import axios from "axios";
import { useEffect, useState } from "react";
import Card from "../card/card";


export default function Attraction({ city }) {
    const [Attractions, setAttractions] = useState([]);
    useEffect(() => {
        axios
          .get("http://localhost:8080/getattr/"+city)
          .then((res) => {
            if (!res.data.length) return <div>No data</div>;
            else if (res.data.length > 0) {
                  setAttractions(res.data);
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
        {Attractions.map(p => {
              return (
                <Card details={p}/>
              );
            })}
    </div>
    );
  }