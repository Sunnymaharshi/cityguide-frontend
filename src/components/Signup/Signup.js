import React, { useState } from "react";
import "./Signup.css";

function Signup() {
  const initialValues = {
    firstname: "",
    lastname: "",
    username: "",
    phno: "",
    email: "",
    password: "",
  };
  const [formValues, setFormValues] = useState(initialValues);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const handleSubmit = () => {};
  return (
    <div className="signup-com">
      <form onSubmit={handleSubmit}>
        <h2>Signup</h2>
        <div className="form-row">
          <input
            type="text"
            name="firstname"
            value={formValues.firstname}
            onChange={handleChange}
            placeholder="First Name"
            className="col"
          />
          <input
            type="text"
            name="lastname"
            value={formValues.lastname}
            onChange={handleChange}
            placeholder="Last Name"
            className="col"
          />
        </div>
        <div className="form-row">
          <input
            type="text"
            name="username"
            value={formValues.username}
            onChange={handleChange}
            placeholder="User Name"
            className="col"
          />
          <input
            type="text"
            name="phno"
            value={formValues.phno}
            onChange={handleChange}
            placeholder="Phone Number"
            className="col"
          />
        </div>
        <div className="">
          <input
            type="email"
            name="email"
            value={formValues.email}
            onChange={handleChange}
            placeholder="Email"
          />

          <input
            type="password"
            name="password"
            value={formValues.password}
            onChange={handleChange}
            placeholder="Password"
          />
        </div>
        <input type="submit" className="btn-primary" value="Signup" />
      </form>
    </div>
  );
}

export default Signup;
