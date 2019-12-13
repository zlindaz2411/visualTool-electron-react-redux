import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router";
import { confirmAlert } from "react-confirm-alert";
import classNames from "classnames";

// import { Graph } from "react-d3-graph";
import { data, emptyGraph} from "../constants/defaultGraph";
import { getPseudocode, setUpPseudocodeMap } from "../functions/pseudocode";

import { removeAll, drawGraph, setWidthHeight } from "../functions/d3Functions";
import { kruskals } from "../functions/algorithms";
import { resetTree, resetHighlight } from "../functions/graphAlgorithms";

import { Algorithm } from "../constants/algorithms";

const initialState = {
  edgeList: [],
  nodeList: [],
  manual: false,
  highlightedEdges: [],
  highlightedNodes: [],
  index: 0
};

const colors = ["#84C262", "#50525E", "#B22222"];

const pageName = Algorithm.KRUSKAL;

const SPEED = 1000;

class KruskalPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ...initialState,
      speed: SPEED,
      automatic: false,
      pseudocode: getPseudocode(pageName),
      start: false,
      pseudoMap: null,
      data: Object.keys(this.props.latestGraph).length ==0 ? emptyGraph :  this.props.latestGraph,
    };
  }

  componentDidMount() {
    if(Object.keys(this.props.latestGraph).length == 0){
      confirmAlert({
        title: `Warning!`,
        message: `There isn't a submitted graph, please go to "Draw Graph" and submit one`,
        buttons: [
          {
            label: "Cancel"
          }
        ]
      });
    }
    else{
      resetHighlight(this.state.data.edges);
      resetTree(this.state.data.edges);
      setWidthHeight(this.state.data, false);
      drawGraph(this.state.data, false);
    }
  }

  

  /**
   * When start is pressed, check if the graph is correct.
   * If not, alert an error dialog. Otherwise, star the visualization
   */
  handleStart(isManual) {
    const res = kruskals(this.state.data.nodes, this.state.data.edges);
      this.setState({
        pseudoMap: setUpPseudocodeMap(pageName, 0),
        states: res
      });
      if (isManual) {
        this.setState({
          manual: true
        });
      } else {
        this.setState({
          automatic: true
        });
      }
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
                  <div className="drawing"></div>
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
            {this.state.manual ? (
              <div className="action_buttons">
                <button onClick={() => this.previous()}>Previous</button>
                <button onClick={() => this.next()}>Next</button>
              </div>
            ) : this.state.automatic ? (
              <div className="action_buttons">
                <button
                  onClick={() =>
                    this.setState({
                      speed: SPEED / 2
                    })
                  }
                >
                  0.5x
                </button>
                <button
                  onClick={() =>
                    this.setState({
                      speed: SPEED
                    })
                  }
                >
                  1.0x
                </button>
                <button
                  onClick={() =>
                    this.setState({
                      speed: SPEED * 2
                    })
                  }
                >
                  2.0x
                </button>
              </div>
            ) : (
              <div className="action_buttons">
                <button
                  onClick={() => {
                    this.handleStart(true);
                  }}
                >
                  Manual
                </button>
                <button
                  onClick={() => {
                    {
                      this.handleStart(false);
                      let timer = setInterval(() => {
                        if (this.state.index < this.state.states.length - 1) {
                          this.next();
                        } else {
                          clearInterval(timer);
                        }
                      }, this.state.speed);
                    }
                  }}
                >
                  Automatic
                </button>
              </div>
            )}
          </center>
        </div>
      </div>
    );
  }

  /**
   * Update graph: update which edge needs to be highlighted
   * @param {*} array
   * @param {*} tree
   */
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
          removeAll();
          drawGraph(this.state.data, false);
        }
      }
    }
  }



  /**
   * When previous button is clicked: if it's at the start, display error message
   * Else display the previous state of the algorithm
   */
  previous() {
    resetHighlight(this.state.data.edges);
    resetTree(this.state.data.edges);
    this.setState({
      index: (this.state.index -= 1)
    });
    if (this.state.index < 0) {
      this.setState({
        index: (this.state.index += 1),
        pseudoMap: setUpPseudocodeMap(pageName, 0)
      });
      confirmAlert({
        title: `Warning!`,
        message: `Nothing before the start of the algorithm`,
        buttons: [
          {
            label: "Cancel"
          }
        ]
      });
    }
    this.setState({
      pseudoMap: setUpPseudocodeMap(
        pageName,
        this.state.states[this.state.index].status
      )
    });
    this.updateGraph(this.state.states[this.state.index].tree, true);
    this.updateGraph(this.state.states[this.state.index].highlighted, false);
  }

  /**
   * When next button is clicked: if it's at the end, display error message
   * Else display the next state of the algorithm
   */
  next() {
    this.setState({
      index: (this.state.index += 1)
    });
    if (this.state.index >= this.state.states.length) {
      this.setState({
        index: (this.state.index -= 1),
        pseudoMap: setUpPseudocodeMap(
          pageName,
          this.state.pseudocode.length - 1
        )
      });
      confirmAlert({
        title: `Warning!`,
        message: `End of the algorithm`,
        buttons: [
          {
            label: "Cancel"
          }
        ]
      });
    }
    this.setState({
      pseudoMap: setUpPseudocodeMap(
        pageName,
        this.state.states[this.state.index].status
      )
    });
    resetHighlight(this.state.data.edges);
    this.updateGraph(this.state.states[this.state.index].tree, true);
    this.updateGraph(this.state.states[this.state.index].highlighted, false);
  }
}

function mapStateToProps(state) {
  return {
    latestGraph: state.graph.latestGraph
  };
}

export default withRouter(
  connect(mapStateToProps, {})(
    KruskalPage
  )
);
