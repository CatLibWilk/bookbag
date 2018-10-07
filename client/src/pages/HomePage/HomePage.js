import React, { Component } from "react";
import { Link } from "react-router-dom";
import API from "../../utils/API";

import Jumbotron from "../../components/Jumbotron";
import Navbar from "../../components/Navbar";

class HomePage extends Component {
  render() {
    return(
      <div>
        <Jumbotron />
        <Navbar />
      </div>
      )
  }
}

export default HomePage;
