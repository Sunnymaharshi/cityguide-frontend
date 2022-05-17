import React, { useState} from "react";
import axios from "axios";
import "./City.css";

function City() {
  const [city_name, setCityName] = useState("");
  const [city_desc, setDesc] = useState("");
  const [successMsg, setSuccessMsg] = useState(null);
  console.log(city_name);
  console.log(city_desc);

  const sendDataToAPI = async (event) => {
    event.preventDefault();
    const userDetails = JSON.parse(localStorage.getItem("user"));
    await axios
      .post(
        "http://localhost:8080/addcity",
        {
          city_name,
          city_desc,
        },
        {
          headers: {
            Authorization: "Bearer " + userDetails.token,
          },
        }
      )
      .then(function (response) {
        if (response.data.city_name === city_name)
          setSuccessMsg("Successfully Added!");
        setCityName("");
        setDesc("");

        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const updateDataToAPI = async (event) => {
    event.preventDefault();
    const userDetails = JSON.parse(localStorage.getItem("user"));
    await axios
      .put(
        "http://localhost:8080/updatecity",
        {
          city_name,
          city_desc,
        },
        {
          headers: {
            Authorization: "Bearer " + userDetails.token,
          },
        }
      )
      .then(function (response) {
        if (response.data.city_name === city_name)
          setSuccessMsg("Successfully Updated!");
        setCityName("");
        setDesc("");
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const onDelete = async (event) => {
    event.preventDefault();
    const userDetails = JSON.parse(localStorage.getItem("user"));
    await axios
      .delete(`http://localhost:8080/deletecity/${city_name}`, {
        headers: {
          Authorization: "Bearer " + userDetails.token,
        },
      })
      .then(function (response) {
        if (response.data === "Deleted!")
          setSuccessMsg("Successfully Deleted!");
        setCityName("");
        setDesc("");
        console.log(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  return (
    <div className="city-form">
      <form>
        <h1>City Operations</h1>

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
          <div className="add-btn">
            <button
              type="submit"
              className="delete-btn"
              onClick={sendDataToAPI}
            >
              Add
            </button>
          </div>
          <div className="update-btn">
            <button
              type="submit"
              className="delete-btn"
              onClick={updateDataToAPI}
            >
              Update
            </button>
          </div>
          <div className="">
            <button type="submit" className="delete-btn" onClick={onDelete}>
              Delete
            </button>
          </div>
        </div>
        <p>
          <b>{successMsg}</b>
        </p>
      </form>
    </div>
  );
}

export default City;
