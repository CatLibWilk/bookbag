import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect, withRouter } from "react-router-dom";
import './App.css';
import API from "./utils/API";

import CreateNote from "./pages/CreateNote";
import EditNote from "./pages/EditNote";
import HomePage from "./pages/HomePage";
import MainPage from "./pages/MainPage";
import SearchResults from "./pages/SearchResults";
import Signin from "./pages/SignIn";
import Signup from "./pages/SignUp";
import NoMatch from "./pages/NoMatch";
import Navbar from "./components/Navbar";
// import Footer from "./components/Footer";


class App extends Component {
  
  state = {
    loggedOut: false,
    signin: false
  };

  handleLogout = () => {
    console.log("logout clicked");
    API.logout()
        .then( () => {
          this.setState({loggedOut: true})
        })
  }

  render() {

    
    return (
      <div className="App">
      <Router>
        <div>
          
          <Navbar click={this.handleLogout}/>
          <Switch>
            <Route exact path="/" component={Signin} />
            <Route exact path="/signup" component={Signup} />
            <Route exact path="/homepage" component={HomePage} />
            <Route exact path="/mainpage/:id" component={MainPage} />
            <Route exact path="/searchresults" component={SearchResults} />
            <Route exact path="/mainpage/:id/createnote" component={CreateNote} />
            <Route exact path="/mainpage/:id/:citId/createnote" component={CreateNote} />
            <Route exact path="/mainpage/:clusId/editnote/:id" component={EditNote} />
            <Route exact path="/editcitation/:id" component={EditNote} />
            <Route component={NoMatch} />
          </Switch>
        </div>
      </Router>
          <div className="footer col-12">BookBag+ 2018</div>
        
      </div>
    );
  }
}

export default App;
