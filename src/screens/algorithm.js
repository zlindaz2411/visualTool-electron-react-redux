import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router";
import {
  MdPlayArrow,
  MdSkipPrevious,
  MdSkipNext,
  MdPause
} from "react-icons/md";

import { getPseudocode, setUpPseudocodeMap } from "../functions/pseudocode";

import { removeAll, drawGraph, setWidthHeight } from "../functions/d3Functions";

import {
  resetTree,
  resetHighlight,
  resetRoot,
  resetNodes,
  updateGraph,
  updateNodes
} from "../functions/graphAlgorithms";
import { Algorithm } from "../constants/algorithms";
import {
  emptyGraphMessage,
  startOfAlgorithmMessage,
  endOfAlgorithmMessage,
  algorithmErrorMessage,
  ErrMessage
} from "../constants/errorMessage";

import { SPEEDS,COLORS } from "../constants/visualizationConstants";

/**
 * The main algorithm component that has the pseudocode, graph and handles the logic of visualization.
 * It can be used by any other different algorithm pages, by passing the corresponding pageName, algorithm function states.
 */
class AlgorithmPage extends Component {
  constructor(props) {
    super(props);
    this.sliderRef = React.createRef();
    this.speedRef = React.createRef();
    this.state = {
      start: false,
      loading: false,
      index: 0,
      timer:null,
      pageName : this.props.pageName,
      maxValue: 0,
      value: 0,
      speed: 0,
      play: false,
      pseudocode: getPseudocode(this.props.pageName),
      pseudoMap: null,
      data: this.props.data,
    };
  }


