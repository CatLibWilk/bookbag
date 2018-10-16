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
        .then( (returned) => {
          const returnedResources = []
          console.log(returned.data.docs)
          console.log(returned.data.docs[1].author_name[0])
          console.log(returned.data.docs[1].title)
          console.log(returned.data.docs[1].key)
          console.log(returned.data.docs[1].first_publish_year)
          for(let i = 0; i<5; i++){
            let authorChecked = "";
            if(returned.data.docs[i].author_name[0]){
              authorChecked = returned.data.docs[i].author_name[0]
            }else{
              authorChecked=""
            }
            const newCitation = {
              title: returned.data.docs[i].title,
              author: authorChecked,
              url: `https://openlibrary.org${returned.data.docs[i].key}`,
              publication_date: returned.data.docs[i].first_publish_year

            }
            returnedResources.push(newCitation)
            console.log(returnedResources)
          }
          
          // console.log(returned.data.response.docs)
          // this.setState({returnedResources: returned.data.response.docs})
        });
  }

  handleSaveCit = (title, creator) => {
    console.log(title, creator)
    const newCit = {
      title: title,
      author: creator,
      url: 'www.google.com',
      ClusterId: this.props.match.params.id
    }
    API.createCitation(newCit)
        .then(result => {
          this.getAssociated();
        });
  };
  
  render() {
    return(
      <div>
        <div id="search-div">
          <h1>Find Resources</h1>
          <Input click={this.handleSearch} passedPlaceholder={'Enter a title'} label={'Search'}/>
          <div id="results-div">
              {this.state.returnedResources.map(item => {
                return (
                  <div>
                    <ContentDiv name={"citation-new"} title={item.title} creator={item.creator} date={item.date} click={this.handleSaveCit} button_types={["save"]}/>
                    {/* <div className="btn btn-danger" onClick={(e) => {this.handleSaveCit(e, item.title, item.creator)}}>Save new Citation</div> */}
                  </div>
                )
              })}
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
