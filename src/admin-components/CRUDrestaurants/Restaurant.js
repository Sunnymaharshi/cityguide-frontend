import React, { useState, useEffect } from "react";
import {
  deleteRestaurant,
  getRestaurants,
  postRestaurant,
  updateRestaurant,
} from "../../services/admin/restaurant.service";
import "./Restaurant.css";

function Restaurant() {
  const [res_name, setResName] = useState("");
  const [res_location, setResLoc] = useState("");
  const [city_name, setCityName] = useState("");
  const [res_id, setResId] = useState("");
  const [successMsg, setSuccessMsg] = useState(null);
  const [restaurant, setRestaurants] = useState([]);

  useEffect(() => {
    getAllRestaurants();
  }, []);

  const getAllRestaurants = async (event) => {
    getRestaurants()
      .then((res) => {
        setRestaurants(res.data);
      })
      .catch((err) => {
        console.log("Error", err);
      });
  };

  const sendDataToAPI = async (event) => {
    event.preventDefault();
    postRestaurant(res_name, res_location, city_name)
      .then(function (response) {
        if (response.data.res_name == res_name) {
          setSuccessMsg("Successfully Added!");
          setResName("");
          setResLoc("");
          setCityName("");
          getAllRestaurants();
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const updateDataToAPI = async (event) => {
    event.preventDefault();
    updateRestaurant(res_id, res_name, res_location, city_name)
      .then(function (response) {
        if (response.data.res_name == res_name) {
          setSuccessMsg("Successfully Updated!");
          setResName("");
          setResLoc("");
          setCityName("");
          setResId("");
          getAllRestaurants();
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const onDelete = async (event) => {
    event.preventDefault();
    deleteRestaurant(res_id)
      .then(function (response) {
        if (response.data === "Deleted!") {
          setSuccessMsg("Successfully Deleted!");
          setResId("");
          getAllRestaurants();
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  return (
    <>
      <div className="rest-div">
        <div className="res-form">
          <form>
            <h2 className="rest-op">Restaurant Operations</h2>

            <div className="form-group">
              <label htmlFor="resname">Restaurant Name</label>
              <input
                onChange={(e) => setResName(e.target.value)}
                type="text"
                name="resname"
                placeholder="Restaurant Name"
                id="restname"
                value={res_name}
                className="form-control"
              />
            </div>
            <div className="form-group">
              <label htmlFor="resloc">Restaurant Location</label>
              <input
                onChange={(e) => setResLoc(e.target.value)}
                type="text"
                name="resloc"
                placeholder="Restaurant Location"
                id="resloc"
                value={res_location}
                className="form-control"
              />
            </div>
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

            <div className="btn-main">
              <div className="add-button">
                <button
                  type="submit"
                  className="delete-btn"
                  disabled={!res_name || !res_location || !city_name}
                  onClick={sendDataToAPI}
                >
                  Add
                </button>
              </div>
            </div>
            <div className="form-group">
              <label htmlFor="resid">Restaurant Id</label>
              <input
                onChange={(e) => setResId(e.target.value)}
                type="text"
                name="resid"
                placeholder="Restaurant Id"
                id="resid"
                value={res_id}
                className="form-control"
              />
            </div>
            <div className="btn-main">
              <div className="update-btn">
                <span>
                  <button
                    type="submit"
                    className="delete-btn"
                    disabled={
                      !res_name || !res_location || !city_name || !res_id
                    }
                    onClick={updateDataToAPI}
                  >
                    Update
                  </button>
                </span>
              </div>
              <div className="">
                <button
                  type="submit"
                  className="delete-btn"
                  disabled={!res_id}
                  onClick={onDelete}
                >
                  Delete
                </button>
              </div>
            </div>
            <p>
              <b>{successMsg}</b>
            </p>
          </form>
        </div>
        <div className="res-table">
          <h2 className="rest-det">Restaurant Details</h2>
          <table id="resttable">
            <tbody>
              <tr>
                <th>Id</th>
                <th>Name</th>
                <th>Location</th>
                <th>City</th>
              </tr>
              {restaurant.map((rest) => {
                return (
                  <tr key={rest.res_id}>
                    <td>{rest.res_id}</td>
                    <td>{rest.res_name}</td>
                    <td>{rest.res_location}</td>
                    <td>{rest.city_name}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

export default Restaurant;
