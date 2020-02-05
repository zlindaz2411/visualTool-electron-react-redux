import React, { Component, Fragment } from "react";
import { withRouter } from "react-router";
import { connect } from "react-redux";
import { confirmAlert } from "react-confirm-alert";
import {Prompt} from "react-router-dom";
import htmlToImage from "html-to-image";

import Dialog from "../components/dialog";
import InputDialog from "../components/inputDialog";

import {resetEmptyGraph} from "../constants/defaultGraph";

import {
  removeAll,
  drawGraph,
  setWidthHeight,
  createBlankCanvas
} from "../functions/d3Functions";
import { fetchGraphs, deleteGraph, addGraph, passGraph } from "../actions/draw";
import {
  resetTree,
  resetHighlight,
  resetNodes,
  resetRoot
} from "../functions/graphAlgorithms";
import { graphNotSelectedMessage } from "../constants/errorMessage";
import { Graph } from "../functions/lib/graph";

/**
 * Draw page that handles the drawing, load and save graph functionalities.
 */
class DrawPage extends Component {
  constructor(props) {
    super(props);
    this.imgRef = React.createRef();
    this.state = {
      isDialogOpen: false,
      selectedGraph: null,
      isSaveDialogOpen: false,
      graph: new Graph(),
      name: "",
    };
  }

  componentDidMount() {
    resetNodes(this.state.graph.nodes);
    resetHighlight(this.state.graph.edges);
    resetTree(this.state.graph.edges);
    resetRoot(this.state.graph);
    this.draw();
  }

  /**
   * Functions to draw graphs;
   */
  draw() {
    removeAll();
    setWidthHeight(this.state.graph, true);
    drawGraph(this.state.graph, "draw");
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
      isSaveDialogOpen: false,
      name:"",
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
    if (!graph) {
      graphNotSelectedMessage();
    } else {
    this.setState(
      {
        graph: new Graph(graph.root, graph.nodes, graph.edges, graph.adjacents),
        selectedGraph: null,
      },
      () => {
        this.draw();
        this.handleClose();
      }
    );
    }
  }

  /**
   * Delete the selected graph from database
   * @param {*} graph
   */
  handleDeleteGraph(graph) {
    if (!graph) {
      graphNotSelectedMessage();
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
    this.setState({
      isSaveDialogOpen: true
    });
  }

  /**
   * Convert html to image
   */
  async convertToImg(clone) {
    const img = this.imgRef.current;
    await Promise.resolve(
      htmlToImage.toPng(img).then(function(dataUrl) {
        clone["image"] = dataUrl;
      })
    ).then(() => {
      this.props.addGraph(clone);
    });
  }

  /**
   * Save the new graph with new name
   */
  saveNewGraph(e) {
    e.preventDefault();
    let clone = Object.assign({}, this.state.graph);
    if(clone._id) delete clone._id;
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
      clone["name"] = this.state.name;
      this.convertToImg(clone);
      this.handleClose();
    }
  }

  /**
   * When submit check if is a valid graph.
   */
  handleSubmit() {
    let edges = this.state.graph.edges;
    let check = new Set();
    for (let i = 0; i < edges.length; i++) {
      check.add(edges[i].source);
      check.add(edges[i].target);
    }
    if (check.size != this.state.graph.nodes.length) {
      confirmAlert({
        title: `Warning!`,
        message: `There is an error in the drawn graph: it must be a connected graph`,
        buttons: [
          {
            label: "Cancel"
          }
        ]
      });
    } else if (
      this.state.graph.nodes.length == 0 &&
      this.state.graph.edges.length == 0
    ) {
      confirmAlert({
        title: `Warning!`,
        message: `You can't submit an empty graph`,
        buttons: [
          {
            label: "Cancel"
          }
        ]
      });
    } else {
      this.props.passGraph(this.state.graph);
      confirmAlert({
        title: `Success!`,
        message: `Graph submitted`,
        buttons: [
          {
            label: "Cancel"
          }
        ]
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
            Submit the graph to be used for visualization and performance
            comparison.&ensp;&ensp;
            <span title ="Double click on empty space to draw a vertex.&#013; Drag from vertex to
              vertex to create an edge.&#013; Right click on a vertex or an edge to
              delete.&#013; Click on the weight and input a new value and press Enter
              to change." className ="tooltip">&#9432;</span>
          </h2>     
        </div>

        <center>
          <div className="canvas">
            <div ref={this.imgRef} className="drawing"></div>
          </div>
          {/* <Prompt
            when={JSON.stringify(this.state.graph) !== JSON.stringify(this.state.initalGraph)}
            message={'Unsaved changes'}
          /> */}
          <div className="action_buttons">
            <button onClick={() => this.openModal()}>Load</button>
            <Dialog
              title="Load Graph"
              isOpen={this.state.isDialogOpen}
              handleClose={() => this.handleClose()}
            >
              <div className="load">
                {this.props.graphs.map((graph, index) => (
                  <button
                    onClick={() => this.handleSelectGraph(graph)}
                    className="cardBtn"
                  >
                    <img className="graph" src={graph.image}></img>
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
            <button onClick={() => this.clearAll()}>Clear</button>
            <button onClick={() => this.handleSubmit()}>Submit</button>
          </div>
        </center>
      </div>
    );
  }

  /**
   * Clear graph
   */
  clearAll() {
    resetEmptyGraph();
    this.setState(
      {
        graph: new Graph()
      },
      () => {
        createBlankCanvas(this.state.graph, "draw");
      }
    );
  }
}

function mapStateToProps(state) {
  return {
    graphs: state.graph.arr,
    latestGraph: state.graph.latestGraph
  };
}

export default withRouter(
  connect(mapStateToProps, { fetchGraphs, deleteGraph, addGraph, passGraph })(
    DrawPage
  )
);
