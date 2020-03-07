import { kruskalConstrained, simulatedAnnealing} from "../../src/functions/dcmstStateAlgorithms";
import { ErrMessage } from "../../src/constants/errorMessage";
import { Graph } from "../../src/functions/lib/graph";
import { getWeight } from "../../src/functions/util";
const assert = require("assert");

/**
 * valid Input graph
 */
let graph = new Graph();
graph.addNode({ id: "A" });
graph.addNode({ id: "B" });
graph.addNode({ id: "C" });
graph.addNode({ id: "D" });
graph.addNode({ id: "R" });
graph.addEdge({ source: "A", target: "B", weight: 2 });
graph.addEdge({ source: "B", target: "C", weight: 3 });
graph.addEdge({ source: "B", target: "D", weight: 15 });
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
  const result  = [
    { highlighted: [], tree: [], text: '', status: 0 },
    { highlighted: [], tree: [{ source: 'A', target: 'B', weight: 2 } ], highlightedNodes: [], text: '', status: 1 },
    {
      highlighted: [],
      tree: [ { source: 'A', target: 'B', weight: 2 } ],
      highlightedNodes: [ 'R'],
      text: '',
      status: 2
    },
    {
      highlighted: [
        { source: 'C', target: 'R', weight: 6 },
        { source: 'D', target: 'R', weight: 10 }
      ],
      tree: [ { source: 'A', target: 'B', weight: 2 } ],
      highlightedNodes: ['R' , 'C', 'D', ],
      text: '',
      status: 3
    },
    {
      highlighted: [
        { source: 'C', target: 'R', weight: 6 },
        { source: 'D', target: 'R', weight: 10 }
      ],
      tree: [ { source: 'A', target: 'B', weight: 2 } ],
      highlightedNodes: [ 'R','C', 'D',  ],
      text: '',
      status: 4
    },
    {
      highlighted: [],
      tree: [ { source: 'A', target: 'B', weight: 2 } ],
      highlightedNodes: [],
      text: '',
      status: 6
    },
    {
      highlighted: [],
      tree: [ { source: 'A', target: 'B', weight: 2 } ],
      highlightedNodes: [],
      text: '',
      status: 7
    },
    {
      highlighted: [ { source: 'B', target: 'C', weight: 3 } ],
      tree: [ { source: 'A', target: 'B', weight: 2 } ],
      highlightedNodes: [],
      text: '',
      status: 8
    },
    {
      highlighted: [ { source: 'B', target: 'C', weight: 3 } ],
      tree: [ { source: 'A', target: 'B', weight: 2 } ],
      highlightedNodes: [],
      text: '',
      status: 9
    },
    {
      highlighted: [],
      tree: [
        { source: 'A', target: 'B', weight: 2 },
        { source: 'B', target: 'C', weight: 3 }
      ],
      highlightedNodes: [],
      text: '',
      status: 10
    },
    {
      highlighted: [],
      tree: [
        { source: 'A', target: 'B', weight: 2 },
        { source: 'B', target: 'C', weight: 3 }
      ],
      highlightedNodes: [],
      text: '',
      status: 7
    },
    {
      highlighted: [ { source: 'C', target: 'D', weight: 4 } ],
      tree: [
        { source: 'A', target: 'B', weight: 2 },
        { source: 'B', target: 'C', weight: 3 }
      ],
      highlightedNodes: [],
      text: '',
      status: 8
    },
    {
      highlighted: [ { source: 'C', target: 'D', weight: 4 } ],
      tree: [
        { source: 'A', target: 'B', weight: 2 },
        { source: 'B', target: 'C', weight: 3 }
      ],
      highlightedNodes: [],
      text: '',
      status: 9
    },
    {
      highlighted: [],
      tree: [
        { source: 'A', target: 'B', weight: 2 },
        { source: 'B', target: 'C', weight: 3 },
        { source: 'C', target: 'D', weight: 4 },
      ],
      highlightedNodes: [],
      text: '',
      status: 10
    },
    {
      highlighted: [],
      tree: [
        { source: 'A', target: 'B', weight: 2 },
        { source: 'B', target: 'C', weight: 3 },
        { source: 'C', target: 'D', weight: 4 },
      ],
      highlightedNodes: [],
      text: '',
      status: 7
    },
    {
      highlighted: [ { source: 'C', target: 'R', weight: 6} ],
      tree: [
        { source: 'A', target: 'B', weight: 2 },
        { source: 'B', target: 'C', weight: 3 },
        { source: 'C', target: 'D', weight: 4 },
      ],
      highlightedNodes: [],
      text: '',
      status: 8
    },
    {
      highlighted: [ { source: 'C', target: 'R', weight: 6 } ],
      tree: [
        { source: 'A', target: 'B', weight: 2 },
        { source: 'B', target: 'C', weight: 3 },
        { source: 'C', target: 'D', weight: 4 }
      ],
      highlightedNodes: [],
      text: '',
      status: 9
    },
    {
      highlighted: [],
      tree: [
        { source: 'A', target: 'B', weight: 2 },
        { source: 'B', target: 'C', weight: 3 },
        { source: 'C', target: 'D', weight: 4 }
      ],
      highlightedNodes: [],
      text: '',
      status: 7
    },
    {
      highlighted: [ { source: 'D', target: 'R', weight: 10 } ],
      tree: [
        { source: 'A', target: 'B', weight: 2 },
        { source: 'B', target: 'C', weight: 3 },
        { source: 'C', target: 'D', weight: 4 }
      ],
      highlightedNodes: [],
      text: '',
      status: 8
    },
    {
      highlighted: [ { source: 'D', target: 'R', weight: 10 } ],
      tree: [
        { source: 'A', target: 'B', weight: 2 },
        { source: 'B', target: 'C', weight: 3 },
        { source: 'C', target: 'D', weight: 4 },
      ],
      highlightedNodes: [],
      text: '',
      status: 9
    },
    {
      highlighted: [],
      tree: [
        { source: 'A', target: 'B', weight: 2 },
        { source: 'B', target: 'C', weight: 3},
        { source: 'C', target: 'D', weight: 4},
        { source: 'D', target: 'R', weight: 10 }
      ],
      highlightedNodes: [],
      text: '',
      status: 10
    },
    {
      highlighted: [],
      tree: [
        { source: 'A', target: 'B', weight: 2 },
        { source: 'B', target: 'C', weight: 3},
        { source: 'C', target: 'D', weight: 4},
        { source: 'D', target: 'R', weight: 10 }
      ],
      highlightedNodes: [],
      text: '',
      status: 11
    },
    {
      highlighted: [],
      tree: [
        { source: 'A', target: 'B', weight: 2 },
        { source: 'B', target: 'C', weight: 3},
        { source: 'C', target: 'D', weight: 4},
        { source: 'D', target: 'R', weight: 10 }
      ],
      highlightedNodes: [],
      text: '',
      status: 13
    }

  ]
  it("should return a the same result of the state", function() {
    assert.deepEqual(result, kruskalConstrained(graph, 2));
  });

  it("should return an error message when the input is invalid", function() {
    assert.equal(ErrMessage.DCMST_NOT_FOUND, kruskalConstrained(errorInput, 3));
  });
});


describe("computation of the states of visualization of the simulated annealing algorithm", function() {

  it("should return an error message when the input is invalid", function() {
    assert.equal(ErrMessage.DCMST_NOT_FOUND, simulatedAnnealing(errorInput, 3));
  });
});
