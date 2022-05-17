import React, {useState, useEffect} from 'react';
import axios from "axios";
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
  let rest=[];
  


  useEffect(() => {
   
    axios.get("http://localhost:8080/getallcities")
      .then((res) => {
         rest=[];
        if (res.data.length > 0) {
        console.log(res.data);
          
          for(let i=0; i<res.data.length; i++){
          console.log(res.data[i].restaurantList);
          if(res.data[i].restaurantList.length!=0)
          rest=rest.concat(res.data[i].restaurantList);
          }
          setRestaurants(rest);
          console.log(rest);
          console.log(rest[0].res_id);
          console.log(restaurant);
     
        }
      })
      .catch((err) => {
        console.log("Error", err);
      });
     
}, []);
  
  

  const sendDataToAPI = async (event) => {
    event.preventDefault();
    const userDetails = JSON.parse(localStorage.getItem("user"));
    await axios
      .post(
        "http://localhost:8080/addrest",
        {
          res_name,
          res_location,
          city_name

        },
        {
          headers: {
            Authorization: "Bearer " + userDetails.token,
          },
        }
      )
      .then(function (response) {
        if(response.data.res_name==res_name)
        setSuccessMsg("Successfully Added!")
        setResName("");
        setResLoc("");
        setCityName("");
       
        
       

        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const updateDataToAPI = async (event) => {
    event.preventDefault();
    const userDetails = JSON.parse(localStorage.getItem("user"));
    await axios
      .put(
        "http://localhost:8080/updaterest",
        {
          res_id,
          res_name,
          res_location,
          city_name

        },
        {
          headers: {
            Authorization: "Bearer " + userDetails.token,
          },
        }
      )
      .then(function (response) {
        if(response.data.res_name==res_name)
        setSuccessMsg("Successfully Updated!")
        setResName("");
        setResLoc("");
        setCityName("");
        setResId("");

        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const onDelete = async (event) => {
    event.preventDefault();
    const userDetails = JSON.parse(localStorage.getItem("user"));
    await axios
      .delete(`http://localhost:8080/deleterest/${res_id}`, {
        headers: {
          Authorization: "Bearer " + userDetails.token,
        },
      })
      .then(function (response) {
        if (response.data === "Deleted!")
          setSuccessMsg("Successfully Deleted!");
          setResId("");
        console.log(response.data);
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