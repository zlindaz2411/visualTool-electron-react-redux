import {
    esauWilliams
  } from "../../src/functions/cmstAlgorithms";
  import { ErrMessage } from "../../src/constants/errorMessage";
  import { Graph } from "../../src/functions/lib/graph";
  const assert = require("assert");

  /**
 * valid Input graph
 */
let graph = new Graph();
graph.root ={id: "A"};
graph.addNode({id:"A"})
graph.addNode({id:"B"})
graph.addNode({id:"C"})
graph.addNode({id:"D"})
graph.addNode({id:"E"})
graph.addNode({id:"F"})
graph.addNode({id:"G"})
graph.addEdge({source: "A", target:"B", weight:5})
graph.addEdge({source: "A", target:"C", weight:6})
graph.addEdge({source: "A", target:"D", weight:9})
graph.addEdge({source: "A", target:"E", weight:10})
graph.addEdge({source: "A", target:"F", weight:11})
graph.addEdge({source: "A", target:"G", weight:15})
graph.addEdge({source: "B", target:"C", weight:9})
graph.addEdge({source: "B", target:"D", weight:6})
graph.addEdge({source: "B", target:"E", weight:6})
graph.addEdge({source: "B", target:"F", weight:8})
graph.addEdge({source: "B", target:"G", weight:17})
graph.addEdge({source: "C", target:"D", weight:7})
graph.addEdge({source: "C", target:"E", weight:9})
graph.addEdge({source: "C", target:"F", weight:8})
graph.addEdge({source: "C", target:"G", weight:12})
graph.addEdge({source: "D", target:"E", weight:10})
graph.addEdge({source: "D", target:"F", weight:5})
graph.addEdge({source: "D", target:"G", weight:11})
graph.addEdge({source: "E", target:"F", weight:14})
graph.addEdge({source: "E", target:"G", weight:9})
graph.addEdge({source: "G", target:"F", weight:8})


/**
 * Error graph, with isolated vertex
 */
let errorInput = new Graph();
errorInput.root = { id: 1, x: 20, y: 200 }
errorInput.addNode({ id: 1, x: 20, y: 200 });
errorInput.addNode({ id: 2, x: 80, y: 100 });
errorInput.addNode({ id: 3, x: 200, y: 100 });
errorInput.addNode({ id: 4, x: 320, y: 100 });
errorInput.addEdge({ source: 1, target: 2, weight: 4, highlight: false });
errorInput.addEdge({ source: 2, target: 3, weight: 8, highlight: false });
errorInput.addEdge({ source: 3, target: 1, weight: 7, highlight: false });

describe("esau williams algorithm computes a suboptimal constrained minimum spanning tree given a graph", function() {
    const result = new Set([
        { source: 'G', target: 'F', weight: 8 },
        { source: 'D', target: 'F', weight: 5 },
        { source: 'B', target: 'E', weight: 6 },
        { source: 'A', target: 'C', weight: 6 },
        { source: 'A', target: 'B', weight: 5 },
        { source: 'A', target: 'D', weight: 9 }
    ]);
    it("should return  a suboptimal constrained minimum spanning tree given a graph", function() {
      assert.deepEqual(result, esauWilliams(3, graph));
    });

    it("should return an error message when it's impossible to find a suboptimal constrained minimum spanning tree given a graph because of low constraint", function() {
        assert.equal(ErrMessage.CMST_NOT_FOUND, esauWilliams(2, graph));
      });
  
    it("should return an error message when the input is invalid", function() {
      assert.equal(ErrMessage.CMST_NOT_FOUND, esauWilliams(3, errorInput));
    });
  });