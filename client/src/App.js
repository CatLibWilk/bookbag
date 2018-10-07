import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import './App.css';

import CreateNote from "./pages/CreateNote";
import EditNote from "./pages/EditNote";
import HomePage from "./pages/HomePage";
import MainPage from "./pages/MainPage";
import SearchResults from "./pages/SearchResults";
import Signin from "./pages/SignIn";
import NoMatch from "./pages/NoMatch";

class App extends Component {
  render() {
    return (
      <div className="App">
      <Router>
        <div>
          <Switch>
            <Route exact path="/" component={Signin} />
            <Route exact path="/homepage" component={HomePage} />
            <Route exact path="/mainpage" component={MainPage} />
            <Route exact path="/searchresults" component={SearchResults} />
            <Route exact path="/createnote" component={CreateNote} />
            <Route exact path="/editnote" component={EditNote} />
            <Route component={NoMatch} />
          </Switch>
        </div>
      </Router>
        
      </div>
    );
  }
}

export default App;
