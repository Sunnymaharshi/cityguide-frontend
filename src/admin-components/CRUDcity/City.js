import React, { useState, useEffect } from "react";
import {FileUploader} from '../FileUploader/FileUploader';
import { BASE_URL } from "../../common/data";
import "./City.css";
import {
  deleteCity,
  getCity,
  postCity,
  updateCity,
  uploadFile,
  getimgurl
} from "../../services/admin/city.service";
import { toast } from "react-toastify";

function City() {
  const [city_name, setCityName] = useState("");
  const [city_tagline, setCityTagline] = useState("");
  const [city_desc, setDesc] = useState("");
  const [city_image, setCityImg]=useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const [filename, setFileName]=useState(null);
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
    postCity(city_name,city_tagline, city_desc, city_image)
      .then(function (response) {
        if (response.data.city_name === city_name) {
          // setSuccessMsg("Successfully Added!");
          toast.success("Successfully Added");
          setCityName("");
          setCityTagline("");
          setDesc("");
          setCityImg("");
          getAllCities();
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const updateDataToAPI = async (event) => {
    event.preventDefault();
    updateCity(city_name,city_tagline,filename, city_desc, city_image)
      .then(function (response) {
        if (response.data.city_name === city_name) {
          toast.success("Successfully Updated!");
          setCityName("");
          setCityTagline("");
          setDesc("");
          setCityImg("");
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

  const submitForm = (e) => {

  e.preventDefault();
  console.log(selectedFile);
  uploadFile(city_name,selectedFile)
      .then((res) => {
        // alert("File Upload success");
        console.log("Uploaded");
        console.log(res.data);
        console.log(res);
        if(res.status==200)
        toast.success("Successfully Uploaded Image!");

        
      })
      .catch((err) => console.log("error"));
  };

  const geturl =(e)=>{
    e.preventDefault();
     getimgurl(city_name,selectedFile)
    .then((res)=>{
      setCityImg(res.data);
      setFileName(selectedFile.name);
      console.log(res);
    })
    .catch((err) => console.log("error"));

  }

  return (
    <div className="city-div">
      <div className="city-form">
        <form>
          <h2 className="city-op">City Operations</h2>

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
          <div className="form-group">
        <div className='img-form'>
          <div className='file-upload'>
            <FileUploader
                onFileSelect={(file) => setSelectedFile(file)}
            />
            </div>
            <div>
            <button className="delete-btn" onClick={submitForm}>Upload</button>
            </div>
            </div>
     </div>
          
     <div className="form-group">
            <label htmlFor="cityimage">City Image</label>
            <div className="img-form">
            <div>
            <input
             
              type="text"
              name="cityimage"
              placeholder="City Image"
              id="cityimage"
              value={city_image}
              className="form-control"
            />
            </div>
             <div className='btn-main'> <div className="add-button">
              <button
                type="submit"
                className="delete-btn"
                disabled={!city_name || !city_image}
                onClick={geturl}
              >
                Get URL
              </button>
            </div></div>
            </div>
          </div>
          

          <div className="btn-main">
            <div className="add-button">
              <button
                type="submit"
                className="delete-btn"
                disabled={!city_name || !city_desc || !city_tagline }
                onClick={sendDataToAPI}
              >
                Add
              </button>
            </div>
            <div className="update-btn">
              <button
                type="submit"
                className="delete-btn"
                disabled={!city_name}
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
              <th>Tagline</th>
              <th>Description</th>
            </tr>
            {city.map((c) => {
              return (
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
