import React,{useState} from 'react'
import {FileUploader} from '../FileUploader/FileUploader';
import { toast } from "react-toastify";
import {uploadFile,
  getimgurl,
  postBus
} from "../../services/admin/bus.service";
import "./Bus.css"

function Bus() {
    const [city_name, setCityName]=useState("");
    const [busmap_img, setBusImg]=useState("");
    const [description, setDesc]=useState("");
    const [selectedFile, setSelectedFile] = useState(null);

    const sendDataToAPI = async (event) => {
      event.preventDefault();
      postBus(city_name,busmap_img)
        .then(function (response) {
          if (response.data.city_name === city_name) {
            // setSuccessMsg("Successfully Added!");
            toast.success("Successfully Added");
            setCityName("");
            setBusImg("");
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
          setBusImg(res.data);
          console.log(res);
        })
        .catch((err) => console.log("error"));
    
      }
  return (
    <div className="bus-form">
      
    <form>
      <h2 className="city-op">Bus Operations</h2>

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
            <label htmlFor="busimage">Bus Image</label>
            <div className="img-form">
            <div>
            <input
             
              type="text"
              name="busimage"
              placeholder="Bus Image"
              id="busname"
              value={busmap_img}
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
        {/* <div className="add-button"> */}
          <button
            type="submit"
            className="add-btn"
            disabled={!city_name || !busmap_img}
            onClick={sendDataToAPI}
         
          >
            Add
          </button>
        {/* </div> */}
      </div>
    </form>
  </div>
  )
}

export default Bus