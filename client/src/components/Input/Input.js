import React from "react";

const Input = (props) => (

  <div className="input-group mb-3">
    <input type="text" className="form-control" placeholder={props.passedPlaceholder} aria-label="cluster name" aria-describedby="button-addon2"></input>
    <div className="input-group-append">
      <button className="btn btn-outline-secondary" type="button" onClick={props.click} id="button-addon2">{props.label}</button>
    </div>
  </div>

);

export default Input;
