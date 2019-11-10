import React, { Component, Fragment, formSubmitEvent } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router";
import { confirmAlert } from "react-confirm-alert";
import classNames from "classnames";
import { Graph } from "react-d3-graph";



import { saveNote, addNote, fetchNotes, deleteNote } from "./../actions/index";



class PerformancePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedCheckboxes : [],
      algos: [
        'Kruskal',
        'Prim',
        'Boruvka',
        'Boruvka Parallel',
      ],
    };
  }

  handleCheckboxChange(e){
    const val = e.target.checked;
    const name = e.target.name;
    let checked = Object.assign({}, this.state.selectedCheckboxes, {[name]:val})
    this.setState({
      selectedCheckboxes : checked
    })
  }

  handleFormSubmit(e){
    e.preventDefault();
    console.log(this.state.selectedCheckboxes)
  }

  render() {
    return (
      <div className="performance_wrap">
        <div className="title">
          <h1>Compare Performance</h1>
        </div>
        <center>
          <div className="grid">
            <div className="column column_8_12">
                <div className ="first_column"></div>
            </div>
            <div className="column column_4_12">
            <div className ="second_column">
            <form onSubmit={this.handleFormSubmit.bind(this)}>
            {this.state.algos.map((algo,i) => 
            <div className= "checkbox">
              <label key={i}>
                
            
              <input
              type = "checkbox"
              name = {algo}
              onChange ={this.handleCheckboxChange.bind(this)}
              value ={this.state.algos[algo]}
              >
              </input>
              {algo}
              </label>
              </div>
            )}
              <div className ="button">
              <button>Compare</button>
              </div>
            </form>
      </div>
            </div>
          </div>
        </center>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    notes: state.notes.arr,
    latestNote: state.notes.latestNote
  };
}

export default withRouter(
  connect(
    mapStateToProps,
    { addNote, saveNote, fetchNotes, deleteNote }
  )(PerformancePage)
);
