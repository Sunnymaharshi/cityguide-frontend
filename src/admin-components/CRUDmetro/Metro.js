import React, { useState } from "react";
import { FileUploader } from "../FileUploader/FileUploader";
import { toast } from "react-toastify";
import { motion } from "framer-motion";
import {
  postMetro,
  uploadFile,
  getimgurl,
} from "../../services/admin/metro.service";
import "./Metro.css";

function Metro() {
  const [city_name, setCityName] = useState("");
  const [metromap_img, setMetroImg] = useState("");
  const [filename, setFileName] = useState("");
  const [description, setDesc] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const sendDataToAPI = async (event) => {
    event.preventDefault();
    if (city_name && metromap_img && description && filename) {
      postMetro(city_name, metromap_img, description, filename)
        .then((response) => {
          if (response.data.city_name === city_name) {
            toast.success("Successfully Added");
            setDesc("");
            setCityName("");
            setMetroImg("");
          }
        })
        .catch((err) => {
          toast.error(err.response.data, { autoClose: 5000 });
        });
    } else {
      toast.error("Enter City Name, description and image!");
    }
  };

  const submitForm = (e) => {
    e.preventDefault();
    if(city_name && selectedFile){
    uploadFile(city_name, selectedFile)
      .then((res) => {
       toast.success("Successfully Uploaded Image!");
      })
      .catch((err) => toast.error(err.response.data, { autoClose: 5000 }));
    }
    else{
      toast.error("Enter City Name and select a file!");
    }
  };

  const geturl = (e) => {
    e.preventDefault();
    if (city_name && selectedFile) {
      getimgurl(city_name, selectedFile)
        .then((res) => {
          setMetroImg(res.data);
          setFileName(selectedFile.name);
        })
        .catch((err) => toast.error(err.response.data, { autoClose: 5000 }));
    } else {
      toast.error("Enter City Name and select a file!");
    }
  };
  return (
    <div className="metro-form">
      <form>
        <h2 className="city-op">Metro Operations</h2>

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
          <label htmlFor="desc">Description</label>
          <input
            onChange={(e) => setDesc(e.target.value)}
            type="text"
            name="desc"
            placeholder="Description"
            id="desc"
            value={description}
            className="form-control"
          />
        </div>
        <div className="form-group">
          <div className="img-form">
            <div className="file-upload">
              <FileUploader onFileSelect={(file) => setSelectedFile(file)} />
            </div>
            <div>
              <motion.button
                className="delete-btn"
                onClick={submitForm}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
              >
                Upload
              </motion.button>
            </div>
          </div>
        </div>
        <div className="form-group">
          <label htmlFor="metroimage">Metro Image</label>
          <div className="img-form">
            <div>
              <input
                type="text"
                name="metroimage"
                placeholder="Metro Image"
                id="metroname"
                defaultValue={metromap_img}
                className="form-control"
              />
            </div>
            <div className="btn-main">
              <div className="add-button">
                <motion.button
                  type="submit"
                  className="delete-btn"
                  onClick={geturl}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Get URL
                </motion.button>
              </div>
            </div>
          </div>
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
      </form>
    </div>
  );
}

export default Metro;
