import React, { Component } from "react";

class Card extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isSelected: false
    };
  }

  /**
   * Handle click on card, set isSelected
   */
  handleClick() {
    this.setState({
      isSelected: !isSelected
    });
  }

  render() {
    return (
      <center className="card">
        <center>
          <img className="graph" src={this.props.img}></img>
        </center>
        <br></br>
        <center>
          <h2>{this.props.name}</h2>
        </center>
      </center>
    );
  }
}

export default Card;
