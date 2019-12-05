import React, { Component, Fragment } from 'react';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';

import Dialog from '../components/dialog';

import { data } from "../constants/defaultGraph";
import Graph from '../components/d3/graph';
import { removeAll, drawGraph, setWidthHeight } from "../components/d3/graph1";
import { saveGraph, fetchGraphs, deleteGraph } from '../actions/draw';


class DrawPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
          isDialogOpen: false,
          selectedGraph: null,
       }
      }

      componentDidMount() {
        setWidthHeight(data.nodes, true);
        drawGraph(data, true);
      }


      openModal(){
        this.props.fetchGraphs();
        this.setState({ isDialogOpen: true})
      }
      handleClose(){
        console.log("here");
        this.setState({ isDialogOpen: false})
      }

      handleSelectGraph(graph){
        this.setState({selectedGraph:graph})
      }

    render(){
        return(
            <div className = "about_wrap">
                <div className ="title">
                    <h1>Draw</h1>
                    
                </div>
                <div className ="sub_text">
                   <h2 >Double click on empty space to draw a vertex. Drag from vertex to vertex to create an edge.</h2>
                   <h2 >Click on a vertex or an edge to delete.</h2>
                </div>
                <center >
                  <div className="canvas">
                  </div>
                  <div className="action_buttons">
                  <button type="button" onClick={() => this.openModal()}>Load</button>
                  <Dialog title ="Load Graph" isOpen={this.state.isDialogOpen} handleClose={this.handleClose}>
                    <div>
                      <div>
                       {this.props.graphs.map((graph, index) => ( 
                                   <button onClick={() => this.handleSelectGraph(graph)}>{graph._id}</button>
                                ))}
                        </div>
                      </div>
                  </Dialog>
               {/* <Modal
          isOpen={this.state.isModalOpen}
          // onAfterOpen={this.afterOpenModal}
          onRequestClose={() =>this.handleClose()}
          // style={customStyles}
          className="modal"
          overlayClassName="overlay"
          contentLabel="Example Modal"
        >
 
          <h2 >Hello</h2>
          <button onClick={() =>this.handleClose()}>close</button>
          <div>I am a modal</div>
        </Modal> */}
   
                  <button onClick={() => this.save()}>Save</button>
                  <button onClick={() => this.delete()}>Delete</button>
                  <button onClick={() => this.clearAll()}>CLear</button>
                </div>
                </center>
                
            </div>
        )
    }
    delete(){
      handleDelete(data);
    }
    clearAll(){
     //   data = {};
     //need to clear 
        removeAll();
    }
}

function mapStateToProps(state) {
  return {
      graphs: state.graph.arr,
      latestGraph: state.graph.latestGraph
  }
}

export default withRouter(connect(mapStateToProps, { saveGraph, fetchGraphs, deleteGraph })(DrawPage));