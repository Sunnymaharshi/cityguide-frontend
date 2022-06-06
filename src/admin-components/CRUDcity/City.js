import React, { useState, useEffect } from "react";
import "./City.css";
import {
  deleteCity,
  getCity,
  postCity,
  updateCity,
  uploadFile,
  getimgurl,
  postImg,
} from "../../services/admin/city.service";
import { toast } from "react-toastify";
import { FileUploaded } from "../FileUploaded/FileUploaded";
import { Skeleton } from "@mui/material";
import { motion } from "framer-motion";




function City() {
  const [city_name, setCityName] = useState("");
  const [city_tagline, setCityTagline] = useState("");
  const [city_desc, setDesc] = useState("");
  const [city_image, setCityImg] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const [filename, setFileName] = useState(null);
  const [city, setCity] = useState([]);
  const [type_id, setTypeId] = useState("");
  const [type] = useState("City");
  const [img_url, setImgUrl] = useState("");
  const [isLoading,setIsLoading]=useState(true);
 
  


  useEffect(() => {
    getAllCities();
    
  }, []);

  const getAllCities = async (event) => {
    getCity()
      .then((res) => {
        setTimeout(() => setIsLoading(false), 1200)
        setCity(res.data);
      })
      .catch((err) => {
        toast.error(err.response.data, { autoClose: 5000 });
      });
  };

  const sendDataToAPI = async (event) => {
    event.preventDefault();
    if(city_name){
    postCity(city_name, city_tagline, city_desc, city_image)
      .then((response) => {
        if (response.data.city_name === city_name) {
          toast.success("Successfully Added");
          setCityName("");
          setCityTagline("");
          setDesc("");
          setCityImg("");
          getAllCities();
        }
      })
      .catch((err) => {
        toast.error(err.response.data, { autoClose: 5000 });
      });
    }
    else{
      toast.error("Enter City Name!");
    }
  };

  const updateDataToAPI = async (event) => {
    event.preventDefault();
    if(city_name && city_tagline && city_desc && city_image){
    updateCity(city_name, city_tagline, city_desc, city_image)
      .then((response) => {
        if (response.data.city_name === city_name) {
          toast.success("Successfully Updated!");
          setCityName("");
          setCityTagline("");
          setDesc("");
          setCityImg("");
          getAllCities();
        }
      })
      .catch((err) => {
        toast.error(err.response.data, { autoClose: 5000 });
      });
    }
    else{
      toast.error("Enter City Name, Tagline, Descriprion and image!");
    }
  };

  const onDelete = async (event) => {
    event.preventDefault();
    if(city_name){
    deleteCity(city_name)
      .then((response) => {
        if (response.data === "Deleted!") {
          toast.success("Successfully Deleted!");
          setCityName("");
          setDesc("");
          getAllCities();
        }
      })
      .catch((err) => {
        toast.error(err.response.data, { autoClose: 5000 });
      });
    }
    else{
      toast.error("Enter City Name!");
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
      toast.error("Enter the city name and select a file!")
    }
  };

  const geturl = (e) => {
    e.preventDefault();
    if(city_name && selectedFile){
    getimgurl(city_name, selectedFile)
      .then((res) => {
        setCityImg(res.data);
        setFileName(selectedFile.name);
        setTypeId(city_name);
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

    
    if(city_name && city_image && type_id && filename){
    postImg(type, type_id, filename, img_url)
      .then((res) => {
        toast.success("Added Image to Database");
        setSelectedFile(null);
        setFileName("");
        setCityImg("");
      })
      .catch((err) => toast.error(err.response.data, { autoClose: 5000 }));
    }
    else{
      toast.error("Enter the city name and image!");
    }
  };

  return (
    <div className="city-div">
      <div className="city-form">
        <form>
          <h2 className="city-op">City Operations</h2>

          <div className="form-row">
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
            <div className="form-group col">
              <label htmlFor="citytag">City Tagline</label>
              <input
                onChange={(e) => setCityTagline(e.target.value)}
                type="text"
                name="citytag"
                placeholder="City Tagline"
                id="citytag"
                value={city_tagline}
                className="form-control"
              />
            </div>
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
            <div className="">
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
            <div className="form-group col">
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
              <label htmlFor="cityimage">City Image</label>
              <input
                type="text"
                name="cityimage"
                placeholder="City Image"
                id="cityimage"
                value={city_image}
                className="form-control"
                onChange={(e)=>e.target.value}
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

          <div className="btn-main">
            <motion.button
              style={{ marginTop: "0.5rem" }}
              type="submit"
              className="add-btn"
              onClick={addImg}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
            >
              Add Image
            </motion.button>
          </div>
        </form>
      </div>
      

    
      <div className="city-table">
        <table id="citytable">

      
         <tbody>
      
            <tr>
              <th>Name</th>
              <th>Tagline</th>
              <th>Description</th>
            </tr>
            {
              isLoading && <><tr>
              <td><Skeleton  height={30}/></td>
              <td><Skeleton  height={30}/></td>
              <td><Skeleton  height={30}/></td>
              </tr>
              <tr>
              <td><Skeleton  height={30}/></td>
              <td><Skeleton  height={30}/></td>
              <td><Skeleton  height={30}/></td>
              </tr>
              <tr>
              <td><Skeleton  height={30}/></td>
              <td><Skeleton  height={30}/></td>
              <td><Skeleton  height={30}/></td>
              </tr>
              <tr>
              <td><Skeleton  height={30}/></td>
              <td><Skeleton  height={30}/></td>
              <td><Skeleton  height={30}/></td>
              </tr>
              </>
            }
            {!isLoading && city.map((c) => {
              return  (
                <tr key={c.city_name}>
                  <td>{c.city_name}</td>
                  <td>{c.city_tagline}</td>
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
