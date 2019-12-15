import {
  resetHighlight,
  resetNodes,
  resetRoot,
  resetTree,
  updateGraph
} from "../../src/functions/graphAlgorithms";
import { ErrMessage } from "../../src/constants/errorMessage";

const assert = require("assert");

describe("Reset edges", function() {
  const edgesT = [
    { source: 1, target: 2, weight: 4, highlight: true, tree: true },
    { source: 2, target: 3, weight: 8, highlight: true, tree: true },
    { source: 3, target: 4, weight: 7, highlight: true, tree: true },
    { source: 4, target: 5, weight: 9, highlight: true, tree: true },
    { source: 5, target: 6, weight: 10, highlight: true, tree: false }
  ];

  const resultT = [
    { source: 1, target: 2, weight: 4, highlight: true, tree: false },
    { source: 2, target: 3, weight: 8, highlight: true, tree: false },
    { source: 3, target: 4, weight: 7, highlight: true, tree: false },
    { source: 4, target: 5, weight: 9, highlight: true, tree: false },
    { source: 5, target: 6, weight: 10, highlight: true, tree: false }
  ];

  resetTree(edgesT);
  it("should set the tree attribute of each edge of a list of edges to false", function() {
    assert.deepEqual(resultT, edgesT);
  });


  const edgesE = [
    { source: 1, target: 2, weight: 4, highlight: true, tree: true },
    { source: 2, target: 3, weight: 8, highlight: true, tree: true },
    { source: 3, target: 4, weight: 7, highlight: true, tree: true },
    { source: 4, target: 5, weight: 9, highlight: true, tree: true },
    { source: 5, target: 6, weight: 10, highlight: true, tree: false }
  ];

  const resultE = [
    { source: 1, target: 2, weight: 4, highlight: false, tree: true },
    { source: 2, target: 3, weight: 8, highlight: false, tree: true },
    { source: 3, target: 4, weight: 7, highlight: false, tree: true },
    { source: 4, target: 5, weight: 9, highlight: false, tree: true },
    { source: 5, target: 6, weight: 10, highlight: false, tree: false }
  ];

  resetHighlight(edgesE);
  it("should set the highlight attribute of each edge of a list of edges to false", function() {
    assert.deepEqual(resultE, edgesE);
  });
});

describe("Reset nodes", function() {
  const nodes = [
    { id: 1, x: 20, y: 200, highlight: true },
    { id: 2, x: 80, y: 100, highlight: true },
    { id: 3, x: 200, y: 100, highlight: true },
    { id: 4, x: 320, y: 100, highlight: true }
  ];

  const result = [
    { id: 1, x: 20, y: 200, highlight: false },
    { id: 2, x: 80, y: 100, highlight: false },
    { id: 3, x: 200, y: 100, highlight: false },
    { id: 4, x: 320, y: 100, highlight: false }
  ];

  resetNodes(nodes);

  it("should set the highlight attribute of each node of a list of nodes to false", function() {
    assert.deepEqual(result, nodes);
  });
});

describe("Reset root", function() {
  const data = { root: 1 };

  const result = { root: {}};

  resetRoot(data);

  it("should set the root of the data to empty", function() {
    assert.deepEqual(result, data);
  });
});

describe("Update graph:update which edge needs to be highlighted or is a tree", function() {
    const array = [
        { source: 1, target: 2, weight: 4, highlight: false, tree: false },
        { source: 2, target: 3, weight: 8, highlight: false, tree: false },
        { source: 3, target: 4, weight: 7, highlight: false, tree: false },
      ];
    const edgesT = [
        { source: 1, target: 2, weight: 4, highlight: false, tree: false },
        { source: 2, target: 3, weight: 8, highlight: false, tree: false },
        { source: 3, target: 4, weight: 7, highlight: false, tree: false },
        { source: 4, target: 5, weight: 9, highlight: false, tree: false },
        { source: 5, target: 6, weight: 10, highlight: false, tree: false }
      ];
    const resultT = [
        { source: 1, target: 2, weight: 4, highlight: false, tree: true },
        { source: 2, target: 3, weight: 8, highlight: false, tree: true },
        { source: 3, target: 4, weight: 7, highlight: false, tree: true },
        { source: 4, target: 5, weight: 9, highlight: false, tree: false },
        { source: 5, target: 6, weight: 10, highlight: false, tree: false }
      ];

    updateGraph(array, edgesT, true)
  
    it("should set the matching edges tree attribute to be true", function() {
      assert.deepEqual(resultT, edgesT);
    });

    const edgesE= [
        { source: 1, target: 2, weight: 4, highlight: false, tree: false },
        { source: 2, target: 3, weight: 8, highlight: false, tree: false },
        { source: 3, target: 4, weight: 7, highlight: false, tree: false },
        { source: 4, target: 5, weight: 9, highlight: false, tree: false },
        { source: 5, target: 6, weight: 10, highlight: false, tree: false }
      ];
  
      const resultE = [
        { source: 1, target: 2, weight: 4, highlight: true, tree: false },
        { source: 2, target: 3, weight: 8, highlight: true, tree: false },
        { source: 3, target: 4, weight: 7, highlight: true, tree: false },
        { source: 4, target: 5, weight: 9, highlight: false, tree: false },
        { source: 5, target: 6, weight: 10, highlight: false, tree: false }
      ];

    updateGraph(array, edgesE, false)
    it("should set the matching edges highlight attribute to be true", function() {
        assert.deepEqual(resultE, edgesE);
      });
  });