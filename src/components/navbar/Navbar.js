import { useState, useEffect } from "react";
import "./Navbar.css";
import axios from "axios";
import { Link } from "react-router-dom";
import { auth, logout } from "../../services/auth/auth.service";

function Navbar({ handleCity }) {
  const [username, setUsername] = useState(null);
  const [cities, setCities] = useState([
    {
      city_name: "City 1",
    },
    {
      city_name: "City 2",
    },
  ]);

  const handleDropdown = (e) => {
    handleCity(e.target.value);
  };

  const handleLogout = () => {
    logout();
    window.location.reload();
  };
  useEffect(() => {
    if (localStorage.getItem("user")) {
      const userDetails = JSON.parse(localStorage.getItem("user"));
      auth()
        .then((res) => {
          if (res.data !== userDetails.username) {
            localStorage.removeItem("user");
          } else {
            setUsername(userDetails.username);
          }
        })
        .catch((err) => {
          localStorage.removeItem("user");
          console.log("Token has Expired!");
        });
    }
    axios
      .get("http://localhost:8080/getallcities")
      .then((res) => {
        setCities(res.data);
        handleCity(res.data[0].city_name);
      })
      .catch((err) => {
        console.log("error", err);
      }); // eslint-disable-next-line
  }, []);

  return (
    <nav className="nav-bar">
      <div className="logo-drop">
        <div className="logo">CityGuide</div>

        <div className="drop-down">
          <select name="cities" id="city" onClick={handleDropdown}>
            {cities.map((val, key) => {
              return (
                <option key={key} value={val.city_name}>
                  {val.city_name}
                </option>
              );
            })}
          </select>
        </div>
      </div>

      {!username && (
        <div className="links">
          <Link to="/login" className="nav-link">
            Login
          </Link>
          <Link className="nav-link" to="/signup">
            Signup
          </Link>
        </div>
      )}
      {username && (
        <div className="username">
          <h4>{username}</h4>
          <div className="logout-content">
            <div className="logout-btn" onClick={handleLogout}>
              Logout
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}

export default Navbar;
