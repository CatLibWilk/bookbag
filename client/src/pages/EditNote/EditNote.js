import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";
import API from "../../utils/API";
import Form from "../../components/Form";

class EditNote extends Component {
  state = {
    current: "",
    toMainPage: false
  };

  componentDidMount(){
    this.getData();
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const body = {body: document.getElementById("text-area").value};
    API.editNote(body, this.props.match.params.id)
        .then(result => {
          console.log('resturned from server');
          console.log(result);
          this.setState({toMainPage: "true"})
        });
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
    if(this.state.toMainPage === "true"){
      return <Redirect to={`/mainpage/${this.props.match.params.clusId}`} />
    }
    return(
      <Form click={(e) => this.handleSubmit} form_text={this.state.current} head-text={"Edit your note"}/>
      )
  };
};

export default EditNote;
