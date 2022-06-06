import React, { useState, useEffect } from "react";
import {
  deleteRestaurant,
  getRestaurants,
  postImg,
  postRestaurant,
  updateRestaurant,
  uploadFile,
  getimgurl,
} from "../../services/admin/restaurant.service";
import "./Restaurant.css";
import { toast } from "react-toastify";
import { FileUploaded } from "../FileUploaded/FileUploaded";
import { Skeleton } from "@mui/material";
import { motion } from "framer-motion";

function Restaurant() {
  const [res_name, setResName] = useState("");
  const [description, setDesc] = useState("");
  const [res_location, setResLoc] = useState("");
  const [res_image, setResImage] = useState("");
  const [city_name, setCityName] = useState("");
  const [res_id, setResId] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const [restaurant, setRestaurants] = useState([]);
  const [type_id, setTypeId] = useState("");
  const [filename, setFileName] = useState("");
  const [type] = useState("Restaurant");
  const [img_url, setImgUrl] = useState("");
  const [isLoading,setIsLoading]=useState(true);

  useEffect(() => {
    getAllRestaurants();
  }, []);

  const getAllRestaurants = async () => {
    getRestaurants()
      .then((res) => {
        setTimeout(() => setIsLoading(false), 1200)
        setRestaurants(res.data);
      })
      .catch((err) => {
        toast.error(err.response.data, { autoClose: 5000 });
      });
  };

  const sendDataToAPI = async (event) => {
    event.preventDefault();
    if(res_name && description && res_location && city_name){
    postRestaurant(res_name, description, res_location, city_name, res_image)
      .then(function (response) {
        if (response.data.res_name === res_name) {
          toast.success("Successfully Added!");
          setResId(response.data.res_id);
          setResName("");
          setDesc("");
          setResLoc("");
          setResImage("");
          getAllRestaurants();
        }
      })
      .catch((err) =>{
        toast.error(err.response.data, { autoClose: 5000 });
      });
    }
    else{
      toast.error("Enter City name, Restaurant Name,description, location!")
    }
  };

  const updateDataToAPI = async (event) => {
    event.preventDefault();
    if(res_id && res_name && description && res_location && city_name){
    updateRestaurant(res_id, res_name, description, res_location, city_name)
      .then((response) => {
        if (response.data.res_name === res_name) {
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
      .catch((err) => {
        toast.error(err.response.data, { autoClose: 5000 });
      });
    }
    else{
      toast.error("Enter City name, Restaurant Id Name,description, location!")
    }
  };

  const onDelete = async (event) => {
    event.preventDefault();
    if(res_id){
    deleteRestaurant(res_id)
      .then(function (response) {
        if (response.data === "Deleted!") {
          toast.success("Successfully Deleted!");
          setResId("");
          getAllRestaurants();
        }
      })
      .catch((err) => {
        toast.error(err.response.data, { autoClose: 5000 });
      });
    }
    else{
      toast.error("Enter Restaurant Id!");
    }
  };
  const submitForm = (e) => {
    e.preventDefault();
    if(city_name && selectedFile){
    uploadFile(city_name, selectedFile)
      .then((res) => {
        setSelectedFile(selectedFile);
       toast.success("Successfully Uploaded Image!");
      })
      .catch((err) => toast.error(err.response.data, { autoClose: 5000 }));
    }
      else{
        toast.error("Enter the city name and select a file!")
      }
  };

  const geturl = (e) => {
    e.preventDefault();
    setSelectedFile()
    console.log("not happening!");
    if(city_name && selectedFile){
    getimgurl(city_name, selectedFile)
      .then((res) => {
        console.log(res.data);
        setResImage(res.data);
        setFileName(selectedFile.name);
        setTypeId(res_id.toString());
        setImgUrl(res.data);

      })
      .catch((err) => toast.error(err.response.data, { autoClose: 5000 }));
    }
    else{
      toast.error("Enter the city name and select a file!")
    }
  };

  const addImg = (e) => {
    e.preventDefault();
    setTypeId(res_id.toString());
    if(res_id && type_id && filename){
    
    postImg(type, type_id, filename, img_url)
      .then((res) => {
        console.log(res);
        toast.success("Added Image to Database");
        setResId("");
        setSelectedFile("");
        setFileName("");
        setResImage("");
      })
      .catch((err) => toast.error(err.response.data, { autoClose: 5000 }));
    }
    else{
      toast.error("Enter the restaurant Id and image!");
    }
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

            <div className="btn-main">
              <div className="update-btn">
                <motion.button
                  type="submit"
                  className="delete-btn"
                  onClick={sendDataToAPI}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Add
                </motion.button>
              </div>
              <div className="update-btn">
                <motion.button
                  type="submit"
                  className="delete-btn"
                  onClick={updateDataToAPI}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Update
                </motion.button>
              </div>
              <div className="update-btn">
                <motion.button
                  type="submit"
                  className="delete-btn"
                  onClick={onDelete}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Delete
                </motion.button>
              </div>
            </div>

            <div className="form-row">
              <div className="form-group col-sm-2">
                <label htmlFor="resid">Restaurant Id</label>
                <input
                  onChange={(e) => setResId(e.target.value)}
                  type="text"
                  name="resid"
                  placeholder="Res Id"
                  id="resid"
                  value={res_id}
                  className="form-control"
                />
                <motion.button
                  style={{ marginTop: "0.5rem" }}
                  type="submit"
                  className="delete-btn"
                  onClick={addImg}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Add Image
                </motion.button>
              </div>

              <div className="form-group col-sm-4">
                <FileUploaded onFileSelect={(file) => setSelectedFile(file)} />
                <motion.button
                  className="delete-btn"
                  style={{ marginTop: "0.5rem" }}
                  onClick={submitForm}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Upload
                </motion.button>
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
                  onChange={(e) => setResImage(e.target.value)}
                />
                <motion.button
                  type="submit"
                  className="delete-btn"
                  style={{ marginTop: "0.5rem" }}
                  onClick={geturl}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Get URL
                </motion.button>
              </div>
            </div>
          </form>
        </div>
        <div className="res-table">
          <table id="resttable">
            <tbody>
              <tr>
                <th>Id</th>
                <th>Name</th>
                <th>Location</th>
                <th>Description</th>
                <th>City</th>
              </tr>
              {
              isLoading && <><tr>
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
              <tr>
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
              {!isLoading && restaurant.map((rest) => {
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
