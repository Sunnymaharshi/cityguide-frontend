import { useState } from "react";
import UserContext from "./user.context";
import { auth } from "../../services/auth/auth.service";
import { USER_DATA } from "../../common/data";
import { isUserLoggedin } from "../../common/functions";

const UserState = (props) => {
  const userInitials = {
    username: null,
    role: null,
  };

  const [user, setUser] = useState(userInitials);

  const checkUserLogin = () => {
    if (isUserLoggedin()) {
      const userDetails = JSON.parse(localStorage.getItem(USER_DATA));
      auth()
        .then((res) => {
          if (res.data.username !== userDetails.username) {
            localStorage.removeItem(USER_DATA);
            setUser(userInitials);
          } else {
            setUser({
              ...user,
              username: res.data.username,
              role: res.data.role,
            });
          }
        })
        .catch((err) => {
          localStorage.removeItem(USER_DATA);
          setUser(userInitials);
          if (err.response.status === 401) {
            console.log("Token has Expired!");
          } else {
            console.log(err.response);
          }
        });
    }
  };

  return (
    <UserContext.Provider value={{ user, checkUserLogin }}>
      {props.children}
    </UserContext.Provider>
  );
};

export default UserState;
