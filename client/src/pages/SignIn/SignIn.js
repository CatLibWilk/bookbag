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
        if(result.data === "already reg"){
          alert("Email taken")
        }else{
          console.log(result)
          this.setState({toHomePage: true})
        }
    
        //want a redirect here but havent been able to figure it out yet//
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
            <div className = "col-md-8 mt-5 border border-light mx-auto">
            <form>
              <div className="form-group">
                <label>Email address</label>
                <input type="username" className="form-control" id="input-email" aria-describedby="emailHelp" placeholder="Enter email" onChange={this.handleInput}></input>
                
              </div>
              <div className="form-group">
                <label>Password</label>
                <input type="password" className="form-control" id="input-password" placeholder="Password" onChange={this.handleInput}></input>
              </div>
              
              <button type="submit" className="btn btn-primary" onClick={this.handleSubmit}>Log In</button>

              <Link to={'/signup'}>
              <button type="submit" className="btn btn-primary">Sign up</button>
              </Link>
              
         
            </form>
            </div>
          </div>
        </div>
      </div>
      )
  }
}

export default SignIn;
