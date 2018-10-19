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
    //setup and handling for dragable resize of iframe
    let resizer = document.querySelector('.resizer'),
        startX, startY, startWidth, startHeight;
        resizer.addEventListener( 'mousedown', this.initDrag, false );
        
        this.getAssociated();
  };


  initDrag = (e) => {
    let resizeable = document.querySelector('.resizeable');
    console.log('dragging')
    this.startX = e.clientX;
    this.startY = e.clientY;
    this.startWidth = parseInt ( document.defaultView.getComputedStyle(resizeable ).width, 10);
    this.startHeight = parseInt ( document.defaultView.getComputedStyle(resizeable ).height, 10);
    document.documentElement.addEventListener('mousemove', this.doDrag, false);
    document.documentElement.addEventListener('mouseup', this.stopDrag, false);
  };
      
  doDrag = (e) => {
    let resizeable = document.querySelector('.resizeable');
    resizeable.style.width = (this.startWidth + e.clientX - this.startX) + 'px';
    resizeable.style.height = (this.startHeight + e.clientY - this.startY) + 'px';
  };
      
  stopDrag = (e) => {
    document.documentElement.removeEventListener('mousemove', this.doDrag, false);
    document.documentElement.removeEventListener('mouseup', this.stopDrag, false);
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
          for(let i = 0; i<5; i++){
            let authorChecked = "";
            if(returned.data.docs[i].author_name[0]){
              authorChecked = returned.data.docs[i].author_name[0]
            }else{
              authorChecked=""
            }
            const newCitation = {
              title: returned.data.docs[i].title,
              creator: authorChecked,
              url: `https://openlibrary.org${returned.data.docs[i].key}`,
              publication_date: returned.data.docs[i].first_publish_year

            }
            returnedResources.push(newCitation)
            console.log(returnedResources)
          }
          
          this.setState({returnedResources: returnedResources});
        });
  }

  handleSaveCit = (title, creator, url, date) => {
    console.log(title, creator)
    const newCit = {
      title: title,
      author: creator,
      url: url,
      date: date,
      ClusterId: this.props.match.params.id
    }
    API.createCitation(newCit)
        .then(result => {
          this.getAssociated();
        });
  };


  
  render() {
    return(
      <div className="container-fluid">
        <div id="viewer-row" className="row">
          <div id="viewer-col" className="col-lg-10 mx-auto mb-3 mt-3 resizeable d-flex">
              {/* backup mirador viewer */}
              {/* <iframe title="Mirador" src="http://projectmirador.org/demo/" allowfullscreen="true" webkitallowfullscreen="true" mozallowfullscreen="true"></iframe> */}
              {/* local mirador viewer */}
              <iframe title="Mirador" className="mr-1" src="http://localhost:8000" allowfullscreen="true" webkitallowfullscreen="true" mozallowfullscreen="true">
              </iframe>
              <div className="resizer ml-auto clearfix">
                <span className="resizer-icon">=</span>  
              </div>
          </div>
        </div>

        <div id="search-div">
          <h1>Find Resources</h1>
          <Input click={this.handleSearch} passedPlaceholder={'Enter a title'} label={'Search'}/>
          <div id="results-div">
              {this.state.returnedResources.map(item => {
                console.log(this.state.returnedResources)
                return (
                  <div>
                    <ContentDiv name={"citation-new"} title={item.title} creator={item.creator} date={item.date} url={item.url} click={this.handleSaveCit} button_types={["save"]}/>
                    {/* <div className="btn btn-danger" onClick={(e) => {this.handleSaveCit(e, item.title, item.creator)}}>Save new Citation</div> */}
                  </div>
                )
              })}
          </div>
        </div>
        <div className="row">
            <div className="col-lg-6 float-left">
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
        
        <div className="col-lg-6 float-right">
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
      </div>
    )
  }
}

export default MainPage;
