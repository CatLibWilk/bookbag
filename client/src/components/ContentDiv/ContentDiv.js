import React from "react";
import { Link } from "react-router-dom";

const ContentDiv = (props) => {
  if(props.name==="citation" && props.onPage==="main"){

    return (
      
      <div className={`${props.colWidth ? "col-6" : ""} card m-2`}>
        <div className="card-body">
          <h5 className="card-title">{props.title}</h5>
          <h6 className="card-subtitle mb-2 text-muted"><a href={props.url} target="_blank">{props.url}</a></h6>
          <p className="card-text">{props.body}</p>
        
        <div className="btn btn-delete" name={props.name} id={props.id} onClick={() => props.click(props.id, props.name)}>{props.button_types[0]}</div>
        </div>
      </div>
    ); 
  }
  if(props.name==="citation-new"){

  return (
    <div className={`${props.colWidth ? "col-6" : ""} card m-4`}>
        <div className="card-body">
          <h5 className="card-title">{props.title}</h5>
          <p className="card-text">{props.creator}</p>
          <p className="card-text"><a href={props.url} target="_blank">{props.url}</a></p>
          <p className="card-text">{props.date}</p>
        
        <div className={`btn btn-delete ${props.button_width}`} name={props.name} onClick={() => props.click(props.title, props.creator, props.url, props.date)}>{props.button_types[0]}</div>
        </div>
      </div>
  )



  }else{
    return (
      
      <div className={`${props.colWidth ? "col-6" : ""} ${props.margin ? `${props.margin}` : "m-2"} card m-2 mb-1 note-body`}>
        <div className="card-body">
          <h5 className="card-title">{props.title}</h5>
          {/* will add some of these back in when I have stuff to populate (maybe saved date?) */}
          <h6 className="card-subtitle mb-2 text-muted">{props.url}</h6>
          <p className="card-text">{props.body}</p>
        
        <Link to={props.routeSet ? `${props.routeSet}` : "/mainpage/" + props.id} >
          <div className="btn contentDiv-btn1 m-2 mb-0" name={props.name} id={props.id}>{props.button_types[0]}</div>
        </Link>
        <div className="btn contentDiv-btn2 m-2 mb-0" name={props.name} id={props.id} onClick={() => props.click(props.id, props.name)}>{props.button_types[1]}</div>
        </div>
      </div>
    ); 
  }
}

export default ContentDiv;
