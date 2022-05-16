import axios from "axios";
import { BASE_URL } from "../../common/data";

export const login = (loginDetails) => {
  return axios.post(BASE_URL + "/login", loginDetails);
};

export const signup = (signupDetails) => {
  return axios.post(BASE_URL + "/signup", signupDetails);
};
