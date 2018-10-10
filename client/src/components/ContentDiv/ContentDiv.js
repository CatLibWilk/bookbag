import React from "react";
import { Link } from "react-router-dom";

const ContentDiv = (props) => {
  return (

    <div className="card" {...props}>
      <div className="card-body">
        <h5 className="card-title">{props.title}</h5>
        {/* will add some of these back in when I have stuff to populate (maybe saved date?) */}
        {/* <h6 className="card-subtitle mb-2 text-muted">Card subtitle</h6>
        <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
        <a href="#" className="card-link">Card link</a>
      <a href="#" className="card-link">Another link</a> */}
      <Link to={"/mainpage/" + props.id} >
        <div className="btn btn-warning" clusterid={props.id}>Open</div>
      </Link>
      <div className="btn btn-danger" clusterid={props.id} onClick={() => props.click(props.id)}>Delete</div>
      </div>
    </div>
  )
}

export default ContentDiv;