import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router";
import { confirmAlert } from "react-confirm-alert";
import classNames from "classnames";

// import { Graph } from "react-d3-graph";
import { data1, myConfig, nodes, links } from "../constants/defaultGraph";
import { getPseudocode, setUpPseudocodeMap } from "../functions/pseudocode";

import { removeAll, drawGraph } from "../components/d3/graph1";
import { kruskals } from "../functions/algorithms";

import { saveNote, addNote, fetchNotes, deleteNote } from "../actions/index";

const initialState = {
  edgeList: [],
  nodeList: [],
  start: false,
  highlightedEdges: [],
  highlightedNodes: [],
  data: data1,
  index: 0
};

const colors = ["#84C262", "#50525E", "#B22222"];

const pageName = "Kruskal";

class KruskalPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ...initialState,
      pseudocode: getPseudocode(pageName),
      start: false,
      pseudoMap: null
    };
  }

  componentDidMount() {
    drawGraph(data1);
  }

  render() {
    return (
      <div className="algorithm_wrap">
        <div className="title">
          <h1>{pageName}</h1>
          <center>
            <div className="grid">
              <div className="column column_7_12">
                <div className="canvas">
                  {/* <Graph
                    id="graph-id" // id is mandatory, if no id is defined rd3g will throw an error
                    data={data}
                    config={myConfig}
                    _setNodeHighlightedValue={1,true}

                  /> */}
                </div>
              </div>

              <div className="column column_5_12">
                <div id="pseudo_canvas" className="second_column">
                  {this.state.pseudocode.map((pseudo, i) => (
                    <h3
                      style={
                        this.state.pseudoMap != null
                          ? this.state.pseudoMap.get(pseudo) == false
                            ? { color: colors[1] }
                            : { color: colors[0] }
                          : { color: colors[1] }
                      }
                      key={i}
                    >
                      {" "}
                      {pseudo}
                    </h3>
                  ))}
                </div>
              </div>
            </div>
          </center>
          <center>
            {this.state.start ? (
              <div className="action_buttons">
                <button onClick={() => this.previous()}>Previous</button>
                <button onClick={() => this.next()}>Next</button>
              </div>
            ) : (
              <button
                onClick={() =>
                  this.setState({
                    start: true,
                    pseudoMap: setUpPseudocodeMap(pageName, 0),
                    states: kruskals(nodes, this.state.data.edges)
                  })
                }
              >
                Start
              </button>
            )}
          </center>
        </div>
      </div>
    );
  }

  updateGraph(array, tree) {
    for (let i = 0; i < array.length; i++) {
      for (let j = 0; j < this.state.data.edges.length; j++) {
        //check if there is a matching non-highlighted edge
        if (
          (this.state.data.edges[j].source == array[i].source &&
            this.state.data.edges[j].target == array[i].target) ||
          (this.state.data.edges[j].source == array[i].target &&
            this.state.data.edges[j].target == array[i].source)
        ) {
          if (tree) this.state.data.edges[j].tree = true;
          else this.state.data.edges[j].highlight = true;
          this.setState({
            data: this.state.data
          });
          removeAll();
          drawGraph(this.state.data);
        } else {
          this.state.data.edges[j].highlight = false;
          this.setState({
            data: this.state.data
          });
          removeAll();
          drawGraph(this.state.data);
        }
      }
    }
  }

  resetData(){
    for (let i = 0; i < this.state.data.edges.length; i++) {
      this.state.data.edges[i].highlight = false;
      this.state.data.edges[i].tree = false;
    }
  }

  previous() {
    if (this.state.index == 0) {
      confirmAlert({
        title: `Warning!`,
        message: `Nothing before the start of the algorithm`,
        buttons: [
          {
            label: "Cancel"
          }
        ]
      });
    } else {
      this.setState({
        index: (this.state.index -= 1),
        pseudoMap: setUpPseudocodeMap(
          pageName,
          this.state.states[this.state.index].status
        )
      });
      this.resetData()
      this.updateGraph(this.state.states[this.state.index].tree, true);
      this.updateGraph(this.state.states[this.state.index].highlighted, false);
      
        }
    }

  next() {
    if (this.state.index == this.state.states.length - 1) {
      confirmAlert({
        title: `Warning!`,
        message: `End of the algorithm`,
        buttons: [
          {
            label: "Cancel"
          }
        ]
      });
    } else {
      this.updateGraph(this.state.states[this.state.index].tree, true);
      this.updateGraph(this.state.states[this.state.index].highlighted, false);
      this.setState({
        pseudoMap: setUpPseudocodeMap(
          pageName,
          this.state.states[this.state.index].status
        ),
        index: (this.state.index += 1)
      });
    }
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
    KruskalPage
  )
);
