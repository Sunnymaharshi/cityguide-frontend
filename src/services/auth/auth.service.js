import axios from "axios";

const url = "http://localhost:8080/";

export const logout = () => {
  localStorage.removeItem("user");
};

export const auth = () => {
  const userDetails = JSON.parse(localStorage.getItem("user"));
  return axios.get(url + "auth", {
    headers: {
      Authorization: "Bearer " + userDetails.token,
    },
  });
};
