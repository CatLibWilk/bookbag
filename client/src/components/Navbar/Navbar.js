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
          <div>
            <ul className="navbar-nav pr-2">
              <li className="nav-item active d-inline">
                <Link to={`/homepage/`}>
                  <div className="nav-link" href="#">Home <span className="sr-only">(current)</span></div>
                </Link>
              </li>
            
              <li className="nav-item d-inline">
              <Link to={"/"}>
                <div className="nav-link" href="#">Signin</div>
              </Link>
              </li>
      
              <li className="nav-item d-inline">
                <a className="nav-link" href="#" onClick={this.handleLogout}>Signout</a>
              </li>
            </ul>
          </div>
        </nav>
  )}
}


export default withRouter(Navbar);


