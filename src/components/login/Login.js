import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { login } from "../../services/user/user.service";
import { toast } from "react-toastify";
import {
  USER_DATA,
  INVALID_USERNAME_RES,
  INVALID_PASSWORD_RES,
} from "../../common/data";
import { validateLogin } from "./login-validator";
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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    setFormErrors(validateLogin(formValues));
    setIsSubmit(true);
  };

  useEffect(() => {
    if (Object.keys(formErrors).length === 0 && isSubmit) {
      // do login

      login(formValues)
        .then((res) => {
          if (res.data.token) {
            localStorage.setItem(
              USER_DATA,
              JSON.stringify({
                username: formValues.username,
                token: res.data.token,
              })
            );
            toast.success("Loggedin Successfully");
            navigate("/", { replace: true });
          } else if (res.data === INVALID_USERNAME_RES) {
            setFormErrors({ ...formErrors, username: res.data });
          } else if (res.data === INVALID_PASSWORD_RES) {
            setFormErrors({ ...formErrors, password: res.data });
          }
        })
        .catch((err) => {
          console.log("login error", err);
        });
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formErrors]);

  return (
    <div className="login-comp">
      <form onSubmit={handleSubmit}>
        <h1 className="login-logo">City Guide</h1>

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
        <div className="login-div">
          <button type="submit" className="login-btn">
            Login
          </button>
        </div>
        <p className="signup-link1">
          <Link to="/signup" className="signup-link">
            <b>Create Account</b>
          </Link>
        </p>
        <p className="signup-link1">
          Don't want to Login?{" "}
          <Link to="/home" className="signup-link">
            <b>Goto Home</b>
          </Link>
        </p>
      </form>
    </div>
  );
}

export default Login;
