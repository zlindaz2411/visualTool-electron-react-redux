import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router";
import { confirmAlert } from "react-confirm-alert";
import classNames from "classnames";

// import { Graph } from "react-d3-graph";
import { data1, myConfig, nodes, links} from "../constants/defaultGraph";
import { getPseudocode, setUpPseudocodeMap } from "../constants/pseudocode";

import Graph from '../components/d3/graph';
import {kruskals} from '../constants/algorithms';



import { saveNote, addNote, fetchNotes, deleteNote } from "./../actions/index";
import { Accelerator } from "electron";



const initialState = {
  edgeList: [],
  nodeList: [],
  start: false,
  highlightedEdges: [],
  highlightedNodes: [],
  data:data1,
  index : 0,
};

const colors = ["#84C262", "#50525E"];

class AlgorithmPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ...initialState,
      name: this.props.location.name,
      pseudocode: getPseudocode(this.props.location.name),
      start: false,
      pseudoMap: null
    };
  }

  componentDidUpdate(prevProps) {
    if (prevProps.location.name !== this.props.location.name) {
      this.setState({
        name: this.props.location.name,
        pseudocode: getPseudocode(this.props.location.name),
        pseudoMap: null,
        start:false,
        states:[],
        data: data1,
      });
      // location.reload();
    }
  }
  render() {
    return (
      <div className="algorithm_wrap">
        <div className="title">
          <h1>{this.state.name}</h1>
          <center>
            <div className="grid">
              <div className="column column_7_12">
                <div className="canvas">
                  <Graph data={this.state.data}/>

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
                          this.state.pseudoMap != null ?
                          this.state.pseudoMap.get(pseudo) == false
                          ? { color: colors[1] }
                          : { color: colors[0] }
                      :  { color: colors[1] }}
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
                <button onClick={() =>this.previous()}>Previous</button>
                <button onClick={() =>this.next()}>Next</button>
              </div>
            ) : (
              <button
                onClick={() =>
                  this.setState({
                    start: true,
                    pseudoMap: setUpPseudocodeMap(
                      this.props.location.name,
                      0
                    ),
                    states: kruskals(nodes, this.state.data.edges),
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
  previous(){
    if(this.state.index == 0) {
        confirmAlert({
            title: `Warning!`,
            message: `Nothing before the start of the algorithm`,
            buttons: [
                {
                    label: 'Cancel'
                }
            ]
        })
    }
    else{
      this.setState({
        index : this.state.index -=1,
        pseudoMap: setUpPseudocodeMap(
            this.props.location.name,
            this.state.states[this.state.index].status
          ),

      });
      for(let i =0; i< this.state.states[this.state.index].highlighted.length;i++){    
        for(let j =0;j<this.state.data.edges.length; j++){
          if(this.state.data.edges[j].source == this.state.states[this.state.index].highlighted[i].source && this.state.data.edges[j].target == this.state.states[this.state.index].highlighted[i].target){
              this.state.data.edges[j].highlight = true;
              this.setState({
                data:this.state.data,
              })
          }
          else if(this.state.data.edges[j].source == this.state.states[this.state.index].highlighted[i].target && this.state.data.edges[j].target == this.state.states[this.state.index].highlighted[i].source){
            this.state.data.edges[j].highlight = true;
              this.setState({
                data:this.state.data,
              })
          }
         }
        }
          
    }
  }

   next() {
    if(this.state.index == this.state.states.length-1) {
        confirmAlert({
            title: `Warning!`,
            message: `End of the algorithm`,
            buttons: [
                {
                    label: 'Cancel'
                }
            ]
        })
    }
    else{
      this.setState({
        pseudoMap: setUpPseudocodeMap(
            this.props.location.name,
            this.state.states[this.state.index].status
          ),
          index : this.state.index +=1
      });
      console.log(this.state.states[2])
     // console.log(this.state.states[this.state.index].highlighted)
      for(let i =0; i< this.state.states[this.state.index].highlighted.length;i++){
        // console.log( this.state.states[index].highlighted[0])
         for(let j =0;j<this.state.data.edges.length; j++){
           if(this.state.data.edges[j].source == this.state.states[this.state.index].highlighted[i].source && this.state.data.edges[j].target == this.state.states[this.state.index].highlighted[i].target){
               this.state.data.edges[j].highlight = true;
               this.setState({
                 data:this.state.data,
               })
           }
           else if(this.state.data.edges[j].source == this.state.states[this.state.index].highlighted[i].target && this.state.data.edges[j].target == this.state.states[this.state.index].highlighted[i].source){
             this.state.data.edges[j].highlight = true;
               this.setState({
                 data:this.state.data,
               })
           }
          }
         }
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
  connect(
    mapStateToProps,
    { addNote, saveNote, fetchNotes, deleteNote }
  )(AlgorithmPage)
);
