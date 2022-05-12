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
    <nav>
      <div className="logo">
        <h1>CityGuide</h1>
      </div>
      <div className="select">
        <select name="cities" className="form-select" id="city">
          <option value="volvo">City1</option>
          <option value="saab">City2</option>
        </select>
      </div>
      {!username && (
        <div className="links">
          <Link to="/login" className="nav-link">
            Login
          </Link>
          <Link className="nav-link"  to="/signup">Signup</Link>
        </div>
      )}
      {username && (
        <div className="username">
          <p>{username}</p>
        </div>
      )}
    </nav>
  );
}

export default Navbar;
