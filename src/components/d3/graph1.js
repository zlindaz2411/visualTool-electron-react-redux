import * as d3 from "d3";

const radius = 10;
const margin = 15;

let w = 0;
let h = 0;
let xScale = 0;
let yScale = 0;

export function setWidthHeight() {
  w = document.querySelector(".canvas").getBoundingClientRect().width;
  h = document.querySelector(".canvas").getBoundingClientRect().height;

  setScales();
}

/**
 * Scale graph
 */
function setScales() {
  xScale = d3
    .scaleLinear()
    .domain([0, w])
    .range([0, w]); // Set margins for x specific

  yScale = d3
    .scaleLinear()
    .domain([0, h])
    .range([0, h]);
}

/**
 * Remove all the elements
 */
export function removeAll() {
  d3.select("svg").remove();
}

/**
 * Draw the graph based on a given data
 * Draw nodes, edges, weights
 * @param {*} data
 * @param {*} draw
 */
export function drawGraph(data, draw) {
  const nodeList = data.nodes;

  const edgeList = data.edges;
  let id = nodeList.length + 1;

  const svg = d3
    .select(".canvas")
    .append("svg")
    .attr("width", w)
    .attr("height", h)
    .on("click", () => {
      if (draw) {
        let x = document.querySelector(".canvas").getBoundingClientRect().left;
        let y = document.querySelector(".canvas").getBoundingClientRect().top;
        nodeList.push({
          id: id,
          x: Math.round(xScale(d3.event.x - x)),
          y: Math.round(yScale(d3.event.y - y))
        });
        removeAll();
        drawGraph(data, draw);
      }
    });

  const rect = d3
    .select("svg")
    .append("rect")
    .attr("width", w)
    .attr("height", h)
    .style("fill", "none");

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
      return d.tree == true
        ? d3.rgb("#84C262")
        : d.highlight == true
        ? d3.rgb("#B22222")
        : d3.rgb("#94979D");
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
          x += xScale(nodeList[i].x);
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
        return Math.round(y/2);
      }
    })
    .style("font-size", "14px")
    .style("font-family", "Lato")
    .style("fill", d3.rgb("#50525E"))
    .attr("class", "weight")
    .text(d => d.weight)
    .on("click", function(d) {
      d.weight = 10;
      removeAll();
      drawGraph(data, draw);
    });

  svg
    .selectAll("circle")
    .data(nodeList)
    .enter()
    .append("circle")
    .attr("id", function(d) {
      return "circle" + d.id;
    })
    .attr("cx", function(d) {
      return xScale(d.x);
    })
    .attr("cy", function(d) {
      return yScale(d.y);
    })
    .attr("r", radius)
    .attr("fill", function(d) {
      return d.highlight == true ? d3.rgb("#B22222") : "white";
    })
    .attr("stroke", d3.rgb("#94979D"))
    .style("stroke-width", "2px")
    .on("click", () => {})
    .call(
      d3
        .drag()
        .on("start", dragStarted)
        .on("drag", function(d) {
          dragged(d, nodeList);
        })
        .on("end", function(d) {
          dragEnded(d, data, draw);
        })
    );
}

let line;
let destination;
let selectedCircle;
let selectedNode;
/**
 * Drag line start. Create a line and set the origin to the circle x and y.
 * @param {*} d
 */
function dragStarted(d) {
  selectedNode = d;
  selectedCircle = d3.select(this);
  selectedCircle.raise().classed("active", true);
  selectedCircle.attr("stroke", d3.rgb("#84C262"));
  line = d3
    .select("svg")
    .append("line")
    .attr("id", "toDrag")
    .style("stroke", d3.rgb("#94979D"))
    .attr("x1", d.x)
    .attr("y1", d.y)
    .attr("x2", d.x)
    .attr("y2", d.y)
    .style("stroke-width", "2px");
}

/**
 * While dragging the line, update the end of the line to be the mouse position
 * @param {*} d
 */
function dragged(d, nodes) {
  let x = document.querySelector(".canvas").getBoundingClientRect().left;
  let y = document.querySelector(".canvas").getBoundingClientRect().top;

  let coords = [Math.round(xScale(d3.event.x)), Math.round(yScale(d3.event.y))];
  line.attr("x2", coords[0]).attr("y2", coords[1]);

  for (let i = 0; i < nodes.length; i++) {
    selectedCircle.attr("stroke", d3.rgb("#84C262"));
    let circle = d3.select("#circle" + (i + 1));
    if (
      coords[0] >= nodes[i].x - radius &&
      coords[0] <= nodes[i].x + radius &&
      coords[1] >= nodes[i].y - radius &&
      coords[1] <= nodes[i].y + radius
    ) {
      circle.attr("stroke", d3.rgb("#84C262"));
      destination = nodes[i];
    } else {
      circle.attr("stroke", d3.rgb("#94979D"));
    }
  }
}

/**
 * When finished drag, set the circle class to be not active
 * Add a new edge to the list of edges with calculated weight
 * @param {*} d
 * @param {*} edges
 */
function dragEnded(d, data, draw) {
  if (destination == null || destination.id == selectedNode.id)
    d3.select("#toDrag").remove();
  else {
    const weight = calculateWeight(selectedNode, destination);
    const newEdge = {
      source: selectedNode.id,
      target: destination.id,
      weight: weight,
      highlight: false,
      tree: false
    };
    let exists = false;
    for (let i = 0; i < data.edges.length; i++) {
      if (
        ((data.edges[i].source == newEdge.source &&
          data.edges[i].target == newEdge.target)) ||(
        (data.edges[i].source == newEdge.target &&
          data.edges[i].target == newEdge.source)
          )
      ) {
        exists = true;
      }
    }
    if (!exists) data.edges.push(newEdge);
  }

  removeAll();
  drawGraph(data, draw);
}

/**
 * Pythagorean theorem to calculate weight
 * @param {*} source
 * @param {*} destination
 */
function calculateWeight(source, destination) {
  return Math.round(
    Math.sqrt(
      Math.pow(destination.y - source.y, 2) +
        Math.pow(destination.x - source.x, 2)
    )
  );
}

let selected = false;
let nodeToDeleteIndex = -1;
let nodeToDelete = null;

//When node is selected, fill with colour green, no more than 2 nodes can be selected
function handleSelectNode(node, nodeList) {
  if (!selected) {
    selected = true;

    console.log("circle#" + node);
    //  d3.select("circle#" + node)
    //     .attr("stroke", "#84C262");
    nodeToDeleteIndex = nodeList.indexOf(node);
    nodeToDelete = this;
  } else {
    selected = false;
    d3.selectAll("circle").attr("stroke", d3.rgb("#94979D"));
    nodeToDelete = null;
    nodeToDeleteIndex = -1;
  }
}

//Delete the selected node;
function handleDelete() {
  if (nodeToDeleteIndex != -1) {
    nodeList.splice(nodeToDeleteIndex, 1);
    for (let i = 0; i < edgeList.length; i++) {
      if (edgeList[i].source == nodeList[nodeToDeleteIndex].id) {
        edgeList.splice(i, 1);
      }
      if (edgeList[i].destination == nodeList[nodeToDeleteIndex].id) {
        edgeList.splice(i, 1);
      }
    }
    svg.selectAll("circle").remove();
    svg.selectAll("text").remove();
    svg.selectAll("line").remove();
    updateGraph();
  } else {
    alert("You must select a node to delete");
  }
}
