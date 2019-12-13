import React, { Component, Fragment } from "react";
import * as d3 from "d3";
import { connect } from "react-redux";
import { withRouter } from "react-router";

// import { saveNote, addNote, fetchNotes, deleteNote } from './../actions/index';

const w = 580,
  h = 350,
  radius = 10;

const xScale = d3
  .scaleLinear()
  .domain([0, w])
  .range([0, w]); // Set margins for x specific

const yScale = d3
  .scaleLinear()
  .domain([0,h])
  .range([0, h]);

class Graph extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: this.props.data
    };
  }
  componentDidMount() {
    setInterval(this.drawGraph(), 1000);

    
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ data: nextProps.data });
  }

  // componentDidUpdate(prevProps, prevState) {
  //   if (prevState.data !== this.state.data) {
  //     this.removeAll();
  //     this.drawGraph();
  //   }
  // }
  
  removeAll(){
    d3.select("svg").remove();
  }
  drawGraph() {
    const nodeList = this.state.data.nodes;

    const edgeList = this.state.data.edges;
    var id = nodeList.length + 1;

    const svg = d3
      .select(".canvas")
      .append("svg")
      .attr("width", w)
      .attr("height", h)
      .on("click", () => {
        var x = document.querySelector(".canvas").getBoundingClientRect().left;
        var y = document.querySelector(".canvas").getBoundingClientRect().top;
        this.state.data.nodes.push({
          id: id,
          x: Math.round(xScale(d3.event.x-x-10)),
          y: Math.round(yScale(d3.event.y-y-15))
        });
        this.removeAll();
        this.drawGraph();
      });

    const rect = d3
      .select("svg")
      .append("rect")
      .attr("width", w)
      .attr("height", h)
      .style("fill", "none")

    svg
      .selectAll("line")
      .data(edgeList)
      .enter()
      .append("line")
      .attr("x1", function(d) {
        for (let i = 0; i < nodeList.length; i++) {
          if (nodeList[i].id == d.source) {
            return xScale(nodeList[i].x);
          }
        }
      })
      .attr("y1", function(d) {
        for (let i = 0; i < nodeList.length; i++) {
          if (nodeList[i].id == d.source) {
            return yScale(nodeList[i].y);
          }
        }
      })
      .attr("x2", function(d) {
        for (let i = 0; i < nodeList.length; i++) {
          if (nodeList[i].id == d.target) {
            return xScale(nodeList[i].x);
          }
        }
      })
      .attr("y2", function(d) {
        for (let i = 0; i < nodeList.length; i++) {
          if (nodeList[i].id == d.target) {
            return yScale(nodeList[i].y);
          }
        }
      })
      .style("stroke-width", "2px")
      .style("stroke", function(d) {
        return d.highlight == true ? d3.rgb("#84C262") : d3.rgb("#94979D");
      });

    svg
      .selectAll("text.weight")
      .data(edgeList)
      .enter()
      .append("text")
      .attr("x", function(d) {
        let x = 0;
        for (let i = 0; i < nodeList.length; i++) {
          if (nodeList[i].id == d.source) {
            x += xScale(nodeList[i].x);
          }
        }
        for (let i = 0; i < nodeList.length; i++) {
          if (nodeList[i].id == d.target) {
            x += yScale(nodeList[i].x);
          }
        }
        return Math.round(x / 2);
      })
      .attr("y", function(d) {
        for (let i = 0; i < nodeList.length; i++) {
          let y = 0;
          for (let i = 0; i < nodeList.length; i++) {
            if (nodeList[i].id == d.source) {
              y += yScale(nodeList[i].y);
            }
          }
          for (let i = 0; i < nodeList.length; i++) {
            if (nodeList[i].id == d.target) {
              y += yScale(nodeList[i].y);
            }
          }
          return Math.round(y / 2);
        }
      })
      .style("font-size", "12px")
      .classed("text", true)
      .text(d => d.weight);

    svg
      .selectAll("circle")
      .data(nodeList)
      .enter()
      .append("circle")
      .attr("cx", function(d) {
        return (d.x);
      })
      .attr("cy", function(d) {
        return (d.y);
      })
      .attr("r", radius)
      .attr("fill", "white")
      .attr("stroke", "black")
      .on("click", () => {});
  }

  render() {
    return <path className="canvas" />;
  }
}

function mapStateToProps(state) {
  return {};
}

export default withRouter(connect(mapStateToProps, {})(Graph));
