import React, { useState, useEffect } from "react";
import {
  deleteRestaurant,
  getRestaurants,
  postRestaurant,
  updateRestaurant,
} from "../../services/admin/restaurant.service";
import "./Restaurant.css";
import { toast } from "react-toastify";
import { FileUploaded } from "../FileUploaded/FileUploaded";

function Restaurant() {
  const [res_name, setResName] = useState("");
  const [description, setDesc] = useState("");
  const [res_location, setResLoc] = useState("");
  const [res_image, setResImage] = useState("");
  const [city_name, setCityName] = useState("");
  const [res_id, setResId] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const [restaurant, setRestaurants] = useState([]);

  useEffect(() => {
    getAllRestaurants();
  }, []);

  const getAllRestaurants = async (event) => {
    getRestaurants()
      .then((res) => {
        setRestaurants(res.data);
        console.log(res.data);
      })
      .catch((err) => {
        console.log("Error", err);
      });
  };

  const sendDataToAPI = async (event) => {
    event.preventDefault();
    postRestaurant(res_name,description, res_location, city_name,res_image)
      .then(function (response) {
        if (response.data.res_name == res_name) {
          toast.success("Successfully Added!");
          setResName("");
          setDesc("");
          setResLoc("");
          setCityName("");
          setResImage("");
          getAllRestaurants();
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const updateDataToAPI = async (event) => {
    event.preventDefault();
    updateRestaurant(res_id, description, res_location, city_name,res_image)
      .then(function (response) {
        if (response.data.res_name == res_name) {
          toast.success("Successfully Updated!");
          setResName("");
          setDesc("");
          setResLoc("");
          setCityName("");
          setResId("");
          setResImage("");
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
          toast.success("Successfully Deleted!");
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
        <div className="attr-form">
          <form>
            <h2 className="rest-op">Restaurant Operations</h2>
            <div className="form-row">
            <div className="form-group col">
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
            <div className="form-group col">
              <label htmlFor="resdesc">Restaurant Description</label>
              <input
                onChange={(e) => setDesc(e.target.value)}
                type="text"
                name="resdesc"
                placeholder="Restaurant Description"
                id="resdesc"
                value={description}
                className="form-control"
              />
            </div>
            </div>
            <div className="form-row">
            <div className="form-group col">
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
            <FileUploaded
                onFileSelect={(file) => setSelectedFile(file)}
            />
            <button className="delete-btn" style={{marginTop:"0.5rem"}}>Upload</button>
            </div>
            
     
     <div className="form-group col">
     <label htmlFor="resimage">Restaurant Image</label>
            <input
             
             type="text"
              name="resimage"
              placeholder="Restaurant Image"
              id="resimage"
              value={res_image}
              className="form-control"
            />
              <button
                type="submit"
                className="delete-btn"
                style={{marginTop:"0.5rem"}}
                disabled={!city_name || !res_image}
               
              >
                Get URL
              </button>
          </div>
          
          </div>
       

            <div className="btn-main">
          
                <button
                  type="submit"
                  className="add-btn"
                  disabled={!res_name || !res_location || !city_name ||!description}
                  onClick={sendDataToAPI}
                >
                  Add
                </button>
            </div>
            <div className="form-row">
            <div className="form-group col">
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
            <div className="form-group col idbtn">
                  <button
                    type="submit"
                    className="delete-btn"
                    disabled={!res_name || !res_location || !city_name || !res_id || !description}
                    onClick={updateDataToAPI}
                  >
                    Update
                  </button>
              </div>
              <div className="form-group col idbtn">
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
            {/* <div className="form-group">
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
                      !res_name || !res_location || !city_name || !res_id || !description
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
            </div> */}
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
                <th>Description</th>
                <th>City</th>
              </tr>
              {restaurant.map((rest) => {
                return (
                  <tr key={rest.res_id}>
                    <td>{rest.res_id}</td>
                    <td>{rest.res_name}</td>
                    <td>{rest.res_location}</td>
                    <td>{rest.description}</td>
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
