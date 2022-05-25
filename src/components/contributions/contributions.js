import React, { useContext } from "react";
import { Route, Routes, Navigate, NavLink } from "react-router-dom";
import UserContext from "../../context/user/user.context";
import UserQues from "../contributions/userQ/UserQues"
import UserAns from "../contributions/userA/UserAns"

  
export default function Contributions(){
    
  const { user} = useContext(UserContext);
  
    return (
        <div className="admin-comp">
            {user.username && (
            <div className="admin-content">
              <div className="admin-bar">
                <div className="admin-btns">
                  <NavLink to="/contributions/userques" className="admin-btn">
                    Your Questions
                  </NavLink>
                  <NavLink to="/contributions/userans" className="admin-btn">
                    Your Answers
                  </NavLink>
                </div>
              </div>
    
              <Routes>
                <Route path="/" element={<Navigate replace to="userques" />} />
                <Route path="userques" element={<UserQues />} />
                <Route path="userans" element={<UserAns />} />
              </Routes>
            </div>
            )}
            {!user.username && (
        <div className="unauthorised" >Login to see your contributions</div>
        )}
        </div>
      );
}