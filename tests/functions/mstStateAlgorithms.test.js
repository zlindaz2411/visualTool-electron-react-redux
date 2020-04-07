import {
  kruskals,
  prims,
  boruvkas,
  parallel
} from "../../src/functions/mstStateAlgorithms";
import { ErrMessage } from "../../src/constants/errorMessage";
import { Graph } from "../../src/functions/lib/graph";

const assert = require("assert");

/**
 * valid Input graph
 */
let graph = new Graph();
graph.root = { id: 1, x: 20, y: 200 };
graph.addNode({ id: 1, x: 20, y: 200 });
graph.addNode({ id: 2, x: 80, y: 100 });
graph.addNode({ id: 3, x: 200, y: 100 });
graph.addEdge({ source: 1, target: 2, weight: 4, highlight: false });
graph.addEdge({ source: 2, target: 3, weight: 8, highlight: false });
graph.addEdge({ source: 3, target: 1, weight: 7, highlight: false });

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

describe("Kruskal's algorithm States", function() {
  const res = [
    { highlighted: [], tree: [], text: "", status: 0 },
    { highlighted: [], tree: [], highlightedNodes: [], text: "", status: 1 },
    { highlighted: [], tree: [], highlightedNodes: [], text: "", status: 2 },
    {
      highlighted: [{ source: 1, target: 2, weight: 4, highlight: false }],
      tree: [],
      highlightedNodes: [],
      text: "",
      status: 3
    },
    {
      highlighted: [{ source: 1, target: 2, weight: 4, highlight: false }],
      tree: [],
      highlightedNodes: [],
      text: "",
      status: 4
    },
    {
      highlighted: [{ source: 1, target: 2, weight: 4, highlight: false }],
      tree: [{ source: 1, target: 2, weight: 4, highlight: false }],
      highlightedNodes: [],
      text: "",
      status: 5
    },
    {
      highlighted: [],
      tree: [{ source: 1, target: 2, weight: 4, highlight: false }],
      highlightedNodes: [],
      text: "",
      status: 2
    },
    {
      highlighted: [{ source: 3, target: 1, weight: 7, highlight: false }],
      tree: [{ source: 1, target: 2, weight: 4, highlight: false }],
      highlightedNodes: [],
      text: "",
      status: 3
    },
    {
      highlighted: [{ source: 3, target: 1, weight: 7, highlight: false }],
      tree: [{ source: 1, target: 2, weight: 4, highlight: false }],
      highlightedNodes: [],
      text: "",
      status: 4
    },
    {
      highlighted: [{ source: 3, target: 1, weight: 7, highlight: false }],
      tree: [
        { source: 1, target: 2, weight: 4, highlight: false },
        { source: 3, target: 1, weight: 7, highlight: false }
      ],
      highlightedNodes: [],
      text: "",
      status: 5
    },
    {
      highlighted: [],
      tree: [
        { source: 1, target: 2, weight: 4, highlight: false },
        { source: 3, target: 1, weight: 7, highlight: false }
      ],
      highlightedNodes: [],
      text: "Total edges considered: 2/3",
      status: 7
    }
  ];
  it("should return a list of kruskal's algorithm states", function() {
    assert.deepEqual(res, kruskals(graph));
  });

  it("should return an error message when the input is invalid", function() {
    assert.equal(ErrMessage.MST_NOT_FOUND, kruskals(errorInput));
  });
});

describe("Prim's algorithm States", function() {
  const res = [
    { highlighted: [], tree: [], text: "", status: 0 },
    { highlighted: [], tree: [], highlightedNodes: [], text: "", status: 1 },
    { highlighted: [], tree: [], highlightedNodes: [], text: "", status: 2 },
    { highlighted: [], tree: [], highlightedNodes: [], text: "", status: 3 },
    {
      highlighted: [{ source: 1, target: 2 }],
      tree: [],
      highlightedNodes: [],
      text: "",
      status: 4
    },
    {
      highlighted: [{ source: 1, target: 2 }],
      tree: [],
      highlightedNodes: [],
      text: "",
      status: 5
    },
    {
      highlighted: [],
      tree: [{ source: 1, target: 2 }],
      highlightedNodes: [],
      text: "",
      status: 6
    },
    {
      highlighted: [],
      tree: [{ source: 1, target: 2 }],
      highlightedNodes: [],
      text: "",
      status: 7
    },
    {
      highlighted: [],
      tree: [{ source: 1, target: 2 }],
      highlightedNodes: [],
      text: "",
      status: 3
    },
    {
      highlighted: [{ source: 1, target: 3 }],
      tree: [{ source: 1, target: 2 }],
      highlightedNodes: [],
      text: "",
      status: 4
    },
    {
      highlighted: [{ source: 1, target: 3 }],
      tree: [{ source: 1, target: 2 }],
      highlightedNodes: [],
      text: "",
      status: 5
    },
    {
      highlighted: [],
      tree: [
        { source: 1, target: 2 },
        { source: 1, target: 3 }
      ],
      highlightedNodes: [],
      text: "Total edges dequeued: 2/3",
      status: 9
    }
  ];
  it("should return a list of prim's algorithm states", function() {
    assert.deepEqual(res, prims(graph));
  });

  it("should return an error message when the input is invalid", function() {
    assert.equal(ErrMessage.MST_NOT_FOUND, prims(errorInput));
  });
});

