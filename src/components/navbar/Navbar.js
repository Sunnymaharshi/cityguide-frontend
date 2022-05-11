import { useState, useEffect } from "react";
import "./Navbar.css";
import { Link } from "react-router-dom";
import { auth } from "../../services/auth/auth.service";

function Navbar() {
  const [username, setUsername] = useState(null);
  useEffect(() => {
    if (localStorage.getItem("user")) {
      const userDetails = JSON.parse(localStorage.getItem("user"));
      auth()
        .then((res) => {
          if (res.data !== userDetails.username) {
            localStorage.removeItem("user");
          }
          setUsername(userDetails.username);
        })
        .catch((err) => {
          localStorage.removeItem("user");
          console.log("Token has Expired!");
        });
    }
  }, []);
  


  return (
    <div className="Navbar">
      <div className="Logo">
        <h1>CityGuide</h1>
      </div>
      <div className="Select">
        <select name="cities" id="city">
          <option value="volvo">City1</option>
          <option value="saab">City2</option>
        </select>
      </div>
      {!username && (
        <div className="links">
          <Link to="/login" className="">
            Login
          </Link>
          <Link to="/signup">Signup</Link>
        </div>
      )}
      {username && (
        <div>
          <p>{username}</p>
        </div>
      )}
    </div>
  );
}

export default Navbar;
