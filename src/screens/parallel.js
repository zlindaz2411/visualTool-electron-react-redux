import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router";

import { data} from "../constants/defaultGraph";

import { parallel } from "../functions/mstStateAlgorithms";
import { Algorithm, ProblemDescription } from "../constants/algorithms";
import AlgorithmPage from './algorithm';

/**
 * Parallel page which uses AlgorithmPage and pass the states produced by the parallel function
 */
class ParallelPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data:
       this.props.latestGraph == null
          ? data
          : this.props.latestGraph
    }
}

render() {
  return (
    <AlgorithmPage pageName={Algorithm.PARALLEL} data={this.state.data} subText={ProblemDescription.MSTP} states={parallel(this.state.data)}></AlgorithmPage>
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
