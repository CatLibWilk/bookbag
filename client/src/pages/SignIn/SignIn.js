import React, { Component } from "react";
import Jumbotron from "../../components/Jumbotron";
import { BrowserRouter, Route } from 'react-router-dom'
import { Redirect, Link } from "react-router-dom";
import API from "../../utils/API";

class SignIn extends Component {
  state = {
    username: "",
    password: "",
    toHomePage: "false"
  };

  handleInput = (e) => {
    const type = e.target.getAttribute('type')
    const value = e.target.value
    this.setState({
      [type]: value
    });
  }


  handleSubmit = (e) => {
    e.preventDefault();
    API.login({
      username: this.state.username,
      password: this.state.password
    })
      .then(result => {
        
          this.setState({toHomePage: true})

      })
  }
  
  
  render() {
    if(this.state.toHomePage === true){
      return <Redirect to={'/homepage'} />
    }
    return(
      <div>
        <Jumbotron />
        <div className = "container-fluid">
          <div className = "row">
            <div className = "col-md-8 mt-5 mb-5 border border-light bg-light sign-form p-3 mx-auto">
            <form>
              <div className="form-group">
                <label className="float-left ml-2">Email address</label>
                <input type="username" className="form-control" id="input-email" aria-describedby="emailHelp" placeholder="Enter email" onChange={this.handleInput}></input>
                
              </div>
              <div className="form-group mt-5">
                <label className="float-left ml-2">Password</label>
                <input type="password" className="form-control" id="input-password" placeholder="Password" onChange={this.handleInput}></input>
              </div>

              <div className="mt-5">

                <button type="submit" className="btn col-3 auth-btn m-2" onClick={this.handleSubmit}>Log In</button>

                <Link to={'/signup'}>
                <button type="submit" className="btn col-3 auth-btn m-2">Sign up</button>
                </Link>
              </div>
              
         
            </form>
            </div>
          </div>
        </div>
      </div>
      )
  }
}

export default SignIn;
