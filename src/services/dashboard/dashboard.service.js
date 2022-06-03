import axios from "axios";
import { BASE_URL } from "../../common/data";

export const getCities = () => {
  return axios.get(BASE_URL + "/getcitynames");
};

export const getCityAbout = (city) => {
  return axios.get(BASE_URL + "/city/" + city);
};

export const getAttractions = (city) => {
  return axios.get(BASE_URL + "/getattr/" + city);
};
export const getRestaurants = (city) => {
  return axios.get(BASE_URL + "/getrest/" + city);
};
export const getMetro = (city) => {
  return axios.get(BASE_URL + "/getmetro/" + city);
};
export const getBus =(city)=>{
  return axios.get(BASE_URL + "/getbus/" + city);
}
export const getImages = (type, type_id) => {
  return axios.get(BASE_URL + `/getimagedetails/${type}/${type_id}`);
};
