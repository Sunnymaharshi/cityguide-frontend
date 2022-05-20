import React,{useState} from 'react'
import {FileUploader} from '../FileUploader/FileUploader';
import { toast } from "react-toastify";
import "./Metro.css"

function Metro() {
    const [city_name, setCityName]=useState("");
    const [successMsg, setSuccessMsg]=useState(null);
    const [selectedFile, setSelectedFile] = useState(null);
  return (
    <div className="metro-form">
      
    <form>
      <h1 className="metro-op">Metro Operations</h1>

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
      <div className='form-group'>
      <FileUploader
      onFileSelectSuccess={(file) => setSelectedFile(file)}
      onFileSelectError={({ error }) => alert(error)}
/>
</div>
      
   

      <div className="btn-main">
        <div className="add-button">
          <button
            type="submit"
            className="delete-btn"
            disabled={!city_name }
         
          >
            Add
          </button>
        </div>
        <div className="update-btn">
          <button
            type="submit"
            className="delete-btn"
            disabled={!city_name}
           
          >
            Update
          </button>
        </div>
        <div className="">
          <button type="submit"
           className="delete-btn"
           disabled={!city_name}
          >
            Delete
          </button>
        </div>
      </div>
    </form>
  </div>
  )
}

export default Metro