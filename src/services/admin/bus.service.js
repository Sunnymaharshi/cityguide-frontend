import axios from "axios";
import { BASE_URL } from "../../common/data";
import { authHeader } from "../../common/functions";
export const postBus = async (bus_codes,bus_routes,source, destination,city_name)=>{
    return await axios
      .post(
        BASE_URL+"/addbus",
        {
          bus_codes,
          bus_routes,
          source,
          destination,
          city_name

        },
       authHeader()
      )
}
export const deleteBus= async(bus_id)=>{
  return await axios
    .delete(BASE_URL+`/removebus/${bus_id}`, authHeader())
}
export const getBuses = async(event)=>{
  return await axios.get(BASE_URL+'/getbuses', authHeader());
}
