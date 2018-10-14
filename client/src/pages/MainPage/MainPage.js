import React, { Component } from "react";
import { Link } from "react-router-dom";
import API from "../../utils/API";
import ContentDiv from "../../components/ContentDiv";
import Input from "../../components/Input";

class MainPage extends Component {
  state = {
    citations: [],
    notes: [],
    returnedResources: []
  };
  
  componentDidMount() {
    console.log('did mount runs mainpage');
    this.getAssociated();
  };
  
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

  };

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
       
  };

  handleSearch = (e) => {
    console.log('search function called');
    const input = e.target.parentElement.parentElement.firstElementChild;
    const query = {query: input.value};
    console.log(query);
    API.getBibs(query)
        .then(returned => {
          console.log(returned.data);
        });
  }
  
  render() {
    return(
      <div>
        <div id="search-div">
          <h1>Find Resources</h1>
          <Input click={this.handleSearch} passedPlaceholder={'Enter a title'} label={'Search'}/>
          <div id="results-div">

          </div>
        </div>
        <div>
          <h1 className="mt-3 mb-3">Citations</h1>
          {this.state.citations.map(citation => {

            return(
              <div>

              <ContentDiv id={citation.id} onPage={"main"} name={"citation"} button_types={["delete"]} title={citation.title} url={citation.url} click={this.handleDelete}/>
              
              {this.state.notes.map(note => {
                if(note.CitationId === citation.id){
                  return (
                    <ContentDiv routeSet={`${this.props.match.params.id}/editnote/${note.id}`} id={note.id} name={"note"} button_types={["edit", "delete"]} colWidth={"colWidth"} body={note.body} click={this.handleDelete}/>
                    )
                  }
                })}

                
                  <Link to={`${this.props.match.params.id}/${citation.id}/createnote`}>
                    <div className="btn btn-danger">Create Note for This Citation</div>
                  </Link>
                
              </div>
              )

          })}
        </div>
        <div>
          <h1 className="mt-3 mb-3">Notes</h1>
          {this.state.notes.map(note => {
              if(!note.CitationId){

                return(
                  
                  <ContentDiv routeSet={`${this.props.match.params.id}/editnote/${note.id}`} id={note.id} name={"note"} button_types={["edit", "delete"]} body={note.body} click={this.handleDelete}/>
                  )
               }
          })}
          <Link to={`${this.props.match.params.id}/createnote`}>
            <div className="btn btn-danger">Create Note</div>
          </Link>
        </div>
      </div>
    )
  }
}

export default MainPage;
