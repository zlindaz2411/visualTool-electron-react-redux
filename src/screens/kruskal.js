import React, { Component} from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router";

import { data } from "../constants/defaultGraph";
import { kruskals } from "../functions/mstStateAlgorithms";
import { Algorithm, ProblemDescription } from "../constants/algorithms";
import AlgorithmPage from '../screens/algorithm';

/**
 * Kruskal page which uses AlgorithmPage and pass the states produced by the kruskal function
 */
class KruskalPage extends Component {
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
      <AlgorithmPage pageName={Algorithm.KRUSKAL} data={this.state.data} subText={ProblemDescription.MSTP} states={kruskals(this.state.data)}></AlgorithmPage>
    );
  }
}

function mapStateToProps(state) {
  return {
    latestGraph: state.graph.latestGraph
  };
}

export default withRouter(connect(mapStateToProps, {})(KruskalPage));

