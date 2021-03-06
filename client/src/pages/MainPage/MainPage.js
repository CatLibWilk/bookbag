import React, { Component } from "react";
import { Link } from "react-router-dom";
import API from "../../utils/API";
import ContentDiv from "../../components/ContentDiv";
import Input from "../../components/Input";

class MainPage extends Component {
  state = {
    citations: [],
    notes: [],
    returnedResources: [],
    searched: false,
    viewer_expanded: false
  };
  
  componentDidMount() {
    //setup and handling for dragable resize of iframe
    let resizer = document.querySelector('.resizer'),
        startX, startY, startWidth, startHeight;
        resizer.addEventListener( 'mousedown', this.initDrag, false );

        
        this.getAssociated();
  };


  initDrag = (e) => {
    let resizeable = document.querySelector('.resizeable');

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

    const input = e.target.parentElement.parentElement.firstElementChild;
    const query = {query: input.value};

    API.getBibs(query)
        .then( (returned) => {
          if(returned.data.docs.length > 0){


          
          const returnedResources = []
          for(let i = 0; i<5; i++){
            let authorChecked = "";
            try {

              if(returned.data.docs[i].author_name[0]){
                authorChecked = returned.data.docs[i].author_name[0]
              }else{
                authorChecked=""
              }
            }
            catch(err){
              console.log(err)
            };

            try {

              const newCitation = {
                title: returned.data.docs[i].title,
                creator: authorChecked,
                url: `https://openlibrary.org${returned.data.docs[i].key}`,
                publication_date: returned.data.docs[i].first_publish_year
                
              };
              returnedResources.push(newCitation);

            }

            catch(err){
              console.log(err);
            };

          }
          
          this.setState({returnedResources: returnedResources, searched: true});
        }
        else{
        //   this.setState({returnedResources: this.state.returnedResources})


          this.setState({returnedResources: [], searched: true})
        }
        });
  }

  handleSaveCit = (title, creator, url, date) => {

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

  handleClear = (e) => {
    e.preventDefault();
    this.setState({returnedResources: [], searched: false})
  };

  handleExpand = () => {
    if(!this.state.viewer_expanded){



      document.querySelector('iframe').classList.add('viewer-expand');
      this.setState({viewer_expanded: true})
    }else{



      document.querySelector('iframe').classList.remove('viewer-expand');
      this.setState({viewer_expanded: false})

    }
  };

  
  render() {
    return(
      <div className="container-fluid mb-5">
        <div id="viewer-row" className="row">
          <div id="viewer-col" className="col-lg-10 mx-auto mb-2 mt-3 resizeable d-flex">
              {/* backup mirador viewer */}
              <iframe title="Mirador" src="http://projectmirador.org/demo/" allowfullscreen="true" webkitallowfullscreen="true" mozallowfullscreen="true"></iframe>
              {/* local mirador viewer */}
              {/* <iframe title="Mirador" className="mr-1" src="http://bookbagplus.herokuapp.com" allowFullScreen="true" webkitallowfullscreen="true" mozallowfullscreen="true">
              </iframe> */}
              <div className="resizer ml-auto clearfix">
                <span className="resizer-icon">=</span>  
              </div>
          </div>
              <div id="viewer-expander" className="btn col-10 mx-auto" onClick={this.handleExpand}>Expand/Minimize Viewer</div>
        </div>
        <div className="row">
        <div id="search-div" className=" col mb-5">
          <h1>Find Resources</h1>
          <Input click={this.handleSearch} passedPlaceholder={'Enter a title'} label={'Search'}/>
          <div id="results-div" className="col-lg-10 mx-auto">
              {this.state.returnedResources.length > 0 ? this.state.returnedResources.map(item => {

                return (
                  
                  <div>
                    <div>
                      <ContentDiv name={"citation-new"} title={item.title} creator={item.creator} date={item.date} url={item.url} click={this.handleSaveCit} button_width={"col-10"} button_types={["save"]}/>
                      {/* <div className="btn btn-danger" onClick={(e) => {this.handleSaveCit(e, item.title, item.creator)}}>Save new Citation</div> */}
                    </div>
                  </div>
                )
              }) : this.state.searched ? <h1>No Results Returned</h1> : <div></div>}
              {this.state.searched ? <div className="btn btn-clear col-md-2 mr-4" onClick={(e) => {this.handleClear(e)}}>clear</div> : <div></div>}
          </div>
        </div>
        </div>
        <div className="row mt-1">
            <div className="col-lg-6 float-left">
          <h1 className="mt-3 mb-3">Citations</h1>
          {this.state.citations.map(citation => {

            return(
              <div className="citation-container p-3 m-4">

              <ContentDiv id={citation.id} onPage={"main"} name={"citation"} button_types={["delete"]} author={citation.author} title={citation.title} url={citation.url} click={this.handleDelete}/>
                  <Link to={`${this.props.match.params.id}/${citation.id}/createnote`}>
                    <div className="btn btn-create mx-auto mt-3 mb-3 d-block col-md-10 clearfix">Create Note for This Citation</div>
                  </Link>
              
              {this.state.notes.map(note => {
                if(note.CitationId === citation.id){
                  return (
                    <div className="row">
                      <ContentDiv routeSet={`${this.props.match.params.id}/editnote/${note.id}`} id={note.id} name={"note"} button_types={["edit", "delete"]} colWidth={"colWidth"} body={note.body} click={this.handleDelete}/>
                    </div>
                    )
                  }
                })}

                
                  
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
            <div className="btn btn-create mx-auto mt-5 d-block col-6">Create Note</div>
          </Link>
        </div>
        </div>
      </div>
    )
  }
}

export default MainPage;
