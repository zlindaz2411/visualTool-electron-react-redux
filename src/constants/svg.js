import * as d3 from 'd3';

export const config ={
    w : 580,
    h : 350,
    margin : { top: 0, right: 20, bottom: 20, left: 40 },
    radius : 10,
}

  export const xScale = d3
  .scaleLinear()
  .domain([0, config.w])
  .range([config.margin.left, config.w - config.margin.right]); // Set margins for x specific

  export const yScale = d3
  .scaleLinear()
  .domain([0, config.w])
  .range([config.margin.top, config.h - config.margin.bottom]);

  export const svg = d3
  .select(".canvas")
  .append("svg")
  .attr("width", config.w)
  .attr("height", config.h)
  .on("click", () => {
    alert("aha");
  });

  export const rect = d3
  .select("svg")
  .append("rect")
  .attr("width", config.w)
  .attr("height", config.h)
  //   .style("stroke", "#505050")
  .style("fill", "none");
//   .style("stroke-width", 1);
