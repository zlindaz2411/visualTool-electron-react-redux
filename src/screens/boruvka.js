import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router";

import { data} from "../constants/defaultGraph";

import { boruvkas } from "../functions/algorithms";
import { Algorithm } from "../constants/algorithms";
import AlgorithmPage from '../screens/algorithm';

class BoruvkaPage extends Component {
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
    <AlgorithmPage pageName={Algorithm.BORUVKA} data={this.state.data} states={boruvkas(this.state.data.nodes, this.state.data.edges)}></AlgorithmPage>
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
