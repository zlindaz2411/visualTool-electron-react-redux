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
graph.root = { id: 1, x: 20, y: 200 }
graph.addNode({ id: 1, x: 20, y: 200 });
graph.addNode({ id: 2, x: 80, y: 100 });
graph.addNode({ id: 3, x: 200, y: 100 });
graph.addNode({ id: 4, x: 320, y: 100 });
graph.addNode({ id: 5, x: 380, y: 200 });
graph.addNode({ id: 6, x: 320, y: 300 });
graph.addNode({ id: 7, x: 200, y: 300 });
graph.addNode({ id: 8, x: 80, y: 300 });
graph.addNode({ id: 9, x: 150, y: 200 });
graph.addEdge({ source: 1, target: 2, weight: 4, highlight: false });
graph.addEdge({ source: 2, target: 3, weight: 8, highlight: false });
graph.addEdge({ source: 3, target: 4, weight: 7, highlight: false });
graph.addEdge({ source: 4, target: 5, weight: 9, highlight: false });
graph.addEdge({ source: 5, target: 6, weight: 10, highlight: false });
graph.addEdge({ source: 6, target: 3, weight: 14, highlight: false });
graph.addEdge({ source: 6, target: 7, weight: 2, highlight: false });
graph.addEdge({ source: 4, target: 6, weight: 1, highlight: false });
graph.addEdge({ source: 7, target: 8, weight: 7, highlight: false });
graph.addEdge({ source: 7, target: 9, weight: 6, highlight: false });
graph.addEdge({ source: 8, target: 9, weight: 7, highlight: false });
graph.addEdge({ source: 8, target: 1, weight: 8, highlight: false });
graph.addEdge({ source: 2, target: 8, weight: 11, highlight: false });
graph.addEdge({ source: 9, target: 3, weight: 2, highlight: false });

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
    // const result = new Set([
    //   { source: 4, target: 6, weight: 1, highlight: false },
    //   { source: 6, target: 7, weight: 2, highlight: false },
    //   { source: 9, target: 3, weight: 2, highlight: false },
    //   { source: 1, target: 2, weight: 4, highlight: false },
    //   { source: 7, target: 9, weight: 6, highlight: false },
    //   { source: 7, target: 8, weight: 7, highlight: false },
    //   { source: 2, target: 3, weight: 8, highlight: false },
    //   { source: 4, target: 5, weight: 9, highlight: false }
    // ]);
    // it("should return  a suboptimal constrained minimum spanning tree given a graph", function() {
    //   assert.deepEqual(result, esauWilliams(3, graph));
    // });

    it("should return an error message when it's impossible to find a suboptimal constrained minimum spanning tree given a graph because of low constraint", function() {
        assert.equal(ErrMessage.CMST_NOT_FOUND, esauWilliams(2, graph));
      });
  
    it("should return an error message when the input is invalid", function() {
      assert.equal(ErrMessage.CMST_NOT_FOUND, esauWilliams(3, errorInput));
    });
  });