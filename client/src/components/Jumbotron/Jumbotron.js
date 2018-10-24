import React from "react";

const Jumbotron = ({ children }) => (
  <div className="containter-fluid"> 
    <div className="jumbotron jumbotron-fluid col-12 clearfix mb-0">
      <div className="container">
        <h1 className="display-4">BookBag Ultra+</h1>
        <p className="lead">Your notebook, in your browser.</p>
      </div>
    </div>
  </div>
);

export default Jumbotron;
