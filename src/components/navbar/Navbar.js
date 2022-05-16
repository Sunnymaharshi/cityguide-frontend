import { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { logout } from "../../services/auth/auth.service";
import "./Navbar.css";
import UserContext from "../../context/user/user.context";
import { getCities } from "../../services/dashboard/dashboard.service";

function Navbar({ handleCity }) {
  const { user } = useContext(UserContext);
  const [cities, setCities] = useState(["Cities"]);

  const handleDropdown = (e) => {
    handleCity(e.target.value);
  };

  const handleLogout = () => {
    logout();
    window.location.reload();
  };
  useEffect(() => {
    getCities
      .then((res) => {
        if (res.data.length > 0) {
          setCities(res.data);
          handleCity(res.data[0]);
        }
      })
      .catch((err) => {
        console.log("city names error", err);
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
                <option key={key} value={val}>
                  {val}
                </option>
              );
            })}
          </select>
        </div>
      </div>

      {!user.username && (
        <div className="links">
          <Link to="/login" className="nav-link">
            Login
          </Link>
          <Link className="nav-link" to="/signup">
            Signup
          </Link>
        </div>
      )}
      {user.username && (
        <div className="username">
          <h4>{user.username}</h4>
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
