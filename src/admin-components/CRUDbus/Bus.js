import React, { useState , useEffect} from "react";
import { toast } from "react-toastify";
import { motion } from "framer-motion";
import {
  deleteBus,
  postBus,
  getBuses
} from "../../services/admin/bus.service";
import "./Bus.css";
import { Skeleton } from "@mui/material";


function Bus() {
  const [bus_id, setBusId]=useState("");
  const [city_name, setCityName] = useState("");
  const [bus_codes, setBusCodes] = useState("");
  const [bus_routes, setBusRoutes] = useState("");
  const [source, setSource]= useState("");
  const [destination, setDestination]=useState("");
  const [isLoading,setIsLoading]=useState(true);
  const [bus, setBus] = useState([]);

  useEffect(() => {
    getAllBus();
  },[]);
  const getAllBus = async (event) => {
    getBuses()
      .then((res) => {
        console.log(res);
        setTimeout(() => setIsLoading(false), 1200)
        setBus(res.data);
      })
      .catch((err) => {
        toast.error(err.response.data, { autoClose: 5000 });
      });
  };

  const sendDataToAPI = async (event) => {
   
    event.preventDefault();
    if(city_name && destination&& bus_codes && bus_routes && source){
    postBus(bus_codes,bus_routes,source, destination,city_name)
      .then((response) => {
        console.log(response);
        console.log(response.data);
        toast.success("Bus Succesfully Added!");
        setBusCodes("");
        setBusRoutes("");
        setSource("");
        setDestination("");
        setCityName("");
        getAllBus();
        if (response.data.body=== "Bus Added") {
          console.log(response);
         
        }
      })
      .catch((err) => {
        toast.error(err.response.data, { autoClose: 5000 });
      });
    }
    else{
      toast.error("Enter the city name, desc and image field!")
    }
  };
  const onDelete = async (event) => {
    event.preventDefault();
    if(bus_id){
    deleteBus(bus_id)
      .then((response) => {
      
          toast.success("Bus Successfully Deleted!");
          setBusId("");
          getAllBus();
      })
      .catch((err) => {
        toast.error(err.response.data, { autoClose: 5000 })})}
    else{
      toast.error("Enter City Name!");
    }
  };

  return (
    <div className="city-div">
    <div className="city-form">
      <form>
        <h2 className="city-op">Bus Operations</h2>
        <div className="form-row">
        <div className="form-group col">
          <label htmlFor="codes">Bus Codes</label>
          <input
            onChange={(e) => setBusCodes(e.target.value)}
            type="text"
            name="codes"
            placeholder="Bus Codes"
            id="codes"
            value={bus_codes}
            className="form-control"
          />
        </div>
        <div className="form-group col">
          <label htmlFor="cityname">City Name</label>
          <input
            onChange={(e) => setCityName(e.target.value)}
            type="text"
            name="cityname"
            placeholder="City Name"
            id="cityname"
            value={city_name}
            className="form-control"
          />
        </div>
        </div>
        <div className="form-row">
        <div className="form-group col">
          <label htmlFor="source">Source</label>
          <input
            onChange={(e) => setSource(e.target.value)}
            type="text"
            name="source"
            placeholder="Source"
            id="source"
            value={source}
            className="form-control"
          />
        </div>
        <div className="form-group col">
          <label htmlFor="destination">Destination</label>
          <input
            onChange={(e) => setDestination(e.target.value)}
            type="text"
            name="destination"
            placeholder="Destination"
            id="destination"
            value={destination}
            className="form-control"
          />
        </div>
        </div>
       
        <div className="form-group">
          <label htmlFor="routes">Bus Routes</label>
          <input
            onChange={(e) => setBusRoutes(e.target.value)}
            type="text"
            name="routes"
            placeholder="Bus Routes"
            id="routes"
            value={bus_routes}
            className="form-control"
          />
        </div>

        <div className="btn-main">
          <motion.button
            type="submit"
            className="add-btn"
            onClick={sendDataToAPI}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
          >
            Add
          </motion.button>
        </div>
        <div className="form-row">
        <div className="form-group col">
          <label htmlFor="busid">Bus Id</label>
          <input
            onChange={(e) => setBusId(e.target.value)}
            type="text"
            name="busid"
            placeholder="Bus Id"
            id="busid"
            value={bus_id}
            className="form-control"
          />
        </div>
        <div className="form-group col btn-main">
          <motion.button
            type="submit"
            style={{marginTop:"1.5rem"}}
            className="add-btn"
            onClick={onDelete}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
          >
            Delete
          </motion.button>
        </div>
        </div>
      </form>
    </div>
    <div className="city-table">
    <table id="citytable">
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
        <td><Skeleton  height={30}/></td>
        </tr>
        </>
      }
        {!isLoading && bus.map((bus) => {
          return (
            <tr key={bus.bus_id}>
              <td >{bus.bus_id}</td>
              <td>{bus.bus_codes}</td>
              <td>{bus.bus_routes}</td>
              <td >{bus.source}</td>
              <td >{bus.destination}</td>
              <td >{bus.city_name}</td>
            </tr>
          ); 
         }
         )}
      </tbody>
    </table>
  </div>
    </div>
  );
}

export default Bus;
