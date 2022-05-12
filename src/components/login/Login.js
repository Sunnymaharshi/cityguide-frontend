import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
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
            if (res.data.token) {
              localStorage.setItem(
                "user",
                JSON.stringify({
                  username: formValues.username,
                  token: res.data.token,
                })
              );

              navigate("/", { replace: true });
            } else if (res.data === "Username does not exist!") {
              setFormErrors({ ...formErrors, username: res.data });
            } else if (res.data === "Wrong Password!") {
              setFormErrors({ ...formErrors, password: res.data });
            }
          });
      };

      login();
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formErrors]);

  return (
    <div className="login-comp">
      <form onSubmit={handleSubmit}>
        <h1>City Guide</h1>

        <div className="form-group">
          <label htmlFor="username">Username</label>
          <input
            type="text"
            name="username"
            id="username"
            value={formValues.username}
            placeholder="Username"
            onChange={handleChange}
            className="form-control"
          />
          <small>{formErrors.username}</small>
        </div>

        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            name="password"
            id="password"
            value={formValues.password}
            placeholder="Password"
            onChange={handleChange}
            className="form-control"
          />
          <small>{formErrors.password}</small>
        </div>
        <div className="login-btn">
          <button type="submit">Login</button>
        </div>
        <p>
          <Link to="/signup" className="signup-link">
            <b>Create Account</b>
          </Link>
        </p>
      </form>
    </div>
  );
}

export default Login;
