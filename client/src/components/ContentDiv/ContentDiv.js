import React from "react";
import { Link } from "react-router-dom";

const ContentDiv = (props) => {
  if(props.name==="citation" && props.onPage==="main"){

    return (
      
      <div className={`${props.colWidth ? "col-6" : ""} card m-2`}>
        <div className="card-body">
          <h5 className="card-title">{props.title}</h5>
          {/* will add some of these back in when I have stuff to populate (maybe saved date?) */}
          <h6 className="card-subtitle mb-2 text-muted">{props.url}</h6>
          <p className="card-text">{props.body}</p>
        
        <div className="btn btn-danger" name={props.name} id={props.id} onClick={() => props.click(props.id, props.name)}>{props.button_types[0]}</div>
        </div>
      </div>
    ); 





  }else{
    return (
      
      <div className={`${props.colWidth ? "col-6" : ""} card m-2`}>
        <div className="card-body">
          <h5 className="card-title">{props.title}</h5>
          {/* will add some of these back in when I have stuff to populate (maybe saved date?) */}
          <h6 className="card-subtitle mb-2 text-muted">{props.url}</h6>
          <p className="card-text">{props.body}</p>
        
        <Link to={props.routeSet ? `${props.routeSet}` : "/mainpage/" + props.id} >
          <div className="btn btn-warning" name={props.name} id={props.id}>{props.button_types[0]}</div>
        </Link>
        <div className="btn btn-danger" name={props.name} id={props.id} onClick={() => props.click(props.id, props.name)}>{props.button_types[1]}</div>
        </div>
      </div>
    ); 
  }
}

export default ContentDiv;
