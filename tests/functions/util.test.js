import {
  getWeight,
  getEdge,
  isConnected,
  two_opt
} from "../../src/functions/util";
import { Graph } from "../../src/functions/lib/graph";
const assert = require("assert");

let input = new Graph();
input.addNode({ id: "A" });
input.addNode({ id: "B" });
input.addNode({ id: "C" });
input.addNode({ id: "D" });
input.addEdge({ source: "B", target: "A", weight: 10 });
input.addEdge({ source: "C", target: "A", weight: 2 });
input.addEdge({ source: "A", target: "D", weight: 9 });
input.addEdge({ source: "B", target: "C", weight: 9 });
input.addEdge({ source: "B", target: "D", weight: 2 });
input.addEdge({ source: "C", target: "D", weight: 7 });

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

describe("Two-opt edge exchange", function() {
  let mst = [
    { source: "A", target: "B", weight: 10 },
    { source: "A", target: "D", weight: 9 },
    { source: "B", target: "C", weight: 9 },
    { source: "C", target: "D", weight: 7 }
  ];
  let after = [
    { source: "A", target: "D", weight: 9 },
    { source: "B", target: "C", weight: 9 },
    { source: "C", target: "A", weight: 2 },
    { source: "B", target: "D", weight: 2 }
  ];
  two_opt(mst, input);
  it("mst should be optimized after 2-opt operation", function() {
    assert.deepEqual(mst, after);
  });
});

describe("Find the edge in the edge list given only source and target", function() {
  it("should return the edge in the edge list", function() {
    assert.deepEqual(
      { source: "B", target: "A", weight: 10 },
      getEdge(input.edges, "A", "B")
    );
  });
  it("should return null if there isn't", function() {
    assert.deepEqual(null, getEdge(errorInput.edges, 1, 4));
  });
});

describe("Get the weight of the computed graph", function() {
  let mst = [
    { source: "A", target: "B", weight: 10 },
    { source: "A", target: "D", weight: 9 },
    { source: "B", target: "C", weight: 9 },
    { source: "C", target: "D", weight: 7 }
  ];
  it("should return the weight of the computed graph", function() {
    assert.deepEqual(35, getWeight(mst));
  });
});

describe("Check if the graph is connected", function() {
  it("should return true when the graph is connected", function() {
    assert.deepEqual(true, isConnected(input.nodes, input.edges));
  });

  it("should return false when the graph is not connected", function() {
    assert.deepEqual(false, isConnected(errorInput.nodes, errorInput.edges));
  });
});
