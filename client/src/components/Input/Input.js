import React from "react";

const Input = (props) => (

  <div class="input-group mb-3">
    <input type="text" class="form-control" placeholder={props.passedPlaceholder} aria-label="cluster name" aria-describedby="button-addon2"></input>
    <div class="input-group-append">
      <button class="btn btn-outline-secondary" type="button" onClick={props.click} id="button-addon2">{props.label}</button>
    </div>
  </div>

);

export default Input;
