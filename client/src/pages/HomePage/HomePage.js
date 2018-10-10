import React, { Component } from "react";
import { Link } from "react-router-dom";
import API from "../../utils/API";

import Jumbotron from "../../components/Jumbotron";
import Navbar from "../../components/Navbar";

class HomePage extends Component {
  state = {
    userClusters: []
  }

  componentDidMount() {
    API.getClusters()
        .then(result => {
          // console.log(result.data)

            this.setState({userClusters: result.data})
        
        })
  }

  render() {
    return(
      <div>
        <Jumbotron />
        <Navbar />
        {this.state.userClusters.map(clus => (
          
            <h1>{clus.title}</h1>
          
        ))}
        
      </div>
      )
  }
}

export default HomePage;
