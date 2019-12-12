import {kruskals, prims, boruvkas} from "../../src/functions/originalAlgorithms";

const assert = require('assert');

/**
 * Correct input: connected graph
 */
const input= {
    nodes: [{ id: 1, x: 20, y: 200 },
        { id: 2, x: 80, y: 100 },
        { id: 3, x: 200, y: 100 },
        { id: 4, x: 320, y: 100},
        { id: 5, x: 380, y: 200 },
        { id: 6, x: 320, y: 300},
        { id: 7, x: 200, y: 300 },
        { id: 8, x: 80, y: 300},
        { id: 9, x: 150, y: 200 },
    ],
    edges: [
        {source:1, target:2, weight:4, highlight:false},
        {source:2, target:3, weight:8,highlight:false},
        {source:3, target:4, weight:7,highlight:false},
        {source:4, target:5, weight:9,highlight:false},
        {source:5, target:6, weight:10,highlight:false},
        {source:6, target:3, weight:14,highlight:false},
        {source:6, target:7, weight:2,highlight:false},
        {source:4, target:6, weight:1,highlight:false},
        {source:7, target:8, weight:7,highlight:false},
        {source:7, target:9, weight:6,highlight:false},
        {source:8, target:9, weight:7,highlight:false},
        {source:8, target:1, weight:8,highlight:false},
        {source:2, target:8, weight:11,highlight:false},
        {source:9, target:3, weight:2,highlight:false},
    ],
};


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
describe('kruskal algorithm should find the minimum spanning tree given a graph', function() {
    
    const result = new Set(
       [{ source: 4, target: 6, weight: 1, highlight: false },
        { source: 6, target: 7, weight: 2, highlight: false },
        { source: 9, target: 3, weight: 2, highlight: false },
        { source: 1, target: 2, weight: 4, highlight: false },
        { source: 7, target: 9, weight: 6, highlight: false },
        { source: 7, target: 8, weight: 7, highlight: false },
        { source: 2, target: 3, weight: 8, highlight: false },
        { source: 4, target: 5, weight: 9, highlight: false }]
    )
    it('should return a minimum spanning tree', function() {
      assert.deepEqual(result,kruskals(input.nodes, input.edges));
    });

    const errorRes = "MST not found";
    it('should return an error message when the input is invalid', function() {
        assert.equal(errorRes, kruskals(errorInput.nodes, errorInput.edges));
      });


});


describe('prim algorithm should find the minimum spanning tree given a graph', function() {
    const result = new Set(
       [[6,4,1],
        [1,2,4],
        [2,3,8],
        [3,9,2],
        [4,5,9],
        [7,6,2],
        [9,7,6],
        [9,8,7]]
    )
    it('should return a minimum spanning tree', function() {
      assert.deepEqual(result,prims(input.nodes, input.edges));
    });

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

    const errorRes = "MST not found";
    it('should return an error message when the input is invalid', function() {
        assert.equal(errorRes, kruskals(errorInput.nodes, errorInput.edges));
      });

});


