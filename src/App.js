import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Signup from "./components/Signup/Signup";
import Login from "./components/login/Login";
import Dashboard from "./components/dashboard/dashboard";
import Sidebar from "./components/sidenav/Sidebar";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
        </Routes>
      </Router>
      {/* <div className="App">App Component</div> */}
    </>
  );
}

export default App;
