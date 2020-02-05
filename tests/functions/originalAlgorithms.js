import {
  kruskals,
  prims,
  boruvkas,
  parallel
} from "../../src/functions/originalAlgorithms";
import { ErrMessage } from "../../src/constants/errorMessage";
import { Graph } from "../../src/functions/lib/graph";
const assert = require("assert");

/**
 * valid Input graph
 */
let graph = new Graph();
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
errorInput.addNode({ id: 1, x: 20, y: 200 });
errorInput.addNode({ id: 2, x: 80, y: 100 });
errorInput.addNode({ id: 3, x: 200, y: 100 });
errorInput.addNode({ id: 4, x: 320, y: 100 });
errorInput.addEdge({ source: 1, target: 2, weight: 4, highlight: false });
errorInput.addEdge({ source: 2, target: 3, weight: 8, highlight: false });
errorInput.addEdge({ source: 3, target: 1, weight: 7, highlight: false });

describe("kruskal algorithm should find the minimum spanning tree given a graph", function() {
  const result = new Set([
    { source: 4, target: 6, weight: 1, highlight: false },
    { source: 6, target: 7, weight: 2, highlight: false },
    { source: 9, target: 3, weight: 2, highlight: false },
    { source: 1, target: 2, weight: 4, highlight: false },
    { source: 7, target: 9, weight: 6, highlight: false },
    { source: 7, target: 8, weight: 7, highlight: false },
    { source: 2, target: 3, weight: 8, highlight: false },
    { source: 4, target: 5, weight: 9, highlight: false }
  ]);
  it("should return a minimum spanning tree", function() {
    assert.deepEqual(result, kruskals(graph));
  });

  it("should return an error message when the input is invalid", function() {
    assert.equal(ErrMessage.MST_NOT_FOUND, kruskals(errorInput));
  });
});

describe("prim algorithm should find the minimum spanning tree given a graph", function() {
  const result = new Set([
    [6, 4, 1],
    [1, 2, 4],
    [1, 8, 8],
    [9, 3, 2],
    [4, 5, 9],
    [7, 6, 2],
    [7, 9, 6],
    [8, 7, 7]
  ]);
  it("should return a minimum spanning tree", function() {
    assert.deepEqual(result, prims(graph));
  });

  it("should return an error message when the input is invalid", function() {
    assert.equal(ErrMessage.MST_NOT_FOUND, prims(errorInput));
  });
});

describe("boruvka algorithm should find the minimum spanning tree given a graph", function() {
  const result = new Set([
    { source: 4, target: 6, weight: 1, highlight: false },
    { source: 6, target: 7, weight: 2, highlight: false },
    { source: 9, target: 3, weight: 2, highlight: false },
    { source: 1, target: 2, weight: 4, highlight: false },
    { source: 7, target: 9, weight: 6, highlight: false },
    { source: 7, target: 8, weight: 7, highlight: false },
    { source: 2, target: 3, weight: 8, highlight: false },
    { source: 4, target: 5, weight: 9, highlight: false }
  ]);

  it("should return a minimum spanning tree", function() {
    assert.deepEqual(result, boruvkas(graph));
  });

  it("should return an error message when the input is invalid", function() {
    assert.equal(ErrMessage.MST_NOT_FOUND, boruvkas(errorInput));
  });
});

describe("boruvka parallel algorithm should find the minimum spanning tree given a graph", function() {
  const result = new Set([
    { source: 4, target: 6, weight: 1, highlight: false },
    { source: 6, target: 7, weight: 2, highlight: false },
    { source: 9, target: 3, weight: 2, highlight: false },
    { source: 1, target: 2, weight: 4, highlight: false },
    { source: 7, target: 9, weight: 6, highlight: false },
    { source: 7, target: 8, weight: 7, highlight: false },
    { source: 2, target: 3, weight: 8, highlight: false },
    { source: 4, target: 5, weight: 9, highlight: false }
  ]);

  it("should return a minimum spanning tree", function() {
    parallel(graph).then(x => {
      assert.deepEqual(result, x);
    });
  });

  it("should return an error message when the input is invalid", function() {
    parallel(errorInput).then(x => {
      assert.equal(ErrMessage.MST_NOT_FOUND, x);
    });
  });
});
