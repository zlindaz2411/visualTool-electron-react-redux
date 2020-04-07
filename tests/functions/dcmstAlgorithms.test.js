import {
  kruskalConstrained,
  checkNoPath,
  getOtherEndPoint,
  simulatedAnnealing
} from "../../src/functions/dcmstAlgorithms";
import { ErrMessage } from "../../src/constants/errorMessage";
import { Graph } from "../../src/functions/lib/graph";
const assert = require("assert");

/**
 * valid Input graph
 */
let graph = new Graph();
graph.root = { id: "A" };
graph.addNode({ id: "A" });
graph.addNode({ id: "B" });
graph.addNode({ id: "C" });
graph.addNode({ id: "D" });
graph.addNode({ id: "E" });
graph.addNode({ id: "F" });
graph.addNode({ id: "G" });
graph.addEdge({ source: "A", target: "B", weight: 5 });
graph.addEdge({ source: "A", target: "C", weight: 6 });
graph.addEdge({ source: "A", target: "D", weight: 9 });
graph.addEdge({ source: "A", target: "E", weight: 10 });
graph.addEdge({ source: "A", target: "F", weight: 11 });
graph.addEdge({ source: "A", target: "G", weight: 15 });
graph.addEdge({ source: "B", target: "C", weight: 9 });
graph.addEdge({ source: "B", target: "D", weight: 6 });
graph.addEdge({ source: "B", target: "E", weight: 6 });
graph.addEdge({ source: "B", target: "F", weight: 8 });
graph.addEdge({ source: "B", target: "G", weight: 17 });
graph.addEdge({ source: "C", target: "D", weight: 7 });
graph.addEdge({ source: "C", target: "E", weight: 9 });
graph.addEdge({ source: "C", target: "F", weight: 8 });
graph.addEdge({ source: "C", target: "G", weight: 12 });
graph.addEdge({ source: "D", target: "E", weight: 10 });
graph.addEdge({ source: "D", target: "F", weight: 5 });
graph.addEdge({ source: "D", target: "G", weight: 11 });
graph.addEdge({ source: "E", target: "F", weight: 14 });
graph.addEdge({ source: "E", target: "G", weight: 9 });
graph.addEdge({ source: "G", target: "F", weight: 8 });

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

describe("kruskal constrained algorithm computes an appoximate solution to degree constrained minimum spanning problem", function() {
  const result = [
    { source: "A", target: "B", weight: 5 },
    { source: "D", target: "F", weight: 5 },
    { source: "A", target: "C", weight: 6 },
    { source: "B", target: "D", weight: 6 },
    { source: "G", target: "F", weight: 8 },
    { source: "C", target: "E", weight: 9 }
  ];
  it("should return a suboptimal degree constrained minimum spanning tree given a graph", function() {
    assert.deepEqual(result, kruskalConstrained(graph, 2));
  });

  it("should return an error message when the input is invalid", function() {
    assert.equal(ErrMessage.DCMST_NOT_FOUND, kruskalConstrained(errorInput, 3));
  });
});

describe("simulated annealing algorithm computes an appoximate solution to degree constrained minimum spanning problem", function() {
  it("should return an error message when the input is invalid", function() {
    assert.equal(ErrMessage.DCMST_NOT_FOUND, simulatedAnnealing(errorInput, 3));
  });
});

describe("Check if there is a more than one path reachable from node u to v", function() {
  it("should return false when there is more than one path reachable from A to C", function() {
    assert.deepEqual(false, checkNoPath("A", "C", graph));
  });

  let input = new Graph();
  input.addNode({ id: 1, x: 20, y: 200 });
  input.addNode({ id: 2, x: 80, y: 100 });
  input.addNode({ id: 3, x: 200, y: 100 });
  input.addEdge({ source: 1, target: 2, weight: 4, highlight: false });
  input.addEdge({ source: 2, target: 3, weight: 8, highlight: false });
  it("should return true when there is no more than one path reachable from 1 to 3", function() {
    assert.deepEqual(true, checkNoPath(1, 3, input));
  });
});

describe("Given one node of the edge return other endpoint ", function() {
  it("should return the other endpoint", function() {
    assert.deepEqual(
      "B",
      getOtherEndPoint({ source: "A", target: "B", weight: 5 }, "A")
    );
  });
});
