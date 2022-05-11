import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./Login.css";

function Login() {
  const initialValues = {
    username: "",
    password: "",
  };
  let navigate = useNavigate();
  const [formValues, setFormValues] = useState(initialValues);
  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);
  const [successMsg, setSuccessMsg] = useState(null);

  const validate = (values) => {
    const errors = {};
    if (!values.username) {
      errors.username = "Username is required!";
    }
    if (!values.password) {
      errors.password = "Password is required!";
    }
    return errors;
  };

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
      // do login

      const login = async () => {
        await axios
          .post(`http://localhost:8080/login`, formValues)
          .then((res) => {
            //console.log(res);
            if (res.status === 200) {
              setSuccessMsg("Login Successful...Redirecting to Dashboard");
              setTimeout(() => {
                navigate("/", { replace: true });
              }, 1500);
            }
          });
      };

      login();
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formErrors]);

  return (
    <div className="form1">
      <form action="" onSubmit={handleSubmit}>
        <h1>
          <span class="log">LOGIN</span> <br></br> <span class="to">to</span>{" "}
          <br></br>
          <span class="city">CITY GUIDE</span>
        </h1>

        <div className="username">
          <label htmlFor="username">Username</label>
          <input
            type="text"
            name="username"
            id="username"
            autoComplete="off"
            value={formValues.username}
            placeholder="Enter Username"
            onChange={handleChange}
          />
          <small>{formErrors.username}</small>
        </div>

        <div className="pass">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            name="password"
            id="password"
            autoComplete="off"
            value={formValues.password}
            placeholder="Enter Password"
            onChange={handleChange}
          />
          <small>{formErrors.password}</small>
        </div>

        <button class="button" type="submit">
          Login
        </button>
        <p>
          <b>{successMsg}</b>
        </p>
      </form>
    </div>
  );
}

export default Login;
