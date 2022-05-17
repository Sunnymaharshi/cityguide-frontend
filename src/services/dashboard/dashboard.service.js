import axios from "axios";
import { BASE_URL } from "../../common/data";

export const getCities = () => {
  return axios.get(BASE_URL + "/getcitynames");
};

export const getAttractions = (city) => {
  return axios.get(BASE_URL + "/getattr/" + city);
};
export const getRestaurants = (city) => {
  return axios.get(BASE_URL + "/getrest/" + city);
};
