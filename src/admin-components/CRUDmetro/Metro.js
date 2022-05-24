import React,{useState} from 'react'
import {FileUploader} from '../FileUploader/FileUploader';
import { toast } from "react-toastify";
import { postMetro,
   uploadFile,
  getimgurl} from '../../services/admin/metro.service';
import "./Metro.css"

function Metro() {
    const [city_name, setCityName]=useState("");
    const [metromap_img, setMetroImg]=useState("");
    const [description, setDesc]=useState("");
    const [selectedFile, setSelectedFile] = useState(null);
    const sendDataToAPI = async (event) => {
      event.preventDefault();
      postMetro(city_name,metromap_img)
        .then(function (response) {
          if (response.data.city_name === city_name) {
            // setSuccessMsg("Successfully Added!");
            toast.success("Successfully Added");
            setCityName("");
            setMetroImg("");
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
          setMetroImg(res.data);
          console.log(res);
        })
        .catch((err) => console.log("error"));
    
      }
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
            <label htmlFor="metroimage">Metro Image</label>
            <div className="img-form">
            <div>
            <input
             
              type="text"
              name="metroimage"
              placeholder="Metro Image"
              id="metroname"
              value={metromap_img}
              className="form-control"
            />
            </div>
             <div className='btn-main'> <div className="add-button">
              <button
                type="submit"
                className="delete-btn"
                disabled={!city_name }
                onClick={geturl}
              >
                Get URL
              </button>
            </div></div>
            </div>
          </div>
         
      
   

      <div className="btn-main">
       
          <button
            type="submit"
            className="add-btn"
            disabled={!city_name }
            onClick={sendDataToAPI}
          >
            Add
          </button>
        </div>
    </form>
  </div>
  )
}

export default Metro