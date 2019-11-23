import React, { Component, Fragment } from 'react';
import * as d3 from 'd3';



export class Vertex extends React.Component {


    componentDidMount() {
    this.drawGraph();
    }

    drawVertex(){
            this.svg
            .selectAll("circle")
            .data(this.props.nodeList)
            .enter()
            .append("circle")
            .attr("cx", function(d) {
                return this.props.xScale(d.x);
            })
            .attr("cy", function(d) {
            return this.props.yScale(d.y);
            })
            .attr("r", this.props.radius)
            .attr("fill", "white")
            .attr("stroke", "black")
            .on("click", ()=>{this.props.handleNodeClick})
    }

    render(){
    return(
        <svg ref={ svg => this.svg = svg } />
    )
    }

    
    }
