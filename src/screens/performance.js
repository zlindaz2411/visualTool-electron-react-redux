import React, { Component} from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router";
import { confirmAlert } from "react-confirm-alert";
import { Line } from "react-chartjs-2";
import InputDialog from "../components/inputDialog";
import { comparePerformanceByTime, comparePerformanceByWeight } from "../functions/performance";

import { Algorithm } from "../constants/algorithms";
import { data} from "../constants/defaultGraph";
import { emptyGraphMessage,onlyNumberErrorMessage} from "../constants/errorMessage";
import {validateNumber, validateEmpty} from "../functions/validator";

/**
 * Performance page where the function of performance comparison resides. 
 * A graph will be displayed.
 */
class PerformancePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedCheckboxes: new Set(),
      textDegree: "",
      degree:"",
      textCapacity:"",
      capacity:"",
      isCapacityDialogOpen: false,
      isDegreeDialogOpen:false,
      algos: [
        Algorithm.KRUSKAL,
        Algorithm.PRIM,
        Algorithm.BORUVKA,
        Algorithm.PARALLEL,
        Algorithm.CONSTRAINED,
        Algorithm.SIMULATED,
        Algorithm.ESAU
      ],
      graph: this.props.latestGraph == null ? data :  this.props.latestGraph,
    };
  }

  /**
   * Handle close dialog. If no number entered pop up error message, else close.
   */
  handleClose(capacity) {
    let incorrect = capacity ? (!validateNumber(this.state.textCapacity) || validateEmpty(this.state.textCapacity)) :(!validateNumber(this.state.textDegree) || validateEmpty(this.state.textDegree))
    if(incorrect){
       onlyNumberErrorMessage();
    }
    else{
      if(capacity){
        this.setState({
          isCapacityDialogOpen: false,
          capacity:this.state.textCapacity,
          textCapacity:""
        });
     
    }else{
      this.setState({
        isDegreeDialogOpen: false,
        degree:this.state.textDegree,
        textDegree:""
      });
    }
    }
    }

  /**
   * Submit the degree value
   * @param {*} e 
   */
  handleSubmit(e, capacity){
    e.preventDefault();
    let correct = capacity?validateNumber(this.state.textCapacity) && !validateEmpty(this.state.textCapacity):validateNumber(this.state.textDegree) && !validateEmpty(this.state.textDegree)
    if(correct){
       this.handleClose(capacity);
    }
    else{
      onlyNumberErrorMessage();
    }
  }


  /**
   * Each time change textfield update text;
   */
  handleChange(event, capacity) {
    if(capacity) this.setState({ textCapacity: event.target.value });
    else this.setState({ textDegree: event.target.value });
  }

  componentDidMount() {
    if(this.state.graph == null){
      emptyGraphMessage();
    }
  }

  /**
   * Each time the box is selected, add to the selected set 
   * if is not selected, delete from the set.
   * @param {*} e 
   */
  handleCheckboxChange(e) {
    const name = e.target.name;
    if(e.target.checked) {
      if(name == Algorithm.CONSTRAINED || name == Algorithm.SIMULATED){
        this.setState({
          isDegreeDialogOpen:true
        })
      }
      if(name == Algorithm.ESAU){
        this.setState({
          isCapacityDialogOpen:true
        })
      }
      this.state.selectedCheckboxes.add(name);
    }
    else this.state.selectedCheckboxes.delete(name);
  }

 
  /**
   * Get the running time of each selected algorithm and update the dataset of the graph
   */
  handleFormSubmit(e, weight) {
    e.preventDefault();
    if(this.state.graph  == null){
      emptyGraphMessage();
    }
    else{
    const selected = Array.from(this.state.selectedCheckboxes)
    if(selected.length == 0){
      confirmAlert({
        title: `Warning!`,
        message: `You must choose at least one algorithm`,
        buttons: [
            {
                label: 'Cancel'
            }
        ]
    })
    }
    else{
      let temp = weight ? comparePerformanceByWeight(selected, this.state.graph,  this.state.degree, this.state.capacity): comparePerformanceByTime(selected, this.state.graph,  this.state.degree, this.state.capacity)
      this.setState({
        data: {
          labels: selected,
          datasets: [
            {
              fill: false,
              borderColor: "#D9E9D6",
              pointBorderColor: "#50535D",
              pointRadius: 3,
              pointBackgroundColor: "#50535D",
              data: temp
            }
          ]
        }
    });
    }
    }
  }

  render() {
    return (
      <div className="performance_wrap">
        <InputDialog 
        handleClose={() => this.handleClose(false)}
        isOpen={this.state.isDegreeDialogOpen}
        title="Enter a number for the degree"
        submitAction={e => this.handleSubmit(e, false)}
        value={this.state.textDegree}
        handleChange={e => this.handleChange(e, false)}
        buttonName="Submit">
        </InputDialog>

        <InputDialog 
        handleClose={() => this.handleClose(true)}
        isOpen={this.state.isCapacityDialogOpen}
        title="Enter a number for the capacity"
        submitAction={e => this.handleSubmit(e, true)}
        value={this.state.textCapacity}
        handleChange={e =>  this.handleChange(e, true)}
        buttonName="Submit">
        </InputDialog>
        <div className="title">
          <h1>Compare Performance</h1>
          </div>
          <div className="sub_text">
           <h2>Select algorithms that you want to compare the performance and click "Compare".&ensp;&ensp;
            <span title ="Note that the parallel algorithm is implemented in parallel, due to the software problem (being single threaded), its performance is sequential" className ="tooltip">&#9432;</span>
            </h2>
        </div>
        <center>
          <div className="grid">
            <div className="column column_8_12">
              <div className="first_column">
                <div className = "chart">
              <Line
                width={400}
                height={325}
                data={this.state.data}
                options={{
                  responsive: false,
                  maintainAspectRatio: false,
                  title:{
                    display:true,
                    text:"Edges = " + this.state.graph.edges.length +"; Nodes = " +  this.state.graph.nodes.length  +"; -1 = solution not found"
                  },
                  legend:{
                    display:false,
                  }
                }}
              />
              </div>
              </div>
            </div>
            <div className="column column_4_12">
              <div className="second_column">
                <form >
                  {this.state.algos.map((algo, i) => (
                    <div className="checkbox">
                    
                      <label key={i}>
                        <input
                          type="checkbox"
                          name={algo}
                          onChange={this.handleCheckboxChange.bind(this)}
                        ></input>
                        {algo}
                      </label> 
                    </div>
                  ))}
                </form>
              </div>
            </div>
            <div className="action_buttons">
            <button onClick={(e) => this.handleFormSubmit(e, false)} className = "actionButton">Compare by Time</button>
            <button onClick={(e) => this.handleFormSubmit(e, true)} className = "actionButton">Compare by Weight</button>
          </div>
           
          </div>
          
        </center>
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
  connect(mapStateToProps, {  })(
    PerformancePage
  )
);
