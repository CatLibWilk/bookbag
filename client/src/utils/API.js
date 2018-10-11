import axios from "axios";

export default {
  // Gets all books
  signup: function(signinInfo) {
    console.log('call reached util signup')
    console.log(signinInfo)
    return axios.post("/auth/signup", signinInfo);
  },

  login: function(loginInfo) {
    console.log("to util login function")
    return axios.post("/auth/login", loginInfo);
  },

  getClusters: function() {
    return axios.get("/api/clusters");
  },
  
  getCluster: function(id){
    console.log('reached util from mainpage')
    return axios.get("/api/mainpage/" + id)
  },

  deleteNote: function(id){
    console.log("deleteNote function reached in util");
    return axios.delete("/api/mainpage/deletenote/" + id)
  },

  deleteCitation: function(id){
    console.log("deleteCitation function reached in util");
    return axios.delete("/api/mainpage/deletecitation/" + id)
  }
};
