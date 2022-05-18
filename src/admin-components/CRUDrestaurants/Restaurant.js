import React, {useState, useEffect} from 'react';
import { deleteRestaurant, getRestaurants, postRestaurant, updateRestaurant } from '../../services/admin/restaurant.service';
import "./Restaurant.css";

function Restaurant() {
  const [res_name, setResName] = useState("");
  const [res_location, setResLoc] = useState("");
  const [city_name, setCityName] = useState("");
  const [res_id, setResId] = useState("");
  const [successMsg, setSuccessMsg] = useState(null);
  const [restaurant, setRestaurants]=useState([]);
 
  console.log(res_name);
  console.log(res_location);
  console.log(city_name);
  console.log(res_id);

  
  useEffect(() => {
    getAllRestaurants();
     
}, []);

const getAllRestaurants = async (event) =>{
    getRestaurants()
      .then((res) => {
          setRestaurants(res.data);
          console.log(restaurant);
        }
      )
      .catch((err) => {
        console.log("Error", err);
      });
}
  
  

  const sendDataToAPI = async (event) => {
    event.preventDefault();
    postRestaurant(res_name,res_location,city_name)
      .then(function (response) {
        if(response.data.res_name==res_name)
        setSuccessMsg("Successfully Added!")
        setResName("");
        setResLoc("");
        setCityName("");
        console.log(response);
        getAllRestaurants();
      })
      .catch(function (error) {
        console.log(error);
      });
  };


  const updateDataToAPI = async (event) => {
    event.preventDefault();
    const userDetails = JSON.parse(localStorage.getItem("user"));
    updateRestaurant(res_id,res_name,res_location,city_name)
      .then(function (response) {
        if(response.data.res_name==res_name)
        setSuccessMsg("Successfully Updated!")
        setResName("");
        setResLoc("");
        setCityName("");
        setResId("");
        console.log(response);
        getAllRestaurants();
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const onDelete = async (event) => {
    event.preventDefault();
    deleteRestaurant(res_id)
      .then(function (response) {
        if (response.data === "Deleted!")
          setSuccessMsg("Successfully Deleted!");
          setResId("");
        console.log(response.data);
        getAllRestaurants();
      })
      .catch(function (error) {
        console.log(error);
      });
  };



  return (<>
  <table id="resttable">
      <tbody>
          <tr>
              <th>Id</th>
              <th>Name</th>
              <th>Location</th>
              <th>City</th>
          </tr>
      {restaurant.map((rest) => {
  return(
      <tr>
          <td>{rest.res_id}</td>
          <td>{rest.res_name}</td>
          <td>{rest.res_location}</td>
          <td>{rest.city_name}</td>
      </tr>
  )
  })}
  </tbody>
  </table>

    <div className="res-form">
      <form>
        <h1>Restaurant Operations</h1>

        <div className="form-group">
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
        <div className="form-group">
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
          <div className="add-btn">
            <button
              type="submit"
              className="delete-btn"
              disabled={!res_name || !res_location || !city_name}
              onClick={sendDataToAPI}
            >
              Add
            </button>
          </div>
          </div>
          <div className="form-group">
          <label htmlFor="resid">Restaurant Id</label>
          <input
            onChange={(e) => setResId(e.target.value)}
            type="text"
            name="resid"
            placeholder="Restaurant Id"
            id="resid"
            value={res_id}
            className="form-control"
          />
        </div>
          <div className='btn-main'>
          <div className="update-btn">
              <span>
            <button
              type="submit"
              className="delete-btn"
              disabled={!res_name || !res_location || !city_name || !res_id}
              onClick={updateDataToAPI}
            >
              Update
            </button>
            </span>
          </div>
          <div className="">
            <button type="submit" className="delete-btn"
            disabled={!res_id}
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
    </> )
}

export default Restaurant