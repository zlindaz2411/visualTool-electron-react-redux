import {
  esauWilliams,
  getConnectedVertex,
  updateGateValue,
  getGatesValues,
  unionSet,
  findCheapest
} from "../../src/functions/cmstAlgorithms";
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

describe("esau williams algorithm computes a suboptimal constrained minimum spanning tree given a graph", function() {
  const result = [
    { source: "G", target: "F", weight: 8 },
    { source: "D", target: "F", weight: 5 },
    { source: "B", target: "E", weight: 6 },
    { source: "A", target: "B", weight: 5 },
    { source: "A", target: "C", weight: 6 },
    { source: "A", target: "D", weight: 9 }
  ];
  it("should return  a suboptimal constrained minimum spanning tree given a graph", function() {
    assert.deepEqual(result, esauWilliams(graph, 3));
  });

  it("should return an error message when the input is invalid", function() {
    assert.equal(ErrMessage.CMST_NOT_FOUND, esauWilliams(errorInput, 3));
  });
});

describe("Union of two sets", function() {
  const result = new Set([1, 2, 3, 4, 5]);
  const set1 = new Set([1, 2, 3]);
  const set2 = new Set([2, 3, 4, 5]);
  it("should return the union of two sets (no duplicate elements", function() {
    assert.deepEqual(result, unionSet(set1, set2));
  });
});

describe("Get the other endpoint of an edge given source/target", function() {
  const result = "B";
  const edge = { source: "A", target: "B", weight: 5 };
  it("should the other endpoint of an edge given source/target", function() {
    assert.deepEqual(result, getConnectedVertex(edge.source, edge));
  });
});

describe("Find the cheapest connected edge given id", function() {
  const result = [{ source: "A", target: "B", weight: 5 }, "B"];
  const edges = [
    { source: "A", target: "B", weight: 5 },
    { source: "A", target: "C", weight: 8 }
  ];
  it("should the cheapest adjacent node, together with the other endpoint", function() {
    assert.deepEqual(result, findCheapest(edges[0].source, edges));
  });
});

describe("Set up Gate values", function() {
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
  graph.addEdge({ source: "A", target: "B", weight: 5 });
  graph.addEdge({ source: "A", target: "C", weight: 6 });
  graph.addEdge({ source: "A", target: "D", weight: 9 });
  graph.addEdge({ source: "A", target: "E", weight: 10 });
  graph.addEdge({ source: "B", target: "C", weight: 9 });
  graph.addEdge({ source: "B", target: "D", weight: 6 });
  graph.addEdge({ source: "B", target: "E", weight: 6 });
  graph.addEdge({ source: "C", target: "D", weight: 7 });
  graph.addEdge({ source: "C", target: "E", weight: 9 });
  graph.addEdge({ source: "D", target: "E", weight: 10 });

  const rootAdjacents = graph.getAdjacentsOfNode('A')
  const result = new Map();
  result.set("B", 5)
  result.set("C", 6)
  result.set("D", 9)
  result.set("E", 10)

  it("Set up the inital gate values", function() {
    assert.deepEqual(result, getGatesValues(rootAdjacents, graph.root.id));
  });
});


describe("Update Gate values", function() {
  const result = new Map();
  result.set("B", 5)
  result.set("C", 6)
  result.set("D", 9)
  result.set("E", 10)

  const component = new Set(["B","C"])

  const after = new Map();
  after.set("B", 5)
  after.set("C", 5)
  after.set("D", 9)
  after.set("E", 10)

  updateGateValue(component, result)
  it("should return the correct result after updateing gate values", function() {
    assert.deepEqual(result, after);
  });
});
