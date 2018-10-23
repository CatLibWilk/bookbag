import React, { Component } from "react";
import { Link } from "react-router-dom";
import API from "../../utils/API";

import Jumbotron from "../../components/Jumbotron";
import Navbar from "../../components/Navbar";
import ContentDiv from "../../components/ContentDiv";
import Input from "../../components/Input";

class HomePage extends Component {
  state = {
    userClusters: [],
    helped: "false"
  }

  componentDidMount() {
    const localStor = localStorage.getItem('helped');
    this.setState({helped: localStor})
    this.getClusters();

    setTimeout(this.colorCards, 500);
    setTimeout(this.helpCheck, 50);
  };

  helpCheck = () => {

    if(this.state.helped === "false"){
      setTimeout(this.slideIn, 1000)
    };
  };

  slideIn = () => {
    // console.log('slidein running')
    document.querySelector(".mainpage-welcome").classList.add('main-slide');
    setTimeout(this.mainOut, 6000);
    
  };

  mainOut = () => {
    document.querySelector(".mainpage-welcome").classList.add('main-out');
    localStorage.setItem('helped', "true");

  }
  
  getClusters = () => {
    API.getClusters()
        .then(result => {
          // console.log(result.data)
            this.setState({userClusters: result.data})
            this.colorCards();  
        });
        
      };

    colorCards = () => {
      // console.log("colorCards running")
      const cards = document.querySelectorAll('.card');
      // console.log(cards)
      for(let i = 0; i<cards.length; i++){
        if(i<4){
          cards[i].classList.add(`cardColor${i}`)
        }if(i>4 && i<8){
          cards[i].classList.add(`cardColor${i-4}`)
        }else{
          cards[i].classList.add(`cardColor0`)
        }
      }
     }

  handleDelete = (id) => {
    // console.log("delete clicked")
    API.deleteCluster(id)
        .then(result => {
          console.log(result);
          this.getClusters();
        });
  };
  
  createClick = (e) => {
    // console.log("create clicked")

    const input = e.target.parentElement.parentElement.firstElementChild;
    const newClusterName = input.value;
    console.log(newClusterName)

    API.createCluster(newClusterName)
        .then(result => {
          // console.log(result);
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
        <div id="mainpage-welcome" className="col-8 mx-auto mainpage-welcome">
          <h1>Welcome to Bookbag+!</h1>
          <p>Enter a new cluster name to get a research package started, or select any of the saved clusters to view your current work!</p>
        </div>
        {this.state.userClusters.map(clus => (
          <ContentDiv margin={"m-3"} key={clus.id} id={clus.id} title={clus.title} button_types={["open", "delete"]} click={this.handleDelete} />
          
          ))}
      </div>
      </div>
      )
  }
}

export default HomePage;
