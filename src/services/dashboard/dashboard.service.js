import axios from "axios";
import { BASE_URL } from "../../common/data";

export const getCities = () => {
  return axios.get(BASE_URL + "/getcitynames");
};
