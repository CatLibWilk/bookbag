import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";
import API from "../../utils/API";
import Form from "../../components/Form";

class CreateNote extends Component {
  state = {
    toMainPage: false
  }

  handleSubmit = (e) => {
    e.preventDefault();
    const body = document.getElementById("text-area").value;
    let newNote = {};
    if(this.props.match.params.citId){
        newNote = {
        clusId: this.props.match.params.id,
        citId: this.props.match.params.citId,
        body: body
      }
    }else{
      newNote = {
        clusId: this.props.match.params.id,
        body: body
      }
    }
    API.createNote(newNote)
        .then(result => {
          this.setState({toMainPage: "true"});
        });
  }

  render() {
    if(this.state.toMainPage === "true"){
      return <Redirect to={`/mainpage/${this.props.match.params.id}`} />
    }

   
    return(

        <div className="cointainer-fluid">
        <Form click={(e) => this.handleSubmit} text={"Enter a new note here"}/>
        </div>
        
      )
    }
  
  
}

export default CreateNote;
