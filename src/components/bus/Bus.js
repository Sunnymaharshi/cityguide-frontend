import React, { useState, useEffect } from "react";
import "./Bus.css";
import { toast } from "react-toastify";
import { Skeleton } from "@mui/material";
import { getBus } from "../../services/dashboard/dashboard.service";

function Bus({city}) {
  const [isLoading,setIsLoading]=useState(true);
  const [bus, setBus] = useState([]);

  useEffect(() => {
    getAllBus();

  }, [city]);

  const getAllBus = async (event) => {
    getBus(city)
      .then((res) => {
        setTimeout(() => setIsLoading(false), 1200)
        setBus(res.data);
      })
      .catch((err) => {
        console.log("Error", err);
      });
  };
  return (
    <div className="bus-table">
    <table id="bustable">
      <tbody>
        <tr>
          <th>Id</th>
          <th>Bus Codes</th>
          <th>Bus Routes</th>
          <th>Source</th>
          <th>Destination</th>
          <th>City</th>
        </tr>
        {
        isLoading && <><tr>
        <td><Skeleton  height={30}/></td>
        <td><Skeleton  height={30}/></td>
        <td><Skeleton  height={30}/></td>
        <td><Skeleton  height={30}/></td>
        <td><Skeleton  height={30}/></td>
        <td><Skeleton  height={30}/></td>
        </tr>
        <tr>
        <td><Skeleton  height={30}/></td>
        <td><Skeleton  height={30}/></td>
        <td><Skeleton  height={30}/></td>
        <td><Skeleton  height={30}/></td>
        <td><Skeleton  height={30}/></td>
        <td><Skeleton  height={30}/></td>
        </tr>
        <tr>
        <td><Skeleton  height={30}/></td>
        <td><Skeleton  height={30}/></td>
        <td><Skeleton  height={30}/></td>
        <td><Skeleton  height={30}/></td>
        <td><Skeleton  height={30}/></td>
        <td><Skeleton  height={30}/></td>
        </tr>
        <tr>
        <td><Skeleton  height={30}/></td>
        <td><Skeleton  height={30}/></td>
        <td><Skeleton  height={30}/></td>
        <td><Skeleton  height={30}/></td>
        <td><Skeleton  height={30}/></td>
        
        </tr>
        </>
      }
        {!isLoading && bus.map((bus) => {
          return (
            <tr key={bus.bus_id}>
              <td>{bus.bus_id}</td>
              <td>{bus.bus_codes}</td>
              <td>{bus.bus_routes}</td>
              <td>{bus.source}</td>
              <td>{bus.destination}</td>
              <td>{bus.city_name}</td>
            </tr>
          ); 
         }
         )}
      </tbody>
    </table>
  </div>
  )
}

export default Bus