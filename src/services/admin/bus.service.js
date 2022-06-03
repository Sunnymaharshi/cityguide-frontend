import axios from "axios";
import { BASE_URL } from "../../common/data";
import { authHeader } from "../../common/functions";
export const postBus = async (city_name,busmap_img, description, filename)=>{
    return await axios
      .post(
        BASE_URL+"/addbus",
        {
          city_name,
          busmap_img,
          description,
          filename

        },
       authHeader()
      )
}

export const uploadFile = (city_name,selectedFile) => {
    const formData = new FormData();
      formData.append('image',selectedFile)
      return axios
        .post(BASE_URL+`/imageUpload/${city_name}`, formData,authHeader())
    }
export const getimgurl=(city_name,selectedFile)=>{
   
    return axios.get(BASE_URL+`/geturl/${city_name}/${selectedFile.name}`)}