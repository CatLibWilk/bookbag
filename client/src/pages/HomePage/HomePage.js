import React, { Component } from "react";
import { Link } from "react-router-dom";
import API from "../../utils/API";

import Jumbotron from "../../components/Jumbotron";
import Navbar from "../../components/Navbar";
import ContentDiv from "../../components/ContentDiv";
import Input from "../../components/Input";

class HomePage extends Component {
  state = {
    userClusters: []
  }

  componentDidMount() {
    this.getClusters();
  };
  
  getClusters = () => {
    API.getClusters()
        .then(result => {
          // console.log(result.data)
            this.setState({userClusters: result.data})
        });
 
  };

  handleDelete = (id) => {
    console.log("delete clicked")
    API.deleteCluster(id)
        .then(result => {
          console.log(result);
          this.getClusters();
        });
  };
  
  createClick = (e) => {
    console.log("create clicked")

    const input = e.target.parentElement.parentElement.firstElementChild;
    const newClusterName = input.value;
    console.log(newClusterName)

    API.createCluster(newClusterName)
        .then(result => {
          console.log(result);
          this.getClusters();
        })
  }

  render() {
    return(
      <div>
        <Jumbotron />
        <Navbar />
        {this.state.userClusters.map(clus => (
            <ContentDiv key={clus.id} id={clus.id} title={clus.title} button_types={["open", "delete"]} click={this.handleDelete} />
           
        ))}
        <Input click={this.createClick}/>
      </div>
      )
  }
}

export default HomePage;
