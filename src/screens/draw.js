import React, { Component, Fragment } from "react";
import { withRouter } from "react-router";
import { connect } from "react-redux";
import { confirmAlert } from "react-confirm-alert";

import Dialog from "../components/dialog";
import InputDialog from "../components/inputDialog";

import { data } from "../constants/defaultGraph";
import Graph from "../components/d3/graph";
import {
  removeAll,
  drawGraph,
  setWidthHeight,
  handleDelete
} from "../components/d3/graph1";
import { saveGraph, fetchGraphs, deleteGraph, addGraph } from "../actions/draw";

class DrawPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isDialogOpen: false,
      selectedGraph: null,
      isSaveDialogOpen: false,
      loadedGraph: null,
      name: ""
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
   * Each time change textfield update text;
   */
  handleChange(event) {
    this.setState({ name: event.target.value });
  }

  /**
   * Set dialog state to be true, this toggle the dialog to be opened
   */
  openModal() {
    this.props.fetchGraphs();
    this.setState({ isDialogOpen: true });
  }

  /**
   * Set dialog state to be false, this toggle the dialog to be closed
   */
  handleClose() {
    this.setState({
      isDialogOpen: false,
      isSaveDialogOpen: false
    });
  }

  /**
   * Set the selected graph
   * @param {*} graph
   */
  handleSelectGraph(graph) {
    this.setState({ selectedGraph: graph });
  }

  /**
   * Load the selected graph
   * @param {*} graph
   */
  handleLoadGraph(graph) {
    this.setState({
      loadedGraph: graph,
      selectedGraph: null
    });

    this.handleClose();
  }

  /**
   * Delete the selected graph from database
   * @param {*} graph
   */
  handleDeleteGraph(graph) {
    if (!graph) {
      confirmAlert({
        title: `Warning!`,
        message: `You have not selected a graph`,
        buttons: [
          {
            label: "Cancel"
          }
        ]
      });
    } else {
      confirmAlert({
        title: `Warning!`,
        message: `Are you sure you want to delete the graph?`,
        buttons: [
          {
            label: `Delete`,
            onClick: () => {
              this.props.deleteGraph(graph._id);
            }
          },
          {
            label: "Cancel"
          }
        ]
      });
    }
  }

  /**
   * Save graph
   */
  save() {
    if (this.state.loadedGraph) this.props.saveGraph(this.state.loadedGraph);
    else {
      this.setState({
        isSaveDialogOpen: true
      });
    }
  }

  /**
   * Save the new graph with new name
   */
  saveNewGraph(e) {
    e.preventDefault();
    if (!this.state.name) {
      confirmAlert({
        title: `Warning!`,
        message: `You have not entered a name`,
        buttons: [
          {
            label: "Cancel"
          }
        ]
      });
    } else {
      let clone = Object.assign({}, data);
      clone["name"] = this.state.name;
      this.props.addGraph(clone);
      this.setState({
        name: ""
      });
    }
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
            <button onClick={() => this.openModal()}>Load</button>
            <Dialog
              title="Load Graph"
              isOpen={this.state.isDialogOpen}
              handleClose={() => this.handleClose()}
            >
              <div className="load">
                {this.props.graphs.map((graph, index) => (
                  <button onClick={() => this.handleSelectGraph(graph)}>
                    {graph.name}
                  </button>
                ))}
              </div>
              <div className="action_buttons">
                <button
                  onClick={() =>
                    this.handleDeleteGraph(this.state.selectedGraph)
                  }
                >
                  Delete
                </button>
                <button
                  onClick={() => this.handleLoadGraph(this.state.selectedGraph)}
                >
                  Load
                </button>
              </div>
            </Dialog>
            <InputDialog
              handleClose={() => this.handleClose()}
              isOpen={this.state.isSaveDialogOpen}
              title="Enter a name for the graph"
              submitAction={e => this.saveNewGraph(e)}
              value={this.state.name}
              handleChange={e => this.handleChange(e)}
              buttonName="Save"
            ></InputDialog>

            <button onClick={() => this.save()}>Save</button>
            <button onClick={() => this.delete()}>Delete</button>
            <button onClick={() => this.clearAll()}>CLear</button>
          </div>
        </center>
      </div>
    );
  }
  /**
   * Delete selected node or edge
   */
  delete() {
    handleDelete(data);
  }
  /**
   * Clear graph
   */
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
  connect(mapStateToProps, { saveGraph, fetchGraphs, deleteGraph, addGraph })(
    DrawPage
  )
);
