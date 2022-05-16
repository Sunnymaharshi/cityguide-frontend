import axios from "axios";
import { USER_DATA, BASE_URL } from "../../common/data";

export const logout = () => {
  localStorage.removeItem(USER_DATA);
};

export const auth = () => {
  const userDetails = JSON.parse(localStorage.getItem(USER_DATA));
  return axios.get(BASE_URL + "/auth", {
    headers: {
      Authorization: "Bearer " + userDetails.token,
    },
  });
};
