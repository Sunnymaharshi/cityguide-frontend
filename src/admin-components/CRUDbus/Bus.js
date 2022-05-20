import React,{useState} from 'react'
import {FileUploader} from '../FileUploader/FileUploader';
import "./Bus.css"

function Bus() {
    const [city_name, setCityName]=useState("");
    const [successMsg, setSuccessMsg]=useState(null);
    const [selectedFile, setSelectedFile] = useState(null);
  return (
    <div className="bus-form">
      
    <form>
      <h1 className="bus-op">Bus Operations</h1>

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
      <p>
        <b>{successMsg}</b>
      </p>
    </form>
  </div>
  )
}

export default Bus