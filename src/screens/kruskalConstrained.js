import React, { Component} from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router";

import { data } from "../constants/defaultGraph";
import { kruskalConstrained } from "../functions/dmstStateAlgorithms";
import { Algorithm } from "../constants/algorithms";
import AlgorithmPage from './algorithm';

/**
 * Kruskal page which uses AlgorithmPage and pass the states produced by the kruskal function
 */
class KruskalConstrainedPage extends Component {
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
      <AlgorithmPage pageName={Algorithm.CONSTRAINED} data={this.state.data} states={kruskalConstrained(this.state.data, 2)}></AlgorithmPage>
    );
  }
}

function mapStateToProps(state) {
  return {
    latestGraph: state.graph.latestGraph
  };
}

export default withRouter(connect(mapStateToProps, {})(KruskalConstrainedPage));

