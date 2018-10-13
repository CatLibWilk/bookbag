import React, { Component } from "react";
import { Link } from "react-router-dom";
import API from "../../utils/API";
import Form from "../../components/Form";

class EditNote extends Component {
  state = {
    current: ""
  };

  componentDidMount(){
    this.getData();
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const body = document.getElementById("text-area").value;
    console.log(body)
  }


  getData = () => {
    const currentUrl = this.props.match.path;
    if(currentUrl.includes('note')){
      API.getNote(this.props.match.params.id)
          .then(result => {
            this.setState({current: result.data.body});
          });
    };
    if(currentUrl.includes('citation')){
      API.getCitation(this.props.match.params.id)
          .then(result => {
            console.log(result);
          });
    };
  };

  render() {

    return(
      <Form click={(e) => this.handleSubmit} form_text={this.state.current} head-text={"Edit your note"}/>
      )
  };
};

export default EditNote;
