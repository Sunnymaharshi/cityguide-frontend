import axios from "axios";
import { BASE_URL } from "../../common/data";
import { authHeader } from "../../common/functions";

export const getCity = async (event) =>{
    return await axios.get(BASE_URL+"/getallcities");    
}

export const postCity = async (city_name,city_tagline, city_desc, city_image)=>{
    return await axios
      .post(
        BASE_URL+"/addcity",
        {
          city_name,
          city_tagline,
          city_desc,
          city_image

        },
        authHeader()
      )
}

export const updateCity= async(city_name,city_tagline, city_desc, city_image)=>{
    return await axios
      .put(
        BASE_URL+"/updatecity",
        {
            city_name,
            city_tagline,
            city_desc,
            city_image
        },
        authHeader()
      )
}

export const deleteCity= async(city_name)=>{
    return await axios
      .delete(BASE_URL+`/deletecity/${city_name}`, authHeader())
}

export const uploadFile = (city_name,selectedFile) => {
    const formData = new FormData();
    formData.append('image',selectedFile)
      return axios
        .post(BASE_URL+`/imageUpload/${city_name}`, formData,authHeader())
    }
export const getimgurl=(city_name,selectedFile)=>{
   
    return axios.get(BASE_URL+`/geturl/${city_name}/${selectedFile.name}`)}
export const postImg=(type, type_id, filename, img_url)=>{
  return axios
      .post(BASE_URL+`/addimagedetails`, 
      {
        type, 
        type_id,
        filename,
        img_url
      },
      authHeader())

}