import axios from "axios";
import { BASE_URL,
REPORT_ANSWER_TYPE,
REPORT_COMMENT_TYPE,
REPORT_QUESTION_TYPE,
QUES_DELETED_RES,
QUES_DELETE_UNAUTH,
ANS_DELETED_RES,
COMM_DELETED_RES} from "../../common/data";
import { toast } from "react-toastify";
import { deleteAnswer, deleteComment, deleteQuestion } from "../questions/questions.service";
export const getReports = async (event) =>{
    const userDetails = JSON.parse(localStorage.getItem("user"));
    return await axios.get(BASE_URL+"/getreports",{
        headers: {
          Authorization: "Bearer " + userDetails.token,
        },
      });    

}
export const deleteReport= (report_id,report_type,report_type_id)=>{
    const userDetails = JSON.parse(localStorage.getItem("user"));
    if(report_type===REPORT_QUESTION_TYPE)
    {
        
       deleteQuestion(report_type_id)
      .then((res) => {
        if (res.data === QUES_DELETED_RES) {
          toast.success("Report accepted & Question Deleted Successfully");
        }
      })
      .catch((err) => {
        if (err.response.data === QUES_DELETE_UNAUTH) {
          toast.error("Unauthorised!");
        } else toast.error("Unknown error!");
      });
    }
    else if(report_type===REPORT_ANSWER_TYPE){
        deleteAnswer(report_type_id).then((res) => {
            if (res.data === ANS_DELETED_RES) {
              toast.success("Report accepted & Answer Deleted Succesfully!");
            }
          });
    }
    else if(report_type===REPORT_COMMENT_TYPE){
        deleteComment(report_type_id).then((res) => {
            if (res.data === COMM_DELETED_RES) {
              toast.success("Report accepted & Comment deleted Succesfully");
            }
          });
    }
    return axios.delete(BASE_URL+`/deletereport/${report_id}`, {
        headers: {
          Authorization: "Bearer " + userDetails.token,
        },
      });

}
export const deleteRep=(report_id)=>{
    const userDetails = JSON.parse(localStorage.getItem("user"));
    return axios.delete(BASE_URL+`/deletereport/${report_id}`, {
        headers: {
          Authorization: "Bearer " + userDetails.token,
        },
      });
}