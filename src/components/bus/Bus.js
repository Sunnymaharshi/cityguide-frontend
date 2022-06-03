import React, { useState, useEffect } from "react";
import "./Bus.css";
import { toast } from "react-toastify";
import { Skeleton } from "@mui/material";
import { getBus } from "../../services/dashboard/dashboard.service";

function Bus({ city }) {
  const [isLoading, setIsLoading] = useState(true);
  const [bus, setBus] = useState([]);
  const [query, setQuery] = useState("");
  const [result, setResult] = useState([]);
  useEffect(() => {
    getAllBus();
    // eslint-disable-next-line
  }, [city]);

  const handleQuery = (e) => {
    setQuery(e.target.value);
    if (e.target.value.trim() === "") {
      setResult([]);
    }
  };
  const handleSearch = () => {
    if (query.trim().length > 0) {
      const filtered_buses = bus.filter((b) =>
        b.bus_routes.toLowerCase().includes(query.toLowerCase())
      );
      if (filtered_buses.length === 0) toast.info("Buses not found");
      setResult(filtered_buses);
    } else toast.error("Query can't be empty!");
  };
  const getAllBus = async (event) => {
    getBus(city)
      .then((res) => {
        setTimeout(() => setIsLoading(false), 1200);
        setBus(res.data);
      })
      .catch((err) => {
        console.log("Error", err);
      });
  };
  return (
    <div className="bus-table">
      <div className="bus-search">
        <input
          type="search"
          className="bus-search-bar"
          placeholder="Search Buses"
          onChange={handleQuery}
        />

        <button onClick={handleSearch} className="bus-search-btn">
          Search
        </button>
      </div>
      <table id="bustable">
        <tbody>
          <tr>
            <th>Bus Codes</th>
            <th>Bus Routes</th>
            <th>Source</th>
            <th>Destination</th>
          </tr>
          {isLoading && (
            <>
              <tr>
                <td>
                  <Skeleton height={30} />
                </td>
                <td>
                  <Skeleton height={30} />
                </td>
                <td>
                  <Skeleton height={30} />
                </td>
                <td>
                  <Skeleton height={30} />
                </td>
              </tr>
              <tr>
                <td>
                  <Skeleton height={30} />
                </td>
                <td>
                  <Skeleton height={30} />
                </td>
                <td>
                  <Skeleton height={30} />
                </td>
                <td>
                  <Skeleton height={30} />
                </td>
              </tr>
              <tr>
                <td>
                  <Skeleton height={30} />
                </td>
                <td>
                  <Skeleton height={30} />
                </td>
                <td>
                  <Skeleton height={30} />
                </td>
                <td>
                  <Skeleton height={30} />
                </td>
              </tr>
              <tr>
                <td>
                  <Skeleton height={30} />
                </td>
                <td>
                  <Skeleton height={30} />
                </td>
                <td>
                  <Skeleton height={30} />
                </td>
                <td>
                  <Skeleton height={30} />
                </td>
              </tr>
            </>
          )}
          {!isLoading &&
            result.length === 0 &&
            bus.map((bus) => {
              return (
                <tr key={bus.bus_id}>
                  <td>{bus.bus_codes}</td>
                  <td>{bus.bus_routes}</td>
                  <td>{bus.source}</td>
                  <td>{bus.destination}</td>
                </tr>
              );
            })}
          {!isLoading &&
            result.length > 0 &&
            result.map((bus) => {
              return (
                <tr key={bus.bus_id}>
                  <td>{bus.bus_codes}</td>
                  <td>{bus.bus_routes}</td>
                  <td>{bus.source}</td>
                  <td>{bus.destination}</td>
                </tr>
              );
            })}
        </tbody>
      </table>
    </div>
  );
}

export default Bus;
