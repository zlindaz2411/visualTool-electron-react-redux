import React, { Component, Fragment, formSubmitEvent } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router";
import { confirmAlert } from "react-confirm-alert";
import { comparePerformance } from "../functions/performance";
import { data1, myConfig, nodes, links } from "../constants/defaultGraph";

import { Line } from "react-chartjs-2";

import { saveNote, addNote, fetchNotes, deleteNote } from "./../actions/index";
import { Algorithm } from "../constants/algorithms";

class PerformancePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedCheckboxes: [],
      algos: [
        Algorithm.KRUSKAL,
        Algorithm.PRIM,
        Algorithm.BORUVKA,
        Algorithm.PARALLEL
      ],
      data: {}
    };
  }

  handleCheckboxChange(e) {
    const name = e.target.name;
    this.state.selectedCheckboxes.push(name);
    
  }

  handleFormSubmit(e) {

    e.preventDefault();
    console.log(this.state.selectedCheckboxes)

    if(this.state.selectedCheckboxes.length == 0){
      confirmAlert({
        title: `Warning!`,
        message: `You must choose at least one algorithm`,
        buttons: [
            {
                label: 'Cancel'
            }
        ]
    })
    }
    this.setState({
      selectedCheckboxes:[],
      data: {
        labels: this.state.selectedCheckboxes,
        datasets: [
          {
            data: comparePerformance(this.state.selectedCheckboxes, data1)
          }
        ]
      }
    });
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
              <div className="first_column">
                <div className = "chart">
              <Line
                width={400}
                height={325}
                data={this.state.data}
                options={{
                  title:{
                    display:false,
                  },
                  legend:{
                    display:false,
                  }
                }}
              />
              </div>
              </div>
            </div>
            <div className="column column_4_12">
              <div className="second_column">
                <form onSubmit={this.handleFormSubmit.bind(this)}>
                  {this.state.algos.map((algo, i) => (
                    <div className="checkbox">
                      <label key={i}>
                        <input
                          type="checkbox"
                          name={algo}
                          onChange={this.handleCheckboxChange.bind(this)}
                          value={this.state.algos[algo]}
                        ></input>
                        {algo}
                      </label>
                    </div>
                  ))}
                  <div className="button">
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
  connect(mapStateToProps, { addNote, saveNote, fetchNotes, deleteNote })(
    PerformancePage
  )
);
