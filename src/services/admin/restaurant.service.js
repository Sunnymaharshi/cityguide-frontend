import axios from "axios";
import { BASE_URL } from "../../common/data";

  export const getRestaurants = async (event) =>{
    return await axios.get(BASE_URL+"/getrest");    
}  

export const postRestaurant = async (res_name,description,res_location,city_name,res_image)=>{
    const userDetails = JSON.parse(localStorage.getItem("user"));
    return await axios
      .post(
        BASE_URL+"/addrest",
        {
          res_name,
          description,
          res_location,
          res_image,
          city_name

        },
        {
          headers: {
            Authorization: "Bearer " + userDetails.token,
          },
        }
      )
}

export const updateRestaurant= async(res_id,res_name,description,res_location,city_name,res_image)=>{
    const userDetails = JSON.parse(localStorage.getItem("user"));
    return await axios
      .put(
        BASE_URL+"/updaterest",
        {
          res_id,
          res_name,
          description,
          res_location,
          res_image,
          city_name

        },
        {
          headers: {
            Authorization: "Bearer " + userDetails.token,
          },
        }
      )
}

export const deleteRestaurant = async(res_id)=>{
    const userDetails = JSON.parse(localStorage.getItem("user"));
    return await axios
      .delete(BASE_URL+`/deleterest/${res_id}`, {
        headers: {
          Authorization: "Bearer " + userDetails.token,
        },
      })
}