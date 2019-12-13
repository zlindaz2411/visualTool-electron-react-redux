import React, { Component, Fragment, formSubmitEvent } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router";
import { confirmAlert } from "react-confirm-alert";
import { Line } from "react-chartjs-2";

import { comparePerformance } from "../functions/performance";

import { Algorithm } from "../constants/algorithms";
import { emptyGraph} from "../constants/defaultGraph";
import { emptyGraphMessage } from "../constants/errorMessage";


class PerformancePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedCheckboxes: new Set(),
      algos: [
        Algorithm.KRUSKAL,
        Algorithm.PRIM,
        Algorithm.BORUVKA,
        Algorithm.PARALLEL
      ],
      data:{},
      graph: Object.keys(this.props.latestGraph).length ==0 ? emptyGraph :  this.props.latestGraph,
    };
  }

  componentDidMount() {
    if(Object.keys(this.props.latestGraph).length == 0){
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
    if (e.target.checked) this.state.selectedCheckboxes.add(name);
    else this.state.selectedCheckboxes.delete(name);
  }

 
  /**
   * Get the running time of each selected algorithm and update the dataset of the graph
   */
  handleFormSubmit(e) {
    e.preventDefault();
    if(Object.keys(this.props.latestGraph).length == 0){
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
            data: comparePerformance(selected, this.state.graph)
          }
        ]
      }
    });
    }
  }

  render() {
    return (
      <div className="performance_wrap">
        <div className="title">
          <h1>Compare Performance</h1>
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
                  title:{
                    display:false,
                  },
                  legend:{
                    display:false,
                    position:'right'
                  }
                }}
              />
              </div>
              </div>
            </div>
            <div className="column column_4_12">
              <div className="second_column">
                <form onSubmit={this.handleFormSubmit.bind(this)}>
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
                  <div className="button">
                    <button>Compare</button>
                  </div>
                </form>
              </div>
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
