import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router";

import Dialog from "../components/dialog";
import InputDialog from "../components/inputDialog";
import { data} from "../constants/defaultGraph";
import {
  noRootSelectedMessage,
} from "../constants/errorMessage";

import { drawGraph} from "../functions/d3Functions";
import { esauWilliams } from "../functions/cmstStateAlgorithm";
import { Algorithm,ProblemDescription } from "../constants/algorithms";
import AlgorithmPage from './algorithm';
import {validateNumber, validateEmpty} from "../functions/validator";
import { onlyNumberErrorMessage } from "../constants/errorMessage";


/**
 * Esau William page uses AlgorithmPage and pass the states produced by the prim function.
 * When the esau page is opened, a dialog asking for the selection of capacity constraint will be displayed.
 */
class EsauPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      capacity:"",
      isDialogOpen: true,
      isInputDialogOpen: false,
      states: [],
      data:
       this.props.latestGraph == null
          ? data
          : this.props.latestGraph
    }
}

componentDidMount() {
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
        isInputDialogOpen:true,
      });
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

    /**
   * Handle close dialog. If no number entered pop up error message, else close.
   */
  handleInputClose() {
    if(!validateNumber(this.state.capacity) || validateEmpty(this.state.capacity)){
       onlyNumberErrorMessage();
    }
    else{
      this.setState({
        isInputDialogOpen: false,
        states: esauWilliams(this.state.data, this.state.capacity)
      });
    }
    }

  /**
   * Submit the degree value
   * @param {*} e 
   */
  handleInputSubmit(e){
    e.preventDefault();
    if(validateNumber(this.state.capacity) && !validateEmpty(this.state.capacity)){
       this.handleInputClose();
    }
    else{
      onlyNumberErrorMessage();
    }
  }

  /**
   * Each time change textfield update text;
   */
  handleChange(event) {
    this.setState({ capacity: event.target.value });
  }


render() {
  return (
    <div>
            <Dialog
                title="Select a root node connected to all vertices"
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
              <InputDialog 
                handleClose={() => this.handleInputClose()}
                isOpen={this.state.isInputDialogOpen}
                title="Enter a number for the capacity"
                submitAction={e => this.handleInputSubmit(e)}
                value={this.state.degree}
                handleChange={e => this.handleChange(e)}
                buttonName="Submit">

              </InputDialog>
              <AlgorithmPage pageName={Algorithm.ESAU} data={this.state.data} subText={ProblemDescription.CMSTP} states={this.state.states}></AlgorithmPage>
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
