import { esauWilliams } from "../../src/functions/cmstStateAlgorithm";
import { ErrMessage } from "../../src/constants/errorMessage";
import { Graph } from "../../src/functions/lib/graph";
const assert = require("assert");

/**
 * valid Input graph
 */
let graph = new Graph();
graph.root = { id: "R" };
graph.addNode({ id: "A" });
graph.addNode({ id: "B" });
graph.addNode({ id: "C" });
graph.addNode({ id: "D" });
graph.addNode({ id: "R" });
graph.addEdge({ source: "A", target: "B", weight: 2 });
graph.addEdge({ source: "A", target: "C", weight: 10 });
graph.addEdge({ source: "A", target: "D", weight: 12 });
graph.addEdge({ source: "A", target: "R", weight: 5 });
graph.addEdge({ source: "B", target: "C", weight: 3 });
graph.addEdge({ source: "B", target: "D", weight: 15 });
graph.addEdge({ source: "B", target: "R", weight: 8 });
graph.addEdge({ source: "C", target: "D", weight: 4 });
graph.addEdge({ source: "C", target: "R", weight: 6 });
graph.addEdge({ source: "D", target: "R", weight: 10 });

/**
 * Error graph, with isolated vertex
 */
let errorInput = new Graph();
errorInput.root = { id: 1, x: 20, y: 200 };
errorInput.addNode({ id: 1, x: 20, y: 200 });
errorInput.addNode({ id: 2, x: 80, y: 100 });
errorInput.addNode({ id: 3, x: 200, y: 100 });
errorInput.addNode({ id: 4, x: 320, y: 100 });
errorInput.addEdge({ source: 1, target: 2, weight: 4, highlight: false });
errorInput.addEdge({ source: 2, target: 3, weight: 8, highlight: false });
errorInput.addEdge({ source: 3, target: 1, weight: 7, highlight: false });

describe("computation of the states of visualization of the algorithm", function() {
  it("should return the length of the states of esau williams algorithm", function() {
    assert.deepEqual(92, esauWilliams(graph, 3).length);
  });
  const step16 = {
    highlighted: [{ source: "A", target: "B", weight: 2 }],
    tree: [],
    highlightedNodes: ["A"],
    status: 7
  };
  const step30 = {
    highlighted: [],
    tree: [{ source: "A", target: "B", weight: 2 }],
    highlightedNodes: ["D"],
    status: 3
  };
  const step50 = {
    highlighted: [],
    tree: [
      { source: "A", target: "B", weight: 2 },
      { source: "C", target: "D", weight: 4 }
    ],
    highlightedNodes: ["D", "R"],
    status: 5
  };

  const lastStep = {
    highlighted: [],
    tree: [
      { source: "A", target: "B", weight: 2 },
      { source: "C", target: "D", weight: 4 },
      { source: "A", target: "R", weight: 5 },
      { source: "C", target: "R", weight: 6 }
    ],
    highlightedNodes: [],
    status: 11
  };
  it("should return  a the same result of the state when given an index", function() {
    assert.deepEqual(step16, esauWilliams(graph, 3)[16]);
    assert.deepEqual(step30, esauWilliams(graph, 3)[30]);
    assert.deepEqual(step50, esauWilliams(graph, 3)[50]);
    assert.deepEqual(lastStep, esauWilliams(graph, 3)[91]);
  });

  it("should return an error message when the input is invalid", function() {
    assert.equal(ErrMessage.CMST_NOT_FOUND, esauWilliams(errorInput, 3));
  });
});
