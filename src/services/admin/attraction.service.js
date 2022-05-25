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

export const updateAttraction= async(attr_id,attr_name,description,attr_loc,city_name)=>{
    const userDetails = JSON.parse(localStorage.getItem("user"));
    return await axios
      .put(
        BASE_URL+"/updateattr",
        {
          attr_id,
          attr_name,
          description,
          attr_loc,
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

export const postImg=(type, type_id, filename, img_url)=>{
  const userDetails = JSON.parse(localStorage.getItem("user"));
  return axios
      .post(BASE_URL+`/addimagedetails`, 
      {
        type, 
        type_id,
        filename,
        img_url
      },

      {
        headers: {
          Authorization: "Bearer " + userDetails.token,
        }
      })

}