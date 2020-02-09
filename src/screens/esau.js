import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router";

import Dialog from "../components/dialog";
import { data} from "../constants/defaultGraph";
import {
  noRootSelectedMessage,
} from "../constants/errorMessage";

import { drawGraph} from "../functions/d3Functions";
import { prims } from "../functions/mstStateAlgorithms";
import { Algorithm } from "../constants/algorithms";
import AlgorithmPage from './algorithm';
import { Graph } from "../functions/lib/graph";

/**
 * Esau William page uses AlgorithmPage and pass the states produced by the prim function.
 * When the esau page is opened, a dialog asking for the selection of capacity constraint will be displayed.
 */
class EsauPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isDialogOpen: true,
      states: [],
      data:
       this.props.latestGraph == null
          ? data
          : this.props.latestGraph
    }
}

componentDidMount() {
  console.log(this.props.latestGraph)
  if (this.state.data== null) {
    emptyGraphMessage();
    this.setState({
      isDialogOpen: false
    });
  }
  else{
    drawGraph(this.state.data, Algorithm.PRIM);
  }
}

  /**
   * Handle close dialog. If not selected root node pop up error message, else close.
   */
  handleClose() {
    if (!this.state.data.root) {
      noRootSelectedMessage();
    } else if (Object.keys(this.state.data.root).length == 0) {
      noRootSelectedMessage();
    } else {
      this.setState({
        isDialogOpen: false,
        states: prims(this.state.data)
      });
      console.log(this.state.states)
    }
  }

  /**
   *  Submit the root node selection
   */
  handleSubmit() {
    if (!this.state.data.root) {
      noRootSelectedMessage();
    } else if (Object.keys(this.state.data.root).length == 0) {
      noRootSelectedMessage();
    } else {
      if (this.state.data.root) drawGraph(this.state.data, Algorithm.PRIM);
      this.handleClose();
    }
  }


render() {
  return (
    <div>
            <Dialog
                title="Select a root node"
                isOpen={this.state.isDialogOpen}
                handleClose={() => this.handleClose()}
              >
                  <div className="canvasDialog">
                  <div className="drawingDialog"></div>
                </div>
                <center>
                  <button onClick={() => this.handleSubmit()}>Submit</button>
                </center>
              </Dialog>
              <AlgorithmPage pageName={Algorithm.PRIM} data={this.state.data} states={this.state.states}></AlgorithmPage>
    </div>
  
  );
}
}


function mapStateToProps(state) {
  return {
    latestGraph: state.graph.latestGraph
  };
}

export default withRouter(
  connect(mapStateToProps, { })(
    EsauPage
  )
);
