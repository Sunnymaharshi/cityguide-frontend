import "./Navbar.css";
import { Link } from "react-router-dom";
function Navbar() {
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
      <div className="links">
        <Link to="/login" className="">
          Login
        </Link>
        <Link to="/signup">Signup</Link>
      </div>
    </div>
  );
}

export default Navbar;
