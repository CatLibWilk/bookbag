import React from "react";

const Form = (props) => {
  
    return(
    <div className="row">
      <div className="col-lg-10 mt-5 mx-auto">
        <form>
          <div className="form-group">
            <label>{props.text}</label>
            <textarea className="form-control" placeholder={props.form_text} id="text-area" rows="3"></textarea>
          </div>

          <button className="btn btn-primary" onClick={props.click()} type="submit">Submit</button>
        </form>
      </div>
    </div>
      

)};

export default Form;
