import axios from "axios";
import { BASE_URL } from "../../common/data";

  export const getAttractions = async (event) =>{
    return await axios.get(BASE_URL+"/getattr");    
}  

export const postAtrraction = async (attr_name,description,attr_loc,city_name, attr_img)=>{
    const userDetails = JSON.parse(localStorage.getItem("user"));
    return await axios
      .post(
        BASE_URL+"/addattr",
        {
          attr_name,
          description,
          attr_loc,
          attr_img,
          city_name
          

        },
        {
          headers: {
            Authorization: "Bearer " + userDetails.token,
          },
        }
      )
}

export const updateAttraction= async(attr_id,attr_name,description,attr_loc,city_name,attr_img)=>{
    const userDetails = JSON.parse(localStorage.getItem("user"));
    return await axios
      .put(
        BASE_URL+"/updateattr",
        {
          attr_id,
          attr_name,
          description,
          attr_loc,
          attr_img,
          city_name

        },
        {
          headers: {
            Authorization: "Bearer " + userDetails.token,
          },
        }
      )
}

export const deleteAttraction = async(attr_id)=>{
    const userDetails = JSON.parse(localStorage.getItem("user"));
    return await axios
      .delete(BASE_URL+`/deleteattr/${attr_id}`, {
        headers: {
          Authorization: "Bearer " + userDetails.token,
        },
      })
}