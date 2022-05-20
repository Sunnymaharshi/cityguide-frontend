import axios from "axios";
import { BASE_URL } from "../../common/data";

export const getCity = async (event) =>{
    return await axios.get(BASE_URL+"/getallcities");    
}

export const postCity = async (city_name,city_tagline, city_desc, city_image)=>{
    const userDetails = JSON.parse(localStorage.getItem("user"));
    return await axios
      .post(
        BASE_URL+"/addcity",
        {
          city_name,
          city_tagline,
          city_desc,
          city_image

        },
        {
          headers: {
            Authorization: "Bearer " + userDetails.token,
          },
        }
      )
}

export const updateCity= async(city_name,city_tagline, city_desc, city_image)=>{
    const userDetails = JSON.parse(localStorage.getItem("user"));
    return await axios
      .put(
        BASE_URL+"/updatecity",
        {
            city_name,
            city_tagline,
            city_desc,
            city_image
        },
        {
          headers: {
            Authorization: "Bearer " + userDetails.token,
          },
        }
      )
}

export const deleteCity= async(city_name)=>{
    const userDetails = JSON.parse(localStorage.getItem("user"));
    return await axios
      .delete(BASE_URL+`/deletecity/${city_name}`, {
        headers: {
          Authorization: "Bearer " + userDetails.token,
        },
      })
}