describe("Boruvka's algorithm States", function() {
  const res = [
    { highlighted: [], tree: [], highlightedNodes: [], text: "", status: 0 },
    {
      highlighted: [],
      tree: [],
      highlightedNodes: [],
      text: "Number of components: 3",
      status: 1
    },
    { highlighted: [], tree: [], highlightedNodes: [], text: "", status: 2 },
    { highlighted: [], tree: [], highlightedNodes: [1], text: "", status: 3 },
    {
      highlighted: [{ source: 1, target: 2, weight: 4, highlight: false }],
      tree: [],
      highlightedNodes: [1],
      text: "",
      status: 4
    },
    {
      highlighted: [],
      tree: [],
      highlightedNodes: [],
      text: "",
      status: 2
    },
    {
      highlighted: [],
      tree: [],
      highlightedNodes: [2],
      text: "",
      status: 3
    },
    {
      highlighted: [{ source: 1, target: 2, weight: 4, highlight: false }],
      tree: [],
      highlightedNodes: [2],
      text: "",
      status: 4
    },
    {
      highlighted: [],
      tree: [],
      highlightedNodes: [],
      text: "",
      status: 2
    },
    {
      highlighted: [],
      tree: [],
      highlightedNodes: [3],
      text: "",
      status: 3
    },
    {
      highlighted: [{ source: 3, target: 1, weight: 7, highlight: false }],
      tree: [],
      highlightedNodes: [3],
      text: "",
      status: 4
    },
    {
      highlighted: [],
      tree: [
        { source: 1, target: 2, weight: 4, highlight: false },
        { source: 3, target: 1, weight: 7, highlight: false }
      ],
      highlightedNodes: [],
      text: "",
      status: 5
    },
    {
      highlighted: [],
      tree: [
        { source: 1, target: 2, weight: 4, highlight: false },
        { source: 3, target: 1, weight: 7, highlight: false }
      ],
      highlightedNodes: [],
      text: "Total number of iterations: 1",

      status: 6
    }
  ];
  it("should return a list of boruvka's algorithm states", function() {
    assert.deepEqual(res, boruvkas(graph));
  });

  it("should return an error message when the input is invalid", function() {
    assert.equal(ErrMessage.MST_NOT_FOUND, boruvkas(errorInput));
  });
});

describe("Boruvka Parallel Algorithm States", function() {
  const res = [
    { highlighted: [], tree: [], highlightedNodes: [], text: "", status: 0 },
    {
      highlighted: [],
      tree: [],
      highlightedNodes: [],
      text: "Number of components: 3",
      status: 1
    },
    { highlighted: [], tree: [], highlightedNodes: [], text: "", status: 2 },
    { highlighted: [], tree: [], highlightedNodes: [1], text: "", status: 3 },
    { highlighted: [], tree: [], highlightedNodes: [], text: "", status: 2 },
    { highlighted: [], tree: [], highlightedNodes: [2], text: "", status: 3 },
    { highlighted: [], tree: [], highlightedNodes: [], text: "", status: 2 },
    { highlighted: [], tree: [], highlightedNodes: [3], text: "", status: 3 },
    {
      highlighted: [],
      tree: [],
      highlightedNodes: [1, 2, 3],
      text: "",
      status: 4
    },
    {
      highlighted: [
        { source: 1, target: 2, weight: 4, highlight: false },
        { source: 3, target: 1, weight: 7, highlight: false }
      ],
      tree: [],
      highlightedNodes: [1, 2, 3],
      text: "",
      status: 5
    },
    {
      highlighted: [],
      tree: [
        { source: 1, target: 2, weight: 4, highlight: false },
        { source: 3, target: 1, weight: 7, highlight: false }
      ],
      highlightedNodes: [],
      text: "",
      status: 6
    },
    {
      highlighted: [],
      tree: [
        { source: 1, target: 2, weight: 4, highlight: false },
        { source: 3, target: 1, weight: 7, highlight: false }
      ],
      highlightedNodes: [],
      text: "Total number of executing in parallel: 1",
      status: 7
    }
  ];
  it("should return a list of boruvka's algorithm states", function() {
    assert.deepEqual(res, parallel(graph));
  });

  it("should return an error message when the input is invalid", function() {
    assert.equal(ErrMessage.MST_NOT_FOUND, parallel(errorInput));
  });
});
