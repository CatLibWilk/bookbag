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
    console.log('did mount runs mainpage')
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
  render() {
    return(
      <div>
        <div>
          <h1 className="mt-3 mb-3">Citations</h1>
          {this.state.citations.map(citation => {
            console.log(citation)
            return(
              <div>

              <ContentDiv title={citation.title} url={citation.url}/>
              
              {this.state.notes.map(note => {
                if(note.CitationId === citation.id){
                  return (
                    <ContentDiv colWidth={"colWidth"} body={note.body}/>
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
                  
                  <ContentDiv body={note.body}/>
                  )
               }
          })}
        </div>
      </div>
    )
  }
}

export default MainPage;
