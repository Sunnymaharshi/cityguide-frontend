import React, { useState } from "react";
import "./Login.css";

function Login(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  //const [gender, setGender] = useState('');
  const [allRecords, setAllRecords] = useState([]);

  const submitForm = (e) => {
    e.preventDefault();
    const newRecord = { email: email, password: password };
    setAllRecords([...allRecords, newRecord]);
    props.history.push({
      pathname: "/temp",
      state: allRecords,
    });
  };

  return (
    <div class="form">
      <form action="" onSubmit={submitForm}>
        <h1>
          <span class="log">LOGIN</span> <br></br> <span class="to">to</span>{" "}
          <br></br>
          <span class="city">CITY GUIDE</span>
        </h1>

        <div class="email">
          <label htmlFor="email">Email</label>
          <br></br>
          <input
            type="email"
            name="email"
            id="email"
            autoComplete="off"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div class="pass">
          <label htmlFor="password">Password</label>
          <br></br>
          <input
            type="password"
            name="password"
            id="password"
            autoComplete="off"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <button class="button" type="submit">
          Login
        </button>
      </form>
    </div>
  );
}

export default Login;
