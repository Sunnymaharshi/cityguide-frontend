import axios from "axios";
import { BASE_URL, USER_DATA } from "../../common/data";
export const getAllQuestions = (city) => {
  return axios.get(BASE_URL + "/getAllQues/" + city);
};
export const getQuestion = (id) => {
  return axios.get(BASE_URL + "/getQues/" + id);
};

export const getAnswers = (id) => {
  return axios.get(BASE_URL + "/getanswers/" + id);
};

export const postComment = (comment) => {
  const userDetails = JSON.parse(localStorage.getItem(USER_DATA));

  return axios.post(BASE_URL + "/postcmnt", comment, {
    headers: {
      Authorization: "Bearer " + userDetails.token,
    },
  });
};
