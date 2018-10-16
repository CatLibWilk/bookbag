import React from "react";
import { Link } from "react-router-dom";

const Navbar = (props) => (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
    <a className="navbar-brand" href="#">BookBag U+</a>
      <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>
    <div className="collapse navbar-collapse" id="navbarNav">
      <ul className="navbar-nav">
        <li className="nav-item active">
          <Link to={`/homepage/`}>
            <a className="nav-link" href="#">Home <span className="sr-only">(current)</span></a>
          </Link>
        </li>
      
        <li className="nav-item mr-auto">
        <Link to={"/"}>
          <a className="nav-link" href="#">Signin</a>
        </Link>
        </li>

        <li className="nav-item mr-auto">
        <Link to={"/logout"}>
          <a className="nav-link" href="#">Signout</a>
        </Link>
        </li>
        
      </ul>
    </div>
  </nav>
);

export default Navbar;
