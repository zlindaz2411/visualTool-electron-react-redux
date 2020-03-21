import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router";

/**
 * About page that provide info about the system
 */
class AboutPage extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className="about_wrap">
        <div className="title">
          <h1>About</h1>
        </div>
        <center>
          <div className="area">
            <textarea rows="20" disabled>
              This system is built for educational purpose to teach newcomers
              the Minimum Spanning Tree problem and related NP-hard problems and
              also to help people already familiar with the subject to gain a
              better understanding of the topic.
            </textarea>
          </div>
        </center>
      </div>
    );
  }
}

function mapStateToProps(state) {}

export default withRouter(connect(mapStateToProps, {})(AboutPage));
