import axios from "axios";
import { BASE_URL } from "../../common/data";
export const postMetro = async (city_name,metromap_img)=>{
    const userDetails = JSON.parse(localStorage.getItem("user"));
    return await axios
      .post(
        BASE_URL+"/addmetro",
        {
          city_name,
          metromap_img

        },
        {
          headers: {
            Authorization: "Bearer " + userDetails.token,
          },
        }
      )
}

export const uploadFile = (city_name,selectedFile) => {


    console.log(selectedFile);
    const formData = new FormData();
      formData.append('image',selectedFile)
    const userDetails = JSON.parse(localStorage.getItem("user"));
      return axios
        .post(BASE_URL+`/imageUpload/${city_name}`, formData,
  
        {
          headers: {
            Authorization: "Bearer " + userDetails.token,
            'content-type': 'multipart/form-data'
          }
        })
    }
export const getimgurl=(city_name,selectedFile)=>{
   
    return axios.get(BASE_URL+`/geturl/${city_name}/${selectedFile.name}`)}