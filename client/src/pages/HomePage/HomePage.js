import React, { Component } from "react";
import { Link } from "react-router-dom";
import API from "../../utils/API";

import Jumbotron from "../../components/Jumbotron";
import Navbar from "../../components/Navbar";
import ContentDiv from "../../components/ContentDiv"

class HomePage extends Component {
  state = {
    userClusters: []
  }

  componentDidMount() {
    API.getClusters()
        .then(result => {
          // console.log(result.data)

            this.setState({userClusters: result.data})
        
        });
  };

  handleDelete = (id) => {
    console.log("delete clicked")
    console.log(id)
  }
  
  createClick = (e) => {
    console.log("create clicked")
    console.log(e.target)
  }

  render() {
    return(
      <div>
        <Jumbotron />
        <Navbar />
        {this.state.userClusters.map(clus => (
            <ContentDiv key={clus.id} id={clus.id} title={clus.title} button_types={["open", "delete"]} click={this.handleDelete} />
           
        ))}
        <div className="btn btn-success" onClick={this.createClick}>Create New Cluster</div>
      </div>
      )
  }
}

export default HomePage;
