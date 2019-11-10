import React, { Component, Fragment } from 'react';
import * as d3 from 'd3';

const w = 580,
h = 350,
margin = { top: 0, right: 20, bottom: 20, left: 40 },
radius = 10;


  const xScale = d3
  .scaleLinear()
  .domain([
    0,
    w,
  ])
  .range([margin.left, w - margin.right]); // Set margins for x specific

const yScale = d3
  .scaleLinear()
  .domain([
    0,
    w
  ])
  .range([margin.top, h - margin.bottom]);


export default class Graph extends React.Component {


    componentDidMount() {
    this.drawGraph();
    }






drawGraph(){

    const nodeList = this.props.data.nodes
  
    const edgeList =this.props.data.edges
    var id = nodeList.length + 1;
  const svg = d3
  .select(".canvas")
  .append("svg")
  .attr("width", w)
  .attr("height", h)
  .on('click', ()=>{alert("aha")})

  const rect = d3
  .select("svg")
  .append("rect")
  .attr("width", w)
  .attr("height", h)
//   .style("stroke", "#505050")
  .style("fill", "none")
//   .style("stroke-width", 1);

 
  
  svg.selectAll("line")
  .data(edgeList)
  .enter()
  .append("line")
  .attr("x1", function(d) {
    for(let i =0;i<nodeList.length;i++){   
      if(nodeList[i].id == d.source){
          return xScale(nodeList[i].x)
      }
    }
  })
  .attr("y1", function(d) {
    for(let i =0;i<nodeList.length;i++){
      if(nodeList[i].id == d.source){
          return yScale(nodeList[i].y)
      }
    }
  })
  .attr("x2", function(d){
    for(let i =0;i<nodeList.length;i++){
      if(nodeList[i].id == d.target){
          return xScale(nodeList[i].x)
      }
    }
  })
  .attr("y2",  function(d){
    for(let i =0;i<nodeList.length;i++){
      if(nodeList[i].id == d.target){
          return yScale(nodeList[i].y)
      }
    }
  })
  .style("stroke-width", "2px")
  .style("stroke", function(d) {
    return d.highlight == true ? d3.rgb("#84C262"):d3.rgb("#94979D")
  }
  );

  svg.selectAll("text.weight")
  .data(edgeList)
  .enter()
  .append("text")
  .attr("x", function(d) {
    let x = 0;
    for(let i =0;i<nodeList.length;i++){   
      if(nodeList[i].id == d.source){
          x += xScale(nodeList[i].x)
      }
    }
    for(let i =0;i<nodeList.length;i++){   
      if(nodeList[i].id == d.target){
          x+= xScale(nodeList[i].x)
      }
    }
    return Math.round(x/2);
  })
  .attr("y", function(d) {
    for(let i =0;i<nodeList.length;i++){
      let y = 0;
    for(let i =0;i<nodeList.length;i++){   
      if(nodeList[i].id == d.source){
          y += yScale(nodeList[i].y)
      }
    }
    for(let i =0;i<nodeList.length;i++){   
      if(nodeList[i].id == d.target){
          y+= yScale(nodeList[i].y)
      }
    }
    return  Math.round(y/2);
    }
  })
  .style("font-size", "12px")
  .classed("text", true)
  .text(d => d.weight)

  svg
  .selectAll("circle")
  .data(nodeList)
  .enter()
  .append("circle")
  .attr("cx", function(d) {
    return xScale(d.x);
  })
  .attr("cy", function(d) {
    return yScale(d.y);
  })
  .attr("r", radius)
  .attr("fill", "white")
  .attr("stroke", "black")
  .on("click", ()=>{})
}

    

    render(){
    return(
        <path
      className="canvas"
    />
    )
    }
    
    }
