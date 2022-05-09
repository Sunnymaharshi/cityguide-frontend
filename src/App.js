import "./App.css";
import Navbar from "./components/navbar/Navbar";
import React from 'react';
import "./components/LoginComponent/Login.css"
import { BrowserRouter as Router, Routes, Route} from "react-router-dom";
import Login from "./components/LoginComponent/Login";

function App() {
  return <>
    <Navbar />
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        
      </Routes>
    </Router>
  <div className="App">App Component</div>
  </>
}

export default App;