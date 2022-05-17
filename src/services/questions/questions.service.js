import axios from "axios";
import { BASE_URL } from "../../common/data";
export const getAllQuestions = (city) => {
  return axios.get(BASE_URL + "/getAllQues/" + city);
};
