import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Signup from "./components/Signup/Signup";
import Navbar from "./components/navbar/Navbar";
import Login from "./components/login/Login";

function App() {
  return (
    <>
      <Navbar />
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
        </Routes>
      </Router>
      <div className="App">App Component</div>
    </>
  );
}

export default App;
