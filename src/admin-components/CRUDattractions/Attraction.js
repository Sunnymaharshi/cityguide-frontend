import React, {useState, useEffect} from 'react'
import { deleteAttraction, getAttractions, postAtrraction, updateAttraction } from '../../services/admin/attraction.service';
import "./Attraction.css"


function Attraction() {

    const [attr_name, setAttrName] = useState("");
    const [attr_loc, setAttrLoc] = useState("");
    const [city_name, setCityName] = useState("");
    const [attr_id, setAttrId] = useState("");
    const [successMsg, setSuccessMsg] = useState(null);
    const [attraction, setAttractions]=useState([]);
   
    console.log(attr_name);
    console.log(attr_loc);
    console.log(city_name);
    console.log(attr_id);
    
    useEffect(() => {
      getAllAttractions();
       
  }, []);
  
  const getAllAttractions = async (event) =>{
      getAttractions()
        .then((res) => {
           setAttractions(res.data);
           console.log(attraction);
            }
        )
        .catch((err) => {
          console.log("Error", err);
        });
  }
    
    
  
    const sendDataToAPI = async (event) => {
      event.preventDefault();
      postAtrraction(attr_name,attr_loc,city_name)
        .then(function (response) {
          if(response.data.attr_name==attr_name)
          setSuccessMsg("Successfully Added!")
          setAttrName("");
          setAttrLoc("");
          setCityName("");
          console.log(response);
          getAllAttractions();
        })
        .catch(function (error) {
          console.log(error);
        });
    };
  
  
    const updateDataToAPI = async (event) => {
      event.preventDefault();
      updateAttraction(attr_id,attr_name,attr_loc,city_name)
        .then(function (response) {
          if(response.data.attr_name==attr_name){
          setSuccessMsg("Successfully Updated!")
          setAttrName("");
          setAttrLoc("");
          setCityName("");
          setAttrId("");
          console.log(response);
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
          if (response.data === "Deleted!"){
            setSuccessMsg("Successfully Deleted!");
            setAttrId("");
          console.log(response.data);
          getAllAttractions();
          }
        })
        .catch(function (error) {
          console.log(error);
        });
    };
  
  
  
    return (<>
    <div className='attr-div'>
    
      <div className="attr-form">
        <form>
          <h2 className='attr-op'>Attraction Operations</h2>
  
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
                disabled={!attr_name || !attr_loc || !city_name}
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
            <div className='btn-main'>
            <div className="update-btn">
                <span>
              <button
                type="submit"
                className="delete-btn"
                disabled={!attr_name || !attr_loc || !city_name || !attr_id}
                onClick={updateDataToAPI}
              >
                Update
              </button>
              </span>
            </div>
            <div className="">
              <button type="submit" className="delete-btn"
              disabled={!attr_id}
              onClick={onDelete} >
                Delete
              </button>
            </div>
          </div>
          <p>
            <b>{successMsg}</b>
          </p>
        </form>
      </div>
      <div className='attr-table'>
          <h2 className='attr-det'>Attraction Details</h2>
    <table id="attrtable">
        <tbody>
            <tr>
                <th>Id</th>
                <th>Name</th>
                <th>Location</th>
                <th>City</th>
            </tr>
        {attraction.map((attr) => {
    return(
        <tr>
            <td>{attr.attr_id}</td>
            <td>{attr.attr_name}</td>
            <td>{attr.attr_loc}</td>
            <td>{attr.city_name}</td>
        </tr>
    )
    })}
    </tbody>
    </table>
    </div>
      </div>
      </> )
  }

export default Attraction