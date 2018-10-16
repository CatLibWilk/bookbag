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

  logout: function() {
    console.log("util for logout called");
    return axios.get("/auth/logout");
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

  editNote: function(body, id){
    console.log(body)
    console.log("edit note reached util");
    return axios.put("/api/edit/note/" + id, body)
  },



  deleteCitation: function(id){
    console.log("deleteCitation function reached in util");
    return axios.delete("/api/mainpage/citation/" + id)
  },

  getCitation: function(id){
    console.log("deleteCitation function reached in util");
    return axios.get("/api/edit/citation/" + id)
  },

  createCitation: function(newCit){
    console.log(newCit)
    console.log("createCitation function reached in util");
    return axios.post("/api/mainpage/citation/", newCit)
  },

  getBibs: function(query){
    console.log(query)
    console.log('getbibs util reached');
    return axios.post("/api/harvest", query)
  }
};
