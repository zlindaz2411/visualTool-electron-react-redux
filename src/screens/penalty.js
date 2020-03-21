import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router";

import { data } from "../constants/defaultGraph";
import { simulatedAnnealingPenalty } from "../functions/dcmstStateAlgorithms";
import { Algorithm, ProblemDescription } from "../constants/algorithms";
import AlgorithmPage from "./algorithm";
import InputDialog from "../components/inputDialog";
import { validateNumber, validateEmpty } from "../functions/validator";
import { onlyNumberErrorMessage } from "../constants/errorMessage";

/**
 * SimulatedAnnealingPenalty page which uses AlgorithmPage and pass the states produced by the Simulated Annealing with penalty function
 */
class SimulatedAnnealingPenaltyPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      degree: "",
      isDialogOpen: true,
      states: [],
      data: this.props.latestGraph == null ? data : this.props.latestGraph
    };
  }

  /**
   * Handle close dialog. If no number entered pop up error message, else close.
   */
  handleClose() {
    if (
      !validateNumber(this.state.degree) ||
      validateEmpty(this.state.degree)
    ) {
      onlyNumberErrorMessage();
    } else {
      this.setState({
        isDialogOpen: false,
        states: simulatedAnnealingPenalty(this.state.data, this.state.degree)
      });
    }
  }

  /**
   * Submit the degree value
   * @param {*} e
   */
  handleSubmit(e) {
    e.preventDefault();
    if (
      validateNumber(this.state.degree) &&
      !validateEmpty(this.state.degree)
    ) {
      this.handleClose();
    } else {
      onlyNumberErrorMessage();
    }
  }

  /**
   * Each time change textfield update text;
   */
  handleChange(event) {
    this.setState({ degree: event.target.value });
  }

  render() {
    return (
      <div>
        <InputDialog
          handleClose={() => this.handleClose()}
          isOpen={this.state.isDialogOpen}
          title="Enter a number for the degree"
          submitAction={e => this.handleSubmit(e)}
          value={this.state.degree}
          handleChange={e => this.handleChange(e)}
          buttonName="Submit"
        ></InputDialog>

        <AlgorithmPage
          pageName={Algorithm.PENALTY}
          data={this.state.data}
          subText={
            ProblemDescription.DCMSTP +
            " This version of Simulated Annealing operates in a search space that allows infeasible intermediate solutions by adding a penalty."
          }
          states={this.state.states}
        ></AlgorithmPage>
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
  connect(mapStateToProps, {})(SimulatedAnnealingPenaltyPage)
);
