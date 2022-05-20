import { USER_DATA } from "./data";

export const isUserLoggedin = () => {
  return localStorage.getItem(USER_DATA) !== null;
};

export const authHeader = () => {
  if (localStorage.getItem(USER_DATA) !== null) {
    const userDetails = JSON.parse(localStorage.getItem(USER_DATA));
    return {
      headers: {
        Authorization: "Bearer " + userDetails.token,
      },
    };
  }
  return null;
};

export const getUserData = () => {
  return JSON.parse(localStorage.getItem(USER_DATA));
};
