import React, { useEffect, useContext } from "react";
import { Route, Routes, Navigate, NavLink } from "react-router-dom";
import { isUserLoggedin } from "../../common/functions";
import UserContext from "../../context/user/user.context";

import { toast } from "react-toastify";
import UserQues from "../contributions/userQ/UserQues"
import UserAns from "../contributions/userA/UserAns"

  
export default function Contributions(){
    
  const { User, checkUserLogin } = useContext(UserContext);
    useEffect(() => {
      if(isUserLoggedin()){
        
      }
      else{
        //toast.error("Login to see your contributions...");
      }
  
      // eslint-disable-next-line
    }, []);
    
    

    return (
        <div className="admin-comp">
          
            <div className="admin-content">
              <div className="admin-bar">
                <div className="admin-btns">
                  <NavLink to="/contributions/userques" className="admin-btn">
                    Questions By You
                  </NavLink>
                  <NavLink to="/contributions/userans" className="admin-btn">
                    Answers By You
                  </NavLink>
                </div>
              </div>
    
              <Routes>
                <Route path="/" element={<Navigate replace to="userques" />} />
                <Route path="userques" element={<UserQues />} />
                <Route path="userans" element={<UserAns />} />
              </Routes>
            </div>
            {User && (
        <div className="unauthorised">Login to see your contributions</div>
        )}
        </div>
      );
}