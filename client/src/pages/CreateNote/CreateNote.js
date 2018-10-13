import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";
import API from "../../utils/API";

class CreateNote extends Component {
  state = {
    toMainPage: false
  }

  handleSubmit = (e) => {
    e.preventDefault();
    const body = document.getElementById("text-area").value;
    const newNote = {
      clusId: this.props.match.params.id,
      body: body
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
        <div className="col-lg-10 mt-5 mx-auto">
          <form>
            <div className="form-group">
              <label>Enter a new note here</label>
              <textarea className="form-control" id="text-area" rows="3"></textarea>
            </div>
            <button className="btn btn-primary" onClick={(e) => this.handleSubmit(e)} type="submit">Submit</button>
          </form>
        </div>
      )
  }
}

export default CreateNote;
