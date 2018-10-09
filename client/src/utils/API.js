import axios from "axios";

export default {
  // Gets all books
  signin: function(signinInfo) {
    console.log('call reached util')
    console.log(signinInfo)
    return axios.post("/api/signin", signinInfo);
  },

  login: function(loginInfo) {
    console.log("to util login function")
    return axios.post("/auth/login", loginInfo);
  }
  
};
