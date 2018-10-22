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
    setTimeout(this.colorCards, 500)
  };
  
  getClusters = () => {
    API.getClusters()
        .then(result => {
          // console.log(result.data)
            this.setState({userClusters: result.data})
            this.colorCards();  
        });
        
      };

    colorCards = () => {
      console.log("colorCards running")
      const cards = document.querySelectorAll('.card');
      console.log(cards)
      for(let i = 0; i<cards.length; i++){
        console.log(`loop ${i}`)
         cards[i].classList.add(`cardColor${i}`)
      }
     }

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
          this.colorCards();
        });
  }

  render() {
    return(
      <div>
        <Jumbotron />
        <div className="container-fluid">
        <div className="mt-3">
          <Input label={'Add Cluster'} passedPlaceholder={'enter a name to create a new cluster'}click={this.createClick}/>
        </div>
        {this.colorCards()}
        {this.state.userClusters.map(clus => (
          <ContentDiv key={clus.id} id={clus.id} title={clus.title} button_types={["open", "delete"]} click={this.handleDelete} />
          
          ))}
      </div>
      </div>
      )
  }
}

export default HomePage;
