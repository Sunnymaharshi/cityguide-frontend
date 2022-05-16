import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Signup from "./components/signup/Signup";
import Login from "./components/login/Login";
import UserState from "./context/user/user.state";
import AdminDashboard from "./components/admindashboard/AdminDashboard";
import Dashboard from "./components/dashboard/dashboard";

function App() {
  return (
    <>
      <UserState>
        <Router>
          <Routes>
            <Route path="/*" element={<Dashboard />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/admindashboard" element={<AdminDashboard />}/>
          </Routes>
        </Router>
      </UserState>
    </>
  );
}

export default App;
