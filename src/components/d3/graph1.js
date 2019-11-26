
import * as d3 from "d3";

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


export function removeAll(){
    d3.select("svg").remove();
  }


export function drawGraph(data) {
    const nodeList =data.nodes;

    const edgeList = data.edges;
    var id = nodeList.length + 1;

    const svg = d3
      .select(".canvas")
      .append("svg")
      .attr("width", w)
      .attr("height", h)
      .on("click", () => {
        var x = document.querySelector(".canvas").getBoundingClientRect().left;
        var y = document.querySelector(".canvas").getBoundingClientRect().top;
        nodeList.push({
          id: id,
          x: Math.round(xScale(d3.event.x-x-10)),
          y: Math.round(yScale(d3.event.y-y))
        });
        removeAll();
        drawGraph(data);
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
        return d.tree == true? d3.rgb("#84C262") : d.highlight == true ? d3.rgb("#B22222") : d3.rgb("#94979D");
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
      .attr("id",  function(d) {
        return (d.id);
      })
      .attr("cx", function(d) {
        return (d.x);
      })
      .attr("cy", function(d) {
        return (d.y);
      })
      .attr("r", radius)
      .attr("fill", "white")
      .attr("stroke", "black")
      .on("click", () =>{})
      .call(d3.drag()
                .on("start", dragstarted)
                .on("drag", dragged)
                .on("end",(d) =>{dragended(d, edgeList)} )
                );

  }

  var line;

  function dragstarted(d) {
    d3.select(this).raise().classed("active", true);
    line = d3.select('svg').append("line")
    .style('stroke', 'black')
          .attr("x1", d.x)
          .attr("y1", d.y)

}

function dragged(d) {
  var x = document.querySelector(".canvas").getBoundingClientRect().left;     
  var y = document.querySelector(".canvas").getBoundingClientRect().top;

  
  line.attr('x2', Math.round(xScale(d3.event.x)))
      .attr('y2', Math.round(yScale(d3.event.y)));
    // d3.select(this).attr("cx", d.x = d3.event.x).attr("cy", d.y = d3.event.y);
}

function dragended(d, edges) {
    var x = document.querySelector(".canvas").getBoundingClientRect().left;     
    var y = document.querySelector(".canvas").getBoundingClientRect().top;
  
    // edges.push({
    //   source:, target:2, weight:4,highlight:false, tree:false,
    // })

    // d3.select("svg").append('line')
    //    .style('stroke', 'black')
    //    .attr('x1', d.x)
    //    .attr('y1', d.y)
    //    .attr('x2', Math.round(xScale(d3.event.x)))
    //    .attr('y2', Math.round(yScale(d3.event.y)));
    d3.select(this).classed("active", false);
}

let selected = false;
let nodeToDeleteIndex = -1;
let nodeToDelete = null;

//When node is selected, fill with colour green, no more than 2 nodes can be selected
function handleSelectNode(node, nodeList){
  if(!selected){
     selected = true;

    console.log("circle#" + node)
    //  d3.select("circle#" + node)
    //     .attr("stroke", "#84C262");
      nodeToDeleteIndex = nodeList.indexOf(node);
      nodeToDelete = this;
  }else{
    selected = false;
    d3.selectAll("circle")
       .attr("stroke", "black");
    nodeToDelete = null;
    nodeToDeleteIndex = -1;
  }
};

//Delete the selected node;
function handleDelete(){
  if(nodeToDeleteIndex != -1){
    nodeList.splice(nodeToDeleteIndex,1);
    for(let i =0;i<edgeList.length;i++){
      if(edgeList[i].source == nodeList[nodeToDeleteIndex].id){
        edgeList.splice(i,1);
      }
      if(edgeList[i].destination == nodeList[nodeToDeleteIndex].id){
        edgeList.splice(i,1);
      }
    }
    svg.selectAll('circle').remove()
    svg.selectAll('text').remove()
    svg.selectAll('line').remove()
    updateGraph();
  }
  else{
    alert("You must select a node to delete")
  }
}


//  /* Drag has started
//   * @return null
//   */
//  function dragStarted(d) {
//  }


//     /**
//      * Element is dragged
//      * @return null
//      */
//     function dragged(d) {
     
//       // Follow the mouse with
//       // the chosen circle
//       console.log(d)
//     }

//   function dragEnded(d) {
//     // Append line that tracks
//     // the dragging movement

//     
//   }
