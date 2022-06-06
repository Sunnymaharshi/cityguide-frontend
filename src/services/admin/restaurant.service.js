import axios from "axios";
import { BASE_URL } from "../../common/data";
import { authHeader } from "../../common/functions";

export const getRestaurants = async (event) => {
  return await axios.get(BASE_URL + "/getrest");
};

export const postRestaurant = async (
  res_name,
  description,
  res_location,
  city_name,
  res_image
) => {
  return await axios.post(
    BASE_URL + "/addrest",
    {
      res_name,
      description,
      res_location,
      res_image,
      city_name,
    },
    authHeader()
  );
};

export const updateRestaurant = async (
  res_id,
  res_name,
  description,
  res_location,
  city_name
) => {
  return await axios.put(
    BASE_URL + "/updaterest",
    {
      res_id,
      res_name,
      description,
      res_location,
      city_name,
    },
    authHeader()
  );
};

export const deleteRestaurant = async (res_id) => {
  return await axios.delete(BASE_URL + `/deleterest/${res_id}`, authHeader());
};

export const uploadFile = (city_name, selectedFile) => {
  const formData = new FormData();
  formData.append("image", selectedFile);
  return axios.post(
    BASE_URL + `/imageUpload/${city_name}`,
    formData,
    authHeader()
  );
};
export const getimgurl = (city_name, selectedFile) => {
  return axios.get(BASE_URL + `/geturl/${city_name}/${selectedFile.name}`);
};

export const postImg = (type, type_id, filename, img_url) => {
  return axios.post(BASE_URL + `/addimagedetails`, {
    type,
    type_id,
    filename,
    img_url,
  });
};
