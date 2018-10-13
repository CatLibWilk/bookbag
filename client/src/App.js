import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import './App.css';

import CreateNote from "./pages/CreateNote";
import EditNote from "./pages/EditNote";
import HomePage from "./pages/HomePage";
import MainPage from "./pages/MainPage";
import SearchResults from "./pages/SearchResults";
import Signin from "./pages/SignIn";
import Signup from "./pages/SignUp";
import NoMatch from "./pages/NoMatch";
import Navbar from "./components/Navbar";


class App extends Component {
  render() {
    return (
      <div className="App">
      <Router>
        <div>
          <Navbar />
          <Switch>
            <Route exact path="/" component={Signin} />
            <Route exact path="/signup" component={Signup} />
            <Route exact path="/homepage" component={HomePage} />
            <Route exact path="/mainpage/:id" component={MainPage} />
            <Route exact path="/searchresults" component={SearchResults} />
            <Route exact path="/mainpage/:id/createnote" component={CreateNote} />
            <Route exact path="/mainpage/:id/:citId/createnote" component={CreateNote} />
            <Route exact path="/editnote/:id" component={EditNote} />
            <Route exact path="/editcitation/:id" component={EditNote} />
            <Route component={NoMatch} />
          </Switch>
        </div>
      </Router>
        
      </div>
    );
  }
}

export default App;
