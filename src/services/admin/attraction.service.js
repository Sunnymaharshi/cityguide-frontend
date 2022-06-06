import axios from "axios";
import { BASE_URL } from "../../common/data";
import { authHeader } from "../../common/functions";

export const getAttractions = async (event) => {
  return await axios.get(BASE_URL + "/getattr");
};

export const postAtrraction = async (
  attr_name,
  description,
  attr_loc,
  city_name,
  attr_img
) => {
  return await axios.post(
    BASE_URL + "/addattr",
    {
      attr_name,
      description,
      attr_loc,
      attr_img,
      city_name,
    },
    authHeader()
  );
};

export const updateAttraction = async (
  attr_id,
  attr_name,
  description,
  attr_loc,
  city_name
) => {
  return await axios.put(
    BASE_URL + "/updateattr",
    {
      attr_id,
      attr_name,
      description,
      attr_loc,
      city_name,
    },
    authHeader()
  );
};

export const deleteAttraction = async (attr_id) => {
  return await axios.delete(BASE_URL + `/deleteattr/${attr_id}`, authHeader());
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
  return axios.post(
    BASE_URL + `/addimagedetails`,
    {
      type,
      type_id,
      filename,
      img_url,
    },
    authHeader()
  );
};
