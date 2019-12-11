import React, { Component } from "react";

class Card extends Component {
  body(){
    return( <center>
    <img src={this.props.img} height="40" width="40"></img>
    <h3>{this.props.name}</h3>
  </center>)
  }
  render() {
    return (
      this.props.isSelected ? (
        <div className="card">
        {this.body()}
            </div>
      ) :
      <div className="selected">
      {this.body()}
     </div>
    );
  }
}

export default Card;
