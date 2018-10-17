import React, {Component} from "react";
import { Link, Redirect, withRouter } from "react-router-dom";
import API from "../../utils/API";


class Navbar extends Component {
  state = {
    loggedOut: false
  }
  handleLogout = () => {
    API.logout()
        .then( () => {
          this.setState({loggedOut: true})
        })
  }
  render() {
    if(this.state.loggedOut){
      this.props.history.push('/');
      this.setState({loggedOut: false});
    };

    return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
    <a className="navbar-brand" href="#">BookBag U+</a>
      <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>
    <div className="collapse navbar-collapse" id="navbarNav">
      <ul className="navbar-nav">
        <li className="nav-item active">
          <Link to={`/homepage/`}>
            <div className="nav-link" href="#">Home <span className="sr-only">(current)</span></div>
          </Link>
        </li>
      
        <li className="nav-item mr-auto">
        <Link to={"/"}>
          <div className="nav-link" href="#">Signin</div>
        </Link>
        </li>

        <li className="nav-item mr-auto">
          <a className="nav-link" href="#" onClick={this.handleLogout}>Signout</a>
        </li>
        
      </ul>
    </div>
  </nav>
  )}
}


export default withRouter(Navbar);
