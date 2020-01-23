import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router";

import { data} from "../constants/defaultGraph";

import { parallel } from "../functions/algorithms";
import { Algorithm } from "../constants/algorithms";
import AlgorithmPage from './algorithm';

/**
 * Parallel page which uses AlgorithmPage and pass the states produced by the parallel function
 */
class ParallelPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data:
        Object.keys(this.props.latestGraph).length == 0
          ? data
          : this.props.latestGraph
    }
}

render() {
  return (
    <AlgorithmPage pageName={Algorithm.PARALLEL} data={this.state.data} states={parallel(this.state.data.nodes, this.state.data.edges)}></AlgorithmPage>
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
    ParallelPage
  )
);
