import React, { Component, Fragment } from "react";

class AboutPage extends Component {
  render() {
    return (
      <div className="about_wrap">
        <div className="title">
          <h1>Instruction</h1>
        </div>
        <center className="txt_area">
          <a href='../assets/instruction.pdf' download>Click to download</a>
          {/* <textarea className="area" disabled rows="11" cols="70">
            Info here
          </textarea> */}
        </center>
      </div>
    );
  }
}

export default AboutPage;
