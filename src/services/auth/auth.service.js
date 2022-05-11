import axios from "axios";

const url="http://localhost:8080/";

export const logout=() => {
    localStorage.removeItem("user");
}

export const auth=() => {
    if(localStorage.getItem("user")){
        const userDetails= JSON.parse(localStorage.getItem("user"));
        return axios.get(url+"auth",{
            headers: {
                'Authorization': 'Bearer '+userDetails.token
              }
            
        });

    }
    else{
        return null;
    }
  }