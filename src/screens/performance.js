import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router";
import { confirmAlert } from "react-confirm-alert";
import classNames from "classnames";
import { Graph } from "react-d3-graph";

import { saveNote, addNote, fetchNotes, deleteNote } from "./../actions/index";

class PerformancePage extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {}

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
            <div className ="second_column"></div>
            </div>
          </div>
        </center>
        <center>
              <button>Compare</button>
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
