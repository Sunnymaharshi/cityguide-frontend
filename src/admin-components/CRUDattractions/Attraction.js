import React, { useState, useEffect } from "react";
import {
  deleteAttraction,
  getAttractions,
  postAtrraction,
  updateAttraction,
} from "../../services/admin/attraction.service";
import "./Attraction.css";
import { toast } from "react-toastify";

function Attraction() {
  const [attr_name, setAttrName] = useState("");
  const [description, setDesc] = useState("");
  const [attr_loc, setAttrLoc] = useState("");
  const [attr_img, setAttrImg] = useState("");
  const [city_name, setCityName] = useState("");
  const [attr_id, setAttrId] = useState("");
  const [attraction, setAttractions] = useState([]);

  useEffect(() => {
    getAllAttractions();
  }, []);

  const getAllAttractions = async (event) => {
    getAttractions()
      .then((res) => {
        setAttractions(res.data);
      })
      .catch((err) => {
        console.log("Error", err);
      });
  };

  const sendDataToAPI = async (event) => {
    event.preventDefault();
    postAtrraction(attr_name, description, attr_loc, city_name, attr_img)
      .then(function (response) {
        if (response.data.attr_name == attr_name)
        toast.success("Successfully Added!");
        setAttrName("");
        setDesc("");
        setAttrLoc("");
        setAttrImg("");
        setCityName("");
        getAllAttractions();
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const updateDataToAPI = async (event) => {
    event.preventDefault();
    updateAttraction(attr_id, attr_name,description, attr_loc, city_name, attr_img)
      .then(function (response) {
        if (response.data.attr_name == attr_name) {
          toast.success("Successfully Updated!");
          setAttrName("");
          setDesc("");
          setAttrLoc("");
          setAttrImg("");
          setCityName("");
          setAttrId("");
          getAllAttractions();
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const onDelete = async (event) => {
    event.preventDefault();
    deleteAttraction(attr_id)
      .then(function (response) {
        if (response.data === "Deleted!") {
          toast.success("Successfully Deleted!");
          setAttrId("");
          getAllAttractions();
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  return (
    <>
      <div className="attr-div">
        <div className="attr-form">
          <form>
            <h2 className="attr-op">Attraction Operations</h2>

            <div className="form-group">
              <label htmlFor="attrname">Attraction Name</label>
              <input
                onChange={(e) => setAttrName(e.target.value)}
                type="text"
                name="attrname"
                placeholder="Attraction Name"
                id="attrname"
                value={attr_name}
                className="form-control"
              />
            </div>
            <div className="form-group">
              <label htmlFor="attrdesc">Attraction Description</label>
              <input
                onChange={(e) => setDesc(e.target.value)}
                type="text"
                name="attrdesc"
                placeholder="Attraction Description"
                id="attrdesc"
                value={description}
                className="form-control"
              />
            </div>
            <div className="form-group">
              <label htmlFor="attrloc">Attraction Location</label>
              <input
                onChange={(e) => setAttrLoc(e.target.value)}
                type="text"
                name="attrloc"
                placeholder="Attraction Location"
                id="attrloc"
                value={attr_loc}
                className="form-control"
              />
            </div>
            <div className="form-group">
              <label htmlFor="attrimg">Attraction Image</label>
              <input
                onChange={(e) => setAttrImg(e.target.value)}
                type="text"
                name="attrimg"
                placeholder="Attraction Image"
                id="attrimg"
                value={attr_img}
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
                  disabled={!attr_name || !attr_loc || !city_name ||!description}
                  onClick={sendDataToAPI}
                >
                  Add
                </button>
              </div>
            </div>
            <div className="form-group">
              <label htmlFor="attrid">Attraction Id</label>
              <input
                onChange={(e) => setAttrId(e.target.value)}
                type="text"
                name="attrid"
                placeholder="Attraction Id"
                id="attrid"
                value={attr_id}
                className="form-control"
              />
            </div>
            <div className="btn-main">
              <div className="update-btn">
                <span>
                  <button
                    type="submit"
                    className="delete-btn"
                    disabled={!attr_name || !attr_loc || !city_name || !attr_id 
                    || !description}
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
                  disabled={!attr_id}
                  onClick={onDelete}
                >
                  Delete
                </button>
              </div>
            </div>
          </form>
        </div>
        <div className="attr-table">
          <h2 className="attr-det">Attraction Details</h2>
          <table id="attrtable">
            <tbody>
              <tr>
                <th>Id</th>
                <th>Name</th>
                <th>Location</th>
                <th>Description</th>
                <th>City</th>
              </tr>
              {attraction.map((attr) => {
                return (
                  <tr key={attr.attr_id}>
                    <td>{attr.attr_id}</td>
                    <td>{attr.attr_name}</td>
                    <td>{attr.attr_loc}</td>
                    <td>{attr.description}</td>
                    <td>{attr.city_name}</td>
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

export default Attraction;
