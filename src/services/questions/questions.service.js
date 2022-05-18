import axios from "axios";
import { BASE_URL } from "../../common/data";
export const getAllQuestions = (city) => {
  return axios.get(BASE_URL + "/getAllQues/" + city);
};
export const getQuestion = (id) => {
  return axios.get(BASE_URL + "/getQues/" + id);
};

export const getAnswers = (id) => {
  return axios.get(BASE_URL + "/getanswers/" + id);
};
