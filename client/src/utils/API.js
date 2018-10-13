import axios from "axios";

export default {
  // signin/up
  signup: function(signinInfo) {
    console.log('call reached util signup')
    console.log(signinInfo)
    return axios.post("/auth/signup", signinInfo);
  },

  login: function(loginInfo) {
    console.log("to util login function")
    return axios.post("/auth/login", loginInfo);
  },



  //clusters
  getClusters: function() {
    return axios.get("/api/clusters");
  },
  
  getCluster: function(id){
    console.log('reached util from mainpage')
    return axios.get("/api/mainpage/" + id)
  },

  createCluster: function(name){
    console.log('reached util from mainpage')
    return axios.post("/api/clusters/" + name)
  },

  deleteCluster: function(id){
    console.log('reached util from mainpage')
    return axios.delete("/api/clusters/" + id)
  },



  //notes and citations
  deleteNote: function(id){
    console.log("deleteNote function reached in util");
    return axios.delete("/api/mainpage/note/" + id)
  },

  getNote: function(id){
    console.log("deleteNote function reached in util");
    return axios.get("/api/edit/note/" + id)
  },

  createNote: function(newNote){
    console.log(newNote)
    console.log("create note reached util");
    return axios.post("/api/mainpage/note", newNote)
  },

  deleteCitation: function(id){
    console.log("deleteCitation function reached in util");
    return axios.delete("/api/mainpage/citation/" + id)
  },

  getCitation: function(id){
    console.log("deleteCitation function reached in util");
    return axios.get("/api/edit/citation/" + id)
  }
};
