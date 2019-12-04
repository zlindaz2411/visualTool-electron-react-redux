import * as d3 from "d3";
import { confirmAlert } from "react-confirm-alert";
let contextMenuFactory = require('d3-context-menu')


const radius = 10;
const margin = 15;

let w = 0;
let h = 0;
let xScale = 0;
let yScale = 0;

export function setWidthHeight(nodes, draw) {
  w = document.querySelector(".canvas").getBoundingClientRect().width;
  h = document.querySelector(".canvas").getBoundingClientRect().height;

  setScales(nodes, draw);

}

/**
 * Scale graph
 */
function setScales(nodes, draw) {
  if(draw){
    xScale = d3
      .scaleLinear()
      .domain([0, w])
      .range([0, w]); // Set margins for x specific
    yScale = d3
      .scaleLinear()
      .domain([0, h])
      .range([0, h]);
  }
  else{
    nodes = nodes.sort((a,b) => {return b.x - a.x})
    xScale = d3
      .scaleLinear()
      .domain([0, nodes[0].x])
      .range([margin, w-margin]); // Set margins for x specific
    nodes = nodes.sort((a,b) => {return b.y - a.y})
    yScale = d3
      .scaleLinear()
      .domain([0, nodes[0].y + nodes[0].y/2])
      .range([margin, h-margin]);
  }
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
    .attr("id", function(d) {
      return "edge" + d.source + d.target;
    })
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
    .style("stroke-width", "3px")
    .style("cursor", "pointer")
    .style("stroke", function(d) {
      return d.tree == true
        ? d3.rgb("#84C262")
        : d.highlight == true
        ? d3.rgb("#B22222")
        : d3.rgb("#94979D");
    })
    .on("contextmenu", function(d){
      if(draw) handleSelectEdge(d)
    } );

    let weightX =  0;
    let weightY = 0;
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
      weightX = Math.round(x / 2);
      return weightX;
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
        weightY = Math.round(y / 2);
        return weightY;
      }
    })
    .style("font-size", "14px")
    .style("font-family", "Lato")
    .style("cursor", "pointer")
    .style("fill", d3.rgb("#50525E"))
    .attr("class", "weight")
    .text(d => d.weight)
    .on("click", function(d) {
      if(draw){
      d.weight = 10;
      svg
          .append("foreignObject")
          .attr("x", weightX)
          .attr("y", weightY)
          .attr("width", 140)
          .attr("height", 20)
          .html('<input type="text" value="Text goes here" />')
          removeAll();
          drawGraph(data, draw);
      }
    })

    var menu = [
      {
          title: 'Header',
      },
      {
          title: 'Normal item',
          action: function() {}
      },
      {
          divider: true
      },
      {
          title: 'Last item',
          action: function() {}
      }
  ];
  

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
    .attr("fill", "white")
    .attr("stroke", function(d){
      return d.highlight == true ? d3.rgb("#B22222") : d3.rgb("#94979D")
    })
    .style("stroke-width", "3px")
    .style("cursor", "pointer") 
    .on("contextmenu", function(d){
      if(draw) handleSelectNode(d)
    })
    // .on("click", function(d){
    //   if(draw) handleSelectNode(d)
    // })
    .call(
      d3
        .drag()
        .clickDistance(10)
        .on("start", function(d){
          if(draw)  dragStarted(d)
        })
        .on("drag", function(d) {
          if(draw) dragged(d, nodeList);
        })
        .on("end", function(d) {
          if(draw) dragEnded(d, data, draw);
        })
    )

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
  selectedCircle = d3.select("#circle" +d.id);


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
    .style("stroke-width", "3px");
  
}

/**
 * While dragging the line, update the end of the line to be the mouse position
 * @param {*} d
 */
function dragged(d, nodes) {
  let coords = [Math.round(xScale(d3.event.x)), Math.round(yScale(d3.event.y))];
  line.attr("x2", coords[0]).attr("y2", coords[1]);
  selectedCircle.attr("stroke", d3.rgb("#84C262")); 
  for (let i = 0; i < nodes.length; i++) {
    selectedCircle.attr("stroke", d3.rgb("#84C262")); 
    let circle = d3.select("#circle" + nodes[i].id);
    if (
      coords[0] >= nodes[i].x - radius &&
      coords[0] <= nodes[i].x + radius &&
      coords[1] >= nodes[i].y - radius &&
      coords[1] <= nodes[i].y + radius
    ) {
      selectedCircle.attr("stroke", d3.rgb("#84C262")); 
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
        (data.edges[i].source == newEdge.source &&
          data.edges[i].target == newEdge.target) ||
        (data.edges[i].source == newEdge.target &&
          data.edges[i].target == newEdge.source)
      ) {
        exists = true;
      }
    }
    if (!exists) data.edges.push(newEdge);
  }
  selectedNode = null;
  selectedCircle = null;
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
    )/10
  );
}

let selected = false;
let nodeToDelete = null;
let edgeToDelete = null;

/**
 * When node is selected, fill with colour green, no more than 2 nodes can be selected
 * @param {*} node
 * @param {*} nodeList
 */
function handleSelectNode(node) {
  if (d3.event.defaultPrevented === false) {
  if (!edgeToDelete) {
    if (!selected) {
      selected = true;
      d3.select("#circle" + node.id).attr("stroke", "#84C262");
      nodeToDelete = node;
    } else {
      selected = false;
      d3.selectAll("circle").attr("stroke", d3.rgb("#94979D"));
      nodeToDelete = null;
    }
  } else {
    confirmAlert({
      title: `Warning!`,
      message: `You already selected an edge`,
      buttons: [
        {
          label: "Cancel"
        }
      ]
    });
  }
}
}

/**
 * When edge is selected, fill with colour green, no more than 2 edges can be selected
 * @param {*} edge
 * @param {*} edgeList
 */
function handleSelectEdge(edge) {
  d3.event.preventDefault();

  if (!nodeToDelete) {
    if (!selected) {
      selected = true;
      d3.select("#edge" + edge.source + edge.target).style("stroke", "#84C262");
      edgeToDelete = edge;
    } else {
      selected = false;
      d3.selectAll("line").style("stroke", d3.rgb("#94979D"));
      edgeToDelete = null;
    }
  } else {
    confirmAlert({
      title: `Warning!`,
      message: `You already selected a vertex`,
      buttons: [
        {
          label: "Cancel"
        }
      ]
    });
  }
}

/**
 * Delete the selected node or selected edge;
 * Cascade action for node: delete all the connected edges.
 * @param {*} data
 */
export function handleDelete(data) {
  if (nodeToDelete) {
    data.nodes.splice(data.nodes.indexOf(nodeToDelete), 1);
    for (let i = 0; i < data.edges.length; i++) {
      if (data.edges[i].source == nodeToDelete.id) {
        data.edges.splice(i, 1);
        i--;
      }
      if (data.edges[i].target == nodeToDelete.id) {
        data.edges.splice(i, 1);
        i--;
      }
    }
    selected = false;
    nodeToDelete = null;
    removeAll();
    drawGraph(data, true);
  } 
  else if(edgeToDelete){
    data.edges.splice(data.edges.indexOf(edgeToDelete), 1);
    selected = false;
    edgeToDelete = null;
    removeAll();
    drawGraph(data, true);
  }
  else {
    confirmAlert({
      title: `Warning!`,
      message: `You must select at least one element`,
      buttons: [
        {
          label: "Cancel"
        }
      ]
    });
  }
}
