import React, { useState, useEffect } from "react";
import "./City.css";
import {
  deleteCity,
  getCity,
  postCity,
  updateCity,
} from "../../services/admin/city.service";
import { toast } from "react-toastify";

function City() {
  const [city_name, setCityName] = useState("");
  const [city_desc, setDesc] = useState("");
  const [city, setCity] = useState([]);

  useEffect(() => {
    getAllCities();
  }, []);

  const getAllCities = async (event) => {
    getCity()
      .then((res) => {
        setCity(res.data);
      })
      .catch((err) => {
        console.log("Error", err);
      });
  };

  const sendDataToAPI = async (event) => {
    event.preventDefault();
    postCity(city_name, city_desc)
      .then(function (response) {
        if (response.data.city_name === city_name) {
          // setSuccessMsg("Successfully Added!");
          toast.success("Successfully Added");
          setCityName("");
          setDesc("");
          getAllCities();
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const updateDataToAPI = async (event) => {
    event.preventDefault();
    updateCity(city_name, city_desc)
      .then(function (response) {
        if (response.data.city_name === city_name) {
          toast.success("Successfully Updated!");
          setCityName("");
          setDesc("");
          getAllCities();
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const onDelete = async (event) => {
    event.preventDefault();
    deleteCity(city_name)
      .then(function (response) {
        if (response.data === "Deleted!") {
          toast.success("Successfully Deleted!");
          setCityName("");
          setDesc("");
          getAllCities();
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  return (
    <div className="city-div">
      <div className="city-form">
        <form>
          <h1 className="city-op">City Operations</h1>

          <div className="form-group">
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
          <div className="form-group">
            <label htmlFor="citydesc">City Description</label>
            <input
              onChange={(e) => setDesc(e.target.value)}
              type="text"
              name="citydesc"
              placeholder="City Description"
              id="citydesc"
              value={city_desc}
              className="form-control"
            />
          </div>

          <div className="btn-main">
            <div className="add-button">
              <button
                type="submit"
                className="delete-btn"
                disabled={!city_name || !city_desc}
                onClick={sendDataToAPI}
              >
                Add
              </button>
            </div>
            <div className="update-btn">
              <button
                type="submit"
                className="delete-btn"
                disabled={!city_name || !city_desc}
                onClick={updateDataToAPI}
              >
                Update
              </button>
            </div>
            <div className="">
              <button
                type="submit"
                className="delete-btn"
                disabled={!city_name}
                onClick={onDelete}
              >
                Delete
              </button>
            </div>
          </div>
        </form>
      </div>
      <div className="city-table">
        <h2 className="city-det">City Details</h2>
        <table id="citytable">
          <tbody>
            <tr>
              <th>Name</th>
              <th>Description</th>
            </tr>
            {city.map((c) => {
              return (
                <tr key={c.city_name}>
                  <td>{c.city_name}</td>
                  <td>{c.city_desc}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default City;
