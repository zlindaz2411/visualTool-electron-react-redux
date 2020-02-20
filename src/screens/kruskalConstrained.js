import React, { Component} from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router";

import { data } from "../constants/defaultGraph";
import { kruskalConstrained } from "../functions/dcmstStateAlgorithms";
import { Algorithm,ProblemDescription } from "../constants/algorithms";
import AlgorithmPage from './algorithm';
import InputDialog from "../components/inputDialog";
import {validateNumber, validateEmpty} from "../functions/validator";
import { onlyNumberErrorMessage } from "../constants/errorMessage";

/**
 * Kruskal page which uses AlgorithmPage and pass the states produced by the kruskal function
 */
class KruskalConstrainedPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      degree: "",
      isDialogOpen: true,
      states:[],
      data:
        this.props.latestGraph == null
          ? data
          : this.props.latestGraph
    }
  }

  /**
   * Handle close dialog. If no number entered pop up error message, else close.
   */
  handleClose() {
    if(!validateNumber(this.state.degree) || validateEmpty(this.state.degree)){
       onlyNumberErrorMessage();
    }
    else{
      this.setState({
        isDialogOpen: false,
        states: kruskalConstrained(this.state.data, this.state.degree)
      });
    }
    }

  /**
   * Submit the degree value
   * @param {*} e 
   */
  handleSubmit(e){
    e.preventDefault();
    if(validateNumber(this.state.degree) && !validateEmpty(this.state.degree)){
       this.handleClose();
    }
    else{
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
        buttonName="Submit">
        </InputDialog>
      
      <AlgorithmPage pageName={Algorithm.CONSTRAINED} data={this.state.data} subText={ProblemDescription.DCMSTP} states={this.state.states}></AlgorithmPage>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    latestGraph: state.graph.latestGraph
  };
}

export default withRouter(connect(mapStateToProps, {})(KruskalConstrainedPage));

