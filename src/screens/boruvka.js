import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router";

import { data} from "../constants/defaultGraph";

import { boruvkas } from "../functions/mstStateAlgorithms";
import { Algorithm } from "../constants/algorithms";
import AlgorithmPage from '../screens/algorithm';

/**
 * Boruvka page which uses AlgorithmPage and pass the states produced by the boruvka function
 */
class BoruvkaPage extends Component {
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
    <AlgorithmPage  pageName={Algorithm.BORUVKA} data={this.state.data} states={boruvkas(this.state.data)}></AlgorithmPage>
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
    BoruvkaPage
  )
);
