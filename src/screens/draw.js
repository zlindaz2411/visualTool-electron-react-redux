import React, { Component, Fragment } from "react";
import { withRouter } from "react-router";
import { connect } from "react-redux";

import Dialog from "../components/dialog";

import { data } from "../constants/defaultGraph";
import Graph from "../components/d3/graph";
import { removeAll, drawGraph, setWidthHeight } from "../components/d3/graph1";
import { saveGraph, fetchGraphs, deleteGraph } from "../actions/draw";

class DrawPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isDialogOpen: false,
      selectedGraph: null
    };
    //  this.openModal = this.openModal.bind(this);
    //  this.handleClose = this.handleClose.bind(this);
    //  this.handleSelectGraph = this.handleSelectGraph.bind(this);
  }

  componentDidMount() {
    setWidthHeight(data.nodes, true);
    drawGraph(data, true);
  }

  /**
   * Set dialog state to be true, this toggle the dialog to be opened
   */
  openModal() {
    console.log("haha")
    this.props.fetchGraphs();
    this.setState({ isDialogOpen: !this.state.isDialogOpen });
  }

  /**
   * Set dialog state to be false, this toggle the dialog to be closed
   */
  handleClose() {
    console.log("Close");
    this.setState({ isDialogOpen: false });
  }

  /**
   * Set the selected graph
   * @param {*} graph
   */
  handleSelectGraph(graph) {
    console.log(graph);
    this.setState({ selectedGraph: graph });
    console.log(this.state.selectedGraph);
    // this.handleClose();
  }

  render() {
    return (
      <div className="about_wrap">
        <div className="title">
          <h1>Draw</h1>
        </div>
        <div className="sub_text">
          <h2>
            Double click on empty space to draw a vertex. Drag from vertex to
            vertex to create an edge.
          </h2>
          <h2>Click on a vertex or an edge to delete.</h2>
        </div>
        <center>
          <div className="canvas"></div>
          <div className="action_buttons">
            <button onClick={() => this.openModal()}>
              Load
            </button>
            <Dialog title="Load Graph" isOpen={this.state.isDialogOpen} handleClose={() => this.handleClose()}>
                <div className="load">
                  {this.props.graphs.map((graph, index) => (
                    <button onClick={() => this.handleSelectGraph(graph)}>
                      {graph._id}
                    </button>
                  ))}
                </div>
            {/* <button onClick={() => this.handleClose()}>Close</button> */}
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
    );
  }
  delete() {
    handleDelete(data);
  }
  clearAll() {
    //   data = {};
    //need to clear
    removeAll();
  }
}

function mapStateToProps(state) {
  return {
    graphs: state.graph.arr,
    latestGraph: state.graph.latestGraph
  };
}

export default withRouter(
  connect(mapStateToProps, { saveGraph, fetchGraphs, deleteGraph })(DrawPage)
);
