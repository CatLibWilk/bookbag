import React, { Component } from "react";
import { Link } from "react-router-dom";
import API from "../../utils/API";
import ContentDiv from "../../components/ContentDiv";

class MainPage extends Component {
  state = {
    citations: [],
    notes: []
  }
  
  componentDidMount() {
    console.log('did mount runs mainpage');
    this.getAssociated();
  }
  
  getAssociated = () => {
    API.getCluster(this.props.match.params.id)
      .then(res => {
        const newCitations = res.data.returnedData[0];
        const newNotes = res.data.returnedData[1];
  
        this.setState({
          citations: newCitations,
          notes: newNotes
        });
      })
      .catch(err => console.log(err));

  }

  handleDelete = (id, name) => {
    console.log("delete clicked on mainpage");
    console.log(id);
    console.log(name);

    switch(name) {
      case "citation":
        API.deleteCitation(id)
            .then( () => this.getAssociated());
        break;

      case "note":
        API.deleteNote(id)
            .then( () => {this.getAssociated()})
    };
       
  }
  
  render() {
    return(
      <div>
        <div>
          <h1 className="mt-3 mb-3">Citations</h1>
          {this.state.citations.map(citation => {

            return(
              <div>

              <ContentDiv routeSet={`../editcitation/${citation.id}`} id={citation.id} name={"citation"} button_types={["edit", "delete"]} title={citation.title} url={citation.url} click={this.handleDelete}/>
              
              {this.state.notes.map(note => {
                if(note.CitationId === citation.id){
                  return (
                    <ContentDiv routeSet={`../editenote/${note.id}`} id={note.id} name={"note"} button_types={["edit", "delete"]} colWidth={"colWidth"} body={note.body} click={this.handleDelete}/>
                    )
                  }
                })}

              </div>
              )

          })}
        </div>
        <div>
          <h1 className="mt-3 mb-3">Notes</h1>
          {this.state.notes.map(note => {
              if(!note.CitationId){

                return(
                  
                  <ContentDiv routeSet={`../editnote/${note.id}`} id={note.id} name={"note"} button_types={["edit", "delete"]} body={note.body} click={this.handleDelete}/>
                  )
               }
          })}
        </div>
      </div>
    )
  }
}

export default MainPage;