  componentDidMount() {
    if(this.state.data == null) {
      emptyGraphMessage();
    } else {
      if (
        this.state.data.nodes.length != 0 &&
        this.state.data.edges.length != 0
      ) {
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
   * When user leaves the page, clear interval
   */
  componentWillUnmount() {
    clearInterval(this.state.timer);
  }

  /**
   * Draw graph in the algorithm page canvas
   */
  draw() {
    removeAll();
    drawGraph(this.state.data, "");
  }

  /**
   * Set interval
   */
  setTimer(){
    if(this.state.timer) {
      clearInterval(this.state.timer);
    }
    if(this.state.play){
    let timer = setInterval(() => {
      if (this.state.index < this.state.states.length - 1) {
        this.next();
      } else {
        clearInterval(timer);
      }
    }, SPEEDS[this.state.speed]);
    this.setState({
      timer : timer
    })
  }
  }

  /**
   * Restart the animation when the end is reached
   */
  restart(){
    if(this.state.index == this.state.states.length -1){
      this.setState({
        index : 0,
        pseudoMap: setUpPseudocodeMap(
          this.state.pageName,
          0,
        ),
        value: 0,
      },()=>{
        this.resetGraph();
        this.draw();
      })
      
      }
  }

  /**
   * Toggle start: if is true set icon to be pause, else play
   */
  togglePlay() {
      this.restart();
      this.setState(
        {
          play: !this.state.play
        },
        () => {
          if(this.state.play) {
            this.setTimer();
          }
          else{
            clearInterval(this.state.timer);
          }
        }
      );
    }
  

/**
 * Update speed slider
 */
changeSpeed(){
  var input = this.speedRef;
  var currentVal = parseInt(input.current.value);
  this.setState({
    speed: currentVal
  },
  ()=>{
    this.setTimer();
  }
  )
 }

 /**
  * Reset graph
  */
 resetGraph(){
    resetHighlight(this.state.data.edges);
    resetTree(this.state.data.edges);
    resetNodes(this.state.data.nodes);
 }

  /**
   * Update graph
   */
  updateGraph(){
    updateGraph(this.state.states[this.state.index].tree, this.state.data.edges,true);
    updateGraph(this.state.states[this.state.index].highlighted,  this.state.data.edges,false);
    updateNodes(this.state.states[this.state.index].highlightedNodes, this.state.data.nodes);
  }


  /**
   * Move slider, update the graph and the pseudocode
   */
  onInput() {
    this.resetGraph();
    var input = this.sliderRef;
    var currentVal = parseInt(input.current.value);
    if(currentVal== this.state.states.length -1){
      this.setState({
        play:false,
      })
    }
    this.setState(
      {
        value: currentVal,
        pseudoMap: setUpPseudocodeMap(
          this.state.pageName,
          this.state.states[currentVal].status
        ),
        index: currentVal,
      },
      () => {
        this.updateGraph();
        this.draw();
      }
    );
  }

  /**
   * When start is pressed, check if the graph is correct.
   * If not, alert an error dialog. Otherwise, start the visualization
   */
  handleStart() {
    if(this.state.data == null) {
      emptyGraphMessage();
    } else {
      const res = this.props.states;
      if (res == ErrMessage.MST_NOT_FOUND) algorithmErrorMessage();
      else {
        this.setState({
          start: true,
          pseudoMap: setUpPseudocodeMap(this.state.pageName, 0),
          states: res,
          maxValue:res.length-1
        });
        this.draw();
      }
    }
  }

  render() {
    return (
      <div className="algorithm_wrap">
        <div className="title">
          <h1>{this.state.pageName}</h1>
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
                            ? { color: COLORS[1] }
                            : { color: COLORS[0] }
                          : { color: COLORS[1] }
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
              <div className="player">
                <table align="center">
        <tr>
            <td>
            <div className = "speedDiv" >
                <label>0.5x</label>
                <input
                  type="range"
                  max={SPEEDS.length-1}
                  value={this.state.speed}
                  className="speed"
                  ref={this.speedRef}
                  onInput={() => this.changeSpeed()}
                ></input>
                <label>2.0x</label>
                </div>
            </td>
            <td>
                <div id="playDiv">
                <button
                  onClick={() => this.previous()}
                  className="player-controls"
                >
                  <MdSkipPrevious></MdSkipPrevious>
                </button>
                {!this.state.play && (
                  <button
                    onClick={() => this.togglePlay()}
                    className="player-controls"
                  >
                    <MdPlayArrow></MdPlayArrow>
                  </button>
                )}
                {this.state.play && (
                  <button
                    onClick={() => this.togglePlay()}
                    className="player-controls"
                  >
                    <MdPause></MdPause>
                  </button>
                )}
                <button onClick={() => this.next()} className="player-controls">
                  <MdSkipNext></MdSkipNext>
                </button>
                <input
                  type="range"
                  max={this.state.maxValue}
                  value={this.state.value}
                  className="slider"
                  ref={this.sliderRef}
                  onInput={() => this.onInput()}
                ></input>

                </div>
            </td>
        </tr>
    </table>
               
                
              </div>
            ) : (
              <button onClick={() => this.handleStart()}>Visualize</button>
            )}
          </center>
        </div>
      </div>
    );
  }

  /**
   * When previous button is clicked: if it's at the start, display error message
   * Else display the previous state of the algorithm
   */
  previous() {
    this.resetGraph();
    this.setState({
      index: (this.state.index -= 1),
      value: this.state.index
    });
    if (this.state.index < 0) {
      this.setState({
        index: (this.state.index += 1),
        pseudoMap: setUpPseudocodeMap(this.state.pageName, 0),
        value: this.state.index
      });
      startOfAlgorithmMessage();
    }
    this.setState({
      pseudoMap: setUpPseudocodeMap(
        this.state.pageName,
        this.state.states[this.state.index].status
      ),
      value: this.state.index
    });
    this.updateGraph();
    this.draw();
  }


  /**
   * When next button is clicked: if it's at the end, display error message
   * Else display the next state of the algorithm
   */
  next() {
    this.setState({
      index: (this.state.index += 1),
      value: this.state.index
    });
    if(this.state.index == this.state.states.length -1 ){
      this.setState({
        play:false,
      }),
      clearInterval(this.state.timer);
    }
    if (this.state.index >= this.state.states.length) {
      this.setState({
        index: (this.state.index -= 1),
        pseudoMap: setUpPseudocodeMap(
          this.state.pageName,
          this.state.pseudocode.length - 1
        ),
        value: this.state.index
      });
      endOfAlgorithmMessage();
    }
    this.setState({
      pseudoMap: setUpPseudocodeMap(
        this.state.pageName,
        this.state.states[this.state.index].status
      ),
      value: this.state.index
    });
    this.resetGraph();
    this.updateGraph();
    this.draw();
  }
}


export default AlgorithmPage;

