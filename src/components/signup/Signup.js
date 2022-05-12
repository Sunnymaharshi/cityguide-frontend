import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import "./Signup.css";
import validate from "./validators";

function Signup() {
  const initialValues = {
    name: "",
    username: "",
    mob_no: "",
    emailid: "",
    password: "",
  };
  let navigate = useNavigate();
  const [formValues, setFormValues] = useState(initialValues);
  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);
  const [successMsg, setSuccessMsg] = useState(null);
  const [userNameExist, setUserNameExist] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    setFormErrors(validate(formValues));
    setIsSubmit(true);
  };

  useEffect(() => {
    if (Object.keys(formErrors).length === 0 && isSubmit) {
      // do signup

      const doSignup = async () => {
        await axios
          .post(`http://localhost:8080/signup`, formValues)
          .then((res) => {
            if (res.data === "User Signed In Successfully") {
              setUserNameExist(null);
              setSuccessMsg(
                "Successfully Signed up...Redirecting to login page"
              );
              setTimeout(() => {
                navigate("/login", { replace: true });
              }, 3000);
            }
          })
          .catch((err) => {
            const res = err.response;
            if (res.data === "User with username already Exists") {
              setUserNameExist("Username already exists");
            }
          });
      };

      doSignup();
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formErrors]);

  return (
    <div className="signup-com">
      <form onSubmit={handleSubmit}>
        <h1>City Guide</h1>

        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            name="name"
            value={formValues.name}
            onChange={handleChange}
            placeholder="Name"
            id="name"
            className="form-control"
          />
          <small>{formErrors.name}</small>
        </div>

        <div className="form-group">
          <label htmlFor="username">User Name</label>
          <input
            type="text"
            name="username"
            value={formValues.username}
            onChange={handleChange}
            placeholder="User Name"
            id="username"
            className="form-control"
          />
          <small>{formErrors.username}</small>
          <small>{userNameExist}</small>
        </div>
        <div className="form-group">
          <label htmlFor="mob_no">Phone Number</label>
          <input
            type="text"
            name="mob_no"
            value={formValues.mob_no}
            onChange={handleChange}
            placeholder="Phone Number"
            id="mob_no"
            className="form-control"
          />
          <small>{formErrors.mob_no}</small>
        </div>

        <div className="form-group">
          <label htmlFor="emailid">Email</label>
          <input
            type="email"
            name="emailid"
            value={formValues.emailid}
            onChange={handleChange}
            placeholder="Email"
            id="emailid"
            className="form-control"
          />
          <small>{formErrors.emailid}</small>
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            name="password"
            value={formValues.password}
            onChange={handleChange}
            placeholder="Password"
            id="password"
            className="form-control"
          />
          <small>{formErrors.password}</small>
        </div>
        <div className="signup-btn">
          <button type="submit">Signup</button>
        </div>
        <p>
          <b>{successMsg}</b>
        </p>
        <p>
          Already registered?{" "}
          <Link to="/login" className="login-link">
            <b>Login</b>
          </Link>
        </p>
      </form>
    </div>
  );
}

export default Signup;
