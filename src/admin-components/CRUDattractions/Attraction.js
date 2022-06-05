import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { FileUploaded } from "../FileUploaded/FileUploaded";
import {
  deleteAttraction,
  getAttractions,
  postAtrraction,
  updateAttraction,
  uploadFile,
  getimgurl,
  postImg,
} from "../../services/admin/attraction.service";
import "./Attraction.css";
import { toast } from "react-toastify";
import { Skeleton } from "@mui/material";

function Attraction() {
  const [attr_name, setAttrName] = useState("");
  const [description, setDesc] = useState("");
  const [attr_loc, setAttrLoc] = useState("");
  const [attr_img, setAttrImg] = useState("");
  const [city_name, setCityName] = useState("");
  const [attr_id, setAttrId] = useState("");
  const [attraction, setAttractions] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null);
  const [type_id, setTypeId] = useState("");
  const [filename, setFileName] = useState("");
  const [type] = useState("Attraction");
  const [img_url, setImgUrl] = useState("");
  const [isLoading,setIsLoading]=useState(true);

  useEffect(() => {
    getAllAttractions();

  }, []);

  const getAllAttractions = async (event) => {
    getAttractions()
      .then((res) => {
        setTimeout(() => setIsLoading(false), 1200)
        setAttractions(res.data);
      })
      .catch((err) => {
          toast.error(err.response.data, { autoClose: 5000 });
      });
  };

  const sendDataToAPI = async (event) => {
    event.preventDefault();
    if(attr_name && description && attr_loc && city_name){
    postAtrraction(attr_name, description, attr_loc, city_name, attr_img)
      .then((response) => {
        if (response.data.attr_name === attr_name)
          toast.success("Successfully Added!");
        setAttrId(response.data.attr_id);
        setAttrName("");
        setDesc("");
        setAttrLoc("");
        setAttrImg("");
        getAllAttractions();
      })
      .catch((err) => {
        toast.error(err.response.data, { autoClose: 5000 });
      });
    }
    else{
      toast.error("Enter City Name and Attraction name,desc, location fields!");
    }
  };

  const updateDataToAPI = async (event) => {
    event.preventDefault();
    if(attr_id && attr_name && description && attr_loc && city_name){
    updateAttraction(attr_id, attr_name, description, attr_loc, city_name)
      .then((response) => {
        if (response.data.attr_name === attr_name) {
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
      .catch((err) => {
        toast.error(err.response.data, { autoClose: 5000 });
      });
    }
      else{
        toast.error("Enter City Name and Attraction ID, name,desc, location fields!");
      }
    }
  

  const onDelete = async (event) => {
    event.preventDefault();
    if(attr_id)
    deleteAttraction(attr_id)
      .then((response) => {
        if (response.data === "Deleted!") {
          toast.success("Successfully Deleted!");
          setAttrId("");
          getAllAttractions();
        }
      })
      .catch((err) => {
        toast.error(err.response.data, { autoClose: 5000 });
      });
      else
      toast.error("Enter Attraction Id!")
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
      else
      toast.error("Enter the city name and select a file!");
  };

  const geturl = (e) => {
    e.preventDefault();
    if(city_name && selectedFile){
    getimgurl(city_name, selectedFile)
      .then((res) => {
        console.log(res.data);
        setAttrImg(res.data);
        setFileName(selectedFile.name);
        setTypeId(attr_id.toString());
        setImgUrl(res.data);
      })
      .catch((err) => toast.error(err.response.data, { autoClose: 5000 }));
    }
      else
      toast.error("Enter the city name and select a file!")
  };

  const addImg = (e) => {
    e.preventDefault();
    if(img_url && type_id && filename){
    postImg(type, type_id, filename, img_url)
      .then((res) => {
        toast.success("Added Image to Database");
        setAttrId("");
        setSelectedFile("");
        setFileName("");
        setAttrImg("");
      })
      .catch((err) => toast.error(err.response.data, { autoClose: 5000 }));
    }
      else{
        toast.error("Enter the Attraction Id and image!");
      }
  };

  return (
    <>
      <div className="attr-div">
        <div className="attr-form">
          <form>
            <h2 className="attr-op">Attraction Operations</h2>

            <div className="form-row">
              <div className="form-group col">
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
              <div className="form-group col">
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
            </div>
            <div className="form-row">
              <div className="form-group col">
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
                 whileHover={{ scale: 1.05 }}
                 whileTap={{ scale: 0.98 }}
                  className="delete-btn"
                  style={{ marginTop: "0.5rem" }}
                  onClick={submitForm}
                >
                  Upload
                </motion.button>
              </div>

              <div className="form-group col">
                <label htmlFor="attrimage">Attraction Image</label>
                <input
                  type="text"
                  name="attrimage"
                  placeholder="Attraction Image"
                  id="resimage"
                  value={attr_img}
                  className="form-control"
                  onChange={(e) => setAttrImg(e.target.value)}
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
        <div className="attr-table">
          <table id="attrtable">
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
              {!isLoading && attraction.map((attr) => {
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
