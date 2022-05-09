import "./App.css";
import React from 'react';
import "./components/LoginComponent/Login.css"
import { BrowserRouter as Router, Routes, Route,Link} from "react-router-dom";
import Login from "./components/LoginComponent/Login";

function App() {
  // return <div className="App">App Component
  // </div>;

  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        {/* <Route path="users" element={<Users />}>
          <Route path="me" element={<OwnUserProfile />} />
          <Route path=":id" element={<UserProfile />} />
         </Route> */}
      </Routes>
    </Router>
  );


}

export default App;
