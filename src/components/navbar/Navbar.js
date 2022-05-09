import "./Navbar.css"

function Navbar() {
    return <div className="Navbar">
      <div className="Logo"><h1>CityGuide</h1></div>
      <div className="Select"><select name="cities" id="city">
              <option value="volvo">City1</option>
              <option value="saab">City2</option>
            </select>
      </div>
      <div className="SignUp"><button id="signin">SignIn</button></div>
    </div>;
  }
  
  export default Navbar;