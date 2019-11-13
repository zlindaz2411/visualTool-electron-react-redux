import kruskals from "../src/functions/algorithms";


const assert = require('assert');

describe('kruskal algorithm should return a state of all the steps of the algorithm', function() {
    const input= {
        nodes: [1,2,3,4,5,6,7,8,9],
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

    const result = 
        [ { highlighted: [], status: 0 },
        { highlighted: [], status: 1 },
        { highlighted: [], status: 2 },
        { highlighted: [ [Object] ], status: 3 },
        { highlighted: [ [Object] ], status: 4 },
        { highlighted: [ [Object] ], status: 5 },
        { highlighted: [], status: 2 },
        { highlighted: [ [Object] ], status: 3 },
        { highlighted: [ [Object] ], status: 4 },
        { highlighted: [ [Object] ], status: 5 },
        { highlighted: [], status: 2 },
        { highlighted: [ [Object] ], status: 3 },
        { highlighted: [ [Object] ], status: 4 },
        { highlighted: [ [Object] ], status: 5 },
        { highlighted: [], status: 2 },
        { highlighted: [ [Object] ], status: 3 },
        { highlighted: [ [Object] ], status: 4 },
        { highlighted: [ [Object] ], status: 5 },
        { highlighted: [], status: 2 },
        { highlighted: [ [Object] ], status: 3 },
        { highlighted: [ [Object] ], status: 4 },
        { highlighted: [ [Object] ], status: 5 },
        { highlighted: [], status: 2 },
        { highlighted: [ [Object] ], status: 3 },
        { highlighted: [ [Object] ], status: 4 },
        { highlighted: [ [Object] ], status: 5 },
        { highlighted: [], status: 2 },
        { highlighted: [], status: 3 },
        { highlighted: [], status: 6 },
        { highlighted: [], status: 2 },
        { highlighted: [], status: 3 },
        { highlighted: [], status: 6 },
        { highlighted: [], status: 2 },
        { highlighted: [ [Object] ], status: 3 },
        { highlighted: [ [Object] ], status: 4 },
        { highlighted: [ [Object] ], status: 5 },
        { highlighted: [], status: 2 },
        { highlighted: [], status: 3 },
        { highlighted: [], status: 6 },
        { highlighted: [], status: 2 },
        { highlighted: [ [Object] ], status: 3 },
        { highlighted: [ [Object] ], status: 4 },
        { highlighted: [ [Object] ], status: 5 },
        { highlighted: [], status: 2 },
        { highlighted: [], status: 3 },
        { highlighted: [], status: 6 },
        { highlighted: [], status: 2 },
        { highlighted: [], status: 3 },
        { highlighted: [], status: 6 },
        { highlighted: [], status: 2 },
        { highlighted: [], status: 3 },
        { highlighted: [], status: 6 } ]
    
    it('should return -1 when the value is not present', function() {
      assert.equal(result, kruskals(data.nodes, data.edges));
    });
});