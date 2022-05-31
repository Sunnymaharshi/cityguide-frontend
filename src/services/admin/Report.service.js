import axios from "axios";
import { BASE_URL,
REPORT_ANSWER_TYPE,
REPORT_COMMENT_TYPE,
REPORT_QUESTION_TYPE,
QUES_DELETED_RES,
QUES_DELETE_UNAUTH,
ANS_DELETED_RES,
ANS_DELETE_UNAUTH,
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
export const deleteReport= (report_type,report_type_id)=>{
    const userDetails = JSON.parse(localStorage.getItem("user"));
    if(report_type===REPORT_QUESTION_TYPE)
    {
        
       return deleteQuestion(report_type_id)
      .then((res) => {
        console.log(res);
        if (res.data === QUES_DELETED_RES) {
          toast.success("Report accepted & Question Deleted Successfully");
        }
      })
      .catch((err) => {
        if (err.response.data === QUES_DELETE_UNAUTH) {
          toast.error("Unauthorised!");
        } else if(err.response.status===500) toast.error("Question not found, Delete Report!");
        else
        toast.error("Unknown Error!");
      });
    }
    else if(report_type===REPORT_ANSWER_TYPE){
        return deleteAnswer(report_type_id)
        .then((res) => {
            if (res.data === ANS_DELETED_RES) {
              toast.success("Report accepted & Answer Deleted Succesfully!");
            }

          })
          .catch((err) => {
            if (err.response.data === ANS_DELETE_UNAUTH) {
              toast.error("Unauthorised!");
            } else if(err.response.status===500) toast.error("Answer not found, Delete Report!");
            else
            toast.error("Unknown Error!");
          });
          
    }
    else if(report_type===REPORT_COMMENT_TYPE){
        return deleteComment(report_type_id).then((res) => {
            if (res.data === COMM_DELETED_RES) {
              toast.success("Report accepted & Comment deleted Succesfully");
            }
          })
          .catch((err) => {
            if(err.response.status===500) toast.error("Comment not found, Delete Report!");
            else
            toast.error("Unknown Error!");
          });
    }
 

}
export const deleteRep=(report_id)=>{
    const userDetails = JSON.parse(localStorage.getItem("user"));
    return axios.delete(BASE_URL+`/deletereport/${report_id}`, {
        headers: {
          Authorization: "Bearer " + userDetails.token,
        },
      });
}