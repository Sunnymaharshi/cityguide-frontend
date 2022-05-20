import axios from "axios";
import { BASE_URL } from "../../common/data";
import { authHeader } from "../../common/functions";
export const getAllQuestions = (city) => {
  return axios.get(BASE_URL + "/getAllQues/" + city);
};
export const getSimilarQuestions = (city, query) => {
  return axios.get(BASE_URL + `/getsimques/${city}/${query}`);
};
export const getQuestion = (id) => {
  return axios.get(BASE_URL + "/getQues/" + id);
};
export const postQuestion = (ques) => {
  return axios.post(BASE_URL + "/postques", ques, authHeader());
};

export const getAnswers = (id) => {
  return axios.get(BASE_URL + "/getanswers/" + id);
};
export const getAnswer = (ans_id) => {
  return axios.get(BASE_URL + "/getanswer/" + ans_id);
};

export const postAnswer = (answer) => {
  return axios.post(BASE_URL + "/postans", answer, authHeader());
};
export const postComment = (comment) => {
  return axios.post(BASE_URL + "/postcmnt", comment, authHeader());
};

export const checkLike = (ans_id) => {
  return axios.get(BASE_URL + "/checkvote/" + ans_id, authHeader());
};
export const addLike = (ans_id) => {
  return axios.put(BASE_URL + "/upvote/" + ans_id, null, authHeader());
};
export const addDislike = (ans_id) => {
  return axios.put(BASE_URL + "/downvote/" + ans_id, null, authHeader());
};
