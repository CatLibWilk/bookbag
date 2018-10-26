import axios from "axios";

export default {
  // signin/up
  signup: function(signinInfo) {

    console.log(signinInfo)
    return axios.post("/auth/signup", signinInfo);
  },

  login: function(loginInfo) {

    return axios.post("/auth/login", loginInfo);
  },

  logout: function() {

    return axios.get("/auth/logout");
  },



  //clusters
  getClusters: function() {
    return axios.get("/api/clusters");
  },
  
  getCluster: function(id){

    return axios.get("/api/clusters/" + id)
  },

  createCluster: function(name){

    return axios.post("/api/clusters/" + name)
  },

  deleteCluster: function(id){

    return axios.delete("/api/clusters/" + id)
  },



  //notes and citations
  deleteNote: function(id){

    return axios.delete("/api/mainpage/note/" + id)
  },

  getNote: function(id){

    return axios.get("/api/mainpage/note/" + id)
  },

  createNote: function(newNote){


    return axios.post("/api/mainpage/note", newNote)
  },

  editNote: function(body, id){


    return axios.put("/api/mainpage/note/" + id, body)
  },



  deleteCitation: function(id){

    return axios.delete("/api/mainpage/citation/" + id)
  },

  getCitation: function(id){

    return axios.get("/api/mainpage/citation/" + id)
  },

  createCitation: function(newCit){


    return axios.post("/api/mainpage/citation/", newCit)
  },

  getBibs: function(query){


    return axios.post("/api/harvest", query)
  }
};
