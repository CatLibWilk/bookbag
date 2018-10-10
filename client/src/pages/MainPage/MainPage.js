import React, { Component } from "react";
import { Link } from "react-router-dom";
import API from "../../utils/API";

class MainPage extends Component {
  state = {
    current: []
  }
  
  componentDidMount() {
    console.log('did mount runs mainpage')
    API.getCluster(this.props.match.params.id)
      .then(res => console.log(res))
      .catch(err => console.log(err));
  }
  render() {
    return(
      <h1>MainPage</h1>
      )
  }
}

export default MainPage;
