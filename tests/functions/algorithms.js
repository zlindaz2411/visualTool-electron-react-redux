import {addStates, kruskals, prims, boruvkas} from "../../src/functions/algorithms";
import { ErrMessage } from "../../src/constants/errorMessage";

const assert = require('assert');

/**
 * Correct input: connected graph
 */
const input= {
    nodes: [{ id: 1, x: 20, y: 200 },
        { id: 2, x: 80, y: 100 },
        { id: 3, x: 200, y: 100 },
    ],
    edges: [
        {source:1, target:2, weight:4, highlight:false},
        {source:2, target:3, weight:8,highlight:false},
        {source:3, target:1, weight:7,highlight:false},]
    }

/**
 * Error graph, with isolated vertex
 */
const errorInput= {
    nodes: [{ id: 1, x: 20, y: 200 },
        { id: 2, x: 80, y: 100 },
        { id: 3, x: 200, y: 100 },
        { id: 4, x: 320, y: 100},
    ],
    edges: [
        {source:1, target:2, weight:4, highlight:false},
        {source:2, target:3, weight:8,highlight:false},
        {source:3, target:1, weight:8,highlight:false},
    ],
};

describe("Add States", function() {
    let states = [{ highlighted: [], tree: [], highlightedNodes: [], status: 0 }];
    addStates(states,[],[],[],1)
    let res = [{ highlighted: [], tree: [], highlightedNodes: [], status: 0 }, { highlighted: [], tree: [], highlightedNodes: [], status: 1 }]
    

    it("should be empty priority queue at first", function() {
      assert.deepEqual(res, states);
    });

  });

  describe("Kruskal's algorithm States", function() {
    const res = [
        { highlighted: [], tree: [], status: 0 },
        { highlighted: [], tree: [], highlightedNodes: [], status: 1 },
        { highlighted: [], tree: [], highlightedNodes: [], status: 2 },
        {
            highlighted: [ { source: 1, target: 2, weight: 4, highlight: false } ],
            tree: [],
            highlightedNodes: [],
            status: 3
          },
          {
            highlighted: [ { source: 1, target: 2, weight: 4, highlight: false } ],
            tree: [],
            highlightedNodes: [],
            status: 4
          },
          {
            highlighted: [ { source: 1, target: 2, weight: 4, highlight: false } ],
            tree: [{ source: 1, target: 2, weight: 4, highlight: false }],
            highlightedNodes: [],
            status: 5
          },
        { highlighted: [], tree: [], highlightedNodes: [], status: 2 },
        {
            highlighted: [ { source: 3, target: 1, weight: 7, highlight: false } ],
            tree: [ { source: 1, target: 2, weight: 4, highlight: false } ],
            highlightedNodes: [],
            status: 3
          },
          {
            highlighted: [ { source: 3, target: 1, weight: 7, highlight: false } ],
            tree: [ { source: 1, target: 2, weight: 4, highlight: false } ],
            highlightedNodes: [],
            status: 4
          },
          {
            highlighted: [ { source: 3, target: 1, weight: 7, highlight: false } ],
            tree: [ { source: 1, target: 2, weight: 4, highlight: false },{ source: 3, target: 1, weight: 7, highlight: false }],
            highlightedNodes: [],
            status: 5
          },
        { highlighted: [], tree: [], highlightedNodes: [], status: 2 },
        {
            highlighted: [ { source: 2, target: 3, weight: 8, highlight: false } ],
            tree: [
              { source: 1, target: 2, weight: 4, highlight: false },
              { source: 3, target: 1, weight: 7, highlight: false }
            ],
            highlightedNodes: [],
            status: 3
          },
          {
            highlighted: [ { source: 2, target: 3, weight: 8, highlight: false } ],
            tree: [
              { source: 1, target: 2, weight: 4, highlight: false },
              { source: 3, target: 1, weight: 7, highlight: false }
            ],
            highlightedNodes: [],
            status: 4
          },
          {
            highlighted: [],
            tree: [
              { source: 1, target: 2, weight: 4, highlight: false },
              { source: 3, target: 1, weight: 7, highlight: false }
            ],
            highlightedNodes: [],
            status: 6
          },
          {
            highlighted: [],
            tree: [
              { source: 1, target: 2, weight: 4, highlight: false },
              { source: 3, target: 1, weight: 7, highlight: false }
            ],
            highlightedNodes: [],
            status: 7
          }
      ]
    it("should return a list of kruskal's algorithm states", function() {
      assert.deepEqual(res, kruskals(input.nodes, input.edges));
    });

    it('should return an error message when the input is invalid', function() {
        assert.equal(ErrMessage.MST_NOT_FOUND, kruskals(errorInput.nodes, errorInput.edges));
      });

  });

  describe("Prim's algorithm States", function() {
    const res = [
        { highlighted: [], tree: [], status: 0 },
        { highlighted: [], tree: [], highlightedNodes: [], status: 1 },
        { highlighted: [], tree: [], highlightedNodes: [], status: 2 },
        { highlighted: [], tree: [], highlightedNodes: [], status: 3 },
        {
            highlighted: [ { source: 1, target: 2 } ],
            tree: [],
            highlightedNodes: [],
            status: 4
          },
          {
            highlighted: [ { source: 1, target: 2 } ],
            tree: [],
            highlightedNodes: [],
            status: 5
          },
          {
            highlighted: [ { source: 1, target: 2 } ],
            tree: [ { source: 1, target: 2 } ],
            highlightedNodes: [],
            status: 6
          },
          {
            highlighted: [
              { source: 1, target: 2 },
              { source: 2, target: 3, weight: 8, highlight: false }
            ],
            tree: [ { source: 1, target: 2 } ],
            highlightedNodes: [],
            status: 7
          },
        { highlighted: [], tree: [], highlightedNodes: [], status: 3 },
        {
            highlighted: [ { source: 1, target: 3 } ],
            tree: [ { source: 1, target: 2 } ],
            highlightedNodes: [],
            status: 4
          },
          {
            highlighted: [ { source: 1, target: 3 } ],
            tree: [ { source: 1, target: 2 } ],
            highlightedNodes: [],
            status: 5
          },
          {
            highlighted: [ { source: 1, target: 3 } ],
            tree: [ { source: 1, target: 2 }, { source: 1, target: 3 } ],
            highlightedNodes: [],
            status: 6
          },
          {
            highlighted: [ { source: 1, target: 3 } ],
            tree: [ { source: 1, target: 2 }, { source: 1, target: 3 } ],
            highlightedNodes: [],
            status: 7
          },
        { highlighted: [], tree: [], highlightedNodes: [], status: 3 },
        {
            highlighted: [ { source: 2, target: 3 } ],
            tree: [ { source: 1, target: 2 }, { source: 1, target: 3 } ],
            highlightedNodes: [],
            status: 4
          },
          {
            highlighted: [ { source: 2, target: 3 } ],
            tree: [ { source: 1, target: 2 }, { source: 1, target: 3 } ],
            highlightedNodes: [],
            status: 5
          },
          {
            highlighted: [],
            tree: [ { source: 1, target: 2 }, { source: 1, target: 3 } ],
            highlightedNodes: [],
            status: 8
          },
          {
            highlighted: [],
            tree: [ { source: 1, target: 2 }, { source: 1, target: 3 } ],
            highlightedNodes: [],
            status: 9
          }
      ]
    it("should return a list of prim's algorithm states", function() {
      assert.deepEqual(res, prims(input.nodes[0], input.nodes, input.edges));
    });

    it('should return an error message when the input is invalid', function() {
        assert.equal(ErrMessage.MST_NOT_FOUND, prims(input.nodes[0], errorInput.nodes, errorInput.edges));
      });

  });

  describe("Boruvka's algorithm States", function() {
    const res = [
        { highlighted: [], tree: [], highlightedNodes: [], status: 0 },
        { highlighted: [], tree: [], highlightedNodes: [], status: 1 },
        { highlighted: [], tree: [], highlightedNodes: [], status: 2 },
        { highlighted: [], tree: [], highlightedNodes: [], status: 3 },
        { highlighted: [], tree: [], highlightedNodes: [ 1 ], status: 4 },
        {
            highlighted: [ { source: 1, target: 2, weight: 4, highlight: false } ],
            tree: [],
            highlightedNodes: [ 1 ],
            status: 5
          },
          {
            highlighted: [ { source: 1, target: 2, weight: 4, highlight: false } ],
            tree: [],
            highlightedNodes: [ 1 ],
            status: 6
          },
          {
            highlighted: [ { source: 1, target: 2, weight: 4, highlight: false } ],
            tree: [{ source: 1, target: 2, weight: 4, highlight: false }],
            highlightedNodes: [ 1 ],
            status: 7
          },
          {
            highlighted: [  ],
            tree: [{ source: 1, target: 2, weight: 4, highlight: false }],
            highlightedNodes: [  ],
            status: 3
          },
          {
            highlighted: [ ],
            tree: [{ source: 1, target: 2, weight: 4, highlight: false }],
            highlightedNodes: [ 2 ],
            status: 4
          },
          {
            highlighted: [
                { source: 1, target: 2, weight: 4, highlight: false }
            ],
            tree: [ { source: 1, target: 2, weight: 4, highlight: false } ],
            highlightedNodes: [ 2 ],
            status: 5
          },
          {
            highlighted: [
             
            ],
            tree: [ { source: 1, target: 2, weight: 4, highlight: false } ],
            highlightedNodes: [],
            status: 3
          },
          {
            highlighted: [
              
            ],
            tree: [ { source: 1, target: 2, weight: 4, highlight: false } ],
            highlightedNodes: [ 3 ],
            status: 4
          },
          {
            highlighted: [
                { source: 3, target: 1, weight: 7, highlight: false }
            ],
            tree: [ { source: 1, target: 2, weight: 4, highlight: false } ],
            highlightedNodes: [ 3 ],
            status: 5
          },
          {
            highlighted: [
                { source: 3, target: 1, weight: 7, highlight: false }
            ],
            tree: [ { source: 1, target: 2, weight: 4, highlight: false } ],
            highlightedNodes: [ 3 ],
            status: 6
          },
          {
            highlighted: [
                { source: 3, target: 1, weight: 7, highlight: false }
            ],
            tree: [
              { source: 1, target: 2, weight: 4, highlight: false },
              { source: 3, target: 1, weight: 7, highlight: false }
            ],
            highlightedNodes: [ 3 ],
            status: 7
          },
          {
            highlighted: [
            ],
            tree: [
              { source: 1, target: 2, weight: 4, highlight: false },
              { source: 3, target: 1, weight: 7, highlight: false }
            ],
            highlightedNodes: [],
            status: 9
          }
      ]
    it("should return a list of boruvka's algorithm states", function() {
      assert.deepEqual(res, boruvkas(input.nodes, input.edges));
    });

    it('should return an error message when the input is invalid', function() {
        assert.equal(ErrMessage.MST_NOT_FOUND, boruvkas(errorInput.nodes, errorInput.edges));
      });

  });