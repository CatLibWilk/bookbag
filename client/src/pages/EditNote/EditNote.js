import React, { Component } from "react";
import { Link } from "react-router-dom";
import API from "../../utils/API";

class EditNote extends Component {
  state = {
    current: []
  };

  componentDidMount(){
    this.getData();
  };

  getData = () => {
    const currentUrl = this.props.match.path;
    if(currentUrl.includes('note')){
      API.getNote(this.props.match.params.id)
          .then(result => {
            console.log(result);
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
      <h1>EditNote</h1>
      )
  };
};

export default EditNote;
