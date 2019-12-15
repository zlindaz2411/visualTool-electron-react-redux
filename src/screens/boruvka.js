import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router";

import { emptyGraph} from "../constants/defaultGraph";
import { getPseudocode, setUpPseudocodeMap } from "../functions/pseudocode";

import { removeAll, drawGraph, setWidthHeight } from "../functions/d3Functions";

import { boruvkas } from "../functions/algorithms";
import { resetTree, resetHighlight, resetRoot, resetNodes, updateGraph} from "../functions/graphAlgorithms";
import { Algorithm } from "../constants/algorithms";
import { emptyGraphMessage, startOfAlgorithmMessage, endOfAlgorithmMessage, algorithmErrorMessage, ErrMessage} from "../constants/errorMessage";

const colors = ["#84C262", "#50525E", "#B22222"];

const pageName = Algorithm.BORUVKA;

class BoruvkaPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      index: 0,
      pseudocode: getPseudocode(pageName),
      start: false,
      pseudoMap: null,
      data: Object.keys(this.props.latestGraph).length ==0 ? emptyGraph :  this.props.latestGraph,
    };
  }

  componentDidMount() {
    if(Object.keys(this.props.latestGraph).length == 0){
      emptyGraphMessage();
    }
    else{
      if(this.props.latestGraph.nodes.length != 0 && this.props.latestGraph.edges.length!=0){
        resetNodes(this.state.data.nodes);
        resetRoot(this.state.data);
        resetHighlight(this.state.data.edges);
        resetTree(this.state.data.edges);
        setWidthHeight(this.state.data, false);
        drawGraph(this.state.data, "");
        }
    }
  }

  /**
   * Draw graph in the algorithm page canvas
   */
  draw() {
    removeAll();
    drawGraph(this.state.data, "");
  }


    /**
   * When start is pressed, check if the graph is correct.
   * If not, alert an error dialog. Otherwise, start the visualization
   */
  handleStart() {
    if (Object.keys(this.props.latestGraph).length == 0) {
      emptyGraphMessage();
    } else {
      const res = boruvkas(
        this.state.data.nodes,
        this.state.data.edges
      );
      if (res == ErrMessage.MST_NOT_FOUND) algorithmErrorMessage();
      else{
      this.setState({
        start: true,
        pseudoMap: setUpPseudocodeMap(pageName, 0),
        states: res
      });
    }
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
            {this.state.start ? (
              <div className="action_buttons">
                <button onClick={() => this.previous()}>Previous</button>
                <button onClick={() => this.next()}>Next</button>
              </div>
            ) : (
              <button
                onClick={() =>this.handleStart()
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


  /**
   * Update graph: update which edge needs to be highlighted
   * @param {*} array 
   * @param {*} tree 
   */
  updateNodes(array) {
    for (let i = 0; i < array.length; i++) {
      for (let j = 0; j < this.state.data.nodes.length; j++) {
        //check if there is a matching non-highlighted edge
        if 
          (this.state.data.nodes[j].id == array[i]) {
          this.state.data.nodes[j].highlight = true;
        } 
      }
    }
  }


  /**
   * When previous button is clicked: if it's at the start, display error message
   * Else display the previous state of the algorithm
   */
  previous() {
    this.setState({
      index:  this.state.index -= 1,
    });
    if (this.state.index < 0) {
      this.setState({
        index: this.state.index+=1,
        pseudoMap: setUpPseudocodeMap(
          pageName,
          0,
        )
      })
      startOfAlgorithmMessage();
    } 
    this.setState({
      pseudoMap: setUpPseudocodeMap(
        pageName,
        this.state.states[this.state.index].status
      )
    });
    resetNodes(this.state.data.nodes);
    resetHighlight(this.state.data.edges);
    resetTree(this.state.data.edges);
    updateGraph(this.state.states[this.state.index].tree,this.state.data.edges, true);
    updateGraph(this.state.states[this.state.index].highlighted, this.state.data.edges,false);
    this.updateNodes(this.state.states[this.state.index].highlightedNodes);
    this.draw();
  }

/**
 * When next button is clicked: if it's at the end, display error message
 * Else display the next state of the algorithm
 */
next() {
    this.setState({
      index: this.state.index += 1,
    });
    if (this.state.index >= this.state.states.length) {
      this.setState({
        index: this.state.index-=1,
        pseudoMap: setUpPseudocodeMap(
          pageName,
          this.state.pseudocode.length-1,
        )})
     endOfAlgorithmMessage();
  }
  this.setState({
    pseudoMap: setUpPseudocodeMap(
      pageName,
      this.state.states[this.state.index].status
    ),
  });
  resetHighlight(this.state.data.edges);
  resetNodes(this.state.data.nodes);
  updateGraph(this.state.states[this.state.index].tree,this.state.data.edges, true);
  updateGraph(this.state.states[this.state.index].highlighted, this.state.data.edges,false);
  this.updateNodes(this.state.states[this.state.index].highlightedNodes);
  this.draw();
}
}


function mapStateToProps(state) {
  return {
    latestGraph: state.graph.latestGraph
  };
}

export default withRouter(
  connect(mapStateToProps, { })(
    BoruvkaPage
  )
);
