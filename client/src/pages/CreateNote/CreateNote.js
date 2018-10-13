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
          console.log("resturned from server")
          this.setState({toMainPage: "true"});
        });
  }

  render() {
    if(this.state.toMainPage === "true"){
      return <Redirect to={`/mainpage/${this.props.match.params.id}`} />
    }
    return(
      <Form click={(e) => this.handleSubmit} text={"Enter a new note here"}/>
        // <div className="col-lg-10 mt-5 mx-auto">
        //   <form>
        //     <div className="form-group">
        //       <label>Enter a new note here</label>
        //       <textarea className="form-control" id="text-area" rows="3"></textarea>
        //     </div>
        //     {console.log(this.props.match.params.citId)}
        //     <button className="btn btn-primary" onClick={(e) => this.handleSubmit(e)} type="submit">Submit</button>
        //   </form>
        // </div>
      )
  }
}

export default CreateNote;
